const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Add Stock</span>
			</div>
		</div>
		<div class="borderBox-body">
		
			<h4 id="add_stock_heading">Add a new Stock Item</h4>
			<div id="item-info-div"></div>
			<!-- php: = $this->Form->create($itemStock, ['url' => ['controller' => 'Inventory', 'action' => 'addItemStore']]); -->
				<div class="row">
					<div class="col-md-6">
						<div class="form-group row">
							<label class="control-label col-md-3">Item
								<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select item" name="item_id" id="item_id" data-live-search="true" required onchange="itemSelectOnchange()">
									<option value="">Select Item</option>									
								
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row" id="item_unit_pricing_section" style="display:none">
							<label class="control-label col-md-3">Item Unit Pricing
							</label>
							<div class="col-md-8" id="item_unit_pricing">
								
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-3">Batch Number
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="text"  step="1" name="batch_number" id="batch_number" data-required="1" placeholder="Enter batch_number" class="form-control input-height" required />
							</div>
						</div>	
																	
						<div class="form-group row">
							<label class="control-label col-md-3">Quantity
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="number" oninput="myFunction();  myFunction1(); myFunction2();" step="1" min="1" name="quantity" id="quantity" data-required="1" placeholder="Enter quantity" class="form-control input-height" required /> 
							</div>
						</div>	
								
						<div class="form-group row">
							<label class="control-label col-md-3">Unit Cost Price
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="number" oninput="myFunction(); myFunction2()" step="0.01" min="0" name="unit_cost_price" id="unit_cost_price" data-required="1" placeholder="Enter unit_cost_cost" class="form-control input-height" required /> 
							</div>
						</div>	
						
						<div id="div_total_cost_price" style="display:none;">
							<div class="form-group row">
								<label class="control-label col-md-3">Total Cost Price
								</label>
								<div class="col-md-8">
									<input type="number" step="0.01" min="0" name="total_cost_price" id="total_cost_price" data-required="1" class="form-control input-height" readonly required /> 
								</div>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-3">Discount(%)
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="number" oninput="myFunction2()" step="0.01" min="0" max="100" name="discount" id="discount" data-required="1" placeholder="Eg. 25.5" class="form-control input-height" required /> 
							</div>
						</div>

						<div id="div_new_total_cost_price" style="display:none;">
							<div class="form-group row">
								<label class="control-label col-md-3">New Total Cost Price
								</label>
								<div class="col-md-8">
									<input type="number" step="0.01" min="0" name="new_total_cost_price" id="new_total_cost_price" data-required="1" class="form-control input-height" readonly required /> 
								</div>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-3">Unit Selling Price
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="number" oninput="myFunction1()" step="0.01" min="0" name="unit_selling_price" id="unit_selling_price" data-required="1" placeholder="Enter unit_selling_price" class="form-control input-height" required /> 
							</div>
						</div>	
						
						<div id="div_total_selling_price" style="display:none;">
							<div class="form-group row">
								<label class="control-label col-md-3">Total Selling Price
								</label>
								<div class="col-md-8">
									<input type="number" step="0.01" min="0" name="total_selling_price" id="total_selling_price" data-required="1" class="form-control input-height" readonly required /> 
								</div>
							</div>
						</div>
												
						<div class="form-group row">
							<label class="control-label col-md-3">Supplier
							</label>
							<div class="col-md-8">
								<SearchableSelectField class="form-control input-height selectpicker" name="supplier_id" id="supplier_id">
									<option value="">Select Supplier</option>
									
									<!-- php: foreach($suppliers as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } --> 
									
								</SearchableSelectField>
							</div>
						</div>


					</div>
					<div class="col-md-6">
						<div class="form-group row">
							<label class="control-label col-md-3">Least Issue Quantity Per Unit
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="number" name="least_quant" id="least_quant" data-required="1" placeholder="Enter least issue quantity" class="form-control input-height" required /> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Maximum Issue Quantity Per Unit
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="number" name="max_quant" id="max_quant" data-required="1" placeholder="Enter maximum issue quantity" class="form-control input-height" required /> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Least Dosage Quantity Per Unit
							<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<input type="number" name="least_dosage" id="least_dosage" data-required="1" placeholder="Enter maximum issue quantity" class="form-control input-height" required /> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Expiry Date
							</label>
							<div class="col-md-8">
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="Expiry Date" name = "expiry_date" id = "expiry_date" type="text" value="" >
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
									<input type="hidden" id="dtp_input2" value="" />
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Specialty
							</label>
							<div class="col-md-8">
								<SearchableSelectField class="form-control input-height selectpicker" name="specialty_id[]" id="specialty_id">
									<option selected value="0">All</option>
									
									<!-- php: foreach($specialties as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } --> 
									
								</SearchableSelectField>
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-3">Copay
								<span class="required"> * </span>
							</label>
							<div class="col-md-8">
								<label class="switchToggle">
									<input type="checkbox" id="copay-toggle" name="copay">
									<span class="slider green round"></span>
								</label>
							</div>
							<!-- <div class="col-md-8">
								<SearchableSelectField class="form-control input-height" name="copay" id="copay">
									<option value="">Select Copay Status</option>
									<option value="Enabled">Enable</option>
									<option value="Disabled">Disabled</option>
								</SearchableSelectField>
							</div> -->
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Order Store
							</label>
							<div class="col-md-8">
								<SearchableSelectField class="form-control input-height selectpicker" name="order_store[]" id="order_store">
									<option selected value="0">All</option>
									
									<!-- php: foreach($specialties as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } --> 
									
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Form Actions
							</label>
							<div class="col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearItemStockFields()'>Reset</button>
							</div>
						</div>				
					</div>
				</div>															
			<!-- php: =$this->Form->end(); -->
			
		</div>
		
	</div>
</div>


<script>
	function fetchAllItems () {
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller'=>'Inventory', 'action'=>'fetchAllItems']); -->',
            type: 'POST',
            success: function (response) {
				let res = ''
				response.forEach(selectOption => {
					res += \`<option value="\${ selectOption.id }" 
						data-content="\${ (selectOption.full_name) } <br/>\${ selectOption['brand_name'] ? "<span class='badge badge-success'>"+ selectOption.brand_name + "</span>": ''}
						<span class='badge badge-danger'>\${ (selectOption['item_type'] ? 'Unit: '+(selectOption['item_type'] && selectOption.item_type ? selectOption.item_type.type_name : '') : '') }
						</span>  <span class='badge badge-pill'>\${ (selectOption.item_type?.type_name) } 
						(\${ (selectOption.item_type?.quantity) })</span>">\${ selectOption.full_name } 
						\${ selectOption['age_category'] ? "<span class='badge badge-success'>"+ selectOption.age_category?.name + "</span>": ''} 
						\${ selectOption['gender_category'] ? "<span class='badge badge-success'>"+ selectOption.gender_category?.name + "</span>": ''} </option>
					\`
				});

				$('#item_id').html(res)
				$('#item_id').selectpicker("refresh")

            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }; 

	$(document).ready(function () {
		fetchAllItems()
	})
	function clearDrugStockFields(){
	}
	
	function myFunction() {

		var quantity = document.getElementById("quantity").value;
		var unit_cost_price = document.getElementById("unit_cost_price").value;

		if(quantity != "" && unit_cost_price != ""){
			document.getElementById("total_cost_price").value = (quantity * unit_cost_price).toFixed(2);
			setTimeout(function () {
				document.getElementById("div_total_cost_price").style.display='block';
			}, 1000);
		}
		else
		{
			setTimeout(function () {
				document.getElementById("div_total_cost_price").style.display='none';
			}, 1000);
		}
	}

	function myFunction1() {
		var quantity = document.getElementById("quantity").value;
		var unit_selling_price = document.getElementById("unit_selling_price").value;

		if(quantity != "" && unit_selling_price != ""){
			document.getElementById("total_selling_price").value = (quantity * unit_selling_price).toFixed(2);
			setTimeout(function () {
				document.getElementById("div_total_selling_price").style.display='block';
			}, 1000);
		}
		else
		{
			setTimeout(function () {
				document.getElementById("div_total_selling_price").style.display='none';
			}, 1000);
		}
	}

	function myFunction2() {
		var quantity = document.getElementById("quantity").value;
		var unit_cost_price = document.getElementById("unit_cost_price").value;
		var discount = document.getElementById("discount").value;

		if(quantity != "" && unit_cost_price != "" && discount != "")
		{

			if(discount >= 0 && discount <= 100)
			{
				var total = quantity * unit_cost_price;
				var percentage = discount / 100;

				document.getElementById("new_total_cost_price").value = (total - percentage *  total).toFixed(2);
				setTimeout(function () {
					document.getElementById("div_new_total_cost_price").style.display='block';
				}, 1000);
			}
			else
			{
				setTimeout(function () {
				document.getElementById("div_new_total_cost_price").style.display='none';
				document.getElementById("new_total_cost_price").value
			}, 1000);

			}
		

		}
		else
		{
			setTimeout(function () {
				document.getElementById("div_new_total_cost_price").style.display='none';
				document.getElementById("new_total_cost_price").value
			}, 1000);
		}
	}

	var copay = $('#copay-toggle').is(':checked') ? 1 : 0;
	if($('#copay-toggle').is(':checked')){
		$('#copay').val = 'Enabled'
		// alert('checked')
	}else{
		$('#copay').val = 'Disabled'
		// alert('not checked')
	}
	// if(copay == 1){
	// 	$('#copay').value = 'Enabled'
	// 	alert(1)
	// }else{
	// 	$('#copay').value = 'Disabled'
	// 	alert(2)
	// }

	//sadat
	function itemSelectOnchange()
	{
		let pricing = $("#item_id").find(':selected').attr('data-unit-pricing').trim();
		$('$item_unit_pricing').text(pricing);
		$('$item_unit_pricing_section').show(500);
	}

</script>

`;

export default function ElementElementInventoryAddStock() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
