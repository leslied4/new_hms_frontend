const rawHtml = `
<style>
	.teaxtbox input[type="text"]{
	width: 100%;
	border: 1px solid #f1f1f1;
	font-size: 18px;
	font-weight: 700;
	padding: 12px;
	}
	.teaxtbox input[type="text"]:focus{
	outline: none;
	}
	.commonbutton input[type="submit"]{
	padding: 8px;
	background: #f2f2f2;
	border: none;
	font-size: 18px;
	font-weight: 700;
	width: 100%;
	margin-top: 15px;
	border-radius: 5px;
	}
	.conflict input[type="submit"]{
	padding: 8px;
	background: #f2f2f2;
	border: none;
	font-size: 18px;
	font-weight: 700;
	width: 100%;
	margin-top: 15px;
	border-radius: 5px;
	}
	.conflict input[type="submit"]:focus, .commonbutton input[type="submit"]:focus{
	outline: none;
	}
	#del{
	background: #F40057;
	color: #fff;
	}
	#plus{
	height: 97px;
	}
	#equal{
	background: #80C683;
	color: #fff;
	}

	textarea {
    white-space: normal;
    text-align: justify;
    -moz-text-align-last: center; /* Firefox 12+ */
    text-align-last: center;
	font-size: 50pt;
	}
</style>
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Scrubber Configs</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#config_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#config_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="config_add">
					<h4>Create Tokens</h4>
					<div class="row">
						<div class="col-md-12">
							<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'CreditClaims', 'action' => 'saveScrubberExpression']]); -->
							<div class="form-group row">
								<div class="col-md-10">
									<input type="text" name="expression" data-sign="items" value="" placeholder="Expression" id="expression" class="form-control input-height" id="operand" required>
									<input hidden type="text" name="status_id" value="1" required>
								</div>	
								<div class="col-md-2">
									<button class="btn btn-primary btn-outline" type="submit"> <span><i class="fa fa-save"></i> Save Expression </span> </button>
								</div>	
							</div>
							<!-- php: =$this->Form->end(); -->
							<div class="form-group row">
								<div class="col-md-4">
									<SearchableSelectField class="form-control input-height" name="operator" id="token_type" required>
										<option value="">Select Token Type</option>
										<option value="1">Operator</option>  
										<option value="2">Constant</option> 
										<option value="3">Operand</option> 
									</SearchableSelectField>
								</div>
							</div>
							<div class="row commonbutton" style="display:none" id="constants">
								<div class="col-md-3">
									<input type="submit" name="" data-sign="items" value="invoice_copayment = 1" data-toggle="tooltip" data-placement="top" title="Indicates co payment is enabled for a claim" class="" id="enabled_copayment" onclick="copaymentEnabledConstant($(this).val())">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="items" value="co_payment (disabled)" data-toggle="tooltip" data-placement="top" title="Indicates co payment is disabled" class="" id="operand_items">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="items" value="insurance_profile_type != 1" data-toggle="tooltip" data-placement="top" title="Indicates co payment is disabled" class="" id="public_insurance_profile" onclick="publicInsuranceConstant($(this).val())">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" value="Del" id="del">
								</div>
							</div>
							<div class="row commonbutton" style="display:none" id="operands">
								<div class="col-md-3">
									<input type="submit" name="" data-sign="items" value="co_payment" data-toggle="tooltip" data-placement="top" title="Indicates the co payment status of a claim" class="" id="claim_co_payment" onclick="copaymentOperand($(this).val())">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="item" value="insurance_profile_policy" data-toggle="tooltip" data-placement="top" title="Indicates the insurance policy of the patient's insurance" class="" id="operant_item" onclick="insuranceProfileOperand($(this).val())">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="items" value="patient_visit_id" data-toggle="tooltip" data-placement="top" title="Indicates the the visit of the patient for this particular claim" class="" id="operand_items" onclick="patientVisitOperand($(this).val())">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="items" value="status_id" data-toggle="tooltip" data-placement="top" title="Indicates the status of this particular claim" class="" id="operand_items" onclick="status($(this).val())">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" value="Del" id="del">
								</div>
							</div>
							<div class="row commonbutton" style="display:none" id="operators">
								<div class="col-md-3">
									<input type="submit" name="" data-sign="==" value="&&" class="" id="andsign" onclick="andsign('&&')">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="==" value="Equal to (==)" class="" id="equalsign" onclick="equalSign('==')">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign=">=" value="Greater or Equal (>=)" class="" id="greater_equalsign" onclick="greaterEqualSign('>=')">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="<=" value="Less or Equal (<=)" class="" id="less_equalsign">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="!=" value="Not Equal (!=)" id="not_equalsign">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign=">" value="Greater than (>)" class="" id="greatersign">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="<" value="Less than (<)" class="" id="lesssign">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="notin" value="Not In" class="" id="not_insign">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" data-sign="in" value="In" class="" id="in_sign">
								</div>
								<div class="col-md-3">
									<input type="submit" name="" value="Del" id="del">
								</div>
							</div> 
						</div>
					</div>
				</div>
				<div class="tab-pane active" id="config_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Expression</th>
										<th class="left">Status</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($expressions as $value): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->expression --></td>
										<td class="left"><!-- php: = $value->status->name --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editExpression_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>	
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'CreditClaims','action'=>'deleteExpression',$value->id], ['confirm' => __('Are you sure you want to delete this expression?', $value->id), 'class' => 'btn ' . Cake\Core\Configure::read('C... -->
											<!-- php: if($value->status->id == 1){ -->
												<!-- php: = $this->Form->postLink(__('Disable'), ['controller'=>'CreditClaims','action'=>'toggleExpressionStatus',$value->id, 2], ['confirm' => __('Are you sure you want to disable this expression?', $value->id), 'class' => 'btn ' . Cake\Core\Configu... -->
											<!-- php: } else{ -->
												<!-- php: = $this->Form->postLink(__('Enable'),['Controller'=>'CreditClaims','action'=>'toggleExpressionStatus',$value->id, 1], ['confirm' => __('Are you sure you want to enable this expression?', $value->id), 'class' => 'btn ' . Cake\Core\Configure:... -->
											<!-- php: } -->
										</td>
									</tr>  
									<div class="modal fade" id="editExpression_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Edit Expression: <!-- php: = $value->id --></h4>
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
															<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'editVaccineType', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Expression
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="type_name" data-required="1" value="<!-- php: = $value->expression -->" placeholder="Expression" class="form-control input-height" required /> 
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
	$("#expression").css("font-weight","Bold");

	function resetForm()
	{
		$('#name').val('');
		$('#description').val('');
	}

	$("#token_type").change(function(){
		if($(this).children('option:selected').val() == 1){
			$("#operators").fadeToggle(800);
			$("#constants").fadeOut(800);
			$("#operands").fadeOut(800);
		}else if($(this).children('option:selected').val() == 3){
			$("#operands").fadeToggle(800);
			$("#constants").fadeOut(800);
			$("#operators").fadeOut(800);
		}else if($(this).children('option:selected').val() == 2){
			$("#constants").fadeToggle(800);
			$("#operands").fadeOut(800);
			$("#operators").fadeOut(800);
		}
	});

	function copaymentOperand(value)
	{
		populateExpression(value);
	}

	function insuranceProfileOperand(value)
	{
		populateExpression(value);
	}

	function patientVisitOperand(value)
	{
		populateExpression(value);
	}

	function status(value)
	{
		populateExpression(value);
	}

	function greaterEqualSign(value)
	{
		populateExpression(value)
	}

	function equalSign(value)
	{
		populateExpression(value)
	}

	function copaymentEnabledConstant(value)
	{
		populateExpression(value)
	}

	function andsign(value)
	{
		populateExpression(value)
	}

	function publicInsuranceConstant(value)
	{
		populateExpression(value)
	}

	function populateExpression(value)
	{
		$("#expression").val($("#expression").val() + " " + value);
	}
</script>

`;

export default function ElementElementCreditclaimsScrubberConfig() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
