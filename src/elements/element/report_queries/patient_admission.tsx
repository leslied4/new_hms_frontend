const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Patient Admissions</span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_2').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_2" style="display:none">
						<div class="card-body">
						<!-- php: = $this->Form->create(null, [ 'id' => 'patient_admission_filter']) -->
							<div class="col-md-12 p-1">

								<div class="form-group row">
									<label class="col-md-4 control-label">
										Date
									</label>
									<div class="col-md-8">
										<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates-admission">
											<option value="">All time</option>
											<option value="week">Past Week</option>
											<option value="month">Month</option>
											<option value="quarter">Quarter</option>
											<option value="year">Year</option>
										</SearchableSelectField>
									</div>
								</div>
								<div id="default_custom_date_patient_admission" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_patient_admission" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_patient_admission" class="form-control" name="endDate">
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
					<div id="" class="text-primary" style="width:100%;color:grey;font-size:20px;display:flex;justify-content:center">Total Admissions</div>
					<div id="" style="font-weight:bold;height:120px;width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:0;padding:0">
						<div style="font-size:80px;margin:0px;padding:0" id="total"></div>
						<div style="margin-top:-50px;padding:0;display:flex;align-items:center">
							<svg xmlns="http://www.w3.org/2000/svg" style="fill:#28a745" margin="0" padding="0" width="100px" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"/></svg>
							<span style="font-size:30px;font-weight:normal">15%</span> <span style="font-size:20px;font-weight:normal;padding-left:10px">from last month.</span> 
						</div>
					</div>
				</div>
				<div class="col-md-3 card p-3" style="display:flex;justify-content:center;flex-direction:column">
					<div id="" class="text-primary" style="width:100%;color:grey;font-size:20px;display:flex;justify-content:center">Total Inliers</div>
					<div id="" style="font-weight:bold;height:120px;width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:0;padding:0">
						<div style="font-size:80px;margin:0px;padding:0" id="inliers"></div>
						<div style="margin-top:-50px;padding:0;display:flex;align-items:center">
							<svg xmlns="http://www.w3.org/2000/svg" style="fill:#28a745" margin="0" padding="0" width="100px" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"/></svg>
							<span style="font-size:30px;font-weight:normal">12%</span> <span style="font-size:20px;font-weight:normal;padding-left:10px">from last month.</span> 
						</div>
					</div>
				</div>
				<div class="col-md-3 card p-3" style="display:flex;justify-content:center;flex-direction:column">
					<div id="" class="text-primary" style="width:100%;color:grey;font-size:20px;display:flex;justify-content:center">Total Outliers</div>
					<div id="" style="font-weight:bold;height:120px;width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:0;padding:0">
						<div style="font-size:80px;margin:0px;padding:0" id="outliers"></div>
						<div style="margin-top:-50px;padding:0;display:flex;align-items:center">
							<svg xmlns="http://www.w3.org/2000/svg" style="fill:#28a745" margin="0" padding="0" width="100px" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"/></svg>
							<span style="font-size:30px;font-weight:normal">50%</span> <span style="font-size:20px;font-weight:normal;padding-left:10px">from last month.</span> 
						</div>
					</div>
				</div>
			</div>
			<!-- <div id="patient_admission" style="background:;height:400px;width:60vw;margin:0;padding:0"></div>
			<div id="patient_admission_per_hour" style="background:;height:400px;width:80vw;margin:0;padding:0"></div> -->
			<div id="patient_admission_moves" style="background:;height:400px;width:80vw;margin:0;padding:0"></div>
			<div id="patient_admission_moves_specialty" style="background:;height:400px;width:90vw;margin:0;padding:0"></div>
			<div class="col-md-12 card p-3" style="display:flex;flex-direction:row">
				<div id="patient_admission_doctor" style="background:;height:500px;width:40vw;margin:0;padding:0"></div>
				<div id="patient_admission_mid_day" style="background:;height:500px;width:40vw;margin:0;padding:0"></div>
			</div>
		</div>
	</div>
</div>

<!-- php: = $this->Html->script('/js/echarts.js'); -->

<script>

	function plotAdmissionMoves(title, graph_id, points) {
		var component = echarts.init(document.getElementById(graph_id));
		window.onresize = function() {
			component.resize();
		};
		window.addEventListener('resize',function(){
			component.resize();
		})
		let option = {
			color: ["#003366", "#e5323e"],
			title: {
				text: title,
				textStyle: {
					fontWeight: 'bold',
					fontSize: 25
				}
			},
			legend: {
				textStyle: {
					fontSize: 15,
				},
				top: '5%',
				left: 'center'
			},
			xAxis: {
				type: 'category',
				data: points.keys
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					formatter: '{value} %'
				}
			},
			series: [
				{
					name: 'Original',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					emphasis: {
						focus: 'series'
					},
					data: points.original
				},
				{
					name: 'Movement',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					emphasis: {
						focus: 'series'
					},
					data: points.movement
				},
			]
		};
		component.setOption(option)
	}

	function plotAdmissionMovesSpecialty(title, graph_id, points) {
		var component = echarts.init(document.getElementById(graph_id));
		window.onresize = function() {
			component.resize();
		};
		window.addEventListener('resize',function(){
			component.resize();
		})
		let option = {
			color: ['#80FFA5', '#00DDFF'],
			title: {
				text: title,
				textStyle: {
					fontWeight: 'bold',
					fontSize: 25
				}
			},
			legend: {
				textStyle: {
					fontSize: 15,
				},
				top: '5%',
				left: 'center'
			},
			xAxis: {
				type: 'value',
				axisLabel: {
					formatter: '{value} %'
				}
			},
			yAxis: {
				type: 'category',
				data: points.keys
			},
			series: [
				{
					name: 'Original',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					emphasis: {
						focus: 'series'
					},
					data: points.original
				},
				{
					name: 'Movement',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					emphasis: {
						focus: 'series'
					},
					data: points.movement
				},
			]
		};
		component.setOption(option)
	}

	function plotAdmissionDoctors(points, graph_id, title) {
		var component = echarts.init(document.getElementById(graph_id));
		window.onresize = function() {
			component.resize();
		};
		window.addEventListener('resize',function(){
			component.resize();
		})
		let option = {
			color: ["#003366", "#e5323e"],
			title: {
				text: title,
				textStyle: {
					fontWeight: 'bold',
					fontSize: 25
				}
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
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: points
				}
			]
		}
		component.setOption(option)
	}

	function patientAdmissionMoves(data, id, title) {
		let result = data
		let keys = []
		let original = []
		let movement = []
		let hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

		result.forEach(res => {
			keys.push(res.admission_hour)
			original.push(res.original)
			movement.push(res.movement)
		});
		let inliers = original.reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let outliers = movement.reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let total = inliers + outliers

		$('#inliers').text(inliers)
		$('#outliers').text(outliers)
		$('#total').text(total)
		
		plotAdmissionMoves(title, id, {
			keys: keys,
			movement: movement.map(x => parseInt(parseInt(x) * 100/ total)),
			original: original.map(x => parseInt(parseInt(x) * 100/ total))
		})

	}
	function patientAdmissionMovesSpecialty(data, id, title) {
		let result = data
		let keys = []
		let original = []
		let movement = []

		result.forEach(res => {
			keys.push(res.name)
			original.push(res.original)
			movement.push(res.movement)
		});
		let inliers = original.reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let outliers = movement.reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let total = inliers + outliers
		
		plotAdmissionMovesSpecialty(title, id, {
			keys: keys,
			movement: movement.map(x => parseInt(parseInt(x) * 100/ total)),
			original: original.map(x => parseInt(parseInt(x) * 100/ total))
		})

	}

	function patientAdmissionDoctors(data, graph_id, title) {
		let new_obj = []
		let result = data
		result.forEach(res => {
			new_obj.push({
				name: res.name,
				value: res.count
			})
		});
		plotAdmissionDoctors(new_obj, graph_id, title)
	}
	function patientMidDay(data, graph_id, title) {
		let new_obj = []
		let result = data[0]
		new_obj.push({
			name: "Before 12",
			value: result["before_12"]
		})
		new_obj.push({
			name: "After 12",
			value: result["after_12"]
		})
		plotAdmissionDoctors(new_obj, graph_id, title)
	}


	function graphPatientBase() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'patientAdmissions']) -->",
			success: function g(data, textStatus) {
				// patientAdmissionNameValue(data.admission)
				// percentageAdmission(data.admission_by_hour)
				patientAdmissionMoves(data.move_origin_admission, 'patient_admission_moves', 'Patient Admissions')
				patientAdmissionMovesSpecialty(data.admission_by_specialty, 'patient_admission_moves_specialty', 'Specialty Admissions')
				patientAdmissionDoctors(data.admission_by_patient, \`patient_admission_doctor\`, 'Doctor Admission')
				patientMidDay(data.admission_mid_day, \`patient_admission_mid_day\`, 'Mid Day Admission')
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log("error", xhr);
			}
		});
	}
	graphPatientBase()

	function calculateDateRange(selectedOption, location) {
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

	$( "#patient_base_dates-admission" ).on( "change", function() {
		let id = "default_custom_date_patient_admission"
		if($('#patient_base_dates-admission').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

	$("#patient_admission_filter").submit(function () {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'patientAdmissions']) -->",
			data: { date: calculateDateRange(document.getElementById('patient_base_dates-admission').value, 'patient_admission')['current'] },
			success: function g(data, textStatus) {
				// patientAdmissionNameValue(data.admission)
				// percentageAdmission(data.admission_by_hour)
				patientAdmissionMoves(data.move_origin_admission, 'patient_admission_moves', 'Patient Admissions')
				patientAdmissionMovesSpecialty(data.admission_by_specialty, 'patient_admission_moves_specialty', 'Specialty Admissions')
				patientAdmissionDoctors(data.admission_by_patient, \`patient_admission_doctor\`, 'Doctor Admission')
				patientMidDay(data.admission_mid_day, \`patient_admission_mid_day\`, 'Mid Day Admission')
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log("error", xhr);
			}
		});
		return false
	});
</script>
`;

export default function ElementElementReportQueriesPatientAdmission() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
