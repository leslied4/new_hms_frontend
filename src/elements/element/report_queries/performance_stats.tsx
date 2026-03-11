const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Performance Statistics <span id="performance_stats_title"></span></span>
				<div class="col-md-4">
					<h5>Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1_performance_stats').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1_performance_stats" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter_performance_stats']) -->
							<div class="col-md-12">
								<div class="form-group row">
									<label class="col-md-5 control-label">
										Date
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_performance_stats_attendance">
											<option value="2">Past Week</option>
											<option value="3">Month</option>
											<option value="5">Quarter</option>
											<option value="7">Year</option>
											<option value="custom">Custom</option>
										</SearchableSelectField>
									</div>
								</div>
								<div id="default_custom_date_performance_stats_attendance" style="display:none">
									<div class="form-group row">
										<label class="col-md-5 control-label">
											Start Date
										</label>
										<div class="col-md-7">
											<input type="date" id="start_date_performance_stats" class="form-control" name="startDate">
										</div>
									</div>
									<div class="form-group row">
										<label class="col-md-5 control-label">
											End Date
										</label>
										<div class="col-md-7">
											<input type="date" id="end_date_performance_stats" class="form-control" name="endDate">
										</div>
									</div>
								</div>
								<div class="form-group row">
									<label class="col-md-5 control-label">
										Gender
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control" style="width:100%;" id="gender_performance_stats" name="gender">
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

				<table class="full-width" id="table_performance_stats">
					<thead>
						<tr>
							<th>Date</th>
							<th>Cases / Tests Count</th>
							<th>Attendance Count</th>
							<!-- <th>Unit Cost</th> -->
							<th>Revenue</th>
							<!-- <th>Patient</th>
							<th>Insurance</th> -->
						</tr>
					</thead>
					<tbody id="specialties_body_performance_stats">

					</tbody>
				</table>
			</div>

		</div>
	</div>
</div>

<div id="performance_chart" style="width: 100%; height: 500px;"></div>

<!-- php: = $this->Html->script('../assets/plugins/datatables/jquery.dataTables.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/dataTables.buttons.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/jszip.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/pdfmake.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.html5.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/vfs_fonts.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.print.min.js'); -->
<!-- php: = $this->Html->script('/js/echarts.js'); -->

<script>
	function generateTablePerformanceStats(data) {
		generateChartPerformanceStats(data);

		table = $('#table_performance_stats').DataTable()
		table.destroy()
		const tableBody = document.getElementById('specialties_body_performance_stats');
		tableBody.innerHTML = ''
		let res = ''
		let count = 0
		data.forEach((ele, id) => {
			count++
			res += \`
				<tr>
					<td>\${ele['period']}</td>
					<td>\${ele['tests_count'] || ''}</td>
					<td>\${ele['attendance_count'] || ''}</td>
					<td>\${ele['revenue'] || ''}</td>
				</tr>
			\`

		});


		$('#specialties_body_performance_stats').html(res)

		$('#table_performance_stats').DataTable({
			"dom": 'Bfrtip',
			"order": [],
		});
	}

	$("#patient_base_dates_performance_stats_attendance").on("change", function() {
		let id = "default_custom_date_performance_stats_attendance"
		if ($('#patient_base_dates_performance_stats_attendance').val() == 'custom') {
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


	$("#patient_base_filter_performance_stats").submit(function() {
		try {

			$.ajax({
				type: "GET",
				url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'labAnalyticsData']) -->",
				data: {
					date: document.getElementById('patient_base_dates_performance_stats_attendance').value != '' ?
						calculateDateRange(document.getElementById('patient_base_dates_performance_stats_attendance').value, 'performance_stats')['current'] : null,
					gender: document.getElementById('gender_performance_stats').value,
					// item_type_id: document.getElementById('invoice_item_type').value,
				},
				success: function g(data, textStatus) {

					generateTablePerformanceStats(groupLabAnalyticsData(data, document.getElementById('patient_base_dates_performance_stats_attendance').value))
					$('#filter_section_1_performance_stats').hide()
					titleBuild('performance_stats_title',
						document.getElementById('patient_base_dates_performance_stats_attendance').value != '' ?
						calculateDateRange(document.getElementById('patient_base_dates_performance_stats_attendance').value, 'performance_stats')['current'] :
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



	function generateChartPerformanceStats(data) {
		// Initialize chart
		const chartDom = document.getElementById('performance_chart');
		const myChart = echarts.init(chartDom);

		// Prepare data for ECharts
		const periods = data.map(item => item.period);
		const testsCounts = data.map(item => item.tests_count || 0);
		const attendanceCounts = data.map(item => item.attendance_count || 0);
		const revenues = data.map(item => parseFloat(item.revenue) || 0);

		// Chart configuration
		const option = {
			title: {
				text: 'Performance Statistics Overview',
				left: 'center'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			legend: {
				data: ['Tests Count', 'Attendance Count', 'Revenue'],
				top: 30
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {
						title: 'Save as Image'
					},
					dataZoom: {
						title: {
							zoom: 'Zoom',
							back: 'Reset'
						}
					},
					restore: {
						title: 'Restore'
					},
					dataView: {
						title: 'Data View',
						readOnly: false
					}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: periods,
				axisLabel: {
					rotate: 45,
					interval: 0
				}
			},
			yAxis: [{
					type: 'value',
					name: 'Count',
					position: 'left',
					axisLabel: {
						formatter: '{value}'
					}
				},
				{
					type: 'value',
					name: 'Revenue',
					position: 'right',
					axisLabel: {
						formatter: '₵{value}'
					}
				}
			],
			series: [{
					name: 'Tests Count',
					type: 'line',
					smooth: true,
					data: testsCounts,
					itemStyle: {
						color: '#5470c6'
					},
					yAxisIndex: 0
				},
				{
					name: 'Attendance Count',
					type: 'line',
					smooth: true,
					data: attendanceCounts,
					itemStyle: {
						color: '#91cc75'
					},
					yAxisIndex: 0
				},
				{
					name: 'Revenue',
					type: 'bar',
					data: revenues,
					itemStyle: {
						color: '#fac858'
					},
					yAxisIndex: 1
				}
			]
		};

		myChart.setOption(option);

		// Make chart responsive
		window.addEventListener('resize', function() {
			myChart.resize();
		});
	}

	// Alternative: Stacked Bar Chart Version
	function generateStackedBarChart(data) {
		const chartDom = document.getElementById('performance_chart');
		const myChart = echarts.init(chartDom);

		const periods = data.map(item => item.period);
		const testsCounts = data.map(item => item.tests_count || 0);
		const attendanceCounts = data.map(item => item.attendance_count || 0);

		const option = {
			title: {
				text: 'Tests & Attendance Comparison',
				left: 'center'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['Tests Count', 'Attendance Count'],
				top: 30
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: periods,
				axisLabel: {
					rotate: 45,
					interval: 0
				}
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: 'Tests Count',
					type: 'bar',
					stack: 'total',
					data: testsCounts,
					itemStyle: {
						color: '#5470c6'
					}
				},
				{
					name: 'Attendance Count',
					type: 'bar',
					stack: 'total',
					data: attendanceCounts,
					itemStyle: {
						color: '#91cc75'
					}
				}
			]
		};

		myChart.setOption(option);

		window.addEventListener('resize', function() {
			myChart.resize();
		});
	}
</script>
`;

export default function ElementElementReportQueriesPerformanceStats() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
