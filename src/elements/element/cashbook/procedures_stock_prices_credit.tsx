const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Procedure Stocks (Credit)</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#consultation_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active" id="consultation_view">
					<div class="card  card-box">
						<div class="card-body ">
							<div class="table-scrollable">
								<!-- php: if (!empty($procedureStocks)): -->
									<table class="table table-hover order-column full-width customDataTable">
										<thead>
											<tr>
												<th>Name</th>
												<th>Price</th>
												<!-- php: foreach ($insurance_profiles as $provider): -->
													<th><!-- php: = $provider->name --></th>
												<!-- php: endforeach; -->
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<!-- php: foreach ($procedureStocks as $val): -->
												<tr class="odd gradeX">
													<td>
														<!-- php: = $val->name -->
														<!-- <span class="badge badge-warning"></?= $val->code ?></span> -->
													</td>

													<td><!-- php: = $this->Number->precision($val->price, 2) --></td>
													<!-- php: foreach ($insurance_profiles as $key => $provider): -->
														<td>
															<!-- php: $price = 0; if($val->insurance_profile_procedure_stock_prices){ foreach ($val->insurance_profile_procedure_stock_prices as $priceList) { if ($priceList->insurance_profile_id == $provider->id) { $price = $priceList->price; break; } } echo $t... -->
														</td>
													<!-- php: endforeach; -->
													<td>
														<a href="<!-- php: = $this->Url->build(['controller' => 'CashBook', 'action' => 'editProcedureStocksPriceCredit', $val->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs ">
															Edit
														</a>
													</td>
												</tr>
											<!-- php: endforeach; -->
										</tbody>
									</table>
								<!-- php: else: // Handle the case when $procedureStocks is empty echo 'No procedure stocks available'; endif; -->		
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
		
	</div>
</div>
`;

export default function ElementElementCashbookProceduresStockPricesCredit() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
