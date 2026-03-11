import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/CreditClaims/paid_claims.php';
const rawHtml = `

<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card card-topline-<!-- php: = $theme1 -->">
								<div class="card-head">
                                    <header>Paid Claims</header>
									<div class="tools">
										<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="row">
									<div class="col-md-6">
										<span class="label label-md label-danger"><strong><!-- php: = $this->Paginator->counter(__('Total Records: {{count}}')) --></strong></span> - <span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}')) --></span>
									</div>
									<div class="col-md-6">
									  <!-- </?= $this->Form->create(null, ['type' => 'get']);?>
										<div class="input-group" style="max-width: 250px; float: right;">
											<input type="text" class="form-control" name="searchValue" type="text" id="searchBox" placeholder="Search" value="<!-- php: = $searchValue -->" />
											<span class="input-group-btn">
												<button type="submit" class="btn btn-info btn-flat">Go!</button>
											</span>
										</div>

									  </?= $this->Form->end() ?> -->
									</div>
								  </div>

								  <div style="clear: both"></div>
									
								  <div class="table-scrollable">
									<table class="table table-hover order-column full-width table-checkable" >
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Reconcile Date</th>
												<th scope="col">Payer</th>
												<th scope="col">Date Coverage</th>
												<th scope="col">Amount Paid</th>
												<th scope="col">Amount Left</th>
												<th scope="col">Reference</th>
												<th scope="col">Actions</th>
											</tr>
										</thead>
										<tbody>
										<!-- php: $i = 0; $total = 0; -->
										<!-- php: foreach ($invoices as $invoice): $total+=$invoice->amount; -->
											<!-- php: $i++; -->
											<tr>
												<td><!-- php: = $i --></td>
												<td><!-- php: = h($invoice->date_created ? $invoice->date_created->nice() : '') --></td>
                                                <td><!-- php: = $invoice->insurance_profile_policy->name --> (<!-- php: = $invoice->insurance_profile_policy->insurance_profile->name -->)</td>
												<td><!-- php: = h($invoice->start_date ? $invoice->start_date->format('d-m-Y') : '') --> - <!-- php: = h($invoice->end_date ? $invoice->end_date->format('d-m-Y') : '') --></td>
                                                <td><!-- php: = h($invoice->amount) --></td>
												<td><!-- php: = h($invoice->balance) --></td>
												<td>#<!-- php: = $invoice->reference_number --></td>
												<td>
												<!-- php: if($invoice->money_status == 0): -->
													<a href="javascript:" data-toggle="modal" data-target="#rmi_<!-- php: = $invoice->id -->" class="btn btn-primary btn-xs">
														Report Money In
													</a>
												<!-- php: else: -->
													<span class="btn btn-primary btn-xs">
														Reported
													</span>
												<!-- php: endif; -->
												</td>
											</tr>
										<!-- php: endforeach; -->
										</tbody>
										<tfoot>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td>Total:</td>
												<td>
													<!-- php: = $total -->
												</td>
											</tr>
											

										</tfoot>
									</table>
									</div>

									<!-- php: foreach($invoices as $invoice): -->
										<div class="modal fade" id="rmi_<!-- php: =$invoice->id -->" tabindex="-1" aria-hidden="true">
											<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
												<div class="modal-content">
													<div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
														<div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
														<div class="d-flex align-items-center justify-content-between">
															<h4 class="text-slate-900 my-0">Report Money In For <!-- php: = $invoice->reference_number --></h4>
															<div>
																<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
															</div>
														</div>
														</div>
														<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'CreditClaims', 'action' => 'reportMoneyInPaid']]); -->
														<div class="container bg-white p-2">
														<div class="container-fluid">
														
														<div class="row mt-4">
																<div class="col-md-3">
																	<h5>Select Account: </h5>
																</div>
																<div class="col-md-8">
																<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cash category" name="category_id" id="category_id" data-live-search="true"  required>
																						
																	<!-- php: foreach($Accounts as $account) { -->
																					<option data-content="<!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name --> <span class=<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'badge bg-danger'; } else { echo 'badge bg-secondary'; } -->><!-- php: = $account->transaction_code --></span>" value="<!-- php: = $account->id -->"><!-- php: = $account->account_name =="" ? $account->bank_name : $account->account_name --></option>
																	<!-- php: } -->

																</SearchableSelectField>
																<input type="hidden" name="invoicing_id" value="<!-- php: = $invoice->id -->" />
																</div>
															</div>
														</div>
														</div>
														<div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
														<div class="d-flex align-items-center py-1 justify-content-end">
															<button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> </button>
															<!-- php: = $this->Form->end(); -->
															<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
														</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									<!-- php: endforeach; -->
					
									<div class="row">
										<div class="col-md-6">
											<span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) --></span>
										</div>

										<div class="col-md-6">
											<div class="dataTables_paginate paging_simple_numbers" style="float: right;">
												<ul class="pagination">
													<!-- php: = $this->Paginator->prev(__('previous')) -->
													<!-- php: = $this->Paginator->numbers() -->
													<!-- php: = $this->Paginator->next(__('next')) -->
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

export default function CreditClaimsPaidClaimsPage() {
  return (
    <PageShell title="CreditClaims/paid_claims.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
