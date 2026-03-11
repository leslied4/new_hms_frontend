const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Specialties <span id="specialties_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_specialty']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>

									<div id="default_custom_date_specialties" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_specialties" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_specialties" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Specialty
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="specialty" name="specialty" >
                                                <!-- php: foreach ($specialties as $key => $specialty): -->
                                                    <option value="<!-- php: = $specialty->id -->"><!-- php: = $specialty->name --></option>
                                                <!-- php: endforeach; -->
											</SearchableSelectField>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Gender
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="gender" name="gender" >
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
											</SearchableSelectField>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Diagnoses Type
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="diagnoses" name="diagnoses" >
                                                <option value="patient_visit_primary_diagnoses">Primary</option>
                                                <option value="patient_visit_provisional_diagnoses">Provisional</option>
                                                <option value="patient_visit_differential_diagnoses">Differential</option>
                                                <option value="patient_visit_other_diagnoses">Other</option>
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


            <table class="table table-hover order-column full-width table-checkable anotherCustomDataTable" id="ipd_table">
                <thead>
                    <tr>
                        <th>Diseases</th>
                        <th>0-28 days</th>
                        <th>1 - 11 months</th>
                        <th>1 - 4 yrs</th>
                        <th>5 - 9 yrs</th>
                        <th>10 - 14 yrs</th>
                        <th>15 - 17 yrs</th>
                        <th>18 - 19 yrs</th>
                        <th>20 - 34 yrs</th>
                        <th>35 - 49 yrs</th>
                        <th>50 - 59 yrs</th>
                        <th>60 - 69 yrs</th>
                        <th>70yrs & above </th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="specialties_body">
                    
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

    function generateTableSpecialty(data) {


        table = $('#ipd_table').DataTable()
        table.destroy()
        populateTable('specialties_body', data);
        $('#ipd_table').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
            "displayLength": 100,
        });
    }

	$( "#patient_base_dates_base" ).on( "change", function() {
		let id = "default_custom_date_specialties"
		if($('#patient_base_dates_base').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_specialty").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'specialtiesDimps']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_base').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_base').value, 'specialties')['current']
                        : null,
                    gender: document.getElementById('gender').value,
                    specialty: document.getElementById('specialty').value,
                    diagnoses: document.getElementById('diagnoses').value,
                },
                success: function g(data, textStatus) {
                    generateTableSpecialty(data)
                    $('#filter_section_1').hide()
                    titleBuild('specialties_title',
						document.getElementById('patient_base_dates_base').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_base').value, 'specialties')['current']
							: null
						,
						{
							gender: ('gender'),
							specialty: ('specialty'),
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

export default function ElementElementReportQueriesSpecialties() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
