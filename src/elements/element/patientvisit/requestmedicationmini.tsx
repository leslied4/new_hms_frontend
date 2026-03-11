const rawHtml = `
<style>

	.has-error .bootstrap-select .btn {
		border-color: #f00;
	}

	.has-success .bootstrap-select .btn {
		border-color: #0f0;
	}

	button.btn.dropdown-toggle.btn-light {
		height: 35px;
	}
</style>

<div class="modal fade" id="viewMedicationDialog" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="viewMedicationTitle"><!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --> Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            
            </div>
        </div>
    </div>
</div>

<!-- php: if($isCurrentVisit) { -->
<!-- php: = $this->Form->create(null, ['id' => 'medicationForm', 'url' => ['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id], 'id' => 'medicationForm']); -->
<legend><h4><u>Medication / Prescription</u></h4></legend>	
<div class="form-body">
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">
                <label class="control-label col-md-4">Internal Pharmacy
                    <span class="required"> * </span>
                </label>
                <div class="col-md-2">
                    <label class="switchToggle">
                        <input type="checkbox" checked="checked" name="in_house_medication_status" onclick="updateMedicationType(this.checked);" >
                        <span class="slider green round"></span>
                    </label>
                </div>
            </div>
            <div class="form-group row" id="stock_drugs">
                <label class="control-label col-md-4">Internal Drugs
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#drug_stock_id');" data-size="10" title="Drug / Form / Dosage" name="drug_stock_id" id="drug_stock_id" data-live-search="true" required >
                        <!-- option value="">Select...</option -->
                        <!-- php: foreach($drugStocks as $drugStock) { -->
                                <option value="<!-- php: = $drugStock->id -->" data-content="<span style='margin-bottom: 5px;' class='badge badge-<!-- php: = in_array($drugStock->stock_basket_id, [1, null]) ? 'warning' : 'secondary' -->'><i class='fa fa-<!-- php: = in_array($drugStock->stock_basket_id, [1, null]) ? 'building' : 'shopping-basket' -->'></i></span> <!-- php: = h($drugStock->has('drug') ? $drugStock->drug->full_name : '') --><br/><span style='magin-bottom: 5px;'><span style='font-weight: 700;'> Price:</span> <span>GHS<!-- php: = $this->Number->precision($drugStock->unit_selling_price, 2) --></span>&nbsp;&nbsp;&nbsp; <span style='font-weight: 700;'>Qty: </span><span><!-- php: = $drugStock->quantity_left --></span>&nbsp;&nbsp;&nbsp; <span style='font-weight: 700;'>Unit: </span><span><!-- php: = $drugStock->has('drug') && $drugStock->drug->has('unit_type') ? $drugStock->drug->unit_type->type_name : 'N/A' --></span><br/><span class='badge badge-primary '>Batch: <!-- php: = $drugStock->batch_number --></span> <span class='badge badge-danger '>Expiry: <!-- php: = $drugStock->expiry_date != null ? $drugStock->expiry_date->format('Y-m-d') : 'N/A' --></span><hr style='margin-top: 10px; margin-bottom: 0px;'/>"><!-- php: = h($drugStock->has('drug') ? $drugStock->drug->full_name : '') --></option>
                            <!-- php: } -->
                    </SearchableSelectField>
                </div>
            </div>
            <div class="form-group row" id="all_drugs" style="display: none">
                <label class="control-label col-md-4">All Drugs
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#drug_id');" data-size="10" title="Drug / Form / Dosage" name="drug_id" id="drug_id" data-live-search="true">
                        <!-- option value="">Select...</option -->
                        <!-- php: foreach($availableDrugs as $drug) { -->
                                <option value="<!-- php: = $drug->id -->" data-content="<!-- php: = h($drug->full_name) -->"><!-- php: = h($drug->full_name) --></option>
                            <!-- php: } -->
                    </SearchableSelectField>
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-md-4">Dosage Frequency
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <input type="text" name="frequency" id="frequency" data-required="1" placeholder="" class="form-control input-height" /> </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-md-4">Number of Days
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <input type="number" min="1" step="1" name="number_of_days" id="number_of_days" data-required="1" placeholder="" class="form-control input-height" /> </div>
                    <input type="hidden" name="quantity" id="quantity" value="1" data-required="1" class="form-control input-height" /> 
                    <input type="hidden" name="repeat_prescription" id="repeat_prescription" value="0" class="form-control input-height" /> 
            </div>
            <div class="form-group row">
                <label class="control-label col-md-4">Medication Type
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="medication_type_id" id="medication_type_id" >
                        <option value="">Select...</option>
                        <!-- php: foreach($medicationTypes as $key => $medicationType) { -->
                                <option value="<!-- php: = $key -->"><!-- php: = h($medicationType) --></option>
                            <!-- php: } -->
                    </SearchableSelectField>
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-md-4">Route Of Administration
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#dosage_form_id');" data-size="5" data-required="1" data-live-search="true" class="form-control input-height" name="dosage_form_id" id="dosage_form_id" required>
                        <option value="">Select Administration Route</option>
                            <!-- php: foreach($dosageForms as $key => $dosageForm) { -->
                                <option value="<!-- php: = $key -->"><!-- php: = h($dosageForm) --></option>
                            <!-- php: } -->
                    </SearchableSelectField>
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-md-4">Charge Bill To
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#bill_to_id');" data-required="1" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required >
                        <option value="">Select Bill To</option>
                        <option <!-- php: = $billTo == -1 ? 'selected' : '' --> value="-1">Patient</option>
                        <!-- php: foreach($providers as $provider) { -->
                                <option <!-- php: = $billTo == $provider->id ? 'selected' : '' --> value="<!-- php: = $provider->id -->" data-content="<!-- php: = $provider->insurance_profile->name --><span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile->insurance_profile_type->name : '' --></span>"></option>
                            <!-- php: } -->
                    </SearchableSelectField>
                </div>
            </div>
        </div>
    </div>
    
    <input type="hidden" id="hidden" name="request_type" value="new_request_medication">
    <div class="row">
        <div class="offset-md-4 col-md-7">
            <button id="submitMedication" class="btn btn-info">Save Medication</button>
        </div>
    </div>
</div>
<!-- php: =$this->Form->end(); -->
<!-- php: } -->


<script>
	"use strict";
	var FormValidation = function () {

		// basic validation
		var handleValidationMedication = function() {
			
			var form1 = $('#medicationForm');
			
			form1.validate({
				errorElement: 'span', //default input error message container
				errorClass: 'help-block help-block-error', // default input error message class
				focusInvalid: false, // do not focus the last invalid input
				ignore: "",  // validate all fields including form hidden input
				messages: {
					select_multi: {
						maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
						minlength: jQuery.validator.format("At least {0} items must be selected")
					}
				},
				rules: {
					frequency: {
						required: true
					},
					number_of_days: {
						required: true
					},
					quantity: {
						required: true,
						digits: true
					},
					dosage_form_id: {
						required: true
					},
					repeat_prescription: {
						required: true
					},
					bill_to_id: {
						required: true
					},

				},

				invalidHandler: function (event, validator) { //display error alert on form submit              
					$([document.documentElement, document.body]).animate({
						scrollTop: $("#medicationForm").offset().top
					}, 100);$([document.documentElement, document.body]).animate({
						scrollTop: $("#medicationForm").offset().top
					}, 100);
				},

				errorPlacement: function (error, element) { // render error placement for each input type
					var cont = $(element).parent('.form-group');
					if (cont) {
						cont.after(error);
					} else {
						element.after(error);
					}
				},

				highlight: function (element) { // hightlight error inputs
					$(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
				},

				unhighlight: function (element) { // revert the change done by hightlight
					$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set error class to the control group
				},

				success: function (label) {
					label.closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
				},

				submitHandler: function (form) {
					$("#submitMedication").html('Processing');
					$("#submitMedication").attr('disabled','disabled');
					$("#resetMedication").attr('disabled','disabled');

					var medicationData = $("#medicationForm").serialize();
					$.ajax({
						type: "POST",
						url: '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id, ]) -->',
						datatype: 'json',
						data: medicationData,
						success: function g(data, textStatus) {
							setTimeout(function(){
								//$('#medications_table').DataTable().ajax.reload(null, false);
								$('#medications_table').DataTable().draw();
							}, 200);
							clearMedications();
							alertify.success('Medication added successfully');

							$("#submitMedication").html('Submit');
							$("#submitMedication").removeAttr('disabled');
							$("#resetMedication").removeAttr('disabled');

						},
						fail: function g(xhr, textStatus, errorThrown) {
							$("#submitMedication").html('Submit');
							$("#submitMedication").removeAttr('disabled');
							$("#resetMedication").removeAttr('disabled');
						}
					});
				}
			});
		}

		return {
			//main function to initiate the module
			init: function () {
				handleValidationMedication();
			}

		};

	}();

	jQuery(document).ready(function() {
		'use strict';
		FormValidation.init();
	});
</script>

<script>
	
	function clearMedications() {
		$('#drug_stock_id').val('');
		$('#drug_stock_id').selectpicker('refresh');
		$('#drug_id').val('');
		$('#drug_id').selectpicker('refresh');
		$('#frequency').val('');
		$('#number_of_days').val('');
		$('#dosage_form_id').val('');
		$('#dosage_form_id').selectpicker('refresh');
		$('#medication_type_id').val('');
		$('#medication_type_id').selectpicker('refresh');
	}

	$(function () {
		$("#submitMedicationa").click(function () {
			alert('form clicked');
			$('#medicationFrom').validate({
				rules: {
				  frequency: "required"
				},
				messages: {
				  frequency: "Please enter dosage form"
				},
				submitHandler: function (form) { // for demo
				  alert('valid form');
				  return false;
				}
			  });
			/*
			$("#medicationForm").validate({
				submitHandler: function(form) {
					alert('Validated Successfully');
				}
			});
			*/
			
			$("#submitMedication").html('Processing');
			$("#submitMedication").attr('disabled','disabled');
			$("#resetMedication").attr('disabled','disabled');

			var medicationData = $("#medicationForm").serialize();
			$.ajax({
				type: "POST",
				url: '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id, ]) -->',
				datatype: 'json',
				data: medicationData,
				success: function g(data, textStatus) {
					setTimeout(function(){
						$('#medications_table').DataTable().ajax.reload(null, false);
					}, 200);
					clearMedications();
					alertify.success('Medication added successfully');

					$("#submitMedication").html('Submit');
					$("#submitMedication").removeAttr('disabled');
					$("#resetMedication").removeAttr('disabled');
				},
				fail: function g(xhr, textStatus, errorThrown) {
					$("#submitMedication").html('Submit');
					$("#submitMedication").removeAttr('disabled');
					$("#resetMedication").removeAttr('disabled');
				}
			});
		});
	});
</script>
					
<script>
	function moveToId(id = null) {
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#" + id).offset().top
		}, 500);
	}

	function updateMedicationType(value = null) {
		if(value == false) {
			$('#all_drugs').show(500);
			$('#stock_drugs').hide(500);
			document.getElementById("drug_id").required = true;
			document.getElementById("drug_stock_id").required = false;
		}
		else {
			$('#all_drugs').hide(500);
			$('#stock_drugs').show(500);
			document.getElementById("drug_id").required = false;
			document.getElementById("drug_stock_id").required = true;
		}
	}

	function updateRefillDate(value = null) {
		if(value == 1) {
			$('#refill_date_row').show(500);
			document.getElementById("refill_date").required = true;
		}
		else {
			$('#refill_date_row').hide(500);
			document.getElementById("refill_date").required = false;
		}

		$("#medicationForm").validate().element("#repeat_prescription");
	}

	function loadMedicationDetails(id = null) {
		$('.modal-body').load("<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewMedication']) -->?id=" + id,function(){
			$('#viewMedicationDialog').modal({show:true});
		});
	}

</script>

<script type="text/javascript">
	$(document).ready(function() {
		var myDoseResultMain = $.parseJSON('<!-- php: echo $dosageAutocompleteList; -->');
		
		$('#frequency').autocomplete({
				source: myDoseResultMain[0]
		});
	});
</script>
`;

export default function ElementElementPatientvisitRequestmedicationmini() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
