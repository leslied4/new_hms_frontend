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
		<header>Net</header>
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
                <SearchableSelectField name="filternet" id="filternet" class="form-control">
                    <option value="today">Today so far</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </SearchableSelectField>
            </div>
            <h4 class="mt-4 d-flex justify-content-between">Top of Mind
                <button onclick="refreshnet()" style="box-shadow:none!important" class="btn text-primary bg-white"><i
                        class="fa fa-rotate-right"></i></button></h4>
            </h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-3 card p-3">
                    <small class="text-primary mb-0 pb-0">NET COLLECTIONS</small>
                    <h3 id="net-nc" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-3 card p-3">
                    <small class="text-danger mb-0 pb-0">RECEIVED</small>
                    <h3 id="received" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0">
                    </h3>
                    <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                    <small class="darkorange mb-0 pb-0">OUTSTANDING</small>
                    <h3 id="outstanding" style="margin-top:0px!important;margin-bottom:0px!important;"
                        class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">16-30 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                    <small class=" text-success mb-0 pb-0">RECEIPT RATE</small>
                    <h3 id="receipt_rate" style="margin-top:0px!important;margin-bottom:0px!important;"
                        class="my-0 pb-0"></h3>
                    <!-- <small class="text-secondary mt-0">Above 31 days</small> -->
                </div>
            </div>
        </div>
        <div class="container mt-4 p-3">
            <h4>Received Vs Outstanding</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: //= $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="nro-chart-container" style="height: 400px;width:1100px; min-width: 100%;"></div>
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
    function netTab(filter){
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'netTab']) -->/'+filter,
            type: 'GET',
            cache: false,
            beforeSend: function(){
                // $("#net-nc").text("Loading..");
                // $("#received").text("Loading..");
                // $("#outstanding").text("Loading..");
                // $("#receipt_rate").text("Loading..");
            },
            success: function(res){
                // alert("you sabi cook");
                console.log(res);
                netgraphs(res.net_collections, res.received, res.outstanding, res.receipt_rate);
                netgraph(res.time_period, res.received.graph_data, res.outstanding.graph_data);
                // $("#net-nc").text(res.net_collections);
                // $("#received").text(res.received);
                // $("#outstanding").text(res.outstanding);
                // $("#receipt_rate").text(res.receipt_rate);
            },
            error: function(){
                console.log("Error Occured");
            }
        });
	}
    function netgraphs(net_collections, received, outstanding, receipt_rate){
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
        var received_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(received.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(received.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var outstanding_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(outstanding.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(outstanding.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var receipt_rate_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(receipt_rate.recent),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(receipt_rate.previous) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var layout = {
        paper_bgcolor: "",
        width: 170,
        height: 100,
        margin: { t: 0, b: 0, l: 0, r: 0 }
        };

        Plotly.newPlot('net-nc', net_collections_data, layout);
        Plotly.newPlot('received', received_data, layout);
        Plotly.newPlot('outstanding', outstanding_data, layout);
        Plotly.newPlot('receipt_rate', receipt_rate_data, layout);
        // $("#net-nc").text(res.net_collections);
        // $("#received").text(res.received);
        // $("#outstanding").text(res.outstanding);
        // $("#receipt_rate").text(res.receipt_rate);
    }
    netgraphs({previous: 0, recent: 0}, {previous: 0, recent: 0}, {previous: 0, recent: 0}, {previous: 0, recent: 0});
   $("#filternet").on("change", function(){
        netTab($(this).val());
   });
   function refreshnet(){
    netTab('today');
    $("#filternet").val("today");
   }
    var chartDom2 = document.getElementById('nro-chart-container');
    var myChart3 = echarts.init(chartDom2);
    var option3;
    function netgraph(time_period, received, outstanding){
        
        option3 = {
        xAxis: {
            type: 'category',
            data: time_period
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
                trigger: 'axis'
            },
        legend: {
                data: ['Received', 'Outstanding']
        },
        grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
        series: [
            {
            name: 'Received',
            data: received,
            type: 'bar'
            },
            {
            name: 'Outstanding',
            data: outstanding,
            type: 'bar'
            }
        ]
        };

        option3 && myChart3.setOption(option3);

    }

    $(document).ready(function() {
        netTab('today')
    });
    // netgraph();
</script>


`;

export default function ElementElementBillingsAnalyticsNet() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
