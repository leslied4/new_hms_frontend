const rawHtml = `





<div class="row">
	<div class="borderBox light bordered col-md-12">	


		<div class="profile-sidebar">
    		<div class="card card-topline-<!-- php: = $theme1 -->">
               
			    <div class="card-head card-topline-<!-- php: = $theme1 -->">
                        <header>Transfered Deatils</header>
                    </div>
                    <div class="card-body no-padding height-9">
                        <ul class="list-group list-group-unbordered">
                            <li class="list-group-item">
                                <b>Item</b> <a class="pull-right">
                                <!-- php: foreach($items as $item){ if($item->id == $transfer->order->item_id){ -->                                       
                                                            
                                                        <!-- php: = $item->name -->
                                                        
                                                        <!-- php: } } -->
                                            </a>
                            </li>
							<li class="list-group-item">
                                <b>Batch Number</b> <a class="pull-right"><!-- php: = isset($transfer->order) ? $transfer->order->batch_number : '' --> </a>
                            </li>
                            <li class="list-group-item">
                                <b>Department</b> <a class="pull-right"><!-- php: = isset($transfer->department) ? $transfer->department->name : '' --> </a>
                            </li>
                            <li class="list-group-item">
                                <b>Supplies</b> <a class="pull-right"><!-- php: =isset($transfer->order_supply) ? $transfer->order_supply->name : '' --> </a>
                            </li>
                            <li class="list-group-item">
                                <b>Item Registration Date</b> <a class="pull-right"><!-- php: =isset($transfer->order) ? $transfer->order->date_added : '' --> </a>
                            </li>
                        </ul>                        
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-head card-topline-<!-- php: = $theme1 -->">
                        <header>Date Transfered</header>
                    </div>
                    <div class="card-body no-padding height-9">
                        <div class="row text-center m-t-10">
                    <div class="col-md-12">
                        <p><!-- php: = $transfer->date_added --></p>
                    </div>
                </div>				
            </div>
	   </div>

	   
			<div class="card">
					<div class="card-head card-topline-<!-- php: = $theme1 -->">
                        <header>Waste Item</header>
                    </div>
					<div class="card-body no-padding height-9">
                        <ul class="list-group list-group-unbordered">
							<li class="list-group-item">
                                <b>Box</b> <a class="pull-right">Reason</a>
							</li>
							<!-- php: foreach($wastes as $item){ -->   
                            <li class="list-group-item">
                                <b><!-- php: = $item->box_number --></b>                                                                                     
								<a class="pull-right">
									<!-- php: foreach($reasons as $item1){ if($item1->id == $item->reason_id){ -->                                      
										<!-- php: = $item1->name -->
									<!-- php: }} -->
                                </a>
                            </li>   
							<!-- php: } -->   
							                     
                        </ul>                        
                    </div>
				</div>
				
			
     
                
    </div>


    <div class="profile-content card card-box">




	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">			
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#stocks_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#stocks_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="stocks_add">
					<h4>Add a new Stock</h4>
					<!-- php: = $this->Form->create($stockCount, ['url' => ['controller' => 'Inventory', 'action' => 'addStockCount']]); -->
																
						<div class="form-group row">
							<label class="control-label col-md-4">	
                                Box	Quantity
							</label>
							<div class="col-md-5">
								<input type="number" min="1" name="box_number" id="box_number" data-required="0" placeholder="Enter number of boxes" class="form-control input-height" /> 
                                <input type="hidden" min="1" name="transfer_id" id="transfer_id" value="<!-- php: = $transfer->id -->" data-required="0" class="form-control input-height" /> 
							</div>
						</div>
                        <div class="form-group row">
							<label class="control-label col-md-4">
                                 Inner Quantity								
							</label>
							<div class="col-md-5">
								<input type="number" min="1" name="inner_number" id="inner_number" data-required="0" placeholder="Enter inner quantity" class="form-control input-height" /> 
							</div>
						</div>
										
						<div class="form-group row">
							<label class="control-label col-md-4">Entry Date
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="Expiry Date" name = "date_count" id = "date_count" type="text" value="" required>
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
									<input type="hidden" id="dtp_input2" value="" />
							</div>
						</div>		

						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearStockFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>



				<div class="tab-pane active" id="stocks_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Entry Date</th>
										<th class="left">Box</th>
										<th class="left">Inner</th>
										<th class="left">Unit</th>
                                        <th class="left">Date</th>
                                        <th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($stockCounts as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
                                        <td class="left"><!-- php: =$value->date_count --></td>
										<td class="left"><!-- php: =$value->box_number --></td>
										<td class="left"><!-- php: =$value->inner_number --></td>
										<td class="left"><!-- php: =($value->box_number * $value->inner_number) --></td>
										<td class="left"><!-- php: =$value->date_added --></td>


										<td class="left">
											<a data-toggle="modal" data-target="#editStockItemDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editStockItemDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editStockItemDialogueTitle">Item: <!-- php: = isset($value->order_item)? $value->order_item->name : '' --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editOrders', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">																										
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-4">	
                                                                            Box	Quantity
                                                                        </label>
                                                                        <div class="col-md-8">
                                                                            <input type="number" name="box_number" id="box_number" data-required="0" value="<!-- php: = $value->box_number -->" placeholder="Enter number of boxes" class="form-control input-height" /> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-4">
                                                                            Inner Quantity								
                                                                        </label>
                                                                        <div class="col-md-8">
                                                                            <input type="number" name="inner_number" id="inner_number" data-required="0" value="<!-- php: = $value->inner_number -->" placeholder="Enter inner quantity" class="form-control input-height" /> 
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

    </div>
</div>


<script>
	function clearStockFields(){
        $('#box_number').val('');
		$('#inner_number').val('');
		$('#batch_number').val('');
	}
</script>

`;

export default function ElementElementInventoryAddStockCount() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
