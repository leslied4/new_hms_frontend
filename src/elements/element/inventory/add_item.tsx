const rawHtml = `
	<style>
		.list-items {
			padding: 10px 5px;
		}
		.list-items:hover {
			background-color: #dddddd;
		}
	</style>
	<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Add Item</span>
			</div>
		</div>
		<div class="borderBox-body">
		
			<!-- php: = $this->Form->create($item, ['url' => ['controller' => 'Inventory', 'action' => 'addItem']]); -->

				<div class="row">
					<div class="col-md-6">

						<div class="form-group row">
							<label class="control-label col-md-4">Drugs Api
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<label class="switchToggle">
									<input type="checkbox" id="drug_api_status" name="drug_api_status" onclick="updateMedicationSource(this.checked);">
									<span class="slider green round"></span>
								</label>
							</div>
						</div>

						<div class="form-group row mb-5" id="all_api_medicines" style="display:none">
							<label class="control-label col-md-4">Select Drug
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="api_drug" id="all_medicines" data-size="4" data-live-search="true" onchange="updateGenericName()">

								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row" style="display:">
							<label class="control-label col-md-4">Generic Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="generic_name" data-required="1" placeholder="Generic Name" class="form-control input-height" onMouseOut="getDrugExtensiveInfo(this.value)"/> 
								<ul class="col-md-5" id="generic_name_suggestions" style="position:absolute;top: 45px; left: 0px;z-index:1; list-style:none; min-width: 100%;background-color: #ffffff">
								</ul>
							</div>
						</div>
<!-- 
						<div class="form-group row">
							<label class="control-label col-md-4">Dosage Label
								<span class="required">  </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="dosage_label" id="dosage_label" onchange="getSelecectedExtensiveInfo(this)">
									<option value="">Select drug for labelling</option>
								</SearchableSelectField>
							</div>
						</div> -->

						<div class="form-group row" id="medicineCategory">
							<label class="control-label col-md-4">Medicine Category

							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="medicine_category_id" id="medicine_category_id" onchange="updateSubCategories()" data-size="4" data-live-search="true">
									
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row" id="medicineIndication">
							<label class="control-label col-md-4">Indications

							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="indication_id" id="all_indications" data-size="4" data-live-search="true">
									
								</SearchableSelectField>
							</div>
						</div>
									
						<div class="form-group row" id="FormSection" style="">
							<label class="control-label col-md-4">Dosage Form
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="dosage_form_id" id="formID" data-size="4" data-live-search="true" onchange="selectSubForm()">
									
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row" id="subFormSection" style="display:none">
							<label class="control-label col-md-4">Dosage Sub Form
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="dosage_sub_form_id" id="subFormId"  data-size="4" data-live-search="true">
									
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row" id="strengthSection" style="">
							<label class="control-label col-md-4">Dosage Strength
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">

								<input type="text" name="dosage_strength" id="dosage_strength" class="form-control input-height" onkeyup="updateFullNameStength()">
							</div>
						</div>

						<div class="form-group row" id="ROASection">
							<label class="control-label col-md-4">Administration Route
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="roa_id" id="roa_id" data-size="4" data-live-search="true" onchange="getSubRoa()">
									
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row" style="display:none" id="subROASection">
							<label class="control-label col-md-4">Administration Sub Route
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="sub_roa_id" id="sub_roa_id" data-size="4" data-live-search="true">
								
								</SearchableSelectField>
							</div>
						</div>
						
						<!-- <div class="form-group row">
							<label class="control-label col-md-4"> <span id="name_description">Kindly Confirm Full Name for Drug Drug Interaction Program</span>

							</label>
							<div class="col-md-5">
								<SearchableSelectField name="rxcui_id" class="form-control input-height" id="full_name_suggestions" onchange="fullNameUpdate()" data-live-search="true"></SearchableSelectField>
							</div>
						</div> -->
						<input hidden type="text" name="full_name" id="full_name" /> 

						<div class="form-group row">
							<label class="control-label col-md-4"> <span id="name_description">Brand Name</span>

							</label>
							<div class="col-md-5">
								<input type="text" placeholder="Enter Brand Name" name="brand_name" class="form-control input-height" id="brand_name" data-live-search="true" />
							</div>
						</div>
						
						<div class="" id="apiUsageSection" style="display:none">
							<div class="form-group row">
								<label class="control-label col-md-4"> <span id="name_description">ROA</span>
								</label>
								<div class="col-md-5" id="api_roa">
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4"> <span id="name_description">Form and Subform</span>
								</label>
								<div class="col-md-5" id="api_form_sub_form">
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4"> <span id="name_description">Category</span>
								</label>
								<div class="col-md-5" id="api_category">
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4"> <span id="name_description">Indication</span>
								</label>
								<div class="col-md-5" id="api_indication">
								</div>
							</div>
						</div>
						
					</div>
					<div class="col-md-6">
						<div class="form-group row">
							<label class="control-label col-md-4">Item Category
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="item_category_id" id="item_category_id_select" required onchange="updateSubCategories();toggleItemCategory()">
									<option value="">Select Category</option>
									<!-- php: foreach($categories as $category) { --> 
										<option value="<!-- php: = $category->id -->" <!-- php: = $category->id == $item->item_category_id ? 'selected="selected"' : '' --> ><!-- php: = $category->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row" id="item_code_section">
							<label class="control-label col-md-4">Code
								
							</label>
							<div class="col-md-5">
								<input type="text" name="item_code" id="item_code" data-required="1" placeholder="Enter item code" class="form-control input-height" />
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Unit of Pricing (Base Unit of Sale)
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker" data-size="4" data-live-search="true" name="item_type_id" id="item_type_id" required>
									<option value="">Select Form</option>
									
									<!-- php: foreach($itemTypes as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name -->(<!-- php: = $selectOption->quantity -->)</option>
									<!-- php: } -->
									
								</SearchableSelectField>
							</div>
						</div>	

						<div class="form-group row">
							<label class="control-label col-md-4">Indicate the Administer per Dose
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" min="0" name="cup" placeholder="Eg. 1 tablet or 5 ml" class="form-control full-width">
							</div>
						</div>	
	
						<div class="form-group row">
							<label class="control-label col-md-4">Reorder Level
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" step="1" min="0" name="reorder_level" id="reorder_level" data-required="1" value="0" placeholder="Enter reorder level" class="form-control input-height" required /> 
							</div>
						</div>
					
						<!-- <div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<textarea type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control text-area" ></textarea> 
							</div>
						</div>	 -->

						<div class="form-group row">
							<label class="control-label col-md-4">Manufacturer
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker" data-live-search="true" name="manufacturer_id" id="manufacturer_id" required>
									<option value="">Select Manufacturer</option>
									<!-- php: foreach($manufacturers as $manufacturer) { --> 
										<option value="<!-- php: = $manufacturer->id -->"><!-- php: = $manufacturer->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>	

						<!-- <div class="form-group row">
							<label class="control-label col-md-4">Allegic Components

							</label>
							<div class="col-md-5">
								<textarea type="text" name="allergies" id="allergies" data-required="0" placeholder="Enter allegies" class="form-control text-area" ></textarea> 
							</div>
						</div> -->

						<!-- <div class="form-group row">
							<label class="control-label col-md-4">Gender Category

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
									<option value="Non Stock" >Non Stock</option>
									<option value="Stock" selected>Stock</option>
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
						</div> -->

						<!-- <div class="form-group row" hidden id="weight-spec-div">
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
						</div> -->

						<div class="form-group row">
							<label for="" class="control-label col-md-4">NHIS GDRG
								<span class="required"></span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker input-height show-menu-arrow show-tick" data-size="5" title="Select GDRG"  data-live-search="true" onchange="$('#nhis_item_id').val(this.value)">
								<!-- php: foreach($nhis_items as $val) { -->
									<option value="<!-- php: = $val->id -->" data-content="<!-- php: = h($val->item_name) --><!-- php: = h($val->gdrg) --> <span class='badge badge-danger'><!-- php: = $val->tariff --></span>" ><!-- php: = h($val->item_name) --><!-- php: = h($val->gdrg) --> <span class="badge badge-danger"><!-- php: = $val->tariff --></span></option>
													
								<!-- php: } -->	
												
								</SearchableSelectField>

								<input name="nhis_item_id" id="nhis_item_id" type="text" value="" hidden/>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Form Actions
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<!-- <button type="button" class="btn btn-info" id="specification_button">Add Specification<i class="fa fa-long-arrow-up"></i></button> -->
								<button type="submit" class="btn btn-success">Save</button>
								<button type="button" class="btn btn-default" onclick = 'clearDrugFields()'>Reset</button>	
							</div>
						</div>
					</div>
				</div>

				<!-- hidden fields to hold extensive drug data -->
				<input type="text" name="name_of_drug" id="name_of_drug" hidden/> 
				<input type="text" name="strength" id="strength" hidden/> 
				<input type="text" name="form" id="form" hidden/> 
				<input type="text" name="instruction" id="instruction" hidden/> 
				<input type="text" name="direction" id="direction" hidden/> 
				<input type="text" name="duration" id="duration"hidden /> 
				<input type="text" name="caution" id="caution" hidden/>
				<!-- end of hidden fields to hold extensive drug data -->

			<!-- php: =$this->Form->end(); -->
			
		</div>
	
	</div>
</div>
<script>
	function updateNHISStatus(value = null)
	{
		if(value == true){
			$("#gdrg-code").show(500)
		}else{
			$("#gdrg-code").hide(500)
		}
	}

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
		infusions.push(\`<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name --></option>\`)
	<!-- php: } else { -->
		drugs.push(\`<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name --></option>\`)
	<!-- php: } } -->



	function updateSubCategories(){
		// // return
		// let category = $('#item_category_id').val()
		// if(category == 1){
		// 	$('#sub_category_id').removeAttr('hidden');
		// 	$('#name').attr('placeholder','Full Name');
		// 	$('#item_type_id').html(drugs.join(''))
		// 	$('#brand_name').hide()
		// 	$('#name_description').html('Full Name')
		// }else if(category == 4) {
		// 	$('#name').attr('placeholder','Generic Name');
		// 	$('#item_type_id').html(infusions.join(''))
		// 	$('#brand_name').show()
		// 	$('#name_description').html('Generic Name')
		// }
		// else{
		// 	$('#item_type_id').html(drugs.join(''))
		// 	$('#name').attr('placeholder','Full Name');
		// 	$('#sub_category_id').attr('hidden', 'hidden');
		// 	$('#item_category_id').prop('required',false)
		// 	$('#brand_name').hide()
		// 	$('#name_description').html('Full Name')
			
		// }
	}

	function toggleItemCategory(params) {
		$('#information').val()
	}

	function suggestNames(input_name, location) {
		$.ajax({
			type: "GET",
			url: "https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=" + $('#'+input_name).val(),
			headers: {
				'X-CSRF-Token': "token",
				'Access-Control-Expose-Headers': 'X-DEBUGKIT-ID'
			},
			// data: value,
			success: function g(data, textStatus) {
				if (Array.isArray(data?.suggestionGroup?.suggestionList?.suggestion)) {
					let result = []
					
					data.suggestionGroup.suggestionList.suggestion.forEach(name => {
						result.push(\`<li class="list-items" style="cursor:pointer;font-weight:normal" onclick="pasteName('\${name[0].toUpperCase() + name.slice(1,)}', '\${input_name}', '\${location}')">\${name[0].toUpperCase() + name.slice(1,)}</li>\`)
					});
					$('#'+location).html(result.join(""))
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					console.log(xhr);
			}
		});
	}
	function suggestFullName(input_name, location) {
		$.ajax({
			type: "GET",
			url: "https://rxnav.nlm.nih.gov/REST/drugs.json?name=" + input_name[0],
			headers: {
				'X-CSRF-Token': "token",
				'Access-Control-Expose-Headers': 'X-DEBUGKIT-ID'
			},
			// data: value,
			success: function g(data, textStatus) {
				if (Array.isArray(data?.drugGroup?.conceptGroup)) {
					let result = ["<option value='' selected disabled>select..</option>"]
					let filtered_properties = []
					let filtered_group = data?.drugGroup?.conceptGroup?.filter(group => {
						return Object.keys(group).includes('conceptProperties')
					})
					filtered_group.forEach(le_group => {
						filtered_properties = le_group.conceptProperties.filter(group => {
							return group.name.toLowerCase().includes($('#new_dosage_form_id option:selected').text()) || group.name.toLowerCase().includes($('#new_dosage_strength_id option:selected').text())
						})
					});
					filtered_properties.forEach(property => {
						name = property.name
						val = property.rxcui
						result.push(\`<option value="\${val}" onclick="pasteFullName('\${name[0].toUpperCase() + name.slice(1,)}', '\${input_name}', '\${location}', '\${property.rxcui}')">\${name[0].toUpperCase() + name.slice(1,)}</option>\`)
					});
					// console.log("The result", result)
					$('#'+location).html(result.join(""))
					$('#'+location).selectpicker("refresh");
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					console.log(xhr);
			}
		});
	}

	function pasteName(name, location, suggestions) {
		$('#' + location).val(name)

		removeListItems(suggestions)
		let form = $('#all_medicines option:selected').attr('data-drug-form')
		let strength = $("dosage_strength").val()
		let generic_name  = $('#generic_name').val()
		suggestFullName([generic_name, strength, form], 'full_name_suggestions')
		// if(location == 'generic_name') {
		// 	let fullName = $('#full_name').val()
		// 	fullNameArr = fullName.split(" ")
		// 	fullNameArr[0] = $('#generic_name').val()
		// 	$('#full_name').val(fullNameArr.join(" "))
		// }
	}
	function pasteFullName(name, location, suggestions, rxcui) {
		$('#' + location).val(name)
		removeListItems(suggestions)
		$("#full_name").val(rxcui)
	}

	$('#generic_name').keyup(() => {
		removeListItems('generic_name_suggestions')
		suggestNames('generic_name', 'generic_name_suggestions')
	})
	$('#generic_name').on('propertychange', () => {
		removeListItems('generic_name_suggestions')
		suggestNames('generic_name', 'generic_name_suggestions')
	})
	$('#brand_name').keyup(() => {
		removeListItems('brand_name_suggestions')
		suggestNames('brand_name', 'brand_name_suggestions')
	})
	function fullNameUpdate() {
		let drug_name = $('#full_name_suggestions option:selected').text()
		$('#full_name').val(drug_name)
	}

	function removeListItems(name_suggestions) {
		$('#' + name_suggestions).empty()
	}

	function updateFullNameForm() {
		let form = $('#formID option:selected').text()
		let strength = $("dosage_strength").val()
		let generic_name  = $('#generic_name').val()
		suggestFullName([generic_name, strength, form], 'full_name_suggestions')
	}
	function updateFullNameStength() {
		let form = $('#formID option:selected').text()
		let strength = $("dosage_strength").val()
		let generic_name  = $('#generic_name').val()
		suggestFullName([generic_name, strength, form], 'full_name_suggestions')
		
	}
</script>


<script>
	function getClasses() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'getAllClasses']) -->",
			success: function g(data) {
				result = []
				if (Array.isArray(data) && data && data.length > 0) {
					result.push(\`
						<option value="" selected data-content="">select..</option>
					\`)
					data?.forEach((element, index) => {
						result.push(\`
							<option value="\${element.id}" data-content="">\${element.name}</option>
						\`)
					});
				}
				result.push('<option value="o" >Other</option>')
				$('#medicine_category_id').html(result)
				$("#medicine_category_id").selectpicker("refresh");

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});

	}
	function updateMedicationSource(value = null) {
		if (value == false) {
			$('#all_api_medicines').hide(500);
			$('#FormSection').show(500);
			// $('#subFormSection').show(500);
			$('#item_code_section').show(500);
			$('#ROASection').show(500);
			$('#strengthSection').show(500);
			$('#medicineCategory').show(500);
			$('#medicineIndication').show(500);

			$('#apiUsageSection').hide(500)
		} else {
			getMedicines()
			$('#all_api_medicines').show(500);
			$('#FormSection').hide(500);
			// $('#subFormSection').hide(500);
			$('#item_code_section').hide(500);
			$('#ROASection').hide(500);
			$('#strengthSection').hide(500);
			$('#medicineCategory').hide(500);
			$('#medicineIndication').hide(500);

			$('#apiUsageSection').show(500)
		}
	}
	function getIndications() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'getIndications']) -->",
			success: function g(data) {
				result = []
				if (Array.isArray(data) && data && data.length > 0) {
					result.push(\`
						<option value="" selected data-content="">select..</option>
					\`)
					data?.forEach((element, index) => {
						result.push(\`
							<option value="\${element.id}" data-content="">\${element.name}</option>
						\`)
					});
				}
				result.push('<option value="o" >Other</option>')
				$('#all_indications').html(result)
				$("#all_indications").selectpicker("refresh");

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
	function getRoa() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'getRoa']) -->",
			success: function g(data) {
				result = ''
				if (Array.isArray(data) && data && data.length > 0) {
					result = \`
						<option value="" selected disabled >select ROA..</option>
					\`
					data?.forEach((element, index) => {
						result += \`
							<option value="\${element.id}" data-content="\${element.name}"></option>
						\`
					});
				}
				$('#roa_id').html(result)
				$("#roa_id").selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
	function getSubRoa() {
		$.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'getSubRoa']) -->",
			data: { id: $("#roa_id").val() },
			success: function g(data) {
				result = ''
				if (Array.isArray(data) && data && data.length > 0) {
					result = \`
						<option value="" selected disabled >select ROA..</option>
					\`
					data?.forEach((element, index) => {
						result += \`
							<option value="\${element.id}" data-content="\${element.name} <span class='badge badge-primary'> \${element.medication_route.name}</span>"></option>
						\`
					});
				}
				$('#sub_roa_id').html(result)
				$("#sub_roa_id").selectpicker("refresh");
				$('#subROASection').show(400)

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function getFormsID() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'getPricingForms']) -->",
			success: function g(data) {
				result = ''
				if (Array.isArray(data) && data && data.length > 0) {
					result = \`
                        <option value="" selected disabled>select..</option>
					\`
					data?.forEach((element, index) => {
						result += \`
							<option value="\${element.id}" data-content="\${element.name}">\${element.name}</option>
						\`
					});
				}
				$('#formID').html(result)
				$("#formID").selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
	function selectSubForm() {
		updateFullNameForm()
		$.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'getPricingSubForms']) -->",
			data: {id: $('#formID').val()},
			success: function g(data) {
				result = ''
				if (Array.isArray(data) && data && data.length > 0) {
					result = \`
						<option value="" selected disabled >select..</option>
					\`
					data?.forEach((element, index) => {
						result += \`
							<option value="\${element.id}" data-content="\${element.name}">\${element.name}</option>
						\`
					});
				}
				$('#subFormId').html(result)
				$("#subFormId").selectpicker("refresh");
				$('#subFormSection').show(400)
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
	function getMedicines() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'getAllMedicines']) -->",
			success: function g(data) {
				result = ''
				if (Array.isArray(data) && data && data.length > 0) {
					result = \`
						<option value="" selected data-content="">select..</option>
					\`
					data?.forEach((element, index) => {
						result += \`
                            <option 
                                data-drug-name="\${ element?.medicine?.name }"
                                data-drug-formulation="\${ element?.formualation?.name }"
                                form="\${ element?.formualation?.medication_form?.name }"
                                sub-form="\${ element?.formualation?.medication_sub_form?.name || null }"
                                roa="\${ element?.formualation?.medication_route?.name }"
                                sub-roa="\${ element?.formualation?.medication_sub_route?.name || null }"
                                indication="\${ element?.medicine?.indication?.name }"
                                category="\${ element?.medicine?.drug_class?.name }"
                                value="\${ element?.id }" 
                                data-content="
                                    <span style='margin-bottom: 5px;' class='badge badge-primary'>
                                        \${element?.medicine?.name}
                                    </span> <br/>
                                    <span style='margin-bottom: 5px;' class='badge badge-secondary'>
                                        \${element?.formualation?.name}
                                    </span>
									<hr style='margin-top: 10px; margin-bottom: 0px;'/>
								"
							>\${element?.medicine?.name}</option>
                        \`
					});
				}
				$('#all_medicines').html(result)
				$("#all_medicines").selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function updateGenericName(params) {
		$('#generic_name').val(
			$('#all_medicines option:selected').text()
		)
		$('#generic_name').keyup()

		let sub_form = $("#all_medicines").find(':selected').attr('sub-form') != 'null' ? "("+$("#all_medicines").find(':selected').attr('sub-form').trim()+")" : ''
		let form = $("#all_medicines").find(':selected').attr('form').trim() + " " + sub_form
		let sub_roa = $("#all_medicines").find(':selected').attr('sub-roa') != 'null' ? "("+$("#all_medicines").find(':selected').attr('sub-roa').trim()+")" : ''
		let roa = $("#all_medicines").find(':selected').attr('roa').trim() + " " + sub_roa
		let indication = $("#all_medicines").find(':selected').attr('indication').trim()
		let category = $("#all_medicines").find(':selected').attr('category').trim()

		$('#api_roa').html(roa)
		$('#api_form_sub_form').html(form)
		$('#api_category').html(category)
		$('#api_indication').html(indication)

	}

	function getDrugExtensiveInfo(drugName)
	{
		drugName = drugName.toLowerCase();
		console.log('name in small:', drugName)
		$.ajax({
			type: 'GET',
			url: 'https://api.pharmatechgh.com:4010/api/external/drugs/',
			data: { name: drugName }, 
			cache: false,
			beforeSend: function() {
				console.log('sending');
			},
			success: function(response) {
				console.log('success');
				console.log('response from pharmaTech:', response.data.docs);
				drugs = response.data.docs
				var selectField = document.getElementById("dosage_label");
				while (selectField.options.length > 0) {
					selectField.remove(0);
				}
				drugs.forEach(function(drug) {
					var option = document.createElement("option");
					option.value = drug.name;
					option.text = drug.name;
					option.setAttribute("data-name", drug.name);
					option.setAttribute("data-id", drug._id);
					option.setAttribute("data-strength", drug.strength);
					option.setAttribute("data-form", drug.form);
					option.setAttribute("data-instruction", drug.instruction);
					option.setAttribute("data-direction", drug.direction);
					option.setAttribute("data-duration", drug.duration);
					option.setAttribute("data-caution", drug.caution);
					selectField.appendChild(option);
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Error:', textStatus, errorThrown);
			}
		});
	}

	function getSelecectedExtensiveInfo(element)
	{
		var selected_option = element.options[element.selectedIndex];
		$("#duration").val(selected_option.getAttribute('data-duration'))
		$("#caution").val(selected_option.getAttribute('data-caution'))
		$("#instruction").val(selected_option.getAttribute('data-instruction'))
		$("#direction").val(selected_option.getAttribute('data-direction'))
		$("#form").val(selected_option.getAttribute('data-form'))
		$("#strength").val(selected_option.getAttribute('data-strength'))
		$("#name_of_drug").val(selected_option.getAttribute('data-name'))
	}

	$(document).ready(function () {
		getClasses()
		getIndications()
		getRoa()
		getFormsID()
	})
</script>
`;

export default function ElementElementInventoryAddItem() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
