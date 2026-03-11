const rawHtml = `
<div class="row">
    <div class="col-md-12">
        <div class="card card-topline-<!-- php: = $theme1 -->">

            <div class="card  card-box">
                <div class="card-head">
                    <header>Shift Metrics</header>
                </div>
                <div class="card-body ">
                    <div class="container-fluid">
                        <h6 class="text-danger" id="err-text">Invalid date range</h6>
                        <form id="search">
                            <div class="row">
                                <div class="col-md-2 pr-3">

                                    <div class="form-group">
                                        <label>From:</label>
                                        <input type="date" name="from" id="from" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-2 pl-0">
                                    <div class="form-group">
                                        <label>To:</label>
                                        <input type="date" name="to" id="to" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-1 d-flex pl-0 align-items-center">
                                    <button id="go-btn" type="submit" class="btn btn-sm btn-primary mt-3">Go</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="row">
                        <div class="col-md-4 p-2">
                            <div class="container bg-white card p-3 pb-4">
                                <h4 class="text-center">General Information</h4>

                                <h1 class="m-0 mt-2 text-center" id="total-patients">0</h1>
                                <h5 class="text-primary text-center mt-0">Total Patients</h5>


                                <h1 class="m-0 mt-4 text-center" id="total-revenue">₵ 0</h1>
                                <h5 class="text-primary text-center mt-0">Total Revenue</h5>

                                <h1 class="m-0 mt-2 text-center" id="total-hours">0 hrs</h1>
                                <h5 class="text-primary text-center mt-0">Total Hours Expected</h5>

                                <h1 class="m-0 mt-4 text-center" id="total-reached">0 hrs</h1>
                                <h5 class="text-primary text-center mt-0">Total Hours Achieved</h5>

                            </div>
                        </div>
                        <div class="col-md-8 card p-2">
                            <div class="container bg-white p-3">
                                <div id="container1" style="height: 400px;width:820px; min-width: 100%;"></div>
                                <div class="row mt-5">
                                    <div class="col-md-4 p-3">
                                        <h4 class="text-center">Total Number Per Roles</h4>
                                        <div id="total_users_roles_count"></div>
                                    </div>
                                    <div class="col-md-4 p-3">
                                        <h4 class="text-center">Total Hours Expected Per Roles</h4>
                                        <div id="total_roles">

                                        </div>
                                    </div>
                                    <div class="col-md-4 p-3">
                                        <h4 class="text-center">Total Hours Achieved Per Roles</h4>
                                        <div id="total_roles_acheived">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="preview" tabindex="-1" aria-labelledby="preview" aria-hidden="true"
                    aria-hidden="true">
                    <div class="modal-dialog  modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="container px-0 border border-2 border-primary">
                                <div class="container-fluid pr-0 bg-primary">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h4 class="text-slate-900 my-0">View Doctors</h4>
                                        <div>
                                            <button data-dismiss="modal" aria-label="Close"
                                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                    class="fa fa-times text-primary"></i> </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="container bg-white p-2">
                                    <div class="container-fluid">
                                        <h4>Doctors Metrics</h4>
                                        <table class="table table-bordered mt-3">
                                            <tr>
                                                <th>Name</th>
                                                <th>Department</th>
                                                <th>Total Hours Expected</th>
                                                <th>Total Hours Reached</th>
                                                <th>Patients</th>
                                                <th>Revenue</th>
                                            </tr>
                                            <tr>
                                                <td>Abukari Einus</td>
                                                <td>Radiology</td>
                                                <td>10</td>
                                                <td>20</td>
                                                <td>10</td>
                                                <td>20</td>
                                            </tr>
                                            <tr>
                                                <td>Abukari Einus</td>
                                                <td>Radiology</td>
                                                <td>10</td>
                                                <td>20</td>
                                                <td>10</td>
                                                <td>20</td>
                                            </tr>
                                            <tr>
                                                <td>Abukari Einus</td>
                                                <td>Radiology</td>
                                                <td>10</td>
                                                <td>20</td>
                                                <td>10</td>
                                                <td>20</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="container-fluid pr-0 bg-primary">
                                    <div class="d-flex align-items-center py-1 justify-content-end">
                                        <button style="height:20px;width:auto;"
                                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                            data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                                class="fa fa-times text-danger fa-1x"></i> </button>
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

<!-- php: = $this->Html->script('/js/echarts.js'); -->
<script>
// var echarts = require('echarts');
var chartDom = document.getElementById('container1');
var myChart = echarts.init(chartDom);
var option;  
$('#err-text').hide();
$('#to').on("change", function(){



	if($('#from').val() > $('#to').val())
	{
		$('#from').css("border","1px solid tomato");
		$('#to').css("border","1px solid tomato");
		$('#go-btn').attr('disabled', true);
		$('#err-text').show();
	}
	else {
		$('#from').css("border","1px solid lightgreen");
		$('#to').css("border","1px solid lightgreen");
		$('#go-btn').attr('disabled', false);
		$('#err-text').hide();
	}
});
$('document').ready(function(){
	$.ajax({
			method: 'GET',
			url: '<!-- php: echo $this->Url->build( [ 'controller' => 'ShiftScheduler', 'action' => 'getMetrics/work'] ); -->',
			cache: false,
			beforeSend: function(){
				//$('#total_roles').html('Loading..');
			},
			success: function(response){
				var data = JSON.parse(response);
				$('#total-patients').html(data.total_patients);
				$('#total-revenue').html("₵"+data.total_revenue);
				$('#total-hours').html(data.total_hours+" hrs");
				$('#total-reached').html(data.total_hours_reached+" hrs");
				$('#doctors-num').html(data.doctors);
				$('#nurses-num').html(data.nurses);
				$('#pharm-num').html(data.pharmacists);
				$('#lab-num').html(data.labtechnicians);
				$('#cash-num').html(data.cashiers);

				generateChart(data.total_hours_roles, data.total_hours, data.total_hours_acheived_roles);

				$.each(data.total_hours_roles, function(k, v){
                    $('#total_roles').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' hrs</h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});

				$.each(data.total_users_roles_count, function(k, v){
					$('#total_users_roles_count').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' </h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});
				
				$.each(data.total_hours_acheived_roles, function(k, v){
					$('#total_roles_acheived').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' hrs</h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});
				

				
			}
		})
})
$('#search').on('submit', function(e){
	e.preventDefault();
	if($('#from').val() !='' || $('#to').val() != '')
	{
		var from = $('#from').val();
		var to = $('#to').val();
	    $.ajax({
			method: 'GET',
			url: '<!-- php: echo $this->Url->build( [ 'controller' => 'ShiftScheduler', 'action' => 'getMetrics'] ); -->',
			data: {from:from,to:to},
			cache: false,
			success: function(response){
				//clear elements
				$('#total_roles').html('');
				$('#total_users_roles_count').html('');
				$('#total_roles_acheived').html('');

				console.log(response);
				var data = JSON.parse(response);
				$('#total-patients').html(data.total_patients);
				$('#total-revenue').html("₵"+data.total_revenue);
				$('#total-hours').html(data.total_hours+" hrs");
				$('#total-reached').html(data.total_hours_reached+" hrs");
				$('#doctors-num').html(data.doctors);
				$('#nurses-num').html(data.nurses);
				$('#pharm-num').html(data.pharmacists);
				$('#lab-num').html(data.labtechnicians);
				$('#cash-num').html(data.cashiers);

				generateChart(data.total_hours_roles, data.total_hours, data.total_hours_acheived_roles);

				$.each(data.total_hours_roles, function(k, v){
                    $('#total_roles').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' hrs</h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});

				$.each(data.total_users_roles_count, function(k, v){
					$('#total_users_roles_count').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' </h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});
				
				$.each(data.total_hours_acheived_roles, function(k, v){
					$('#total_roles_acheived').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' hrs</h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});

				
			}
		})
	}
})


function generateChart(roles, hours_assigned, hours_achieved){
	// console.log(Object.keys(roles));
	// console.log(Object.values(roles));
	// console.log(Object.values(hours_achieved));
	// return;
	option = {
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
		data: Object.keys(roles)
	},
	series: [
		{
		name: 'Hours Assigned',
		type: 'bar',
		stack: 'total',
		label: {
			show: true
		},
		emphasis: {
			focus: 'series'
		},
		data: Object.values(roles)
		},
		{
		name: 'Hours Achieved',
		type: 'bar',
		stack: 'total',
		label: {
			show: true
		},
		emphasis: {
			focus: 'series'
		},
		data: Object.values(hours_achieved)
		}
	]
	};

	option && myChart.setOption(option);
}
</script>

`;

export default function ElementElementShiftschedulerWorkmetrics() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
