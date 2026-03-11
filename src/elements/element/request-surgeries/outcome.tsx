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
				<span class="caption-subject font-dark bold uppercase mr-5">Outcome</span>
			</div>
		</div>


		<div class="borderBox-body clinicalMain">

			<div class="row">
				<div class="col-md-8 stylish-card-section">
					<div class="col-md-12">
						<!--Problems Card-->
						<div class="card bg-light mb-3 problemsCard with-transform" style="min-height: 370px;">
							<div class="card-header  ">
							</div>
							<div class="card-body">
                
              </div>
							<a type="button" class="full-width pull-right text-slate-900 text-primary text-right pr-2 pb-2" style="margin-auto" data-toggle="modal" data-target="#outcomes_card">
								View
							</a>
						</div>
						<!--//Problems Card-->

					</div>
				</div>

			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="outcomes_card" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Outcome</h5>
          <span class="pull-left" style="color: red;">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="mb-2">
          <span class="label label-lg bg-primary text-uppercase "><b>Outcome <span class="modal_drug_title"></span></b>
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
								<label class="control-label col-md-4">Successful Completion and OPD Discharge:
								</label>
								<div class="col-md-8">
                  <div id="prescription_form_priority">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="ill_episode" id="stat_radio" value="chronic" checked>
                      <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="ill_episode" id="routine_radio" value="acute">
                      <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                    </div>
                  </div>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Successful completion and InPatient Movement i.e admission to recovery ward:
								</label>
								<div class="col-md-8">
                  <div id="prescription_form_priority">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="ill_episode" id="stat_radio" value="chronic" checked>
                      <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="ill_episode" id="routine_radio" value="acute">
                      <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                    </div>
                  </div>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Case Cancellation - Cancel this Case, Snooze to Move other Cases Up:
								</label>
								<div class="col-md-8">
                  <div id="prescription_form_priority">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="ill_episode" id="stat_radio" value="chronic" checked>
                      <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="ill_episode" id="routine_radio" value="acute">
                      <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                    </div>
                  </div>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Reason for Cancellation:
								</label>
								<div class="col-md-8">
                  <input type="text" class="form-control input-height full-width" name="" id="">
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Reschedule:
								</label>
								<div class="col-md-8">
                  <input type="date" class="form-control input-height full-width" name="" id="">
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

`;

export default function ElementElementRequestSurgeriesOutcome() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
