const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Labs <span id="labs_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_labs').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_labs" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_labs']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_labs">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_labs" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_labs" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_labs" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Category
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="investigation_lab" name="investigation" >
                                                <!-- php: foreach ($investigations as $key => $investigation): -->
                                                    <option value="<!-- php: = $investigation->id -->"><!-- php: = $investigation->name --></option>
                                                <!-- php: endforeach; -->
											</SearchableSelectField>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Gender
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="gender_labs" name="gender" >
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
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


            <table class="table table-hover order-column full-width table-checkable anotherCustomDataTable" id="ipd_table_labs">
                <thead>
                    <tr>
                        <th>Labs</th>
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
                <tbody id="specialties_body_labs">
                    
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

    function generateTableLabs(data) {
		console.log("place is here")

        table = $('#ipd_table_labs').DataTable()
        table.destroy()
        populateTable('specialties_body_labs', data);
        $('#ipd_table_labs').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
            "displayLength": 100,
        });
    }

	$( "#patient_base_dates_base_labs" ).on( "change", function() {
		let id = "default_custom_date_labs"
		if($('#patient_base_dates_base_labs').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_labs").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'labsDimps']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_base_labs').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_base_labs').value, 'labs')['current']
                        : null,
                    gender: document.getElementById('gender_labs').value,
                    investigation: document.getElementById('investigation_lab').value,
                },
                success: function g(data, textStatus) {
                    generateTableLabs(data)
                    $('#filter_section_1_labs').hide()
                    titleBuild('labs_title',
						document.getElementById('patient_base_dates_base_labs').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_base_labs').value, 'labs')['current']
							: null
						,
						{
							gender: ('gender_labs'),
							investigation: ('investigation_lab'),
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

export default function ElementElementReportQueriesLabsReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
