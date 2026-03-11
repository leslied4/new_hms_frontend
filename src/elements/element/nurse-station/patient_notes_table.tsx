const rawHtml = `
<!--main body-->
<!-- php: = $this->Html->css('../assets/plugins/bootstrap-select/css/bootstrap-select.min.css') -->
<style>
	.patient-img {
		border-radius: 50%;
		border: 1px solid #ddd;
		object-fit: cover;
	}

	.diag-list {
		padding-left: 15px;
		margin: 0;
		font-size: 0.9rem;
	}

	.status-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-right: 4px;
	}

	.status-dot.active {
		background-color: red;
	}

	.status-dot.cleared {
		background-color: green;
	}

	#patientDepartment td {
		padding: 5px 8px;
		font-size: 0.9rem;
		vertical-align: middle;
	}

	.badge {
		font-size: 0.75rem;
		padding: 2px 4px;
		margin-right: 2px;
	}

	.btn-xs {
		padding: 1px 5px;
		font-size: 0.75rem;
		line-height: 1.5;
	}

	.btn-group {
		white-space: nowrap;
	}

	/* Fix for badge backgrounds in Bootstrap 5 */
	.bg-primary { 
		background-color: #007bff !important; 
		color: white; 
	}

	.bg-success { 
		background-color: #28a745 !important; 
		color: white; 
	}

	.bg-danger { 
		background-color: #dc3545 !important; 
		color: white; 
	}

	.bg-warning { 
		background-color: #ffc107 !important; 
		color: black; 
	}

	.bg-info { 
		background-color: #17a2b8 !important; 
		color: white; 
	}
	.action-buttons {
		white-space: nowrap;
	}
	.action-buttons .btn {
		font-size: 0.75rem;
		padding: 2px 5px;
		border-radius: 3px;
		transition: all 0.2s;
	}
	.action-buttons .btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 3px rgba(0,0,0,0.1);
	}
	.action-buttons .btn i {
		margin-right: 3px;
		font-size: 0.8rem;
	}
	.btn-outline-success {
		color: #28a745;
		border-color: #28a745;
	}
	.btn-outline-info {
		color: #17a2b8;
		border-color: #17a2b8;
	}
	.btn-outline-pink {
		color: pink;
		border-color: pink;
		background: white;
	}
	.btn-outline-black {
		color: black;
		border-color: black;
		background: white;
	}
</style>
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			
			<div class="card  card-box">
				<div class="card-body ">

					<table class="table table-hover" style="width:100%;" id="patientDepartment">
						<thead>
							<tr>
								<th scope="col"></th>
								<th scope="col">Patient</th>
								<th scope="col">Ward/Bed</th>
								<th scope="col">Updates/Recent Activity</th>
								<th scope="col">Alerts</th>
								<th scope="col">Action List</th>
								<th scope="col">Working Diagnosis</th>
								<th scope="col">Consults & Referrals</th>
								<th scope="col" class="actions"><!-- php: = __('Action') --></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="" id="assigned_doctor"></div>
<div class="" id="care_team"></div>
<div class="" id="bed_movement"></div>
<div class="modal fade" id="preroundingModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Prerounding Modal</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <!-- php: //= $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'sendRecurring']]); -->
                <div class="container bg-white p-2">
                    <div class="container-fluid prerounding">

                    </div>
                </div>
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center py-1 justify-content-end">
                        <!-- <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Send  &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button> -->
                        <!-- php: //= $this->Form->end(); -->
                        <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                            data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                class="fa fa-times text-danger fa-1x"></i> </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="nurseHandoffDialog" role="dialog">
	<div class="modal-dialog modal-lg d-flex justify-content-center" style="">
		<div class="modal-content" style="min-width: 90vw">
			<div class="modal-body nurse_handoff_summary" id="patientBill">
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="nurseNotesDialog" role="dialog">
	<div class="modal-dialog modal-lg d-flex justify-content-center" style="">
		<div class="modal-content" style="">
			<div class="modal-body nurse_notes_summary" id="patientBill">
			</div>
		</div>
	</div>
</div>
<!-- php: =$this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js') -->


<script>
	function getAge(dateString) {
		var ageInMilliseconds = new Date() - new Date(dateString);
		return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
	}
	function getDiagnosisType(row) {
		switch (row) {
			case 1:
				color = 'red';
				badge_color = 'danger'
				value = 'Primary';
				break;
			case 2:
				color = 'green';
				badge_color = 'success'
				value = 'Provisional';
				break;
			case 3:
				color = 'orange';
				badge_color = 'warning'
				value = 'Differential';
				break;

			default:
				color = 'grey';
				badge_color = 'secondary'
				value = 'Other';
				break;
		}
		return \`<span class="badge badge-\${badge_color} " style="background:\${color};color: white">\${value}</span>\`;
	}
	function isWithinPast1_5Days(dateToCheck) {
		const now = new Date();
		const timeThreshold = new Date(now.getTime() - 1.5 * 24 * 60 * 60 * 1000); // Subtract 1.5 days
		return dateToCheck >= timeThreshold && dateToCheck <= now;
	}
	function getQuantityX(admission) {
		const startTime = new Date(admission.admission_start);
		const endTime = admission.admission_end
			? new Date(admission.admission_end)
			: new Date();

		let diffMs = endTime - startTime;

		// If startTime is after endTime, return 0 minutes
		if (diffMs < 0) diffMs = 0;

		const diffMins = Math.floor(diffMs / 60000);
		const days = Math.floor(diffMins / (60 * 24));
		const hours = Math.floor((diffMins % (60 * 24)) / 60);
		const minutes = diffMins % 60;

		const parts = [];

		if (days > 0) {
			parts.push(\`\${days} Day\${days > 1 ? 's' : ''}\`);
		}
		if (hours > 0) {
			parts.push(\`\${hours} Hour\${hours > 1 ? 's' : ''}\`);
		}
		if (minutes > 0 || parts.length === 0) {
			parts.push(\`\${minutes} Minute\${minutes > 1 ? 's' : ''}\`);
		}

		return parts.join(', ');
	}

	function getNurseStationNotesView() {
		table = $('#patientDepartment').DataTable();
        table.destroy();
		$('#patientDepartment').DataTable({
			buttons: ['searchBuilder'],
			dom: 'Qfrtip',
			ordering: false,
			ajax: {
				url: \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewVisitsAdmissions', 'admissionsactive']) -->\`,
				dataSrc: 'data'
			},
			columns: [
				// Patient Image - Compact
				{
					data: "",
					render: function(data, type, row) {
						let imagePath = row?.patient.image?.file_path || 
									((row.patient.gender_id == 2) ? 'dp2.jpg' : 'dp3-.jpg');
						
						return \`<img src="<!-- php: = $this->Url->webroot('img') -->/\${imagePath}" 
								class="patient-img" width="36" height="36" alt="">\`;
					}
				},
				
				// Patient Info - Compact
				{
					data: "",
					render: function(data, type, row) {
						const gender = row?.patient?.gender_id == 1 ? 'Male' : 'Female';
						const age = getAge(row.patient.date_of_birth);
						
						return \`
							<a target="_blank" href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewVisit',]) -->/\${row?.patient?.id}/\${row?.id}" class="">
								\${row?.patient?.first_name} \${row?.patient?.last_name} 
							</a>
								<span class="badge bg-primary">\${gender}</span> 
								\${row.patient.date_of_birth ? '<span class="badge bg-success">' + age + 'y</span>' : ''}
								<span class="badge bg-primary">\${row?.patient?.folder_number}</span>\`;
					}
				},
				
				// Location & Code Status - Compact
				{
					data: "",
					render: function(data, type, row) {
						const colorMap = {
							"Full Code": "#28A745",
							"DNR": "#DC3545",
							"DNI": "#FD7E14",
							"DNR/DNI": "#FFC107",
							"Comfort Measures Only / Hospice Care": "#007BFF",
							"Limited Code / Partial Code": "#6F42C1",
							"Chemical Code": "#343A40",
							"CPR Only": "#795548",
							"Intubation Only": "#EDEDED",
						}
						
						const codeStatus = row.nurse_station_current_statuses.slice(-1)[0]?.code_status || '';
						const ward = row?.patient_visit_admissions.slice(-1)[0]?.bed?.ward?.name || '';
						const bed = row?.patient_visit_admissions.slice(-1)[0]?.bed?.name || '';
						const location = ward && bed ? \`\${ward} | \${bed}\` : 'N/A';
						const los = getQuantityX(row?.patient_visit_admissions.slice(-1)[0])
						
						
						let result = location;
						if(codeStatus) {
							result += \`<br><span class="badge" style="background:\${colorMap[codeStatus]}">\${codeStatus}</span>\`;
						}
						if (los) {
							
							result += \`<br><span class="badge badge-primary" style="">\${los}</span>\`;
						}
						
						return result;
					}
				},
				
				// Recent Activity - Compact
				{
					data: "",
					render: function(data, type, row) {
						const recentVital = row.patient_visit_vitals.find(ele => isWithinPast1_5Days(new Date(ele.date_created)));
						const recentNote = row.patient_visit_nurse_notes.sort((a,b) => new Date(b.date_added) - new Date(a.date_added)).find(ele => isWithinPast1_5Days(new Date(ele.date_added)));
						const recentOdq = row.patient_visit_clinical_encounter_note_odqs.sort((a,b) => new Date(b.date_created) - new Date(a.date_created)).find(ele => isWithinPast1_5Days(new Date(ele.date_created)));
						const recent_tasks = row.patient_visit_nurse_notes.sort((a,b) => new Date(b.date_added) - new Date(a.date_added)).find(ele => {

							return isWithinPast1_5Days(new Date(ele.date_added)) && ele.type == 'heads_up' && !!ele.task_description
						});


						function clean_name(name) {
							if (!name) return 'Unknown';
							return name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
						}
						
						let result = '';
						if(recentVital) {
							const vitalTime = new Date(recentVital.date_created);
							const timeDiff = Math.floor((new Date() - vitalTime) / (1000 * 60)); // Minutes
							let timeLabel = '';
							
							if (timeDiff < 60) {
								timeLabel = \`\${timeDiff}m ago\`;
							} else if (timeDiff < 1440) {
								timeLabel = \`\${Math.floor(timeDiff/60)}h ago\`;
							} else {
								timeLabel = vitalTime.toLocaleString();
							}
							
							const vitalTimeStr = \`<span class="badge bg-primary">\${timeLabel}</span>\`;
							result += \`Vital \${vitalTimeStr}<br>\`;
						}
						
						if(recentNote) {
							const noteTime = new Date(recentNote.date_added);
							const timeDiff = Math.floor((new Date() - noteTime) / (1000 * 60)); // Minutes
							let timeLabel = '';
							
							if (timeDiff < 60) {
								timeLabel = \`\${timeDiff}m ago\`;
							} else if (timeDiff < 1440) {
								timeLabel = \`\${Math.floor(timeDiff/60)}h ago\`;
							} else {
								timeLabel = noteTime.toLocaleString();
							}
							const noteTimeStr = \`<span class="badge bg-primary">\${timeLabel}</span>\`;

							result += \`\${clean_name(recentNote.type)}: \${noteTimeStr}\`;
						}
						console.log("patient_visit_clinical_encounter_note_odqs", recentOdq)
						if(recentOdq) {
							const noteTime = new Date(recentOdq.date_added);
							const timeDiff = Math.floor((new Date() - noteTime) / (1000 * 60)); // Minutes
							let timeLabel = '';
							
							if (timeDiff < 60) {
								timeLabel = \`\${timeDiff}m ago\`;
							} else if (timeDiff < 1440) {
								timeLabel = \`\${Math.floor(timeDiff/60)}h ago\`;
							} else {
								timeLabel = noteTime.toLocaleString();
							}
							const noteTimeStr = \`<span class="badge bg-primary">\${timeLabel}</span>\`;

							result += \`\${clean_name(recentOdq.name)}: \${recentOdq.type}\`;
						}

						if (recent_tasks) {
							// const leresult = recent_tasks.task_description.split('; ').map(task => {

							// 	return \`<li class="">\${task}</li>\`;
							// }).join('')
							// result += \`<ul style="padding: 0">\${leresult}</ul><br>\`;
							const noteTime = new Date(recent_tasks.date_added);
							const timeDiff = Math.floor((new Date() - noteTime) / (1000 * 60)); // Minutes
							let timeLabel = '';
							
							if (timeDiff < 60) {
								timeLabel = \`\${timeDiff}m ago\`;
							} else if (timeDiff < 1440) {
								timeLabel = \`\${Math.floor(timeDiff/60)}h ago\`;
							} else {
								timeLabel = noteTime.toLocaleString();
							}
							const noteTimeStr = \`<span class="badge bg-primary">\${timeLabel}</span>\`;
							result += \`task added\${noteTimeStr}\`
							
						}
						
						return result;
					}
				},
				
				// Risk Factors - Compact
				{
					data: "",
					render: function(data, type, row) {
						const fallRisk = row.nurse_station_current_statuses.slice(-1)[0]?.fall_risk;
						const fallRiskNotes = row.nurse_station_current_statuses.slice(-1)[0]?.fall_risk_notes;
						const infection = row.nurse_station_ongoing_cares?.slice(-1)[0]?.signs_of_infection;
						const precaution = row.nurse_station_ongoing_cares?.slice(-1)[0]?.infection_precautions;
						const safety = row.nurse_station_social_behavioral_factors?.slice(-1)[0]?.safety_alerts;
						
						let result = '';
						if(fallRisk) {
							result += \`Fall Risk: \${fallRiskNotes || 'Yes'}<br>\`;
						}
						if(infection) {
							result += \`Infection: \${infection}<br>\`;
						}
						if(precaution) {
							result += \`Precaution: \${precaution}\`;
						}
						if(safety) {
							result += \`Safety: \${safety}\`;
						}
						
						return result;
					}
				},
				
				// Actions - Compact
				{
					data: "",
					render: function(data, type, row) {
						const action1 = row.patient_visit_nurse_notes.find(ele => ele.action_list)?.action_list;
						const action2 = row.patient_visit_nurse_notes.find(ele => ele.recommendation)?.recommendation;
						
						let result = '';
						if(action1) result += \`\${action1}<br>\`;
						if(action2) result += \`\${action2}\`;
						
						return result;
					}
				},
				
				// Diagnoses - Compact
				{
					data: "",
					render: function(data, type, rows) {
						let result = '<ul class="diag-list">';
						
						rows.patient_visit_diagnoses.forEach(row => {
							// Primary diagnoses
							row?.patient_visit_primary_diagnoses?.forEach(diag => {
								if(diag?.primary_diagnosis) {
									const statusDot = \`<i class="status-dot \${diag.is_cleared ? 'cleared' : 'active'}"></i>\`;
									result += \`<li>\${statusDot}\${diag.primary_diagnosis.name} 
											<span class="badge bg-danger">\${diag.primary_diagnosis.code}</span>
											\${getDiagnosisType(1)} | \${diag.ill_episode}</li>\`;
								}
							});
							
							// Provisional diagnoses
							row?.patient_visit_provisional_diagnoses?.forEach(diag => {
								if(diag?.diagnosis) {
									const statusDot = \`<i class="status-dot \${diag.is_cleared ? 'cleared' : 'active'}"></i>\`;
									result += \`<li>\${statusDot}\${diag.diagnosis.name} 
											<span class="badge bg-danger">\${diag.diagnosis.code}</span>
											\${getDiagnosisType(2)}</li>\`;
								}
							});
							
							// Differential diagnoses
							row?.patient_visit_differential_diagnoses?.forEach(diag => {
								if(diag?.diagnosis) {
									const statusDot = \`<i class="status-dot \${diag.is_cleared ? 'cleared' : 'active'}"></i>\`;
									result += \`<li>\${statusDot}\${diag.diagnosis.name} 
											<span class="badge bg-danger">\${diag.diagnosis.code}</span>
											\${getDiagnosisType(3)}</li>\`;
								}
							});
							
							// Other diagnoses
							row?.patient_visit_other_diagnoses?.forEach(diag => {
								if(diag?.diagnosis) {
									const statusDot = \`<i class="status-dot \${diag.is_cleared ? 'cleared' : 'active'}"></i>\`;
									result += \`<li>\${statusDot}\${diag.diagnosis.name} 
											<span class="badge bg-danger">\${diag.diagnosis.code}</span>
											\${getDiagnosisType(4)}</li>\`;
								}
							});
						});
						
						result += '</ul>';
						return result;
					}
				},
				
				// Consultations - Compact
				{
					data: "",
					render: function(data, type, row) {
						const consultant = row.consultation_requests.slice(-1)[0]?.to?.user;
						const consultantName = consultant ? \`\${consultant.first_name || ''} \${consultant.last_name || ''}\` : '';
						const consultationType = row.consultation_requests.slice(-1)[0]?.consultation?.name || '';
						const visitPurpose = row.patient_visit_purpose?.name || 'Not Set';
						
						return \`\${consultantName}<br>\${consultationType} \${visitPurpose}\`;
					}
				},
				
				// Buttons - Compact
				{
					data: "",
					render: function(data, type, row) {
						return \`<div class="action-buttons d-flex flex-column">
							<div class="btn-group mb-1">
								<button onclick="newNurseNotes('\${row?.id}')" class="btn btn-xs btn-outline-primary">
									Add Note
								</button>
								<button onclick="getNurseRemarks('\${row?.id}')" class="btn btn-xs btn-warning">
									View Notes
								</button>
							</div>
							<div class="btn-group">
								<button onclick="nurseHandoff('\${row?.id}')" class="btn btn-xs btn-outline-success">
									Add Handoff
								</button>
								<button onclick="viewNurseHandoff('\${row?.id}')" class="btn btn-xs btn-outline-info">
									View Handoff
								</button>
							</div>
							<div class="btn-group">
								<button onclick="addPatientSymptoms('\${row?.id}')" class="btn btn-xs btn-outline-pink">
									Add Symptoms
								</button>
								<button onclick="viewPatientSymptoms('\${row?.id}', '\${row?.patient_id}')" class="btn btn-xs btn-outline-black">
									View Symptoms
								</button>
							</div>
						</div>\`;
					}
				}
			],
			responsive: true,
			pageLength: 10,
			// initComplete: function() {
			// 	// Add custom CSS for better compact styling
			// 	$("<style>")
			// 		.prop("type", "text/css")
			// 		.html(\`

			// 		\`)
			// 		.appendTo("head");
			// }
		});
	};

	$(document).ready(() => {
		getNurseStationNotesView()
	})
	
	function togglePreroundingModal(id){
		// alert(id);
		$('.prerounding').load("<!-- php: = Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'prerounding']) -->/" + id, function() {
			$('#preroundingModal').modal({
				show: true
			});
        });
	}
	const nurseHandoff_link = "<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'nurseHandoff']) -->/"
	function nurseHandoff(id) {
		$('.modal-body.nurse_handoff_summary').load(
			nurseHandoff_link + id,
			function () {
				$('#nurseHandoffDialog').modal({
					show: true
				});
			});
	}
	const newNurseNotes_link = "<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'newNurseNotes']) -->/"
	function newNurseNotes(id) {
		$('.modal-body.nurse_notes_summary').load(
			newNurseNotes_link + id,
			function () {
				$('#nurseNotesDialog').modal({
					show: true
				});
			});
	}
	const viewNurseHandoff_link = "<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'viewNurseHandoff']) -->/"
	function viewNurseHandoff(id) {
		$('.modal-body.nurse_handoff_summary').load(
			viewNurseHandoff_link + id,
			function () {
				$('#nurseHandoffDialog').modal({
					show: true
				});
			});
	}
	const addPatientSymptoms_link = "<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'addPatientNurseSymptoms']) -->/"
	function addPatientSymptoms(id) {
		$('.modal-body.nurse_handoff_summary').load(
			addPatientSymptoms_link + id,
			function () {
				$('#nurseHandoffDialog').modal({
					show: true
				});
			});
	}
	const viewAllPatientVOdqs_link = '<!-- php: = $this->Url->build([ 'controller'=> 'NurseStation', 'action'=>'viewPatientNurseSymptoms']) -->/'
	function viewPatientSymptoms(id, patient_id) {
		$('.modal-body.nurse_handoff_summary').load(
			viewAllPatientVOdqs_link + patient_id + '/' + id,
			function () {
				$('#nurseHandoffDialog').modal({
					show: true
				});
			});
	}
</script>

`;

export default function ElementElementNurseStationPatientNotesTable() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
