const rawHtml = `
<style>
	.has-error .bootstrap-select .btn {
		border-color: #f00;
	}

	.has-success .bootstrap-select .btn {
		border-color: #0f0;
	}

	button.btn.dropdown-toggle.btn-light {
		height: 35px;
	}

	/**Card Section */
	.card-section .card {
		border-radius: 10px;
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
		transition: all 0.2s;
	}

	.card-section .card:hover {
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
		transform: scale(1.01);
	}
</style>

<!-- php: // $requestLabs = $selectedVisit->request_labs; // $requestMedications = $selectedVisit->request_medications; // $requestSurgeries = $selectedVisit->request_surgeries; // $requestServices = $selectedVisit->request_services; -->

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">REQUESTS</span>
			</div>
			<ul class="nav nav-tabs" id="requestTab">


				<!-- php: if (($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'addRequestLab']) || $this->AuthUser->hasAccess(['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiology'])) && !in_array($selectedVisit->patient_vis... -->
					<li class="nav-item request_lab">
						<a href="#borderBox_request_lab" data-toggle="tab">Radiology Imaging</a>
					</li>
				<!-- php: } -->

				<li class="nav-item request_surgery">
					<a href="#borderBox_referral" data-toggle="tab" onclick="referralTab()">Consult To/Referral</a>
				</li>

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestSurgeries', 'action' => 'addRequestSurgeries']) && !in_array($selectedVisit->patient_visit_purpose_id, [5, 6])) { -->
					<li class="nav-item request_surgery">
						<a href="#borderBox_request_surgery" data-toggle="tab">Surgery/Procedure</a>
					</li>
				<!-- php: } -->
			


				<!--Nutrition Tab-->
				<!-- <li class="nav-item request_surgery">
						<a href="#borderBox_request_nutrition" data-toggle="tab">Nutrition</a>
					</li> -->

				<!--Referral Tab-->

				<li class="nav-item request_surgery">
					<a href="#borderBox_consumables" id="consumablesTab" data-toggle="tab" onclick="consumablesTab();this.onclick=null;">Consumables</a>
				</li>

				<!--Ward Services Tab-->
				<!-- php: if (true) { -->
				<li class="nav-item request_ward_service">
					<a href="#request_ward_service" data-toggle="tab">Other Services</a>
				</li>
				<!-- php: } -->

			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">

				<!-- php: if (($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'addRequestLab']) || $this->AuthUser->hasAccess(['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiology'])) && !in_array($selectedVisit->patient_vis... -->
					<div class="tab-pane request_lab_content" id="borderBox_request_lab">
						<!-- php: = $this->element('patientvisit/chiro_requestlabservices', ['requestLabs' => $selectedVisit->request_labs, 'requestScans' => $selectedVisit->request_radiologies]) -->
					</div>
				<!-- php: } -->

				<div class="tab-pane " id="borderBox_referral">
				<!-- php: = $this->element('patientvisit/requestreferral') -->
				</div>



				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestSurgeries', 'action' => 'addRequestSurgeries']) && !in_array($selectedVisit->patient_visit_purpose_id, [5, 6])) { -->
					<div class="tab-pane request_surgery_content" id="borderBox_request_surgery">
						<!-- php: = $this->element('patientvisit/requestsurgeryservices') -->
					</div>
				<!-- php: } -->

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'getConsumableStocks']) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
					<div class="tab-pane request_lab_content" id="borderBox_consumables">
						<!-- php: = $this->element('patientvisit/request_consumables') -->
					</div>
				<!-- php: } -->
				
				<div class="tab-pane request_ward_service" id="request_ward_service">
					<!-- php: = $this->element('patientvisit/requestwardservices', ['requestedWardServices' => $selectedVisit->requested_ward_services]) -->
				</div>
			</div>
		</div>
	</div>
</div>



<script>
	function clearSurgery() {
		$('#start_date_value').val('');
		$('#start_time_value').val('');
		$('#end_date_value').val('');
		$('#end_time_value').val('');
		$('#surgery_type_id').val('');
		$('#surgeon_id').val('');
		$('#anaesthesia_id').val('');
		$('#surgery_notes').val('');
	}

	function clearService() {
		$('#start_date_value').val('');
		$('#start_time_value').val('');
		$('#end_date_value').val('');
		$('#end_time_value').val('');
		$('#surgeon_id').val('');
		$('#anaesthesia_id').val('');
		$('#surgery_notes').val('');
	}

	$(function() {
		$("#labForm").submit(function() {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});

		// $("#medicationForm").submit(function () {
		// return confirm('Are you sure you want to submit ?');
		// return true;
		// });

		$("#surgeries").submit(function() {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});
	});
</script>

<script>
	function clearLabs() {
		document.getElementById('investigation_id').innerHTML = '';
	}
	function referralTab() {
		getReferral()
		populateMDCBedMovement()
		populateWards()
		populateSelctedDiagnosis()
		generateReferralTable()
	}

	function consumablesTab() {
		try {
			populateConsumableServices()
			requestConsumablesGenerator()
			
		} catch (error) {
			console.error("populateConsumableServices or requestConsumablesGenerator do not exist")
		}
	}

	$(document).ready(function() {
		try {
			populateConsumableServices()
			requestConsumablesGenerator()
			
		} catch (error) {
			console.error("populateConsumableServices or requestConsumablesGenerator do not exist")
		}
	})
</script>


`;

export default function ElementElementPatientvisitChiroRequestservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
