const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">REPORTS</span>
			</div>
			<ul class="nav nav-tabs" id="reportTab">
				<li class="nav-item request_lab">
					<a href="#visitReportTab" data-toggle="tab">Drug Consumption</a>
				</li>

			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="visitReportTab">
					<h4 class="font-bold"><center>Drug Consumption Report</center></h4>
					<div class="tools">

						<a href="#" onclick="javascript:PrintDiv('#visit-report')" class="export-link" escape=false>
							<!-- php: = $this->Html->image('../assets/img/print.png',['class' => 'export-action', 'title' => 'Print', 'style' => 'width: 30px; height: auto']) -->
						</a>



						<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Inventory', 'action' => 'drugs', '_ext' => 'pdf']) -->" class="export-link" escape=false>
							<!-- php: = $this->Html->image('../assets/img/pdf.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->
						</a>
					</div>

					<div style="clear: both"></div><br/>

					<div id="visit-report" style="border-top: 4px solid #dddddd; border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-radius: 7px; padding: 20px">

					</div>
				</div>

			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		// save tab in local storage
		$('#reportTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('reportLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var reportLastTab = localStorage.getItem('reportLastTab');
		if (reportLastTab) {
		   $('#reportTab a[href=' + reportLastTab + ']').tab('show');
		}		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#reportTab a[data-toggle="tab"]:first').tab('show');
		}
	});
</script>
`;

export default function ElementElementInventoryReports() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
