const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Lab Tests (Credit)</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#labtests_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active" id="labtests_view">
					<div class="card  card-box">
						<div class="card-body ">
							<div class="table-scrollable">
								<table class="table table-hover order-column full-width customDataTable">
									<thead>
										<tr>
											<th>Name</th>
											<th>Facility</th>
											<!-- php: foreach($insurance_profiles as $key => $insurance_profile) { -->
												<th><!-- php: = $insurance_profile->name --></th>
											<!-- php: } -->
											<th>Action</th>
										</tr>
									</thead>
									<tbody>

									<!-- php: foreach ($labTestsCredit as $labTest): -->
										<tr class="odd gradeX">
											<td><!-- php: = $labTest->name --></td>
											<td><!-- php: = $this->Number->precision($labTest->value_new, 2) --></td>
											<!-- php: foreach($insurance_profiles as $key => $provider) { -->
												<td>
													<!-- php: $price = 0; foreach($labTest->insurance_profile_lab_prices as $priceList) { if($priceList->insurance_profile_id == $provider->id) { $price = $priceList->price; break; } } echo $this->Number->precision($price, 2); -->
												</td>
											<!-- php: } -->
											<td>
												<a href="<!-- php: =$this->Url->build(['controller'=>'CashBook','action'=>'editLabTestPriceCredit', $labTest->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs ">
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

export default function ElementElementCashbookLabtestPricesCredit() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
