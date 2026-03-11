const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">New and Returning Patient Analysis <span id="outpatient_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_outpatient').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_outpatient" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_outpatient']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_outpatient">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
                                    <div id="default_custom_date_outpatient" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_outpatient" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_outpatient" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Insurance Status
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="insurance_status_out" name="insurance_status" >
                                                <option value="1">Insured</option>
                                                <option value="2">Not Insured</option>
											</SearchableSelectField>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Patient Status
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="patient_status_out" name="patient_status" >
                                                <option value="1">New</option>
                                                <option value="2">Old</option>
											</SearchableSelectField>
										</div>
									</div>

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


            <table class="table table-hover order-column full-width table-checkable anotherCustomDataTable" id="ipd_table_outpatient">
                <thead>
                    <tr>
                        <th>Age Group</th>
                        <th>Male</th>
                        <th>Female</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="specialties_body_outpatient">
                    
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

    function populateTableOutpatient(tableB, data) {

        const ageRanges = [
            '0-28 days(Neonatal)',
            '1 - 11 months(Post neonatal)',
            '1 - 4 years',
            '5 - 9 years',
            '10 - 14 years',
            '15 - 17 years',
            '18 - 19 years',
            '20 - 34 years',
            '35 - 49 years',
            '50 - 59 years',
            '60 - 69 years',
            '70 years and above',
            'Total'
        ];

        const patientData = document.getElementById(tableB);
        patientData.innerHTML = ''

        function createTableRow(ageRange) {
            const row = document.createElement('tr');
            const ageCell = document.createElement('td');
            const maleCell = document.createElement('td');
            const femaleCell = document.createElement('td');
            const totalCell = document.createElement('td');

            ageCell.textContent = ageRange;
            maleCell.textContent = 0; // Initialize counts to 0
            femaleCell.textContent = 0;
            totalCell.textContent = 0;

            row.appendChild(ageCell);
            row.appendChild(maleCell);
            row.appendChild(femaleCell);
            row.appendChild(totalCell);

            return row;
        }

        let total_male = 0
        let total_female = 0
        let total_total = 0

        function populateCounts(data, rows) {
            for (const patient of data) {
                const ageCategory = categorizeAge(patient.age_group);
                console.log("ageCategory", ageCategory, patient.age_group)
                for (const row of rows) {
                    console.log("rows", rows)
                    if (row.firstChild.textContent === ageCategory) {
                        console.log("made it here", rows)
                        let total_count = 0
                        if (patient.gender === 'Male') {
                            let amount = parseInt(row.children[1].textContent) + patient.visit_count
                            row.children[1].textContent = amount
                            total_male += amount;
                            total_count += amount;
                        }
                        if (patient.gender === 'Female') {
                            let amount = parseInt(row.children[2].textContent) + patient.visit_count
                            row.children[2].textContent = amount
                            total_female += amount;
                            total_count += amount;
                        }

                        row.children[3].textContent = parseInt(row.children[3].textContent) +total_count
                        total_total += total_count
                        break; // Stop searching once the category is found
                    }

                }
            }

            for (const row of rows) {
                if(row.firstChild.textContent == 'Total') {
                    row.children[1].textContent = total_male
                    row.children[2].textContent = total_female
                    row.children[3].textContent = total_total
                }
            }

        }

        function categorizeAge(ageGroup) {
            for (const range of ageRanges) {
                if (ageGroup.includes(range)) {
                    return range;
                }
            }
            return "Uncategorized";
        }

        // Create rows for each age range
        const rows = [];
        for (const range of ageRanges) {
            rows.push(createTableRow(range));
        }

        patientData.append(...rows); // Add all rows at once

        // Populate counts based on data
        populateCounts(data, rows);


    }

    function generateTableOutpatient(data) {

        table = $('#ipd_table_outpatient').DataTable()
        table.destroy()
        populateTableOutpatient('specialties_body_outpatient', data);
        $('#ipd_table_outpatient').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
            "displayLength": 100,
        });
    }


	$( "#patient_base_dates_base_outpatient" ).on( "change", function() {
		let id = "default_custom_date_outpatient"
		if($('#patient_base_dates_base_outpatient').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_outpatient").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'outpatientDimps']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_base_outpatient').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_base_outpatient').value, 'outpatient')['current']
                        : null,
                    insurance_status: document.getElementById('insurance_status_out').value,
                    patient_status: document.getElementById('patient_status_out').value,
                },
                success: function g(data, textStatus) {
                    generateTableOutpatient(data)
                    $('#filter_section_1_outpatient').hide()
                    titleBuild('outpatient_title',
						document.getElementById('patient_base_dates_base_outpatient').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_base_outpatient').value, 'outpatient')['current']
							: null
						,
						{
							insurance_status: ('insurance_status_out'),
							patient_status: ('patient_status_out'),
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

export default function ElementElementReportQueriesOutpatient() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
