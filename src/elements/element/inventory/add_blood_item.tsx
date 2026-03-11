const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Add Blood Item</span>
			</div>
		</div>
		<div class="borderBox-body">
		
			<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Inventory', 'action' => 'addTransfusionItem']]); -->

				<div class="row">
					<div class="col-md-12 mb-5">
						<div class="form-group row">
							<label class="control-label col-md-4"> <span id="name_description">Full Name</span>
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<div class="row d-flex flex-column">
									<div class="row d-flex" id="">
										<input type="text" name="name" id="name" data-required="1" style="width:80%" onchange="updateCode(event)" placeholder="Full Name" class="form-control input-height" required /> 
									</div>
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4"> <span id="name_description">Modifier</span>
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="hidden" name="modifier_count" id="modifier_count">
								<input type="hidden" name="indicator_count" id="indicator_count">
								<div class="row d-flex flex-column" id="modifiers">

								</div>
								<span><a href="javascript:void(0);" class="text-primary" id="add_mod_button">+ Modifier</a></span>
							</div>
						</div>
					</div>

					<div class="col-md-6">
						<div class="form-group row">
							<label class="control-label col-md-4">Item Category
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="item_category_id" id="item_category_id" placeholder="select Category" required onchange="updateSubCategories()">
                                    <option value="" disabled selected>Select Category</option>
									<option value="5">Transfusion</option>
									
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Code
								
							</label>
							<div class="col-md-5">
								<input type="text" name="item_code" id="item_code" data-required="1" placeholder="Enter item code" class="form-control input-height" required />
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Item Form (Unit of Pricing)
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="item_type_id" id="item_type_id" required>
									<option value="">Select Form</option>
									
									<!-- php: foreach($itemTypes as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name --> (<!-- php: = $selectOption->quantity -->)</option>
									<!-- php: } -->
									
								</SearchableSelectField>
							</div>
						</div>	
																	
						<div class="form-group row">
							<label class="control-label col-md-4">Quantity (Unit Quantity)

							</label>
							<div class="col-md-5">
								<input type="number" step="1" min="0" name="unit_quantity" id="unit_quantity" data-required="1" value="0" placeholder="Unit Quantity" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Reorder Level

							</label>
							<div class="col-md-5">
								<input type="number" step="1" min="0" name="reorder_level" id="reorder_level" data-required="1" value="0" placeholder="Enter reorder level" class="form-control input-height" required /> 
							</div>
						</div>
					
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<textarea type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control text-area" ></textarea> 
							</div>
						</div>																																		
						<div class="form-group row">
							<label class="control-label col-md-4">Compatibility Tests
								
							</label>
							<div class="col-md-5">
								<SearchableSelectField name="lab_tests[]" id="lab_tests" data-required="0" class="form-control selectpicker" title="Select Compatibility Tests" data-live-search="true" data-style="bg-white" multiple></SearchableSelectField> 
							</div>
						</div>																																		
					</div>
					<div class="col-md-6">
						<div class="form-group row">
							<label class="control-label col-md-4">Donor Source
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="supplier_id" id="supplier_id" required>
									<!-- php: foreach($suppliers as $supplier) { --> 
										<option value="<!-- php: = $supplier->id -->"><!-- php: = $supplier->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-4">Administration Route
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="dosage_form_id" id="dosage_form_id">
									<option value="">Select ROA</option>
									<!-- php: foreach($dosageForms as $key => $dosageForm ) { --> 
										<option value="<!-- php: = $key -->"><!-- php: = h($dosageForm) --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Allegic Components
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<textarea type="text" name="allergies" id="allergies" data-required="0" placeholder="Enter allegies" class="form-control text-area" ></textarea> 
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-4">Gender Category
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="gender_category" id="gender_category">
									<option value="">Select Gender Category</option>
									<option selected value="All">All</option>
									<option value="Males">Males</option>
									<option value="Females">Females</option>

								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Age Category
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="age_category" id="age_category">
									<option value="">Select Age Category</option>
									<option selected value="All">All</option>
									<option value="Infants">Infants</option>
									<option value="Infant Child">Infant Child</option>
									<option value="Adult">Adult</option>
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Stock Type
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="stock_type" id="stock_type">
									<option value="">Select Stock Type</option>
									<option value="Non Stock">Non Stock</option>
									<option value="Stock">Stock</option>
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row" hidden id="age-spec-div">
							<label class="control-label col-md-4">Age Specification
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker" name="age_spec[]" id="age_spec" multiple>
									<option value="">Select Age Spec</option>
									<option value="0-4 months">0-4 months</option>
									<option value="0-12 months">0-12 months</option>
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row" hidden id="weight-spec-div">
							<label class="control-label col-md-4">Weight Specification
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker" name="weight_spec[]" id="weight_spec" multiple>
									<option value="">Select Age Spec</option>
									<option value="0-4 Kg">0-4 Kg</option>
									<option value="0-12 Kg">0-12 Kg</option>
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Form Actions
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<button type="button" class="btn btn-info" id="specification_button">Add Specification<i class="fa fa-long-arrow-up"></i></button>
								<button type="submit" class="btn btn-success">Save</button>
								<button type="button" class="btn btn-default" onclick = 'clearDrugFields()'>Reset</button>	
							</div>
						</div>
					</div>
				</div>
				
			<!-- php: =$this->Form->end(); -->
			
		</div>
	
	</div>
</div>


<script>
	function clearDrugFields(){
		$('#name').val('');
		$('#description').val('');
	}
	$("#specification_button").click(function(){
		$("#age-spec-div").removeAttr("hidden");
		$("#weight-spec-div").removeAttr("hidden");
	})

	let drugs = [];
	let infusions = [];
	<!-- php: foreach($itemTypes as $selectOption) { -->
	<!-- php: if($selectOption->type_label == 'infusion') { -->
		infusions.push(\`<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name --> (<!-- php: = $selectOption->quantity -->)</option>\`)
	<!-- php: } else { -->
		drugs.push(\`<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name --> (<!-- php: = $selectOption->quantity -->)</option>\`)
	<!-- php: } } -->

	console.log("infusion here", infusions)

	function updateSubCategories(){
		let category = $('#item_category_id').val()
		if(category == 1){
			$('#sub_category_id').removeAttr('hidden');
			$('#name').attr('placeholder','Full Name');
			// $('#item_type_id').html([...drugs, ...infusions].join(''))
			$('#brand_name').hide()
			$('#name_description').html('Full Name')
		}else if(category == 4) {
			$('#name').attr('placeholder','Generic Name');
			// $('#item_type_id').html([...drugs, ...infusions].join(''))
			$('#brand_name').show()
			$('#name_description').html('Generic Name')
		}else if(category == 5) {
			// $('#name').attr('placeholder','Generic Name');
			// $('#item_type_id').html([...drugs, ...infusions].join(''))
			$('#brand_name').show()
			// $('#name_description').html('Generic Name')
		}
		else{
			// $('#item_type_id').html([...drugs, ...infusions].join(''))
			$('#name').attr('placeholder','Full Name');
			$('#sub_category_id').attr('hidden', 'hidden');
			$('#item_category_id').prop('required',false)
			$('#brand_name').hide()
			$('#name_description').html('Full Name')
			
		}
	}
    function updateCode(event) {
        $("#item_code").val(event.target.value[0].toUpperCase())
    }
	var modifier_counter = 0
	var indicator_counter = 0
	function name() {
	}
	$('#add_mod_button').on('click', function() {
		$("#modifiers").append(
			\`
				<div class="row d-flex" id="modifier_div_\${modifier_counter}">
					<input type="text" name="modifier\${modifier_counter}" data-required="1" style="width:80%;border: 1px solid #007bff" placeholder="Add Modifier" class="form-control input-height" required /> 
					<span class="" style="height:10px"><a style="color:red" href="javascript:void(0);" onclick="removeModFields('\${modifier_counter}')" id="remove_more_button">Remove</a></span>
				</div>
				<div class="row d-flex mb-0 mt-0" id="add_indicator_\${modifier_counter}">
				</div>
				<span><a href="javascript:void(0);" class="text-success mb-5" id="add_indicator_button_id\${modifier_counter}" onclick="add_indic_button(\${modifier_counter})">+ Indicator</a></span>
			\`
		)
		modifier_counter += 1;
		$("#modifier_count").val(modifier_counter)
	});
	function add_indic_button(count) {
		$("#add_indicator_" + count).append(
			\`
				<input type="text" name="\${count}_indic[]" id="\${count}_indic_\${indicator_counter}" data-required="1" onchange="" style="width:80%;border: 1px solid rgb(40, 167, 69)" placeholder="Add Indication" style="width:90%" class="mb-1 form-control input-height" required /> 
				<span class="rem" style="height:10px"><a style="color:red" href="javascript:void(0);" onclick="removeIndicFields('\${count}_indic_\${indicator_counter}')" id="\${count}_indic_\${indicator_counter}_remover" >Remove</a></span><br>

			\`
		)
		indicator_counter += 1;
		$("#indicator_count").val(indicator_counter)

		
	}
	function removeModFields(count) {
		$('#modifier_div_'+count).remove()
		$('#add_indicator_'+count).remove()
		$('#add_indicator_button_id'+count).remove()
		modifier_counter -= 1;
		$("#modifier_count").val(modifier_counter)
	}
	function removeIndicFields(count) {
		$(\`#\${count}\`).remove()
		$(\`#\${count}_remover\`).remove()
		indicator_counter -= 1;
		$("#indicator_count").val(indicator_counter)
	}
	function getLabTests() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'ManageLabs', 'action' => 'getCompatibilityLabTests',]) -->"
		}).done((data) => {
			let result = []
			if (Array.isArray(data) && data && data.length > 0 ) {
				data?.forEach((element, index) => {
					result.push(\`
						<option value="\${element.id}"> \${element.name}</option>
					\`)
				});
			}
			$('#lab_tests').append(result.join(""));
			$('#lab_tests').selectpicker("refresh");
		}).fail((data) => {
			console.log("Getting Labs failed")
			console.log(data)
		})
	}
	$(document).ready(function () {
		getLabTests()
	})
</script>

`;

export default function ElementElementInventoryAddBloodItem() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
