const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Patient Attendance IPD <span id="ipd_attendance_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_ipd_attendance').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_ipd_attendance" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_ipd_attendance']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_ipd_attendance">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_ipd_attendance" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_ipd_attendance" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_ipd_attendance" class="form-control" name="endDate">
											</div>
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


            <table class="table table-hover order-column full-width table-checkable anotherCustomDataTable" id="ipd_table_ipd_attendance">
                <thead>
                    <tr>
                        <th></th>
                        <th>First name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Location</th>
						<th>Date of Birth</th>
                        <th>No. of Visits</th>
                        <th>Bill Amount</th>
                        <th>Paid</th>
                        <th>UnPaid</th>
                    </tr>
                </thead>
                <tbody id="specialties_body_ipd_attendance">
                    
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

    function generateTableAttendanceIpd(data) {

        table = $('#ipd_table_ipd_attendance').DataTable()
        table.destroy()
        const tableBody = document.getElementById('specialties_body_ipd_attendance');
		tableBody.innerHTML = ''
        let res = ''
		let count = 0
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
                        <td>\${parseFloat(ele.total_invoice_amount || 0).toFixed(2)}</td>
                        <td>\${parseFloat(ele.total_invoice_paid || 0).toFixed(2)}</td>
                        <td>\${ele.total_invoice_amount - ele.total_invoice_paid < 0 ? 0 : parseFloat(ele.total_invoice_amount - ele.total_invoice_paid).toFixed(2)}</td>
                    </tr>
                \`
            }
        });


        $('#specialties_body_ipd_attendance').html(res)

        $('#ipd_table_ipd_attendance').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
            "displayLength": 100,
        });
    }

	$( "#patient_base_dates_base_ipd_attendance" ).on( "change", function() {
		let id = "default_custom_date_ipd_attendance"
		if($('#patient_base_dates_base_ipd_attendance').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_ipd_attendance").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'inPatientAttendance']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_base_ipd_attendance').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_base_ipd_attendance').value, 'ipd_attendance')['current']
                        : null,
                },
                success: function g(data, textStatus) {
                    generateTableAttendanceIpd(data)
                    $('#filter_section_1_ipd_attendance').hide()
                    titleBuild('ipd_attendance_title',
						document.getElementById('patient_base_dates_base_ipd_attendance').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_base_ipd_attendance').value, 'ipd_attendance')['current']
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

export default function ElementElementReportQueriesIpdPatientAttendance() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
