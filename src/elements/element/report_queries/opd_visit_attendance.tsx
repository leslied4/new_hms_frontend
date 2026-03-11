const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">OPD Visit Attendance <span id="opd_visit_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_opd_visit').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_opd_visit" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_opd_visit']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_opd_visit">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_opd_visit" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_opd_visit" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_opd_visit" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Insurance Status
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="insurance_status_opd_visit" name="insurance_status" >
                                                <option value="1">Insured</option>
                                                <option value="2">Not Insured</option>
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


            <table class="table table-hover order-column full-width table-checkable anotherCustomDataTable" id="ipd_table_opd_visit">
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Date of Birth</th>
                        <th>No. of Visits</th>
                    </tr>
                </thead>
                <tbody id="specialties_body_opd_visit">
                    
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

    function generateTableAttendanceOpdVisit(data) {

        table = $('#ipd_table_opd_visit').DataTable()
        table.destroy()
        const tableBody = document.getElementById('specialties_body_opd_visit');
		tableBody.innerHTML = ''
        let res = ''
		let count = 0;
        data.forEach(ele => {
            if (parseInt(ele.visit_count) != 0) {
                count++
                res += \`
                    <tr>
						<td>\${count}</td>
                        <td>\${ele.first_name}</td>
                        <td>\${ele.last_name}</td>
                        <td>\${ele.email || ''} \${ele.phone || ''}</td>
                        <td>\${ele.address || ''}</td>
                        <td>\${moment(ele.date_of_birth).format('DD/MM/YYYY') || ''}</td>
                        <td>\${ele.visit_count || 0}</td>
                    </tr>
                \`
            }
        });


        $('#specialties_body_opd_visit').html(res)

        $('#ipd_table_opd_visit').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
            "displayLength": 100,
        });
    }

	$( "#patient_base_dates_base_opd_visit" ).on( "change", function() {
		let id = "default_custom_date_opd_visit"
		if($('#patient_base_dates_base_opd_visit').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_opd_visit").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'outPatientVisit']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_base_opd_visit').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_base_opd_visit').value, 'opd_visit')['current']
                        : null,
					insurance_status: document.getElementById('insurance_status_opd_visit').value,
                },
                success: function g(data, textStatus) {
                    generateTableAttendanceOpdVisit(data)
                    $('#filter_section_1_opd_visit').hide()
                    titleBuild('opd_visit_title',
						document.getElementById('patient_base_dates_base_opd_visit').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_base_opd_visit').value, 'opd_visit')['current']
							: null
						,
						{

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

export default function ElementElementReportQueriesOpdVisitAttendance() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
