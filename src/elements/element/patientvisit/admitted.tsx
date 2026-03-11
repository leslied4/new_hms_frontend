const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">ADMISSION DETAILS</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item nurses_note_view_medications">
					<a href="#nurses_note_view_medications_tab" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active nurses_note_view_medications" id="nurses_note_view_medications_tab">
					<div class="card-body ">
						<div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width" id="admitted_table">
								<thead>
									<tr>
										<th class="center">Date Admitted</th>
										<th class="center">Admission Start</th>
										<th class="center">Admission End</th>
										<th class="center">Ward</th>
										<th class="center">Bed</th>
										<th class="center">Outcome</th>
										<th class="center">Bed Change Date</th>
										<th class="center">Action</th>
									</tr>
								</thead>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

    <div class="" id="change_admission_modal"></div>
    <div class="" id="end_admission_modal">

	<div class="modal fade" id="endAdmissionDialogue" tabindex="-1" role="dialog" aria-labelledby="select"
    aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="exampleModalLongTitle">End Admission:
						<!-- php: = $patient->first_name . ' ' . $patient->last_name -->
					</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<div class="row">
						<div class="col-md-12 col-sm-12">
							<div class="card card-box">
								<div class="card-head">
									<header>End Admission Form</header>
								</div>
								<div class="card-body" id="bar-parent">
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'endAdmission', $selectedVisit->id], 'class' => 'form-horizontal', 'id' => 'confirmEndAdmission']) -->
									<div class="form-body">
										<input type="hidden" name="patient_visit_id" value="<!-- php: = $selectedVisit->id -->">

										<div class="form-group row">
											<label class="control-label col-md-5" style="font-size:15px">Type <span class="text-primary">yes</span> To confirm
												<span class="required"> * </span>
											</label>
											<div class="col-md-12">
												<input name="confirmation" class="form-control input-height" id="endadmissionconfirmation" onkeyup="activateSubmitButton()"/>
											</div>
										</div>


										<div class="form-actions">
											<div class="row">
												<div class="offset-md-3 col-md-9">
													<button style="display: none;" type="submit" id="admissionEndSubmitButton" class="btn btn-info">Submit</button>

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
	</div>
	</div>

</div>
<script>

	function activateSubmitButton() {
		console.log("$('#endadmissionconfirmation').val()",$('#endadmissionconfirmation').val())
		if ($('#endadmissionconfirmation').val() == 'yes') {
			$('#admissionEndSubmitButton').show()
		} else {
			$('#admissionEndSubmitButton').hide()
			
		}
	}
	$("#confirmEndAdmission").submit(function () {
		return $('#endadmissionconfirmation').val() == 'yes'
	});
	function updateWardsChange(str) {
		if (str == "") {
			return;
		}
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateWards']) -->/"+str,
			success: function g(data, textStatus) {
				if (Array.isArray(data) && data.length > 0) {
					let options = []
					$('#wardfieldchange').html()
					data.forEach(ele => {
						options.push(\`<option value="\${ele.id}">\${ele.name}</option>\`)
					});
					options.push('<option value="" selected disabled >select</option>')
					$('#wardfieldchange').html(options.join(""))
				} else {
					alertify.error('No available wards');
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
				console.log(xhr);
			}
		});
	}

	function updateBedsChange(str) {
		if (str == "") {
			return;
		}

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

				// Sanitize all the json encodings make it a bare string : and ,
				var myresult = xhttp.responseText.replace(/"/gi,'');
				myresult = myresult.replace(/{/gi,'');
				myresult = myresult.replace(/}/gi,'');
				myresult = myresult.replace('[','');
				myresult = myresult.replace(']','');
				var mydata = myresult.split(',');

				var inneroptions = "<option>--Select--</option>";
				for (var region in mydata) {
					if (mydata.hasOwnProperty(region)) {
						var current = mydata[region].split(':');
						if(current.length >= 2) {
							inneroptions = inneroptions + "<option value='" + current[0] + "'>" + current[1] + "</option>";
						}
					}
				}

				document.getElementById("bedfieldchange").innerHTML = inneroptions;
			}
		}

		xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateBeds']) -->/"+str, true);
		xhttp.send();
	}
</script>
<script>
	$("#stay_check_change").click(function() {
		if ($(this).is(':checked')) {
			var shortStayValueChange = 1;
		} else {
			var shortStayValueChange = 0;
			$('#ward_type_change').prop('selectedIndex',0);
		}
		postShortStayValueChange(shortStayValueChange);
	});

	function populateAdmissionWards() {
		gender = $("#patient_gender").val();

		if($("#patient_age").val() <= 1){
			age = 2;
		}else if($("#patient_age").val() <= 4){
			age = 3;
		}else if($("#patient_age").val() <= 9){
			age = 4;
		}else if($("#patient_age").val() <= 14){
			age = 5;
		}else if($("#patient_age").val() <= 19){
			age = 6;
		}else if($("#patient_age").val() <= 34){
			age = 7;
		}else if($("#patient_age").val() <= 49){
			age = 8;
		}else if($("#patient_age").val() <= 59){
			age = 9;
		}else if($("#patient_age").val() <= 69){
			age = 10;
		}else{
			age = 11;
		}

		postPatientGenderAndAge(age, gender)
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAdmissionWards']) -->",
			success: function g(data, textStatus) {
					result = ''
					if (Array.isArray(data) && data && data.length > 0 ) {
						data?.forEach((element, index) => {
							result += \`
								<option value="\${element.id}"> \${element.name}</option>
							\`
						});
						result += \`
							<option value="" selected disabled> select</option>
						\`
					}
					
					$('.ward_type_change').empty()
					$('.ward_type_change').append(result);
					$('.ward_type_change').selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}

	function changeAdmissionModal(row) {
		return \`
			<div class="modal fade" id="changeBedDialogue_\${row.id}" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="exampleModalLongTitle">Change Bed: <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							
							<div class="row">
								<div class="col-md-12 col-sm-12">
									<div class="card card-box">
										<div class="card-head">
											<header>Change of Bed Form</header>
										</div>
										<div class="card-body" id="bar-parent">
											<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'changePatientBed'], 'class' => 'form-horizontal']) -->
												<div class="form-body">
													<input type="hidden" name="patient_visit_id" value="<!-- php: = $selectedVisit->id -->">
													<input type="hidden" name="visit_id" value="\${row?.id}">
													<input type="hidden" name="bed_id" value="\${row?.bed?.id}">
													<input type="hidden" name="ward_id" value="\${row?.bed?.ward?.id}">
													<div class="form-group row">
														<label class="control-label col-md-5">Short Stay
															<span class="required">  </span>
														</label>
														<div class="col-md-7">
															<label class="switchToggle">
																<input id="stay_check_change" type="checkbox" onclick="">
																<span class="slider green round"></span>
															</label>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-5">Ward Type
															<span class="required"> * </span>
														</label>
														<div class="col-md-7">
															<SearchableSelectField class="form-control input-height ward_type_change" onChange="updateWardsChange(this.value);" required id="ward_type_change">
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-5">Ward
															<span class="required"> * </span>
														</label>
														<div class="col-md-7">
															<SearchableSelectField class="form-control input-height " id="wardfieldchange", onChange="updateBedsChange(this.value);" required>
																<option value="">Select...</option>
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-5">Bed No
															<span class="required"> * </span>
														</label>
														<div class="col-md-7">
															<SearchableSelectField class="form-control input-height " name="new_bed_id" id="bedfieldchange" required>
																<option value="">Select...</option>
															</SearchableSelectField>
														</div>
													</div>

												<div class="form-actions">
													<div class="row">
														<div class="offset-md-3 col-md-9">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default">Cancel</button>
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
		\`
	}

	function postShortStayValueChange(shortStayValueChange){
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'storeShortStayValueIntoSession' ] ); -->",
            data: {id:shortStayValueChange},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				console.log('sending')
            },
            success: function (response){
				console.log('success')
            }
        });
	}

	function getPatientVisitAdmission() {
		table = $('#admitted_table').DataTable();
		table.destroy();
        $('#admitted_table').DataTable({
            "ordering": false,
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getVisitAdmissions', $selectedVisit->id]) -->",
                dataSrc: 'data'
            },
				columns: [
					{
						data: "",
						render: function(data, type, row) {
							return moment(row?.date_admitted).format('DD/MM/YYYY, hh:mm A')
						},
					},
					{
						data: "",
						render: function(data, type, row) {
							return moment(row?.admission_start).format('DD/MM/YYYY, hh:mm A')
						},
					},
					{
						data: "",
						render: function(data, type, row) {
							if (row.admission_outcome_id > 0) {
								return moment(row?.admission_end).format('DD/MM/YYYY, hh:mm A')
							}
							return '';
						},
					},
					{
						data: "",
						render: function(data, type, row) {
							return row?.bed?.ward?.name || 'n/a'
						},
					},
					{
						data: "",
						render: function(data, type, row) {
							return row?.bed?.name || 'n/a'
						},
					},
					{
						data: "",
						render: function(data, type, row) {
							return row?.admission_outcome?.name || ''
						},
					},
					{
						data: "",
						render: function(data, type, row) {
							return row.bed_change_date? moment(row?.bed_change_date).format('DD/MM/YYYY, hh:mm A') : ''
						},
					},
					{
						data: "",
						render: function(data, type, row) {
							$("#change_admission_modal").html(changeAdmissionModal(row))
							result = '';
							<!-- php: if($isCurrentVisit): -->
								result =  \`
									\${row.outcome_setter_id == null ?\`<a data-toggle="modal" onclick="populateAdmissionWards()" data-target="#changeBedDialogue_\${row.id}" href="javascript:" class="btn btn-primary btn-sm">
										Change Bed
									</a>
									<a data-toggle="modal" data-target="#endAdmissionDialogue" href="javascript:" class="btn btn-warning btn-sm">
										End Admission
									</a>\` : ''}

								\`
							<!-- php: endif; -->
							return result

						},
					},

				]
        });
    }
	$(document).ready(function() {
		// getPatientVisitAdmission()
	})
</script>

`;

export default function ElementElementPatientvisitAdmitted() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
