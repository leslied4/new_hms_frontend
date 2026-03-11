import PageShell from '../../components/PageShell';

const sourcePath = 'templates/ImmunizationRequest/reports.php';
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
                                    <header>Immunization Reports</header>
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
												<th scope="col">Date Requested</th>
                                                <th scope="col">Patient</th>
												<th scope="col">Vaccine</th>
                                                <th scope="col">AEFI Category</th>
												<th scope="col">Department</th>
                                                <th scope="col">Folder Number</th>
												<th scope="col">Status</th>
                                                <th scope="col">Report</th>
											</tr>
										</thead>
										<tbody>
										<!-- php: $i = 0; -->
										<!-- php: foreach ($immunizationRequests as $immunizationRequest): -->
											<!-- php: $i++; -->
											<tr>
												<td><!-- php: = $i --></td>
												<td><!-- php: = h($immunizationRequest->dor->nice()) --></td>
                                                <td><!-- php: = $immunizationRequest->patient->name --></td>
												<td><!-- php: = $immunizationRequest->drug_stock->drug->name --></td>
                                                <td>
                                                    <!-- php: if($immunizationRequest->immunization_aefis){ -->
                                                        <!-- php: $ij = 0 -->
														<!-- php: foreach($immunizationRequest->immunization_aefis as $aefi): -->
															<!-- php: $ij++; -->
															<!-- php: = $ij -->.<!-- php: = $aefi->aefi_category->category_name --> <span class='badge badge-danger'><!-- php: = $aefi->adverse_in_words --></span><br>
														<!-- php: endforeach; -->
                                                    <!-- php: } -->                                                    
                                                </td>
												<td><!-- php: = $immunizationRequest->user->department->name --></td>
                                                <td><!-- php: = $immunizationRequest->patient->folder_number --></td>
												<td>
													<!-- php: if($immunizationRequest->doses_taken == $immunizationRequest->dosage_count){ -->
														<span class="badge badge-success">Fulfilled</span>
													<!-- php: } -->
													<!-- php: if($immunizationRequest->doses_taken > 0 && $immunizationRequest->doses_taken < $immunizationRequest->dosage_count){ -->
														<span class="badge badge-success">Partly Fulfilled</span>
													<!-- php: } -->
													<!-- php: if($immunizationRequest->doses_taken == 0){ -->
														<span class="badge badge-warning">Not Started</span>
													<!-- php: } -->
                                                </td>
                                                <td class="actions">
                                                    <a target="_blank" href="<!-- php: = Cake\Routing\Router::url(['controller' => 'ImmunizationRequest', 'action' => 'immunizationReport', $immunizationRequest->id, 'immunization_report', '_ext' => 'pdf']) -->" class="btn btn-xs btn-outline" escape=false>
                                                        PDF
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

export default function ImmunizationRequestReportsPage() {
  return (
    <PageShell title="ImmunizationRequest/reports.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
