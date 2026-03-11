const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">IPD Visit Attendance <span id="ipd_visit_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_ipd_visit').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_ipd_visit" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_ipd_visit']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_ipd_visit">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_ipd_visit" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_ipd_visit" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_ipd_visit" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Insurance Status
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="insurance_status_ipd_visit" name="insurance_status" >
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


            <table class="table table-hover order-column full-width table-checkable" id="ipd_table_ipd_visit">
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
                <tbody id="specialties_body_ipd_visit">
                    
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

    function generateTableAttendanceIpdVisit(data) {

        table = $('#ipd_table_ipd_visit').DataTable()
        table.destroy()
        const tableBody = document.getElementById('specialties_body_ipd_visit');
		tableBody.innerHTML = ''
        let res = ''
		let count = 0
        data.forEach((ele, id) => {
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


        $('#specialties_body_ipd_visit').html(res)

        $('#ipd_table_ipd_visit').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
        });
    }

	$( "#patient_base_dates_base_ipd_visit" ).on( "change", function() {
		let id = "default_custom_date_ipd_visit"
		if($('#patient_base_dates_base_ipd_visit').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_ipd_visit").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'inPatientVisit']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_base_ipd_visit').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_base_ipd_visit').value, 'ipd_visit')['current']
                        : null,
					insurance_status: document.getElementById('insurance_status_ipd_visit').value,
                },
                success: function g(data, textStatus) {
                    generateTableAttendanceIpdVisit(data)
                    $('#filter_section_1_ipd_visit').hide()
                    titleBuild('ipd_visit_title',
						document.getElementById('patient_base_dates_base_ipd_visit').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_base_ipd_visit').value, 'ipd_visit')['current']
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

export default function ElementElementReportQueriesIpdVisitAttendance() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
