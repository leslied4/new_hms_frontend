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
		<header>Key Performance Indicators (KPI)</header>
	</div>
	<div class="card-body ">
<div class="row">
    <div class="borderBox light bordered col-md-12">

        <div class="container">
        <div class="col-md-2 d-flex justify-content-start pl-0">
                <SearchableSelectField name="filterkpi" id="filterkpi" class="form-control">
                    <option value="30">0-30 Days</option>
                    <option value="60">0-60 Days</option>
                    <option selected value="90">0-90 Days</option>
                    <!-- <option value="year">This Year</option> -->
                </SearchableSelectField>
            </div>
            <h4 class="d-flex justify-content-end">
                <!-- Top of Mind -->
            <button onclick="refreshKpi()" style="box-shadow:none!important" class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
            </h4>
            <h4>Days Sales Outstanding (DSO)</h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-6 card p-4">
                    <!-- <small class="text-primary mb-0 pb-0">DAYS SALES OUTSTANDING (DSO)</small> -->
                    <h3 id="dso" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-5 p-3 card">
                    <h3 class="font-weight-bold">Days sales outstanding</h3>
                    <p style="font-size:16px">
                        DSO measures the average number of days that it takes to collect payment from patients after a sale has
                        been made.
                    </p>
                </div>
            </div>
            <h4 class="mt-4">Average Accounts Receivable</h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-6 card p-4">
                    <!-- <small class="text-primary mb-0 pb-0">DAYS SALES OUTSTANDING (DSO)</small> -->
                    <h3 id="aar" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-5 p-3 card">
                    <h3 class="font-weight-bold">Average Accounts Receivable</h3>
                    <p style="font-size:16px">
                    Average Account Receivables is the sum of all outstanding invoices in time periods of current (0-30 days), 0-60 days and 0-90 days.
                    </p>
                </div>
            </div>
            <h4 class="mt-4">Best Possible DSO</h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-6 card p-4">
                    <!-- <small class="text-primary mb-0 pb-0">DAYS SALES OUTSTANDING (DSO)</small> -->
                    <h3 id="bdso" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-5 p-3 card">
                    <h3 class="font-weight-bold">Best Possible DSO</h3>
                    <p style="font-size:16px">
                    How do you know if your DSO is too high? By calculating the best possible DSO. This will show you how long your on-time patients take to pay invoices. try to at least keep the number within half of your actual DSO.
                    </p>
                </div>
                
            </div>
            <h4 class="mt-4">Average Days Delinquent (ADD)</h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-6 card p-4">
                    <!-- <small class="text-primary mb-0 pb-0">DAYS SALES OUTSTANDING (DSO)</small> -->
                    <h3 id="add" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-5 p-3 card">
                    <h3 class="font-weight-bold">Average Days Delinquent (ADD)</h3>
                    <p style="font-size:16px">
                    ADD shows you how effectively you can collect receivables on time. The lower your ADD, the closer you are to your best possible days sales outstanding.
                    </p>
                </div>
            </div>
            <h4 class="mt-4">Accounts Receivable Turnover Ratio (ART)</h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-6 card p-4">
                    <!-- <small class="text-primary mb-0 pb-0">DAYS SALES OUTSTANDING (DSO)</small> -->
                    <h3 id="art" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0"></h3>
                </div>
                <div class="col-md-5 p-3 card">
                    <h3 class="font-weight-bold">Accounts Receivable Turnover Ratio (ART)</h3>
                    <p style="font-size:16px">
                    Accounts receivable turnover ratio (ART) measures your ability to turn accounts receivable into cash over a specific period—usually over a year. This metric shows your cash flow and liquidity, two things that you want to keep track of.
                    </p>
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

function kpiTab(filter){
			$.ajax({
				url: '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'kpi']) -->/'+filter,
				type: 'GET',
				cache: false,
                beforeSend: function(){
                    kpiIndicators(0, 0, 0, 0, 0);
                },
				success: function(res){
                    kpiIndicators(res.dso, res.aar, res.bdso, res.add, res.art);
				},
				error: function(){
					console.log("Error Occured");
				}
			});
		}

function kpiIndicators(dso,aar,bdso,add,art){
    var dso_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(dso),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(dso)},
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
    var bdso_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(bdso),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(bdso)},
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
    var aar_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(aar),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(aar)},
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
    var add_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(add),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(add)},
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];
    var art_data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: Number(art),
                number: { prefix: "" },
                delta: { position: "top", reference: Number(art)},
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        var layout = {
        paper_bgcolor: "",
        width: 170,
        height: 100,
        margin: { t: 0, b: 0, l: 0, r: 0 }
        };
        // console.log(gross_collections_data);

        Plotly.newPlot('dso', dso_data, layout);
        Plotly.newPlot('aar', aar_data, layout);
        Plotly.newPlot('bdso', bdso_data, layout);
        Plotly.newPlot('add', add_data, layout);
        Plotly.newPlot('art', art_data, layout);
}

function refreshKpi(){
    kpiTab(90);
}

$("#filterkpi").on("change", function(){
    kpiTab($(this).val());
});

</script>


`;

export default function ElementElementBillingsAnalyticsKpi() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
