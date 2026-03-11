const rawHtml = `
<div class="row">
	<style>
		.dropup {
			position: relative;
			display: inline-block;
		}

		.dropup-content {
			display: none;
			position: absolute;
			bottom: 30px;
			background-color: #f1f1f1;
			min-width: 160px;
			box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
			z-index: 1;
		}

		.dropup-content a {
			color: black;
			padding: 12px 16px;
			text-decoration: none;
			display: block;
		}

		.dropup-content a:hover {
			background-color: deepskyblue;
			color: #fff;
		}

		.dropup:hover .dropup-content {
			display: block;
		}

		.dropup:hover .dropbtn {
			background-color: #2980B9;
		}

		.submenu {
			position: relative;
		}

		.submenu>div {
			background-color: #f1f1f1;
			visibility: hidden;
			position: absolute;
			left: 100%;
			top: 0;
			width: 100%;
			transition: .3s;
			opacity: 0;
		}


		.submenu:hover>div {
			visibility: visible;
			opacity: 1;
		}

		.submenu:hover>a {
			background-color: deepskyblue;
			color: #fff;
		}

		.stylish-card-section .card {
			border-radius: 10px;
			box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
			transition: all 0.2s;
		}

		.stylish-card-section .card:hover {
			box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
			transform: scale(1.01);
		}

		.clinicalMain .card {
			min-height: 130px;
		}

		.labsCard {
			border-color: #49cc90;

		}

		.medicationCard {
			border-color: #f93e3e;
		}


		.allergyCard {
			border-color: #fca130;

		}



		.examsCard {
			border-color: #BBADA1;
		}

		.problemsCard {
			border-color: #61affe;
		}

		.historyCard {
			border-color: #6c757d;
		}

		.vitalsCard .card-header {

			font-weight: bold;
			border-radius: 10px;
		}

		.examsCard .card-header {
			background: rgba(187, 173, 161, .3);
			font-weight: bold;
			border-radius: 10px;
		}

		.historyCard .card-header {
			background: rgba(108, 117, 125, .2);
			font-weight: bold;
			border-radius: 10px;
		}

		.medicationCard .card-header {
			background: rgba(249, 62, 62, .2);
			font-weight: bold;
			border-radius: 10px;

		}

		.problemsCard .card-header {
			background: rgba(97, 175, 254, .2);
			font-weight: bold;
			border-radius: 10px;
		}



		.labsCard .card-header {
			background: rgba(73, 204, 144, .2);
			font-weight: bold;
			border-radius: 10px;

		}

		.allergyCard .card-header {
			background: rgba(252, 161, 48, .2);
			font-weight: bold;
			border-radius: 10px;

		}




		.ccAccordion {
			border-color: lightblue;

		}



		.accordionDiv .card-header {

			background: rgba(97, 175, 254, .2);

		}

		.ck.ck-editor {
			width: 100%;
		}

		.ulLabs {
			margin: 0px;
			float: left;
			padding: 0px;
			width: 100%;
		}

		.ulLabs li {
			list-style-type: none;
			margin-bottom: 5px;
			padding-left: 7px;

		}

		.ulMedicationCard {
			margin: 0px;
			float: left;
			padding: 0px;
			width: 100%;
		}

		.ulMedicationCard li {
			margin-bottom: 5px;
			padding-left: 0px;
			float: left;

		}

		/*Search bar  */



		.wrapper .search-input {
			background: #f5f5f5;
			width: 100%;
			border-radius: 5px;
			position: relative;
			box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);
		}

		.search-input input {
			height: 55px;
			width: 100%;
			outline: none;
			border: none;
			border-radius: 5px;
			padding: 0 60px 0 20px;
			font-size: 18px;
			box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
		}

		.search-input.active input {
			border-radius: 5px 5px 0 0;
		}

		.search-input .autocom-box {
			padding: 0;
			opacity: 0;
			pointer-events: none;
			max-height: 280px;
			overflow-y: auto;
		}

		.search-input.active .autocom-box {
			padding: 10px 8px;
			opacity: 1;
			background: #F8F8FF;
			pointer-events: auto;
		}

		.autocom-box li {
			list-style: none;
			padding: 8px 12px;
			display: none;
			width: 100%;
			cursor: default;
			border-radius: 3px;
		}

		.search-input.active .autocom-box li {
			display: block;
		}

		.autocom-box li:hover {
			background: #efefef;
		}

		.search-input .icon {
			position: absolute;
			right: 5px;
			top: 5px;
			height: 55px;
			width: 55px;
			text-align: center;
			line-height: 55px;
			font-size: 20px;
			color: #644bff;
			cursor: pointer;
		}
	</style>
	<!--Clinical Notes section -->

	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption pl-3">
				<span class="caption-subject font-dark bold uppercase mr-5">Scheduled Requests</span>
			</div>
		</div>


		<div class="borderBox-body clinicalMain">

			<div class="row">
				<div class="col-md-8 stylish-card-section">
					<div class="col-md-12">
						<!--Problems Card-->
						<div class="card bg-light mb-3 problemsCard with-transform" style="min-height: 370px;">
							<div class="card-header  ">
								Modifications Form<span class="float-right"></span>
							</div>
							<div class="card-body">
                <div class="form-group row">
                  <label class="control-label col-md-4">Anaesthesia Type
                  </label>
                  <div class="col-md-8">
                    <span class="badge badge-info" id="anaesthesia_type"><!-- php: = $requestSurgery->anaesthesia_type->name --></span>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4">Special Requests / Additional Orders:
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
                <div class="form-group row justify-content-center">
                  <div class="col-md-12 d-flex justify-content-center align-items-center rounded-0" style="background:rgba(97, 175, 254, .2)	">
										<span class="caption-subject font-dark bold uppercase mr-5">Scheduled Requests</span>
									</div>
									<div class="row mt-2">
										<div class="col-md-6 mb-3">
											<div class="row">
												<div class="col-md-12 d-flex"><span class="badge badge-warning">Labs</span></div>
												<div class="col-md-12" id="request_services_lab"></div>
											</div>
										</div>
										<div class="col-md-6 mb-3">
											<div class="row">
												<div class="col-md-12 d-flex"><span class="badge badge-danger">Scans</span> <br /></div>
												<div class="col-md-12" id="request_services_scans"></div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="row">
												<div class="col-md-12 d-flex"><span class="badge badge-success">Medications</span></div>
												<div class="col-md-12" id="request_services_prescriptions"></div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="row">
												<div class="col-md-12 d-flex"><span class="badge badge-info">Infusions / Anaesthesia</span></div>
												<div class="col-md-12" id="request_services_infusions"></div>
											</div>
										</div>
									</div>
									<ul class="col-md-8" id="request_services">
									</ul>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4">Medical Equipment:
                  </label>
									<ul class="col-md-8" id="medical_equipment">
									</ul>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4">Samples Collected:
                  </label>
									<div class="col-md-8">
										<div class="row">
											<div class="col-md-6 bold">Frozen Section</div>
											<div class="col-md-6" id="frozen_section">  </div>
										</div>
										<div class="row">
											<div class="col-md-6 bold">Graft Tissue</div>
											<div class="col-md-6" id="graft_tissue"></div>
										</div>
									</div>
                </div>
            </div>
							<a type="button" class="full-width pull-right text-slate-900 text-primary text-right pr-2 pb-2" style="margin-auto" data-toggle="modal" data-target="#modifications_card">
								View
							</a>
						</div>
						<!--//Problems Card-->

					</div>
				</div>
				<div class="col-md-4 stylish-card-section">
					<div class="col-md-12">
						<!--History card-->
						<div class="card bg-light mb-3 historyCard with-transform ">
							<div class="card-header ">Agreement Section <span class="float-right"></span></div>
							<div class="card-body">
                <!-- <table id="patient_care_team_table">
									<thead>
										<th>Name</th>
										<th>Name</th>
									</thead>
								</table> -->
								<div class="row" id="patient_care_team_table">

								</div>
              </div>
						</div>
						<!--//History card-->

					</div>
					<div class="col-md-12">
						<!--History card-->
						<div class="card bg-light mb-3 allergyCard with-transform ">
							<div class="card-header ">Admission Section <span class="float-right"></span></div>
							<div class="card-body">
								<div class="form-group row">
                  <label class="control-label col-md-5">Discharge Plan:
                  </label>
									<div class="col-md-6">
										<div class="row">
											<div class="col-md-12 bold">
												<span>Same as day</span>

											</div>
										</div>
									</div>
                </div>
              </div>
							<a type="button" class="full-width pull-right text-slate-900 text-primary text-right pr-2 pb-2" style="margin-auto" data-toggle="modal" data-target="#admissions_card">
								View
							</a>
						</div>

					</div>
				</div>

			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="modifications_card" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
            <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Physical Examination</h5>
            <span class="pull-left" style="color: red;">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
        </div>
        <div class="mb-2">
            <span class="label label-lg bg-primary text-uppercase "><b>Vitals <span class="modal_drug_title"></span></b>
            </span>
        </div>
        <div>

        </div>
				<!-- php: = $this->Form->create(null, ['url' => [], 'id' => 'modifications_form', 'class' => '', 'style' => '']); -->
          <div class="modal-body">
            <div class="row">
              <!--Requested service Details-->
              <article class="card-body pt-2 pl-5 pr-5 p-0">
                <div class="row ml-2">
                  <!--Patient Details-->
                  <div class="mr-5">
                    <dl class="item-property">
                      <dt>Patient Details</dt>

                      <dd>
                        <p>
                          Name: <span class="bold text-success"><!-- php: = $patient->first_name . ' ' . $patient->last_name --></span><br>
                          Age: <span class="bold text-success"><!-- php: = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </span><br>
                          Gender: <span class="bold text-success"><!-- php: = isset($patient->gender) ? $patient->gender->name : "" --> </span> <br>
                          location: <br>
                          Folder No: <span class="bold text-success"><!-- php: = $patient->folder --></span>
                        </p>
                      </dd>
                    </dl>
                  </div>

                  <!--Allergy-->
                  <div>
                    <dl class="item-property">
                        <dt>Allergy</dt>

                        <dd>
                            <p>
                                <span class="badge rounded-pill bg-warning">Allergy 1</span><br>
                                <span class="badge rounded-pill bg-warning">Allergy 2</span> <br>
                                <span class="badge rounded-pill bg-warning">Allergy 3</span> <br>
                                <span class="badge rounded-pill bg-warning">Allergy 4</span> <br>

                            </p>

                        </dd>
                    </dl>
                  </div>
                </div>
              </article>
            </div>
          </div>
					<div class="borderBox light bordered col-md-12">
						<div class="row pl-5 pr-5 flex-column">
							<div class="form-group row">
								<label class="control-label col-md-4">Special Requests / Additional Orders:
								</label>
								<div class="col-md-8">
									
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Anaesthesia Type:
								</label>
								<div class="col-md-8">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="anaesthesia_id" id="anaesthesia_id" title="Anaesthesia Type" data-live-search="true" onchange="" data-max-options="1" multiple required>
									</SearchableSelectField>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Request Services:
								</label>
								<div class="col-md-8">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="lab_tests[]" id="lab_test_id" title="Select lab test" data-live-search="true" required multiple>
									</SearchableSelectField>
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="radioScans" id="radio_scan_id" title="Select Radiology Scan" data-live-search="true" onchange="" data-max-options="1" multiple required>
									</SearchableSelectField>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Medical Equipment:
								</label>
								<div class="col-md-8">
									
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Samples Collected:
								</label>
								<div class="col-md-8">
									<div class="row">
										<div class="form-check">
											<input class="form-check-input" name="frozen_section" type="checkbox" value="1" id="flexCheckChecked" checked>
											<label class="form-check-label" for="flexCheckChecked">
												Frozen Section
											</label>
										</div>
									</div>
									<div class="row">
										<div class="form-check">
											<input class="form-check-input" name="graft_tissue" type="checkbox" value="1" id="flexCheckChecked" checked>
											<label class="form-check-label" for="flexCheckChecked">
												Graft Tissue
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


          <div class="modal-footer border-top-0 d-flex justify-content-center">
            <button id="modification_modal_save"  onclick="saveModifications()" data-dismiss="modal" type="submit" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
              save
            </button>
            <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
              Cancel
            </button>
          </div>
				<!-- php: = $this->Form->end() -->
      </div>
    </div>
  </div>
	<div class="modal fade" id="admissions_card" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
            <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Admission Section</h5>
            <span class="pull-left" style="color: red;">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
        </div>
        <div class="mb-2">
            <span class="label label-lg bg-primary text-uppercase "><b>Admission Section <span class="modal_drug_title"></span></b>
            </span>
        </div>
        <div>

        </div>
				<!-- php: = $this->Form->create(null, ['url' => [], 'id' => 'modifications_form', 'class' => '', 'style' => '']); -->
          <div class="modal-body">
            <div class="row">
              <!--Requested service Details-->
              <article class="card-body pt-2 pl-5 pr-5 p-0">
                <div class="row ml-2">
                  <!--Patient Details-->
                  <div class="mr-5">
                    <dl class="item-property">
                      <dt>Patient Details</dt>

                      <dd>
                        <p>
                          Name: <span class="bold text-success"><!-- php: = $patient->first_name . ' ' . $patient->last_name --></span><br>
                          Age: <span class="bold text-success"><!-- php: = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </span><br>
                          Gender: <span class="bold text-success"><!-- php: = isset($patient->gender) ? $patient->gender->name : "" --> </span> <br>
                          location: <br>
                          Folder No: <span class="bold text-success"><!-- php: = $patient->folder --></span>
                        </p>
                      </dd>
                    </dl>
                  </div>

                  <!--Allergy-->
                  <div>
                    <dl class="item-property">
                        <dt>Allergy</dt>

                        <dd>
                            <p>
                                <span class="badge rounded-pill bg-warning">Allergy 1</span><br>
                                <span class="badge rounded-pill bg-warning">Allergy 2</span> <br>
                                <span class="badge rounded-pill bg-warning">Allergy 3</span> <br>
                                <span class="badge rounded-pill bg-warning">Allergy 4</span> <br>

                            </p>

                        </dd>
                    </dl>
                  </div>
                </div>
              </article>
            </div>
          </div>
					<div class="borderBox light bordered col-md-12">
						<div class="row pl-5 pr-5 flex-column">
							<div class="form-group row">
								<label class="control-label col-md-4">Plan to Discharge Type:
								</label>
								<div class="col-md-8">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="discharge_plan" id="discharge_plan" title="Plan to Discharge" data-live-search="true" onchange="" data-max-options="1" multiple required>
										<option value="">Same day (AS SD),</option>
										<option value="">Plan to discharge next day (AS ND)</option>
										<option value="">Inpatient,</option>
										<option value="">InPatient One Day Prior to Surgery</option>
									</SearchableSelectField>
								</div>
							</div>
						</div>
					</div>


          <div class="modal-footer border-top-0 d-flex justify-content-center">
            <button id="modification_modal_save"  onclick="saveModifications()" data-dismiss="modal" type="submit" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
              save
            </button>
            <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
              Cancel
            </button>
          </div>
				<!-- php: = $this->Form->end() -->
      </div>
    </div>
  </div>
</div>


<!-- php: $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
<script>
	var billTo = "<!-- php: = $billTo -->"

  function populatePhysicalExam() {
    $.ajax({
      type: "GET",
      url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'getSurgeryParticipants', $requestSurgery->id]) -->",
      success: function g(data, textStatus) {
        let vitals = data.data
        if(Array.isArray(vitals)) {

          vitals.sort((a, b) => {
            return new Date(b.date_created) - new Date(a.date_created)
          })

          const recent = vitals[0]
          const previous = vitals[1]

          $("#vitalsToday_date").text(moment(recent?.date_created).format('DD/MM/YYYY, hh:mm A'))
          $("#blood_pressure_one_today").text(\`\${recent?.blood_pressure_1} / \${recent?.blood_pressure_2}\`)
          $("#heart_rate_today").text(recent?.pulse)
          $("#pulse_today").text(recent?.pulse)
          $("#os_today").text(recent?.oxygen_saturation)
          $("#temp_today").text(recent?.temperature)
          $("#rr_today").text(recent?.respiratory_rate)
          $("#height_today").text(recent?.height)
          $("#weight_today").text(recent?.weight)
          $("#mobility_today").text(recent?.mobility == "select"? '' : recent?.mobility)
          
          if(previous) {
            $("#vitalsPrevious_date").text(moment(previous?.date_created).format('DD/MM/YYYY, hh:mm A'))
            $("#blood_pressure_one_previous").text(\`\${previous?.blood_pressure_1} / \${previous?.blood_pressure_2}\`)
            $("#heart_rate_previous").text(previous?.pulse)
            $("#pulse_previous").text(previous?.pulse)
            $("#os_previous").text(previous?.oxygen_saturation)
            $("#temp_previous").text(previous?.temperature)
            $("#rr_previous").text(previous?.respiratory_rate)
            $("#height_previous").text(previous?.height)
            $("#weight_previous").text(previous?.weight)
            $("#mobility_previous").text(previous?.mobility == "select"? '' : previous?.mobility)
          }
        }

      },
      fail: function g(xhr, textStatus, errorThrown) {
        console.log(xhr);
      }
    });
  }

  function patient_care_team(params) {
    // table = $('#patient_care_team_table').DataTable();
    // table.destroy();
    // $('#patient_care_team_table').DataTable({
    //   "ordering": false,
    //   ajax:  {
    //     url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'getSurgeryParticipants', $requestSurgery->id]) -->",
    //     dataSrc: 'data'
    //   },
    //   columns: [
    //     {
    //         data: "",
    //         render: function(data, type, row) {
    //           return \`\${row?.user?.first_name} \${row?.user?.last_name}\`
    //         },
    //     },
    //     {
    //         data: "date_created",
    //         render: function(data, type, row) {
    //           return \`<span class="badge badge-\${row?.user?.role?.name.toLowerCase() == "doctor" ? "danger" : row?.user?.role?.name.toLowerCase().includes("nurse") ? "primary" : "warning"}">\${row?.user?.role?.name}</span>\`
    //         },
    //     },
    //   ]
    // });
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'getSurgeryParticipants', $requestSurgery->id]) -->",
			success: function g(data, textStatus) {
				result = ""
				data.data.forEach(row => {
					result += \`
						<div class="col-md-5 bold">\${row?.user?.first_name} \${row?.user?.last_name}</div>
						<div class="col-md-5">signed</div>
					\`
				});
				$('#patient_care_team_table').html(result)
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }

	function populateLabTests() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getLabTests']) -->",
			success: function g(data, textStatus) {
				let result = ''
				let billTo = "<!-- php: = $billTo -->";
				if(Array.isArray(data) && data.length > 0) {
					data.forEach(element => {
						let insurancePrice = element?.insurance_profile_lab_prices.filter(insured_item =>  insured_item.insurance_profile_id == billTo)
						result += \`
							<option value="\${element.id}" data-content="\${element.name} <span class='badge badge-primary'> \${element?.value_new || 0 }</span> <span class='badge badge-danger'>\${ insurancePrice.length > 0 ? insurancePrice[0]?.price : 0  }</span> ">
								\${element.name}
							</option>
						\`
					});
					$('#lab_test_id').html(result)
					$("#lab_test_id").selectpicker("refresh");
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function populateRadioScans() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRadioScans']) -->",
			success: function g(data, textStatus) {
				let result = ''
				let billTo = "<!-- php: = $billTo -->";
				if(Array.isArray(data) && data.length > 0) {
						data.forEach(element => {
								let insurancePrice = element?.insurance_profile_radiology_prices.filter(insured_item =>  insured_item.insurance_profile_id == billTo)
								result += \`
									<option value="\${element.id}" data-content="
													\${element.name}
													<span class='badge badge-warning'>\${element.radiology_category?.name}</span> 
													<span class='badge badge-warning' style='background: \${element.radiology_category?.anatomical_area?.color_code}'>\${element.radiology_category?.anatomical_area?.name}</span> 
													<br><span style='font-weight: 700;'> Price:</span> <span class='badge badge-primary'>\${element.value_new || 0}</span>
													<span class='badge badge-danger'>\${ insurancePrice.length > 0 ? insurancePrice[0]?.price : 0  }</span>
													"
													>\${element.name}
									</option>
								\`
						});
						$('#radio_scan_id').html(result)
						$("#radio_scan_id").selectpicker("refresh");
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
	function populateAnaesthesia() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'getAnaesthesia']) -->",
			success: function g(info, textStatus) {
				let result = ''
				let data = info.data
				
				if(Array.isArray(data) && data.length > 0) {
						data.forEach(element => {
							result += \`<option value="\${element.id}" >\${element.name}</option>\`
						});

						$('#anaesthesia_id').html(result)
						$("#anaesthesia_id").selectpicker("refresh");
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function cancelScanRequest(id) {
		if(confirm("Are you Sure you want to cancel Scan Request?")){
			$.ajax({
				type: "POST",
				url: \`<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'cancelRequestRadiology']) -->/\${id}\`,
				success: function g(data, textStatus) {
					emptyRequestServices()
					populateScansRequests()
					populateLabRequests()
				},
				fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
				}
			});
		}
	}

	function populateScansRequests() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRadiologyRequests', $patient->id, $selectedVisit->id, ]) -->",
			success: function g(info, textStatus) {
				let result = ''
				let data = info.data
				if(Array.isArray(data) && data.length > 0) {
					data.forEach(element => {
						result += \`<div class="bold">\${element.radiology_scan.name} \${element.source ? '<span class="badge badge-primary">' + element.source + '</span>' : '' } \${element.is_complete || element.status_id == 24? '' : 
							\`<span onclick="cancelScanRequest(\${element.id})"><i class="fa fa-window-close text-danger ml-3" aria-hidden="true"></i></span>\`
						}</div>\`
					});
					$('#request_services_scans').append(result)
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function cancelLabRequest(id) {
		if(confirm("Are you Sure you want to cancel Scan Request?")){
			$.ajax({
				type: "POST",
				url: \`<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'cancelRequestLab']) -->/\${id}\`,
				success: function g(data, textStatus) {
					emptyRequestServices()
					populateScansRequests()
					populateLabRequests()
				},
				fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
				}
			});
		}
	}
	function emptyRequestServices() {
		$("#request_services").html('')
	}
	function populateLabRequests() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRequestLabs', $patient->id, $selectedVisit->id, ]) -->",
			success: function g(info, textStatus) {
				let result = ''
				let data = info.data
				if(Array.isArray(data) && data.length > 0) {
					data.forEach(element => {
						result += \`<div class="bold">\${element.lab_test.name} \${element.source ? '<span class="badge badge-primary">' + element.source + '</span>' : '' } \${element.is_complete || element.status_id == 24? '' : 
							\`<span onclick="cancelLabRequest(\${element.id})"><i class="fa fa-window-close text-danger ml-3" aria-hidden="true"></i></span>\`
						}</div>\`
					});
					$('#request_services_lab').append(result)
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function getSurgeriesInfo() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'getSurgery', $requestSurgery->id]) -->",
			success: function g(info, textStatus) {
				let result = ''
				let data = info.data
				$('#anaesthesia_type').html(data?.anaesthesium?.name)
				$('#pre_anaesthesia_type').html(data?.anaesthesium?.name)
				$('#frozen_section').html(data.frozen_section ? '<span class="badge badge-primary" >Yes</span>' : '<span class="badge badge-danger" >No</span>')
				$('#graft_tissue').html(data.graft_tissue ? '<span class="badge badge-primary" >Yes</span>' : '<span class="badge badge-danger" >No</span>')
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function saveModifications() {
		let form = document.getElementById('modifications_form')
		let data = $('#modifications_form').serializeArray();

		anaesthesia_id = data.filter(element => element.name == 'anaesthesia_id');
		graft = data.filter(element => element.name == "graft_tissue");
		frozen = data.filter(element => element.name == "frozen_section");
		labs = data.filter(element => element.name == "lab_tests[]");
		radioScans = data.filter(element => element.name == "radioScans");
		emptyRequestServices()		

		$.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'editSurgery', $requestSurgery->id]) -->",
			data: [].concat(anaesthesia_id, graft, frozen),
			success: function g(data, textStatus) {
				getSurgeriesInfo()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
		$.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiology', $patient->id, $selectedVisit->id]) -->",
			data: radioScans.concat([{"name": "priority_id", "value": 5}],[{"name": "source", 'value': 'surgeries'}], [{"name": "bill_to_id", "value": "<!-- php: = $billTo -->"}]),
			success: function g(data, textStatus) {
				populateScansRequests()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
		$.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'addRequestLab', $patient->id, $selectedVisit->id]) -->",
			data: labs.concat([{"name": "priority_id", "value": 5}],[{"name": "source", 'value': 'surgeries'}], [{"name": "bill_to_id", "value": "<!-- php: = $billTo -->"}]),
			success: function g(data, textStatus) {
				console.log(data)
				populateLabRequests()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	$(document).ready(() => {
    patient_care_team()
		populateLabTests()
		populateAnaesthesia()
		populateRadioScans()
		emptyRequestServices()
		populateScansRequests()
		populateLabRequests()
		getSurgeriesInfo()
  })
</script>
`;

export default function ElementElementRequestSurgeriesScheduleRequests() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
