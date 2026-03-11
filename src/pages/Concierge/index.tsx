import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Concierge/index.php';
const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
    <div class="card-body no-padding d-flex" style="padding-top: 5px; padding-bottom: 5px; ">
        <h3 style="margin: 0px;" class="setting-header">Concierge</h3>

    </div>
</div>


<div class="row">
    <div class="col-md-12 col-sm-12">
        <div class="panel tab-border card-box">
            <header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
                <ul class="nav nav-tabs" style="margin-bottom: 0px;" id="manageSecurityTabs">
					<!-- <li class="nav-item top-caption">
					    <a href="#appointmentsTab" class="" data-toggle="tab">
					        Appointments
					    </a>
					</li> -->
					<li class="nav-item top-caption">
					    <a href="#celebrationsTab" class="" data-toggle="tab">
                            Celebrations
					    </a>
					</li>
					<li class="nav-item top-caption">
					    <a href="#transitionsTab" class="" data-toggle="tab">
                            Transitions
					    </a>
					</li>
					<li class="nav-item top-caption">
					    <a href="#passedAwayTab" class="" data-toggle="tab">
                            Deaths
					    </a>
					</li>
					<li class="nav-item top-caption">
					    <a href="#referalsTab" class="" data-toggle="tab">
                            Referrals
					    </a>
					</li>


                    <!-- <li class="nav-item top-caption">
                        <a href="#complianceTab" class="" data-toggle="tab">
                            Compliance
                        </a>
                    </li> -->

                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content">
                    <div class="tab-pane" id="celebrationsTab">
                        <!-- php: = $this->element('concierge/celebrations') -->
                    </div>
                    <div class="tab-pane" id="transitionsTab">
                        <!-- php: = $this->element('concierge/transitions') -->
                    </div>
                    <div class="tab-pane" id="passedAwayTab">
                        <!-- php: = $this->element('concierge/passed_away') -->
                    </div>
                    <div class="tab-pane" id="referalsTab">
                        <!-- php: = $this->element('concierge/referrals') -->
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>

<script type="text/javascript">

    $(document).ready(function () {

            // save tab in local storage
            $('#manageSecurityTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
                localStorage.setItem('manageSecurityLastTabs', $(this).attr('href'));
            });

            // display last tab if exist
            var manageSecurityLastTabs = localStorage.getItem('manageSecurityLastTabs');
            if (manageSecurityLastTabs) {
                $('#manageSecurityTabs a[href=' + manageSecurityLastTabs + ']').tab('show');
            } else {
                // Set the first tab if cookie do not exist
                $('#manageSecurityTabs a[data-toggle="tab"]:first').tab('show');
            }
        }) 

    

        

</script>

`;

export default function ConciergeIndexPage() {
  return (
    <PageShell title="Concierge/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
