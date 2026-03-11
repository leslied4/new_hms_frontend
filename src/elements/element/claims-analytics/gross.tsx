const rawHtml = `
<style>
    .darkorange {
        color: darkorange;
    }
</style>
<div class="col-md-12">
	<div class="card card-topline-<!-- php: = $theme1 -->">
<div class="card  card-box">
	<div class="card-head">
		<header>Gross</header>
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
                    <div class="card card-topline-<!-- php: = $theme1 -->">
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
                <SearchableSelectField name="filtergross" id="filtergross" class="form-control">
                    <option value="today">Today so far</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </SearchableSelectField>
            </div>
            <h4 class="mt-4 d-flex justify-content-between">Top of Mind
            <button onclick="refreshgross()" style="box-shadow:none!important" class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
            </h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-3 card p-3">
                    <small class="text-primary mb-0 pb-0">GROSS COLLECTIONS</small>
                    <h3 id="gros-gc" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-3 card p-3">
                    <small class="text-danger mb-0 pb-0">CHARGES</small>
                    <h3 id="gros-c" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                <small class="darkorange mb-0 pb-0">DENIED CLAIMS</small>
                    <h3 id="gros-wr" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">16-30 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                <small class=" text-success mb-0 pb-0">NET COLLLECTIONS</small>
                    <h3 id="gros-nc" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">Above 31 days</small> -->
                </div>
            </div>
        </div>

        <div class="container mt-4 p-3">
            <h4>Gross Collections Vs Net Collections</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: //= $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="gvn-chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div>
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

<script>
     function grossTab(filter){
			$.ajax({
				url: '<!-- php: = $this->Url->build(['controller' => 'CreditClaims', 'action' => 'gross']) -->/'+filter,
				type: 'GET',
				cache: false,
                beforeSend: function(){
                    // $("#gros-gc").text("Loading");
                    // $("#gros-c").text("Loading");
                    // $("#gros-wr").text("Loading");
                    // $("#gros-nc").text("Loading");
                },
				success: function(res){
					// alert("you sabi cook");
					console.log(res);
                    grossgraphs(res.charges, res.gross_collections, res.denied_claims, res.net_collections);
                    getGrossvNet(res.gross_collections.graph_data, res.net_collections.graph_data, res.time_period);
                    // $("#gros-gc").text(res.gross_collections);
                    // $("#gros-c").text(res.charges);
                    // $("#gros-wr").text(res.denied_claims);
                    // $("#gros-nc").text(res.net_collections);
				},
				error: function(){
					console.log("Error Occured");
				}
			});
		}
        function grossgraphs(charges, gross_collections, denied_claims, net_collections){
        var charges_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(charges.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(charges.previous) },
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
        var denied_claims_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(denied_claims.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(denied_claims.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var net_collections_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(net_collections.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(net_collections.previous)},
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var layout = {
        paper_bgcolor: "",
        width: 170,
        height: 100,
        margin: { t: 0, b: 0, l: 0, r: 0 }
        };
        console.log(gross_collections_data);

        Plotly.newPlot('gros-gc', gross_collections_data, layout);
        Plotly.newPlot('gros-c', charges_data, layout);
        Plotly.newPlot('gros-wr', denied_claims_data, layout);
        Plotly.newPlot('gros-nc', net_collections_data, layout);
        // $("#gros-gc").text(res.gross_collections);
        // $("#gros-c").text(res.charges);
        // $("#gros-wr").text(res.denied_claims);
        // $("#gros-nc").text(res.net_collections);
   }
   grossgraphs({recent: 0, previous: 0}, {recent: 0, previous: 0}, {recent: 0, previous: 0}, {recent: 0, previous: 0});
   $("#filtergross").on("change", function(){
        grossTab($(this).val());
   });
   function refreshgross(){
    grossTab('today');
    $("#filtergross").val("today");
   }
//    var echarts = require('echarts');

var gvnchartDom = document.getElementById('gvn-chart-container');
var gvnChart = echarts.init(gvnchartDom);
var gvn_option;
function getGrossvNet(gross_collections, net_collections, time_period){
    
    gvn_option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
        type: 'category',
        data: time_period
        }
    ],
    yAxis: [
        {
        type: 'value'
        }
    ],
    series: [
        {
        name: 'Gross Collections',
        type: 'bar',
        // stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        markLine: {
            lineStyle: {
              type: 'dashed'
            },
            data: [[{ type: 'min' }, { type: 'max' }]]
          },
        data: gross_collections
        },
        {
        name: 'Net Collections',
        type: 'bar',
        // stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        data: net_collections
        }
        
    ]
    };

    gvn_option && gvnChart.setOption(gvn_option);
}

    $(document).ready(function() {
        grossTab('today');
    });


</script>


`;

export default function ElementElementClaimsAnalyticsGross() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
