const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Price Adjustment <span id="price_adjustments_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_price_adjustments').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_price_adjustments" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_price_adjustments']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_price_adjustments_attendance">
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_price_adjustments_attendance" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_price_adjustments" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_price_adjustments" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Item Types
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="invoice_item_type" name="invoice_item_type" >
												<!-- php: foreach ($invoice_items as $key => $value): -->
													<option value="<!-- php: = $value->id -->"><!-- php: = $value->name --></option>
												<!-- php: endforeach -->
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


            <table class="full-width" id="table_price_adjustments">
                <thead>
					<tr>
						<th>User Name</th>
						<th>Role</th>
						<th>Related Item Name</th>
						<th>Adjustment Date</th>
						<th>Previous Retail Unit Price</th>
						<th>Retail Unit Price</th>
					</tr>
                </thead>
                <tbody id="specialties_body_price_adjustments">
                    
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

        table = $('#table_price_adjustments').DataTable()
        table.destroy()
        const tableBody = document.getElementById('specialties_body_price_adjustments');
		tableBody.innerHTML = ''
        let res = ''
		let count = 0
        data.forEach((ele, id) => {
            if (parseInt(ele.visit_count) != 0) {
				count++
                res += \`
					<tr>
						<td>\${ele['user_name'] || ''}</td>
						<td>\${ele['roles'] || ''}</td>
						<td>\${ele['related_item_name'] || ''}</td>
						<td>\${moment(ele['date_created']).format("YYYY-MM-DD HH:mm:ss A")}</td>
						<td>\${ele['prev_retail_unit_price'] || ''}</td>
						<td>\${ele['retail_unit_price'] || ''}</td>
					</tr>
                \`
            }
        });


        $('#specialties_body_price_adjustments').html(res)

        $('#table_price_adjustments').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
        });
    }

	$( "#patient_base_dates_price_adjustments_attendance" ).on( "change", function() {
		let id = "default_custom_date_price_adjustments_attendance"
		if($('#patient_base_dates_price_adjustments_attendance').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_price_adjustments").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'searchReconItems']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_price_adjustments_attendance').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_price_adjustments_attendance').value, 'price_adjustments')['current']
                        : null,
					item_type_id: document.getElementById('invoice_item_type').value,
                },
                success: function g(data, textStatus) {
                    generateTableAttendanceDoctorPatient(data)
                    $('#filter_section_1_price_adjustments').hide()
                    titleBuild('price_adjustments_title',
						document.getElementById('patient_base_dates_price_adjustments_attendance').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_price_adjustments_attendance').value, 'price_adjustments')['current']
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

export default function ElementElementReportQueriesItemPriceAdjustment() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
