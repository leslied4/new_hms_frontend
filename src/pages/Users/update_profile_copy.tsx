import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Users/update_profile_copy.php';
const rawHtml = `
<!-- start page content -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			<div class="card-head">
				<header>My Profile - <small>: <!-- php: = $editUser->first_name . ' ' . $editUser->last_name --></small></header>
				<!-- </?php echo $editUser; ?> -->
			</div>
			<div class="card-body" id="bar-parent">
				<!-- php: = $this->Form->create($editUser, ['type' => 'file']); -->
					<div class="form-body">
						<div class="row">
							<div class="col-md-6" style="background: #fcfcfc; border-radius: 7px; margin-bottom: 10px">
								<label class="control-label">Change Passport Picture</label>
								<div class="row">
									<div class="profile-userpic">
										<!-- php: = $this->Html->image(isset($editUser->image) ? $editUser->image->file_path : 'dp1.jpg',['class' =>'img-responsive', 'id' => 'passport-image', 'style' => 'width: 180px; height: 180px']); -->
									</div>
								</div>
								
								<div class="profile-usertitle">
									<div class="profile-usertitle-name">
										<input type="file" name="image" id="image" onchange="javascript:readURL(this, 'passport-image');" class="btn btn-circle" accept=".jpg,.jpeg" />
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">First Name
										<span class="required"> * </span>
									</label>
									<div class="col-md-8">
										<input type="text" name="first_namereadonlyreadonly" disabled data-required="1" placeholder="" value="<!-- php: =$editUser->first_name --> " class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Last Name
										<span class="required"> * </span>
									</label>
									<div class="col-md-8">
										<input type="text" name="last_namereadonly" disabled data-required="1" placeholder="" value="<!-- php: =$editUser->last_name --> " class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Gender
										<span class="required"> * </span>
									</label>
									<div class="col-md-8">
										<SearchableSelectField class="form-control input-height" disabled value="<!-- php: =$editUser->gender->name --> " name="gender_idreadonly">
											<!--<option value="">Select...</option>-->
											<!-- php: foreach($genders as $gender) { -->
											<option value="<!-- php: =$gender->id -->"><!-- php: =$gender->name --></option>
											<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Mobile No.
										<span class="required"> * </span>
									</label>
									<div class="col-md-8">
										<input name="phonereadonly" disabled type="text" placeholder="mobile number" value="<!-- php: =$editUser->phone --> " class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Email
									</label>
									<div class="col-md-8">
										<div class="input-group">
											<span class="input-group-addon">
													<i class="fa fa-envelope"></i>
												</span>
											<input type="text" class="form-control input-height" name="emailreadonly" disabled value="<!-- php: =$editUser->email --> " placeholder="Email Address"> </div>
									</div>
								</div>
							</div>							
						</div>

						<hr style="margin-top: 0"/>
						
						<!-- <h4 class="mb-2">Theme Preference, Consultations & Availability</h4> -->
						
						<div class="row">
							<div class="col-md-4">
								<h4>Theme Preference</h4>
								<div class="form-group row">
									<!-- <label class="control-label col-md-4">Color
										
									</label> -->
									<div class="col-md-12">
										<SearchableSelectField class="form-control input-height selectpicker" name="theme">
											<option value="">Default</option>
											<!-- php: foreach(Cake\Core\Configure::read('THEME_OPTIONS', []) as $key => $value) { -->
													<option <!-- php: = trim($editUser->theme1 . '_' . $editUser->theme2) == $key ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $value --></option>
											<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
							</div>
							<!-- php: if($editUser->role_id == 1 ){ -->
								<div class="col-md-4">
									<h4>Consultations</h4>
									<div class="form-group row">
										<!-- <label class="control-label col-md-4">Consultations
											
										</label> -->
			
										<div class="col-md-12">
											<SearchableSelectField class="form-control input-height" name="consultation_id[]" id="consultation_id" multiple>
												<option value="">Select</option>
												
											</SearchableSelectField>
										</div>
									</div>
								</div>
								<div class="col-md-4">
									<h4>Availability</h4>
									<div class="form-group row">
										<!-- <label class="control-label col-md-4">Availability
											
										</label> -->
										
										<div class="col-md-12">
											<SearchableSelectField class="form-control input-height" name="booking_timeslot_id[]" id="booking_timeslot_id" multiple>
												<option value="">Select</option>
											</SearchableSelectField>
										</div>
									</div>
								</div>
							<!-- php: } -->	
						</div>

						<!-- php: if (false) { -->
						<h4>Login Details</h4>
						
						<div class="row">
							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Username
										<span class="required"> * </span>
									</label>
									<div class="col-md-8">
										<input type="text" name="usernamereadonly" disabled data-required="1" placeholder="" value="<!-- php: =$editUser->username --> " class="form-control input-height" /> </div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Status
										<span class="required"> * </span>
									</label>
									<div class="col-md-8">
										<!-- php: $USER_STATUSES = [ 1 => 'ENABLED', 2 => 'DISABLED', ]; -->
										<SearchableSelectField class="form-control input-height" disabled value="<!-- php: =$USER_STATUSES[$editUser->status->id] -->" name="status_idreadonly">
											<!--<option value="">Select...</option>-->
											<!-- php: foreach($USER_STATUSES as $key => $value) { -->
											<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
											<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>	
							</div>
						</div>
						
						<hr style="margin-top: 0"/>

						<h4>Bank Details</h4>

						<div class="row">
							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Bank
									</label>
									<div class="col-md-8">
										<input type="text" name="bankreadonly" disabled id="bank" value="<!-- php: = $editUser->bank -->" data-required="0" placeholder="Enter Bank Name" class="form-control input-height" /> 
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Bank Branch
									</label>
									<div class="col-md-8">
										<input type="text" name="bank_branchreadonly" disabled id="bank_branch" value="<!-- php: = $editUser->bank_branch -->" data-required="0" placeholder="Enter Bank Branch Name" class="form-control input-height" /> 
									</div>
								</div>
							</div>

							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Account_number
									</label>
									<div class="col-md-8">
										<input type="text" name="account_numberreadonly" disabled id="account_number" value="<!-- php: = $editUser->account_number -->" data-required="0" placeholder="Enter Account Number" class="form-control input-height" /> 
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Account Type
									</label>
									<div class="col-md-8">
										<input type="text" name="account_typereadonly" disabled id="account_type" value="<!-- php: = $editUser->account_type -->" data-required="0" placeholder="Enter Account Type" class="form-control input-height" /> 
									</div>
								</div>
							</div>
						</div>
						<!-- php: } -->

						<hr style="margin-top: 0"/>
			
						<div class="form-actions">
							<div class="row">
								<div class="offset-md-3 col-md-9">
									<button type="submit" id="submit" class="btn btn-info">Submit</button>
									<a href="<!-- php: =$this->Url->build(['controller'=>'Home','action'=>'index']) -->"><button type="button" class="btn btn-default">Cancel</button></a>
								</div>
							</div>
						</div>
					</div>
				<!-- php: =$this->Form->end(); -->
			</div>
		</div>
	</div>
</div>

<script>
	$(function () {
		$("#submit").click(function () {
			// return confirm('Are you sure you want to submit ?');
			// return true;
		});
	});
	
	function readURL(input, placeholder) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			
			reader.onload = function (e) {
				$('#' + placeholder)
					.attr('src', e.target.result);
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	//getting consultations available for that specialty
	function getConsultations()
	{
		var specialty_id = <!-- php: echo $editUser->specialty_id; -->;
		$.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getConsultationsBySpecialty']) -->/'+ specialty_id,
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
				selected = res.selected_consultations
				res = res.consultations
                for (var i in res){
					$('#consultation_id').append($('<option data-name="'+res[i].name+'"></option>').val(res[i].id).html(res[i].name));  

					// for (var j in selected){
					// 	if(res[i].id === selected[j].consultation_id){
					// 		$('#consultation_id').append($('<option selected data-name="'+res[i].name+'"></option>').val(res[i].id).html(res[i].name));  
					// 	}
					// }else{
					// 	// $('#consultation_id').append($('<option data-name="'+res[i].name+'"></option>').val(res[i].id).html(res[i].name));  

					// }
                }
                $("#consultation_id").selectpicker("refresh");
            },
            error: function(){
                console.log("Error Occured");
            }
        });
	}

	//getting consultations available for that specialty
	function getTimeslots()
	{
		$.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getTimeslots']) -->',
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
				selected = res.selected_timeslots
				res = res.timeslots
                for (var i in res){
					$('#booking_timeslot_id').append($('<option data-name="'+res[i].slot+'"></option>').val(res[i].id).html(res[i].slot));  

					// for (var j in selected){
					// 	if(res[i].id === selected[j].id){
					// 		$('#booking_timeslot_id').append($('<option selected data-name="'+res[i].slot+'"></option>').val(res[i].id).html(res[i].slot));  
					// 	}
					// }else{
					// 	$('#booking_timeslot_id').append($('<option data-name="'+res[i].slot+'"></option>').val(res[i].id).html(res[i].slot));  
					// }
                }
                $("#booking_timeslot_id").selectpicker("refresh");
            },
            error: function(){
                console.log("Error Occured");
            }
        });
	}

	//perform some function when doocument is completely loaded and ready
	$(document).ready(function() {
		getConsultations()
		getTimeslots()
	});
</script>

<!-- end page content -->

`;

export default function UsersUpdateProfileCopyPage() {
  return (
    <PageShell title="Users/update_profile_copy.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
