import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Budgeting/index.php';
const rawHtml = `
<!--<link href="../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>-->
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css') -->
<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.buttons.css" />

<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
    <div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
        <h3 style="margin: 0px;" class="setting-header">Budgeting</h3>
    </div>
</div>


<div class="row">
    <div class="col-md-12 col-sm-12">
        <div class="panel tab-border card-box">
            <header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
                <ul class="nav nav-tabs" style="margin-bottom: 0px;" id="budgetingTabs">
                <li class="nav-item top-caption">
                        <a href="#overviewTab" class="" data-toggle="tab">
                            Overview
                        </a>
                    </li>
                    <li class="nav-item top-caption">
                        <a href="#budgetsTab" class="" data-toggle="tab">
                            Budgets
                        </a>
                    </li>
                    <li class="nav-item top-caption">
                        <a href="#managebudgetsTab" class="" data-toggle="tab">
                           Manage Budgets
                        </a>
                    </li>
                    
                   
                    

                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content">
                    <div class="tab-pane" id="budgetsTab">
                        <!-- php: = $this->element('budgeting/createbudget') -->
                    </div>

                    <div class="tab-pane" id="managebudgetsTab">
                        <!-- php: = $this->element('budgeting/managebudgets') -->
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
<!-- <script src="https://colorlib.com/polygon/vendors/jquery/dist/jquery.min.js"></script> -->
 <script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.js"></script>
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.buttons.js"></script>
<script type="text/javascript">
 
    $(document).ready(function () {

            // save tab in local storage
            $('#budgetingTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
                localStorage.setItem('budgetingLastTab', $(this).attr('href'));
            });

            // display last tab if exist
            var manageSecurityLastTab = localStorage.getItem('budgetingLastTab');
            if (manageSecurityLastTab) {
                $('#budgetingTabs a[href=' + manageSecurityLastTab + ']').tab('show');
            } else {
                // Set the first tab if cookie do not exist
                $('#budgetingTabs a[data-toggle="tab"]:first').tab('show');
            }
        }) 
    






        

</script>

`;

export default function BudgetingIndexPage() {
  return (
    <PageShell title="Budgeting/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
