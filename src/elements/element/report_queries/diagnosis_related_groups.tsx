const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title">
			<div class="caption col-md-12 d-flex justify-content-between">
				<span class="caption-subject font-dark bold uppercase col-md-6">Diagnosis Related Groups</span>
				<div class="col-md-4">
					<h5 >Filter Options &nbsp;&nbsp;&nbsp;<span class="small badge badge-<!-- php: = $theme2 -->"><a style="color: white; font-size: 9px; font-weight: 900" href="javascript:" onclick="javascript:$('#filter_section_3').toggle();">Show/Hide Filter</a></span></h5>
					<div class="card card-box" id="filter_section_3" style="display:none">
						<div class="card-body">
						<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ReportQueries', 'action' => 'drgs'], 'id' => 'patient_drgs_filter']) -->
							<div class="col-md-12 p-1">

								<div class="form-group row">
									<label class="col-md-4 control-label">
										Date
									</label>
									<div class="col-md-8">
										<SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_diagnosis" onchange="toggledateSelelectFields(this, 1)">
											<option value="">All time</option>
											<option value="week">Past Week</option>
											<option value="month">Month</option>
											<option value="quarter">Quarter</option>
											<option value="year">Year</option>
											<option value="custom">Custom</option>
										</SearchableSelectField>
									</div>
								</div>
								<div id="default_custom_date_1" style="display:none">
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
			<div id="drgs_admitted" style="background:;height:400px;width:85vw;margin:0;padding:0"></div>
			<div id="drgs" style="background:;height:400px;width:80vw;margin:0;padding:0"></div>
		</div>
	</div>
</div>

<!-- php: = $this->Html->script('/js/echarts.js'); -->

<script>

    function patientDrgs(points, graph_id, title) {
        var component = echarts.init(document.getElementById(graph_id));
        window.onresize = function() {
            component.resize();
        };
        window.addEventListener('resize',function(){
            component.resize();
        })
        // console.log(points)
        let option = {
			color: ["#4cabce",],
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

    function patientDrgsNameValue(data, graph_id, title) {
        let keys = []
        let values = []
        let results = data || []
        console.log(data)
        if(results.length > 0) {
            results.forEach(res => {
                keys.push(res["name"])
                values.push(res["count"])
            });
            patientDrgs({
                keys: keys,
                values: values,
            }, graph_id, title)
        }
    }


	function patientDrg() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'drgs']) -->",
			success: function g(data, textStatus) {
                console.log(data)
				patientDrgsNameValue(data.drug_groups, 'drgs', 'Diagnosis Related Group - OPD')
				patientDrgsNameValue(data.drug_groups_admitted, 'drgs_admitted', 'Diagnosis Related Group - Admitted')
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log("error", xhr);
			}
		});
	}
	patientDrg()


	$("#patient_base_dates_diagnosis").submit(function () {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'ReportQueries', 'action' => 'patientBase']) -->",
			data: { date: calculateDateRange(document.getElementById('patient_base_dates_base').value)['current'] },
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

export default function ElementElementReportQueriesDiagnosisRelatedGroups() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
