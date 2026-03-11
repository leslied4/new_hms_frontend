const rawHtml = `
<style>
    #needsAttentionSectionTable .dataTables_filter input:focus {
        border: 2px solid #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

        .lab-sample-modal {
            --primary-color: #2c5aa0;
            --secondary-color: #f8f9fa;
            --accent-color: #28a745;
            --border-color: #e9ecef;
            --text-muted: #6c757d;
        }

        .lab-sample-modal .modal-dialog {
            max-width: 650px;
        }

        .lab-sample-modal .modal-content {
            border: none;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .lab-sample-modal .modal-header {
            background: linear-gradient(135deg, var(--primary-color) 0%, #3d6bb3 100%);
            color: white;
            border-radius: 12px 12px 0 0;
            padding: 1.5rem;
            border-bottom: none;
        }

        .lab-sample-modal .modal-title {
            font-weight: 600;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .lab-sample-modal .close {
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

        .lab-sample-modal .close:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.1);
        }

        .lab-sample-modal .modal-body {
            padding: 0;
        }

        .lab-sample-modal .patient-info-section {
            background: var(--secondary-color);
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .lab-sample-modal .patient-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .lab-sample-modal .patient-avatar {
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

        .lab-sample-modal .patient-details h5 {
            margin: 0;
            color: var(--primary-color);
            font-weight: 600;
        }

        .lab-sample-modal .patient-id {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin: 0;
        }

        .lab-sample-modal .instruction-banner {
            background: #e8f4fd;
            border-left: 4px solid var(--primary-color);
            padding: 0.75rem 1rem;
            margin: 0;
            border-radius: 0 4px 4px 0;
        }

        .lab-sample-modal .instruction-banner p {
            margin: 0;
            color: var(--primary-color);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .lab-sample-modal .form-section {
            padding: 2rem;
        }

        .lab-sample-modal .form-group {
            margin-bottom: 1.5rem;
        }

        .lab-sample-modal .form-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .lab-sample-modal .form-control, 
        .lab-sample-modal .form-select {
            border: 2px solid var(--border-color);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            transition: all 0.2s ease;
            font-size: 0.95rem;
        }

        .lab-sample-modal .form-control:focus, 
        .lab-sample-modal .form-select:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.2rem rgba(44, 90, 160, 0.1);
        }

        .lab-sample-modal .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .lab-sample-modal .form-row.single {
            grid-template-columns: 1fr;
        }

        .lab-sample-modal .btn-submit {
            background: linear-gradient(135deg, var(--accent-color) 0%, #34ce57 100%);
            border: none;
            color: white;
            padding: 0.875rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-width: 140px;
            justify-content: center;
        }

        .lab-sample-modal .btn-submit:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            background: linear-gradient(135deg, #218838 0%, #28a745 100%);
        }

        .lab-sample-modal .btn-submit:active {
            transform: translateY(0);
        }

        .lab-sample-modal .submit-section {
            padding: 1.5rem 2rem;
            background: #f8f9fa;
            border-top: 1px solid var(--border-color);
            border-radius: 0 0 12px 12px;
            display: flex;
            justify-content: center;
        }

        .lab-sample-modal .specimen-name {
            font-weight: 600;
            color: var(--accent-color);
        }

        @media (max-width: 768px) {
            .lab-sample-modal .modal-dialog {
                margin: 1rem;
                max-width: calc(100% - 2rem);
            }
            
            .lab-sample-modal .form-row {
                grid-template-columns: 1fr;
            }
            
            .lab-sample-modal .patient-info {
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
									<header><!-- php: = $isWalkIn ? 'Walk-In Labs' : 'Needs Attention' --></header>
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
                                  
                                  <button onclick="$('#needsAttentionSectionTable .dataTables_filter input').focus().select()" id="focusSearchBtn" class="btn btn-primary">Scan Barcode</button>

									
								  <div class="table-scrollable" id="needsAttentionSectionTable">
									<table class="table table-hover order-column full-width" id="needsAttentionTable" style="width: 100%">
										<thead>
											<tr>
												<th>Date Created</th>
												<th>Pathology No.</th>
												<th>Patient</th>
												<th>Specimen</th>
												<th>Waiting Time</th>
												<th>Lab Tests</th>
                                                <th>Action</th>
											</tr>
										</thead>
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

								   
<div class="modal fade lab-sample-modal" id="attention_labSamplesCollected" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="sampleModalLabel">
                    Process Samples for Labs: <span class="specimen-name" id="attention_specimen_name">Blood Sample</span>
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
                            <h5>Patient ID: <span id="attention_sample_patient_id">PT-2024-001</span></h5>
                            <p class="patient-id">Sample Collection Processing</p>
                        </div>
                    </div>
                    
                    <div class="instruction-banner">
                        <p>
                            Please complete the collection details below and submit to confirm sample collection.
                        </p>
                    </div>
                </div>

                <!-- Form Section -->
                <div class="form-section">
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestLabs', 'action' => 'updateCollectedSpecimen'], 'class' => 'form-horizontal', ]) -->
                        <input type="hidden" name="sample_id" id="attention_sample_id">
                        <input type="hidden" name="request_id" id="request_labs">
                        
                        <!-- Collection Type and Condition Row -->
                        <div class="form-row">
                            <div class="form-group">
                                <label for="collection_type" class="form-label">
                                    Collection Type
                                </label>
                                <SearchableSelectField class="form-control p-2" onchange="changeShowOther('collection_type', 'collection_type_hidden')" id="collection_type" name="collection_type" required>
                                    <option value="">Select collection type...</option>
                                    <option value="Venipuncture">Venipuncture</option>
                                    <option value="Swab">Swab</option>
                                    <option value="Tissue Biopsy">Tissue Biopsy</option>
                                    <option value="Saliva Collection">Saliva Collection</option>
                                    <option value="other">Other</option>
                                </SearchableSelectField>

                                <div class="form-group" style="display: none" id="collection_type_hidden">
                                    <label for="other_collection_type" class="form-label">
                                        If Other, specify:
                                    </label>
                                    <input type="text" class="form-control" id="other_collection_type" name="other_collection_type" placeholder="Specify other collection type">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="specimen_condition" class="form-label">
                                    Specimen Condition at Collection
                                </label>
                                <SearchableSelectField class="form-control p-2" onchange="" id="specimen_condition" name="specimen_condition" required>
                                    <option value="">Select condition...</option>
                                    <option value="Adequate Volume">Adequate Volume</option>
                                    <option value="Properly Labeled">Properly Labeled</option>
                                    <option value="No Leakage">No Leakage</option>
                                    <option value="Correct Container Used">Correct Container Used</option>
                                    <option value="On Ice">On Ice</option>
                                    <option value="Refrigerated">Refrigerated (2–8°C)</option>
                                    <option value="Room Tempature">Room Temp</option>
                                    <option value="other">Other</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        
                        <!-- Specimen Volume Row -->
                        <div class="form-row single">
                            <div class="form-group">
                                <label for="specimen_volume" class="form-label">
                                    Specimen Volume (if applicable)
                                </label>
                                <div class="input-group">
                                    <input type="number" 
                                            class="form-control" 
                                            id="specimen_volume" 
                                            name="specimen_volume" 
                                            placeholder="Enter volume" 
                                            step="0.1" 
                                            min="0">
                                    <SearchableSelectField class="form-select" name="volume_unit" style="max-width: 100px;">
                                        <option value="ml">mL</option>

                                    </SearchableSelectField>
                                </div>
                            </div>
                        </div>
                        <div class="submit-section">
                            <button type="submit" class="btn btn-submit">
                                Confirm Collection
                            </button>
                        </div>
                    <!-- php: = $this->Form->end() -->
                </div>
            </div>
            
            <!-- Submit Section -->
        </div>
    </div>
</div>


<script>
    // function getAttentionSamples() {
    //     $.ajax({
    //         type: 'GET',
    //         url: "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestLabs', 'action' => 'specimenInformation' ] ); -->/1",
    //         data: {},
    //         cache: false,
    //         success: function (res) {
    //             $('#loadSpecimenInfo').empty()
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
    //                         'requests': ele.requests
    //                     })
    //                     result.push(\`
    //                         <tr>
    //                             <td>\${moment(ele.request_date).format('DD-MM-YYYY HH:MM')}</td>
    //                             <td>\${ele.pathology_number}</td>
    //                             <td>\${ele.patient_name} <span class="badge badge-pill">\${ele.patient_age} yrs</span><span class="badge badge-pill">\${ele.patient_folder}</span></td>
    //                             <td>\${ele.specimen_name}</td>
    //                             <td>\${ele.waiting_time}</td>
    //                             <td>\${lab_info}</td>
    //                             <td>
    //                                 <button onclick='updateNeedsAttentionModal(\${encoded})' class="btn btn-info btn-xs" data-toggle="modal" data-target="#attention_labSamplesCollected">collect</button>
    //                             </td>
    //                         </tr>
    //                     \`)
    //                 });

    //                 table = $('#needsAttentionTable').DataTable()
    //                 table.destroy()
    //                 // $('#loadSpecimenInfo').empty()

    //                 $('#loadSpecimenInfo').html(result.join(""))
    //                 $('#needsAttentionTable').DataTable({})

    //             }

    //         }
    //     });
    // }

    function getAttentionSamples() {
        table = $('#needsAttentionTable').DataTable();
		table.destroy();
		$('#needsAttentionTable').DataTable({
			"ordering": false,
			"processing": false,
            "serverSide": false,
			ajax: {
				url: '<!-- php: echo $this->Url->build( [ 'controller' => 'RequestLabs', 'action' => 'specimenInformation' ] ); -->/1',
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
                            requests: acc[id].requests
                        })

						return \`
                            <button onclick='updateNeedsAttentionModal(\${encoded})' class="btn btn-info btn-xs" data-toggle="modal" data-target="#attention_labSamplesCollected">collect</button>
                        \`
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
    function updateNeedsAttentionModal(params) {
        console.log("params" ,typeof(params.name))
        $('#attention_sample_patient_id').html(params.name)
        // $('#attention_sample_uac').html(params.uac)
        $('#attention_specimen_name').html(params.specimen_name)
        $('#attention_sample_id').val(params.sample_id)
        $('#request_labs').val(params.requests)
    }
    $(document).ready(function() {
        getAttentionSamples()
    })

    function changeShowOther(id, toggler) {
        if ($('#'+id).val() == 'other') {
            $('#'+toggler).show();
        } else {
            $('#'+toggler).hide();
        }
    }
</script>
`;

export default function ElementElementRequestLabsNeedsAttention() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
