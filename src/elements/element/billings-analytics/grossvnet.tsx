const rawHtml = `
<style>
    .darkorange {
        color: darkorange;
    }
    .plot-container {
        display: flex;
        justify-content:center;
    }
</style>
<div class="col-md-12">
	<div class="card card-topline-<!-- php: = $theme1 -->">
<div class="card  card-box">
	<div class="card-head">
		<header>Gross vs Net</header>
	</div>
	<div class="card-body ">
<div class="row">
    <div class="borderBox light bordered col-md-12">

        <!-- <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="card card-topline-<!-- php: = $theme1 -->">
                        <div class="card-body">
                            <div id="total_paid_container" style="background:;height:400px;width:35vw;margin:0;padding:0"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-topline-<!-- php: //= $theme1 -->">
                        <div class="card-body">
                            <div id="container" style="background:;height:400px;width:38vw;margin:0;padding:0"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid card mt-3">
                <div id="amt_receivables_container" style="background:;height:400px;width:78vw;margin:0;padding:0"></div>
            </div>
        </div> -->

        <div class="container">
            <div class="col-md-2 d-flex justify-content-start pl-0">
                <SearchableSelectField name="filtergrossvnet" id="filtergrossvnet" class="form-control">
                    <option value="today">Today so far</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="yearvyear">Year on Year</option>
                </SearchableSelectField>
            </div>
            <h4 class="mt-4 d-flex justify-content-between">Top of Mind
            <button onclick="refresh();" style="box-shadow:none!important" class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
            </h4>

            <div class="row d-flex justify-content-between">
                <div class="col-md-3 card p-3">
                    <small class="text-primary mb-0 pb-0">PATIENT VISITS</small>
                    <h3 id="grosvnet-pv" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-3 card p-3">
                    <small class="text-danger mb-0 pb-0">GROSS COLLECTIONS</small>
                    <h3 id="grosvnet-gc" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                <small class="darkorange mb-0 pb-0">NET COLLECTIONS</small>
                    <h3 id="grosvnet-nc" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">16-30 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                <small class=" text-success mb-0 pb-0">NET COLLECTION RATE</small>
                    <h3 id="grosvnet-ncr" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">Above 31 days</small> -->
                </div>
            </div>
        </div>
        <div class="container mt-4 p-3">
            <h4>Gross Collections Vs Net Collections Vs Patient Visits</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: //= $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div>
                    </div>
                    <div class="col-md-2">
                        <!-- <SearchableSelectField id="total-waiting-approval-year"  class="form-control mt-3">
                            <option>2022</option>
                            <option>2020</option>
                            <option>2019</option>
                        </SearchableSelectField> -->
                        <!-- <h6 class="text-primary mt-5 mb-0 pb-0">Total Waiting for Approval</h6>
                        <h2 id="total-waiting-approval" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                        <!-- <h6 class="darkorange mt-4 mb-0 pb-0">Total Due</h6>
                        <h2 id="total-due" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-danger mt-4 mb-0 pb-0">Total Overdue</h6>
                        <h2 id="total-overdue" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-pending" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-4 p-3">
            <h4>Net Collections Rate Vs Receipt Rate</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: //= $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="nvr-chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div>
                    </div>
                    <div class="col-md-2">
                        <!-- <SearchableSelectField id="total-waiting-approval-year"  class="form-control mt-3">
                            <option>2022</option>
                            <option>2020</option>
                            <option>2019</option>
                        </SearchableSelectField> -->
                        <!-- <h6 class="text-primary mt-5 mb-0 pb-0">Total Waiting for Approval</h6>
                        <h2 id="total-waiting-approval" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                        <!-- <h6 class="darkorange mt-4 mb-0 pb-0">Total Due</h6>
                        <h2 id="total-due" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-danger mt-4 mb-0 pb-0">Total Overdue</h6>
                        <h2 id="total-overdue" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-pending" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                    </div>
                </div>
            </div>
        </div>

    

        
    </div>
</div>
</div>
</div>
</div>
</div>

<!-- <script src="https://fastly.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js"></script> -->
<script>
    function grossvnetTab(filter){
			$.ajax({
				url: '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'grossvnet']) -->/'+ filter,
				type: 'GET',
				cache: false,
                beforeSend: function(){
                    // $("#grosvnet-pv").text("Loading");
                    // $("#grosvnet-gc").text("Loading");
                    // $("#grosvnet-nc").text("Loading");
                    // $("#grosvnet-ncr").text("Loading");
                    grossvnetgraphs({'recent':0, 'previous': 0},{'recent':0, 'previous': 0},{'recent':0, 'previous': 0},{'recent':0, 'previous': 0});
                },
				success: function(res){
					// alert("you sabi cook");
					console.log(res);
                     grossvnetgraphs(res.patient_visits, res.gross_collections, res.net_collections, res.net_collections_rate);
                     grosscollectionChart(res.time_period, res.gross_collections.graph_data, res.net_collections.graph_data, res.patient_visits.graph_data);
                     netcollectionChart(res.time_period, res.net_collections_rate.graph_data, res.receipt_rate);
                    // $("#grosvnet-pv").text(res.patient_visits);
                    // $("#grosvnet-gc").text(res.gross_collections);
                    // $("#grosvnet-nc").text(res.net_collections);
                    // $("#grosvnet-ncr").text(res.net_collections_rate);
				},
				error: function(){
					console.log("Error Occured");
				}
			});
		}
   
   function grossvnetgraphs(patient_visits, gross_collections, net_collections, net_collections_rate){
        var patient_visits_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(patient_visits.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(patient_visits.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var gross_collections_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(gross_collections.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(gross_collections.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var net_collections_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(net_collections.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(net_collections.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var net_collections_rate_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(net_collections_rate.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(net_collections_rate.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var layout = {
        paper_bgcolor: "",
        width: 170,
        height: 100,
        margin: { t: 0, b: 0, l: 0, r: 0 }
        };

        Plotly.newPlot('grosvnet-pv', patient_visits_data, layout);
        Plotly.newPlot('grosvnet-gc', gross_collections_data, layout);
        Plotly.newPlot('grosvnet-nc', net_collections_data, layout);
        Plotly.newPlot('grosvnet-ncr',net_collections_rate_data, layout);
   }
   $("#filtergrossvnet").on("change", function(){
        grossvnetTab($(this).val());
   });
   function refresh(){
    grossvnetTab('today');
    grosscollectionChart();
    $("#filtergrossvnet").val("today");
   }
    var dom = document.getElementById('chart-container');
    var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    var app = {};
    var option;

    var chartDom = document.getElementById('nvr-chart-container');
    var myChart2 = echarts.init(chartDom);
    var option2;

    function grosscollectionChart(time_period, gross_collections, net_collections, patient_visits){
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
                }
            },
            toolbox: {
                feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['Gross Collections', 'Net Collections', 'Patient Visits']
            },
            xAxis: [
                {
                type: 'category',
                data: time_period,
                // interval: 60,
                axisPointer: {
                    type: 'shadow'
                },
                }
            ],
            yAxis: [
                {
                type: 'value',
                name: 'Gross & Net Collections',
                // min: 0,
                // max: 250,
                // interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
                },
                {
                type: 'value',
                name: 'Patient Visits',
                // min: 0,
                // max: 25,
                // interval: 5,
                axisLabel: {
                    formatter: '{value}'
                }
                }
            ],
            series: [
                {
                name: 'Gross Collections',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: gross_collections
                },
                {
                name: 'Net Collections',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: net_collections
                },
                {
                name: 'Patient Visits',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: patient_visits
                }
            ]
        };

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);
    }
    function netcollectionChart(time_period, net_collections, receipt_rate){
        option2 = {
            title: {
                text: 'Stacked Line'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Net Collections Rate', 'Receipt Rate']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: time_period
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                interval: 10,
            },
            series: [
                {
                name: 'Net Collections Rate',
                type: 'line',

                data: net_collections
                },
                {
                name: 'Receipt Rate',
                type: 'line',

                data: receipt_rate
                }
            ]
            };

            option2 && myChart2.setOption(option2);
    }
 
    $(document).ready(function() {
        grossvnetTab('Today')
    });
</script>
`;

export default function ElementElementBillingsAnalyticsGrossvnet() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
