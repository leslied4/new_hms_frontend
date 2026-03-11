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
		.medicationCard-2 {
			border-color: #FEF5AC;
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
		.historyCard-1 {
			border-color: #EBC7E8;
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
		.historyCard-1 .card-header {
			background: #EBC7E8;
			font-weight: bold;
			border-radius: 10px;
		}

		.medicationCard .card-header {
			background: rgba(249, 62, 62, .2);
			font-weight: bold;
			border-radius: 10px;

		}
		.medicationCard-2 .card-header {
			background: #FEF5AC;
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
			<div class="caption d-flex justify-content-center full-width align-items-center">
				<span class="caption-subject font-dark bold uppercase mr-5">Pre Anaesthesia</span>
        <SearchableSelectField style="width:100%" data-max-options="1" class="form-control selectpicker show-menu-arrow show-tick col-md-2" data-size="4" name="" id="select_current_anaesthesia" 
          title="Select Field" data-live-search="true" data-style="bg-white" onchange="getPreAnaesthesia(this, event)" multiple>
          <option value="physical_exam">Physical Examination</option>
          <option value="diagnostic_test">Pertinent Diagnostic Test Results</option>
          <option value="allergies">Alergies and Medications History</option>
          <option value="signature">Signature</option>
          <option value="system_review">Health History and System Review</option>
          <option value="care_informed">Plan of Anaesthesia Care</option>
          <option value="informed_consent">Informed Consent</option>
          <option value="anaesthesia_technique">Anaesthesia Technique</option>
          <option value="pulmonary_examination">Pulmonary Examination</option>
        </SearchableSelectField>
			</div>
		</div>


		<div class="borderBox-body clinicalMain">

			<div class="row">

				<div class="col-md-6 stylish-card-section">

					<div class="col-md-12" id="physical_exam">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard with-transform">
							<div class="card-header ">Physical Examination <span class="float-right"></span> </div>
							<div class="card-body row">

              <div class="col-md-6">
                  <span class="text-primary bold ">Recent</span> <br>
                  <!--set class d-none when live-->
                  <div id="today_vitals_section">
                      <span>Vitals taken on <span id="vitalsToday_date" class="bold">19 Feb 2022, 5:30pm</span></span>
                      <br><span class="bold">BP</span>: <span id="blood_pressure_one_today">12</span> <br>
                      <span class="bold">HR</span>: <span id="heart_rate_today">45</span><br>
                      <span class="bold">Pulse</span>: <span id="pulse_today">46</span><br>
                      <!--Oxygen saturation-->
                      <span class="bold">OS</span>: <span id="os_today">12</span><br>
                      <span class="bold">Temp</span>: <span id="temp_today">37</span> <br>
                      <span class="bold">RR</span>: <span id="rr_today">22</span> <br>
                      <span class="bold">Ht </span>: <span id="height_today">190cm</span><br>
                      <span class="bold">Wt</span>: <span id="weight_today">91kg</span> <br>
                      <span class="bold">Mobility</span>: <span id="mobility_today">Walking</span>
                  </div>

                  <span class="bold mt-5 d-none" id="today_visitals_noneText">No Vitals Reading Today</span>

                  <div class="col-md-6">

                  </div>
              </div>

              <div class="col-md-6 " id="previous_vitals_section">
                  <span class="text-primary bold">Previous</span> <br>
                  <span>Vitals taken on <span id="vitalsPrevious_date" class="bold"></span>_</span> <br>
                  <span class="bold">BP</span>: <span id="blood_pressure_one_previous">_</span> <br>
                  <span class="bold">HR</span>: <span id="heart_rate_previous">_</span><br>
                  <span class="bold">Pulse</span>: <span id="pulse_previous">_</span><br>
                  <!--Oxygen saturation-->
                  <span class="bold">OS</span>: <span id="os_previous">_</span><br>
                  <span class="bold">Temp</span>: <span id="temp_previous">_</span> <br>
                  <span class="bold">RR</span>: <span id="rr_previous">_</span> <br>
                  <span class="bold">Ht </span>: <span id="height_previous">_</span><br>
                  <span class="bold">Wt</span>: <span id="weight_previous">_</span> <br>
                  <span class="bold">Mobility</span>: <span id="mobility_previous">_</span>
              </div>

							</div>
                <div class="pr-3 pb-2">
                    <a type="button" class="pull-right text-slate-900 text-primary" data-toggle="modal" data-target="#plan_of_care_modal">
                      View
                    </a>
                </div>
						</div>
						<!--//medication card-->
					</div>
					<div class="col-md-12" id="diagnostic_test">
						<!---medication card-->
            <div class="card bg-light mb-3 medicationCard-2 with-transform">
							<div class="card-header ">Pertinent Diagnostic Test Results <span class="float-right"></span> </div>
							<div class="card-body">

                <div class="row">
                  <div class="col-md-12">
                    <div class="">
                      <span class="badge badge-warning">Labs</span> <br/>
                      <ul id="preanaesthesia_lab_results">

                      </ul>
                      <ul style="text-decoration: none;" id="preanaesthesia_lab_results_comments">
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div>
                      <span class="badge badge-danger">Scans</span> <br/>
                      <ul id="preanaesthesia_scan_results">

                      </ul>
                      <ul style="text-decoration: none;" id="preanaesthesia_scan_results_comments">
                      </ul>
                    </div>
                    
                  </div>
                  <div class="col-md-12">
                    <div>
                      <span class="badge badge-primary">12 Lead EKG</span> <br/>
                      <ul style="text-decoration: none;" id="preanaesthesia_ekg_results_comments">
                      </ul>
                    </div>
                    
                  </div>
                  <div>

                  </div>
                </div>
                  <a type="button" class="pull-right text-slate-900 text-primary" data-toggle="modal" data-target="#diagnositic_test_modal">
                    View
                  </a>
							</div>
						</div>
						<!--//medication card-->
					</div>
					<div class="col-md-12" id="anaesthesia_technique">
						<!---medication card-->
            <div class="card bg-light mb-3 medicationCard-3 with-transform">
							<div class="card-header ">Anaesthesia Technique <span class="float-right"></span> </div>
							<div class="card-body">
                General
                Regional
                Monitored anaesthesia care  
                Other
                Mode of drug administration
                When real-time image guidance is used, an image of needle placement is placed in the patient record

							</div>
						</div>
						<!--//medication card-->
					</div>

					<div class="col-md-12" id="allergies">
						<div class="card bg-light mb-3 allergyCard with-transform ">
							<div class="card-header ">Alergies and Medications History <span class="float-right"></span> </div>
							<div class="card-body pl-3">
                Admit Status and details including ward/bed - Ambulatory Surgery, Plan to Discharge Same day (AS SD), Plan to discharge next day (AS ND). Inpatient, InPatient One Day Prior to Surgery
							</div>
						</div>
					</div>

					<div class="col-md-12" id="signature">
						<div class="card bg-light mb-3 historyCard-1 with-transform ">
							<div class="card-header ">Signature<span class="float-right"></span> </div>
							<div class="card-body pl-12 d-flex justify-content-center flex-column">
                <table>
                  <thead>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr>
                      <td> 06/09/2022, 08:22 AM</td>
                      <td> Abigail Srekum</td>
                      <td> <span class="badge badege-danged">Signed</span></td>
                    </tr>
                    <tr>
                      <td> 06/09/2022, 08:22 AM</td>
                      <td> Martha Ankoma</td>
                      <td> <span class="badge badege-danged">Signed</span></td>
                    </tr>
                    <tr>
                      <td> 06/09/2022, 08:22 AM</td>
                      <td> Kweksi Pr3ko</td>
                      <td> <span class="badge badege-danged">Signed</span></td>
                    </tr>
                  </tbody>
                </table>
                <!-- Admit Status and details including ward/bed - Ambulatory Surgery, Plan to Discharge Same day (AS SD), Plan to discharge next day (AS ND). Inpatient, InPatient One Day Prior to Surgery -->
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-6 stylish-card-section">

					<div class="col-md-12" id="system_review">
						<!--Problems Card-->
						<div class="card bg-light mb-3 problemsCard with-transform" style="min-height: 370px;">
							<div class="card-header  ">
								Health History and System Review<span class="float-right"></span>
							</div>
							<div class="card-body">
                Change in Time or Date - Estimate Length of Procedure, Original and New
                Change in Permit/Procedure - Permit to Read, Additional Procedure Information, Codes
                Change In Anaesthesia type
                New Anaesthesia type - Local, MAC, General, Spinal, Epidural, Nerve Block (location)
                Change in Equipment/Special Request
                Additional Order(s) - Request Services to be billed
                Medical Equipment - Request Services to be billed
                Special Needs/Request
                Sample(s) Collected : Frozen Section Request = Yes/No, Graft/Tissue Request Yes/No & 

            </div>
						</div>
						<!--//Problems Card-->

					</div>


					<div class="col-md-12" id="pulmonary_examination">
						<!--History card-->
						<div class="card bg-light mb-3 allergyCard with-transform " style="">
							<div class="card-header "> Pulmonary Examination <span class="float-right"></span></div>
							<div class="card-body">
                Transfusion history
                Disabilities
                Visual, auditory, and vocal impairment 
                Prosthetics

              </div>
						</div>
						<!--//History card-->

					</div>
					<div class="col-md-12" id="care_informed">
						<!--History card-->
						<div class="card bg-light mb-3 historyCard with-transform " style="min-height: 370px;">
							<div class="card-header ">Plan of Anaesthesia Care <span class="float-right"></span></div>
							<div class="card-body">
                <div class="form-group row">
                  <label class="control-label col-md-4">Physical Status
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-8">
                    <span class="badge badge-primary">Alive</span>
                    <span class="badge badge-danger">Dead</span>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4">Type of Anaesthesia
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-8">
                    <span class="badge badge-info" id="pre_anaesthesia_type"></span>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4">Delivery Mode
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-8">
                    <table class='table borderless'>
                      <thead>
                        <tr>
                          <th>Before</th>
                          <th>During</th>
                          <th>After</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>MAC</td>
                          <td>LOCAL</td>
                          <td>Spinal</td>
                        </tr>
                        <tr>
                          <td>10 s</td>
                          <td>20 s</td>
                          <td>30s</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- <div class="form-group row">
                  <label class="control-label col-md-4">Dosage
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-8">
                    
                  </div>
                </div> -->
                <div class="form-group row">
                  <label class="control-label col-md-4">Anaesthesia Problems
                    <span class="required"> * </span>
                  </label>
                  <ul class="col-md-8">
                    <li class="full-width">Difficult airway</li>
                    <li class="full-width">Ongoing infection</li>
                  </ul>
                </div>
              </div>
                <div class="pr-3 pb-2">
                    <a type="button" class="pull-right text-slate-900 text-primary" data-toggle="modal" data-target="#plan_of_anaethesia_care_modal">
                      View
                    </a>
                </div>
						</div>
						<!--//History card-->

					</div>

          <div class="col-md-12" id="informed_consent">
						<div class="card bg-light mb-3 medicationCard with-transform ">
							<div class="card-header ">Informed Consent<span class="float-right"></span> </div>
							<div class="card-body pl-12 d-flex justify-content-center flex-column">
                <div class="">
                  <span class="col-md-6"><i class="fa fa-file-word-o" ></i> Word Document of consent.docx</span> <br/>
                  <span class="col-md-6"><i class="fa fa-file-word-o" ></i> Word Document of consent.docx</span> <br/>
                  <span class="col-md-6"><i class="fa fa-file-word-o" ></i> Word Document of consent.docx</span> <br/>
                </div>
                <div class="mt-4">
                  <SearchableSelectField name="signature_request" class="selectpicker" id="signature_request">
                    <option value="">Sheet</option>
                    <option value="">Pdf</option>
                    <option value="">Word</option>
                  </SearchableSelectField>
                  <button class="btn btn-md btn-primary">Make Request</button>
                </div>
                <!-- Admit Status and details including ward/bed - Ambulatory Surgery, Plan to Discharge Same day (AS SD), Plan to discharge next day (AS ND). Inpatient, InPatient One Day Prior to Surgery -->
							</div>
						</div>
					</div>

				</div>

			</div>

		</div>

	</div>

  <!-- Modals Section -->
  <div class="modal fade" id="plan_of_care_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <form>
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
                <hr>
              </article>
            </div>
            <hr>
          </div>
          <div class="modal-footer border-top-0 d-flex justify-content-center">
            <button id="peak_modal_save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
              save
            </button>
            <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="plan_of_anaethesia_care_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Plan of Anaesthesia Care</h5>
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
        <form>
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
                <hr>
              </article>
            </div>
            <hr>
            <div class="col-md-12 d-flex justify-content-center">
              <div class="col-md-11">
                <div class="form-group row">
                  <label class="control-label col-md-3">Physical Status
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-9">
                    <div class="row">
                      <SearchableSelectField name="physical_status" class="form-control input-height col-md-10" id="pre_physical_status">
                        <option value="0">Alive</option>
                        <option value="1">Dead</option>
                      </SearchableSelectField>
                      <div class="col-md-2">
                        <button class="btn btn-xs btn-primary" onclick="savePhysicalStatus()">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="form-group row">
                  <label class="control-label col-md-3">Type of Anaesthesia
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-9">
                  </div>
                </div> -->
                <div class="form-group row">
                  <label class="control-label col-md-3">Delivery Mode
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-9">
                    <div class="row mb-2">
											<div class="col-md-5 bold">Before</div>
											<div class="col-md-5" id="before">
                        <input type="number" name="before" id="pre_anaesthesia_before">
                      </div>
                      <div class="col-md-2">
                        <button class="btn btn-xs btn-primary" onclick="saveBeforeMode()">Save</button>
                      </div>
										</div>
										<div class="row mb-2">
											<div class="col-md-5 bold">During</div>
											<div class="col-md-5" id="during">
                        <input type="number" name="during" id="pre_anaesthesia_during">
                      </div>
                      <div class="col-md-2">
                        <button class="btn btn-xs btn-primary" onclick="saveDuringMode()">Save</button>
                      </div>
										</div>
										<div class="row mb-2">
											<div class="col-md-5 bold">After</div>
											<div class="col-md-5" id="after">
                        <input type="number" name="after" id="pre_anaesthesia_after">
                      </div>
                      <div class="col-md-2">
                        <button class="btn btn-xs btn-primary" onclick="saveAfterMode()">Save</button>
                      </div>
										</div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-3">Anaesthesia Problems
                    <span class="required"> * </span>
                  </label>
                  <div class="col-md-9">
                    <div class="row">
                      <div class="col-md-10">
                        <SearchableSelectField name="anaethesia_problem_id" id="anaethesia_problem_id" class="form-control input-height mb-2" onchange="changeAnaesthesiaProblems(event.target.value)"></SearchableSelectField>
                        <input type="text" name="anaethesia_problem_other" id="anaethesia_problem_other" class="full-width" style="display:none">
                      </div>
                      <div class="col-md-2">
                        <button class="btn btn-xs btn-primary" onclick="saveAnaesthesiaProblems()">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer border-top-0 d-flex justify-content-center">
            <button id="peak_modal_save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
              save
            </button>
            <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
              Cancel
            </button>
          </div> -->
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="diagnositic_test_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <span class="label label-lg bg-primary text-uppercase "><b>Vitals <span class="modal_drug_title"></span></b></span>
        </div>
        <div>

        </div>
        <div>
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
                <hr>
              </article>
            </div>
            <div class="d-flex justify-content-center align-items-center" style="font-size:24px">
              Add Comments For Labs, Scans And EKG results
            </div>
            <hr>
            <div class="col-md-12">
              <div class="form-group row">
                <label class="col-md-3 control-label">Lab Comments</label>
                <div class="input-group col-md-7">
                  <!-- <textarea name="lead_ekg" id="" cols="50" rows="1" style="border-radius:20px; padding:10px;box-sizing: border-box;"></textarea> -->
                  <input type="text" class="full-width" name="comment" id="lab_result_comment">
                </div>
                <span class="input-group-btn">
                  <button onclick="submitLabComment()" class="btn btn-info ">save</button>
                </span>
              </div>
              <div class="form-group row">
                <label class="col-md-3 control-label">Scan Comments</label>
                <div class="input-group date col-md-7">
                  <!-- <textarea name="lead_ekg" id="" cols="50" rows="1" style="border-radius:20px; padding:10px;box-sizing: border-box;"></textarea> -->
                  <input type="text" class="full-width" name="comment" id="scan_result_comment">
                </div>
                <span class="input-group-btn">
                  <button class="btn btn-info " onclick="submitScanComment()">save</button>
                </span>
              </div>
              <div class="form-group row">
                <label class="col-md-3 control-label">12 Lead EKGs</label>
                <div class="input-group date col-md-7">
                  <!-- <textarea name="lead_ekg" id="" cols="50" rows="1" style="border-radius:20px; padding:10px;box-sizing: border-box;"></textarea> -->
                  <input type="text" class="full-width" id="ekg_result_comment">
                </div>
                <span class="input-group-btn">
                  <button type="submit" class="btn btn-info " onclick="submitEkgComment()">save</button>
                </span>
              </div>
            </div>

          </div>
          <!-- <div class="modal-footer border-top-0 d-flex justify-content-center">
            <button id="peak_modal_save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
              save
            </button>
            <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
              Cancel
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>


</div>


<script>
  function getPreAnaesthesia(ele, event) {
    let val = $(ele).val();
    let options = ["pulmonary_examination", "physical_exam", "diagnostic_test", "allergies", "signature", "system_review", "care_informed", "informed_consent", "anaesthesia_technique"]
    if(val.length > 0) {
      options.forEach(element => {
        if (val[0] == element) {
          $(\`#\${element}\`).show()
        }else {
          $(\`#\${element}\`).hide()
        }
      });
    } else{
      options.forEach(element => {
        $(\`#\${element}\`).show()
      });
    }
  }

  function populatePhysicalExam() {
    $.ajax({
      type: "GET",
      url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitVitalsb', $requestSurgery->patient_visit->patient_id, $requestSurgery->patient_visit_id]) -->",
      success: function g(data, textStatus) {
        let vitals = data.data
        console.log(vitals)
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

  function populateScansResults() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRadiologyRequests', $patient->id, $selectedVisit->id, ]) -->",
			success: function g(info, textStatus) {
				let result = ''
				let data = info.data

        if(Array.isArray(data) && data.length > 0) {
          data.forEach(element => {
            if(element.status_id == 23) {
              result += \`<li class="bold">\${element.radiology_scan.name} \${element.source ? '<span class="badge badge-primary">' + element.source + '</span>' : '' }
                <a type="button" href="javascript:" data-toggle="modal" data-target="#scanImage_\${"row.id"}" class="btn btn-primary btn-xs" data-whatever="\${1}">
                  View Files
                </a>
              </li>\`
            }
					});
					$('#preanaesthesia_scan_results').append(result)
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

  function savePhysicalStatus(params) {
    let value = $("#pre_physical_status").val()
    data = [{name: "physical_status", value: value}]
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'physicalStatus', $requestSurgery->id]) -->",
			data: data,
			success: function g(data, textStatus) {
				getSurgeriesInfo()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }
  function saveBeforeMode(params) {
    let value = $("#pre_anaesthesia_before").val()
    data = [{name: "duration", value: value}]
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'deliveryMode', $requestSurgery->id, "before"]) -->",
			data: data,
			success: function g(data, textStatus) {
				getSurgeriesInfo()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }
  function saveDuringMode(params) {
    let value = $("#pre_anaesthesia_during").val()
    data = [{name: "duration", value: value}]
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'deliveryMode', $requestSurgery->id, "during"]) -->",
			data: data,
			success: function g(data, textStatus) {
				getSurgeriesInfo()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }
  function saveAfterMode(params) {
    let value = $("#pre_anaesthesia_after").val()
    data = [{name: "duration", value: value}]
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'deliveryMode', $requestSurgery->id, "after"]) -->",
			data: data,
			success: function g(data, textStatus) {
				getSurgeriesInfo()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }
  function saveAnaesthesiaProblems(params) {
    let value = $("#anaethesia_problem_id").val()
    data = [{name: "anaethesia_problem_id", value: value}, {name: "anaethesia_problem_other", value: $("#anaethesia_problem_other").val()}]
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'anaesthesiaProblem', $requestSurgery->id]) -->",
			data: data,
			success: function g(data, textStatus) {
				getSurgeriesInfo()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }

  function populateLabResults() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRequestLabs', $patient->id, $selectedVisit->id, ]) -->",
			success: function g(info, textStatus) {
				let result = ''
        let data = info.data
        console.log("help",data)

				if(Array.isArray(data) && data.length > 0) {
					data.forEach(element => {
            if(element.status_id == 23) {
              result += \`<li class="bold">\${element.lab_test.name} \${element.source ? '<span class="badge badge-primary">' + element.source + '</span>' : '' }
                <a type="button" href="javascript:" data-toggle="modal" data-target="#scanImage_\${"row.id"}" class="btn btn-primary btn-xs" data-whatever="\${1}">
                  View Result
                </a>
              </li>\`
            }
					});
					$('#preanaesthesia_lab_results').append(result)
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

  function populatePlanOfCare() {
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
  }

  function submitScanComment() {
    let comment = $("#scan_result_comment").val()
    let category = 2
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'setTestResultComments', $requestSurgery->id, ]) -->",
      data: [{name: "comment", value: comment}, {name:"category", value: category}],
			success: function g(data, textStatus) {
				populateLabScanEkgComments()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }

  function submitEkgComment() {
    let comment = $("#ekg_result_comment").val()
    let category = 3
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'setTestResultComments', $requestSurgery->id, ]) -->",
      data: [{name: "comment", value: comment}, {name:"category", value: category}],
			success: function g(data, textStatus) {
				populateLabScanEkgComments()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }

  function submitLabComment() {
    let comment = $("#lab_result_comment").val()
    let category = 1
    $.ajax({
			type: "POST",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'setTestResultComments', $requestSurgery->id, ]) -->",
      data: [{name: "comment", value: comment}, {name:"category", value: category}],
			success: function g(data, textStatus) {
        populateLabScanEkgComments()
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }

  function populateLabScanEkgComments() {
    $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'getTestResultComments', $requestSurgery->id, ]) -->",
			success: function g(info, textStatus) {
				let scan = ''
				let lab = ''
				let ekg = ''
				let data = info.data
				
				if(Array.isArray(data) && data.length > 0) {
          data.forEach(element => {
            if (element.category == 1) {
              lab += \`<li>\${element.comment}</li>\`
            } else if (element.category == 2) {
              scan += \`<li>\${element.comment}</li>\`
            } else if (element.category == 3) {
              ekg += \`<li>\${element.comment}</li>\`
            }
          });

          $('#preanaesthesia_lab_results_comments').html(lab)
          $('#preanaesthesia_scan_results_comments').html(scan)
          $('#preanaesthesia_ekg_results_comments').html(ekg)
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }

  function changeAnaesthesiaProblems(value) {
    if(value == 4){
      $("#anaethesia_problem_other").show()
    }else{
      $("#anaethesia_problem_other").hide()

    }
  }

  function populate_anaethesia_problems() {
    $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'getAnaesthesiaProblems', $requestSurgery->id, ]) -->",
			success: function g(info, textStatus) {
				let result = ""
				let data = info.data
				if(Array.isArray(data) && data.length > 0) {
          data.forEach(element => {
            result += \`<option value="\${element.id}">\${element.name}</option>\`
          });

          $('#anaethesia_problem_id').html(result)
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }



  $(document).ready(() => {
    populateScansResults()
    populateLabResults()
    populatePhysicalExam()
    populateLabScanEkgComments()
    populate_anaethesia_problems()
  })
</script>
`;

export default function ElementElementRequestSurgeriesPreAnaesthesia() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
