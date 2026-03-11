import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Accounts/account_view.php';
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
                <ul class="nav nav-tabs" style="margin-bottom: 0px;" id="accountingTabs">

                    <!-- php: foreach($accounts as $account){ if($account->active == 1){ -->
                    <style>
                        <!-- php: if($account->accounts_tags[0]->attribute=="MONEY IN") { echo ' .invoice-table-header-green { border: 2px solid #27ae60; border-radius: 15px; } '; } else if($account->accounts_tags[0]->attribute=="MONEY OUT") { echo ' .invoice-table-header {... -->


                    </style>
                    <li class="nav-item top-caption">
                        <a href="#accountprofileTab" class="" data-toggle="tab">
                            <!-- php: = $account->account_name == null ? $account->banks_list->name : $account->account_name -->
                            <span class="badge bg-<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo 'success'; }else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'danger'; } else if($account->accounts_tags[0]->attribute == "MONEY IN OUT") { echo 'secondary'; ... -->"><!-- php: = $account->transaction_code --></span>
                        </a>
                    </li>
                    <!-- php: }} -->

                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content">

                    <!-- php: foreach($accounts as $account){ if($account->active == 1){ -->
                    <div class="tab-pane" id="accountprofileTab">
                        <div class="row">
                            <div class="borderBox light bordered col-md-12">

                                <div class="borderBox-body">
                                    <div class="tab-content">

                                        <div class="tab-pane active" id="view_bank_account">
                                            <div class="container-fluid mt-3 px-5">
                                                <div class="container-fluid pl-0 d-flex justify-content-between">
                                                    <div>
                                                <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ -->
                                                      <a href="javascript:" data-toggle="modal" data-target="#record_payment<!-- php: = $account->id -->"  class="btn btn-success"><i class="fa fa-plus"></i>&nbsp; Add Transaction</a>
                                                    <!-- php: } else if($account->accounts_tags[0]->attribute == "MONEY OUT"){ -->
                                                        <a href="javascript:" data-toggle="modal" data-target="#record_expense<!-- php: = $account->id -->" class="btn btn-danger"><i class="fa fa-plus"></i>&nbsp; Add Expense</a>
                                                    <!-- php: } else { -->
                                                        <a href="javascript:" data-toggle="modal" data-target="#record_payment<!-- php: = $account->id -->"  class="btn btn-success"><i class="fa fa-plus"></i>&nbsp; Add Transaction</a>
                                                        <a href="javascript:" data-toggle="modal" data-target="#record_expense<!-- php: = $account->id -->" class="btn btn-danger"><i class="fa fa-plus"></i>&nbsp; Add Expense</a>
                                                    <!-- php: } -->
                                                    </div>
                                                   <div>
                                                   <a href="javascript:" data-toggle="modal" data-target="#view_account_protocol<!-- php: = $account->id -->" class="text-dark">
                                                    <i class="material-icons">settings</i>
                                                    </a>
                                                    <a href="javascript:" data-toggle="modal" data-target="#view_compliance<!-- php: = $account->id -->" class="text-dark mx-3">
                                                    <i class="material-icons">assignment_turned_in</i>
                                                    </a>
                                                    <!-- php: if($account->has('banks_list')){ -->
                                                        <a href="javascript:" data-toggle="modal" data-target="#view_info<!-- php: = $account->id -->" class="text-dark">
                                                    <i style="width:22px" class="material-icons">help_center</i>
                                                    </a>
                                                    <!-- php: } -->
                                                   </div>
                                                    

                                                    
                                                </div>
                                            

                                                <div id="root">
                                                    <div class="container-fluid pt-5">
                                                        <div class="row align-items-stretch">
                                                            <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ -->
                                                                <div class="c-dashboardInfo pl-0 col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Account Balance<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $acc = 0; foreach($account->accounts_balances as $acc_balance){ //$acc+=$acc_balance->balance; } foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if( $account_feed->status == 'Full Payment' || $account_feed->status == 'Deposited' || $account_feed->status == 'Undeposited' || $account_feed->status == 'waiting approval'){ $acc+=$account_feed->credit; // $acc+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($acc, 2); -->
                                                                        </span>
                                                                </div>
                                                            </div>

                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Deposited<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $deposited = 0; foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if($account_feed->status == 'Deposited' || $account_feed->status == "Full Payment" ){ $deposited+=$account_feed->credit; $deposited+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($deposited, 2); -->
                                                                     
                                                                    </span>
                                                                    <!--<span
											                        class="hind-font caption-12 c-dashboardInfo__subInfo">Last month: ₵30</span>-->
                                                                </div>
                                                            </div>
                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Undeposited<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $undeposited = 0; foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if($account_feed->status == 'Undeposited' || $account_feed->status == 'waiting approval'){ $undeposited+=$account_feed->credit; $undeposited+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($undeposited, 2); -->
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        <!-- php: = $account->opening_status == 1 ? 'Opening Balance' : 'Closing Balance' --><svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                       <!-- php: $blnce = 0; // foreach($account->accounts_balances as $acc_balance){ $blnce= $account->opening_balance ; // } -->
                                                                       <div>
                                                                        <!-- php: if($account->opening_status == 0){ -->
                                                                            <!-- php: = number_format($blnce + $acc, 2) --><br/>
                                                                        <!-- php: } else { -->
                                                                            <!-- php: = number_format($blnce, 2) --><br/>
                                                                      <!-- php: } -->
                                                                       
                                                                       <!-- php: = $account->opening_status == 0 ? '<a href="javascript:" data-toggle="modal" data-target="#close_acc_modal'.$account->id.'" class="btn btn-danger mt-2"> Close Account </a>' : '' -->
                                                                    </div>  
                                                                    </span>
                                                                </div>
                                                                
                                                            </div>
                                                            <!-- php: } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { -->
                                                                <div class="c-dashboardInfo pl-0 col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Account Balance<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $acc2 = 0; foreach($account->accounts_balances as $acc_balance){ // $acc2+=$acc_balance->balance; } foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if( $account_feed->status == 'Full Payment' || $account_feed->status == 'Deposited' || $account_feed->status == 'waiting approval'){ // $acc2+=$account_feed->credit; $acc2+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($acc2, 2); -->
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Paid<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $acc = 0; foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if($account_feed->status == 'Full Payment' || $account_feed->status == 'Part Payment'){ //$acc+=$account_feed->credit; $acc+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($acc, 2); -->
                                                                    </span>
                                                                    <!--<span
											                        class="hind-font caption-12 c-dashboardInfo__subInfo">Last month: ₵30</span>-->
                                                                </div>
                                                            </div>
                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Not Paid<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $not_paid = 0; foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if( $account_feed->status == 'No Payment'){ //$not_paid+=$account_feed->credit; $not_paid+=$account_feed->debit; } -->
                                                                             <!-- php: if($account_feed->status == 'waiting approval'){ //$not_paid+=$account_feed->credit; $not_paid+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($not_paid, 2); -->
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        <!-- php: = $account->opening_status == 1 ? 'Opening Balance' : 'Closing Balance' --><svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $blnce2 = 0; // foreach($account->accounts_balances as $acc_balance){ $blnce2 = $account->accounts_balances[sizeof($account->accounts_balances) - 1]->balance; // } -->
                                                                        <!-- php: if($account->opening_status == 0){ echo number_format($blnce2 + $acc2, 2); } else { echo number_format($blnce2, 2); } -->
                                                                       </span>
                                                                       <!-- php: = $account->opening_status == 0 ? '<a href="javascript:" data-toggle="modal" data-target="#close_acc_modal'.$account->id.'" class="btn btn-danger mt-2"> Close Account </a>' : '' -->
                                                                </div>
                                                            </div>
                                                            <!-- php: } else{ -->
                                                                <div class="c-dashboardInfo pl-0 col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Account Balance<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $acc3 = 0; foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if( $account_feed->status == 'Deposited' || $account_feed->status == 'Full Payment'){ $acc3+=$account_feed->credit; $acc3-=$account_feed->debit; } -->
                                                                         
                                                                        <!-- php: } endforeach; -->
                                                                          <!-- php: foreach($account->accounts_balances as $acc_balance){ // $acc3+=$acc_balance->balance; } echo number_format($acc3, 2); -->
                                                                        
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Money In<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $m_i = 0; foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if($account_feed->status == 'Deposited' || $account_feed->status == 'Full Payment'){ $m_i+=$account_feed->credit; // $m_i+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($m_i, 2); -->
                                                                    </span>
                                                                    <!--<span
											                        class="hind-font caption-12 c-dashboardInfo__subInfo">Last month: ₵30</span>-->
                                                                </div>
                                                            </div>
                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        Money Out<svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $m_o = 0; foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                          <!-- php: if($account_feed->status == 'Deposited' || $account_feed->status == 'Full Payment'){ //$m_i+=$account_feed->credit; $m_o+=$account_feed->debit; } -->
                                                                        <!-- php: } endforeach; echo number_format($m_o, 2); -->
                                                                    
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                                                <div class="wrap">
                                                                    <h4
                                                                        class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                                                        <!-- php: = $account->opening_status == 1 ? 'Opening Balance' : 'Closing Balance' --><svg class="MuiSvgIcon-root-19"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation">
                                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                                            <path
                                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                                                            </path>
                                                                        </svg></h4><span
                                                                        class="hind-font caption-12 c-dashboardInfo__count">
                                                                        <!-- php: $blnce3 = 0; // foreach($account->accounts_balances as $acc_balance){ $blnce3=$account->accounts_balances[sizeof($account->accounts_balances) - 1]->balance // } -->
                                                                    
                                                                       <!-- php: if( $account->opening_status == 0 ){ echo number_format($blnce3 + $acc3, 2); } else { echo number_format($blnce3, 2); } --><br/>
                                                                       <!-- php: = $account->opening_status == 0 ? '<a href="javascript:" data-toggle="modal" data-target="#close_acc_modal'.$account->id.'" class="btn btn-danger mt-2"> Close Account </a>' : '' -->
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <!-- php: } -->

                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="table-responsive">
                                                    <table id="accountprofiletable"
                                                        class="table table-hover customDatable full-width">

                                                        <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ -->
                                                        <thead>
                                                            <th><span
                                                                    class="invoice-table-header-green py-2 px-3">Date</span>
                                                            </th>
                                                            <th>Payer Name</th>
                                                            <th><span
                                                                    class="invoice-table-header-green py-2 px-3">Status</span>
                                                            </th>
                                                            <th>Category</th>
                                                            <th>Tax(%)</th>
                                                            <th><span
                                                                class="invoice-table-header-green py-2 px-3">Credit</span>
                                                            </th>
                                                            <th>Actions</th>
                                                        </thead>



                                                        <!-- php: }else if($account->accounts_tags[0]->attribute == "MONEY OUT") { -->
                                                        <thead>
                                                            <th><span class="invoice-table-header py-2 px-3">Date</span>
                                                            </th>
                                                            <th>Payee Name</th>
                                                            <th><span
                                                                    class="invoice-table-header py-2 px-3">Status</span>
                                                            </th>
                                                            <th>Category</th>
                                                            <th>Tax(%)</th>
                                                            <th><span
                                                                    class="invoice-table-header py-2 px-3">Debit</span>
                                                            </th>
                                                            <th>Actions</th>
                                                        </thead>

                                                        <!-- php: } else{ -->
                                                        <thead>
                                                            <th><span class="invoice-table-both py-2 px-3">Date</span>
                                                            </th>
                                                            <th>Name</th>
                                                            <th><span class="invoice-table-both py-2 px-3">Status</span>
                                                            </th>
                                                            <th>Category</th>
                                                            <th>Tax(%)</th>
                                                            <th><span class="invoice-table-header-green py-2 px-3">Credit</span>
                                                            <th><span class="invoice-table-header py-2 px-3">Debit</span>
                                                            </th>
                                                            <th>Actions</th>
                                                        </thead>

                                                        <!-- php: } -->

                                                         <tbody>
                                                             <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ -->
                                                               <!-- php: foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                <tr>
                                                                    <td><!-- php: = $account_feed->date --></td>
                                                                    <td><!-- php: = $account_feed->name --></td>
                                                                    <td class ="<!-- php: = $account_feed->status == "Full Payment" || $account_feed->status == "Deposited" ? 'text-success' : ($account_feed->status == "Flagged" ? 'text-danger' : 'text-primary') -->"><!-- php: = $account_feed->status --><br/>
                                                                    <!-- php: = $account_feed->reason != "" ? "<small class='text-secondary'>".$account_feed->reason."</small>" : "" -->
                                                                   </td>
                                                                    <td><!-- php: = $account_feed->category --></td>
                                                                    <td><!-- php: = $account_feed->tax --></td>
                                                                    <td><!-- php: = number_format($account_feed->credit, 2) --></td>
                                                                    <td>
                                                                        <!-- <a href="javascript:"
                                                                            class="btn btn-secondary btn-sm">Disable</a> -->
                                                                            <!-- php: = $account_feed->category == 'not defined' || $account_feed->status == "Undeposited" ? '<a data-toggle="modal" data-target="#reconcile_'.$account_feed->id.'" class="btn btn-sm btn-danger">Reconcile</a><br/><a data-toggle="modal" data-target... -->
                                                                            <!-- php: = $account_feed->status == 'waiting approval' ? '<br/><a data-toggle="modal" href="javascript:" data-target="#appr_'.$account_feed->id.'" class="btn btn-sm btn-success">Approve</a> ' : '' -->
                                                                        
                                                                    </td>
                                                                </tr>
                                                                <!-- php: } endforeach; -->
                                                            <!-- php: } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { -->
                                                                <!-- php: foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                
                                                                <tr>
                                                                    <td><!-- php: = $account_feed->date --></td>
                                                                    <td><!-- php: = $account_feed->name --></td>
                                                                    <td class ="<!-- php: = $account_feed->status == "Full Payment" ? 'text-success' : ($account_feed->status == "Flagged" ? 'text-danger' : 'text-primary') -->"><!-- php: = $account_feed->status --></td>
                                                                    <td><!-- php: = $account_feed->category --></td>
                                                                    <td><!-- php: = $account_feed->tax --></td>
                                                                    <td><!-- php: = number_format($account_feed->debit, 2) --></td>
                                                                    <td>
                                                                        <!-- <a href="javascript:"
                                                                            class="btn btn-secondary btn-sm">Disable</a> -->
                                                                            <!-- php: = $account_feed->category == 'not defined' || $account_feed->status == "Undeposited" ? '<a data-toggle="modal" data-target="#reconcile_'.$account_feed->id.'" class="btn btn-sm btn-danger">Reconcile</a><br/><a data-toggle="modal" data-target... -->
                                                                            <!-- php: = $account_feed->status == 'waiting approval' ? '<br/><a data-toggle="modal" href="javascript:" data-target="#appr_'.$account_feed->id.'" class="btn btn-sm btn-success">Approve</a><br/><a data-toggle="modal" data-target="#flag_'.$account_fe... -->
                                                                            <!-- php: = $account_feed->status == 'Flagged' ? '<br/><a data-toggle="modal" href="javascript:" data-target="#appr_'.$account_feed->id.'" class="btn btn-sm btn-success">Approve</a><br/>' : '' -->
                                                                    </td>
                                                                </tr>
                                                            <!-- php: } endforeach; -->
                                                            <!-- php: } else { -->
                                                                <!-- php: foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                                
                                                                <tr>
                                                                    <td><!-- php: = $account_feed->date --></td>
                                                                    <td><!-- php: = $account_feed->name --></td>
                                                                    <td class ="<!-- php: = $account_feed->status == "Full Payment" ? 'text-success' : 'text-primary' -->"><!-- php: = $account_feed->status --></td>
                                                                    <td><!-- php: = $account_feed->category --></td>
                                                                    <td><!-- php: = $account_feed->tax --></td>
                                                                    <td><!-- php: = number_format($account_feed->credit, 2) --></td>
                                                                    <td><!-- php: = $account_feed->debit --></td>
                                                                    <td>
                                                                        <!-- <a href="javascript:"
                                                                            class="btn btn-secondary btn-sm">Disable</a> -->
                                                                            <!-- php: = $account_feed->category == 'not defined' || $account_feed->status == "Undeposited" ? '<a data-toggle="modal" data-target="#reconcile_'.$account_feed->id.'" class="btn btn-sm btn-danger">Reconcile</a><br/><a data-toggle="modal" data-target... -->
                                                                            <!-- php: = $account_feed->status == 'waiting approval' ? '<br/><a data-toggle="modal" href="javascript:" data-target="#appr_'.$account_feed->id.'" class="btn btn-sm btn-success">Approve</a><a data-toggle="modal" data-target="#flag_'.$account_feed->i... -->
                                                                    </td>
                                                                </tr>
                                                            <!-- php: } endforeach; -->
                                                            <!-- php: } -->
                                                         </tbody>


                                                    </table>
                                                </div>
                                              

                                                    <div class="modal fade" id="record_expense<!-- php: = $account->id -->"
                                                        tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-md  modal-dialog-centered"
                                                            role="document">
                                                            <div class="modal-content">
                                                                <div
                                                                    class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center justify-content-between">
                                                                            <h4 class="text-slate-900 my-0">Record Expense for <!-- php: = $account->account_name == null ? $account->bank_name : $account->account_name -->
                                                                            <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo ' <span class="badge bg-success">'.$account->transaction_code.'</span>'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT"){ echo ' <span class="badge bg-<?= $theme2 -->">'.$account->transaction_code.'</span>';
                                                                            } else {
                                                                                echo ' <span class="badge bg-secondary">'.$account->transaction_code.'</span>';
                                                                            }
                                                                            ?>
                                                                            </h4>
                                                                            <div>
                                                                                <button data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                        class="fa fa-times text-primary"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container bg-white p-2">
                                                                        <!-- php: = $this->Form->create($recordPayment, ['url' => ['controller' => 'Accounts', 'action' => 'recordPayment']]); -->
                                                                        <div class="container-fluid">
                                                                            <div class="row mt-4">
                                                                                <input type="hidden" name="accounts_id"
                                                                                    value="<!-- php: =$account->id -->" />
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5>Date</h5>
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="date"
                                                                                           name="date"
                                                                                           class="form-control">
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Payee
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                <SearchableSelectField name="payer_type"
                                                                                    id="payer_type<!-- php: = $account->id -->"
                                                                                    class="form-control mb-1 input-height">
                                                                                    <option>Select Payee</option>
                                                                                    <option value="patient">Patient</option>
                                                                                    <option value="insurance">Insurance</option>
                                                                                    <option value="company/credit">Company/Credit</option>
                                                                                    <option value="custom">Custom</option>
                                                                                </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Payee Name
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                <SearchableSelectField
                                                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                                    data-size="5" name="name"
                                                                                    id="payer_name<!-- php: = $account->id -->"
                                                                                    title="Select Payee Name"
                                                                                    data-live-search="true" required>

                                                                                </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                   Amount(Debit)
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="number" step='0.01'
                                                                                        id="charges" name="debit"
                                                                                        class="form-control">

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Tax(%)
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="number" step='0.01'
                                                                                        id="finalamount"
                                                                                        name="tax"
                                                                                        class="form-control">

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Status
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <SearchableSelectField name="status" class="form-control">
                                                                                        <option>Select Status</option>
                                                                                        <option value="Full Payment">Full Payment</option>
                                                                                        <option value="Part Payment">Part Payment</option>
                                                                                    </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Category
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <SearchableSelectField name="category" class="form-control">
                                                                                        <option>Select Category</option>
                                                                                        <!-- php: foreach($accountCategories as $accountCategory){ -->
                                                                                            <option value="<!-- php: = $accountCategory->name -->"><!-- php: = $accountCategory->name --></option>
                                                                                        <!-- php: } -->
                                                                                    </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                    
            
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Reference#
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="text"
                                                                                        class="form-control">
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Attachment
                                                                                </div>
                                                                                <div class="col-md-8">

                                                                                    <input name="invoicing_file"
                                                                                        type="file" id="actual-btn" />
                                                                                    <label class="bxn"
                                                                                        for="actual-btn">Choose
                                                                                        File</label>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mb-3 mt-3">
                                                                                <div class="col-md-4">
                                                                                    Notes
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <textarea name="notes" rows="5"
                                                                                        class="form-control"></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center py-1 justify-content-end">
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record
                                                                                Expense</button>
                                                                            <!-- php: = $this->Form->end(); -->
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close">Cancel&nbsp;<i
                                                                                    class="fa fa-times text-<!-- php: = $theme2 --> fa-1x"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal fade" id="record_payment<!-- php: = $account->id -->"
                                                        tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-md  modal-dialog-centered"
                                                            role="document">
                                                            <div class="modal-content">
                                                                <div
                                                                    class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center justify-content-between">
                                                                            <h4 class="text-slate-900 my-0">Record Payment For <!-- php: = $account->account_name == null ? $account->bank_name : $account->account_name -->
                                                                            <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo ' <span class="badge bg-success">'.$account->transaction_code.'</span>'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT"){ echo ' <span class="badge bg-danger">'.$... -->
                                                                            </h4>
                                                                            <div>
                                                                                <button data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                        class="fa fa-times text-primary"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container bg-white p-2">
                                                                        <!-- php: = $this->Form->create($recordPayment, ['url' => ['controller' => 'Accounts', 'action' => 'recordPayment']]); -->
                                                                        <div class="container-fluid">
                                                                            <div class="row mt-4">
                                                                                <input type="hidden" name="accounts_id"
                                                                                    value="<!-- php: =$account->id -->" />
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5>Date</h5>
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="date"
                                                                                           name="date"
                                                                                           class="form-control">
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Payer
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                <SearchableSelectField name="payer_type"
                                                                                    id="payer_type_e<!-- php: = $account->id -->"
                                                                                    class="form-control mb-1 input-height">
                                                                                    <option>Select Payer</option>
                                                                                    <option value="patient">Patient</option>
                                                                                    <option value="insurance">Insurance</option>
                                                                                    <option value="company/credit">Company/Credit</option>
                                                                                    <option value="custom">Custom</option>
                                                                                </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Payer Name
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                <SearchableSelectField
                                                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                                    data-size="5" name="name"
                                                                                    id="payer_name_e<!-- php: = $account->id -->"
                                                                                    title="Select Payer Name"
                                                                                    data-live-search="true" required>

                                                                                </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                   Amount(Credit)
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="number" step='0.01'
                                                                                        id="charges" name="credit"
                                                                                        class="form-control">

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Tax(%)
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="number" step='0.01'
                                                                                        id="finalamount"
                                                                                        name="tax"
                                                                                        class="form-control">

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Status
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <SearchableSelectField name="status" class="form-control">
                                                                                        <option>Select Status</option>
                                                                                        <option value="Full Payment">Full Payment</option>
                                                                                        <option value="Part Payment">Part Payment</option>
                                                                                    </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Category
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <SearchableSelectField name="category" class="form-control">
                                                                                        <option>Select Category</option>
                                                                                        <!-- php: foreach($accountCategories as $accountCategory){ -->
                                                                                            <option value="<!-- php: = $accountCategory->name -->"><!-- php: = $accountCategory->name --></option>
                                                                                        <!-- php: } -->
                                                                                    </SearchableSelectField>
                                                                                </div>
                                                                            </div>
                                                                    
            
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Reference#
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <input type="text"
                                                                                        class="form-control" name="reference" required/>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="row mt-3">
                                                                                <div class="col-md-4">
                                                                                    Attachment
                                                                                </div>
                                                                                <div class="col-md-8">

                                                                                    <input name="invoicing_file"
                                                                                        type="file" id="actual-btn" />
                                                                                    <!-- <label class="bxn"
                                                                                        for="actual-btn">Choose
                                                                                        File</label> -->
                                                                                </div>
                                                                            </div>
                                                                            <div class="row mb-3 mt-3">
                                                                                <div class="col-md-4">
                                                                                    Notes
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <textarea name="notes" rows="5"
                                                                                        class="form-control"></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center py-1 justify-content-end">
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record
                                                                                Payment</button>
                                                                            <!-- php: = $this->Form->end(); -->
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close">Cancel&nbsp;<i
                                                                                    class="fa fa-times text-danger fa-1x"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal fade" id="view_account_protocol<!-- php: = $account->id -->"
                                                        tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-md  modal-dialog-centered"
                                                            role="document">
                                                            <div class="modal-content">
                                                                <div
                                                                    class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center justify-content-between">
                                                                            <h4 class="text-slate-900 my-0">Status Protocols For <!-- php: = $account->account_name == null ? $account->bank_name : $account->account_name -->
                                                                            <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo ' <span class="badge bg-success">'.$account->transaction_code.'</span>'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT"){ echo ' <span class="badge bg-danger">'.$... -->
                                                                            </h4>
                                                                            <div>
                                                                                <button data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                        class="fa fa-times text-primary"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container bg-white p-2">
                                                                        <!-- php: = $this->Form->create($recordPayment, ['url' => ['controller' => 'Accounts', 'action' => 'recordPayment']]); -->
                                                                        <div class="container-fluid">
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Approve Deposits: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "APPROVE DEPOSITS"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>

                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Approve Pay Ins: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "APPROVE PAY INS"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Approve Pay Outs: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "APPROVE PAY OUTS"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Approve Withdrawals: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "APPROVE WITHDRAWALS"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Funds Disbursements: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "FUNDS DISBURSEMENT"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Accounts Reconciliations: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "ACCOUNTS RECONCILIATIONS"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Handle Cash: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "HANDLE CASH"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Record Cash: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "RECORD CASH"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                            <div class="row mt-4">
                                                                                <div class="col-md-4 text-left">
                                                                                    <h5 class="font-weight-bold">Make Payments: </h5>
                                                                                </div>
                                                                                <div
                                                                                    class="col-md-8 row d-flex justify-content-between">
                                                                                    <!-- php: foreach($account->accounts_protocols as $protocol){ -->
                                                                                        <!-- php: if($protocol->role == "MAKE PAYMENTS"){ -->
                                                                                        <div class="col-md-7">
                                                                                        <h5><!-- php: = $protocol->user->first_name.' '.$protocol->user->last_name --><span
                                                                                                class="badge badge-danger"><!-- php: = $protocol->user->role->name --></span>
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div class="col-md-5 d-flex align-items-center">
                                                                                        <!-- <small><a class="text-danger" href="javascript:">Remove</a></small>&nbsp;&nbsp;
                                                                                        <small><a class="text-secondary" href="javascript:">Disable</a></small> -->
                                                                                    </div>
                                                                                    <!-- php: } -->
                                                                                    <!-- php: } -->

                                                                                </div>
                                                                            </div>
                                                                
                                                                  
                                                                        </div>
                                                                    </div>
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center py-1 justify-content-end">
                                                                            <!-- <button style="height:20px;width:auto;"
                                                                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record
                                                                                Payment</button> -->
                                                                            <!-- php: = $this->Form->end(); -->
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close">Cancel&nbsp;<i
                                                                                    class="fa fa-times text-danger fa-1x"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal fade" id="view_info<!-- php: = $account->id -->"
                                                        tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-md  modal-dialog-centered"
                                                            role="document">
                                                            <div class="modal-content">
                                                                <div
                                                                    class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center justify-content-between">
                                                                            <h4 class="text-slate-900 my-0">Account Information
                                                                            </h4>
                                                                            <div>
                                                                                <button data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                        class="fa fa-times text-primary"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container bg-white p-2">
                                                                        
                                                                        <div class="container-fluid">
                                                                          <h5><!-- php: = $account->banks_list->name --> <span style="background:<!-- php: = $account->banks_list->banks_category->color -->" class="badge"><!-- php: = $account->banks_list->banks_category->name --></span></h5>
                                                                          <h5><!-- php: = $account->banks_list->location --></h5>
                                                                          <h5><!-- php: = $account->banks_list->address --></h5>
                                                                          <h5><!-- php: = $account->banks_list->phone_number --></h5>
                                                                          <h5><!-- php: = $account->banks_list->fax --></h5>
                                                                          <h5><!-- php: = $account->banks_list->website --></h5>
                                                                          <h5><!-- php: = $account->banks_list->email --></h5>
                                                                  
                                                                        </div>
                                                                    </div>
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center py-1 justify-content-end">
                                                                            <!-- <button style="height:20px;width:auto;"
                                                                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record
                                                                                Payment</button> -->
                                                                            
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close">Cancel&nbsp;<i
                                                                                    class="fa fa-times text-danger fa-1x"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal fade" id="view_compliance<!-- php: = $account->id -->"
                                                        tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-md  modal-dialog-centered"
                                                            role="document">
                                                            <div class="modal-content">
                                                                <div
                                                                    class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center justify-content-between">
                                                                            <h4 class="text-slate-900 my-0">Account Compliance
                                                                            </h4>
                                                                            <div>
                                                                                <button data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                        class="fa fa-times text-primary"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container bg-white p-2">
                                                                        
                                                                        <div class="container-fluid">
                                                                          <!-- php: foreach($account->accounts_compliance_checks as $c){ -->
                                                                             <h5><span class="font-weight-bold"><!-- php: = ucwords(strtolower($c->compliance_name)) --></span> <span class="badge <!-- php: if($c->priority == "HIGH"){ echo 'bg-danger'; } else if( $c->priority == "MEDIUM"){ echo 'bg-primary'; } else if($c->priority == "LOW"){ echo 'bg-success'; } -->"><!-- php: = $c->priority --></span> : &nbsp; <!-- php: = $c->time_status --></h5>
                                                                          <!-- php: } --> 
                                                                  
                                                                        </div>
                                                                    </div>
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center py-1 justify-content-end">
                                                                            <!-- <button style="height:20px;width:auto;"
                                                                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record
                                                                                Payment</button> -->
                                                                            
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close">Cancel&nbsp;<i
                                                                                    class="fa fa-times text-danger fa-1x"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal fade" id="close_acc_modal<!-- php: = $account->id -->"
                                                        tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-md  modal-dialog-centered"
                                                            role="document">
                                                            <div class="modal-content">
                                                                <div
                                                                    class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center justify-content-between">
                                                                            <h4 class="text-slate-900 my-0">Close Account
                                                                            </h4>
                                                                            <div>
                                                                                <button data-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                        class="fa fa-times text-primary"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Accounts', 'action' => 'closeAccountBalance']]); -->
                                                                    <div class="container bg-white p-2">
                                                                        <div class="container-fluid">
                                                                            <!-- php: //get sum of pending compliance. $xy = 0; foreach($account->accounts_feeds as $acc_f) { if($acc_f->closed == 0){ if($acc_f->status == "waiting approval" || $acc_f->status == "Undeposited"){ $xy++; }} } //echo $xy; -->
                                                                            <!-- php: if($xy > 0){ -->
                                                                                <h5
                                                                                class="text-secondary font-weight-bold mt-3">
                                                                                Please resolve these issues
                                                                                before closing account balance</h5>

                                                                            <ol style="margin-left:0px;padding-left:0px">
                                                                            <!-- php: foreach($account->accounts_feeds as $acc_f) { if($acc_f->closed == 0){ if($acc_f->status == "waiting approval" || $acc_f->status == "Undeposited"){ -->
                                                                                
                                                                                <li><!-- php: = $acc_f->name --> <span class="badge badge-primary"><!-- php: = $acc_f->payer_type --></span> -> 
                                                                                <span class="badge badge-warning"><!-- php: = $acc_f->status --></span></li>
                                                                               
                                                                            <!-- php: }}} -->
                                                                            </ol>
                                                                            <!-- php: } else { -->
                                                                                <input type="hidden" name="opening_status" value="1"/>
                                                                                <input type="hidden" name="account_id" value="<!-- php: = $account->id -->">
                                                                                 <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ -->
                                                                                    <h4 class="text-secondary">Are you sure you want to close the account  with balance (<!-- php: = number_format($blnce + $acc, 2) -->)  ?</h4>
                                                                                   <input type="hidden" name="closing_balance" value="<!-- php: = ($blnce + $acc) -->"/>
                                                                                 <!-- php: } else if($account->accounts_tags[0]->attribute == "MONEY OUT"){ -->
                                                                                    <h4 class="text-secondary">Are you sure you want to close the account  with balance (<!-- php: = number_format($blnce2 + $acc2, 2) -->)  ?</h4>
                                                                                    <input type="hidden" name="closing_balance" value="<!-- php: = ($blnce2 + $acc2) -->"/>
                                                                                 <!-- php: } else { -->
                                                                                    <h4 class="text-secondary">Are you sure you want to close the account  with balance (<!-- php: = number_format($blnce3 + $acc3, 2) -->)  ?</h4>
                                                                                    <input type="hidden" name="closing_balance" value="<!-- php: = ($blnce3 + $acc3) -->"/>
                                                                                 <!-- php: } -->
                                                                              
                                                                                <h5 class="text-danger">Closing of account balance cannot be reversed.</h5>
                                                                            <!-- php: } -->

                                                                        </div>
                                                                    </div>
                                                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="d-flex align-items-center py-1 justify-content-end">
                                                                            <!-- php: if($xy < 1){ -->
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit
                                                                                <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>-->
                                                                            </button>
                                                                            <!-- php: } -->
                                                                            <!-- php: = $this->Form->end(); -->
                                                                            <button style="height:20px;width:auto;"
                                                                                class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close">Cancel&nbsp;<i
                                                                                    class="fa fa-times text-danger fa-1x"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
									  <!-- php: foreach($account->accounts_feeds as $account_feed): if($account_feed->closed == 0){ -->
                                                        <div class="modal fade" id="reconcile_<!-- php: =$account_feed->id -->"
                                                            tabindex="-1" aria-hidden="true">
                                                            <div class="modal-dialog modal-md  modal-dialog-centered"
                                                                role="document">
                                                                <div class="modal-content">
                                                                    <div
                                                                        class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                            <div
                                                                                class="d-flex align-items-center justify-content-between">
                                                                                <h4 class="text-slate-900 my-0">Reconcile
                                                                                </h4>
                                                                                <div>
                                                                                    <button data-dismiss="modal"
                                                                                        aria-label="Close"
                                                                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                            class="fa fa-times text-primary"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- php: = $this->Form->create($reconcile, ['url' => ['controller' => 'Accounts', 'action' => 'reconcile']]); -->
                                                                        <div class="container bg-white p-2">
                                                                            <div class="container-fluid">
                                                                                <div class="row mt-4">
                                                                                    <div class="col-md-3">
                                                                                        <h5>Reference No: </h5>
                                                                                    </div>
                                                                                    <div class="col-md-8">
                                                                                        <input type="text"
                                                                                            class="form-control"
                                                                                            name="ref_no"
                                                                                            value="<!-- php: = $account_feed->ref_no -->"
                                                                                            class="form-control"
                                                                                            readonly
                                                                                            required />
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row mt-4">
                                                                                    <div class="col-md-3">
                                                                                        <h5>Amount: </h5>
                                                                                    </div>
                                                                                    <div class="col-md-8">
                                                                                        <input type="text"
                                                                                            value="<!-- php: = $account_feed->credit != 0 ? $account_feed->credit : $account_feed->debit -->"
                                                                                            name="amount"
                                                                                            class="form-control"
                                                                                            readonly>
                                                                                        <input type="hidden"
                                                                                            name="account_feed_id"
                                                                                            value="<!-- php: = $account_feed->id -->" />
                                                                                    </div>
                                                                                </div>
                                                                                <!-- <div class="row mt-4">
                                                                                    <div class="col-md-3">
                                                                                        <h5>Email: </h5>
                                                                                    </div>
                                                                                    <div class="col-md-8">
                                                                                        <input type="text" name="email"
                                                                                            class="form-control"
                                                                                            required />
                                                                                    </div>
                                                                                </div> -->
                                                                                <!-- <div class="row mt-4">
                                                                                    <div class="col-md-3">
                                                                                        <h5>Mobile: </h5>
                                                                                    </div>
                                                                                    <div class="col-md-8">
                                                                                        <input type="text" name="mobile"
                                                                                            class="form-control"
                                                                                            required />
                                                                                    </div>
                                                                                </div> -->
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                            <div
                                                                                class="d-flex align-items-center py-1 justify-content-end">
                                                                                <button style="height:20px;width:auto;"
                                                                                    class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit
                                                                                    <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>-->
                                                                                </button>
                                                                                <!-- php: = $this->Form->end(); -->
                                                                                <button style="height:20px;width:auto;"
                                                                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close">Cancel&nbsp;<i
                                                                                        class="fa fa-times text-danger fa-1x"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal fade" id="flag_<!-- php: =$account_feed->id -->"
                                                            tabindex="-1" aria-hidden="true">
                                                            <div class="modal-dialog modal-md  modal-dialog-centered"
                                                                role="document">
                                                                <div class="modal-content">
                                                                    <div
                                                                        class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                        <div
                                                                            class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                            <div
                                                                                class="d-flex align-items-center justify-content-between">
                                                                                <h4 class="text-slate-900 my-0">Flag
                                                                                </h4>
                                                                                <div>
                                                                                    <button data-dismiss="modal"
                                                                                        aria-label="Close"
                                                                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                            class="fa fa-times text-primary"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- php: = $this->Form->create($flag, ['url' => ['controller' => 'Accounts', 'action' => 'flag']]); -->
                                                                        <div class="container bg-white p-2">
                                                                            <div class="container-fluid">
                                                                                <div class="row mt-4">
                                                                                    <div class="col-md-3">
                                                                                        <h5>Reason: </h5>
                                                                                    </div>
                                                                                    <div class="col-md-8">
                                                                                        <input type="text"
                                                                                            class="form-control"
                                                                                            name="reason"
                                                                                            class="form-control"
                                                                                            required />
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row mt-4">
                                                                                    <div class="col-md-3">
                                                                                        <h5>Notes: </h5>
                                                                                    </div>
                                                                                    <div class="col-md-8">
                                                                                       <textarea name="notes" id="notes"  rows="5" class="form-control"></textarea>
                                                                                        <input type="hidden"
                                                                                            name="account_feed_id"
                                                                                            value="<!-- php: = $account_feed->id -->" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                            <div
                                                                                class="d-flex align-items-center py-1 justify-content-end">
                                                                                <button style="height:20px;width:auto;"
                                                                                    class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit
                                                                                    <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>-->
                                                                                </button>
                                                                                <!-- php: = $this->Form->end(); -->
                                                                                <button style="height:20px;width:auto;"
                                                                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close">Cancel&nbsp;<i
                                                                                        class="fa fa-times text-danger fa-1x"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                <div class="modal fade" id="appr_<!-- php: = $account_feed->id -->" tabindex="-1"
                                                    aria-hidden="true">
                                                    <div class="modal-dialog modal-md  modal-dialog-centered"
                                                        role="document">
                                                        <div class="modal-content">
                                                            <div
                                                                class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                    <div
                                                                        class="d-flex align-items-center justify-content-between">
                                                                        <h4 class="text-slate-900 my-0">Approve Transaction for
                                                                            <!-- php: = $account->account_name == null ? $account->banks_list->name : $account->account_name -->
                                                                            <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo ' <span class="badge bg-success">'.$account->transaction_code.'</span>'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT"){ echo ' <span class="badge bg-<?= $theme2 -->">'.$account->transaction_code.'</span>';
                                                                            } else {
                                                                            echo ' <span
                                                                                class="badge bg-secondary">'.$account->transaction_code.'</span>';
                                                                            }
                                                                            ?>
                                                                        </h4>
                                                                        <div>
                                                                            <button data-dismiss="modal"
                                                                                aria-label="Close"
                                                                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                                    class="fa fa-times text-primary"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="container bg-white p-2">
                                                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Accounts', 'action' => 'apprFeed']]); -->
                                                                    <div class="container-fluid">
                                                                    <h3 class="text-secondary">Are you sure you want to approve transaction ?</h3>
                                                                    <input type="hidden" name="account_feed_id" value="<!-- php: = $account_feed->id -->"/>
                                                                    <input type="hidden" name="account_id" value="<!-- php: = $account->id -->">
                                                                    </div>
                                                                </div>
                                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                                    <div
                                                                        class="d-flex align-items-center py-1 justify-content-end">
                                                                        <button style="height:20px;width:auto;"
                                                                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">submit</button>
                                                                        <!-- php: = $this->Form->end(); -->
                                                                        <button style="height:20px;width:auto;"
                                                                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                                            data-dismiss="modal"
                                                                            aria-label="Close">Cancel&nbsp;<i
                                                                                class="fa fa-times text-<!-- php: = $theme2 --> fa-1x"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    <!-- php: } endforeach; -->

                                                    
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                    <!-- php: }} -->
                   
                </div>
            </div>

        </div>

    </div>
</div>

<script type="text/javascript">
    $(document).ready(function () {

        // save tab in local storage
        $('#accountingTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
            localStorage.setItem('accountingLastTab', $(this).attr('href'));
        });

        // display last tab if exist
        var accountingLastTab = localStorage.getItem('accountingLastTab');
        if (accountingLastTab) {
            $('#accountingTabs a[href=' + accountingLastTab + ']').tab('show');
        } else {
            // Set the first tab if cookie do not exist
            $('#accountingTabs a[data-toggle="tab"]:first').tab('show');
        }
    })

    <!-- php: foreach($accounts as $account) { -->            
        $('#accountprofiletable').DataTable();
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

    

        

</script>

`;

export default function AccountsAccountViewPage() {
  return (
    <PageShell title="Accounts/account_view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
