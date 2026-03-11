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
					<h4>Add a new Cashier</h4>
					<!-- php: = $this->Form->create($cashOpen, ['url' => ['controller' => 'Cash', 'action' => 'addOpenCashier']]); -->	
                    <div class="form-group row">
							<label class="control-label col-md-3">Cashier Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cashier name" name="cashier_id" id="cashier_id" data-live-search="true"  required>					
                                    <!-- php: foreach($users as $selectOption) { -->
                                                <option value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->first_name. ' ' .$selectOption->last_name --> </option>
                                            <!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>	
                   		<div class="form-group row">
							<label class="control-label col-md-3">Float
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select float number" name="float_id" id="float_id" data-live-search="true"  required>					
                                    <!-- php: foreach($floats as $selectOption) { -->
                                                <option value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->name --> </option>
                                            <!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-3">Department
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select department" name="department_id" id="depatment_id" data-live-search="true"  required>					
                                    <!-- php: foreach($departments as $selectOption) { -->
                                                <option value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->name --> </option>
                                            <!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>	                    
                        <div class="form-group row">
							<label class="control-label col-md-3">Start Date
							</label>
							<div class="col-md-5">
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="Select data" name = "start_date" id = "start_date" type="text" value="" >
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
									<input type="hidden" id="dtp_input2" value="" />
							</div>
						</div>	
														
						<div class="row">
							<div class="offset-md-3 col-md-5">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearOpenCashierFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="open_cashier_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Cashier Name</th>
										<th class="left">Float</th>	
										<th class="left">Department</th>	
                                        <th class="left">Start Date</th>										
                                        <th class="left">Entry Date</th>		
                                        <th class="left">Status</th>	
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($cashOpens as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
                                        <td class="left"><!-- php: =isset($value->user)? $value->user->first_name. ' '. $value->user->last_name : '' --></td>
                                        <td class="left"><!-- php: =isset($value->cash_float)? $value->cash_float->name : '' --></td>	
										<td class="left"><!-- php: =isset($value->department)? $value->department->name : '' --></td>	
                                        <td class="left"><!-- php: =$value->start_date --></td>																				
                                        <td class="left"><!-- php: =$value->date_added --></td>																																				
                                        <td class="left"><!-- php: =$value->status_code == 1 ? '<span class="text-success">Opened</span>' : '<span class="text-danger">Closed</span>' --></td>							
									</tr>
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
	function clearOpenCashierFields(){
        $('#name').val('');
	}
</script>

`;

export default function ElementElementCashOpenCashier() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
