const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">In-Facility Locations</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#infacilities_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#infacilities_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="infacilities_add">
					<h4>Add a new Facility Location</h4>
					<!-- php: = $this->Form->create(null, ['type' => 'file', 'url' => ['controller' => 'Settings', 'action' => 'addInfacilityLocation']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Specialty
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField data-live-search="true" class="form-control selectpicker" name="specialty_id" id="specialty_id">

								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name[]" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
								
							</div>
						</div>
						<div id="extraNameFields">
						</div>
						<!-- <div class="mb-3">

							<a class="offset-md-4" href="javascript:" onclick="produceNameField()">+ Add More</a>
						</div> -->
						<div class="form-group row">

							<div class="col-md-4">
								Enable Voice Recording For Location Name: <input name="patient_call" id="patient_call" type="checkbox" onclick="togglePatientNameCall()"/>
							</div>
							<div id="patient_call_recorder" style="display:none" class="col-md-5">

								<div class="d-flex justify-content-center flex-column align-items-start" >
									<div>
										<h5 style="color: #333;">Record Audio: </h5>
									</div>
									<div>
		
										<input type="file" id="audio" name="patient_name_call" accept="audio/*" style="display:none;">
										<button type="button" class="btn btn-xs" id="recordButton">Start Recording</button>
										<button type="button" class="btn btn-xs" id="stopButton" disabled>Stop Recording</button>
										<audio id="audioPlayback" class="mt-2" controls style="display:none;"></audio>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearHealthFacilityFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="infacilities_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Specialty</th>

										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($infacility_locations as $key => $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$value->name --></td>
										<td class="left"><!-- php: =$value->specialty->name --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editinfacilitylocationDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
										</td>
									</tr>
									   
									<div class="modal fade" id="editinfacilitylocationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="infacilityLocationTitle">Edit Health Facility: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Settings', 'action' => 'editInfacilityLocation', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
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
	function clearHealthFacilityFields(){
		$('#name').val('');
		$('#description').val('');
	}
	$('#add_more_button').on('click', function() {
		counter ++
		var str = "" + counter;
		var pad = "000";
		var ans = pad.substring(0, pad.length - str.length) + str;
		var val = $('#dept_id').find(':selected').data("code");
		$('<div id="name_'+ counter +'"><input type="text" name="specialty_name[]" id="modifier_name"  placeholder="Name" class="form-control input-height" /><br></div>').appendTo("#modifier_name_div");
	});

	let countMe = 0;
	function produceNameField() {
		countMe += 1
		$('#extraNameFields').append(
			\`
				<div class="form-group row align-items-center" id="\${countMe}">
					<label class="control-label col-md-4">Name
						<span class="required"> * </span>
					</label>
					<div class="col-md-5 d-flex">
						<input type="text" name="name[]" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
					</div>
					<a class="text-danger" href="javascript:" onclick="removeNameField(\${countMe})">X</a>
				</div>
			\`
		)
	}

	function removeNameField(id) {
		$('#'+id).html('')
	}

	function fetchMdcs() {
		$.ajax({
			type: 'GET',
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getMdcs']) -->",
			data: [],
			success: function g(data, textStatus) {
					let result = ''
					data.forEach(ele => {
						result += \`<option value="\${ele.id}">\${ele.name}</option>\`
					});

					$(\`#specialty_id\`).html(result);
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}
	fetchMdcs()
</script>


<script>

	function togglePatientNameCall() {
		if ($('#patient_call').is(':checked')) {
			$('#patient_call_recorder').show('The checkbox is checked.');
		} else {
			$('#patient_call_recorder').hide('The checkbox is not checked.');
		}
	}

	let mediaRecorder;
	let audioChunks = [];

	document.getElementById('recordButton').onclick = async function() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.start();

			document.getElementById('recordButton').disabled = true;
			document.getElementById('stopButton').disabled = false;

			mediaRecorder.ondataavailable = event => {
				audioChunks.push(event.data);
			};

			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType });
				const audioURL = URL.createObjectURL(audioBlob);
				document.getElementById('audioPlayback').src = audioURL;
				document.getElementById('audioPlayback').style.display = 'block';

				// Attach the audio blob to the form
				const file = new File([audioBlob], 'recording.webm', { type: mediaRecorder.mimeType });
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				document.getElementById('audio').files = dataTransfer.files;

				audioChunks = [];
			};
		} catch (err) {
			alert('Could not access your microphone. Please allow microphone permissions.');
			console.error('Error accessing microphone:', err);
		}
	};

	document.getElementById('stopButton').onclick = function() {
		mediaRecorder.stop();
		document.getElementById('recordButton').disabled = false;
		document.getElementById('stopButton').disabled = true;
	};


</script>
`;

export default function ElementElementSettingsInfacilityLocations() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
