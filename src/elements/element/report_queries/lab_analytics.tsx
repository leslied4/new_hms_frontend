const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Lab Test Analytics <span id="lab_analytics_title"></span></span>
				<div class="col-md-4">
					<h5>Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_lab_analytics').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_lab_analytics" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_lab_analytics']) -->
							<div class="col-md-12">
								<div class="form-group row">
									<label class="col-md-5 control-label">
										Date
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_lab_analytics_attendance">
											<option value="2">Past Week</option>
											<option value="3">Month</option>
											<option value="5">Quarter</option>
											<option value="7">Year</option>
											<option value="custom">Custom</option>
										</SearchableSelectField>
									</div>
								</div>
								<div id="default_custom_date_lab_analytics_attendance" style="display:none">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Start Date
										</label>
										<div class="col-md-7">
											<input type="date" id="start_date_lab_analytics" class="form-control" name="startDate">
										</div>
									</div>
									<div class="form-group row">
										<label class="col-md-5 control-label">
											End Date
										</label>
										<div class="col-md-7">
											<input type="date" id="end_date_lab_analytics" class="form-control" name="endDate">
										</div>
									</div>
								</div>
								<div class="form-group row">
									<label class="col-md-5 control-label">
										Gender
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control" style="width:100%;" id="gender_lab_analytics" name="gender">
											<option value="0">All</option>
											<option value="1">Male</option>
											<option value="2">Female</option>
										</SearchableSelectField>
									</div>
								</div>
								<!-- <div class="form-group row">
										<label class="col-md-5 control-label">
											Item Types
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control" style="width:100%;" id="invoice_item_type" name="invoice_item_type" >
												<!-- php: //foreach ($invoice_items as $key => $value): -->
													<option value="<!-- php: // $value->id -->"><!-- php: // $value->name --></option>
												<!-- php: //endforeach -->
											</SearchableSelectField>
										</div>
									</div> -->
								<div class="form-actions">
									<div class="row">
										<div class="offset-md-5 col-md-7">
											<button class="btn btn-xs btn-<!-- php: = $theme2 -->">Submit</button>
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
			<div class="col-md-12">

				<table class="full-width" id="table_lab_analytics">
					<thead>
						<tr>
							<th>Date</th>
							<th>Test Type</th>
							<th>Cases / Tests Count</th>
							<th>Attendance Count</th>
							<th>Unit Cost</th>
							<th>Revenue</th>
							<!-- <th>Patient</th>
							<th>Insurance</th> -->
						</tr>
					</thead>
					<tbody id="specialties_body_lab_analytics">

					</tbody>
				</table>
			</div>

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
	function generateTableLabAnalytics(data) {

		table = $('#table_lab_analytics').DataTable()
		table.destroy()
		const tableBody = document.getElementById('specialties_body_lab_analytics');
		tableBody.innerHTML = ''
		let res = ''
		let count = 0
		data.forEach((ele, id) => {
			Object.entries(ele.lab_tests).forEach(val => {

				count++
				res += \`
					<tr>
						<td>\${ele['period']}</td>
						<td>\${val[0] || ''}</td>
						<td>\${val[1]['tests_count'] || ''}</td>
						<td>\${ele['attendance_count'] || ''}</td>
						<td>\${val[1]['unit_cost']}</td>
						<td>\${val[1]['revenue'] || ''}</td>
					</tr>
				\`
			});
		});

		console.log("this is res", res)
		$('#specialties_body_lab_analytics').html(res)

		$('#table_lab_analytics').DataTable({
			"dom": 'Bfrtip',
			"order": [],
		});
	}

	$("#patient_base_dates_lab_analytics_attendance").on("change", function() {
		let id = "default_custom_date_lab_analytics_attendance"
		if ($('#patient_base_dates_lab_analytics_attendance').val() == 'custom') {
			$('#' + id).show()
		} else {
			$('#' + id).hide()
		}
	});

	/**
	 * Groups lab analytics data dynamically based on date filter selection.
	 * @param {Array} data - Array of report items from the API.
	 * @param {string|number} dateFilter - The selected filter value (2, 3, 5, 7, or 'custom').
	 * @returns {Array} groupedData - Array of grouped summaries.
	 */
	function groupLabAnalyticsData(data, dateFilter) {
		if (!Array.isArray(data) || data.length === 0) return [];

		const formatDate = (d) => new Date(d);

		const getPeriodLabel = (dateStr) => {
			const date = formatDate(dateStr);
			const monthName = date.toLocaleString('default', {
				month: 'long'
			});
			const weekNumber = Math.ceil((date.getDate() - date.getDay() + 1) / 7);

			switch (String(dateFilter)) {
				case '2': // Past week
				case 'custom':
					return [date.toISOString().split('T')[0], date.getMonth() + 1] // group by day
				case '3': // Month
					return [\`\${monthName} - Week \${weekNumber}\`, date.getMonth() + 1] // group by week
				case '5': // Quarter
				case '7': // Year
					return [monthName, date.getMonth() + 1] // group by month
				default:
					return [date.toISOString().split('T')[0], date.getMonth() + 1];
			}
		};

		// Group the data
		const grouped = {};
		for (const item of data) {
			const [period, month] = getPeriodLabel(item.date);
			if (!grouped[period]) {
				grouped[period] = {
					period,
					month,
					tests_count: 0,
					attendance_count: 0,
					revenue: 0,
					lab_tests: {},
				};
			}

			grouped[period].tests_count += Number(item.tests_count) || 0;
			grouped[period].attendance_count += Number(item.attendance_count) || 0;
			grouped[period].revenue += Number(item.revenue) || 0;

			if (!grouped[period].lab_tests[item.lab_test]) {
				grouped[period].lab_tests[item.lab_test] = {
					tests_count: 0,
					attendance_count: 0,
					unit_cost: Number(item.unit_cost) || 0,
					revenue: 0,
				};
			}

			grouped[period].lab_tests[item.lab_test].tests_count += Number(item.tests_count) || 0;
			grouped[period].lab_tests[item.lab_test].attendance_count += Number(item.attendance_count) || 0;
			grouped[period].lab_tests[item.lab_test].revenue += Number(item.revenue) || 0;
		}

		// Convert to array and sort by date
		const result = Object.values(grouped).sort((a, b) =>
			new Date(a.month) - new Date(b.month)
		);

		console.log("this is result", result)

		return result;
	}


	$("#patient_base_filter_lab_analytics").submit(function() {
		try {

			$.ajax({
				type: "GET",
				url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'labAnalyticsData']) -->",
				data: {
					date: document.getElementById('patient_base_dates_lab_analytics_attendance').value != '' ?
						calculateDateRange(document.getElementById('patient_base_dates_lab_analytics_attendance').value, 'lab_analytics')['current'] : null,
					gender: document.getElementById('gender_lab_analytics').value,
					// item_type_id: document.getElementById('invoice_item_type').value,
				},
				success: function g(data, textStatus) {

					generateTableLabAnalytics(groupLabAnalyticsData(data, document.getElementById('patient_base_dates_lab_analytics_attendance').value))
					$('#filter_section_1_lab_analytics').hide()
					titleBuild('lab_analytics_title',
						document.getElementById('patient_base_dates_lab_analytics_attendance').value != '' ?
						calculateDateRange(document.getElementById('patient_base_dates_lab_analytics_attendance').value, 'lab_analytics')['current'] :
						null, {

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

export default function ElementElementReportQueriesLabAnalytics() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
