const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Patient Base</span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_1').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_1" style="display:none">
						<div class="card-body">
							<!-- php: = $this->Form->create(null, ['id' => 'patient_base_filter']) -->
								<div class="col-md-12 p-1">

									<div class="form-group row">
										<label class="col-md-4 control-label">
											Date
										</label>
										<div class="col-md-8">
											<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base">
												<option value="">All time</option>
												<option value="2">Past Week</option>
												<option value="3">Month</option>
												<option value="5">Quarter</option>
												<option value="7">Year</option>
												<option value="custom">Custom</option>
											</SearchableSelectField>
										</div>
									</div>
									<div id="default_custom_date_base" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_base" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_base" class="form-control" name="endDate">
											</div>
										</div>
									</div>

									<div class="form-actions">
										<div class="row">
											<div class="offset-md-4 col-md-8">
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
			<div class="col-md-12 mb-5" style="display:flex;justify-content:center;">
				<div class="col-md-3 card p-3" style="display:flex;justify-content:center;flex-direction:column">
					<div id="" class="text-primary" style="width:100%;color:grey;font-size:20px;display:flex;justify-content:center">Total Patients</div>
					<div id="" style="font-weight:bold;height:120px;width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:0;padding:0">
						<div style="font-size:80px;margin:0px;padding:0" id="total_patients"></div>
						<div style="margin-top:-50px;padding:0;display:flex;align-items:center">
							<svg xmlns="http://www.w3.org/2000/svg" style="fill:#28a745" margin="0" padding="0" width="100px" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"/></svg>
							<span style="font-size:30px;font-weight:normal">10%</span> <span style="font-size:20px;font-weight:normal;padding-left:10px">from last month.</span> 
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-12 card p-3" style="display:flex;flex-direction:row">
				<div id="main_patient_base" style="background:;height:500px;width:40vw;margin:0;padding:0"></div>
				<div id="children_base" style="background:;height:500px;width:40vw;margin:0;padding:0"></div>
			</div>
			<div id="age_groups" style="background:;height:500px;width:80vw;margin:0;padding:0"></div>
			<div id="age_groups_gender" style="background:;height:500px;width:80vw;margin:0;padding:0"></div>
			<div id="children_age_range" style="background:;height:500px;width:80vw;margin:0;padding:0"></div>
			<div id="patient_specialties" style="background:;height:500px;width:80vw;margin:0;padding:0"></div>
		</div>
	</div>
</div>


<script>

		function patient_base_main(points, graph_id, title) {
			var component = echarts.init(document.getElementById(graph_id));
			window.onresize = function() {
				component.resize();
			};
			window.addEventListener('resize',function(){
				component.resize();
			})
			let option = {
				title: {
					text: title,
					textStyle: {
						fontWeight: 'bold',
						fontSize: 25
					},
					top: -6
				},
				legend: {
					textStyle: {
						fontSize: 15,
					},
					top: '5%',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				series: [
					{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
									}
						},
						labelLine: {
								},
						data: points
					}
				]
			}
			component.setOption(option)
		}
		function age_groups(points, graph_id, title) {
			var component = echarts.init(document.getElementById(graph_id));
			window.onresize = function() {
				component.resize();
			};
			window.addEventListener('resize',function(){
				component.resize();
			})
			// console.log(points)
			let option = {
				color: ["#4cabce", "#e5323e"],
				title: {
					text: title,
					textStyle: {
						fontWeight: 'bold',
						fontSize: 25
					},
					top: -6
				},
				legend: {
					textStyle: {
						fontSize: 15,
					},
					top: '5%',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				xAxis: {
					type: 'value'
				},
				yAxis: {
					type: 'category',
					data: points.keys
				},
				series: [
					{
					data: points.values,
					type: 'bar'
					}
				]
			};
			component.setOption(option)
		}
		function age_groups_gender(points) {
			var component = echarts.init(document.getElementById('age_groups_gender'));
			window.onresize = function() {
				component.resize();
			};
			window.addEventListener('resize',function(){
				component.resize();
			})
			// console.log(points)
			let option = {
				color: ["#4cabce", "#e5323e"],
				title: {
					text: 'Agegroup Gender Count',
					textStyle: {
						fontWeight: 'bold',
						fontSize: 25
					},
					top: -6
				},
				legend: {
					textStyle: {
						fontSize: 15,
					},
					top: '5%',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				xAxis: {
					type: 'value'
				},
				yAxis: {
					type: 'category',
					data: points.keys
				},
				series: [
					{
						name: 'Males',
						data: points.males,
						type: 'bar'
					},
					{
						name: 'Females',
						data: points.females,
						type: 'bar'
					}
				]
			};
			component.setOption(option)
		}

		function children_base(points) {
			var component = echarts.init(document.getElementById(\`children_base\`));
			window.onresize = function() {
				component.resize();
			};
			window.addEventListener('resize',function(){
				component.resize();
			})
			let option = {
				title: {
					text: 'Children Adult Count',
					textStyle: {
						fontWeight: 'bold',
						fontSize: 25
					},
					top: -6
				},
				legend: {
					textStyle: {
						fontSize: 15,
					},
					top: '5%',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				series: [
					{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
									}
						},
						labelLine: {
								},
						data: points
					}
				]
			}
			component.setOption(option)
		}

		function patientBaseNameValue(data) {
			let new_obj = []
			let result = data.patients[0]
			let total = Object.values(data.patients[0]).reduce((partialSum, a) => partialSum + parseInt(a), 0)
			$('#total_patients').text(total)
			console.log(total, "TOTAL")
			for (const property in result) {
				let value = Math.floor(parseInt(result[property]) * 100 / total)
				new_obj.push({ name: \`\${value}% \${property}\`, value: value })
			}
			patient_base_main(new_obj, \`main_patient_base\`, 'Female Male Count')
		}
		function childrenNameValue(data) {
			let new_obj = []
			let result = data[0]
			for (const property in result) {
				let value = (result[property])
				new_obj.push({ name: \`\${value} \${property}\`, value: value })
			}
			patient_base_main(new_obj, \`children_base\`, 'Children Adult Count')
		}
		function ageGroupsNameValue(data, graph_id, title) {
			let keys = []
			let values = []
			let results = data

			results.forEach(res => {
				keys.push(res["name"])
				values.push(res["count"])
			});
			age_groups({
				keys: keys,
				values: values,
			}, graph_id, title)
		}
		function ageGroupsNameValue(data, graph_id, title) {
			let keys = []
			let values = []
			let results = data

			results.forEach(res => {
				keys.push(res["name"])
				values.push(res["count"])
			});
			age_groups({
				keys: keys,
				values: values,
			}, graph_id, title)
		}
		function ageGroupsGendersNameValue(data) {
			let keys = []
			let results = data
			let males = []
			let females = []

			results.forEach(res => {
				keys.push(res["name"])
				males.push(res["males"])
				females.push(res["females"])
			});
			age_groups_gender({
				keys: keys,
				males: males,
				females: females,
			})
		}

		function testEndpoint() {
			$.ajax({
				type: "GET",
				url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'patientBase']) -->",
				success: function g(data, textStatus) {
					patientBaseNameValue(data.male_female)
					childrenNameValue(data.children)
					ageGroupsNameValue(data.age_groups, 'age_groups', 'Age Groups')
					ageGroupsNameValue(data.children_agerange, 'children_age_range', 'Children Age Groups')
					ageGroupsNameValue(data.patient_specialties, 'patient_specialties', 'Patient Specialties')
					ageGroupsGendersNameValue(data.age_groups_gender)
				},
				fail: function g(xhr, textStatus, errorThrown) {
						console.log(xhr);
				}
			});
		}
		testEndpoint()

		function calculateDateRange(selectedOption) {
			let currentDate = new Date();
			
			// Calculate previous dates based on selected option
			let startDate, endDate, previousStartDate, previousEndDate;

			if (selectedOption == 1) {  // Today
				// setFilterVal("Today")
				startDate = new Date(currentDate);
				startDate.setUTCHours(0, 0, 0, 0);
				endDate = new Date(currentDate);
				endDate.setUTCHours(23, 59, 59, 999);

				// Previous day
				previousStartDate = new Date(currentDate);
				previousStartDate.setDate(currentDate.getDate() - 1);
				previousStartDate.setUTCHours(0, 0, 0, 0);
				previousEndDate = new Date(currentDate);
				previousEndDate.setDate(currentDate.getDate() - 1);
				previousEndDate.setUTCHours(23, 59, 59, 999);
			} else if (selectedOption == 2) {  // This Week
				// setFilterVal("This Week")
				startDate = new Date(currentDate);
				startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week
				startDate.setUTCHours(0, 0, 0, 0);
				endDate = new Date(currentDate);
				endDate.setDate(currentDate.getDate() - currentDate.getDay() + 6); // End of the week
				endDate.setUTCHours(23, 59, 59, 999);

				// Previous week
				previousStartDate = new Date(startDate);
				previousStartDate.setDate(startDate.getDate() - 7);
				previousEndDate = new Date(endDate);
				previousEndDate.setDate(endDate.getDate() - 7);
			} else if (selectedOption == 3) {  // This Month
				// setFilterVal("This Month")
				startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
				startDate.setUTCHours(0, 0, 0, 0);
				endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
				endDate.setUTCHours(23, 59, 59, 999);

				// Previous month
				previousStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
				previousStartDate.setUTCHours(0, 0, 0, 0);
				previousEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
				previousEndDate.setUTCHours(23, 59, 59, 999);
			} else if (selectedOption == 5) {  // Quarter
				// setFilterVal("Quarter")
				var currentQuarter = Math.floor((currentDate.getMonth() / 3)) + 1;
				startDate = new Date(currentDate.getFullYear(), (currentQuarter - 1) * 3, 1);
				startDate.setUTCHours(0, 0, 0, 0);
				endDate = new Date(currentDate.getFullYear(), currentQuarter * 3, 0);
				endDate.setUTCHours(23, 59, 59, 999);
			
				// Previous quarter
				var previousQuarterStartMonth = (currentQuarter - 2) * 3;
				previousStartDate = new Date(currentDate.getFullYear(), previousQuarterStartMonth, 1);
				previousStartDate.setUTCHours(0, 0, 0, 0);
				previousEndDate = new Date(currentDate.getFullYear(), (currentQuarter - 1) * 3, 0);
				previousEndDate.setUTCHours(23, 59, 59, 999);
			} else if (selectedOption == 6) {  // Quarter to date
				// setFilterVal("Quarter To Date")
				var currentQuarter = Math.floor((currentDate.getMonth() / 3)) + 1;
				startDate = new Date(currentDate.getFullYear(), (currentQuarter - 1) * 3, 1);
				startDate.setUTCHours(0, 0, 0, 0);
				endDate = new Date(currentDate);
				endDate.setUTCHours(23, 59, 59, 999);
			
				// Previous quarter to date
				var previousQuarterStartMonth = (currentQuarter - 2) * 3;
				previousStartDate = new Date(currentDate.getFullYear(), previousQuarterStartMonth, 1);
				previousStartDate.setUTCHours(0, 0, 0, 0);
				previousEndDate = new Date(currentDate);
				previousEndDate.setDate(previousEndDate.getDate() - 1);
				previousEndDate.setUTCHours(23, 59, 59, 999);
			} else if (selectedOption == 7) {  // Year so far
				// setFilterVal("Year So Far")
				startDate = new Date(currentDate.getFullYear(), 0, 1);
				startDate.setUTCHours(0, 0, 0, 0);
				endDate = new Date(currentDate);
				endDate.setUTCHours(23, 59, 59, 999);

				// Previous year so far
				previousStartDate = new Date(currentDate.getFullYear() - 1, 0, 1);
				previousStartDate.setUTCHours(0, 0, 0, 0);
				previousEndDate = new Date(currentDate.getFullYear() - 1, 11, 31);
				previousEndDate.setUTCHours(23, 59, 59, 999);
			} else if (selectedOption == 8) {  // Year on Year
				// setFilterVal("Year On Year")
				startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
				startDate.setUTCHours(0, 0, 0, 0);
				endDate = new Date(currentDate.getFullYear() - 1, 11, 31);
				endDate.setUTCHours(23, 59, 59, 999);
			
				// Previous year on year
				previousStartDate = new Date(currentDate.getFullYear() - 2, 0, 1);
				previousStartDate.setUTCHours(0, 0, 0, 0);
				previousEndDate = new Date(currentDate.getFullYear() - 2, 11, 31);
				previousEndDate.setUTCHours(23, 59, 59, 999);
			} else if (selectedOption == 'custom') {  // Year on Year
				// setFilterVal("Year On Year")
				let result = {
					current: {
						startDate: $('#start_date_'+location).val(),
						endDate: $('#end_date_'+location).val(),
					},
					previous: {
						startDate: '',
						endDate: '',
					}
				};

				return result;
			}
			
			// Add more conditions for other options...

			// Display the calculated date range

			let result = {
				current: {
					startDate: startDate.toLocaleDateString('en-us'),
					endDate: endDate.toLocaleDateString('en-us')
				},
				previous: {
					startDate: previousStartDate.toLocaleDateString('en-us'),
					endDate: previousEndDate.toLocaleDateString('en-us')
				}
			};

			return result

		}

		$( "#patient_base_dates_base" ).on( "change", function() {
			let id = "default_custom_date_base"
			if($('#patient_base_dates_base').val() == 'custom') {
				$('#'+id).show()
			} else {
				$('#'+id).hide()
			}
		});

		$("#patient_base_filter").submit(function () {
			$.ajax({
				type: "GET",
				url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'patientBase']) -->",
				data: { date: calculateDateRange(document.getElementById('patient_base_dates_base').value, 'base')['current'] },
				success: function g(data, textStatus) {
					patientBaseNameValue(data.male_female)
					childrenNameValue(data.children)
					ageGroupsNameValue(data.age_groups, 'age_groups', 'Age Groups')
					ageGroupsNameValue(data.children_agerange, 'children_age_range', 'Children Age Groups')
					ageGroupsNameValue(data.patient_specialties, 'patient_specialties', 'Patient Specialties')
					ageGroupsGendersNameValue(data.age_groups_gender)
				},
				fail: function g(xhr, textStatus, errorThrown) {
						console.log(xhr);
				}
			});
			return false
		});
</script>
`;

export default function ElementElementReportQueriesPatientBase() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
