const rawHtml = `

<style>
	.pv-header {
		color:#000;
	}
	.pv-sub {
		color:#000;
	}
	.pv-sub h4 {
		padding-bottom:0px;
		margin-bottom:0px;
		color:#000;
		
	}
	.pv-header h4 {
		padding-bottom:0px;
		margin-bottom:0px;
		color:#e7505a;
		font-weight:bold!important;
	}
	.pv-sub hr{
		background-color:#e7505a!important;
		margin-top:0px!important;
		height:0.5px;
		border-top: solid 0.5px #e7505a; !important;
	}
	.pv-header hr {
		background-color:#e7505a!important;
		margin-top:0px!important;
		height:2px;
		border-top: solid 1px #e7505a; !important;
	}
	.pdf table.table-bordered{
    border:1px solid black!important;
    margin-top:20px;
  }
.pdf table.table-bordered > thead > tr > th{
    border:1px solid black!important;
}
.pdf table.table-bordered > tbody > tr > td{
    border:1px solid black!important;
}
body {
  -webkit-print-color-adjust: exact !important;
}
.list-bordered .list-group-item,.list-bordered .list-group
{
  border:1px solid #000!important;
}
.pdf th{
	border:1px solid #000!important;
}
.unbold {
	font-weight:normal!important;
}

.details-table td, .details-table th {
	border:none;
}	
.bold-header {
	background-color:#e7505a!important;
}
</style>

<div>
	<!-- new header -->
	<table class="table details-table">
		<tr>
		 <td>
		<div>
		<!-- php: //= $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 80px;', 'fullBase' => true]) --><br/>
		
					<small>
						<!-- php: = $inst_name->address -->
						</small><br/>
						<small>
						Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email: <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 --> 
				        </small>
                    
		</div>
</td>
		
		<td>
		
				<!-- php: // $pic = $patient->has('image') && $patient->image->file_path != null ? $patient->image->file_path : (($patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'); // echo $this->Html->image($pic,['style' =>'width: 100px; height: auto', 'fullBase' ... -->
			
</td>
		</tr>
</table>
	<!-- end new header -->
	<div class="row d-none">
		<div class="col-md-12">
			<center><!-- php: //= $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 80px', 'fullBase' => true]) --></center>
		</div>
	</div>
	<div class="row d-none">
		<div class="col-md-12">
			<div class="pull-left" style="float: left">
				<address>
					<p class="text-muted m-l-5">
						<!-- php: = $this->Text->autoParagraph($inst_name->address) -->
					</p>
				</address>
			</div>
			<div class="pull-right text-right">
				<address>
					<p class="text-muted m-l-30">
						Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email: <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 --> 
					</p>
				</address>
			</div>
		</div>
	</div>
	<div style="clear: both"></div>
	<hr style="height: 5px; margin-top: 20px; margin-bottom: 2px">
	<div class="row">
		<div class="col-md-12">
			<div class="d-none" style="float: left; width 140px; padding: 5px 10px 10px 0; margin-right: 10px">
				<!-- php: // $pic = $patient->has('image') && $patient->image->file_path != null ? $patient->image->file_path : (($patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'); // echo $this->Html->image($pic,['style' =>'width: 120px; height: auto', 'fullBase' ... -->
			</div>
			<div class="bold-header" class="container my-3">
				<h4 class="my-0 pb-0">Summary</h4>
			</div>
			<table class="details-table table">
			<tr>
				<td>
                 <h5 class="bold">Name:&nbsp;
				 <span class="unbold" ><!-- php: = $patient->first_name.' '. $patient->last_name --></span></h5>
</td>
				<td>
				<h5 class="bold">Age:&nbsp;
				 <span class="unbold"><!-- php: = isset($patient->date_of_birth) ? $patient->age . ' Years' : 'N/A' --></span></h5>
</td>
				<td>
                 <h5 class="bold">Folder Number:&nbsp;
				 <span class="unbold"><!-- php: = $patient->folder_number --></span></h5>
</td>
</tr>
			<tr>
				<td>
				<h5 class="bold">Address:&nbsp;
				 <span class="unbold"><!-- php: = $patient->home_address --></span></h5>
</td>
				<td>
				<h5 class="bold">Gender:&nbsp;
				 <span class="unbold"><!-- php: = $patient->gender->name --></span></h5>
</td>
				<td>
				<h5 class="bold">Date:&nbsp;
				 <span class="unbold"><!-- php: = $selectedVisit->date_created->nice() --></span></h5>
</td>
			
</tr>
<tr>
<td>
				<h5 class="bold">Type of Visit:&nbsp;
				 <span class="unbold"><!-- php: = $selectedVisit->has('patient_visit_purpose') ? $selectedVisit->patient_visit_purpose->name : 'N/A' --></span>
</h5></td>
				<td>
				<h5 class="bold">Contact Number:&nbsp;
				 <span class="unbold"><!-- php: = $patient->phone --></span></h5>
</td>
<td>
<h5 class="bold">Attending Doctor:&nbsp;
			   <span class="unbold">
			   <!-- php: $doctorForPatient = ''; foreach($selectedVisit->queue as $queue) { if($queue->status_id == 21) { $doctorForPatient = ($doctorForPatient == '' ? $queue->assigned_user->full_name : (', ' . $queue->assigned_user->full_name)); } } echo $doctorF... -->
			   </span></h5>
</td>
</tr>
</table>

			
			
          
		</div>
	</div>
	<div class="row d-none" style="margin-top: 5px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4 class="font-weight-bold">Triaging Management</h4>
			<hr/>
		</div>
	</div>
	
		<h5 class="profile-usertitle-name font-weight-bold ml-1" style="font-size: 16px; margin-top:0px!important;padding-left:5px;padding-bottom:30px"><span>Triage:</span> <span class="badge" style="background-color:<!-- php: = $triage -->!important;border:1px solid <!-- php: = $triage -->!important; height:30px;width:30px;">&nbsp;&nbsp;&nbsp;</span></h5>
		
		<div class="bold-header" class="container my-3">
				<h4 class="my-0 pb-0">Details</h4>
		</div>
	<!-- php: // displays diagnoses if available :) -->
   <!-- php: if(is_array($selectedVisit->patient_visit_diagnoses) && sizeof($selectedVisit->patient_visit_diagnoses) > 0){ -->
	<div class="row mt-4" style="">
		<div class="col-md-12 pv-header">
			<h4 class="font-weight-bold">Diagnoses</h4>
			<hr/>
		</div>
	</div>
	

	<div class="row">
		<div class="col-md-12 pdf">
			<table class="table-bordered table">
					   <tr>
						   <th>Date</th>
						   <th>Diagnoses(Note)</th>
						   <th>Primary Diagnoses</th>
						   <th>Differential Diagnoses</th>
						   <th>Clinical Summary</th>
						   <th>Procedure</th>
					   </tr>
					    
								<!-- php: foreach ($selectedVisit->patient_visit_diagnoses as $visitDiagnosis): -->
									
									<tr class="odd gradeX">
										<td class="center" style="vertical-align: top"><!-- php: = $visitDiagnosis->date_created->nice() --></td>
										<td class="left" style="vertical-align: top"><!-- php: = $visitDiagnosis->diagnosis_text." ".$visitDiagnosis->code --></td>
										
										<td class="left" style="vertical-align: top">
											<!-- php: //= $visitDiagnosis->has('primary_diagnosis') ? $visitDiagnosis->primary_diagnosis->name : 'N/A' -->
											<!-- php: $countPD = 1; foreach($visitDiagnosis->patient_visit_primary_diagnoses as $primaryDiagnosis) { if($countPD > 1) { -->
														<br/> 
											<!-- php: } echo $countPD . '. ' . ($primaryDiagnosis->has('primary_diagnosis') ? $primaryDiagnosis->primary_diagnosis->name ." (".$primaryDiagnosis->primary_diagnosis->code.")" : 'N/A'); $countPD++; } -->
										</td>
										<td class="left" style="vertical-align: top">
											<!-- php: $countSD = 1; foreach($visitDiagnosis->patient_visit_secondary_diagnoses as $secondaryDiagnosis) { if($countSD > 1) { -->
														<br/> 
											<!-- php: } echo $countSD . '. ' . ($secondaryDiagnosis->has('secondary_diagnosis') ? $secondaryDiagnosis->secondary_diagnosis->name ." (".$secondaryDiagnosis->secondary_diagnosis->code.")" : 'N/A'); $countSD++; } -->
										</td>											
										<td class="center" style="vertical-align: top"><!-- php: = $visitDiagnosis->clinical_summary --></td>	
										<td class="left" style="vertical-align: top">
											<!-- php: $countPR = 1; foreach($visitDiagnosis->patient_visit_procedures as $procedure) { if($countPR > 1) { -->
														<br/>
											<!-- php: } echo $countPR . '. ' . ($procedure->has('procedure') ? $procedure->procedure->name : 'N/A'); $countPR++; } -->
										</td>
										
										
									</tr>
								<!-- php: endforeach; -->									
								</tbody>
							</table>

								
							
				   </table>	
			<div class="row">
			
			
			<div class="col-md-4 px-4 d-flex align-items-center pdf">
			   <h5 class="bold d-none">Diagnoses</h5>&nbsp;
			   <span> 
				   
			   
			   </span>		
			</div>
			
			
		</div>
		
		</div>
	</div>
	<!-- php: } -->
	<div class="row d-none" style="margin-top: 5px;">
	<div class="col-md-12 pv-header">
			<h4 class="font-weight-bold">Details</h4>
			<hr/>
		</div>
	</div>

	<!-- Start Vitals Report -->
	
	<!-- php: // displays vitals if available -->
	<!-- php: if(is_array($selectedVisit->patient_visit_vitals) && sizeof($selectedVisit->patient_visit_vitals) > 0){ -->
	<div class="row" style="margin-top: 0px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4 class="font-weight-bold">Vitals</h4>
			<hr/>
		</div>
	</div>
	

	

	<div class="row">
		<div class="col-md-12 pdf">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Date/Time</th>
						<th>BP</th>
						<th>Pulse</th>
						<th>RR</th> 
						<th>Temp</th> 
						<th>SpO<sub>2</sub></th> 
						<th>Wt</th> 
						<th>BMI</th>
					</tr>
				</thead>
				<tbody>
					
					<!-- php: $lastVital = sizeof($selectedVisit->patient_visit_vitals) > 0 ? $selectedVisit->patient_visit_vitals[sizeof($selectedVisit->patient_visit_vitals) - 1] : null; foreach($selectedVisit->patient_visit_vitals as $lastVital) { -->
						<tr>
							<td><!-- php: = $lastVital->date_created != null ? $lastVital->date_created->i18nFormat('Y-MM-dd HH:mm') : '' --></td>
							<td><!-- php: = $lastVital->blood_pressure_1 -->/<!-- php: = $lastVital->blood_pressure_2 --> </td>
							<td><!-- php: = $lastVital->pulse --> bpm</td>
							<td><!-- php: = $lastVital->respiratory_rate --> cpm</td>
							<td><!-- php: = $lastVital->temperature --> <sup>o</sup>C</td>
							<td><!-- php: = $lastVital->oxygen_saturation --> </td>
							<td><!-- php: = $lastVital->weight --> Kg</td>
							<td><!-- php: = $lastVital->bmi --></td>
							
						</tr>
					<!-- php: } -->
				</tbody>
			</table>
		</div>
	</div>
	<!-- php: } -->
	<!-- End Vital Report -->

	<!-- Start History Report -->
	<!-- php: // display health history if available -->
	<!-- php: if($selectedVisit->patient->patient_history_contraceptions !=null || $selectedVisit->patient->patient_history_drugs !=null || $selectedVisit->patient->patient_history_families !=null || $selectedVisit->patient->patient_history_gynaecologics... -->
	<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4 class="font-weight-bold">Health History</h4>
			<hr/>
		</div>
	</div>
	<!-- php: } -->

	

    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_contraceptions) && sizeof($selectedVisit->patient->patient_history_contraceptions) > 0) { $patientHistoryContraceptions = $selectedVisit->patient->patient_history_c... -->
	<div class="row">
		<div class="col-md-12 pdf">
			<div class="table-scrollable">
                <h5 class="font-weight-bold">Contraceptions History</h5>
				<table class="table table-hover table-bordered table-checkable order-column full-width" id="illnesses_table">
					<thead>
						<tr>
							<th scope="col" style="text-align: left; padding-left: 10px;">No</th>
							<th scope="col">Contraception Type</th>
							<th scope="col">Date Started</th>
							<th scope="col">Duration</th>
							<th scope="col">Complications</th>
						</tr>
					</thead>
					<tbody>
					<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryContraceptions as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td style="text-align: left; padding-left: 10px;"><!-- php: = $i --></td>
							<td><!-- php: = $value->has('contraception_type') ? $value->contraception_type->name : '' --></td>
							<td><!-- php: = ($value->date_started != null) ? $value->date_started->i18nFormat('dd/MM/Y') : $value->date_started --></td>
							<td><!-- php: = $value->duration --></td>
							<td><!-- php: = $value->complications --></td>
						</tr>												
						<!-- php: endforeach; -->
					
						
					</tbody>
				</table>
			</div>
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_drugs) && sizeof($selectedVisit->patient->patient_history_drugs) > 0) { $patientHistoryDrugs = $selectedVisit->patient->patient_history_drugs; -->
	<div class="row">
		<div class="col-md-12 pdf">
			<div class="table-scrollable">
                <h5 class="font-weight-bold">Drugs History</h5>
				<table class="table table-hover table-bordered table-checkable order-column full-width" id="drugs_table">
					<thead>
						<tr>
							<th scope="col" style="text-align: left; padding-left: 10px;">No</th>
							<th scope="col">Current</th>
							<th scope="col">Past</th>
							<th scope="col">Herbal</th>
							<th scope="col">Allergies</th>
							<th scope="col">Vacinations</th>
						</tr>
					</thead>
					<tbody>
					<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryDrugs as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td style="text-align: left; padding-left: 10px;"><!-- php: = $i --></td>
							<td><!-- php: = $value->current_medication --></td>
							<td><!-- php: = $value->past_medication --></td>
							<td><!-- php: = $value->herbal_medication --></td>
							<td><!-- php: = $value->allergies --></td>
							<td><!-- php: = $value->vaccination --></td>
						</tr>
						<!-- php: endforeach; -->
					
					</tbody>
				</table>
			</div>		
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_families) && sizeof($selectedVisit->patient->patient_history_families) > 0) { $familyHistory = $selectedVisit->patient->patient_history_families[0]; -->
	<div class="row">
		<div class="col-md-12 list-bordered">
            <h5 class="font-weight-bold mt-4">Family History</h5>
            <div class="row mt-3">
                <div class="col-md-4">
                    <h5>Mother</h5>
                    <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Status</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->mother_status : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Age</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->mother_age : 'N/A') --> years&nbsp;&nbsp;</a>
                        </li>
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->mother_condition : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4">
                    <h5>Father</h5>
                    <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Status</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->father_status : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Age</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->father_age : 'N/A') --> years&nbsp;&nbsp;</a>
                        </li>
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->father_condition : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4">
                    <h5>Spouse</h5>
                    <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Status</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->spouse_status : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Age</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->spouse_age : 'N/A') --> years&nbsp;&nbsp;</a>
                        </li>
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->spouse_condition : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                    </ul>
                </div>
			</div>	
			<div class="row mt-5">
			<div class="col-md-6" style="margin-top: 20px;">
                    <h5>Children</h5>
                    <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Number of Children</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->number_of_children : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->children_condition : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-6" style="margin-top: 20px;">
                    <h5>Other Details</h5>
                    <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">
                            &nbsp;&nbsp;<b>Details</b> <a class="pull-right"><!-- php: = (isset($familyHistory) ? $familyHistory->other_details : 'N/A') -->&nbsp;&nbsp;</a>
                        </li>
                    </ul>
                </div>
			</div>	
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_gynaecologics) && sizeof($selectedVisit->patient->patient_history_gynaecologics) > 0) { $gynaecologicalHistory = $selectedVisit->patient->patient_history_gynaecolog... -->
	<div class="row" style="margin-top: 30px;">
		<div class="col-md-12 list-bordered">
            <h5 class="font-weight-bold">Gynaecological History</h5>
			
            <ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Date of last menstrual period</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) && $gynaecologicalHistory->date_of_last_menstrual_period != null ? $gynaecologicalHistory->date_of_last_menstrual_period->i18nFormat('yyyy-MM-dd') : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Menarche</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->menarche : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Menopause</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->menopause : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h5 class="font-weight-bold mt-4" style="margin-left: 10px">Menses</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cycle Length (days)</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->cycle_length : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Duration of Bleed (days)</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->duration_of_bleed : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Volume</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->volume : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Intermenstrual Bleeding</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->intermenstrual_bleeding : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Intermenstrual Bleeding Details</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->intermenstrual_bleeding_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dysmenorrhoea</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->dysmenorrhoea : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dysmenorrhoea Details</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->dysmenorrhoea_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Post Coital Bleeding</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->post_coital_bleeding : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Post Coital Bleeding Details</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->post_coital_bleeding_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dyspareunia</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->dyspareunia : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dyspareunia Details</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->dyspareunia_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h5 class="font-weight-bold mt-4" style="margin-left: 10px">Others</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Number of Lifetime Sexual Partners</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->number_of_lifetime_sexual_partners : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Coital Frequency (Days per Week)</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->coital_frequency : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cervical Cancer Screening</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->cervical_cancer_screening : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cervical Cancer Screening Details</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->cervical_cancer_screening_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Breast Screening</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->breast_screening : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Breast Screening Details</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->breast_screening_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Previous Gynaecologic Procedures</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->previous_gynaecologic_procedures : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Previous Gynaecologic Procedures Details</b> <a class="pull-right"><!-- php: = (isset($gynaecologicalHistory) ? $gynaecologicalHistory->previous_gynaecologic_procedures_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>	
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_surgeries) && sizeof($selectedVisit->patient->patient_history_surgeries) > 0) { $patientHistorySurgeries = $selectedVisit->patient->patient_history_surgeries; -->
	<div class="row">
		<div class="col-md-12 pdf">
			<div class="table-scrollable">
			<h5 class="font-weight-bold mt-4">Surgical History</h5>
				<table class="table table-hover table-checkable order-column full-width table-bordered" id="surgeries_table">
					<thead>
						<tr>
							<th scope="col" style="text-align: left; padding-left: 10px;">No</th>
							<th scope="col">Details</th>
						</tr>
					</thead>
					<tbody>
					<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistorySurgeries as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td style="text-align: left; padding-left: 10px;"><!-- php: = $i --></td>
							<td><!-- php: = $value->description --></td>
						</tr>
						<!-- php: endforeach; -->
					
					</tbody>
				</table>
			</div>		
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_haemotransfusions) && sizeof($selectedVisit->patient->patient_history_haemotransfusions) > 0) { $patientHistoryHaemotransfusions = $selectedVisit->patient->patient_... -->
	<div class="row">
		<div class="col-md-12 pdf">
			<div class="table-scrollable">
			<h5 class="font-weight-bold">Haemotransfusions History</h5>
				<table class="table table-hover table-checkable table-bordered order-column full-width" id="haemo_table">
					<thead>
						<tr>
							<th scope="col" style="text-align: left; padding-left: 10px;">No</th>
							<th scope="col">Details</th>
						</tr>
					</thead>
					<tbody>
					<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryHaemotransfusions as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td style="text-align: left; padding-left: 10px;"><!-- php: = $i --></td>
							<td><!-- php: = $value->description --></td>
						</tr>
						<!-- php: endforeach; -->
					</tbody>
				</table>
			</div>		
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_illnesses) && sizeof($selectedVisit->patient->patient_history_illnesses) > 0) { $patientHistoryIllnesses = $selectedVisit->patient->patient_history_illnesses; -->
	<div class="row">
		<div class="col-md-12 pdf">
			<div class="table-scrollable">
			<h5 class="font-weight-bold">Illnesses History</h5>
				<table class="table table-hover table-checkable table-bordered order-column full-width" id="illnesses_table">
					<thead>
						<tr>
							<th scope="col" style="text-align: left; padding-left: 10px;">No</th>
							<th scope="col">Illness</th>
							<th scope="col">Duration</th>
							<th scope="col">Comment</th>
						</tr>
					</thead>
					<tbody>
					<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryIllnesses as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td style="text-align: left; padding-left: 10px;"><!-- php: = $i --></td>
							<td><!-- php: = $value->has('illness') ? $value->illness->name : '' --></td>
							<td><!-- php: = $value->duration --></td>
							<td><!-- php: = $value->comment --></td>
						</tr>						
						<!-- php: endforeach; -->
					</tbody>
				</table>
			</div>		
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_pregnancies) && sizeof($selectedVisit->patient->patient_history_pregnancies) > 0) { $patientHistoryPregnancies = $selectedVisit->patient->patient_history_pregnancie... -->
	<div class="row">
		<div class="col-md-12 pdf">
			<div class="table-scrollable">
			<h5 class="font-weight-bold">Pregnancy History</h5>
				<table class="table table-hover table-checkable order-column full-width table-bordered" id="pregnancy_table">
					<thead>
						<tr>
							<th scope="col" style="text-align: left; padding-left: 10px;">No</th>
							<th scope="col">Date</th>
							<th scope="col">Conception Mode</th>
							<th scope="col">Delivery Mode</th>
							<th scope="col">Outcome</th>
							<th scope="col">Complications</th>
							<th scope="col">Sex</th>
							<th scope="col">Weight (KG)</th>
						</tr>
					</thead>
					<tbody>
						
					<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryPregnancies as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td style="text-align: left; padding-left: 10px;"><!-- php: = $i --></td>
							<td><!-- php: = $value->date_conceived->i18nFormat('yyyy-MM-dd') --></td>
							<td><!-- php: = $value->mode_of_conception --></td>
							<td><!-- php: = $value->mode_of_delivery --></td>
							<td><!-- php: = $value->outcome --></td>
							<td><!-- php: = $value->pregnancy_complications --></td>
							<td><!-- php: = $value->has('gender') ? $value->gender->name : '' --></td>
							<td><!-- php: = $value->weight --></td>
						</tr>						
													
						<!-- php: endforeach; -->
						
					</tbody>
				</table>
			</div>		
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_obstetrics) && sizeof($selectedVisit->patient->patient_history_obstetrics) > 0) { $obstetricHistory = $selectedVisit->patient->patient_history_obstetrics[0]; -->
	<div class="row" style="margin-top: 30px;">
		<div class="col-md-12 list-bordered">
		<h5 class="font-weight-bold" style="margin-left: 10px;">Obstetric History</h5>
            <ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Date of last menstrual period</b> <a class="pull-right"><!-- php: = (isset($obstetricHistory) ? $obstetricHistory->date_of_last_menstrual_period->i18nFormat('yyyy-MM-dd') : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Date of positive pregnancy test</b> <a class="pull-right"><!-- php: = (isset($obstetricHistory) ? $obstetricHistory->date_of_positive_pregnancy_test->i18nFormat('yyyy-MM-dd') : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Confirmatory Ultrasound Scan</b> <a class="pull-right"><!-- php: = (isset($obstetricHistory) ? $obstetricHistory->confirmatory_ultrasound_scan : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Date of scan</b> <a class="pull-right"><!-- php: = (isset($obstetricHistory) && isset($obstetricHistory->date_of_scan) ? $obstetricHistory->date_of_scan->i18nFormat('yyyy-MM-dd') : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Gestational Age</b> <a class="pull-right"><!-- php: = (isset($obstetricHistory) ? $obstetricHistory->gestational_age : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>EDD</b> <a class="pull-right"><!-- php: = (isset($obstetricHistory) ? $obstetricHistory->edd : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>	
		</div>
	</div>
    <!-- php: } -->
    
    <!-- php: if($selectedVisit != null && isset($selectedVisit->patient->patient_history_social) && sizeof($selectedVisit->patient->patient_history_social) > 0) { $socialHistory = $selectedVisit->patient->patient_history_social[0]; -->
	<div class="row" style="margin-top: 30px;">
		<div class="col-md-12 list-bordered">
		<h5 class="font-weight-bold" style="margin-left: 10px;">Obstetric History</h5>
            <ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Occupation</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->occupation : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Residence</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->residence : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Family Circumstance</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->family_circumstance : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Religion</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->religion : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Hobbies</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->hobbies : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Alcohol Intake</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->alcohol_intake : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Alchohol Details</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->alcohol_details : 'N/A') --> years&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Tobacco Intake</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->tobacco_intake : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Tobacco Details</b> <a class="pull-right"><!-- php: = (isset($socialHistory) ? $socialHistory->tobacco_details : 'N/A') --> years&nbsp;&nbsp;</a>
				</li>
			</ul>	
		</div>
	</div>
    <!-- php: } -->
    
	<!-- End History Report -->

	<!-- Start History Report -->
	<!-- php: //displays when notes are available -->
	<!-- php: if($selectedVisit->patient_visit_doctor_notes != null){ -->
	<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4>Notes</h4>
			<hr/>
		</div>
	</div>
	<!-- php: } -->

	

	<div class="row">
		<div class="col-md-12">
			<!-- php: foreach ($selectedVisit->patient_visit_doctor_notes as $doctorNote): echo '<h5>' . $doctorNote->title . '</h5>'; echo '<p>' . $doctorNote->notes . '</p>'; endforeach; -->
			
		</div>
	</div>
	<!-- End History Report -->

	<!-- Start Examination Report -->
	<!-- php: //displays when examinations are available -->
	<!-- php: if($selectedVisit->patient_examination_general !=null){ -->
	<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4>Examination</h4>
			<hr/>
		</div>
	</div>
	<!-- php: } -->

	

	<div class="row">
		<div class="col-md-12 pdf">
			<!-- php: $patientExam = $selectedVisit->has('patient_examination_general') ? $selectedVisit->patient_examination_general : null; if($patientExam != null) { -->
				<table class="table table-bordered">
					<tbody>
						<tr>
							<th style="width: 250px">Temperature:</th> 
							<td><!-- php: = (isset($patientExam) ? $patientExam->temperature : 'N/A') --></td>
						</tr>
						<tr>
							<th style="width: 250px">Pulse:</th> 
							<td><!-- php: = (isset($patientExam) ? $patientExam->pulse : 'N/A') --></td>
						</tr>
						<tr>
							<th style="width: 250px">Respiratory Rate:</th> 
							<td><!-- php: = (isset($patientExam) ? $patientExam->respiratory_rate : 'N/A') --></td>
						</tr>
						<tr>
							<th style="width: 250px">Hydration:</th> 
							<td><!-- php: = (isset($patientExam) ? $patientExam->hydration : 'N/A') --></td>
						</tr>
						<tr>
							<th style="width: 250px">Distress:</th> 
							<td><!-- php: = (isset($patientExam) ? $patientExam->distress : 'N/A') --></td>
						</tr>
						<tr>
							<th style="width: 250px">Mental State:</th> 
							<td><!-- php: = (isset($patientExam) ? $patientExam->mental_state : 'N/A') --></td>
						</tr>
						<tr>
							<th style="width: 250px">Constitution:</th> 
							<td><!-- php: = (isset($patientExam) ? $patientExam->constitution : 'N/A') --></td>
						</tr>
					</tbody>
				</table>
			<!-- php: } -->
		</div>
	</div>
	<!-- End Examination Report -->

	<!-- Start Investigations Report -->
	<!-- php: // display if investigation is available -->
	<!-- php: if($selectedVisit->request_labs != null){ -->
	<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4>Investigations</h4>
			<hr/>
		</div>
	</div>
	<!-- php: } -->
  


	<div class="row">
		<div class="col-md-12 pdf">
			<!-- php: $patientLabs = $selectedVisit->request_labs; if(is_array($patientLabs) && sizeof($patientLabs) > 0) { -->
				<table class="table table-bordered">
					<thead>
						<tr>
							<th><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' --></th>
							<th>Lab Test</th>
							<th>Status</th>
							<th>Comment</th>
							<th>Result</th>
						</tr>
					</thead>
					<tbody>
						<!-- php: foreach ($patientLabs as $requestLabItem) { -->
						<tr>
							<td><!-- php: = $requestLabItem->has('investigation') ? $requestLabItem->investigation->name : '' --></td>
							<td><!-- php: = $requestLabItem->has('lab_test') ? $requestLabItem->lab_test->name : '' --></td>
							<td><!-- php: = $requestLabItem->has('status') ? $requestLabItem->status->name : '' --></td>
							<td><!-- php: = h($requestLabItem->comment) --></td>
							<td><!-- php: = h($requestLabItem->result) --></td>
						</tr>
						<!-- php: } -->
					</tbody>
				</table>
			<!-- php: } -->
		</div>
	</div>
	<!-- End Investigations Report -->

	<!-- Start Treatment Plan Report -->
	<!-- php: //display treatment when available -->
	<!-- php: if($selectedVisit->patient_visit_treatments !=null){ -->
	<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4 class="font-weight-bold">Treatment Plan</h4>
	<hr/>
		</div>
	</div>
	<!-- php: } -->


	<div class="row">
		<div class="col-md-12">
			<!-- php: if(sizeof($selectedVisit->patient_visit_treatments) > 0) { foreach ($selectedVisit->patient_visit_treatments as $patientTreatment) { echo '<p>' . $patientTreatment->treatment_plan . '</p>'; } } -->
			
			
		</div>
	</div>
	<!-- End Treatment Plan Report -->

	<!-- Start Medications Report -->
	<!-- php: //display medications if available $patientMedications = $selectedVisit->request_medications; -->
	<!-- php: if(sizeof($patientMedications) > 0){ -->
	<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12 pv-header">
			<h4 class="font-weight-bold">Medications</h4>
	        <hr/>
		</div>
	</div>
	<!-- php: } -->


	<div class="row">
		<div class="col-md-12 pdf">

			<div class="table-scrollable ">
				<table class="table table-hover order-column full-width new_prescription_table" id="reports_medications_table">
					<thead>
						<tr>
							<th scope="col">Date Created</th>
							<th scope="col">Type</th>
							<th scope="col">Order Name</th>
							<th scope="col">Order Status</th>
							<th scope="col">Order Details</th>
							<th scope="col">Charges</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>



				</table>
			</div>
		</div>
	</div>
	<!-- End Medications Report -->

</div>
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->

<script type="text/javascript">
	function reportsTab() {
        table = $('#reports_medications_table').DataTable();
        table.destroy();
        $('#reports_medications_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": false,
            "ordering": false,
            "paging": false,
            "ajax": "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getAllMedications', $patient->id, $selectedVisit->id, ]) -->",
            /*
            "ajax": {
            	"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
            	"error": function (xhr, error, thrown) {
            		console.log( 'Error loading medication table' );
            	}
            }
            */
        });
    };
	reportsTab()
</script>
`;

export default function ElementElementPatientvisitReportVisitReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
