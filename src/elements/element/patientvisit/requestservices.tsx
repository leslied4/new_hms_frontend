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


<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">

			<ul class="nav nav-tabs"  id="requestTab">


				<li class="nav-item request_lab">
					<a href="#borderBox_overview" data-toggle="tab">Overview</a>
				</li>
				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'addRequestLab']) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
					<li class="nav-item request_lab">
						<a href="#borderBox_request_lab" data-toggle="tab">Labs</a>
					</li>
					<li class="nav-item request_lab">
						<a href="#borderBox_request_scan" data-toggle="tab">Imaging</a>
					</li>
				<!-- php: } -->
			<!-- php: if (!$continuousCare): -->

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'ImmunizationRequest', 'action' => 'requestImmunization']) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
					<li class="nav-item request_immunization">
						<a href="#borderBox_request_immunization" data-toggle="tab">Immunization</a>
					</li>
				<!-- php: } -->
				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'addRequestMedication']) && !in_array($selectedVisit->patient_visit_purpose_id, [5])) { -->
					<li class="nav-item request_medication">
						<a href="#borderBox_request_medication" data-toggle="tab"><!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --></a>
					</li>
				<!-- php: } -->
				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'addRequestMedication']) && !in_array($selectedVisit->patient_visit_purpose_id, [5])) { -->
					<li class="nav-item request_medication">
						<a href="#borderBox_request_transfusions" data-toggle="tab">Transfusion</a>
					</li>
				<!-- php: } -->
			<!-- php: endif; -->

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



				<!--Nutrition Tab-->
				<li class="nav-item request_surgery">
					<a href="#borderBox_request_optical_services" data-toggle="tab">Optical</a>
				</li>

				<!--Referral Tab-->
				<li class="nav-item request_surgery">
					<a href="#borderBox_referral" data-toggle="tab" onclick="referralTab()">Consult To/Referral</a>
				</li>
				<li class="nav-item request_surgery">
					<a href="#borderBox_consumables" id="consumablesTab" data-toggle="tab" onclick="consumablesTab();this.onclick=null;">Consumables</a>
				</li>

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'BundledServices', 'action' => 'addBundledService']) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
					<li class="nav-item request_lab">
						<a href="#borderBox_bundled_request" data-toggle="tab">Bundled Service</a>
					</li>
				<!-- php: } -->


				<li class="nav-item request_ward_service">
					<a href="#request_ward_service" data-toggle="tab">Other Services</a>
				</li>


			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'BundledServices', 'action' => 'addBundledService']) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
					<div class="tab-pane request_lab_content" id="borderBox_bundled_request">
						<!-- php: = $this->element('patientvisit/requestbundledservices', ['requestLabs' => $selectedVisit->request_labs, 'requestScans' => $selectedVisit->request_radiologies]) -->
					</div>
				<!-- php: } -->
				<div class="tab-pane request_lab_content" id="borderBox_overview">
					<!-- php: = $this->element('patientvisit/requestoverview') -->
				</div>
				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'addRequestLab']) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
					<div class="tab-pane request_lab_content" id="borderBox_request_lab">
						<!-- php: = $this->element('patientvisit/requestlabservices', ['requestLabs' => $selectedVisit->request_labs, 'requestScans' => $selectedVisit->request_radiologies]) -->
					</div>
					<div class="tab-pane request_lab_content" id="borderBox_request_scan">
						<!-- php: = $this->element('patientvisit/requestscanservices', ['requestLabs' => $selectedVisit->request_labs, 'requestScans' => $selectedVisit->request_radiologies]) -->
					</div>
				<!-- php: } -->

				<div class="tab-pane " id="borderBox_referral">
				<!-- php: = $this->element('patientvisit/requestreferral') -->
				</div>

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'ImmunizationRequest', 'action' => 'requestImmunization']) && !in_array($selectedVisit->patient_visit_purpose_id, [5])) { -->
					<div class="tab-pane request_immunization_content" id="borderBox_request_immunization">
						<!-- php: = $this->element('patientvisit/requestimmunization') -->
					</div>
				<!-- php: } -->

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'addRequestMedication']) && !in_array($selectedVisit->patient_visit_purpose_id, [5])) { -->
					<div class="tab-pane request_medication_content" id="borderBox_request_medication">
						<!-- php: = $this->element('patientvisit/requestmedicationservices') -->
					</div>
				<!-- php: } -->
				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'addRequestMedication']) && !in_array($selectedVisit->patient_visit_purpose_id, [5])) { -->
					<div class="tab-pane request_medication_content" id="borderBox_request_transfusions">
						<!-- php: = $this->element('patientvisit/requesttransfusionservices') -->
					</div>
				<!-- php: } -->
				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'addRequestMedication']) && !in_array($selectedVisit->patient_visit_purpose_id, [5])) { -->
					<div class="tab-pane request_medication_content" id="borderBox_request_optical_services">
						<!-- php: = $this->element('patientvisit/requestotheritemservices') -->
					</div>
				<!-- php: } -->


				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestSurgeries', 'action' => 'addRequestSurgeries']) && !in_array($selectedVisit->patient_visit_purpose_id, [5, 6])) { -->
					<div class="tab-pane request_surgery_content" id="borderBox_request_surgery">
						<!-- php: = $this->element('patientvisit/requestsurgeryservices') -->
					</div>
				<!-- php: } -->

				<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestMedications',]) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
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


<script>
	$(document).ready(function() {

		$('#requestTab a[data-toggle="tab"]').on('shown.bs.tab', function() {
			localStorage.setItem('visitRequestLastTab', $(this).attr('href'));
			triggerActiveTabClick($(this).attr('id'));
		});

		// display last tab if exist
		let vitalsLastTab = localStorage.getItem('visitRequestLastTab');
		if (vitalsLastTab) {
			$('#requestTab a[href=' + vitalsLastTab + ']').tab('show');
		} else {
			// Set the first tab if cookie do not exist
			$('#requestTab a[data-toggle="tab"]:first').tab('show');
		}

		function triggerActiveTabClick(active_tab_id) {
			$('#' + active_tab_id).trigger('click');
		}
	})
</script>
`;

export default function ElementElementPatientvisitRequestservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
