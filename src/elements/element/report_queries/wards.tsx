const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Wards <span id="wards_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_wards').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_wards" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_wards']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_wards">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_wards" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_wards" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_wards" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <!-- <div class="form-group row">
										<label class="col-md-5 control-label">
											Specialty
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="specialty_wards" name="specialty" >
                                                <!-- php: // foreach ($specialties as $key => $specialty): -->
                                                    <option value="<!-- php: // $specialty->id -->"><!-- php: // $specialty->name --></option>
                                                <!-- php: // endforeach; -->
											</SearchableSelectField>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Gender
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="gender_wards" name="gender" >
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
											</SearchableSelectField>
										</div>
									</div> -->

									<div class="form-actions">
										<div class="row">
											<div class="offset-md-5 col-md-7">
												<button class="btn btn-xs btn-<!-- php: =$theme2 -->">Submit</button>
											</div>
										</div>
									</div>

								</div>
							<!-- php: = $this->Form->end() -->
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="borderBox-body row">


            <table class="table table-hover order-column full-width table-checkable anotherCustomDataTable" id="ipd_table_wards">
                <thead>
                    <tr>
                        <th>Ward</th>
                        <th>Bed Complement</th>
                        <th>Admissions</th>
                        <th>Discharges</th>
                        <th>Deaths</th>
                        <th>Patient Days</th>
                        <th>Transfers In</th>
                        <th>Transfers Out</th>
                        <th>Total Activity</th>
                    </tr>
                </thead>
                <tbody id="specialties_body_wards">
                    
                </tbody>
            </table>
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

    function populateTableWards(tableB, data) {
        ward_obj = {
            "bed_complement": 1,
            "Admissions_to_ward": 0,
            "Discharges_from_ward": 0,
            "Deaths": 0,
            "Total_patient_days_spent": null,
            "Transfers_in": 0,
            "Transfers_out": 0,
        }

		const tableBody = document.getElementById(tableB);
		tableBody.innerHTML = ''
		const diseaseMap = {}; // Map disease name to an object with total counts for each age group
		let totals = {}

        data.forEach(item => {
            
			const row = document.createElement('tr');
			tableBody.appendChild(row);

			const diseaseCell = document.createElement('td');
			diseaseCell.textContent = item['Ward'];
			row.appendChild(diseaseCell);
			let total_line = 0
            Object.keys(ward_obj).forEach(wardKey => {
                
				if (!(wardKey in totals)) {
					totals = {
						[wardKey]: 0,
						...totals
					}
				}

				const countCell = document.createElement('td');
				countCell.textContent = item[wardKey];
				row.appendChild(countCell);
				totals[wardKey] += item[wardKey] ? parseFloat(item[wardKey]) : 0
				if (!['bed_complement', 'Total_patient_days_spent'].includes(wardKey)) {
					
					total_line += item[wardKey] ? parseFloat(item[wardKey]) : 0
				}

			})
			const leCountCell = document.createElement('td');
			leCountCell.textContent = total_line;
			row.appendChild(leCountCell);
		})

		if (data.length > 0) {

			const leRow = document.createElement('tr');
			tableBody.appendChild(leRow);

			const leDiseaseCell = document.createElement('td');
			leDiseaseCell.textContent = 'Total';
			leRow.appendChild(leDiseaseCell);
			let total_total_line = 0

			Object.keys(ward_obj).forEach(wardKey => {
				const countCell = document.createElement('td');
				countCell.textContent = totals[wardKey];
				leRow.appendChild(countCell);
				if (!['bed_complement', 'Total_patient_days_spent'].includes(wardKey)) {
					total_total_line += totals[wardKey] ? parseFloat(totals[wardKey]) : 0
				}
			})

			const aleCountCell = document.createElement('td');
			aleCountCell.textContent = total_total_line;
			leRow.appendChild(aleCountCell);
		}



	}

    function generateTableWards(data) {

        table = $('#ipd_table_wards').DataTable()
        table.destroy()
        populateTableWards('specialties_body_wards', data);
        $('#ipd_table_wards').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
            "displayLength": 100,
        });
    }

	$( "#patient_base_dates_base_wards" ).on( "change", function() {
		let id = "default_custom_date_wards"
		if($('#patient_base_dates_base_wards').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_wards").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'wardsDimps']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_base_wards').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_base_wards').value, 'wards')['current']
                        : null,
                    // gender: document.getElementById('gender_wards').value,
                    // specialty: document.getElementById('specialty_wards').value,
                },
                success: function g(data, textStatus) {
                    generateTableWards(data)
					$('#filter_section_1_wards').hide()
					titleBuild('wards_title',
						document.getElementById('patient_base_dates_base_wards').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_base_wards').value, 'wards')['current']
							: null
						,
						{
							gender: ('gender_wards'),
							specialty: ('specialty_wards'),
						}
					)
                },
                fail: function g(xhr, textStatus, errorThrown) {
                        console.log(xhr);
                }
            });
        } catch (error) {
            console.log(error)
        }
        return false
    });
</script>
`;

export default function ElementElementReportQueriesWards() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
