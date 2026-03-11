const rawHtml = `

<div class="card card-topline-<!-- php: = $theme1 -->">

<div class="card  card-box">
	<div class="card-head">
		<header>Auto Reminder Configuration</header>
	</div>
	<div class="card-body">
<div class="row">

	<div class="borderBox light bordered col-md-12">
		
		<!-- <div class="borderBox-title tabbable-line">
			<div class="caption">
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#investigations_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#investigations_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div> -->
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active" id="investigations_add">
					<div class="container px-5 mt-3">
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Patients', 'action' => 'routineCareConfig']]); -->
                    <div class="form-group row">
							<label class="control-label col-md-2">Status
								
							</label>
							<div class="col-md-5">
                                <label class="switchToggle mb-0">
                                <input name="status" id="config-stat" value="1" type="checkbox" <!-- php: = $routine_config->status == 1 ? 'checked': '' -->/>
                                <span class="slider green round"></span>
                                </label><br/>
                                <small style="color:lightgreen;font-size:13px" id="status-label">* Auto-reminders for patient routine care has been enabled</small>
							</div>
                    </div>
					<!-- First Reminder -->
					<h5 style="font-size:16px!important" class="font-weight-bold">First Reminder</h5>
						<div class="form-group row mt-3">
							<label class="control-label col-md-2">Notification
								<span class="required"> * </span>
							</label>
							<div class="col-md-5 d-flex">
                            <div class="form-check">
                            <input class="form-check-input email-check" id="email-check" name="first_notif" type="radio" value="email" <!-- php: = $routine_config->first_notif == 'email' ? 'checked' : '' -->>
                            <label class="form-check-label" for="email-check">
                                Email
                            </label>
                            </div>
                            <div class="form-check ml-3">
                                <input class="form-check-input sms-check" id="sms-check" name="first_notif" type="radio" value="sms"  <!-- php: = $routine_config->first_notif == 'sms' ? 'checked' : '' -->>
                                <label class="form-check-label" for="sms-check">
                                    SMS
                                </label>
                            </div>
                            <div class="form-check ml-3">
                                <input class="form-check-input auto-call-check" id="auto-call-check" name="first_notif" type="radio" value="autocall" <!-- php: = $routine_config->first_notif == 'autocall' ? 'checked' : '' -->>
                                <label class="form-check-label" for="auto-call-check">
                                    Automated Call
                                </label>
                            </div>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-2">Due days <span class="required">*</span>
								
							</label>
							<div class="col-md-5">
								<!-- <input type="time" name="start" id="start" data-required="0" placeholder="Enter Start" class="form-control input-height" />  -->
                                <SearchableSelectField id="first-due" name="first_due" class="form-control due_days">
									<option disabled value="">Select Option</option>
                                    <option <!-- php: = $routine_config->first_due == 7 ? "selected" : "" --> value="7">7 days</option>
                                    <option <!-- php: = $routine_config->first_due == 3 ? "selected" : "" --> value="3">3 days</option>
                                    <option <!-- php: = $routine_config->first_due == 1 ? "selected" : "" --> value="1">1 day</option>
                                </SearchableSelectField>
							</div>
						</div>
					<!-- Second Reminder -->
					<h5 style="font-size:16px!important" class="font-weight-bold">Second Reminder</h5>
						<div class="form-group row mt-3">
							<label class="control-label col-md-2">Notification
								<span class="required"> * </span>
							</label>
							<div class="col-md-5 d-flex">
                            <div class="form-check">
                            <input class="form-check-input email-check" id="email-check" name="second_notif" type="radio" value="email" <!-- php: = $routine_config->second_notif == 'email' ? 'checked' : '' -->>
                            <label class="form-check-label" for="email-check">
                                Email
                            </label>
                            </div>
                            <div class="form-check ml-3">
                                <input class="form-check-input sms-check" id="sms-check" name="second_notif" type="radio" value="sms" <!-- php: = $routine_config->second_notif == 'sms' ? 'checked' : '' -->>
                                <label class="form-check-label" for="sms-check">
                                    SMS
                                </label>
                            </div>
                            <div class="form-check ml-3">
                                <input class="form-check-input auto-call-check" id="auto-call-check" name="second_notif" type="radio" value="autocall" <!-- php: = $routine_config->second_notif == 'autocall' ? 'checked' : '' -->>
                                <label class="form-check-label" for="auto-call-check">
                                    Automated Call
                                </label>
                            </div>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-2">Due days<span class="required">*</span>
								
							</label>
							<div class="col-md-5">
								<!-- <input type="time" name="start" id="start" data-required="0" placeholder="Enter Start" class="form-control input-height" />  -->
                                <SearchableSelectField id="second-due" name="second_due" class="form-control due_days">
									<option disabled value="">Select Option</option>
                                    <option <!-- php: = $routine_config->second_due == 7 ? "selected" : "" --> value="7">7 days</option>
                                    <option <!-- php: = $routine_config->second_due == 3 ? "selected" : "" --> value="3">3 days</option>
                                    <option <!-- php: = $routine_config->second_due == 1 ? "selected" : "" --> value="1">1 day</option>
                                </SearchableSelectField>
							</div>
						</div>
					<h5 style="font-size:16px!important" class="font-weight-bold">Third Reminder</h5>
						<div class="form-group row mt-3">
							<label class="control-label col-md-2">Notification
								<span class="required"> * </span>
							</label>
							<div class="col-md-5 d-flex">
                            <div class="form-check">
                            <input class="form-check-input email-check" id="email-check" name="third_notif" type="radio" value="email" <!-- php: = $routine_config->third_notif == 'email' ? 'checked' : '' -->>
                            <label class="form-check-label" for="email-check">
                                Email
                            </label>
                            </div>
                            <div class="form-check ml-3">
                                <input class="form-check-input sms-check" id="sms-check" name="third_notif" type="radio" value="sms" <!-- php: = $routine_config->third_notif == 'sms' ? 'checked' : '' -->>
                                <label class="form-check-label" for="sms-check">
                                    SMS
                                </label>
                            </div>
                            <div class="form-check ml-3">
                                <input class="form-check-input auto-call-check" id="auto-call-check" name="third_notif" type="radio" value="autocall" <!-- php: = $routine_config->third_notif == 'autocall' ? 'checked' : '' -->>
                                <label class="form-check-label" for="auto-call-check">
                                    Automated Call
                                </label>
                            </div>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-2">Due days<span class="required">*</span>
								
							</label>
							<div class="col-md-5">
								<!-- <input type="time" name="start" id="start" data-required="0" placeholder="Enter Start" class="form-control input-height" />  -->
                                <SearchableSelectField id="third-due" name="third_due" class="form-control due_days">
									<option disabled value="">Select Option</option>
                                    <option <!-- php: = $routine_config->third_due == 7 ? "selected" : "" --> value="7">7 days</option>
                                    <option <!-- php: = $routine_config->third_due == 3 ? "selected" : "" --> value="3">3 days</option>
                                    <option <!-- php: = $routine_config->third_due == 1 ? "selected" : "" --> value="1">1 day</option>
                                </SearchableSelectField>
							</div>
						</div>
                        
						
						<div class="row">
							<div class="col-md-7 d-flex justify-content-end">
								<!-- <button id="resetOptions" type="button" class="btn btn-primary mr-2">Reset</button> -->
								<button id="update-btn" type="submit" class="btn btn-warning">Update</button>
								<!-- <button type="button" class="btn btn-default" onclick = 'clearInvestigationFields()'>Reset</button> -->
							</div>
						</div>
					<!-- php: = $this->Form->end(); -->
					</div>
				</div>
				
				<!-- <div class="tab-pane" id="investigations_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Start</th>
                                        <th class="left">End</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
													
								</tbody>
							</table>
							</div>
						</div>
					</div>
				
				</div> -->
			</div>
		</div>
		
	</div>
</div>
</div>
				</div>
				</div>
<!-- data tables -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->


<script>
	function clearInvestigationFields(){
		$('#name').val('');
		$('#description').val('');
	}
	if(!$('#config-stat').is(':checked')){
		$("#status-label").css("color", "tomato");
			$("#status-label").text("* Auto-reminders for patient has been disabled");

			// $('.email-check').attr('checked', false);
			$('.email-check').attr('disabled', true);

			// $('.sms-check').attr('checked', false);
			$('.sms-check').attr('disabled', true);

			// $('.auto-call-check').attr('checked', false);
			$('.auto-call-check').attr('disabled', true);

			// $('#first-due').val("");
			// $('#second-due').val("");
			// $('#third-due').val("");
			$('#update-btn').attr('disabled', true);
	}

    
	$('#config-stat').on('change', function(){
		if($(this).is(':checked')){
			$("#status-label").css("color", "lightgreen");
			$("#status-label").text("* Auto-reminders for patient routine care has been enabled");

			// $('.email-check').attr('checked', true);
			$('.email-check').attr('disabled',false);

			// $('.sms-check').attr('checked', true);
			$('.sms-check').attr('disabled',false);

			// $('.auto-call-check').attr('checked', true);
			$('.auto-call-check').attr('disabled',false);

			// $('#first-due').val("");
			// $('#second-due').val("");
			// $('#third-due').val("");
			$('#update-btn').attr('disabled',false);

		} else{
			$("#status-label").css("color", "tomato");
			$("#status-label").text("* Auto-reminders for patient has been disabled");

			$('.email-check').attr('checked', false);
			$('.email-check').attr('disabled', true);

			$('.sms-check').attr('checked', false);
			$('.sms-check').attr('disabled', true);

			$('.auto-call-check').attr('checked', false);
			$('.auto-call-check').attr('disabled', true);

			// $('#first-due').val("");
			// $('#second-due').val("");
			// $('#third-due').val("");
			$('#update-btn').attr('disabled', true);

			$.ajax({
				url: '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' =>'disableRoutineCareConfig']) -->',
				type: 'GET',
				success: function(res){
					console.log(res);
					// alert('hoi!');
					alertify.success(res.message);
				},
				error: function(err){
					console.log(err);
					alertify.error("An Unexpected Error Occured");
				},
			})

		}
	});
	// $('.due_days').change(function() {
	// 	var myOpt = [];
	// 	$(".due_days").each(function () {
	// 		myOpt.push($(this).val());
	// 	});
	// 	$(".due_days").each(function () {
	// 		$(this).find("option").prop('hidden', false);
	// 		var sel = $(this);
	// 		$.each(myOpt, function(key, value) {
	// 			console.log(value);
	// 			// if(sel.val() > value){
	// 			// 	console.log(value);
	// 			// }
	// 			if((value != "") && (value != sel.val()) && (sel.val() < value)) {
	// 				sel.find("option").filter('[value="' + value +'"]').prop('hidden', true);
	// 			}
	// 		});
	// 	});
	// });
//    $("#resetOptions").on("click", function(e){
//     var html = '<option selected disabled value="">Select Option</option><option value="7">7 days</option><option value="3">3 days</option><option value="1">1 day</option>';
// 	$(".due_days").html(html);
// 	alertify.success("Select Options has been reset");
//    });

//    $("#first-due").on("change", function(){
// 	var myOpt = [];
//     $(".due_days").each(function () {
//         myOpt.push($(this).val());
//     });
//     $(".due_days").each(function () {
//         $(this).find("option").prop('hidden', false);
//         var sel = $(this);
//         $.each(myOpt, function(key, value) {
//             // if((value != "") && (value != sel.val()) && (sel.val() < value)) {
//             //     sel.find("option").filter('[value="' + value +'"]').prop('hidden', true);
//             // }
// 			console.log(" value: "+value);
//             if(sel.val() < value) {
//                 sel.find("option").filter('[value="' + value +'"]').prop('hidden', true);
//                 // $("#first-due").find("option").filter('[value="' + value +'"]').prop('hidden', true);
// 				console.log(value)
//             }
//         });
//     });
//    });
</script>

`;

export default function ElementElementPatientRoutineCareConfig() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
