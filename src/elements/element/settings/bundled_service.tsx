const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Bundled Services</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#bundled_service_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#bundled_service_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="bundled_service_add">

					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'BundledServices', 'action' => 'add']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Title
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="title" data-required="1" placeholder="Enter Title" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<textarea name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height"></textarea> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Price
								
							</label>
							<div class="col-md-5">
								<input name="price" id="price" data-required="0" placeholder="Enter price" class="form-control input-height" /> 
							</div>
						</div>
					
						<div class="form-group row" id="modifier_div">
							<label class="control-label col-md-4">Service
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
                                <div class="row mb-4">
                                    <div class="col-md-6" id="service_type_name">
                                        
                                    </div>
                                    <div class="col-md-6" id="service_type_options">
                                        
                                    </div>
                                </div>
								<span><a href="javascript:void(0);" class="add" onclick="addMoreServices()" id="add_more_button">Add Service</a></span><br>
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearHealthFacilityFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="bundled_service_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
                                        <th class="left">Date</th>
										<th class="left">Title</th>
										<th class="left">Description</th>
										<th class="left">Value</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
                                    <!-- php: foreach($bundled_services as $service){ -->
                                        <tr>
                                            <td><!-- php: = $service->date_added --></td>
                                            <td><!-- php: = $service->name --> <!-- php: = $service->status == 1 ? '<span class="badge badge-secondary">Disabled</span>' : '' --> </td>
                                            <td><!-- php: = $service->description --></td>
                                            <td><!-- php: = $service->price --></td>
                                            <td>
												<!-- php: = $service->status_id == 1 ? $this->Form->postLink(__('Disable'), ['controller'=>'BundledServices','action'=>'toggleService',$service->id], ['class' => 'btn btn-xs btn-secondary']) : $this->Form->postLink(__('Enable'), ['controller'=>'Bundl... -->
                                                <!-- <button class="btn btn-xs btn-secondary">Disable</button> -->
												
												<button class="btn btn-xs btn-warning" href="javascript:" data-toggle="modal" onclick="setEditModalValues('<!-- php: = $service->id -->','<!-- php: = $service->name -->','<!-- php: = $service->description -->','<!-- php: = $service->price -->',)" data-target="#edit_bundled_service">Edit</button>
                                            </td>
                                        </tr>
                                    <!-- php: } -->
														
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

<div class="modal fade" id="prescription_configuration" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 600px">
	<div class="modal-content">
		<div class="modal-header">
		<h4 class="modal-title" id="exampleModalLongTitle">Configure Prescription Details</h4>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		</div>
		<div class="modal-body">
		
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<div class="card card-box">

					<div class="card-body" id="bar-parent">
				

						<form class="form-body d-flex flex-column" action="#" method="POST" onsubmit="populatePrescriptionConfiguration()" id="prescription_configuration_form">
							
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Dosage Frequency
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
								<input type="hidden" name="" id="prescription_form_id"/>
									<SearchableSelectField class="form-control show-menu-arrow show-tick frequencySelect" name="drug_administration_frequency_id" data-required="1" data-live-search="true" data-size="5" title="Select Frequency" id="prescription_frequency" required>

									</SearchableSelectField>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Quantity
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" class="form-control input-height" name="quantity" required/>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Days
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_days" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Doses
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_doses" class="form-control input-height" required/>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Strength To Administer (eg. 500 MG)
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" step="0.1" name="dose" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Form (eg. 1 Tablet)
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" step="0.1" name="form" class="form-control input-height" required/>
								</div>
							</div>
							
							<div class="row mt-5">
								<div class="offset-md-3 col-md-8">
									<button type="submit" class="btn btn-info">Save</button>
									<button type="button" data-dismiss="modal" class="btn btn-default">Cancel</button>
								</div>
							</div>
						</form>

					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>
<div class="modal fade" id="infusion_configuration" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 600px">
	<div class="modal-content">
		<div class="modal-header">
		<h4 class="modal-title" id="exampleModalLongTitle">Configure Infusion Details</h4>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		</div>
		<div class="modal-body">
		
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<div class="card card-box">

					<div class="card-body" id="bar-parent">
				

						<form class="form-body d-flex flex-column" action="#" method="POST" id="infusion_configuration_form" onsubmit="populateInfusionConfiguration()">
							
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Dosage Frequency
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									<input type="hidden" name="" id="infusion_form_id"/>
									<SearchableSelectField class="form-control show-menu-arrow show-tick frequencySelect" name="drug_administration_frequency_id" data-required="1" data-live-search="true" data-size="5" title="Select Frequency" id="prescription_frequency" required>

									</SearchableSelectField>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Quantity
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" class="form-control input-height" name="quantity" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Days
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_days" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Doses
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_doses" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Volume
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="volume" class="form-control input-height" required/> 
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Rate
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="rate" class="form-control input-height" required/> 
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Duration
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="duration" class="form-control input-height" required/> 
								</div>
							</div>
							
							<div class="row mt-5">
								<div class="offset-md-3 col-md-8">
									<button type="submit" class="btn btn-info">Save</button>
									<button type="button" data-dismiss="modal" class="btn btn-default">Cancel</button>
								</div>
							</div>
						</form>

					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>
<div class="modal fade" id="edit_bundled_service" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 600px">
	<div class="modal-content">
		<div class="modal-header">
		<h4 class="modal-title" id="exampleModalLongTitle">Edit Bundled Service</h4>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		</div>
		<div class="modal-body">
		
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<div class="card card-box">

					<div class="card-body" id="bar-parent">
				

					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'BundledServices', 'action' => 'edit']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Title
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="hidden" id="editForm_id" name="id">
								<input type="text" name="name" id="edit_title" data-required="1" placeholder="Enter Title" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<textarea name="description" id="edit_description" data-required="0" placeholder="Enter description" class="form-control input-height"></textarea> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Price
								
							</label>
							<div class="col-md-5">
								<input name="price" id="edit_price" data-required="0" placeholder="Enter price" class="form-control input-height" /> 
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearHealthFacilityFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->

					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>


<script>
	let count = 0
	function clearHealthFacilityFields(){
		$('#name').val('');
		$('#description').val('');
	}

	function generateTypeSelect(count) {
		return \`
			<div>
				<SearchableSelectField data-live-search="true" name="name_[]" title="Select Service Type" id="service_type_select_\${count}" onchange="selectedServiceType('service_type_select_\${count}', '\${count}')" class="form-control input-height selectpicker" data-size="3">
					<!-- php: foreach ($itemTypes as $key => $type): if (in_array($type->id, ['9', '10', '2', '7', '3'])): -->
						<option value="<!-- php: = $type->id -->"><!-- php: = $type->name --></option>
					<!-- php: endif; endforeach -->
				</SearchableSelectField>
			</div>
		\`
	}
	function addMoreServices() {
		$("#service_type_name").append(generateTypeSelect(count))
		$("#service_type_options").append(\`<div id="div_\${count}"></div>\`)
		$(\`#service_type_select_\${count}\`).selectpicker("refresh");
		count++
	}
	function getInfusionDrugs(position) {
        $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getDrugInfusions']) -->",
			success: function g(data, textStatus) {
				result = ''

                if (Array.isArray(data) && data && data.length > 0 ) {
                    data?.forEach(drug => {
                        result += \`
                            <option 
                                value="\${ drug?.id }" 
                                data-content="">\${drug?.full_name}
							</option>
                        \`
                    });
                }

				$('#infusion_drug_stock_select_' + position).html(result)
				$("#infusion_drug_stock_select_" + position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
    }
	function getPrescriptionDrugs(position) {

        $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getPrescriptionItems']) -->",
			success: function g(data, textStatus) {
				let result = ''
                if (Array.isArray(data) && data && data.length > 0 ) {
                    data?.forEach(drug => {
                        let insurancePrice = []
						
                        result += \`
                            <option 
                                value="\${ drug?.id }" 
                                data-content="">\${drug?.full_name}
							</option>
                        \`
						// console.log("it came here", option_result)

                    });

                    $('#medication_drug_stock_select_' + position).html(result)
                    $("#medication_drug_stock_select_" + position).selectpicker("refresh");
                }
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
    }
    function populateLabTests(position) {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getLabTests']) -->",
			success: function g(data, textStatus) {
				let result = ''
				data.forEach(element => {
					result += \`
							<option value="\${element.id}" 
                                data-content="\${element.name} "
                            >
								\${element.name}
							</option>
						\`
				});
				$('#lab_test_id_'+position).html(result)
				$("#lab_test_id_"+position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
    function getRadioScans(position) {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getRadioScans']) -->",
			success: function g(data, textStatus) {
				let result = ''
				data.forEach(element => {
					result += \`
							<option value="\${element.id}" 
                                data-content="\${element.name} "
                            >
								\${element.name}
							</option>
						\`
				});
				$('#radio_scan_id_'+position).html(result)
				$("#radio_scan_id_"+position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

    function getProcedures(position) {
		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getAllProcedures']) -->\`,
			success: function g(data, textStatus) {
				let procedure_data = ''
				if(Array.isArray(data)) {
					data?.forEach(element => {
						procedure_data += (\`<option data-content="\${element.name}" value="\${element.id}" >\${element.name}</option>\`)
					});
				}
				$('#surgery_stock_select_'+position).html(procedure_data);
				$('#surgery_stock_select_'+position).selectpicker("refresh");

			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
    }

	function setModalValue(id, value) {
		$('#'+id).val(value)
	}

	function selectedServiceType(id, position) {
		if ($('#'+id).val() == '9') {
			let drugs = ''

			$(\`#div_\${position}\`).html(
				\`
				<div class="d-flex align-items-center" style="flex-wrap: no-wrap">
					<SearchableSelectField class="col-md-12 form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" data-size="5" title="Drug / Form / Dosage" name="item_id[]" id="medication_drug_stock_select_\${position}" data-live-search="true" required>
					</SearchableSelectField>
					<input type="hidden" name="configuration[]" id="prescription_configuration_\${position}">
					<a href="javascript:" data-toggle="modal" onclick="setModalValue('prescription_form_id','\${position}')" data-target="#prescription_configuration" class="ml-2">configure</a>
				</div>
				\`
			)
			getPrescriptionDrugs(position)

		}	
		else if ($('#'+id).val() == '10') {
			let drugs = ''

			$(\`#div_\${position}\`).html(
				\`
				<div class="d-flex align-items-center" style="flex-wrap: no-wrap">
					<SearchableSelectField class="col-md-12 form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" data-size="5" title="Drug / Form / Dosage" name="item_id[]" id="infusion_drug_stock_select_\${position}" data-live-search="true" required>
					</SearchableSelectField>
					<input type="hidden" name="configuration[]" id="infusion_configuration_\${position}">
					<a href="javascript:" data-toggle="modal" onclick="setModalValue('infusion_form_id','\${position}')" data-target="#infusion_configuration" class="ml-2">configure</a>
				</div>
				\`
			)
			getInfusionDrugs(position)

		}
		else if ($('#'+id).val() == '2') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" data-size="5" title="Lab Test" name="item_id[]" id="lab_test_id_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="lab_test_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				\`
			)
			populateLabTests(position)

		}
		else if ($('#'+id).val() == '7') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" data-size="5" title="Radiology Scan" name="item_id[]" id="radio_scan_id_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="radio_scan_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				\`
			)
			getRadioScans(position)

		}

		else if ($('#'+id).val() == '3') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" data-size="5" title="Select Surgery" name="item_id[]" id="surgery_stock_select_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="surgery_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				\`
			)
			getProcedures(position)

		} else {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<div class="form-control input-height " style="border:none">
				</div>
				\`
			)
		}
		
	}

	function setDrugAdminFrequencies(position) {
		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getDrugAdminFrequencies']) -->\`,
			success: function g(data, textStatus) {
				let result = []
				data = data.sort((a,b) => {
					try {
						return parseInt(a.id)-parseInt(b.id)
					} catch (error) {
						return 0
					}
				})
				data.forEach(drugAdminFreq => {
					if(drugAdminFreq.id == -1) {
						result.push(\`<option value="\${drugAdminFreq.id}" data-dose-per-day="\${drugAdminFreq.dose_per_day}" data-content="<span class='badge badge-danger ml-2'>STAT</span>"></option>\`)
					} else {
						result.push(\`<option value="\${drugAdminFreq.id}" data-dose-per-day="\${drugAdminFreq.dose_per_day}">\${drugAdminFreq.name}</option>\`)
					}
				});

				$('.frequencySelect').append(result.join(""));
				$('.frequencySelect').selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}
	$(document).ready(function () {
		setDrugAdminFrequencies()
	})

	
    function serializeFormToJson(form_id) {
      var formData = {};
      var formElements = document.getElementById(form_id).elements;
  
      for (var i = 0; i < formElements.length; i++) {
          var field = formElements[i];
          if(field.type == 'radio') {
            if(field.checked) {
              formData[field.name] = field.value;
            }
          } else {
            if (field.name) {
                formData[field.name] = field.value;
            }
          }
      }
  
      return formData
    }

	function populateInfusionConfiguration() {
		let config = serializeFormToJson('infusion_configuration_form')
		let position = $('#infusion_form_id').val()
		$('#infusion_configuration_' + position).val(JSON.stringify(config))
		return false
	}
	function populatePrescriptionConfiguration() {
		let config = serializeFormToJson('prescription_configuration_form')
		let position = $('#prescription_form_id').val()
		$('#prescription_configuration_' + position).val(JSON.stringify(config))
		return false
	}

	let prescription_config_form = document.getElementById('prescription_configuration_form');
    prescription_config_form.addEventListener('submit', function(event) {
      event.preventDefault();
		$('#prescription_configuration').modal('toggle')
	  populatePrescriptionConfiguration()
	})

	let infusion_config_form = document.getElementById('infusion_configuration_form');
    infusion_config_form.addEventListener('submit', function(event) {
      event.preventDefault();
		$('#infusion_configuration').modal('toggle')
	  populatePrescriptionConfiguration()
	})

	function setEditModalValues(editForm_id,edit_title,edit_description,edit_price) {
		$('#editForm_id').val(editForm_id)
		$('#edit_title').val(edit_title)
		$('#edit_description').val(edit_description)
		$('#edit_price').val(edit_price)
	}

	$('#add_more_button').on('click', function() {
		count ++
		var str = "" + count;
		var pad = "000";
		var ans = pad.substring(0, pad.length - str.length) + str;
		var val = $('#dept_id').find(':selected').data("code");
		$('<div id="price_'+ count +'"><input type="text" name="code[]" id="modifier_price" value="'+val.toUpperCase()+'/'+ans+'"  placeholder="Code" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ count +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#modifier_price_div");
		// $('<div id="code_'+ count +'"><br></div>').appendTo("#modifier_code_div")
	});
</script>

`;

export default function ElementElementSettingsBundledService() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
