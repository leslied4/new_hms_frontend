const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Add Consumables</span>
			</div>
		</div>
		<div class="borderBox-body">
		
			<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Inventory', 'action' => 'addConsumable']]); -->

				<div class="row">
					<div class="col-md-12">

						<input type="hidden" name="item_category_id" value="2">
						<div class="form-group row">
							<label class="control-label col-md-4">Consumable
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<label class="switchToggle">
									<input type="checkbox" id="drug_api_status" name="drug_api_status" onclick="updateMedicationSource(this.checked);">
									<span class="slider green round"></span>
								</label>
							</div>
						</div>

						<div class="form-group row" style="display:none" id="medicine_name_category">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">

								<SearchableSelectField name="name_category" data-size="4" data-live-search="true" id="name_category" class="form-control">
								
								</SearchableSelectField>

							</div>
						</div>
						<div class="form-group row" id="medicine_name">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" style="" onchange="updateCode(event)" placeholder="Full Name" class="form-control input-height" required /> 

							</div>
						</div>


						<div class="form-group row" id="medicine_category">
							<label class="control-label col-md-4">Sub Category

							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="item_sub_category_id" id="item_sub_category_id" onchange="['2','3','5','6'].includes($('#item_sub_category_id').val()) ? $('#medicine_div').show() : $('#medicine_div').hide()" data-size="4" data-live-search="true">
									<!-- php: foreach ($sub_categories as $key => $value) { -->
										<option value="<!-- php: = $value->id -->"><!-- php: = $value->category_name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>

						<div style="display:none" id="medicine_div">
							<div class="form-group row" id="medicine_category">
								<label class="control-label col-md-4">Drug Class
	
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height" name="drug_class_id" id="medicine_category_id" onchange="updateSubCategories()" data-size="4" data-live-search="true">
										
									</SearchableSelectField>
								</div>
							</div>
	
							<div class="form-group row" id="medicine_category">
								<label class="control-label col-md-4">Storage Condition
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height" name="storage_condition_id" id="storage_condition_id" onchange="updateSubCategories()" data-size="4" data-live-search="true">
										
									</SearchableSelectField>
								</div>
							</div>

						</div>


						<div class="form-group row">
							<label class="control-label col-md-4">Brand
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="brand_name" id="brand" data-required="1" style="" onchange="updateCode(event)" placeholder="Brand" class="form-control input-height" required /> 

							</div>
						</div>

					</div>

					<div class="col-md-12">

						<div class="form-group row">
							<label class="control-label col-md-4">Manufacturer

							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker" data-size="4" data-live-search="true" name="manufacturer_id" id="manufacturer_id" required>
									<option value="">Select Manufacturer</option>
									<!-- php: foreach($manufacturers as $manufacturer) { --> 
										<option value="<!-- php: = $manufacturer->id -->"><!-- php: = $manufacturer->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
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
							<label class="control-label col-md-4">Form Actions
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
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
	function getStorageConditions() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'viewStorageConditions']) -->",
			success: function g(data) {
				result = []
				if (Array.isArray(data.data) && data.data && data.data.length > 0) {
					result.push(\`
						<option value="">Select Storage Condition</option>
					\`)
					data.data?.forEach((ele, index) => {
						result.push(\`
							<option value="\${ele.id}" data-content="\${ele.condition_name} <span class='badge badge-danger'>\${ele?.temperature_min + "°C to " + ele?.temperature_max + "°C"}</span><span class='badge badge-success'>\${ele?.humidity_min + "% to " + ele?.humidity_max + "%"}</span>">\${ele.condition_name}</option>
						\`)
					});
				}
				$('#storage_condition_id').html(result)
				$("#storage_condition_id").selectpicker("refresh");

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});

	}
	$(document).ready(function () {
		getClasses()
		getStorageConditions()
		consumablesList()

	})

	function consumablesList(params) {
		let list = {
			"Wound Dressings": [
				"Gauze sponges",
				"Sterile Gauze sponges",
				"Non-Sterile Gauze sponges",
				"2” x 2” Gauze sponges",
				"4” x 4” Gauze sponges",
				"Foam dressings",
				"Hydrocolloid dressings",
				"Alginate dressings",
				"Collagen dressings",
				"Composite dressings",
				"Silicone dressings",
				"Transparent film dressings",
				"Antimicrobial dressings",
				"Wound contact layers",
				"Wound filler",
			],
			"Bandages": [
				"Adhesive bandages",
				"1” x 3” Adhesive bandages",
				"2” x 4” Adhesive bandages",
				"3” x 3” Adhesive bandages",
				"Waterproof flexible fabric",
				"Antibacterial",
				"Knuckle",
				"Finger",
				"Large area",
				"Roller gauze",
				"Cohesive bandages",
				"Elastic bandages",
				"Compression bandages",
			],
			"Tapes": [
				"Medical tape Paper",
				"Medical tape Cloth",
				"Medical tape Silk",
				"Medical tape Plastic",
				"Hypoallergenic tape",
				"Waterproof tape",
			],
			"Cleansers and Antiseptics": [
				"Saline solution",
				"Antiseptic wipes",
				"Antiseptic wipes (Chlorhexidine)",
				"Antiseptic wipes (Povidone-iodine)",
				"Wound cleansers",
				"Wound cleansers (Surfactant-based)",
				"Wound cleansers (Enzymatic)",
				"Hydrogen peroxide",
				"Alcohol pads",
			],
			"Topical Agents": [
				"Antibiotic ointments",
				"Hydrogels",
				"Collagenase ointments",
				"Silver sulfadiazine cream",
			],
			"Instruments": [
				"Sterile scissors",
				"Tweezers",
				"Scalpels",
				"Suture removal kits",
			],
			"Personal Protective Equipment (PPE)": [
				"Gloves",
				"Gowns",
				"Masks",
				"Face shields",
			],
			"Wound Care Supplies Miscellaneous": [
				"Cotton-tipped applicators",
				"Tongue depressors",
				"Irrigation syringes",
				"Wound measurement tools",
				"Wound photography tools",
			],
			"Syringes": [
				"General purpose syringes",
				"Insulin syringes",
				"Tuberculin syringes",
				"Fine-dose precision syringes",
				"Safety syringes",
				"Catheter-tip syringes",
				"Oral syringes",
				"Prefilled syringes",
			],
			"Needles": [
				"Hypodermic needles",
				"Insulin needles",
				"Tuberculin needles",
				"Spinal needles",
				"Epidural needles",
				"Dental needles",
				"Venom extraction needles",
			],
			"Syringe Anatomy": [
				"Barrel",
				"Plunger",
				"Tip",
			],
			"Syringe Materials": [
				"Glass syringes",
				"Plastic syringes Two-Part",
				"Plastic syringes Three-Part",
			],
			"Needle Materials": [
				"Stainless steel needle shaft",
				"Plastic needle hub that attaches to syringe",
			],
			"IV Catheters": [
				"Peripheral IV catheters",
				"Midline catheters",
				"Central venous catheters",
				"Arterial catheters",
			],
			"IV Administration Sets": [
				"Primary IV administration sets",
				"Secondary IV administration sets",
				"Microdrip sets",
				"Buretrol sets",
				"Extension sets",
				"Stopcock sets",
			],
			"IV Fluids": [
				"Saline solution (0.9% sodium chloride)",
				"Lactated Ringer's solution",
				"Dextrose solutions",
				"Plasma volume expanders",
			],
			"IV Tubing and Accessories": [
				"IV tubing",
				"IV fluid filters",
				"IV fluid warmers",
				"IV poles and stands",
				"IV clamps and roller clamps",
			],
			"IV Catheters Supplies": [
				"Tourniquet",
				"Antiseptic wipes",
				"Sterile gauze pads",
				"Transparent dressings",
				"Tape",
				"Needles",
				"Syringes",
			],
			"IV Medication Supplies": [
				"Heparin flush syringes",
				"Saline flush syringes",
				"Needleless connectors",
				"Infusion pumps and controllers",
			],
			"IV Insertion Kits": [
				"Starter kits with all necessary supplies",
				"Catheter over needle kits",
				"Catheter through needle kits",
			],
			"Specialty IV Supplies": [
				"Paediatric IV supplies",
				"Infusion pumps and controllers",
				"IV medication compounding supplies",
			],
			"Examination Gloves": [
				"Latex examination gloves",
				"Nitrile examination gloves",
				"Vinyl examination gloves",
				"Neoprene examination gloves",
			],
			"Surgical Gloves": [
				"Latex surgical gloves",
				"Nitrile surgical gloves",
				"Neoprene surgical gloves",
			],
			"Specialty Gloves": [
				"Chemotherapy gloves",
				"Radiation gloves",
				"Cryogenic gloves",
			],
			"Sample Collection Supplies": [
				"Vacutainer tubes",
				"Butterfly needles",
				"Tourniquets",
				"Alcohol prep pads",
				"Bandages",
				"Gloves",
			],
			"Specimen Transport Supplies": [
				"Specimen bags",
				"Biohazard labels",
				"Absorbent sheets",
				"Specimen transport boxes",
			],
			"Urinalysis Supplies": [
				"Urine collection cups",
				"Urine dipsticks",
				"Urine pregnancy tests",
				"Urine sediment chambers",
			],
			"Haematology Supplies": [
				"Capillary tubes",
				"Lancets",
				"Haemoglobin cuvettes",
				"Erythrocyte sedimentation rate (ESR) tubes",
			],
			"Chemistry Supplies": [
				"Pipette tips",
				"Reagent cups",
				"Cuvettes",
				"Calibrators and controls",
			],
			"Microbiology Supplies": [
				"Culture swabs",
				"Inoculation loops",
				"Petri dishes",
				"Anaerobic jars",
			],
			"Molecular Diagnostics Supplies": [
				"PCR tubes and plates",
				"Extraction kits",
				"Reagents",
				"Molecular grade water",
			],
			"Histology and Cytology Supplies": [
				"Microscope slides",
				"Cover slips",
				"Cytology brushes and spatulas",
				"Fixatives",
			],
			"General Lab Supplies": [
				"Parafilm",
				"Gloves",
				"Lab coats",
				"Disinfectants",
				"Biohazard bags and containers",
			],
			"General Reagents": [
				"Hydrochloric acid (HCl)",
				"Nitric acid (HNO3)",
				"Sulfuric acid (H2SO4)",
				"Phosphoric acid (H3PO4)",
				"Sodium hydroxide (NaOH)",
				"Ammonium hydroxide (NH4OH)",
				"Hydrogen peroxide (H2O2)",
				"Ethanol",
				"Methanol",
				"Acetone",
				"Diethyl ether",
				"Chloroform",
				"Toluene",
				"Hexane",
				"Silica gel",
				"Sodium sulphate",
				"Magnesium sulphate",
				"Sodium chloride",
				"Potassium chloride",
				"Calcium chloride",
				"Ammonium chloride",
				"Sodium bicarbonate",
				"Potassium permanganate (KMnO4)",
				"Sodium borohydride (NaBH4)",
				"Lithium aluminium hydride (LiAlH4)",
				"Grignard reagents",
			],
			"Organic Synthesis Reagents": [
				"Diborane (B2H6)",
				"Diethyl azodicarboxylate (DEAD)",
				"Diisopropyl azodicarboxylate (DIAD)",
				"Dess-Martin periodinane",
				"Dicyclohexylcarbodiimide (DCC)",
				"Trifluoroacetic acid (TFA)",
				"Boron trifluoride etherate (BF3•Et2O)",
				"Tetrabutylammonium fluoride (TBAF)",
				"Osmium tetroxide (OsO4)",
				"Palladium on carbon (Pd/C)",
				"Raney nickel",
			],
			"Analytical Reagents": [
				"Ninhydrin",
				"Phenolphthalein",
				"Methyl orange",
				"Bromothymol blue",
				"Alizarin",
				"Murexide",
				"Dithizone",
				"Cupferron",
				"Dimethylglyoxime",
				"1,10-Phenanthroline",
			],
			"Staining Reagents": [
				"Crystal violet",
				"Safranin",
				"Methylene blue",
				"Gram's iodine",
				"Carbol fuchsin",
				"Malachite green",
				"Giemsa stain",
				"Eosin",
				"Hematoxylin",
				"Toluidine blue",
			],
			"Biochemical Reagents": [
				"Bradford reagent",
				"Lowry reagent",
				"Bicinchoninic acid (BCA) reagent",
				"Drabkin's reagent",
				"Folin-Ciocalteu reagent",
				"Dithiothreitol (DTT)",
				"Iodoacetamide",
				"Phenylmethylsulfonyl fluoride (PMSF)",
				"Protease inhibitor cocktail",
				"Phosphatase inhibitor cocktail",
			],
			"Masks": [
				"N95 Respirators",
				"KN95 Masks",
				"Surgical Masks",
				"Cloth Masks",
				"Clear Masks",
				"Face Shields",
				"Respirators with Exhalation Valves",
				"Paediatric Masks",
				"Specialty Masks",
			],
			"Medical Gowns": [
				"Patient Gowns",
				"Surgical Gowns",
				"Isolation Gowns",
				"Surgical Isolation Gowns",
				"Non-Surgical Medical Gowns",
				"Procedural Gowns",
				"IV Patient Gowns",
				"Paediatric Gowns",
				"Bariatric Gowns",
				"Reusable Gowns",
				"Disposable Gowns",
				"Medical Exam Gowns",
			],
			"Eye protection": [
				"1. Safety Glasses",
				"2. Safety Goggles",
				"3. Face Shields",
				"4. Welding Helmets",
				"5. Radiation Protective Eyewear",
				"6. Chemical Splash Goggles",
				"7. Direct Ventilation Goggles",
				"8. Indirect Ventilation Goggles",
				"9. Overspecs (Goggles for Glasses)",
				"10. Prescription Safety Glasses",
			],
			"COVID-19 Test Kits": [
				"oPCR-based Test Kits",
				"oAntigen Test Kits",
				"oAntibody Test Kits",
			],
			"HIV Test Kits": [
				"oRapid Diagnostic Tests",
				"oEIA/ELISA Tests",
				"oConfirmatory Tests",
			],
			"Malaria Test Kits": [
				"oRapid Diagnostic Tests",
				"oMicroscopy Tests",
			],
			"Hepatitis Test Kits": [
				"oHepatitis B Tests",
				"oHepatitis C Tests",
			],
			"Dengue Test Kits": [
				"oNS1 Antigen Tests",
				"oIgM/IgG Antibody Tests",
			],
			"Pregnancy Test Kits": [
				"oUrine HCG Tests",
				"oBlood HCG Tests",
			],
			"Syphilis Test Kits": [
				"oRapid Diagnostic Tests",
				"oTreponemal Tests",
				"oNon-Treponemal Tests",
			],
			"Cholera Test Kits": [
				"oRapid Diagnostic Tests",
				"oCulture Tests",
			],
			"Tuberculosis Test Kits": [
				"oSmear Microscopy Tests",
				"oRapid Molecular Tests",
				"oCulture-based Tests",
			],
			"Blood Transfusion Kits": [
				"Blood Grouping Kits",
				"Antibody Screening Kits",
				"Antigen Typing Kits",
				"Compatibility Testing Kits",
			],
			"Urine Analysis Kits": [
				"Urine Dipstick Tests",
				"Urine Microscopy Kits",
				"Urine Culture Kits",
			],
			"Stool Analysis Kits": [
				"Faecal Occult Blood Tests",
				"Ova and Parasite Tests",
				"Stool Culture Kits",
			],
			"Other Diagnostic Test Kits": [
				"Allergy Test Kits",
				"Drug of Abuse Test Kits",
				"Therapeutic Drug Monitoring Kits",
				"Tumour Marker Test Kits",
			],
			"ECG Electrodes": [
				"Disposable Adhesive Electrodes",
				"Suction Electrodes",
				"Clip Electrodes",
				"Pre-gelled Electrodes",
				"Paediatric Electrodes",
				"Long-term Monitoring Electrodes",
				"Laminated Electrodes",
				"Silver/Silver Chloride Electrodes",
				"Hydrogel Electrodes",
				"Foam Backed Electrodes",
			],
			"ECG Paper": [
				"1. Standard ECG Paper",
				"2. Pre-printed ECG Paper",
				"3. Thermal ECG Paper",
				"4. Multi-channel ECG Paper",
				"5. ECG Paper Rolls",
			],
			"Surgical Instruments": [
				"Scalpel",
				"Surgical Scissors",
				"Forceps",
				"Needle Holder",
				"Tissue Forceps",
				"Clamps",
				"Rongeur",
				"Retractor",
				"Trocar",
				"Electrocautery",
				"Surgical Drill",
				"Speculum",
				"Curette",
				"Clip Applier",
				"Stapler",
				"Bulldog Clamp",
				"Biopsy Punch",
				"Endoscope",
				"Cannula",
				"Grafting Knife",
				"Rib Spreader",
			],
			"Sterile Supplies": [
				"Sterile Adhesive Wound Dressings",
				"Sterile Absorbent Wound Dressings",
				"Sterile Bandages",
				"Sterile Gauze Swabs",
				"Sterile Wound Closure Strips",
				"Sterile Saline Wound Wash",
				"Sterile Burn Care Supplies",
				"Sterile Antiseptic Wipes",
				"Sterile Hypodermic Needles",
				"Sterile Syringes",
				"Sterile Cannulas",
				"Sterile Medical Scissors",
				"Sterile Tweezers",
				"Sterile IV Kits",
				"Sterile Medical Tubing",
				"Sterile Tourniquets",
				"Sterile Trauma Management Equipment",
				"Sterile Tongue Depressors",
				"Sterile Surgical Drapes",
				"Sterile Surgical Gowns",
			],
			"Alcohols": [
				"oEthyl alcohol",
				"oIsopropyl alcohol",
			],
			"Chlorine Compounds": [
				"oHousehold bleach (sodium hypochlorite)",
			],
			"Quaternary Ammonium Compounds (Quats)": [
				"oBenzalkonium chloride",
				"oCetylpyridinium chloride",
			],
			"Phenolics": [
				"oCarbolic acid",
				"oLysol",
			],
			"Aldehydes": [
				"oFormaldehyde",
				"oGlutaraldehyde",
			],
			"Iodophors": [
				"oPovidone-iodine",
			],
			"Peracetic Acid": [
				"oPeracetic acid solutions",
			],
			"Hydrogen Peroxide": [
				"o3% hydrogen peroxide (for surface disinfection)",
			],
			"Enzymatic Cleaners": [
				"oProteolytic enzyme-based disinfectants",
			],
			"Ozone": [
				"oOzone gas for water treatment and surface disinfection",
			],
			"Alcohol-based Hand Sanitizers": [
				"oContaining at least 60% alcohol",
			],
			"Quaternary Ammonium Sanitizers": [
				"oUsed for food contact surfaces",
			],
			"Chlorine-based Sanitizers": [
				"oUsed in food service and kitchen areas",
			],
			"Hydrogen Peroxide-based Sanitizers": [
				"oFor surface sanitization in food service",
			],
			"Acid-based Sanitizers": [
				"oSuch as phosphoric acid for food contact surfaces",
			],
			"Waste Disposal Bags": [
				"Biohazard Waste Bags",
				"Infectious Waste Bags",
				"Autoclavable Waste Bags",
				"Hazardous Waste Disposal Bags",
				"General Waste Disposal Bags",
				"Compostable Waste Bags",
				"Sharps Disposal Bags",
				"Pharmaceutical Waste Bags",
				"Regulated Medical Waste Bags",
				"Red Colour-coded Waste Bags (biohazard)",
				"Yellow Colour-coded Waste Bags (infectious waste)",
			],
			"Oxygen Supplies": [
				"Oxygen Concentrators",
				"Portable Oxygen Tanks",
				"Oxygen Cylinders",
				"Nasal Cannulas",
				"Simple Face Masks",
				"Non-Rebreather Masks",
				"Partial Rebreather Masks",
				"Oxygen Flow Meters",
				"Oxygen Tubing",
				"Humidifier Bottles",
				"Pulse Oximeters",
				"Oxygen Conserving Devices",
				"Oxygen Backpacks",
				"Oxygen Regulators",
				"Oxygen Canisters",
			],
			"Patient Furniture": [
				"Hospital beds",
				"Bedside tables",
				"Overbed tables",
				"Bedside commodes",
				"Wheelchairs",
				"Walkers",
				"Crutches",
				"Canes",
			],
			"Patient Hygiene Supplies": [
				"Disposable bed pads",
				"Disposable briefs/diapers",
				"Incontinence pads",
				"Underpads",
				"Disposable wipes",
				"Soap",
				"Shampoo",
				"Toothbrushes",
				"Toothpaste",
				"Denture cups",
				"Razors",
				"Shaving cream",
				"Deodorant",
				"Lotion",
				"Tissues",
			],
			"Patient Comfort Items": [
				"Pillows",
				"Blankets",
				"Robes",
				"Slippers",
				"Eyeglasses",
				"Hearing aids",
				"Dentures",
				"Prosthetics",
				"Mobility aids",
				"Call buttons",
				"TV remotes",
				"Reading materials",
			],
			"Patient Monitoring Supplies": [
				"Thermometers",
				"Blood pressure cuffs",
				"Pulse oximeters",
				"Cardiac monitors",
				"Infusion pumps",
				"Feeding pumps",
				"Drainage bags",
				"Catheters",
				"Wound care supplies",
			],
			"Patient Identification Items": [
				"Patient ID bracelets",
				"Name tags",
				"Room signs",
				"Whiteboard markers",
			],
			"Patient Education Materials": [
				"Pamphlets",
				"Handouts",
				"Videos",
				"Models",
				"Anatomical charts",
			]
		}

		let result = ''
		result += \`<option value="" >Select</option>\`
		Object.keys(list).forEach(ele => {
			list[ele].forEach(name => {
				result += \`<option value="\${ele}||\${name}" data-content="\${name} <span class='badge badge-success'>\${ele}</span>"></option>\`
			});
		});

		$('#name_category').html(result)
		$('#name_category').selectpicker('refresh')
		
	}

	function updateMedicationSource(value = null) {
		if (value == false) {
			$('#medicine_name_category').hide(500);
			$('#medicine_name').show(500);
			$('#medicine_category').show(500);

			$('#name_category').val('')
			$('#name_category').prop('required', false)
			$('#name_category').selectpicker('refresh')
			$('#name').prop('required', true)
			$('#medicine_category_id').prop('required', true)


		} else {
			$('#medicine_name_category').show(500);
			$('#medicine_name').hide(500);
			$('#medicine_category').hide(500);

			$('#name').val('')
			$('#medicine_category_id').val('')
			$('#name').prop('required', false)
			$('#medicine_category_id').prop('required', false)
			$('#name_category').prop('required', true)
			$('#medicine_category_id').selectpicker('refresh')
		}
	}
</script>

`;

export default function ElementElementInventoryAddConsumables() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
