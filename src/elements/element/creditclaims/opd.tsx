const rawHtml = `
<div class="row">
	<div class="col-md-12">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card card-topline-<!-- php: = $theme1 -->">
								<div class="card-head">
										<header>OPD Coding</header>
									<div class="tools">
										<a class="fa fa-repeat btn-color box-refresh" id="reset" href="javascript:;"></a>
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body row">
									<div class="col-md-7">
									</div>
									<div class="col-md-5">

									</div>
								</div>
								<div class="card-body">
								  <div class="row">

								  </div>

								  <div style="clear: both"></div>

									<table border="0" cellspacing="5" cellpadding="5">
										<tbody>
											<tr>
												<td>Start date:</td>
												<td><input type="date" id="min" name="min" class="form-control"></td>
												<td>End date:</td>
												<td><input type="date" id="max" name="max" class="form-control"></td>
											</tr>
										</tbody>
									</table>
									
								  <div class="table-scrollable">
									<table class="table table-hover order-column full-width table-checkable" id="credit-claims-opd-table">
										<thead>
											<tr>
												<th scope="col"></th>
												<th scope="col"></th>
												<th scope="col">Patient</th>
												<th scope="col">Age(Sex)(Folder)</th>
												<th scope="col">Visit Date</th>
												<th scope="col">MDC</th>
												<!-- <th scope="col">Diagnosis</th>
												<th scope="col">Service Type</th>
												<th scope="col">III Episode</th> -->
												<th scope="col">Payer</th>
												<!-- <th scope="col">Co Pay</th> -->
												<!-- <th scope="col">To Pay -->
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>

										</tbody>
									</table>
									</div>					

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="" id="">
	<div class="modal fade" id="careTeamOpd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Care Team</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" id="careTeamModalBodys">
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="extraInfoOpd" tabindex="-1" role="dialog" aria-labelledby="exampleModaL" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModaL">Extra Information and Care Team</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<h4 class="pl-2">Extra Information</h4>
				<div class="pl-2" id="setInformationOpdModal">
					None
				</div>
				<h4 class="pl-2">Care Team</h4>
				<div class="pl-2" id="careTeamModalBody">
					None
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- php: = $this->Html->script('../assets/plugins/datatables/jquery.dataTables.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/dataTables.buttons.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/jszip.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/pdfmake.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.html5.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/vfs_fonts.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.print.min.js'); -->
<script>
	function dateDifference(days) {
		color = "";
		status = '';
		if(days >= 20){ 
			color = "danger";
			status = 'Overdue';
		}else if(days >= 10){
			color = "#FFA07A";
		}else if(days < 10){ 
			color = "#98FB98";
			status = 'New';
		}
		return {color: color, status: status}
	}
	count = 0
	function careTeamOpd(row) {
		row = row.split("|||")
		sections = []
		row.forEach(auditor => {
			sections.push(\`<div class="" style="font-weight:bold">\${auditor}</div>\`)
		});
		sections = [...new Set(sections)]
		htmlData = ''
		sections.forEach(section => {
			htmlData += section
		});
		$('#careTeamModalBody').html(htmlData)
	}
	function getAge(dateString) {
		var ageInMilliseconds = new Date() - new Date(dateString);
		return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
	}
	function getDiagnosesOpd(data) {
		let resultArray = [] 
		let result = ''
		data?.patient_visit?.patient_visit_diagnoses?.forEach(row => {
			result = '<ul style="padding:0">'
			if (row?.patient_visit_primary_diagnoses && row?.patient_visit_primary_diagnoses.length > 0) {
				row?.patient_visit_primary_diagnoses?.forEach(primaryDiagnosis => {
					result+="<li>"
					if (primaryDiagnosis?.primary_diagnosis != undefined) {
						result += \`\${primaryDiagnosis?.primary_diagnosis?.name} <span class="badge badge-danger">\${primaryDiagnosis?.primary_diagnosis?.code}</span>
						\${getDiagnosisType(1)} \${\`| \${primaryDiagnosis.ill_episode}\`}\`
						resultArray.push(\`\${primaryDiagnosis?.primary_diagnosis?.name} \${primaryDiagnosis.ill_episode || ''}---1---\${primaryDiagnosis?.primary_diagnosis?.code}\`)
					} else {
						result += 'N/A'
					}
					result+="</li>"
				});
			}
			if (row?.patient_visit_provisional_diagnoses && row?.patient_visit_provisional_diagnoses.length > 0) {
				row?.patient_visit_provisional_diagnoses?.forEach(prDiagnosis => {
					result+="<li>"
					if (prDiagnosis?.diagnosis != undefined) {
						result += \`\${prDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${prDiagnosis?.diagnosis?.code}</span>
						\${getDiagnosisType(2)}\`
						resultArray.push(\`\${prDiagnosis?.diagnosis?.name} ---2---\${prDiagnosis?.diagnosis?.code}\`)
					} else {
						result += 'N/A'
					}
					result+="</li>"
				});
			}
			if (row?.patient_visit_differential_diagnoses && row?.patient_visit_differential_diagnoses.length > 0) {
				row?.patient_visit_differential_diagnoses?.forEach(dDiagnosis => {
					result+="<li>"
					if (dDiagnosis?.diagnosis != undefined) {
						result += \`\${dDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${dDiagnosis?.diagnosis?.code}</span>
						\${getDiagnosisType(3)}\`
						resultArray.push(\`\${dDiagnosis?.diagnosis?.name} ---3---\${dDiagnosis?.diagnosis?.code}\`)
					} else {
						result += 'N/A'
					}
					result+="</li>"
				});
			}
			if (row?.patient_visit_other_diagnoses && row?.patient_visit_other_diagnoses.length > 0) {
				row?.patient_visit_other_diagnoses?.forEach(oDiagnosis => {
					result+="<li>"
					if (oDiagnosis?.diagnosis != undefined) {
						result += \`\${oDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${oDiagnosis?.diagnosis?.code}</span>
						\${getDiagnosisType(4)}\`
						resultArray.push(\`\${oDiagnosis?.diagnosis?.name} ---4---\${oDiagnosis?.diagnosis?.code}\`)
					} else {
						result += 'N/A'
					}
					result+="</li>"
				});
			}
			result+=\`</ul>\`
		});

		return resultArray
	}
	function setInformationOpdModal(data) {
		let result = ''
		result = '<ul style="padding:0">'
		data.split('|||').forEach(element => {

			const [ diagnosis, type ,code ] = element.split('---')

			if (diagnosis) {
				result += \`<li>\${diagnosis} \${getDiagnosisType(type)} <span class="badge badge-danger">\${code}</span></li>\`
			}
		});
		result += '</ul>'
		$('#setInformationOpdModal').html(result)
	}
	function parseDateStringToDate(dateString) {
		// Splitting the date string to extract day, month, year, hour, minute
		var parts = dateString.split(/[\/, :]/);

		// Adjusting the month value since JavaScript Date object months are zero-indexed
		var month = parseInt(parts[1], 10) - 1;

		// Checking if it's AM or PM and adjusting hour value accordingly
		var hour = parseInt(parts[3], 10);
		if (parts[4] === "PM" && hour < 12) {
			hour += 12;
		}

		// Creating the Date object
		var date = new Date(parts[2], month, parts[0]);

		return date;
	}
	function getOpdCreditClaims() {
		table = $('#credit-claims-opd-table').DataTable();
		table.destroy();

		let minDate, maxDate;
 
		// Custom filtering function which will search data in column four between two values
		DataTable.ext.search.push(function (settings, data, dataIndex) {
			let min = minDate.val();
			let max = maxDate.val();
			let leDate = (parseDateStringToDate(data[4])).getTime();

			if (
				(min === '' && max === '') ||
				(min === '' && leDate <= max) ||
				(new Date(min).getTime() <= leDate && new Date(max).getTime() === '') ||
				(new Date(min).getTime() <= leDate && leDate <= new Date(max).getTime())
			) {
				return true;
			}
			return false;
		});

		// Create date inputs
		minDate = ($('#min'));
		maxDate = ($('#max'));


		$('#credit-claims-opd-table').DataTable({
			buttons:[
				{
					text: 'Assigned',
					action: function ( e, dt, node, config ) {
						$('#credit-claims-opd-table').DataTable()
							.columns(7)
							.search('Assigned')
							.draw();
					},
					className: 'btn btn-sm btn-warning mr-2'
				},
				{
					text: 'Waiting',
					action: function ( e, dt, node, config ) {
						$('#credit-claims-opd-table').DataTable()
							.columns(7)
							.search('Waiting')
							.draw();
					},
					className: 'btn btn-sm btn-warning mr-2'
				},
				{
					text: 'Completed',
					action: function ( e, dt, node, config ) {
						$('#credit-claims-opd-table').DataTable()
							.columns(7)
							.search('Completed')
							.draw();
					},
					className: 'btn btn-sm btn-warning mr-2'
				},
				{
					extend: 'collection',
					text: 'Payer',
					className: 'btn btn-sm btn-warning mr-2 dropdown-toggle',
					buttons: [
						{ 
							text: 'MTN',
							action: function ( e, dt, node, config ) {
								$('#credit-claims-opd-table').DataTable().columns(6).search("MTN").draw();
							},
							className: 'btn btn-sm btn-warning dropdown-item'

						},
						{ 
							text: 'NHIS',
							action: function ( e, dt, node, config ) {

								$('#credit-claims-opd-table').DataTable().columns(6).search("NHIS").draw();
							},
							className: 'btn btn-sm btn-warning dropdown-item'
						},
					],
					fade: true
				},
				{
					extend: 'collection',
					text: 'MDC',
					className: 'btn btn-sm btn-warning mr-2 dropdown-toggle',
					buttons: [
						{ 
							text: 'General',
							action: function ( e, dt, node, config ) {
								$('#credit-claims-opd-table').DataTable().columns(5).search("General").draw();
							},
							className: 'btn btn-sm btn-warning dropdown-item'

						},
						{ 
							text: 'Maternal',
							action: function ( e, dt, node, config ) {
								$('#credit-claims-opd-table').DataTable().columns(5).search("Maternal").draw();
							},
							className: 'btn btn-sm btn-warning dropdown-item'
						},
					],
					fade: true
				},
				{
					text: 'Refresh',
					action: function ( e, dt, node, config ) {
						$('#credit-claims-opd-table').DataTable().columns().search("").draw();
					},
					className: 'btn btn-sm btn-warning mr-2'
				},
			],
			dom: 'Bfrtip',
			"ordering": false,
			"processing": true,
			"serverSide": true,
			ajax:  {
				url: "<!-- php: = $this->Url->build(['controller' => 'CreditClaims', 'action' => 'creditClaimsInfo', '?' => ['_location' => 'opd']]) -->",
				dataSrc: 'data'
			},
			columns: [
				{
					data: "date_created",
					render: function(data, type, row) {
						let currentDate = moment(new Date())
						let dateAdded =  currentDate.diff(moment(row?.date_added), 'days')
						let result = dateDifference(dateAdded)
						return \`<span class="badge badge-\${result.color}">\${result.status}</span>\`
					},
					width:"20%"
				},
				{
					data: "",
					render: function(data, type, row) {
						result = ''
						if (row?.patient_visit?.patient?.image != undefined) {
							result = row.patient_visit?.patient?.image?.file_path
						}else{
							result = (row.patient_visit?.patient?.gender_id == 2) ? 'dp2.jpg' : 'dp3-.jpg'
						}
						return 	\`
							<img src="<!-- php: = $this->Url->webroot('img') -->/\${result}" width="40px" height="40px" style="border-radius: 50% 50% 50% 50%;" alt="">
						\`
					}
				},
				{
					data: "",
					render: function(data, type, row) {
						return \`\${row.patient_visit?.patient?.first_name} \${row.patient_visit?.patient?.last_name}\` 
					}
				},
				{
					data: "",
					render: function(data, type, row) {
						gender = row?.patient_visit?.patient?.gender_id == 1 ?  'Male': 'Female' 
						age = getAge(row.patient_visit?.patient.date_of_birth)
						return \`\${row.patient_visit?.patient.date_of_birth == undefined ? '': '<span class="badge badge-success">' + age + ' yrs </span>  <span class="badge badge-danger">'+ gender +'</span><span class="badge badge-info">' + row?.patient_visit?.patient?.folder_number + '</span>'}\` 
					}
				},
				{
					data: "",
					render: function(data, type, row) {
							return moment(row?.patient_visit?.date_created).format('DD/MM/YYYY, hh:mm A')
					},
				},
				{
					data: "",
					render: function(data, type, row) {
							return row?.patient_visit?.patient_visit_purpose?.name || ''
					},
				},
				// {
				// 	data: "",
				// 	render: function(data, type, row) {
				// 			return \`Diagnosis\`
				// 	},
				// },
				// {
				// 	data: "",
				// 	render: function(data, type, row) {
				// 			return \`<span class='badge badge-secondary'>Bundled</span><br>\`
				// 	},
				// },
				// {
				// 	data: "",
				// 	render: function(data, type, row) {
				// 			return \`<span class='badge badge-secondary'>Acute</span><br>\`
				// 	},
				// },
				{
					data: "",
					render: function(data, type, row) {
							// return row?.insurance_profile_policy == -1 ? '': row?.insurance_profile_policy?.insurance_profile?.name
							return row?.insurance_profile_policy?.insurance_profile?.name || ''
					},
				},
				// {
				// 	data: "",
				// 	render: function(data, type, row) {
				// 			return row?.co_payment == 1  ? "<span class='badge badge-primary'>Co Pay</span>" : ""
				// 	},
				// },
				// {
				// 	data: "",
				// 	render: function(data, type, row) {
				// 			return row?.final_amount || ''
				// 	},
				// },
				{
					data: "",
					render: function(data, type, row) {
						// sections = []
						// row?.patient_visit?.patient_visit_audits.forEach(audit => {
						// 	sections.push(\`\${audit.user.first_name + ' ' + audit.user.last_name  + ' (' + audit.user.role.name + ')'}\`)
						// });
						// sections = [...new Set(sections)]

						// // let button = \`
						// // 	<button type="button" class="btn btn-xs btn-info" data-toggle="modal" onclick="careTeamOpd('\${sections.join('|||')}');$('#careTeamOpd').modal('show');" data-target="#careTeamOpd">
						// // 		<i class="fa fa-users" aria-hidden="true"></i>
						// // 	</button> 
						// //\`
						// let extraInfoButton = \`
						// 	<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" onClick="javacript:setInformationOpdModal('\${getDiagnosesOpd(row).join('|||')}');careTeamOpd('\${sections.join('|||')}');$('#extraInfoOpd').modal('show');" data-target="#extraInfoOpd">
						// 		More
						// 	</button>
						// \`
						let viewOpd = \`
							<a href="<!-- php: =$this->Url->build(['controller'=>'CreditClaims','action'=>'viewClaimDetails']) -->/\${row.id}" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">Coding</a>
						\`
						return viewOpd
					}
				},
			]
		});
	}
	$(document).ready(function () {
		$('#min').on('change', function () {
			getOpdCreditClaims();

		})
		$('#max').on('change', function () {
			getOpdCreditClaims();

		})
	})
</script>

`;

export default function ElementElementCreditclaimsOpd() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
