const rawHtml = `
<!-- php: $patient_id = $selectedVisit->patient_id; $patient_visit_id = $selectedVisit->id; $patient_age = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_o... -->

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

		.form-check-label{
			margin-right: 1px;
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

		.form-check{
			margin-bottom: 10px
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

		.accordion-header {
			padding: 10px;
			background: rgba(97, 175, 254, .2);

		}
	</style>
	<!--Clinical Notes section -->

	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line row" style="display:flex;justify-content:space-between">
			<div class="caption pl-3">
				<span class="caption-subject font-dark bold uppercase mr-5">Clinical Encounter Notes</span>
				<!-- php: if($hasEncounterNote && $isCurrentVisit) { -->

					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" id="previous_enc_checkbox" value="option1">
						<label class="form-check-label" for="previous_enc_checkbox">Previous Encounter Reviewed</label>
					</div>
				<!-- php: } -->
			</div>

			<div class="float-right">
				<div class="row" style="padding-right: 30px;">
					
					<!-- php: if($isCurrentVisit): -->
						<!-- php: if($hasEncounterNote ) { -->
							<a href="#newNoteCollapse" class="btn btn-primary mr-2 d-none" type="button" data-toggle="collapse" aria-expanded="false" role="button" id="newNote_btn" aria-controls="newNoteCollapse">New Notes</a>
						<!-- php: } else { -->
							<a href="#newNoteCollapse" class="btn btn-success mr-2" type="button" data-toggle="collapse" aria-expanded="false" role="button" id="newNote_btn" aria-controls="newNoteCollapse">Start Notes</a>
						<!-- php: } -->
					<!-- php: endif; -->
					<a href="javascript:;" class="btn btn-danger mr-2">Report</a>
					<a href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'ViewPatient', $patient_id]) -->" onclick="javacsript:localStorage.setItem('patientInfoLastTab', 'flow_chart')" target="_blank" class="btn btn-secondary">Care Flow</a>

				</div>

			</div>

		</div>


		<div class="borderBox-body clinicalMain">

			<!--new note section -->
			<div class="collapse " id="newNoteCollapse">
				<!--Search bar-->
				<div class="col-md-12">
					<div class="search-input">
						<a href="" target="_blank" hidden></a>
						<input type="text" placeholder="Type to search note.." style="display:none">
						<div class="autocom-box">
							<!-- here list are inserted from javascript -->
						</div>
						<!-- <div class="icon"><i class="material-icons">search</i></div> -->
					</div>
				</div>

				<!--//search bar-->
				<div class="row" id="page-content">




					<div class="newNotBody col-12 p-3">

						<!--Accordion Section-->
						<div class="accordion mb-5" id="clinical_encounter_accordions">


							<!--cc accordion-->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="ccHeading" class="accordion-header bold  " data-toggle="collapse" data-target="#ccCollapse" aria-expanded="true" aria-controls="ccCollapse">
									CC & History Of Presenting Illness
								</div>



								<div id="ccCollapse" class="collapse" aria-labelledby="ccHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<textarea id="cc-editor" name="chief_complaint" class="form-control" rows="5"></textarea>
										</div>


									</div>


									<!--buttons-->

									<div class="dropup  ml-3 mb-3 ">
										<a href="javascript:;" class="btn btn-sm btn-primary dropbtn"> Template</a>
										<div class="dropup-content">

											<div class="submenu">
												<a href="javascript:;">My </a>
												<div>
													<div class="submenu">
														<a href="javascript:;" class="submenu-header">Abdomen Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>

													</div>


													<div class="submenu">
														<a href="javascript:;">Back Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>

													<div class="submenu">
														<a href="javascript:;">Chest Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>



													<div class="submenu">
														<a href="javascript:;">Head Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Pelivs Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>



													<div class="submenu">
														<a href="javascript:;">Tooth Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Rectum Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>



													<div class="submenu">
														<a href="javascript:;">Ear Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>



													<div class="submenu">
														<a href="javascript:;">Skin Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>



													<div class="submenu">
														<a href="javascript:;">Leg Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Hand Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Arm Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>



													<div class="submenu">
														<a href="javascript:;">Shoulder Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Wrist Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Knee Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Elbow Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">Joint Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>


													<div class="submenu">
														<a href="javascript:;">General Body Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>



													<div class="submenu">
														<a href="javascript:;">Chronic Pain Hurts</a>
														<div>
															<a href="javascript:;" class="pain" data-pain="1">Pain Level - 1</a>
															<a href="javascript:;" class="pain" data-pain="2">Pain Level - 2</a>
															<a href="javascript:;" class="pain" data-pain="3">Pain Level - 3</a>
															<a href="javascript:;" class="pain" data-pain="4">Pain Level - 4</a>
															<a href="javascript:;" class="pain" data-pain="5">Pain Level - 5</a>
															<a href="javascript:;" class="pain" data-pain="6">Pain Level - 6</a>
															<a href="javascript:;" class="pain" data-pain="7">Pain Level - 7</a>
															<a href="javascript:;" class="pain" data-pain="8">Pain Level - 8</a>
															<a href="javascript:;" class="pain" data-pain="9">Pain Level - 9</a>
															<a href="javascript:;" class="pain" data-pain="10">Pain Level - 10</a>
														</div>
													</div>
												</div>


											</div>
											<div class="submenu">
												<a href="javascript:;" class="main-header">I Feel</a>
												<div>
													<a href="javascript:;" class=" no-submenu">Chills</a>
													<a href="javascript:;" class=" no-submenu">Fever</a>
													<a href="javascript:;" class=" no-submenu">LightHeaded</a>
													<div class="submenu">
														<a href="javascript:;" class="submenu-header has-submenu">Parenthesia</a>
														<div>
															<a href="javascript:;" class="nested-submenu no-submenu">Numbness</a>
															<a href="javascript:;" class="nested-submenu no-submenu">Tingling</a>
															<a href="javascript:;" class="nested-submenu no-submenu">Electric Tweaks</a>
														</div>
													</div>

													<div class="submenu">
														<a href="javascript:;">Dizzy</a>
														<div>
															<a href="javascript:;" class="nested-submenu no-submenu">About to black Out</a>
															<a href="javascript:;" class="nested-submenu no-submenu">With room spinning around me</a>
														</div>
													</div>
													<a href="javascript:;" class=" no-submenu">My mouth is dry</a>
													<a href="javascript:;" class=" no-submenu">Nausaeted</a>
													<div class="submenu">
														<a href="javascript:;">Sick</a>
														<div>
															<a href="javascript:;" class="nested-submenu no-submenu">Like i have a flu</a>
															<a href="javascript:;" class="nested-submenu no-submenu">Like i have to vomit</a>
														</div>
													</div>

													<a href="javascript:;" class=" no-submenu">Short of Breath</a>
													<a href="javascript:;" class=" no-submenu">Spleepy</a>
													<a href="javascript:;" class=" no-submenu">Sweaty</a>
													<a href="javascript:;" class=" no-submenu">Thirsty</a>
													<a href="javascript:;" class=" no-submenu">Tired</a>
													<a href="javascript:;" class=" no-submenu">Weak</a>
												</div>

											</div>

											<div class="submenu">
												<a href="javascript:;">I can't</a>
												<div>
													<a href="javascript:;" class=" no-submenu-c">Breath Normally</a>

													<div class="submenu">
														<a href="javascript:;">Hear Normally</a>
														<div>
															<a href="javascript:;" class="nested-submenu no-submenu-c">Losing hearing</a>
															<a href="javascript:;" class="nested-submenu no-submenu-c">Sounds are too loud</a>
															<a href="javascript:;" class="nested-submenu no-submenu-c">Ringing or hissing in my ear</a>
														</div>
													</div>

													<div class="submenu">
														<a href="javascript:;">Move on one side </a>
														<div>
															<a href="javascript:;" class="nested-submenu no-submenu-c">Arm and/or leg</a>
														</div>

													</div>

													<a href="javascript:;" class=" no-submenu-c">Pass bowel action properly</a>
													<a href="javascript:;" class=" no-submenu-c">Pass urine normally</a>
													<a href="javascript:;" class=" no-submenu-c">Remember Normally</a>

													<div class="submenu">
														<a href="javascript:;">See properly</a>
														<div>
															<a href="javascript:;" class="nested-submenu no-submenu-c">Blindness</a>
															<a href="javascript:;" class="nested-submenu no-submenu-c">Double vision</a>
															<a href="javascript:;" class="nested-submenu no-submenu-c">Blurred vision</a>
														</div>
													</div>

													<a href="javascript:;" class=" no-submenu-c">Sleep normally</a>
													<a href="javascript:;" class=" no-submenu-c">Smell things normally</a>
													<a href="javascript:;" class=" no-submenu-c">Speak normally</a>
													<a href="javascript:;" class=" no-submenu-c">Stop passing watery bowels actions</a>
													<a href="javascript:;" class=" no-submenu-c">Stop scratching</a>
													<a href="javascript:;" class=" no-submenu-c">Stop sweating</a>
													<a href="javascript:;" class=" no-submenu-c">Swallow normally</a>
													<a href="javascript:;" class=" no-submenu-c">Taste properly</a>
													<a href="javascript:;" class=" no-submenu-c">Walk normally</a>
													<a href="javascript:;" class=" no-submenu-c">Write normally</a>

												</div>

											</div>

										</div>
									</div>



									<!-- <a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->


									<!--//buttons-->






								</div>
							</div>
							<!--//cc accorion-->



							<!--history of presenting illness accordion-->
							<!-- <div class="accordionDiv mb-3  mx-3 ">
								<div id="hpiHeading" class="accordion-header bold " data-toggle="collapse" data-target="#hpiCollapse" aria-expanded="true" aria-controls="hpiCollapse">
									History Of Presenting Illness
								</div>



								<div id="hpiCollapse" class="collapse col-md-12" aria-labelledby="hpiHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<div id="hpiEditor" class="notesEditor"></div>

										</div>


									</div>


									<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
									<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>


								</div>
							</div> -->
							<!--//history of presenting illness accordion-->


							<!--on direct questioning accordion-->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="odqHeading" class="accordion-header bold " data-toggle="collapse" data-target="#odqCollapse" aria-expanded="true" aria-controls="odqCollapse">
									On Direct Questioning
								</div>



								<div id="odqCollapse" class="collapse" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">

											<div class="borderBox light bordered col-md-12">
												<!-- <div class="borderBox-title tabbable-line">
													<ul class="nav nav-tabs">
														<li class="nav-item ">
															<a href="#odq_tab" data-toggle="tab"> ODQs </a>
														</li>
														<li class="nav-item">
															<a href="#notes_tab" data-toggle="tab"> Notes </a>
														</li>
													</ul>
												</div> -->

												<div class="borderBox-title tabbable-line" id="odq-div">
													<ul class="nav nav-tabs odq-categories" style="float:left">

													</ul>
												</div>
												<div class="borderBox-body">
													<form class="tab-content odq-tab-content" id="odq-form">
														
													</form>
												</div>
												<div>
												</div>
											</div>
										</div>
										<!--buttons-->
										<div class="dropup d-none  ml-3 mb-3  ">
											<a href="javascript:;" class="btn btn-sm btn-primary dropbtn"> Template</a>
											<div class="dropup-content">

												<a href="javascript:;" data-toggle="modal" data-target="#addCardioVascular">Cardiovascular</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addCentralNervous">Central Nervous</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addEndrocine">Endrocine</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addGastrointestinal">Gastriintestinal</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addGenitourinary">Genitourinary</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addHaemopoietic">Haemopoietic</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addLocomotor">Locomotor and Joints</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addRespiratory">Respiratory</a>
												<a href="javascript:;" data-toggle="modal" data-target="#addSkin">Skin</a>


											</div>
										</div>
										<!-- <a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
										<!-- <a href="javascript:;" class="btn btn-sm btn-success float-right mr-3 saveBtn">Save</a> -->
										<!--//buttons-->
									</div>
								</div>
							</div>
							<!--//on direct questioning accordion-->

							<!--Allergy accordion-->
							<div class="accordionDiv mb-3 mx-3 ">
								<div id="allergyHeading" class="accordion-header bold " data-toggle="collapse" data-target="#allergyCollapse" aria-expanded="true" aria-controls="allergyCollapse">
									Allergy 
								</div>
								<div id="allergyCollapse" class="collapse" aria-labelledby="allergyHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<div class="borderBox light bordered col-md-12">
												<!-- <div class="borderBox-title tabbable-line">

													<ul class="nav nav-tabs">
														<li class="nav-item">
															<a href="#ah_history_tab" class="active show" data-toggle="tab"> History </a>
														</li>
														<li class="nav-item">
															<a href="#ah_notes_tab" data-toggle="tab"> Notes </a>
														</li>
													</ul>
												</div> -->
												<div class="borderBox-body">
													<div class="tab-content">
														<!--history tab-->
														<div class="show" id="">
															<div class="card-body">
																<div class="row">
																	<!--Allergy history section-->
																	<div class="col-md-12">

																		<div class="pt-2 ">
																			<!-- <h3 class="bold">Allergy History</h3> -->
																			<form id='allergyHistoryForm'>
																				<div class="form-body">

																					<div class="form-group row">
																						<label class="control-label col-md-3">Category

																						</label>
																						<div class="col-md-9" id="allergy-category-div">
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Substance
																						</label>
																						<div class="col-md-9">
																							<SearchableSelectField class="form-control selectpicker"data-size="4" name="" id="encounter_allergy_id" data-live-search="true" onchange="passSelectedAllergySUbstance(this)">
																								<option value="">Select...</option>
																							</SearchableSelectField>
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Selected Substance(s)
																						</label>
																						<div class="col-md-9">
																							<SearchableSelectField class="form-control selectpicker" name="encounter_allergy_ids[]" id="encounter_allergy_ids" data-live-search="true" multiple>
																							</SearchableSelectField>
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Reaction(s)
																						</label>
																						<div class="col-md-9">
																							<SearchableSelectField class="form-control selectpicker" data-size="4" name="encounter_allergy_reaction_id[]" id="encounter_allergy_reaction_id" data-live-search="true" multiple>
																								<option value="">Select...</option>
																							</SearchableSelectField>			
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Severity
																						</label>
																						<div class="col-md-9" id="allergy-severity-div">		
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Estimated Onset
																						</label>
																						<div class="input-group col-md-9">
																							<input class="form-control set_date_past" size="16" type="text" placeholder="Enter Estimated Onset of Allergy" style="max-height: 35px;" readonly="">
																							<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Reaction Type
																						</label>
																						<div class="col-md-9" id="allergy-reaction-type-div">
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Pharmacological Management
																						</label>
																						<div class="col-md-9" id="allergy-pharmacological-management-div">
																							<!-- <div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="pharma_managment" id="inlineRadio3" value="Antihistamines">
																								<label class="form-check-label" for="inlineRadio3">Antihistamines</label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="pharma_managment" id="inlineRadio3" value="Decongestants">
																								<label class="form-check-label" for="inlineRadio3">Decongestants</label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="pharma_managment" id="inlineRadio3" value="Nasal Corticosteroids">
																								<label class="form-check-label" for="inlineRadio3">Nasal Corticosteroids</label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="pharma_managment" id="inlineRadio3" value="Leukotriene Receptor Antagonists">
																								<label class="form-check-label" for="inlineRadio3">Leukotriene Receptor Antagonists</label>
																							</div> -->
																							<!-- <SearchableSelectField class="form-control selectpicker">
																								<option value="">Select...</option>
																								<option value="1">Antihistamines</option>
																								<option value="2">Decongestants</option>
																								<option value="3">Nasal Corticosteroids</option>
																								<option value="4">Leukotriene Receptor Antagonists</option>
																							</SearchableSelectField> -->
																						</div>
																					</div>
																				</div>
																			</form>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<!--notes tab-->
														<!-- <div class="tab-pane" id="ah_notes_tab">
															<div class="card-body">
																<div class="row">
																	<textarea id="ahEditor" class="form-control notesEditor" rows="5"></textarea>

																</div>
															</div>
														</div> -->
													</div>
												</div>

											</div>
										</div>
									</div>
									<!-- <a href="javascript:;" id="ah_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" id="ah_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
									<!-- <a href="javascript:;" id="ah_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
								</div>
							</div>
							<!--//Allergy accordion-->

							<!--Past medical history accordion-->
							<div class="accordionDiv mb-3 mx-3 ">
								<div id="pmhHeading" class="accordion-header bold " data-toggle="collapse" data-target="#pmhCollapse" aria-expanded="true" aria-controls="pmhCollapse">
									Past Medical History
								</div>
								<div id="pmhCollapse" class="collapse" aria-labelledby="pmhHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<div class="borderBox light bordered col-md-12">
												<div class="borderBox-title tabbable-line">

													<ul class="nav nav-tabs" style="float:left">
														<li class="nav-item">
															<a href="#past_illness_tab" class="active" data-toggle="tab"> Comorbidity </a>
														</li>
														<li class="nav-item">
															<a href="#past_active_medication_tab" class="" data-toggle="tab"> Active / Past Medication</a>
														</li>
														<li class="nav-item">
															<a href="#past_surgeries_tab" class="" data-toggle="tab"> Past Surgeries </a>
														</li>
														<li class="nav-item">
															<a href="#past_haemo_tab" class="" data-toggle="tab"> Past Haemotransfusion </a>
														</li>
														<li class="nav-item">
															<a href="#immu_hx_tab" class="" data-toggle="tab"> Immunization History </a>
														</li>
														<!-- <li class="nav-item">
															<a href="#pmh_history_tab" class="" data-toggle="tab"> History </a>
														</li> -->
														<!-- <li class="nav-item">
															<a href="#pmh_viewHistory_tab" data-toggle="tab"> View History </a>
														</li> -->
														<!-- <li class="nav-item">
															<a href="#pmh_notes_tab" data-toggle="tab"> Notes </a>
														</li> -->
													</ul>
												</div>
												<div class="borderBox-body">
													<div class="tab-content">
														<div class="tab-pane active show" id="past_illness_tab">
															<textarea id="past-illness" class="form-control" rows="5"></textarea>
															<!-- <form id='illnessForm'>
																<div class="form-body">


																	<div class="form-group row">
																		<label class="control-label col-md-5">Past Illness
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control selectpicker" name="comorbidity_id" id="comorbidity_id" data-live-search="true">
																				<option value="">Select...</option>
																			</SearchableSelectField>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Time Period

																		</label>
																		<div class="input-group col-md-7">
																			<input class="form-control set_date_past" id="illness_period" name="illness_period" size="16" type="text" placeholder="Enter Illness Time Period" style="max-height: 35px;" readonly="">
																			<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Description

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="description" id="illness_desc" data-required="0" placeholder="Enter Description" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Comment

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="comment" id="illness_comment" data-required="0" placeholder="Enter Comment" class="form-control input-height" />
																		</div>
																	</div>
																</div>
															</form> -->
															<!-- <a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
														</div>
														<div class="tab-pane" id="past_active_medication_tab">
															<textarea id="past-active-medication" class="form-control" rows="5"></textarea>

															<!-- <div class="card-body">
																<div class="row">
																	<div class="col-md-12">
																		<div class="pt-2 ">
																			<form class='mhForm' id="mhForm">
																				<div class="form-body">

																					<div class="form-group row">
																						<label class="control-label col-md-5">Current Medication

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="current_medication" id="current_medication" data-required="0" placeholder="Enter Current Medication" class="form-control input-height" />
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Past Medication

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="past_medication" id="past_medication" data-required="0" placeholder="Enter Past Medication" class="form-control input-height" />
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Herbal Medication

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="herbal_medication" id="herbal_medication" data-required="0" placeholder="Enter Herbal Medication" class="form-control input-height" />
																						</div>
																					</div>
																				</div>
																			</form> 
																		</div> 
																	</div>
																</div>
															</div> -->
														</div>
														<div class="tab-pane" id="past_surgeries_tab">
															<textarea id="past-surgeries" class="form-control" rows="5"></textarea>
															<!-- <form id="surgeriesForm">
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Time Period

																		</label>
																		<div class="input-group col-md-7">
																			<input class="form-control set_date_past" id="pmh_surgeries_period" name="surgeries_period" size="16" type="text" placeholder="Enter Surgery Time Period" style="max-height: 35px;" readonly="">
																			<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Select Surgery

																		</label>
																		<div class="input-group col-md-7">
																			<SearchableSelectField class="form-control selectpicker" name="surgery_id" id="pmh_surgery_id" data-live-search="true">
																				<option value="">Select</option>
																			</SearchableSelectField>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Description

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="description" id="pmh_surgeries_desc" data-required="0" placeholder="Enter Description" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Comment

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="comment" data-required="0" id="pmh_surgeries_comment" placeholder="Enter Comment" class="form-control input-height" />
																		</div>
																	</div>
																</div>
															</form> -->
															<!-- <a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
														</div>
														<div class="tab-pane" id="past_haemo_tab">
															<textarea id="past-haemo" class="form-control" rows="5"></textarea>
															<!-- <form id="haemoForm">
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Time Period

																		</label>
																		<div class="input-group col-md-7">
																			<input class="form-control set_date_past" id="haemo_period" name="haemo_period" size="16" type="text" placeholder="Enter HaemoTransfusion Time Period" style="max-height: 35px;" readonly="">
																			<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Description

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="description" id="haemo_desc" data-required="0" placeholder="Enter Description" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Comment

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="comment" id="haemo_comment" data-required="0" placeholder="Enter Comment" class="form-control input-height" />
																		</div>
																	</div>
																</div>
															</form> -->
															<!-- <a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
														</div>
														<div class="tab-pane" id="immu_hx_tab">
															<textarea id="immu-editor" class="form-control" rows="5"></textarea>
															<!-- <a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
														</div>
														
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!--//past medical history accordion-->


							<!--Immunization History accordion-->
							<!-- <div class="accordionDiv mb-3 mx-3 ">
								<div id="ihHeading" class="accordion-header bold " data-toggle="collapse" data-target="#ihCollapse" aria-expanded="true" aria-controls="ihCollapse">
									Immunization History
								</div>
								<div id="ihCollapse" class="collapse" aria-labelledby="ihHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<textarea id="immu-editor" class="form-control" rows="5"></textarea>

										</div>
									</div>
									<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
									<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
								</div>
							</div> -->
							<!--//Immunization History accorion-->

							<!-- Previous Optical History accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="prevOpticalHeading" class="accordion-header bold " data-toggle="collapse" data-target="#prevOpticalCollapse" aria-expanded="true" aria-controls="fhCollapse">
									Previous Optical History
								</div>

								<form id='prevOpticalHistory_form'>
									<div id="prevOpticalCollapse" class="collapse" aria-labelledby="prevOpticalHeading" data-parent="#clinical_encounter_accordions">
										<div class="card-body">
											<div class="row">
												Previous prescriptions, contact lens usage, LASIK history
	
												<textarea id="previous_prescriptions" name="previous_prescriptions" class="form-control" rows="5" placeholder=""></textarea>
												Past eye conditions (cataracts, strabismus, etc.)
	
												<textarea id="past_eye_conditions" name="past_eye_conditions" class="form-control" rows="5" placeholder=""></textarea>
	
											</div>
										</div>
	
									</div>
								</form>

							</div>
							<!-- Previous Optical History accordion -->

							<!-- Past Visual Acuity History accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="visual_acuity_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#visual_acuity_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									Past Visual Acuity History
								</div>



								<div id="visual_acuity_Collapse" class="collapse" aria-labelledby="visual_acuity_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="visual_acuity_form">
														<div class="form-body" id="healthconcern_formbody">
															<h4>Previous Corrective Lens Prescription</h4>
															<div class="form-group row">
																<label class="control-label col-md-5">Date of Last Prescription

																</label>
																<div class="col-md-7 row">
																	<input type="date" name="name" data-required="0" placeholder="" class="form-control input-height col-md-9" />
																</div>
															</div>

															<div class="form-group row">
																<label class="control-label col-md-5">Right Eye

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="d-flex">
																		<div class="col-md-3">Sphere</div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																		<div class="col-md-1">D</div>
																	</div>
																	<div class="d-flex">
																		<div class="col-md-3">Cylinder</div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																		<div class="col-md-1">D</div>
																	</div>
																	<div class="d-flex">
																		<div class="col-md-3">Axis</div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																		<div class="col-md-1">Degrees</div>
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Left Eye

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="d-flex">
																		<div class="col-md-3">Sphere</div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																		<div class="col-md-1">D</div>
																	</div>
																	<div class="d-flex">
																		<div class="col-md-3">Cylinder</div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																		<div class="col-md-1">D</div>
																	</div>
																	<div class="d-flex">
																		<div class="col-md-3">Axis</div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																		<div class="col-md-1">Degrees</div>
																	</div>
																</div>
															</div>

															<h4>Previous Best Corrected Visual Acuity (BCVA)</h4>

															<div class="form-group row">
																<label class="control-label col-md-5">Right Eye (OD)

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="d-flex">
																		<div class="col-md-3">20 / </div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Left Eye (OS)

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="d-flex">
																		<div class="col-md-3">20 / </div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>

															<h4>Previous unaided visual acuity (if available):</h4>

															<div class="form-group row">
																<label class="control-label col-md-5">Right Eye (OD)

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="d-flex">
																		<div class="col-md-3">20 / </div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Left Eye (OS)

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="d-flex">
																		<div class="col-md-3">20 / </div>
																		<input type="text" name="location" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- Past Visual Acuity History accordion -->

							<!-- History of Refractive Errors accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="refractive_errors_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#refractive_errors_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									History of Refractive Errors
								</div>



								<div id="refractive_errors_Collapse" class="collapse" aria-labelledby="refractive_errors_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="refractive_errors_form">
														<div class="form-body" id="healthconcern_formbody">

															<div class="form-group row">
																<label class="control-label col-md-5">Known Refractive Conditions

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Myopia</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Hyperopia</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Astigmatism</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Presbyopia">
																		<label class="form-check-label">Presbyopia</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">History of Changes in Presciption

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Gradual Increase in Myopia/Hyperopia</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Stable Vision over Time</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Sudden Change in Vision</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Previous Treatments for Refractive Errors

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Glasses</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Contact Lenses</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Refractive Surgery (e.g., LASIK, PRK)</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Date of Surgery (if applicable):</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Details of Surgery (if applicable):</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- Past Eye Conditions and Treatments accordion -->

							<!-- Past Eye Conditions and Treatments accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="eye_condition_treatments_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#eye_condition_treatments_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									Past Eye Conditions and Treatments
								</div>



								<div id="eye_condition_treatments_Collapse" class="collapse" aria-labelledby="refractive_errors_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="past_eye_conditions_form">
														<div class="form-body" id="healthconcern_formbody">

															<div class="form-group row">
																<label class="control-label col-md-5">History of Eye Conditions: (Check all that apply)

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Cataracts</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Glaucoma</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Macular Degeneration</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Presbyopia">
																		<label class="form-check-label">Dry Eye Syndrome</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Presbyopia">
																		<label class="form-check-label">Eye Infections (e.g., conjunctivitis)</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<h4>Past Medical Treatments</h4>
															<div class="form-group row">
																<label class="control-label col-md-5">Eye Medications

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Anti-inflammatory Drops</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Antibiotics</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Artificial Tears</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Past Surgeries

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Cataract Surgery</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Glaucoma Surgery</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Retinal Surgery</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Outcome of Treatments

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Successful</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label"> Recurrence of Condition</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Ongoing Treatment Needed</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- Past Eye Conditions and Treatments accordion -->

							<!-- History of Optical Devices accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="optical_devices_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#optical_devices_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									History of Optical Devices
								</div>



								<div id="optical_devices_Collapse" class="collapse" aria-labelledby="optical_devices_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="history_optical_devices_form">
														<div class="form-body" id="healthconcern_formbody">

															<div class="form-group row">
																<label class="control-label col-md-5">Previous Glasses

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Single Vision</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Bifocal</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Progressive</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Patient Satisfaction with Glasses

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Satisfactory</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Complaints of Discomfort (e.g., headaches, distortion)</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Change Required (e.g., for work, lifestyle needs)</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<h4>Previous Contact Lenses</h4>
															<div class="form-group row">
																<label class="control-label col-md-5">Type of Lenses

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Soft Contact Lenses</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Rigid Gas Permeable (RGP)</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Toric</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Multifocal</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Patient Satisfaction with Contact Lenses

																</label>
																
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Satisfactory</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Complaints of Discomfort (e.g., headaches, distortion)</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Change Required (e.g., for work, lifestyle needs)</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- History of Optical Devices accordion -->

							<!-- History of Eye Exams accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="history_eye_exams_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#history_eye_exams_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									History of Eye Exams
								</div>



								<div id="history_eye_exams_Collapse" class="collapse" aria-labelledby="history_eye_exams_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="history_of_eye_exams_form">
														<div class="form-body" id="healthconcern_formbody">

															<div class="form-group row">
																<label class="control-label col-md-5">Date of Last Comprehensive Eye Exam

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check d-flex align-items-center">
																		<input type="date" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Frequency of Previous Eye Exams

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Annual</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Every 2 Years</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Less Frequent (please specify):</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Previous Exam Findings

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check d-flex align-items-center row">
																		<label class="form-check-label col-md-2">Right Eye:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																	<div class="form-check d-flex align-items-center row">
																		<label class="form-check-label col-md-2">Left Eye :</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- History of Eye Exams accordion -->

							<!-- Previous Optical Treatment Notes accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="optical_treatment_notes_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#optical_treatment_notes_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									Previous Optical Treatment Notes
								</div>



								<div id="optical_treatment_notes_Collapse" class="collapse" aria-labelledby="optical_treatment_notes_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="optical_notes_form">
														<div class="form-body" id="healthconcern_formbody">

															<div class="form-group row">
																<label class="control-label col-md-5">Success of Past Treatment

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Satisfactory</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Partial Success</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Astigmatism">
																		<label class="form-check-label">Required Adjustment</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>

															Additional Comments

															<textarea id="previous_prescriptions" name="previous_prescriptions" class="form-control" rows="5" placeholder=""></textarea>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- Previous Optical Treatment Notes accordion -->


							<!-- Patient Lifestyle and Visual Needs accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="lifestyle_visual_needs_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#lifestyle_visual_needs_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									Patient Lifestyle and Visual Needs
								</div>



								<div id="lifestyle_visual_needs_Collapse" class="collapse" aria-labelledby="lifestyle_visual_needs_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="visual_needs_form">
														<div class="form-body" id="healthconcern_formbody">

															<div class="form-group row">
																<label class="control-label col-md-5">Work Environment

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label"> Prolonged Screen Use</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Outdoor Work</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Fine Detail Work</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Sports and Hobbies

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Contact Sports</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Water Sports</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Outdoor Activities (e.g., hiking)</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Any Specific Vision-Related Needs: (e.g., night driving, reading)

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check d-flex align-items-center">
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- Patient Lifestyle and Visual Needs accordion -->

							<!-- Family History of Eye Conditions accordion -->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="family_eye_history_Heading" class="accordion-header bold " data-toggle="collapse" data-target="#family_eye_history_Collapse" aria-expanded="true" aria-controls="fhCollapse">
									Family History of Eye Conditions
								</div>



								<div id="family_eye_history_Collapse" class="collapse" aria-labelledby="family_eye_history_Heading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-8 mr-4" id="">
													<form class='healthconcern_form' id="family_eye_conditions_form">
														<div class="form-body" id="healthconcern_formbody">

															<div class="form-group row">
																<label class="control-label col-md-5">Does the patient have a family history of any of the following?

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Myopia">
																		<label class="form-check-label">Glaucoma</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Cataracts</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Macular Degeneration</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Retinal Detachment</label>
																	</div>
																	<div class="form-check">
																		<input class="form-check-input" type="checkbox" name="refractive_conditions[]" value="Hyperopia">
																		<label class="form-check-label">Diabetic Retinopath</label>
																	</div>
																	<div class="form-check d-flex align-items-center">
																		<label class="form-check-label">Other:</label>
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-5">Family Member(s) Affected

																</label>
																<div class="col-md-7 row flex-column">
																	<div class="form-check d-flex align-items-center">
																		<input type="text" name="other_refractive_condition" data-required="0" placeholder="" class="form-control input-height col-md-6" />
																	</div>
																</div>
															</div>
														</div>
													</form> 
												</div>
											</div>
									</div>

								</div>
							</div>
							<!-- Family History of Eye Conditions accordion -->
							 

							<!--Family History accordion-->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="fhHeading" class="accordion-header bold " data-toggle="collapse" data-target="#fhCollapse" aria-expanded="true" aria-controls="fhCollapse">
									Family History
								</div>



								<div id="fhCollapse" class="collapse" aria-labelledby="fhHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<div class="borderBox light bordered col-md-12">
												<div class="borderBox-title tabbable-line">

													<ul class="nav nav-tabs">
														<li class="nav-item">
															<a href="#fh_history_tab" class="active show" data-toggle="tab"> History </a>
														</li>
														<!-- <li class="nav-item">
															<a href="#fh_notes_tab" data-toggle="tab"> Notes </a>
														</li> -->
													</ul>
												</div>
												<div class="borderBox-body">
													<div class="tab-content">
														<!--history tab-->
														<div class="tab-pane active show" id="fh_history_tab">
															<div class="card-body">
																<div class="row">


																	<!--family history section-->
																	<div class="col-md-12">

																		<div class="pt-2 ">
																			<!-- <h3 class="bold">Family History</h3> -->
																			<form id='familyHistoryForm'>
																				<div class="form-body">

																					<div class="form-group row">
																						<label class="control-label col-md-5">Mother's Status

																						</label>
																						<div class="col-md-7">
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="mother_status" id="inlineRadio1" value="Alive">
																								<label class="form-check-label" for="inlineRadio1">Alive</label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="mother_status" id="inlineRadio2" value="Dead">
																								<label class="form-check-label" for="inlineRadio2">Dead</label>
																							</div>
																							<!-- <SearchableSelectField class="form-control selectpicker " name="mother_status" id="mother_status">
																								<option value="">Select...</option>
																								<option value="Alive">Alive</option>
																								<option value="Dead">Dead</option>
																							</SearchableSelectField> -->
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Mother's Age

																						</label>
																						<div class="col-md-7">
																							<input type="number" min="1" step="1" name="mother_age" id="mother_age" data-required="0" placeholder="Enter age of mother" class="form-control input-height">
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Mother's Condition

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="mother_condition" data-required="0" id="mother_condition" placeholder="Enter condition of mother" class="form-control input-height">
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Father's Status

																						</label>
																						<div class="col-md-7">
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="father_status" id="inlineRadio1" value="Alive">
																								<label class="form-check-label" for="inlineRadio1">Alive</label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="father_status" id="inlineRadio2" value="Dead">
																								<label class="form-check-label" for="inlineRadio2">Dead</label>
																							</div>
																							<!-- <SearchableSelectField class="form-control selectpicker " name="father_status" id="father_status">
																								<option value="">Select...</option>
																								<option value="Alive">Alive</option>
																								<option value="Dead">Dead</option>
																							</SearchableSelectField> -->
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Father's Age

																						</label>
																						<div class="col-md-7">
																							<input type="number" min="1" step="1" name="father_age" id="father_age" data-required="0" placeholder="Enter age of father" class="form-control input-height">
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Father's Codition

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="father_condition" id="father_condition" data-required="0" placeholder="Enter condition of father" class="form-control input-height">
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Spouse's Status

																						</label>
																						<div class="col-md-7">
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="spouse_status" id="inlineRadio1" value="Alive">
																								<label class="form-check-label" for="inlineRadio1">Alive</label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="spouse_status" id="inlineRadio2" value="Dead">
																								<label class="form-check-label" for="inlineRadio2">Dead</label>
																							</div>
																							<!-- <SearchableSelectField class="form-control selectpicker " name="spouse_status" id="spouse_status">
																								<option value="">Select...</option>
																								<option value="Alive">Alive</option>
																								<option value="Dead">Dead</option>
																							</SearchableSelectField> -->
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Spouse's Age

																						</label>
																						<div class="col-md-7">
																							<input type="number" min="1" step="1" name="spouse_age" id="spouse_age" data-required="0" placeholder="Enter age of spouse" class="form-control input-height">
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Spouse's Codition

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="spouse_condition" id="spouse_condition" data-required="0" placeholder="Enter condition of spouse" class="form-control input-height">
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Number of Children

																						</label>
																						<div class="col-md-7">
																							<input type="number" min="0" step="1" name="number_of_children" id="number_of_children" data-required="0" placeholder="Enter number of children" class="form-control input-height">
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Children's Codition

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="children_condition" id="children_condition" data-required="0" placeholder="Enter condition of children" class="form-control input-height">
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Other Details

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="other_details" id="other_details" data-required="0" placeholder="Enter other details" class="form-control input-height">
																						</div>
																					</div>
																				</div>
																			</form>

																		</div>
																	</div>

																</div>

															</div>
														</div>
														<!--notes tab-->
														<!-- <div class="tab-pane" id="fh_notes_tab">
															<div class="card-body">
																<div class="row">
																	<textarea id="fhEditor" class="form-control notesEditor" rows="5"></textarea>

																</div>
															</div>
														</div> -->
													</div>
												</div>

											</div>
										</div>
									</div>
									<!-- <a href="javascript:;" id="fh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" id="fh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
									<!-- <a href="javascript:;" id="fh_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									<!--//buttons-->
								</div>
							</div>
							<!--//Family History accorion-->





							<!--Personal & Social History accordion-->
							<div class="accordionDiv mb-3 mx-3 ">
								<div id="pshHeading" class="accordion-header bold " data-toggle="collapse" data-target="#pshCollapse" aria-expanded="true" aria-controls="pshCollapse">
									Personal & Social History
								</div>



								<div id="pshCollapse" class="collapse" aria-labelledby="pshHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<div class="borderBox light bordered col-md-12">
												<div class="borderBox-title tabbable-line">

													<ul class="nav nav-tabs">
														<li class="nav-item">
															<a href="#psh_history_tab" class="active show" data-toggle="tab"> History </a>
														</li>
														<!-- <li class="nav-item">
															<a href="#psh_notes_tab" data-toggle="tab"> Notes </a>
														</li> -->
													</ul>
												</div>
												<div class="borderBox-body">
													<div class="tab-content">
														<!--history tab-->
														<div class="tab-pane active show" id="psh_history_tab">
															<div class="card-body">
																<div class="row">


																	<!--Personal and social history section-->
																	<div class="col-md-12">

																		<div class="pt-2 ">
																			<!-- <h3 class="bold">Personal & Social History</h3> -->
																			<form id='pshForm'>
																				<div class="form-body">

																					<div class="form-group row">
																						<label class="control-label col-md-5">Occupation

																						</label>
																						<div class="col-md-7">
																							<SearchableSelectField class="form-control selectpicker" data-size="5" data-live-search="true" id="occupation_id" name="occupation_id">
																								<!-- <option value="">Select...</option> -->
																								<!-- </?php foreach ($occupations as $occupation) { ?> -->
																									<option selected value="<!-- php: = $patient->has("occupation") ? $patient->occupation->id : "" -->" r><!-- php: = $patient->has("occupation") ? $patient->occupation->name : "" --></option>
																								<!-- </?php } ?> -->
																							</SearchableSelectField>
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Location

																						</label>
																						<div class="col-md-7">
																							<SearchableSelectField class="form-control selectpicker" data-size="5" data-live-search="true" id="location_id" name="location_id">
																								<!-- <option value="">Select...</option> -->
																								<!-- </?php foreach ($locations as $location) { ?> -->
																									<option selected value="<!-- php: = $patient->has("location") ? $patient->location->id : "" -->"><!-- php: = $patient->has("location") ? $patient->location->name : "" --></option>
																								<!-- </?php } ?> -->
																							</SearchableSelectField>
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Family Circumstance

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="family_circumstance" id="family_circumstance" data-required="0" placeholder="Enter family circumstance" class="form-control input-height">
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Religion

																						</label>
																						<div class="col-md-7">
																							<SearchableSelectField class="form-control selectpicker" data-size="5" data-live-search="true" id="religion_id" name="religion_id">
																								<!-- <option value="">Select...</option> -->
																								<!-- </?php foreach ($religions as $religion) { ?> -->
																									<option selected value="<!-- php: = $patient->has("religion") ? $patient->religion->id : "" -->"><!-- php: = $patient->has("religion") ? $patient->religion->name : "" --></option>
																								<!-- </?php } ?> -->
																							</SearchableSelectField>
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Hobbies / Exercise

																						</label>
																						<div class=" col-md-7">
																							<input type="text" name="hobbies" id="hobbies" data-required="0" placeholder="Enter hobbies/exercise " class="form-control input-height">
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Alchohol Intake

																						</label>
																						<div class=" col-md-7">
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="alchohol_intake" id="inlineRadio1" value="Yes">
																								<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="alchohol_intake" id="inlineRadio2" value="No">
																								<label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input type="text" name="alcohol_details" id="alcohol_details" data-required="0" placeholder="Enter details" class="form-control input-height" style="width: 100%;">
																							</div>
																						</div>
																					</div>


																					<!-- <div class="form-group row">
																						<label class="control-label col-md-5">Alchohol Details

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="alcohol_details" id="alcohol_details" data-required="0" placeholder="Enter details" class="form-control input-height">
																						</div>
																					</div> -->

																					<div class="form-group row">
																						<label class="control-label col-md-5">Tobacco Intake

																						</label>
																						<div class=" col-md-7">
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="tobacco_intake" id="inlineRadio1" value="Yes">
																								<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input class="form-check-input" type="radio" name="tobacco_intake" id="inlineRadio2" value="No">
																								<label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
																							</div>
																							<div class="form-check form-check-inline">
																								<input type="text" name="tobacco_details" id="tobacco_details" data-required="0" placeholder="Enter details " class="form-control input-height">
																							</div>
																						</div>
																					</div>

																					<!-- <div class="form-group row">
																						<label class="control-label col-md-5">Tobacco Details

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="tobacco_details" id="tobacco_details" data-required="0" placeholder="Enter details " class="form-control input-height">
																						</div>
																					</div> -->

																				</div>
																			</form>

																		</div>
																	</div>

																</div>

															</div>
														</div>
														<!--notes tab-->
														<!-- <div class="tab-pane" id="psh_notes_tab">
															<div class="card-body">
																<div class="row">
																	<textarea id="pshEditor" class="form-control notesEditor" rows="5"></textarea>

																</div>
															</div>
														</div> -->
													</div>
												</div>

											</div>
										</div>



									</div>

									<!-- <a href="javascript:;" id="psh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" id="psh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
									<!-- <a href="javascript:;" id="psh_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->

								</div>
							</div>
							<!--//Personal & Social History accorion-->

							<!-- php: if ($patient_age > 12 && $patient->gender_id == 2) { -->
								<!--Contraceptions History accordion-->
								<div class="accordionDiv mb-3  mx-3 ">
									<div id="chHeading" class="accordion-header bold " data-toggle="collapse" data-target="#chCollapse" aria-expanded="true" aria-controls="chCollapse">
										Contraception History
									</div>



									<div id="chCollapse" class="collapse" aria-labelledby="chHeading" data-parent="#clinical_encounter_accordions">
										<div class="card-body">
											<div class="row">
												<div class="borderBox light bordered col-md-12">
													<div class="borderBox-title tabbable-line">

														<ul class="nav nav-tabs">
															<li class="nav-item">
																<a href="#ch_history_tab" class="active show" data-toggle="tab"> History </a>
															</li>
														</ul>
													</div>
													<div class="borderBox-body">
														<div class="tab-content">
															<!--history tab-->
															<div class="tab-pane active show" id="ch_history_tab">
																<div class="card-body">
																	<div class="row">


																		<!--Contraception history section-->
																		<div class="col-md-12">

																			<div class="pt-2 ">
																				<!-- <h3 class="bold">Contraception History</h3> -->
																				<form id='chForm'>
																					<div class="form-body">

																						<div class="form-group row">
																							<label class="control-label col-md-5">Contraception Type
																								<!-- <span class="required"> * </span> -->

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="contraception_type_id" data-size="5" data-live-search="true" id="contraception_types">
																									<option value="">Select...</option>
																									<!-- php: foreach ($contraceptionTypes as $contraceptionType) { -->
																										<option value="<!-- php: = $contraceptionType->id -->"><!-- php: = $contraceptionType->name --></option>

																									<!-- php: } -->
																								</SearchableSelectField>


																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Date Started

																							</label>
																							<div class="input-group col-md-7">
																								<input class="form-control set_date_past" name="date_started" id="ch_dateStarted" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
																								<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Duration

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="duration" data-required="1" id="ch_duration" placeholder="Enter duration" class="form-control input-height" required="">
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Complications

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="complications" data-required="0" id="ch_complications" placeholder="Enter complications" class="form-control input-height">
																							</div>
																						</div>


																					</div>
																				</form>

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

										<!-- <a href="javascript:;" id="ch_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="ch_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
										<!-- <a href="javascript:;" id="ch_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									</div>
								</div>
								<!--//Contraceptions accorion-->
							<!-- php: } -->


							<!-- php: if ($patient->gender_id == 2 && $patient_age > 12) { -->

								<!--Pregnancy History accordion-->
								<div class="accordionDiv mb-3 mx-3 ">
									<div id="phHeading" class="accordion-header bold " data-toggle="collapse" data-target="#phCollapse" aria-expanded="true" aria-controls="phCollapse">
										Pregnancy History
									</div>



									<div id="phCollapse" class="collapse" aria-labelledby="phHeading" data-parent="#clinical_encounter_accordions">
										<div class="card-body">
											<div class="row">
												<div class="borderBox light bordered col-md-12">
													<div class="borderBox-title tabbable-line">

														<ul class="nav nav-tabs">
															<li class="nav-item">
																<a href="#ph_history_tab" class="active show" data-toggle="tab"> History </a>
															</li>
														</ul>
													</div>
													<div class="borderBox-body">
														<div class="tab-content">
															<!--history tab-->
															<div class="tab-pane active show" id="ph_history_tab">
																<div class="card-body">
																	<div class="row">


																		<!--pregnancy history section-->
																		<div class="col-md-12">

																			<div class="pt-2 ">
																				<!-- <h3 class="bold">Pregnancy History</h3> -->
																				<form id='phForm'>
																					<div class="form-body">

																						<div class="form-group row">
																							<label class="control-label col-md-5">Pregnancy Number

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="1" step="1" id="pregnancy_number" name="pregnancy_number" data-required="1" placeholder="Enter Pregnancy Number" class="form-control input-height" required="">
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Date Conceived

																							</label>
																							<div class="input-group col-md-7">
																								<input class="form-control set_date_past" id="date_conceived" name="date_conceived" size="16" type="text" placeholder="Enter date conceived" style="max-height: 35px;" readonly="">
																								<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Mode of Conception

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="mode_of_conception" id="mode_of_conception">
																									<option value="">Select</option>
																									<option value="Assisted">Assisted</option>
																									<option value="Natural">Natural</option>
																								</SearchableSelectField>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Mode of Delivery

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="mode_of_delivery" id="mode_of_delivery">
																									<option value="">Select</option>
																									<option value="CS">CS</option>
																									<option value="Medical evacuation">Medical evacuation</option>
																									<option value="Vaginal Delivery (Induced)">Vaginal Delivery (Induced)</option>
																									<option value="Vaginal Delivery (Spontaneous)">Vaginal Delivery (Spontaneous)</option>
																								</SearchableSelectField>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Outcoume

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="outcome" id="outcome">
																									<option value="">Select</option>
																									<option value="Live Birth">Live Birth</option>
																									<option value="Miscarriage">Miscarriage</option>
																									<option value="Still Birth">Still Birth</option>
																									<option value="Termination">Termination</option>
																								</SearchableSelectField>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Pregnancy Complications

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="pregnancy_complications" data-required="0" id="pregnancy_complications" placeholder="Enter pregnancy complications" class="form-control input-height">
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Sex

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="gender_id" id="gender_id" required="">
																									<option>Select...</option>
																									<option value="2">Female</option>
																									<option value="1">Male</option>
																								</SearchableSelectField>
																							</div>
																						</div>




																						<div class="form-group row">
																							<label class="control-label col-md-5">Weight (KG)

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0.1" step="0.1" id="child_weight" name="weight" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Current Info On Child

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="child_info" id="child_info" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
																							</div>
																						</div>





																					</div>
																				</form>

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
										<!-- <a href="javascript:;" id="ph_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="ph_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
										<!-- <a href="javascript:;" id="ph_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									</div>
								</div>
								<!--//Pregnancy History accorion-->


							<!-- php: } -->



							<!-- php: if ($patient->gender_id == 2 && $patient_age > 12) { -->
								<!--Gynaecological History accordion-->
								<div class="accordionDiv mb-3 mx-3 ">
									<div id="ghHeading" class="accordion-header bold " data-toggle="collapse" data-target="#ghCollapse" aria-expanded="true" aria-controls="ghCollapse">
										Gynaecological History
									</div>



									<div id="ghCollapse" class="collapse" aria-labelledby="ghHeading" data-parent="#clinical_encounter_accordions">
										<div class="card-body">
											<div class="row">
												<div class="borderBox light bordered col-md-12">
													<div class="borderBox-title tabbable-line">

														<ul class="nav nav-tabs">
															<li class="nav-item">
																<a href="#gh_history_tab" class="active show" data-toggle="tab"> History </a>
															</li>
														</ul>
													</div>
													<div class="borderBox-body">
														<div class="tab-content">
															<!--history tab-->
															<div class="tab-pane active show" id="gh_history_tab">
																<div class="card-body">
																	<div class="row">


																		<!--Gynaecological history section-->
																		<div class="col-md-12">

																			<div class="pt-2 ">
																				<!-- <h3 class="bold">Gynaecological History</h3> -->
																				<form id='ghForm'>
																					<div class="form-body">

																						<div class="form-group row">
																							<label class="control-label col-md-5">Date of last menstrual period

																							</label>
																							<div class="input-group col-md-7">
																								<input class="form-control set_date_past" id="date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
																								<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Menarche

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="menarche" id="menarche" data-required="0" placeholder="Enter mernache" class="form-control input-height">
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Menopause

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="menopause" id="menopause" data-required="0" placeholder="Enter menopause" class="form-control input-height">
																							</div>
																						</div>
																						<h3 class="bold">Menses</h3>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Cycle Length (Days)

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="1" name="cycle_length" id="cycle_length" data-required="0" placeholder="Enter cycle length" class="form-control input-height">
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Duration of Bleed (Days)

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="1" name="duration_of_bleed" id="duration_of_bleed" data-required="0" placeholder="Enter duration of bleed" class="form-control input-height">
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Volume

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="gyna_volume" id="gyna_volume" aria-label="Default select example" data-live-search="false">
																									<option value="">Select</option>
																									<option value="Spotting">Spotting</option>
																									<option value="Moderate">Moderate</option>
																									<option value="Heavy">Heavy</option>
																									<option value="Clots">Clots</option>
																								</SearchableSelectField>

																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Intermenstrual Bleeding

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="intermenstrual_bleeding" id="intermenstrual_bleeding" data-live-search="false">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>

																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Intermenstrual Bleeding Details

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="intermenstrual_bleeding_details" id="intermenstrual_bleeding_details" data-required="0" placeholder="Enter intermenstrual bleeding details" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Dysmenorrhoea

																							</label>
																							<div class="col-md-7">

																								<SearchableSelectField class="form-control selectpicker " name="dysmenorrhoea" id="dysmenorrhoea">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Dysmenorrhoea Details

																							</label>
																							<div class="col-md-7">
																								<input type="text" min="0" step="1" name="dysmenorrhoea_details" id="dysmenorrhoea_details" data-required="0" placeholder="Enter Dysmenorrhoea Details" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Post Coital Bleeding

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="post_coital_bleeding" id="post_coital_bleeding">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Post Coital Bleeding Details

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="post_coital_bleeding_details" data-required="0" placeholder="Enter post coital bleeding details" class="form-control input-height">
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Dyspareunia

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="dyspareunia" id="dyspareunia">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Dyspareunia Details

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="dyspareunia_details" id="dyspareunia_details" data-required="0" placeholder="Enter dyspareunia details" class="form-control input-height">
																							</div>
																						</div>

																						<h3 class="bold">Parity</h3>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Gestational Age at Delivery

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="gestational_age_at_delivery" id="dyspareunia">
																									<option value="" selected disabled>Select</option>
																									<option value="< 28 weeks">Less than 28 Weeks</option>
																									<option value="28-36">Between 28 and 36</option>
																									<option value=">36">greater than 36</option>
																								</SearchableSelectField>
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Outcome

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="outcome" id="outcome">
																									<option value="" selected disabled>Select</option>
																									<option value="Vaginal Delivery">Vaginal Delivery</option>
																									<option value="CS">CS</option>
																									<option value="Spontaneous Abortion">Spontaneous Abortion</option>
																									<option value="Medical Termination">Medical Termination</option>
																									<option value="Surgical Termination">Surgical Termination</option>
																								</SearchableSelectField>
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">Present Condition

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="present_condition" id="present_condition">
																									<option value="" selected disabled>Select</option>
																									<option value="alive">Alive</option>
																									<option value="dead">Dead</option>
																								</SearchableSelectField>
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Number of Lifetime Sexual Partners

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="1" name="number_of_lifetime_sexual_partners" id="number_of_lifetime_sexual_partners" data-required="0" placeholder="Enter number of lifetime sexual partners" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Coital Frequency (Days per Week)

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="1" name="coital_frequency" id="coital_frequency" data-required="0" placeholder="Enter coital frequency" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Cervical Cancer Screening

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="cervical_cancer_screening" id="cervical_cancer_screening">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>
																							</div>
																						</div>




																						<div class="form-group row">
																							<label class="control-label col-md-5">Cervical Cancer Screening Details

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="cervical_cancer_screening_details" id="cervical_cancer_screening_details" data-required="0" placeholder="Enter cervical cancer screening details" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Breast Screening

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="breast_screening" id="breast_screening">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Breast Screening Details

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="breast_screening_details" id="breast_screening_details" data-required="0" placeholder="Enter breast screening details" class="form-control input-height">
																							</div>
																						</div>




																						<div class="form-group row">
																							<label class="control-label col-md-5">Previous Gynaecologic Procedures

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="previous_gynaecologic_procedures" id="previous_gynaecologic_procedures">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Previous Gynaecologic Procedures Details

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="previous_gynaecologic_procedures_details" id="previous_gynaecologic_procedures_details" data-required="0" placeholder="Enter previous gynaecologic procedures details" class="form-control input-height">
																							</div>
																						</div>








																					</div>
																				</form>

																			</div>


















																		</div>

																	</div>

																</div>
															</div>
															<!--notes tab-->
															<div class="tab-pane" id="gh_notes_tab">
																<div class="card-body">
																	<div class="row">
																		<textarea id="ghEditor" class="form-control notesEditor" rows="5"></textarea>

																	</div>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>
										<!-- <a href="javascript:;" id="gh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="gh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
										<!-- <a href="javascript:;" id="gh_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
										<!--//buttons-->
									</div>
								</div>
								<!--//Gynaecological History accorion-->
							<!-- php: } -->



							<!-- php: if ($patient->gender_id == 2 && $patient_age > 12) { -->
								<!--Obstetric History accordion-->
								<div class="accordionDiv mb-3 mx-3 ">
									<div id="ohHeading" class="accordion-header bold " data-toggle="collapse" data-target="#ohCollapse" aria-expanded="true" aria-controls="ohCollapse">
										Obstetric History
									</div>



									<div id="ohCollapse" class="collapse" aria-labelledby="ohHeading" data-parent="#clinical_encounter_accordions">
										<div class="card-body">
											<div class="row">
												<div class="borderBox light bordered col-md-12">
													<div class="borderBox-title tabbable-line">

														<ul class="nav nav-tabs">
															<li class="nav-item">
																<a href="#oh_history_tab" class="active show" data-toggle="tab"> History </a>
															</li>
															<li class="nav-item">
																<a href="#oh_notes_tab" data-toggle="tab"> Notes </a>
															</li>
														</ul>
													</div>
													<div class="borderBox-body">
														<div class="tab-content">
															<!--history tab-->
															<div class="tab-pane active show" id="oh_history_tab">
																<div class="card-body">
																	<div class="row">


																		<!--Obstetric history section-->
																		<div class="col-md-12">

																			<div class="pt-2 ">
																				<!-- <h3 class="bold">Obstetric History</h3> -->
																				<form id='ohForm'>
																					<div class="form-body">

																						<div class="form-group row">
																							<label class="control-label col-md-5">No. of Pregnancies

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="0" name="no_of_pregnancies" id="no_of_pregnancies" data-required="0" placeholder="Enter Number of Pregnancies" class="form-control input-height">
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">No. of Births

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="0" name="no_of_births" id="no_of_births" data-required="0" placeholder="Enter Number of Births" class="form-control input-height">
																							</div>
																						</div>

																						<div class="form-group row">
																							<label class="control-label col-md-5">No. of Abortions (Spontaneous)

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="0" name="no_of_abortions_spontaneous" id="no_of_abortions_spontaneous" data-required="0" placeholder="Enter Number of Spontaneous Abortions" class="form-control input-height">
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">No. of Abortions (Induced)

																							</label>
																							<div class="col-md-7">
																								<input type="number" min="0" step="0" name="no_of_abortions_induced" id="no_of_abortions_induced" data-required="0" placeholder="Enter Number of Induced Abortions" class="form-control input-height">
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Date of last menstrual period

																							</label>
																							<div class="input-group col-md-7">
																								<input class="form-control set_date_past" id="oh_date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
																								<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Date of positive pregnancy test

																							</label>
																							<div class="input-group col-md-7">
																								<input class="form-control set_date_past" id="date_of_positive_pregnancy_test" name="date_of_positive_pregnancy_test" size="16" type="text" placeholder="Enter date of positive pregnant test" style="max-height: 35px;" readonly="">
																								<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Confirmatory ultrasound scan

																							</label>
																							<div class="col-md-7">
																								<SearchableSelectField class="form-control selectpicker " name="confirmatory_ultrasound_scan" id="confirmatory_ultrasound_scan">
																									<option value="">Select</option>
																									<option value="Yes">Yes</option>
																									<option value="No">No</option>
																								</SearchableSelectField>
																							</div>
																						</div>




																						<div class="form-group row">
																							<label class="control-label col-md-5">Date of scan

																							</label>
																							<div class="input-group col-md-7">
																								<input class="form-control set_date_past" id="date_of_scan" name="date_of_scan" size="16" type="text" placeholder="Enter date of scan" style="max-height: 35px;" readonly="">
																								<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Current Info On Child

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="child_info" id="child_info" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">Gestational age

																							</label>
																							<div class="col-md-7">
																								<input type="text" name="gestational_age" id="gestational_age" data-required="0" placeholder="Enter gestational age" class="form-control input-height">
																							</div>
																						</div>



																						<div class="form-group row">
																							<label class="control-label col-md-5">EDD

																							</label>
																							<div class="col-md-7">
																								<input class="form-control set_date" id="" name="edd" size="16" type="text" placeholder="Enter date" style="max-height: 35px;" readonly="">
																							</div>
																						</div>





																					</div>
																				</form>

																			</div>


















																		</div>

																	</div>

																</div>
															</div>
															<!--notes tab-->
															<div class="tab-pane" id="oh_notes_tab">
																<div class="card-body">
																	<div class="row">
																		<textarea id="ohEditor" class="form-control notesEditor" rows="5"></textarea>

																	</div>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>



										</div>
										<!-- <a href="javascript:;" id="oh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="oh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a> -->
										<!-- <a href="javascript:;" id="oh_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									</div>
								</div>
								<!--//Obstetric History accorion-->
							<!-- php: } -->




							<!--on direct questioning accordion-->
							<div class="accordionDiv mb-3  mx-3 ">
								<div id="odqHeading" class="accordion-header bold " data-toggle="collapse" data-target="#doctor_concern" aria-expanded="true" aria-controls="doctor_concern">
									Doctor's Comment
								</div>

								<div id="doctor_concern" class="collapse" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">

											<div class="borderBox light bordered col-md-12 d-flex">
												<div class="borderBox-title tabbable-line col-md-12" id="">
													<form class=' full-width' id="doctor_comment_form">
														<textarea id="doctor_comment" name="doctor_comment" class="form-control" rows="5"></textarea>
													</form> 
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
							<!--//on direct questioning accordion-->

							<!--section buttons-->
							<div class="row col-md-12 " style="padding-right: 30px;">
								<a href="javascript:;" id="save_doctor_notess" class="btn btn-success btn-lg mr-2 uppercase" style="margin-left: auto;" onclick="finalizeEcounter()">Finalize encounter</a>
								<a href="javascript:;" id="reset_doctor_notes" class="btn btn-danger btn-lg mr-2 uppercase">Reset</a>

							</div>
							<!--//section-buttons-->


						</div>
						<!--//Accordion Section-->
					</div>



				</div>


			</div>
			<!--//new notes section-->
			<div class="row">

				<div class="col-md-6 stylish-card-section">

					<div class="col-md-12">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard with-transform">
							<div class="card-header ">Health Concern Information <span class="float-right">(Active)</span> </div>
							<div class="card-body" id="healthconcern_info">

								No Results

							</div>

							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
							</div>
						</div>
						<!--//medication card-->
					</div>
					<div class="col-md-12">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard with-transform">
							<div class="card-header ">Pain Location <span class="float-right">(Active)</span> </div>
							<div class="card-body" id="painLocationImage">
								No Results

							</div>

							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
							</div>
						</div>
						<!--//medication card-->
					</div>
					<div class="col-md-12">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard with-transform">
							<div class="card-header ">Biostructural Examination <span class="float-right">(Active)</span> </div>
							<div class="card-body" id="biostructural_exam_info">

								No Results
							</div>

							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
							</div>
						</div>
						<!--//medication card-->
					</div>
					<div class="col-md-12">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard with-transform">
							<div class="card-header ">Medications <span class="float-right">(Active)</span> </div>
							<div class="card-body">

								<!--prescription section-->
								<span class=" text-primary">Prescriptions</span>
									<span style="float:right">
										<a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-pres-modal" class="btn btn-sm btn-outline-danger text-capitalize">More</a>
										<!-- <a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-pres-modal" class="btn btn-sm btn-outline-secondary text-capitalize">Change</a>
										<a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-pres-modal" class="btn btn-sm btn-outline-primary text-capitalize">Refill</a> -->
										<!-- <button class='btn btn-light btn-link' type='button' data-toggle='tooltip' data-placement='top' title='stop'>Stop</button>
										<button class='btn btn-light btn-link' type='button' data-toggle='tooltip' data-placement='top' title='pause/resume'>Pause</button>
										<button class='btn btn-light btn-link' type='button' data-toggle='tooltip' data-placement='top' title='refill'>Refill</button> -->
									</span>
									<!-- <button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button> <br> -->
								<div class="mb-3">
									<!--set class d-none when live-->
									<div class="prescription-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>


								<!--Continous infusion section-->
								<span class=" text-primary">Continous Infusion</span>
									<span style="float:right">
										<a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-inf-modal" class="btn btn-sm btn-outline-danger text-capitalize">More</a>
										<!-- <a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-inf-modal" class="btn btn-sm btn-outline-secondary text-capitalize">Change</a>
										<a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-inf-modal" class="btn btn-sm btn-outline-primary text-capitalize">Refill</a> -->
										<!-- <button class='btn btn-light btn-link' type='button' data-toggle='tooltip' data-placement='top' title='stop'>Stop</button>
										<button class='btn btn-light btn-link' type='button' data-toggle='tooltip' data-placement='top' title='pause/resume'>Pause</button>
										<button class='btn btn-light btn-link' type='button' data-toggle='tooltip' data-placement='top' title='refill'>Refill</button> -->
									</span> 
									<div class="mb-3">
									<!--set class d-none when live-->
									<div class="infusion-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
								<!--Transfusion-->
								<span class=" text-primary mb-2">Transfusion</span>
								<div class="pl-4">
									<!--set class d-none when live-->
									<span id="transfusion_noneText" class=" bold">None</span>
									<ul class="ulMedicationCard d-none" id="transfusion_section">
									</ul>
								</div>
							</div>

							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
							</div>
						</div>
						<!--//medication card-->
					</div>

					<div class="col-md-12">
						<!---allergy card-->
						<div class="card bg-light mb-3 allergyCard with-transform ">
							<div class="card-header ">Allergy <span class="float-right">(Active)</span> </div>
							<div class="card-body">
								<span class="float-left text-primary">Allergy</span><span class="ml-2" id="allergy-action-span"></span><br>
								<div class="">
									<!--set class d-none when live-->
									<div class="allergy-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
								<span class="float-left text-primary">Allergy Reactions</span><span class="ml-2" id="allergy-reactions-action-span"></span><br>
								<div class="">
									<div class="allergy-reactions-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
							</div>
							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
							</div>
						</div>
						
						<!--//Allergy card-->
					</div>

					<div class="col-md-12">
						<!--Vitals card-->
						<div class="card bg-light mb-3 vitalsCard with-transform " style="border-color: <!-- php: = $patient_age <= 3 ? '#de5190' : ($patient_age <= 12 ? '#7030a0' : '#2e74b5') -->;">
							<div class="card-header " style="background: <!-- php: = $patient_age <= 3 ? '#ffe7f9' : ($patient_age <= 12 ? '#f1e0ff' : '#f4f7ff') -->;">Vitals <span class="float-right">(Last Entered)</span></div>
							<div class="card-body">
								<!-- <span class="float-left text-primary">Latest Vitals Taken</span> <br> -->
								<div class="row">
									<!--set class d-none when live-->
									<!-- <div class="vitals-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div> -->
									<div class="col-md-6">
										<span class="float-left text-primary">Recent</span> <br>
										<div class="recent-vitals-taken">
											<span class="">
												No vitals recorded
											</span>
										</div>
									</div>
									<div class="col-md-6">
										<span class="float-left text-primary">Previous</span> <br>
										<div class="previous-vitals-taken">
											<span class="">
												No vitals recorded
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
							</div>
						</div>
						<!--//vitals card-->
					</div>


					<!-- php: if ($patient->gender_id == 2 && $patient_age > 12) { -->
						<div class="col-md-12">
							<!---Gynaecological History card-->
							<div class="card bg-light mb-3 allergyCard with-transform ">
								<div class="card-header ">Pregnancy, Gynaecologic And Obstetric History <span class="float-right">(Active)</span> </div>
								<div class="card-body pl-3">
									<span class="float-left text-primary">Pregnancy History</span><span class="ml-2" id="preg-history-card-action-span"></span><br>
									<div class="">
										<div class="preg-small-card" id="problem_complaints_noneText">
											<span class="">
												None
											</span>
										</div>
									</div>
									<span class="float-left text-primary">Gynaecological History</span><span class="ml-2" id="gyane-history-card-action-span"></span><br>
									<div class="">
										<div class="gyna-small-card" id="problem_complaints_noneText">
											<span class="">
												None
											</span>
										</div>
									</div>
									<span class="float-left text-primary">Obstetric History</span><span class="ml-2" id="obstetric-history-card-action-span"></span><br>
									<div class="">
										<div class="obs-small-card" id="problem_complaints_noneText">
											<span class="">
												None
											</span>
										</div>
									</div>
								</div>
								<div class="pr-3 pb-2">
									<a href="javascript:;" class="pull-right text-primary"> View All</a>
								</div>
								
							</div>
							<!--//Gynaecological History card-->


						</div>
					<!-- php: } -->



					<div class="col-md-12">
						<!--labs cards-->
						<div class="card bg-light mb-3 labsCard with-transform ">
							<div class="card-header">Labs + Imaging <span class="float-right"></span></div>
							<div class="card-body">
								<span class="float-left text-primary">Lab</span><br>
								<div class="">
									<!--set class d-none when live-->
									<div class="lab-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
								<span class="float-left text-primary">Radiology</span> <br>
								<div class="">
									<!--set class d-none when live-->
									<div class="radiology-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
							</div>
							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
							</div>
						</div>
						<!--//labs card-->
					</div>

				</div>

				<div class="col-md-6 stylish-card-section">

					<div class="col-md-12">
						<!--Problems Card-->
						<div class="card bg-light mb-3 problemsCard with-transform" style="min-height: 370px;">
							<div class="card-header  ">
								Problems <span class="float-right">(All Active)</span>
							</div>
							<div class="card-body">
								<!--Complaints-->
								<span class="float-left text-primary">Complaints</span><span class="ml-2" id="complaint-action-span"></span><br>
								<div class="">
									<!--set class d-none when live-->
									<div class="cc-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<!--ODQs-->
								<span class="float-left text-primary">ODQs</span><span class="ml-2" id="odqs-action-span"></span><br>
								<div class="">
									<!--set class d-none when live-->
									<div class="odqs-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<!--Comorbidity-->
								<span class="float-left text-primary">Comorbidity</span><span class="ml-2" id="comorbidity-action-span"></span><br>
								<div class="">
									<!--set class d-none when live-->
									<div class="comorbidities-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>

								</div>

								<!--Surgeries-->
								<span class="float-left text-primary">Surgeries</span> <br>
								<div class="">
									<!--set class d-none when live-->
									<div class="surgeries-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>

								</div>

								<!--Diagnosis-->
								<span class="float-left text-primary">Diagnosis</span><i onclick="showAllDiagnosis()" class='fa fa-edit fa-lg ml-2'></i> <br>
								<div class="">
									<div class="diagnoses-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
									<!-- <div>
										<span class="bold">Alveolitis <span class="badge badge-danger">k103</span></span>
									</div> -->
								</div>

								<span class="float-left text-primary">Hospitalization/Procedures</span> <br>
								<div class="pl-4">
									<div class="hospitalization-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>

								</div>


								<!--System review-->
								<span class="float-left text-primary">System Review</span><span class="ml-2" id="system-review-span"></span><br>
								<div class="pl-4">


									<div class="row">
										<div class="review-small-card" id="problem_complaints_noneText">
											<span class="">
												None
											</span>
										</div>


									</div>
								</div>



							</div>
							<div class="pr-3 pb-2">
								<span style="cursor:pointer" href="javascript:;" class="pull-right text-primary" onclick="showAllEncounteredProblems()"> View All Problems</span>
							</div>
						</div>
						<!--//Problems Card-->

					</div>


					<div class="col-md-12">
						<!--History card-->
						<div class="card bg-light mb-3 historyCard with-transform ">
							<div class="card-header ">History<span class="float-right">(Summary)</span></div>
							<div class="card-body">
								<span class="float-left text-primary">PMHx</span><span class="ml-2" id="medi-history-card-action-span"></span><br>
								<div class="">
									<div class="pmhx-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<span class="float-left text-primary">PSHX</span><span class="ml-2" id="social-action-span"></span><br>
								<div class="">
									<div class="pshx-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>


								<span class="float-left text-primary">FHX</span><span class="ml-2" id="family-action-span"></span><br>
								<div class="">
									<div class="fhx-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<span class="float-left text-primary">Immunization Hx</span><span class="ml-2" id="history-card-action-span"></span><br>
								<div class="">
									<div class="immu-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
								<span class="float-left text-primary">Contraception History</span><span class="ml-2" id="contraception-action-span"></span><br>
								<div class="">
									<div class="contraception-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
							</div>

							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-primary "> View All</a>
							</div>


						</div>
						<!--//History card-->

					</div>

					<!-- <div class="col-md-12">
						<div class="card bg-light mb-3 historyCard with-transform ">
							<div class="card-header ">Immunization History<span class="float-right">(Summary)</span></div>
							<div class="card-body">

							</div>

							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-primary "> View All</a>
							</div>
						</div>
					</div> -->

					<div class="col-md-12">
						<!--Consult To Referral card-->
						<div class="card bg-light mb-3 historyCard with-transform ">
							<div class="card-header ">Consult To Referral<span class="float-right">(Summary)</span></div>
							<div class="card-body">
								<span class="float-left text-primary">Consultations</span><span class="ml-2" id="history-card-action-span"></span><br>
								<div class="">
									<div class="referral-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
							</div>

							<div class="pr-3 pb-2">
								<!-- <a href="javascript:;" class="pull-right text-primary "> View All</a> -->
							</div>
						</div>
						<!--Consult To Referral card-->
					</div>


					<!-- <div class="col-md-12">
						
						<div class="card bg-light mb-3 examsCard with-transform">
							<div class="card-header ">Examinations <span class="float-right">(Active)</span> </div>
							<div class="card-body pl-3">
								<p>
								<h3>General</h3>
								<b>Temp:</b> 45; <b>Pulse:</b> 49; <b>RR:</b> 16;
								<b>Hydration:</b> No Hydration; <b>Distress:</b> Yes; <b>Distress Details:</b> Very Distress; <b>Mental State:</b> Confused;
								<b>Constitution:</b> Fit; <b>Pallor:</b> Yes; <b>Pallor Details:</b> Very Pallor; <b>Jaundice:</b> No; <b>Jaundice Details:</b> N/A;
								<b>Cyanosis:</b> No; <b>Cyanosis Details:</b> N/A; <b>Oedema:</b> None; <b>Environment:</b> N/A; <b>Other Findings:</b> N/A;
								</p>

							</div>
							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-primary "> View All</a>
							</div>
						</div>

						

					</div> -->







				</div>

			</div>

		</div>

	</div>



	<!--//Clinical Notes Section-->

	<!--Modal Section-->

	<div class="modal fade bd-example-modal-lg" id="all_encountered_problems" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title">All Problems Encountered: <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body encounter_problems">
			
			
			</div>
		</div>
		</div>
	</div>


	<!--Skin  - odq-->
	<div class="modal fade" id="addSkin" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Skin System</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<div>
								<div class="card-head">
									<header>Details</header>
								</div>
								<div class="card-body" id="bar-parent">
									<form method="post" accept-charset="utf-8" class="form-horizontal">
										<div style="display:none;"><input type="hidden" name="_method" value="POST"></div> <input type="hidden" name="body_system_id" value="9">
										<div class="form-body">

											<div class="form-group row">
												<div class="col-md-3">
													<label>Occupation</label>
												</div>
												<div class="col-md-2">
													<label class="switchToggle">
														<input type="checkbox" name="condition_status_77">
														<span class="slider green round"></span>
													</label>
												</div>
												<div class="col-md-5">
													<input type="text" placeholder="Enter Occupation Details" value="" name="review_77" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<div class="col-md-3">
													<label>Exposure to irritants - Drugs - Sunlight</label>
												</div>
												<div class="col-md-2">
													<label class="switchToggle">
														<input type="checkbox" name="condition_status_78">
														<span class="slider green round"></span>
													</label>
												</div>
												<div class="col-md-5">
													<input type="text" placeholder="Enter Exposure to irritants - Drugs - Sunlight Details" value="" name="review_78" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<div class="col-md-3">
													<label>Rashes</label>
												</div>
												<div class="col-md-2">
													<label class="switchToggle">
														<input type="checkbox" name="condition_status_79">
														<span class="slider green round"></span>
													</label>
												</div>
												<div class="col-md-5">
													<input type="text" placeholder="Enter Rashes Details" value="" name="review_79" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<div class="col-md-3">
													<label>Pigmentation</label>
												</div>
												<div class="col-md-2">
													<label class="switchToggle">
														<input type="checkbox" name="condition_status_80">
														<span class="slider green round"></span>
													</label>
												</div>
												<div class="col-md-5">
													<input type="text" placeholder="Enter Pigmentation Details" value="" name="review_80" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<div class="col-md-3">
													<label>itching</label>
												</div>
												<div class="col-md-2">
													<label class="switchToggle">
														<input type="checkbox" name="condition_status_81">
														<span class="slider green round"></span>
													</label>
												</div>
												<div class="col-md-5">
													<input type="text" placeholder="Enter itching Details" value="" name="review_81" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<div class="col-md-3">
													<label>Other</label>
												</div>
												<div class="col-md-2">
													<label class="switchToggle">
														<input type="checkbox" name="condition_status_90">
														<span class="slider green round"></span>
													</label>
												</div>
												<div class="col-md-5">
													<input type="text" placeholder="Enter Other Details" value="" name="review_90" class="form-control input-height">
												</div>
											</div>

											<div class="row">
												<div class="offset-md-4 col-md-9 ">
													<button type="submit" id="submitGeneralExam" class="btn btn-info">Submit</button>
													<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
												</div>
											</div>
										</div>

								</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--// skin  - odq -->


	<!--Labs + imaging - view all modal -->
	<div class="modal fade" id="labsViewAll" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Labs + Imaging - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							​
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th>Name</th>
										<th>Specimen No.</th>
										<th>Status</th>
										<th>Description</th>
										<th>Comments</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="labViewAll_table">


								</tbody>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--//labs + imaging - view all modal -->



	<!--vitals - view all modal -->
	<div class="modal fade" id="vitalsViewAll" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Vitals - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							​
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th>Blood Pressure</th>
										<th>Heart Rate</th>
										<th>Pulse</th>
										<th>SPO<sub>2</sub></th>
										<th>Temp</th>
										<th>RR</th>
										<th>Ht</th>
										<th>Wt</th>
										<th>Trauma</th>
										<th>AVPU</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="vitalViewAll_table">


								</tbody>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--//vitals - view all modal -->


	<!--Diagnosis - view all modal -->
	<div class="modal fade" id="viewAllDiagnosisModal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Diagnosis - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group row">

								<div class="col-md-12">											
									<div class="row mb-3">
										<div class="col-md-6 bold">Diagnosis</div>
										<div class="col-md-6 bold">Resolved</div>
									</div>
									<div id="diagnosis_clearance">
									</div>

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--//Diagnosis - view all modal -->



	<!--medications- view all modal -->
	<div class="modal fade" id="medicationsViewAll" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Medication - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th>Name</th>
										<th>Dosage</th>
										<th>Form</th>
										<th>Frequency</th>
										<th>Number of Days</th>
										<th>Quantity</th>
										<th>Status</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="medicationViewAll_table">


								</tbody>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="edit-system-review-modal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
					<div class="container-fluid pr-0 bg-danger">
						<div class="d-flex align-items-center justify-content-between">
							<h4 class="text-slate-900 my-0">Edit System Review</h4>
							<div>
								<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
							</div>
						</div>
					</div>
					<div class="container bg-white p-2">
						<div class="container-fluid">
							<div class="row mb-3 mt-4">
								<div class="col-md-12" id="system-review-modal">
								
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- edit modals section -->
	<div id="hx-modal"></div>
	<div id="stop-refill-prescription-modal"></div>
	<div id="stop-refill-infusion-modal"></div>
	<div id="cc-modal"></div>
	<div id="allergies-modal"></div>
	<div id="system-review-modal"></div>
	<div id="comorbidity-modal"></div>
	<div id="odqs-modal"></div>
	<div id="social-modal"></div>
	<div id="contraception-modal"></div>
	<div id="pregnancy-modal"></div>
	<div id="gynaecology-modal"></div>
	<div id="obstetric-modal"></div>
	<div id="family-modal"></div>
	<div id="allergy-reactions-modal"></div>
</div>
<script type="text/javascript">
	var global_allergy_category_obj;

	function clearDoctorsNote() {
		$('#title').val('');
		$('#notes').val('');
		//document.getElementById('notes').innerHTML = '';
	}
	function setTextToElement(id, text) {
			//get element and set text 
			$(\`#\${id}\`).text(\`\${text}\`);
	}

	function showAllDiagnosis(params) {
		$('#viewAllDiagnosisModal').modal('show')
	}
	
	//Symtoms 
	$(document).ready(function() {
		/************************GLOBAL****************/
		//global variables 

		// card section
		let array_labs, array_vitals, array_prescriptions, array_infusions, array_complaints, array_comorbidities, array_illness, array_surgeries, array_familyHistory, array_social;
		let pain;

		mobiscroll.datepicker('.set_date_past', {
			controls: ['calendar'],
			dateFormat: 'YYYY-MM-DD',
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light',
			max: moment(new Date()).format("yyyy-mm-dd")
		});
		mobiscroll.datepicker('.set_date', {
			controls: ['calendar'],
			dateFormat: 'YYYY-MM-DD',
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light',
		});

		//Test 





		//accordion section

		let past_illness = (localStorage.getItem('pastIllness') == 'null' || localStorage.getItem('pastIllness') == null) ? [] : JSON.parse(localStorage.getItem('pastIllness'));
		let past_surgeries = (localStorage.getItem('pastSurgeries') == 'null' || localStorage.getItem('pastSurgeries') == null) ? [] : JSON.parse(localStorage.getItem('pastSurgeries'));
		let past_haemo = (localStorage.getItem('pastHaemo') == 'null' || localStorage.getItem('pastHaemo') == null) ? [] : JSON.parse(localStorage.getItem('pastHaemo'));
		let family_history = localStorage.getItem('familyHistory') != 'null' ? JSON.parse(localStorage.getItem('familyHistory')) : null;
		let social_history = localStorage.getItem('socialHistory') != 'null' ? JSON.parse(localStorage.getItem('socialHistory')) : null;
		let contraception_history = (localStorage.getItem('contraceptionHistory') == 'null' || localStorage.getItem('contraceptionHistory') == null) ? [] : JSON.parse(localStorage.getItem('contraceptionHistory'));
		let pregnancy_history = (localStorage.getItem('pregnancyHistory') == 'null' || localStorage.getItem('pregnancyHistory') == null) ? [] : JSON.parse(localStorage.getItem('pregnancyHistory'));
		let gyna_history = localStorage.getItem('gynaecologyHistory') != 'null' ? JSON.parse(localStorage.getItem('gynaecologyHistory')) : null;
		let obstetric_history = localStorage.getItem('obstetricHistory') != 'null' ? JSON.parse(localStorage.getItem('obstetricHistory')) : null;
		let general_exam = localStorage.getItem('generalExam') != 'null' ? JSON.parse(localStorage.getItem('generalExam')) : null;
		let eye_exam = localStorage.getItem('eyeExam') != 'null' ? JSON.parse(localStorage.getItem('eyeExam')) : null;
		let nose_exam = localStorage.getItem('noseExam') != 'null' ? JSON.parse(localStorage.getItem('noseExam')) : null;
		let mouth_exam = localStorage.getItem('mouthExam') != 'null' ? JSON.parse(localStorage.getItem('mouthExam')) : null;
		let neck_exam = localStorage.getItem('neckExam') != 'null' ? JSON.parse(localStorage.getItem('neckExam')) : null;
		let groin_exam = localStorage.getItem('groinExam') != 'null' ? JSON.parse(localStorage.getItem('groinExam')) : null;
		let hands_exam = localStorage.getItem('handExam') != 'null' ? JSON.parse(localStorage.getItem('handExam')) : null;
		let breasts_exam = localStorage.getItem('breastExam') != 'null' ? JSON.parse(localStorage.getItem('breastExam')) : null;
		let cardio_exam = localStorage.getItem('cardioExam') != 'null' ? JSON.parse(localStorage.getItem('cardioExam')) : null;
		let respiratory_exam = localStorage.getItem('respiratoryExam') != 'null' ? JSON.parse(localStorage.getItem('respiratoryExam')) : null;
		let abdomen_exam = localStorage.getItem('abdomenExam') != 'null' ? JSON.parse(localStorage.getItem('abdomenExam')) : null;
		let extremities_exam = localStorage.getItem('extremitiesExam') != 'null' ? JSON.parse(localStorage.getItem('extremitiesExam')) : null;
		let neurology_exam = localStorage.getItem('neurologyExam') != 'null' ? JSON.parse(localStorage.getItem('neurologyExam')) : null;










		//functions

		//Reset function
		function resetEncounterNotes() {

			//reset variables local storage for each section
			localStorage.setItem('pastIllness', null);
			localStorage.setItem('pastSurgeries', null);
			localStorage.setItem('pastHaemo', null);
			localStorage.setItem('familyHistory', null);
			localStorage.setItem('socialHistory', null);
			localStorage.setItem('contraceptionHistory', null);
			localStorage.setItem('pregnancyHistory', null);
			localStorage.setItem('gynaecologyHistory', null);
			localStorage.setItem('obstetricHistory', null);
			localStorage.setItem('generalExam', null);
			localStorage.setItem('eyeExam', null);
			localStorage.setItem('noseExam', null);
			localStorage.setItem('mouthExam', null);
			localStorage.setItem('neckExam', null);
			localStorage.setItem('groinExam', null);
			localStorage.setItem('handExam', null);
			localStorage.setItem('breastExam', null);
			localStorage.setItem('cardioExam', null);
			localStorage.setItem('respiratoryExam', null);
			localStorage.setItem('abdomenExam', null);
			localStorage.setItem('extremitiesExam', null);
			localStorage.setItem('neurologyExam', null);



		}

		//change accordion color
		function accordionColorChange() {
			//Check for the presensce of data in all varibales concerned and display appropriate color

			//Past medical History Accordion
			if (past_illness.length != 0 || past_surgeries.length != 0 || past_haemo.length != 0) {
				//change accordion header color
				$('#pmhHeading').css('background', 'rgba(85, 239, 196,.3)');
			}

			// family history 
			if (family_history != null) {
				//change accordion header color
				$('#fhHeading').css('background', 'rgba(85, 239, 196,.3)');
			}

			//social history
			if (social_history != null) {
				//change accordion header color
				$('#pshHeading').css('background', 'rgba(85, 239, 196,.3)');
			}


			//contraception history 
			if (contraception_history.length != 0) {
				//change accordion header color
				$('#chHeading').css('background', 'rgba(85, 239, 196,.3)');
			}


			//pregnancy history 
			if (pregnancy_history.length != 0) {
				//change accordion header color
				$('#phHeading').css('background', 'rgba(85, 239, 196,.3)');
			}


			//gyna history
			if (gyna_history != null) {
				//change accordion header color
				$('#ghHeading').css('background', 'rgba(85, 239, 196,.3)');
			}


			//obstetric history 
			if (obstetric_history != null) {
				//change accordion header color
				$('#ohHeading').css('background', 'rgba(85, 239, 196,.3)');
			}


			//review systems history 
			if (general_exam != null || eye_exam != null || nose_exam != null || mouth_exam != null || neck_exam != null || groin_exam != null || hands_exam != null || breasts_exam != null || cardio_exam != null || respiratory_exam != null || abdomen_exam != null || extremities_exam != null || neurology_exam != null) {
				//change accordion header color
				$('#reviewHeading').css('background', 'rgba(85, 239, 196,.3)');
			}




		}

		//run above function on page load
		accordionColorChange();



		//Populate Surgery Select 
		function populateAllergySubstanceSelect(data) {
			//empty first before populate 

			$.each(data, function(key, value) {
				$('#allergy_substance_select').append(\`<option value="\${value}">\${value}</option>\`);
			})

		}





		//Allergy category 
		$('#allergy_category').change(function() {
			//Display Substance contianer section 
			$('#substance_container').removeClass('d-none');
			//create array for different options
			const array_food = ['celery', 'cereals', 'containing', 'gluten', 'wheat', 'barley', 'oats', 'crustaceans', 'prawns', 'crabs', 'lobsters', 'eggs', 'fish', 'lupin', 'milk', 'molluscs', 'mussels', 'oysters', 'mustard', 'peanut', 'tree nut', 'almonds', 'hazelnuts', 'walnuts', 'Brazil', 'nuts', 'cashews', 'pecans', 'pistachios', 'macadamia', 'sulphur dioxide and sulphites', 'sesame', 'soybeans'];


			//check selected value 
			console.log('selected category: ' + $(this).find(':selected').val());

			if ($(this).find(':selected').val() == 'food') {




			}

		})


		//set Recorded past illness 
		const past_illness_table = $('#past_illness_table').dataTable({
			data: past_illness,
			columns: [{
					data: 'time_period'
				},
				{
					data: 'description'
				},
				{
					data: 'comment'
				},
				{
					data: 'action'
				}
			]
		})

		//set recorded past surgries 
		const past_surgeries_table = $('#past_surgeries_table').dataTable({
			data: past_surgeries,
			columns: [{
					data: 'time_period'
				},
				{
					data: 'description'
				},
				{
					data: 'comment'
				},
				{
					data: 'action'
				}
			]
		})


		//set recorded past haemo transfusion 
		const past_haemo_table = $('#past_haemo_table').dataTable({
			data: past_haemo,
			columns: [{
					data: 'time_period'
				},
				{
					data: 'description'
				},
				{
					data: 'comment'
				},
				{
					data: 'action'
				}
			]
		})




		//set recorded contraception history 
		// const contraception_history_table = $('#contraception_history_table').dataTable({
		// 	data: contraception_history,
		// 	columns: [{
		// 			data: 'date_started'
		// 		},
		// 		{
		// 			data: 'contraception_type_id'
		// 		},
		// 		{
		// 			data: 'duration'
		// 		},
		// 		{
		// 			data: 'complication'
		// 		},
		// 		{
		// 			data:'action'
		// 		}
		// 	]
		// })
















		function showFilterDiv(id) {

			// console.log("selected filter:" + id)

			//Get element 
			const element = $(\`.\${id}\`);
			// console.log(element);

			if (element.hasClass('d-none')) {
				console.log(\`\${id} has d-none\`);
				element.removeClass('d-none');
			}

			//hide siblings 
			element.siblings().each(function() {
				if (!$(this).hasClass('d-none')) {
					$(this).addClass('d-none');
				}
			})

		}

		//set Text to span function
		function setTextToElement(id, text) {
			//get element and set text 
			$(\`#\${id}\`).text(\`\${text}\`);


		}







		//Search bar 
		let suggestions = [
			"cc",
			"Chief Complaint",
			"History Of Presenting Illness"

		];

		// getting all required elements
		const searchWrapper = document.querySelector(".search-input");
		const inputBox = searchWrapper.querySelector("input");
		const suggBox = searchWrapper.querySelector(".autocom-box");
		const icon = searchWrapper.querySelector(".icon");
		let linkTag = searchWrapper.querySelector("a");
		let webLink;

		// if user press any key and release
		inputBox.onkeyup = (e) => {
			let userData = e.target.value; //user enetered data
			let emptyArray = [];
			if (userData) {
				icon.onclick = () => {
					webLink = "https://www.google.com/search?q=" + userData;
					linkTag.setAttribute("href", webLink);
					console.log(webLink);
					linkTag.click();
				}
				emptyArray = suggestions.filter((data) => {
					//filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
					return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
				});
				emptyArray = emptyArray.map((data) => {
					// passing return data inside li tag
					return data = '<li>' + data + '</li>';
				});
				searchWrapper.classList.add("active"); //show autocomplete box
				showSuggestions(emptyArray);
				let allList = suggBox.querySelectorAll("li");
				for (let i = 0; i < allList.length; i++) {
					//adding onclick attribute in all li tag
					allList[i].setAttribute("onclick", "select(this)");
				}
			} else {
				searchWrapper.classList.remove("active"); //hide autocomplete box
			}
		}

		function select(element) {
			let selectData = element.textContent;
			inputBox.value = selectData;
			icon.onclick = () => {
				webLink = "https://www.google.com/search?q=" + selectData;
				linkTag.setAttribute("href", webLink);
				linkTag.click();
			}
			searchWrapper.classList.remove("active");
		}

		function showSuggestions(list) {
			let listData;
			if (!list.length) {
				userValue = inputBox.value;
				listData = '<li>' + userValue + '</li>';
			} else {
				listData = list.join('');
			}
			suggBox.innerHTML = listData;
		}






		//Loop through each Textarea and apply ckEditor
		const allCkEditors = []


		// $('.notesEditor').each(function() {

		// 	ClassicEditor
		// 		.create(document.querySelector(\`#\${$(this).attr('id')}\`), {
		// 			placeholder: 'Type some text here...'
		// 		})
		// 		.then(editor => {

		// 			allCkEditors.push(editor)
		// 		})
		// 		.catch(error => {
		// 			console.error(error);
		// 		});


		// })






		//Symptoms tabs
		// save tab in local storage
		$('#symptomTab a[data-toggle="tab"]').on('shown.bs.tab', function() {
			localStorage.setItem('lastsymptomTab', $(this).attr('href'));
		});

		// display last tab if exist
		var lastsymptomTab = localStorage.getItem('lastsymptomTab');
		if (lastsymptomTab) {
			$('#symptomTab a[href=' + lastsymptomTab + ']').tab('show');
		} else {
			// Set the first tab if cookie do not exist
			$('#symptomTab a[data-toggle="tab"]:first').tab('show');
		}


		//Symptons Tabs
		let tabs = Array.from(document.querySelectorAll(".tabs li"));
		let contents = Array.from(document.querySelectorAll(".content > div"));

		tabs.forEach((element) => {
			element.addEventListener("click", (event) => {
				tabs.forEach((ele) => ele.classList.remove("active"));
				event.target.classList.add("active");
				contents.forEach((content) => {
					content.classList.remove("visible");
					//   content.classList.contains(event.target.dataset.content)
					//     ? content.classList.add("visible")
					//     : "";
					console.log(event.target.dataset.content);
					document
						.querySelector(\`.\${event.target.dataset.content}\`)
						.classList.add("visible");
				});
			});
		});


		//Notes tabs
		// save tab in local storage
		$('#doctorNoteTab a[data-toggle="tab"]').on('shown.bs.tab', function() {
			localStorage.setItem('doctorNoteLastTab', $(this).attr('href'));
		});

		// display last tab if exist
		var doctorNoteLastTab = localStorage.getItem('doctorNoteLastTab');
		if (doctorNoteLastTab) {
			$('#doctorNoteTab a[href=' + doctorNoteLastTab + ']').tab('show');
		} else {
			// Set the first tab if cookie do not exist
			$('#doctorNoteTab a[data-toggle="tab"]:first').tab('show');
		}


		//examinations tabs
		// save tab in local storage
		$('#examinationTab a[data-toggle="tab"]').on('shown.bs.tab', function() {
			localStorage.setItem('lastExaminationTab', $(this).attr('href'));
		});

		// display last tab if exist
		var lastExaminationTab = localStorage.getItem('lastExaminationTab');
		if (lastExaminationTab) {
			$('#examinationTab a[href=' + lastExaminationTab + ']').tab('show');
		} else {
			// Set the first tab if cookie do not exist
			$('#examinationTab a[data-toggle="tab"]:first').tab('show');
		}


		//History tabs

		// save tab in local storage
		$('#historyTab a[data-toggle="tab"]').on('shown.bs.tab', function() {
			localStorage.setItem('lastHistoryTab', $(this).attr('href'));
		});

		// display last tab if exist
		var lastHistoryTab = localStorage.getItem('lastHistoryTab');
		if (lastHistoryTab) {
			$('#historyTab a[href=' + lastHistoryTab + ']').tab('show');
		} else {
			// Set the first tab if cookie do not exist
			$('#historyTab a[data-toggle="tab"]:first').tab('show');
		}





		/*********************TRIGGERS*****************/
		/**
		 * Record button for social History
		 * Validate form - if one is enter form validation passes
		 * Store in local storage 
		 * change accordion color
		 */
		$('#psh_recordBtn').on('click', function() {

			let isSocialFormValid = false;

			//validate form 
			//if at least one record exisit in form 
			$('#pshForm').find('input[type=text], select').each(function() {
				if ($(this).val() != "") {
					isSocialFormValid = true;
					return false
				}
			});



			if (isSocialFormValid) {

				social_history = {

					'occupation_id': $('#occupation_id').find(':selected').val(),
					'location_id': $('#location_id').find(':selected').val(),
					'family_circumstance': $('#family_circumstance').val(),
					'religion_id': $('#religion_id').find(':selected').val(),
					'hobbies': $('#hobbies').val(),
					'alcohol_intake': $('#alcohol_intake').find(':selected').val(),
					'alcohol_details': $('#alcohol_details').val(),
					'tobacco_intake': $('#tobacco_intake').find(':selected').val(),
					'tobacco_details': $('#tobacco_details').val(),


				}


				console.log('social history');
				console.log(social_history);





				//add to local storage 
				localStorage.setItem('socialHistory', JSON.stringify(social_history));

				//change color 
				accordionColorChange();


				//alert success
				alertify.success('Social History Recorded');
			} else {
				alertify.error('No Field Field');
			}




		})





		/**
		 * Record button for gynaecology History
		 * Validate form - if one is enter form validation passes
		 * Store in local storage 
		 * change accordion color
		 */
		$('#gh_recordBtn').on('click', function() {

			let isGynaecologyHistoryFormValid = false;

			//validate form 
			//if at least one record exisit in form 
			$('#ghForm').find('input[type=text], select').each(function() {
				if ($(this).val() != "") {
					isGynaecologyHistoryFormValid = true;
					return false
				}
			});



			if (isGynaecologyHistoryFormValid) {

				gyna_history = {

					'date_of_last_menstrual_period': moment($('#date_of_last_menstrual_period').val()).format("YYYY-MM-DD HH:mm:ss"),
					'menarche': $('#menarche').val(),
					'menopause': $('#menopause').val(),
					'cycle_length': $('#religion_id').val(),
					'duration_of_bleed': $('#duration_of_bleed').val(),
					'volume': $('#gyna_volume').find(':selected').val(),
					'intermenstrual_bleeding': $('#intermenstrual_bleeding').find(':selected').val(),
					'intermenstrual_bleeding_details': $('#intermenstrual_bleeding_details').val(),
					'dysmenorrhoea': $('#dysmenorrhoea').find(':selected').val(),
					'dysmenorrhoea_details': $('#dysmenorrhoea_details').val(),
					'post_coital_bleeding': $('#post_coital_bleeding').find(':selected').val(),
					'post_coital_bleeding_details': $('#post_coital_bleeding_details').val(),
					'dyspareunia': $('#dyspareunia').find(':selected').val(),
					'dyspareunia_details': $('#dyspareunia_details').val(),
					'number_of_lifetime_sexual_partners': $('#number_of_lifetime_sexual_partners').val(),
					'coital_frequency': $('#coital_frequency').val(),
					'cervical_cancer_screening': $('#cervical_cancer_screening').find(':selected').val(),
					'cervical_cancer_screening_details': $('#cervical_cancer_screening_details').val(),
					'breast_screening': $('#breast_screening').val(),
					'breast_screening_details': $('#breast_screening_details').val(),
					'previous_gynaecologic_procedures': $('#previous_gynaecologic_procedures').find(':selected').val(),
					'previous_gynaecologic_procedures_details': $('#previous_gynaecologic_procedures_details').val(),








				}


				console.log('gyna history');
				console.log(gyna_history);





				//add to local storage 
				localStorage.setItem('gynaecologyHistory', JSON.stringify(gyna_history));

				//change color 
				accordionColorChange();


				//alert success
				alertify.success('Gynaecological History Recorded');
			} else {
				alertify.error('No Field Field');
			}




		})







		/**
		 * Record button for obstetric History
		 * Validate form - if one is enter form validation passes
		 * Store in local storage 
		 * change accordion color
		 */
		$('#oh_recordBtn').on('click', function() {

			let isObstetricHistoryFormValid = false;

			//validate form 
			//if at least one record exisit in form 
			$('#ohForm').find('input[type=text], select').each(function() {
				if ($(this).val() != "") {
					isObstetricHistoryFormValid = true;
					return false
				}
			});



			if (isObstetricHistoryFormValid) {

				obstetric_history = {
					'no_of_pregnancies': $('#no_of_pregnancies').val(),
					'no_of_births': $('#no_of_births').val(),
					'no_of_abortions_spontaneous': $('#no_of_abortions_spontaneous').val(),
					'no_of_abortions_induced': $('#no_of_abortions_induced').val(),
					'date_of_last_menstrual_period': moment($('#oh_date_of_last_menstrual_period').val()).format("YYYY-MM-DD HH:mm:ss"),
					'date_of_positive_pregnancy_test': moment($('#date_of_positive_pregnancy_test').val()).format("YYYY-MM-DD HH:mm:ss"),
					'confirmatory_ultrasound_scan': $('#confirmatory_ultrasound_scan').find(':selected').val(),
					'date_of_scan': moment($('#date_of_scan').val()).format("YYYY-MM-DD HH:mm:ss"),
					'child_info': $('#child_info').val(),
					'gestational_age': $('#gestational_age').val(),
					'edd': $('#edd').val(),


				}


				console.log('obstetric history');
				console.log(obstetric_history);





				//add to local storage 
				localStorage.setItem('obstetricHistory', JSON.stringify(obstetric_history));

				//change color 
				accordionColorChange();


				//alert success
				alertify.success('Obstetric  History Recorded');
			} else {
				alertify.error('No Field Field');
			}




		})






		/**
		 * Record button for Pregnancy History
		 * Validate form - if one is enter form validation passes
		 * Store in local storage 
		 * change accordion color
		 */
		$('#ph_recordBtn').on('click', function() {
			let isPregnancyHistoryFormValid = true

			//validate pregnancy form
			$('#pregnancy_number,#date_conceived,#mode_of_conception,#mode_of_delivery,#outcome,#pregnancy_complications,#gender_id,#child_weight,#child_info').each(function() {
				if ($.trim($(this).val()) == '') {
					isPregnancyHistoryFormValid = false
					$(this).css({
						"border": "1px solid red",
						"background": ""
					});
				} else {

					$(this).css({
						"border": "1px solid green",
						"background": ""
					});
				}
			});


			if (isPregnancyHistoryFormValid) {

				pregnancy_history.push({
					'mode_of_conception': $('#mode_of_conception').find(':selected').val(),
					'pregnancy_number': $('#pregnancy_number').val(),
					'date_conceived': moment($('#date_conceived').val()).format("YYYY-MM-DD HH:mm:ss"),
					'pregnancy_complications': $('#pregnancy_complications').val(),
					'mode_of_delivery': $('#mode_of_delivery').find(':selected').val(),
					'outcome': $('#outcome').find(':selected').val(),
					'gender_id': $('#gender_id').find(':selected').val(),
					'weight': $('#child_weight').val(),
					'child_info': $('#child_info').val(),
					'action': \`<a  class="btn btn-xs btn-danger ">Cancel</a>\`
				})

				console.log('Pregnancy History');
				console.log(pregnancy_history);


				// contraception_history_table.fnClearTable();
				// contraception_history_table.fnAddData(past_illness);
				// contraception_history_table.fnDraw();


				//clear form data 
				$('#phForm').trigger('reset');



				//add to local storage 
				localStorage.setItem('pregnancyHistory', JSON.stringify(pregnancy_history));

				//change color 
				accordionColorChange();


				//alert success
				alertify.success('pregnancy History Recorded');



			} else {
				alertify('Fill Required Fields');
			}




		})




		/**
		 * Record button for Family History
		 * Validate form - if one is enter form validation passes
		 * Store in local storage 
		 * change accordion color
		 */
		$('#fh_recordBtn').on('click', function() {

			let isHistoryFormValid = false;

			//validate form 
			//if at least one record exisit in form 
			$('#familyHistoryForm').find('input[type=text], select').each(function() {
				if ($(this).val() != "") {
					isHistoryFormValid = true;
					return false
				}
			});

			if (isHistoryFormValid) {

				family_history = {

					'mother_status': $('#mother_status').find(':selected').val(),
					'mother_age': $('#mother_age').val(),
					'mother_condition': $('#mother_condition').val(),
					'father_status': $('#father_status').find(':selected').val(),
					'father_age': $('#father_age').val(),
					'father_condition': $('#father_condition').val(),
					'spouse_status': $('#spouse_status').find(':selected').val(),
					'spouse_age': $('#spouse_age').val(),
					'spouse_condition': $('#spouse_condition').val(),
					'number_of_children': $('#number_of_children').val(),
					'children_condition': $('#children_condition').val(),
					'other_details': $('#other_details').val()



				}


				//add to local storage 
				localStorage.setItem('familyHistory', JSON.stringify(family_history));

				//change color 
				accordionColorChange();


				//alert success
				alertify.success('Family History Recorded');
			} else {
				alertify.error('No Field Field');
			}




		})


		/**
		 * Record button for Contraception History
		 * Validate form - if one is enter form validation passes
		 * Store in local storage 
		 * change accordion color
		 */
		$('#ch_recordBtn').on('click', function() {

			let isContraceptionHistoryFormValid = true

			//validate contraception form
			$('#contraception_types,#ch_dateStarted,#ch_duration').each(function() {
				if ($.trim($(this).val()) == '') {
					isContraceptionHistoryFormValid = false
					$(this).css({
						"border": "1px solid red",
						"background": ""
					});
				} else {

					$(this).css({
						"border": "1px solid green",
						"background": ""
					});
				}
			});


			if (isContraceptionHistoryFormValid) {

				contraception_history.push({
					'contraception_type_id': $('#contraception_types').find(':selected').val(),
					'date_started': moment($('#ch_dateStarted').val()).format("YYYY-MM-DD HH:mm:ss"),
					'duration': $('#ch_duration').val(),
					'complications': $('#ch_complications').val(),
					'action': \`<a  class="btn btn-xs btn-danger ">Cancel</a>\`
				})

				console.log('Contraception History');
				console.log(contraception_history);


				// contraception_history_table.fnClearTable();
				// contraception_history_table.fnAddData(past_illness);
				// contraception_history_table.fnDraw();


				//clear form data 
				$('#chForm').trigger('reset');



				//add to local storage 
				localStorage.setItem('contraceptionHistory', JSON.stringify(contraception_history));

				//change color 
				accordionColorChange();


				//alert success
				alertify.success('Contraception History Recorded');



			} else {
				alertify('Fill Required Fields');
			}




		});


		/**
		 * Reset Encounter Notes Button
		 * Clear all Filed buy changing value in local storage and reload 
		 */
		$('#reset_doctor_notes').on('click', function() {

			//run reset function 
			resetEncounterNotes();

			//reload page 
			location.reload();

		})


		/**
		 * Cancel past illness recorded data 
		 * Remove from array and refresh table 
		 */
		$(document).on('click', '.cancelPastIllness', function() {
			console.log('position:' + $(this).attr('data-position'));

			//remove from array using posititon
			past_illness.splice($(this).attr('data-position'), 1);




			//re -initalize table
			past_illness_table.fnClearTable();
			past_illness.length != 0 ? past_illness_table.fnAddData(past_illness) : console.log('Empty past illness in cancel past illness function');
			past_illness_table.fnDraw();


			//update local storage 
			localStorage.setItem('pastIllness', JSON.stringify(past_illness));

			console.log(past_illness);



		})

		//Previous Encounter CheckBox
		$('#previous_enc_checkbox').bind('change', function() {

			//if the checked 
			if ($(this).is(':checked')) {
				//show new note button 
				$('#newNote_btn').removeClass('d-none');


			} else {
				//hide new notes button
				$('#newNote_btn').addClass('d-none');

				//Collapse accordion if opened
				$('#newNoteCollapse').removeClass('show');
			}
		})




		let examShown = $('#exams_filter').find(':selected').text().toLowerCase();
		// console.log(\`\${examShown}Div\`)

		//make sure selected exam is shown 
		showFilterDiv(\`\${examShown}Div\`)





		/**
		 * REVIEW SYSTEM FILTER ON CHANGE
		 */
		let filterShowOnPageLoad_review = $('#exams_filter').find(':selected').val();
		//make show filter is shown
		showFilterDiv(\`\${filterShowOnPageLoad_review}Div\`);
		$('#exams_filter').change(function() {
			console.log('filter changed');
			let filterSelected = $('#exams_filter').find(':selected').val();
			showFilterDiv(\`\${filterSelected}Div\`);
			filterShowOnPageLoad_review = \`\${filterSelected}\`;

		})



		/**
		 * Past MEdical History Filter on change
		 *  
		 */
		let filterShowOnPageLoad_pmh = $('#pmHx_filter').find(':selected').val();
		//make show filter is shown
		showFilterDiv(\`\${filterShowOnPageLoad_pmh}Div\`);
		$('#pmHx_filter').change(function() {
			console.log('filter changed');
			let filterSelected = $('#pmHx_filter').find(':selected').val();
			showFilterDiv(\`\${filterSelected}Div\`);
			filterShowOnPageLoad_pmh = \`\${filterSelected}\`;

		})



		/**
		 * Past MEdical History View Filter on change
		 *  
		 */
		let filterShowOnPageLoad_viewTab = $('#pmHx_view_filter').find(':selected').val();
		//make show filter is shown
		showFilterDiv(\`\${filterShowOnPageLoad_viewTab}Div\`);
		$('#pmHx_view_filter').change(function() {
			console.log('filter changed');
			let filterSelected = $('#pmHx_view_filter').find(':selected').val();
			showFilterDiv(\`\${filterSelected}Div\`);
			filterShowOnPageLoad_viewTab = \`\${filterSelected}\`;

		})




		$("#doctorNoteForm").submit(function() {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});

		/**
		 * Family History Record Button
		 * 
		 */


		/**
		 * Past Medical History Record Button 
		 * Determine Filter shown and submit specific form
		 */
		$('#pmh_recordBtn').on('click', function() {


			let isPastMedicalHistoryFormValid = true;
			//Determine Filter shown
			let shownFilter = $('#pmHx_filter').find(':selected').val();



			if (shownFilter == 'illness') {

				//validate past illness form
				$('#illness_desc,#illness_comment,#illness_period').each(function() {
					if ($.trim($(this).val()) == '') {
						isPastMedicalHistoryFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});

				if (isPastMedicalHistoryFormValid) {

					//illness form 
					past_illness.push({
							'description': $('#illness_desc').val(),
							'comment': $('#illness_comment').val(),
							'time_period': moment($('#illness_period').val()).format("YYYY-MM-DD HH:mm:ss"),
							'action': \`<a data-position="\${past_illness.length}" class="btn btn-xs btn-danger cancelPastIllness">Cancel</a>\`

						}

					)

					//clear form data 
					$('#illnessForm').trigger('reset');



					//add to local storage 
					localStorage.setItem('pastIllness', JSON.stringify(past_illness));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Past Illness Recorded');

					//reload the table 
					past_illness_table.fnClearTable();
					past_illness_table.fnAddData(past_illness);
					past_illness_table.fnDraw();

				} else {
					alertify.error('Fill All Field in Form');
				}

			} else if (shownFilter == 'surgeries') {

				//validate past surgeries form
				$('#pmh_surgery_id,#pmh_surgeries_period').each(function() {
					if ($.trim($(this).val()) == '') {

						isPastMedicalHistoryFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});



				if (isPastMedicalHistoryFormValid) {
					//surgeries form 
					past_surgeries.push({
							'description': $('#pmh_surgeries_desc').val(),
							'comment': $('#pmh_surgeries_comment').val(),
							'time_period': moment($('#pmh_surgeries_period').val()).format("YYYY-MM-DD HH:mm:ss"),
							'surgeries_id': $('#pmh_surgery_id').val(),
							'action': \`<a  class="btn btn-xs btn-danger cancelPastSurgeries">Cancel</a>\`

						}

					)

					console.log('Past Surgeries JSON');
					console.log(past_surgeries);

					//clear form data 
					$('#surgeriesForm').trigger('reset');

					//add to local storage 
					localStorage.setItem('pastSurgeries', JSON.stringify(past_surgeries));

					//change color 
					accordionColorChange();

					//alert success
					alertify.success('Past Surgeries Recorded');

					//reload the table 
					past_surgeries_table.fnClearTable();
					past_surgeries_table.fnAddData(past_surgeries);
					past_surgeries_table.fnDraw();



				} else {
					alertify.error('Fill All Field in Form');
				}




			} else if (shownFilter == 'haemo') {

				//validate past surgeries form
				$('#haemo_desc,#haemo_comment,#haemo_period').each(function() {
					if ($.trim($(this).val()) == '') {
						isPastMedicalHistoryFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});

				if (isPastMedicalHistoryFormValid) {
					//haemo form 
					past_haemo.push({
							'description': $('#haemo_desc').val(),
							'comment': $('#haemo_comment').val(),
							'time_period': moment($('#haemo_period').val()).format("YYYY-MM-DD HH:mm:ss"),
							'action': \`<a  class="btn btn-xs btn-danger cancelPastHaemo">Cancel</a>\`

						}

					)

					//clear form data 
					$('#haemoForm').trigger('reset');

					//add to local storage 
					localStorage.setItem('pastHaemo', JSON.stringify(past_haemo));

					//change color 
					accordionColorChange();




					//alert success
					alertify.success('Past HaemoTransfusion Recorded');

					//reload the table 
					past_haemo_table.fnClearTable();
					past_haemo_table.fnAddData(past_haemo);
					past_haemo_table.fnDraw();



				} else {
					alertify.error('Fill All Field in Form');
				}



			}

			//reset form variable 
			//isPastMedicalHistoryFormValid = true;

			console.log(past_illness);
		})



		/**
		 * Review of Body Systems Record Button 
		 * Determine Filter shown and record specific form
		 */
		$('#review_recordBtn').on('click', function() {

			let isReviewFormValid = true;

			//Determine choosen Filter 
			let filter = $('#exams_filter').find(':selected').val();

			console.log('selected filter:' + filter);


			if (filter == 'general') {

				//validate general exam form
				$('#general_exam_temperature,#general_exam_pulse,#general_exam_respiratory_rate').each(function() {
					if ($.trim($(this).val()) == '') {

						isReviewFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});

				console.log('Review Form:' + isReviewFormValid)


				if (isReviewFormValid) {


					general_exam = {
						'temperature': $('#general_exam_temperature').val(),
						'pulse': $('#general_exam_pulse').val(),
						'respiratory_rate': $('#general_exam_respiratory_rate').val(),
						'hydration': $('#hydration').find(':selected').val(),
						'distress': $('#distress').find(':selected').val(),
						'distress_details': $('#distress_details').val(),
						'mental_state': $('#mental_state').find(':selected').val(),
						'constitution': $('#constitution').find(':selected').val(),
						'pallor': $('#pallor').find(':selected').val(),
						'pallor_details': $('#pallor_details').val(),
						'jaundice': $('#jaundice').find(':selected').val(),
						'jaundice_details': $('#jaundice_details').val(),
						'cyanosis': $('#cyanosis').find(':selected').val(),
						'cyanosis_details': $('#cyanosis_details').val(),
						'oedema': $('#oedema').find(':selected').val(),
						'environment': $('#environment').val(),
						'other_findings': $('#other_findings').val(),


					}

					console.log('General Exam JSON');
					console.log(general_exam);

					//add to local storage 
					localStorage.setItem('generalExam', JSON.stringify(general_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('General Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');


				}


			} else if (filter == 'eyes') {

				//validate eye exam form
				$('#sclera_colour,#eye_exam_conjunctiva,#eye_exam_discharge').each(function() {
					if ($.trim($(this).val()) == '') {

						isReviewFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});



				if (isReviewFormValid) {


					eye_exam = {

						'sclera_colour': $('#sclera_colour').val(),
						'conjunctiva': $('#eye_exam_conjunctiva').find(':selected').val(),
						'discharge': $('#eye_exam_discharge').find(':selected').val(),
						'discharge_details': $('#discharge_details').val(),
						'strabismus': $('#strabismus').find(':selected').val(),
						'strabismus_details': $('#strabismus_details').val(),
						'exophthalmos': $('#exophthalmos').find(':selected').val(),
						'exophthalmos_details': $('#exophthalmos_details').val(),
						'fundoscopy': $('#fundoscopy').val(),
						'other_findings': $('#other_findings').val(),

					}

					console.log('Eye Exam JSON');
					console.log(eye_exam);

					//add to local storage 
					localStorage.setItem('eyeExam', JSON.stringify(eye_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Eyes Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}



			} else if (filter == 'nose') {

				//validate nose exam form
				$('#nose_exam_nasae,#nose_exam_discharge').each(function() {
					if ($.trim($(this).val()) == '') {

						isReviewFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});



				if (isReviewFormValid) {


					nose_exam = {
						'nasae': $('#nose_exam_nasae').find(':selected').val(),
						'discharge': $('#nose_exam_discharge').find(':selected').val(),
						'discharge_details': $('#nose_discharge_details').val(),
						'paranasal_tenderness': $('#paranasal_tenderness').find(':selected').val(),
						'paranasal_tenderness_details': $('#paranasal_tenderness_details').val(),
						'other_findings': $('#nose_other_findings').val(),


					}

					console.log('Nose Exam JSON');
					console.log(nose_exam);

					//add to local storage 
					localStorage.setItem('noseExam', JSON.stringify(nose_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Nose Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}


			} else if (filter == 'mouth') {
				//validate mouth exam form
				$('#lips,#tongue,#teeth').each(function() {
					if ($.trim($(this).val()) == '') {

						isReviewFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});



				if (isReviewFormValid) {


					mouth_exam = {
						'lips': $('#lips').find(':selected').val(),
						'tongue': $('#tongue').val(),
						'teeth': $('#teeth').val(),
						'gums': $('#gums').val(),
						'pharynx': $('#pharynx').val(),
						'other_significant_findings': $('#other_significant_findings').val(),

					}

					console.log('Mouth Exam JSON');
					console.log(mouth_exam);

					//add to local storage 
					localStorage.setItem('mouthExam', JSON.stringify(mouth_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Mouth Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}

			} else if (filter == 'neck') {
				//validate neck exam form
				$('#neck_exam_lymph_node,#neck_exam_thyroid_gland').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});



				if (isReviewFormValid) {


					neck_exam = {
						'lymph_node': $('#neck_exam_lymph_node').val(),
						'thyroid_gland': $('#neck_exam_thyroid_gland').val(),
						'other_significant_findings': $('#neck_exam_other_significant_findings').val(),


					}

					console.log('Neck Exam JSON');
					console.log(neck_exam);

					//add to local storage 
					localStorage.setItem('neckExam', JSON.stringify(neck_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Neck Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}

			} else if (filter == 'groin') {
				//validate neck exam form
				$('#groin_exam_lymph_node').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					groin_exam = {
						'lymph_node': $('#groin_exam_lymph_node').val(),
						'other_significant_findings': $('#groin_exam_other_significant_findings').val(),


					}

					console.log('Groin Exam JSON');
					console.log(groin_exam);

					//add to local storage 
					localStorage.setItem('groinExam', JSON.stringify(groin_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Groin Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}



			} else if (filter == 'hands') {
				//validate hands exam form
				$('#hands_exam_lymph_node').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					hands_exam = {
						'lymph_node': $('#hands_exam_lymph_node').val(),
						'other_findings': $('#hands_exam_other_significant_findings').val(),


					}

					console.log('Hands Exam JSON');
					console.log(hands_exam);

					//add to local storage 
					localStorage.setItem('handExam', JSON.stringify(hands_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Hands Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}

			} else if (filter == 'breast') {
				//validate breast exam form
				$('#inspection,#palpation').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					breasts_exam = {
						'palpation': $('#palpation').val(),
						'inspection': $('#inspection').val(),


					}

					console.log('Breasts Exam JSON');
					console.log(breasts_exam);

					//add to local storage 
					localStorage.setItem('breastExam', JSON.stringify(breasts_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Breasts Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}

			} else if (filter == 'cardiovascular') {
				//validate breast exam form
				$('#cardio_exam_pulse,#cardio_exam_rate,#cardio_exam_rhythm').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					cardio_exam = {
						'pulse': $('#cardio_exam_pulse').val(),
						'rate': $('#cardio_exam_rate').val(),
						'rhythm': $('#cardio_exam_rhythm').find(':selected').val(),
						'volume': $('#cardio_exam_volume').find(':selected').val(),
						'character': $('#cardio_exam_character').find(':selected').val(),
						'vessel_walls': $('#cardio_exam_vessel_walls').find(':selected').val(),
						'radio_femoral_delay': $('#cardio_exam_radio_femoral_delay').find(':selected').val(),
						'blood_pressure': $('#cardio_exam_blood_pressure').val(),
						'posture': $('#cardio_exam_posture').find(':selected').val(),
						'variscosities': $('#cardio_exam_variscosities').val(),
						'oedema_heart': $('#cardio_exam_oedema_heart').find(':selected').val(),
						'oedema_heart_comment': $('#cardio_exam_oedema_heart_comment').val(),
						'dyspnoea': $('#cardio_exam_dyspnoea').find(':selected').val(),
						'chest': $('#cardio_exam_chest').find(':selected').val(),
						'apex_beat_location': $('#cardio_exam_apex_beat_location').val(),
						'percussion': $('#cardio_exam_percussion').val(),
						'first_heart_sound': $('#cardio_exam_first_heart_sound').val(),
						'second_heart_sound': $('#cardio_exam_second_heart_sound').val(),
						'murmurs_and_added_sounds': $('#cardio_exam_murmurs_and_added_sounds').val(),
						'other_findings': $('#cardio_exam_other_findings').val(),



					}

					console.log('Cardiovascular Exam JSON');
					console.log(cardio_exam);

					//add to local storage 
					localStorage.setItem('cardioExam', JSON.stringify(cardio_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Cardiovascular Exam Recorded');





				} else {
					alertify.error('Fill Required Fields');
				}

			} else if (filter == 'respiratory') {
				//validate respiratory exam form
				$('#respiratory_exam_rr,#respiratory_exam_rhythm').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					respiratory_exam = {
						'rhythm': $('#respiratory_exam_rhythm').find(':selected').val(),
						'respiratory_rate': $('#respiratory_exam_rr').val(),
						'rhythm_details': $('#respiratory_exam_rhythm_details').val(),
						'depth': $('#respiratory_exam_depth').find(':selected').val(),
						'breath_sounds': $('#respiratory_exam_breath_sounds').find(':selected').val(),
						'use_of_accessory_muscles': $('#respiratory_exam_use_of_accessory_muscles').find(':selected').val(),
						'chest_movement': $('#respiratory_exam_chest_movement').find(':selected').val(),
						'chest_symmetry': $('#respiratory_exam_chest_symmetry').find(':selected').val(),
						'trachea': $('#respiratory_exam_trachea').find(':selected').val(),
						'chest_tenderness': $('#respiratory_exam_chest_tenderness').find(':selected').val(),
						'chest_tenderness_details': $('#respiratory_exam_chest_tenderness_details').val(),
						'vocal_fremitus': $('#respiratory_exam_vocal_fremitus').find(':selected').val(),
						'percussion': $('#respiratory_exam_percussion').find(':selected').val(),
						'percussion_details': $('#respiratory_exam_percussion_details').val(),
						'air_entry': $('#respiratory_exam_air_entry').find(':selected').val(),
						'breath_sounds_auscultation': $('#respiratory_exam_breath_sounds_auscultation').find(':selected').val(),
						'breath_sounds_details_auscultation': $('#respiratory_exam_breath_sounds_details_auscultation').val(),
						'added_sounds': $('#respiratory_exam_added_sounds').find(':selected').val(),
						'other_findings': $('#respiratory_exam_other_findings').val(),


					}

					console.log('Respiratory Exam JSON');
					console.log(respiratory_exam);

					//add to local storage 
					localStorage.setItem('respiratoryExam', JSON.stringify(respiratory_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Respiratory Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}


			} else if (filter == 'abdomen') {

				//validate abdomen exam form
				$('#abdomen_exam_skin,#abdomen_exam_contour').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					abdomen_exam = {
						'skin': $('#abdomen_exam_skin').find(':selected').val(),
						'contour': $('#abdomen_exam_contour').find(':selected').val(),
						'symmetry': $('#abdomen_exam_symmetry').find(':selected').val(),
						'movement': $('#abdomen_exam_movement').find(':selected').val(),
						'umbilicus': $('#abdomen_exam_umbilicus').find(':selected').val(),
						'hair_distribution': $('#abdomen_exam_hair_distribution').find(':selected').val(),
						'visible_veins': $('#abdomen_exam_visible_veins').find(':selected').val(),
						'visible_veins_details': $('#abdomen_exam_visible_veins_details').val(),
						'scars': $('#abdomen_exam_scars').find(':selected').val(),
						'scars_details': $('#abdomen_exam_scars_details').val(),
						'light_palpation': $('#abdomen_exam_light_palpation').val(),
						'liver': $('#abdomen_exam_liver').val(),
						'spleen': $('#abdomen_exam_spleen').val(),
						'kidneys': $('#abdomen_exam_kidneys').val(),
						'uterus': $('#abdomen_exam_uterus').val(),
						'other_masses': $('#abdomen_exam_other_masses').val(),
						'hernial_orifices': $('#abdomen_exam_hernial_orifices').val(),
						'external_genitalia': $('#abdomen_exam_external_genitalia').val(),
						'rectal_exam': $('#abdomen_exam_rectal_exam').val(),
						'bowel_sounds': $('#abdomen_exam_bowel_sounds').val(),
						'volume': $('#abdomen_exam_volume').find(':selected').val(),
						'other_findings': $('#abdomen_exam_other_findings').val(),



					}

					console.log('Abdomen Exam JSON');
					console.log(abdomen_exam);

					//add to local storage 
					localStorage.setItem('abdomenExam', JSON.stringify(abdomen_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Abdomen Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}

			} else if (filter == 'extremities') {
				//validate extremities exam form
				$('#left_inspection,#right_inspection').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					extremities_exam = {
						'left_tone': $('#left_tone').find(':selected').val(),
						'left_inspection': $('#left_inspection').val(),
						'left_power': $('#left_power').find(':selected').val(),
						'left_reflexes': $('#left_reflexes').val(),
						'left_sensation': $('#left_sensation').val(),
						'left_coordination': $('#left_coordination').val(),
						'right_inspection': $('#right_inspection').val(),
						'right_tone': $('#right_tone').find(':selected').val(),
						'right_power': $('#right_power').find(':selected').val(),
						'right_reflexes': $('#right_reflexes').val(),
						'right_sensation': $('#right_sensation').val(),
						'right_coordination': $('#right_coordination').val(),
						'autonomic_system': $('#autonomic_system').val(),
						'other_findings': $('#extremities_exam_other_findings').val(),

					}

					console.log('Extremities Exam JSON');
					console.log(extremities_exam);

					//add to local storage 
					localStorage.setItem('extremitiesExam', JSON.stringify(extremities_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Extremities Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}

			} else if (filter == 'neurology') {
				//validate neurology exam form
				$('#eye_opening,#neurology_exam_verbose_response').each(function() {
					if ($.trim($(this).val()) == '') {



						isReviewFormValid = false;
						$(this).css({
							"border": "1px solid red",
							"background": ""
						});
					} else {

						$(this).css({
							"border": "1px solid green",
							"background": ""
						});
					}
				});


				if (isReviewFormValid) {


					neurology_exam = {
						'eye_opening': $('#eye_opening').val(),
						'verbose_response': $('#neurology_exam_verbose_response').val(),
						'best_motor_response': $('#best_motor_response').val(),
						'score': $('#score').val(),
						'pulpillary_response_to_light': $('#pulpillary_response_to_light').val(),
						'speech': $('#neurology_exam_speech').find(':selected').val(),
						'neck_stiffness': $('#neck_stiffness').find(':selected').val(),
						'kernigs_sign': $('#kernigs_sign').find(':selected').val(),
						'brudzinski_sign': $('#brudzinski_sign').find(':selected').val(),
						'cranial_nerves': $('#cranial_nerves').val(),
						'other_findings': $('#neurology_exam_other_findings').val(),
					}

					console.log('Neurology Exam JSON');
					console.log(neurology_exam);

					//add to local storage 
					localStorage.setItem('neurologyExam', JSON.stringify(neurology_exam));

					//change color 
					accordionColorChange();


					//alert success
					alertify.success('Neurology Exam Recorded');




				} else {
					alertify.error('Fill Required Fields');
				}

			}

		})


		/**
		 * Reset Button for Past medical history Reset Button
		 * Reset For All Forms within past medical history
		 */
		$('#pmh_resetBtn').on('click', function() {

			//reset variables local storage for each section
			localStorage.setItem('pastIllness', null);
			localStorage.setItem('pastSurgeries', null);
			localStorage.setItem('pastHaemo', null);

			//reload page 
			location.reload();
		})


		/**
		 * Reset button for social history
		 * Set LocalStorage for social history global variable to null
		 * Reload page
		 */
		$('#psh_resetBtn').on('click', function() {
			localStorage.setItem('socialHistory', null);
			location.reload();
		})



		/**
		 * Reset button for contraception history
		 * Set LocalStorage for contraception history global variable to null
		 * Reload page
		 */
		$('#ch_resetBtn').on('click', function() {
			localStorage.setItem('contraceptionHistory', null);
			location.reload();
		})



		/**
		 * Reset button for pregnacy history
		 * Set LocalStorage for pregnancy history global variable to null
		 * Reload page
		 */
		$('#ph_resetBtn').on('click', function() {
			localStorage.setItem('pregnancyHistory', null);
			location.reload();
		})


		/**
		 * Reset button for gynaecology history
		 * Set LocalStorage for gynaecology history global variable to null
		 * Reload page
		 */
		$('#gh_resetBtn').on('click', function() {
			localStorage.setItem('gynaecologyHistory', null);
			location.reload();
		})



		/**
		 * Reset button for obstetric history
		 * Set LocalStorage for obstetric history global variable to null
		 * Reload page
		 */
		$('#oh_resetBtn').on('click', function() {
			localStorage.setItem('obstetricHistory', null);
			location.reload();
		})



		/**
		 * Reset button for review of system 
		 * Set LocalStorage for all exam of review of system  global variable to null
		 * Reload page
		 */
		$('#review_resetBtn').on('click', function() {
			//Reset All Exams
			localStorage.setItem('generalExam', null);
			localStorage.setItem('eyeExam', null);
			localStorage.setItem('noseExam', null);
			localStorage.setItem('mouthExam', null);
			localStorage.setItem('neckExam', null);
			localStorage.setItem('groinExam', null);
			localStorage.setItem('handExam', null);
			localStorage.setItem('breastExam', null);
			localStorage.setItem('cardioExam', null);
			localStorage.setItem('respiratoryExam', null);
			localStorage.setItem('abdomenExam', null);
			localStorage.setItem('extremitiesExam', null);
			localStorage.setItem('neurologyExam', null);
			location.reload();
		})






		/**
		 * Reset buton for family history 
		 * Set localStorage for family history global variable to null
		 * Reload page
		 */
		$('#fh_resetBtn').on('click', function() {

			//
			localStorage.setItem('familyHistory', null);

			//reload page 
			location.reload();
		})



		/** 
		 * SAVE DOCTOR'S NOTES 
		 *  Compile All different sections in to one json object to be passed to finalize encounter function
		 */
		$('#save_doctor_notes').on('click', function() {

			//console.log('patient id:' + <!-- php: // echo $patient_id --> + ', patient visit id:' + <!-- php: // echo $patient_visit_id -->)



			//GET data
			// const notes = {
			// 	'chief_complaint': allCkEditors[0].getData(),
			// 	'history_of_presenting_illness': allCkEditors[1].getData(),
			// 	'on_direct_questioning': allCkEditors[2].getData(),
			// 	'past_medical_history': allCkEditors[3].getData(),
			// 	'allergy': allCkEditors[4].getData(),
			// 	'medication_history': allCkEditors[5].getData(),
			// 	'surgical_history': allCkEditors[6].getData(),
			// 	'childhood_illness': allCkEditors[7].getData(),
			// 	'immunization_history': allCkEditors[8].getData(),
			// 	'family_history': allCkEditors[9].getData(),
			// 	'personal_social_history': allCkEditors[10].getData(),
			// 	'illicit_substance_use': allCkEditors[11].getData(),
			// 	'contraception_history': allCkEditors[12].getData(),
			// 	'pregnancy_history': allCkEditors[13].getData(),
			// 	'Gynaecological_history': allCkEditors[14].getData(),
			// 	'obstetric_history': allCkEditors[15].getData(),
			// 	'examinations': allCkEditors[16].getData(),
			// 	'remarks': allCkEditors[17].getData()

			// }


			//Compile Data 
			const data = {
				'past_illness': past_illness == null || past_illness.length == 0 ? null : past_illness,
				'past_surgeries': past_surgeries == null || past_surgeries.length == 0 ? null : past_surgeries,
				'past_haemo': past_haemo == null || past_haemo.length == 0 ? null : past_haemo,
				'family_history': family_history == null ? null : family_history,
				'social_history': social_history == null ? null : social_history,
				'contraception_history': contraception_history == null || contraception_history.length == 0 ? null : contraception_history,
				'pregnancy_history': pregnancy_history == null || pregnancy_history.length == 0 ? null : pregnancy_history,
				'gyna_history': gyna_history == null ? null : gyna_history,
				'obstetric_history': obstetric_history == null ? null : obstetric_history,
				'general_exam': general_exam == null ? null : general_exam,
				'eye_exam': eye_exam == null ? null : eye_exam,
				'nose_exam': nose_exam == null ? null : nose_exam,
				'mouth_exam': mouth_exam == null ? null : mouth_exam,
				'neck_exam': neck_exam == null ? null : neck_exam,
				'groin_exam': groin_exam == null ? null : groin_exam,
				'hands_exam': hands_exam == null ? null : hands_exam,
				'breasts_exam': breasts_exam == null ? null : breasts_exam,
				'cardio_exam': cardio_exam == null ? null : cardio_exam,
				'respiratory_exam': respiratory_exam == null ? null : respiratory_exam,
				'abdomen_exam': abdomen_exam == null ? null : abdomen_exam,
				'extremities_exam': extremities_exam == null ? null : extremities_exam,
				'neurology_exam': neurology_exam == null ? null : neurology_exam,

			}

			console.log('Finalize Encounter data ');
			console.log(data);



			//ajax 
			$.ajax({
				type: 'POST',
				data: data,
				url: '<!-- php: = $this->Url->build(['controller' => 'patientVisits', 'action' => 'finalizeEncounter', $patient_id, $patient_visit_id]) -->'
			}).done((data, textstatus, xhr) => {
				console.log(\`finalize encounter note Successful\`)
				console.log(data)

				//check status code 
				if (xhr.status == 200) {

					//display alert 
					alertify.success('Patient Encounter Notes Saved');

					//reset encounter notes 
					resetEncounterNotes();

					//reload page
					setTimeout(function() {
						location.reload();
					}, 200);
				} else {
					alertify.error('Internal Server Error');
				}




			}).fail((data) => {
				console.log(\`finalize encounter note Failed\`)
				console.log(data)

				//
				alertify.error('Improper Format');
			})

			//console.log(notes);

		})

		// $('#summernote').summernote({
		// 	placeholder: '',
		// 	tabsize: 2,
		// 	height: 350
		// });


		// CKEDITOR.replace('summernote', {
		// 	toolbar: 'Basic',
		// 	uiColor: '#9AB8F3'
		// });





		//Close Buttons for Accrodion
		$(".closeBtn").on('click', function() {

			//collapse accordion
			//remove show class


			if ($(this).parent().hasClass('show')) {

				//Trigger click on collapse toggle on accordion header click
				$(this).parent().parent().find('.accordion-header').trigger('click');



			}

		})







		//Add General Exam To Review of systems Accordion
		// $('.addGeneralExamForm').submit(function(e) {
		// 	console.log('submit button clicked')
		// 	//stop reload 
		// 	e.preventDefault();

		// 	//close modal
		// 	$('#addGeneralExaminationDialogue').modal('toggle')

		// 	//get gender 
		// 	const gender = '<!-- php: // echo $patient->gender_id -->';





		// 	// $('#examsEditor').model.change(writer => {
		// 	// 	const insertPosition = editor.model.document.selection.getFirstPosition();

		// 	// 	writer.insertText('CKEditor 5 rocks!', {
		// 	// 		linkHref: 'https://ckeditor.com/'
		// 	// 	}, insertPosition);
		// 	// });



		// 	//Insert Data to Review of system editor
		// 	//Get Data in Editor
		// 	let editor;
		// 	if (gender == 1) {
		// 		//male 
		// 		editor = allCkEditors[13];
		// 		console.log('male')
		// 	} else {
		// 		editor = allCkEditors[16];
		// 		console.log('Female')
		// 	}
		// 	const initalData = editor.getData();
		// 	//const testData = ' <span style="font-color: red">Thinking</span>'

		// 	const generalExamData = \`<p id="examGeneral" data-toggle="modal" data-target="#addGeneralExaminationDialogue">
		// 						<h3>General</h3> 
		// 						<b>Temp:</b> \${$('.addGeneralExamForm input[name="temperature"]').val()}; <b>Pulse:</b> \${$('.addGeneralExamForm input[name="pulse"]').val()}; <b>RR:</b> \${$('.addGeneralExamForm input[name="respiratory_rate"]').val()}; 
		// 						<b>Hydration:</b> \${$('.addGeneralExamForm select[name="hydration"]').find(':selected').text()}; <b>Distress:</b> \${$('.addGeneralExamForm select[name="distress"]').find(':selected').text()}; <b>Distress Details:</b> \${$('.addGeneralExamForm input[name="distress_details"]').val()}; <b>Mental State:</b> \${$('.addGeneralExamForm select[name="mental_state"]').find(':selected').text()};
		// 						<b>Constitution:</b> \${$('.addGeneralExamForm select[name="constitution"]').find(':selected').text()}; <b>Pallor:</b> \${$('.addGeneralExamForm select[name="pallor"]').find(':selected').text()}; <b>Pallor Details:</b> \${$('.addGeneralExamForm input[name="pallor_details"]').val()}; <b>Jaundice:</b> \${$('.addGeneralExamForm select[name="jaundice"]').find(':selected').text()}; <b>Jaundice Details:</b> \${$('.addGeneralExamForm input[name="jaundice_details"]').val()};
		// 						<b>Cyanosis:</b> \${$('.addGeneralExamForm select[name="cyanosis"]').find(':selected').text()}; <b>Cyanosis Details:</b> \${$('.addGeneralExamForm input[name="cyanosis_details"]').val()}; <b>Oedema:</b> \${$('.addGeneralExamForm select[name="oedema"]').find(':selected').text()}; <b>Environment:</b> \${$('.addGeneralExamForm input[name="environment"]').val()}; <b>Other Findings:</b> \${$('.addGeneralExamForm input[name="other_findings"]').val()};

		// 					</p>\`

		// 	//check if inital data in editor is null
		// 	// if null show only the general exam data
		// 	//if not null show both inital and general exam data 
		// 	if (initalData !== '') {
		// 		editor.setData(initalData + generalExamData);
		// 	} else {
		// 		editor.setData(generalExamData)
		// 	}

		// 	console.log('Editor after template:' + editor.getData())








		// })


		//chief complaint drop ups 
		// click on pain class , search for the sub-menu header text 
		$('.pain').on('click', function() {
			//set pain level 
			pain = $(this).attr('data-pain');
			//get parent class 
			const parent = $(this).parent();
			//get sub-menu header text 
			const header = parent.siblings().text();
			const editorData = \`\nMy \${header} : Pain Level - \${pain}\`

			//Get editor for chief compliants
			const editor = $("#cc-editor")

			//get data from editor
			const prev_data = editor.val();


			//add data to editor 
			editor.val(prev_data + editorData);
		})

		//chief complaint drop ups
		// click on nested-header class (sub sub menu) for I Feel 
		$('.no-submenu').on('click', function() {


			//check if clicked element has a no-submenu class 
			if ($(this).hasClass('nested-submenu')) {

				const sub_header = $(this).text();
				const header = $(this).parent().siblings().text();

				const editorData = \`\nI Feel \${header} \${sub_header}\`
				//Get editor for chief compliants
				const editor = $("#cc-editor")

				//get data from editor
				const prev_data = editor.val();

				//add data to editor 
				editor.val(prev_data + editorData);
			} else {
				const header = $(this).text();

				const editorData = \`\nI Feel \${header}\`
				//Get editor for chief compliants
				const editor = $("#cc-editor")
				//get data from editor
				const prev_data = editor.val();

				//add data to editor 
				editor.val(prev_data + editorData);

			}
		})


		//chief complaint drop ups
		// click on nested-header class (sub sub menu) for I can't 
		$('.no-submenu-c').on('click', function() {


			//check if clicked element has a no-submenu class 
			if ($(this).hasClass('nested-submenu')) {

				const sub_header = $(this).text();
				const header = $(this).parent().siblings().text();

				const editorData = \`\nI can't \${header} \${sub_header}\`
				//Get editor for chief compliants
				const editor = $("#cc-editor")

				//get data from editor
				const prev_data = editor.val();

				//add data to editor 
				editor.val(prev_data + editorData);
			} else {
				const header = $(this).text();

				const editorData = \`\nI can't \${header}\`
				//Get editor for chief compliants
				const editor = $("#cc-editor")

				//get data from editor
				const prev_data = editor.val();

				//add data to editor 
				editor.val(prev_data + editorData);

			}
		})



		//Labs + imaging - view all on click 
		$('#labsViewAll_btn').on('click', function() {

			//clear table
			$('#labViewAll_table').empty();


			//check labs array
			if (array_labs != 0) {
				//Loop through labs array 
				$.each(array_labs, function(key, value) {

					$('#labViewAll_table').append(\`
					<tr>
					<td>\${value.investigation.name}</td>
					<td>\${value.specimen_no}</td>
					<td>\${value.status.name}</td>
					<td>\${value.description}</td>
					<td>\${value.comment}</td>
					<td>\${moment(new Date(value.date_created)).format("MMM, DD YYYY HH:mm")}</td>
					</tr>\`)

				})
			}



		})


		//vitals - view all btn on click
		$('#vitalsViewAll_btn').on('click', function() {

			//clear table
			$('#vitalViewAll_table').empty();

			//check vitals array 
			if (array_vitals != 0) {

				//loop through vitals array 
				$.each(array_vitals, function(key, value) {
					$('#vitalViewAll_table').append(\`
					<tr>
					<td><span class="label label-primary">\${value.blood_pressure_1} / \${value.blood_pressure_2}</span></td>
					<td>\${value.heart_rate}</td>
					<td>\${value.pulse}</td>
					<td>\${value.oxygen_saturation}</td>
					<td>\${value.temperature}</td>
					<td>\${value.respiratory_rate}</td>
					<td>\${value.height}</td>
					<td>\${value.weight}</td>
					<td>\${value.trauma}</td>
					<td>\${value.trauma}</td>
					<td>\${moment(new Date(value.date_created)).format("MMM, DD YYYY HH:mm")}</td>
					</tr>
					\`)
				})

			}

		})


		//precriptions - view all btn on click 
		$('#medicationsViewAll_btn').on('click', function() {
			//clear table 
			$('#medicationViewAll_table').empty();

			//check medication array 
			if (array_prescriptions != 0) {
				//Loop through medication array 
				$.each(array_prescriptions, function(key, value) {
					$('#medicationViewAll_table').append(\`<tr>
					<td>\${value.drug_stock.drug.name}</td>
					<td>\${value.drug_stock.drug.dosage}</td>
					<td>\${value.drug_stock.drug.item_form}</td>
					<td>\${value.frequency}</td>
					<td>\${value.number_of_days}</td>
					<td>\${value.quantity}</td>
					<td>\${value.status.name}</td>
					<td>\${moment(new Date(value.date_created)).format("MMM, DD YYYY HH:mm")}</td>
					</tr>\`)
				})
			}

		})
	})
</script>



<script>
	function health_concern(info) {
		return \`
			<div class="container mt-5">
				<div class="row">
					<div class="col-md-6">
						<!-- Name Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">Name</h5>
							<p>\${info.name}</p>
						</div>

						<!-- Location Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">Location</h5>
							<p>\${info.location}</p>
						</div>

						<!-- Radiate Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">Radiate</h5>
							<p>\${info.radiate}</p>
						</div>

						<!-- What Better Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">What Makes It Better?</h5>
							<p>\${info.what_better}</p>
						</div>

						<!-- What Worse Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">What Makes It Worse?</h5>
							<p>\${info.what_worse}</p>
						</div>
					</div>

					<div class="col-md-6">
						<!-- Time of Day Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">Time of Day</h5>
							<p>\${info.time_of_day}</p>
						</div>

						<!-- Cause Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">Cause</h5>
							<p>\${info.cause}</p>
						</div>

						<!-- Comment Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">Comment</h5>
							<p>\${info.comment}</p>
						</div>

						<!-- When Section -->
						<div class="p-3 mb-4 shadow-sm">
							<h5 class="font-weight-bold">When</h5>
							<p>\${new Date(info.when_val).toDateString()}</p>
						</div>
					</div>
				</div>
			</div>
		\`
	}
	function biostructural_examinfo(info) {
		return \`
			<div class="borderBox-title tabbable-line col-md-12 mr-4" id="">
				<div class="form-body row flex-column col-md-12" id="bioexam_formbody">

					<div class="form-group row">
						<label class="control-label col-md-2 font-weight-bold">KILOS:
						</label>
						<label class="control-label col-md-1">LT:
						</label>
						<div class="col-md-2">
							\${info.kilos_lt}
						</div>
						<label class="control-label col-md-1">RT:
						</label>
						<div class="col-md-2">
							\${info.kilos_rt}
						</div>
						<label class="control-label col-md-1">=
						</label>
						<div class="col-md-3">
							\${info.kilos_eq}
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-2 font-weight-bold">SHT LEG (Sacral horizontal translation of the leg):
						</label>
						<label class="control-label col-md-1">LT:
						</label>
						<div class="col-md-2">
							\${info.sht_lt}
						</div>
						<label class="control-label col-md-1">RT:
						</label>
						<div class="col-md-2">
							\${info.sht_rt}
						</div>
					</div>
					<div class="form-group row justify-content-center mt-1">
						<h5 class="control-label font-weight-bold">L/S ROM (Lumbar Spine Range of Motion)
						</h5>
					</div>
					
					<div class="form-group row">
						<label class="control-label col-md-2">FLEX:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.lsrom_flex}
						</div>
						<label class="control-label col-md-2">EXT:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.lsrom_ext}
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-2">LT FLEX:
						</label>
						<label class="control-label col-md-1">P!
						</label>
						<div class="col-md-3">
							\${info.lsrom_lt_flex}
						</div>
						<label class="control-label col-md-2">RT FLEX:
						</label>
						<label class="control-label col-md-1">P!
						</label>
						<div class="col-md-3">
							\${info.lsrom_rt_flex}
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-2">LT ROT:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.lsrom_lt_rot}
						</div>
						<label class="control-label col-md-2">RT ROT:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.lsrom_rt_rot}
						</div>
					</div>

					<div class="form-group row justify-content-center mt-3">
						<h5 class="control-label font-weight-bold">MEASURE OF MOBILITY
						</h5>
					</div>

					<div class="form-group row">
						<label class="control-label col-md-3">L/S MM:
						</label>
						<div class="col-md-9">
							\${info.ls_mm}
						</div>
						<label class="control-label col-md-3">T/S MM:
						</label>
						<div class="col-md-9">
							\${info.ts_mm}
						</div>
						<label class="control-label col-md-3">C/S MM:
						</label>
						<div class="col-md-9">
							\${info.cs_mm}
						</div>
					</div>

					<div class="form-group row justify-content-center">
						<h5 class="control-label font-weight-bold">HIGH SHOULDER:
						</h5>
					</div>

					<div class="form-group row">
						<label class="control-label col-md-3">LT:
						</label>
						<div class="col-md-9">
							\${info.high_shoulder_lt}
						</div>
						<label class="control-label col-md-3">RT:
						</label>
						<div class="col-md-9">
							\${info.high_shoulder_rt}
						</div>
						<label class="control-label col-md-3">HT:
						</label>
						<div class="col-md-9">
							\${info.high_shoulder_ht}
						</div>
					</div>
					<div class="form-group row justify-content-center">
						<h5 class="control-label col-md-5 font-weight-bold">C/S ROM (Cervical Spine Range of Motion)
						</h5>
					</div>
					
					<div class="form-group row">
						<label class="control-label col-md-2">FLEX:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.csrom_flex}
						</div>
						<label class="control-label col-md-2">EXT:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.csrom_ext}
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-2">LT FLEX:
						</label>
						<label class="control-label col-md-1">P!
						</label>
						<div class="col-md-3">
							\${info.csrom_lt_flex}
						</div>
						<label class="control-label col-md-2">RT FLEX:
						</label>
						<label class="control-label col-md-1">P!
						</label>
						<div class="col-md-3">
							\${info.csrom_rt_flex}
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-2">LT ROT:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.csrom_lt_rot}
						</div>
						<label class="control-label col-md-2">RT ROT:
						</label>
						<label class="control-label col-md-1">P!:
						</label>
						<div class="col-md-3">
							\${info.csrom_rt_rot}
						</div>
					</div>

					<div class="form-group row justify-content-center">
						<h5 class="control-label font-weight-bold">PELVIC MECHANICS
						</h5>
					</div>

					<div class="form-group row">
						<label class="control-label col-md-3">PELVIC SHIFT
						</label>
						<div class="col-md-9">
							\${info.pelvic_shift}
						</div>
						<label class="control-label col-md-3">PELVIC ROTATION
						</label>
						<div class="col-md-9">
							\${info.pelvic_rotation}
						</div>
					</div>

					<div class="form-group row justify-content-center mt-3">
						<h5 class="control-label font-weight-bold">THORACIC MECHANICS
						</h5>
					</div>

					<div class="form-group row">
						<label class="control-label col-md-3">THORACIC SHIFT
						</label>
						<div class="col-md-9">
							\${info.thoracic_shift}
						</div>
						<label class="control-label col-md-3">THORACIC FLEXION
						</label>
						<div class="col-md-9">
							\${info.thoracic_flexion}
						</div>
						<label class="control-label col-md-3">THORACIC ROTATION
						</label>
						<div class="col-md-9">
							\${info.thoracic_rotation}
						</div>
					</div>

					<div class="form-group row justify-content-center mt-3">
						<h5 class="control-label font-weight-bold">PELVIS MECHANICS
						</h5>
					</div>

					<div class="form-group row">
						<label class="control-label col-md-3">CENTER OF SACRUM
						</label>
						<div class="col-md-9">
							\${info.center_sacrum}
						</div>
						<label class="control-label col-md-3">CENTER OF FEMORAL HEAD
						</label>
						<div class="col-md-9">
							\${info.center_femoral_head}
						</div>
						<label class="control-label col-md-3">CENTER OF ROTATION
						</label>
						<div class="col-md-9">
							\${info.center_rotation}
						</div>
					</div>
					<div class="form-group row mt-3">
						<label class="control-label col-md-3 font-weight-bold">FEMORAL HEAD TRANSLATION FHT
						</label>
						<div class="col-md-9">
							\${info.femoral_head_translation}
						</div>
					</div>

				</div>
			</div>
		\`
	}

	function loadHealthConcernImage(image) {
		// Get the container where the image will be displayed
		var imageContainer = document.getElementById('painLocationImage');
		
		// Clear the container (if image already exists)
		imageContainer.innerHTML = "";

		// Create a new img element
		var img = document.createElement('img');

		// Set the image source (loading from the internet)
		img.src = image; // You can replace this URL with any valid image URL

		// Set alt text for accessibility
		img.alt = 'Loaded Image';

		// Append the image to the container
		imageContainer.appendChild(img);
	}
	function updateReviews(str, elementId) {
		if (str == "") {
			return;
		}

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

				// Sanitize all the json encodings make it a bare string : and ,
				var myresult = xhttp.responseText.replace(/"/gi, '');
				myresult = myresult.replace(/{/gi, '');
				myresult = myresult.replace(/}/gi, '');
				myresult = myresult.replace('[', '');
				myresult = myresult.replace(']', '');
				var mydata = myresult.split(',');

				var inneroptions = "<option>--Select--</option>";
				for (var region in mydata) {
					if (mydata.hasOwnProperty(region)) {
						var current = mydata[region].split(':');
						inneroptions = inneroptions + "<option value='" + current[0] + "'>" + current[1] + "</option>";
					}
				}

				document.getElementById(elementId).innerHTML = inneroptions;
			}
		}

		xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'PatientVisitSystemReviews', 'action' => 'updateReviews']) -->/" + str, true);
		xhttp.send();
	}
</script>

<script>

	function clinicalEncounterTab() {
		//single ajax call for all cards 
		// get data for encounter notes cards
		//error here need to look at it 
		// $.ajax({
		// 	type: "GET",
		// 	url: "</?= $this->Url->build(['controller' => 'patientVisits', 'action' => 'setPatientEncounterNotes', $patient_id, $patient_visit_id]) ?>"
		// }).done((data) => {
		// 	logs
		// 	console.log('set Patient encounter successful');
		// 	console.log(data);

		// 	//pass prescription data 
		// 	passPrescriptionData(jQuery.parseJSON(data).prescriptions);

		// 	console.log('infusion data @ ajax')
		// 	console.log(jQuery.parseJSON(data).infusions);
		// 	//pass infusion data 
		// 	passInfusionData(jQuery.parseJSON(data).infusions);

		// 	//pass patient illness 
		// 	passMedicalHistoryData(jQuery.parseJSON(data).past_illness);

		// 	//populate surgeries select 
		// 	populateSurgerySelect(jQuery.parseJSON(data).surgeries);

		// 	//pass patient surgeries
		// 	passSurgeryHistory(jQuery.parseJSON(data).past_surgeries);

		// 	//pass patient family history 
		// 	passFamilyHistory(jQuery.parseJSON(data).family_history);

		// 	//pass patient social history
		// 	passSocialHistory(jQuery.parseJSON(data).social_history);

		// 	//pass patient request labs 
		// 	passRequestLabs(jQuery.parseJSON(data).request_labs);

		// 	//pass patient vitals 
		// 	passVitals(jQuery.parseJSON(data).vitals);

		// 	//pass patient comorbidities
		// 	passComorbidity(jQuery.parseJSON(data).comorbidity);

		// }).fail((data) => {
		// 	//logs
		// 	console.log('set Patient encounter fail');
		// 	console.log(data)
		// })

		//getting latest clinical encounter notes saved
		getLatestEncounter()

		//getting ODQ categories and respective ODQs
		$.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getOdqsWithCategories' ] ); -->",
			cache: false,
			success: function (response){
				var res = JSON.parse(response);   
				var odq_severities = JSON.stringify(res.odq_severities);
				var odq_durations = JSON.stringify(res.odq_durations);
				var gender = '<!-- php: echo $patient->gender_id -->';
				let counterMe = 0
				$(".odq-categories").html('')

				for(var i in res.odq_categories){
					if (!['10', '11', '7'].includes(res.odq_categories[i].id)) {
						continue;
					}
					tab_id = '#' + res.odq_categories[i].id + 'tab';
					tab_content_id = res.odq_categories[i].id + 'tab';
					odq_category = res.odq_categories[i].name;
					odq_category_id = res.odq_categories[i].id;
					odq_category_class = 'nav-item' + res.odq_categories[i].id;
					odq_card_body_class = 'odq-card-body' + res.odq_categories[i].id;
					
					// adding a condition to exclude the category based on gender and category ID
					// if (!(gender == 1 && odq_category_id == 10)) {
						// Checking if tab categories have been appended
						if(!$(".odq-categories").find('.' + odq_category_class).length) {
							$(".odq-categories").append("<li class='nav-item" + (counterMe == 0 ? "active show": "") +odq_category_class+"'><a href='"+tab_id+"' class='nav-link' data-toggle='tab'> "+odq_category+" </a></li>");
						}
					// }
					
					// populating the tab content
					tab_content = "<div class='tab-pane active show'"+(counterMe == 0 ? "active show": "")+" id='"+tab_content_id+"'><div class='card-body "+odq_card_body_class+"'></div></div>";
					$(".odq-tab-content").append(tab_content);
					odqs = res.odq_categories[i].odqs.sort((a,b) => parseInt(a.id) - parseInt(b.id));
					$("."+odq_card_body_class).empty();
					
					for(var j in odqs){
						if (odq_category_id == '10' && odqs[j].id == '84') {
							$("."+odq_card_body_class).append('<div style="font-weight: bold">Joint Noises (Crepitus)</div>');
						} else if(odq_category_id == '10' && odqs[j].id == '88') {
							$("."+odq_card_body_class).append('<div style="font-weight: bold" >Joint Stiffness</div>');
						} else if(odq_category_id == '10' && odqs[j].id == '96') {
							$("."+odq_card_body_class).append('<div style="font-weight: bold" >Difficulty Moving (does patient have difficulty moving all or part of the body?)</div>');
						}
						if(odq_category_id == '11' && odqs[j].id == '109') {
							$("."+odq_card_body_class).append('<div style="font-weight: bold" >Single Joint (monoarticular joint pain)</div>');
						} else if(odq_category_id == '11' && odqs[j].id == '124') {
							$("."+odq_card_body_class).append('<div style="font-weight: bold" >Many Joints (polyarticular joint pain)</div>');
						}
						if(res.odq_categories[i].id == odqs[j].odq_category_id){
							// population of odqs based on respective categories
							comment_span_id = 'span' + odqs[j].id;
							raw_comment_span_id = 'span' + odqs[j].id;
							comment_span_id = JSON.stringify(comment_span_id);
							tab_content_fields = "<div class='form-check form-switch'><input class='form-check-input' type='checkbox' id='flexSwitchCheckDefault' value='"+odqs[j].id+"' name='odq_value_"+odqs[j].id+"' onchange='commentsFieldDisplay(this,"+comment_span_id+","+odq_severities+","+odq_durations+", "+odqs[j].id+")'><label class='form-check-label' for='flexSwitchCheckDefault'>"+odqs[j].name+"</label><span class='ml-3' id='"+raw_comment_span_id+"'></span></div>";
							$("."+odq_card_body_class).append(tab_content_fields);
						}
					}

					counterMe+=1
				}
				// Triggering a click for the first ODQ category
				$(".nav-item1").find('a').click();
			}
		});


		// $("#reviewCollapse").html(generateSystemReviewBody(null,''))

		//getting allergy categories
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyCategories' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				//call populate allergy categories function
				populateAllergyCategories(res, 'allergy-category-div')
				global_allergy_category_obj = {
					data : res
				}
            }
        });

		//getting allergy severity levels
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergySeverities' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				for (var i in res){
					allergy_severity_class = 'class_'+res[i].id;
					if(!$("#allergy-severity-div").find('.' + allergy_severity_class).length){
						$("#allergy-severity-div").append("<div class='form-check form-check-inline "+allergy_severity_class+"'><input class='form-check-input' value='"+res[i].id+"' type='radio' name='allergy_severity_id' id='allergy_severity_"+res[i].id+"'><label class='form-check-label' for='allergy_severity_"+res[i].id+"'>"+res[i].name+"</label></div>")
					}	
				}
            }
        });

		//getting allergy reactions 
		$.ajax({
			type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyReactions' ] ); -->",
			cache: false,
			success: function (response){
				var res = JSON.parse(response);	
				//call populate allergy reactions function
				populateAllergyReactions(res)
				global_allergy_reactions_obj = {
					data : res
				}
            }
		})

		//getting allergy reaction types 
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyReactionTypes' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				for (var i in res){
					allergy_reaction_type_class = 'class_'+res[i].id;
					if(!$("#allergy-reaction-type-div").find('.' + allergy_reaction_type_class).length){
						$("#allergy-reaction-type-div").append("<div class='form-check form-check-inline "+allergy_reaction_type_class+"'><input class='form-check-input'" + \`\${res[i].id == 1 ? 'checked="checked"' : ''}\` + "value='"+res[i].id+"' type='radio' name='allergy_reaction_type_id' id='allergy_reaction_type_"+res[i].id+"'><label class='form-check-label' for='allergy_reaction_type_"+res[i].id+"'><span class='badge rounded-pill' style='background-color: "+res[i].color_code+"'>"+res[i].name+"</span></label></div>")
					}	
				}
            }
        });

		//getting allergy pharmachological management 
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyPharamacologicalManagement' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				for (var i in res){
					allergy_pharma_mgt_class = 'class_'+res[i].id;
					if(!$("#allergy-pharmacological-management-div").find('.' + allergy_pharma_mgt_class).length){
						$("#allergy-pharmacological-management-div").append("<div class='form-check form-check-inline "+allergy_pharma_mgt_class+"'><input class='form-check-input' value='"+res[i].id+"' type='radio' name='allergy_pharma_mgt_id' id='allergy_pharma_mgt_"+res[i].id+"'><label class='form-check-label' for='allergy_pharma_mgt_"+res[i].id+"'>"+res[i].name+"</label></div>")
					}	
				}
            }
        });

		//getting comorbidities(past illnesses)
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getPastIllnesses' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				$('#comorbidity_id').empty()
				$.each(res, function(key, value) {
					$('#comorbidity_id').append($('<option data-name="'+res[key].name+'" value="'+res[key].id+'"></option>').val(res[key].id).html(res[key].name));  
				});	
				$("#comorbidity_id").selectpicker("refresh");
            }
        });
	}

	//function to get latest encounter
	function getLatestEncounter()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLatestPatientVisitEncounterNote' ] ); -->",
			data: {
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (response){
				
				var result = JSON.parse(response);	
				if (result.health_concern) {
					$('#healthconcern_info').html(health_concern(result.health_concern))
					let img_url = window.location.origin + '/img/' + result.health_concern?.file_path
					console.log(img_url)
					loadHealthConcernImage(img_url)
				}
				if (result.bioexam) {
					$('#biostructural_exam_info').html(biostructural_examinfo(result.bioexam))
				}
				let res = result.encounter
				if(res){
					populateComplaints(res.cc)
					populateOdqs(res.patient_visit_clinical_encounter_note_odqs)
					populateComorbidities(res.past_illnes_hx)
					// populateAllergies(res.patient_visit_clinical_encounter_note_allergies, res.patient_visit_clinical_encounter_note_allergy_reactions)
					populateAllergies()
					populateMedicationHistory(res.past_medication_hx)
					// populateSocialHistory(res.patient_visit_clinical_encounter_note_social_history)
					// populateFamilyHistory(res.patient_visit_clinical_encounter_note_family_history)
					populateHospitalizationHistory(result.visits)

					// populateGynaecologicalHistory(result.visits)
					// populateObstetricHistory(result.visits)

					// populateGynaPregObsHistory(
					// 	res.patient_visit_clinical_encounter_note_pregnancy_history,
					// 	res.patient_visit_clinical_encounter_note_gynaecological_history,
					// 	res.patient_visit_clinical_encounter_note_obstetric_history,
					// )

					populateSystemReview(
						{
							patient_visit_clinical_encounter_note_review_general: res.patient_visit_clinical_encounter_note_review_general,
							patient_visit_clinical_encounter_note_review_eye: res.patient_visit_clinical_encounter_note_review_eye,
							patient_visit_clinical_encounter_note_review_nose: res.patient_visit_clinical_encounter_note_review_nose,
							patient_visit_clinical_encounter_note_review_mouth: res.patient_visit_clinical_encounter_note_review_mouth,
							patient_visit_clinical_encounter_note_review_neck: res.patient_visit_clinical_encounter_note_review_neck,
							patient_visit_clinical_encounter_note_review_groin: res.patient_visit_clinical_encounter_note_review_groin,
							patient_visit_clinical_encounter_note_review_hand: res.patient_visit_clinical_encounter_note_review_hand,
							patient_visit_clinical_encounter_note_review_breast: res.patient_visit_clinical_encounter_note_review_breast,
							patient_visit_clinical_encounter_note_review_cardio: res.patient_visit_clinical_encounter_note_review_cardio,
							patient_visit_clinical_encounter_note_review_respiratory: res.patient_visit_clinical_encounter_note_review_respiratory,
							patient_visit_clinical_encounter_note_review_abdomen: res.patient_visit_clinical_encounter_note_review_abdomen,
							patient_visit_clinical_encounter_note_review_extremity: res.patient_visit_clinical_encounter_note_review_extremity,
							patient_visit_clinical_encounter_note_review_neurological: res.patient_visit_clinical_encounter_note_review_neurological,
							patient_visit_clinical_encounter_note_review_obstetric_pelvic: res.patient_visit_clinical_encounter_note_review_obstetric_pelvic,
							patient_visit_clinical_encounter_note_review_obstetric_abdomen: res.patient_visit_clinical_encounter_note_review_obstetric_abdomen,
							patient_visit_clinical_encounter_note_review_gynaecologic: res.patient_visit_clinical_encounter_note_review_gynaecologic,
							patient_visit_clinical_encounter_note_review_muscoloskeletal: res.patient_visit_clinical_encounter_note_review_muscoloskeletal,
						}
					)
					populateImmuHistory(res.immu_hx)
					populateLatestVitals()
					// populatePrescription()
					// populateDiagnoses()
					populateSurgeries(res.past_surgery_hx)
					populateRelevantHistory()
					populateReproductiveHistory()
					//creating a data object to pass into edit modal functions
					var data_object = {
						encounter_id : res.id,
						medication_hx : res.patient_visit_clinical_encounter_note_past_medication,
						socila_hx : res.patient_visit_clinical_encounter_note_social_history,
						family_hx : res.patient_visit_clinical_encounter_note_family_history,
						cc : res.cc,
						allergies : res.patient_visit_clinical_encounter_note_allergies,
						comorbidity : res.past_illnes_hx,
						odqs : res.patient_visit_clinical_encounter_note_odqs,
						social : res.patient_visit_clinical_encounter_note_social_history,
						family : res.patient_visit_clinical_encounter_note_family_history,	
						allergy_reactions : res.patient_visit_clinical_encounter_note_allergy_reactions,
						system_review : {
							general: res.patient_visit_clinical_encounter_note_review_general,
							eye: res.patient_visit_clinical_encounter_note_review_eye,
							nose: res.patient_visit_clinical_encounter_note_review_nose,
							mouth: res.patient_visit_clinical_encounter_note_review_mouth,
							neck: res.patient_visit_clinical_encounter_note_review_neck,
							groin: res.patient_visit_clinical_encounter_note_review_groin,
							hand: res.patient_visit_clinical_encounter_note_review_hand,
							breast: res.patient_visit_clinical_encounter_note_review_breast,
							cardio: res.patient_visit_clinical_encounter_note_review_cardio,
							respiratory: res.patient_visit_clinical_encounter_note_review_respiratory,
							abdomen: res.patient_visit_clinical_encounter_note_review_abdomen,
							extremity: res.patient_visit_clinical_encounter_note_review_extremity,
							neurological: res.patient_visit_clinical_encounter_note_review_neurological,
							obsteric_pelvis: res.patient_visit_clinical_encounter_note_review_obstetric_pelvic,
							obsteric_abdomen: res.patient_visit_clinical_encounter_note_review_obstetric_abdomen,
							gynaecological: res.patient_visit_clinical_encounter_note_review_gynaecologic,
							muscoloskeletal: res.patient_visit_clinical_encounter_note_review_muscoloskeletal,
						},
					}
					passHistoryData(data_object)
				}
				populatePrescription()
				populateLabsAndRadiology()
				populateDiagnoses()
				consultToReferral()

            }
        });
	}

	//function to populate allergy categories
	function populateAllergyCategories(res, div_name)
	{
		for (var i in res){
			allergy_category_class = 'class_'+res[i].id;
			if(!$("#"+div_name).find('.' + allergy_category_class).length){
				$("#"+div_name).append("<div class='form-check form-check-inline "+allergy_category_class+"'><input class='form-check-input' value='"+res[i].id+"' type='radio' name='allergy_category_id' id='allergy_category_"+res[i].id+"' onchange='passAllergicCategory(this)'><label class='form-check-label' for='allergy_category_"+res[i].id+"'><span class='badge rounded-pill'>"+res[i].name+"</span></label></div>")
			}	
		}
	}

	//function to populate allergy reactions
	function populateAllergyReactions(res)
	{
		$('#encounter_allergy_reaction_id').empty()
		$.each(res, function(key, value) {
			$('#encounter_allergy_reaction_id').append($('<option data-name="'+res[key].name+'"></option>').val(res[key].id).html(res[key].name));  
			$("#encounter_allergy_reaction_id").selectpicker("refresh");
		});	
	}

	//function to populate cc recorded
	function populateComplaints(cc)
	{
		if(cc){
			$(".cc-small-card").html("<span>"+ cc +"</span>")
		}else{
			$(".cc-small-card").html("<span class='bold'>None</span>")
		}
	}

	//function to populate odqs
	function populateOdqs(odqs)
	{
		if(odqs){
			$(".odqs-small-card").html("<span><ul class='odq-list-class'></ul></span>")
			for(var i in odqs){
				odq_severity = "<span class='badge rounded-pill' style='background-color: "+odqs[i].odq_severity.color_code+"'>"+odqs[i].odq_severity.severity+"</span>"
				odq_duration = "<span class='badge rounded-pill'>"+odqs[i].odq_duration.duration+"</span>"
				$(".odq-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+odqs[i].odq_comment+"'>"+ odqs[i].odq.name+ " is " + odq_severity + " for the past " + odq_duration + "</li>")
			}
		}else{
			$(".odqs-small-card").html("<span class='bold'>None</span>")
		}
	}

	//populating comorbiditis
	function populateComorbidities(comorbidities)
	{
		// if(comorbidities){
		// 	$(".comorbidities-small-card").html("<span><ul class='comorbidities-list-class'></ul></span>")
		// 		period = "<span class='badge rounded-pill' style='background-color: brown'>"+comorbidities.illness_period+"</span>"
		// 		if(comorbidities?.comorbidity?.name) {
		// 			$(".comorbidities-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+comorbidities.comment+"'>"  + \`\${comorbidities?.comorbidity?.name || ''}\` +":" + comorbidities.description + " " + period + "</li>")
		// 		}
		// }else{
		// 	$(".comorbidities-small-card").html("<span class='bold'>None</span>")
		// }

		if(comorbidities){
			$(".comorbidities-small-card").html("<span>"+ comorbidities +"</span>")
		}else{
			$(".comorbidities-small-card").html("<span class='bold'>None</span>")
		}
	}

	//populating allergy and allergy reactions
	// function populateAllergies(allergies, allergy_reactions)
	// {
	// 	if(allergies){
	// 		$(".allergy-small-card").html("<span><ul class='allergy-list-class'></ul></span>")
	// 		for (var i in allergies){
	// 			$(".allergy-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+allergies[i].encounter_allergy.description+"'><span class='bold badge rounded-pill badge-warning mr-2'>"+ allergies[i].encounter_allergy.name +"</span></li>")
	// 		}
	// 	}else{
	// 		$(".allergy-small-card").html("<span class='bold'>None</span>")
	// 	}
		
	// 	if(allergy_reactions){
	// 		$(".allergy-reactions-small-card").html("<span><ul class='allergy-reactions-list-class'></ul></span>")
	// 		for(var i in allergy_reactions){
	// 			$(".allergy-reactions-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+allergy_reactions[i].encounter_allergy_reaction.name+"'>"+ allergy_reactions[i].encounter_allergy_reaction.name + "</li>")
	// 		}
	// 	}else{
	// 		$(".allergy-reactions-small-card").html("<span class='bold'>None</span>")
	// 	}
	// }

		//populating allergy and allergy reactions
	function populateAllergies()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientAllergies', $patient->id ] ); -->",
			data: {
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (response){
				$(".allergy-small-card").html("<span><ul class='allergy-list-class'></ul></span>")
				$(".allergy-reactions-small-card").html("<span><ul class='allergy-reactions-list-class'></ul></span>")
				
				response.encounters.forEach(ele => {
					let allergies = ele.patient_visit_clinical_encounter_note_allergies
					let allergy_reactions = ele.patient_visit_clinical_encounter_note_allergy_reactions
					if(allergies){
						for (var i in allergies){
							$(".allergy-list-class").append("<span class='bold badge rounded-pill badge-warning mr-2'>"+ allergies[i].encounter_allergy?.name +"</span>")
						}
					}
					
					if(allergy_reactions){
						for(var i in allergy_reactions){
							$(".allergy-reactions-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+allergy_reactions[i].encounter_allergy_reaction.name+"'>"+ allergy_reactions[i].encounter_allergy_reaction.name + "</li>")
						}
					}
				});
			}
		})
	}

	//populating medical history -sadat
	// function populateMedicationHistory(medication_history)
	// {
	// 	if(medication_history){
	// 		$(".pmhx-small-card").html("<span><ul class='pmhx-list-class'></ul></span>")

	// 		curr_medi = medication_history.current_medication ? "<li class='mb-1'>" +medication_history.current_medication+ " <span class='badge rounded-pill' style='background-color: grey'>Current</span></li>" : ''
	// 		past_medi = medication_history.past_medication ? "<li class='mb-1'>" +medication_history.past_medication+ " <span class='badge rounded-pill' style='background-color: grey'>Past</span></li>" : ''
	// 		herbal = medication_history.herbal_medication ? "<li class='mb-1'>" +medication_history.herbal_medication+ " <span class='badge rounded-pill' style='background-color: grey'>Herbal</span></li>" : ''
	// 		if ((curr_medi + past_medi + herbal) != '') {
	// 			$(".pmhx-list-class").append(
	// 				curr_medi + past_medi + herbal
	// 			)
	// 		} else {
	// 			$(".pmhx-list-class").html(
	// 				"none"
	// 			)
	// 		}
	// 	}else{
	// 		$(".pmhx-small-card").html("<span class='bold'>None</span>")
	// 	}
	// }
	function populateMedicationHistory(medication_history)
	{
		if(medication_history){
			$(".pmhx-small-card").html("<span><ul class='pmhx-list-class'></ul></span>")
				$(".pmhx-list-class").append(
					"<li class='mb-1'>"+ medication_history +"</li>" 
				)
		}else{
			$(".pmhx-small-card").html("<span class=''>None</span>")
		}
	}

	function populateGynaPregObsHistory(preg_history, gyna_history, obs_history) {
		if(preg_history){
			$(".preg-small-card").html("<span><ul class='preg-list-class'></ul></span>")

			$(".preg-list-class").append(\`
				<li class="bold">no. \${preg_history.pregnancy_number} </li>
				<li>
					<span class="badge badge-primary">\${moment(preg_history?.date_conceived).format("DD-MM-YYYY")}</span>
					\${preg_history?.mode_of_delivery} \${preg_history?.outcome}
				</li>
			\`)
		}
		if(gyna_history){
			$(".gyna-small-card").html("<span><ul class='gyna-list-class'></ul></span>")
			$(".gyna-list-class").append(\`
				<li>LMP:<span class="badge badge-primary"> \${moment(gyna_history?.date_of_last_menstrual_period).format("DD-MM-YYYY")}</span> </li>
				<li>Cycle Length:<span class="bold"> \${gyna_history?.cycle_length}</span> </li>
				<li>Intermenstrual Bleeding:<span class="bold"> \${gyna_history?.intermenstrual_bleeding}</span> </li>
				<li>Dysmenorrhea:<span class="bold"> \${gyna_history?.dysmenorrhoea}</span> </li>
				<li>Post Coital Bleeding:<span class="bold"> \${gyna_history?.post_coital_bleeding}</span> </li>
				<li>Dyspareunia:<span class="bold"> \${gyna_history?.dyspareunia}</span> </li>
				<li>Cervical Cancel Screening:<span class="bold"> \${gyna_history?.cervical_cancer_screening}</span> </li>
				<li>Breast Screening:<span class="bold"> \${gyna_history?.breast_screening}</span> </li>
				<li>Previous Gynaecologic Procedures:<span class="bold"> \${gyna_history?.previous_gynaecologic_procedures}</span> </li>
			\`)
		}
		if(obs_history){
			$(".obs-small-card").html("<span><ul class='obs-list-class'></ul></span>")
			$(".obs-list-class").append(\`
				<li>
					Parity:<span class="bold"> \${obs_history?.no_of_pregnancies}(\${obs_history?.no_of_births}) + \${(parseInt(obs_history?.no_of_abortions_spontaneous) + parseInt(obs_history?.no_of_abortions_induced))}</span>
				</li>
			\`)
		}
	}
	function populateRelevantHistory() {
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientHistoryCard', $patient->id ] ); -->",
			data: {
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (data){
				let con_history = data.con_history;
				let social_history = data.social_history;
				let family_history = data.family_history;
				let medical_history = data.medical_history;

				$("#medi-history-card-action-span").html("<a onclick='historyEditModal("+JSON.stringify(medical_history)+")'> <i class='fa fa-edit fa-lg'></i></a>")
				$("#social-action-span").html("<a onclick='socialEditModal("+JSON.stringify(social_history)+")'> <i class='fa fa-edit fa-lg'></i></a>")
				$("#family-action-span").html("<a onclick='familyEditModal("+JSON.stringify(family_history)+")'> <i class='fa fa-edit fa-lg'></i></a>")
				$("#contraception-action-span").html("<a onclick='contraceptionEditModal("+JSON.stringify(con_history)+")'> <i class='fa fa-edit fa-lg'></i></a>")
				// populateMedicationHistory(medical_history)
				populateSocialHistory(social_history)
				populateFamilyHistory(family_history)
				populateContraceptionHistory(con_history)

			}
		})
	}

	function populateReproductiveHistory() {
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientReproductiveCard', $patient->id ] ); -->",
			data: {
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (data){
				let preg_history = data.preg_history;
				let gyna_history = data.gyna_history;
				let obs_history = data.obs_history;


				$("#preg-history-card-action-span").html("<a onclick='pregnancyEditModal("+JSON.stringify(preg_history)+")'> <i class='fa fa-edit fa-lg'></i></a>")
				$("#gyane-history-card-action-span").html("<a onclick='gynaecologyEditModal("+JSON.stringify(gyna_history)+")'> <i class='fa fa-edit fa-lg'></i></a>")
				$("#obstetric-history-card-action-span").html("<a onclick='obstetricEditModal("+JSON.stringify(obs_history)+")'> <i class='fa fa-edit fa-lg'></i></a>")

				populateGynaPregObsHistory(preg_history, gyna_history, obs_history)


			}
		})
	}

	//populating social history
	function populateSocialHistory(social_history)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(social_history){
			$(".pshx-small-card").html("<span><ul class='pshx-list-class'></ul></span>")
				$(".pshx-list-class").append(
					"<li class='mb-1'>Alcohol Intake: <span class='badge rounded-pill' style='background-color: grey'>"+ social_history?.alchohol_intake +"</span> "+ social_history?.alcohol_details +"</li>" 
					+"<li class='mb-1'>Tobacco Intake:  <span class='badge rounded-pill' style='background-color: grey'>"+ social_history?.tobacco_intake +"</span> "+ social_history?.tobacco_details +"</li>"
				)
		}else{
			$(".pshx-small-card").html("<span class='bold'>None</span>")
		}

	}

	//populating family history
	function populateFamilyHistory(family_history)
	{
		if(family_history){
			$(".fhx-small-card").html("<span><ul class='fhx-list-class'></ul></span>")
				$(".fhx-list-class").append(
					\`
						<li class='mb-1'>Mother is <span class='bold'> \${family_history.mother_status || 'n/a'} </span> and at age <b> \${family_history.mother_age || 'n/a'} </b> with <b> \${family_history.mother_condition || 'no'} </b> condition</li>
						<li class='mb-1'>Father is <span class='bold'> \${family_history.father_status || 'n/a'} </span> and at age <b> \${family_history.father_age || 'n/a'} </b> with <b> \${family_history.father_condition || 'no'} </b> condition</li>
						<li class='mb-1'>Spouse is <span class='bold'> \${family_history.spouse_status || 'n/a'} </span> and at age <b> \${family_history.spouse_age || 'n/a'} </b> with <b> \${family_history.spouse_condition || 'no'} </b> condition</li>
						<li class='mb-1'>Patient has <span class='bold'> \${family_history.number_of_children || 0} children </span> with <b> \${family_history.children_condition || 'no'} </b> condition</li>
					\`
				)
		}else{
			$(".fhx-small-card").html("<span class='bold'>None</span>")
		}
	}

	function populateContraceptionHistory(con_history)
	{
		if(con_history){
			$(".contraception-small-card").html(\`
				<span class="bold"></span>\${con_history.contraception_type?.name} <span class="badge badge-primary">\${moment(con_history?.date_started).format("DD-MM-YYYY")}</span><br/>
			\`)
		}
	}

	function populateHospitalizationHistory(visits)
	{
		if(visits){
			let result = []
			visits.forEach(visit => {
				visit.patient_visit_admissions.forEach(ele => {
					result.push(\`<li class='mb-1'> <span class='bold'>On \${moment(ele.admission_start).format("MMM DD YY, h:mm:ss a") || 0} </span> for <span class='bold'> \${moment(ele.admission_end).diff(ele.admission_start, 'days') || 0} </span>days </li>\`)
				});
			});
			$(".hospitalization-small-card").html("<span><ul class='hospitalization-list-class'></ul></span>")
				$(".hospitalization-list-class").html(
					result.join("")
				)
		}else{
			$(".hospitalization-small-card").html("<span class='bold'>None</span>")
		}
	}

	function populateSystemReview(reviews)
	{
		let result = []
		for (const prop in reviews) {
			// result.push(\`
			// 	<li class='mb-1'> <span class='bold text-capitalize'> \${reviewFilter(prop)} </span> <span class='badge badge-\${Object.values(reviews[prop]).some(x=> x == null) ? "danger'>Incomplete" : "success'>Done"} </span> </li>
			// \`)
		}
		$(".review-small-card").html("<span><ul class='review-list-class'></ul></span>")
		$(".review-list-class").html(
			result.join("")
		)
	}
	function reviewFilter(review) {
		switch (review) {
			case "patient_visit_clinical_encounter_note_review_general":
				return "general"
				break;
			case "patient_visit_clinical_encounter_note_review_eye":
				return "eye"
				break;
			case "patient_visit_clinical_encounter_note_review_nose":
				return "nose"
				break;
			case "patient_visit_clinical_encounter_note_review_mouth":
				return "mouth"
				break;
			case "patient_visit_clinical_encounter_note_review_neck":
				return "neck"
				break;
			case "patient_visit_clinical_encounter_note_review_groin":
				return "groin"
				break;
			case "patient_visit_clinical_encounter_note_review_hand":
				return "hand"
				break;
			case "patient_visit_clinical_encounter_note_review_breast":
				return "breast"
				break;
			case "patient_visit_clinical_encounter_note_review_cardio":
				return "cardio"
				break;
			case "patient_visit_clinical_encounter_note_review_respiratory":
				return "respiratory"
				break;
			case "patient_visit_clinical_encounter_note_review_abdomen":
				return "abdomen"
				break;
			case "patient_visit_clinical_encounter_note_review_extremity":
				return "extremity"
				break;
			case "patient_visit_clinical_encounter_note_review_neurological":
				return "neurological"
				break;
			case "patient_visit_clinical_encounter_note_review_obstetric_pelvic":
				return "obstetric pelvic"
				break;
			case "patient_visit_clinical_encounter_note_review_obstetric_abdomen":
				return "obstetric abdomen"
				break;
			case "patient_visit_clinical_encounter_note_review_gynaecologic":
				return "gynaecologic"
				break;
		
			default:
				return ""
				break;
		}
	}

	//populating family history
	function populateImmuHistory(immu_history)
	{
		if(immu_history){
			$(".immu-small-card").html("<span><ul class='immu-list-class'></ul></span>")
				$(".immu-list-class").append(
					"<li class='mb-1'>"+ immu_history +"</li>" 
				)
		}else{
			$(".immu-small-card").html("<span class='bold'>No immuniization history recorded</span>")
		}
	}

	//populate surgeries
	function populateSurgeries(surgery)
	{
		if(surgery){
			$(".surgeries-small-card").html("<span><ul class='sur-list-class'></ul></span>")
				$(".sur-list-class").append(
					"<li class='mb-1'>"+ surgery +"</li>" 
				)
		}else{
			$(".surgeries-small-card").html("<span class=''>None</span>")
		}
	}

	//populate recent and previous vitals
	function populateLatestVitals()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLatestVitals' ] ); -->",
			data: {
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res[0]){
					$(".recent-vitals-taken").html("<span><b>Vitals taken on</b>: "+ moment(res[0].date_created).format("MMM Do YY, h:mm:ss a")+ "<ul class='recent-vitals-list-class'></ul></span>")
						$(".recent-vitals-list-class").append(
							"<li class='mb-1'><b>BP</b>: "+ res[0].blood_pressure_1 + " / " + res[0].blood_pressure_2 +"</li>" 
							+"<li class='mb-1'><b>HR</b>: "+ res[0].heart_rate +"</li>" 
							+"<li class='mb-1'><b>Pulse</b>: "+ res[0].pulse +"</li>"
							+"<li class='mb-1'><b>OS</b>: "+ res[0].oxygen_saturation +"</li>" 
							+"<li class='mb-1'><b>Temp</b>: "+ res[0].temperature +"</li>"
							+"<li class='mb-1'><b>RR</b>: "+ res[0].respiratory_rate +"</li>"
							+"<li class='mb-1'><b>Ht</b>: "+ res[0].height +"</li>"
							+"<li class='mb-1'><b>Wt</b>: "+ res[0].weight +"</li>"
							+"<li class='mb-1'><b>Mobility</b>: "+ res[0].mobility +"</li>"
						)
				}else{
					$(".vitals-small-card").html("<span class='bold'>No vitals recorded</span>")
				}

				if(res[1]){
					$(".previous-vitals-taken").html("<span><b>Vitals taken on</b>: "+ moment(res[1].date_created).format("MMM Do YY, h:mm:ss a") + "<ul class='previous-vitals-list-class'></ul></span>")
						$(".previous-vitals-list-class").append(
							"<li class='mb-1'><b>BP</b>: "+ res[1].blood_pressure_1 + " / " + res[1].blood_pressure_2 +"</li>" 
							+"<li class='mb-1'><b>HR</b>: "+ res[1].heart_rate +"</li>" 
							+"<li class='mb-1'><b>Pulse</b>: "+ res[1].pulse +"</li>"
							+"<li class='mb-1'><b>OS</b>: "+ res[1].oxygen_saturation +"</li>" 
							+"<li class='mb-1'><b>Temp</b>: "+ res[1].temperature +"</li>"
							+"<li class='mb-1'><b>RR</b>: "+ res[1].respiratory_rate +"</li>"
							+"<li class='mb-1'><b>Ht</b>: "+ res[1].height +"</li>"
							+"<li class='mb-1'><b>Wt</b>: "+ res[1].weight +"</li>"
							+"<li class='mb-1'><b>Mobility</b>: "+ res[1].mobility +"</li>"
						)
				}else{
					$(".previous-small-card").html("<span class='bold'>No vitals recorded</span>")
				}
            }
        });

	}

	//populate labs and radiology scans requested
	function populateLabsAndRadiology()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLabsAndImaging' ] ); -->",
			data: {
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res.lab){
					$(".lab-small-card").html("<span><ul class='lab-list-class'></ul></span>")
						$(".lab-list-class").html()
						res.lab.forEach(ele => {
							$(".lab-list-class").append(
								\`<li class='mb-1'><span class=''> \${ele?.investigation?.name} (\${ele?.lab_test?.name}) </span></li>\`
							)
						});
				}else{
					$(".lab-small-card").html("<span class=''>None</span>")
				}

				if(res.radiology){
					$(".radiology-small-card").html("<span><ul class='radiology-list-class'></ul></span>")
						$(".radiology-list-class").html()
						res.radiology.forEach(ele => {
							$(".radiology-list-class").append(
								\`<li class='mb-1'><span class=''> \${ele.radiology_scan.name}  </span></li>\`
							)
						});
				}else{
					$(".radiology-small-card").html("<span class=''>None</span>")
				}
			}
		})	
	}

	//drawing out history card edit modal
	function stopRefillPrescriptionModal(obj)
	{
		$("#stop-refill-prescription-modal").html(
			\`<div class="modal fade" id="rf-stop-pres-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Medications</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>All Prescriptions</h4></legend>
										<form id="refill-stop-form">
											\${obj.join("")}
										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
	}

	//drawing out history card edit modal
	function stopRefillInfusionModal(obj)
	{
		$("#stop-refill-infusion-modal").html(
			\`<div class="modal fade" id="rf-stop-inf-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Medications</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>All Infusions</h4></legend>
										<form id="refill-stop-form">
											\${obj.join("")}
										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
	}

	//populate Prescriptions
	function populatePrescription()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLatestPrescriptionAndInfusion' ] ); -->",
			data: {
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				var prescs = res.precsriptions
				var infuss = res.infusions
				let pres_result = []
				let inf_result = []
				if(prescs){
					$(".prescription-small-card").html("<span><ul class='prescription-list-class'></ul></span>")
					prescs.forEach(presc => {
						let prescription_obj = JSON.stringify(presc)
						let alternative_status_presc = presc.alternative_status_id == 1 ? "<span class='badge badge-danger'>Stopped</span>" : ""
						$(".prescription-list-class").append(
							"<li class='mb-1'><span class='bold'>"+ presc.item_stock.item.full_name +"</span>"+" with frequency of <span class='text-danger'>"+ presc.drug_administration_frequency.name +"</span> started on "+ moment(presc.start_date).format("MMM Do YYYY, h:mm a") + " for " + presc.number_of_days +" day(s). " + alternative_status_presc + ".</li>"
						)

						pres_result.push(\`
							<label class="form-check-label">\${presc.item_stock.item.full_name} <span class="badge badge-danger">\${presc.item_stock.item.full_name}</span>
							</label>
							<span style="float:right">
								<a href="javascript:" type="button" onclick="setNewPrescriptionStatus('\${presc.id}')" data-toggle="modal" data-target="#rf-stop-pres-modal" class="btn btn-sm btn-outline-danger text-capitalize">Stop</a>
								<a href="javascript:" type="button" onclick="showPrescFrequencyView('presc_frequency_change_\${presc.id}', '\${presc.id}')" class="btn btn-sm btn-outline-secondary text-capitalize">Change</a>
								<a href="javascript:" type="button" onclick="showPrescDateRange('presc_frequency_change_\${presc.id}', '\${presc.drug_stock_id}', '\${presc.dosage_form_id}', '\${presc.drug_administration_frequency_id}', '\${presc.drug_administration_instruction_id}', '\${presc.number_of_days}', '\${presc.administer_dose}', '\${presc.number_of_doses}', '\${presc.quantity}', '\${presc.is_prn}')" class="btn btn-sm btn-outline-primary text-capitalize">Refill</a>
							</span>
							<div class="pl-4">
								<span id="presc_frequency_change_\${presc.id}"></span>
								<span class="bold">Frequency: </span>\${presc.drug_administration_frequency.name}</br>
								<span class="bold">Duration: </span>\${presc.number_of_days} day(s)</br>
								<span class="bold">Instruction: </span>\${presc?.drug_administration_instruction?.name || ''}</br>
								<span class="bold">Start Date: </span>\${moment(presc.start_date).format("YYYY-MM-DD")}</br>
								<span class="bold">End Date: </span>\${moment(presc.end_date).format("YYYY-MM-DD")}</br>
							</div>
							</br>
						\`)
					});
				}else{
					$(".prescription-small-card").html("<span class='bold'>None</span>")
				}
				
				if(infuss){
					$(".infusion-small-card").html("<span><ul class='infusion-list-class'></ul></span>")
					infuss.forEach(infus => {
						let alternative_status = infus.alternative_status_id == 1 ? "<span class='badge badge-danger'>Stopped</span>" : ""
						$(".infusion-list-class").append(
							"<li class='mb-1'><span class='bold'>"+ infus?.item_stock?.item?.full_name +"</span>"+" with frequency of <span class='text-danger'>"+ infus.drug_administration_frequency.name +"</span> started on "+ moment(infus.start_date).format("MMM Do YYYY, h:mm a") +" for " + infus.number_of_days +" day(s)." + alternative_status + "</li>" 
						)

						inf_result.push(\`
							<label class="form-check-label">\${infus?.item_stock?.item?.full_name} <span class="badge badge-danger">\${infus?.item_stock?.item?.full_name}</span>
							</label>
							<span style="float:right">
								<a href="javascript:" type="button" onclick="setNewInfusionStatus('\${infus.id}')" data-toggle="modal" data-target="#rf-stop-inf-modal" class="btn btn-sm btn-outline-danger text-capitalize">Stop</a>
								<a href="javascript:" type="button" onclick="showInfFrequencyView('inf_frequency_change_\${infus.id}', '\${infus.id}')" class="btn btn-sm btn-outline-secondary text-capitalize">Change</a>
								<a href="javascript:" type="button" onclick="showInfDateRange('inf_frequency_change_\${infus.id}', '\${infus.drug_stock_id}', '\${infus.quantity}', '\${infus.dosage_form_id}', '\${infus.drug_administration_frequency_id}', '\${infus.number_of_days}', '\${infus.administer_infusion}', '\${infus.infusion_volume}', '\${infus.infusion_rate}', '\${infus.is_prn}')" class="btn btn-sm btn-outline-primary text-capitalize">Refill</a>
							</span>
							<div class="pl-4">
								<span id="inf_frequency_change_\${infus.id}"></span>
								<span class="bold">Frequency: </span>\${infus.drug_administration_frequency.name}</br>
								<span class="bold">Duration: </span>\${infus.number_of_days} day(s)</br>
								<span class="bold">Start Date: </span>\${moment(infus.start_date).format("YYYY-MM-DD")}</br>
								<span class="bold">End Date: </span>\${moment(infus.end_date).format("YYYY-MM-DD")}</br>
							</div>
							</br>
						\`)
					});
				}else{
					$(".infusion-small-card").html("<span class='bold'>None</span>")
				}
				stopRefillPrescriptionModal(pres_result)
				stopRefillInfusionModal(inf_result)
            }
        });
	}
	function consultToReferral()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getConsultationRequest', $patient_visit_id ] ); -->",
            success: function (res){
				result = ["<ul>"]

				res.data.forEach(row => {
					result.push(\`<li>\${row?.to?.user?.first_name} \${row?.to?.user?.last_name}<br> (\${row?.consultation?.name})</li>\`)
				});
				result.push("</ul>")

				$(".referral-small-card").html(result.join(""))
            }
        });
	}

	function showInfFrequencyView(id, infus) {
		$(\`#\${id}\`).html(\`
			<div id="infusionchangeFreqForm\${infus}" class="row col-md-12 mt-3 justify-content-between">
				<SearchableSelectField name="infusion_frequency" class="form-control show-menu-arrow show-tick col-md-10" data-required="1" data-live-search="true" data-size="5" title="Select New Frequency" id="inf_freq_select_\${infus}"></SearchableSelectField>
				<a href="javascript:" type="button" onclick="setNewInfusionFrequency('\${infus}')" class="btn btn-sm btn-primary text-capitalize">Set</a>
			</div>
		\`)
		setFrequencyChange(\`inf_freq_select_\${infus}\`)
		
	}
	function showInfDateRange(id, drug_stock_id, quantity, dosage_form_id, drug_administration_frequency_id, number_of_days, administer_infusion, infusion_volume, infusion_rate, is_prn) {
		$(\`#\${id}\`).html(\`
			<div id="infusionchangeFreqForm\${id}" class="row col-md-12 mt-3 justify-content-between">
				<input id="inf_refill_date_range" placeholder="Click to select date range" data-required="1" class="form-control col-md-10" onchange="" readonly='true' class="w-100" />
				<a href="javascript:" type="button" onclick="refillInfusion('\${drug_stock_id}', '\${quantity}', '\${dosage_form_id}', '\${drug_administration_frequency_id}', '\${number_of_days}', '\${administer_infusion}', '\${infusion_volume}', '\${infusion_rate}', '\${is_prn}')" class="btn btn-sm btn-success text-capitalize">Go</a>
			</div>
		\`)
		let inf_refill_date_range = mobiscroll.datepicker('#inf_refill_date_range', {
			controls: ['calendar'],
			select: 'range',
			dateFormat: 'DD MMM YYYY',
			calendarType: 'month',
			pages: 2,
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light'

		});
		
	}
	function showPrescDateRange(id, drug_stock_id, dosage_form_id, drug_administration_frequency_id, drug_administration_instruction_id, number_of_days, administer_dose, number_of_doses, quantity, is_prn) {
		$(\`#\${id}\`).html(\`
			<div id="prescriptionchangeFreqForm\${id}" class="row col-md-12 mt-3 justify-content-between">
				<input id="presc_refill_date_range" placeholder="Click to select date range" data-required="1" class="form-control col-md-10" onchange="" readonly='true' class="w-100" />
				<a href="javascript:" type="button" onclick="refillPrescription('\${drug_stock_id}', '\${dosage_form_id}', '\${drug_administration_frequency_id}', '\${drug_administration_instruction_id}', '\${number_of_days}', '\${administer_dose}', '\${number_of_doses}', '\${quantity}', '\${is_prn}')" class="btn btn-sm btn-success text-capitalize">Go</a>
			</div>
		\`)
		let presc_refill_date_range = mobiscroll.datepicker('#presc_refill_date_range', {
			controls: ['calendar'],
			select: 'range',
			dateFormat: 'DD MMM YYYY',
			calendarType: 'month',
			pages: 2,
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light'

		});
		
	}
	function showPrescFrequencyView(id, presc) {
		$(\`#\${id}\`).html(\`
			<div id="prescriptionchangeFreqForm\${presc}" class="row col-md-12 mt-3 justify-content-between">
				<SearchableSelectField name="prescription_frequency" class="form-control show-menu-arrow show-tick col-md-10" data-required="1" data-live-search="true" data-size="5" title="Select New Frequency" id="presc_freq_select_\${presc}"></SearchableSelectField>
				<a href="javascript:" type="button" onclick="setNewPrescriptionFrequency('\${presc}')" class="btn btn-sm btn-primary text-capitalize">Set</a>
			</div>
		\`)
		setFrequencyChange(\`presc_freq_select_\${presc}\`)
		
	}
	function setNewInfusionFrequency(id) {
		
		$.ajax({
			type: "POST",
			url: \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionFrequency']) -->/\${id}\`,
			data: {
				infusion_frequency: $(\`#inf_freq_select_\${id}\`).val()
			},
			success: function g(data, textStatus) {
				if (data == 1) {
					clinicalEncounterTab()
					alertify.success("Updated Successfully")
				} else {
					alertify.error("An error Occured")
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}
	function setNewPrescriptionFrequency(id) {
		
		$.ajax({
			type: "POST",
			url: \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionFrequency']) -->/\${id}\`,
			data: {
				prescription_frequency: $(\`#presc_freq_select_\${id}\`).val()
			},
			success: function g(data, textStatus) {
				if (data == 1) {
					$("#rf-stop-pres-modal").modal('toggle')
					clinicalEncounterTab()
					alertify.success("Updated Successfully")
				} else {
					alertify.error("An error Occured")
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}
	function setNewInfusionStatus(id) {
		
		$.ajax({
			type: "POST",
			url: \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionStatus']) -->/\${id}\`,
			success: function g(data, textStatus) {
				if (data == 1) {
					clinicalEncounterTab()
					alertify.success("Updated Successfully")
				} else {
					alertify.error("An error Occured")
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}
	function setNewPrescriptionStatus(id) {
		
		$.ajax({
			type: "POST",
			url: \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionStatus']) -->/\${id}\`,
			success: function g(data, textStatus) {
				if (data == 1) {
					clinicalEncounterTab()
					alertify.success("Updated Successfully")
				} else {
					alertify.error("An error Occured")
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}
	function refillInfusion(drug_stock_id, quantity, dosage_form_id, drug_administration_frequency_id, number_of_days, administer_infusion, infusion_volume, infusion_rate, is_prn) {
		let inf_refill_date_range = mobiscroll.datepicker('#inf_refill_date_range', {
			controls: ['calendar'],
			select: 'range',
			dateFormat: 'DD MMM YYYY',
			calendarType: 'month',
			pages: 2,
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light'

		});
		let date = inf_refill_date_range.getVal();
		infusion_obj = {
			'drug_stock_id': drug_stock_id,
			'quantity': quantity,
			'dosage_form_id': dosage_form_id,
			'drug_administration_frequency_id': drug_administration_frequency_id,
			'priority': 'routine',
			'start_date': moment(date[0]).format("YYYY-MM-DD HH:mm:ss"),
			'end_date': moment(date[1]).format("YYYY-MM-DD HH:mm:ss"),
			'number_of_days': moment(date[1]).diff(moment(date[0]), 'days'),
			'bill_to_id': $("#global_bill_to").val(),
			'administer_infusion': administer_infusion,
			"is_complete":0,
			"is_prn":0,
			"in_house_medication_status":1,
			"is_bolus":0,
			"service_place_id":"0",
			"trough_levels":null,
			"peak_levels":null,
			"hold_vitals":null,
			'infusion_volume': infusion_volume,
			'infusion_rate': infusion_rate,
			'is_prn': is_prn == 'true' ? 1 : 0 
		}
		console.log(infusion_obj)
		$.ajax({
			type: "POST",
			url: \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestInfusion', $patient->id, $selectedVisit->id,]) -->\`,
			data: infusion_obj,
			success: function g(data, textStatus) {
				$('#rf-stop-inf-modal').modal('toggle')
				clinicalEncounterTab()
				alertify.success("Updated Successfully")
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}
	function refillPrescription(drug_stock_id, dosage_form_id, drug_administration_frequency_id, drug_administration_instruction_id, number_of_days, administer_dose, number_of_doses, quantity, is_prn) {
		let presc_refill_date_range = mobiscroll.datepicker('#presc_refill_date_range', {
			controls: ['calendar'],
			select: 'range',
			dateFormat: 'DD MMM YYYY',
			calendarType: 'month',
			pages: 2,
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light'

		});
		let date = presc_refill_date_range.getVal();
		prescription_obj = {
			'drug_stock_id': drug_stock_id,
			'dosage_form_id': dosage_form_id,
			'drug_administration_frequency_id': drug_administration_frequency_id,
			'drug_administration_instruction_id': drug_administration_instruction_id,
			'priority': 'routine',
			'start_date': moment(date[0]).format("YYYY-MM-DD HH:mm:ss"),
			'end_date': moment(date[1]).format("YYYY-MM-DD HH:mm:ss"),
			'number_of_days': moment(date[1]).diff(moment(date[0]), 'days'),
			'bill_to_id': $("#global_bill_to").val(),
			'administer_dose': administer_dose,
			'number_of_doses': number_of_doses != 'null' ? number_of_doses : 0,
			'is_complete': 0,
			// 'is_prn': 0,
			'in_house_medication_status': 1,
			'is_bolus': 0,
			'service_place_id': 0,
			'repeat_prescription': 0,
			'trough_levels': null,
			'peak_levels': null,
			'hold_vitals': null,
			'quantity': quantity,
			'is_prn': is_prn == 'true' ? 1 : 0
		}
		console.log(prescription_obj)
		$.ajax({
			type: "POST",
			url: \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestPrescription', $patient->id, $selectedVisit->id,]) -->\`,
			data: prescription_obj,
			success: function g(data, textStatus) {
				$('#rf-stop-pres-modal').modal('toggle')
				clinicalEncounterTab()
				alertify.success("Updated Successfully")

			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}

	function setFrequencyChange(id) {
		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getDrugAdminFrequencies']) -->\`,
			success: function g(data, textStatus) {
				let result = []
				data.forEach(drugAdminFreq => {
					if(drugAdminFreq.id == -1) {
						result.push(\`<option value="\${drugAdminFreq.id}" data-dose-per-day="\${drugAdminFreq.dose_per_day}" data-content="<span class='badge badge-danger ml-2'>STAT</span>"></option>\`)
					} else {
						result.push(\`<option value="\${drugAdminFreq.id}" data-dose-per-day="\${drugAdminFreq.dose_per_day}">\${drugAdminFreq.name}</option>\`)
					}
				});
				result.push(\`<option value="0" data-content="<span class='badge badge-primary ml-2'>Custom</span>"></option>\`)
				$(\`#\${id}\`).append(result.join(""));
				$(\`#\${id}\`).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}

	//populate diagnoses
	function makeText(name, isCleared, id, type ) {
		console.log("iscleared", isCleared)
		return \`
			<div class="row mb-1" style="">
				<div class="col-md-6">\${name}</div>
				<div class="col-md-6">
					<div class="col-md-5">
						<label class="switchToggle">
							<input name="bundled_service" type="checkbox" \${isCleared == 1 ? 'checked' : ''} id="\${type}_\${id}" onclick="toggleIsCleared('\${id}', '\${type}',)">
							<span class="slider green round"></span>
						</label>
					</div>
				</div>
			</div>
		\`
	}
	function toggleIsCleared(id, type) {
		$.ajax({
			type: 'POST',
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'toggleIsCleared']) -->/<!-- php: = $id -->",
			data: { 
				id: id, 
				type: type,
				toggle: $(\`#\${type}_\${id}\`).is(":checked")
			},
			success: function g(data, textStatus) {
				console.log("status", data.status)
				if (data.status) {
					clinicalEncounterTab()
					alertify.success("Status Changed")
				} else {
					alertify.error("An error Occured")
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
	function populateDiagnoses()
	{
		$.ajax({
            type: 'GET',
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAllPatientDiagnosis', $patient->id, $selectedVisit->id,]) -->",
			// url: "</?= $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitDiagnosis', $patient->id, $selectedVisit->id, '?' => ['_location' => 'diagnosis']]) ?>",
            cache: false,
            success: function (res){
				// res = response.data.filter(x => x.id == response.primary_diagnosis_id);
				if(res.data.length > 0){
					$(".diagnoses-small-card").html("<span><ul class='diagnoses-list-class'></ul></span>")
					// $(".diagnoses-list-class").append(
					// 	"<li class='mb-1'><span class=''>"+ res[0].patient_visit_primary_diagnoses[0].primary_diagnosis.name +"</span>"+ "<span class='badge badge-danger'>"+ res[0].patient_visit_primary_diagnoses[0].primary_diagnosis.code +"</span></li>"
					// 	// +"<li class='mb-1'><span class=''>"+ res.patient_visit_secondary_diagnoses[0].secondary_diagnosis.name +"</span>"+ "<span class='badge badge-danger'>"+ res.patient_visit_secondary_diagnoses[0].secondary_diagnosis.code +"</span></li>"
					// 	// +"<li class='mb-1'><span class=''>"+ res.patient_visit_primary_diagnoses[0].primary_diagnosis.name +"</span>"+ "<span class='badge badge-danger'>"+ res.patient_visit_primary_diagnoses[0].primary_diagnosis.code +"</span></li>"
					// 	// +"<li class='mb-1'><span class=''>"+ res.patient_visit_primary_diagnoses[0].primary_diagnosis.name +"</span>"+ "<span class='badge badge-danger'>"+ res.patient_visit_primary_diagnoses[0].primary_diagnosis.code +"</span></li>"
					// )
					let result = ''
					let modalInfo = []
					res?.data.forEach(row => {
						if (row?.patient_visit_primary_diagnoses && row?.patient_visit_primary_diagnoses.length > 0) {
							row?.patient_visit_primary_diagnoses?.forEach(primaryDiagnosis => {
								result += "<li>"
								if (primaryDiagnosis?.primary_diagnosis != undefined) {
									let name = \`\${primaryDiagnosis?.primary_diagnosis?.name} <span class="badge badge-danger">\${primaryDiagnosis?.primary_diagnosis?.code}</span>
									\${getDiagnosisType(1)} \${\`| \${primaryDiagnosis.ill_episode}\`} <i class="fa fa-circle" style="color:\${primaryDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
									result += name;
									modalInfo.push(makeText(name, primaryDiagnosis.is_cleared, primaryDiagnosis.id, 'primary'))
								} else {
									result += 'N/A'
								}
								result += "</li>"
							});
						}
						if (row?.patient_visit_provisional_diagnoses && row?.patient_visit_provisional_diagnoses.length > 0) {
							row?.patient_visit_provisional_diagnoses?.forEach(prDiagnosis => {
								result += "<li>"
								if (prDiagnosis?.diagnosis != undefined) {
									let name = \`\${prDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${prDiagnosis?.diagnosis?.code}</span>
									\${getDiagnosisType(2)} <i class="fa fa-circle" style="color:\${prDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
									result += name;
									modalInfo.push(makeText(name, prDiagnosis.is_cleared, prDiagnosis.id, 'provi'))
								} else {
									result += 'N/A'
								}
								result += "</li>"
							});
						}
						if (row?.patient_visit_differential_diagnoses && row?.patient_visit_differential_diagnoses.length > 0) {
							row?.patient_visit_differential_diagnoses?.forEach(dDiagnosis => {
								result += "<li>"
								if (dDiagnosis?.diagnosis != undefined) {
									let name = \`\${dDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${dDiagnosis?.diagnosis?.code}</span>
									\${getDiagnosisType(3)} <i class="fa fa-circle" style="color:\${dDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
									result += name;
									modalInfo.push(makeText(name, dDiagnosis.is_cleared, dDiagnosis.id, 'diff'))
								} else {
									result += 'N/A'
								}
								result += "</li>"
							});
						}
						if (row?.patient_visit_other_diagnoses && row?.patient_visit_other_diagnoses.length > 0) {
							row?.patient_visit_other_diagnoses?.forEach(oDiagnosis => {
								result += "<li>"
								if (oDiagnosis?.diagnosis != undefined) {
									let name = \`\${oDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${oDiagnosis?.diagnosis?.code}</span>
									\${getDiagnosisType(4)} <i class="fa fa-circle" style="color:\${oDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
									result += name;
									modalInfo.push(makeText(name, oDiagnosis.is_cleared, oDiagnosis.id, 'other'))
								} else {
									result += 'N/A'
								}
								result += "</li>"
							});
						}
					});
					$(".diagnoses-list-class").append(result)
					$("#diagnosis_clearance").html(modalInfo.join(""))
				}else{
					$(".diagnoses-small-card").html("<span class='bold'>Patient has not been diagnosed</span>")
				}
            }
        });
	}
					
	//displaying textfields for comments
	function commentsFieldDisplay(obj, span_id, odq_severities, odq_durations, id)
	{
		if($(obj).is(":checked")){
			odq = "<input id='"+span_id+"_comment' name='comment_"+id+"' type='text' placeholder='comment here' onkeyup='getTextLength(this)' style='background: #ffe6e6; border:none; border-radius: 15px;' maxlength='80'>"
			$("#"+span_id).html(odq + "<br>" + "<div class='mt-2' id='"+span_id+"_comment-severity-duration-div' style='background:#ebebe0; border-radius: 15px;'><span class='text-danger' id='"+span_id+"_severity_duration'>Severity / Duration: </b></span></div>")
			for(var i in odq_severities){
				$("#"+span_id+"_comment-severity-duration-div").append("<div class='form-check form-check-inline'><input class='form-check-input' value='"+odq_severities[i].id+"' type='radio' name='odq_severity_"+id+"' id='odq_severity_"+id+"' value='stat'><label class='form-check-label' for='"+id+"'><span class='badge rounded-pill' style='background-color: "+odq_severities[i].color_code+"'>"+odq_severities[i].severity+"</span></label></div>")
			}
			for(var i in odq_durations){
				$("#"+span_id+"_comment-severity-duration-div").append("<div class='form-check form-check-inline'><input class='form-check-input' value='"+odq_durations[i].id+"' type='radio' name='odq_duration_"+id+"' id='odq_duration_"+id+"' value='stat'><label class='form-check-label' for='"+id+"'>"+odq_durations[i].duration+"</label></div>")	
			}
		}else{
			$("#"+span_id).html(" ")
		}
	}

	//getting length of text inputed in order to expand the comment textbox
	function getTextLength(obj)
	{
		if(obj.value.length < 1){
			obj.size = 13
		}else{
			if(obj.size == 80){
				alertify.error('comment limit reached');
			}
			obj.size = obj.value.length 
		}
	}

	//finalizing encounter
	function finalizeEcounter()
	{
		var odq_form_data = $('#odq-form').serializeArray()
		var cc_val = $('#cc-editor').val()
		var past_illness_form_data = $('#past-illness').val()
		var surgeries_form_data = $('#past-surgeries').val()
		var haemo_form_data = $('#past-haemo').val()
		var allergy_form_data = $('#allergyHistoryForm').serializeArray()
		var med_hx_form_data = $('#past-active-medication').val()
		var chilhood_form_data = $('#chi-editor').val()
		var immu_hx_form_data = $('#immu-editor').val()
		var fam_hx_form_data = $('#familyHistoryForm').serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		var personal_hx_form_data = $('#pshForm').serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		var illicit_substance_use = $('#isu-editor').val()
		var doctor_remarks = $('#remarkEditor').val()
		var gen_exam_form_data = $('#addGeneralExamForm').serializeArray()
		
		let gene_tab_form = $("#gene_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let eyes_tab_form = $("#eyes_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let nose_tab_form = $("#nose_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let mouth_tab_form = $("#mouth_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let neck_tab_form = $("#neck_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let groin_tab_form = $("#groin_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let hands_tab_form = $("#hands_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let breast_tab_form = $("#breast_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let cardio_tab_form = $("#cardio_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let res_tab_form = $("#res_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let abdomen_tab_form = $("#abdomen_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let extermity_tab_form = $("#extermity_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let nerological_tab_form = $("#nerological_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let musco_skeletal_tab_form = $("#musco_skeletal_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let contraception_history = $("#chForm").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})


		// let health_concern = $("#healthconcern_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		// let bioexam = $("#bioexam_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		// let doctor_comment = $("#doctor_comment_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		// let image_link = submitImage()



		<!-- php: if ($patient->gender_id == 2 && $patient_age > 12): -->
			var pregnancy_history = $('#phForm').serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
			var obstetric_history = $('#ohForm').serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
			let gynaecologic_tab_form = $("#gynaecologic_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
			let obstetric_pelvic_tab_form = $("#obstetric_pelvic_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
			let obstetric_abdomen_tab_form = $("#obstetric_abdomen_tab_form").serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
			let gynaecological_histories = $('#ghForm').serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		<!-- php: endif; -->

		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'finalizeEcounter' ] ); -->",
            data: {
				odq:odq_form_data, 
				cc:cc_val,
				past_illness:past_illness_form_data,
				surgiries:surgeries_form_data,
				haemo:haemo_form_data,
				allergy:allergy_form_data,
				med_history:med_hx_form_data,
				childhood:chilhood_form_data,
				immunization:immu_hx_form_data,
				family_history:fam_hx_form_data,
				personal_history:personal_hx_form_data,
				illicit_substance:illicit_substance_use,
				doctor_remarks:doctor_remarks,
				health_concern:health_concern,
				bioexam:bioexam,
				image_link:image_link,
				doctor_comment:doctor_comment,
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->",

				gene_tab_form: gene_tab_form,
				eyes_tab_form: eyes_tab_form,
				nose_tab_form: nose_tab_form,
				mouth_tab_form: mouth_tab_form,
				neck_tab_form: neck_tab_form,
				groin_tab_form: groin_tab_form,
				hands_tab_form: hands_tab_form,
				breast_tab_form: breast_tab_form,
				cardio_tab_form: cardio_tab_form,
				res_tab_form: res_tab_form,
				abdomen_tab_form: abdomen_tab_form,
				extermity_tab_form: extermity_tab_form,
				nerological_tab_form: nerological_tab_form,
				musco_skeletal_tab_form: musco_skeletal_tab_form,
				patient_age: <!-- php: = $patient_age -->,
				contraception_history: contraception_history,
				<!-- php: if ($patient->gender_id == 2 && $patient_age > 12): -->
					gynaecological_histories: gynaecological_histories,
					pregnancy_history: pregnancy_history,
					obstetric_history: obstetric_history,
					gynaecologic_tab_form: gynaecologic_tab_form,
					obstetric_pelvic_tab_form: obstetric_pelvic_tab_form,
					obstetric_abdomen_tab_form: obstetric_abdomen_tab_form,
				<!-- php: endif; -->
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Encounter Finalized');
					
					getLatestEncounter()
				}else{
					alertify.error('Something went wrong, please try again');
					getLatestEncounter()
				}
            },
			error: function(){
				alertify.log("Please try again Later");
				getLatestEncounter()
			}
        });
	}

	//pass allergic category selected in order to populate substance
	function passAllergicCategory(obj)
	{
		$.ajax({
		type: 'GET',
		url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergicSubstances' ] ); -->",
		data: {allergy_category_id:obj.value},
		success: function (response){
			var res = (response);
			$('#encounter_allergy_id, #edit_encounter_allergy_id').empty()
			if(obj.value != 4){
				$.each(res, function(key, value) {
					$('#encounter_allergy_id, #edit_encounter_allergy_id').append($('<option data-name="'+res[key].name+'"></option>').val(res[key].id).html(res[key].name + " " + "(" + res[key].description + ")"));  
					$("#encounter_allergy_id, #edit_encounter_allergy_id").selectpicker("refresh");
				});	
			}else{
				$.each(res, function(key, value) {
					$('#encounter_allergy_id, #edit_encounter_allergy_id').append($('<option data-name="'+res[key].full_name+'"></option>').val(res[key].id).html(res[key].full_name))
					$("#encounter_allergy_id, #edit_encounter_allergy_id").selectpicker("refresh");
				});	
			}
		}
		});
	}

	//appending selected substances from different allergy categories
	function passSelectedAllergySUbstance(obj)
	{
		var value = $('#'+obj.id).find(":selected").val();
		var text = $('#'+obj.id).find(":selected").text();
		$('#encounter_allergy_ids').append($('<option selected data-name="'+text+'"></option>').val(value).html(text));  
		$("#encounter_allergy_ids").selectpicker("refresh");
	}
	function passSelectedAllergySUbstanceEdit(obj)
	{
		var value = $('#'+obj.id).find(":selected").val();
		var text = $('#'+obj.id).find(":selected").text();
		$('#edit_encounter_allergy_ids').append($('<option selected data-name="'+text+'"></option>').val(value).html(text));  
		$("#edit_encounter_allergy_ids").selectpicker("refresh");
	}

	//pass history data to action button in the history card
	function passHistoryData(data_object)
	{
		// $("#history-card-action-span").html("<a onclick='historyEditModal("+JSON.stringify(data_object.medication_hx)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		$("#complaint-action-span").html("<a onclick='ccEditModal("+JSON.stringify(data_object.cc)+","+JSON.stringify(data_object.encounter_id)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		$("#allergy-action-span").html("<a onclick='allergiesEditModal("+JSON.stringify(data_object.allergies)+","+JSON.stringify(data_object.encounter_id)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		$("#comorbidity-action-span").html("<a onclick='comorbidityEditModal("+JSON.stringify(data_object.comorbidity)+","+JSON.stringify(data_object.encounter_id)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		$("#odqs-action-span").html("<a onclick='odqsEditModal("+JSON.stringify(data_object.odqs)+","+JSON.stringify(data_object.encounter_id)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		// $("#social-action-span").html("<a onclick='socialEditModal("+JSON.stringify(data_object.social)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		// $("#family-action-span").html("<a onclick='familyEditModal("+JSON.stringify(data_object.family)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		// $("#contraception-action-span").html("<a onclick='contraceptionEditModal("+JSON.stringify(data_object.family)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		$("#allergy-reactions-action-span").html("<a onclick='allergyReactionsEditModal("+JSON.stringify(data_object.allergy_reactions)+","+JSON.stringify(data_object.encounter_id)+")'> <i class='fa fa-edit fa-lg'></i></a>")
		$("#system-review-span").html("<a onclick='systemReviewEditModal("+JSON.stringify(data_object.system_review)+","+JSON.stringify(data_object.encounter_id)+")'> <i class='fa fa-edit fa-lg'></i></a>")
	}

	//drawing out allergy reactions edit modal
	function allergyReactionsEditModal(allergy_reactions, info)
	{
		$("#allergy-reactions-modal").html(
			\`<div class="modal fade" id="edit-allergy-reactions-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Allergy Reactions</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Reactions from Allergies</h4></legend>
										<form id="edit-reaction-form">
											<div class="form-group row">
												<label class="control-label col-md-3">Allergy Reactions
												</label>
												<div class="col-md-9">
													<SearchableSelectField class="form-control selectpicker" name="encounter_allergy_reaction_id[]" id="edit_encounter_allergy_reaction_id" data-live-search="true" onchange="" multiple>
														<option value="">Select...</option>
													</SearchableSelectField>
												</div>
											</div>
										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editAllergyReactionsEditModal('\${info}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('#edit-allergy-reactions-modal').modal('toggle');
		$('#edit_encounter_allergy_reaction_id').empty()
		var res = global_allergy_reactions_obj.data
		var allergy_reaction_id = ''
		if (Array.isArray(allergy_reactions) && allergy_reactions.length < 1) {
			allergy_reactions.push('')
		} else if(!Array.isArray(allergy_reactions)) {
			allergy_reactions = ['']
		}
		$.each(allergy_reactions, function(key, value) {
			allergy_reaction_id = allergy_reactions[key].encounter_allergy_reaction_id
			$.each(res, function(key, value) {
				if(res[key].id == allergy_reaction_id){
					$('#edit_encounter_allergy_reaction_id').append($('<option selected data-name="'+res[key].name+'"></option>').val(res[key].id).html(res[key].name));  
				}else{
					$('#edit_encounter_allergy_reaction_id').append($('<option data-name="'+res[key].name+'"></option>').val(res[key].id).html(res[key].name));  
				}
			});	
		});	
		$("#edit_encounter_allergy_reaction_id").selectpicker("refresh");
	}

	//drawing out family edit modal
	function familyEditModal(family)
	{
		$("#family-modal").html(
			\`<div class="modal fade" id="edit-family-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Patient Family History</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Family History</h4></legend>
										<form id="edit-fhx-form">
											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Status

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<input class="form-check-input" \${family.mother_status == 'Alive' ? 'checked="checked"' : ''} type="radio" name="mother_status" id="inlineRadio1" value="Alive">
														<label class="form-check-label" for="inlineRadio1">Alive</label>
													</div>
													<div class="form-check form-check-inline">
														<input class="form-check-input" \${family.mother_status == 'Dead' ? 'checked="checked"' : ''} type="radio" name="mother_status" id="inlineRadio2" value="Dead">
														<label class="form-check-label" for="inlineRadio2">Dead</label>
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Age

												</label>
												<div class="col-md-7">
													<input type="number" min="1" step="1" name="mother_age" id="mother_age" data-required="0" placeholder="Enter age of mother" class="form-control input-height" value="\${family.mother_age}">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Condition

												</label>
												<div class="col-md-7">
													<input type="text" name="mother_condition" data-required="0" id="mother_condition" placeholder="Enter condition of mother" class="form-control input-height" value="\${family.mother_condition}">
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Father's Status

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<input class="form-check-input" \${family.father_status == 'Alive' ? 'checked="checked"' : ''} type="radio" name="father_status" id="inlineRadio1" value="Alive">
														<label class="form-check-label" for="inlineRadio1">Alive</label>
													</div>
													<div class="form-check form-check-inline">
														<input class="form-check-input" \${family.father_status == 'Dead' ? 'checked="checked"' : ''} type="radio" name="father_status" id="inlineRadio2" value="Dead">
														<label class="form-check-label" for="inlineRadio2">Dead</label>
													</div>
													<!-- <SearchableSelectField class="form-control selectpicker system_review_select" name="father_status" id="father_status">
														<option value="">Select...</option>
														<option value="Alive">Alive</option>
														<option value="Dead">Dead</option>
													</SearchableSelectField> -->
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Father's Age

												</label>
												<div class="col-md-7">
													<input type="number" min="1" step="1" name="father_age" id="father_age" data-required="0" placeholder="Enter age of father" class="form-control input-height" value="\${family.father_age}">
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Father's Codition

												</label>
												<div class="col-md-7">
													<input type="text" name="father_condition" id="father_condition" data-required="0" placeholder="Enter condition of father" class="form-control input-height" value="\${family.father_condition}">
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Status

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<input class="form-check-input" type="radio" \${family.spouse_status == 'Alive' ? 'checked="checked"' : ''} name="spouse_status" id="inlineRadio1" value="Alive">
														<label class="form-check-label" for="inlineRadio1">Alive</label>
													</div>
													<div class="form-check form-check-inline">
														<input class="form-check-input" type="radio" \${family.spouse_status == 'Dead' ? 'checked="checked"' : ''} name="spouse_status" id="inlineRadio2" value="Dead">
														<label class="form-check-label" for="inlineRadio2">Dead</label>
													</div>
													<!-- <SearchableSelectField class="form-control selectpicker system_review_select" name="spouse_status" id="spouse_status">
														<option value="">Select...</option>
														<option value="Alive">Alive</option>
														<option value="Dead">Dead</option>
													</SearchableSelectField> -->
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Age

												</label>
												<div class="col-md-7">
													<input type="number" min="1" step="1" name="spouse_age" id="spouse_age" data-required="0" placeholder="Enter age of spouse" class="form-control input-height" value="\${family.spouse_age}">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Codition

												</label>
												<div class="col-md-7">
													<input type="text" name="spouse_condition" id="spouse_condition" data-required="0" placeholder="Enter condition of spouse" class="form-control input-height" value="\${family.spouse_condition}">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Number of Children

												</label>
												<div class="col-md-7">
													<input type="number" min="0" step="1" name="number_of_children" id="number_of_children" data-required="0" placeholder="Enter number of children" class="form-control input-height" value="\${family.number_of_children}">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Children's Codition

												</label>
												<div class="col-md-7">
													<input type="text" name="children_condition" id="children_condition" data-required="0" placeholder="Enter condition of children" class="form-control input-height" value="\${family.children_condition}">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Details

												</label>
												<div class="col-md-7">
													<input type="text" name="other_details" id="other_details" data-required="0" placeholder="Enter other details" class="form-control input-height" value="\${family.other_details}">
												</div>
											</div>
											
										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editFamilyEditModal('\${family.id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('#edit-family-modal').modal('toggle');
		if(family.spouse_status == 'Alive'){
			$("#spouse-status-1").attr('checked', 'checked');
		}else{
			$("#spouse-status-2").attr('checked', 'checked');
		}
	}

	function contraceptionEditModal(contraception)
	{
		$("#contraception-modal").html(
			\`<div class="modal fade" id="edit-contraception-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Patient Contraception History</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Contraception History</h4></legend>
										
										<form id="edit-contraception-form">
											
											<div class="col-md-12">

												<div class="pt-2 ">
													<!-- <h3 class="bold">Contraception History</h3> -->
													<form id='chForm'>
														<div class="form-body">

															<div class="form-group row">
																<label class="control-label col-md-5">Contraception Type
																	<!-- <span class="required"> * </span> -->

																</label>
																<div class="col-md-7">
																	<SearchableSelectField class="form-control selectpicker " name="contraception_type_id" data-size="5" data-live-search="true" id="contraception_types">
																		<option value="">Select...</option>
																		<!-- php: foreach ($contraceptionTypes as $contraceptionType) { -->
																			<option value="<!-- php: = $contraceptionType->id -->" \${contraception.contraception_type_id == "<!-- php: = $contraceptionType->id -->" ? 'selected' : ''}><!-- php: = $contraceptionType->name --></option>

																		<!-- php: } -->
																	</SearchableSelectField>


																</div>
															</div>

															<div class="form-group row">
																<label class="control-label col-md-5">Date Started

																</label>
																<div class="input-group col-md-7">
																	<input class="form-control set_date_past" name="date_started" value="\${moment(contraception?.date_started).format("YYYY-MM-DD")}" id="ch_dateStarted" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
																	<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																</div>
															</div>

															<div class="form-group row">
																<label class="control-label col-md-5">Duration

																</label>
																<div class="col-md-7">
																	<input type="text" name="duration" data-required="1" id="ch_duration" placeholder="Enter duration" value="\${contraception?.duration}" class="form-control input-height" required="">
																</div>
															</div>


															<div class="form-group row">
																<label class="control-label col-md-5">Complications

																</label>
																<div class="col-md-7">
																	<input type="text" name="complications" value="\${contraception?.complications}" data-required="0" id="ch_complications" placeholder="Enter complications" class="form-control input-height">
																</div>
															</div>


														</div>
													</form>

												</div>

											</div>

										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editContraceptionEditModal('\${contraception.id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('.selectpicker').selectpicker("refresh")
		mobiscroll.datepicker('.set_date_past', {
			controls: ['calendar'],
			dateFormat: 'YYYY-MM-DD',
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light',
			max: moment(new Date()).format("yyyy-mm-dd")
		});
		$('#edit-contraception-modal').modal('toggle');
	}
	function pregnancyEditModal(pregnancy)
	{
		$("#pregnancy-modal").html(
			\`<div class="modal fade" id="edit-pregnancy-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Patient Pregnancy History</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Pregnancy History</h4></legend>
										
										<form id="edit-pregnancy-form">

											<div class="form-body">

												<div class="form-group row">
													<label class="control-label col-md-5">Pregnancy Number

													</label>
													<div class="col-md-7">
														<input type="number" min="1" step="1" value="\${pregnancy.pregnancy_number}" id="pregnancy_number" name="pregnancy_number" data-required="1" placeholder="Enter Pregnancy Number" class="form-control input-height" required="">
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Date Conceived

													</label>
													<div class="input-group col-md-7">
														<input class="form-control set_date_past" value="\${moment(pregnancy.date_conceived).format("YYYY-MM-DD")}" id="date_conceived" name="date_conceived" size="16" type="text" placeholder="Enter date conceived" style="max-height: 35px;" readonly="">
														<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Mode of Conception

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " value="\${pregnancy.mode_of_conception}" name="mode_of_conception" id="mode_of_conception">
															<option value="">Select</option>
															<option value="Assisted">Assisted</option>
															<option value="Natural">Natural</option>
														</SearchableSelectField>
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Mode of Delivery

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="mode_of_delivery"  id="mode_of_delivery">
															<option value="">Select</option>
															<option value="CS" \${pregnancy.mode_of_delivery == "CS" ?'selected' : ''}>CS</option>
															<option value="Medical evacuation" \${pregnancy.mode_of_delivery == "Medical evacuation" ?'selected' : ''}>Medical evacuation</option>
															<option value="Vaginal Delivery (Induced)" \${pregnancy.mode_of_delivery == "Vaginal Delivery (Induced)" ?'selected' : ''}>Vaginal Delivery (Induced)</option>
															<option value="Vaginal Delivery (Spontaneous)" \${pregnancy.mode_of_delivery == "Vaginal Delivery (Spontaneous)" ?'selected' : ''}>Vaginal Delivery (Spontaneous)</option>
														</SearchableSelectField>
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Outcoume

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="outcome" id="outcome">
															<option value="">Select</option>
															<option value="Live Birth" \${pregnancy.outcome == "Live Birth" ?'selected' : ''}>Live Birth</option>
															<option value="Miscarriage" \${pregnancy.outcome == "Miscarriage" ?'selected' : ''}>Miscarriage</option>
															<option value="Still Birth" \${pregnancy.outcome == "Still Birth" ?'selected' : ''}>Still Birth</option>
															<option value="Termination" \${pregnancy.outcome == "Termination" ?'selected' : ''}>Termination</option>
														</SearchableSelectField>
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Pregnancy Complications

													</label>
													<div class="col-md-7">
														<input type="text" value="\${pregnancy.pregnancy_complications}" name="pregnancy_complications" data-required="0" id="pregnancy_complications" placeholder="Enter pregnancy complications" class="form-control input-height">
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Sex

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="gender_id" id="gender_id" required="">
															<option>Select...</option>
															<option value="2" \${pregnancy.gender_id == "2" ?'selected' : ''}>Female</option>
															<option value="1" \${pregnancy.gender_id == "1" ?'selected' : ''}>Male</option>
														</SearchableSelectField>
													</div>
												</div>




												<div class="form-group row">
													<label class="control-label col-md-5">Weight (KG)

													</label>
													<div class="col-md-7">
														<input type="number" min="0.1" step="0.1" value="\${pregnancy.weight}" id="child_weight" name="weight" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Current Info On Child

													</label>
													<div class="col-md-7">
														<input type="text" name="child_info" value="\${pregnancy.child_info}" id="child_info" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
													</div>
												</div>





												</div>

										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editPregnancyEditModal('\${pregnancy.id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('.selectpicker').selectpicker("refresh")
		mobiscroll.datepicker('.set_date_past', {
			controls: ['calendar'],
			dateFormat: 'YYYY-MM-DD',
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light',
			max: moment(new Date()).format("yyyy-mm-dd")
		});
		$('#edit-pregnancy-modal').modal('toggle');
	}
	function gynaecologyEditModal(gyna)
	{
		$("#gynaecology-modal").html(
			\`<div class="modal fade" id="edit-gynaecology-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Patient Contraception History</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Contraception History</h4></legend>
										
										<form id="edit-gynaecology-form">
											
											<div class="form-body">

												<div class="form-group row">
													<label class="control-label col-md-5">Date of last menstrual period

													</label>
													<div class="input-group col-md-7">
														<input class="form-control set_date_past" value="\${moment(gyna?.date_of_last_menstrual_period).format("YYYY-MM-DD")}" id="date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
														<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Menarche

													</label>
													<div class="col-md-7">
														<input type="text" name="menarche" id="menarche" value="\${gyna?.menarche}" data-required="0" placeholder="Enter mernache" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Menopause

													</label>
													<div class="col-md-7">
														<input type="text" name="menopause" id="menopause" value="\${gyna?.menopause}" data-required="0" placeholder="Enter menopause" class="form-control input-height">
													</div>
												</div>
												<h3 class="bold">Menses</h3>

												<div class="form-group row">
													<label class="control-label col-md-5">Cycle Length (Days)

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" value="\${gyna?.cycle_length}" name="cycle_length" id="cycle_length" data-required="0" placeholder="Enter cycle length" class="form-control input-height">
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Duration of Bleed (Days)

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" value="\${gyna?.duration_of_bleed}" name="duration_of_bleed" id="duration_of_bleed" data-required="0" placeholder="Enter duration of bleed" class="form-control input-height">
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Volume

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="gyna_volume" id="gyna_volume" aria-label="Default select example" data-live-search="false">
															<option value="">Select</option>
															<option value="Spotting" \${gyna?.gyna_volume == 'Spotting'? 'select' : ''}>Spotting</option>
															<option value="Moderate" \${gyna?.gyna_volume == 'Moderate'? 'select' : ''}>Moderate</option>
															<option value="Heavy" \${gyna?.gyna_volume == 'Heavy'? 'select' : ''}>Heavy</option>
															<option value="Clots" \${gyna?.gyna_volume == 'Clots'? 'select' : ''}>Clots</option>
														</SearchableSelectField>

													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Intermenstrual Bleeding

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="intermenstrual_bleeding" id="intermenstrual_bleeding" data-live-search="false">
															<option value="">Select</option>
															<option value="Yes" \${gyna?.intermenstrual_bleeding == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${gyna?.intermenstrual_bleeding == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>

													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Intermenstrual Bleeding Details

													</label>
													<div class="col-md-7">
														<input type="text" name="intermenstrual_bleeding_details" value="\${gyna.intermenstrual_bleeding_details}" id="intermenstrual_bleeding_details" data-required="0" placeholder="Enter intermenstrual bleeding details" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Dysmenorrhoea

													</label>
													<div class="col-md-7">

														<SearchableSelectField class="form-control selectpicker " name="dysmenorrhoea" id="dysmenorrhoea">
															<option value="">Select</option>
															<option value="Yes" \${gyna.dysmenorrhoea == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${gyna.dysmenorrhoea == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Dysmenorrhoea Details

													</label>
													<div class="col-md-7">
														<input type="text" min="0" step="1" value="\${gyna.dysmenorrhoea_details}" name="dysmenorrhoea_details" id="dysmenorrhoea_details" data-required="0" placeholder="Enter Dysmenorrhoea Details" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Post Coital Bleeding

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="post_coital_bleeding" id="post_coital_bleeding">
															<option value="">Select</option>
															<option value="Yes" \${gyna.post_coital_bleeding == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${gyna.post_coital_bleeding == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Post Coital Bleeding Details

													</label>
													<div class="col-md-7">
														<input type="text" name="post_coital_bleeding_details" value="\${gyna.post_coital_bleeding_details}" data-required="0" placeholder="Enter post coital bleeding details" class="form-control input-height">
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Dyspareunia

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="dyspareunia" id="dyspareunia">
															<option value="">Select</option>
															<option value="Yes" \${gyna.dyspareunia == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${gyna.dyspareunia == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Dyspareunia Details

													</label>
													<div class="col-md-7">
														<input type="text" name="dyspareunia_details" value="\${gyna.dyspareunia_details}" id="dyspareunia_details" data-required="0" placeholder="Enter dyspareunia details" class="form-control input-height">
													</div>
												</div>

												<h3 class="bold">Parity</h3>

												<div class="form-group row">
													<label class="control-label col-md-5">Gestational Age at Delivery

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="gestational_age_at_delivery" id="dyspareunia">
															<option value="" selected disabled>Select</option>
															<option value="< 28 weeks" \${gyna.gestational_age_at_delivery == "< 28 weeks"? 'select' : ''} >Less than 28 Weeks</option>
															<option value="28-36" \${gyna.gestational_age_at_delivery == "28-36"? 'select' : ''} >Between 28 and 36</option>
															<option value=">36" \${gyna.gestational_age_at_delivery == ">36"? 'select' : ''} >greater than 36</option>
														</SearchableSelectField>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Outcome

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="outcome" id="outcome">
															<option value="" selected disabled>Select</option>
															<option value="Vaginal Delivery" \${gyna.outcome == "Vaginal Delivery"? 'select' : ''}>Vaginal Delivery</option>
															<option value="CS" \${gyna.outcome == "CS"? 'select' : ''}>CS</option>
															<option value="Spontaneous Abortion" \${gyna.outcome == "Spontaneous Abortion"? 'select' : ''}>Spontaneous Abortion</option>
															<option value="Medical Termination" \${gyna.outcome == "Medical Termination"? 'select' : ''}>Medical Termination</option>
															<option value="Surgical Termination" \${gyna.outcome == "Surgical Termination"? 'select' : ''}>Surgical Termination</option>
														</SearchableSelectField>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Present Condition

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="present_condition" id="present_condition">
															<option value="" selected disabled>Select</option>
															<option value="alive" \${gyna.present_condition == 'alive'? 'select' : ''}>Alive</option>
															<option value="dead" \${gyna.present_condition == 'dead'? 'select' : ''}>Dead</option>
														</SearchableSelectField>
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Number of Lifetime Sexual Partners

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" value="\${gyna.number_of_lifetime_sexual_partners}" name="number_of_lifetime_sexual_partners" id="number_of_lifetime_sexual_partners" data-required="0" placeholder="Enter number of lifetime sexual partners" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Coital Frequency (Days per Week)

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" value="\${gyna.coital_frequency}" name="coital_frequency" id="coital_frequency" data-required="0" placeholder="Enter coital frequency" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Cancer Screening

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="cervical_cancer_screening" id="cervical_cancer_screening">
															<option value="">Select</option>
															<option value="Yes" \${gyna.cervical_cancer_screening == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${gyna.cervical_cancer_screening == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>
													</div>
												</div>




												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Cancer Screening Details

													</label>
													<div class="col-md-7">
														<input type="text" value="\${gyna.cervical_cancer_screening_details}" name="cervical_cancer_screening_details" id="cervical_cancer_screening_details" data-required="0" placeholder="Enter cervical cancer screening details" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Breast Screening

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="breast_screening" id="breast_screening">
															<option value="">Select</option>
															<option value="Yes" \${gyna.breast_screening == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${gyna.breast_screening == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Breast Screening Details

													</label>
													<div class="col-md-7">
														<input type="text" name="breast_screening_details"  value="\${gyna.breast_screening_details}" id="breast_screening_details" data-required="0" placeholder="Enter breast screening details" class="form-control input-height">
													</div>
												</div>




												<div class="form-group row">
													<label class="control-label col-md-5">Previous Gynaecologic Procedures

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="previous_gynaecologic_procedures" id="previous_gynaecologic_procedures">
															<option value="">Select</option>
															<option value="Yes" \${gyna.previous_gynaecologic_procedures == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${gyna.previous_gynaecologic_procedures == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Previous Gynaecologic Procedures Details

													</label>
													<div class="col-md-7">
														<input type="text" name="previous_gynaecologic_procedures_details" value="\${gyna.previous_gynaecologic_procedures_details}" id="previous_gynaecologic_procedures_details" data-required="0" placeholder="Enter previous gynaecologic procedures details" class="form-control input-height">
													</div>
												</div>








											</div>

										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editGynaecologyEditModal('\${gyna.id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('.selectpicker').selectpicker("refresh")
		mobiscroll.datepicker('.set_date_past', {
			controls: ['calendar'],
			dateFormat: 'YYYY-MM-DD',
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light',
			max: moment(new Date()).format("yyyy-mm-dd")
		});
		$('#edit-gynaecology-modal').modal('toggle');
	}
	function obstetricEditModal(obstetric)
	{
		$("#obstetric-modal").html(
			\`<div class="modal fade" id="edit-obstetric-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Patient Obstetric History</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Obstetric History</h4></legend>
										
										<form id="edit-obstetric-form">

											<div class="form-body">

												<div class="form-group row">
													<label class="control-label col-md-5">No. of Pregnancies

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="0" value="\${obstetric.no_of_pregnancies}" name="no_of_pregnancies" id="no_of_pregnancies" data-required="0" placeholder="Enter Number of Pregnancies" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">No. of Births

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="0" value="\${obstetric.no_of_births}" name="no_of_births" id="no_of_births" data-required="0" placeholder="Enter Number of Births" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">No. of Abortions (Spontaneous)

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="0" value="\${obstetric.no_of_abortions_spontaneous}" name="no_of_abortions_spontaneous" id="no_of_abortions_spontaneous" data-required="0" placeholder="Enter Number of Spontaneous Abortions" class="form-control input-height">
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">No. of Abortions (Induced)

													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="0" value="\${obstetric.no_of_abortions_induced}" name="no_of_abortions_induced" id="no_of_abortions_induced" data-required="0" placeholder="Enter Number of Induced Abortions" class="form-control input-height">
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Date of last menstrual period

													</label>
													<div class="input-group col-md-7">
														<input class="form-control set_date_past" value="\${moment(obstetric.date_of_last_menstrual_period).format("YYY-MM-DD")}" id="oh_date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
														<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Date of positive pregnancy test

													</label>
													<div class="input-group col-md-7">
														<input class="form-control set_date_past" value="\${moment(obstetric.date_of_positive_pregnancy_test).format("YYY-MM-DD")}" id="date_of_positive_pregnancy_test" name="date_of_positive_pregnancy_test" size="16" type="text" placeholder="Enter date of positive pregnant test" style="max-height: 35px;" readonly="">
														<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">Confirmatory ultrasound scan

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker " name="confirmatory_ultrasound_scan" id="confirmatory_ultrasound_scan">
															<option value="">Select</option>
															<option value="Yes" \${obstetric.confirmatory_ultrasound_scan == 'Yes'? 'select' : ''}>Yes</option>
															<option value="No" \${obstetric.confirmatory_ultrasound_scan == 'No'? 'select' : ''}>No</option>
														</SearchableSelectField>
													</div>
												</div>




												<div class="form-group row">
													<label class="control-label col-md-5">Date of scan

													</label>
													<div class="input-group col-md-7">
														<input class="form-control set_date_past" value="\${moment(obstetric.date_of_scan).format("YYY-MM-DD")}" id="date_of_scan" name="date_of_scan" size="16" type="text" placeholder="Enter date of scan" style="max-height: 35px;" readonly="">
														<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Current Info On Child

													</label>
													<div class="col-md-7">
														<input type="text" name="child_info" value="\${obstetric.child_info}" id="child_info" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">Gestational age

													</label>
													<div class="col-md-7">
														<input type="text" name="gestational_age" value="\${obstetric.gestational_age}" id="gestational_age" data-required="0" placeholder="Enter gestational age" class="form-control input-height">
													</div>
												</div>



												<div class="form-group row">
													<label class="control-label col-md-5">EDD

													</label>
													<div class="col-md-7">
														<input class="form-control set_date" id="" value="\${moment(obstetric.edd).format("YYY-MM-DD")}" name="edd" size="16" type="text" placeholder="Enter date" style="max-height: 35px;" readonly="">
													</div>
												</div>





											</div>

										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editObstetricEditModal('\${obstetric.id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('.selectpicker').selectpicker("refresh")
		mobiscroll.datepicker('.set_date_past', {
			controls: ['calendar'],
			dateFormat: 'YYYY-MM-DD',
			touchUi: true,
			returnFormat: 'moment',
			theme: 'ios',
			themeVariant: 'light',
			max: moment(new Date()).format("yyyy-mm-dd")
		});
		$('#edit-obstetric-modal').modal('toggle');
	}
	//drawing out social edit modal
	function socialEditModal(social)
	{
		$("#social-modal").html(
			\`<div class="modal fade" id="edit-social-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Patient Social History</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Social History</h4></legend>
										<form id="edit-pshx-form">
											<label for="exampleInputEmail1">Tobacco Intake</label>
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="tobacco_intake" \${social.tobacco_intake == 'Yes' ? "checked" : ''} id="tobacco-intake-1" value="Yes">
												<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
											</div>
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="tobacco_intake" \${social.tobacco_intake != 'Yes' ? "checked" : ''} id="tobacco-intake-2" value="No">
												<label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
											</div><br>
											<div class="form-group">
												<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="tobacco_details" placeholder="Enter Comment" value="\${social.tobacco_details}">
											</div>
											<label for="exampleInputEmail1">Alcohol Intake</label>
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="alchohol_intake" \${social.alchohol_intake == 'Yes' ? "checked" : ''} id="alchohol-intake-1" value="Yes">
												<label class="form-check-label" for="inlineRadio3"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
											</div>
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="alchohol_intake" \${social.alchohol_intake != 'Yes' ? "checked" : ''} id="alchohol-intake-2" value="No">
												<label class="form-check-label" for="inlineRadio4"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
											</div>
											<div class="form-group">
												<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Comment" name="alcohol_details" value="\${social.alcohol_details}">
											</div>
										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editSocialEditModal('\${social.id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('#edit-social-modal').modal('toggle');
		if(social.tobacco_intake == 'Yes'){
			$("#tobacco-intake-1").attr('checked', 'checked');
		}else{
			$("#tobacco-intake-2").attr('checked', 'checked');
		}

		if(social.alchohol_intake == 'Yes'){
			$("#alchohol-intake-1").attr('checked', 'checked');
		}else{
			$("#alchohol-intake-2").attr('checked', 'checked');
		}

	}

	//drawing out odqs edit modal
	function odqsEditModal(odqs, info)
	{
		$("#odqs-modal").html(
			\`<div class="modal fade" id="edit-odqs-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-lg  modal-dialog-centered" role="document" style="min-width:80vw">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme1 -->" style="min-width:80vw">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit ODQs</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<div class="borderBox light bordered col-md-12">
										<div class="borderBox-title tabbable-line" id="odq-div">
											<ul class="nav nav-tabs edit-odq-category">

											</ul>
										</div>
										<div class="borderBox-body">
											<form class="tab-content edit-odq-tab-content" id="edit-odq-form">
												
											</form>
										</div>
									</div>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme1 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editOdqsEditModal('\${info}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getOdqsWithCategories' ] ); -->",
            cache: false,
            success: function (response){
				let res = JSON.parse(response);	
				let odq_severities = JSON.stringify(res.odq_severities)
				let odq_durations = JSON.stringify(res.odq_durations)
				for(let i in res.odq_categories){
					tab_id = '#' + res.odq_categories[i].id + 'tab-edit'
					tab_content_id = res.odq_categories[i].id + 'tab-edit'
					odq_category = res.odq_categories[i].name
					odq_category_class = 'edit-nav-item-' + res.odq_categories[i].id
					odq_card_body_class = 'edit-odq-card-body' + res.odq_categories[i].id
					//checking if tab categories have been appended
					if(!$(".edit-odq-category").find('.' + odq_category_class).length) {
						$(".edit-odq-category").append(\`<li class="nav-item \${odq_category_class}" ><a href="\${tab_id}" onclick="console.log('clicked \${tab_id}')" class="nav-link" data-toggle="tab"> \${odq_category} </a></li>\`)
					}
					//populating the tab content
					tab_content = "<div class='tab-pane' id='"+tab_content_id+"'><div class='card-body "+odq_card_body_class+"'></div></div>"
					$(".edit-odq-tab-content").append(tab_content)
					odqs = res.odq_categories[i].odqs
					$("."+odq_card_body_class).empty()
					for(let j in odqs){
						if(res.odq_categories[i].id == odqs[j].odq_category_id){
							//population of odqs based on respective categories
							comment_span_id = 'edit-span' + odqs[j].id
							raw_comment_span_id = 'edit-span' + odqs[j].id
							comment_span_id = JSON.stringify(comment_span_id)
							tab_content_fields = "<div class='form-check form-switch'><input class='form-check-input' type='checkbox' id='flexSwitchCheckDefault' value='"+odqs[j].id+"' name='odq_value_"+odqs[j].id+"' onchange='commentsFieldDisplay(this,"+comment_span_id+","+odq_severities+","+odq_durations+", "+odqs[j].id+")'><label class='form-check-label' for='flexSwitchCheckDefault'>"+odqs[j].name+"</label><span class='ml-3' id='"+raw_comment_span_id+"'></span></div>"
							$("."+odq_card_body_class).append(tab_content_fields)
						}
					}
				}
				//triggering a click for the first ODQ category
				$(".nav-item1").find('a').click()
            }
        });
		$('#edit-odqs-modal').modal('toggle');
	}

	//drawing out comorbidity edit modal
	function comorbidityEditModal(comorbidity, note_id)
	{
		$("#comorbidity-modal").html(
			\`<div class="modal fade" id="edit-comorbidity-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Comorbidity</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<form id="edit-comorbidity-form">
										<fieldset class="border p-2">
											<legend class="text-primary"><h4>Comorbidity</h4></legend>
											<div class="form-group">
												<textarea name="comorbidity" id="" cols="55" rows="3">\${comorbidity}</textarea>
											</div>
										</fieldset>
									</form>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editComorbidityEditModal('\${note_id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
			// \`<div class="modal fade" id="edit-comorbidity-modal" tabindex="-1" aria-hidden="true">
			// 	<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
			// 		<div class="modal-content">
			// 			<div class="container px-0 border border-2 border-</?=$theme2?>">
			// 				<div class="container-fluid pr-0 bg-danger">
			// 					<div class="d-flex align-items-center justify-content-between">
			// 						<h4 class="text-slate-900 my-0">Edit Comorbidity</h4>
			// 						<div>
			// 							<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
			// 						</div>
			// 					</div>
			// 				</div>
			// 				<div class="container bg-white p-2">
			// 					<div class="container-fluid">
			// 						<div class="row mb-3 mt-4">
			// 						<div class="col-md-12">
			// 						<fieldset class="border p-2">
			// 							<legend class="text-primary"><h4>Comorbidity</h4></legend>
			// 							<form id="edit-comorbidity-form">
			// 								<div class="form-group">
			// 									<label for="exampleInputEmail1">Past Illness</label>
			// 									<SearchableSelectField class="form-control" id="pastIllnessSelect" name="comorbidity_id" aria-describedby="emailHelp" placeholder="Enter description" value="\${comorbidity.description}">
			// 									</SearchableSelectField>
			// 								</div>
			// 								<div class="form-group">
			// 									<label for="exampleInputEmail1">Description</label>
			// 									<input type="text" class="form-control" id="exampleInputEmail1" name="description" aria-describedby="emailHelp" placeholder="Enter description" value="\${comorbidity.description}">
			// 								</div>
			// 								<div class="form-group">
			// 									<label for="exampleInputEmail1">Comment</label>
			// 									<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="comment" placeholder="Enter comment" value="\${comorbidity.comment || ''}">
			// 								</div>
			// 								<div class="form-group">
			// 									<label for="exampleInputEmail1">Illness Period</label>
			// 									<input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="illness_period" placeholder="\${moment(comorbidity.illness_period).format("DD-MM-YYYY")}" value="\${moment(comorbidity.illness_period).format("YYYY-MM-DD")}">
			// 								</div>
			// 							</form>
			// 						</fieldset>
			// 						</div>
			// 						</div>
			// 					</div>
			// 				</div>
			// 				<div class="container-fluid pr-0 bg-</?=$theme2?>">
			// 					<div class="d-flex align-items-center py-1 justify-content-end">
			// 						<button onclick="editComorbidityEditModal(\${comorbidity.id})" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
			// 						<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
			// 					</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>\`
		)
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getPastIllnesses' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				$('#pastIllnessSelect').empty()
				$.each(res, function(key, value) {
					$('#pastIllnessSelect').append($('<option ' + (comorbidity.comorbidity_id == res[key].id ? 'selected' : '') + 'data-name="'+res[key].name+'" value="'+res[key].id+'"></option>').val(res[key].id).html(res[key].name));  
				});	
				$("#pastIllnessSelect").selectpicker("refresh");
            }
        });
		$('#edit-comorbidity-modal').modal('toggle');
	}

	//drawing out allergies edit modal
	function allergiesEditModal(allergies, info)
	{
		$("#allergies-modal").html(
			\`<div class="modal fade" id="edit-allergy-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Allergies</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Allergies</h4></legend>
										<form id="edit-allergies-form">
											<div class="form-group row">
												<label class="control-label col-md-3">Category

												</label>
												<div class="col-md-9" id="edit-allergy-category-div">
												</div>
											</div>
											<div class="form-group row">
												<label class="control-label col-md-3">Substance
												</label>
												<div class="col-md-9">
													<SearchableSelectField class="form-control selectpicker" name="" id="edit_encounter_allergy_id" data-live-search="true" onchange="passSelectedAllergySUbstanceEdit(this)">
														<option value="">Select...</option>
													</SearchableSelectField>
												</div>
											</div>
											<div class="form-group row">
												<label class="control-label col-md-3">Selected Substances
												</label>
												<div class="col-md-9">
													<SearchableSelectField class="form-control selectpicker" name="encounter_allergy_ids[]" id="edit_encounter_allergy_ids" data-live-search="true" multiple>
													</SearchableSelectField>
												</div>
											</div>
										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editAllergiesEditModal('\${info}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('#edit-allergy-modal').modal('toggle');
		populateAllergyCategories(global_allergy_category_obj.data, 'edit-allergy-category-div')
		$.each(allergies, function(key, value) {
			$('#edit_encounter_allergy_ids').append($('<option selected data-name="'+allergies[key].encounter_allergy?.name+'"></option>').val(allergies[key].encounter_allergy.id).html(allergies[key].encounter_allergy?.name));  
			$("#edit_encounter_allergy_ids").selectpicker("refresh");
		});	
	}
	function calculationBishopScore() {
		let length = parseInt($('#obsteric_pelvis_length').val().toLowerCase())
		let dilation = $('#obsteric_pelvis_dilation').val() ? parseInt($('#obsteric_pelvis_dilation').val()) : ''
		let consistency = $('#obsteric_pelvis_consistency').val() ? $('#obsteric_pelvis_consistency').val().toLowerCase() : ''
		let position = $('#obsteric_pelvis_position').val() ? $('#obsteric_pelvis_position').val().toLowerCase() : ''
		let station = parseInt($('#obsteric_pelvis_station').val())

		let bishopScore = 0;
		let lengthScore = 0;
		let dilationScore = 0;
		let consistencyScore = 0;
		let stationScore = 0;
		let positionScore = 0;
		if (length) {
			if (length > 2) {
				lengthScore = 0
			} else if (length >= 1 && length <= 2) {
				lengthScore = 1
			} else if (length >= 0.5 && length < 1) {
				lengthScore = 2
			} else if (length < 0.5) {
				lengthScore = 3
			}
		}
		if (station) {
			if (station == -3) {
				stationScore = 0
			} else if (station == -2) {
				stationScore = 1
			} else if (station == -1 || station == 0) {
				stationScore = 2
			} else if (station > 1) {
				stationScore = 3
			}
		}
		if (dilation) {
			if (dilation == 0) {
				dilationScore = 0
			} else if (dilation == 1 || dilation == 2) {
				dilationScore = 1
			} else if (dilation == 3 || dilation == 4) {
				dilationScore = 2
			} else if (dilation > 5) {
				dilationScore = 3
			}
		}
		if (consistency) {
			if (consistency == 'firm') {
				consistencyScore = 0
			} else if (consistency == 'medium') {
				consistencyScore = 1
			} else if (consistency == 'soft') {
				consistencyScore = 2
			}
		}
		if (position) {
			if (position == 'posterior') {
				positionScore = 0
			} else if (position == 'central') {
				positionScore = 1
			} else if (position == 'anterior') {
				positionScore = 2
			}
		}

		bishopScore = lengthScore + dilationScore + consistencyScore + stationScore + positionScore
		$('#obsteric_pelvis_bishop_score').val(bishopScore)
	}
	function generateSystemReviewBody(info, id)
	{
		let hydration = {
			'No Dehydration': 'No Dehydration',
			'Mild Dehydration': 'Mild Dehydration',
			'Moderate Dehydration': 'Moderate Dehydration',
			'Severe Dehydration': 'Severe Dehydration'
		};
		let hydrationOptions = []
		for(const i in hydration) {
			hydrationOptions.push(\`<option value='\${i}' \${info?.general?.hydration == i ? "selected" : ''}>\${hydration[i]}</option>\`)
		}
		let mental_state = {
			'Oriented': 'Oriented',
			'Confused': 'Confused',
			'Anxious/Irritable': 'Anxious/Irritable',
			'Lethargic': 'Lethargic',
			'Drowsy': 'Drowsy',
			'Comatose': 'Comatose'
		};
		let mental_stateOptions = []
		for(const i in mental_state) {
			mental_stateOptions.push(\`<option value='\${i}' \${info?.general?.mental_state == i ? "selected" : ''} >\${mental_state[i]}</option>\`)
		}
		let constitution = {
			'Fit': 'Fit',
			'Unfit Looking': 'Unfit Looking',
			'Anxious/Irritable': 'Anxious/Irritable',
			'Muscular': 'Muscular',
			'Obese': 'Obese',
			'Weight Loss': 'Weight Loss',
			'Thin': 'Thin'
		};
		let constitutionOptions = []
		for(const i in constitution) {
			constitutionOptions.push(\`<option value='\${i}' \${info?.general?.constitution == i ? "selected" : ''} >\${constitution[i]}</option>\`)
		}
		let foetalLie = {
			'Longitudinal': 'Longitudinal',
			'Oblique': 'Oblique',
			'Transverse': 'Transverse',
		};
		let presentation = {
			'Cephalic': 'Cephalic',
			'Breech': 'Breech',
			'Other': 'Other',
		};
		let membrane = {
			'intact': 'intact',
			'intact and bulding': 'intact and bulding',
			'ruptured': 'ruptured',
		};
		let amniotic = {
			'clear': 'clear',
			'G1 meconium': 'G1 meconium',
			'G2 meconium': 'G2 meconium',
			'G3 meconium': 'G3 meconium',
			'Blood Stained': 'Blood Stained',
		};
		let moulding = {
			'0': '0',
			'1': '1',
			'2': '2',
			'3': '3',
		};
		let descent = {
			'1/5': '1/5',
			'2/5': '2/5',
			'3/5': '3/5',
			'4/5': '4/5',
			'5/5': '5/5',
		};
		let backOfBaby = {
			'To Maternal Left': 'To Maternal Left',
			'To Maternal Right': 'To Maternal Right',
		};
		let dilation = {
			'0':'0',
			'1':'1',
			'2':'2',
			'3':'3',
			'4':'4',
			'5':'5',
			'6':'6',
			'7':'7',
			'8':'8',
			'9':'9',
			'10':'10',
		};
		let consistency = {
			'firm': 'firm',
			'medium': 'medium',
			'soft': 'soft',
		};
		let position = {
			'posterior': 'posterior',
			'central': 'central',
			'anterior': 'anterior',
		};
		let station = {
			'-3':'-3',
			'-2':'-2',
			'-1':'-1',
			'0':'0',
			'1':'1',
			'2':'2',
			'3':'3',
		};
		let oedema = {
			'None': 'None',
			'Dependent': 'Dependent',
			'Generalized': 'Generalized'
		};
		let oedemaOptions = []
		for(const i in oedema) {
			oedemaOptions.push(\`<option value='\${i}' \${info?.general?.oedema == i ? "selected" : ''}>\${oedema[i]}</option>\`)
		}
		let YesNo = {
			'Yes': 'Yes',
			'No': 'No'
		};
		let YesNoOptions = []
		for(const i in YesNo) {
			YesNoOptions.push(\`<option value='\${i}'>\${YesNo[i]}</option>\`)
		}
		let foetalLieOptions = []
		for(const i in foetalLie) {
			foetalLieOptions.push(\`<option value='\${foetalLie[i]}' \${info?.obsteric_abdomen?.foetal_lie == i ? "selected" : ''}>\${foetalLie[i]}</option>\`)
		}
		let presentationOptions = []
		for(const i in presentation) {
			presentationOptions.push(\`<option value='\${presentation[i]}' \${info?.obsteric_abdomen?.presentation == i ? "selected" : ''}>\${presentation[i]}</option>\`)
		}
		let descentOptions = []
		for(const i in descent) {
			descentOptions.push(\`<option value='\${descent[i]}' \${info?.obsteric_abdomen?.descent == i ? "selected" : ''}>\${descent[i]}</option>\`)
		}
		let backOfBabyOptions = []
		for(const i in backOfBaby) {
			backOfBabyOptions.push(\`<option value='\${backOfBaby[i]}' \${info?.obsteric_abdomen?.back_of_baby == i ? "selected" : ''}>\${backOfBaby[i]}</option>\`)
		}
		let dilationOptions = []
		for(const i in dilation) {
			dilationOptions.push(\`<option value='\${dilation[i]}' \${info?.obsteric_pelvis?.dilation == i ? "selected" : ''}>\${dilation[i]}</option>\`)
		}
		let consistencyOptions = []
		for(const i in consistency) {
			consistencyOptions.push(\`<option value='\${consistency[i]}' \${info?.obsteric_pelvis?.consistency == i ? "selected" : ''}>\${consistency[i]}</option>\`)
		}
		let positionOptions = []
		for(const i in position) {
			positionOptions.push(\`<option value='\${position[i]}' \${info?.obsteric_pelvis?.position_bishop == i ? "selected" : ''}>\${position[i]}</option>\`)
		}
		let stationOptions = []
		for(const i in station) {
			stationOptions.push(\`<option value='\${station[i]}' \${info?.obsteric_pelvis?.station == i ? "selected" : ''}>\${station[i]}</option>\`)
		}
		let membranesOptions = []
		for(const i in membrane) {
			membranesOptions.push(\`<option value='\${membrane[i]}' \${info?.obsteric_pelvis?.membranes == i ? "selected" : ''}>\${membrane[i]}</option>\`)
		}
		let amnioticOptions = []
		for(const i in amniotic) {
			amnioticOptions.push(\`<option value='\${amniotic[i]}' \${info?.obsteric_pelvis?.amniotic == i ? "selected" : ''}>\${amniotic[i]}</option>\`)
		}
		let mouldingOptions = []
		for(const i in moulding) {
			mouldingOptions.push(\`<option value='\${moulding[i]}' \${info?.obsteric_pelvis?.moulding == i ? "selected" : ''}>\${moulding[i]}</option>\`)
		}
		<!-- php: $YesNo = [ 'Yes' => 'Yes', 'No' => 'No' ]; -->
		return\`
			<div class="card-body">
				<div class="row">
					<div class="borderBox light bordered col-md-12">
						<div class="borderBox-title tabbable-line">

							<ul class="nav nav-tabs" style="float:left">
								<!-- php: if (!$continuousCare): -->

									<li class="nav-item ">
										<a href="#gene_tab\${id}" class="active" data-toggle="tab"> General </a>
									</li>
									<li class="nav-item ">
										<a href="#eyes_tab\${id}" class="" data-toggle="tab"> Eyes </a>
									</li>
									<li class="nav-item ">
										<a href="#nose_tab\${id}" class="" data-toggle="tab"> Nose </a>
									</li>
									<li class="nav-item ">
										<a href="#mouth_tab\${id}" class="" data-toggle="tab"> Mouth </a>
									</li>
									<li class="nav-item ">
										<a href="#neck_tab\${id}" class="" data-toggle="tab"> Neck </a>
									</li>
									<li class="nav-item ">
										<a href="#groin_tab\${id}" class="" data-toggle="tab"> Groin </a>
									</li>
									<li class="nav-item ">
										<a href="#hands_tab\${id}" class="" data-toggle="tab"> Hands </a>
									</li>
									<li class="nav-item ">
										<a href="#breast_tab\${id}" class="" data-toggle="tab"> Breast </a>
									</li>
									<li class="nav-item ">
										<a href="#cardio_tab\${id}" class="" data-toggle="tab"> Cardiovascular </a>
									</li>
									<li class="nav-item">
										<a href="#res_tab\${id}" data-toggle="tab"> Respiratory </a>
									</li>
									<li class="nav-item">
										<a href="#abdomen_tab\${id}" data-toggle="tab"> Abdomen </a>
									</li>
									<li class="nav-item">
										<a href="#extermity_tab\${id}" data-toggle="tab"> Extremity </a>
									</li>
									<li class="nav-item">
										<a href="#nerological_tab\${id}" data-toggle="tab"> Neurological </a>
									</li>
								<!-- php: endif; -->
								<li class="nav-item">
									<a href="#musco_skeletal_tab\${id}" data-toggle="tab"> MUSCULOSKELETAL SYSTEM </a>
								</li>
								<!-- php: if (!$continuousCare): -->
									<!-- php: if ($patient->gender_id == 2 && $patient_age > 12): -->
										<li class="nav-item">
											<a href="#gynaecologic_tab\${id}" data-toggle="tab"> Gynaecologic exam </a>
										</li>
										<li class="nav-item">
											<a href="#obstetric_abdomen_tab\${id}" data-toggle="tab"> Obstetric exam (Abdomen)  </a>
										</li>
										<li class="nav-item">
											<a href="#obstetric_pelvic_tab\${id}" data-toggle="tab"> Obstetric exam (Pelvic) </a>
										</li>
									<!-- php: endif; -->
								<!-- php: endif -->
							</ul>
						</div>
						<div class="borderBox-body">
							<div class="tab-content">
								<!-- php: if (!$continuousCare): -->

								<div class="tab-pane <!-- php: = (!$continuousCare) ? 'active show' : '' -->" id="gene_tab\${id}">
									<form id="gene_tab_form\${id}">
									<!-- <form id='addGeneralExamForm'> -->
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Temperature

												</label>
												<div class="col-md-7">
													<input type="number" name="temperature" id="general_exam_temperature" value="\${info?.general?.temperature || ''}" placeholder="Enter temperatue" class="form-control input-height" />
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Pulse

												</label>
												<div class="col-md-7">
													<input type="number" name="pulse" id="general_exam_pulse" placeholder="Enter pulse" value="\${info?.general?.pulse || ''}" class="form-control input-height" />
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Respiratory Rate

												</label>
												<div class="col-md-7">
													<input type="number" name="respiratory_rate" id="general_exam_respiratory_rate" value="\${info?.general?.respiratory_rate || ''}" placeholder="Enter respiratory rate" class="form-control input-height" />
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Hydration

												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control system_review_select" name="hydration"  id="general_exam_hydration">
														\${hydrationOptions.join("")}
													</SearchableSelectField>
												</div>
											</div>



											<div class="form-group row">
												<label class="control-label col-md-5">Distress

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="distress" id="inlineRadio1" \${info?.general?.distress == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Distress Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.general?.distress_details || ''}" name="distress_details" id="distress_details" data-required="0" placeholder="Enter distress details" class="form-control input-height" />
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Mental State

												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control system_review_select" name="mental_state" id="general_exam_mental_state">
														\${mental_stateOptions.join("")}
													</SearchableSelectField>
						
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Constitution

												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control system_review_select" name="constitution" id="general_exam_constitution">
														\${constitutionOptions.join("")}
													</SearchableSelectField>
												</div>
											</div>
											<h4 class="bold mb-2">Skin and Mucosae</h4>

											<div class="form-group row">
												<label class="control-label col-md-5">Pallor

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="pallor" id="inlineRadio1" \${info?.general?.pallor == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Pallor Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.general?.pallor_details || ''}" name="pallor_details" id="pallor_details" data-required="0" placeholder="pallor details" class="form-control input-height" />
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Jaundice

												</label>
												<div class="col-md-7">

													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="jaundice" id="inlineRadio1" \${info?.general?.jaundice == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Jaundice Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.general?.jaundice_details || ''}" name="jaundice_details" id="jaundice_details" data-required="0" placeholder="Jaundice Details" class="form-control input-height" />
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Cyanosis

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="cyanosis" id="inlineRadio1" \${info?.general?.cyanosis == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Cyanosis Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.general?.cyanosis_details || ''}" name="cyanosis_details" id="cyanosis_details" data-required="0" placeholder="Cyanosis Details" class="form-control input-height" />
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Oedema

												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control system_review_select" name="oedema" id="general_exam_constitution">
														\${oedemaOptions.join("")}
													</SearchableSelectField>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Environment

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.general?.environment || ''}" name="environment" id="environment" data-required="0" placeholder="Enter environment" class="form-control input-height" />
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Other Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.general?.other_findings || ''}" name="other_findings" id="other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height" />
												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="tab-pane" id="eyes_tab\${id}">
									<form id="eyes_tab_form\${id}">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Sclera Colour

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.eye?.sclera_colour || ''}" name="sclera_colour" id="sclera_colour" data-required="0" placeholder="Enter sclera colour" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Conjunctiva

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="conjunctiva" id="eye_exam_conjunctiva">
														<option value="">Select...</option>
														<option value="Normal" \${info?.eye?.conjunctiva == "Normal" ? "selected" : ""}>Normal</option>
														<option value="Pale" \${info?.eye?.conjunctiva == "Pale" ? "selected" : ""}>Pale</option>
														<option value="Congested" \${info?.eye?.conjunctiva == "Congested" ? "selected" : ""}>Congested</option>
													</SearchableSelectField>

												</div>
											</div>



											<div class="form-group row">
												<label class="control-label col-md-5">Discharge

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="discharge" id="inlineRadio1" \${info?.general?.discharge == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Discharge Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.eye?.discharge_details || ''}" name="discharge_details" id="discharge_details" data-required="0" placeholder="Enter tremors details" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Strabismus (squint)

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="strabismus" id="inlineRadio1" \${info?.eye?.strabismus == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Strabismus (squint) Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.eye?.strabismus_details || ''}" name="strabismus_details" id="strabismus_details" data-required="0" placeholder="Strabismus (squint) details" class="form-control input-height">
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Exophthalmos

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="exophthalmos" id="inlineRadio1" \${info?.eye?.exophthalmos == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Exophthalmos Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.eye?.exophthalmos_details || ''}" name="exophthalmos_details" id="exophthalmos_details" data-required="0" placeholder="exophthalmos" class="form-control input-height">
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Fundoscopy

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.eye?.fundoscopy || ''}" name="fundoscopy" id="fundoscopy" data-required="0" placeholder="Enter fundoscopy" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.eye?.other_findings || ''}" name="other_findings" id="other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
												</div>
											</div>




										</div>
									</form>
								</div>
								<div class="tab-pane" id="nose_tab\${id}">
									<form id="nose_tab_form\${id}">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Flaring alae nasae

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="flaring_alae_nasae" id="inlineRadio1" \${info?.nose?.flaring_alae_nasae == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<!-- nose_exam_nasae -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Discharge

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="discharge" id="inlineRadio1 \${info?.nose?.discharge == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<!-- nose_exam_discharge -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Discharge Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.nose?.discharge_details || ''}" name="discharge_details" id="nose_discharge_details" data-required="0" placeholder="Enter discharge details" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Paranasal Tenderness

												</label>
												<div class="col-md-7">

													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="paranasal_tenderness"  \${info?.nose?.paranasal_tenderness == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
															<!-- paranasal_tenderness -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Paranasal Tenderness Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.nose?.paranasal_tenderness_details || ''}" name="paranasal_tenderness_details" id="paranasal_tenderness_details" data-required="0" placeholder="Enter paranasal tenderness details" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.nose?.other_findings || ''}" name="other_findings" id="nose_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
												</div>
											</div>

										</div>
									</form>
								</div>
								<div class="tab-pane" id="mouth_tab\${id}">
									<form id="mouth_tab_form">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Lips

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="lips" id="lips">
														<option value="">Select...</option>
														<option value="Normal" \${info?.mouth?.lips == "Normal" ? "selected" : ""}>Normal</option>
														<option value="Fissuring" \${info?.mouth?.lips == "Fissuring" ? "selected" : ""}>Fissuring</option>
														<option value="Discharge" \${info?.mouth?.lips == "Discharge" ? "selected" : ""}>Discharge</option>
														<option value="Cheilitis" \${info?.mouth?.lips == "Cheilitis" ? "selected" : ""}>Cheilitis</option>
													</SearchableSelectField>

												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Tongue

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.mouth?.tongue || ''}" name="tongue" id="tongue" data-required="0" placeholder="Enter tongue" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Teeth

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.mouth?.teeth || ''}" name="teeth" id="teeth" data-required="0" placeholder="Enter teeth" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Gums

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.mouth?.gums || ''}" name="gums" id="gums" data-required="0" placeholder="Enter gum" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Pharynx

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.mouth?.pharynx || ''}" name="pharynx" id="pharynx" data-required="0" placeholder="Enter pharynx" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Signifcant Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.mouth?.other_significant_findings || ''}" name="other_significant_findings" id="other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height">
												</div>
											</div>



										</div>
									</form>
								</div>
								<div class="tab-pane" id="neck_tab\${id}">
									<form id="neck_tab_form\${id}">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Lymph Nodes

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.neck?.lymph_node || ''}" name="lymph_node" id="neck_exam_lymph_node" data-required="0" placeholder="Enter lymph nodes" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Thyroid Gland

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.neck?.thyroid_gland || ''}" name="thyroid_gland" id="neck_exam_thyroid_gland" data-required="0" placeholder="Enter thyroid gland" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Signifcant Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.neck?.other_significant_findings || ''}" id="neck_exam_other_significant_findings" name="other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height">
												</div>
											</div>

										</div>
									</form>
								</div>
								<div class="tab-pane" id="groin_tab\${id}">
									<form id="groin_tab_form\${id}">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Lymph Nodes

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.groin?.lymph_node || ''}" name="lymph_node" id="groin_exam_lymph_node" data-required="0" placeholder="Enter lymph nodes" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Signifcant Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.groin?.other_significant_findings || ''}" name="other_significant_findings" id="groin_exam_other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height">
												</div>
											</div>

										</div>
									</form>
								</div>
								<div class="tab-pane" id="hands_tab\${id}">
									<form id="hands_tab_form\${id}">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Clubbing

												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control system_review_select" name="clubbing" id="clubbing">
														<option value="No Clubbing" \${info?.hand?.clubbing == "No Clubbing" ? "selected" : ""}>No Clubbing</option>
														<option value="Stage 1" \${info?.hand?.clubbing == "Stage 1" ? "selected" : ""}>Stage 1</option>
														<option value="Stage 2" \${info?.hand?.clubbing == "Stage 2" ? "selected" : ""}>Stage 2</option>
														<option value="Stage 3" \${info?.hand?.clubbing == "Stage 3" ? "selected" : ""}>Stage 3</option>
														<option value="Stage 4" \${info?.hand?.clubbing == "Stage 4" ? "selected" : ""}>Stage 4</option>
													</SearchableSelectField>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Tremors

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="tremors" id="inlineRadio1" \${info?.hand?.tremors == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<!-- tremors -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>
											<div class="form-group row">
												<label class="control-label col-md-5">Tremor Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.hand?.tremor_details || ''}" name="tremor_details" id="hands_exam_tremor_details" data-required="0" placeholder="Enter Tremor Details" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<label class="control-label col-md-5">Nails

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.hand?.nails || ''}" name="nails" id="hands_exam_nails" data-required="0" placeholder="Enter Nails" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<label class="control-label col-md-5">Palms

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.hand?.palms || ''}" name="Palms" id="hands_exam_Palms" data-required="0" placeholder="Enter Palms details" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<label class="control-label col-md-5">Joints

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.hand?.joints || ''}" name="joints" id="hands_exam_joints" data-required="0" placeholder="Enter Joints details" class="form-control input-height">
												</div>
											</div>
											<div class="form-group row">
												<label class="control-label col-md-5">Other Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.hand?.other_significant_findings || ''}" name="other_significant_findings" id="other_significant_findings" data-required="0" placeholder="Enter other Findings" class="form-control input-height">
												</div>
											</div>



										</div>
									</form>
								</div>
								<div class="tab-pane" id="breast_tab\${id}">
									<form id="breast_tab_form\${id}">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Inspection

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.breast?.inspection || ''}" name="inspection" id="inspection" data-required="0" placeholder="Enter inspection" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Palpation

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.breast?.palpation || ''}" name="palpation" id="palpation" data-required="0" placeholder="Enter palpation" class="form-control input-height">
												</div>
											</div>

										</div>
									</form>
								</div>
								<div class="tab-pane" id="cardio_tab\${id}">
									<form id="cardio_tab_form\${id}">
										<div class="form-body">
											<h3 class="bold">Pulse</h3>

											<div class="form-group row">
												<label class="control-label col-md-5">Rate

												</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.rate || ''}" name="rate" id="cardio_exam_rate" data-required="0" placeholder="Enter rate" class="form-control input-height">
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Rhythm

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="rhythm" id="cardio_exam_rhythm">
														<option value="">Select...</option>
														<option value="regular" \${info?.cardio?.rhythm == "regular" ? "selected" : ""}>regular</option>
														<option value="regularly irregular" \${info?.cardio?.rhythm == "regularly irregular" ? "selected" : ""}>regularly irregular</option>
														<option value="irregularly irregular" \${info?.cardio?.rhythm == "irregularly irregular" ? "selected" : ""}>irregularly irregular</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Volume

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="volume" id="cardio_exam_volume">
														<option value="">Select...</option>
														<option value="normal" \${info?.cardio?.volume == "normal" ? "selected" : ""} >normal</option>
														<option value="large" \${info?.cardio?.volume == "large" ? "selected" : ""} >large</option>
														<option value="small" \${info?.cardio?.volume == "small" ? "selected" : ""} >small</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Character

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="characteristics" id="cardio_exam_character">
														<option value="">Select...</option>
														<option value=""></option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Vessel Walls

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="vessel_walls" id="cardio_exam_vessel_walls">
														<option value="">Select...</option>
														<option value="normal" \${info?.cardio?.vessel_walls == "normal" ? "selected" : ""}>Normal</option>
														<option value="Impalpable" \${info?.cardio?.vessel_walls == "Impalpable" ? "selected" : ""}>Impalpable</option>
														<option value="hard" \${info?.cardio?.vessel_walls == "hard" ? "selected" : ""}>Hard</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Radio-Femoral Delay

												</label>
												<div class="col-md-7">

													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="radio_femoral_delay" id="inlineRadio1" \${info?.cardio?.radio_femoral_delay == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<!-- cardio_exam_radio_femoral_delay -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Blood Pressure

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.blood_pressure || ''}" name="blood_pressure" id="cardio_exam_blood_pressure" data-required="0" placeholder="Enter blood pressure" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Posture

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="posture" id="cardio_exam_posture">
														<option value="">Select...</option>
														<option value="supine" \${info?.cardio?.posture == "supine" ? "selected" : ""}>supine</option>
														<option value="sitting" \${info?.cardio?.posture == "sitting" ? "selected" : ""}>sitting</option>
														<option value="standing" \${info?.cardio?.posture == "standing" ? "selected" : ""}>standing</option>
														<option value="semi-reclining (45 degrees)" \${info?.cardio?.posture == "semi-reclining (45 degrees)" ? "selected" : ""}>semi-reclining(45 degrees)</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Jugular Venous Pressure

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.jugular_venous_pressure || ''}" name="jugular_venous_pressure" id="cardio_exam_jugular_venous_pressure" data-required="0" placeholder="Enter jugular venous pressure" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Variscosities

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.variscosities || ''}" name="variscosities" id="cardio_exam_variscosities" data-required="0" placeholder="Enter variscosities" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Oedema Heart

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="oedema_heart" id="cardio_exam_oedema_heart">
														<option value="">Select...</option>
														<option value="none" \${info?.cardio?.oedema_heart == "none" ? "selected" : ""}>none</option>
														<option value="non-pitting" \${info?.cardio?.oedema_heart == "none-pitting" ? "selected" : ""}>none-pitting</option>
														<option value="pitting" \${info?.cardio?.oedema_heart == "pitting" ? "selected" : ""}>pitting</option>
														<option value="generalised" \${info?.cardio?.oedema_heart == "generalised" ? "selected" : ""}>generalised</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Oedema Heart Comment

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.oedema_heart_comment || ''}" name="oedema_heart_comment" id="cardio_exam_oedema_heart_comment" data-required="0" placeholder="Enter oedema heart comments" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Dyspnoea

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="dyspnoea" id="cardio_exam_dyspnoea">
														<option value="">Select...</option>
														<option value="at rest" \${info?.cardio?.dyspnoea == "at rest" ? "selected" : ""}>at rest</option>
														<option value="with ordinary activities" \${info?.cardio?.dyspnoea == "with ordinary activities" ? "selected" : ""}>with ordinary activities</option>
														<option value="with mild exertion" \${info?.cardio?.dyspnoea == "with mild exertion" ? "selected" : ""}>with mild exertion</option>
														<option value="none">none</option \${info?.cardio?.dyspnoea == "none" ? "selected" : ""}>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Chest

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="chest" id="cardio_exam_chest">
														<option value="">Select...</option>
														<option value="normal" \${info?.cardio?.chest == "normal" ? "selected" : ""}>normal</option>
														<option value="pigeon chest" \${info?.cardio?.chest == "pigeon chest" ? "selected" : ""}>pigeon chest</option>
														<option value="funnel chest" \${info?.cardio?.chest == "funnel chest" ? "selected" : ""}>funnel chest</option>
														<option value="kyphoscoliosis" \${info?.cardio?.chest == "kyphoscoliosis" ? "selected" : ""}>kyphoscoliosis</option>
														<option value="other" \${info?.cardio?.chest == "other" ? "selected" : ""}>other</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Apex beat Location

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.apex_beat_location || ''}" name="apex_beat_location" id="cardio_exam_apex_beat_location" data-required="0" placeholder="Enter apex beat location" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Percussion

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.percussion || ''}" name="percussion" id="cardio_exam_percussion" data-required="0" placeholder="Enter percussion" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">First Heart Sound

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.first_heart_sound || ''}" name="first_heart_sound" id="cardio_exam_first_heart_sound" data-required="0" placeholder="Enter first heart sound" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Second Heart Sound

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.second_heart_sound || ''}" name="second_heart_sound" id="cardio_exam_second_heart_sound" data-required="0" placeholder="Enter second heart sound" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Murmurs and Added Sounds

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.murmurs_and_added_sounds || ''}" name="murmurs_and_added_sounds" id="cardio_exam_murmurs_and_added_sounds" data-required="0" placeholder="Enter murmers and added sounds" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.cardio?.other_findings || ''}" name="other_findings" id="cardio_exam_other_findings" data-required="0" placeholder="Enter other_findings" class="form-control input-height">
												</div>
											</div>



										</div>
									</form>
								</div>
								<div class="tab-pane" id="res_tab\${id}">
									<form id="res_tab_form\${id}">
										<div class="form-body">

											<div class="form-group row">
												<label class="control-label col-md-5">Respiratory Rate

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.respiratory?.respiratory_rate || ''}" name="respiratory_rate" id="respiratory_exam_rr" data-required="0" placeholder="Enter respiratory rate" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Rhythm

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="rhythm" id="respiratory_exam_rhythm">
														<option value="">Select...</option>
														<option value="Regular" \${info?.respiratory?.rhythm == "Regular" ? "selected" : ""}>Regular</option>
														<option value="Irregular" \${info?.respiratory?.rhythm == "Irregular" ? "selected" : ""}>Irregular</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Rhythm Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.respiratory?.rhythm_details || ''}" name="rhythm_details" id="respiratory_exam_rhythm_details" data-required="0" placeholder="Enter rhythm details" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Depth

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="depth" id="respiratory_exam_depth">
														<option value="">Select...</option>
														<option value="Normal" \${info?.respiratory?.depth == "Normal" ? "selected" : ""}>Normal</option>
														<option value="Increased" \${info?.respiratory?.depth == "Increased" ? "selected" : ""}>Increased</option>
														<option value="Shallow" \${info?.respiratory?.depth == "Shallow" ? "selected" : ""}>Shallow</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Breath Sounds

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="breath_sounds" id="respiratory_exam_breath_sounds">
														<option value="">Select...</option>
														<option value="Quiet" \${info?.respiratory?.breath_sounds == "Quiet" ? "selected" : ""}>Quiet</option>
														<option value="Stridor" \${info?.respiratory?.breath_sounds == "Stridor" ? "selected" : ""}>Stridor</option>
														<option value="Wheezing" \${info?.respiratory?.breath_sounds == "Wheezing" ? "selected" : ""}>Wheezing</option>
														<option value="Bubbling" \${info?.respiratory?.breath_sounds == "Bubbling" ? "selected" : ""}>Bubbling</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Use of Accessory Muscles

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="use_of_accessory_muscles" \${info?.respiratory?.use_of_accessory_muscles == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
															<!-- respiratory_exam_use_of_accessory_muscles -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Chest Movement

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="chest_movement" id="respiratory_exam_chest_movement">
														<option value="">Select...</option>
														<option value="Even" \${info?.respiratory?.chest_movement == "Even" ? "selected" : ""}>Even</option>
														<option value="Uneven" \${info?.respiratory?.chest_movement == "Uneven" ? "selected" : ""}>Uneven</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Chest Symmetry

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="chest_symmetry" id="respiratory_exam_chest_symmetry">
														<option value="">Select...</option>
														<option value="Symmetrical" \${info?.respiratory?.chest_symmetry == "Symmetrical" ? "selected" : ""}>Symmetrical</option>
														<option value="Asymmetrical" \${info?.respiratory?.chest_symmetry == "Asymmetrical" ? "selected" : ""}>Asymmetrical</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Trachea

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="trachea" id="respiratory_exam_trachea">
														<option value="">Select...</option>
														<option value="Central" \${info?.respiratory?.trachea == "Central" ? "selected" : ""}>Central</option>
														<option value="Displaced" \${info?.respiratory?.trachea == "Displaced" ? "selected" : ""}>Displaced</option>
													</SearchableSelectField>

												</div>
											</div>

											
											<div class="form-group row">
												<label class="control-label col-md-5">Chest Tenderness

												</label>
												<div class="col-md-7">

													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="chest_tenderness" \${info?.respiratory?.chest_tenderness == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
															<!-- respiratory_exam_chest_tenderness -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>

												</div>
											</div>



											<div class="form-group row">
												<label class="control-label col-md-5">Chest Tenderness details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.respiratory?.chest_tenderness_details || ''}" name="chest_tenderness_details" id="respiratory_exam_chest_tenderness_details" data-required="0" placeholder="Enter chest tenderness details" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Vocal Fremitus

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="vocal_fremitus" id="respiratory_exam_vocal_fremitus">
														<option value="">Select...</option>
														<option value="normal" \${info?.respiratory?.vocal_fremitus == "normal" ? "selected" : ""}>Normal</option>
														<option value="Increased on left" \${info?.respiratory?.vocal_fremitus == "Increased on left" ? "selected" : ""}>Increased on left</option>
														<option value="Increased on right" \${info?.respiratory?.vocal_fremitus == "Increased on right" ? "selected" : ""}>Increased on right</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Percussion

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="percussion" id="respiratory_exam_percussion">
														<option value="">Select...</option>
														<option value="Dull" \${info?.respiratory?.percussion == "Dull" ? "selected" : ""}>Dull</option>
														<option value="Stony dull" \${info?.respiratory?.percussion == "Stony dull" ? "selected" : ""}>Stony dull</option>
														<option value="Normal" \${info?.respiratory?.percussion == "Normal" ? "selected" : ""}>Normal</option>
														<option value="Resonant" \${info?.respiratory?.percussion == "Resonant" ? "selected" : ""}>Resonant</option>
														<option value="Hyperresonant" \${info?.respiratory?.percussion == "Hyperresonant" ? "selected" : ""}>Hyperresonant</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Percussion details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.respiratory?.percussion_details || ''}" name="percussion_details" id="respiratory_exam_percussion_details" data-required="0" placeholder="Enter percussion details" class="form-control input-height">
												</div>
											</div>
											<h3 class="bold">Auscultation</h3>

											<div class="form-group row">
												<label class="control-label col-md-5">Air Entry

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="air_entry" id="respiratory_exam_air_entry">
														<option value="">Select...</option>
														<option value="Normal" \${info?.respiratory?.air_entry == "Normal" ? "selected" : ""}>Normal</option>
														<option value="Increased" \${info?.respiratory?.air_entry == "Increased" ? "selected" : ""}>Increased</option>
														<option value="Decreased" \${info?.respiratory?.air_entry == "Decreased" ? "selected" : ""}>Decreased</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Breath sounds (auscultation)

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="breath_sounds_auscultation" id="respiratory_exam_breath_sounds_auscultation">
														<option value="">Select...</option>
														<option value="Vesicular" \${info?.respiratory?.breath_sounds_auscultation == "Vesicular" ? "selected" : ""}>Vesicular</option>
														<option value="Bronchial" \${info?.respiratory?.breath_sounds_auscultation == "Bronchial" ? "selected" : ""}>Bronchial</option>
														<option value="Diminished" \${info?.respiratory?.breath_sounds_auscultation == "Diminished" ? "selected" : ""}>Diminished</option>
														<option value="Silent Chest" \${info?.respiratory?.breath_sounds_auscultation == "Silent Chest" ? "selected" : ""}>Silent Chest</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Breath Sounds details (for auscultation)

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.respiratory?.breath_sounds_details_auscultation || ''}" name="breath_sounds_details_auscultation" id="respiratory_exam_breath_sounds_details_auscultation" data-required="0" placeholder="Enter breath sounds details for auscultation" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Added Sounds

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="added_sounds" id="respiratory_exam_added_sounds">
														<option value="">Select...</option>
														<option value="None" \${info?.respiratory?.added_sounds == "None" ? "selected" : ""}>None</option>
														<option value="Wheezes (rhonchi)" \${info?.respiratory?.added_sounds == "Wheezes (rhonchi)" ? "selected" : ""}>Wheezes (rhonchi)</option>
														<option value="Crackles (crepitations)" \${info?.respiratory?.added_sounds == "Crackles (crepitations)" ? "selected" : ""}>Crackles (crepitations)</option>
														<option value="Pleural rub" \${info?.respiratory?.added_sounds == "Pleural rub" ? "selected" : ""}>Pleural rub</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.respiratory?.other_findings || ''}" name="other_findings" id="respiratory_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
												</div>
											</div>


										</div>
									</form>
								</div>
								<div class="tab-pane" id="abdomen_tab\${id}">
									<form id="abdomen_tab_form\${id}">
										<div class="form-body">
											<h3 class="bold">Inspection</h3>

											<div class="form-group row">
												<label class="control-label col-md-5">Skin

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="skin" id="abdomen_exam_skin">
														<option value="">Select...</option>
														<option value="Normal" \${info?.abdomen?.skin == "Normal" ? "selected" : ""}>Normal</option>
														<option value="Wrinkled" \${info?.abdomen?.skin == "Wrinkled" ? "selected" : ""}>Wrinkled</option>
														<option value="Shiny" \${info?.abdomen?.skin == "Shiny" ? "selected" : ""}>Shiny</option>
														<option value="Tense" \${info?.abdomen?.skin == "Tense" ? "selected" : ""}>Tense</option>
														<option value="Oedematous" \${info?.abdomen?.skin == "Oedematous" ? "selected" : ""}>Oedematous</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Contour

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="contour" id="abdomen_exam_contour">
														<option value="">Select...</option>
														<option value="Retracted" \${info?.abdomen?.contour == "Retracted" ? "selected" : ""}>Retracted</option>
														<option value="Flat" \${info?.abdomen?.contour == "Flat" ? "selected" : ""}>Flat</option>
														<option value="Full" \${info?.abdomen?.contour == "Full" ? "selected" : ""}>Full</option>
														<option value="Distended" \${info?.abdomen?.contour == "Distended" ? "selected" : ""}>Distended</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Symmetry

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="symmetry" id="abdomen_exam_symmetry">
														<option value="">Select...</option>
														<option value="Asymmetrical" \${info?.abdomen?.symmetry == "Asymmetrical" ? "selected" : ""}>Asymmetrical</option>
														<option value="Symmetrical" \${info?.abdomen?.symmetry == "Symmetrical" ? "selected" : ""}>Symmetrical</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Movement

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="movement" id="abdomen_exam_movement">
														<option value="">Select...</option>
														<option value="Normal" \${info?.abdomen?.movement == "Normal" ? "selected" : ""}>Normal</option>
														<option value="Excessive" \${info?.abdomen?.movement == "Excessive" ? "selected" : ""}>Excessive</option>
														<option value="Absent" \${info?.abdomen?.movement == "Absent" ? "selected" : ""}>Absent</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Umbilicus

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="umbilicus" id="abdomen_exam_umbilicus">
														<option value="">Select...</option>
														<option value="Inverted" \${info?.abdomen?.umbilicus == "Inverted" ? "selected" : ""}>Inverted</option>
														<option value="Everted" \${info?.abdomen?.umbilicus == "Everted" ? "selected" : ""}>Everted</option>
														<option value="Bulging" \${info?.abdomen?.umbilicus == "Bulging" ? "selected" : ""}>Bulging</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Hair Distribution

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="hair_distribution" id="abdomen_exam_hair_distribution">
														<option value="">Select...</option>
														<option value="Sparse" \${info?.abdomen?.hair_distribution == "Sparse" ? "selected" : ""}>Sparse</option>
														<option value="Female Pattern" \${info?.abdomen?.hair_distribution == "Female Pattern" ? "selected" : ""}>Female Pattern</option>
														<option value="Male Pattern" \${info?.abdomen?.hair_distribution == "Male Pattern" ? "selected" : ""}>Male Pattern</option>
													</SearchableSelectField>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Visible Viens

												</label>
												<div class="col-md-7">
													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="visible_veins" id="inlineRadio1"  \${info?.abdomen?.visible_veins == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<!-- abdomen_exam_visible_veins -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Visible Veins Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.visible_veins_details || ''}" name="visible_veins_details" id="abdomen_exam_visible_veins_details" data-required="0" placeholder="Enter visible vein details" class="form-control input-height">
												</div>
											</div>
											
											
											<div class="form-group row">
												<label class="control-label col-md-5">Scars

												</label>
												<div class="col-md-7">

													<div class="form-check form-check-inline">
														<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
															<input class="form-check-input" type="radio" name="scars" id="inlineRadio1" \${info?.abdomen?.scars == '<!-- php: =$key -->' ? "checked" : ''} value="<!-- php: = $selectVal -->">
															<!-- abdomen_exam_scars -->
															<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
															<!-- php: } -->
													</div>

												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Scars Details

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.scars_details || ''}" name="scars_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter scars details" class="form-control input-height">
												</div>
											</div>

											<h3 class="bold">Palpation</h3>
											<div class="form-group row">
												<label class="control-label col-md-5">Light Palpation

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.light_palpation || ''}" name="light_palpation" id="abdomen_exam_light_palpation" data-required="0" placeholder="Enter light palpation" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Liver

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.liver || ''}" name="liver" id="abdomen_exam_liver" data-required="0" placeholder="Enter liver" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Spleen

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.spleen || ''}" name="spleen" id="abdomen_exam_spleen" data-required="0" placeholder="Enter spleen" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Kidneys

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.kidneys || ''}" name="kidneys" id="abdomen_exam_kidneys" data-required="0" placeholder="Enter kidneys" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Uterus and/or Bladder

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.uterus || ''}" name="uterus" id="abdomen_exam_uterus" data-required="0" placeholder="Enter uterus" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Other Masses

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.other_masses || ''}" name="other_masses" id="abdomen_exam_other_masses" data-required="0" placeholder="Enter other masses" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Hernial Orifices

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.hernial_orifices || ''}" name="hernial_orifices" id="abdomen_exam_hernial_orifices" data-required="0" placeholder="Enter hernial orifices" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">External Genitalia

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.external_genitalia || ''}" name="external_genitalia" id="abdomen_exam_external_genitalia" data-required="0" placeholder="Enter external genitalia" class="form-control input-height">
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Rectal Exam

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.rectal_exam || ''}" name="rectal_exam" id="abdomen_exam_rectal_exam" data-required="0" placeholder="Enter rectal exam" class="form-control input-height">
												</div>
											</div>
											<h3 class="bold">Percussion</h3>
											<div class="form-group row">
												<label class="control-label col-md-5">Volume

												</label>
												<div class="col-md-7">

													<SearchableSelectField class="form-control system_review_select" name="volume" id="abdomen_exam_volume">
														<option value="">Select...</option>
														<option value="Present" \${info?.abdomen?.volume == "Present" ? "selected" : ""}>Present</option>
														<option value="Absent" \${info?.abdomen?.volume == "Absent" ? "selected" : ""}>Absent</option>
													</SearchableSelectField>

												</div>
											</div>
											<h3 class="bold">Auscultation</h3>
											<div class="form-group row">
												<label class="control-label col-md-5">Bowel Sounds

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.bowel_sounds || ''}" name="bowel_sounds" id="abdomen_exam_bowel_sounds" data-required="0" placeholder="Enter bowel sounds" class="form-control input-height">
												</div>
											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Other Findings

												</label>
												<div class="col-md-7">
													<input type="text" value="\${info?.abdomen?.other_findings || ''}" name="other_findings" id="abdomen_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
												</div>
											</div>


										</div>
									</form>
								</div>
								<div class="tab-pane" id="extermity_tab\${id}">
									<form id="extermity_tab_form\${id}">
										<div class="form-body row">
											<div class="col-md-2">
												<h3 class="bold">Title</h3>
												<div class="form-group row">
													<label class="control-label col-md-12">Inspection

													</label>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-12">Tone

													</label>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-12">Power

													</label>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-12">Reflexes

													</label>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-12">Sensation

													</label>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-12">Cordination

													</label>
												</div>
											</div>
											<div class="col-md-5">
												<h3 class="bold">Left</h3>
												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.left_inspection || ''}" name="left_inspection" id="left_inspection" data-required="0" placeholder="Enter left inspection" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">

														<SearchableSelectField class="form-control system_review_select" name="left_tone" id="left_tone">
															<option value="">Select...</option>
															<option value="Normal" \${info?.extremity?.left_tone == "Normal" ? "selected" : ""}>Normal</option>
															<option value="Reduced" \${info?.extremity?.left_tone == "Reduced" ? "selected" : ""}>Reduced</option>
															<option value="Increased" \${info?.extremity?.left_tone == "Increased" ? "selected" : ""}>Increased</option>
														</SearchableSelectField>

													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">

														<SearchableSelectField class="form-control system_review_select" name="left_power" id="left_power">
															<option value="">Select...</option>
															<option value="0" \${info?.extremity?.left_power == "0" ? "selected" : ""}>0</option>
															<option value="1" \${info?.extremity?.left_power == "1" ? "selected" : ""}>1</option>
															<option value="2" \${info?.extremity?.left_power == "2" ? "selected" : ""}>2</option>
															<option value="3" \${info?.extremity?.left_power == "3" ? "selected" : ""}>3</option>
															<option value="4" \${info?.extremity?.left_power == "4" ? "selected" : ""}>4</option>
															<option value="5" \${info?.extremity?.left_power == "5" ? "selected" : ""}>5</option>
														</SearchableSelectField>

													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.left_reflexes || ''}" name="left_reflexes" id="left_reflexes" data-required="0" placeholder="Enter left reflexes" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.left_sensation || ''}" name="left_sensation" id="left_sensation" data-required="0" placeholder="Enter left sensation" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.left_coordination || ''}" name="left_coordination" id="left_coordination" data-required="0" placeholder="Enter left coordination" class="form-control input-height">
													</div>
												</div>
											</div>
											<div class="col-md-5">
												<h3 class="bold">Right</h3>
												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.right_inspection || ''}" name="right_inspection" id="right_inspection" data-required="0" placeholder="Enter right inspection" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">

														<SearchableSelectField class="form-control system_review_select" name="right_tone" id="right_tone">
															<option value="">Select...</option>
															<option value="Normal" \${info?.extremity?.right_tone == "Normal" ? "selected" : ""}>Normal</option>
															<option value="Reduced" \${info?.extremity?.right_tone == "Reduced" ? "selected" : ""}>Reduced</option>
															<option value="Increased" \${info?.extremity?.right_tone == "Increased" ? "selected" : ""}>Increased</option>
														</SearchableSelectField>

													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">

														<SearchableSelectField class="form-control system_review_select" name="right_power" id="right_power">
															<option value="">Select...</option>
															<option value="0" \${info?.extremity?.right_power == "0" ? "selected" : ""}>0</option>
															<option value="1" \${info?.extremity?.right_power == "1" ? "selected" : ""}>1</option>
															<option value="2" \${info?.extremity?.right_power == "2" ? "selected" : ""}>2</option>
															<option value="3" \${info?.extremity?.right_power == "3" ? "selected" : ""}>3</option>
															<option value="4" \${info?.extremity?.right_power == "4" ? "selected" : ""}>4</option>
															<option value="5" \${info?.extremity?.right_power == "5" ? "selected" : ""}>5</option>
														</SearchableSelectField>

													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.right_reflexes || ''}" name="right_reflexes" id="right_reflexes" data-required="0" placeholder="Enter right reflexes" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.right_sensation || ''}" name="right_sensation" id="right_sensation" data-required="0" placeholder="Enter right sensation" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<div class="col-md-12">
														<input type="text" value="\${info?.extremity?.right_coordination || ''}" name="right_coordination" id="right_coordination" data-required="0" placeholder="Enter right coordination" class="form-control input-height">
													</div>
												</div>
											</div>

											<div class="col-md-12">

												<div class="form-group row">
													<label class="control-label col-md-2">Autonomic System

													</label>
													<div class="col-md-9">
														<input type="text" value="\${info?.extremity?.autonomic_system || ''}" name="autonomic_system" id="autonomic_system" data-required="0" placeholder="Enter autonomic system" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-2">Other Findings

													</label>
													<div class="col-md-9">
														<input type="text" value="\${info?.extremity?.other_findings || ''}" name="other_findings" id="extremities_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
													</div>
												</div>
											</div>




										</div>
									</form>
								</div>
								<!-- php: endif -->
								<div class="tab-pane <!-- php: = ($continuousCare) ? 'active show' : '' -->" id="musco_skeletal_tab\${id}">
									<form id="musco_skeletal_tab_form\${id}">
										<div class="row flex-column p-3">
	
											<h2>Joint Noises (Crepitus)</h2>

											<div class="form-group row">
												<label class="control-label col-md-5">Popping sound in a joint (enter joint location)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.popping || ''}" name="popping" id="popping" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Cracking sound in a joint (enter joint location)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.cracking || ''}" name="cracking" id="cracking" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Clicking sound in a joint (enter joint location)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.clicking || ''}" name="clicking" id="clicking" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Creaking sound in a joint (enter joint location)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.creaking || ''}" name="creaking" id="creaking" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>




											<h2>Joint Stiffness</h2>
											<p>Does patient feel that the motion of a joint is limited or difficult?</p>

											<div class="form-group row">
												<label class="control-label col-md-5">Stiff feeling in joint</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Stiff_feeling || ''}" name="Stiff_feeling" id="Stiff_feeling" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Reluctance to move the joint due to pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Reluctance_to_move || ''}" name="Reluctance_to_move" id="Reluctance_to_move" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Weakness in joint</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Weakness_in_joint || ''}" name="Weakness_in_joint" id="Weakness_in_joint" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Moves joint through its full range of motion but requires extra 
												force</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Moves_joint_full_range || ''}" name="Moves_joint_full_range" id="Moves_joint_full_range" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Inflammation of the joint area usually after prolonged resting or immobility</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Inflammation_joint || ''}" name="Inflammation_joint" id="Inflammation_joint" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Joint stiffness gets worse as the day progresses</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Joint_stiffness || ''}" name="Joint_stiffness" id="Joint_stiffness" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Presence of Muscle Rigidity</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.muscle_rigidity || ''}" name="muscle_rigidity" id="muscle_rigidity" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Presence of Muscle Spasticity</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.muscle_spasticity || ''}" name="muscle_spasticity" id="muscle_spasticity" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>




											<h2>Difficulty Moving</h2>
											<p>Does patient have difficulty moving all or part of the body?</p>

											<div class="form-group row">
												<label class="control-label col-md-5">Contract muscles with normal strength? Yes or No</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.contract_muscles_normal_strength || ''}" name="contract_muscles_normal_strength" id="contract_muscles_normal_strength" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Pain is causing limited range of motion</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Pain_limited_motion_range || ''}" name="Pain_limited_motion_range" id="Pain_limited_motion_range" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Previous injury joint causing significant scar tissue</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.previous_injury_joint || ''}" name="previous_injury_joint" id="previous_injury_joint" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row"><label class="control-label col-md-5">Prolonged joint immobilisation causing shortening of the 
												tendons</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.prolonged_joint_immobilisation || ''}" name="prolonged_joint_immobilisation" id="prolonged_joint_immobilisation" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Fluid accumulation in a joint resulting from arthritis or an acute injury (specify) (giving a 
												sensation that the joint is locked)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.fluid_accumulation || ''}" name="fluid_accumulation" id="fluid_accumulation" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row"><label class="control-label col-md-5">A piece of torn cartilage (resulting from an injury) that blocks 
												joint movement</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.torn_cartilage || ''}" name="torn_cartilage" id="torn_cartilage" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Weakness resulting from injury or disease (specify) affecting the nervous system muscles or 
												neuromuscular junction (specify).</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.Weakness_injury_disease || ''}" name="Weakness_injury_disease" id="Weakness_injury_disease" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>




											<h2>Musculoskeletal Pain</h2>

											<div class="form-group row">
												<label class="control-label col-md-5">Musculoskeletal pain caused by disorder? Yes/No.  bones joints muscles tendons ligaments bursae 
												(multi-select)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.pain_by_disorder || ''}" name="pain_by_disorder" id="pain_by_disorder" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row"><label class="control-label col-md-5">Musculoskeletal Pain caused by a disorder in another organ 
												system Yes/No. (indicate)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.pain_by_disorder_organ || ''}" name="pain_by_disorder_organ" id="pain_by_disorder_organ" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">How many and which joints are involved</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.joints_involved_info || ''}" name="joints_involved_info" id="joints_involved_info" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row"><label class="control-label col-md-5">Is the central part of the skeleton (spine and pelvis) involved</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.central_skeleton || ''}" name="central_skeleton" id="central_skeleton" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Is joint pain acute or chronic</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.pain_acute_chronic || ''}" name="pain_acute_chronic" id="pain_acute_chronic" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">What factors relieves the pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.pain_relief || ''}" name="pain_relief" id="pain_relief" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">What factors worsens the pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.pain_worse || ''}" name="pain_worse" id="pain_worse" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Are there other symptoms affecting other organs?</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.organ_symptoms || ''}" name="organ_symptoms" id="organ_symptoms" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>




											<h2>Joint Pain: Single Joint (monoarticular joint pain)</h2>

											<div class="form-group row"><label class="control-label col-md-5">Is the joint simply painful (arthralgia) or inflamed (arthritis) 
												or both</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.arthralgia_arthritis || ''}" name="arthralgia_arthritis" id="arthralgia_arthritis" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Warmth of the overlying skin</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.warmth_skin || ''}" name="warmth_skin" id="warmth_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Swelling of the overlying skin</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.swelling_skin || ''}" name="swelling_skin" id="swelling_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Redness of the overlying skin</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.redness_skin || ''}" name="redness_skin" id="redness_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Tender skin near the joint</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.tender_skin || ''}" name="tender_skin" id="tender_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Fever</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.fever || ''}" name="fever" id="fever" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Sudden pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.sudden_pain || ''}" name="sudden_pain" id="sudden_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Pain when joint is moved</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.pain_joint_moved || ''}" name="pain_joint_moved" id="pain_joint_moved" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Pain when the joint is at rest</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.pain_joint_rest || ''}" name="pain_joint_rest" id="pain_joint_rest" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Joint is filled with fluid (effusion)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.effusion || ''}" name="effusion" id="effusion" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Presence of Bleeding Disorder</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.bleeding_disorder || ''}" name="bleeding_disorder" id="bleeding_disorder" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Previous injuries</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.previous_injuries || ''}" name="previous_injuries" id="previous_injuries" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Previous joint pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.previous_joint_pain || ''}" name="previous_joint_pain" id="previous_joint_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row"><label class="control-label col-md-5">Known Disorders such as osteoarthritis gout sickle cell disease)
												</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.known_disorders || ''}" name="known_disorders" id="known_disorders" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">What factors relieves the pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.factors_relieves_pain || ''}" name="factors_relieves_pain" id="factors_relieves_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">What factors worsens the pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.factors_worsens_pain || ''}" name="factors_worsens_pain" id="factors_worsens_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>




											<h2>Joint Pain: Many Joints (polyarticular joint pain)</h2>

											<div class="form-group row"><label class="control-label col-md-5">Is the joint simply painful (arthralgia) or inflamed (arthritis) 
												or both</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_arthralgia_inflamed || ''}" name="many_arthralgia_inflamed" id="many_arthralgia_inflamed" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Warmth of the overlying skin</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_warm_skin || ''}" name="many_warm_skin" id="many_warm_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Swelling of the overlying skin</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_swelling_skin || ''}" name="many_swelling_skin" id="many_swelling_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Redness of the overlying skin</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_redness_skin || ''}" name="many_redness_skin" id="many_redness_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Tender skin near the joint</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_tender_skin || ''}" name="many_tender_skin" id="many_tender_skin" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Fever</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_Fever || ''}" name="many_Fever" id="many_Fever" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Sweating</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_sweating || ''}" name="many_sweating" id="many_sweating" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Weight loss</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_weight_loss || ''}" name="many_weight_loss" id="many_weight_loss" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Chills</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_Chills || ''}" name="many_Chills" id="many_Chills" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Eye redness or pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_eye_pain || ''}" name="many_eye_pain" id="many_eye_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Sores in the mouth</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_mouth_sores || ''}" name="many_mouth_sores" id="many_mouth_sores" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Sores in the nose</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_nose_sores || ''}" name="many_nose_sores" id="many_nose_sores" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Sores on the genitals</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_genital_sores || ''}" name="many_genital_sores" id="many_genital_sores" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Skin rashes</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_skin_rashes || ''}" name="many_skin_rashes" id="many_skin_rashes" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Spots</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_spots || ''}" name="many_spots" id="many_spots" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Purple blotches</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_purple_blotches || ''}" name="many_purple_blotches" id="many_purple_blotches" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Nail pitting</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.nail_pitting || ''}" name="nail_pitting" id="nail_pitting" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Abdominal pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.abdominal_pain || ''}" name="abdominal_pain" id="abdominal_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Sudden pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_sudden_pain || ''}" name="many_sudden_pain" id="many_sudden_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Chest pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.chest_pain || ''}" name="chest_pain" id="chest_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Shortness of breath</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.shortness_of_breath || ''}" name="shortness_of_breath" id="shortness_of_breath" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Pain when joint is moved</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.joint_moved_pain || ''}" name="joint_moved_pain" id="joint_moved_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Pain when the joint is at rest</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.joint_rest_pain || ''}" name="joint_rest_pain" id="joint_rest_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Joint is filled with fluid (effusion)</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_effusion || ''}" name="many_effusion" id="many_effusion" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Presence of Bleeding Disorder</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_bleeding || ''}" name="many_bleeding" id="many_bleeding" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Previous injuries</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_previous_injuries || ''}" name="many_previous_injuries" id="many_previous_injuries" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">Previous joint pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_previous_pain || ''}" name="many_previous_pain" id="many_previous_pain" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row"><label class="control-label col-md-5">Known Disorders such as osteoarthritis gout sickle cell disease)
												</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_disorder || ''}" name="many_disorder" id="many_disorder" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">What factors relieves the pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_relief_factor || ''}" name="many_relief_factor" id="many_relief_factor" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>


											<div class="form-group row">
												<label class="control-label col-md-5">What factors worsens the pain</label>

												<div class="col-md-7">
													<input type="text" value="\${info?.muscoloskeletal?.many_worse_factor || ''}" name="many_worse_factor" id="many_worse_factor" data-required="0" placeholder="" class="form-control input-height">
												</div>

											</div>
										</div>



									</form>
								</div>
								
								<!-- php: if (!$continuousCare): -->
									<div class="tab-pane" id="nerological_tab\${id}">
										<form id="nerological_tab_form\${id}">
											<div class="form-body">
												<h3 class="bold">Glasgow coma score </h3>
												<div class="form-group row">
													<label class="control-label col-md-5">Eye Opening
	
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.neurological?.eye_opening || ''}" name="eye_opening" id="eye_opening" data-required="0" placeholder="Enter eye opening" class="form-control input-height">
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Verbose Response
	
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.neurological?.verbose_response || ''}" name="verbose_response" id="neurology_exam_verbose_response" data-required="0" placeholder="Enter verbose response" class="form-control input-height">
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Best Motor Response
	
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.neurological?.best_motor_response || ''}" name="best_motor_response" id="best_motor_response" data-required="0" placeholder="Enter best motor response" class="form-control input-height">
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Score
	
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.neurological?.score || ''}" name="score" id="score" data-required="0" placeholder="Enter score" class="form-control input-height">
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Pulpillary Response to Light
	
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.neurological?.pulpillary_response_to_light || ''}" name="pulpillary_response_to_light" id="pulpillary_response_to_light" data-required="0" placeholder="Enter pulpillary response to light" class="form-control input-height">
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Speech
	
													</label>
													<div class="col-md-7">
	
														<SearchableSelectField class="form-control system_review_select" name="speech" id="neurology_exam_speech">
															<option value="">Select...</option>
															<option value="Normal" \${info?.neurological?.right_power == "Normal" ? "selected" : ""}>Normal</option>
															<option value="Dysphasia" \${info?.neurological?.right_power == "Dysphasia" ? "selected" : ""}>Dysphasia</option>
															<option value="Dysarthria" \${info?.neurological?.right_power == "Dysarthria" ? "selected" : ""}>Dysarthria</option>
															<option value="Both" \${info?.neurological?.right_power == "Both" ? "selected" : ""}>Both</option>
															<option value="Not assessible" \${info?.neurological?.right_power == "Not assessible" ? "selected" : ""}>Not assessible</option>
														</SearchableSelectField>
	
													</div>
												</div>
												<h3 class="bold">Meningeal Irritation </h3>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Neck Stiffness
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="neck_stiffness" \${info?.neurological?.neck_stiffness == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>
	
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Kernig's Sign
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="kernigs_sign" \${info?.neurological?.kernigs_sign == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- kernigs_sign -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>
	
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Brudzinski Sign
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="brudzinski_sign" \${info?.neurological?.brudzinski_sign == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- brudzinski_sign -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>
	
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Cranial Nerves
	
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.neurological?.cranial_nerves || ''}" name="cranial_nerves" id="cranial_nerves" data-required="0" placeholder="Enter cranial nerves" class="form-control input-height">
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
	
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.neurological?.other_findings || ''}" name="other_findings" id="neurology_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
													</div>
												</div>
	
	
	
											</div>
										</form>
									</div>
								<!-- php: if ($patient->gender_id == 2 && $patient_age > 12): -->
									<div class="tab-pane" id="gynaecologic_tab\${id}">
										<form id="gynaecologic_tab_form\${id}">
											<div class="form-body">
												<h3 class="bold">Vulva </h3>
												<div class="form-group row">
													<label class="control-label col-md-5">Blood Stained
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="blood_stained" \${info?.gynaecological?.blood_stained == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Blood Stained)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.blood_stained_details || ''}" name="blood_stained_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Discharge
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="discharge" \${info?.gynaecological?.discharge == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Discharge)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.discharge || ''}" name="discharge_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Masses
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="masses" \${info?.gynaecological?.masses == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Masses)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.masses_details || ''}" name="masses_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Ulcerations
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="ulcerations" \${info?.gynaecological?.ulcerations == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Ulcerations)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.ulceration_details || ''}" name="ulceration_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.other_findings || ''}" name="other_findings" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Speculum Findings
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.speculum_findings || ''}" name="speculum_findings" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Samples Taken
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="samples_taken" \${info?.gynaecological?.samples_taken == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Samples Taken)
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.samples_taken_details || ''}" name="samples_taken_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Vagina Walls
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.vagina_walls || ''}" name="vagina_walls" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Cervix
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.cervix || ''}" name="cervix" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Motion Tenderness
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="cervical_motion_tenderness" \${info?.gynaecological?.cervical_motion_tenderness == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- kernigs_sign -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>
	
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Uterus
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.uterus || ''}" name="uterus" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
	
	
											</div>
										</form>
									</div>
									<div class="tab-pane" id="obstetric_pelvic_tab\${id}">
										<form id="obstetric_pelvic_tab_form\${id}">
											<div class="form-body">
												<h3 class="bold">Vulva </h3>
												<div class="form-group row">
													<label class="control-label col-md-5">Blood Stained
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="blood_stained" \${info?.obsteric_pelvis?.blood_stained == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Blood Stained)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.blood_stained_details || ''}" name="blood_stained_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Discharge
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="discharge" \${info?.obsteric_pelvis?.discharge == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Discharge)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.discharge || ''}" name="discharge_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Masses
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="masses" \${info?.obsteric_pelvis?.masses == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Masses)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.masses_details || ''}" name="masses_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.other_findings || ''}" name="other_findings" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												
												<h3 class="bold">Cervix </h3>
												<div class="form-group row">
													<label class="control-label col-md-5">Length (cm)
												
													</label>
													<div class="col-md-7">
														<input type="number" onchange="calculationBishopScore()" min="0" max="10" value="\${info?.obsteric_pelvis?.length || ''}" name="length" id="obsteric_pelvis_length" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Dilation

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="dilation" onchange="calculationBishopScore()" id="obsteric_pelvis_dilation">
															<option value="" selected>select</option>
															\${dilationOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Consistency

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="consistency" onchange="calculationBishopScore()" id="obsteric_pelvis_consistency">
															<option value="" selected>select</option>
															\${consistencyOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Position

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="position_bishop" onchange="calculationBishopScore()" id="obsteric_pelvis_position">
															<option value="" selected>select</option>
															\${positionOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Station

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="station" onchange="calculationBishopScore()" id="obsteric_pelvis_station">
															<option value="" disabled selected>select</option>
															\${stationOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Bishop Score
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.bishop_score || ''}" name="bishop_score" id="obsteric_pelvis_bishop_score" data-required="0" placeholder="Bishop Score" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Membranes

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="membranes" id="">
															\${membranesOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Artificial ROM?
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="artificial_rom" \${info?.obsteric_pelvis?.artificial_rom == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- kernigs_sign -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>
	
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Artifical ROM Time
												
													</label>
													<div class="col-md-7">
														<input class="mobiTimePicker" class="form-control  w-100" name="artificial_rom_time" value="\${info?.obsteric_pelvis?.artificial_rom_time || ''}"/>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Amniotic Fluid

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="amniotic" id="">
															\${amnioticOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Moulding

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="moulding" id="">
															\${mouldingOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Caput
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="caput" \${info?.obsteric_pelvis?.caput == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Position

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.position || ''}" name="position" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Pelvimetry

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.pelvimetry || ''}" name="pelvimetry" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_pelvis?.other_findings || ''}" name="other_findings" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
	
	
											</div>
										</form>
									</div>
									<div class="tab-pane" id="obstetric_abdomen_tab\${id}">
										<form id="obstetric_abdomen_tab_form\${id}">
											<div class="form-body">
												<h3 class="bold">Inspection </h3>
												<div class="form-group row">
													<label class="control-label col-md-5">Asymmetry
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="asymmetry" \${info?.obsteric_abdomen?.asymmetry == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Linea Nigra
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="linea_nigra" \${info?.obsteric_abdomen?.linea_nigra == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Superficial Veins
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="superficial_veins" \${info?.obsteric_abdomen?.superficial_veins == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Fetal Movements
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="fetal_movements" \${info?.obsteric_abdomen?.fetal_movements == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Straie Gravidarum
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="straie_gravidarum" \${info?.obsteric_abdomen?.straie_gravidarum == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Scars
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="scars" \${info?.obsteric_abdomen?.scars == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Comment (Scars)

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_abdomen?.scars_details || ''}" name="scars_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Gestational age

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_abdomen?.gestational_age || ''}" name="gestational_age" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter  details" class="form-control input-height">
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Symphysiofundal Height

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_abdomen?.symphysiofundal_height || ''}" name="symphysiofundal_height" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Fetal Poles

													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.obsteric_abdomen?.fetal_poles || ''}" name="fetal_poles" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter Details" class="form-control input-height">
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Foetal Lie

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="foetal_lie" id="general_exam_constitution">
															\${foetalLieOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Presentation

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="presentation" id="general_exam_constitution">
															\${presentationOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Descent

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="descent" id="general_exam_constitution">
															\${descentOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Back of Baby

													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control system_review_select" name="back_of_baby" id="general_exam_constitution">
															\${backOfBabyOptions.join("")}
														</SearchableSelectField>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Contractions
	
													</label>
													<div class="col-md-7">
	
														<div class="form-check form-check-inline">
															<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																<input class="form-check-input" type="radio" name="contractions" \${info?.obsteric_abdomen?.contractions == '<!-- php: =$key -->' ? "checked" : ''} id="inlineRadio1" value="<!-- php: = $selectVal -->">
																<!-- neck_stiffness -->
																<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																<!-- php: } -->
														</div>

													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Frequency (10 min)
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.frequency || ''}" name="frequency" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Duration (seconds)
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.duration || ''}" name="duration" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Cardiotocograph
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.cardiotocograph || ''}" name="cardiotocograph" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
												
													</label>
													<div class="col-md-7">
														<input type="text" value="\${info?.gynaecological?.other_findings || ''}" name="other_findings" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter details" class="form-control input-height">
													</div>
												</div>
	
	
											</div>
										</form>
									</div>

								<!-- php: endif; -->
								<!-- php: endif; -->
								<!--notes tab-->
								<div class="tab-pane" id="exam_notes_tab\${id}">
									<div class="card-body">
										<div class="row">
											<textarea id="examEditor" class="form-control notesEditor" rows="5"></textarea>

										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>



			</div>

			<a href="javascript:;" onclick="editSystemReviewEditModal('\${id}')" id="review_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn mb-5"> Save</a>
			<!-- <a href="javascript:;" id="review_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn mb-5"> Reset</a> -->
			<!-- <a href="javascript:;" id="review_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
			<!--//buttons-->
		\`
	}

	function systemReviewEditModal(systemReview, id) {
		console.log("muscoloskeletal", systemReview)
		$("#system-review-modal").html(
			generateSystemReviewBody(systemReview, id)
		)
		$('.system_review_select').selectpicker('refresh');
		$('#edit-system-review-modal').modal('toggle');
	}

	//sadat
	function ccEditModal(cc, note_id)
	{
		$("#cc-modal").html(
			\`<div class="modal fade" id="edit-cc-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-danger">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit CC</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<form id="edit-cc-form">
										<fieldset class="border p-2">
											<legend class="text-primary"><h4>Chief Complaint</h4></legend>
											<div class="form-group">
												<textarea name="cc" id="" cols="55" rows="3">\${cc}</textarea>
											</div>
										</fieldset>
									</form>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editChiefComplaint('\${note_id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('#edit-cc-modal').modal('toggle');
	}

	//edit cc function
	function editChiefComplaint(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterCCDataEdit' ] ); -->",
			data: {cc_data:$('#edit-cc-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {}),
				note_id:note_id, type:1},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Chief complaint successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}

	//drawing out history card edit modal
	function historyEditModal(obj)
	{
		$("#hx-modal").html(
			\`<div class="modal fade" id="edit-history-modal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center justify-content-between">
									<h4 class="text-slate-900 my-0">Edit Medication History</h4>
									<div>
										<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
									</div>
								</div>
							</div>
							<div class="container bg-white p-2">
								<div class="container-fluid">
									<div class="row mb-3 mt-4">
									<div class="col-md-12">
									<fieldset class="border p-2">
										<legend class="text-primary"><h4>Medication History(PMHx)</h4></legend>
										<form id="edit-pmhx-form">
											<div class="form-group">
												<label for="exampleInputEmail1">Past Medication</label>
												<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Current medication" value="\${obj?.current_medication}" name="current_medication">
											</div>
											<div class="form-group">
												<label for="exampleInputEmail1">Haemo Transfusion History</label>
												<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter past medication" value="\${obj?.past_medication}" name="past_medication">
											</div>
											<div class="form-group">
												<label for="exampleInputPassword1">Surgery History</label>
												<input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter herbal medication" value="\${obj?.herbal_medication}" name="herbal_medication">
											</div>
										</form>
									</fieldset>
									</div>
									</div>
								</div>
							</div>
							<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
								<div class="d-flex align-items-center py-1 justify-content-end">
									<button onclick="editHistoryEditModal('\${obj?.id}')" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Update &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
									<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>\`
		)
		$('#edit-history-modal').modal('toggle');
	}
	function editHistoryEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterBaseDataEdit' ] ); -->",
			data: {
				cc_data:$('#edit-pmhx-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {})
				, note_id:note_id
				, type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('History successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editAllergiesEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterAllergyEdit' ] ); -->",
			data: {
				cc_data:$('#edit-allergies-form').serializeArray()
				, note_id:note_id, 
				type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Allergy successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editComorbidityEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterComorbidityDataEdit' ] ); -->",
			data: {cc_data:$('#edit-comorbidity-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {}), note_id:note_id, type:1},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Comorbidity successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editOdqsEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterOdqDataEdit' ] ); -->",
			data: {cc_data:$('#edit-odq-form').serializeArray(), note_id:note_id, type:1},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('ODQ successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editSocialEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterPshxEdit' ] ); -->",
			data: {
				cc_data:$('#edit-pshx-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {})
				, note_id:note_id
				, type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Socials successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editContraceptionEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterContraceptionEdit' ] ); -->",
			data: {
				con_data:$('#edit-contraception-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {})
				, note_id:note_id
				, type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Contraception successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editGynaecologyEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterGynaecologyEdit' ] ); -->",
			data: {
				con_data:$('#edit-gynaecology-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {})
				, note_id:note_id
				, type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Gynaecology successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editPregnancyEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterPregnancyEdit' ] ); -->",
			data: {
				con_data:$('#edit-pregnancy-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {})
				, note_id:note_id
				, type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Pregnancy successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editObstetricEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterObstetricEdit' ] ); -->",
			data: {
				con_data:$('#edit-obstetric-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {})
				, note_id:note_id
				, type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Obstetric successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editFamilyEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterFamilyDataEdit' ] ); -->",
			data: {
				cc_data:$('#edit-fhx-form').serializeArray().reduce(function(obj, item) {
					obj[item.name] = item.value;
					return obj;
				}, {}), 
				note_id:note_id,
				type:2
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Family Histories successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editAllergyReactionsEditModal(note_id)
	{
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterAllergyReactionsEdit' ] ); -->",
			data: {cc_data:$('#edit-reaction-form').serializeArray(), note_id:note_id, type:1},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Allergy successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function editSystemReviewEditModal(note_id)
	{
		let gene_tab_form = $("#gene_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let eyes_tab_form = $("#eyes_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let nose_tab_form = $("#nose_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let mouth_tab_form = $("#mouth_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let neck_tab_form = $("#neck_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let groin_tab_form = $("#groin_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let hands_tab_form = $("#hands_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let breast_tab_form = $("#breast_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let cardio_tab_form = $("#cardio_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let res_tab_form = $("#res_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let abdomen_tab_form = $("#abdomen_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let extermity_tab_form = $("#extermity_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		let nerological_tab_form = $("#nerological_tab_form" + note_id).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj;}, {})
		$.ajax({
            type: 'POST',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'systemReviewEdit' ] ); -->",
			data: {
				gene_tab_form: gene_tab_form,
				eyes_tab_form: eyes_tab_form,
				nose_tab_form: nose_tab_form,
				mouth_tab_form: mouth_tab_form,
				neck_tab_form: neck_tab_form,
				groin_tab_form: groin_tab_form,
				hands_tab_form: hands_tab_form,
				breast_tab_form: breast_tab_form,
				cardio_tab_form: cardio_tab_form,
				res_tab_form: res_tab_form,
				abdomen_tab_form: abdomen_tab_form,
				extermity_tab_form: extermity_tab_form,
				nerological_tab_form: nerological_tab_form, 
				note_id:note_id, type:1
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				if(res == 1){
					clinicalEncounterTab()
					alertify.success('Review successfully edited')
				}else{
					alertify.error('Something went wrong')
				}
            }
        });
	}
	function showAllEncounteredProblems(name) {
        $('.modal-body.encounter_problems').load("<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getAllPatientEncounterNote', $patient->id]) -->", function() {
            $('#all_encountered_problems').modal({
                show: true
            });
        });
    }
</script>

<!-- php: =$this->Html->script("../assets/js/fabric.js") --> 

<script>
  // Create Fabric.js Canvas
  var canvas = new fabric.Canvas('canvas');

  // Load an Image
  fabric.Image.fromURL(window.location.origin + '/assets/img/human_front.png', function(img) {
    // Calculate the scaling factors
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Calculate aspect ratio
    const widthRatio = canvasWidth / imgWidth;
    const heightRatio = canvasHeight / imgHeight;
    const scale = Math.min(widthRatio, heightRatio); // Choose the smaller ratio to maintain aspect ratio

    // Set the image size and position
    img.scale(scale); // Scale the image
    img.set({
      left: (canvasWidth - img.width * scale) / 2, // Center the image horizontally
      top: (canvasHeight - img.height * scale) / 2  // Center the image vertically
    });

    // Add image to canvas
    img.set({ selectable: false }); // Make the image non-selectable
    canvas.add(img);
    canvas.renderAll(); // Refresh the canvas
  }, {crossOrigin: 'anonymous'});

  // Function to Add a Rectangle
  function addRectangle() {
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'rgba(255, 0, 0, 0.5)',  // Semi-transparent red
      width: 100,
      height: 50,
      stroke: 'black',
      strokeWidth: 2,
      selectable: true  // Allow interaction with the shape
    });
    canvas.add(rect);
  }

  // Function to Add a Circle
  function addCircle() {
    var circle = new fabric.Circle({
      left: 200,
      top: 100,
      fill: 'rgba(0, 255, 0, 1)',  // Semi-transparent blue
      radius: 10,
      stroke: 'black',
      strokeWidth: 2,
      selectable: true  // Allow interaction with the shape
    });
    canvas.add(circle);
  }

  // Enable interaction (moving, resizing, rotating)
  canvas.on('object:moving', function(e) {
    // Handle when shapes are moved
    console.log('Object is being moved', e.target);
  });

  canvas.on('object:scaling', function(e) {
    // Handle when shapes are resized
    console.log('Object is being resized', e.target);
  });

  canvas.on('object:rotating', function(e) {
    // Handle when shapes are rotated
    console.log('Object is being rotated', e.target);
  });

  function submitImage() {
    // Convert the canvas to a data URL
    var dataURL = canvas.toDataURL('image/png');
    
    // Set the data URL to the hidden input field
    document.getElementById('canvasImage').value = dataURL;
    
    // Submit the form
    // document.getElementById('imageForm').submit();
	return dataURL
  }

</script>
`;

export default function ElementElementPatientvisitSymptomEyeSymptoms() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
