const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Doctor Patient Attendance <span id="doctor_patient_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_doctor_patient').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_doctor_patient" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_doctor_patient']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_doctor_patient_attendance">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_doctor_patient_attendance" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_doctor_patient" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_doctor_patient" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <!-- <div class="form-group row">
										<label class="col-md-5 control-label">
											Insurance Status
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="insurance_status_doctor_patient" name="insurance_status" >
                                                <option value="1">Insured</option>
                                                <option value="2">Not Insured</option>
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


            <table class="table table-hover order-column full-width table-checkable" id="table_doctor_patient">
                <thead>
					<tr>
						<th>Doctor Name</th>
						<th>Departments</th>
						<th>Date Range</th>
						<th>Total Patients Seen</th>
						<th>New Patients</th>
						<th>Follow-Ups</th>
						<th>Consult Times</th>
						<th>Diagnoses</th>
					</tr>
                </thead>
                <tbody id="specialties_body_doctor_patient">
                    
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

    function generateTableAttendanceDoctorPatient(data) {

        table = $('#table_doctor_patient').DataTable()
        table.destroy()
        const tableBody = document.getElementById('specialties_body_doctor_patient');
		tableBody.innerHTML = ''
        let res = ''
		let count = 0
        data.forEach((ele, id) => {
            if (parseInt(ele.visit_count) != 0) {
				count++
                res += \`
					<tr>
						<td>\${ele['Doctor Name'] || ''}</td>
						<td>\${ele['Departments'] || ''}</td>
						<td>\${ele['Date Range'] || ''}</td>
						<td>\${ele['Total Patients Seen'] || 0}</td>
						<td>\${ele['New Patients'] || 0}</td>
						<td>\${ele['Follow-Ups'] || 0}</td>
						<td>\${ele['Avg. Consult Time'] || ''}</td>
						<td>\${ele['Most Common Diagnoses'] || ''}</td>
					</tr>
                \`
            }
        });


        $('#specialties_body_doctor_patient').html(res)

        $('#table_doctor_patient').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
        });
    }

	$( "#patient_base_dates_doctor_patient_attendance" ).on( "change", function() {
		let id = "default_custom_date_doctor_patient_attendance"
		if($('#patient_base_dates_doctor_patient_attendance').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_doctor_patient").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'doctorPatientSeen']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_doctor_patient_attendance').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_doctor_patient_attendance').value, 'doctor_patient')['current']
                        : null,
					// insurance_status: document.getElementById('insurance_status_doctor_patient').value,
                },
                success: function g(data, textStatus) {
                    generateTableAttendanceDoctorPatient(data)
                    $('#filter_section_1_doctor_patient').hide()
                    titleBuild('doctor_patient_title',
						document.getElementById('patient_base_dates_doctor_patient_attendance').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_doctor_patient_attendance').value, 'doctor_patient')['current']
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

export default function ElementElementReportQueriesDoctorPatientVisits() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
