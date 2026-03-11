const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Patient Discharge</span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_4').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_4" style="display:none">
						<div class="card-body">
						<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ReportQueries', 'action' => 'patientDischarge'], 'id' => 'patient_discharge_filter']) -->
							<div class="col-md-12 p-1">

								<div class="form-group row">
									<label class="col-md-4 control-label">
										Date
									</label>
									<div class="col-md-8">
										<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_discharge" onchange="toggledateSelelectFields(this, 1)">
											<option value="">All time</option>
											<option value="week">Past Week</option>
											<option value="month">Month</option>
											<option value="quarter">Quarter</option>
											<option value="year">Year</option>
											<option value="custom">Custom</option>
										</SearchableSelectField>
									</div>
								</div>
								<div id="default_custom_date_patient_discharge" style="display:none">
										<div class="form-group row">
											<label class="col-md-5 control-label">
												Start Date
											</label>
											<div class="col-md-7">
												<input type="date" id="start_date_patient_discharge" class="form-control" name="startDate">
											</div>
										</div>
										<div class="form-group row">
											<label class="col-md-5 control-label">
												End Date
											</label>
											<div class="col-md-7">
												<input type="date" id="end_date_patient_discharge" class="form-control" name="endDate">
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
					<div id="" class="text-primary" style="width:100%;color:grey;font-size:20px;display:flex;justify-content:center">Total Discharges</div>
					<div id="" style="font-weight:bold;height:120px;width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:0;padding:0">
						<div style="font-size:80px;margin:0px;padding:0" id="total_discharge"></div>
						<div style="margin-top:-50px;padding:0;display:flex;align-items:center">
							<svg xmlns="http://www.w3.org/2000/svg" style="fill:#28a745" margin="0" padding="0" width="100px" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"/></svg>
							<span style="font-size:30px;font-weight:normal">15%</span> <span style="font-size:20px;font-weight:normal;padding-left:10px">from last month.</span> 
						</div>
					</div>
				</div>
				<div class="col-md-3 card p-3" style="display:flex;justify-content:center;flex-direction:column">
					<div id="" class="text-primary" style="width:100%;color:grey;font-size:20px;display:flex;justify-content:center">Total Inliers</div>
					<div id="" style="font-weight:bold;height:120px;width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:0;padding:0">
						<div style="font-size:80px;margin:0px;padding:0" id="inliers_discharge"></div>
						<div style="margin-top:-50px;padding:0;display:flex;align-items:center">
							<svg xmlns="http://www.w3.org/2000/svg" style="fill:#e5323e" margin="0" padding="0" width="100px" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M98,190.06,237.78,353.18a24,24,0,0,0,36.44,0L414,190.06c13.34-15.57,2.28-39.62-18.22-39.62H116.18C95.68,150.44,84.62,174.49,98,190.06Z"/></svg>
							<span style="font-size:30px;font-weight:normal">12%</span> <span style="font-size:20px;font-weight:normal;padding-left:10px">from last month.</span> 
						</div>
					</div>
				</div>
				<div class="col-md-3 card p-3" style="display:flex;justify-content:center;flex-direction:column">
					<div id="" class="text-primary" style="width:100%;color:grey;font-size:20px;display:flex;justify-content:center">Total Outliers</div>
					<div id="" style="font-weight:bold;height:120px;width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:0;padding:0">
						<div style="font-size:80px;margin:0px;padding:0" id="outliers_discharge"></div>
						<div style="margin-top:-50px;padding:0;display:flex;align-items:center">
							<!-- <svg xmlns="http://www.w3.org/2000/svg" style="fill:#28a745" margin="0" padding="0" width="100px" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"/></svg> -->
							<span style="font-size:30px;font-weight:normal">0%</span> <span style="font-size:20px;font-weight:normal;padding-left:10px">from last month.</span> 
						</div>
					</div>
				</div>
			</div>
			<div id="patient_discharge_moves" style="background:;height:400px;width:80vw;margin:0;padding:0"></div>
			<div id="patient_discharge_moves_specialty" style="background:;height:400px;width:80vw;margin:0;padding:0"></div>
			<div id="patient_discharge_doctor" style="background:;height:400px;width:80vw;margin:0;padding:0"></div>
		</div>
	</div>
</div>

<!-- php: = $this->Html->script('/js/echarts.js'); -->

<script>

	function plotdischargeMoves(title, graph_id, points) {
		var component = echarts.init(document.getElementById(graph_id));
		window.onresize = function() {
			component.resize();
		};
		window.addEventListener('resize',function(){
			component.resize();
		})
		let option = {
			color: ["#4cabce", "#e5323e"],
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

	function plotdischargeMovesSpecialty(title, graph_id, points) {
		var component = echarts.init(document.getElementById(graph_id));
		window.onresize = function() {
			component.resize();
		};
		window.addEventListener('resize',function(){
			component.resize();
		})
		let option = {
			color: ["#006699", "#4cabce"],
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

	function plotdischargeDoctors(points, graph_id, title) {
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
			tooltip: {
				trigger: 'item'
			},
			legend: {
				textStyle: {
					fontSize: 15,
				},
				top: '5%',
				left: 'center'
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

	function patientdischargeMoves(data, id, title) {
		let result = data
		let keys = []
		let original = []
		let movement = []
		let hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

		result.forEach(res => {
			keys.push(res.discharge_hour)
			original.push(res.original)
			movement.push(res.movement)
		});
		let inliers = original.reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let outliers = movement.reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let total = inliers + outliers

		$('#inliers_discharge').text(inliers)
		$('#outliers_discharge').text(outliers)
		$('#total_discharge').text(total)
		
		plotdischargeMoves(title, id, {
			keys: keys,
			movement: movement.map(x => parseInt(parseInt(x) * 100/ total)),
			original: original.map(x => parseInt(parseInt(x) * 100/ total))
		})

	}
	function patientdischargeMovesSpecialty(data, id, title) {
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
		
		plotdischargeMovesSpecialty(title, id, {
			keys: keys,
			movement: movement.map(x => parseInt(parseInt(x) * 100/ total)),
			original: original.map(x => parseInt(parseInt(x) * 100/ total))
		})

	}

	function patientdischargeDoctors(data) {
		let new_obj = []
		let result = data
		result.forEach(res => {
			new_obj.push({
				name: res.name,
				value: res.count
			})
		});
		plotdischargeDoctors(new_obj, \`patient_discharge_doctor\`, 'Doctor discharge')
	}

    function dischargeMidDay(data, graph_id, title) {
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
		plotdischargeDoctors(new_obj, graph_id, title)
	}


	$( "#patient_base_dates_base" ).on( "change", function() {
		let id = "default_custom_date_specialties"
		if($('#patient_base_dates_base').val() == 'custom') {
			$('#'+id).show()
		} else {
			$('#'+id).hide()
		}
	});

	function graphPatientDischarge() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'patientDischarge']) -->",
			success: function g(data, textStatus) {
				// patientdischargeNameValue(data.discharge)
				// percentagedischarge(data.discharge_by_hour)
				patientdischargeMoves(data.move_origin_discharge, 'patient_discharge_moves', 'Patient discharges')
				patientdischargeMovesSpecialty(data.discharge_by_specialty, 'patient_discharge_moves_specialty', 'Specialty discharges')
				patientdischargeDoctors(data.discharge_by_patient)
				dischargeMidDay(data.discharge_mid_day, \`patient_discharge_doctor\`, 'Doctor discharge')
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log("error", xhr);
			}
		});
	}
	graphPatientDischarge()
</script>
`;

export default function ElementElementReportQueriesPatientDischarge() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
