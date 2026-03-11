import PageShell from '../../components/PageShell';

const sourcePath = 'templates/CreditClaims/analytics.php';
const rawHtml = `
<!-- php: = $this->Html->script('../assets/js/plotly.js') -->
<!-- php: = $this->Html->script('/js/echarts.js'); -->
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
	<div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
		<h3 style="margin: 0px;" class="setting-header">Claims Analytics</h3>
	</div>
</div>


<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="analyticsTabs" >
					<li class="nav-item top-caption" onclick="getClaimsSummary()">
						<a href="#summaryTab" class="" data-toggle="tab">
							Summary
						</a>
					</li>					
					<li class="nav-item top-caption" onclick="refreshKpi()">
						<a href="#kpiTab" class="" data-toggle="tab">
							KPI
						</a>
					</li>					
					<li class="nav-item top-caption" onclick="refresh()">
						<a href="#grossvnetTab" class="" data-toggle="tab">
						 Gross vs Net
						</a>
					</li>
					<li class="nav-item top-caption" onclick="refreshgross()">
						<a href="#grossTab" class="" data-toggle="tab">
						 Gross
						</a>
					</li>
					<li class="nav-item top-caption" onclick="refreshnet()">
						<a href="#netTab" class="" data-toggle="tab">
						 Net
						</a>
					</li>
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane" id="summaryTab">
						<!-- php: = $this->element('claims-analytics/summary') -->
					</div>
					<div class="tab-pane" id="kpiTab">
						<!-- php: = $this->element('claims-analytics/kpi') -->
					</div>
					<div class="tab-pane active" id="grossvnetTab">
						<!-- php: = $this->element('claims-analytics/grossvnet') -->
					</div>
					<div class="tab-pane" id="grossTab">
						<!-- php: = $this->element('claims-analytics/gross') -->
					</div>
					<div class="tab-pane" id="netTab">
						<!-- php: = $this->element('claims-analytics/net') -->
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
</div>
<script>
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#analyticsTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('lastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var lastTab = localStorage.getItem('lastTab');
		if (lastTab) {
		   $('#analyticsTabs a[href=' + lastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#analyticsTabs a[data-toggle="tab"]:first').tab('show');
		}

		
	})
</script>
`;

export default function CreditClaimsAnalyticsPage() {
  return (
    <PageShell title="CreditClaims/analytics.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
