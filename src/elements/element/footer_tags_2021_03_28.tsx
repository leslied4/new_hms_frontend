const rawHtml = `

	
	 <!-- start js include path -->
	<!-- php: =$this->Html->script('../assets/plugins/jquery-blockui/jquery.blockui.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/jquery-slimscroll/jquery.slimscroll.js') -->
	<!-- bootstrap -->
	<!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker-init.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->
	<!-- counterup -->
	<!-- php: =$this->Html->script('../assets/plugins/counterup/jquery.waypoints.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/counterup/jquery.counterup.min.js') -->
	<!-- Common js-->
	<!-- php: =$this->Html->script('../assets/js/app.js') -->
	<!-- php: =$this->Html->script('../assets/js/layout.js') -->
	<!-- php: =$this->Html->script('../assets/js/theme-color.js') -->
	<!-- php: //=$this->Html->script('../assets/js/pages/validation/form-validation.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/jquery-validation/js/jquery.validate.min.js') -->
	<!-- material -->
	<!-- php: =$this->Html->script('../assets/plugins/material/material.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/bootstrap-material-datetimepicker.js') -->
	<!-- dropzone -->
	<!-- php: =$this->Html->script('../assets/plugins/dropzone/dropzone.js') -->

	<!-- data tables -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->

	<!-- php: =$this->Html->script('../assets/plugins/summernote/summernote.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/ckeditor/ckeditor.js') -->
	<!--/end main body-->
	<script>
		var mywindow = null;

		function PrintDiv(elem)
		{
			Popup($(elem).html());
		}
		
		function Popup(data)
		{
			mywindow = window.open('', 'Report', 'height=640,width=1200');
			mywindow.document.write('<html><head><title>Firstline24 Report</title>');
			mywindow.document.write('<link rel="stylesheet" href="<!-- php: = $this->Url->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->" type="text/css" />');
			mywindow.document.write('<link rel="stylesheet" href="<!-- php: = $this->Url->css('../assets/plugins/material/material.min.css') -->" type="text/css" />');
			mywindow.document.write('<link rel="stylesheet" href="<!-- php: = $this->Url->css('../assets/css/style.css') -->" type="text/css" />');
			mywindow.document.write('<link rel="stylesheet" href="<!-- php: = $this->Url->css('../assets/css/custom_style.css') -->" type="text/css" />');
			mywindow.document.write('</head><body style="background: #fff; padding-left: 10px; padding-right: 10px;"><div class="container" style="padding-top: 5px">');
			mywindow.document.write(data);
			mywindow.document.write('</div></body></html>');

			mywindow.document.close(); // necessary for IE >= 10
			mywindow.focus(); // necessary for IE >= 10

			mywindow.setTimeout(eventUp, 3000);
			//mywindow.print();
			//mywindow.close();

			return true;
		}

		function eventUp()
		{
			mywindow.print();
		}

	</script>
	
	<!-- php: if((isset($isCurrentVisit) && sizeof($selectedVisit->patient_visit_vitals)) > 0 || (isset($showDrugConsumptionChart) && $showDrugConsumptionChart)) { -->
	
		<script src="<!-- php: = $this->Url->script('../assets/plugins/echarts/echarts.js') -->"></script>
		<!-- php: //= $this->Html->script('../assets/plugins/echarts/echarts.js') -->

		<!-- php: if(null !==($isCurrentVisit) && sizeof($selectedVisit->patient_visit_vitals) > 0) { -->
			<script>

				var xData = [];
				var temperatureData = [];
				var pulseData = [];
				var spoData = [];
				var bloodPressureData = [];
				var hasRendered = false;

				<!-- php: foreach($selectedVisit->patient_visit_vitals as $vital) { -->
						xData.push('<!-- php: = $vital->date_created->format('Y-m-d H:i') -->');
						pulseData.push('<!-- php: = $vital->pulse -->');
						temperatureData.push('<!-- php: = $vital->temperature -->');
						spoData.push('<!-- php: = $vital->oxygen_saturation -->');
						bloodPressureData.push(['40', '<!-- php: = $vital->blood_pressure_2 -->', '<!-- php: = $vital->blood_pressure_1 -->', '160']);
				<!-- php: } -->

				// Only initially the graph with the tab is shown
				// This is a work around with Apache Echart 
				// not able to render correctly in hidden divs
				$('#patientVitalsTab a[data-toggle="tab"]').on('shown.bs.tab', function () {

					if(hasRendered == false && $(this).attr('href') == "#borderBox_tab3") {
						hasRendered = true;        // Make sure to render it only once
						'use strict';
						require.config({
							paths: {
								echarts: "<!-- php: = $this->Url->build(['controller' => 'assets', 'action' => 'plugins']) -->/echarts"
							}
						}), require(["echarts", "echarts/chart/bar", "echarts/chart/chord", "echarts/chart/eventRiver", "echarts/chart/force", "echarts/chart/funnel", "echarts/chart/gauge", "echarts/chart/heatmap", "echarts/chart/k", "echarts/chart/line", "echarts/chart/map", "echarts/chart/pie", "echarts/chart/radar", "echarts/chart/scatter", "echarts/chart/tree", "echarts/chart/treemap", "echarts/chart/venn", "echarts/chart/wordCloud"], function(a) {

							var c = a.init(document.getElementById("echarts_line"));
							c.setOption({
								title: {
									text: "Vitals Chart",
									subtext: "Pulse and Temperature"
								},
								tooltip: {
									trigger: "axis"
								},
								legend: {
									data: ["Pulse", "Temperature"]
								},
								toolbox: {
									show: !0,
									orient: "vertical",
									feature: {
										mark: {
											show: !0
										},
										dataView: {
											show: !0,
											readOnly: !0
										},
										magicType: {
											show: !0,
											type: ["line", "bar"]
										},
										restore: {
											show: !0
										},
										saveAsImage: {
											show: !0
										}
									}
								},
								calculable: !0,
								xAxis: [{
									type: "category",
									boundaryGap: !1,
									data: xData
								}],
								yAxis: [{
									type: "value",
									axisLabel: {
										formatter: "{value}"
									}
								}],
								series: [{
									name: "Pulse",
									type: "line",
									data: pulseData,
									markPoint: {
										data: [{
											type: "max",
											name: "Max"
										}, {
											type: "min",
											name: "Min"
										}]
									}
								}, {
									name: "Temperature",
									type: "line",
									data: temperatureData,
									markPoint: {
										data: [{
											type: "max",
											name: "Max"
										}, {
											type: "min",
											name: "Min"
										}]
									}
								}]
							});

							var c = a.init(document.getElementById("echarts_spo"));
							c.setOption({
								title: {
									text: "",
									subtext: "SpO2"
								},
								tooltip: {
									trigger: "axis"
								},
								legend: {
									data: ["SpO2"]
								},
								toolbox: {
									show: !0,
									orient: "vertical",
									feature: {
										mark: {
											show: !0
										},
										dataView: {
											show: !0,
											readOnly: !1
										},
										magicType: {
											show: !0,
											type: ["line", "bar"]
										},
										restore: {
											show: !0
										},
										saveAsImage: {
											show: !0
										}
									}
								},
								calculable: !0,
								xAxis: [{
									type: "category",
									boundaryGap: !1,
									data: xData
								}],
								yAxis: [{
									type: "value",
									axisLabel: {
										formatter: "{value}"
									}
								}],
								series: [{
									name: "SpO2",
									type: "line",
									data: spoData,
									markPoint: {
										data: [{
											type: "max",
											name: "Max"
										}, {
											type: "min",
											name: "Min"
										}]
									}
								}]
							});

							var e = a.init(document.getElementById("echarts_candle"));
							e.setOption({
								title: {
									text: "",
									subtext: "Blood Pressure"
								},
								tooltip: {
									trigger: "axis",
									formatter: function(a) {
										var b = a[0].seriesName + " " + a[0].name;
										return b += "<br/>Systolic : " + a[0].value[2] + " Diastolic : " + a[0].value[1]
									}
								},
								legend: {
									data: ["Blood Pressure"]
								},
								toolbox: {
									show: !0,
									orient: "vertical",
									feature: {
										mark: {
											show: !0
										},
										dataZoom: {
											show: !0
										},
										dataView: {
											show: !0,
											readOnly: !0
										},
										magicType: {
											show: !1,
											type: ["line", "bar"]
										},
										restore: {
											show: !0
										},
										saveAsImage: {
											show: !0
										}
									}
								},
								dataZoom: {
									show: !0,
									realtime: !0
								},
								xAxis: [{
									type: "category",
									boundaryGap: !0,
									axisTick: {
										onGap: !1
									},
									splitLine: {
										show: !1
									},
									data: xData
								}],
								yAxis: [{
									type: "value",
									scale: !0,
									boundaryGap: [.01, .01]
								}],
								series: [{
									name: "Blood Pressure",
									type: "k",
									data: bloodPressureData
								}]
							});
						})
					}
				});

			</script>
		<!-- php: } -->

		<!-- php: if(null !==($showDrugConsumptionChart) && $showDrugConsumptionChart) { -->
			
			<script>			
				var durations = [];
				var drugLabels = [];
				var series = [];
				var counter = 0;
				
				<!-- php: foreach($chartValues as $key => $chartValue) { -->
					
					durations.push('<!-- php: = $key -->');
					var seriesData = [];
					counter++;
				
					<!-- php: foreach($chartValue as $value) { -->	
						
						seriesData.push('<!-- php: = $value['quantity'] -->');
				
						if(counter == 1) {
							drugLabels.push('<!-- php: = $value['drug_name'] -->');
						}
				
					<!-- php: } -->
				
					series.push({
						name: '<!-- php: = $key -->',
						type: 'bar',
						stack: 'Total',
						label: {
							show: true,
							position: 'insideRight'
						},
						data: seriesData
					})
				
				<!-- php: } -->
				
				'use strict';
				require.config({
					paths: {
						echarts: "<!-- php: = $this->Url->build(['controller' => 'assets', 'action' => 'plugins']) -->/echarts"
					}
				}), require(["echarts", "echarts/chart/bar", "echarts/chart/line", "echarts/chart/pie"], function(a) {
					var f = a.init(document.getElementById("echarts_horizontal"));
					f.setOption({
						tooltip: {
							trigger: 'axis',
							axisPointer: {            
								type: 'shadow'        
							}
						},
						toolbox: {
							show: !0,
							orient: "vertical",
							feature: {
								mark: {
									show: !0
								},
								dataView: {
									show: !0,
									readOnly: !0
								},
								magicType: {
									show: !0,
									type: ["line", "bar"]
								},
								restore: {
									show: !0
								},
								saveAsImage: {
									show: !0
								}
							}
						},
						legend: {
							data: durations
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: {
							type: 'value'
						},
						yAxis: {
							type: 'category',
							data: drugLabels
						},
						label: {
							// Initially, it should be false
							show: true
						},
						series: series
					})
				});
		
			</script>
		<!-- php: } -->

	<!-- php: } -->
`;

export default function ElementElementFooterTags20210328() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
