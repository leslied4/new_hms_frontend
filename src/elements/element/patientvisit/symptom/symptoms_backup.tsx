const rawHtml = `
<!-- php: $symptomValue = $selectedVisit->patient_visit_symptom; $patientComplaints = $selectedVisit->patient_visit_complaints; $patientSystemReviews = $selectedVisit->patient_visit_system_reviews; $patientVisitsProvisionalDiagnoses = $selectedVisit-... -->
<!-- php: $hydration = [ 'No Hydration' => 'No Hydration', 'Mild Hydration' => 'Mild Hydration', 'Moderate Hydration' => 'Moderate Hydration', 'Severe Hydration' => 'Severe Hydration' ]; $mental_state = [ 'Oriented' => 'Oriented', 'Confused' => 'Conf... -->



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

		/* .tabs {
			display: flex;
			list-style: none;


		}

		.tabs li {
			display: block;
			width: 33.33%;
			text-align: center;
			background-color: #f6f6f6;
			padding: 15px 0px;
			border: 1px solid #ccc;
			cursor: pointer;
			font-size: 17px;
		}

		.tabs li.active,
		.tabs li:hover {
			background-color: #fff;
			border: none;
			border-top: 4px solid #428BCA;
			transition: 0.1s;
		}

		.container .content .symptoms,
		.container .content .examinations,
		.container .content .history {
			padding: 40px 0px 25px 0px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.container .content>div:not(.visible) {
			display: none;
		} */

		/* .dropdown {
			display: inline-block;
			position: relative;
		}


		.dropdown:hover {
			filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
		}

		.dropdown>div {
			background-color: #fff;
			z-index: 1;
			visibility: hidden;
			position: absolute;
			min-width: 100%;
			opacity: 0;
			transition: .3s;
		}

		.dropdown .submenu {
			position: relative;
		}

		.dropdown .submenu>div {
			background-color: #fff;
			visibility: hidden;
			position: absolute;
			left: 100%;
			top: 0;
			transition: .3s;
			opacity: 0;
		}


		.dropdown .submenu:hover>div {
			visibility: visible;
			opacity: 1;
		}

		.dropdown:hover>div {
			visibility: visible;
			opacity: 1;
		}

		.dropdown a {
			display: block;
			text-decoration: none;
			padding: 8px;
			color: #000;
			transition: .1s;
			white-space: nowrap;
		}

		.dropdown a:hover,
		.dropdown .submenu:hover>a {
			background-color: deepskyblue;
			color: #fff;
		} */

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



		/*Textbox*/

		/* .ck-editor__editable {
			min-width: 480px;
			max-width: 1500px;
			width: 1250px;
			height: 200px;

		} */

		.ck.ck-editor {
			width: 100%;
		}

		/*Toolbar*/
		/* .ck-editor__top {
			min-width: 480px;
			max-width: 1500px;
			width: 1250px;
			width: 1300px;
		} */

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
				<span class="caption-subject font-dark bold uppercase mr-5">Clinical Encounter Notes</span>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="checkbox" id="previous_enc_checkbox" value="option1">
					<label class="form-check-label" for="previous_enc_checkbox">Previous Encounter Reviewed</label>
				</div>
			</div>

			<div class="float-right">
				<div class="row" style="padding-right: 30px;">
					<a href="#newNoteCollapse" class="btn btn-primary mr-2 d-none" type="button" data-toggle="collapse" aria-expanded="false" role="button" id="newNote_btn" aria-controls="newNoteCollapse">New Notes</a>
					<a href="javascript:;" class="btn btn-danger mr-2">Report</a>
					<a href="javascript:;" class="btn btn-secondary">Care Flow</a>

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
						<input type="text" placeholder="Type to search note..">
						<div class="autocom-box">
							<!-- here list are inserted from javascript -->
						</div>
						<div class="icon"><i class="material-icons">search</i></div>
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



									<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>


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
														<!-- <li class="nav-item">
															<a href="#cs_tab" class="nav-link active" data-toggle="tab"> Cardiovascular System </a>
														</li>
														<li class="nav-item">
															<a href="#cns_tab" data-toggle="tab"> Central Nervous System </a>
														</li>
														<li class="nav-item">
															<a href="#endocrine_tab" data-toggle="tab"> Endocrine </a>
														</li>
														<li class="nav-item">
															<a href="#gas_tab" data-toggle="tab"> Gastrointestinal </a>
														</li>
														<li class="nav-item">
															<a href="#gen_tab" data-toggle="tab"> Genitourinary </a>
														</li>
														<li class="nav-item">
															<a href="#haem_tab" data-toggle="tab"> Haemopoietic </a>
														</li>
														<li class="nav-item">
															<a href="#joint_tab" data-toggle="tab"> Locomotor and Joint </a>
														</li>
														<li class="nav-item">
															<a href="#respiratory_tab" data-toggle="tab"> Respiratory </a>
														</li>
														<li class="nav-item">
															<a href="#skin_tab" data-toggle="tab"> Skin </a>
														</li> -->
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
										<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
										<!-- <a href="javascript:;" class="btn btn-sm btn-success float-right mr-3 saveBtn">Save</a> -->
										<!--//buttons-->
									</div>
								</div>
							</div>
							<!--//on direct questioning accordion-->

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
															<form id='illnessForm'>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Time Period

																		</label>
																		<div class="input-group col-md-7">
																			<input class="form-control set_date" id="illness_period" name="illness_period" size="16" type="text" placeholder="Enter Illness Time Period" style="max-height: 35px;" readonly="">
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
															</form>
															<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
														</div>
														<div class="tab-pane" id="past_active_medication_tab">
															<div class="card-body">
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
																		<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
																		<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
																	</div>
																</div>
															</div>
														</div>
														<div class="tab-pane" id="past_surgeries_tab">
															<form id="surgeriesForm">
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Time Period

																		</label>
																		<div class="input-group col-md-7">
																			<input class="form-control set_date" id="pmh_surgeries_period" name="surgeries_period" size="16" type="text" placeholder="Enter Surgery Time Period" style="max-height: 35px;" readonly="">
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
															</form>
															<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
														</div>
														<div class="tab-pane" id="past_haemo_tab">
															<form id="haemoForm">
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Time Period

																		</label>
																		<div class="input-group col-md-7">
																			<input class="form-control set_date" id="haemo_period" name="haemo_period" size="16" type="text" placeholder="Enter HaemoTransfusion Time Period" style="max-height: 35px;" readonly="">
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
															</form>
															<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
														</div>
														<div class="tab-pane" id="immu_hx_tab">
															<div class="card-body">
																<div class="row">
																	<textarea id="immu-editor" class="form-control" rows="5"></textarea>

																</div>
															</div>
															<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
															<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
														</div>
														
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!--//past medical history accordion-->
							<!--Allergy accordion-->
							<div class="accordionDiv mb-3 mx-3 ">
								<div id="allergyHeading" class="accordion-header bold " data-toggle="collapse" data-target="#allergyCollapse" aria-expanded="true" aria-controls="allergyCollapse">
									Allergy 
								</div>
								<div id="allergyCollapse" class="collapse" aria-labelledby="allergyHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<div class="borderBox light bordered col-md-12">
												<div class="borderBox-title tabbable-line">

													<ul class="nav nav-tabs">
														<li class="nav-item">
															<a href="#ah_history_tab" class="active show" data-toggle="tab"> History </a>
														</li>
														<!-- <li class="nav-item">
															<a href="#ah_notes_tab" data-toggle="tab"> Notes </a>
														</li> -->
													</ul>
												</div>
												<div class="borderBox-body">
													<div class="tab-content">
														<!--history tab-->
														<div class="tab-pane active show" id="ah_history_tab">
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
																							<SearchableSelectField class="form-control selectpicker" name="encounter_allergy_id" id="encounter_allergy_id" data-live-search="true">
																								<option value="">Select...</option>
																							</SearchableSelectField>
																						</div>
																					</div>
																					<div class="form-group row">
																						<label class="control-label col-md-3">Reactions
																						</label>
																						<div class="col-md-9">
																							<SearchableSelectField class="form-control selectpicker" name="encounter_allergy_reaction_id[]" id="encounter_allergy_reaction_id" data-live-search="true" multiple>
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
																							<input class="form-control set_date" size="16" type="text" placeholder="Enter Estimated Onset of Allergy" style="max-height: 35px;" readonly="">
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
									<a href="javascript:;" id="ah_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" id="ah_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
									<!-- <a href="javascript:;" id="ah_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
								</div>
							</div>
							<!--//Allergy accordion-->

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
									<a href="javascript:;" id="fh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" id="fh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
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
																									<option selected value="<!-- php: = $patient->occupation->id -->" r><!-- php: = $patient->occupation->name --></option>
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
																									<option selected value="<!-- php: = $patient->location->id -->"><!-- php: = $patient->location->name --></option>
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
																									<option selected value="<!-- php: = $patient->religion->id -->"><!-- php: = $patient->religion->name --></option>
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
																						</div>
																					</div>


																					<div class="form-group row">
																						<label class="control-label col-md-5">Alchohol Details

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="alcohol_details" id="alcohol_details" data-required="0" placeholder="Enter details" class="form-control input-height">
																						</div>
																					</div>

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
																						</div>
																					</div>

																					<div class="form-group row">
																						<label class="control-label col-md-5">Tobacco Details

																						</label>
																						<div class="col-md-7">
																							<input type="text" name="tobacco_details" id="tobacco_details" data-required="0" placeholder="Enter details " class="form-control input-height">
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

									<a href="javascript:;" id="psh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" id="psh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
									<!-- <a href="javascript:;" id="psh_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->

								</div>
							</div>
							<!--//Personal & Social History accorion-->

							<!-- php: if ($patient->gender_id == 2 && $patient->age > 12) { -->
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
															<li class="nav-item">
																<a href="#ch_viewHistory_tab" data-toggle="tab"> View History </a>
															</li>
															<li class="nav-item">
																<a href="#ch_notes_tab" data-toggle="tab"> Notes </a>
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
																								<SearchableSelectField class="form-control selectpicker " data-size="5" data-live-search="true" id="contraception_types">
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
																								<input class="form-control set_date" id="ch_dateStarted" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
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

															<!--view history tab-->
															<div class="tab-pane" id="ch_viewHistory_tab">
																<div class="card-body">
																	<div class="row">

																		<div class="col-md-12">



																			<!--view history table -->
																			<div class="pt-2 ">
																				<h3 class="bold">Recorded Contraception History</h3>
																				<!--Table-->
																				<div class="table-scrollable ">
																					<table class="table table-hover order-column full-width " id="contraception_history_table">
																						<thead>
																							<tr>
																								<th scope="col">Date Started</th>
																								<th scope="col">Type</th>
																								<th scope="col">Duration</th>
																								<th scope="col">Complication</th>

																							</tr>
																						</thead>



																					</table>
																				</div>

																			</div>







																		</div>

																	</div>

																</div>
															</div>


															<!--notes tab-->
															<div class="tab-pane" id="ch_notes_tab">
																<div class="card-body">
																	<div class="row">
																		<textarea id="chEditor" class="form-control notesEditor" rows="5"></textarea>

																	</div>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<a href="javascript:;" id="ch_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="ch_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
										<!-- <a href="javascript:;" id="ch_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									</div>
								</div>
								<!--//Contraceptions accorion-->
							<!-- php: } -->


							<!-- php: if ($patient->gender_id == 2 && $patient->age > 12) { -->

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
															<li class="nav-item">
																<a href="#ph_view_history_tab" data-toggle="tab">View History </a>
															</li>
															<li class="nav-item">
																<a href="#ph_notes_tab" data-toggle="tab"> Notes </a>
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
																				<form class='phForm'>
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
																								<input class="form-control set_date" id="date_conceived" name="date_conceived" size="16" type="text" placeholder="Enter date conceived" style="max-height: 35px;" readonly="">
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
															<!--view history tab-->
															<div class="tab-pane" id="ph_view_history_tab">
																<div class="card-body">
																	<div class="row">

																		<div class="col-md-12">



																			<!--view history table -->
																			<div class="pt-2 ">
																				<h3 class="bold">Recorded Pregnancy History</h3>
																				<!--Table-->
																				<div class="table-scrollable d-none">
																					<table class="table table-hover order-column full-width " id="pregnancy_history_table">
																						<thead>
																							<tr>
																								<th scope="col">Date Started</th>
																								<th scope="col">Type</th>
																								<th scope="col">Duration</th>
																								<th scope="col">Complication</th>

																							</tr>
																						</thead>



																					</table>
																				</div>

																			</div>







																		</div>

																	</div>

																</div>
															</div>


															<!--notes tab-->
															<div class="tab-pane" id="ph_notes_tab">
																<div class="card-body">
																	<div class="row">
																		<textarea id="phEditor" class="form-control notesEditor" rows="5"></textarea>

																	</div>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>
										<a href="javascript:;" id="ph_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="ph_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
										<!-- <a href="javascript:;" id="ph_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									</div>
								</div>
								<!--//Pregnancy History accorion-->


							<!-- php: } -->



							<!-- php: if ($patient->gender_id == 2 && $patient->age > 12) { -->
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
															<li class="nav-item">
																<a href="#gh_notes_tab" data-toggle="tab"> Notes </a>
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
																								<input class="form-control set_date" id="date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
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
																								<SearchableSelectField class="form-control selectpicker " id="gyna_volume" aria-label="Default select example" data-live-search="false">
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
																								<SearchableSelectField class="form-control selectpicker " id="intermenstrual_bleeding" data-live-search="false">
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
																								<input type="text" min="0" step="1" id="dysmenorrhoea_details" data-required="0" placeholder="Enter Dysmenorrhoea Details" class="form-control input-height">
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
										<a href="javascript:;" id="gh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="gh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
										<!-- <a href="javascript:;" id="gh_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
										<!--//buttons-->
									</div>
								</div>
								<!--//Gynaecological History accorion-->
							<!-- php: } -->



							<!-- php: if ($patient->gender_id == 2 && $patient->age > 12) { -->
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
																								<input class="form-control set_date" id="oh_date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
																								<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
																							</div>
																						</div>


																						<div class="form-group row">
																							<label class="control-label col-md-5">Date of positive pregnancy test

																							</label>
																							<div class="input-group col-md-7">
																								<input class="form-control set_date" id="date_of_positive_pregnancy_test" name="date_of_positive_pregnancy_test" size="16" type="text" placeholder="Enter date of positive pregnant test" style="max-height: 35px;" readonly="">
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
																								<input class="form-control set_date" id="date_of_scan" name="date_of_scan" size="16" type="text" placeholder="Enter date of scan" style="max-height: 35px;" readonly="">
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
																								<input type="text" name="edd" id="edd" data-required="0" placeholder="Enter edd" class="form-control input-height">
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
										<a href="javascript:;" id="oh_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
										<a href="javascript:;" id="oh_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
										<!-- <a href="javascript:;" id="oh_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									</div>
								</div>
								<!--//Obstetric History accorion-->
							<!-- php: } -->

							<!--Review of Systems/Examinations accordion-->
							<div class="accordionDiv mb-3  mx-3 mb-4">
								<div id="reviewHeading" class="accordion-header bold " data-toggle="collapse" data-target="#reviewCollapse" aria-expanded="true" aria-controls="reviewCollapse">
									Review of Systems/Examinations
								</div>



								<div id="reviewCollapse" class="collapse" aria-labelledby="reviewHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<div class="borderBox light bordered col-md-12">
												<div class="borderBox-title tabbable-line">

													<ul class="nav nav-tabs" style="float:left">
														<li class="nav-item ">
															<a href="#gene_tab" class="active" data-toggle="tab"> General </a>
														</li>
														<li class="nav-item ">
															<a href="#eyes_tab" class="" data-toggle="tab"> Eyes </a>
														</li>
														<li class="nav-item ">
															<a href="#nose_tab" class="" data-toggle="tab"> Nose </a>
														</li>
														<li class="nav-item ">
															<a href="#mouth_tab" class="" data-toggle="tab"> Mouth </a>
														</li>
														<li class="nav-item ">
															<a href="#neck_tab" class="" data-toggle="tab"> Neck </a>
														</li>
														<li class="nav-item ">
															<a href="#groin_tab" class="" data-toggle="tab"> Groin </a>
														</li>
														<li class="nav-item ">
															<a href="#hands_tab" class="" data-toggle="tab"> Hands </a>
														</li>
														<li class="nav-item ">
															<a href="#breast_tab" class="" data-toggle="tab"> Breast </a>
														</li>
														<li class="nav-item ">
															<a href="#cardio_tab" class="" data-toggle="tab"> Cardiovascular </a>
														</li>
														<li class="nav-item">
															<a href="#res_tab" data-toggle="tab"> Respiratory </a>
														</li>
														<li class="nav-item">
															<a href="#abdomen_tab" data-toggle="tab"> Abdomen </a>
														</li>
														<li class="nav-item">
															<a href="#extermity_tab" data-toggle="tab"> Extremity </a>
														</li>
														<li class="nav-item">
															<a href="#nerological_tab" data-toggle="tab"> Neurological </a>
														</li>
													</ul>
												</div>
												<div class="borderBox-body">
													<div class="tab-content">
														<div class="tab-pane active show" id="gene_tab">
															<form id='addGeneralExamForm'>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Temperature

																		</label>
																		<div class="col-md-7">
																			<input type="number" name="temperature" id="general_exam_temperature" placeholder="Enter temperatue" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Pulse

																		</label>
																		<div class="col-md-7">
																			<input type="number" name="pulse" id="general_exam_pulse" placeholder="Enter pulse" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Respiratory Rate

																		</label>
																		<div class="col-md-7">
																			<input type="number" name="respiratory_rate" id="general_exam_respiratory_rate" placeholder="Enter respiratory rate" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Hydration

																		</label>
																		<div class="col-md-7">
																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($hydration as $key => $selectVal) { -->
																					<input class="form-check-input" type="radio" name="hydration" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><!-- php: = $selectVal --></label>
																					<!-- php: } -->
																			</div>
																		</div>
																	</div>



																	<div class="form-group row">
																		<label class="control-label col-md-5">Distress

																		</label>
																		<div class="col-md-7">
																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																					<input class="form-check-input" type="radio" name="distress" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																					<!-- php: } -->
																			</div>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Distress Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="distress_details" id="distress_details" data-required="0" placeholder="Enter distress details" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Mental State

																		</label>
																		<div class="col-md-7">
																			
																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($mental_state as $key => $selectVal) { -->
																					<input class="form-check-input" type="radio" name="mental_state" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><!-- php: = $selectVal --></label>
																					<!-- php: } -->
																			</div>
												
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Constitution

																		</label>
																		<div class="col-md-7">
																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($constitution as $key => $selectVal) { -->
																					<input class="form-check-input" type="radio" name="constitution" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><!-- php: = $selectVal --></label>
																					<!-- php: } -->
																			</div>
																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Pallor

																		</label>
																		<div class="col-md-7">
																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																					<input class="form-check-input" type="radio" name="pallor" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																					<!-- php: } -->
																			</div>
																		
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Pallor Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="pallor_details" id="pallor_details" data-required="0" placeholder="pallor details" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Jaundice

																		</label>
																		<div class="col-md-7">

																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																					<input class="form-check-input" type="radio" name="jaundice" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																					<!-- php: } -->
																			</div>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Jaundice Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="jaundice_details" id="jaundice_details" data-required="0" placeholder="Jaundice Details" class="form-control input-height" />
																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Cyanosis

																		</label>
																		<div class="col-md-7">
																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																					<input class="form-check-input" type="radio" name="cyanosis" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																					<!-- php: } -->
																			</div>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Cyanosis Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="cyanosis_details" id="cyanosis_details" data-required="0" placeholder="Cyanosis Details" class="form-control input-height" />
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Oedema

																		</label>
																		<div class="col-md-7">
																			<div class="form-check form-check-inline">
																				<!-- php: foreach ($YesNo as $key => $selectVal) { if($key == 'Yes'){ $color = 'background-color: #00b300;'; }else{ $color = 'background-color: #d63031;'; } -->
																					<input class="form-check-input" type="radio" name="oedema" id="inlineRadio1" value="<!-- php: = $selectVal -->">
																					<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="<!-- php: = $color -->"><!-- php: = $selectVal --></span></label>
																					<!-- php: } -->
																			</div>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Environment

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="environment" id="environment" data-required="0" placeholder="Enter environment" class="form-control input-height" />
																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height" />
																		</div>
																	</div>
																</div>
															</form>
														</div>
														<div class="tab-pane" id="eyes_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Sclera Colour

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="sclera_colour" id="sclera_colour" data-required="0" placeholder="Enter sclera colour" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Conjunctiva

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="conjunctiva" id="eye_exam_conjunctiva">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Pale">Pale</option>
																				<option value="Congested">Congested</option>
																			</SearchableSelectField>

																		</div>
																	</div>



																	<div class="form-group row">
																		<label class="control-label col-md-5">Discharge

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="discharge" id="eye_exam_discharge">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Discharge Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="discharge_details" id="discharge_details" data-required="0" placeholder="Enter tremors details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Strabismus (squint)

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="strabismus " id="strabismus">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Strabismus (squint) Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="strabismus_details" id="strabismus_details" data-required="0" placeholder="Strabismus (squint) details" class="form-control input-height">
																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Exophthalmos

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="exophthalmos" id="exophthalmos">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Exophthalmos Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="exophthalmos" id="exophthalmos_details" data-required="0" placeholder="exophthalmos" class="form-control input-height">
																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Fundoscopy

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="fundoscopy" id="fundoscopy" data-required="0" placeholder="Enter fundoscopy" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
																		</div>
																	</div>




																</div>
															</form>
														</div>
														<div class="tab-pane" id="nose_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Flaring alae nasae

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="flaring_alae_nasae" id="nose_exam_nasae">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Discharge

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="discharge" id="nose_exam_discharge">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Discharge Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="discharge_details" id="nose_discharge_details" data-required="0" placeholder="Enter discharge details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Paranasal Tenderness

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="paranasal_tenderness" id="paranasal_tenderness">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Paranasal Tenderness Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="paranasal_tenderness_details" id="paranasal_tenderness_details" data-required="0" placeholder="Enter paranasal tenderness details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="nose_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
																		</div>
																	</div>

																</div>
															</form>
														</div>
														<div class="tab-pane" id="mouth_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Lips

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="lips" id="lips">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Fissuring">Fissuring</option>
																				<option value="Discharge">Discharge</option>
																				<option value="Cheilitis">Cheilitis</option>
																			</SearchableSelectField>

																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Tongue

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="tongue" id="tongue" data-required="0" placeholder="Enter tongue" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Teeth

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="teeth" id="teeth" data-required="0" placeholder="Enter teeth" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Gums

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="gums" id="gums" data-required="0" placeholder="Enter gum" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Pharynx

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="pharynx" id="pharynx" data-required="0" placeholder="Enter pharynx" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Signifcant Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_significant_findings" id="other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height">
																		</div>
																	</div>



																</div>
															</form>
														</div>
														<div class="tab-pane" id="neck_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Lymph Nodes

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="lymph_node" id="neck_exam_lymph_node" data-required="0" placeholder="Enter lymph nodes" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Thyroid Gland

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="thyroid_gland" id="neck_exam_thyroid_gland" data-required="0" placeholder="Enter thyroid gland" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Signifcant Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" id="neck_exam_other_significant_findings" name="other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height">
																		</div>
																	</div>

																</div>
															</form>
														</div>
														<div class="tab-pane" id="groin_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Lymph Nodes

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="lymph_node" id="groin_exam_lymph_node" data-required="0" placeholder="Enter lymph nodes" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Signifcant Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_significant_findings" id="groin_exam_other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height">
																		</div>
																	</div>

																</div>
															</form>
														</div>
														<div class="tab-pane" id="hands_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Lymph Nodes

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="lymph_node" id="hands_exam_lymph_node" data-required="0" placeholder="Enter lymph nodes" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Signifcant Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_significant_findings" id="hands_exam_other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height">
																		</div>
																	</div>



																</div>
															</form>
														</div>
														<div class="tab-pane" id="breast_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Inspection

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="inspection" id="inspection" data-required="0" placeholder="Enter inspection" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Palpation

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="palpation" id="palpation" data-required="0" placeholder="Enter palpation" class="form-control input-height">
																		</div>
																	</div>

																</div>
															</form>
														</div>
														<div class="tab-pane" id="cardio_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Pulse

																		</label>

																		<div class="col-md-7">
																			<input type="text" name="pulse" id="cardio_exam_pulse" data-required="0" placeholder="Enter pulse" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Rate

																		</label>

																		<div class="col-md-7">
																			<input type="text" name="rate" id="cardio_exam_rate" data-required="0" placeholder="Enter rate" class="form-control input-height">
																		</div>
																	</div>


																	<div class="form-group row">
																		<label class="control-label col-md-5">Rhythm

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="rhythm" id="cardio_exam_rhythm">
																				<option value="">Select...</option>
																				<option value="regular">regular</option>
																				<option value="regularly irregular">regularly irregular</option>
																				<option value="irregularly irregular">irregularly irregular</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Volume

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " id="cardio_exam_volume">
																				<option value="">Select...</option>
																				<option value="normal">normal</option>
																				<option value="large">large</option>
																				<option value="small">small</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Character

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="character" id="cardio_exam_character">
																				<option value="">Select...</option>
																				<option value=""></option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Vessel Walls

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="vessel_walls" id="cardio_exam_vessel_walls">
																				<option value="">Select...</option>
																				<option value=""></option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Radio-Femoral Delay

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="radio_femoral_delay" id="cardio_exam_radio_femoral_delay">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Blood Pressure

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="blood_pressure" id="cardio_exam_blood_pressure" data-required="0" placeholder="Enter blood pressure" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Posture

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="posture" id="cardio_exam_posture">
																				<option value="">Select...</option>
																				<option value="supine">supine</option>
																				<option value="sitting">sitting</option>
																				<option value="standing">standing</option>
																				<option value="semi-reclining (45 degrees)">semi-reclining(45 degrees)</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Jugular Venous Pressure

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="jugular_venous_pressure" id="cardio_exam_jugular_venous_pressure" data-required="0" placeholder="Enter jugular venous pressure" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Variscosities

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="variscosities" id="cardio_exam_variscosities" data-required="0" placeholder="Enter variscosities" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Oedema Heart

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="oedema_heart" id="cardio_exam_oedema_heart">
																				<option value="">Select...</option>
																				<option value="none">none</option>
																				<option value="non-pitting">none-pitting</option>
																				<option value="pitting">pitting</option>
																				<option value="generalised">generalised</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Oedema Heart Comment

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="oedema_heart_comment" id="cardio_exam_oedema_heart_comment" data-required="0" placeholder="Enter oedema heart comments" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Dyspnoea

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="dyspnoea" id="cardio_exam_dyspnoea">
																				<option value="">Select...</option>
																				<option value="at rest">at rest</option>
																				<option value="with ordinary activities">with ordinary activities</option>
																				<option value="with mild exertion">with mild exertion</option>
																				<option value="none">none</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Chest

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="chest" id="cardio_exam_chest">
																				<option value="">Select...</option>
																				<option value="normal">normal</option>
																				<option value="pigeon chest">pigeon chest</option>
																				<option value="funnel chest">funnel chest</option>
																				<option value="kyphoscoliosis">kyphoscoliosis</option>
																				<option value="other">other</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Apex beat Location

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="apex_beat_location" id="cardio_exam_apex_beat_location" data-required="0" placeholder="Enter apex beat location" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Percussion

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="percussion" id="cardio_exam_percussion" data-required="0" placeholder="Enter percussion" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">First Heart Sound

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="first_heart_sound" id="cardio_exam_first_heart_sound" data-required="0" placeholder="Enter first heart sound" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Second Heart Sound

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="second_heart_sound" id="cardio_exam_second_heart_sound" data-required="0" placeholder="Enter second heart sound" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Murmurs and Added Sounds

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="murmurs_and_added_sounds" id="cardio_exam_murmurs_and_added_sounds" data-required="0" placeholder="Enter murmers and added sounds" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="cardio_exam_other_findings" data-required="0" placeholder="Enter other_findings" class="form-control input-height">
																		</div>
																	</div>



																</div>
															</form>
														</div>
														<div class="tab-pane" id="res_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Respiratory Rate

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="respiratory_rate" id="respiratory_exam_rr" data-required="0" placeholder="Enter respiratory rate" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Rhythm

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="rhythm" id="respiratory_exam_rhythm">
																				<option value="">Select...</option>
																				<option value="Regular">Regular</option>
																				<option value="Irregular">Irregular</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Rhythm Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="rhythm_details" id="respiratory_exam_rhythm_details" data-required="0" placeholder="Enter rhythm details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Depth

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="depth" id="respiratory_exam_depth">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Increased">Increased</option>
																				<option value="Shallow">Shallow</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Breath Sounds

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="breath_sounds" id="respiratory_exam_breath_sounds">
																				<option value="">Select...</option>
																				<option value="Quiet">Quiet</option>
																				<option value="Stridor">Stridor</option>
																				<option value="Wheezing">Wheezing</option>
																				<option value="Bubbling">Bubbling</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Use of Accessory Muscles

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="use_of_accessory_muscles" id="respiratory_exam_use_of_accessory_muscles">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Chest Movement

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="chest_movement" id="respiratory_exam_chest_movement">
																				<option value="">Select...</option>
																				<option value="Even">Even</option>
																				<option value="Uneven">Uneven</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Chest Symmetry

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="chest_symmetry" id="respiratory_exam_chest_symmetry">
																				<option value="">Select...</option>
																				<option value="Central">Central</option>
																				<option value="Displaced">Displaced</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Trachea

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="trachea" id="respiratory_exam_trachea">
																				<option value="">Select...</option>
																				<option value="Symmetrical">Symmetrical</option>
																				<option value="Asymmetrical">Asymmetrical</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Chest Tenderness

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="chest_tenderness" id="respiratory_exam_chest_tenderness">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>



																	<div class="form-group row">
																		<label class="control-label col-md-5">Chest Tenderness details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="chest_tenderness_details" id="respiratory_exam_chest_tenderness_details" data-required="0" placeholder="Enter chest tenderness details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Vocal Fremitus

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="vocal_fremitus" id="respiratory_exam_vocal_fremitus">
																				<option value="">Select...</option>
																				<option value="Dull">Dull</option>
																				<option value="Increased on left">Increased on left</option>
																				<option value="Increased on right">Increased on right</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Percussion

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="percussion" id="respiratory_exam_percussion">
																				<option value="">Select...</option>
																				<option value="Dull">Dull</option>
																				<option value="Stony dull">Stony dull</option>
																				<option value="Normal">Normal</option>
																				<option value="Resonant">Resonant</option>
																				<option value="Hyperresonant">Hyperresonant</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Percussion details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="percussion_details" id="respiratory_exam_percussion_details" data-required="0" placeholder="Enter percussion details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Air Entry

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="air_entry" id="respiratory_exam_air_entry">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Increased">Increased</option>
																				<option value="Decreased">Decreased</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Breath sounds (auscultation)

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="breath_sounds_auscultation" id="respiratory_exam_breath_sounds_auscultation">
																				<option value="">Select...</option>
																				<option value="Vesicular">Vesicular</option>
																				<option value="Bronchial">Bronchial</option>
																				<option value="Diminished">Diminished</option>
																				<option value="Silent Chest">Silent Chest</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Breath Sounds details (for auscultation)

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="breath_sounds_details_auscultation" id="respiratory_exam_breath_sounds_details_auscultation" data-required="0" placeholder="Enter breath sounds details for auscultation" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Added Sounds

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="added_sounds" id="respiratory_exam_added_sounds">
																				<option value="">Select...</option>
																				<option value="None">None</option>
																				<option value="Wheezes (rhonchi)">Wheezes (rhonchi)</option>
																				<option value="Crackles (crepitations)">Crackles (crepitations)</option>
																				<option value="Pleural rub">Pleural rub</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="respiratory_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
																		</div>
																	</div>


																</div>
															</form>
														</div>
														<div class="tab-pane" id="abdomen_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Skin

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="skin" id="abdomen_exam_skin">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Wrinkled">Wrinkled</option>
																				<option value="Shiny">Shiny</option>
																				<option value="Tense">Tense</option>
																				<option value="Oedematous">Oedematous</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Contour

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="contour" id="abdomen_exam_contour">
																				<option value="">Select...</option>
																				<option value="Retracted">Retracted</option>
																				<option value="Flat">Flat</option>
																				<option value="Full">Full</option>
																				<option value="Distended">Distended</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Symmetry

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="symmetry" id="abdomen_exam_symmetry">
																				<option value="">Select...</option>
																				<option value="Asymmetrical">Asymmetrical</option>
																				<option value="Symmetrical">Symmetrical</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Movement

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="movement" id="abdomen_exam_movement">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Excessive">Excessive</option>
																				<option value="Absent">Absent</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Umbilicus

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="umbilicus" id="abdomen_exam_umbilicus">
																				<option value="">Select...</option>
																				<option value="Inverted">Inverted</option>
																				<option value="Everted">Everted</option>
																				<option value="Bulging">Bulging</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Hair Distribution

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="hair_distribution" id="abdomen_exam_hair_distribution">
																				<option value="">Select...</option>
																				<option value="Sparse">Sparse</option>
																				<option value="Female Pattern">Female Pattern</option>
																				<option value="Male Pattern">Male Pattern</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Visible Viens

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="visible_veins" id="abdomen_exam_visible_veins">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Visible Veins Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="visible_veins_details" id="abdomen_exam_visible_veins_details" data-required="0" placeholder="Enter visible vein details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Scars

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="scars" id="abdomen_exam_scars">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Scars Details

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="scars_details" id="abdomen_exam_scars_details" data-required="0" placeholder="Enter scars details" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Light Palpation

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="light_palpation" id="abdomen_exam_light_palpation" data-required="0" placeholder="Enter light palpation" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Liver

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="liver" id="abdomen_exam_liver" data-required="0" placeholder="Enter liver" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Spleen

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="spleen" id="abdomen_exam_spleen" data-required="0" placeholder="Enter spleen" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Kidneys

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="kidneys" id="abdomen_exam_kidneys" data-required="0" placeholder="Enter kidneys" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Uterus

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="uterus" id="abdomen_exam_uterus" data-required="0" placeholder="Enter uterus" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Masses

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_masses" id="abdomen_exam_other_masses" data-required="0" placeholder="Enter other masses" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Hernial Orifices

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="hernial_orifices" id="abdomen_exam_hernial_orifices" data-required="0" placeholder="Enter hernial orifices" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">External Genitalia

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="external_genitalia" id="abdomen_exam_external_genitalia" data-required="0" placeholder="Enter external genitalia" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Rectal Exam

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="rectal_exam" id="abdomen_exam_rectal_exam" data-required="0" placeholder="Enter rectal exam" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Bowel Sounds

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="bowel_sounds" id="abdomen_exam_bowel_sounds" data-required="0" placeholder="Enter bowel sounds" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Volume

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="volume" id="abdomen_exam_volume">
																				<option value="">Select...</option>
																				<option value="Present">Present</option>
																				<option value="Absent">Absent</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="abdomen_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
																		</div>
																	</div>


																</div>
															</form>
														</div>
														<div class="tab-pane" id="extermity_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Left Inspection

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="left_inspection" id="left_inspection" data-required="0" placeholder="Enter left inspection" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Left Tone

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="left_tone" id="left_tone">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Reduced">Reduced</option>
																				<option value="Increased">Increased</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Left Power

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="left_power" id="left_power">
																				<option value="">Select...</option>
																				<option value="0">0</option>
																				<option value="1">1</option>
																				<option value="2">2</option>
																				<option value="3">3</option>
																				<option value="4">4</option>
																				<option value="5">5</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Left Reflexes

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="left_reflexes" id="left_reflexes" data-required="0" placeholder="Enter left reflexes" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Left Sensation

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="left_sensation" id="left_sensation" data-required="0" placeholder="Enter left sensation" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Left Cordination

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="left_coordination" id="left_coordination" data-required="0" placeholder="Enter left coordination" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Right Inspection

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="right_inspection" id="right_inspection" data-required="0" placeholder="Enter right inspection" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Right Tone

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="right_tone" id="right_tone">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Reduced">Reduced</option>
																				<option value="Increased">Increased</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Right Power

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="right_power" id="right_power">
																				<option value="">Select...</option>
																				<option value="0">0</option>
																				<option value="1">1</option>
																				<option value="2">2</option>
																				<option value="3">3</option>
																				<option value="4">4</option>
																				<option value="5">5</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Right Reflexes

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="right_reflexes" id="right_reflexes" data-required="0" placeholder="Enter right reflexes" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Right Sensation

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="right_sensation" id="right_sensation" data-required="0" placeholder="Enter right sensation" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Right Cordination

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="right_coordination" id="right_coordination" data-required="0" placeholder="Enter right coordination" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Autonomic System

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="autonomic_system" id="autonomic_system" data-required="0" placeholder="Enter autonomic system" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="extremities_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
																		</div>
																	</div>



																</div>
															</form>
														</div>
														<div class="tab-pane" id="nerological_tab">
															<form>
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Eye Opening

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="eye_opening" id="eye_opening" data-required="0" placeholder="Enter eye opening" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Verbose Response

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="verbose_response" id="neurology_exam_verbose_response" data-required="0" placeholder="Enter verbose response" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Best Motor Response

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="best_motor_response" id="best_motor_response" data-required="0" placeholder="Enter best motor response" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Score

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="score" id="score" data-required="0" placeholder="Enter score" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Pulpillary Response to Light

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="pulpillary_response_to_light" id="pulpillary_response_to_light" data-required="0" placeholder="Enter pulpillary response to light" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Speech

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="speech" id="neurology_exam_speech">
																				<option value="">Select...</option>
																				<option value="Normal">Normal</option>
																				<option value="Dysphasia">Dysphasia</option>
																				<option value="Dysarthria">Dysarthria</option>
																				<option value="Both">Both</option>
																				<option value="Not assessible">Not assessible</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Neck Stiffness

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="neck_stiffness" id="neck_stiffness">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Kernig's Sign

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="kernigs_sign" id="kernigs_sign">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Brudzinski Sign

																		</label>
																		<div class="col-md-7">

																			<SearchableSelectField class="form-control selectpicker " name="brudzinski_sign" id="brudzinski_sign">
																				<option value="">Select...</option>
																				<option value="Yes">Yes</option>
																				<option value="No">No</option>
																			</SearchableSelectField>

																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Cranial Nerves

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="cranial_nerves" id="cranial_nerves" data-required="0" placeholder="Enter cranial nerves" class="form-control input-height">
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Other Findings

																		</label>
																		<div class="col-md-7">
																			<input type="text" name="other_findings" id="neurology_exam_other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height">
																		</div>
																	</div>



																</div>
															</form>
														</div>
														<!--notes tab-->
														<div class="tab-pane" id="exam_notes_tab">
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


									<!--buttons-->





									<a href="javascript:;" id="review_closeBtn" class="btn btn-sm btn-danger float-right mr-4 closeBtn"> Close</a>
									<a href="javascript:;" id="review_resetBtn" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>
									<!-- <a href="javascript:;" id="review_recordBtn" class="btn btn-sm btn-success float-right mr-3 mb-3 recordBtn">Record</a> -->
									<!--//buttons-->
								</div>
							</div>
							<!--//Review of Systems/Examinations accorion-->

							<!--remarks accordion-->
							<div class="accordionDiv  mx-3 mb-5 mt-5">
								<div id="remarkHeading" class="accordion-header bold " style="background:rgba(255, 255, 159,0.3) ;" data-toggle="collapse" data-target="#remarkCollapse" aria-expanded="true" aria-controls="remarkCollapse">
									Doctor's Remarks
								</div>



								<div id="remarkCollapse" class="collapse" aria-labelledby="remarkHeading" data-parent="#clinical_encounter_accordions">
									<div class="card-body">
										<div class="row">
											<textarea class="form-control" id="remarkEditor" rows="5"></textarea>

										</div>


									</div>


									<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-4 mb-3 closeBtn"> Close</a>
									<a href="javascript:;" class="btn btn-sm btn-secondary float-right mr-3 resetBtn"> Reset</a>


								</div>
							</div>
							<!--//remarks accorion-->

							<!--section buttons-->
							<div class="row col-md-12 " style="padding-right: 30px;">
								<a href="javascript:;" id="save_doctor_notess" class="btn btn-success btn-lg mr-2 uppercase" style="margin-left: auto;" onclick="finalizeEcounter()">Finalise encounter</a>
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
							<div class="card-header ">Medications <span class="float-right">(Active)</span> </div>
							<div class="card-body">

								<!--prescription section-->
								<span class=" text-primary">Prescriptions</span>
									<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>
									<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button> <br>
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
									<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>
									<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button> <br>								<div class="mb-3">
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
								<a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a>
							</div>
						</div>
						<!--//medication card-->
					</div>

					<div class="col-md-12">
						<!---allergy card-->
						<div class="card bg-light mb-3 allergyCard with-transform ">
							<div class="card-header ">Allergy <span class="float-right">(Active)</span> </div>
							<div class="card-body pl-3">
								<!-- <span class="bold">hay fever, asthma, eczema</span> <br> -->
								<span class="float-left text-primary">Allergy</span> 
									<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>
									<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button> <br>
								<div class="">
									<!--set class d-none when live-->
									<div class="allergy-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
								<span class="float-left text-primary">Allergy Reactions</span> <br>
								<div class="">
									<!--set class d-none when live-->
									<div class="allergy-reactions-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
							</div>
							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a>
							</div>
						</div>
						
						<!--//Allergy card-->
					</div>

					<div class="col-md-12">
						<!--Vitals card-->
						<div class="card bg-light mb-3 vitalsCard with-transform " style="border-color: <!-- php: = $patient->age <= 3 ? '#de5190' : ($patient->age <= 12 ? '#7030a0' : '#2e74b5') -->;">
							<div class="card-header " style="background: <!-- php: = $patient->age <= 3 ? '#ffe7f9' : ($patient->age <= 12 ? '#f1e0ff' : '#f4f7ff') -->;">Vitals <span class="float-right">(Last Entered)</span></div>
							<div class="card-body">
								<span class="float-left text-primary">Latest Vitals Taken</span> <br>
								<div class="">
									<!--set class d-none when live-->
									<div class="vitals-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>
							</div>
							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a>
							</div>
						</div>
						<!--//vitals card-->
					</div>


					<!-- php: if ($patient->gender_id == 2 && $patient->age > 12) { -->
						<div class="col-md-12">
							<!---Gynaecological History card-->
							<div class="card bg-light mb-3 allergyCard with-transform ">
								<div class="card-header ">Gynaecological History <span class="float-right">(Active)</span> </div>
								<div class="card-body pl-3">
									<span class="bold">metFORMIN 500 mg oral tablet </span> <br>
									<span class="bold">enalapril 20 mg oral tablet</span>

								</div>
								<div class="pr-3 pb-2">
									<a href="javascript:;" class="pull-right text-primary"> View All</a>
								</div>
							</div>
							<!--//Gynaecological History card-->


						</div>
					<!-- php: } -->




					<!-- php: if ($patient->gender_id == 2 && $patient->age > 12) { -->
						<div class="col-md-12">
							<!---Obstetric History card-->
							<div class="card bg-light mb-3 allergyCard with-transform ">
								<div class="card-header ">Obstetric History <span class="float-right">(Active)</span> </div>
								<div class="card-body pl-3">
									<span class="bold">metFORMIN 500 mg oral tablet </span> <br>
									<span class="bold">enalapril 20 mg oral tablet</span>

								</div>
								<div class="pr-3 pb-2">
									<a href="javascript:;" class="pull-right text-primary"> View All</a>
								</div>
							</div>
							<!--//Obstetric History card-->


						</div>
					<!-- php: } -->



					<div class="col-md-12">
						<!--labs cards-->
						<div class="card bg-light mb-3 labsCard with-transform ">
							<div class="card-header">Labs + Imaging <span class="float-right">(Last 4)</span></div>
							<div class="card-body">
								<p>
									<span class="bold d-none mt-4" id="labs_noneText">No Lab Tests Done</span>
								<ul class="ulLabs d-none" id="labs_section">


								</ul>
								</p>
							</div>
							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a>
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
								<span class="float-left text-primary">Complaints</span><br>
								<div class="">
									<!--set class d-none when live-->
									<div class="cc-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<!-- sadat -->
								<!--ODQs-->
								<span class="float-left text-primary">ODQs</span> <br>
								<div class="">
									<!--set class d-none when live-->
									<div class="odqs-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<!--Comorbidity-->
								<span class="float-left text-primary">Comorbidity</span> <br>
								<div class="">
									<!--set class d-none when live-->
									<div class="comorbidities-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>

								</div>
								<!--Diagnosis-->
								<span class="float-left text-primary">Diagnosis</span> <br>
								<div class="pl-4">
									<div>
										<!-- <span class="bold">Alveolitis <span class="badge badge-danger">k103</span></span> -->
									</div>
								</div>


								<!--System review-->
								<span class="float-left text-primary">System Review</span> <br>
								<div class="pl-4">


									<div class="row">
										<div class="col-md-6">
											<!-- <span class="bold">Cardiovascular </span> <br>
											<span class="bold">Eye </span> <br>
											<span class="bold">Respiratory </span> -->
										</div>

										<div class="col-md-6">
											<!-- <span class="badge badge-success">DONE</span> <br>
											<span class="badge badge-success">DONE</span> <br>
											<span class="badge badge-success">DONE</span> -->

										</div>


									</div>
								</div>



							</div>
							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-slate-900 text-primary"> View All System Reviews</a>
							</div>
						</div>
						<!--//Problems Card-->

					</div>


					<div class="col-md-12">
						<!--History card-->
						<div class="card bg-light mb-3 historyCard with-transform ">
							<div class="card-header ">History <span class="float-right">(Summary)</span></div>
							<div class="card-body">
								<span class="float-left text-primary">PMHx</span> <br>
								<div class="">
									<div class="pmhx-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<span class="float-left text-primary">PSHX</span> <br>
								<div class="">
									<div class="pshx-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>


								<span class="float-left text-primary">FHX</span> <br>
								<div class="">
									<div class="fhx-small-card" id="problem_complaints_noneText">
										<span class="">
											None
										</span>
									</div>
								</div>

								<span class="float-left text-primary">Hospitalization/Procedures</span> <br>
								<div class="pl-4">
									<span class="bold">05 May 2009</span> for 3 days, CPT <br>

								</div>
							</div>

							<div class="pr-3 pb-2">
								<a href="javascript:;" class="pull-right text-primary "> View All</a>
							</div>


						</div>
						<!--//History card-->

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
	<!--//medications - view all modal -->



	<!--//Modal Section-->





</div>


<script type="text/javascript">
	function clearDoctorsNote() {
		$('#title').val('');
		$('#notes').val('');
		//document.getElementById('notes').innerHTML = '';
	}
	function setTextToElement(id, text) {
			//get element and set text 
			$(\`#\${id}\`).text(\`\${text}\`);
	}
	//Symtoms 
	$(document).ready(function() {
		/************************GLOBAL****************/
		//global variables 

		// card section
		let array_labs, array_vitals, array_prescriptions, array_infusions, array_complaints, array_comorbidities, array_illness, array_surgeries, array_familyHistory, array_social;
		let pain;

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

			console.log("selected filter:" + id)

			//Get element 
			const element = $(\`.\${id}\`);
			console.log(element);

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


		$('.notesEditor').each(function() {

			ClassicEditor
				.create(document.querySelector(\`#\${$(this).attr('id')}\`), {
					placeholder: 'Type some text here...'
				})
				.then(editor => {

					allCkEditors.push(editor)
				})
				.catch(error => {
					console.error(error);
				});


		})






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


				console.log('family history');
				console.log(family_history);





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
		console.log(\`\${examShown}Div\`)

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

			//console.log('patient id:' + <!-- php: echo $patient_id --> + ', patient visit id:' + <!-- php: echo $patient_visit_id -->)



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
		// 	const gender = '<!-- php: echo $patient->gender_id -->';





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
			const editorData = \`<p> <b>My \${header} : Pain Level - \${pain}</b> </p>\`

			//Get editor for chief compliants
			const editor = allCkEditors[0]

			//get data from editor
			const prev_data = editor.getData();


			//add data to editor 
			editor.setData(prev_data + editorData);
		})

		//chief complaint drop ups
		// click on nested-header class (sub sub menu) for I Feel 
		$('.no-submenu').on('click', function() {


			//check if clicked element has a no-submenu class 
			if ($(this).hasClass('nested-submenu')) {

				const sub_header = $(this).text();
				const header = $(this).parent().siblings().text();

				const editorData = \`<p> <b>I Feel \${header} \${sub_header}</b> </p>\`
				//Get editor for chief compliants
				const editor = allCkEditors[0]

				//get data from editor
				const prev_data = editor.getData();

				//add data to editor 
				editor.setData(prev_data + editorData);
			} else {
				const header = $(this).text();

				const editorData = \`<p> <b>I Feel \${header}</b> </p>\`
				//Get editor for chief compliants
				const editor = allCkEditors[0]

				//get data from editor
				const prev_data = editor.getData();

				//add data to editor 
				editor.setData(prev_data + editorData);

			}
		})


		//chief complaint drop ups
		// click on nested-header class (sub sub menu) for I can't 
		$('.no-submenu-c').on('click', function() {


			//check if clicked element has a no-submenu class 
			if ($(this).hasClass('nested-submenu')) {

				const sub_header = $(this).text();
				const header = $(this).parent().siblings().text();

				const editorData = \`<p> <b>I can't \${header} \${sub_header}</b> </p>\`
				//Get editor for chief compliants
				const editor = allCkEditors[0]

				//get data from editor
				const prev_data = editor.getData();

				//add data to editor 
				editor.setData(prev_data + editorData);
			} else {
				const header = $(this).text();

				const editorData = \`<p> <b>I can't \${header}</b> </p>\`
				//Get editor for chief compliants
				const editor = allCkEditors[0]

				//get data from editor
				const prev_data = editor.getData();

				//add data to editor 
				editor.setData(prev_data + editorData);

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
	//prescription function 
	function passPrescriptionData(data) {
		//convert to array 
		array_prescriptions = data;



		//check if data is not null 
		if (data != null && array_prescriptions.length != 0) {



			//show medication section 
			$('#prescription_section').removeClass('d-none');



			//empty labs list
			$('#prescription_section').empty();

			//loop through 
			$.each(array_prescriptions, function(key, value) {

				//show only first 4
				if (key < 4) {
					//Append li to ul labs ul 
					$('#prescription_section').append(\`<li>
					<span class="bold">\${value.item_stock.item.full_name}</span> <br>
									</li>\`)
				}

			})




		} else {
			//show medication no given text 
			$('#prescription_noneText').removeClass('d-none')



		}
	}

	//infusions function 
	function passInfusionData(data) {
		//convert to array 
		array_infusions = data;

		console.log('infusion data')
		console.log(array_infusions);



		//check if data is not null 
		if (data != null && array_infusions.length != 0) {

			//show medication section 
			$('#infusion_section').removeClass('d-none');



			//empty labs list
			$('#infusion_section').empty();

			//loop through 
			$.each(array_infusions, function(key, value) {
				//get first 4 
				if (key < 4) {
					//Append li to ul labs ul 
					$('#infusion_section').append(\`<li><span class="bold">\${value.item_stock.item.full_name}</span> <br></li>\`)
				}
			})





		} else {
			//show medication no given text 
			$('#infusion_noneText').removeClass('d-none')
		}

	}

	//Medical History Function 
	function passMedicalHistoryData(data) {
		//convert to array 
		array_illness = data;

		console.log('Patient Illness data')
		console.log(array_illness);


		if (data != null && array_illness.length != 0) {

			//show ul list for illness 
			$('#illness_history_card').removeClass('d-none');

			//empty illness list
			$('#illness_history_card').empty();

			//loop through 
			$.each(array_illness, function(key, value) {
				//get first 4 
				if (key < 4) {
					//Append li to ul labs ul 
					$('#illness_history_card').append(\`<li><span class="bold">\${value.illness.name}</span> - \${value.comment} \${moment(value.time_period).format('DD MMM, YYYY') } </li>\`)
				}
			})


		} else {
			//show the none text for section
			$('#illness_noneText').removeClass('d-none');

		}

	}


	//Patient Comorbidities 
	function passComorbidity(data) {
		//convert to array 
		array_comorbidities = data;

		//check if data is not null 
		if (data != null && array_comorbidities.length != 0) {

			//show medication section 
			$('#problem_comorbidity_section').removeClass('d-none');

			//empty labs list
			$('#problem_comorbidity_section').empty();

			//loop through complaints array
			$.each(array_comorbidities, function(key, value) {
				//check if comment section is null 
				if (value.comment == "" || value.comment == null) {
					$('#problem_comorbidity_section').append(\`<span class="bold">\${value.illness.name}</span> started \${moment(new Date(value.date_added)).format("DD MMM YYYY")}\`)
				} else {
					//Append to section
					$('#problem_comorbidity_section').append(\`<span class="bold">\${value.illness.name}</span> (\${value.comment}) started \${moment(new Date(value.date_added)).format("DD MMM YYYY")}\`)
				}

			})



		} else {
			//show medication no given text 
			$('#problem_comorbidity_noneText').removeClass('d-none');

		}
	}




	//Patient Vitals Function for Card 
	function passVitals(data) {
		//convert to array 
		array_vitals = data;

		//check if data is not null 
		if (data != null && array_vitals.length != 0) {

			//show vitals section
			$('#vitals_section').removeClass('d-none')




			//get today date 
			const todayDate = new Date();


			//check latest reading date equals today
			if (todayDate.toDateString() == new Date(array_vitals[0].date_created).toDateString()) {

				//show vitals section div
				$('#today_vitals_section').removeClass('d-none');

				//set today's vitals 
				//date 
				setTextToElement('vitalsToday_date', moment(new Date(array_vitals[0].date_created)).format("MMM, DD YYYY HH:mm"))
				setTextToElement('blood_pressure_one_today', array_vitals[0].blood_pressure_1)
				setTextToElement('blood_pressure_two_today', array_vitals[0].blood_pressure_2)
				setTextToElement('heart_rate_today', array_vitals[0].heart_rate)
				setTextToElement('pulse_today', array_vitals[0].pulse)
				setTextToElement('os_today', array_vitals[0].oxygen_saturation)
				setTextToElement('temp_today', array_vitals[0].temperature)
				setTextToElement('rr_today', array_vitals[0].respiratory_rate)
				setTextToElement('height_today', array_vitals[0].height)
				setTextToElement('weight_today', array_vitals[0].weight)
				setTextToElement('mobility_today', array_vitals[0].mobility)


				//check if previous vitals record
				if (array_vitals[1] != null) {
					//show last section for vitals card 
					$('#previous_vitals_section').removeClass('d-none');

					//set Previous vitals
					setTextToElement('vitalsPrevious_date', moment(new Date(array_vitals[1].date_created)).format("MMM, DD YYYY HH:mm"))
					setTextToElement('blood_pressure_one_previous', array_vitals[1].blood_pressure_1)
					setTextToElement('blood_pressure_two_previous', array_vitals[1].blood_pressure_2)
					setTextToElement('heart_rate_previous', array_vitals[1].heart_rate)
					setTextToElement('pulse_previous', array_vitals[1].pulse)
					setTextToElement('os_previous', array_vitals[1].oxygen_saturation)
					setTextToElement('temp_previous', array_vitals[1].temperature)
					setTextToElement('rr_previous', array_vitals[1].respiratory_rate)
					setTextToElement('height_previous', array_vitals[1].height)
					setTextToElement('weight_previous', array_vitals[1].weight)
					setTextToElement('mobility_previous', array_vitals[1].mobility)

				}




			} else {

				// show No Readings Today Span
				$('#today_visitals_noneText').removeClass('d-none');

				//show last vitals section 
				$('#previous_vitals_section').removeClass('d-none');


				//set previous vitals reading
				setTextToElement('vitalsPrevious_date', moment(new Date(array_vitals[0].date_created)).format("MMM, DD YYYY HH:mm"))
				setTextToElement('blood_pressure_one_previous', array_vitals[0].blood_pressure_1)
				setTextToElement('blood_pressure_two_previous', array_vitals[0].blood_pressure_2)
				setTextToElement('heart_rate_previous', array_vitals[0].heart_rate)
				setTextToElement('pulse_previous', array_vitals[0].pulse)
				setTextToElement('os_previous', array_vitals[0].oxygen_saturation)
				setTextToElement('temp_previous', array_vitals[0].temperature)
				setTextToElement('rr_previous', array_vitals[0].respiratory_rate)
				setTextToElement('height_previous', array_vitals[0].height)
				setTextToElement('weight_previous', array_vitals[0].weight)
				setTextToElement('mobility_previous', array_vitals[0].mobility)










			}

		} else {
			//show no vitals recorded for vitals card 
			$('#vitals_noneText').removeClass('d-none')
		}
	}


	//Surgery History Function
	function passSurgeryHistory(data) {
		//convert to array 
		array_surgeries = data;

		console.log('Patient Surgeries data')
		console.log(array_surgeries);


		if (data != null && array_surgeries.length != 0) {

			//show ul list for surgery 
			$('#surgery_history_card').removeClass('d-none');

			//empty surgery list
			$('#surgery_history_card').empty();

			//loop through 
			$.each(array_surgeries, function(key, value) {
				//get first 4 
				if (key < 4) {
					//Append li to surgery history ul 
					$('#surgery_history_card').append(\`<li><span class="bold">\${value.surgery.name}</span> - \${value.comment} \${moment(value.time_period).format('DD MMM, YYYY') } </li>\`)
				}
			})


		} else {
			//show the none text for section
			$('#surgery_noneText').removeClass('d-none');

		}

	}

	//Family History Function
	function passFamilyHistory(data) {
		//convert to array 
		array_familyHistory = data;

		console.log('Family History data')
		console.log(array_familyHistory);


		if (data != null  && data.length != 0 ) {


			//show ul list for family history 
			$('#family_history_card').removeClass('d-none');

			//empty div 
			$('#family_history_card').empty();



			//Append mother details 
			$('#family_history_card').append(\`<span class="bold">Mother:</span> \${data[0].mother_status}, \${data[0].mother_age}yrs, \${data[0].mother_condition} <br>  \`);

			//Append Father details
			$('#family_history_card').append(\`<span class="bold">Father:</span> \${data[0].father_status}, \${data[0].father_age}yrs, \${data[0].father_condition} <br> \`);

			//Append spouse details
			$('#family_history_card').append(\`<span class="bold">Spouse:</span> \${data[0].spouse_status}, \${data[0].spouse_age}yrs, \${data[0].spouse_condition} <br> \`)


			//Children details
			$('#family_history_card').append(\`<span class="bold">Child:</span> \${data[0].number_of_children}, \${data[0].children_condition} <br>\`);

			//Other Details
			$('#family_history_card').append(\`<span class="bold">\${data[0].other_details}</span>\`)







		} else {
			//show the none text for section
			$('#familyHistory_noneText').removeClass('d-none');

		}

	}

	//Patient Complaints function 
	function passComplaints(data) {
		//convert to array 
		array_complaints = data;

		//check if data is not null 
		if (data != null && array_complaints.length != 0) {

			//show medication section 
			$('#problem_complaints_section').removeClass('d-none');

			//empty labs list
			$('#problem_complaints_section').empty();

			//loop through complaints array
			$.each(array_complaints, function(key, value) {
				//Append to section
				$('#problem_complaints_section').append(\`<span class="bold">\${value.complaint}</span>\`)
			})



		} else {
			//show medication no given text 
			$('#problem_complaints_noneText').removeClass('d-none');

		}
	}



	//Patient Request Labs Function (for Card)
	function passRequestLabs(data) {

		array_labs = data;

		console.log('Request labs function')
		console.log(data);


		//check if data is not null 
		if (data != null && array_labs.length != 0) {

			//show labs section 
			$('#labs_section').removeClass('d-none')

			//empty labs list
			$('.ulLabs').empty();

			//loop through first 4 items in array 
			for (var i = 0; i < 4; i++) {
				//Append li to ul labs ul 
				$('.ulLabs').append(\`<li>
									<div class="row">
											<div class="float-left mr-5">
												<span class="bold">\${array_labs[i].investigation.name}</span> <br>
												<span>\${moment(new Date(array_labs[i].date_created)).format("MMM, DD YYYY HH:mm")}</span>
											</div>

											<div class="float-right " style="margin-top:24px;">
												<span>\${array_labs[i].status.name}</span>

											</div>

										</div>
									</li>\`)
			}



		} else {
			//show no labs given text 
			$('#labs_noneText').removeClass('d-none')
		}
	}



	//Social History Function
	function passSocialHistory(data) {
		//convert to array 
		array_social = data;

		console.log('Patient Social History data')
		console.log(array_social);


		if (data != null && data.length !=0) {

			//show ul list for surgery 
			$('#social_history_card_col_1').removeClass('d-none');
			$('#social_history_card_col_2').removeClass('d-none');


			//empty div 
			$('#social_history_card_col_1').empty();
			$('#social_history_card_col_2').empty();


			//Append occupation detail to shx on history card  
			$('#social_history_card_col_1').append(\`<span class="bold">Occupation:</span> \${data[0].occupation == null ? 'Not Stated':data[0].occupation.name} <br>\`)

			//Append location detail to shx on history card  
			$('#social_history_card_col_1').append(\`<span class="bold">Location:</span> \${data[0].location == null ? 'Not Stated' : data[0].location.name} <br>\`)

			//Append Religion detail to shx on history card  
			$('#social_history_card_col_1').append(\`<span class="bold">Religion:</span> \${data[0].religion == null ? 'Not Stated' :data[0].religion.name} <br>\`)

			//Append Hobbies detail to shx on history card  
			$('#social_history_card_col_1').append(\`<span class="bold">Hobbies:</span> \${data[0].hobbies} <br>\`)


			//Append Family Cirumsatances detail to shx on history card  
			$('#social_history_card_col_2').append(\`<span class="bold">Family Cirumstances:</span> \${data[0].family_circumstance} <br>\`);

			//Append alcohol intake to shx on history card  
			$('#social_history_card_col_2').append(\`<span class="bold">Alcohol Intake:</span> \${data[0].alcohol_intake} <br>\`);

			//Append alcohol detail to shx on history card  
			$('#social_history_card_col_2').append(\`<span class="bold">Alcohol Details:</span> \${data[0].alcohol_details} <br>\`);


			//Append tobacco intake to shx on history card  
			$('#social_history_card_col_2').append(\`<span class="bold">Tobacco Intake:</span> \${data[0].tobacco_intake} <br>\`);

			//Append tobacco detail to shx on history card  
			$('#social_history_card_col_2').append(\`<span class="bold">Tobacco Details:</span> \${data[0].tobacco_details} <br>\`);







		} else {
			console.log('social else block running');
			//show the none text for section
			$('#socialHistory_noneText').removeClass('d-none');

		}

	}


	//Populate Surgery Select 
	function populateSurgerySelect(data) {
		$.each(data, function(key, value) {
			$('#pmh_surgery_id').append(\`<option value="\${value.id}">\${value.name}</option>\`);
		});
	}




	function clinicalEncounterTab() {
		//single ajax call for all cards 
		// get data for encounter notes cards
		//error here need to look at it 
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'patientVisits', 'action' => 'setPatientEncounterNotes', $patient_id, $patient_visit_id]) -->"
		}).done((data) => {
			//logs
			console.log('set Patient encounter successful');
			console.log(data);

			//pass prescription data 
			passPrescriptionData(jQuery.parseJSON(data).prescriptions);

			console.log('infusion data @ ajax')
			console.log(jQuery.parseJSON(data).infusions);
			//pass infusion data 
			passInfusionData(jQuery.parseJSON(data).infusions);

			//pass patient illness 
			passMedicalHistoryData(jQuery.parseJSON(data).past_illness);

			//populate surgeries select 
			populateSurgerySelect(jQuery.parseJSON(data).surgeries);

			//pass patient surgeries
			passSurgeryHistory(jQuery.parseJSON(data).past_surgeries);

			//pass patient family history 
			passFamilyHistory(jQuery.parseJSON(data).family_history);

			//pass patient social history
			passSocialHistory(jQuery.parseJSON(data).social_history);

			//pass patient request labs 
			passRequestLabs(jQuery.parseJSON(data).request_labs);

			//pass patient vitals 
			passVitals(jQuery.parseJSON(data).vitals);

			//pass patient comorbidities
			passComorbidity(jQuery.parseJSON(data).comorbidity);

		}).fail((data) => {
			//logs
			console.log('set Patient encounter fail');
			console.log(data)
		})

		//getting latest clinical encounter notes saved
		getLatestEncounter()

		//getting ODQ categories and respective ODQs
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getOdqsWithCategories' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				var odq_severities = JSON.stringify(res.odq_severities)
				var odq_durations = JSON.stringify(res.odq_durations)
				for(var i in res.odq_categories){
					tab_id = '#' + res.odq_categories[i].id + 'tab'
					tab_content_id = res.odq_categories[i].id + 'tab'
					odq_category = res.odq_categories[i].name
					odq_category_class = 'nav-item' + res.odq_categories[i].id
					odq_card_body_class = 'odq-card-body' + res.odq_categories[i].id
					//checking if tab categories have been appended
					if(!$(".odq-categories").find('.' + odq_category_class).length) {
						$(".odq-categories").append("<li class='nav-item "+odq_category_class+"'><a href='"+tab_id+"' class='nav-link' data-toggle='tab'> "+odq_category+" </a></li>")
					}
					//populating the tab content
					tab_content = "<div class='tab-pane' id='"+tab_content_id+"'><div class='card-body "+odq_card_body_class+"'></div></div>"
					$(".odq-tab-content").append(tab_content)
					odqs = res.odq_categories[i].odqs
					for(var j in odqs){
						if(res.odq_categories[i].id == odqs[j].odq_category_id){
							//population of odqs based on respective categories
							comment_span_id = 'span' + odqs[j].id
							raw_comment_span_id = 'span' + odqs[j].id
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

		//getting allergy categories
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyCategories' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				for (var i in res){
					allergy_category_class = 'class_'+res[i].id;
					if(!$("#allergy-category-div").find('.' + allergy_category_class).length){
						$("#allergy-category-div").append("<div class='form-check form-check-inline "+allergy_category_class+"'><input class='form-check-input' value='"+res[i].id+"' type='radio' name='allergy_category_id' id='allergy_category_"+res[i].id+"' onchange='passAllergicCategory(this)'><label class='form-check-label' for='allergy_category_"+res[i].id+"'><span class='badge rounded-pill'>"+res[i].name+"</span></label></div>")
					}	
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
				$('#encounter_allergy_reaction_id').empty()
				$.each(res, function(key, value) {
					$('#encounter_allergy_reaction_id').append($('<option data-name="'+res[key].name+'"></option>').val(res[key].id).html(res[key].name));  
					$("#encounter_allergy_reaction_id").selectpicker("refresh");
				});	
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
						$("#allergy-reaction-type-div").append("<div class='form-check form-check-inline "+allergy_reaction_type_class+"'><input class='form-check-input' value='"+res[i].id+"' type='radio' name='allergy_reaction_type_id' id='allergy_reaction_type_"+res[i].id+"'><label class='form-check-label' for='allergy_reaction_type_"+res[i].id+"'><span class='badge rounded-pill' style='background-color: "+res[i].color_code+"'>"+res[i].name+"</span></label></div>")
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
				var res = JSON.parse(response);	
				// console.log('latest encouter notes taken')
				// console.log(res)
				if(res){
					populateComplaints(res.cc)
					populateOdqs(res.patient_visit_clinical_encounter_note_odqs)
					populateComorbidities(res.patient_visit_clinical_encounter_note_comorbidity)
					populateAllergies(res.patient_visit_clinical_encounter_note_allergy, res.patient_visit_clinical_encounter_note_allergy_reactions)
					populateMedicationHistory(res.patient_visit_clinical_encounter_note_past_medication)
					populateSocialHistory(res.patient_visit_clinical_encounter_note_social_history)
					populateFamilyHistory(res.patient_visit_clinical_encounter_note_family_history)
					populateLatestVitals()
					populatePrescription()
				}
            }
        });
	}

	//function to populate cc recorded
	function populateComplaints(cc)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(cc){
			$(".cc-small-card").html("<span>"+ cc +"</span>")
		}else{
			$(".cc-small-card").html("<span class='bold'>None</span>")
		}
	}

	//function to populate odqs
	function populateOdqs(odqs)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(odqs){
			$(".odqs-small-card").html("<span><ul class='odq-list-class'></ul></span>")
			for(var i in odqs){
				odq_severity = "<span class='badge rounded-pill' style='background-color: "+odqs[i].odq_severity.color_code+"'>"+odqs[i].odq_severity.severity+"</span>"
				odq_duration = "<span class='badge rounded-pill'>"+odqs[i].odq_duration.duration+"</span>"
				$(".odq-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+odqs[i].odq_comment+"'>"+ odqs[i].odq.name+ " " + odq_severity + odq_duration + "</li>")
			}
		}else{
			$(".odqs-small-card").html("<span class='bold'>None</span>")
		}
	}

	//populating comorbiditis
	function populateComorbidities(comorbidities)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(comorbidities){
			$(".comorbidities-small-card").html("<span><ul class='comorbidities-list-class'></ul></span>")
				period = "<span class='badge rounded-pill' style='background-color: brown'>"+comorbidities.illness_period+"</span>"
				$(".comorbidities-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+comorbidities.comment+"'>"+ comorbidities.description + " " + period + "</li>")
		}else{
			$(".comorbidities-small-card").html("<span class='bold'>None</span>")
		}
	}

	//populating allergy and allergy reactions
	function populateAllergies(allergies, allergy_reactions)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(allergies){
			$(".allergy-small-card").html("<span><ul class='allergy-list-class'></ul></span>")
				category = "<span class='badge rounded-pill' style='background-color: brown'>"+allergies.allergy_category.name+"</span>"
				pharma = "<span class='badge rounded-pill' style='background-color: grey'>"+allergies.encounter_allergy_pharmacological_management.name+"</span>"
				severity = "<span class='badge rounded-pill' style='background-color: purple'>"+allergies.encounter_allergy_severity.name+"</span>"
				reaction_type = "<span class='badge rounded-pill' style='background-color: "+allergies.encounter_allergy_reaction_type.color_code+"'>"+allergies.encounter_allergy_reaction_type.name+"</span>"
				$(".allergy-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+allergies.encounter_allergy.description+"'>"+ allergies.encounter_allergy?.name + " " + reaction_type + " " + category + " " + severity + " " + pharma + "</li>")
		}else{
			$(".allergy-small-card").html("<span class='bold'>None</span>")
		}
		if(allergy_reactions){
			$(".allergy-reactions-small-card").html("<span><ul class='allergy-reactions-list-class'></ul></span>")
			for(var i in allergy_reactions){
				$(".allergy-reactions-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+allergy_reactions[i].encounter_allergy_reaction.name+"'>"+ allergy_reactions[i].encounter_allergy_reaction.name + "</li>")
			}
		}else{
			$(".allergy-reactions-small-card").html("<span class='bold'>None</span>")
		}
	}

	//populating medical history
	function populateMedicationHistory(medication_history)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(medication_history){
			$(".pmhx-small-card").html("<span><ul class='pmhx-list-class'></ul></span>")
				$(".pmhx-list-class").append(
					"<li class='mb-1'>Past Medication: <span class='badge rounded-pill' style='background-color: #FF4500'>"+ medication_history.past_medication +"</span></li>" 
					+"<li class='mb-1'>Current Medications:  <span class='badge rounded-pill' style='background-color: #FF4500'>"+ medication_history.current_medication +"</span></li>" 
					+"<li class='mb-1'>Herbal Medication:  <span class='badge rounded-pill' style='background-color: #FF4500'>"+ medication_history.herbal_medication +"</span></li>"
				)
		}else{
			$(".pmhx-small-card").html("<span class='bold'>None</span>")
		}
	}

	//populating social history
	function populateSocialHistory(social_history)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(social_history){
			$(".pshx-small-card").html("<span><ul class='pshx-list-class'></ul></span>")
				$(".pshx-list-class").append(
					"<li class='mb-1'>Alcohol Intake: <span class='badge rounded-pill' style='background-color: #FF1493'>"+ social_history.alchohol_intake +"</span></li>" 
					+"<li class='mb-1'>Alcohol Details:  <span class='badge rounded-pill' style='background-color: #FF1493'>"+ social_history.alchohol_details+"</span></li>" 
					+"<li class='mb-1'>Tobacco Intake:  <span class='badge rounded-pill' style='background-color: #FF1493'>"+ social_history.tobacco_intake +"</span></li>"
					+"<li class='mb-1'>Tobacco Details:  <span class='badge rounded-pill' style='background-color: #FF1493'>"+ social_history.tobacco_details +"</span></li>" 							
				)
		}else{
			$(".pshx-small-card").html("<span class='bold'>None</span>")
		}

	}

	//populating family history
	function populateFamilyHistory(family_history)
	{
		edit_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button>"
		delete_button = "<button class='btn btn-light' type='button' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-trash'></i></button>"
		if(family_history){
			$(".fhx-small-card").html("<span><ul class='fhx-list-class'></ul></span>")
				$(".fhx-list-class").append(
					"<li class='mb-1'>Spouse Status: <span class='badge rounded-pill' style='background-color: purple'>"+ family_history.spouse_status +"</span></li>" 
					+"<li class='mb-1'>Spouse Age:  <span class='badge rounded-pill' style='background-color: purple'>"+ family_history.spouse_age +"</span></li>" 
					+"<li class='mb-1'>Spuse Conditions:  <span class='badge rounded-pill' style='background-color: purple'>"+ family_history.spouse_condition +"</span></li>"
					+"<li class='mb-1'>Number of Children:  <span class='badge rounded-pill' style='background-color: purple'>"+ family_history.number_of_children +"</span></li>" 							
				)
		}else{
			$(".fhx-small-card").html("<span class='bold'>None</span>")
		}
	}

	//populate vitals
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
				console.log('vital results')
				console.log(res)
				if(res){
					$(".vitals-small-card").html("<span><ul class='vitals-list-class'></ul></span>")
						$(".vitals-list-class").append(
							"<li class='mb-1'>Weight: <span class='badge rounded-pill' style='background-color: purple'>"+ res.weight +"</span></li>" 
							+"<li class='mb-1'>Height:  <span class='badge rounded-pill' style='background-color: purple'>"+ res.height +"</span></li>" 
							+"<li class='mb-1'>Pulse:  <span class='badge rounded-pill' style='background-color: brown'>"+ res.pulse +"</span></li>"
							+"<li class='mb-1'>Temperature:  <span class='badge rounded-pill' style='background-color: brown'>"+ res.temperature +"</span></li>" 
							+"<li class='mb-1'>AVPU Score:  <span class='badge rounded-pill' style='background-color: brown'>"+ res.avpu_score +"</span></li>"
							+"<li class='mb-1'>Blood Pressure 1:  <span class='badge rounded-pill' style='background-color: red'>"+ res.blood_pressure_1 +"</span></li>"
							+"<li class='mb-1'>Blood Pressure 2:  <span class='badge rounded-pill' style='background-color: red'>"+ res.blood_pressure_2 +"</span></li>"
							+"<li class='mb-1'>Respiratory Rate:  <span class='badge rounded-pill' style='background-color: green'>"+ res.respiratory_rate +"</span></li>"
							+"<li class='mb-1'>Oxygen Rate:  <span class='badge rounded-pill' style='background-color: green'>"+ res.oxygen_saturation +"</span></li>"
							+"<li class='mb-1'>Mobility:  <span class='badge rounded-pill' style='background-color: black'>"+ res.mobility +"</span></li>"
						)
				}else{
					$(".vitals-small-card").html("<span class='bold'>None</span>")
				}
            }
        });

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
				var presc = res.precsriptions
				var infus = res.infusions
				// console.log('_____infusion____')
				// console.log(infus)
				if(presc){
					$(".prescription-small-card").html("<span><ul class='prescription-list-class'></ul></span>")
						$(".prescription-list-class").append(
							"<li class='mb-1'>Drug:  <span class='badge rounded-pill' style='background-color: red'>"+ presc.item_stock.item.full_name +"</span></li>"
							+"<li class='mb-1'>Administer Dose: <span class='badge rounded-pill' style='background-color: purple'>"+ presc.administer_dose +"</span></li>" 
							+"<li class='mb-1'>Dosage Form:  <span class='badge rounded-pill' style='background-color: purple'>"+ presc.dosage_form.name +"</span></li>" 
							+"<li class='mb-1'>Administration Frequency:  <span class='badge rounded-pill' style='background-color: #000080'>"+ presc.drug_administration_frequency.name +"</span></li>"
							+"<li class='mb-1'>Administration Instruction:  <span class='badge rounded-pill' style='background-color: #FFDAB9'>"+ presc.drug_administration_instruction.name +"</span></li>" 
							+"<li class='mb-1'>Requested By:  <span class='badge rounded-pill' style='background-color: black'>"+ presc.user.first_name + " " + presc.user.last_name +"</span></li>"
							+"<li class='mb-1'>Request Date:  <span class='badge rounded-pill' style='background-color: #FFDAB9'>"+ presc.date_created +"</span></li>" 
						)
				}else{
					$(".prescription-small-card").html("<span class='bold'>None</span>")
				}
				
				if(infus){
					$(".infusion-small-card").html("<span><ul class='infusion-list-class'></ul></span>")
						$(".infusion-list-class").append(
							"<li class='mb-1'>Drug:  <span class='badge rounded-pill' style='background-color: red'>"+ infus.item_stock.item.full_name +"</span></li>"
							+"<li class='mb-1'>Administer Dose: <span class='badge rounded-pill' style='background-color: purple'>"+ infus.administer_dose +"</span></li>" 
							+"<li class='mb-1'>Dosage Form:  <span class='badge rounded-pill' style='background-color: purple'>"+ infus.dosage_form.name +"</span></li>" 
							+"<li class='mb-1'>Priority:  <span class='badge rounded-pill' style='background-color: #000080'>"+ infus.priority +"</span></li>"
							+"<li class='mb-1'>Requested By:  <span class='badge rounded-pill' style='background-color: black'>"+ infus.user.first_name + " " + presc.user.last_name +"</span></li>"
							+"<li class='mb-1'>Request Date:  <span class='badge rounded-pill' style='background-color: #FFDAB9'>"+ infus.date_created +"</span></li>" 
						)
				}else{
					$(".infusion-small-card").html("<span class='bold'>None</span>")
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
		var past_illness_form_data = $('#illnessForm').serializeArray()
		var surgeries_form_data = $('#surgeriesForm').serializeArray()
		var haemo_form_data = $('#haemoForm').serializeArray()
		var allergy_form_data = $('#allergyHistoryForm').serializeArray()
		var med_hx_form_data = $('#mhForm').serializeArray()
		var chilhood_form_data = $('#chi-editor').val()
		var immu_hx_form_data = $('#immu-editor').val()
		var fam_hx_form_data = $('#familyHistoryForm').serializeArray()
		var personal_hx_form_data = $('#pshForm').serializeArray()
		var illicit_substance_use = $('#isu-editor').val()
		var doctor_remarks = $('#remarkEditor').val()
		var gen_exam_form_data = $('#addGeneralExamForm').serializeArray()
		$.ajax({
            type: 'GET',
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
				patient_id:"<!-- php: = $patient_id -->",
				patient_visit_id:"<!-- php: = $patient_visit_id -->"
			},
            cache: false,
            success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Encounter Finalized');
					getLatestEncounter()
				}else{
					alertify.error('Something went wrong, please try again');
				}
            }
        });
	}

	//pass allergic category selected in order to populate substance
	function passAllergicCategory(obj)
	{
		console.log(obj)
		$.ajax({
		type: 'GET',
		url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergicSubstances' ] ); -->",
		data: {allergy_category_id:obj.value},
		success: function (response){
			var res = JSON.parse(response);
			$('#encounter_allergy_id').empty()
			if(obj.value != 4){
				$.each(res, function(key, value) {
					$('#encounter_allergy_id').append($('<option data-name="'+res[key].name+'"></option>').val(res[key].id).html(res[key].name + " " + "(" + res[key].description + ")"));  
					$("#encounter_allergy_id").selectpicker("refresh");
				});	
			}else{
				$.each(res, function(key, value) {
					$('#encounter_allergy_id').append($('<option data-name="'+res[key].full_name+'"></option>').val(res[key].id).html(res[key].full_name))
					$("#encounter_allergy_id").selectpicker("refresh");
				});	
			}
		}
		});
	}
</script>
`;

export default function ElementElementPatientvisitSymptomSymptomsBackup() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
