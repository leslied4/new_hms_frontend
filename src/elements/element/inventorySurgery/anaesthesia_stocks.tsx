const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Anaesthesia</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#anaesthesiastockitems_add" data-toggle="tab"> Add Anaesthesia</a>
				</li>
				<li class="nav-item">
					<a href="#anaesthesiastockitems_view" data-toggle="tab"> Anaesthesia History </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="anaesthesiastockitems_add">
					<h4>Add a new Anaesthesia</h4>
					<!-- php: = $this->Form->create($anaesthesiaStock, ['url' => ['controller' => 'InventorySurgery', 'action' => 'addAnaesthesiaStock']]); -->
																													
						<div class="form-group row">
							<label class="control-label col-md-4">Anaesthesia
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" step="1" min="1" name="procedure_name" id="procedure_name" data-required="1" placeholder="Enter anaesthesia name" class="form-control input-height" required /> 
							</div>
						</div>
																	
						<div class="form-group row">
							<label class="control-label col-md-4">Description
							</label>
							<div class="col-md-5">
								<input type="text" step="0.01" min="0" name="description" id="description" data-required="1" placeholder="Enter description" class="form-control input-height" /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Anaesthesia Code
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" step="0.01" min="0" max="100" name="procedure_code" id="procedure_code" data-required="1" placeholder="procedure_code" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Modifier
							</label>
							<div class="col-md-5">
								<input type="text" step="0.01" min="0"  name="modifier" id="modifier" data-required="1" placeholder="Enter modifier" class="form-control input-height" /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Unit of Pricing
							</label>
							<div class="col-md-5">
								<input type="text" step="0.01" min="0"  name="unit_of_pricing" id="modifier" data-required="1" placeholder="Enter unit of pricing" class="form-control input-height" /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Anaesthesia Time/Unit Price
							</label>
							<div class="col-md-5">
								<input type="text" step="0.01" min="0"  name="anaesthesia_time" id="anaesthesia_time" data-required="1" placeholder="Enter naesthesia time per unit price" class="form-control input-height" /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Max Unit
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" step="1" min="1" name="max_unit" id="max_unit" data-required="1" placeholder="Enter max unit" class="form-control input-height" required /> 
							</div>
						</div>
																	
						<div class="form-group row">
							<label class="control-label col-md-4">New Unit Value
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" step="0.01" min="0" name="unit_value_new" id="unit_value_new" data-required="1" placeholder="Enter unit value" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Facility Price
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" step="0.01" min="0" name="facility_price" id="facility_price" data-required="1" placeholder="Enter facility price" class="form-control input-height" required /> 
							</div>
						</div>						

						<div class="form-group row">
							<label class="control-label col-md-4">End Date
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">							
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="End Date" name="end_date" id="end_date" type="text" value="" readonly >
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
				<div class="tab-pane active" id="anaesthesiastockitems_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Anaesthesia</th>
										<th class="left">Description</th>
										<th class="left">Anaesthesia Code</th>
										<th class="left">Modifier</th>
										<th class="left">Max Unit</th>
										<th class="left">Old Unit Value</th>
										<th class="left">New Unit Value</th>
										<th class="left">Facility Price</th>
										<th class="left">Start Date</th>
										<th class="left">End Date</th>									
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($anaesthesiaStocks as $value): -->								
									<tr class="odd gradeX">
									<td class="left"><!-- php: =$x --></td>
										<td class="left"><!-- php: =$value->procedure_name --></td>
										<td class="left"><!-- php: =$value->description --></td>
										<td class="left"><!-- php: =$value->procedure_code --></td>
										<td class="left"><!-- php: =$value->modifier --></td>
										<td class="left"><!-- php: =$value->max_unit --></td>
										<td class="left"><!-- php: =$this->Number->precision($value->unit_value_old,2) --></td>	
										<td class="left"><!-- php: =$this->Number->precision($value->unit_value_new,2) --></td>	
										<td class="left"><!-- php: =$this->Number->precision($value->facility_price,2) --></td>			
										<td class="left"><!-- php: =$value->begin_date --></td>										
										<td class="left"><!-- php: =$value->end_date --></td>		
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
	function clearStockFields(){
		$('#procedure_name').val('');
		$('#description').val('');
		$('#procedure_code').val('');
		$('#modifire').val('');
	}
</script>

`;

export default function ElementElementInventorySurgeryAnaesthesiaStocks() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
