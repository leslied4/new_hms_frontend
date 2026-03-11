const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">			
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#cash_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#cash_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="cash_add">
				<!-- php: = $this->Form->create($cashRecord, ['url' => ['controller' => 'Cash', 'action' => 'addCash']]); -->
					<div class="row">
						<div class="col-md-5">								
							<h4>Add a new cash record</h4>


							<div class="form-group row">
                                <label class="control-label col-md-3">Float
                                    <span class="required"> * </span>
                                </label>
                                <div class="col-md-8">
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
										<div class="col-md-8">
											<SearchableSelectField class="form-control input-height" data-size="10" name="cashier_id" id="cashier_id"  required>					
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
										<div class="col-md-8">
											<SearchableSelectField class="form-control input-height" data-size="10" name="department_id" id="department_id"  required>					
												<!-- php: foreach($departments as $value1) { -->
															<option value="<!-- php: = $value1->id -->"> <!-- php: = $value1->name --> </option>
														<!-- php: } -->							
											</SearchableSelectField>
										</div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-3">Expected Amount
										</label>
										<div class="col-md-8">
											<input type="text" name="expected_amount" id="expected_amount" data-required="1" value="<!-- php: = 7674 -->" placeholder="Enter expected amount" class="form-control input-height" readonly required /> 
										</div>
									</div>       

									<div class="form-group row">
										<label class="control-label col-md-3">Variance
										</label>
										<div class="col-md-8">
											<input type="text" name="variance" id="variance" data-required="1" placeholder="Enter variance" value="<!-- php: = 76 -->" class="form-control input-height" readonly required /> 
										</div>
									</div>   							
										
								</div>
								<br>
                            </div>

								<div class="form-group row">
									<label class="control-label col-md-3">Category
										<span class="required"> * </span>
									</label>
									<div class="col-md-8">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cash category" name="category_id" id="category_id" data-live-search="true"  required>
											<!-- php: foreach($cashCategories as $selectOption) { -->
													<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
												<!-- php: } -->									
										</SearchableSelectField>
									</div>
								</div>					
								<div class="form-group row">
									<label class="control-label col-md-3">
										Category Details	
										<span class="required"> * </span>							
									</label>
									<div class="col-md-8">
										<input type="text" name="details" id="details" data-required="0" placeholder="Enter category details" class="form-control input-height" required /> 
									</div>
								</div>	    
								<div class="form-group row">
									<label class="control-label col-md-3">	
										Comment
									</label>
									<div class="col-md-8">
										<input type="text" name="comment" id="comment" data-required="0" placeholder="Enter comment" class="form-control input-height"  /> 
									</div>
								</div>                                           								
						</div>
						<div class="col-md-6 row">

							<div class="col-md-6">
							<h4>Notes</h4>
								<div class="form-group row">
									<label class="control-label col-md-2">
										&#8373;50.00								
									</label>
									<div class="col-md-8">
										<input type="text" name="n50" id="n50" data-required="0" placeholder="quantity" class="form-control input-height" /> 
									</div>
								</div>	
								<div class="form-group row">
									<label class="control-label col-md-2">	
									&#8373;20.00
									</label>
									<div class="col-md-8">
										<input type="text" name="n20" id="n20" data-required="0" placeholder="quantity" class="form-control input-height" /> 
									</div>
								</div>    
								<div class="form-group row">
									<label class="control-label col-md-2">	
									&#8373;10.00
									</label>
									<div class="col-md-8">
										<input type="text" name="n10" id="n10" data-required="0" placeholder="quantity" class="form-control input-height"  /> 
									</div>
								</div>   
								<div class="form-group row">
									<label class="control-label col-md-2">	
									&#8373;5.00
									</label>
									<div class="col-md-8">
										<input type="text" name="n5" id="n5" data-required="0" placeholder="quantity" class="form-control input-height"  /> 
									</div>
								</div>  
								<div class="form-group row">
									<label class="control-label col-md-2">	
									&#8373;2.00
									</label>
									<div class="col-md-8">
										<input type="text" name="n2" id="n2" data-required="0" placeholder="quantity" class="form-control input-height"  /> 
									</div>
								</div>  
								<div class="form-group row">
									<label class="control-label col-md-2">	
									&#8373;1.00
									</label>
									<div class="col-md-8">
										<input type="text" name="n1" id="n1" data-required="0" placeholder="quantity" class="form-control input-height"  /> 
									</div>
								</div>            
							</div>


							<div class="col-md-6">
							<h4>Coins</h4>
								<div class="form-group row">
									<label class="control-label col-md-2">
									&#8373;1.00								
									</label>
									<div class="col-md-8">
										<input type="text" name="c1" id="c1" data-required="0" placeholder="quantity" class="form-control input-height" /> 
									</div>
								</div>	
								<div class="form-group row">
									<label class="control-label col-md-2">	
										50Gp 
									</label>
									<div class="col-md-8">
										<input type="text" name="c50" id="c50" data-required="0" placeholder="quantity" class="form-control input-height" /> 
									</div>
								</div>    
								<div class="form-group row">
									<label class="control-label col-md-2">	
										20Gp
									</label>
									<div class="col-md-8">
										<input type="text" name="c20" id="c20" data-required="0" placeholder="quantity" class="form-control input-height"  /> 
									</div>
								</div>   
								<div class="form-group row">
									<label class="control-label col-md-2">	
										10Gp
									</label>
									<div class="col-md-8">
										<input type="text" name="c10" id="c10" data-required="0" placeholder="quantity" class="form-control input-height"  /> 
									</div>
								</div>  
								<br>
								<div class="row">
									<div class="offset-md-2 col-md-8">
										<button type="submit" class="btn btn-info">Submit</button>
										<button type="button" class="btn btn-default" onclick = 'clearCashFields()'>Reset</button>
									</div>
								</div>
								          
							</div>

								
						</div>
					</div>						
						<!-- php: =$this->Form->end(); -->
				</div>





				<div class="tab-pane active" id="cash_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">#</th>
                                        <th class="left">Category</th>
                                        <th class="left">Amount</th>
                                        <th class="left">Code</th>
										<th class="left">Date</th>
										<th class="left">Details</th>
                                        <th class="left">Comment</th>
                                        <th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($cashRecords as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>                                        
                                        <td class="left"><!-- php: =isset($value->cash_category)? $value->cash_category->name : '' --></td>
                                        <td class="left"><!-- php: =$value->amount --></td>
                                        <td class="left"><!-- php: =$value->code --></td>
                                        <td class="left"><!-- php: =$value->date_added --></td>
										<td class="left"><!-- php: =$value->details --></td>
                                        <td class="left"><!-- php: =$value->comment --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editCashDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editCashDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editCashDialogueTitle">Cash Code: <!-- php: = $value->code --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Edit Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Cash', 'action' => 'editCash', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">				
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-3">
                                                                            Category Details								
                                                                        </label>
                                                                        <div class="col-md-9">
                                                                            <input type="text" name="details" id="details" data-required="0" value="<!-- php: = $value->details -->" placeholder="Provide category details" class="form-control input-height" /> 
                                                                        </div>
                                                                    </div>	
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-3">	
                                                                            Amount
                                                                        </label>
                                                                        <div class="col-md-9">
                                                                            <input type="text" name="amount" id="amount" data-required="0"  value="<!-- php: = $value->amount -->" placeholder="Enter amount" class="form-control input-height" required /> 
                                                                        </div>
                                                                    </div> 
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-3">	
                                                                            Comment
                                                                        </label>
                                                                        <div class="col-md-9">
                                                                            <input type="text" name="comment" id="comment" value="<!-- php: = $value->comment -->" data-required="0" placeholder="Enter comment" class="form-control input-height"  /> 
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
	function clearCashFields(){
        $('#amount').val('');
		$('#details').val('');
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
					$('#cashier_id').val(xhttp.responseText);
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

export default function ElementElementCashAddCash() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
