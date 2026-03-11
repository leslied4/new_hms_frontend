const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Drugs (Credit)</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#drugs_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active" id="drugs_view">
					<div class="card  card-box">
						<div class="card-body ">
							<div class="table-scrollable">
								<table class="table table-hover order-column full-width customDataTable" id="drug-credit-prices">
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

									<!-- php: foreach ($items as $drug): -->
										<tr class="odd gradeX">
											<td>
												<!-- php: = $drug->full_name --> 
												<!-- php: = $drug->brand_name --> 
												<!-- php: = isset($drug->item_category) && $drug->item_category->id == 1 ? "<span class='badge badge-danger'>Drug</span>" : "<span class='badge badge-primary'>Consumable</span>" -->
												<!-- php: if($drug->item_category){ -->
													<span class="badge badge-info"><!-- php: = $drug->item_category->name --></span>
												<!-- php: } -->
											</td>
											<td><!-- php: = $this->Number->precision($drug->price, 2) --></td>
											<!-- php: foreach($insurance_profiles as $key => $insurance_profile) { -->
												<td>
													<!-- php: $price = 0; foreach($drug->insurance_profile_item_prices as $drugPrice) { if($drugPrice->insurance_profile_id == $insurance_profile->id) { $price = $drugPrice->price; break; } } echo $this->Number->precision($price, 2); -->
												</td>
											<!-- php: } -->
											<td>
												<a href="<!-- php: =$this->Url->build(['controller'=>'CashBook','action'=>'editDrugPriceCredit', $drug->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs ">
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

export default function ElementElementCashbookDrugPricesCredit() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
