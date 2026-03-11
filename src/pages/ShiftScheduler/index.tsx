import PageShell from '../../components/PageShell';

const sourcePath = 'templates/ShiftScheduler/index.php';
const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
	<div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
		<h3 style="margin: 0px;" class="setting-header">Shift Scheduler</h3>
	</div>
</div>


<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="schedulerTabs" >
					<li class="nav-item top-caption">
						<a href="#investigationsTab" class="" data-toggle="tab">
							Scheduler
						</a>
					</li>					
					<li class="nav-item top-caption">
						<a href="#workTab" class="" data-toggle="tab">
						 Shift Metrics
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#vacationTab" class="" data-toggle="tab">
						 Vacation Metrics
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#emergencyTab" class="" data-toggle="tab">
						 Emergency Off Days Metrics
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#timeTab" class="" data-toggle="tab">
						Time Slot
						</a>
					</li>
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane active" id="investigationsTab">
						<!-- php: = $this->element('shiftscheduler/scheduler') -->
					</div>
					<div class="tab-pane" id="workTab">
						<!-- php: = $this->element('shiftscheduler/workmetrics') -->
					</div>
					<div class="tab-pane" id="vacationTab">
						<!-- php: = $this->element('shiftscheduler/vacationmetrics') -->
					</div>
					<div class="tab-pane" id="emergencyTab">
						<!-- php: = $this->element('shiftscheduler/emergencymetrics') -->
					</div>
					<div class="tab-pane" id="timeTab">
						<!-- php: = $this->element('shiftscheduler/configuretime') -->
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
</div>
<!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js') -->
<!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker-init.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->
<script src="<!-- php: = $this->Url->script('../assets/plugins/echarts/echarts.js') -->"></script>

<script type="text/javascript">
		require.config({
      paths: {
        echarts: "<!-- php: = $this->Url->build(['controller' => 'assets', 'action' => 'plugins']) -->/echarts"
      }
    }), require(["echarts","echarts/chart/bar"], function(a) {

// var c = a.init(document.getElementById("container1"));
// var d = a.init(document.getElementById("container2"));
// var e = a.init(document.getElementById("container3"));

// c.setOption ({
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       // Use axis to trigger tooltip
//       type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
//     }
//   },
//   legend: {data: ['Hours Expected', 'Hours Achieved']},
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['Cashiers','Lab Technicians','Pharmacists','Nurses','Doctors']
//   },
//   series: [
//     {
//       name: 'Hours Expected',
//       type: 'bar',
//       stack: 'total',
//       label: {
//         show: true
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [301, 334, 390, 330, 320]
//     },
//     {
//       name: 'Hours Achieved',
//       type: 'bar',
//       stack: 'total',
//       label: {
//         show: true
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [120, 132, 101, 134, 90]
//     }
//   ]
// });

// d.setOption ({
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       // Use axis to trigger tooltip
//       type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
//     }
//   },
//   legend: {data: ['Hours Expected', 'Hours Achieved']},
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['Cashiers','Lab Technicians','Pharmacists','Nurses','Doctors']
//   },
//   series: [
//     {
//       name: 'Hours Expected',
//       type: 'bar',
//       stack: 'total',
//       label: {
//         show: true
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [301, 334, 390, 330, 320]
//     },
//     {
//       name: 'Hours Achieved',
//       type: 'bar',
//       stack: 'total',
//       label: {
//         show: true
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [120, 132, 101, 134, 90]
//     }
//   ]
// });

// e.setOption ({
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       // Use axis to trigger tooltip
//       type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
//     }
//   },
//   legend: {data: ['Hours Expected', 'Hours Achieved']},
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['Cashiers','Lab Technicians','Pharmacists','Nurses','Doctors']
//   },
//   series: [
//     {
//       name: 'Hours Expected',
//       type: 'bar',
//       stack: 'total',
//       label: {
//         show: true
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [301, 334, 390, 330, 320]
//     },
//     {
//       name: 'Hours Achieved',
//       type: 'bar',
//       stack: 'total',
//       label: {
//         show: true
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [120, 132, 101, 134, 90]
//     }
//   ]
// });
	});
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#schedulerTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('lastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var lastTab = localStorage.getItem('lastTab');
		if (lastTab) {
		   $('#schedulerTabs a[href=' + lastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#schedulerTabs a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>









`;

export default function ShiftSchedulerIndexPage() {
  return (
    <PageShell title="ShiftScheduler/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
