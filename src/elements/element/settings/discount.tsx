const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Discount & Markup</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#discount_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#discount_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="discount_add">
					<h4>Add a new Discount</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Settings', 'action' => 'addDiscount']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Title
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="title" id="title" data-required="1" placeholder="Enter Title" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<textarea name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height"></textarea> 
							</div>
						</div>
					
						<div class="form-group row d-none">
							<label class="control-label col-md-4">Value Type
							</label>
							<div class="col-md-5">
							    <div class="form-check form-check-inline">
							        <input class="form-check-input" type="radio" checked name="value_type" id="inlineRadio1" value="percentage">
							        <label class="form-check-label" for="inlineRadio1">Percentage</label>
							    </div>
							    <div class="form-check form-check-inline">
							        <input class="form-check-input" type="radio" name="value_type" id="inlineRadio2" value="amount">
							        <label class="form-check-label" for="inlineRadio2">Flat Amount</label>
							    </div>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Value
							</label>
							<div class="col-md-5">
								<input type="number" step="0.01" name="value" id="value" placeholder="Enter Value" class="form-control input-height" required/> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Department
								
							</label>
							<div class="col-md-5">
                                <SearchableSelectField name="department_id" id="" class="form-control">
                                <!-- php: foreach($departments as $department){ -->
                                    <option value="<!-- php: = $department->id -->"><!-- php: = $department->name --></option>
                                <!-- php: } -->
                            </SearchableSelectField>
								<!-- <textarea type="text" name="address" id="address" data-required="0" placeholder="Enter address" class="form-control input-height"></textarea>  -->
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">
								Services applicable
							</label>
							<div class="col-md-5">
								<SearchableSelectField data-actions-box="true" class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="services_applicable[]" id="id1" title="Select Service(s)"  data-live-search="true" multiple required>
										<!-- php: foreach($services as $service): -->
											<option value="<!-- php: = $service->id -->"><!-- php: = $service->name --></option>
										<!-- php: endforeach; -->		
								</SearchableSelectField>
                            </div>
						</div>
						<!-- <div class="form-group row">
							<label class="control-label col-md-4">Amount applicable
							</label>
							<div class="col-md-5">
								<input type="number" step="0.01" name="amount_applicable" id="value" placeholder="Enter Amount applicable" class="form-control input-height" required /> 
							</div>
						</div> -->
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearHealthFacilityFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="discount_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
                                        <th class="left">Date</th>
										<th class="left">Title</th>
										<th class="left">Description</th>
										<th class="left">Value Type</th>
										<th class="left">Value</th>
										<th class="left">Department</th>
										<th class="left">Services</th>
										<!-- <th class="left">Amount Applicable</th> -->
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
                                    <!-- php: foreach($discounts as $discount){ -->
                                        <tr>
                                            <td><!-- php: = $discount->date_created --></td>
                                            <td><!-- php: = $discount->title --> <!-- php: = $discount->status == 0 ? '<span class="badge badge-secondary">Disabled</span>' : '' --> </td>
                                            <td><!-- php: = $discount->description --></td>
                                            <td><!-- php: = $discount->value_type == "percentage" ? '<span class="badge badge-primary">Percentage</span>' : ($discount->value_type == "amount" ? '<span class="badge badge-warning">Flat Amount</span>' : '') --></td>
                                            <td><!-- php: = $discount->value --></td>
                                            <td><!-- php: = $discount->department->name --></td>
                                            <td>
												<!-- php: foreach($discount->discount_services as $dis_service): -->
													<span class="badge badge-danger"><!-- php: = $dis_service->service->name --></span>
												<!-- php: endforeach; -->
										    </td>
                                            <!-- <td><!-- php: //= $discount->amount_applicable --></td> -->
                                            <td>
												<!-- php: = $this->Form->postLink(__('Remove'), ['controller'=>'Settings','action'=>'removeDiscount',$discount->id], ['class' => 'btn btn-xs btn-danger']) -->
												<!-- php: = $discount->status == 1 ? $this->Form->postLink(__('Disable'), ['controller'=>'Settings','action'=>'toggleDiscountDisable',$discount->id], ['class' => 'btn btn-xs btn-secondary']) : $this->Form->postLink(__('Enable'), ['controller'=>'Setti... -->
                                                <!-- <button class="btn btn-xs btn-secondary">Disable</button> -->
                                                <button class="btn btn-xs btn-warning">Edit</button>
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


<script>
	function clearHealthFacilityFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementSettingsDiscount() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
