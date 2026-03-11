import PageShell from '../../components/PageShell';

const sourcePath = 'templates/ImmunizationRequest/manage_vaccines.php';
const rawHtml = `


<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
	<div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
		<h3 style="margin: 0px;" class="setting-header">Manage Vaccines</h3>
	</div>
</div>


<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="manageVaccinesTabs" >				
					<li class="nav-item top-caption">
						<a href="#vaccinesTab" class="" data-toggle="tab">
							Vaccines
						</a>
					</li>				
					<li class="nav-item top-caption">
						<a href="#vaccineTypeTab" class="" data-toggle="tab">
							Vaccine Types
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#adverseReactionTab" class="" data-toggle="tab">
							AEFI Category
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#aefiTab" class="" data-toggle="tab">
							AEFI Symptoms
						</a>
					</li>
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane" id="vaccinesTab">
					<!-- php: = $this->element('manageVaccines/vaccines') -->
					</div>
					<div class="tab-pane" id="vaccineTypeTab">
						<!-- php: = $this->element('manageVaccines/vaccine_types') -->
					</div>					
					<div class="tab-pane" id="adverseReactionTab">
						<!-- php: = $this->element('manageVaccines/aefi_categories') -->
					</div>
					<div class="tab-pane" id="aefiTab">
						<!-- php: = $this->element('manageVaccines/aefi_symptoms') -->
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#manageVaccinesTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('lastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var lastTab = localStorage.getItem('lastTab');
		if (lastTab) {
		   $('#manageVaccinesTabs a[href=' + lastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#manageVaccinesTabs a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ImmunizationRequestManageVaccinesPage() {
  return (
    <PageShell title="ImmunizationRequest/manage_vaccines.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
