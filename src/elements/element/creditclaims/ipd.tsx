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
									<header>IPD Coding</header>
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
												<td><input type="date" id="pmin" name="min" class="form-control"></td>
												<td>End date:</td>
												<td><input type="date" id="pmax" name="max" class="form-control"></td>
											</tr>
										</tbody>
									</table>
									
								  <div class="table-scrollable">
									<table class="table table-hover order-column full-width table-checkable" id="ipd_table">
										<thead>
											<tr>
												<!-- <th scope="col">#</th> -->
												<th scope="col"></th>
												<th scope="col"></th>
												<th scope="col">Patient</th>
												<th scope="col">Age(Folder)</th>
												<th scope="col">Date</th>
												<th scope="col">LOS</th>
												<th scope="col">MDC</th>
												<th scope="col">Ward(Bed)</th>
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
					
									<!-- <div class="row">
										<div class="col-md-6">
											<span><!-- php: $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) --></span>
										</div>

										<div class="col-md-6">
											<div class="dataTables_paginate paging_simple_numbers" style="float: right;">
												<ul class="pagination">
													<!-- php: $this->Paginator->prev(__('previous')) -->
													<!-- php: $this->Paginator->numbers() -->
													<!-- php: $this->Paginator->next(__('next')) -->
												</ul>
											</div>
										</div>
									</div> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="modal fade" id="careTeamIpd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Care Team</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body" id="careTeamIpdModalBody">
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="extra_info_ipd" tabindex="-1" role="dialog" aria-labelledby="exampleModaL" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModaL">Extra Information and Care Team</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<h4 class="pl-2">Extra Information</h4>
					<div class="pl-2" id="extra_info_ipd_modal_body">
						Information Modal
					</div>
					<h4 class="pl-2">Care Team</h4>
					<div class="pl-2" id="careTeamModalBody">
						Care Team
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
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
	$(function() {
		$("td[colspan=13]").hide();
		$("table").click(function(event){
			event.stopPropagation();
			var $target = $(event.target);
			if($target.closest("td").attr("colspan") > 1 ){
				$target.slideUp();
			}else{
				$target.closest("tr").next().find("td[colspan=13]").slideToggle();
			}                    
		});
	});

	$("#status_filter_ipd").change(function(){
		var status = $(this).children('option:selected').val();
		$("tr.mainipd").each(function(){
			if(status == "All"){
				$(this).removeAttr('hidden');
			}else{
				if($(this).attr('id') != status){
				$(this).attr('hidden', 'hidden');
				}else{
					$(this).removeAttr('hidden');
				}
			}
		});
	});

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
	function careTeam(row) {
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
	function getDiagnosisType(row) {
		switch (row) {
			case '1':
				color = 'red';
				badge_color = 'danger'
				value = 'Primary';
				break;
			case '2':
				color = 'green';
				badge_color = 'success'
				value = 'Provisional';
				break;
			case '3':
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
	function getDiagnosesIpd(data) {
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
	function setInformationModal(data) {
		let result = ''
		result = '<ul style="padding:0">'
		data.split('|||').forEach(element => {

			const [ diagnosis, type ,code ] = element.split('---')

			if (diagnosis) {
				result += \`<li>\${diagnosis} \${getDiagnosisType(type)} <span class="badge badge-danger">\${code}</span></li>\`
			}
		});
		result += '</ul>'
		$('#extra_info_ipd_modal_body').html(result)
	}
	function getIpdCreditClaims() {
		table = $('#ipd_table').DataTable();
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
		minDate = ($('#pmin'));
		maxDate = ($('#pmax'));

		$('#ipd_table').DataTable({
			buttons:[
				{
					text: 'Assigned',
					action: function ( e, dt, node, config ) {
						$('#ipd_table').DataTable()
							.columns(7)
							.search('Assigned')
							.draw();
					},
					className: 'btn btn-sm btn-warning mr-2'
				},
				{
					text: 'Waiting',
					action: function ( e, dt, node, config ) {
						$('#ipd_table').DataTable()
							.columns(7)
							.search('Waiting')
							.draw();
					},
					className: 'btn btn-sm btn-warning mr-2'
				},
				{
					text: 'Completed',
					action: function ( e, dt, node, config ) {
						$('#ipd_table').DataTable()
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
								$('#ipd_table').DataTable().columns(7).search("MTN").draw();
							},
							className: 'btn btn-sm btn-warning dropdown-item'

						},
						{ 
							text: 'NHIS',
							action: function ( e, dt, node, config ) {
								$('#ipd_table').DataTable().columns(7).search("NHIS").draw();
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
								$('#ipd_table').DataTable().columns(5).search("General").draw();
							},
							className: 'btn btn-sm btn-warning dropdown-item'

						},
						{ 
							text: 'Maternal',
							action: function ( e, dt, node, config ) {
								$('#ipd_table').DataTable().columns(5).search("Maternal").draw();
							},
							className: 'btn btn-sm btn-warning dropdown-item'
						},
					],
					fade: true
				},
				{
					text: 'Refresh',
					action: function ( e, dt, node, config ) {
						$('#ipd_table').DataTable().columns(7).search("").draw();
					},
					className: 'btn btn-sm btn-warning mr-2'
				},
			],
			dom: 'Bfrtip',
			"ordering": false,
			"processing": true,
			"serverSide": true,
			ajax:  {
				url: "<!-- php: = $this->Url->build(['controller' => 'CreditClaims', 'action' => 'creditClaimsInfo', '?' => ['_location' => 'ipd']]) -->",
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
						return \`\${row.patient_visit?.patient.name}\` 
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
							return moment(row?.date_added).format('DD/MM/YYYY, hh:mm A')
					},
				},
				//los
				{
					data: "",
					render: function(data, type, row) {
						// let now = new Date();
						// let admission_start = row?.patient_visit?.patient_visit_admissions[0]?.admission_start || ''
						var a = moment(new Date());
						var b = moment(row?.patient_visit?.patient_visit_admissions[0]?.admission_start || '');
						var los = 'stayed ' + a.diff(b, 'days') + ' days'
						console.log('LOS')
						console.log(a)
						console.log(b)
						console.log(los)
						return los
					},
				},

				{
					data: "",
					render: function(data, type, row) {
							return row?.patient_visit?.patient_visit_purpose?.name || ''
					},
				},
				{
					data: "",
					render: function(data, type, row) {
							let ward = row?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name || ''
							let bed = row?.patient_visit?.patient_visit_admissions[0]?.bed?.name || ''
							let price = row?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.price || ''
							return \`\${ward} \${bed}\`
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
				// 		console.log(row)
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
						// 	sections.push(\`\${audit.user.first_name + ' ' + audit.user.last_name}\`)
						// });
						// sections = [...new Set(sections)]
						// getDiagnosesIpd(row)
						// // let button = \`
						// // 	<button type="button" class="btn btn-xs btn-info" data-toggle="modal" onclick="careTeam('\${sections.join('|||')}', '#careTeamIpd');$('#careTeamIpd').modal('show');" data-target="#careTeamIpd">
						// // 		<i class="fa fa-users" aria-hidden="true"></i>
						// // 	</button> 
						// // \`
						// let extraInfoButton = \`<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" onClick="javacript:setInformationModal('\${getDiagnosesIpd(row).join('|||')}');careTeam('\${sections.join('|||')}', '#careTeamIpd');$('#extra_info_ipd').modal('show')" data-target="#extra_info_ipd">
						// 	More
						// </button>\`
						let viewIpd = \`
							<a href="<!-- php: =$this->Url->build(['controller'=>'CreditClaims','action'=>'viewClaimDetailsInpatient']) -->/\${row.id}" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">View</a>
						\`
						return viewIpd
					}
				},
			]
		});
	}
	$(document).ready(function () {

		$('#pmin').on('change', function () {

			getIpdCreditClaims();

		})
		$('#pmax').on('change', function () {

			getIpdCreditClaims();

		})
	})
</script>

`;

export default function ElementElementCreditclaimsIpd() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
