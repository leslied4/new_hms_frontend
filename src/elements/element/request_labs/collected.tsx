const rawHtml = `
    <style>
        .specimen-received-modal {
            --primary-color: #2c5aa0;
            --secondary-color: #f8f9fa;
            --accent-color: #28a745;
            --warning-color: #ffc107;
            --border-color: #e9ecef;
            --text-muted: #6c757d;
            --success-light: #d4edda;
            --info-light: #e8f4fd;
        }

        .specimen-received-modal .modal-dialog {
            max-width: 700px;
        }

        .specimen-received-modal .modal-content {
            border: none;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .specimen-received-modal .modal-header {
            background: linear-gradient(135deg, var(--primary-color) 0%, #3d6bb3 100%);
            color: white;
            border-radius: 12px 12px 0 0;
            padding: 1.5rem;
            border-bottom: none;
        }

        .specimen-received-modal .modal-title {
            font-weight: 600;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .specimen-received-modal .close {
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

        .specimen-received-modal .close:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.1);
        }

        .specimen-received-modal .modal-body {
            padding: 0;
        }

        .specimen-received-modal .patient-info-section {
            background: var(--secondary-color);
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .specimen-received-modal .patient-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .specimen-received-modal .patient-avatar {
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

        .specimen-received-modal .patient-details h5 {
            margin: 0;
            color: var(--primary-color);
            font-weight: 600;
        }

        .specimen-received-modal .patient-uac {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin: 0.25rem 0 0 0;
        }

        .specimen-received-modal .instruction-banner {
            background: var(--success-light);
            border-left: 4px solid var(--accent-color);
            padding: 0.75rem 1rem;
            margin: 0;
            border-radius: 0 4px 4px 0;
        }

        .specimen-received-modal .instruction-banner p {
            margin: 0;
            color: #155724;
            font-weight: 500;
        }

        .specimen-received-modal .collection-details-section {
            padding: 2rem;
        }

        .specimen-received-modal .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--border-color);
        }

        .specimen-received-modal .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .specimen-received-modal .detail-card {
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            padding: 1.25rem;
            transition: all 0.2s ease;
        }

        .specimen-received-modal .detail-card:hover {
            border-color: var(--primary-color);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.1);
        }

        .specimen-received-modal .detail-label {
            font-weight: 600;
            color: var(--text-muted);
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
        }

        .specimen-received-modal .detail-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            min-height: 1.5rem;
        }

        .specimen-received-modal .volume-detail {
            grid-column: 1 / -1;
        }

        .specimen-received-modal .volume-display {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .specimen-received-modal .volume-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .specimen-received-modal .volume-unit {
            font-size: 1rem;
            color: var(--text-muted);
        }

        .specimen-received-modal .status-badge {
            display: inline-block;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .specimen-received-modal .status-excellent {
            background: #d4edda;
            color: #155724;
        }

        .specimen-received-modal .status-good {
            background: #cce7ff;
            color: #0c5aa6;
        }

        .specimen-received-modal .status-fair {
            background: #fff3cd;
            color: #856404;
        }

        .specimen-received-modal .status-poor,
        .specimen-received-modal .status-compromised {
            background: #f8d7da;
            color: #721c24;
        }

        .specimen-received-modal .submit-section {
            padding: 1.5rem 2rem;
            background: var(--secondary-color);
            border-top: 1px solid var(--border-color);
            border-radius: 0 0 12px 12px;
            display: flex;
            justify-content: center;
        }

        .specimen-received-modal .btn-confirm {
            background: linear-gradient(135deg, var(--accent-color) 0%, #34ce57 100%);
            border: none;
            color: white;
            padding: 0.875rem 2.5rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.2s ease;
            min-width: 200px;
        }

        .specimen-received-modal .btn-confirm:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            background: linear-gradient(135deg, #218838 0%, #28a745 100%);
        }

        .specimen-received-modal .btn-confirm:active {
            transform: translateY(0);
        }

        .specimen-received-modal .specimen-name {
            font-weight: 600;
            color: var(--accent-color);
        }

        @media (max-width: 768px) {
            .specimen-received-modal .modal-dialog {
                margin: 1rem;
                max-width: calc(100% - 2rem);
            }
            
            .specimen-received-modal .detail-grid {
                grid-template-columns: 1fr;
            }
            
            .specimen-received-modal .patient-info {
                flex-direction: column;
                text-align: center;
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
									<header><!-- php: = $isWalkIn ? 'Walk-In Labs' : 'Collected' --></header>
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
									<table class="table table-hover order-column full-width" id="collectedTable" style="width: 100%">
										<thead>
											<tr>
												<th>Date Created</th>
												<th>Pathology Number</th>
												<th>Patient</th>
												<th>Specimen</th>
												<th>Waiting Time</th>
												<th>Lab Tests</th>

													<th>Action</th>

											</tr>
										</thead>
										<tbody id="collectedSpecimenInfo">

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

								   
<div class="modal fade specimen-received-modal" id="collected_labSamplesCollected" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="receivedModalLabel">
                    Process Samples for Labs: <span class="specimen-name" id="collected_specimen_name">Blood Sample</span>
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
                            <h5>Patient: <span id="collected_sample_patient_id"></span></h5>
                            <p class="patient-uac">UAC: <span id="collected_sample_uac"></span></p>
                        </div>
                    </div>
                    
                    <div class="instruction-banner">
                        <p>
                            Submit to confirm sample has been received and start turn around time.
                        </p>
                    </div>
                </div>

                <!-- Collection Details Section -->
                <div class="collection-details-section">
                    <h5 class="section-title">Collection Details</h5>
                    
                    <div class="detail-grid">
                        <div class="detail-card">
                            <div class="detail-label">Collection Type</div>
                            <div class="detail-value" id="display_collection_type"></div>
                        </div>
                        
                        <div class="detail-card">
                            <div class="detail-label">Specimen Condition at Collection</div>
                            <div class="detail-value">
                                <span class="status-badge status-excellent" id="display_specimen_condition"></span>
                            </div>
                        </div>
                        
                        <div class="detail-card volume-detail">
                            <div class="detail-label">Specimen Volume</div>
                            <div class="detail-value">
                                <div class="volume-display">
                                    <span class="volume-number" id="display_specimen_volume"></span>
                                    <span class="volume-unit" id="display_volume_unit">mL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Section -->
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestLabs', 'action' => 'updateReceivedSpecimen'], 'class' => 'form-horizontal', ]) -->
                        <input type="hidden" name="sample_id" id="collected_sample_id">
                        <input type="hidden" name="request_id" id="collected_request_id">
                        <!-- Submit Section -->
                        <div class="submit-section">
                            <button type="submit" class="btn btn-confirm">
                                Confirm Receipt & Start TAT
                            </button>
                        </div>
                    <!-- php: = $this->Form->end() -->
                </div>
            </div>
            
        </div>
    </div>
</div>


<script>
    // function getCollectedSamples() {
    //     $.ajax({
    //         type: 'GET',
    //         url: "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestLabs', 'action' => 'specimenInformation' ] ); -->/2",
    //         data: {},
    //         cache: false,
    //         success: function (res) {
    //             if (Array.isArray(res)) {
    //                 let specimen = res.reduce((acc, curr) => {
    //                     let id = curr.id + curr.specimen_name
    //                     if (!(id in acc)) {
    //                         acc[id] = {
    //                             ...curr,
    //                             labs: [
    //                                 curr.lab_name
    //                             ],
    //                             'requests': [
    //                                 curr.lab_request_id
    //                             ]
    //                         }
    //                     } else {
    //                         acc[id]['labs'].push(curr.lab_name)
    //                         acc[id]['requests'].push(curr.lab_request_id)
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
    //                         request_id: ele.lab_request_id,
    //                         'requests': ele.requests,
    //                     })
    //                     result.push(\`
    //                         <tr>
    //                             <td>\${moment(ele.request_date).format('d-MM-YYYY HH:MM')}</td>
    //                             <td>\${ele.pathology_number}</td>
    //                             <td>\${ele.patient_name} <span class="badge badge-pill">\${ele.patient_age} yrs</span><span class="badge badge-pill">\${ele.patient_folder}</span></td>
    //                             <td>\${ele.specimen_name}</td>
    //                             <td>\${ele.waiting_time}</td>
    //                             <td>\${lab_info}</td>
    //                             <td>
    //                                 <button class="btn btn-primary btn-xs">view</button>
    //                                 <button onclick='updateCollectionModal(\${encoded})' class="btn btn-info btn-xs" data-toggle="modal" data-target="#collected_labSamplesCollected">collect</button>
    //                             </td>
    //                         </tr>
    //                     \`)
    //                 });
    //                 table = $('#collectedTable').DataTable()
    //                 table.destroy()
    //                 // $('#collectedSpecimenInfo').empty()

    //                 $('#collectedSpecimenInfo').html(result.join(""))
    //                 $('#collectedTable').DataTable()
    //             }

    //         }
    //     });
    // }

    function getCollectedSamples() {
        table = $('#collectedTable').DataTable();
		table.destroy();
		$('#collectedTable').DataTable({
			"ordering": false,
			"processing": false,
            "serverSide": false,
			ajax: {
				url: '<!-- php: echo $this->Url->build( [ 'controller' => 'RequestLabs', 'action' => 'specimenInformation' ] ); -->/2',
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
                { data: "waiting_time", render: (data, type, row) => {
                    return \`<div class="outlined-text">\${row.waiting_time}</div>\`
                }},
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

						return \`<div class="outlined-text">\${lab_info}</div>\`
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
                        })

						return \`<button onclick='updateCollectionModal(\${encoded})' class="btn btn-info btn-xs" data-toggle="modal" data-target="#collected_labSamplesCollected">collect</button>\`
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

    function updateCollectionModal(params) {
        console.log("params" ,params)
        $('#collected_sample_patient_id').html(params.name)
        $('#collected_sample_uac').html(params.uac)
        $('#collected_specimen_name').html(params.specimen_name)
        $('#collected_sample_id').val(params.sample_id)
        $('#collected_request_id').val(params.requests)
        $('#display_collection_type').html(params.display_collection_type)
        $('#display_specimen_condition').html(params.display_specimen_condition)
        $('#display_specimen_volume').html(params.display_specimen_volume)
    }
    $(document).ready(function() {
        getCollectedSamples()
    })
</script>
`;

export default function ElementElementRequestLabsCollected() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
