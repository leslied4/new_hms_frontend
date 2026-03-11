const rawHtml = `
<style>
    .darkorange {
        color: darkorange;
    }
    .custom-table-header{
        background: #3498db!important;
        color:white;
    }
    .custom-table-header th {
        border: 1px solid #3498db;
        background: #3498db!important;
    }

    
</style>
<div class="col-md-12">
	<div class="card card-topline-<!-- php: = $theme1 -->">
<div class="card  card-box">
	<div class="card-head">
		<header>Summary</header>
	</div>
	<div class="card-body ">
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="container">
        
            <h4 class="mt-4 d-flex justify-content-between">Top of Mind
            <button onclick="getClaimsSummary()" style="box-shadow:none!important" class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
            </h4>
            <div class="row d-flex justify-content-between">
                <div class="col card p-3">
                    <small class="text-primary mb-0 pb-0">PATIENT VISITS</small>
                    <h3 id="patient-visits" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col card p-3">
                  <small class="darkorange mb-0 pb-0">GROSS COLLECTIONS</small>
                      <h3 id="summary-gross-collections" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">16-30 days</small> -->
                </div>
                <div class="col card p-3">
                  <small class=" text-success mb-0 pb-0">NET COLLECTIONS</small>
                      <h3 id="summary-net-collections" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">Above 31 days</small> -->
                </div>
                <div class="col card p-3">
                    <small class="text-primary mb-0 pb-0">TOTAL CLAIMS A/R</small>
                    <h3 id="summary-total-invoice" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                
                <div class="col card p-3">
                    <small class="text-danger mb-0 pb-0">% CLAIMS A/R</small>
                    <h3 id="summary-invoice-over" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                </div>
                <div class="col card p-3">
                    <small class="text-danger mb-0 pb-0">PAID</small>
                    <h3 id="paid-invoice-over" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                </div>
                
            </div>
        </div>

        <div class="container mt-4 py-3 px-0">
            <h4>Claims Accounts Receivable Aging 0-90+ days  <span style="font-weight: bold">per MDC/Specialty</span></h4>
            <div class="container-fluid card p-3">
            <table class="table table-striped">
                <tr class="custom-table-header">
                    <th>MDC/Specialty</th>
                    <th>No. of Claims</th>
                    <th>% A/R per MDC/Specialty</th>
                    <th>Current (0-30) days</th>
                    <th>31-60 days</th>
                    <th>61-90 days</th>
                    <th>90+ days</th>
                    <th>Total</th>
                </tr>
                <tbody id="specialties_table">
                   
                </tbody>
            </table>
            </div>
        </div>
        <div class="container mt-4 py-3 px-0">
            <h4>Claims Accounts Receivable Aging 0-90+ days <span style="font-weight: bold"> per Insurance</span></h4>
            <div class="container-fluid card p-3">
            <table class="table table-striped">
                <tr class="custom-table-header">
                    <th>Insurance</th>
                    <th>No. of Claims</th>
                    <th>% A/R per Insurance</th>
                    <th>Current (0-30) days</th>
                    <th>31-60 days</th>
                    <th>61-90 days</th>
                    <th>90+ days</th>
                    <th>Total</th>
                </tr>
                <tbody id="insurances_table">
                   
                </tbody>
            </table>
            </div>
        </div>
        <!-- <div class="container mt-4 py-3 px-0">
            <h4>Claims Accounts Receivable Aging 0-90+ days</h4>
            <div class="container-fluid card p-3">
            <div id="mdc-chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div>

            </div>
        </div> -->
        <div class="container mt-4 py-3 px-0">
            <h4>Claims Accounts Receivable Aging 0-90+ days <span style="font-weight: bold">per MDC/Specialty</span></h4>
            <div class="container-fluid card p-3">
            <div id="mdc-stacked-container" style="height: 400px;width:1100px; min-width: 100%;"></div>

            </div>
        </div>
        <div class="container mt-4 py-3 px-0">
            <h4>Claims Accounts Receivable Aging 0-90+ days <span style="font-weight: bold"> per Insurance</span></h4>
            <div class="container-fluid card p-3">
            <div id="ins-stacked-container" style="height: 400px;width:1100px; min-width: 100%;"></div>

            </div>
        </div>
        <!-- <div class="container mt-4 py-3 px-0">
            <h4>Claims Payment Methods 0-90+ days</h4>
            <div class="container-fluid card p-3">
            <div id="payments-chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div>

            </div>
        </div> -->
        <div id="procedures-container"></div>
        <!-- <div class="container mt-4 py-3 px-0">
            <h4>Top 10 Lab Procedures 0-90+ days</h4>
            <div class="container-fluid card p-3">
            <div id="services-chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div>

            </div>
        </div> -->
        
    </div>
</div>
</div>
</div>
</div>
</div>




<script>
// var mdcDom = document.getElementById('mdc-chart-container');
// var mdcChart = echarts.init(mdcDom);
// var mdc_option;
// var paymentsDom = document.getElementById('payments-chart-container');
// var servicesDom = document.getElementById('services-chart-container');
// var servChart = echarts.init(servicesDom);
// var paymentsChart = echarts.init(paymentsDom);
var payments_option;
// var services_option;
var mdcStackedGraphDom = document.getElementById('mdc-stacked-container');
var myMdcStacked = echarts.init(mdcStackedGraphDom);
var mdcstackedgraphoption;
var insStackedGraphDom = document.getElementById('ins-stacked-container');
var myinsStacked = echarts.init(insStackedGraphDom);
var insstackedgraphoption;
function getClaimsSummary() {
  $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'CreditClaims', 'action' => 'claimsSummary']) -->',
        type: 'GET',
        cache: false,
        beforeSend: function(){
            // $("#grosvnet-pv").text("Loading");
            // $("#grosvnet-gc").text("Loading");
            // $("#grosvnet-nc").text("Loading");
            // $("#grosvnet-ncr").text("Loading");
            claimsSummaryIndicators({'recent':0, 'previous': 0},{'recent':0, 'previous': 0},{'recent':0, 'previous': 0},{'recent':0, 'previous': 0}, {'recent':0, 'previous': 0}, {'recent':0, 'previous': 0});
        },
        success: function(res){
            // alert("you sabi cook");
            console.log(res);
                claimsSummaryIndicators(res.patient_visits, res.gross_collections, res.net_collections, res.account_receivables, res.account_receivables_rate, res.paid_data);
            $("#payments_table").html(res.payment_options_table);
            $("#specialties_table").html(res.specialties_table);
            $("#insurances_table").html(res.insurance_table);
            // mdcAgedTrial(res.specialties_graph);
            // paymentOptionChart(res.payment_methods_graph);
            getProcedures(res.procedures_data)
            mdcStackedGraph(res.specialties_stacked.names, res.specialties_stacked.current, res.specialties_stacked.days30, res.specialties_stacked.days60, res.specialties_stacked.days90)
            insuranceStackedGraph(res.ins_stacked.names, res.ins_stacked.current, res.ins_stacked.days30, res.ins_stacked.days60, res.ins_stacked.days90)
                //  grosscollectionChart(res.time_period, res.gross_collections.graph_data, res.net_collections.graph_data, res.patient_visits.graph_data);
            //  netcollectionChart(res.time_period, res.net_collections_rate.graph_data, res.receipt_rate);
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



function claimsSummaryIndicators(patient_visits, gross_collections, net_collections, total_invoice, total_invoice_over, paid_data){
    var patient_visits_data = [
        {
            type: "indicator",
            mode: "number+delta",
            value: patient_visits.recent,
            number: { prefix: "" },
            delta: { position: "top", reference: patient_visits.previous},
            domain: { x: [0, 1], y: [0, 1] }
        }
    ];
    var gross_collections_data = [
        {
            type: "indicator",
            mode: "number+delta",
            value: gross_collections.recent,
            number: { prefix: "" },
            delta: { position: "top", reference: gross_collections.previous},
            domain: { x: [0, 1], y: [0, 1] }
        }
    ];
    var net_collections_data = [
        {
            type: "indicator",
            mode: "number+delta",
            value: net_collections.recent,
            number: { prefix: "" },
            delta: { position: "top", reference: net_collections.previous},
            domain: { x: [0, 1], y: [0, 1] }
        }
    ];
    var total_invoice_data = [
        {
            type: "indicator",
            mode: "number+delta",
            value: total_invoice.recent,
            number: { prefix: "" },
            delta: { position: "top", reference: total_invoice.previous},
            domain: { x: [0, 1], y: [0, 1] }
        }
    ];
    var invoice_percent_data = [
        {
            type: "indicator",
            mode: "number+delta",
            value: total_invoice_over.recent,
            number: { prefix: "" },
            delta: { position: "top", reference: total_invoice_over.previous },
            domain: { x: [0, 1], y: [0, 1] }
        }
    ];
    var invoice_paid_data = [
        {
            type: "indicator",
            mode: "number+delta",
            value: paid_data.recent,
            number: { prefix: "" },
            delta: { position: "top", reference: paid_data.previous },
            domain: { x: [0, 1], y: [0, 1] }
        }
    ];
    var layout = {
        paper_bgcolor: "",
        width: 170,
        height: 100,
        margin: { t: 0, b: 0, l: 0, r: 0 }
    };

    Plotly.newPlot('patient-visits', patient_visits_data, layout);
    Plotly.newPlot('summary-gross-collections', gross_collections_data, layout);
    Plotly.newPlot('summary-net-collections', net_collections_data, layout);
    Plotly.newPlot('summary-total-invoice', total_invoice_data, layout);
    Plotly.newPlot('summary-invoice-over', invoice_percent_data, layout);
    Plotly.newPlot('paid-invoice-over', invoice_paid_data, layout);

}

// function mdcAgedTrial(specialtiesdata){
//     mdc_option = {
//     dataset: {
//         source: specialtiesdata
//     },
//     grid: { containLabel: true },
//     xAxis: { name: 'amount' },
//     yAxis: { type: 'category' },

//     series: [
//         {
//         type: 'bar',
//         encode: {
//             // Map the "amount" column to X axis.
//             x: 'amount',
//             // Map the "product" column to Y axis
//             y: 'specialties'
//         }
//         }
//     ]
//     };

//     mdc_option && mdcChart.setOption(mdc_option);
// }
function insuranceStackedGraph(names, current, days30, days60, days90){
    insstackedgraphoption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {},
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
        data: names
    },
    series: [
        {
        name: '0-30 days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: current
        },
        {
        name: '31-60 days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: days30
        },
        {
        name: '61-90 days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: days60
        },
        {
        name: '90+ days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: days90
        }
    ]
    };

    insstackedgraphoption && myinsStacked.setOption(insstackedgraphoption);
}
function mdcStackedGraph(names, current, days30, days60, days90){
    mdcstackedgraphoption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {},
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
        data: names
    },
    series: [
        {
        name: '0-30 days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: current
        },
        {
        name: '31-60 days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: days30
        },
        {
        name: '61-90 days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: days60
        },
        {
        name: '90+ days',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: days90
        }
    ]
    };

    mdcstackedgraphoption && myMdcStacked.setOption(mdcstackedgraphoption);
}
function paymentOptionChart(payment_methods_data){

    payments_option = {
    title: {
        // text: 'Referer of a Website',
        // subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
        //   name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: payment_methods_data,
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ]
    };

    payments_option && paymentsChart.setOption(payments_option);

}
function servicesChart(d, services_data){
    var data = [];
    for(i in services_data){
        data.push(services_data[i]);
    }
    console.log(data);

    var dom = document.getElementById(d.toLowerCase()+'-chart-container');
    var chart = echarts.init(dom);
    // window['option'+i];
   var option = {
    // services_option = {
    title: {
        // text: 'Referer of a Website',
        // subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
        //   name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ]
    };

    option && chart.setOption(option);

}


// mdcStackedGraph();
function getProcedures(data){
    // alert('data acquired'); 

    for(const d in data){
        console.log(Object.keys(data[d]).length);

        if(Object.keys(data[d]).length > 0){
        $("#procedures-container").append('<div class="container mt-4 py-3 px-0"><h4>Top 10 '+d+' 0-90+ days</h4><div class="container-fluid card p-3"><div id="'+d.toLowerCase()+'-chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div></div></div');

        servicesChart(d, data[d]);

        }
    }
}

    $(document).ready(function() {
        getClaimsSummary()
    });
</script>

`;

export default function ElementElementClaimsAnalyticsSummary() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
