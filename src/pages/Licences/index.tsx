import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Licences/index.php';
const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
	<div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
		<h3 style="margin: 0px;" class="setting-header">Manage Licences</h3>
	</div>
</div>

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="mainInventoryDrugsTab" >
					<li class="nav-item top-caption">
						<a href="#manageInst" class="" data-toggle="tab">
							Manage Licences
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#managelins" class="" data-toggle="tab">
							System Features
						</a>
					</li>
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane" id="manageInst">
						<!-- php: = $this->element('licences/add_view_licences') -->
					</div>
					<div class="tab-pane" id="managelins">
						<!-- php: = $this->element('licences/add_view_features') -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#mainInventoryDrugsTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('mainInventoryDrugsLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var mainInventoryDrugsLastTab = localStorage.getItem('mainInventoryDrugsLastTab');
		if (mainInventoryDrugsLastTab) {
		   $('#mainInventoryDrugsTab a[href=' + mainInventoryDrugsLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#mainInventoryDrugsTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function LicencesIndexPage() {
  return (
    <PageShell title="Licences/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
