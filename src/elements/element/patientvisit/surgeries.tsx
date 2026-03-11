const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">SURGERIES</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item surgeries_add_surgery">
					<a href="#borderBox_tab13 " data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item surgeries_view_surgeries">
					<a href="#borderBox_tab14" data-toggle="tab"> View </a>
				</li>
				<!--<li class="nav-item">
					<a href="#borderBox_tab15" data-toggle="tab" class="active"> Tab 15 </a>
				</li>-->
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane surgeries_add_surgery " id="borderBox_tab13">
				<!-- php: = $this->Form->create($surgeries,['id'=>'surgeries']); -->
					<div class="form-body">
						<div class="form-group row">
							<label class="control-label col-md-3">Start time
								<span class="required"> * </span>
							</label>
							<div class="col-md-3">
								<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" size="16" placeholder="Start Date" name = "start_date_value" id = "start_date_value" type="text" value="" required >
									<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
								<input type="hidden" id="dtp_input2" value="" />
								
							</div>
							<div class="col-md-3">
								<span><input class="form-control input-height" type="time" name="start_time_value" id="start_time_value" required /></span>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">End time
								<span class="required"> * </span>
							</label>
							<div class="col-md-3">
								<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" size="16" placeholder="End Date" name = "end_date_value" id = "end_date_value" type="text" value="" required >
									<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
								<input type="hidden" id="dtp_input2" value="" />
								
							</div>
							<div class="col-md-3">
								<span><input class="form-control input-height" type="time" name="end_time_value" id="end_time_value" required /></span>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Surgery type
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="surgery_type_id" id="surgery_type_id" required>
									<option value="">Select...</option>
										<!-- php: foreach($surgerytypes as $surgerytype) { -->
											<option value="<!-- php: = $surgerytype->id -->"><!-- php: = $surgerytype->name --></option>
										<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						
						<!--div class="form-group row">
							<label class="control-label col-md-3">Surgery Performed
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="surgery_type_id" id="surgery_type_id" required>
									<option value="">Select...</option>
										<!-- php: //foreach($surgeryOptions as $surgeryOption) //{ -->
											<option value="<!-- php: //= $surgeryOption->id -->"><!-- php: = $surgeryOption->name --></option>
										<!-- php: //} -->
								</SearchableSelectField>
							</div -->
					</div>
					
					<div class="form-group row">
						<label class="control-label col-md-3">Surgeon
							<span class="required"> * </span>
						</label>
						<div class="col-md-5">
							<SearchableSelectField class="form-control input-height" name="surgeon_id" id="surgeon_id" required>
								<option value="">Select...</option>
									<!-- php: foreach($surgeons as $surgeon) { -->
										<option value="<!-- php: = $surgeon->id -->"><!-- php: = $surgeon->full_name --></option>
									<!-- php: } -->
							</SearchableSelectField>
						</div>
					</div>
					
					<div class="form-group row">
						<label class="control-label col-md-3">Anaesthesia
							<span class="required"> * </span>
						</label>
						<div class="col-md-5">
							<SearchableSelectField class="form-control input-height" name="anaesthesia_id" id="anaesthesia_id" required>
								<option value="">Select...</option>
									<!-- php: foreach($anaesthesia as $anaesthesia) { -->
										<option value="<!-- php: = $anaesthesia->id -->"><!-- php: = $anaesthesia->name --></option>
									<!-- php: } -->
							</SearchableSelectField>
						</div>
					</div>
					
					<!--<div class="form-group row">
						<label class="control-label col-md-3">Comment
							<span class="required"> * </span>
						</label>
						<div class="col-md-8">
								<textarea name="comments" id="surgcomments" placeholder="doctor notes" class="form-control-textarea" rows="5"  required></textarea>
							</div>
					</div>-->
					
					<div class="form-group row">
						<label class="control-label col-md-3">Surgery notes
							
						</label>
						<div class="col-md-8">
								<textarea name="surgery_notes" id="surgery_notes" placeholder="Notes for the surgery" class="form-control-textarea" rows="5" ></textarea>
							</div>
					</div>
					
					<div class="form-group row">
						<label class="control-label col-md-3">Post-surgery condition
							
						</label>
						<div class="col-md-8">
								<textarea name="post_surgery_condition" id="post_surgery_condition" placeholder="Post-surgery condition of patient" class="form-control-textarea" rows="5" ></textarea>
							</div>
					</div>
					
					<div class="form-group row">
						<label class="control-label col-md-3">Post-surgery instructions
							
						</label>
						<div class="col-md-8">
								<textarea name="post_surgery_instructions" id="post_surgery_instructions" placeholder="Post-surgery condition of patient" class="form-control-textarea" rows="5" ></textarea>
							</div>
					</div>
					
					<input type="hidden" id="hidden" name="request_type" value="new_surgeries">
					<div class="row">
						<div class="offset-md-4 col-md-8">
							<button type="submit" class="btn btn-info">Submit</button>
							<button type="button" class="btn btn-default" onclick = 'clearSurgery()'>Reset</button>
						</div>
					</div>
					
				<!-- php: = $this->Form->end(); -->
				</div>
			
				<div class="tab-pane active surgeries_view_surgeries" id="borderBox_tab14">
					<div class="card-body ">
						<div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width" id="surgeries_table">
								<thead>
									<tr>
										<th class="center"> Date</th>
										<th class="center"> Surgery Type </th>
										<!--<th class="center"> Name </th>-->
										<th class="center"> Comment </th>
										<th class="center"> Actions </th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($patientSurgeries as $patientSurgery): -->
									<tr class="odd gradeX">
										<td class="center"><!-- php: = $patientSurgery->surgery->date_created --></td>
										<td class="center"><!-- php: = $patientSurgery->surgery->surgery_type->name --></td>
										<!--<td class="center"><!-- php: =$patientSurgery->surgery->name --></td>-->
										<td class="center"><!-- php: =$patientSurgery->surgery->comments --></td>
										<td class="center">
											<a href="<!-- php: =$this->Url->build(['controller'=>'Surgeries','action'=>'editSurgeries',$patientSurgery->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs surgeries_edit_surgery">
												Edit
											</a>
											<a href="<!-- php: =$this->Url->build(['controller'=>'Surgeries','action'=>'viewSurgeries',$patientSurgery->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs surgeries_view_patient_surgery">
												View
											</a>
											<!--<a class="btn btn-tbl-delete btn-xs">
												<i class="fa fa-trash-o "></i>
											</a>-->
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

<script>
$(function () {
	$("#surgeries").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});


function clearSurgery(){
	$('#start_date_value').val('');
	$('#start_time_value').val('');
	$('#end_date_value').val('');
	$('#end_time_value').val('');
	$('#surgery_type_id').val('');
	$('#surgeon_id').val('');
	$('#anaesthesia_id').val('');
	$('#surgery_notes').val('');
	$('#post_surgery_condition').val('');
	$('#post_surgery_instructions').val('');
}

</script>
					

`;

export default function ElementElementPatientvisitSurgeries() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
