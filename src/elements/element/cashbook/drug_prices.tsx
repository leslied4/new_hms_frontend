const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Drugs</span>
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

									<!-- php: foreach ($drugs as $drug): -->
										<tr class="odd gradeX">
											<td><!-- php: = $drug->name --></td>
											<td><!-- php: = $this->Number->precision($drug->price, 2) --></td>
											<!-- php: foreach($providers as $key => $provider) { -->
												<td>
													<!-- php: $price = 0; foreach($drug->item_price_list as $drugPrice) { if($drugPrice->insurance_profile_policy_id == $key) { $price = $drugPrice->price; break; } } echo $this->Number->precision($price, 2); -->
												</td>
											<!-- php: } -->
											<td>
												<a href="<!-- php: =$this->Url->build(['controller'=>'CashBook','action'=>'editDrugPrice', $drug->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs ">
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

export default function ElementElementCashbookDrugPrices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
