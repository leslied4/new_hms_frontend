const rawHtml = `
    <style>
        .reported_labSamplesCollected {
            --primary-color: #2c5aa0;
            --secondary-color: #f8f9fa;
            --success-color: #28a745;
            --warning-color: #ffc107;
            --info-color: #17a2b8;
            --border-color: #e9ecef;
            --text-muted: #6c757d;
            --success-light: #d4edda;
            --info-light: #e8f4fd;
        }

        .reported_labSamplesCollected .modal-dialog {
            max-width: 750px;
        }

        .reported_labSamplesCollected .modal-content {
            border: none;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .reported_labSamplesCollected .modal-header {
            background: linear-gradient(135deg, var(--primary-color) 0%, #3d6bb3 100%);
            color: white;
            border-radius: 12px 12px 0 0;
            padding: 1.5rem;
            border-bottom: none;
        }

        .reported_labSamplesCollected .modal-title {
            font-weight: 600;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .reported_labSamplesCollected .close {
            color: white;
            opacity: 0.8;
            border: none;
            background: none;
            font-size: 1.5rem;
            padding: 0;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .reported_labSamplesCollected .close:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.1);
        }

        .reported_labSamplesCollected .modal-body {
            padding: 0;
        }

        .reported_labSamplesCollected .patient-info-section {
            background: var(--secondary-color);
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .reported_labSamplesCollected .patient-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 0;
        }

        .reported_labSamplesCollected .patient-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.25rem;
            font-weight: bold;
        }

        .reported_labSamplesCollected .patient-details h5 {
            margin: 0;
            color: var(--primary-color);
            font-weight: 600;
        }

        .reported_labSamplesCollected .patient-uac {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin: 0.25rem 0 0 0;
        }

        .reported_labSamplesCollected .collection-details-section {
            padding: 2rem;
            border-bottom: 1px solid var(--border-color);
        }

        .reported_labSamplesCollected .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--border-color);
        }

        .reported_labSamplesCollected .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1rem;
        }

        .reported_labSamplesCollected .detail-card {
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            padding: 1.25rem;
            transition: all 0.2s ease;
        }

        .reported_labSamplesCollected .detail-card:hover {
            border-color: var(--primary-color);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.1);
        }

        .reported_labSamplesCollected .detail-label {
            font-weight: 600;
            color: var(--text-muted);
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
        }

        .reported_labSamplesCollected .detail-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            min-height: 1.5rem;
        }

        .reported_labSamplesCollected .volume-detail {
            grid-column: 1 / -1;
        }

        .reported_labSamplesCollected .volume-display {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .reported_labSamplesCollected .volume-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .reported_labSamplesCollected .volume-unit {
            font-size: 1rem;
            color: var(--text-muted);
        }

        .reported_labSamplesCollected .status-badge {
            display: inline-block;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .reported_labSamplesCollected .status-excellent {
            background: #d4edda;
            color: #155724;
        }

        .reported_labSamplesCollected .status-good {
            background: #cce7ff;
            color: #0c5aa6;
        }

        .reported_labSamplesCollected .status-fair {
            background: #fff3cd;
            color: #856404;
        }

        .reported_labSamplesCollected .status-poor,
        .reported_labSamplesCollected .status-compromised {
            background: #f8d7da;
            color: #721c24;
        }

        .reported_labSamplesCollected .actions-section {
            padding: 2rem;
            background: #fafbfc;
        }

        .reported_labSamplesCollected .actions-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .reported_labSamplesCollected .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: 0 auto;
        }

        .reported_labSamplesCollected .btn-action {
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.2s ease;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            text-transform: none;
        }

        .reported_labSamplesCollected .btn-end-tat {
            background: linear-gradient(135deg, var(--warning-color) 0%, #ffca2c 100%);
            color: #856404;
        }

        .reported_labSamplesCollected .btn-end-tat:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
            background: linear-gradient(135deg, #e0a800 0%, #ffc107 100%);
        }

        .reported_labSamplesCollected .btn-mark-reported {
            background: linear-gradient(135deg, var(--success-color) 0%, #34ce57 100%);
            color: white;
        }

        .reported_labSamplesCollected .btn-mark-reported:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            background: linear-gradient(135deg, #218838 0%, #28a745 100%);
        }

        .reported_labSamplesCollected .btn-action:active {
            transform: translateY(0);
        }

        .reported_labSamplesCollected .specimen-name {
            font-weight: 600;
            color: var(--success-color);
        }

        .reported_labSamplesCollected .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, var(--border-color), transparent);
            margin: 1.5rem 0;
        }

        @media (max-width: 768px) {
            .reported_labSamplesCollected .modal-dialog {
                margin: 1rem;
                max-width: calc(100% - 2rem);
            }
            
            .reported_labSamplesCollected .detail-grid {
                grid-template-columns: 1fr;
            }
            
            .reported_labSamplesCollected .patient-info {
                flex-direction: column;
                text-align: center;
            }

            .reported_labSamplesCollected .action-buttons {
                max-width: 100%;
            }
        }
    </style>
<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card card-topline-<!-- php: = $theme1 -->">
								<div class="card-head">
									<header><!-- php: = $isWalkIn ? 'Walk-In Labs' : 'Report As Analysed' --></header>
									<div class="tools">
										<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="row">


								  </div>

								  <div style="clear: both"></div>
									
								  <div class="table-scrollable">
									<table class="table table-hover order-column full-width" id="reported_needsAttentionTable" style="width: 100%">
										<thead>
											<tr>
												<th>Date Created</th>
												<th>Pathology Number</th>
												<th>Patient</th>
												<th>Specimen</th>
												<th>Lab Tests</th>

                                                <th>Action</th>

											</tr>
										</thead>
										<tbody id="reported_loadSpecimenInfo">

										</tbody>
									</table>
									</div>					
					
									<div class="row">
										<div class="col-md-6">
											<span></span>
										</div>

										<div class="col-md-6">
											<div class="dataTables_paginate paging_simple_numbers" style="float: right;">

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
	</div>
</div>

								   
<div class="modal fade reported_labSamplesCollected" id="reported_labSamplesCollected" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="processingModalLabel">
                    Process Samples for Labs: <span class="specimen-name" id="reported_specimen_name">Complete Blood Count</span>
                </h4>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <div class="modal-body">
                <!-- Patient Information Section -->
                <div class="patient-info-section">
                    <div class="patient-info">
                        <div class="patient-avatar">
                            P
                        </div>
                        <div class="patient-details">
                            <h5>Patient: <span id="reported_sample_patient_id">PT-2024-001</span></h5>
                            <p class="patient-uac">UAC: <span id="reported_sample_uac">UAC-2024-12345</span></p>
                        </div>
                    </div>
                </div>

                <!-- Collection Details Section -->
                <div class="collection-details-section">
                    <h5 class="section-title">Collection Details</h5>
                    
                    <div class="detail-grid">
                        <div class="detail-card">
                            <div class="detail-label">Turn Around Time</div>
                            <div class="detail-value" id="reported_display_turn_around_time"></div>
                        </div>
                        <div class="detail-card">
                            <div class="detail-label">Collection Type</div>
                            <div class="detail-value" id="reported_display_collection_type"></div>
                        </div>
                        
                        <div class="detail-card">
                            <div class="detail-label">Specimen Condition at Collection</div>
                            <div class="detail-value">
                                <span class="status-badge status-excellent" id="reported_display_specimen_condition">Excellent</span>
                            </div>
                        </div>
                        
                        <div class="detail-card volume-detail">
                            <div class="detail-label">Specimen Volume</div>
                            <div class="detail-value">
                                <div class="volume-display">
                                    <span class="volume-number" id="reported_display_specimen_volume">5.0</span>
                                    <span class="volume-unit" id="reported_display_volume_unit">mL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
</div>


<script>
    // function getReportedSamples() {
    //     $.ajax({
    //         type: 'GET',
    //         url: "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestLabs', 'action' => 'specimenInformation' ] ); -->/4",
    //         data: {},
    //         cache: false,
    //         success: function (res) {
    //             $('#reported_loadSpecimenInfo').empty()
    //             if (Array.isArray(res)) {
    //                 let specimen = res.reduce((acc, curr) => {
    //                     let id = curr.id + curr.specimen_name
    //                     if (!(id in acc)) {
    //                         acc[id] = {
    //                             ...curr,
    //                             labs: [
    //                                 curr.lab_name
    //                             ]
    //                         }
    //                     } else {
    //                         acc[id]['labs'].push(curr.lab_name)
    //                     }
    //                     return acc
    //                 }, {})
    //                 let result = []
    //                 console.log("Object.values(specimen)", Object.values(specimen))
    //                 Object.values(specimen).forEach((ele, index) => {
    //                     let lab_info = ele.labs.reduce((acc, curr, index) => {
    //                         acc+=\`\${index+1}. \${curr}<br/>\`
    //                         return acc
    //                     }, '')
    //                     let encoded = JSON.stringify({
    //                         name: ele.patient_name,
    //                         uac: ele.code,
    //                         specimen_name: ele.specimen_name,
    //                         sample_id: ele.sample_id,
    //                         request_id: ele.lab_request_id
    //                     })
    //                     result.push(\`
    //                         <tr>
    //                             <td>\${moment(ele.request_date).format('d-MM-YYYY HH:MM')}</td>
    //                             <td>\${ele.pathology_number}</td>
    //                             <td>\${ele.patient_name} <span class="badge badge-pill">\${ele.patient_age} yrs</span><span class="badge badge-pill">\${ele.patient_folder}</span></td>
    //                             <td>\${ele.specimen_name}</td>
    //                             <td>\${lab_info}</td>
    //                             <td>
    //                                 <button class="btn btn-primary btn-xs">view</button>
    //                                 <button onclick='updateReportedModal(\${encoded})' class="btn btn-info btn-xs" data-toggle="modal" data-target="#labSamplesCollected">collect</button>
    //                             </td>
    //                         </tr>
    //                     \`)
    //                 });

    //                 table = $('#reported_needsAttentionTable').DataTable()
    //                 table.destroy()
    //                 // $('#reported_loadSpecimenInfo').empty()

    //                 $('#reported_loadSpecimenInfo').html(result.join(""))
    //                 $('#reported_needsAttentionTable').DataTable({})
    //             }

    //         }
    //     });
    // }
    function getReportedSamples() {
        table = $('#reported_needsAttentionTable').DataTable();
		table.destroy();
		$('#reported_needsAttentionTable').DataTable({
			"ordering": false,
			"processing": false,
            "serverSide": false,
			ajax: {
				url: '<!-- php: echo $this->Url->build( [ 'controller' => 'RequestLabs', 'action' => 'specimenInformation' ] ); -->/4',
				dataSrc: ''
			},
			columns: [
				{
					data: "date_created",
					render: function (data, type, row) {
						return \`<div class="outlined-text">\${moment(row?.request_date).format('DD/MM/YYYY, hh:mm A')}</div>\`
					},
				},
				{ data: "pathology_number", render: (data, type, row) => {
                    return \`<div class="outlined-text">\${row.pathology_number}</div>\`
                }},
				{
					data: "date_created",
					render: function (data, type, row) {
						return \`<div class="outlined-text">\${row.patient_name} <span class="badge badge-pill">\${row.patient_age} yrs</span><span class="badge badge-pill">\${row.patient_folder}</span></div>\`
					},
				},
                { data: "specimen_name", render: (data, type, row) => {
                    return \`<div class="outlined-text">\${row.specimen_name}</div>\`
                }},
                // { data: "waiting_time", render: (data, type, row) => {
                //     return \`<div class="outlined-text">\${row.waiting_time}</div>\`
                // }},
				{
					data: "status_id",
					render: function (data, type, row) {
                        let acc = {}
                        let curr = row
                        let id = curr.id + curr.specimen_name
                        if (!(id in acc)) {
                            acc[id] = {
                                ...curr,
                                labs: [
                                    curr.lab_name
                                ],
                                'requests': [
                                    curr.lab_request_id
                                ]
                            }
                        } else {
                            acc[id]['labs'].push(curr.lab_name)
                            acc[id]['requests'].push(curr.lab_request_id)
                        }


						let lab_info = acc[id].labs.reduce((acc, curr, index) => {
                            acc+=\`\${index+1}. \${curr}<br/>\`
                            return acc
                        }, '')

						return lab_info
					},
				},
				{
					data: "status_id",
					render: function (data, type, row) {
                        let acc = {}
                        let curr = row
                        let id = curr.id + curr.specimen_name
                        if (!(id in acc)) {
                            acc[id] = {
                                ...curr,
                                labs: [
                                    curr.lab_name
                                ],
                                'requests': [
                                    curr.lab_request_id
                                ]
                            }
                        } else {
                            acc[id]['labs'].push(curr.lab_name)
                            acc[id]['requests'].push(curr.lab_request_id)
                        }

						let encoded = JSON.stringify({
                            name: row.patient_name,
                            uac: row.code,
                            specimen_name: row.specimen_name,
                            sample_id: row.sample_id,
                            request_id: row.lab_request_id,
                            requests: acc[id].requests,
                            display_collection_type: row.collection_type,
                            display_specimen_condition: row.specimen_condition,
                            display_specimen_volume: row.specimen_volume,
                            reported_display_collection_type: row.collection_type,
                            reported_display_specimen_condition: row.specimen_condition,
                            reported_display_specimen_volume: row.specimen_volume,
                            reported_display_specimen_volume: row.specimen_volume,
                            reported_display_turn_around_time: row.turn_around_time,
                        })

						return \`<button onclick='updateReportedModal(\${encoded})' class="btn btn-info btn-xs" data-toggle="modal" data-target="#reported_labSamplesCollected">reported</button>\`
					},
				},
                { data: "patient_folder", visible: false, searchable: true }
			],
            createdRow: function(row, data, dataIndex) {
                if(data.specimen_color) {
                    $(row).css('background-color', data.specimen_color);
                }
            }
            
		});
    }
    function updateReportedModal(params) {
        console.log("params" ,typeof(params.name))
        $('#reported_sample_patient_id').html(params.name)
        $('#reported_sample_uac').html(params.uac)
        $('#reported_specimen_name').html(params.specimen_name)
        $('#reported_sample_id').val(params.sample_id)
        $('#reported_request_id').val(params.request_id)
        $('#reported_display_collection_type').html(params.reported_display_collection_type)
        $('#reported_display_specimen_condition').html(params.reported_display_specimen_condition)
        $('#reported_display_specimen_volume').html(params.reported_display_specimen_volume)
        $('#reported_display_turn_around_time').html(params.reported_display_turn_around_time)
    }
    $(document).ready(function() {
        getReportedSamples()
    })
</script>
`;

export default function ElementElementRequestLabsReported() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
