import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Accounts/account_adjustments.php';
const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
	<div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
		<h3 style="margin: 0px;" class="setting-header">Account Adjustments</h3>
	</div>
</div>

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="accountAdjustmentsTab" >
					<li class="nav-item  top-caption">
						<a href="#accountReturnsTab" data-toggle="tab">
							Returns
						</a>
					</li>
					<li class="nav-item  top-caption">
						<a href="#accountReconciliationsTab" data-toggle="tab">
							Reconciliation
						</a>
					</li>											
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane" id="accountReturnsTab">
						<!-- php: = $this->element('accounts/account_adjustments_returns') -->
					</div> 
					<div class="tab-pane" id="accountReconciliationsTab">
						<!-- php: = $this->element('accounts/account_adjustments_reconciliation') -->
					</div> 									
				</div>
			</div>
			
		</div>
		
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#accountAdjustmentsTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('transfersLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var transfersLastTab = localStorage.getItem('transfersLastTab');
		if (transfersLastTab) {
		   $('#accountAdjustmentsTab a[href=' + transfersLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#accountAdjustmentsTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function AccountsAccountAdjustmentsPage() {
  return (
    <PageShell title="Accounts/account_adjustments.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
