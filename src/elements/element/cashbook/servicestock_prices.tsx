const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Services</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#services_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active" id="services_view">
					<div class="card  card-box">
						<div class="card-body ">
							<div class="table-scrollable">
								<table class="table table-hover order-column full-width customDataTable">
									<thead>
										<tr>
											<th>Name</th>
											<th>Facility</th>
											<!-- php: foreach($providers as $key => $provider) { -->
												<th><!-- php: = $provider --></th>
											<!-- php: } -->
											<th>Action</th>
										</tr>
									</thead>
									<tbody>

									<!-- php: foreach ($serviceStocks as $serviceStock): -->
										<tr class="odd gradeX">
											<td><!-- php: = $serviceStock->procedure_name --></td>
											<td><!-- php: = $this->Number->precision($serviceStock->facility_price, 2) --></td>
											<!-- php: foreach($providers as $key => $provider) { -->
												<td>
													<!-- php: $price = 0; foreach($serviceStock->service_stock_price_list as $priceList) { if($priceList->insurance_profile_policy_id == $key) { $price = $priceList->price; break; } } echo $this->Number->precision($price, 2); -->
												</td>
											<!-- php: } -->
											<td>
												<a href="<!-- php: =$this->Url->build(['controller'=>'CashBook','action'=>'editServiceStockPrice', $serviceStock->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs ">
													Edit
												</a>
											</td>
										</tr>
										
									<!-- php: endforeach; -->									
									</tbody>
								</table>								
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
		
	</div>
</div>
`;

export default function ElementElementCashbookServicestockPrices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
