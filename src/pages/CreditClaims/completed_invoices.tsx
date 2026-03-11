import PageShell from '../../components/PageShell';

const sourcePath = 'templates/CreditClaims/completed_invoices.php';
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
                                    <header>Completed Processed Claims</header>
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
									  <!-- php: = $this->Form->create(null, ['type' => 'get']); -->
										<div class="input-group" style="max-width: 250px; float: right;">
											<input type="text" class="form-control" name="searchValue" type="text" id="searchBox" placeholder="Search" value="<!-- php: = $searchValue -->" />
											<span class="input-group-btn">
												<button type="submit" class="btn btn-info btn-flat">Go!</button>
											</span>
										</div>

									  <!-- php: = $this->Form->end() -->
									</div>
								  </div>

								  <div style="clear: both"></div>
									
								  <div class="table-scrollable">
									<table class="table table-hover order-column full-width table-checkable" >
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Patient Image</th>
												<th scope="col">Date</th>
												<th scope="col">Patient Name(Folder)</th>
												<th scope="col">MDC</th>
                                                <th scope="col">Copay</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
										<!-- php: $i = 0; -->
										<!-- php: foreach ($invoices as $invoice): -->
											<!-- php: $i++; -->
											<tr>
												<td><!-- php: = $i --></td>
                                                <td>
													<div class="prog-avatar">
														<!-- php: = $this->Html->image($invoice->patient_visit->patient->has('image') ? $invoice->patient_visit->patient->image->file_path : (($invoice->patient_visit->patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'), ['width' => '40px', 'height' => '40px',... -->
													</div>
												</td>
												<td><!-- php: = h($invoice->date_added->nice()) --></td>
												<td><!-- php: = $invoice->patient_visit->patient->name --> <span class='badge badge-info'><!-- php: = $invoice->patient_visit->patient->folder_number --></span></td>
												<td><!-- php: = isset($invoice->patient_visit->patient_visit_purpose->name) ? $invoice->patient_visit->patient_visit_purpose->name : "" --></td>
												<td><!-- php: = $invoice->co_payment == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "" --></td>
												<td>
													<a href="<!-- php: =$this->Url->build(['controller'=>'CreditClaims','action'=>'viewCompletedInvoice', $invoice->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">
														View
													</a>	
                                                </td>
											</tr>
										<!-- php: endforeach; -->
										</tbody>
									</table>
									</div>					
					
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

export default function CreditClaimsCompletedInvoicesPage() {
  return (
    <PageShell title="CreditClaims/completed_invoices.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
