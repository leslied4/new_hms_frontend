import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PendingRequests/index.php';
const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
	<div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
		<h3 style="margin: 0px;" class="setting-header">Pending Requests</h3>
	</div>
</div>


<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="PendingRequestsTabs" >
					<li class="nav-item top-caption">
						<a href="#pendingPaymentTab" class="" data-toggle="tab">
							Pending Payment
						</a>
					</li>					
					<li class="nav-item top-caption">
						<a href="#authorisationsTab" class="" data-toggle="tab">
						 Authorisations
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#sampleCollectionTab" class="" data-toggle="tab">
						 Sample Collection
						</a>
					</li>
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane active" id="pendingPaymentTab">
                        <!-- php: = $this->element('pending-requests/pendingpayments') -->
					</div>
					<div class="tab-pane" id="authorisationsTab">
                        <!-- php: = $this->element('pending-requests/authorisations') -->
					</div>
					<div class="tab-pane" id="sampleCollectionTab">
                        <!-- php: = $this->element('pending-requests/samplecollection') -->
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
	
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#PendingRequestsTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('lastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var lastTab = localStorage.getItem('lastTab');
		if (lastTab) {
		   $('#PendingRequestsTabs a[href=' + lastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#PendingRequestsTabs a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>









`;

export default function PendingRequestsIndexPage() {
  return (
    <PageShell title="PendingRequests/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
