const rawHtml = `
<!-- php: = $this->Html->script('../assets/js/plotly.js') -->
<style>
    .darkorange {
        color: darkorange;
    }

    .plot-container {
        display: flex;
        justify-content: center;
    }

</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <div class="caption">
                <span class="caption-subject font-dark bold uppercase"><!-- php: = $elementTitle --></span>
            </div>
        </div>
        <div class="borderBox-body">
            <div class="card  card-box">
                <div class="card-body">
                    <div class="container">
                        <div class="col-md-2 d-flex justify-content-start pl-0">
                            <SearchableSelectField name="filteranalytics" id="filteranalytics" class="form-control" onchange="generateDataForFilter(this.value)">
                                <option readonly="readonly">Select filter</option>
                                <option value="today">Today so far</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </SearchableSelectField>
                        </div>
                        <h4 class="mt-4 d-flex justify-content-between">Detailed Analytics
                            <button onclick="refresh();" style="box-shadow:none!important"
                                class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
                        </h4>

                        <div class="row d-flex justify-content-between">
                            <div class="col-md-3 card p-3">
                                <small class="text-danger mb-0 pb-0 text-uppercase">Total Waste Quantity</small>
                                <h3 id="total-waste-quantity" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                            </div>
                            <div class="col-md-3 card p-3">
                                <small class="text-danger mb-0 pb-0 text-uppercase">Consumable Waste Quantity</small>
                                <h3 id="total-consumables-quantity" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                            </div>
                            <div class="col-md-3 card p-3">
                                <small class="text-danger mb-0 pb-0 text-uppercase">Drug Waste Quantity</small>
                                <h3 id="total-drugs-quantity" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                            </div>
                            <div class="col-md-3 card p-3">
                                <small class="text-danger mb-0 pb-0 text-uppercase">Waste Action Count</small>
                                <h3 id="waste-action-count" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-between">
                            <div class="col-md-3 card p-3">
                                <small class="text-danger mb-0 pb-0 text-uppercase">Total Waste Amount</small>
                                <h3 id="total-waste-amount" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                            </div>
                            <div class="col-md-3 card p-3">
                                <small class="text-danger mb-0 pb-0 text-uppercase">Consumable Waste Amount</small>
                                <h3 id="total-consumables-amount" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                            </div>
                            <div class="col-md-3 card p-3">
                                <small class="text-danger mb-0 pb-0 text-uppercase">Drug Waste Amount</small>
                                <h3 id="total-drugs-amount" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3>
                            </div>
                            <div class="col-md-3 card p-3">
                                <!-- <small class="text-danger mb-0 pb-0 text-uppercase">Waste Action Count</small> -->
                                <!-- <h3 id="waste-action-count" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0"></h3> -->
                            </div>
                        </div>
                    </div>
                    <div class="container mt-4 p-3">
                        <h4>Consumable Waste Quantity Vs Drug Waste Quantity</h4>
                        <div class="container-fluid card p-2">
                            <div class="row">
                                <div class="col-md-10">
                                    <!-- php: //= $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                                    <div id="quantity-chart-container" style="height: 400px;width:1100px; min-width: 100%;">
                                    </div>
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
                        <h4>Consumable Waste Amount Vs Drug Waste Amount</h4>
                        <div class="container-fluid card p-2">
                            <div class="row">
                                <div class="col-md-10">
                                    <!-- php: //= $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                                    <div id="amount-chart-container" style="height: 400px;width:1100px; min-width: 100%;">
                                    </div>
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
<!-- php: = $this->Html->script('/js/echarts.js'); -->
<script>
    //echarts initiation
    var chartDom = document.getElementById('quantity-chart-container');
    var myChart = echarts.init(chartDom);
    var chartDom2 = document.getElementById('amount-chart-container');
    var myChart2 = echarts.init(chartDom2);
    var option, option2;
    //function to plot data
    function plot_data(total_waste_quantity, waste_actions_count, drug_waste_quantity, consumable_waste_quantity, total_waste_amount, drug_waste_amount, consumable_waste_amount)
    {
        var consumable_waste_amount = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(consumable_waste_amount),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(consumable_waste_amount) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var total_waste_amount = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(total_waste_amount),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(total_waste_amount) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var drug_waste_amount = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(drug_waste_amount),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(drug_waste_amount) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var total_waste_quantity = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(total_waste_quantity),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(total_waste_quantity) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var waste_actions_count = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(waste_actions_count),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(waste_actions_count) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var drug_waste_quantity = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(drug_waste_quantity),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(drug_waste_quantity) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
        var consumable_waste_quantity = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(consumable_waste_quantity),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(consumable_waste_quantity) },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var layout = {
        paper_bgcolor: "",
        width: 170,
        height: 100,
        margin: { t: 0, b: 0, l: 0, r: 0 }
        };

        Plotly.newPlot('total-waste-quantity', total_waste_quantity, layout);
        Plotly.newPlot('waste-action-count', waste_actions_count, layout);
        Plotly.newPlot('total-drugs-quantity', drug_waste_quantity, layout);
        Plotly.newPlot('total-consumables-quantity', consumable_waste_quantity, layout);
        Plotly.newPlot('total-drugs-amount', drug_waste_amount, layout);
        Plotly.newPlot('total-consumables-amount', consumable_waste_amount, layout);
        Plotly.newPlot('total-waste-amount', total_waste_amount, layout);
    }

    //function to collect relevant data
    function collectRelevantData(filter_date, waste, range)
    {
        total_waste_quantity = 0;
        waste_actions_count = 0;
        consumable_waste_quantity = 0;
        drug_waste_quantity = 0;
        total_waste_amount = 0;
        consumable_waste_amount = 0;
        drug_waste_amount = 0;
        
        for (var i in waste){
            wid = new Date(waste[i].date_added)
            if(range == 1){
                item_date = wid.getUTCFullYear() + "/" + wid.getDate()
            }else if(range == 2){
                item_date = wid.getUTCFullYear() + "/" + wid.getMonth() + 1
            }else if(range == 3){
                item_date = wid.getUTCFullYear() 
            }
            if(filter_date === item_date){
                //getting waste actions performed and wasted quantities
                waste_actions_count += 1
                total_waste_quantity += waste[i].item.quantity
                total_waste_amount += waste[i].total_cost_price

                //getting waste quantites based on item categories
                if(waste[i].item.item_category == 1){
                    drug_waste_quantity += waste[i].item.quantity;
                    drug_waste_amount += waste[i].total_cost_price
                }
                if(waste[i].item.item_category == 2){
                    consumable_waste_quantity += waste[i].item.quantity
                    consumable_waste_amount += waste[i].total_cost_price
                }
            }
        }
        generateQuantityChart(consumable_waste_quantity, drug_waste_quantity)
        generateAmountChart(consumable_waste_amount, drug_waste_amount)
        plot_data(total_waste_quantity, waste_actions_count, drug_waste_quantity, consumable_waste_quantity, total_waste_amount, drug_waste_amount, consumable_waste_amount)
    }

    //function to generate data based on timeframe filter
    function generateDataForFilter(filter)
    {
        var waste = <!-- php: echo json_encode($stockList); -->;
        console.log(waste)
        //system date and time
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var year = d.getUTCFullYear();
        
        switch(filter) {
        case 'today':
            filter_date = d.getUTCFullYear() + "/" + d.getDate();
            collectRelevantData(filter_date, waste, 1)
            break;
        case 'month':
            filter_date = d.getUTCFullYear() + "/" + d.getMonth()+1;
            collectRelevantData(filter_date, waste, 2)
            // console.log('total_wate_quantity for today')
            // console.log(total_waste_quantity)
            // console.log('waste actions')
            // console.log(waste_actions_count)
            // console.log('drug waste')
            // console.log(drug_waste_quantity)
            // console.log('consumables waste')
            // console.log(consumable_waste_quantity)

        case 'year':
            filter_date = d.getUTCFullYear()
            collectRelevantData(filter_date, waste, 3)
            break;
        default:
        }
	}
   
    //function to generate waste chart
    function generateQuantityChart(consumable_waste_quantity, drug_waste_quantity)
    {
   

        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                name: 'Stock Waste Analytics',
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
                    fontSize: 40,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: consumable_waste_quantity, name: 'Consumable Waste Quantity' },
                    { value: drug_waste_quantity, name: 'Drug Waste Quantity' }
                    // { value: 300, name: 'Video Ads' }
                ]
                }
            ]
        };

        option && myChart.setOption(option);


    }
    function generateAmountChart(consumable_waste_amount, drug_waste_amount)
    {
   

        option2 = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                name: 'Stock Waste Analytics',
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
                    fontSize: 40,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: consumable_waste_amount, name: 'Consumable Waste Amount' },
                    { value: drug_waste_amount, name: 'Drug Waste Amount' }
                    // { value: 300, name: 'Video Ads' }
                ]
                }
            ]
        };

        option2 && myChart2.setOption(option2);


    }
    generateDataForFilter('today')
</script>

`;

export default function ElementElementInventoryAnalytics() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
