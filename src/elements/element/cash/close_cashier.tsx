const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#close_cashier_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#close_cashier_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="close_cashier_add">
					<h4>Close Cashier</h4>                  
                        <!-- php: = $this->Form->create($cashOpen, ['url' => ['controller' => 'Cash', 'action' => 'addCloseCashier']]); -->	
                       		<div class="form-group row">
                                <label class="control-label col-md-3">Float
                                    <span class="required"> * </span>
                                </label>
                                <div class="col-md-5">
                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select float number" name="float_id" id="float_id" onChange="updateDepartment(this.value);updateCashier(this.value);togglediv();" data-live-search="true"  required>					
                                        <!-- php: foreach($openedCashOpens as $selectOption) { -->
                                                    <option value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->cash_float->name --> </option>
                                                <!-- php: } -->									
                                    </SearchableSelectField>
                                </div>
                            </div>	

							<div  id="alt_div" style="display:none;">
								<div >									
									
									<div class="form-group row">
										<label class="control-label col-md-3">Cashier
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<SearchableSelectField class="form-control input-height" name="cashier_id" id="cashier_id1"  required>					
												<!-- php: foreach($users as $value) { -->
															<option value="<!-- php: = $value->id -->"> <!-- php: = $value->first_name. " " .$value->last_name --> </option>
														<!-- php: } -->							
											</SearchableSelectField>
										</div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-3">Department
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<SearchableSelectField class="form-control input-height" name="department_id" id="department_id"  required>					
												<!-- php: foreach($departments as $value1) { -->
															<option value="<!-- php: = $value1->id -->"> <!-- php: = $value1->name --> </option>
														<!-- php: } -->							
											</SearchableSelectField>
										</div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-3">Expected Amount
										</label>
										<div class="col-md-5">
											<input type="text" name="expected_amount" id="expected_amount" data-required="1" value="<!-- php: = 7674 -->" placeholder="Enter expected amount" class="form-control input-height" readonly required /> 
										</div>
									</div>       

									<div class="form-group row">
										<label class="control-label col-md-3">Variance
										</label>
										<div class="col-md-5">
											<input type="text" name="variance" id="variance" data-required="1" placeholder="Enter variance" value="<!-- php: = 76 -->" class="form-control input-height" readonly required /> 
										</div>
									</div>   							
										
								</div>
								<br>
                            </div>
							
                            <div class="row">
                                <div class="offset-md-3 col-md-5">
                                    <button type="submit" class="btn btn-info">Submit</button>
                                    <button type="button" class="btn btn-default" onclick = 'clearOpenCashierFields()'>Reset</button>
                                </div>
                            </div>
                        <!-- php: =$this->Form->end(); -->
				                
				</div>



				<div class="tab-pane active" id="close_cashier_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Cashier Name</th>
										<th class="left">Float</th>	
                                        <th class="left">Start Date</th>										
                                        <th class="left">Entry Date</th>		
                                        <th class="left">Status</th>	
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($closedCashOpens as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
                                        <td class="left"><!-- php: =isset($value->user)? $value->user->first_name. ' '. $value->user->last_name : '' --></td>
                                        <td class="left"><!-- php: =isset($value->cash_float)? $value->cash_float->name : '' --></td>	
                                        <td class="left"><!-- php: =$value->start_date --></td>																				
                                        <td class="left"><!-- php: =$value->date_added --></td>																																				
                                        <td class="left"><!-- php: = '<span class="text-danger">Closed</span>' --></td>							
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
	$(document).ready(function() {	
		$("#cashier_id1").prop("disabled", true);
		$("#department_id").prop("disabled", true);
	});
</script>

<script>
	function clearOpenCashierFields(){
        $('#name').val('');
	}
</script>

<script>
	function togglediv(){
		$('#alt_div').css('display' , 'block');
	}
</script>


<script>    
	function updateCashier(str) {
			if (str == "") {
				return;
			}
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {	
					$('#cashier_id1').val(xhttp.responseText.toString());
				}
			}
			xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Cash', 'action' => 'updateCashier']) -->/"+str, true);
			xhttp.send();
		}
</script>


<script>
	function updateDepartment(str) {
			if (str == "") {
				return;
			}
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {	
					$('#department_id').val(xhttp.responseText);
				}
			}
			xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Cash', 'action' => 'updateDepartment']) -->/"+str, true);
			xhttp.send();
		}
</script>



`;

export default function ElementElementCashCloseCashier() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
