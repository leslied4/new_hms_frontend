import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Accounts/index.php';
const rawHtml = `

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
        <h3 style="margin: 0px;" class="setting-header">Accounts</h3>
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
                        <a href="#accountsTab" class="" data-toggle="tab">
                            Accounts
                        </a>
                    </li>
                    <!-- <li class="nav-item top-caption">
                        <a href="#manageAccountsTab" class="" data-toggle="tab">
                            Manage Accounts
                        </a>
                    </li> -->

                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content">
                    <div class="tab-pane" id="accountsTab">
                        <!-- php: = $this->element('accounts/accounts') -->
                    </div>
                   
                    <!-- <div class="tab-pane" id="recordExpenseTab">
						<!-- php: //= $this->element('accounts/recordaccounts') -->
					</div> -->
                    <!-- <div class="tab-pane" id="recurringTab">
						<!-- php: //= $this->element('accounts/recurring') -->
					</div> -->
                    <!-- <div class="tab-pane" id="estimateTab">
						<!-- php: //= $this->element('accounts/estimate') -->
					</div> -->
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
    <!-- php: foreach($accounts as $account) { -->
        $('#accountprofile<!-- php: = $account->id -->').DataTable();
        <!-- php: } -->
        <!-- php: foreach($accounts as $account) { -->

        $('#payer_type<!-- php: =$account->id -->').on('change', function () {
            if ($(this).val() == 'custom') {
                $('#payer_name<!-- php: =$account->id -->')
                    .replaceWith('<input type="text" name="payer_name" class="form-control" placeholder="Enter Custom Name"/>');
            } else {
                //    $('#payer_name')
                //  .replaceWith('<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payer_name" id="payer_name" title="Select Payer Name"  data-live-search="true" required> </SearchableSelectField>');

                $.ajax({
                    type: "POST",
                    data: {
                        value: $('#payer_type<!-- php: =$account->id -->').val()
                    },
                    url: '<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getUsers']) -->',
                    success: function (html) {
                        //console.log(html);
                        $('#payer_name<!-- php: =$account->id -->').html(html);
                        $('#payer_name<!-- php: =$account->id -->').selectpicker("refresh");
                    },
                    error: function () {
                        alert('false');
                    }

                });
            }
        });

        $('#payer_type_e<!-- php: =$account->id -->').on('change', function () {
            if ($(this).val() == 'custom') {
                $('#payer_name_e<!-- php: =$account->id -->')
                    .replaceWith('<input type="text" name="payer_name" class="form-control" placeholder="Enter Custom Name"/>');
            } else {
                //    $('#payer_name')
                //  .replaceWith('<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payer_name" id="payer_name" title="Select Payer Name"  data-live-search="true" required> </SearchableSelectField>');

                $.ajax({
                    type: "POST",
                    data: {
                        value: $('#payer_type_e<!-- php: =$account->id -->').val()
                    },
                    url: '<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getUsers']) -->',
                    success: function (html) {
                        $('#payer_name_e<!-- php: =$account->id -->').html(html);
                        $('#payer_name_e<!-- php: =$account->id -->').selectpicker("refresh");
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

    

        

</script>

`;

export default function AccountsIndexPage() {
  return (
    <PageShell title="Accounts/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
