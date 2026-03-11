import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Accounts/fy_bookeeping.php';
const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
	<div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
		<h3 style="margin: 0px;" class="setting-header">FY Bookkeeping</h3>
	</div>
</div>


<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="fyBookeepingTabs" >
					<li class="nav-item top-caption">
						<a href="#pendingBookeepingTab" class="" data-toggle="tab">
							Pending
						</a>
					</li>					
					<li class="nav-item top-caption">
						<a href="#reconcileBookeepingTab" class="" data-toggle="tab">
                            Reconcile
						</a>
					</li>
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane active" id="pendingBookeepingTab">
						<!-- php: = $this->element('accounts/pendingbookeeping') -->
					</div>
					<div class="tab-pane" id="reconcileBookeepingTab">
						<!-- php: = $this->element('accounts/reconcilebookeeping') -->
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









`;

export default function AccountsFyBookeepingPage() {
  return (
    <PageShell title="Accounts/fy_bookeeping.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
