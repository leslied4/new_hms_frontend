const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#open_cashier_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#open_cashier_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="open_cashier_add">
					<h4>Initialize Cashier's Float</h4>
					
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Cash', 'action' => 'initializeCashierFloat']]); -->	
                    	<div class="form-group row">
							<label class="control-label col-md-3">Cashier
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cashier name" name="cashier_id" id="cashier_id" data-live-search="true"  required>					
                                    <!-- php: foreach($users as $selectOption) { if($selectOption->active_float == null) { -->
                                                <option value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->full_name --> </option>
                                            <!-- php: } else { -->
                                                <option disabled value="<!-- php: = $selectOption->id -->" data-content="<!-- php: = $selectOption->full_name --> <span class='badge badge-danger right'>Float Assigned</span>"> <!-- php: = $selectOption->full_name --> </option>
                                            <!-- php: } } -->									
								</SearchableSelectField>
							</div>
						</div>	
                   		<div class="form-group row">
							<label class="control-label col-md-3">Float
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select float" name="cash_float_id" id="cash_float_id" data-live-search="true"  required>					
                                    <!-- php: foreach($floats as $selectOption) { if($selectOption->status_id == 1) { -->
                                                <option value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->name --> </option>
                                            <!-- php: } else { -->
                                                <option disabled value="<!-- php: = $selectOption->id -->" data-content="<!-- php: = $selectOption->name --> <span class='badge badge-danger right'>Assigned</span>"> <!-- php: = $selectOption->name --> </option>
                                            <!-- php: } } -->									
								</SearchableSelectField>
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-3">Department
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select department" name="department_id" id="depatment_id" data-live-search="true"  required>					
                                    <!-- php: foreach($departments as $key => $selectOption) { -->
                                                <option value="<!-- php: = $key -->"> <!-- php: = $selectOption --> </option>
                                            <!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>	
                   		<div class="form-group row">
							<label class="control-label col-md-3">Start Amount
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input class="form-control input-height" min="0" placeholder="Enter Start Amount" name="start_amount" id="start_amount" required />
                            </div>
						</div>	                    
                        <div class="form-group row">
							<label class="control-label col-md-3">Start Date
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="Select data" data-required="1" name = "date_opened" id = "date_opened" type="text" value="" required >
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
									<input type="hidden" id="dtp_input2" value="" />
							</div>
						</div>	
														
						<div class="row">
							<div class="offset-md-3 col-md-5">
								<button type="submit" class="btn btn-info">Submit</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="open_cashier_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Cashier Name</th>
										<th class="left">Float</th>	
										<th class="left">Department</th>	
                                        <th class="left">Start Amount</th>										
                                        <th class="left">Entry Date</th>		
                                        <th class="left">Status</th>	
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($users as $value): // echo $value; -->
									<tr class="odd gradeX">
                                        <td class="left"><!-- php: = $value->full_name --></td>
                                        <td class="left"><!-- php: = ($value->active_float != null && $value->active_float->has('cash_float')) ? $value->active_float->cash_float->name : '' --></td>	
										<td class="left"><!-- php: = ($value->active_float != null && $value->active_float->has('department')) ? $value->active_float->department->name : '' --></td>	
                                        <td class="left"><!-- php: = ($value->active_float != null) ? 'GHS ' . $value->active_float->start_amount : '' --></td>																				
                                        <td class="left"><!-- php: = ($value->active_float != null) ? $value->active_float->date_created : '' --></td>																																				
                                        <td class="left">
											<!-- php: if($value->active_float != null && $value->active_float->status_id == 28) { echo '<span class="text-success">Opened</span>'; } else if($value->active_float != null && $value->active_float->status_id == 29) { echo '<span class="text-danger">... -->
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


<script>
	function clearOpenCashierFields(){
        $('#name').val('');
	}
</script>

`;

export default function ElementElementCashCashierFloat() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
