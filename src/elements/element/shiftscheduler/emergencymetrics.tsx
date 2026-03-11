const rawHtml = `
<div class="row">
	<div class="col-md-12">
	<div class="card card-topline-<!-- php: = $theme1 -->">

<div class="card  card-box">
	<div class="card-head">
		<header>Emergency Metrics</header>
	</div>
	<div class="card-body ">
	<div class="container mt-4">
	<h6 class="text-danger" id="err-text3">Invalid date range</h6>
	<form id="search3">
				<div class="row">
					<div class="col-md-2 pr-3">
						
					<div class="form-group">
					  <label>From:</label>
					  <input type="date" name="from3" id="from3" class="form-control">
				  </div>
					</div>
					<div class="col-md-2 pl-0">
					<div class="form-group">
					  <label>To:</label>
					  <input type="date" name="to3" id="to3" class="form-control">
				  </div>
					</div>
					<div class="col-md-1 d-flex pl-0 align-items-center">
				  <button id="go-btn3" type="submit" class="btn btn-sm btn-primary mt-3">Go</button>
				  </div>
				</div>
</form>
			</div>
		<div class="row px-4">

		    <div style="height:100%" class="container-fluid card p-2">
		        <div class="container py-5 bg-white p-3">
		            <div id="container3" style="height: 400px;width:1020px; min-width: 100%;"></div>

		            <div class="row mt-5">
		                <div class="col-md-4 p-3">
		                    <h4 class="text-center">Total Number Per Roles</h4>
		                    <div id="total_users_roles_count_emergency"></div>
		                </div>
		                <div class="col-md-4 p-3">
		                    <h4 class="text-center">Total Hours Commited</h4>
		                    <div id="total_roles_emergency">

		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
		</div>
	

	<div class="modal fade" id="preview" tabindex="-1" aria-labelledby="preview" aria-hidden="true" aria-hidden="true">
<div class="modal-dialog  modal-dialog-centered" role="document">
	<div class="modal-content">
	 <div class="container px-0 border border-2 border-primary">
         <div class="container-fluid pr-0 bg-primary">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="text-slate-900 my-0">View Doctors</h4>
					<div>
						<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
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
		<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
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
var emergencychartDom = document.getElementById('container3');
var emergencyChart = echarts.init(emergencychartDom);
var emergency_option;  

$('#err-text3').hide();
$('#to3').on("change", function(){
  
	if($('#from3').val() > $('#to3').val())
	{
		$('#from3').css("border","1px solid tomato");
		$('#to3').css("border","1px solid tomato");
		$('#go-btn3').attr('disabled', true);
		$('#err-text3').show();
	}
	else {
		$('#from3').css("border","1px solid lightgreen");
		$('#to3').css("border","1px solid lightgreen");
		$('#go-btn3').attr('disabled', false);
		$('#err-text3').hide();
	}
});
$('document').ready(function(){
	$.ajax({
			method: 'GET',
			url: '<!-- php: echo $this->Url->build( [ 'controller' => 'ShiftScheduler', 'action' => 'getMetrics/emergency'] ); -->',
			cache: false,
			success: function(response){
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

				generateEmergencyChart(data.total_hours_roles, data.total_hours, data.total_hours_acheived_roles);
				$.each(data.total_hours_roles, function(k, v){
                    $('#total_roles_emergency').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' hrs</h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});

				$.each(data.total_users_roles_count, function(k, v){
					$('#total_users_roles_count_emergency').append(' <div class="container mt-4"><h1 class="m-0 text-center"> '+ v +' </h1> <h5 style="text-transform:capitalize;" class="text-primary text-center mt-0"> '+ k +' </h5> </div>');
				});
				
			}
		})
})
$('#search').on('submit', function(e){
	e.preventDefault();
	if($('#from3').val() !='' || $('#to').val() != '')
	{
		var from = $('#from3').val();
		var to = $('#to').val();
	    $.ajax({
			method: 'GET',
			url: '<!-- php: echo $this->Url->build( [ 'controller' => 'ShiftScheduler', 'action' => 'getMetrics'] ); -->',
			data: {from:from,to:to},
			cache: false,
			success: function(response){
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
				
			}
		})
	}
})

function generateEmergencyChart(roles, hours_assigned, hours_achieved){
	// console.log(Object.keys(roles));
	// console.log(Object.values(roles));
	// console.log(Object.values(hours_achieved));
	// return;
	console.log('function runs');
	emergency_option = {
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
		name: 'Hours Committed',
		type: 'bar',
		stack: 'total',
		label: {
			show: true
		},
		emphasis: {
			focus: 'series'
		},
		data: Object.values(roles)
		}
	]
	};

	emergency_option && emergencyChart.setOption(emergency_option);
}

</script>

`;

export default function ElementElementShiftschedulerEmergencymetrics() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
