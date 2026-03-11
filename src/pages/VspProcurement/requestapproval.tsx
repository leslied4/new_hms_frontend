import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/VspProcurement/requestapproval.php';
const rawHtml = `
<!--<link href="../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>-->
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css') -->
<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->
<style>
    .c-dashboardInfo {
        margin-bottom: 15px;
    }

    .c-dashboardInfo .wrap {
        background: #ffffff;
        box-shadow: 2px 10px 20px rgba(0, 0, 0, 0.1);
        border-radius: 7px;
        text-align: center;
        position: relative;
        overflow: hidden;
        padding: 20px 25px 20px;
        height: 100%;
    }

    .c-dashboardInfo__title,
    .c-dashboardInfo__subInfo {
        color: #6c6c6c;
        font-size: 1.18em;
    }

    .c-dashboardInfo span {
        display: block;
    }

    .c-dashboardInfo__count {
        font-weight: 600;
        font-size: 2.0em;
        /* line-height: 64px; */
        color: #323c43;
    }

    .c-dashboardInfo .wrap:after {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        content: "";
    }

    .c-dashboardInfo:nth-child(1) .wrap:after {
        background: linear-gradient(82.59deg, #00c48c 0%, #00a173 100%);
    }

    .c-dashboardInfo:nth-child(2) .wrap:after {
        background: linear-gradient(81.67deg, #0084f4 0%, #1a4da2 100%);
    }

    .c-dashboardInfo:nth-child(3) .wrap:after {
        background: linear-gradient(69.83deg, #0084f4 0%, #00c48c 100%);
    }

    .c-dashboardInfo:nth-child(4) .wrap:after {
        background: linear-gradient(81.67deg, #ff647c 0%, #1f5dc5 100%);
    }

    .c-dashboardInfo__title svg {
        color: #d7d7d7;
        margin-left: 5px;
    }

    .MuiSvgIcon-root-19 {
        fill: currentColor;
        width: 1em;
        height: 1em;
        display: inline-block;
        font-size: 20px;
        transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        user-select: none;
        flex-shrink: 0;
    }

</style>
<div class="card card-topline-<!-- php: = $theme1 -->" style="margin-bottom: 0px">
    <div class="card-body no-padding" style="padding-top: 5px; padding-bottom: 5px; ">
        <h3 style="margin: 0px;" class="setting-header">VSP Onboarding</h3>
    </div>
</div>


<div class="row">
    <div class="col-md-12 col-sm-12">
        <div class="panel tab-border card-box">
            <header class="panel-heading panel-heading-<!-- php: = $theme1 --> custom-tab " style="padding-bottom: 0px">
                <ul class="nav nav-tabs" style="margin-bottom: 0px;" id="manageSecurityTabs">
                <li class="nav-item top-caption">
                        <a href="#overviewTab" class="" data-toggle="tab">
                            Overview
                        </a>
                    </li>
                    <li class="nav-item top-caption">
                        <a href="#vspsTab" class="" data-toggle="tab">
                            VSPs
                        </a>
                    </li>
                    <!-- <li class="nav-item top-caption">
                        <a href="#manageAccountsTab" class="" data-toggle="tab">
                            Manage Accounts
                        </a>
                    </li> -->
                   <!-- php: foreach($Vsps as $vsp){ -->
                    <style>
                        <!-- php: if($vsp->type=="vendor") { echo ' .invoice-table-header-green { border: 2px solid #27ae60; border-radius: 15px; }'; } else if($vsp->type=="Supplier") { echo ' .invoice-table-header { border: 2px solid tomato; border-radius: 15px; } '; } els... -->


                    </style>
                    <!--<link href="../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>-->
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css') -->
<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->
                    <li class="nav-item top-caption">
                        <a href="#vsp-profileTab<!-- php: = $vsp->id -->" class="" data-toggle="tab">
                            <!-- php: = $vsp->name -->
                            <span class="badge bg-secondary"><!-- php: = $vsp->type --></span>
                        </a>
                    </li>
                    <!-- php: } --> 

                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content">
                    <div class="tab-pane" id="vspsTab">
                        <!-- php: = $this->element('vsp-procurement/vsp') -->
                    </div>
                                                
                                                    
                    <div class="tab-pane" id="manageAccountsTab">
                        <!-- php: = $this->element('accounts/manageaccounts') -->
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>

<script type="text/javascript">
    //
    <!-- php: foreach($Vsps as $vsp) { -->
            $('#vsp-profile<!-- php: = $vsp->id -->').DataTable();
            $('#vsp-catalogue<!-- php: = $vsp->id -->').DataTable();

            $('#payer_type<!-- php: =$vsp->id -->').on('change', function () {
            if ($(this).val() == 'custom') {
                $('#payer_name<!-- php: =$vsp->id -->')
                    .replaceWith('<input type="text" name="payer_name" class="form-control" placeholder="Enter Custom Name"/>');
            } else {
                //    $('#payer_name')
                //  .replaceWith('<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payer_name" id="payer_name" title="Select Payer Name"  data-live-search="true" required> </SearchableSelectField>');

                $.ajax({
                    type: "POST",
                    data: {
                        value: $('#payer_type<!-- php: =$vsp->id -->').val()
                    },
                    url: '/hms/invoicing/get-users',
                    success: function (html) {
                        $('#payer_name<!-- php: =$vsp->id -->').html(html);
                        $('#payer_name<!-- php: =$vsp->id -->').selectpicker("refresh");
                    },
                    error: function () {
                        alert('false');
                    }

                });
            }
        });
            <!-- php: } -->
    $(document).ready(function () {

            // save tab in local storage
            $('#manageSecurityTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
                localStorage.setItem('manageSecurityLastTab', $(this).attr('href'));
            });

            // display last tab if exist
            var manageSecurityLastTab = localStorage.getItem('manageSecurityLastTab');
            if (manageSecurityLastTab) {
                $('#manageSecurityTabs a[href=' + manageSecurityLastTab + ']').tab('show');
            } else {
                // Set the first tab if cookie do not exist
                $('#manageSecurityTabs a[data-toggle="tab"]:first').tab('show');
            }
        }) 
        <!-- php: foreach($Vsps as $vspaccount) { -->
            $('#vsp-profile<!-- php: = $vsp->id -->').DataTable();
        <!-- php: } -->

        $('#online').on('change', function(){
    $('#pay_option').html('<option value="momo">MTN Mobile Money</option><option value="airtetigo">AirtelTigo</option><option value="vodafone-cash">Vodafone Cash</option><option value="card">Credit or Debit Card</option><option value="bank">Direct Bank</option>');
    $('#pay_option').selectpicker("refresh");
});

$('#manual').on('change', function(){ 
    $('#pay_option').html('<option value="cash">Cash</option><option value="cheque">Cheque</option>');
    $('#pay_option').selectpicker("refresh");
});

    

        

</script>

`;

export default function VspProcurementRequestapprovalPage() {
  return (
    <PageShell title="VspProcurement/requestapproval.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
