const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Medication Adjustment <span id="medication_adjustment_title"></span></span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_medication_adjustment').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_medication_adjustment" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_medication_adjustment']) -->
								<div class="col-md-12">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Date
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_medication_adjustment_attendance">
												<option value="1">Today</option>
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_medication_adjustment_attendance" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_medication_adjustment" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_medication_adjustment" class="form-control" name="endDate">
											</div>
										</div>
									</div>
                                    <div class="form-group row">
										<label class="col-md-5 control-label">
											Users
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="pharmacy_users" name="user_id" >
												
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


            <table class="full-width" id="table_medication_adjustment">
                <thead>
					<tr>
						<th>User Name</th>
						<th>Role</th>
						<th>Item Name</th>
						<th>Adjustment Date</th>
						<th>Old Price</th>
						<th>Amount</th>
						<th>Old Quantity</th>
						<th>Quantity</th>
						<th>Description</th>
					</tr>
                </thead>
                <tbody id="specialties_body_medication_adjustment">
                    
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

    function generateTableMedicationAdjustmentPatient(data) {

        table = $('#table_medication_adjustment').DataTable()
        table.destroy()
        const tableBody = document.getElementById('specialties_body_medication_adjustment');
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
						<td>
							<a target="_blank" href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Inventory', 'action' => 'drugConsumption']) -->/\${ele.item_id}" class="">
								\${ele['item_name'] || ''}
							</a>
						</td>
						<td>\${moment(ele['date_created']).format("YYYY-MM-DD HH:mm:ss A")}</td>
						<td>\${ele['old_price'] || ''}</td>
						<td>\${ele['amount'] || ''}</td>
						<td>\${ele['old_quantity'] || ''}</td>
						<td>\${ele['quantity']}</td>
						<td>\${ele['remarks']}</td>
					</tr>
                \`
            }
        });


        $('#specialties_body_medication_adjustment').html(res)

        $('#table_medication_adjustment').DataTable( {
            "dom": 'Bfrtip',
            "order": [],
        });
    }

	$( "#patient_base_dates_medication_adjustment_attendance" ).on( "change", function() {
		let id = "default_custom_date_medication_adjustment_attendance"
		if($('#patient_base_dates_medication_adjustment_attendance').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

    $("#patient_base_filter_medication_adjustment").submit(function () {
        try {
            
            $.ajax({
                type: "GET",
                url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'searchReconMedicationItems']) -->",
                data: {
                    date: document.getElementById('patient_base_dates_medication_adjustment_attendance').value != '' ? 
                        calculateDateRange(document.getElementById('patient_base_dates_medication_adjustment_attendance').value, 'medication_adjustment')['current']
                        : null,
					user_id: document.getElementById('pharmacy_users').value,
                },
                success: function g(data, textStatus) {
                    generateTableMedicationAdjustmentPatient(data)
                    $('#filter_section_1_medication_adjustment').hide()
                    titleBuild('medication_adjustment_title',
						document.getElementById('patient_base_dates_medication_adjustment_attendance').value != '' ? 
							calculateDateRange(document.getElementById('patient_base_dates_medication_adjustment_attendance').value, 'medication_adjustment')['current']
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

	function getUsers() {
		const getUsers_link = '<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewRoleUsers']) -->/'

		
		$.ajax({
			type: "GET",
			url: \`\${getUsers_link}3\`,
			success: function g(data, textStatus) {
				let users_data = [\`<option value="" >None</option>\`];
				if (Array.isArray(data)) {
					data?.forEach(element => {
						users_data.push(
							\`<option value="\${element.id}" >\${element.first_name} \${element.last_name}</option>\`
							)
					});
				}
				$('#pharmacy_users').html(users_data.join(""));
				$('#pharmacy_users').selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
			}
		});
	}

	$(document).ready(function() {
        getUsers();

    })
</script>
`;

export default function ElementElementReportQueriesMedicationPriceAdjustment() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
