const rawHtml = `
<style>
.progress-bar-div-center {
  margin: auto;
  width: 50%;
  padding: 10px;
  padding-right: 200px;
}

.multi-step-card {
    z-index: 0;
    border: none;
    border-radius: 0.5rem;
    position: relative
}

#progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey
}

#progressbar .active {
    color: #000000
}

#progressbar li {
    list-style-type: none;
    font-size: 12px;
    width: 25%;
    float: left;
    position: relative
}

#progressbar #account:before {
    font-family: FontAwesome;
    content: "\f251"
}

#progressbar #personal:before {
    font-family: FontAwesome;
    content: "\f252"
}

#progressbar #payment:before {
    font-family: FontAwesome;
    content: "\f253"
}

#progressbar #confirm:before {
    font-family: FontAwesome;
    content: "\f254"
}

#progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 18px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px
}

#progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: lightgray;
    position: absolute;
    left: 0;
    top: 25px;
    z-index: -1
}

#progressbar li.active:before,
#progressbar li.active:after {
    background: #2CA8FF
}

.progresss {
  width: 150px;
  height: 150px;
  background: none;
  position: relative;
}

.progresss::after {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 6px solid #eee;
  position: absolute;
  top: 0;
  left: 0;
}

.progresss>span {
  width: 50%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 1;
}

.progresss .progress-left {
  left: 0;
}

.progresss .progress-bar {
  width: 100%;
  height: 100%;
  background: none;
  border-width: 6px;
  border-style: solid;
  position: absolute;
  top: 0;
}

.progresss .progress-left .progress-bar {
  left: 100%;
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
  border-left: 0;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}

.progresss .progress-right {
  right: 0;
}

.progresss .progress-right .progress-bar {
  left: -100%;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
  border-right: 0;
  -webkit-transform-origin: center right;
  transform-origin: center right;
}

.progresss .progress-value {
  position: absolute;
  top: 0;
  left: 0;
}

.rounded-lg {
  border-radius: 1rem;
}

.text-gray {
  color: #aaa;
}

div.h4 {
  line-height: 1rem;
}
</style>
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Service Stocks</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#servicestocks_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#servicestocks_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="servicestocks_add">
					<h4>Add a new Service Stock</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'addServiceStock']]); -->						
						<div class="container-fluid">
							<div class="row mt-0">
								<div class="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
									<div class="card px-0 pt-4 pb-0 mt-3 mb-3 multi-step-card" style="height:630px;">
										<!-- <h2><strong>Add New Service Stock</strong></h2> -->
										<p>Fill all form field to go to next step</p>
										<div class="row">
											<div class="col-md-12 mx-0">
												<!-- progressbar -->
												<ul id="progressbar">
													<li class="active one" id="account"><strong>Step 1</strong></li>
													<li class="two" id="personal"><strong>Step 2</strong></li>
													<li class="three" id="payment"><strong>Step 3</strong></li>
													<li class="four" id="confirm"><strong>Step 4</strong></li>
												</ul> <!-- fieldsets -->
												<fieldset id="step_one">
													<div class="form-group row">
														<label class="control-label col-md-4">Procedure Name
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="text" name="procedure_name" id="procedure_name" data-required="1" placeholder="Enter procedure name" class="form-control input-height" /> 
														</div>
													</div>
										
													<div class="form-group row">
														<label class="control-label col-md-4">Procedure Code
														</label>
														<div class="col-md-5">
															<input type="text" name="procedure_code" id="procedure_code" placeholder="Enter procedure code" class="form-control input-height" /> 
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Service 
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="service_id" id="service_id">
																<option value="">Select...</option>
																
																<!-- php: foreach($services as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-service-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Service Type
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="service_type_id" id="service_type_id" >
																<option value="">Select...</option>	
															</SearchableSelectField>
														</div>
													</div>
													
													<div class="form-group row">
														<label class="control-label col-md-4">Modifiers (Code / Price)
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height selectpicker" name="modifier_id[]" id="modifier_id" data-size="5" data-live-search="true" multiple>
																<option value="">Select...</option>		
															</SearchableSelectField>
														</div>
													</div>
													
													<div class="form-group row">
														<label class="control-label col-md-4">Max Unit
														</label>
														<div class="col-md-5">
															<input type="number" name="max_unit" id="max_unit" placeholder="Enter max unit" class="form-control input-height" /> 
														</div>
													</div>
											
													<!-- <div class="form-group row">
														<label class="control-label col-md-4">Facility Price
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="number" name="facility_price" id="facility_price" data-required="1" placeholder="Enter price" class="form-control input-height" required /> 
														</div>
													</div> -->

													<div class="form-group row">
														<label class="control-label col-md-4">Actions
															<span class="required"> </span>
														</label>
														<div class="col-md-5">
															<button type="button" class="btn btn-info next-one">Next</button>
														</div>
													</div>
												</fieldset>
												<fieldset id="step_two" hidden>
													<div class="form-group row">
														<label class="control-label col-md-4">Copay Status
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="copay" id="copay">
																<option value="">Select...</option>
																<option value="1" data-copay="Enable">Enable</option>
																<option value="0" data-copay="Disable">Disable</option>
															</SearchableSelectField>									
														</div>
													</div>
													
													<div class="form-group row">
														<label class="control-label col-md-4">Outsourced
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="outsourced" id="outsourced">
																<option value="">Select...</option>
																<option value="1" data-outsourced="Yes">Yes</option>
																<option value="0" data-outsourced="No">No</option>
															</SearchableSelectField>									
														</div>
													</div>
												
													<div class="form-group row">
														<label class="control-label col-md-4">MDC (Clinic / Specialty)
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="specialty_id" id="specialty_id">
																<option value="">Select...</option>
																
																<!-- php: foreach($specialties as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-specialty-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Treatment Room
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="treatment_room_id" id="treatment_room_id">
																<option value="">Select...</option>
																
																<!-- php: foreach($treatmentRooms as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-treatment-room-name="<!-- php: = $selectOption->name -->" data-treatment-room-price="<!-- php: = $selectOption->price -->"><!-- php: = $selectOption->name --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Items
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height selectpicker" name="item_stock_id[]" id="item_id" data-size="5" data-live-search="true" multiple>
																<option value="">Select...</option>
																
																<!-- php: foreach($items as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-item-name="<!-- php: = $selectOption->item->name -->" data-item-price="<!-- php: = $selectOption->unit_selling_price -->"><!-- php: = $selectOption->item->name --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Anaesthasia Request
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="anaesthasia" id="anaesthasia">
																<option value="">Select...</option>
																
																<!-- php: foreach($services as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>
		
													<div class="form-group row">
														<label class="control-label col-md-4">Actions
															<span class="required"> </span>
														</label>
														<div class="col-md-5">
															<button type="button" class="btn btn-info next-two">Next</button>
															<button type="button" class="btn btn-default previous-one">Previous</button>
														</div>
													</div>
												</fieldset>
												<fieldset id="step_three" hidden>
													<div class="form-group row">
														<label class="control-label col-md-4">Investigation
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="investigation_id" id="investigation_id">
																<option value="">Select...</option>
																
																<!-- php: foreach($investigations as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-investigation-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>
													
													<div class="form-group row">
														<label class="control-label col-md-4">Diagnosis(es)
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height selectpicker" name="diagnosis_id" id="diagnosis_id" data-size="5" data-live-search="true">
																<option value="">Select...</option>
																
																<!-- php: foreach($diagnoses as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Gender Specification
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="gender_spec_id" id="gender_spec_id" required>
																<option value="">Select...</option>
																
																<!-- php: foreach($genderSpecifications as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-gender-name="<!-- php: = $selectOption->gender -->"><!-- php: = $selectOption->gender --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Age Specification
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="age_spec_id" id="age_spec_id" required>
																<option value="">Select...</option>
																
																<!-- php: foreach($ageSpecifications as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-age-name="<!-- php: = $selectOption->age -->"><!-- php: = $selectOption->age --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Weight Specification
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="weight_spec_id" id="weight_spec_id" required>
																<option value="">Select...</option>
																
																<!-- php: foreach($weightSpecifications as $selectOption) { -->
																	<option value="<!-- php: = $selectOption->id -->" data-weight-name="<!-- php: = $selectOption->weight -->"><!-- php: = $selectOption->weight --></option>
																<!-- php: } -->
																
															</SearchableSelectField>
														</div>
													</div>

													<div class="form-group row">
														<label class="control-label col-md-4">Actions
															<span class="required"> </span>
														</label>
														<div class="col-md-5">
															<button type="button" class="btn btn-info next-three">Next</button>
															<button type="button" class="btn btn-default previous-two">Previous</button>
														</div>
													</div>
													
												</fieldset>
												<fieldset id="step_four"hidden>
													<div class="form-card">
														<h4 class="fs-title text-center">Price Breakdown</h4>
														<div class="row justify-content-center">
															<label class="control-label details-label">Modifiers Cost: <label id="modifier_totals_label"></label></label><br>
														</div>
														<div class="row justify-content-center">
															<label class="control-label details-label">Treatment Room Cost: <label id="room_totals_label"></label></label><br>
														</div>
														<div class="row justify-content-center">
															<label class="control-label details-label">Items: <label id="items_totals_label"></label></label><br>
														</div>
														<div class="row justify-content-center">
															<label class="control-label details-label"><b>Total:</b>GHS<label id="overall_totals_label"></label></label><br>
														</div>
														<div class="row justify-content-center">
															<div class="col-7 text-center">
																<h5>Kindly hit submit button to Proceed.<br><br>
																<button type="submit" class="btn btn-info">Submit</button>
																<button type="button" class="btn btn-default previous-three">Previous</button>
															</div>
														</div>
													</div>
												</fieldset>
											</div>
										</div>
									</div>
								</div>
								<div class="col-11 col-sm-9 col-md-7 col-lg-6 p-0 mt-3 mb-2 pl-2">
									<div class="card px-0 pt-4 pb-0 mt-3 mb-3 pb-3" style="height:630px;">
										<div class="pt-30 row pl-4">
											<div class="col-md-6" style="padding-left:60px;">
												<label class="control-label details-label">Procedure Name: <label id="procedure_name_label"></label></label><br>
												<label class="control-label details-label">Procedure Code: <label id="procedure_code_label"></label></label><br>
												<label class="control-label details-label">Service: <label id="service_name_label"></label></label><br>
												<label class="control-label details-label">Service Type: <label id="service_type_name_label"></label></label><br>
												<label class="control-label details-label">Service Modifiers: <label id="service_type_modifiers_label"></label></label><br>
												<label class="control-label details-label">Max Unit: <label id="maxunit_name_label"></label></label><br>
												<label class="control-label details-label">Copay Status: <label id="copay_name_label"></label><br>
												<label class="control-label details-label">Outsourced: <label id="outsourced_name_label"></label><br>
												<label class="control-label details-label">MDC: <label id="specialty_name_label"></label><br>
												<label class="control-label details-label">Treatment Room: <label id="room_name_label"></label><br>
												<label class="control-label details-label">Items: <label id="item_name_label"></label><br>
												<label class="control-label details-label">Anaethsasia Request: </label><br>
												<label class="control-label details-label">Investigation: <label id="investigation_name_label"></label><br>
												<label class="control-label details-label">Diagnosis(es): </label><br>
												<label class="control-label details-label">Age Specification: <label id="age_name_label"></label></label><br>
												<label class="control-label details-label">Weight Specification: <label id="weight_name_label"></label></label><br>
												<label class="control-label details-label">Gender Specification: <label id="gender_name_label"></label></label>
											</div >
											<div class="col-md-6 progress-bar-div-center">
												<div id="progress_track" class="progresss mx-auto" data-value=''>
													<span class="progress-left">
														<span class="progress-bar border-primary"></span>
													</span>
													<span class="progress-right">
														<span class="progress-bar border-primary"></span>
													</span>
													<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
														<div class="h2 font-weight-bold progress-center"></div><sup class="small">%</sup>
													</div>
												</div>	
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
				</div>
				<div class="tab-pane active" id="servicestocks_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Service</th>
										<th class="left">Procedure Name</th>
										<th class="left">Procedure Code</th>
										<th class="left">Facility Price</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($serviceStocks as $value): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->procedure_name --></td>
										<td class="left"><!-- php: = $value->service->name --></td>
										<td class="left"><!-- php: = $value->procedure_name --></td>
										<td class="left"><!-- php: = $value->procedure_code --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->facility_price, 2) --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editServiceStock_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageServices','action'=>'deleteServiceStock',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes... -->
											<a data-toggle="modal" data-target="#viewServiceStockDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-info btn-xs">
												View
											</a>
										</td>
									</tr>

									<div class="modal fade" id="viewServiceStockDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 1500;">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title">Service Stock: <!-- php: = $value->procedure_name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Service Stock Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageServices', 'action' => 'editServiceStock', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">

																	<div class="row">
																		<div class="col-md-6">															
																			<div class="form-group row">
																				<label class="control-label col-md-5">Procedure Name
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="procedure_name" value="<!-- php: = $value->procedure_name -->" placeholder="Enter procedure name" class="form-control input-height" required readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Procedure Code
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="procedure_code" value="<!-- php: = $value->procedure_code -->" placeholder="Enter procedure code" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Service Category
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="procedure_code" value="<!-- php: = $value->has('service') ? $value->service->name : '' -->" placeholder="Enter procedure code" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Service Type (Name/Price)
																				</label>
																				<div class="col-md-7">
																					<div class="row">
																						<div  class="col-md-7">
																							<input type="text" name="modifier" value="<!-- php: = $value->has('service') ? $value->service->service_types[0]->name : '' -->" placeholder="Price" class="form-control input-height" readonly/> 
																						</div>
																						<div  class="col-md-5">
																							<input type="text" name="modifier" value="<!-- php: = $value->has('service') ? $value->service->service_types[0]->price : '' -->" placeholder="Price" class="form-control input-height" readonly/> 
																							<!-- php: $serviceTypePrice = $value->has('service') ? $value->service->service_types[0]->price : 0; -->
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Max Unit
																				</label>
																				<div class="col-md-7">
																					<input type="number" name="max_unit" value="<!-- php: = $value->max_unit -->" placeholder="Enter max unit" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Copay Status
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<!-- php: if($value->copay == 1) { $copayStatus = "Enabled"; } -->
																					<!-- php: if($value->copay == 0) { $copayStatus = "Disabled"; } -->
																					<input type="text" name="procedure_name" value="<!-- php: = $copayStatus -->" placeholder="Enter procedure name" class="form-control input-height" required readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Outsourced
																				</label>
																				<div class="col-md-7">
																					<!-- php: if($value->outsourced == 1) { $outsource = "Yes"; } -->
																					<!-- php: if($value->outsourced == 0) { $outsource = "No"; } -->
																					<input type="text" name="procedure_code" value="<!-- php: = $outsource -->" placeholder="Enter procedure code" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">MDC(Specialty/Clinic)
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="modifier" value="<!-- php: = $value->has('specialty') ? $value->specialty->name : '' -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																				</div>
																			</div>	
																			<!-- php: $x = 1; $stockModifierPrice = 0; foreach ($value->service_stock_modifiers as $stockmodifier): $stockModifierPrice += $stockmodifier->service_type_modifier->price; -->
																			<div class="form-group row">
																				<label class="control-label col-md-5">Modifier( Name/Price )
																				</label>
																				<div class="col-md-7">
																					<div  class="row">
																						<div  class="col-md-7">
																							<input type="text" name="modifier" value="<!-- php: = $stockmodifier->service_type_modifier->name -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																						</div>
																						<div  class="col-md-5">
																							<input type="text" name="modifier" value="<!-- php: = $stockmodifier->service_type_modifier->price -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																						</div>
																					</div>
																				</div>
																			</div>
																			<!-- php: $x++; endforeach; -->
																		</div>
																		<div class="col-md-6">													
																			<div class="form-group row">
																				<label class="control-label col-md-5">Treatment Room (Name/Price)
																				</label>
																				<div class="col-md-7">
																					<div class="row">
																						<div  class="col-md-7">
																							<input type="text" name="modifier" value="<!-- php: = $value->has('treatment_room') ? $value->treatment_room->name : '' -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																						</div>
																						<div  class="col-md-5">
																							<input type="text" name="modifier" value="<!-- php: = $value->has('treatment_room') ? $value->treatment_room->price : '' -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																							<!-- php: $treatmentRoomPrice = $value->has('treatment_room') ? $value->treatment_room->price : 0 -->
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Investigation
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="value_new" data-required="1" value="<!-- php: = $value->has('investigation') ? $value->investigation->name : '' -->" placeholder="Enter price" class="form-control input-height" required readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Diagnoses
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="procedure_name" value="<!-- php: = $value->has('standard_diagnosis') ? $value->standard_diagnosis->name : '' -->" placeholder="Enter procedure name" class="form-control input-height" required readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Gender Specification
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="procedure_code" value="<!-- php: = $value->has('gender_specification') ? $value->gender_specification->gender : '' -->" placeholder="Enter procedure code" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Age Specification
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="modifier" value="<!-- php: = $value->has('age_specification') ? $value->age_specification->age : '' -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Weight Specification
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="max_unit" value="<!-- php: = $value->has('weight_specification') ? $value->weight_specification->weight : '' -->" placeholder="Enter max unit" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																			<!-- php: $x = 1; $stockItemPrice = 0; foreach ($value->service_stock_items as $stockItem): $stockItemPrice += $stockItem->item_stock->unit_selling_price -->
																			<div class="form-group row">
																				<label class="control-label col-md-5">Item (Name / Price)
																				</label>
																				<div class="col-md-7">
																					<div  class="row">
																						<div  class="col-md-7">
																							<input type="text" name="modifier" value="<!-- php: = $stockItem->item_stock->item->name -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																						</div>
																						<div  class="col-md-5">
																							<input type="text" name="modifier" value="<!-- php: = $stockItem->item_stock->unit_selling_price -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																						</div>
																					</div>
																				</div>
																			</div>
																			<!-- php: $x++; endforeach; -->
																			<div class="form-group row">
																				<label class="control-label col-md-5">Total Cost
																				</label>
																				<!-- php: $totalPrice = $serviceTypePrice + $stockModifierPrice + $treatmentRoomPrice + $stockItemPrice -->
																				<div class="col-md-7">
																					<input type="text" name="modifier" value="<!-- php: = $totalPrice -->" placeholder="Enter modifier" class="form-control input-height" readonly/> 
																				</div>
																			</div>	
																		</div>
																	</div>		
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
																		</div>
																	</div>
																</div>
															<!-- php: = $this->Form->end() -->
														</div>
													</div>
												</div>
											</div>
										  </div>
										</div>
									  </div>
									</div>
									
									<div class="modal fade" id="editServiceStock_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 1500;">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title">Edit Service Stock: <!-- php: = $value->procedure_name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Edit Stock Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageServices', 'action' => 'editServiceStock', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">

																	<div class="row">
																		<div class="col-md-6">															
																			<div class="form-group row">
																				<label class="control-label col-md-5">Procedure Name
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="procedure_name" value="<!-- php: = $value->procedure_name -->" placeholder="Enter procedure name" class="form-control input-height" required /> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Procedure Code
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="procedure_code" value="<!-- php: = $value->procedure_code -->" placeholder="Enter procedure code" class="form-control input-height" /> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Service Category
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="service_id" id="edit_service_id">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($services as $selectOption) { -->
																							<option <!-- php: = $value->service->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Service Type
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="service_type_id" id="edit_service_type_id" >
																						<option selected value="<!-- php: = $value->has('service') ? $value->service->service_types[0]->id : '' -->"><!-- php: = $value->has('service') ? $value->service->service_types[0]->name : '' --></option>	
																					</SearchableSelectField>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Modifiers (Code / Price)
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">	
																					<SearchableSelectField class="form-control input-height selectpicker" name="modifier_id[]" id="edit_modifier_id" data-size="5" data-live-search="true" multiple>
																						<option value="">Select...</option>
																						<!-- php: { -->
																							<option selected value="<!-- php: = $stockmodifier->service_type_modifier->id -->"><!-- php: = $stockmodifier->service_type_modifier->name --></option>
																						<!-- php: } -->		
																					</SearchableSelectField>	
																					<input hidden type="text" name="modifier_id_edit[]" id="modifier_edit_id">																				
																				</div>
																			</div>				
																			<div class="form-group row">
																				<label class="control-label col-md-5">Max Unit
																				</label>
																				<div class="col-md-7">
																					<input type="number" name="max_unit" value="<!-- php: = $value->max_unit -->" placeholder="Enter max unit" class="form-control input-height" /> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Copay Status
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="copay" id="copay">
																						<option value="">Select...</option>
										
																						<!-- php:  -->
																							<option <!-- php: = $value->copay == 1 ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">Enabled</option>
																							<option <!-- php: = $value->copay == 0 ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">Disabled</option>
																						<!-- php:  -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Outsourced
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="outsourced" id="outsourced">
																						<option value="">Select...</option>
										
																						<!-- php:  -->
																							<option <!-- php: = $value->outsourced == 1 ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">Yes</option>
																							<option <!-- php: = $value->outsourced == 0 ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">No</option>
																						<!-- php:  -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>														
																		</div>
																		<div class="col-md-6">
																			<div class="form-group row">
																				<label class="control-label col-md-5">MDC(Specialty/Clinic)
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="specialty_id" id="specialty_id">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($specialties as $selectOption) { -->
																							<option <!-- php: = $value->service->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>												
																			<div class="form-group row">
																				<label class="control-label col-md-5">Treatment Room
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="treatment_room_id" id="treatment_room_id">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($treatmentRooms as $selectOption) { -->
																							<option <!-- php: = $value->treatment_room_id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>	
																			<div class="form-group row">
																				<label class="control-label col-md-5">Investigation
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="investigation_id" id="investigation_id">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($investigations as $selectOption) { -->
																							<option <!-- php: = $value->investigation->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>	
																			<div class="form-group row">
																				<label class="control-label col-md-5">Diagnoses
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height selectpicker" name="edit_diagnosis_id" id="edit_diagnosis_id" data-size="5" data-live-search="true">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($diagnoses as $selectOption) { -->
																							<option <!-- php: = $value->standard_diagnosis->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																					<input hidden type="text" name="diagnosis_id" id="diagnosis_id_edit"/>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Gender Specification
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="gender_spec_id" id="gender_spec_id">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($genderSpecifications as $selectOption) { -->
																							<option <!-- php: = $value->gender_specification->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->gender --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Age Specification
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="age_spec_id" id="age_spec_id">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($ageSpecifications as $selectOption) { -->
																							<option <!-- php: = $value->age_specification->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->age --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>	
																			<div class="form-group row">
																				<label class="control-label col-md-5">Weight Specification
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="weight_spec_id" id="weight_spec_id">
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($weightSpecifications as $selectOption) { -->
																							<option <!-- php: = $value->weight_specification->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $value->weight_specification->weight --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>	
																			<div class="form-group row">
																				<label class="control-label col-md-5">Items
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">	
																					<SearchableSelectField class="form-control input-height selectpicker" name="edit_item_stock_id[]" id="edit_item_stock_id" data-size="5" data-live-search="true" multiple>
																						<option value="">Select...</option>
																						<!-- php: foreach ($value->service_stock_items as $stockItems) { -->
																							<option selected value="<!-- php: = $stockItems->item_stock->id -->"><!-- php: = $stockItems->item_stock->item->name --></option>
																						<!-- php: } -->		
																					</SearchableSelectField>
																					<input hidden type="text" name="edit_item_id[]" id="item_stock_id_edit" />
																				</div>
																			</div>				
																		</div>
																	</div>		
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="submit" class="btn btn-info">Submit</button>
																			<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
																		</div>
																	</div>
																</div>
															<!-- php: = $this->Form->end() -->
														</div>
													</div>
												</div>
											</div>
										  </div>
										</div>
									  </div>
									</div>		
					
								<!-- php: $x++; endforeach; -->									
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
<script>
	function clearServiceStockFields(){
		
	}
</script>
<script>
	var items = [];
	var modifiers = [];
	var item_prices = [];
	var modifier_prices = [];
	var treatment_room_price;
	$("#modifier_id").change(function(){
		$(this).children('option:selected').each(function() {
			var modifier = $(this).data('modifier-code-price');
			var modifier_price = $(this).data('modifier-price');
			if($.inArray(modifier, modifiers) == -1){
				modifiers.push(modifier)
			}
			if($.inArray(modifier_price, modifier_prices) == -1){
				modifier_prices.push(modifier_price)
			}
        });
		$("#service_type_modifiers_label").html(modifiers.toString());
	});
	$("#item_id").change(function(){
		$(this).children('option:selected').each(function() {
			var item = $(this).data('item-name');
			var item_price = $(this).data('item-price');
			if($.inArray(item, items) == -1){
				items.push(item)
			}
			if($.inArray(item_price, item_prices) == -1){
				item_prices.push(item_price);
			}
        });
		$("#item_name_label").html(items.toString());
	});
	$("#edit_item_stock_id").change(function(){
		$("#item_stock_id_edit").val($(this).val());
	});
	$("#treatment_room_id").change(function(){
		treatment_room_price = $(this).children('option:selected').data('treatment-room-price')
		$("#room_name_label").html($(this).children('option:selected').data('treatment-room-name'));
	});
	$("#service_id").change(function(){
		$('#service_type_id').empty()
		$('#service_type_id').append($('<option>select...</option>'))
		var serviceId = $(this).val();
		var operation = 1;
		$("#service_name_label").html($(this).children('option:selected').data('service-name'));
		getServiceTypeById(serviceId, operation);
	});
	
	function getServiceTypeById(serviceId, operation){
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getServiceTypeByServiceId' ] ); -->",
            data: {id:serviceId},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				console.log('fetching data')
            },
            success: function (response){
				var results = JSON.parse(response); 
				$.each(results, function(key, value) {
					if(operation == 1){
						$('#service_type_id').append($('<option data-service-type-name="'+results[key].name+'"></option>').val(results[key].id).html(results[key].name));  
					}else if(operation == 2){
						$('#edit_service_type_id').append($('<option data-service-type-name="'+results[key].name+'"></option>').val(results[key].id).html(results[key].name));  
					}	
				});	
            }
        });
	}

	$("#service_type_id").change(function(){
		$('#modifier_id').empty()
		$('#modifier_id').append($('<option>select...</option>'))
		var serviceTypeId = $(this).val();
		var operation = 1;
		$("#service_type_name_label").html($(this).children('option:selected').data('service-type-name'));
		getServiceTypeModifiersById(serviceTypeId, operation);
	});

	function getServiceTypeModifiersById(serviceTypeId, operation){
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getServiceTypeModifiersByServiceId' ] ); -->",
            data: {id:serviceTypeId},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				console.log('fetching data')
            },
            success: function (response){
				var modifiersResults = JSON.parse(response);
				$.each(modifiersResults, function(key, value) {
					if(operation == 1){
						$('#modifier_id').append(
							$('<option data-modifier-price="'+modifiersResults[key].price+'" data-modifier-code-price="'+modifiersResults[key].name +'" value="'+modifiersResults[key].id+'">'+modifiersResults[key].name+'</option>')
						);  
						$("#modifier_id").selectpicker("refresh");
					}else if(operation == 2){
						$('#edit_modifier_id').append(
							$('<option data-modifier-price="'+modifiersResults[key].price+'" data-modifier-code-price="'+modifiersResults[key].name +'" value="'+modifiersResults[key].id+'">'+modifiersResults[key].name+'</option>')
						);  
						$("#edit_modifier_id").selectpicker("refresh");
					}
				});	
            }
        });
	}

	$("#edit_service_id").change(function(){
		$('#edit_service_type_id').empty()
		$('#edit_service_type_id').append($('<option>select...</option>'))
		$('#edit_modifier_id').empty()
		$('#edit_modifier_id').append($('<option>select...</option>'))
		$("#edit_modifier_id").selectpicker("refresh");
		var serviceId = $(this).val();
		var operation = 2;
		getServiceTypeById(serviceId, operation);
	});

	$("#edit_service_type_id").change(function(){
		$('#edit_modifier_id').empty()
		$('#edit_modifier_id').append($('<option>select...</option>'))
		var serviceTypeId = $(this).val();
		var operation = 2;
		getServiceTypeModifiersById(serviceTypeId, operation);
	});

	$("#edit_modifier_id").change(function(){
		$("#modifier_edit_id").val($(this).val());
	});
	$("#edit_diagnosis_id").change(function(){
		$("#diagnosis_id").val($(this).val());
	});
	$("#procedure_name").on("keyup change", function(e) {
		$("#procedure_name_label").html($(this).val());
	})
	$("#procedure_code").on("keyup change", function(e) {
		$("#procedure_code_label").html($(this).val());
	})
	$("#max_unit").on("keyup change", function(e) {
		$("#maxunit_name_label").html($(this).val());
	})
	
	$("#gender_spec_id").change(function(){
		$("#gender_name_label").html($(this).children('option:selected').data('gender-name'));
	});
	$("#weight_spec_id").change(function(){
		$("#weight_name_label").html($(this).children('option:selected').data('weight-name'));
	});
	$("#age_spec_id").change(function(){
		$("#age_name_label").html($(this).children('option:selected').data('age-name'));
	});
	$("#investigation_id").change(function(){
		$("#investigation_name_label").html($(this).children('option:selected').data('investigation-name'));
	});
	$("#copay").change(function(){
		$("#copay_name_label").html($(this).children('option:selected').data('copay'));
	});
	$("#outsourced").change(function(){
		$("#outsourced_name_label").html($(this).children('option:selected').data('outsourced'));
	});
	$("#specialty_id").change(function(){
		$("#specialty_name_label").html($(this).children('option:selected').data('specialty-name'));
	});
</script>
<script>
	// $(".next-one").click(function(){
	// 	var isValid = true;
	// 	$('#procedure_name,#procedure_code,#service_id,#service_type_id,#modifier_id,#max_unit').each(function(){
	// 		if($.trim($(this).val()) == ''){
	// 			isValid = false;
	// 			$(this).css({
	// 				"border": "1px solid red",
	// 				"background": ""
	// 			});
	// 		}else{
	// 			$(this).css({
	// 				"border": "1px solid green",
	// 				"background": ""
	// 			});
	// 		}
	// 	});
	// 	if( isValid == true){
	// 		$(".two").addClass("active");
	// 		$("#step_one").attr("hidden", "hidden");
	// 		$("#step_two").removeAttr("hidden");
	// 		trackProgress(35);
	// 	}
	// });

	// $(".next-two").click(function(){
	// 	var isValid = true;
	// 	$('#copay,#outsourced,#specialty_id,#service_type_id,#treatment_room_id,#item_id,#anaesthasia').each(function(){
	// 		if($.trim($(this).val()) == ''){
	// 			isValid = false;
	// 			$(this).css({
	// 				"border": "1px solid red",
	// 				"background": ""
	// 			});
	// 		}else{
	// 			$(this).css({
	// 				"border": "1px solid green",
	// 				"background": ""
	// 			});
	// 		}
	// 	});
	// 	if( isValid == true){
	// 		$(".three").addClass("active");
	// 		$("#step_two").attr("hidden", "hidden");
	// 		$("#step_three").removeAttr("hidden");
	// 		trackProgress(70);
	// 	}
	// });

	// $(".previous-one").click(function(){
	// 	$("#step_two").attr("hidden", "hidden");
	// 	$("#step_one").removeAttr("hidden");
	// 	$(".two").removeClass("active");
	// });

	// $(".next-three").click(function(){
	// 	var isValid = true;
	// 	$('#diagnosis_id,#investigation_id,#gender_spec_id,#age_spec_id,#weight_spec_id,#item_id,#anaesthasia').each(function(){
	// 		if($.trim($(this).val()) == ''){
	// 			isValid = false;
	// 			$(this).css({
	// 				"border": "1px solid red",
	// 				"background": ""
	// 			});
	// 		}else{
	// 			$(this).css({
	// 				"border": "1px solid green",
	// 				"background": ""
	// 			});
	// 		}
	// 	});
	// 	if(isValid == true){
	// 		$(".four").addClass("active");
	// 		$("#step_three").attr("hidden", "hidden");
	// 		$("#step_four").removeAttr("hidden");
	// 		var item_price_total = 0;
	// 		var modifier_price_total = 0;
	// 		for (var i = 0; i < item_prices.length; i++) {
	// 			item_price_total += item_prices[i] << 0;
	// 		}
	// 		for (var i = 0; i < modifier_prices.length; i++) {
	// 			modifier_price_total += modifier_prices[i] << 0;
	// 		}
	// 		$("#modifier_totals_label").html(modifier_price_total);
	// 		$("#items_totals_label").html(item_price_total);
	// 		$("#room_totals_label").html(treatment_room_price);
	// 		$("#overall_totals_label").html(treatment_room_price + item_price_total + modifier_price_total);
	// 		trackProgress(100);
	// 	}
	// });

	// $(".previous-two").click(function(){
	// 	$("#step_three").attr("hidden", "hidden");
	// 	$("#step_two").removeAttr("hidden");
	// 	$(".three").removeClass("active");
	// });

	// $(".previous-three").click(function(){
	// 	$("#step_four").attr("hidden", "hidden");
	// 	$("#step_three").removeAttr("hidden");
	// 	$(".four").removeClass("active");
	// });	
</script>
<script>
	function trackProgress(level){
		$(".progresss").each(function() {
			// var value = $(this).attr('data-value');
			var value = level;
			var left = $(this).find('.progress-left .progress-bar');
			var right = $(this).find('.progress-right .progress-bar');
			if (value > 0) {
				if (value >= 25) {
				right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
				$(".progress-center").html(value);
				}
				//  else {
				// right.css('transform', 'rotate(180deg)')
				// left.css('transform', 'rotate(' + percentageToDegrees(value - 25) + 'deg)')
				// $(".progress-center").html(value - 25);
				// }
			}
		})
		function percentageToDegrees(percentage) {
			return percentage / 100 * 360
		}
	}
</script>

`;

export default function ElementElementManageservicesServicestocks() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
