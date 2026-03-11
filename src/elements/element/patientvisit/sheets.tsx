const rawHtml = `
<!-- php: $patient_id = $selectedVisit->patient_id; $patient_visit_id = $selectedVisit->id; -->

<!---main layout-->
<div class="row">


	<style>
		/*Task section @ doses modal */
		.task_section a {
			text-decoration: none;
			color: inherit;
		}



		.task_section ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: space-between;
			height: 30px;
		}

		.task_section {
			max-width: 600px;
			width: 100%;
		}

		.task_section li a {
			color: #a4a4a4;
		}

		.task_section li a:hover {
			padding-bottom: 4px;
			border-bottom: 3px solid #0FBEFF;
		}

		.task_section .wrapper_tab-content {
			position: relative;
		}

		.task_section .tab-content {
			position: absolute;
			padding: 1.75em 0;
			visibility: hidden;
			height: 0;
		}

		.task_section .tab-content h1 {
			font-size: 1.12em;
			margin-bottom: .5em;
		}

		.task_section .content-visible {
			position: static;
			visibility: visible;
			height: auto;
		}

		.task_section .active {
			color: #444;
			padding-bottom: 4px;
			border-bottom: 3px solid #0FBEFF;
		}


		/*Modal Status Action Buttons */
		.btn_choose_sent input {
			-webkit-appearance: none;
			display: block;
			margin: 10px;
			width: 18px;
			height: 18px;
			border-radius: 12px;
			cursor: pointer;
			vertical-align: middle;
			box-shadow: hsla(0, 0%, 100%, .15) 0 1px 1px, inset hsla(0, 0%, 0%, .5) 0 0 0 1px;
			background-color: hsla(0, 0%, 0%, .2);
			background-image: -webkit-radial-gradient(#fff 0%, #fff 15%, #fff 28%, #fff 70%);
			background-repeat: no-repeat;
			-webkit-transition: background-position .15s cubic-bezier(.8, 0, 1, 1),
				-webkit-transform .25s cubic-bezier(.8, 0, 1, 1);
			outline: none;
		}

		.btn_choose_sent input:checked {
			-webkit-transition: background-position .2s .15s cubic-bezier(0, 0, .2, 1),
				-webkit-transform .25s cubic-bezier(0, 0, .2, 1);
		}

		.btn_choose_sent input:active {
			-webkit-transform: scale(1.5);
			-webkit-transition: -webkit-transform .1s cubic-bezier(0, 0, .2, 1);
		}



		/* The up/down direction logic */

		.btn_choose_sent input,
		.btn_choose_sent input:active {
			background-position: 0 24px;
		}

		.btn_choose_sent input:checked {
			background-position: 0 0;
		}

		.btn_choose_sent input:checked~input,
		.btn_choose_sent input:checked~input:active {
			background-position: 0 -24px;
		}

		.btn_choose_sent {
			background: #EF2D56;
			color: #fff;
			box-shadow: 0 10px 20px rgba(125, 147, 178, .3);
			border: none;
			border-radius: 3px;
			font-size: 16px;
			line-height: 10px;
			padding: 16px 20px 16px 38px;
			text-align: center;
			display: inline-block;
			text-decoration: none;
			margin-right: 30px;
			transition: all .3s;
			height: auto;
			cursor: pointer;
			position: relative;
			outline: none;
		}

		.btn_choose_sent input {
			position: absolute;
			left: 0;
			right: 0;
			z-index: 99;
			top: 2px;
		}

		.btn_choose_sent input:after {
			position: absolute;
			content: '';
			width: 15rem;
			left: 0;
			right: 0;
			/* background: red; */
			/* z-index: -1; */
			height: 40px;
			top: -10px;
		}

		.bg_btn_chose_1 {
			background-color: #f78968 !important;
		}


		.bg_btn_chose_2 {
			background-color: #4e336fdb !important;
		}


		.bg_btn_chose_3 {
			background-color: #359dcc !important;
		}


		/*-=p=--=*/




		.btn_choose_sent_check_b {
			background: #EF2D56;
			color: #fff;
			box-shadow: 0 10px 20px rgba(125, 147, 178, .3);
			border: none;
			border-radius: 3px;
			font-size: 16px;
			line-height: 10px;
			padding: 16px 20px 16px 46px;
			text-align: center;
			display: inline-block;
			text-decoration: none;
			margin-right: 30px;
			transition: all .3s;
			height: auto;
			cursor: pointer;
			position: relative;
			outline: none;
		}


		.unscheduled-dot {
			height: 8px;
			width: 8px;
			border-radius: 50%;
			background: #747d8c;

		}

		/*Pulsating dots */
		.scheduled-dot {
			/* Vector */
			height: 8px;
			width: 8px;
			border-radius: 50%;
			background: #7bed9f;
		}

		.scheduled-dot:after {
			content: "";
			height: 8px;
			width: 8px;
			border-radius: 50%;
			background: #06D6A0;
			display: block;
			animation: pulse 2s ease 0s infinite;
		}

		/* .scheduled-pill:after{
			content: "";
			height: 18px;
			width: 18px;
			border-radius: 50%;
			background: #06D6A0;
			display: block;
			animation: pulse 2s ease 0s infinite;

		} */






		@keyframes pulse {
			0% {
				opacity: 1;
				transform: scale(1);
			}

			80% {
				opacity: 0;
				transform: scale(2.5);
			}

			100% {
				opacity: 0;
				transform: scale(3);
			}
		}



		/*Calendar CSS */
		.md-timezone-meeting-planner .mbsc-schedule-color-text {
			padding: 16px 0;
			text-align: center;
		}

		/* .mbsc-timeline-resource-bg{
			width: 150px;
		}

		.mbsc-timeline-resource-empty{
			width: 150px;
		} */

		.mbsc-timeline-header-column {
			width: 180px;
		}

		.mbsc-timeline-column {
			width: 180px;
		}

		.md-timezone-meeting-planner.mbsc-ios-dark .mbsc-timeline-color,
		.md-timezone-meeting-planner.mbsc-material-dark .mbsc-timeline-color,
		.md-timezone-meeting-planner.mbsc-windows-dark .mbsc-timeline-color {
			color: #fff !important;
		}

		.md-meeting-planner-cont {
			font-size: 12px;
			font-weight: 600;
			height: 100%;
			background: #1ad404;
			position: relative;
			box-sizing: border-box;
			box-shadow: 0 0 5px rgba(0, 0, 0, .3);
			border-radius: 6px;
			overflow: hidden;
		}

		.md-meeting-planner-wrapper {
			background: rgba(255, 255, 255, .5);
			height: 100%;
			box-sizing: border-box;
			padding: 0 6px;
			transition: background .15s ease-in-out;
		}

		.mbsc-schedule-event-hover .md-meeting-planner-wrapper {
			background: rgba(255, 255, 255, .3);
		}

		.md-meeting-planner-title {
			padding-top: 3px;
			color: initial;
		}

		.md-meeting-planner-time {
			color: #666;
		}

		.md-meeting-planner-title,
		.md-meeting-planner-time {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.md-meeting-planner-header {
			display: flex;
			align-items: center;
			margin-left: auto;
		}

		.md-meeting-planner-zone {
			font-size: 12px;
			padding: 3px 6px;
			margin: 0 5px;
			border-radius: 16px;
			color: #888;
		}

		.md-meeting-planner-work {
			background: #f7f7bb4d;
		}

		.md-meeting-planner-flex {
			background: #a5ceff4d;
		}

		.md-meeting-planner-off {
			background: #ffbaba4d;
		}

		.md-meeting-participant-cont {
			position: relative;
			padding-left: 15px;
			max-height: 40px;
			line-height: 20px;
		}

		.md-meeting-participant-avatar {
			position: absolute;
			max-height: 40px;
			max-width: 40px;
			top: 25px;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			left: 20px;
			border-radius: 20px
		}

		.md-meeting-participant-name {
			font-size: 16px;
		}

		.md-meeting-participant-offset {
			font-size: 12px;
			opacity: 0.6;
		}

		.md-work-week-picker {
			flex: 0.5 0 auto;
		}

		.md-work-week-nav {
			width: 200px;
		}

		.mbsc-calendar-controls {
			justify-content: space-between;
		}



		.work-order-checkbox-label.mbsc-checkbox {
			padding-top: 5px;
			padding-bottom: 5px;
		}


		.red-dot {
			height: 20px;
			width: 20px;
			background-color: #d63031;
			border-radius: 50%;
			display: inline-block;
		}





		.red-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #d63031;
			border-radius: 50%;
			display: inline-block;
		}

		.pink-dot {
			height: 20px;
			width: 20px;
			background-color: #ff9ff3;
			border-radius: 50%;
			display: inline-block;

		}

		.pink-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #ff9ff3;
			border-radius: 50%;
			display: inline-block;
		}

		.yellow-dot {
			height: 20px;
			width: 20px;
			background-color: #feca57;
			border-radius: 50%;
			display: inline-block;
		}

		.yellow-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #feca57;
			border-radius: 50%;
			display: inline-block;
		}

		.deep-blue-dot {
			height: 20px;
			width: 20px;
			background-color: #6c5ce7;
			border-radius: 50%;
			display: inline-block;
		}

		.deep-blue-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #6c5ce7;
			border-radius: 50%;
			display: inline-block;
		}

		.light-blue-dot {
			height: 20px;
			width: 20px;
			background-color: #74b9ff;
			border-radius: 50%;
			display: inline-block;
		}

		.light-blue-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #74b9ff;
			border-radius: 50%;
			display: inline-block;
		}

		.purple-dot {
			height: 20px;
			width: 20px;
			background-color: #a29bfe;
			border-radius: 50%;
			display: inline-block;
		}

		.purple-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #a29bfe;
			border-radius: 50%;
			display: inline-block;
		}

		.black-dot {
			height: 20px;
			width: 20px;
			background-color: black;
			border-radius: 50%;
			display: inline-block;
		}

		.gray-dot {
			height: 20px;
			width: 20px;
			background-color: #a5b1c2;
			border-radius: 50%;
			display: inline-block;
		}


		.gray-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #55E6C1;
			border-radius: 50%;
			display: inline-block;
		}



		.brown-dot {
			height: 20px;
			width: 20px;
			background-color: #F97F51;
			border-radius: 50%;
			display: inline-block;
		}

		.brown-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #F97F51;
			border-radius: 50%;
			display: inline-block;
		}



		.grey-dot {
			height: 20px;
			width: 20px;
			background-color: #636e72;
			border-radius: 50%;
			display: inline-block;
		}

		.grey-dot-sm {
			height: 8px;
			width: 8px;
			background-color: #636e72;
			border-radius: 50%;
			display: inline-block;
		}










		ul {
			list-style: none;
			display: inline-block;

			padding: 0;
		}


		.miscellaneous-task-list,
		.prescription-task-list,
		.surgery-task-list,
		.lab-task-list,
		.service-task-list {
			overflow: hidden;
			overflow-y: scroll;
			width: 100%;
			height: 200px;
		}


		.miscellaneous-task-list li {
			text-transform: capitalize;
			border: 2px solid blue;
			border-radius: 3px;
			border-width: 3px;
			margin-bottom: 12px;
			background: #ffffff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 3px rgba(0, 0, 0, 0.24);
			transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
			transition: all 0.75s ease;
			-webkit-transition: all 0.5s ease;
			-moz-transition: all 0.5s ease;
			-ms-transition: all 0.5s ease;
			-o-transition: all 0.5 ease;
		}

		.prescription-task-list li {
			text-transform: capitalize;
			border: 2px solid red;
			border-radius: 3px;
			border-width: 3px;
			margin-bottom: 12px;
			background: #ffffff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 3px rgba(0, 0, 0, 0.24);
			transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
			transition: all 0.75s ease;
			-webkit-transition: all 0.5s ease;
			-moz-transition: all 0.5s ease;
			-ms-transition: all 0.5s ease;
			-o-transition: all 0.5 ease;
		}

		.lab-task-list li,
		.surgery-task-list li,
		.service-task-list li {
			text-transform: capitalize;
			border: 2px solid green;
			border-radius: 3px;
			border-width: 3px;
			margin-bottom: 12px;
			background: #ffffff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 3px rgba(0, 0, 0, 0.24);
			transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
			transition: all 0.75s ease;
			-webkit-transition: all 0.5s ease;
			-moz-transition: all 0.5s ease;
			-ms-transition: all 0.5s ease;
			-o-transition: all 0.5 ease;
		}



		.miscellaneous-task-list li:hover {
			box-shadow: 0 8px 15px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
		}

		.prescription-task-list li:hover {
			box-shadow: 0 8px 15px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
		}


		.lab-task-list li:hover,
		.surgery-task-list li,
		.service-task-list li {
			box-shadow: 0 8px 15px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
		}




		.accordion-header {
			padding: 10px;
			background: rgba(97, 175, 254, .2);

		}
	</style>

	<!--Calendar view-->
	<div class="col-md-12 mb-4">
		<div class="card-box">
			<div class="card-head row">
				<header class="ml-4">Medication Administration Record</header>

				<!--Filter -->
				<div class="row" style="margin-left: 70px;">
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="all_filter" value="0" checked>
						<label class="form-check-label" for="all_filter">All</label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="scheduled_filter" value="1">
						<label class="form-check-label" for="scheduled_filter"><span class="badge rounded-pill text-dark" style="background-color: #7bed9f;">Scheduled</span></label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="unscheduled_filter" value="2">
						<label class="form-check-label" for="unscheduled_filter"><span class="badge rounded-pill" style="background-color: #747d8c;">Unscheduled</span></label>
					</div>
					<!-- <div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="continuous" value="3">
						<label class="form-check-label" for="inlineRadio3"><span class="badge rounded-pill" style="background-color: #f6e58d;">Continuous</span></label>
					</div> -->
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="paused_filter" value="4">
						<label class="form-check-label" for="inlineRadio3"><span class="badge rounded-pill" style="background-color: #ffa502">Paused</span></label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="stop_filter" value="3">
						<label class="form-check-label" for="inlineRadio3"><span class="badge  rounded-pill" style="background-color:#ff6b6b;">Stopped</span></label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="completed_filter" value="5">
						<label class="form-check-label" for="inlineRadio3"><span class="badge rounded-pill" style="background-color: #10ac84;">Completed</span></label>
					</div>

					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="mar_filter" id="overdue_filter" value="6">
						<label class="form-check-label" for="inlineRadio3"><span class="badge rounded-pill" style="background-color: #EA2027;">Overdue</span></label>
					</div>
				</div>


				<!--Reminder and alert button-->
				<i class=" fa fa-bell" style="margin-left:auto;padding-right: 20px; font-size: larger;margin-top: 12px;"></i>
				<!-- <button class="btn btn-sm " style="background-color: white;"></button> -->





			</div>
			<div class="card-body ">


				<div id="demo-work-order-scheduling"></div>




			</div>
		</div>
	</div>



	<!--Accordions-->
	<div class="col-md-12">
		<div class="accordion mb-5" id="mar_accordions">

			<!--prescription Accordion-->
			<div class="accordionDiv mb-3  mx-3 ">
				<div id="mtHeading" class="accordion-header bold " data-toggle="collapse" data-target="#mtCollapse" aria-expanded="true" aria-controls="mtCollapse">
					Prescription
				</div>



				<div id="mtCollapse" class="collapse" aria-labelledby="mtHeading" data-parent="#mar_accordions">
					<div class="card-body">

						<div class="row">
							<div class="row col-md-12 ">
								<SearchableSelectField class="form-control col-md-5" data-size="10" id="prescription_filter" onchange="passPrescriptions()" onclick="">
									<option selected disabled>Filter...</option>
									<option value="0">All</option>
									<option value="1">Unscheduled</option>
									<option value="2">Scheduled</option>
								</SearchableSelectField>


								<!-- <span class="btn btn-md btn-primary">Go</span> -->


							</div>

							<!--Table-->
							<div class="table-scrollable" style="overflow-x: hidden;">

								<table class="table table-hover order-column full-width" id="prescription_table">
									<thead>
										<tr>
											<th scope="col">Requested Date</th>
											<th scope="col">Start Date</th>
											<th scope="col">End Date</th>
											<th scope="col">Drug</th>
											<th scope="col">Dosage</th>
											<th scope="col">Form</th>
											<th scope="col">Frequency</th>
											<th scope="col">Days</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody id="prescription_task_table">




									</tbody>
								</table>
							</div>


						</div>


					</div>









				</div>
			</div>



			<!--PRN Accordion-->
			<div class="accordionDiv mb-3  mx-3 ">
				<div id="prnHeading" class="accordion-header bold " data-toggle="collapse" data-target="#prnCollapse" aria-expanded="true" aria-controls="prnCollapse">
					PRN
				</div>



				<div id="prnCollapse" class="collapse" aria-labelledby="prnHeading" data-parent="#mar_accordions">
					<div class="card-body">
						<div class="row">
							<div class="row col-md-12 ">
								<SearchableSelectField class="form-control col-md-5" data-size="10" id="prn_filter" onchange="passPRN()">
									<option selected disabled>Filter...</option>
									<option value="0">All</option>
									<option value="1">Prescriptions</option>
									<option value="2">Infusions</option>
								</SearchableSelectField>


								<!-- <span class="btn btn-md btn-primary">Go</span> -->


							</div>
							<!--Table-->
							<div class="table-scrollable" style="overflow-x: hidden;">

								<table class="table table-hover order-column full-width" id="prn_table">
									<thead>
										<tr>
											<th scope="col">Requested Date</th>
											<th scope="col">Drug</th>
											<th scope="col">Dosage</th>
											<th scope="col">Form</th>
											<th scope="col">Type</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>


									</tbody>
								</table>
							</div>


						</div>


					</div>
				</div>
			</div>


			<!--Infusions Accordion-->
			<div class="accordionDiv mb-3 mx-3 ">
				<div id="ifHeading" class="accordion-header bold " data-toggle="collapse" data-target="#ifCollapse" aria-expanded="true" aria-controls="ifCollapse">
					Infusions
				</div>



				<div id="ifCollapse" class="collapse" aria-labelledby="ifHeading" data-parent="#mar_accordions">
					<div class="card-body">
						<div class="row">
							<div class="row col-md-12 ">
								<SearchableSelectField class="form-control col-md-5" data-size="10" id="infusion_filter" onchange="passInfusions()" onclick="">
									<option selected disabled>Filter...</option>
									<option value="0">All</option>
									<option value="1">Unscheduled</option>
									<option value="2">Scheduled</option>
								</SearchableSelectField>


								<!-- <span class="btn btn-md btn-primary">Go</span> -->


							</div>
							<!--Table-->
							<div class="table-scrollable" style="overflow-x: hidden;">

								<table class="table table-hover order-column full-width" id="infusions_table">
									<thead>
										<tr>
											<th scope="col">Requested Date</th>
											<th scope="col">Start Date</th>
											<th scope="col">End Date</th>
											<th scope="col">Infusion</th>
											<th scope="col">Bag Details</th>
											<th scope="col">Frequency</th>
											<th scope="col">Days</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>


									</tbody>
								</table>
							</div>


						</div>


					</div>









				</div>
			</div>


			<!--Transfusions Accordion-->
			<div class="accordionDiv mb-3  mx-3 ">
				<div id="tfHeading" class="accordion-header bold " data-toggle="collapse" data-target="#tfCollapse" aria-expanded="true" aria-controls="tfCollapse">
					Transfusions
				</div>



				<div id="tfCollapse" class="collapse" aria-labelledby="tfHeading" data-parent="#mar_accordions">
					<div class="card-body">
						<div class="row">
							<div class="row col-md-12 ">
								<SearchableSelectField class="form-control col-md-5" data-size="10" required>
									<option selected disabled>Filter...</option>
									<option value="0">All</option>
									<option value="1">Unscheduled</option>
									<option value="2">Scheduled</option>
								</SearchableSelectField>


								<!-- <span class="btn btn-md btn-primary">Go</span> -->


							</div>
							<!--Table-->
							<div class="table-scrollable" style="overflow-x: hidden;">

								<table class="table table-hover order-column full-width" id="transfusion_table">
									<thead>
										<tr>
											<th scope="col">Requested Date</th>
											<th scope="col">Issue Date</th>
											<th scope="col">Transfusion</th>
											<th scope="col">Modifier</th>
											<th scope="col">Indicator</th>
											<th scope="col">Administer</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>


						</div>


					</div>









				</div>
			</div>


			<!--Miscellaneous Accordion-->
			<div class="accordionDiv mb-3  mx-3 ">
				<div id="miscHeading" class="accordion-header bold " data-toggle="collapse" data-target="#miscCollapse" aria-expanded="true" aria-controls="miscCollapse">
					Miscellaneous
				</div>



				<div id="miscCollapse" class="collapse" aria-labelledby="miscHeading" data-parent="#mar_accordions">
					<div class="card-body">
						<div class="row">
							<div class="row col-md-12">
								<!--Filter-->
								<div class="row col-md-12 ">
									<SearchableSelectField class="form-control col-md-5" data-size="10" required>
										<option selected disabled>Filter...</option>

									</SearchableSelectField>


									<!--Add task button-->
									<a href="javascript:;" id="addTask" class="btn btn-sm deepPink-bgcolor " style="margin-left: auto;"> Add Task </a>


								</div>

							</div>
							<!--Table-->
							<div class="table-scrollable" style="overflow-x: hidden;">

								<table class="table table-hover order-column full-width" id="miscellaneous_table">
									<thead>
										<tr>
											<th scope="col">Start Date</th>
											<th scope="col">End Date</th>
											<th scope="col">Title</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>

									</tbody>
								</table>
							</div>


						</div>


					</div>









				</div>
			</div>

			<!--Nutritons Accordion-->
			<div class="accordionDiv mb-3  mx-3 ">
				<div id="nutrHeading" class="accordion-header bold " data-toggle="collapse" data-target="#nutrCollapse" aria-expanded="true" aria-controls="nutrCollapse">
					Nutritions
				</div>



				<div id="nutrCollapse" class="collapse" aria-labelledby="nutrHeading" data-parent="#mar_accordions">
					<div class="card-body">
						<div class="row">
							<div class="row col-md-12 ">
								<SearchableSelectField class="form-control col-md-5" data-size="10" required>
									<option selected disabled>Filter...</option>

								</SearchableSelectField>


								<!-- <span class="btn btn-md btn-primary">Go</span> -->


							</div>
							<!--Table-->
							<div class="table-scrollable" style="overflow-x: hidden;">

								<table class="table table-hover order-column full-width">
									<thead>
										<tr>
											<th scope="col">Start Date</th>
											<th scope="col">End Date</th>
											<th scope="col">Food</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>13:00 12/02/2022</td>
											<td>13:30 12/02/2022</td>
											<td>Banku</td>
											<td>
												<span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
													<span class="mdl-chip__contact mdl-color--green mdl-color-text--white">
														<i class="fa fa-check"></i>
													</span>
													<!-- span class="mdl-chip__text"></span -->
													<span class="mdl-chip__text">
														<strong>In Progress </strong>
													</span>

												</span>
												<br>
											</td>
											<td>
												<div class="row">

													<span class="btn btn-sm btn-danger">Start</span>

													<span class="btn btn-sm btn-success">View</span>

													<span class="btn btn-sm btn-primary">Doses</span>

												</div>
											</td>






										</tr>

									</tbody>
								</table>
							</div>


						</div>


					</div>
				</div>
			</div>



			<!--Sample Collection Accordion-->
			<div class="accordionDiv mb-3  mx-3 ">
				<div id="sampleHeading" class="accordion-header bold " data-toggle="collapse" data-target="#sampleCollapse" aria-expanded="true" aria-controls="sampleCollapse">
					Sample Collection
				</div>



				<div id="sampleCollapse" class="collapse" aria-labelledby="sampleHeading" data-parent="#mar_accordions">
					<div class="card-body">
						<div class="row">
							<div class="row col-md-12 ">
								<!-- <SearchableSelectField class="form-control col-md-5" data-size="10" required id="sampleCollection_filter">
									<option value="0">All</option>
									<option value="1">Collected</option>
									<option value="2">Pending</option>
									<option value="3">Trough</option>
									<option value="4">Peak</option>
								</SearchableSelectField> -->


								<!-- <span class="btn btn-md btn-primary">Go</span> -->


							</div>
							<!--Table-->
							<div class="table-scrollable" style="overflow-x: hidden;">

								<table class="table table-hover order-column full-width" id="sampleCollection_table">
									<thead>
										<tr>
											<th scope="col">Requested Date</th>
											<th scope="col">Drug</th>
											<th scope="col">Med. Type</th>
											<th scope="col">Sample Type</th>
											<th scope="col">Specimen</th>
											<th scope="col">Frequency</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>


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

<!--//main layout-->

<!--Modals-->

<!--start requested prescription task modal-->
<div class="modal fade" id="prescriptionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested Prescription</h5>
				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg bg-danger text-uppercase "><b>Add Prescription to administration timeline</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">


						<!--Requested service Details-->
						<article class="card-body pt-2 pl-5 pr-5 p-0">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">

										</dd>
									</dl>
								</div>

							</div>
							<hr>


							<!--Request & issue details -->
							<dl class="item-property">
								<dt>Request & Issue Details</dt>
								<dd>
									<p>
										Request Date: <span id="req_date_med_modal"></span> <br>
										Requester: <span id="req_user_name"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>

							<dl class="item-property">
								<dt>Issuer Details</dt>
								<dd>
									<p>
										Issue Date: <span id="perform_date_pres_modal"></span> <br>
										Issue By: <span id="perform_bt_user_name_pres"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
										<!-- Witness By: Ben White <span class="ml-2 badge rounded-pill bg-success">Doctor</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							<!--Drug name-->
							<dl class="item-property" style="display:none" id="pres_levels">
								<dt>Trough | Peak Level Information</dt>
								<dd>
									<p><span class="text-primary" id="rm_peak_trough_levels"></span></p>
								</dd>
							</dl>
							<dl class="item-property">
								<dt>Drug name</dt>
								<dd>
									<p><span id="rm_drugName"></span></p>
								</dd>
							</dl>
							<!--//drug name-->
							<hr>


							<!--number of days-->
							<dl class="item-property">
								<dt>Number Of days</dt>
								<dd>
									<p><span id="rm_days"></span></p>
								</dd>
							</dl>
							<!--//number of days -->

							<hr>


							<!--frequency-->
							<dl class="item-property">
								<dt>Drug Frequency</dt>
								<dd>
									<p><span id="rm_frequency"></span></p>
								</dd>
							</dl>
							<dl class="item-property">
								<dt>Administer Dose</dt>
								<dd>
									<p><span id="rm_administer_dose"></span></p>
								</dd>
							</dl>
							<!--//frequency-->
							<hr>

							<!--Instruction-->
							<dl class="item-property">
								<dt>Instruction</dt>
								<dd>
									<p><span id="rm_instructions"></span></p>
								</dd>
							</dl>

							<!--//instruction-->


							<dl class="item-property" style="display:none" id="rm_hold_vitals">
								<dt>Hold Vitals For</dt>
								<dd>
									<p>
										Heart Rate : <span class="bold  mr-2" id="heart_rate_rm">Flowchart Name - DONE</span> <br>
										Systole / Dystole : <span class="bold " id="sys_dys_rm">DONE</span>   <br>
										Respiratory Rate : <span class="bold " id="res_rate_rm">DONE</span>  <br>
										Pulse : <span class="bold " id="pulse_rm">DONE</span> <br>
									</p>
								</dd>
							</dl>




							<hr>

							<!--Event Parameters-->
							<section>
								<!--customize event title-->
								<dl class="item-property">
									<dt>Customize Event Title</dt>
									<dd>
										<p><input class="form-control" id="eventTitle" size="16" type="text" value="" style="max-height: 35px;"></p>
									</dd>

								</dl>


								<!--Flowsheet-->
								<dl class="item-property">
									<dt>Add Assessment/FlowSheet</dt>
									<dd>
										<p><SearchableSelectField class="selectpicker w-100" multiple aria-label="Default select example" data-live-search="false">
												<option value="1">FlowSheet 1</option>
												<option value="2">FlowSheet 2</option>
												<option value="3">FlowSheet 3</option>
											</SearchableSelectField></p>
									</dd>

								</dl>


								<!--Patient education-->
								<dl class="item-property">
									<dt>Patient Education</dt>
									<dd>
										<p>
										<div class="row ml-3">
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="yes_patient_education" value="1">
												<label class="form-check-label" for="all_filter">Yes</label>
											</div>

											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="no-patient_education" value="1">
												<label class="form-check-label" for="all_filter">No</label>
											</div>

										</div>
										</p>
									</dd>

								</dl>




								<!--Description-->
								<dl class="item-property">
									<dt>Description </dt>
									<dd>
										<p>

											<textarea name="formsummernote" id="taskDec" cols="30" rows="4" style="width: 100%;"></textarea>


										</p>
									</dd>

								</dl>


								<!--task frequency-->
								<dl class="item-property">
									<dt>Task Frequency<p class="bold pl-3"><span id="rm_frequency_2"></span></p></dt>
									<dd>
										<p>
											<SearchableSelectField id="taskFrequencySelect" class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height">
												<option selected disabled>Choose Task Frequency ...</option>
												<option value="1">Morning (8:00am), Once Every Morning at 8:00am</option>
												<option value="2">Night (8:00pm), Once Every Night at 8:00pm </option>
												<option value="3">Twice a day (8:00am & 8:00pm), One in the Morning and night </option>
												<option value="4">Three times daily (8:00am , 2:00pm & 8:00pm), One Every Morning, Afternoon and Night</option>
												<option value="5">Four times daily (6:00am, 12:00pm , 6:00pm & 10:00pm)</option>
												<option value="6" data-content="<span >Regular 2</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="7" data-content="<span >Regular 3</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="8" data-content="<span >Regular 4</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="9" data-content="<span >Regular 6</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="10" data-content="<span >Regular 8</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="11" data-content="<span >Regular 12</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="12" data-content="<span>Regular 24</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
											</SearchableSelectField>
										</p>
									</dd>

								</dl>



								<!--Start Date -->
								<dl id="sd_container" class="item-property ">
									<dt>Start Date and/or Time<p class="bold pl-3"><span id="rm_start_date_2"></span></p></dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime" id="startDate_prescriptionService" size="16" type="text" placeholder="Choose Start Date" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
										</p>
									</dd>

								</dl>

								<dl id="suggested_date_container_presc" class="item-property" style="display:none">
									<dt>Suggested Dose Dates <p class="bold pl-3"></p></dt>
									<dd id="suggested_dates_presc">
										
									</dd>

								</dl>
								<!--//Start Date -->

								<!--checkbox - override -->
								<!-- <div class="input-group mb-4 ">
									<input id="overrideCheckBox" type="checkbox" class="mr-2">
									<label class="pt-2" for="overrideCheckBox">
										Override Administration Task Time
									</label>
								</div> -->


								<!--//checkbox- override -->

								<!--Start Date Time -->
								<dl id="sdt_container" class="item-property d-none">
									<dt>Start Date & Time <p class="bold pl-3"><span id="rm_start_date_3"></span></p></dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime " id="startDateTime_prescriptionService" size="16" type="text" placeholder="Choose Start Date & Time" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>


										</p>
									</dd>

								</dl>
								<!--//Start Date time-->


								<!--Task duration-->
								<dl class="item-property">
									<dt>Task Duration</dt>
									<dd>
										<p>
											<SearchableSelectField id="taskDurationSelect" class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height">
												<option selected disabled>Choose Task Duration ...</option>
												<option value="30">30 minutes</option>
												<option value="60">1 hour</option>
												<option value="90">1 hour 30 minutes</option>
												<option value="120">2 hours</option>
											</SearchableSelectField>
										</p>
									</dd>

								</dl>
								<!--//task duration-->









								<!--End date   -->
								<!-- <dl class="item-property">
									<dt>End Date </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control sheetDate" id="endDate_requestedService" size="16" type="text" placeholder="Choose End Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl> -->

								<!--//End date -->

								<!--set reminder-->
								<dl class="item-property">
									<dt>Set Reminder </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_reminder" id="med_task_reminder" size="16" type="text" placeholder="Set Reminder" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><i class="fa fa-bell text-slate-900" aria-hidden="true"></i></span>
										</div>
										</p>
									</dd>

								</dl>

								<!--//set reminder-->
							</section>


							<!--//Event Paramters -->











						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="save_prescriptionService" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						save</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//start requested prescription task modal-->





<!--PRN Record modal-->
<div class="modal fade" id="prnModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested PRN</h5>
				<span class="pull-left">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true" style="color: #ff9ff3;">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg text-dark text-uppercase " style="background: #ff9ff3;"><b>Add to administration timeline</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">


						<!--Requested service Details-->
						<article class="card-body pt-2 pl-5 pr-5 p-0">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">


										</dd>
									</dl>
								</div>

							</div>
							<hr>


							<!--Request & issue details -->
							<dl class="item-property">
								<dt>Request & Issue Details</dt>
								<dd>
									<p>
										Request Date: <span id="req_date_prn_modal"></span> <br>
										Requester: <span id="req_prn_user_name"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							<!--Drug name-->
							<dl class="item-property">
								<dt>Drug name</dt>
								<dd>
									<p><span id="prn_drugName"></span></p>
								</dd>
							</dl>
							<!--//drug name-->
							<hr>


							<!--number of days-->
							<dl class="item-property">
								<dt>End Date</dt>
								<dd>
									<p><span id="prn_days_end_date"></span></p>
								</dd>
							</dl>
							<!--//number of days -->

							<hr>


							<!--frequency-->
							<dl class="item-property d-none">
								<dt>Drug Frequency</dt>
								<dd>
									<p><span id="prn_frequency"></span></p>
								</dd>
							</dl>

							<dl class="item-property" style="display:none" id="prn_hold_vitals">
								<dt>Hold Vitals For</dt>
								<dd>
									<p>
										Heart Rate : <span class="bold  mr-2" id="heart_rate_prn">Flowchart Name - DONE</span> <br>
										Systole / Dystole : <span class="bold " id="sys_dys_prn">DONE</span>   <br>
										Respiratory Rate : <span class="bold " id="res_rate_prn">DONE</span>  <br>
										Pulse : <span class="bold " id="pulse_prn">DONE</span> <br>
									</p>
								</dd>
							</dl>
							<!--//frequency-->
							<hr>

							<hr>

							<!--Event Parameters-->
							<section>
								<!--customize event title-->
								<dl class="item-property">
									<dt>Customize Event Title</dt>
									<dd>
										<p><input class="form-control" id="prn_eventTitle" size="16" type="text" value="" style="max-height: 35px;"></p>
									</dd>

								</dl>


								<!--Flowsheet-->
								<dl class="item-property">
									<dt>Add Assessment/FlowSheet</dt>
									<dd>
										<p><SearchableSelectField class="selectpicker w-100" multiple aria-label="Default select example" data-live-search="false">
												<option value="1">FlowSheet 1</option>
												<option value="2">FlowSheet 2</option>
												<option value="3">FlowSheet 3</option>
											</SearchableSelectField></p>
									</dd>

								</dl>


								<!--Patient education-->
								<dl class="item-property">
									<dt>Patient Education</dt>
									<dd>
										<p>
										<div class="row ml-3">
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="yes_patient_education" value="1">
												<label class="form-check-label" for="all_filter">Yes</label>
											</div>

											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="no-patient_education" value="0">
												<label class="form-check-label" for="all_filter">No</label>
											</div>

										</div>
										</p>
									</dd>

								</dl>




								<!--Description-->
								<dl class="item-property">
									<dt>Description </dt>
									<dd>
										<p>

											<textarea name="formsummernote" id="prn_taskDec" cols="30" rows="4" style="width: 100%;"></textarea>


										</p>
									</dd>

								</dl>



								<!--Task duration-->
								<dl class="item-property">
									<dt>Task Duration</dt>
									<dd>
										<p>
											<SearchableSelectField id="prn_taskDurationSelect" class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height">
												<option selected disabled>Choose Task Duration ...</option>
												<option value="30">30 minutes</option>
												<option value="60">1 hour</option>
												<option value="90">1 hour 30 minutes</option>
												<option value="120">2 hours</option>
											</SearchableSelectField>
										</p>
									</dd>

								</dl>
								<!--//task duration-->












								<!--//set reminder-->
							</section>


							<!--//Event Paramters -->


						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="record_prnService" data-dismiss="modal" type="button" style="background:#ff9ff3;" class="btn btn-lg text-dark mb-2"><i class="fa fa-check"></i>
						Record
					</button>
					<button id="save_prnService" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Complete
					</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel
					</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//PRN Record modal-->


<!--Sample collection Record modal-->
<div class="modal fade" id="sampleCollectionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested Sample Collection</h5>
				<span class="pull-left">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true" style="color: #a5b1c2;">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg text-slate-900 text-uppercase " style="background: #a5b1c2;"><b>Add Sample Collection to administration timeline</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">


						<!--Requested service Details-->
						<article class="card-body pt-2 pl-5 pr-5 p-0">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">


										</dd>
									</dl>
								</div>

							</div>
							<hr>


							<!--Request & issue details -->
							<dl class="item-property">
								<dt>Request & Issue Details</dt>
								<dd>
									<p>
										Request Date: <span id="req_collection_date_modal"></span> <br>
										Requester: <span id="req_collection_user_name"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							<!--Drug name-->
							<dl class="item-property">
								<dt>Drug name</dt>
								<dd>
									<p><span id="collection_drugName"></span></p>
								</dd>
							</dl>
							<!--//drug name-->
							<hr>


							<!--specimen source-->
							<dl class="item-property">
								<dt>Specimen Source</dt>
								<dd>
									<p><span id="specimen_source"></span></p>
								</dd>
							</dl>
							<!--//specimen source -->

							<hr>


							<!--Priority-->
							<dl class="item-property">
								<dt>Priority</dt>
								<dd>
									<p id="collection_priority_record_modal"></p>
								</dd>
							</dl>

							<hr>
							

							<!--Frequency-->
							<dl class="item-property">
								<dt>Frequency (mins)</dt>
								<dd>
								<p><span id="collection_frequency_record_modal"></span></p>
								</dd>
							</dl>


							<hr>

							<!--Event Parameters-->
							<section>
								<!--customize event title-->
								<dl class="item-property">
									<dt>Customize Event Title</dt>
									<dd>
										<p><input class="form-control" id="collection_eventTitle" size="16" type="text" value="" style="max-height: 35px;"></p>
									</dd>

								</dl>


								<!--Flowsheet-->
								<!-- <dl class="item-property">
									<dt>Add Assessment/FlowSheet</dt>
									<dd>
										<p><SearchableSelectField class="selectpicker w-100" multiple aria-label="Default select example" data-live-search="false">
												<option value="1">FlowSheet 1</option>
												<option value="2">FlowSheet 2</option>
												<option value="3">FlowSheet 3</option>
											</SearchableSelectField></p>
									</dd>

								</dl> -->


								<!--Patient education-->
								<!-- <dl class="item-property">
									<dt>Patient Education</dt>
									<dd>
										<p>
										<div class="row ml-3">
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="yes_patient_education" value="1">
												<label class="form-check-label" for="all_filter">Yes</label>
											</div>

											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="no-patient_education" value="1">
												<label class="form-check-label" for="all_filter">No</label>
											</div>

										</div>
										</p>
									</dd>

								</dl> -->




								<!--Description-->
								<dl class="item-property">
									<dt>Description </dt>
									<dd>
										<p>

											<textarea name="formsummernote" id="collection_taskDec" cols="30" rows="4" style="width: 100%;"></textarea>


										</p>
									</dd>

								</dl>









								<!-- <dl class="item-property">
									<dt> Date & Time </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime " id="dateTime_collectionService" size="16" type="text" placeholder="Choose Date & Time" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>


										</p>
									</dd>

								</dl> -->




								<!-- <dl class="item-property">
									<dt>Task Duration</dt>
									<dd>
										<p>
											<SearchableSelectField id="collection_taskDurationSelect" class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height">
												<option selected disabled>Choose Task Duration ...</option>
												<option value="30">30 minutes</option>
												<option value="60">1 hour</option>
												<option value="90">1 hour 30 minutes</option>
												<option value="120">2 hours</option>
											</SearchableSelectField>
										</p>
									</dd>

								</dl> -->













								<!--//set reminder-->
							</section>


							<!--//Event Paramters -->


						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="save_collectionService" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						save</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//Sample collection Record modal-->





<!--Begin Requested Infusion Task Modal-->
<div class="modal fade" id="infusionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested Infusion</h5>
				<!-- <span class="pull-left" style="color: red;"> -->
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg text-slate-900 text-uppercase " style="background: #6c5ce7;"><b>Add Infusion to administration timeline</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">


						<!--Requested service Details-->
						<article class="card-body pt-2 pl-5 pr-5 p-0">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd  class="allergy-small-card">


										</dd>
									</dl>
								</div>

							</div>
							<hr>


							<!--Request & issue details -->
							<dl class="item-property">
								<dt>Request & Issue Details</dt>
								<dd>
									<p>
										Request Date: <span id="req_date_inf_modal"></span> <br>
										Requester: <span id="req_inf_user_name"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							<!--Performer & Witness details -->
							<dl class="item-property">
								<dt>Issuer Details</dt>
								<dd>
									<p>
										Issue Date: <span id="perform_date_inf_modal"></span> <br>
										Issue By: <span id="perform_bt_user_name_inf"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
										<!-- Witness By: Ben White <span class="ml-2 badge rounded-pill bg-success">Doctor</span> -->


									</p>
								</dd>
							</dl>

							<hr>

							<!--Drug name-->
							<dl class="item-property">
								<dt>Drug name</dt>
								<dd>
									<p><span id="rm_drugName_inf"></span></p>
								</dd>
							</dl>
							<!--//drug name-->
							<hr>

							<dl class="item-property">
								<dt>Administer Per Dose</dt>
								<dd>
									<p><span id="rm_administer_inf"></span></p>
								</dd>
							</dl>
							<!--frequency-->
							<dl class="item-property">
								<dt>Drug Frequency</dt>
								<dd>
									<p><span id="rm_frequency_inf"></span></p>
								</dd>
							</dl>
							<dl class="item-property">
								<dt>Administer Dose</dt>
								<dd>
									<p><span id="rm_administer_dose_inf"></span></p>
								</dd>
							</dl>
							<!--number of days-->
							<dl class="item-property">
								<dt>Number Of days</dt>
								<dd>
									<p><span id="rm_days_inf"></span></p>
								</dd>
							</dl>
							<!--//number of days -->
							
							
							
							<!--//frequency-->
							<!--frequency-->
							<dl class="item-property d-none">
								<dt>Duration</dt>
								<dd>
									<p><span id="rm_duration_inf"></span></p>
								</dd>
							</dl>
							<dl class="item-property">
								<dt>Total Administration Dose</dt>
								<dd>
									<p><span id="rm_total_volme_inf"></span> at <span id="rm_rate_inf"></span> for <span id="rm_duration_total_inf"></span></p>
								</dd>
							</dl>
							<dl class="item-property">
								<dt>Bag Details</dt>
								<dd>
									<p><span id="rm_total_quantity_inf"></span></p>
								</dd>
							</dl>
							<dl class="item-property d-none">
								<dt>Total Volume</dt>
								<dd>
									<p><span id=""></span></p>
								</dd>
							</dl>
							<dl class="item-property d-none">
								<dt>Rate</dt>
								<dd>
									
								</dd>
							</dl>
							<dl class="item-property" style="display:none" id="inf_hold_vitals">
								<dt>Hold Vitals For</dt>
								<dd>
									<p>
										Heart Rate : <span class="bold  mr-2" id="inf_heart_rate_inf">Flowchart Name - DONE</span> <br>
										Systole / Dystole : <span class="bold " id="inf_sys_dys_inf">DONE</span>   <br>
										Respiratory Rate : <span class="bold " id="inf_res_rate_inf">DONE</span>  <br>
										Pulse : <span class="bold " id="inf_pulse_inf">DONE</span> <br>
									</p>
								</dd>
							</dl>
							<dl class="item-property" style="display:none" id="inf_levels">
								<dt>Trough | Peak Level Information</dt>
								<dd>
									<p><span class="text-primary" id="rm_peak_trough_levels_inf"></span></p>
								</dd>
							</dl>
							<!--//frequency-->
							<hr>

							<!--Event Parameters-->
							<section>
								<!--customize event title-->
								<dl class="item-property">
									<dt>Customize Event Title</dt>
									<dd>
										<p><input class="form-control" id="eventTitle_inf" size="16" type="text" value="" style="max-height: 35px;"></p>
									</dd>

								</dl>

								<div class="form-group row">
									<dt class="pl-3">Site</dt>
										<div class="col-md-12">
												<SearchableSelectField name="site_method_id" class="form-control show-menu-arrow show-tick site_method" data-required="1" data-live-search="true" data-size="5" id="site_method" title="Site Method">
														
												</SearchableSelectField>
										</div>
								</div>
								<div class="form-group row">
										<div class="col-md-12">
												<SearchableSelectField name="site_location_id" class="form-control show-menu-arrow show-tick site_location" data-required="1" data-live-search="true" data-size="5" id="site_location_inf" title="Site Location">

												</SearchableSelectField>
										</div>
								</div>

								<!--Flowsheet-->
								<dl class="item-property">
									<dt>Add Assessment/FlowSheet</dt>
									<dd>
										<p><SearchableSelectField class="selectpicker w-100" multiple aria-label="Default select example" data-live-search="false">
												<option value="1">FlowSheet 1</option>
												<option value="2">FlowSheet 2</option>
												<option value="3">FlowSheet 3</option>
											</SearchableSelectField></p>
									</dd>

								</dl>


								<!--Patient education-->
								<dl class="item-property">
									<dt>Patient Education</dt>
									<dd>
										<p>
										<div class="row ml-3">
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="yes_patient_education" value="1">
												<label class="form-check-label" for="all_filter">Yes</label>
											</div>

											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="no-patient_education" value="0">
												<label class="form-check-label" for="all_filter">No</label>
											</div>

										</div>
										</p>
									</dd>

								</dl>




								<!--Description-->
								<dl class="item-property">
									<dt>Description </dt>
									<dd>
										<p>

											<textarea name="formsummernote" id="taskDec_inf" cols="30" rows="4" style="width: 100%;"></textarea>


										</p>
									</dd>

								</dl>


								<!--task frequency-->
								<dl class="item-property">
									<dt>Task Frequency <p class="bold pl-3"><span id="rm_frequency_2_inf"></span></p></dt>
									<dd>
										
										<p>
											<SearchableSelectField id="taskFrequencySelect_inf" class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height">
												<option selected disabled>Choose Task Frequency ...</option>
												<option value="1">Morning (8:00am), Once Every Morning at 8:00am</option>
												<option value="2">Night (8:00pm), Once Every Night at 8:00pm </option>
												<option value="3">Twice a day (8:00am & 8:00pm), One in the Morning and night </option>
												<option value="4">Three times daily (8:00am , 2:00pm & 8:00pm), One Every Morning, Afternoon and Night</option>
												<option value="5">Four times daily (6:00am, 12:00pm , 6:00pm & 10:00pm)</option>
												<option value="6" data-content="<span >Regular 2</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="7" data-content="<span >Regular 3</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="8" data-content="<span >Regular 4</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="9" data-content="<span >Regular 6</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="10" data-content="<span >Regular 8</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="11" data-content="<span >Regular 12</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
												<option value="12" data-content="<span>Regular 24</span> <span class='badge badge-secondary ml-2'>Custom Start Time</span>"></option>
											</SearchableSelectField>
										</p>
									</dd>

								</dl>



								<!--Start Date -->
								<dl id="sd_container_inf" class="item-property d-none">
									<dt>Start Date<p class="bold pl-3"><span id="rm_start_date_inf"></span></p></dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime" id="startDate_prescriptionService_inf" size="16" type="text" placeholder="Choose Start Date" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
										</p>
									</dd>

								</dl>
								<!--//Start Date -->




								<!--//checkbox- override -->

								<!--Start Date Time -->
								<dl id="sdt_container_inf" class="item-property">
									<dt>Start Date & Time <p class="bold pl-3"><span id="rm_start_date_2_inf"></span></p></dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime " id="startDateTime_prescriptionService_inf" size="16" type="text" placeholder="Choose Start Date & Time" required style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>


										</p>
									</dd>

								</dl>

								<dl id="suggested_date_container_inf" class="item-property" style="display:none">
									<dt>Suggested Dose Dates <p class="bold pl-3"></p></dt>
									<dd id="suggested_dates_inf">
										
									</dd>

								</dl>
								<!--//Start Date time-->


								<!--Task duration-->
								<dl class="item-property">
									<dt>Task Duration, hr(s)</dt>
									<dd>
										<p>
											<!-- <SearchableSelectField id="taskDurationSelect_inf" class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height">
												<option selected disabled>Choose Task Duration ...</option>
												<option value="30">30 minutes</option>
												<option value="60">1 hour</option>
												<option value="90">1 hour 30 minutes</option>
												<option value="120">2 hours</option>
											</SearchableSelectField> -->
											<input type="number" class="form-control input-height" name="task_duration" id="taskDurationSelect_inf"/>
										</p>
									</dd>

								</dl>
								<!--//task duration-->









								<!--End date   -->
								<!-- <dl class="item-property">
									<dt>End Date </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control sheetDate" id="endDate_requestedService" size="16" type="text" placeholder="Choose End Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl> -->

								<!--//End date -->

								<!--set reminder-->
								<dl class="item-property">
									<dt>Set Reminder </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_reminder" id="med_task_reminder_inf" size="16" type="text" placeholder="Set Reminder" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><i class="fa fa-bell text-slate-900" aria-hidden="true"></i></span>
										</div>
										</p>
									</dd>

								</dl>

								<!--//set reminder-->
							</section>


							<!--//Event Paramters -->











						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="save_InfusionService_inf" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						save</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>

<div class="modal fade" id="transfusionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested Infusion</h5>
				<!-- <span class="pull-left" style="color: red;"> -->
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg text-slate-900 text-uppercase " style="background: #6c5ce7;"><b>Add Infusion to administration timeline</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">


						<!--Requested service Details-->
						<article class="card-body pt-2 pl-5 pr-5 p-0">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">
										</dd>
									</dl>
								</div>

							</div>
							<hr>


							<!--Request & issue details -->
							<dl class="item-property">
								<dt>Request & Issue Details</dt>
								<dd>
									<p>
										Request Date: <span id="req_date_trans_modal"></span> <br>
										Requester: <span id="req_trans_user_name"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_trans_user_role"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							<!--Performer & Witness details -->
							<dl class="item-property">
								<dt>Issuer Details</dt>
								<dd>
									<p>
										Issue Date: <span id="perform_date_trans_modal"></span> <br>
										Issue By: <span id="perform_trans_bt_user_name"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="perform_trans_user_role"></span> <br>
										<!-- Witness By: Ben White <span class="ml-2 badge rounded-pill bg-success">Doctor</span> -->


									</p>
								</dd>
							</dl>

							<hr>

							<!--Drug name-->
							<dl class="item-property">
								<dt>Drug name</dt>
								<dd>
									<p><span id="rm_drugName_trans"></span></p>
								</dd>
							</dl>
							<!--//drug name-->
							<hr>

							<dl class="item-property">
								<dt>Administer Per Dose</dt>
								<dd>
									<p><span id="rm_administer_trans"></span></p>
								</dd>
							</dl>
							<!--frequency-->
							<!-- <dl class="item-property">
								<dt>Drug Frequency</dt>
								<dd>
									<p><span id="rm_frequency_trans"></span></p>
								</dd>
							</dl> -->
							<!--number of days-->
							<!-- <dl class="item-property">
								<dt>Number Of days</dt>
								<dd>
									<p><span id="rm_days_trans"></span></p>
								</dd>
							</dl> -->
							<!--//number of days -->
							
							
							
							<!--//frequency-->
							<!--frequency-->
							<dl class="item-property d-none">
								<dt>Duration</dt>
								<dd>
									<p><span id="rm_duration_trans"></span></p>
								</dd>
							</dl>
							<!-- <dl class="item-property">
								<dt>Total Administration Dose</dt>
								<dd>
									<p><span id="rm_total_volme_trans"></span> at <span id="rm_rate_trans"></span> for <span id="rm_duration_total_trans"></span></p>
								</dd>
							</dl> -->
							<!-- <dl class="item-property">
								<dt>Bag Details</dt>
								<dd>
									<p><span id="rm_total_quantity_trans"></span></p>
								</dd>
							</dl> -->
							<dl class="item-property d-none">
								<dt>Total Volume</dt>
								<dd>
									<p><span id=""></span></p>
								</dd>
							</dl>
							<dl class="item-property d-none">
								<dt>Rate</dt>
								<dd>
									
								</dd>
							</dl>
							<!-- <dl class="item-property" style="display:none" id="trans_hold_vitals">
								<dt>Hold Vitals For</dt>
								<dd>
									<p>
										Heart Rate : <span class="bold  mr-2" id="trans_heart_rate_trans">Flowchart Name - DONE</span> <br>
										Systole / Dystole : <span class="bold " id="trans_sys_dys_trans">DONE</span>   <br>
										Respiratory Rate : <span class="bold " id="trans_res_rate_trans">DONE</span>  <br>
										Pulse : <span class="bold " id="trans_pulse_trans">DONE</span> <br>
									</p>
								</dd>
							</dl> -->
							<!-- <dl class="item-property" style="display:none" id="trans_levels">
								<dt>Trough | Peak Level information</dt>
								<dd>
									<p><span class="text-primary" id="rm_peak_trough_levels_trans"></span></p>
								</dd>
							</dl> -->
							<!--//frequency-->
							<hr>

							<!--Event Parameters-->
							<section>
								<!--customize event title-->
								<dl class="item-property">
									<dt>Customize Event Title</dt>
									<dd>
										<p><input class="form-control" id="eventTitle_trans" size="16" type="text" value="" style="max-height: 35px;"></p>
									</dd>

								</dl>

								<div class="form-group row">
									<dt class="pl-3">Site</dt>
										<div class="col-md-12">
												<SearchableSelectField name="site_method_id" class="form-control show-menu-arrow show-tick site_method" data-required="1" data-live-search="true" data-size="5" id="site_method_trans" title="Site Method">
														
												</SearchableSelectField>
										</div>
								</div>
								<div class="form-group row">
										<div class="col-md-12">
												<SearchableSelectField name="site_location_id" class="form-control show-menu-arrow show-tick site_location" data-required="1" data-live-search="true" data-size="5" id="site_location_trans" title="Site Location">

												</SearchableSelectField>
										</div>
								</div>
								<!--Flowsheet-->
								<!-- <dl class="item-property">
									<dt>Add Assessment/FlowSheet</dt>
									<dd>
										<p><SearchableSelectField class="selectpicker w-100" multiple aria-label="Default select example" data-live-search="false">
												<option value="1">FlowSheet 1</option>
												<option value="2">FlowSheet 2</option>
												<option value="3">FlowSheet 3</option>
											</SearchableSelectField></p>
									</dd>

								</dl> -->


								<!--Patient education-->
								<!-- <dl class="item-property">
									<dt>Patient Education</dt>
									<dd>
										<p>
										<div class="row ml-3">
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="yes_patient_education" value="1">
												<label class="form-check-label" for="all_filter">Yes</label>
											</div>

											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="patient_education_radio" id="no-patient_education" value="0">
												<label class="form-check-label" for="all_filter">No</label>
											</div>

										</div>
										</p>
									</dd>

								</dl> -->




								<!--Description-->
								<dl class="item-property">
									<dt>Description </dt>
									<dd>
										<p>

											<textarea name="formsummernote" id="taskDec_trans" cols="30" rows="4" style="width: 100%;"></textarea>


										</p>
									</dd>

								</dl>




								<!--Start Date -->
								<dl id="sd_container_trans" class="item-property d-none">
									<dt>Start Date<p class="bold pl-3"><span id="rm_start_date_trans"></span></p></dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime" id="startDate_prescriptionService_trans" size="16" type="text" placeholder="Choose Start Date" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
										</p>
									</dd>

								</dl>
								<!--//Start Date -->




								<!--//checkbox- override -->

								<!--Start Date Time -->
								<dl id="sdt_container_trans" class="item-property">
									<dt>Date & Time <p class="bold pl-3"><span id="rm_start_date_2_trans"></span></p></dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime " id="startDateTime_prescriptionService_trans" size="16" type="text" placeholder="Choose Start Date & Time" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>


										</p>
									</dd>

								</dl>
								<!--//Start Date time-->


								<!--Task duration-->
								<dl class="item-property">
									<dt>Task Duration, hr(s)</dt>
									<dd>
										<p>
											<!-- <SearchableSelectField id="taskDurationSelect_inf" class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height">
												<option selected disabled>Choose Task Duration ...</option>
												<option value="30">30 minutes</option>
												<option value="60">1 hour</option>
												<option value="90">1 hour 30 minutes</option>
												<option value="120">2 hours</option>
											</SearchableSelectField> -->
											<input type="number" max="4" class="form-control input-height" name="task_duration" id="taskDurationSelect_trans"/>
										</p>
									</dd>

								</dl>
								<!--//task duration-->









								<!--End date   -->
								<!-- <dl class="item-property">
									<dt>End Date </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control sheetDate" id="endDate_requestedService" size="16" type="text" placeholder="Choose End Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl> -->

								<!--//End date -->

								<!--set reminder-->
								<dl class="item-property">
									<dt>Set Reminder </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_reminder" id="med_task_reminder_inf" size="16" type="text" placeholder="Set Reminder" style="max-height: 35px;">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-remove text-slate-900"></span></span>
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><i class="fa fa-bell text-slate-900" aria-hidden="true"></i></span>
										</div>
										</p>
									</dd>

								</dl>

								<!--//set reminder-->
							</section>


							<!--//Event Paramters -->











						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="save_transfusionService_trans" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						save</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>





<!--doses button @ requested prescription table modal-->
<div class="modal fade" id="presc_dose_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested Prescription</h5>
				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg bg-danger text-uppercase "><b>View Prescription Doses</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">


						<!--Requested service Details-->
						<article class="card-body pt-2 pl-5 pr-5 p-0">


							<div class="row pl-3">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">

										</dd>
									</dl>
								</div>

							</div>
							<hr>


							<!--Request & issue details -->
							<dl class="item-property">
								<dt>Request & Issue Details</dt>
								<dd>
									<p>
										Request Date: <span id="dose_reqDate"></span> <br>
										Requester: <span id="dose_user_name"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="dose_user_role"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							<!--Drug name-->
							<dl class="item-property">
								<dt>Drug name</dt>
								<dd>
									<p><span id="dose_drugName"></span></p>
								</dd>
							</dl>
							<!--//drug name-->
							<hr>


							<!--number of days-->
							<dl class="item-property">
								<dt>Number Of days</dt>
								<dd>
									<p><span id="dose_days"></span></p>
								</dd>
							</dl>
							<!--//number of days -->

							<hr>


							<!--frequency-->
							<dl class="item-property">
								<dt>Drug Frequency</dt>
								<dd>
									<p><span id="dose_frequency"></span></p>
								</dd>
							</dl>
							<!--//frequency-->
							<hr>
							<!--frequency-->
							<dl class="item-property">
								<dt>Administer Dose</dt>
								<dd>
									<p><span id="dose_administration"></span></p>
								</dd>
							</dl>
							<!--//frequency-->
							<hr>

							<!--Instruction-->
							<dl class="item-property">
								<dt>Instruction</dt>
								<dd>
									<p><span id="dose_instructions"></span></p>
								</dd>
							</dl>
							<hr>

							<!--Period-->
							<dl class="item-property">
								<dt>Administration Tracker</dt>
								<dd>
									<p>
									<ul style="text-decoration: none;" id="administration_tracker_doses">

									</ul>
									</p>
								</dd>
							</dl>
							<hr>

							<!--Upcoming Task-->


						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="review_doses" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Review</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//doses button @ requested Prescription table modal-->
<!--doses button @ requested prescription table modal-->
<div class="modal fade" id="inf_dose_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested Prescription</h5>
				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg bg-danger text-uppercase "><b>View Prescription Doses</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">


						<!--Requested service Details-->
						<article class="card-body pt-2 pl-5 pr-5 p-0">


							<div class="row pl-3">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">

										</dd>
									</dl>
								</div>

							</div>
							<hr>


							<!--Request & issue details -->
							<dl class="item-property">
								<dt>Request & Issue Details</dt>
								<dd>
									<p>
										Request Date: <span id="dose_reqDate_inf"></span> <br>
										Requester: <span id="dose_user_name_inf"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="dose_user_role"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							<!--Drug name-->
							<dl class="item-property">
								<dt>Drug name</dt>
								<dd>
									<p><span id="dose_drugName_inf"></span></p>
								</dd>
							</dl>
							<!--//drug name-->
							<hr>


							<!--number of days-->
							<dl class="item-property">
								<dt>Number Of days</dt>
								<dd>
									<p><span id="dose_days_inf"></span></p>
								</dd>
							</dl>
							<!--//number of days -->

							<hr>


							<!--frequency-->
							<dl class="item-property">
								<dt>Drug Frequency</dt>
								<dd>
									<p><span id="dose_frequency_inf"></span></p>
								</dd>
							</dl>
							<!--//frequency-->
							<hr>
							<dl class="item-property">
								<dt>Administration Dose</dt>
								<dd>
									<p><span id="dose_administration_inf"></span></p>
								</dd>
							</dl>
							<hr>

							<!--Instruction-->
							<dl class="item-property d-none">
								<dt>Instruction</dt>
								<dd>
									<p><span id="dose_instructions_inf"></span></p>
								</dd>
							</dl>
							<hr>

							<!--Period-->
							<dl class="item-property">
								<dt>Administration Tracker</dt>
								<dd>
									<p>
									<ul style="text-decoration: none;" id="administration_tracker_doses_inf">

									</ul>
									</p>
								</dd>
							</dl>
							<hr>

							<!--Upcoming Task-->


						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="review_doses" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Review</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//doses button @ requested Prescription table modal-->



<!--Other Services modal (labs, surgery and services)-->

<div class="modal fade" id="serviceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Requested Service</h5>
				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg bg-success text-uppercase "><b>Add Service To Calendar</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!--Requested service Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">





							<!--Date of issue -->
							<dl class="item-property">
								<dt>Date Issued</dt>
								<dd>
									<p><span id="sm_date"></span></p>
								</dd>
							</dl>
							<!--//Date of issue-->



							<hr>
							<!--Service name-->
							<dl class="item-property">
								<dt>Service name</dt>
								<dd>
									<p><span id="sm_serviceName"></span></p>
								</dd>
							</dl>
							<!--//service name-->
							<hr>


							<!--service type-->
							<dl class="item-property">
								<dt>Service Type</dt>
								<dd>
									<p><span id="sm_type"></span></p>
								</dd>
							</dl>
							<!--//service type -->

							<hr>


							<!--Event Parameters-->
							<section>
								<!--customize event title-->
								<dl class="item-property">
									<dt>Customize Event Title</dt>
									<dd>
										<p><input class="form-control" id="sm_eventTitle" size="16" type="text" value="" style="max-height: 35px;"></p>
									</dd>

								</dl>
								<!--//customize event title-->

								<!--Description-->

								<dl class="item-property">
									<dt>Description </dt>
									<dd>
										<p>

											<textarea name="formsummernote" id="sm_desc" cols="30" rows="4" style="width: 100%;"></textarea>


										</p>
									</dd>

								</dl>



								<!--//Description-->





								<!--Start Date Time -->
								<dl class="item-property ">
									<dt>Start Date & Time </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control sheetDateTime" id="startDateTime_service" size="16" type="text" placeholder="Choose Start Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl>
								<!--//Start Date time-->


								<!--Task duration-->
								<dl class="item-property">
									<dt>Task Duration</dt>
									<dd>
										<p>
											<SearchableSelectField id="sm_taskDurationSelect" class="form-control select-2 " style="width: 100%;">
												<option selected disabled>Choose Task Duration ...</option>
												<option value="30">30 minutes</option>
												<option value="60">1 hour</option>
												<option value="90">1 hour 30 minutes</option>
												<option value="120">2 hours</option>
											</SearchableSelectField>
										</p>
									</dd>

								</dl>
								<!--//task duration-->





								<!--End date   -->
								<!-- <dl class="item-property">
									<dt>End Date </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control sheetDate" id="endDate_requestedService" size="16" type="text" placeholder="Choose End Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl> -->

								<!--//End date -->

								<!--set reminder-->
								<!-- <dl class="item-property">
									<dt>Set Reminder For Event?</dt>
									<dd>
										<p>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
											<label class="form-check-label" for="exampleRadios1">
												Next
											</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
											<label class="form-check-label" for="exampleRadios2">
												Reminder
											</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3">
											<label class="form-check-label" for="exampleRadios3">
												None
											</label>
										</div>

										</p>
									</dd>

								</dl> -->

								<!--//set reminder-->
							</section>


							<!--//Event Paramters -->











						</article>
						<!--//Requested Service Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="save_service" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fas fa-times"></i>
						save</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fas fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>

<!--//Other Services modal (labs, surgery and services)-->


<!--miscellaneous modal-->
<div class="modal fade" id="miscellaneousModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Miscellaneous Task</h5>
				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg bg-primary text-uppercase "><b>Create New Task </b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!-- Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">




							<!--Task Parameters-->
							<section>

								<!--task type-->
								<dl class="item-property">
									<dt>Task Type</dt>
									<dd>
										<p>
											<SearchableSelectField id="taskTypeSelect" class="form-control select-2 " style="width: 100%;">
												<option selected disabled>Choose Task Type ...</option>
												<option value="db">Dress Bed</option>
												<option value="cs">Change sheet</option>
												<option value="rs">Record Symptons</option>
												<option value="0">Others</option>
											</SearchableSelectField>
										</p>
									</dd>

								</dl>
								<!--//task type-->

								<!--title-->
								<dl class="item-property d-none" id="taskTitleContainer">
									<dt>Task Title</dt>
									<dd>
										<p><input class="form-control" id="addTaskTitle" size="16" type="text" value="Administer Amoxilica Tablets" style="max-height: 35px;"></p>
									</dd>

								</dl>
								<!--//title-->

								<!--Start Date Time -->
								<dl class="item-property">
									<dt>Start Date & Time </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime" id="start_miscTask" size="16" type="text" placeholder="Choose Start Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl>
								<!--//Start Date time-->



								<!--End date and time -->
								<dl class="item-property">
									<dt>End Date & Time </dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime" id="endDateTime_miscTask" size="16" type="text" placeholder="Choose End Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl>

								<!--//End date and time-->

								<!--Description-->

								<dl class="item-property">
									<dt>Description </dt>
									<dd>
										<p>

											<textarea name="formsummernote" id="miscTaskDesc" cols="30" rows="4" style="width: 100%;"></textarea>


										</p>
									</dd>

								</dl>



								<!--//Description-->

								<!--set reminder-->
								<dl class="item-property">
									<dt>Set Reminder For Event?</dt>
									<dd>
										<p>
										<div class="input-group ">
											<input class="form-control set_dateTime" id="reminder_miscTask" size="16" type="text" placeholder="Choose Start Date & Time" style="max-height: 35px;">
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-remove"></span></span>
											<span class="input-group-addon" style="max-height: 35px;"><span class="fa fa-calendar"></span></span>
										</div>


										</p>
									</dd>

								</dl>

								<!--//set reminder-->
							</section>


							<!--//Event Paramters -->











						</article>
						<!--// Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="saveMiscTask" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-times"></i>
						save</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//miscellaneous modal-->



<!--view task modal-->
<div class="modal fade" id="viewTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-fluid" role="document" style="width: 20%;">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Task</h5>
				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg bg-primary text-uppercase "><b>View Task Information</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">





							<!--title -->
							<dl class="item-property">

								<dd>
									<p><span style="font-size: 20px;">Add something to Patient Health Record</span></p>
								</dd>
							</dl>
							<!--//titl-->

							<hr>
							<!--start date and time -->
							<dl class="item-property">
								<dt>Start Date & Time</dt>
								<dd>
									<p><span></span></p>
								</dd>
							</dl>
							<!--//start date and time-->
							<hr>

							<!--end date and time-->
							<dl class="item-property">
								<dt>End Date & Time</dt>
								<dd>
									<p><span></span></p>
								</dd>
							</dl>
							<!--//name-->
							<hr>

							<!-- Descriptions-->
							<dl class="item-property">
								<dt>Description</dt>
								<dd>
									<p><span></span></p>
								</dd>
							</dl>
							<!--//service descriptions-->


						</article>
						<!--//Details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fas fa-times"></i>
						mark as completed</button>
					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fas fa-times"></i>
						Cancel</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//view task modal-->


<!--task click modal-->
<div class="modal fade" id="taskClickModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0">
				<h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Task</h5>
				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>
			<div class="mb-2">
				<span class="label label-lg bg-primary text-uppercase "><b>Task Status</b>
				</span>
			</div>
			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">





							<!--title -->
							<dl class="item-property">
								<dt>Title </dt>

								<dd>
									<p><span id="taskClick_title"> </span></p>
								</dd>
							</dl>
							<!--//titl-->

							<hr>
							<!--Period -->
							<dl class="item-property">
								<dt>Period</dt>
								<dd>
									<p><span id="taskClick_period"></span></p>
								</dd>
							</dl>
							<!--//Period-->
							<hr>



							<!-- Descriptions-->
							<dl class="item-property">
								<dt>Description</dt>
								<dd>
									<p><span id="taskClick_desc"></span></p>
								</dd>
							</dl>
							<!--//service descriptions-->


						</article>
						<!--//details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fas fa-times"></i>
						mark as completed</button>



					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fas fa-times"></i>
						Remove</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//task click modal-->




<!-- miscellaneous event click modal-->
<div class="modal fade" id="misc_taskClickModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0 pl-0 ">
				<span class="label label-lg  text-uppercase mt-3" style="background-color: #74b9ff;"><b>Miscellaneous Task Status</b>
				</span>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">





							<!--title -->
							<dl class="item-property">
								<dt>Title </dt>

								<dd>
									<p><span id="viewModal_title_misc"></span></p>
								</dd>
							</dl>
							<!--//titl-->

							<hr>
							<!--Period -->
							<dl class="item-property">
								<dt>Period</dt>
								<dd>
									<p><span id="viewModal_period_misc"></span></p>
								</dd>
							</dl>
							<!--//Period-->
							<hr>



							<!-- Descriptions-->
							<dl class="item-property">
								<dt>Description</dt>
								<dd>
									<p><span id="viewModal_desc_misc"></span></p>
								</dd>
							</dl>
							<!--//service descriptions-->

							<hr>


							<!-- status-->
							<dl class="item-property">
								<dt>Status</dt>
								<dd>
									<p> <button type="button" class="btn_choose_sent bg_btn_chose_1">
											<input type="radio" name="misc_action_buttons" value="1" />Complete
										</button>
										<button type="button" class="btn_choose_sent bg_btn_chose_2">
											<input type="radio" name="misc_action_buttons" value="2" />Pause
										</button>
										<button type="button" class="btn_choose_sent bg_btn_chose_3">
											<input type="radio" name="misc_action_buttons" value="3" />Stop
										</button>
									</p>
								</dd>
							</dl>
							<!--//status-->

							<hr>


							<!-- Additional information / reason-->
							<dl class="item-property ">
								<dt>Additional Info</dt>
								<dd>
									<textarea name="formsummernote" id="viewModal_info_misc" cols="30" rows="4" style="width: 100%;"></textarea>
								</dd>
							</dl>
							<!--//service descriptions-->






						</article>
						<!--//details-->





					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="viewModal_saveBtn_misc" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Save</button>


					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Close</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//miscellaneous event click modal-->


<!-- Prescription event click modal-->
<div class="modal fade" id="med_taskClickModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0 pl-0">
				<div class="mt-3">
					<!--sub heading-->
					<div class="mb-4 ">
						<span class="label label-lg  text-uppercase" style="background-color: #d63031;"><b>Prescription dose administration task</b>
						</span>
					</div>

					<!--Last Dose-->
					<div>
						<span class="label label-lg label-success  text-uppercase"><b id="set_task_count"></b>
						</span>
					</div>

				</div>

				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>

			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-2 pl-5 pr-5">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">

										</dd>
									</dl>
								</div>

							</div>


							<hr>

							<!-- title-->
							<dl class="item-property">
								<dt>Administration Title</dt>
								<dd>
									<p><span id="viewModal_title_med"></span></p>
									<p><span id="viewModal_med_id" class="d-none"></span></p>
								</dd>
							</dl>
							<hr>

							<!-- period-->
							<dl class="item-property">
								<dt>Period</dt>
								<dd>
									<p><span id="viewModal_period_med">26 Feb 2022, 8:00am - 26 Feb 2022, 8:30am</span></p>
								</dd>
							</dl>
							<hr>
							<dl class="item-property">
								<dt>Administer Dose</dt>
								<dd>
									<p><span id="viewModal_administer_dose_med">26 Feb 2022, 8:00am - 26 Feb 2022, 8:30am</span></p>
								</dd>
							</dl>
							<hr>


							<!-- Flow sheet and education -->
							<dl class="item-property">
								<dt>Flowsheet & Education</dt>
								<dd>
									<p>
										Flowsheet : <span class="badge rounded-pill bg-success mr-2">Flowchart Name - DONE</span> <span class="badge rounded-pill bg-warning mr-2">Flowchart Name 2 - Pending</span> <br>
										Patient Education: <span class="badge rounded-pill bg-success">DONE</span>
									</p>
								</dd>
							</dl>
							<dl class="item-property" style="display:none" id="hold_vitals_pres">
								<dt style="color:red">Hold Vitals For</dt>
								<dd>
									<p>
										Heart Rate : <span class="bold  mr-2" id="heart_rate_pres">Flowchart Name - DONE</span> <br>
										Systole / Dystole : <span class="bold " id="sys_dys_pres">DONE</span>   <br>
										Respiratory Rate : <span class="bold " id="res_rate_pres">DONE</span>  <br>
										Pulse : <span class="bold " id="pulse_pres">DONE</span> <br>
									</p>
								</dd>
							</dl>
							<hr>


							<!-- Reaction-->
							<dl class="item-property">
								<dt>Report Reaction</dt>
								<dd>
									<p>
										<textarea name="formsummernote" id="report_reaction_med" cols="30" rows="4" style="width: 100%;"></textarea>
									</p>
								</dd>
							</dl>
							<hr>

							<!-- Performer & co-signer-->
							<!-- <dl class="item-property">
								<dt>Performer & Co-Signer</dt>
								<dd>
									<p>
										Performed By: Sandra OWens <br>
										Co-Signer: Ben White
									</p>
								</dd>
							</dl> -->
							<hr>

							<!-- status-->
							<dl class="item-property">
								<dt>Status</dt>
								<dd>
									<p> 
										<div class="col-md-8">
											<div id="prescription_form_priority">
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="med_status" id="administer" value="1" checked>
													<label class="form-check-label" for="administer"><span class="badge rounded-pill bg-success" style="background-color: #d63031;">Administer</span></label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="med_status" id="pause" value="2">
													<label class="form-check-label" for="pause"><span class="badge rounded-pill bg-warning" style="background-color: #0984e3;">Pause</span></label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="med_status" id="stop" value="3">
													<label class="form-check-label" for="stop"><span class="badge rounded-pill bg-danger" style="background-color: #0984e3;">Stop</span></label>
												</div>
											</div>
										</div>
									</p>
								</dd>
							</dl>
							<!--//status-->

							<hr>

							<!-- Additional information / reason-->
							<dl class="item-property ">
								<dt>Additional Info</dt>
								<dd>
									<textarea name="formsummernote" id="viewModal_info_med" cols="30" rows="4" style="width: 100%;"></textarea>
								</dd>
							</dl>
							<!--//service descriptions-->

						</article>
						<!--//details-->

					</div> <!-- row.// -->


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="viewModal_saveBtn_med" onclick="submitMed()" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Save
					</button>


					<button data-dismiss="modal" type="button" class="btn btn-default btn-lg  mb-2"><i class="fa fa-refresh"></i>
						Reset</button>


					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Close</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//Prescription event click modal-->
<!-- Infusion event click modal-->
<div class="modal fade" id="med_taskClickModal_inf" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0 pl-0">
				<div class="mt-3">
					<!--sub heading-->
					<div class="mb-4 ">
						<span class="label label-lg  text-uppercase" style="background-color: #d63031;"><b>Infusion administration task</b>
						</span>
					</div>

					<!--Last Dose-->
					<div>
						<span class="label label-lg label-success  text-uppercase"><b id="set_bag_count"></b>
						</span>
					</div>

				</div>

				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>

			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-2 pl-5 pr-5">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">

										</dd>
									</dl>
								</div>

							</div>


							<hr>

							<!-- title-->
							<dl class="item-property">
								<dt>Administration Title</dt>
								<dd>
									<p><span id="viewModal_title_inf"></span></p>
									<p><span id="viewModal_inf_id" class="d-none"></span></p>
								</dd>
							</dl>
							<hr>

							<!-- period-->
							<dl class="item-property">
								<dt>Period</dt>
								<dd>
									<p><span id="viewModal_period_inf">26 Feb 2022, 8:00am - 26 Feb 2022, 8:30am</span></p>
								</dd>
							</dl>

							<!--number of days-->
							<!-- <dl class="item-property">
								<dt>Performed By</dt>
								<dd>
									<p><span id="rm_performed_by_inf"></span></p>
								</dd>
							</dl> -->
							<!--//number of days -->

							<!--frequency-->
							<dl class="item-property">
								<dt>Site Method</dt>
								<dd>
									<p><span id="admin_site_method_inf"></span></p>
								</dd>
							</dl>
							<dl class="item-property">
								<dt>Site Location</dt>
								<dd>
									<p><span id="admin_site_location_inf"></span></p>
								</dd>
							</dl>
							<!--//frequency-->
							<!--frequency-->
							<dl class="item-property d-none">
								<dt>ROA</dt>
								<dd>
									<p><span id="admin_roa_inf"></span></p>
								</dd>
							</dl>
							<dl class="item-property d-none">
								<dt>Frequency</dt>
								<dd>
									<p><span id="admin_frequency_inf"></span></p>
								</dd>
							</dl>
							<dl class="item-property d-none">
								<dt>Duration</dt>
								<dd>
									<p><span id="admin_duration_inf"></span></p>
								</dd>
							</dl>
							<!-- <dl class="item-property">
								<dt>Rate</dt>
								<dd>
									<p><span id="admin_rate_inf"></span></p>
								</dd>
							</dl> -->

							<hr>




							<!-- Flow sheet and education -->
							<dl class="item-property">
								<dt>Flowsheet & Education</dt>
								<dd>
									<p>
										Flowsheet : <span class="badge rounded-pill bg-success mr-2">Flowchart Name - DONE</span> <span class="badge rounded-pill bg-warning mr-2">Flowchart Name 2 - Pending</span> <br>
										Patient Education: <span class="badge rounded-pill bg-success">DONE</span>
									</p>
								</dd>
							</dl>

							<dl class="item-property" style="display:none" id="hold_vitals_inf">
								<dt style="color:red">Hold Vitals For</dt>
								<dd>
									<p>
										Heart Rate : <span class="bold  mr-2" id="heart_rate_inf">Flowchart Name - DONE</span> <br>
										Systole / Dystole : <span class="bold " id="sys_dys_inf">DONE</span>   <br>
										Respiratory Rate : <span class="bold " id="res_rate_inf">DONE</span>  <br>
										Pulse : <span class="bold " id="pulse_inf">DONE</span> <br>
									</p>
								</dd>
							</dl>
							<hr>


							<!-- Reaction-->
							<dl class="item-property d-none">
								<dt>Report Reaction</dt>
								<dd>
									<p>
										<textarea name="formsummernote" id="report_reaction_inf" cols="30" rows="4" style="width: 100%;"></textarea>
									</p>
								</dd>
							</dl>
							<hr>

							<!-- Performer & co-signer-->
							<!-- <dl class="item-property">
								<dt>Performer & Co-Signer</dt>
								<dd>
									<p>
										Performed By: Sandra OWens <br>
										Co-Signer: Ben White
									</p>
								</dd>
							</dl> -->
							<hr>


							<dl class="item-property">
								<dt>Status</dt>
								<dd>
									<p> 
										<div class="col-md-8">
											<div id="prescription_form_priority">
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="state_changes" id="pause" value="2">
													<label class="form-check-label" for="pause"><span class="badge rounded-pill bg-warning" style="background-color: #0984e3;">Pause</span></label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="state_changes" id="stop_all" value="3">
													<label class="form-check-label" for="stop_all"><span class="badge rounded-pill bg-danger" style="background-color: #0984e3;">Stop All</span></label>
												</div>
											</div>
										</div>
									</p>
								</dd>
							</dl>


							<!-- status-->
							<dl class="item-property">
								<!-- <dt>Status</dt> -->
								<dd>
									<p> 
										<div class="col-md-8">
											<div id="infusion_form_priority">
												<div class="form-check form-check-inline" id="administer_inf_start" style="display:none">
													<!-- <input class="form-check-input" type="radio" name="inf_status" id="administer_inf" value="1" onchange="toggle_inf_end_note()" checked>
													<label class="form-check-label" for="administer"><span class="badge rounded-pill bg-success"  style="background-color: #d63031;">Start</span></label> -->
													<div class="form-group row">
														<label class="control-label col-md-6">Start Bag
														</label>
														<div class="col-md-5">
															<label class="switchToggle">
																<input name="administer_inf_start" type="checkbox" id="inf_status_start" onclick="">
																<span class="slider green round"></span>
															</label>
														</div>
													</div>
												</div>
												<!-- <div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="inf_status" id="pause" value="2">
													<label class="form-check-label" for="pause"><span class="badge rounded-pill bg-warning" style="background-color: #0984e3;">Pause</span></label>
												</div> -->
												<div class="form-check form-check-inline" id="administer_inf_end" style="display:none">
													<!-- <input class="form-check-input" type="radio" name="inf_status" id="administer_inf" onchange="toggle_inf_end_note()" value="3">
													<label class="form-check-label" for="stop"><span class="badge rounded-pill bg-danger" style="background-color: #0984e3;">End</span></label> -->
													<div class="form-group row">
														<label class="control-label col-md-6">End Bag
														</label>
														<div class="col-md-5">
															<label class="switchToggle">
																<input name="administer_inf_end" type="checkbox" id="inf_status_end" onclick="">
																<span class="slider green round"></span>
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</p>
								</dd>
							</dl>

							<div id="end_note_section" style="display:none">
								<dl class="item-property">
									<dt>Volume / ml</dt>
									<dd>
										<p>
											<input type="text" name="" id="administer_volume_inf" class="form-check-input pl-3 ml-2" style="width: 85%;">
										</p>
									</dd>
								</dl>
								<br>
								<br>
								<dl class="item-property">
									<dt>Rate (ml/hr)</dt>
									<dd>
										<p>
										<input type="text" name="" id="administer_rate_volume_inf" class="form-check-input pl-3 ml-2" style="width: 85%;">
										</p>
									</dd>
								</dl>
								<br>
								<br>
								<dl class="item-property">
									<dt>To waste volume / ml</dt>
									<dd>
										<p>
										<input type="text" name="" id="administer_waste_volume_inf" class="form-check-input pl-3 ml-2" style="width: 85%;">
										</p>
									</dd>
								</dl>
								<br>
								<br>
								<dl class="item-property">
									<dt>Performed By</dt>
									<dd>
										<p>
										<div class="ml-2"><!-- php: = $this->request->getSession()->read()['Auth']['User']['first_name'] --> <!-- php: = $this->request->getSession()->read()['Auth']['User']['last_name'] --></div>
										</p>
									</dd>
								</dl>
								<br>
								<br>
							</div>
							<div class="d-none"><input type="hidden" name="is_started" id="is_started_inf"></div>
							<!--//status-->


							<hr>


							<!-- Additional information / reason-->
							<dl class="item-property d-none">
								<dt>Additional Info</dt>
								<dd>
									<textarea name="formsummernote" id="viewModal_info_inf" cols="30" rows="4" style="width: 100%;"></textarea>
								</dd>
							</dl>
							<!--//service descriptions-->






						</article>
						<!--//details-->





					</div> <!-- row.// -->


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="viewModal_saveBtn_med" onclick="submitInfusion()" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Save
					</button>


					<!-- <button data-dismiss="modal" onclick="stopInfusion()" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-refresh"></i> -->
					<button data-dismiss="modal" onclick="resetInfusionAdministration()" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-refresh"></i>
						Reset
					</button>


					<button data-dismiss="modal" type="button" class="btn btn-default btn-lg  mb-2"><i class="fa fa-times"></i>
						Close
					</button>
				</div>
			</form>
		</div>

	</div>
</div>
<div class="modal fade" id="med_taskClickModal_trans" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0 pl-0">
				<div class="mt-3">
					<!--sub heading-->
					<div class="mb-4 ">
						<span class="label label-lg  text-uppercase" style="background-color: #d63031;"><b>Transfusion administration task</b>
						</span>
					</div>

					<!--Last Dose-->
					<div>
						<!-- <span class="label label-lg label-success  text-uppercase"><b id="set_bag_count"></b>
						</span> -->
					</div>

				</div>

				<span class="pull-left" style="color: red;">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
			</div>

			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-2 pl-5 pr-5">


							<div class="row">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">

										</dd>
									</dl>
								</div>

							</div>


							<hr>

							<!-- title-->
							<dl class="item-property">
								<dt>Administration Title</dt>
								<dd>
									<p><span id="viewModal_title_trans"></span></p>
									<p><span id="viewModal_trans_id" class="d-none"></span></p>
								</dd>
							</dl>
							<hr>

							<!-- period-->
							<dl class="item-property">
								<dt>Period</dt>
								<dd>
									<p><span id="viewModal_period_trans">26 Feb 2022, 8:00am - 26 Feb 2022, 8:30am</span></p>
								</dd>
							</dl>

							<!--number of days-->
							<!-- <dl class="item-property">
								<dt>Performed By</dt>
								<dd>
									<p><span id="rm_performed_by_inf"></span></p>
								</dd>
							</dl> -->
							<!--//number of days -->

							<!--frequency-->
							<dl class="item-property">
								<dt>Site Method</dt>
								<dd>
									<p><span id="admin_site_method_trans"></span></p>
								</dd>
							</dl>
							<dl class="item-property">
								<dt>Site Location</dt>
								<dd>
									<p><span id="admin_site_location_trans"></span></p>
								</dd>
							</dl>
							<!--//frequency-->
							<!--frequency-->
							<dl class="item-property d-none">
								<dt>ROA</dt>
								<dd>
									<p><span id="admin_roa_trans"></span></p>
								</dd>
							</dl>
							<dl class="item-property d-none">
								<dt>Frequency</dt>
								<dd>
									<p><span id="admin_frequency_trans"></span></p>
								</dd>
							</dl>
							<dl class="item-property d-none">
								<dt>Duration</dt>
								<dd>
									<p><span id="admin_duration_trans"></span></p>
								</dd>
							</dl>
							<!-- <dl class="item-property">
								<dt>Rate</dt>
								<dd>
									<p><span id="admin_rate_inf"></span></p>
								</dd>
							</dl> -->

							<hr>




							<!-- Flow sheet and education -->
							<dl class="item-property">
								<dt>Flowsheet & Education</dt>
								<dd>
									<p>
										Flowsheet : <span class="badge rounded-pill bg-success mr-2">Flowchart Name - DONE</span> <span class="badge rounded-pill bg-warning mr-2">Flowchart Name 2 - Pending</span> <br>
										Patient Education: <span class="badge rounded-pill bg-success">DONE</span>
									</p>
								</dd>
							</dl>

							<!-- <dl class="item-property" style="display:none" id="hold_vitals_inf">
								<dt style="color:red">Hold Vitals For</dt>
								<dd>
									<p>
										Heart Rate : <span class="bold  mr-2" id="heart_rate_inf">Flowchart Name - DONE</span> <br>
										Systole / Dystole : <span class="bold " id="sys_dys_inf">DONE</span>   <br>
										Respiratory Rate : <span class="bold " id="res_rate_inf">DONE</span>  <br>
										Pulse : <span class="bold " id="pulse_inf">DONE</span> <br>
									</p>
								</dd>
							</dl> -->
							<hr>


							<!-- Reaction-->
							<dl class="item-property d-none">
								<dt>Report Reaction</dt>
								<dd>
									<p>
										<textarea name="formsummernote" id="report_reaction_trans" cols="30" rows="4" style="width: 100%;"></textarea>
									</p>
								</dd>
							</dl>
							<hr>

							<!-- Performer & co-signer-->
							<!-- <dl class="item-property">
								<dt>Performer & Co-Signer</dt>
								<dd>
									<p>
										Performed By: Sandra OWens <br>
										Co-Signer: Ben White
									</p>
								</dd>
							</dl> -->
							<hr>


							<dl class="item-property">
								<dt>Status</dt>
								<dd>
									<p> 
										<div class="col-md-8">
											<div id="transfusion_form_priority">
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="trans_state_changes" id="pause" value="2">
													<label class="form-check-label" for="pause"><span class="badge rounded-pill bg-warning" style="background-color: #0984e3;">Pause</span></label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="trans_state_changes" id="stop_all" value="3">
													<label class="form-check-label" for="stop_all"><span class="badge rounded-pill bg-danger" style="background-color: #0984e3;">Stop All</span></label>
												</div>
											</div>
										</div>
									</p>
								</dd>
							</dl>


							<!-- status-->
							<dl class="item-property">
								<!-- <dt>Status</dt> -->
								<dd>
									<p> 
										<div class="col-md-8">
											<div id="transfusion_form_priority">
												<div class="form-check form-check-inline" id="administer_trans_start" style="display:none">
													<!-- <input class="form-check-input" type="radio" name="inf_status" id="administer_inf" value="1" onchange="toggle_inf_end_note()" checked>
													<label class="form-check-label" for="administer"><span class="badge rounded-pill bg-success"  style="background-color: #d63031;">Start</span></label> -->
													<div class="form-group row">
														<label class="control-label col-md-6">Start Bag
														</label>
														<div class="col-md-5">
															<label class="switchToggle">
																<input name="administer_trans_start" type="checkbox" id="trans_status_start" onclick="">
																<span class="slider green round"></span>
															</label>
														</div>
													</div>
												</div>
												<!-- <div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="inf_status" id="pause" value="2">
													<label class="form-check-label" for="pause"><span class="badge rounded-pill bg-warning" style="background-color: #0984e3;">Pause</span></label>
												</div> -->
												<div class="form-check form-check-inline" id="administer_trans_end" style="display:none">
													<!-- <input class="form-check-input" type="radio" name="inf_status" id="administer_inf" onchange="toggle_inf_end_note()" value="3">
													<label class="form-check-label" for="stop"><span class="badge rounded-pill bg-danger" style="background-color: #0984e3;">End</span></label> -->
													<div class="form-group row">
														<label class="control-label col-md-6">End Bag
														</label>
														<div class="col-md-5">
															<label class="switchToggle">
																<input name="administer_trans_end" type="checkbox" id="trans_status_end" onclick="">
																<span class="slider green round"></span>
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</p>
								</dd>
							</dl>

							<div id="end_note_section_trans" style="display:none">
								<dl class="item-property">
									<dt>Volume / ml</dt>
									<dd>
										<p>
											<input type="text" name="" id="administer_volume_trans" class="form-check-input pl-3 ml-2" style="width: 85%;">
										</p>
									</dd>
								</dl>
								<br>
								<br>
								<dl class="item-property">
									<dt>Rate (ml/hr)</dt>
									<dd>
										<p>
										<input type="text" name="" id="administer_rate_volume_trans" class="form-check-input pl-3 ml-2" style="width: 85%;">
										</p>
									</dd>
								</dl>
								<br>
								<br>
								<dl class="item-property">
									<dt>To waste volume / ml</dt>
									<dd>
										<p>
										<input type="text" name="" id="administer_waste_volume_trans" class="form-check-input pl-3 ml-2" style="width: 85%;">
										</p>
									</dd>
								</dl>
								<br>
								<br>
								<dl class="item-property">
									<dt>Performed By</dt>
									<dd>
										<p>
										<div class="ml-2"><!-- php: = $this->request->getSession()->read()['Auth']['User']['first_name'] --> <!-- php: = $this->request->getSession()->read()['Auth']['User']['last_name'] --></div>
										</p>
									</dd>
								</dl>
								<br>
								<br>
							</div>
							<div class="d-none"><input type="hidden" name="is_started" id="is_started_trans"></div>
							<!--//status-->


							<hr>


							<!-- Additional information / reason-->
							<dl class="item-property d-none">
								<dt>Additional Info</dt>
								<dd>
									<textarea name="formsummernote" id="viewModal_info_trans" cols="30" rows="4" style="width: 100%;"></textarea>
								</dd>
							</dl>
							<!--//service descriptions-->






						</article>
						<!--//details-->





					</div> <!-- row.// -->


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<button id="viewModal_saveBtn_med" onclick="submitTransfusion()" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Save
					</button>


					<!-- <button data-dismiss="modal" onclick="stopInfusion()" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-refresh"></i> -->
					<button data-dismiss="modal" onclick="resetTransfusionAdministration()" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-refresh"></i>
						Reset
					</button>


					<button data-dismiss="modal" type="button" class="btn btn-default btn-lg  mb-2"><i class="fa fa-times"></i>
						Close
					</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//Infusion event click modal-->

<!-- view requested Prescription @ accordion table modal-->
<div class="modal fade" id="view_prescription_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0 pl-0 ">
				<span class="label label-lg  text-uppercase mt-3" style="background-color: #d63031;"><b>View Requested Prescription </b>
				</span>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">

							<div class="row pl-3">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">


										</dd>
									</dl>
								</div>

							</div>
							<hr>





							<!--Drug name -->
							<dl class="item-property">
								<dt>Drug Information</dt>

								<dd>
									<p>
										Name: <span class="text-danger bold" id="view_drugName"></span> <br>
										Dosage: <span class="bold text-danger" id="view_drugDose"></span> <br>
										Dosage Form: <span class="bold text-danger" id="view_drugForm"></span> <br>
										Batch #: <span class="bold text-danger" id="view_drugBatchNumber"></span> <br>
										Stock Qty: <span class="bold text-danger" id="view_drugStockQty"></span> <br>
										Expiry Date: <span class="bold text-danger" id="view_drugExpDate"></span> <br>
										Unit Price : <span class="bold currency">GHC</span> <span class="bold" id="view_drugUnitPrice"></span>

									</p>
								</dd>
							</dl>
							<hr>


							<!--Order information -->
							<dl class="item-property">
								<dt>Order Information</dt>

								<dd>
									<p>
										Frequency: <span class="bold" id="view_drugFreq">A.M. (morning)</span> <br>
										No. of Days: <span class="bold badge badge-success" id="view_drugNumberOfDays"></span> <br>
										Quantity: <span class="bold badge badge-success" id="view_drugQuantity"></span> <br>
										ROA: <span class="bold">ORAL</span> <br>
										Total Price: <span class="bold currency">GHC</span> <span class="bold" id="view_drugTotalPrice"></span>
									</p>
								</dd>
							</dl>
							<hr>

							<!--Instructions -->
							<dl class="item-property">
								<dt>Instructions</dt>
								<dd>
									<p> <span class="bold" id="view_drugInstruction"></span> </p>
								</dd>
							</dl>
							<hr>

							<!--Comments-->
							<dl class="item-property">
								<dt>Comments</dt>
								<dd>
									<p> <span class="bold" id="view_drugComments"></span> </p>
								</dd>
							</dl>
							<hr>



							<!--Repeat -->
							<dl class="item-property">
								<dt>Repeat </dt>
								<dd>
									<p id="repeat_pTag">



									</p>
								</dd>
							</dl>
							<hr>



							<!--Prescriber-->
							<dl class="item-property">
								<dt>Prescriber</dt>
								<dd>
									<p>
										<span class="bold " id="view_drugPrescriber"></span>
									</p>
								</dd>
							</dl>
							<hr>

							<!--Alternate -->
							<!-- <dl class="item-property">
								<dt>Alternate</dt>

								<dd>
									<p>
										Drug: Acetazolamide Injection, 500 mg <br>
										Dosage: 500mg <br>
										Dosage Form: Tablet<br>
										Reason: <br>
										Unit Price : <span>GHC 30</span> <br>
										<span class="btn btn-md btn-success ">Replace Medication</span>


									</p>
								</dd>
							</dl> -->

						</article>
						<!--//details-->

					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<!-- <button id="viewModal_saveBtn_misc" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Save</button> -->


					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Close</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//view requested Prescription @ accordion table modal-->



<!-- view requested infusion @ accordion table modal-->
<div class="modal fade" id="view_infusion_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0 pl-0 ">
				<span class="label label-lg  text-uppercase mt-3" style="background-color: #6c5ce7;"><b>View Requested Infusion </b>
				</span>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">

							<div class="row pl-3">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">

										</dd>
									</dl>
								</div>

							</div>
							<hr>





							<!--Drug name -->
							<dl class="item-property">
								<dt>Drug Information</dt>

								<dd>
									<p>
										Name: <span class="bold" style="color: #6c5ce7;" id="view_inf_drugName"></span> <br>
										Dosage: <span class="bold " style="color: #6c5ce7;" id="view__inf_drugDose"></span> <br>
										Dosage Form: <span class="bold " style="color: #6c5ce7;" id="view_inf_drugForm"></span> <br>
										Batch #: <span class="bold " style="color: #6c5ce7;" id="view_inf_drugBatchNumber"></span> <br>
										Stock Qty: <span class="bold " style="color: #6c5ce7;" id="view_inf_drugStockQty"></span> <br>
										Expiry Date: <span class="bold " style="color: #6c5ce7;" id="view_inf_drugExpDate"></span> <br>
										Unit Price : <span class="bold currency">GHC</span> <span class="bold" id="view_inf_drugUnitPrice"></span>

									</p>
								</dd>
							</dl>
							<hr>


							<!--Order information -->
							<dl class="item-property">
								<dt>Order Information</dt>

								<dd>
									<p>
										Frequency: <span class="bold" id="view_inf_drugFreq">A.M. (morning)</span> <br>
										No. of Days: <span class="bold badge badge-success" id="view_inf_drugNumberOfDays"></span> <br>
										Quantity: <span class="bold badge badge-success" id="view_inf_drugQuantity"></span> <br>
										ROA: <span class="bold">ORAL</span> <br>
										Total Price: <span class="bold currency">GHC</span> <span class="bold" id="view_inf_drugTotalPrice"></span>
									</p>
								</dd>
							</dl>
							<hr>


							<!--Comments-->
							<dl class="item-property">
								<dt>Comments</dt>
								<dd>
									<p> <span class="bold" id="view_inf_drugComments"></span> </p>
								</dd>
							</dl>
							<hr>



							<!--Repeat -->
							<dl class="item-property">
								<dt>Repeat </dt>
								<dd>
									<p id="repeat_inf_pTag">



									</p>
								</dd>
							</dl>
							<hr>



							<!--Prescriber-->
							<dl class="item-property">
								<dt>Prescriber</dt>
								<dd>
									<p>
										<span class="bold " id="view_inf_drugPrescriber"></span>
									</p>
								</dd>
							</dl>
							<hr>

							<!--Alternate -->
							<!-- <dl class="item-property">
								<dt>Alternate</dt>

								<dd>
									<p>
										Drug: Acetazolamide Injection, 500 mg <br>
										Dosage: 500mg <br>
										Dosage Form: Tablet<br>
										Reason: <br>
										Unit Price : <span>GHC 30</span> <br>
										<span class="btn btn-md btn-success ">Replace Medication</span>


									</p>
								</dd>
							</dl> -->

						</article>
						<!--//details-->

					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<!-- <button id="viewModal_saveBtn_misc" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Save</button> -->


					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Close</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//view requested infusion @ accordion table modal-->


<!-- view requested Sample collection @ accordion table modal-->
<div class="modal fade" id="view_sample_collection_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header border-bottom-0 pl-0 ">
				<div class="d-flex flex-column">

					<h4 class="pl-4 modal-title">Theurapeutic Monitoring</h4>
					<span class="label label-lg  text-uppercase mt-3" style="background: #a5b1c2;"><b>View Requested Sample Collection </b>
					</span>
				</div>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span style="color: #a5b1c2;" aria-hidden="true">&times;</span>
				</button>
			</div>

			<div>




			</div>
			<form>
				<div class="modal-body">
					<div class="row">

						<!--Details-->
						<article class="card-body pt-5 pl-5 pr-5 pb-0">

							<div class="row pl-3">
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
												Folder No: <span class="bold text-success"><!-- php: = $patient->folder_number --></span>

											</p>

										</dd>
									</dl>
								</div>

								<!--Allergy-->
								<div>
									<dl class="item-property">
										<dt>Allergy</dt>

										<dd class="allergy-small-card">


										</dd>
									</dl>
								</div>

							</div>
							<hr>





							<!--Drug name -->
							<dl class="item-property">
								<dt>Drug Information</dt>

								<dd>
									<p>
										Name: <span class="text-danger bold" id="view_drugName_view_modal"></span> <br>
										Dosage: <span class="bold text-danger" id="view_drugDose_view_modal"></span> <br>
										Dosage Form: <span class="bold text-danger" id="view_drugForm_view_modal"></span> <br>
										Batch #: <span class="bold text-danger" id="view_drugBatchNumber_view_modal"></span> <br>
										Stock Qty: <span class="bold text-danger" id="view_drugStockQty_view_modal"></span> <br>
										Expiry Date: <span class="bold text-danger" id="view_drugExpDate_view_modal"></span> <br>
										Unit Price : <span class="bold currency">GHC</span> <span class="bold" id="view_drugUnitPrice_view_modal"></span>

									</p>
								</dd>
							</dl>
							<hr>


							<!--Order information -->
							<!-- <dl class="item-property">
								<dt>Order Information</dt>

								<dd>
									<p>
										Frequency: <span class="bold" id="view_drugFreq_sample_collection">A.M. (morning)</span> <br>
										No. of Days: <span class="bold badge badge-success" id="view_drugNumberOfDays_sample"></span> <br>
										Quantity: <span class="bold badge badge-success" id="view_drugQuantity"></span> <br>
										ROA: <span class="bold">ORAL</span> <br>
										Total Price: <span class="bold currency">GHC</span> <span class="bold" id="view_drugTotalPrice"></span>
									</p>
								</dd>
							</dl>
							<hr> -->


							<!--Request Details-->
							<dl class="item-property">
								<dt>Request Details</dt>
								<dd>
									<p>
										Request Date: <span id="req_collection_date_view_modal"></span> <br>
										Requester: <span id="req_collection_user_name_view_modal"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role_view_modal"></span> <br>
										<!-- Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span> -->


									</p>
								</dd>
							</dl>
							<hr>

							
							<!--specimen source-->
							<dl class="item-property">
								<dt>Specimen Source</dt>
								<dd>
									<p><span id="specimen_source_view_modal"></span></p>
								</dd>
							</dl>
							<!--//specimen source -->

							<hr>


							<!--Priority-->
							<dl class="item-property">
								<dt>Priority</dt>
								<dd>
									<p id="collection_priority_view_modal"></p>
								</dd>
							</dl>

							<hr>
							

							<!--Frequency-->
							<dl class="item-property">
								<dt>Frequency (mins)</dt>
								<dd>
								<p><span id="collection_frequency_view_modal"></span></p>
								</dd>
							</dl>

							<hr>


							<dl class="item-property">
								<dt>Collection Tracker</dt>
								<dd>
									<p>
									<ul style="text-decoration: none;" id="sample_information_tracker">

									</ul>
									</p>
								</dd>
							</dl>

							<hr>
							

							<!--Alternate -->
							<!-- <dl class="item-property">
								<dt>Alternate</dt>

								<dd>
									<p>
										Drug: Acetazolamide Injection, 500 mg <br>
										Dosage: 500mg <br>
										Dosage Form: Tablet<br>
										Reason: <br>
										Unit Price : <span>GHC 30</span> <br>
										<span class="btn btn-md btn-success ">Replace Medication</span>


									</p>
								</dd>
							</dl> -->

						</article>
						<!--//details-->

					</div> <!-- row.// -->



					<hr>


				</div> <!-- row.// -->
				<div class="modal-footer border-top-0 d-flex justify-content-center">
					<!-- <button id="viewModal_saveBtn_misc" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
						Save</button> -->


					<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
						Close</button>
				</div>
			</form>
		</div>

	</div>
</div>
<!--//view requested smaple collection @ accordion table modal-->



<!--//Modals-->


<script>
	$(document).ready(function() {

		/**---------------GLOBAL  ------------- */

		//Date, time initalization
		//set reminders section
		mobiscroll.datepicker('.set_reminder', {
			controls: ['timegrid'],
			timeFormat: 'h:mm A',
			touchUi: true,
			min: '10:30',
			max: '11:00'
		});


		//set date sections
		mobiscroll.datepicker('.set_date', {
			controls: ['calendar'],
			touchUi: true,
			min: moment(new Date()).format("yyyy-mm-dd"),
			returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

		});



		//set date time sections 
		mobiscroll.datepicker('.set_dateTime', {
			controls: ['calendar', 'time'],
			touchUi: true,
			min: moment(new Date()).format("yyyy-mm-dd HH:mm")

		});

		/**
		 * Add New Note Accordion onclick
		 * Add Card attribute to Accordion on Onclick
		 * To Display border-color
		 */
		$(".accordionDiv .accordion-header").on('click', function(e) {
			// console.log('accordion clicked')
			//remove card class from all other accordion divs
			$(this).parent('.accordionDiv').siblings('.accordionDiv').removeClass('card')

			//check if card not already appended
			if (!$(this).parent('.accordionDiv').hasClass('card')) {
				//Append card to class
				$(this).parent('.accordionDiv').addClass("card")


			} else {
				//remove card class
				$(this).parent('.accordionDiv').removeClass('card')




			}

		})
		//GET patient visit id 
		//function getPatientVisitId

		/**
		 * Get Patient vist id from url 
		 */
		// const url = window.location.href;
		// const patient_visit_id = url.substring(url.lastIndexOf('/') + 1);
		//const patient_visit_id 
		//

		/**
		 * Reset Modal when hidden 
		 */
		$('.modal').on('hidden.bs.modal', function(e) {
			$(this).removeData();

			//uncheck override box 
			$("#overrideCheckBox").prop('checked', false);

			//Manually reset modal below
		});


		/**
		 * Medication task click modal
		 * on Status change 
		 * Show the Reason section to input reason
		 */
		// let reasonSectionDisplayed =!$("#reason_section").hasClass('d-none')
		// $('#statusSelect').change(function(){
		// 	//GEt value 
		// 	const val = $(this).val();

		// 	//check 
		// 	if(val==2){

		// 		//event paused and requires reason 
		// 		//display reason section
		// 		$('#reason_section').removeClass('d-none');

		// 	}
		// })

		/**
		 * Append Value to Text Function  
		 */



		/**-----------TRIGGERS-------------- */

		/**
		 * MAR Filter On change Function
		 * Pass Filter function on change of radio check 
		 */
		$('input[type=radio][name=mar_filter]').on('change', function() {
			// switch ($(this).val()) {
			// 	case '1':
			// 		console.log('All Filter clicked');
			// 		break;
			// 	case '2':
			// 		console.log('Scheduled Filter Clicked');
			// 		break;
			// }

			setupMAR();
		});


		/**
		 * On task type change
		 * check if others is selected
		 */

		let isTaskTitleDisplayed = false;
		$('#taskTypeSelect').on('change', function() {

			//get selected value 
			const value = $(this).find(':selected').val();
			// console.log("select value:" + value);
			//check if other is selected. 'others' value ==0
			if (value == 0) {
				//others selected
				//display task title 
				$('#taskTitleContainer').removeClass('d-none');
				isTaskTitleDisplayed = true;

			} else {
				if (isTaskTitleDisplayed == true) {
					//add d-none
					$('#taskTitleContainer').addClass('d-none');
					isTaskTitleDisplayed = false;
				}
			}
		})


		/**
		 * Regular section is clicked in frequency dropdown
		 * show start date and time section
		 */
		//let isOverrideChecked = $('#overrideCheckBox').is(':checked');
		$('#taskFrequencySelect').change(function() {
			if ($(this).find(':selected').val() > 5) {

				//hide start date contianer
				//add d-none if d-none does not already exisit
				if (!$('#sd_container').hasClass()) {
					$('#sd_container').addClass('d-none');
				}

				//show start date time section 
				$('#sdt_container').removeClass('d-none');



			} else {
				//hide start date time section
				if (!$('#sdt_container').hasClass()) {
					$('#sdt_container').addClass('d-none');
				}

				//show start date section
				$('#sd_container').removeClass('d-none');

			}
		})


		/**
		 * Miscellaneous Taks
		 * Onclick shows miscellaneous task modal
		 */
		$("#addTask").off().on('click', function() {

			//Show modal 
			$('#miscellaneousModal').modal('show')

			//save button 
			$('#saveMiscTask').off().on('click', function() {

				//GET parameters 
				//event title 
				let title
				if (isTaskTitleDisplayed == true) {
					//get title from task title 
					title = $('#addTaskTitle').val()

				} else {
					//get title from task type
					title = $('#taskTypeSelect').find(':selected').text();

				}

				//start date time 
				//use moment to convert dateTime to MYSQL standard date format
				const start = moment($('#start_miscTask').val()).format("YYYY-MM-DD HH:mm:ss");




				//end date time 
				const end = moment($('#endDateTime_miscTask').val()).format("YYYY-MM-DD HH:mm:ss");


				//task description 
				const desc = $('#miscTaskDesc').val()

				//set reminder 
				let setReminder;

				let theReminder;
				if ($("#reminder_miscTask").val() != '') {
					theReminder = moment($('#reminder_miscTask').val()).format("YYYY-MM-DD HH:mm:ss");
					setReminder = 1
				} else {
					setReminder = 0
				}



				//create body 
				const body = {
					"title": title,
					"start": start,
					"end": end,
					"task_desc": desc,
					"is_reminder_set": setReminder,
					'reminder': theReminder,

				}

				// console.log(body)


				//ajax
				$.ajax({
					type: "POST",
					data: body,
					url: "<!-- php: = $this->Url->build(['controller' => 'patientVisitMiscellaneousTasks', 'action' => 'add', $patient_id, $patient_visit_id]) -->"
				}).done((data) => {
					if (data.status == 200) {
						alertify.success(data.message)
					} else {
						alertify.error("An error Occured")
					}
					passMiscellaneous()
				}).fail((data) => {
					alertify.error("An error Occured")
				})

			})
		})
	})
</script>

<script>
	/********GLOBAL***********/
	/**
	 * Append Value to Text Function  
	 */
	function submitMed() {		
		let med_status = ''
		let report_med = $('#report_reaction_med').val()
		let additional_info = $('#viewModal_info_med').val()
		let task_id = $('#viewModal_med_id').html()

		if (!task_id) {
			return
		}

		$.each($("input[name='med_status']:checked"), function(){
			med_status = $(this).val()
		});

		let task_update_data = [
			{name: 'med_status', value: med_status},
			{name: 'report_reaction', value: report_med},
			{name: 'additional_info', value: additional_info},
		]
	
		$.ajax({
			type: "POST",
			data: task_update_data,
			url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitPrescriptionTasks', 'action' => 'updateTask']) -->/\${task_id}\`
		}).done((data, textstatus, xhr) => {

			if(data.message) {
				alertify.success("Update Successful")
				setupMAR()
			} else {
				
				alertify.error(data.data)
			}
		}).fail((data) => {
			alertify.error("An error Occurred")
		})

		$('#med_taskClickModal').modal('toggle')
	}
	
	function resetInfusionAdministration(params) {
		$("#stop_all").prop('checked', false);
		$("#inf_status_start").prop('checked', false);
		$("#inf_status_end").prop('checked', false);
	}
	function resetTransfusionAdministration(params) {
		$("#stop_all").prop('checked', false);
		$("#trans_status_start").prop('checked', false);
		$("#trans_status_end").prop('checked', false);
	}
	
	function stopInfusion() {		
		let med_status = ''
		let task_id = $('#viewModal_inf_id').html()

		if($("#is_started_inf").val() == 'true') {
			med_status = $("#inf_status_start").prop('checked')
		} else {
			med_status = $("#inf_status_end").prop('checked')
		}

		// let task_update_data = [
		// 	{name: 'volume', value: $('#administer_volume_inf').val()},
		// 	{name: 'rate', value: $('#administer_rate_volume_inf').val()},
		// 	{name: 'waste', value: $('#administer_waste_volume_inf').val()},
		// 	{name: 'med_status', value: med_status},
		// 	{name: 'report_reaction', value: report_med},
		// 	{name: 'additional_info', value: additional_info},
		// ]
	
		$.ajax({
			type: "POST",
			// data: task_update_data,
			url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitInfusionTasks', 'action' => 'updateTaskStop']) -->/\${task_id}\`
		}).done((data, textstatus, xhr) => {

			if(data.message) {
				alertify.success("Update Successful")
				resetInfusionAdministration()
				setupMAR()
			}
		}).fail((data) => {
			alertify.error("An error Occurred")
		})

		$('#med_taskClickModal_inf').modal('toggle')
	}

	function stopTransfusion() {		
		let med_status = ''
		let task_id = $('#viewModal_trans_id').html()

		if($("#is_started_trans").val() == 'true') {
			med_status = $("#trans_status_start").prop('checked')
		} else {
			med_status = $("#trans_status_end").prop('checked')
		}

		// let task_update_data = [
		// 	{name: 'volume', value: $('#administer_volume_inf').val()},
		// 	{name: 'rate', value: $('#administer_rate_volume_inf').val()},
		// 	{name: 'waste', value: $('#administer_waste_volume_inf').val()},
		// 	{name: 'med_status', value: med_status},
		// 	{name: 'report_reaction', value: report_med},
		// 	{name: 'additional_info', value: additional_info},
		// ]
	
		$.ajax({
			type: "POST",
			// data: task_update_data,
			url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitTransfusionTasks', 'action' => 'updateTaskStop']) -->/\${task_id}\`
		}).done((data, textstatus, xhr) => {

			if(data.message) {
				alertify.success("Update Successful")
				resetTransfusionAdministration()
				setupMAR()
			}
		}).fail((data) => {
			alertify.error("An error Occurred")
		})

		$('#med_taskClickModal_trans').modal('toggle')
	}
	function submitInfusion() {		
		let med_status = ''
		let report_med = $('#report_reaction_inf').val()
		let additional_info = $('#viewModal_info_inf').val()
		let task_id = $('#viewModal_inf_id').html()



		ele = document.getElementsByName('state_changes')
		ele_filter = Array.from(ele).filter(x => x.checked)
		if (ele_filter.length > 0) {
			med_status = ele_filter[0].value
			if (med_status == 3) {
				stopInfusion()
				return
			}
		}

		if($("#is_started_inf").val() != 'true') {
			med_status = $("#inf_status_start").prop('checked')
			if (!med_status) {
				alertify.error("Toggle Switch to start bag")
				return
			}
		} else {
			med_status = $("#inf_status_end").prop('checked')
			if (!med_status) {
				alertify.error("Toggle Switch to end bag")
				return
			}
			if (true) {
				if(
					$('#administer_volume_inf').val() == '' ||
					$('#administer_rate_volume_inf').val() == '' ||
					$('#administer_waste_volume_inf').val() == ''
				) {
					$('#administer_volume_inf').val() == '' ? alertify.error("Volume Field cannot be blank") : '';
					$('#administer_rate_volume_inf').val() == '' ? alertify.error("Rate Field cannot be blank") : '';
					$('#administer_waste_volume_inf').val() == '' ? alertify.error("Waste Volume Field cannot be blank") : '';
					return
				}
			}
		}

		let task_update_data = [
			{name: 'volume', value: $('#administer_volume_inf').val()},
			{name: 'rate', value: $('#administer_rate_volume_inf').val()},
			{name: 'waste', value: $('#administer_waste_volume_inf').val()},
			{name: 'med_status', value: med_status},
			{name: 'report_reaction', value: report_med},
			{name: 'additional_info', value: additional_info},
		]
	
		$.ajax({
			type: "POST",
			data: task_update_data,
			url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitInfusionTasks', 'action' => 'updateTask']) -->/\${task_id}\`
		}).done((data, textstatus, xhr) => {

			if(data.message) {
				resetInfusionAdministration()
				alertify.success("Update Successful")
				setupMAR()
			}
		}).fail((data) => {
			alertify.error("An error Occurred")
		})

		$('#med_taskClickModal_inf').modal('toggle')
	}
	function submitTransfusion() {		
		let med_status = ''
		let report_med = $('#report_reaction_trans').val()
		let additional_info = $('#viewModal_info_trans').val()
		let task_id = $('#viewModal_trans_id').html()



		ele = document.getElementsByName('trans_state_changes')
		ele_filter = Array.from(ele).filter(x => x.checked)
		if (ele_filter.length > 0) {
			med_status = ele_filter[0].value
			if (med_status == 3) {
				stopTransfusion()
				return
			}
		}

		if($("#is_started_trans").val() != 'true') {
			med_status = $("#trans_status_start").prop('checked')
			if (!med_status) {
				alertify.error("Toggle Switch to Start bag")
				return
			}
		} else {
			console.log("it atte")
			med_status = $("#trans_status_end").prop('checked')
			if (!med_status) {
				alertify.error("Toggle Switch to end bag")
				return
			}
			if (true) {
				if(
					$('#administer_volume_trans').val() == '' ||
					$('#administer_rate_volume_trans').val() == '' ||
					$('#administer_waste_volume_trans').val() == ''
				) {
					$('#administer_volume_trans').val() == '' ? alertify.error("Volume Field cannot be blank") : '';
					$('#administer_rate_volume_trans').val() == '' ? alertify.error("Rate Field cannot be blank") : '';
					$('#administer_waste_volume_trans').val() == '' ? alertify.error("Waste Volume Field cannot be blank") : '';
					return
				}
			}
		}

		let task_update_data = [
			{name: 'volume', value: $('#administer_volume_trans').val()},
			{name: 'rate', value: $('#administer_rate_volume_trans').val()},
			{name: 'waste', value: $('#administer_waste_volume_trans').val()},
			{name: 'med_status', value: med_status},
			{name: 'report_reaction', value: report_med},
			{name: 'additional_info', value: additional_info},
		]
	
		$.ajax({
			type: "POST",
			data: task_update_data,
			url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitTransfusionTasks', 'action' => 'updateTask']) -->/\${task_id}\`
		}).done((data, textstatus, xhr) => {

			if(data.message) {
				// resetTransfusionAdministration()
				alertify.success("Update Successful")
				setupMAR()
			} else {
				
				alertify.error("Data could not be saved")
			}
		}).fail((data) => {
			alertify.error("An error Occurred")
		})

		$('#med_taskClickModal_trans').modal('toggle')
	}

	function appendDetails(v1, v2) {
		//Append 
		$(\`#\${v1}\`).text(v2);
	}

	function appendDetailsId(v1, v2) {
		//Append
		let id = v2.id
		$(\`#\${v1}\`).text(id);
	}

	//Get dot color function for parent resource 
	function getParentDot(resource) {
		if (resource.id == 'pres-calendar-menu') {
			return 'red-dot'
		} else if (resource.id == 'infusion-calendar-menu') {
			return 'deep-blue-dot'
		} else if (resource.id == 'transfusion-calendar-menu') {
			return 'grey-dot'
		} else if (resource.id == 'immunization-calendar-menu') {
			return 'purple-dot'
		} else if (resource.id == 'misc-calendar-menu') {
			return 'light-blue-dot'
		} else if (resource.id == 'prn-calendar-menu') {
			return 'pink-dot'

		} else if (resource.id == 'nutr-calendar-menu') {
			return 'yellow-dot'
		} else if (resource.id == 'lab-calendar-menu') {
			return 'gray-dot'
		} else if (resource.id == 'sug-calendar-menu') {
			return 'brown-dot'
		}
	}

	//Get dot color function for child resource
	function getChildDot(resource) {


		switch (resource.parent) {
			case 'prescription':
				return 'red-dot-sm'
				break;
			case 'miscellaneou':
				return 'light-blue-dot-sm'
				break;
			case 'infusion':
				return 'deep-blue-dot-sm'
				break;
			case 'transfusion':
				return 'grey-dot-sm'
				break;
			case 'prn':
				return 'pink-dot-sm'
				break;
			case 'nutrition':
				return 'yellow-dot-sm'
				break;
			case 'sample-collections':
				return 'gray-dot-sm'
		}
	}


	//Get dot colot function for filter resource 
	function getFilterDot(resource) {
		// console.log('Resource at Filter Dot');
		// console.log(resource);
		if (resource.parent == 'prescription') {
			if (resource.has_started == 1) {
				return 'scheduled-dot'
			} else {
				return 'unscheduled-dot'
			}

		} else if (resource.parent == 'infusion') {

			// console.log('check resource has started value');
			// console.log(resource.has_started);

			if (resource.has_started == 1) {
				return 'scheduled-dot'
			} else {
				return 'unscheduled-dot'
			}
		}
	}

	//Functions 
	function setupMAR() {

		//GET Calendar Resources (Request Meds, Sample Collection,service and miscellaneous )
		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'setMAR']) -->/<!-- php: = $patient_visit_id -->/\${$('input[name="mar_filter"]:checked').val()}\`
		}).done((data) => {
			//Logs

			const array = jQuery.parseJSON(data);
			// console.log(array)

			//check if data exisit 
			if (array != null && array.length != 0) {

				//MobiScroll Initialization
				mobiscroll.setOptions({
					theme: 'ios',
					themeVariant: 'light'
				});

				var calendar,
					// range,
					oldEvent,
					tempEvent = {},
					deleteEvent,
					restoreEvent,
					titleInput = document.getElementById('work-order-title'),
					locationInput = document.getElementById('work-order-location'),
					notesTextarea = document.getElementById('work-order-notes'),
					deleteButton = document.getElementById('work-order-delete'),
					resourceCont = document.getElementById('work-order-resources');

				var myData = array['events'];


				var myResources = [{
						id: 'pres-calendar-menu',
						name: 'Prescription',
						collapsed: false,
						children: array['medication_resource']
					},
					{
						id: 'prn-calendar-menu',
						name: 'PRN',
						collapsed: false,
						children: array['prn_resource']
					},
					{
						id: 'infusion-calendar-menu',
						name: 'Infusion',
						collapsed: false,
						children: array['infusion_resource']
					}, {
						id: 'transfusion-calendar-menu',
						name: 'Transfusion',
						collapsed: true,
						children: array['transfusion_resource']
					},
					// {
					// 	id: 'immunization-calendar-menu',
					// 	name: 'Immunization',
					// 	collapsed: true,
					// 	children: [{
					// 		id: 'immun-1',
					// 		name: 'Immunization Test 1',
					// 		parent: 'immunizations'
					// 	}]
					// },
					{
						id: 'misc-calendar-menu',
						name: 'Miscellenaeous',
						collapsed: false,
						children: array['miscellaneous_resource']
					},
					{
						id: 'nutr-calendar-menu',
						name: 'Nutritions',
						collapsed: true,
						children: [{
							id: 'nutr-1',
							name: 'Nutritions Test 1',
							parent: 'nutritions'
						}]
					},

					{
						id: 'lab-calendar-menu',
						name: 'Sample Collection',
						collapsed: true,
						children: array['sample_collection_resource']
					},




				];




				calendar = mobiscroll.eventcalendar('#demo-work-order-scheduling', {
					clickToCreate: false,
					dragToCreate: false,
					dragToMove: false,
					dragToResize: false,
					dragTimeStep: 30,
					view: {
						timeline: {
							type: 'week',
							startDay: 1,
							endDay: 7
						}
					},
					data: myData,
					resources: myResources,

					renderHeader: function() {
						return '<div  mbsc-calendar-nav class=" md-work-week-nav"></div>' +
							'<div class="md-work-week-picker">' +
							'<label>Day<input mbsc-segmented type="radio" name="view" value="day" class="md-view-change"></label>' +
							'<label>Week<input mbsc-segmented type="radio" name="view" value="week" class="md-view-change"  checked></label>' +
							'<label>Month<input mbsc-segmented type="radio" name="view" value="month" class="md-view-change"></label>' +
							'</div>' +
							'<div class="d-flex"><div mbsc-calendar-prev class="md-work-week-prev"></div>' +
							'<div mbsc-calendar-today class="md-work-week-today"></div>' +
							'<div mbsc-calendar-next class="md-work-week-next"></div></div>';
					},

					renderResource: function(resource) {
						// return '<div class="md-meeting-participant-cont">' +
						//     '<div class="md-meeting-participant-name">' + resource.name + '</div>' +
						//     '<span class="md-meeting-participant-offset">' + resource.id + '</span></div>' +
						//     '<img class="md-meeting-participant-avatar" src="' + (resource.img != undefined ? resource.img : '') + '"/>' +
						//     '</div>';

						return \`<div class="md-meeting-participant-cont row " >
							<div col-md-2 >
							<span class=\${getParentDot(resource)}></span>
							<span class=\${getChildDot(resource)}></span>
							<div class=\${getFilterDot(resource)}></div>
							</div>
							<div class="col-md-10 ">
							<div>\${resource.name}</div>
							</div>
							</div>
						\`
					},
					extendDefaultEvent: function() {
						return {
							title: 'Work order',
							location: ''
						};
					},
					onEventClick: function(args) {
						oldEvent = {
							...args.event
						};
						tempEvent = args.event;

						// if (!popup.isVisible()) {
						// 	createEditPopup(args);
						// }
						// console.log(args);

						//check category of event
						//show modal revelant to the event clicked

						if (args.event.parent == 'miscellaneous') {
							//show misc modal
							$('#misc_taskClickModal').modal('toggle');

							//Title 
							appendDetails('viewModal_title_misc', args.event.title);

							//Period 
							appendDetails('viewModal_period_misc', \`\${moment(new Date(args.event.start)).format("DD MMM YYYY, hh:mm A")} - \${moment(new Date(args.event.end)).format("DD MMM YYYY, hh:mm A")}\`)

							//Desc 
							appendDetails('viewModal_desc_misc', args.event.description);

							//Add data id attribute to save button
							$('#viewModal_save').attr('data-id', args.event.resource);

						} else if (args.event.parent == 'prescription') {
							//show med Modal 
							if(args.event.state != 3 && args.event.state != 1) {
								$('#med_taskClickModal').modal('toggle');
							}

							//title
							appendDetails('viewModal_title_med', args.event.title)
							appendDetailsId('viewModal_med_id', args.event)
							appendDetails('set_task_count', args.event.task_number)
							$('#viewModal_period_med').html(moment(args.event.start).format("DD MMM YYYY, hh:mm A") + " to " + moment(args.event.end).format("DD MMM YYYY, hh:mm A"))
							$('#viewModal_administer_dose_med').html(args.event.administer_dose)


							if (args.event.hold_vitals) {
								$("#hold_vitals_pres").show()
								$("#heart_rate_pres").html(args.event.vitals.heart_rate)
								$("#sys_dys_pres").html(args.event.vitals.systolic + " " + args.event.vitals.diastolic)
								$("#res_rate_pres").html(args.event.vitals.respiratory_rate)
								$("#pulse_pres").html(args.event.vitals.pulse)
							}else {
								$("#hold_vitals_pres").hide()
							}
						} else if (args.event.parent == 'sample_collection') {
							//show med Modal 
							if(args.event.state != 3 && args.event.state != 1) {
								console.log()
								if (args.event.resource.toLowerCase().includes('peak')) {
									recordSampleCollectionPeakLevel(args.event.resource.split('-peak')[1],1,args.event.med_type, args.event.id)
								} else {
									recordSampleCollectionTroughLevel(args.event.resource.split('-trough')[1],0,args.event.med_type, args.event.id)

								}
							}

						} else if (args.event.parent == 'infusion') {
							//show med Modal 
							if(args.event.state != 3) {
								$('#med_taskClickModal_inf').modal('toggle');
							}

							//title
							appendDetails('viewModal_title_inf', args.event.title)
							appendDetails('set_bag_count', args.event.bag_number)
							appendDetails('viewModal_inf_id', args.event.id)
							// appendDetailsId('viewModal_med_id', args.event)
							$('#viewModal_period_inf').html(moment(args.event.start).format("DD MMM YYYY, hh:mm A") + " to " + moment(args.event.end).format("DD MMM YYYY, hh:mm A"))
							$('#admin_duration_inf').html(moment(args.event.end).diff(moment(args.event.start), 'hours'))
							$('#admin_roa_inf').html(args.event.roa)
							$('#admin_site_location_inf').html(args.event.site_location)
							$('#admin_site_method_inf').html(args.event.site_method)
							$('#admin_frequency_inf').html(args.event.administer_infusion)

							if (args.event.hold_vitals) {
								$("#hold_vitals_inf").show()
								$("#heart_rate_inf").html(args.event.vitals.heart_rate)
								$("#sys_dys_inf").html(args.event.vitals.systolic + " " + args.event.vitals.diastolic)
								$("#res_rate_inf").html(args.event.vitals.respiratory_rate)
								$("#pulse_inf").html(args.event.vitals.pulse)
							}else {
								$("#hold_vitals_inf").hide()
							}

							if (args.event.is_completed == '1') {
								$('#administer_inf_end').hide()
								$('#end_note_section').hide()
								$('#administer_inf_start').hide()
								$('#is_started_inf').val('')
								
							} else {
								if(args.event.is_started) {
									$('#administer_inf_end').show()
									$('#end_note_section').show()
									$('#administer_inf_start').hide()
									$('#is_started_inf').val('true')
								} else {
									$('#is_started_inf').val('false')
									$('#administer_inf_start').show()
									$('#administer_inf_end').hide()
									$('#end_note_section').hide()
								}
							}

						} else if (args.event.parent == 'transfusion') {
							//show med Modal 
							if(args.event.state != 3) {
								$('#med_taskClickModal_trans').modal('toggle');
							}

							//title
							appendDetails('viewModal_title_trans', args.event.title)
							// appendDetails('set_bag_count', args.event.bag_number)
							appendDetails('viewModal_trans_id', args.event.id)
							// appendDetailsId('viewModal_med_id', args.event)
							$('#viewModal_period_trans').html(moment(args.event.start).format("DD MMM YYYY, hh:mm A") + " to " + moment(args.event.end).format("DD MMM YYYY, hh:mm A"))
							// $('#admin_duration_inf').html(moment(args.event.end).diff(moment(args.event.start), 'hours'))
							$('#admin_roa_trans').html(args.event.roa)
							$('#admin_site_location_trans').html(args.event.site_location)
							$('#admin_site_method_trans').html(args.event.site_method)
							$('#admin_frequency_trans').html(args.event.administer_transfusion)

							if (args.event.hold_vitals) {
								$("#hold_vitals_trans").show()
								$("#heart_rate_trans").html(args.event.vitals.heart_rate)
								$("#sys_dys_trans").html(args.event.vitals.systolic + " " + args.event.vitals.diastolic)
								$("#res_rate_trans").html(args.event.vitals.respiratory_rate)
								$("#pulse_trans").html(args.event.vitals.pulse)
							}else {
								$("#hold_vitals_inf").hide()
							}

							if (args.event.is_completed) {
								$('#administer_trans_end').hide()
								$('#end_note_section_trans').hide()
								$('#administer_trans_start').hide()
								$('#is_started_trans').val('')
								
							} else {
								if(args.event.is_started) {
									$('#administer_trans_end').show()
									$('#end_note_section_trans').show()
									$('#administer_trans_start').hide()
									$('#is_started_trans').val('true')
								} else {
									$('#is_started_trans').val('false')
									$('#administer_trans_start').show()
									$('#administer_trans_end').hide()
									$('#end_note_section_trans').hide()
								}
							}

						}

					},
					// onEventCreated: function(args) {
					// 	popup.close();
					// 	// store temporary event
					// 	tempEvent = args.event;
					// 	createAddPopup(args.target);
					// },
					onEventDeleted: function(args) {
						mobiscroll.snackbar({
							button: {
								action: function() {
									calendar.addEvent(args.event);
								},
								text: 'Undo'
							},
							message: 'Event deleted'
						});
					}
				});



				// titleInput.addEventListener('input', function(ev) {
				// 	// update current event's title
				// 	tempEvent.title = ev.target.value;
				// });

				// locationInput.addEventListener('input', function(ev) {
				// 	// update current event's title
				// 	tempEvent.location = ev.target.value;
				// });

				// notesTextarea.addEventListener('change', function(ev) {
				// 	// update current event's title
				// 	tempEvent.notes = ev.target.value;
				// });




				// range = mobiscroll.datepicker('#work-order-date', {
				// 	controls: ['time'],
				// 	select: 'range',
				// 	startInput: '#work-order-input',
				// 	endInput: '#work-order-input',
				// 	showRangeLabels: false,
				// 	touchUi: false,
				// 	stepMinute: 30,
				// 	minTime: '06:00',
				// 	maxTime: '22:00',
				// 	onChange: function(args) {
				// 		var date = args.value;
				// 		// update event's start date
				// 		tempEvent.start = date[0];
				// 		tempEvent.end = date[1];
				// 	}
				// });


				document.querySelectorAll('input[name=event-status]').forEach(function(elm) {
					elm.addEventListener('change', function() {
						// update current event's free property
						tempEvent.free = mobiscroll.getInst(freeSegmented).checked;
					});
				});

				document.querySelectorAll('.md-view-change').forEach(function(elm) {
					elm.addEventListener('change', function(ev) {
						switch (ev.target.value) {
							case 'day':
								calendar.setOptions({
									view: {
										timeline: {
											type: 'day',
											endDay: 7
										}
									}
								})
								break;
							case 'week':
								calendar.setOptions({
									view: {
										timeline: {
											type: 'week',
											startDay: 1,
											endDay: 7
										}
									}
								})
								break;
							case 'month':
								calendar.setOptions({
									view: {
										calendar: {
											labels: 'true'
										}
									}
								})
								break;

						}
					});
				});


				// deleteButton.addEventListener('click', function() {
				// 	// delete current event on button click
				// 	calendar.removeEvent(tempEvent);
				// 	//popup.close();

				// 	// save a local reference to the deleted event
				// 	var deletedEvent = tempEvent;

				// 	mobiscroll.snackbar({
				// 		button: {
				// 			action: function() {
				// 				calendar.addEvent(deletedEvent);
				// 			},
				// 			text: 'Undo'
				// 		},
				// 		message: 'Event deleted'
				// 	});
				// });

				function setCheckboxes(resources) {
					var checkboxes = document.getElementsByClassName('work-order-checkbox');

					for (var i = 0; i < checkboxes.length; i++) {
						var checkbox = checkboxes[i];
						mobiscroll.getInst(checkbox).checked = resources.indexOf(checkbox.getAttribute('data-value')) !== -1;
					}
				}

				function appendChekboxes() {
					var checkboxes = '<div class="mbsc-grid mbsc-no-padding"><div class="mbsc-row">';

					for (var i = 0; i < myResources.length; ++i) {
						for (var j = 0; j < myResources[i].children.length; ++j) {
							var resource = myResources[i].children[j];

							checkboxes += '<div class="mbsc-col-sm-4"><div class="mbsc-form-group-title">' + resource.name + '</div>';

							for (var k = 0; k < resource.children.length; ++k) {
								var r = resource.children[k];
								checkboxes += '<label class="work-order-checkbox-label"><input class="work-order-checkbox" data-value="' +
									r.id + '" type="checkbox" mbsc-checkbox data-theme="material" data-label="' + r.name + '"/></label>';

							}
							checkboxes += '</div>';
						}
					}
					checkboxes += '</div></div>';

					resourceCont.innerHTML = checkboxes;
					mobiscroll.enhance(resourceCont);
				}

				//appendChekboxes();
			} else {
				//Init calendar with no children for resource 
			}




		}).fail((data) => {
			//Logs
			// console.log('set calendar fail');
			// console.log(data);
			alertify.error("An error Occured")
		})



	}

	/** 
	 * Click Start to create Event/Task on calendar
	 * Onclick (Start button) For Adding Event to Calendar 
	 * Preforms ajax call to get specific requested prescription
	 */
	function schedulePrescription(id) {
		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getPrescriptionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Prescription @ Start Modal Done');
			// console.log(data);


			//function to set up start modal for prescription accordion
			setupPrescriptionScheduleModal(jQuery.parseJSON(data)[0]);
		}).fail((data) => {
			//logs 
			// console.log('Get Prescription @ Start Modal Failed');
			// console.log(data);
			alertify.error("An error Occured")
		})
	}

	/**
	 * Doses Button for Prescription Table 
	 * Performs Ajax request to get details for the prescription and its doses
	 */
	function viewPrescriptionDoses(id) {
		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getPrescriptionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Prescription @ Doses Modal Done');
			// console.log(data);


			//function to set up Doses modal for prescription accordion
			setupPrescriptionDoseModal(jQuery.parseJSON(data)[0]);
		}).fail((data) => {
			//logs 
			// console.log('Get Prescription @ Doses Modal Failed');
			// console.log(data);
		})

	}

	function viewInfusionDoses(id) {
		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getInfusionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Prescription @ Doses Modal Done');
			// console.log(data);


			//function to set up Doses modal for prescription accordion
			setupInfusionDoseModal(jQuery.parseJSON(data)[0]);
		}).fail((data) => {
			//logs 
			// console.log('Get Prescription @ Doses Modal Failed');
			// console.log(data);
		})

	}

	/**
	 * View Button for Prescription Table 
	 * Performs Ajax call to get Details for Requested Prescription 
	 */
	function viewPrescription(id) {
		// console.log('view Prescription fn working');
		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getPrescriptionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Prescription @ View Modal Done');
			// console.log(data);


			//function to set up View modal for prescription accordion
			setupPrescriptionViewModal(jQuery.parseJSON(data)[0]);
		}).fail((data) => {
			//logs 
			// console.log('Get Prescription @ View Modal Failed');
			// console.log(data);
			alertify.error("An error Occured")
		})
	}

	/**
	 * View Button for Sample Collection Table 
	 * Performs Ajax call to get Details for Requested Sample Collection for both trough and peak levels 
	 */
	function viewSampleCollection(id, collection_type,med_type) {
		//check collection type 
		if (collection_type==0){
			//Get Trough Details 
			//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'troughLevels', 'action' => 'get']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Trough level @ View Modal Done');
			// console.log(data);


			//function to set up View modal for prescription accordion
			setupSampleCollectionViewModal(jQuery.parseJSON(data)[0],0,med_type);
		}).fail((data) => {
			//logs 
			// console.log('Get Trough Level @ View Modal Failed');
			// console.log(data);
			alertify.error("An error Occured")
		})

		}else{

			//Get Peak Details 
			//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'peakLevels', 'action' => 'get']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Peak level @ View Modal Done');
			// console.log(data);


			//function to set up View modal for prescription accordion
			setupSampleCollectionViewModal(jQuery.parseJSON(data)[0],1,med_type);
		}).fail((data) => {
			//logs 
			// console.log('Get Peak Level @ View Modal Failed');
			alertify.error("An error Occured")
			// console.log(data);
		})

		}
		
		
		
	}

	/**
	 * View Button for Infusion Table 
	 * Performs Ajax call to get Details for Requested Infusion 
	 */
	function viewInfusion(id) {
		// console.log('view Infusion  working');
		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getInfusionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Infusions @ View Modal Done');
			// console.log(data);


			//function to set up View modal for prescription accordion
			setupInfusionViewModal(jQuery.parseJSON(data)[0]);
		}).fail((data) => {
			//logs 
			// console.log('Get Infusions @ View Modal Failed');
			// console.log(data);
			alertify.error("An error Occured")
		})
	}

	/** 
	 * Click Begin to schedule or create Event/Task on calendar
	 * Onclick (Begin button) For Adding Event to Calendar 
	 * Preforms ajax call to get specific requested infusion
	 */
	function scheduleInfusion(id) {
		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getInfusionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Infusion @ Schedule Modal Done');
			// console.log(data);


			//function to set up start modal for Infusion accordion
			setupInfusionModal(jQuery.parseJSON(data)[0]);
		}).fail((data) => {
			//logs 
			// console.log('Get Infusion @ Start Modal Failed');
			alertify.error("An error Occured")
			// console.log(data);
		})
	}
	function scheduleTransfusion(id) {
		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getTransfusionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Transfusion @ Schedule Modal Done');
			// console.log(data);


			//function to set up start modal for Infusion accordion
			setupTransfusionModal(jQuery.parseJSON(data)[0]);
		}).fail((data) => {
			//logs 
			// console.log('Get Infusion @ Start Modal Failed');
			alertify.error("An error Occured")
			// console.log(data);
		})
	}

	/**
	 * Record Button for PRN Table
	 * Performs Ajax call to get Details for Requested Prescription 
	 */
	function recordPrescriptionPRN(id) {

		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getPrescriptionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Prescription @ PRN record Modal Done');
			// console.log(data);


			//function to set up View modal for prescription accordion
			setupPrnRecordModal(jQuery.parseJSON(data)[0], 'prescription');
		}).fail((data) => {
			//logs 
			// console.log('Get Prescription @ PRN record Modal Failed');
			alertify.error("An error Occured")
			// console.log(data);
		})

	}

	/**
	 * Record Button for Sample Collection Table
	 * Performs Ajax call to get Details for Sample Collections 
	 */
	function recordSampleCollectionTroughLevel(id,collection_type,med_type,col_id) {

		// console.log('Trough modal clicked collection Type:'+collection_type);
		// console.log('Trough modal clicked med Type:'+med_type);

		//Get Trough Level
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'TroughLevels', 'action' => 'get']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Sample collection Trough level record Modal Done');
			// console.log(data);


			//function to set up View modal for Sample collection accordion
			setupSampleCollectionRecordModal(jQuery.parseJSON(data)[0], collection_type,med_type, col_id);
		}).fail((data) => {
			//logs 
			// console.log('Get Sample collection Trough level record Modal Failed');
			alertify.error("An error Occured")
			// console.log(data);
		})

	}

	/**
	 * Record Button for PRN Table
	 * Performs Ajax call to get Details for Requested Infusions
	 */
	function recordInfusionPRN(id) {

		//Get Prescription 
		//Ajax 
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getInfusionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Infusion @ PRN record Modal Done');
			// console.log(data);


			//function to set up View modal for prescription accordion
			setupPrnRecordModal(jQuery.parseJSON(data)[0], 'infusion');
		}).fail((data) => {
			//logs 
			// console.log('Get Infusion @ PRN record Modal Failed');
			alertify.error("An error Occured")
			// console.log(data);
		})

	}

	function updatePrn(id) {
		let a = ''

		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'requestMedications', 'action' => 'getInfusionById']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Infusion @ PRN record Modal Done');
			// console.log(data);


			//function to set up View modal for prescription accordion
			setupPrnRecordModal(jQuery.parseJSON(data)[0], 'infusion');
		}).fail((data) => {
			//logs 
			// console.log('Get Infusion @ PRN record Modal Failed');
			// console.log(data);
		})
	}

	/**
	 * Function Populates Prescription Schedule Modal with Clicked Requested Prescription
	 * Saves Form to Create Task for Requested Prescription 
	 */
	function setupPrescriptionScheduleModal(prescription) {
		//Show event modal 
		$("#prescriptionModal").modal('show');

		$('#taskFrequencySelect').val(prescription.drug_administration_frequency_id)
		$('#taskFrequencySelect').selectpicker('refresh')
		$('#startDate_prescriptionService').val(moment(prescription.start_date).format('MM/DD/YYYY hh:mm A'))
		if (prescription.drug_administration_frequency_id > 5) {


			$('#startDate_prescriptionService').off().change(() => {
				let count = prescription.patient_visit_prescribed_prescription_tasks.length;
				let add = parseInt(prescription.number_of_days);
				let time = moment($("#startDate_prescriptionService").val());
				let startTime = $("#startDate_prescriptionService").val() != '' ? time : moment(prescription.start_date).startOf('day');
				let result = createTimeEventsMar(count, 24/ (count / add), startTime, 'presc')
				
				$("#suggested_dates_presc").empty()
				$("#suggested_dates_presc").html(result.join(""));

				mobiscroll.datepicker('.mobiTimePicker', {
					controls: ['datetime'],
					// defaultSelection: new Date(2020, 11, 24)
					touchUi: true,
					theme: 'ios',
					themeVariant: 'light',
					dateFormat: 'YYYY-MM-DD',
					returnFormat: 'moment',
				});
			})

			let time = moment($("#startDateTime_prescriptionService").val());

			$('#suggested_date_container_presc').show()
			let count = prescription.patient_visit_prescribed_prescription_tasks.length;
			let add = parseInt(prescription.number_of_days)
			let startTime = time != null ? time : moment(prescription.start_date).startOf('day')
			let result = createMarTimeEvents(prescription.patient_visit_prescribed_prescription_tasks, 'presc')
			$("#suggested_dates_presc").empty()
			$("#suggested_dates_presc").html(result.join(""))

			mobiscroll.datepicker('.mobiTimePicker', {
				controls: ['datetime'],
				// defaultSelection: new Date(2020, 11, 24)
				touchUi: true,
				theme: 'ios',
				themeVariant: 'light',
				dateFormat: 'YYYY-MM-DD',
				returnFormat: 'moment',
			});
		} else {
			$('#suggested_date_container_presc').hide()
		}

		$('#taskFrequencySelect').off().change(() => {
			// console.log("taskFrequencySelect", 'changed')
			let freq_type = parseInt($('#taskFrequencySelect').find(':selected').val());
			if (freq_type > 5) {
				$('#suggested_date_container_presc').show()
				let count;
				let interval;
				switch (freq_type) {
					case 6:
						count = 2;
						interval = 2;
						break;
					case 7:
						count = 3;
						interval = 3;
						break;
					case 8:
						count = 4;
						interval = 4;
						break;
					case 9:
						count = 6;
						interval = 6;
						break;
					case 10:
						count = 8;
						interval = 8;
						break;
					case 11:
						count = 12;
						interval = 12;
						break;
					case 12:
						count = 24;
						interval = 24;
						break;
				
					default:
						break;
				}
				let add = parseInt(prescription.number_of_days);
				let time = moment($("#startDate_prescriptionService").val());
				let startTime = $("#startDate_prescriptionService").val() != '' ? time : moment(prescription.start_date).startOf('day');
				let result = createTimeEventsMar(24/ (count / add), interval, startTime, 'presc')

				$("#suggested_dates_presc").empty()
				$("#suggested_dates_presc").html(result.join(""));

				mobiscroll.datepicker('.mobiTimePicker', {
					controls: ['datetime'],
					// defaultSelection: new Date(2020, 11, 24)
					touchUi: true,
					theme: 'ios',
					themeVariant: 'light',
					dateFormat: 'YYYY-MM-DD',
					returnFormat: 'moment',
				});
			} else {
				$('#suggested_date_container_presc').hide()
			}
			$('#startDate_prescriptionService').off().change(() => {
				let freq_type = parseInt($('#taskFrequencySelect').find(':selected').val());
				if (freq_type > 5) {
					let count;
					let interval;
					switch (freq_type) {
						case 6:
							count = 2;
							interval = 2;
							break;
						case 7:
							count = 3;
							interval = 3;
							break;
						case 8:
							count = 4;
							interval = 4;
							break;
						case 9:
							count = 6;
							interval = 6;
							break;
						case 10:
							count = 8;
							interval = 8;
							break;
						case 11:
							count = 12;
							interval = 12;
							break;
						case 12:
							count = 24;
							interval = 24;
							break;
					
						default:
							break;
					}
					let add = parseInt(prescription.number_of_days);
					let time = moment($("#startDate_prescriptionService").val());
					let startTime = $("#startDate_prescriptionService").val() != '' ? time : moment(prescription.start_date).startOf('day');
					let result = createTimeEventsMar(24/ (count / add), interval, startTime, 'presc')

					$("#suggested_dates_presc").empty()
					$("#suggested_dates_presc").html(result.join(""));

					mobiscroll.datepicker('.mobiTimePicker', {
						controls: ['datetime'],
						// defaultSelection: new Date(2020, 11, 24)
						touchUi: true,
						theme: 'ios',
						themeVariant: 'light',
						dateFormat: 'YYYY-MM-DD',
						returnFormat: 'moment',
					});
				} else {
					$('#suggested_date_container_presc').hide()
				}
			})
		})



		// console.log('Prescription id @ start button modal');
		// console.log(prescription);
		// console.log(prescription.id);

		//constants 

		const prescription_id = prescription.id;
		const numberOfDays = prescription.number_of_days;





		//Append detaisl
		//Req date
		appendDetails('req_date_med_modal', moment(new Date(prescription.date_created)).format("DD MMM YYYY, hh:mm A"));

		//Requester Name
		appendDetails('req_user_name', \`\${prescription.user.first_name} \${prescription.user.last_name}\`);

		//Requester Role
		appendDetails('req_user_role', prescription.user.role.name);



		//drug name 
		appendDetails('rm_drugName', prescription.item_stock.item.full_name);

		if(prescription.peak_levels.length > 0) {
			$("#pres_levels").show()
			// console.log("peak Level Available")
			$('#rm_peak_trough_levels').text("Add Peak Information");
		} else if (prescription.trough_levels.length > 0) {
			$("#pres_levels").show()
			// console.log("Trough Level Available")
			$('#rm_peak_trough_levels').text("Add Trough Information");
		} else {
			$("#pres_levels").hide()

		}

		if(prescription.is_complete && prescription.status_id == 23) {
			// audit = prescription.item_audits
			// audit_last = audit[audit.length - 1]
			$('#perform_bt_user_name_pres').html(\`\${prescription?.drug_issued_by?.first_name} \${prescription?.drug_issued_by?.last_name}\`)
			$('#perform_date_pres_modal').html(moment(prescription.issue_date).format("DD/MM/YY HH:mm:ss"))
		} else {
			$('#perform_bt_user_name_pres').html(\`Not Issued\`)
			
		}

		//number of days 
		appendDetails('rm_days', prescription.number_of_days);

		//drug frequency 
		appendDetails('rm_administer_dose', (prescription.administer_dose));
		appendDetails('rm_frequency', (prescription.drug_administration_frequency_id == -1 ? 'STAT' : prescription.drug_administration_frequency.name));
		appendDetails('rm_frequency_2', (prescription.drug_administration_frequency_id == -1 ? 'STAT' : prescription.drug_administration_frequency.name));
		$('#rm_start_date_2').html(moment(prescription.start_date).format("DD/MM/YY"));
		$('#rm_start_date_3').html(moment(prescription.start_date).format("DD/MM/YY"));

		//instruction 
		appendDetails('rm_instructions', prescription.drug_administration_instruction_info);

		if(prescription.hold_vital_id > 0) {
			$('#rm_hold_vitals').show()
			appendDetails('heart_rate_rm', prescription.hold_vital.heart_rate);
			appendDetails('sys_dys_rm', prescription.hold_vital.systolic + " " + prescription.hold_vital.diastolic);
			appendDetails('res_rate_rm', prescription.hold_vital.respiratory_rate);
			appendDetails('pulse_rm', prescription.hold_vital.pulse);
		} else {
			$('#rm_hold_vitals').hide()
		}

		//Custom event title 
		$('#eventTitle').val(\`Administer \${prescription?.item_stock?.item.full_name} \${prescription?.drug_administration_frequency_id == -1 ? 'STAT' : prescription.drug_administration_frequency.name} for \${prescription?.number_of_days} days\`);






		//Onclick save button

		$("#save_prescriptionService").off().on('click', function() {
			//Get Relevant Data 
			//constants
			const eventTitle = $("#eventTitle").val();
			const desc = $('#taskDec').val();
			const task_duration = $('#taskDurationSelect').find(':selected').val();
			const freq_type = parseInt($('#taskFrequencySelect').find(':selected').val());


			let start_date;
			let end_date;
			let start_time;
			let end_time;
			let eventArray = [];

			//Determine the profile (Frequency Type ) choosen
			//Frequency type would be used to create a profile for drug administration

			if (freq_type == 1) {
				//Morning (8:00am)
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time = '8:00:00'

				const start_date_time = "" + start_date + " " + start_time;
				console.log('start date time:' + start_date_time);

				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);
				end_time = moment.utc(start_time, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');

				const end_date_time = "" + start_date + " " + end_time;


				for (let i = 0; i < numberOfDays; i++) {
					//create event and pass to ebent array 
					const event = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to event array 
					eventArray.push(event);

				}

				console.log(eventArray);


			} else if (freq_type == 2) {
				//Night (8:00pm)
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time = '20:00:00'

				const start_date_time = "" + start_date + " " + start_time;
				console.log('start date time:' + start_date_time);

				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);
				end_time = moment.utc(start_time, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				console.log('end time @ night freq:' + end_time)

				const end_date_time = "" + start_date + " " + end_time;
				console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create event and pass to ebent array 
					const event = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to event array 
					eventArray.push(event);
				}

				console.log(eventArray);

			} else if (freq_type == 3) {
				//Twice a day 8:00am and 8:00pm
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time_morning = '8:00:00'
				start_time_night = '20:00:00'

				//Start date and time concat morning
				const start_date_time_morning = "" + start_date + " " + start_time_morning;

				//Start date and time concat night
				const start_date_time_night = "" + start_date + " " + start_time_night;

				//console.log('start date time:' + start_date_time);

				//end date of frequency (start date + number of days)
				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);

				//end time for morning 
				end_time_morning = moment.utc(start_time_morning, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//end time for night
				end_time_night = moment.utc(start_time_night, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//console.log('end time @ night freq:' + end_time)

				const end_date_time_morning = "" + start_date + " " + end_time_morning;
				const end_date_time_night = "" + start_date + " " + end_time_night;
				//console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create tow event and pass to event array
					// first event is for morning and second for night  
					const event_morning = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					const event_night = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to events array 
					eventArray.push(event_morning);
					eventArray.push(event_night)
				}

				console.log(eventArray);

			} else if (freq_type == 4) {
				//thre times 8:00 am , 2:00pm and 8:00pm 
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time_morning = '8:00:00'
				start_time_afternoon = '14:00:00'
				start_time_night = '20:00:00'

				//Start date and time concat for morning session
				const start_date_time_morning = "" + start_date + " " + start_time_morning;

				//start date and time concat for afternoon session
				const start_date_time_afternoon = "" + start_date + " " + start_time_afternoon;

				//Start date and time concat for night session
				const start_date_time_night = "" + start_date + " " + start_time_night;

				//console.log('start date time:' + start_date_time);

				//end date of frequency (start date + number of days)
				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);

				//end time for morning session
				end_time_morning = moment.utc(start_time_morning, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');

				//end time for afternoon session
				end_time_afternoon = moment.utc(start_time_afternoon, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//end time for night session
				end_time_night = moment.utc(start_time_night, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//console.log('end time @ night freq:' + end_time)

				const end_date_time_morning = "" + start_date + " " + end_time_morning;
				const end_date_time_afternoon = "" + start_date + " " + end_time_afternoon;
				const end_date_time_night = "" + start_date + " " + end_time_night;
				//console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create tow event and pass to event array
					// first event is for morning and second for night  
					const event_morning = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					const event_afternoon = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type


					}

					const event_night = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to events array 
					eventArray.push(event_morning);
					eventArray.push(event_night);
					eventArray.push(event_afternoon)
				}

				console.log(eventArray);


			} else if (freq_type == 5) {
				//Four times daily 6:00am, 12:00pm , 6:00pm and 10:00pm
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time_morning = '06:00:00'
				start_time_afternoon = '12:00:00'
				start_time_evening = '18:00:00'
				start_time_night = '22:00:00'

				//Start date and time concat for morning session
				const start_date_time_morning = "" + start_date + " " + start_time_morning;

				//start date and time concat for afternoon session
				const start_date_time_afternoon = "" + start_date + " " + start_time_afternoon;

				//start date and time concat for afternoon session
				const start_date_time_evening = "" + start_date + " " + start_time_evening;

				//Start date and time concat for night session
				const start_date_time_night = "" + start_date + " " + start_time_night;

				//console.log('start date time:' + start_date_time);

				//end date of frequency (start date + number of days)
				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);

				//end time for morning session
				end_time_morning = moment.utc(start_time_morning, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');

				//end time for afternoon session
				end_time_afternoon = moment.utc(start_time_afternoon, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');


				//end time for evening session
				end_time_evening = moment.utc(start_time_evening, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');


				//end time for night session
				end_time_night = moment.utc(start_time_night, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//console.log('end time @ night freq:' + end_time)

				const end_date_time_morning = "" + start_date + " " + end_time_morning;
				const end_date_time_afternoon = "" + start_date + " " + end_time_afternoon;
				const end_date_time_evening = "" + start_date + " " + end_time_evening;
				const end_date_time_night = "" + start_date + " " + end_time_night;
				//console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create tow event and pass to event array
					// first event is for morning and second for night  
					const event_morning = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					const event_afternoon = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type


					}


					const event_evening = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_evening).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_evening).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type


					}

					const event_night = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to events array 
					eventArray.push(event_morning);
					eventArray.push(event_night);
					eventArray.push(event_evening);
					eventArray.push(event_afternoon);
				}

				console.log(eventArray);

			} else if (freq_type > 5 || prescription.drug_administration_frequency_id > 5) {
				// //custom Regular 4
				// //get date and time 
				// const start_date_time = $('#startDateTime_prescriptionService').val();
				// //console.log('start date and time:' + start_date_time);

				// //get number of time the task would be created 
				// const number_of_task = (numberOfDays * 24) / 4
				// //console.log('Number of task:'+number_of_task);

				// for (let i = 0; i < number_of_task; i++) {
				// 	//Create task and push to event array 
				// 	let event = {
				// 		'title': eventTitle,
				// 		'task_desc': desc,
				// 		'task_duration_in_minutes': task_duration,
				// 		'start': moment(start_date_time).add('hours', (i == 0) ? 0 : (4 * i)).format("YYYY-MM-DD HH:mm:ss"),
				// 		'end': moment(start_date_time).add('hours', (i == 0) ? 0 : (4 * i)).add('minutes', task_duration).format("YYYY-MM-DD HH:mm:ss"),
				// 		'drug_administration_frequency_id': freq_type

				// 	}

				// 	eventArray.push(event)

				// }
				let regular_value;
				let myFreq;
				if (freq_type) {
					myFreq = freq_type;
				} else {
					myFreq = prescription.drug_administration_frequency_id;
				}
				switch (myFreq) {
					case 6:
						regular_value = 2
						break;
					case 7:
						regular_value = 3
						break;
					case 8:
						regular_value = 4
						break;
					case 9:
						regular_value = 6
						break;
					case 10:
						regular_value = 8
						break;
					case 11:
						regular_value = 12
						break;
					case 12:
						regular_value = 24
						break;
				
					default:
						break;
				}
				for (let index = 0; index < numberOfDays * (24 / regular_value); index++) {
					let state_datetime = moment($(\`[name='presc_dose_date\${(index + 1)}']\`).val())
					let event = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': state_datetime.format("YYYY-MM-DD HH:mm:ss"),
						'end': state_datetime.add('minutes', task_duration).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type
						
					}
					
					eventArray.push(event)
				}


				console.log(eventArray)

			}




			//create body
			// const body ={
			// 	'title':eventTitle,
			// 	'task_desc':desc,
			// 	'task_duration_in_minutes':task_duration,
			// 	'start_date':start_date,
			// 	'end_date':end_date,
			// 	'start_time':start_time,
			// 	'end_time':end_time,
			// 	'frequency':freq_name,
			// 	'frequency_type':freq_type,
			// 	'patient_visit_id':patient_visit_id,
			// 	'requested_medication_fk':medication_id
			// }

			//console.log(body);

			//Run ajax if array is not empty 
			if (eventArray.length != 0) {
				eventArray.sort((a, b) => {
					if(a.start > b.start) {
						return 1
					}
					return -1
				})
				//save values to database 
				$.ajax({

					type: "POST",
					data: {
						'events': eventArray
					},
					url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitPrescriptionTasks', 'action' => 'add']) -->/<!-- php: = $patient_visit_id -->/\${prescription_id}\`
				}).done((data, textstatus, xhr) => {
					console.log("add Prescription task done")
					console.log(data)

					//find way to validate successful post request

					if (xhr.status == 200) {

						//reload MAR Section
						sheetTab();

						//Show Success Alertify
						alertify.success(data);
					} else {
						alertify.error(data);
					}






					//Reload page
					//window.location.reload()
				}).fail((data) => {
					console.log("Add Prescription task fail")
					console.log(data)

					alertify.error('Internal Server Error');
				})

			} else {
				//Display error message
				//event array is null
				alertify.error('No Event Created');
			}


		})

	}

	/**
	 * Ajax Request to Add PRN prescription Task
	 */

	function addPrescriptionPRNTask(body, id) {
		//save values to database 
		$.ajax({

			type: "POST",
			data: body,
			url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitPrnTasks', 'action' => 'addPrescriptionPRN']) -->/\${id}\`
		}).done((data, textstatus, xhr) => {
			console.log("add Prescription PRN task done")
			console.log(data)

			//find way to validate successful post request

			if (xhr.status == 200) {

				//reload MAR Section
				sheetTab();

				//Show Success Alertify
				alertify.success(data);
			} else {
				alertify.error(data);
			}

			//Reload page
			//window.location.reload()
		}).fail((data) => {
			console.log("Add Prescription PRN task fail")
			console.log(data)

			alertify.error('Internal Server Error');
		})
	}

	/**
	 * Ajax Request to Add  prescription sample collection Task
	 */

	function addSampleCollectionTask(body, id,collection_type, col_id) {

		console.log('add sample collection - trough task function running...');
		console.log("trough id:"+id);
		//save values to database 
		$.ajax({
			type: "POST",
			data: body,
			url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitSampleCollectionTasks', 'action' => 'addSampleCollection']) -->/\${id}/\${collection_type}/\${col_id}\`
		}).done((data, textstatus, xhr) => {
			console.log("add Sample Collection task done")
			console.log(data)

			//find way to validate successful post request

			if (xhr.status == 200) {

				//reload MAR Section
				sheetTab();

				//Show Success Alertify
				alertify.success(data);
			} else {
				alertify.error(data);
			}






			//Reload page
			//window.location.reload()
		}).fail((data) => {
			console.log("Add Sample Collection task fail")
			console.log(data)

			alertify.error('Internal Server Error');
		})
	}




	/**
	 * Ajax Request to Add PRN infusion Task
	 */
	function addInfusionPRNTask(body, id) {
		//save values to database 
		$.ajax({

			type: "POST",
			data: body,
			url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitPrnTasks', 'action' => 'addInfusionPRN']) -->/\${id}\`
		}).done((data, textstatus, xhr) => {
			console.log("add Infusion PRN task done")
			console.log(data)

			//find way to validate successful post request

			if (xhr.status == 200) {

				//reload MAR Section
				sheetTab();

				//Show Success Alertify
				alertify.success(data);
			} else {
				alertify.error(data);
			}






			//Reload page
			//window.location.reload()
		}).fail((data) => {
			console.log("Add Infusion PRN task fail")
			console.log(data)

			alertify.error('Internal Server Error');
		})

	}

	/**
	 * Function Populates PRN record Modal with Clicked Requested Prescription - PRN
	 * Saves Form to Record Task for Requested Prescription - PRN
	 */
	function setupPrnRecordModal(medication, med_type) {
		//Show event modal 
		$("#prnModal").modal('show');

		//Append details 
		appendDetails('req_date_prn_modal', moment(medication.date_created).format("DD-MM-YYYY"));
		appendDetails('req_prn_user_name', \`\${medication.user.first_name} \${medication.user.last_name}\`);
		appendDetails('prn_drugName', medication.item_stock.item.full_name);
		appendDetails('prn_days_end_date', moment(medication.end_date).format("DD-MM-YYYY"));
		appendDetails('prn_frequency', medication.drug_administration_frequency.name);

		if(medication.hold_vital_id > 0) {
			$('#prn_hold_vitals').show()
			appendDetails('heart_rate_prn', prescription.hold_vital.heart_rate);
			appendDetails('sys_dys_prn', prescription.hold_vital.systolic + " " + prescription.hold_vital.diastolic);
			appendDetails('res_rate_prn', prescription.hold_vital.respiratory_rate);
			appendDetails('pulse_prn', prescription.hold_vital.pulse);
		} else {
			$('#prn_hold_vitals').hide()
		}

		if (med_type != 'infusion') {
			// appendDetails('prn_instructions', medication.drug_administration_instruction.name);
			appendDetails('prn_instructions', medication.drug_administration_instruction_info);
		}


		//Custom event title 
		$('#prn_eventTitle').val("Administer " + medication.item_stock.item.full_name + " As Needed");// + (medication.drug_administration_frequency_id == -1 ? 'STAT' : medication.drug_administration_frequency.name) + " for " + medication.number_of_days + " days");


		//onclick for save button 
		$('#save_prnService').off().on('click', function() {

			//Create body 

			const body = {
				'title': $('#prn_eventTitle').val(),
				'task_desc': $('#prn_taskDec').val(),
				'task_duration_in_minutes': $('#prn_taskDurationSelect').val(),
				'start': moment($('#dateTime_prnService').val()).format("YYYY-MM-DD HH:mm:ss"),
				'end': moment($('#dateTime_prnService').val()).add('minutes', $('#prn_taskDurationSelect').val()).format("YYYY-MM-DD HH:mm:ss"),
			}


			console.log('PRN modal body');
			console.log(body);


			//ajax request - determine if type is infusion or prescription 
			if (med_type == 'prescription') {
				console.log('Prescription PRN');
				addPrescriptionPRNTask(body, medication.id);

			} else if (med_type == 'infusion') {
				console.log('infusion PRN');
				addInfusionPRNTask(body, medication.id);
			}

		})
		$('#record_prnService').off().on('click', function() {

			//Create body 
			console.log("I was kinda Clicked hahahahahah")
			let my_now_date = new Date()
			const body = {
				'title': $('#prn_eventTitle').val(),
				'task_desc': $('#prn_taskDec').val(),
				'task_duration_in_minutes': $('#prn_taskDurationSelect').val(),
				'start': moment(my_now_date).format("YYYY-MM-DD HH:mm:ss"),
				'end': moment(my_now_date).add('minutes', $('#prn_taskDurationSelect').val()).format("YYYY-MM-DD HH:mm:ss"),
			}


			console.log('PRN modal body');
			console.log(body);


			//ajax request - determine if type is infusion or prescription 
			if (med_type == 'prescription') {
				console.log('Prescription PRN');
				addPrescriptionPRNTask(body, medication.id);

			} else if (med_type == 'infusion') {
				console.log('infusion PRN');
				addInfusionPRNTask(body, medication.id);
			}

		})

		

	}

		/**
	 * Function Populates Sample collection record Modal  
	 * Saves Form to Record Task for Sample collection  
	 */
	function setupSampleCollectionRecordModal(collection, collection_type, med_type, col_id) {
		//Show event modal 
		$("#sampleCollectionModal").modal('show');

		//Append details
		if (med_type== 0 ){
		appendDetails('collection_drugName', collection.request_prescription.item_stock.item.full_name);
		//Requester 
		appendDetails('req_collection_user_name',\`\${collection.request_prescription.user.first_name } \${collection.request_prescription.user.last_name}\`);

		//event title
		$('#collection_eventTitle').val("Administer " + collection.request_prescription.item_stock.item.full_name + " " + (collection.request_prescription.drug_administration_frequency_id == -1 ? 'STAT' : collection.request_prescription.drug_administration_frequency.name) + " for " + collection.request_prescription.number_of_days + " days");
		
		
		}else {
		 
		appendDetails('collection_drugName', collection.request_infusion.item_stock.item.full_name);
		//Requester 
		appendDetails('req_collection_user_name',\`\${collection.request_infusion.user.first_name } \${collection.request_infusion.user.last_name}\`);

		//event title
		$('#collection_eventTitle').val("Administer " + collection.request_infusion.item_stock.item.full_name + " " + (collection.request_infusion.drug_administration_frequency_id == -1 ? 'STAT' : collection.request_infusion.drug_administration_frequency.name) + " for " + collection.request_infusion.number_of_days + " days");
		}

		appendDetails('specimen_source', collection.specimen_source);

		collection.priority == 'STAT' ? $('#collection_priority_record_modal').append(\`<span class="ml-2 badge rounded-pill bg-danger">STAT</span>\`) : $('#collection_priority_record_modal').append(\`<span class="ml-2 badge rounded-pill bg-primary">Routine</span>\`);  
		appendDetails('collection_frequency_record_modal', collection.frequency_in_mins);
		appendDetails('req_collection_date_modal',moment(new Date(collection.date_created)).format("DD MMM YYYY, hh:mm A"));

		

	


		//Custom event title 
	


		//onclick for save button 
		$('#save_collectionService').off().on('click', function() {

			//Create body 

			const body = {
				'title': $('#collection_eventTitle').val(),
				'task_desc': $('#collection_taskDec').val(),
				'task_duration_in_minutes': $('#collection_taskDurationSelect').val(),
				'start': moment($('#dateTime_collectionService').val()).format("YYYY-MM-DD HH:mm:ss"),
				'end': moment($('#dateTime_collectionService').val()).add('minutes', $('#collection_taskDurationSelect').val()).format("YYYY-MM-DD HH:mm:ss"),
			}


			console.log('Collection modal body');
			console.log(body);
			// console.log('med type:'+med_type);


			//ajax request - determine if type is trough or peak
			addSampleCollectionTask(body, collection.id,collection_type, col_id);
				

	


		})


	}

	/**
	 * Function Populates Sample collection view Modal  
	 * 
	 */
	function setupSampleCollectionViewModal(collection, collection_type, med_type) {
		//Show event modal 
		$("#view_sample_collection_modal").modal('show');

		

		//Append details
		if (med_type== 0 ){
		appendDetails('view_drugName_view_modal	', collection.request_prescription.item_stock.item.full_name);
		appendDetails('view_drugDose_view_modal	', collection.request_prescription.item_stock.item.dosage);
		appendDetails('view_drugForm_view_modal	', collection.request_prescription.item_stock.item.item_form);
		appendDetails('view_drugBatchNumber_view_modal	', collection.request_prescription.item_stock.batch_number);
		appendDetails('view_drugStockQty_view_modal	', collection.request_prescription.item_stock.quantity);
		appendDetails('view_drugExpDate_view_modal	', moment(new Date(collection.request_prescription.item_stock.expiry_date)).format("DD MMM YYYY, hh:mm A"));
		appendDetails('view_drugUnitPrice_view_modal	', collection.request_prescription.item_stock.unit_selling_price);

		//Requester 
		appendDetails('req_collection_user_name_view_modal',\`\${collection.request_prescription.user.first_name } \${collection.request_prescription.user.last_name}\`);

		
		
		}else {
		 
		appendDetails('view_drugName_view_modal', collection.request_infusion.item_stock.item.full_name);
		appendDetails('view_drugName_view_modal	', collection.request_infusion.item_stock.item.full_name);
		appendDetails('view_drugDose_view_modal	', collection.request_infusion.item_stock.item.dosage);
		appendDetails('view_drugForm_view_modal	', collection.request_infusion.item_stock.item.item_form);
		appendDetails('view_drugBatchNumber_view_modal	', collection.request_infusion.item_stock.batch_number);
		appendDetails('view_drugStockQty_view_modal	', collection.request_infusion.item_stock.quantity);
		appendDetails('view_drugExpDate_view_modal	', moment(new Date(collection.request_infusion.item_stock.expiry_date)).format("DD MMM YYYY, hh:mm A"));
		appendDetails('view_drugUnitPrice_view_modal	', collection.request_infusion.item_stock.unit_selling_price);
		//Requester 
		appendDetails('req_collection_user_name_view_modal',\`\${collection.request_infusion.user.first_name } \${collection.request_infusion.user.last_name}\`);

		}

		appendDetails('specimen_source_view_modal', collection.specimen_source);

		collection.priority == 'STAT' ? $('#collection_priority_view_modal').append(\`<span class="ml-2 badge rounded-pill bg-danger">STAT</span>\`) : $('#collection_priority_view_modal').append(\`<span class="ml-2 badge rounded-pill bg-primary">Routine</span>\`);  
		appendDetails('collection_frequency_view_modal', collection.frequency_in_mins);
		appendDetails('req_collection_date_view_modal',moment(new Date(collection.date_created)).format("DD MMM YYYY, hh:mm A"));

		let my_result = []
		collection.patient_visit_sample_collection_tasks.forEach(value => {
			let badge_result = ''
			if (value.state == 1) {
				badge_result = '<span class="badge rounded-pill bg-success">Completed</span>'
			} else if (value.state == 2) {
				badge_result = '<span class="badge rounded-pill bg-warning">Paused</span>'						
			} else if (value.state == 3) {
				badge_result = '<span class="badge rounded-pill bg-danger">Stopped</span>'
			} else {
				badge_result = '<span class="badge rounded-pill bg-secondary">Pending</span>'
			}
			my_result.push(\`
				<li>
					\${value.task_number}: \${moment(new Date(value.start)).format("DD MMM YYYY")}, 
					\${moment(new Date(value.start)).format("hh:mm A")} - \${moment(new Date(value.end)).format("hh:mm A")} 
					\${badge_result}<br/>
					\${value.started_by_user ? "<span class='pl-3'>Started by: " + value.started_by_user.first_name + " " + value.started_by_user.last_name + "</span>" : ''}
					\${value.started_at ? "<span class='pl-3'>Started at: " + moment(value.started_at).format("DD MMM YYYY, HH:mm:ss") + "</span>" : ''}
				</li>
			\`)
		});
		$('#sample_information_tracker').html('')
		$('#sample_information_tracker').html(my_result.join(""))


		//Custom event title 
	


		//onclick for save button 
		$('#save_collectionService').off().on('click', function() {

			//Create body 

			const body = {
				'title': $('#collection_eventTitle').val(),
				'task_desc': $('#collection_taskDec').val(),
				'task_duration_in_minutes': $('#collection_taskDurationSelect').val(),
				'start': moment($('#dateTime_collectionService').val()).format("YYYY-MM-DD HH:mm:ss"),
				'end': moment($('#dateTime_collectionService').val()).add('minutes', $('#collection_taskDurationSelect').val()).format("YYYY-MM-DD HH:mm:ss"),
			}


			console.log('Collection modal body');
			console.log(body);
			// console.log('med type:'+med_type);


			//ajax request - determine if type is trough or peak
			addSampleCollectionTask(body, collection.id,collection_type);
				

	


		})


	}

	/**
	 * Function Populates Prescription view modal with the clicked Requested prescription
	 */

	function setupPrescriptionViewModal(prescription) {
		//show modal 
		$('#view_prescription_modal').modal('show');

		//Append details 
		appendDetails('view_drugName', prescription.item_stock.item.full_name);
		appendDetails('view_drugDose', prescription.item_stock.item.dosage);
		appendDetails('view_drugForm', prescription.item_stock.item.item_form);
		appendDetails('view_drugBatchNumber', prescription.item_stock.batch_number);
		appendDetails('view_drugStockQty', prescription.item_stock.quantity);
		appendDetails('view_drugExpDate', moment(new Date(prescription.item_stock.expiry_date)).format("DD MMM YYYY, hh:mm A"));
		appendDetails('view_drugUnitPrice', prescription.item_stock.unit_cost_price);

		appendDetails('view_drugFreq', prescription.drug_administration_frequency.name)
		appendDetails('view_drugNumberOfDays', prescription.number_of_days);
		let myResults = 0
		if(prescription.number_of_doses && prescription.administer_dose){
			number_tablets = prescription.administer_dose.split(" / ");
			number_tablets = number_tablets[1].split(" ");
			myResults =  number_tablets[0] * prescription.number_of_doses;
            myResults = myResults + ' ' +  number_tablets[1];
		}
		appendDetails('view_drugQuantity', myResults)
		appendDetails('view_drugTotalPrice', "")

		appendDetails('view_drugInstruction', prescription.drug_administration_instruction_info);
		appendDetails('view_drugComments', prescription.comment);

		//Determine Repeat 
		if (!prescription.repeat_prescription == 0) {
			//Append no tag
			$('#repeat_pTag').append('<span class="badge rounded-pill bg-danger text-uppercase">no</span>')
		} else {
			//Append yes tag 
			$('#repeat_pTag').append('<span class="badge rounded-pill bg-success text-uppercase">Yes</span>')
		}

		appendDetails('view_drugPrescriber', prescription.user.name);
	}

	/**
	 * Function Populates Infusion view modal with the clicked Requested Infusion
	 */

	function setupInfusionViewModal(infusion) {
		//show modal 
		$('#view_infusion_modal').modal('show');


		//Append details 
		appendDetails('view_inf_drugName', infusion.item_stock.item.full_name);
		appendDetails('view_inf_drugDose', infusion.item_stock.item.dosage);
		appendDetails('view_inf_drugForm', infusion.item_stock.item.item_form);
		appendDetails('view_inf_drugBatchNumber', infusion.item_stock.batch_number);
		appendDetails('view_inf_drugStockQty', infusion.item_stock.quantity);
		appendDetails('view_inf_drugExpDate', moment(new Date(infusion.item_stock.expiry_date)).format("DD MMM YYYY, hh:mm A"));
		appendDetails('view_inf_drugUnitPrice', infusion.item_stock.unit_cost_price);

		appendDetails('view_inf_drugFreq', infusion.drug_administration_frequency.name)
		appendDetails('view_inf_drugNumberOfDays', infusion.number_of_days);
		appendDetails('view_inf_drugQuantity', "")
		appendDetails('view_inf_drugTotalPrice', "")

		appendDetails('view_inf_drugComments', infusion.comment);

		//Determine Repeat 
		if (!infusion.repeat_prescription == 0) {
			//Append no tag
			$('#repeat_inf_pTag').append('<span class="badge rounded-pill bg-danger text-uppercase">no</span>')
		} else {
			//Append yes tag 
			$('#repeat_inf_pTag').append('<span class="badge rounded-pill bg-success text-uppercase">Yes</span>')
		}

		appendDetails('view_inf_drugPrescriber', infusion.user.name);





	}

	/**
	 * Function Populates Prescription 
	 */
	function setupPrescriptionDoseModal(prescription) {
		//show modal
		$('#presc_dose_modal').modal('show')

		//Append details
		appendDetails('dose_reqDate', moment(new Date(prescription.date_created)).format("DD MMM YYYY, hh:mm A"));
		appendDetails('dose_user_name', prescription.user.name);
		appendDetails('dose_user_role', prescription.user.role.name);
		appendDetails('dose_drugName', prescription.item_stock.item.full_name);
		appendDetails('dose_days', prescription.number_of_days);
		appendDetails('dose_frequency', prescription.drug_administration_frequency.name);
		appendDetails('dose_administration', prescription.administer_dose);
		appendDetails('dose_instructions', prescription.drug_administration_instruction_info);

		console.log("Dose Modal Request med id:" + prescription.id);


		//Get Task for Requested prescriptions

		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitPrescriptionTasks', 'action' => 'getTasksById']) -->/\${prescription.id}\`
		}).done((data) => {
			//Log
			console.log('Get Tasks @ Dose Modal done')
			console.log(data)
			//convert array to json 
			const array = jQuery.parseJSON(data)

			//Validate Array 
			if (data != null && array.length != 0) {
				//Loop through array 
				result = []
				$.each(array, function(key, value) {
					badge_result = ''
					if (value.state == 1) {
						badge_result = '<span class="badge rounded-pill bg-success">Completed</span>'
					} else if (value.state == 2) {
						badge_result = '<span class="badge rounded-pill bg-warning">Paused</span>'						
					} else if (value.state == 3) {
						badge_result = '<span class="badge rounded-pill bg-danger">Stopped</span>'
					} else {
						badge_result = '<span class="badge rounded-pill bg-secondary">Pending</span>'
					}
					//Get List for Administration Tracker
					result.push(\`
						<li>
							Task \${key+1}: \${moment(new Date(value.start)).format("DD MMM YYYY")}, 
							\${moment(new Date(value.start)).format("hh:mm A")} - \${moment(new Date(value.end)).format("hh:mm A")} 
							\${badge_result}<br/>
							\${value.started_by ? "<span class='pl-3'>Performed by: " + value.started_by.first_name + " " + value.started_by.last_name + "</span>" : ''}
							\${value.started_at ? "<span class='pl-3'>Performed at: " + moment(value.started_at).format("DD MMM YYYY, HH:mm") + "</span>" : ''}
						</li>
					\`)
				})
				$('#administration_tracker_doses').html(result.join(""))
			}

		}).fail((data) => {
			//Log
			console.log('Get Tasks @ Dose Modal Fail')
			console.log(data)
		})

	}


	function setupInfusionDoseModal(prescription) {
		//show modal
		$('#inf_dose_modal').modal('show')

		//Append details
		appendDetails('dose_reqDate_inf', moment(new Date(prescription.date_created)).format("DD MMM YYYY, hh:mm A"));
		appendDetails('dose_user_name_inf', prescription.user.name);
		appendDetails('dose_user_role_inf', prescription.user.role.name);
		appendDetails('dose_drugName_inf', prescription.item_stock.item.full_name);
		appendDetails('dose_days_inf', prescription.number_of_days);
		appendDetails('dose_frequency_inf', prescription.drug_administration_frequency.name);
		appendDetails('dose_administration_inf', prescription.administer_infusion);
		// appendDetails('dose_instructions_inf', prescription.drug_administration_instruction.name);

		console.log("Dose Modal Request med id:" + prescription.id);


		//Get Task for Requested prescriptions

		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitInfusionTasks', 'action' => 'getTasksById']) -->/\${prescription.id}\`
		}).done((data) => {
			//Log
			console.log('Get Tasks @ Dose Modal done')
			console.log(data)
			//convert array to json 
			const array = jQuery.parseJSON(data)

			//Validate Array 
			if (data != null && array.length != 0) {
				//Loop through array 
				result = []
				$.each(array, function(key, value) {
					badge_result = ''
					if (value.state == 1) {
						badge_result = '<span class="badge rounded-pill bg-success">Completed</span>'
					} else if (value.state == 2) {
						badge_result = '<span class="badge rounded-pill bg-warning">Paused</span>'						
					} else if (value.state == 3) {
						badge_result = '<span class="badge rounded-pill bg-danger">Stopped</span>'
					} else {
						badge_result = '<span class="badge rounded-pill bg-secondary">Pending</span>'
					}
					//Get List for Administration Tracker
					result.push(\`
						<li>
							Task \${key+1}: \${moment(new Date(value.start)).format("DD MMM YYYY")}, 
							\${moment(new Date(value.start)).format("hh:mm A")} - \${moment(new Date(value.end)).format("hh:mm A")} 
							\${badge_result} <br>
							\${value.started_by ? "<span class='pl-3'>Started by: " + value.started_by.first_name + " " + value.started_by.last_name + "</span>" : ''}
							\${value.started_at ? "<span class='pl-3'>Started at: " + moment(value.started_at).format("DD MMM YYYY, HH:mm:ss") + "</span>" : ''}
							<br>
							\${value.ended_by ? "<span class='pl-3'>Ended by: " + value.ended_by.first_name + " " + value.ended_by.last_name + "</span>" : ''}
							\${value.ended_at ? "<span class='pl-3'>Ended at: " + moment(value.ended_at).format("DD MMM YYYY, HH:mm:ss") + "</span>" : ''}
						</li>
					\`)
				})
				$('#administration_tracker_doses_inf').html(result.join(""))
			}

		}).fail((data) => {
			//Log
			console.log('Get Tasks @ Dose Modal Fail')
			console.log(data)
		})




	}
	function createMarTimeEvents(prescribedTasks, label) {
        let result = []
        // for (let index = 0; index < count; index++) {
		console.log("this is all the needed info", prescribedTasks)

		le_prescribedTasks = prescribedTasks.sort((a, b) => new Date(a.start) - new Date(b.start))

		le_prescribedTasks.forEach((ele, index) => {

            // let newAdd = index == 0 ? 0 : add;
            result.push(\`
                <label class="h5"> Dose \${index + 1}</label>
                <div class="form-inline ml-1">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="\${label}_dose_status_\${index + 1}" id="inlineRadio1" value="0">
                        <label class="form-check-label" for="inlineRadio1">Off</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="\${label}_dose_status_\${index + 1}" id="inlineRadio2" value="1" checked>
                        <label class="form-check-label" for="inlineRadio2">On </label>
                        <div class="form-row">
                            <div class="form-group ml-3">
                                <input class="mobiTimePicker" class="form-control  w-100 d-none" name="\${label}_dose_date\${index + 1}" value="\${moment(ele.start).format("YYYY-MM-DD HH:mm")}"/>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            \`)
		});
        // }
        return result
    }
	
	function createTimeEventsMar(count, add, startTime, label) {
        let result = []
        for (let index = 0; index < count; index++) {
            let newAdd = index == 0 ? 0 : add;
            result.push(\`
                <label class="h5"> Dose \${index + 1}</label>
                <div class="form-inline ml-1">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="\${label}_dose_status_\${index + 1}" id="inlineRadio1" value="0">
                        <label class="form-check-label" for="inlineRadio1">Off</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="\${label}_dose_status_\${index + 1}" id="inlineRadio2" value="1" checked>
                        <label class="form-check-label" for="inlineRadio2">On </label>
                        <div class="form-row">
                            <div class="form-group ml-3">
                                <input class="mobiTimePicker" class="form-control  w-100 d-none" name="\${label}_dose_date\${index + 1}" value="\${startTime.add(newAdd, 'hours').format("YYYY-MM-DD HH:mm")}"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            \`)
        }
        return result
    }
	/**
	 * Function Populates Infusion
	 */
	function setupInfusionModal(infusion) {

		//Show event modal 
		$("#infusionModal").modal('show');

		$('#taskFrequencySelect_inf').val(infusion.drug_administration_frequency_id)
		$('#taskFrequencySelect_inf').selectpicker('refresh')
		// $('#startDateTime_prescriptionService_inf').val(moment(infusion.start_date).format('MM/DD/YYYY hh:mm A'))

		if (infusion.drug_administration_frequency_id > 5) {

			$('#startDateTime_prescriptionService_inf').off().change(() => {
				let count = infusion.patient_visit_prescribed_infusion_tasks.length;
				let add = parseInt(infusion.number_of_days);
				let time = moment($("#startDateTime_prescriptionService_inf").val());
				let startTime = time != null ? time : moment(infusion.start_date).startOf('day');
				let result = createTimeEventsMar(count, 24/ (count / add), startTime, 'inf')

				$("#suggested_dates_inf").html(result.join(""));

				mobiscroll.datepicker('.mobiTimePicker', {
					controls: ['datetime'],
					// defaultSelection: new Date(2020, 11, 24)
					touchUi: true,
					theme: 'ios',
					themeVariant: 'light',
					dateFormat: 'YYYY-MM-DD',
					returnFormat: 'moment',
				});
			})

			let time = moment($("#startDateTime_prescriptionService_inf").val());
			
			$('#suggested_date_container_inf').show()
			let count = infusion.patient_visit_prescribed_infusion_tasks.length;
			let add = parseInt(infusion.number_of_days)
			let startTime = $("#startDateTime_prescriptionService_inf").val() != '' ? time : moment(infusion.start_date).startOf('day')
			let result = createMarTimeEvents(infusion.patient_visit_prescribed_infusion_tasks, 'inf')
			$("#suggested_dates_inf").html(result.join(""))
			
			mobiscroll.datepicker('.mobiTimePicker', {
				controls: ['datetime'],
				// defaultSelection: new Date(2020, 11, 24)
				touchUi: true,
				theme: 'ios',
				themeVariant: 'light',
				dateFormat: 'YYYY-MM-DD',
				returnFormat: 'moment',
			});
		} else {
			$('#suggested_date_container_inf').hide()
		}

		$('#taskFrequencySelect_inf').off().change(() => {
			let freq_type = parseInt($('#taskFrequencySelect_inf').find(':selected').val());
			if (freq_type > 5) {
				let count;
				let interval;
				switch (freq_type) {
					case 6:
						count = 2;
						interval = 2;
						break;
					case 7:
						count = 3;
						interval = 3;
						break;
					case 8:
						count = 4;
						interval = 4;
						break;
					case 9:
						count = 6;
						interval = 6;
						break;
					case 10:
						count = 8;
						interval = 8;
						break;
					case 11:
						count = 12;
						interval = 12;
						break;
					case 12:
						count = 24;
						interval = 24;
						break;
				
					default:
						break;
				}
				let add = parseInt(prescription.number_of_days);
				let time = moment($("#startDateTime_prescriptionService_inf").val());
				let startTime = $("#startDateTime_prescriptionService_inf").val() != '' ? time : moment(infusion.start_date).startOf('day')
				let result = createTimeEventsMar(24/ (count / add), interval, startTime, 'presc')

				$("#suggested_dates_inf").html(result.join(""));

				mobiscroll.datepicker('.mobiTimePicker', {
					controls: ['datetime'],
					// defaultSelection: new Date(2020, 11, 24)
					touchUi: true,
					theme: 'ios',
					themeVariant: 'light',
					dateFormat: 'YYYY-MM-DD',
					returnFormat: 'moment',
				});
			} else {
				$('#suggested_date_container_presc').hide()
			}
			$('#startDateTime_prescriptionService_inf').off().change(() => {
				let freq_type = parseInt($('#taskFrequencySelect_inf').find(':selected').val());
				if (freq_type > 5) {
					let count;
					let interval;
					switch (freq_type) {
						case 6:
							count = 2;
							interval = 2;
							break;
						case 7:
							count = 3;
							interval = 3;
							break;
						case 8:
							count = 4;
							interval = 4;
							break;
						case 9:
							count = 6;
							interval = 6;
							break;
						case 10:
							count = 8;
							interval = 8;
							break;
						case 11:
							count = 12;
							interval = 12;
							break;
						case 12:
							count = 24;
							interval = 24;
							break;
					
						default:
							break;
					}
					let add = parseInt(prescription.number_of_days);
					let time = moment($("#startDateTime_prescriptionService_inf").val());
					let startTime = $("#startDateTime_prescriptionService_inf").val() != '' ? time : moment(infusion.start_date).startOf('day')
					let result = createTimeEventsMar(24/ (count / add), interval, startTime, 'presc')

					$("#suggested_dates_inf").html(result.join(""));

					mobiscroll.datepicker('.mobiTimePicker', {
						controls: ['datetime'],
						// defaultSelection: new Date(2020, 11, 24)
						touchUi: true,
						theme: 'ios',
						themeVariant: 'light',
						dateFormat: 'YYYY-MM-DD',
						returnFormat: 'moment',
					});
				} else {
					$('#suggested_date_container_presc').hide()
				}
			})
		})

		// console.log('Prescription id @ start button modal');
		// console.log(prescription);
		// console.log(prescription.id);

		//constants 

		const infusion_id = infusion.id;
		const numberOfDays = infusion.number_of_days;





		//Append detaisl
		//Req date
		appendDetails('req_date_inf_modal', moment(new Date(infusion.date_created)).format("DD MMM YYYY, hh:mm A"));

		//Requester Name
		appendDetails('req_inf_user_name', \`\${infusion.user.first_name} \${infusion.user.last_name}\`);

		//Requester Role
		appendDetails('req_user_role', infusion.user.role.name);



		//drug name 
		appendDetails('rm_drugName_inf', infusion.item_stock.item.full_name);

		//number of days 
		appendDetails('rm_days_inf', infusion.number_of_days);

		//drug frequency 
		appendDetails('rm_administer_dose_inf', (infusion.administer_infusion));
		appendDetails('rm_frequency_inf', (infusion.drug_administration_frequency_id == -1 ? 'STAT' : infusion.drug_administration_frequency.name));
		appendDetails('rm_frequency_2_inf', (infusion.drug_administration_frequency_id == -1 ? 'STAT' : infusion.drug_administration_frequency.name));
		$('#rm_start_date_inf').html(moment(infusion.start_date).format("DD/MM/YY"));
		$('#rm_start_date_2_inf').html(moment(infusion.start_date).format("DD/MM/YY"));


		if(infusion.hold_vital_id > 0) {
			$('#inf_hold_vitals').show()
			appendDetails('inf_heart_rate_inf', infusion.hold_vital.heart_rate);
			appendDetails('inf_sys_dys_inf', infusion.hold_vital.systolic + " " + infusion.hold_vital.diastolic);
			appendDetails('inf_res_rate_inf', infusion.hold_vital.respiratory_rate);
			appendDetails('inf_pulse_inf', infusion.hold_vital.pulse);
		} else {
			$('#inf_hold_vitals').hide()
		}

		if(infusion.is_complete && infusion.status_id == 23) {
			// audit = infusion.item_audits
			// audit_last = audit[audit.length - 1]
			$('#perform_bt_user_name_inf').html(\`\${infusion?.drug_issued_by?.first_name} \${infusion?.drug_issued_by.last_name}\`)
			$('#perform_date_inf_modal').html(moment(infusion.issue_date).format("DD/MM/YY HH:mm:ss"))
		} else {
			
			$('#perform_bt_user_name_inf').html(\`Not Issued\`)
		}

		if(infusion.peak_levels.length > 0) {
			$("#inf_levels").show()
			console.log("peak Level Available")
			$('#rm_peak_trough_levels_inf').text("Add Peak Information");
		} else if (infusion.trough_levels.length > 0) {
			$("#inf_levels").show()
			console.log("Trough Level Available")
			$('#rm_peak_trough_levels_inf').text("Add Trough Information");
		} else {
			$("#inf_levels").hide()
		}

		//Custom event title 
		$('#eventTitle_inf').val("Administer " + infusion.item_stock.item.full_name + " " + infusion.item_stock.item.brand_name +" "+ infusion.administer_infusion + " " + (infusion.drug_administration_frequency_id == -1 ? 'STAT' : infusion.drug_administration_frequency.name));
		$("#rm_administer_inf").html(infusion.administer_infusion)
		let administer_infusion_val1 = infusion.administer_infusion.split(" ")
		administer_infusion_val = administer_infusion_val1[administer_infusion_val1.length - 2]
		$('#rm_duration_inf').html(administer_infusion_val + " hr(s)")
		$('#rm_total_quantity_inf').html(infusion.quantity + " bags")
		$('#rm_duration_total_inf').html(infusion.quantity * administer_infusion_val + " hr(s)")
		let rate = administer_infusion_val1.slice(3, 5)
		$('#rm_rate_inf').html(rate.join(" "))
		let unit_vol = infusion.item_stock.item.unit_type.quantity.split(" ")[0]
		let total_vol = parseInt(infusion.quantity) * parseInt(unit_vol)
		$('#rm_total_volme_inf').html( total_vol + " ml")
		$('#taskDurationSelect_inf').val(administer_infusion_val)


		$('#taskFrequencySelect_inf').change(function() {
			if ($(this).find(':selected').val() > 5) {

				//hide start date contianer
				//add d-none if d-none does not already exisit
				if (!$('#sd_container_inf').hasClass()) {
					$('#sd_container_inf').addClass('d-none');
				}

				//show start date time section 
				$('#sdt_container_inf').removeClass('d-none');



			} else {
				//hide start date time section
				if (!$('#sdt_container_inf').hasClass()) {
					$('#sdt_container_inf').addClass('d-none');
				}

				//show start date section
				$('#sd_container_inf').removeClass('d-none');

			}
		})

		//Onclick save button

		$("#save_InfusionService_inf").off().on('click', function() {
			//Get Relevant Data 
			//constants
			if (!$("#startDateTime_prescriptionService_inf").val() || $("#startDateTime_prescriptionService_inf").val() == '') {
				alertify.error("Please Enter Start Date and Time")
				return
			}
			const eventTitle = $("#eventTitle_inf").val();
			const desc = $('#taskDec_inf').val();
			const task_duration = $('#taskDurationSelect_inf').val() * 60;
			const freq_type = parseInt($('#taskFrequencySelect_inf').find(':selected').val());

			let start_time;
			let end_time;
			let eventArray = [];

			//Determine the profile (Frequency Type ) choosen
			//Frequency type would be used to create a profile for drug administration

			// if (freq_type == 6) {
			// 	//custom Regular 4
			// 	//get date and time 
			// 	const start_date_time = $('#startDateTime_prescriptionService_inf').val();
			// 	//console.log('start date and time:' + start_date_time);

			// 	//get number of time the task would be created 
			// 	const number_of_task = (numberOfDays * 24) / 4
			// 	//console.log('Number of task:'+number_of_task);

			// 	for (let i = 0; i < number_of_task; i++) {
			// 		//Create task and push to event array 
			// 		let event = {
			// 			'title': eventTitle,
			// 			'task_desc': desc,
			// 			'task_duration_in_minutes': task_duration,
			// 			'start': moment(start_date_time).add('hours', (i == 0) ? 0 : (4 * i)).format("YYYY-MM-DD HH:mm:ss"),
			// 			'end': moment(start_date_time).add('hours', (i == 0) ? 0 : (4 * i)).add('minutes', task_duration).format("YYYY-MM-DD HH:mm:ss"),
			// 			'drug_administration_frequency_id': freq_type

			// 		}

			// 		eventArray.push(event)

			// 	}


			// 	console.log(eventArray)

			// }


			if (freq_type == 1) {
				//Morning (8:00am)
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService_inf').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time = '8:00:00'

				const start_date_time = "" + start_date + " " + start_time;
				console.log('start date time:' + start_date_time);

				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);
				end_time = moment.utc(start_time, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');

				const end_date_time = "" + start_date + " " + end_time;


				for (let i = 0; i < numberOfDays; i++) {
					//create event and pass to ebent array 
					const event = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to event array 
					eventArray.push(event);

				}

				console.log(eventArray);


			} else if (freq_type == 2) {
				//Night (8:00pm)
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService_inf').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time = '20:00:00'

				const start_date_time = "" + start_date + " " + start_time;
				console.log('start date time:' + start_date_time);

				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);
				end_time = moment.utc(start_time, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				console.log('end time @ night freq:' + end_time)

				const end_date_time = "" + start_date + " " + end_time;
				console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create event and pass to ebent array 
					const event = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to event array 
					eventArray.push(event);
				}

				console.log(eventArray);

			} else if (freq_type == 3) {
				//Twice a day 8:00am and 8:00pm
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService_inf').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time_morning = '8:00:00'
				start_time_night = '20:00:00'

				//Start date and time concat morning
				const start_date_time_morning = "" + start_date + " " + start_time_morning;

				//Start date and time concat night
				const start_date_time_night = "" + start_date + " " + start_time_night;

				//console.log('start date time:' + start_date_time);

				//end date of frequency (start date + number of days)
				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);

				//end time for morning 
				end_time_morning = moment.utc(start_time_morning, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//end time for night
				end_time_night = moment.utc(start_time_night, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//console.log('end time @ night freq:' + end_time)

				const end_date_time_morning = "" + start_date + " " + end_time_morning;
				const end_date_time_night = "" + start_date + " " + end_time_night;
				//console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create tow event and pass to event array
					// first event is for morning and second for night  
					const event_morning = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					const event_night = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to events array 
					eventArray.push(event_morning);
					eventArray.push(event_night)
				}

				console.log(eventArray);

			} else if (freq_type == 4) {
				//thre times 8:00 am , 2:00pm and 8:00pm 
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService_inf').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time_morning = '8:00:00'
				start_time_afternoon = '14:00:00'
				start_time_night = '20:00:00'

				//Start date and time concat for morning session
				const start_date_time_morning = "" + start_date + " " + start_time_morning;

				//start date and time concat for afternoon session
				const start_date_time_afternoon = "" + start_date + " " + start_time_afternoon;

				//Start date and time concat for night session
				const start_date_time_night = "" + start_date + " " + start_time_night;

				//console.log('start date time:' + start_date_time);

				//end date of frequency (start date + number of days)
				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);

				//end time for morning session
				end_time_morning = moment.utc(start_time_morning, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');

				//end time for afternoon session
				end_time_afternoon = moment.utc(start_time_afternoon, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//end time for night session
				end_time_night = moment.utc(start_time_night, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//console.log('end time @ night freq:' + end_time)

				const end_date_time_morning = "" + start_date + " " + end_time_morning;
				const end_date_time_afternoon = "" + start_date + " " + end_time_afternoon;
				const end_date_time_night = "" + start_date + " " + end_time_night;
				//console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create tow event and pass to event array
					// first event is for morning and second for night  
					const event_morning = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					const event_afternoon = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type


					}

					const event_night = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to events array 
					eventArray.push(event_morning);
					eventArray.push(event_night);
					eventArray.push(event_afternoon)
				}

				console.log(eventArray);


			} else if (freq_type == 5) {
				//Four times daily 6:00am, 12:00pm , 6:00pm and 10:00pm
				//Get Date 
				//get date from start date 
				start_date = moment($('#startDate_prescriptionService_inf').val()).format("YYYY-MM-DD")
				//console.log(start_date);
				start_time_morning = '06:00:00'
				start_time_afternoon = '12:00:00'
				start_time_evening = '18:00:00'
				start_time_night = '22:00:00'

				//Start date and time concat for morning session
				const start_date_time_morning = "" + start_date + " " + start_time_morning;

				//start date and time concat for afternoon session
				const start_date_time_afternoon = "" + start_date + " " + start_time_afternoon;

				//start date and time concat for afternoon session
				const start_date_time_evening = "" + start_date + " " + start_time_evening;

				//Start date and time concat for night session
				const start_date_time_night = "" + start_date + " " + start_time_night;

				//console.log('start date time:' + start_date_time);

				//end date of frequency (start date + number of days)
				end_date = moment(start_date).add(numberOfDays, 'days').format("YYYY-MM-DD");
				//console.log("end date for prescription:"+end_date);

				//end time for morning session
				end_time_morning = moment.utc(start_time_morning, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');

				//end time for afternoon session
				end_time_afternoon = moment.utc(start_time_afternoon, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');


				//end time for evening session
				end_time_evening = moment.utc(start_time_evening, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');


				//end time for night session
				end_time_night = moment.utc(start_time_night, 'HH:mm:ss').add(task_duration, 'minutes').format('HH:mm:ss');
				//console.log('end time @ night freq:' + end_time)

				const end_date_time_morning = "" + start_date + " " + end_time_morning;
				const end_date_time_afternoon = "" + start_date + " " + end_time_afternoon;
				const end_date_time_evening = "" + start_date + " " + end_time_evening;
				const end_date_time_night = "" + start_date + " " + end_time_night;
				//console.log('end date time @ night freq:' + end_date_time);


				for (let i = 0; i < numberOfDays; i++) {
					//create tow event and pass to event array
					// first event is for morning and second for night  
					const event_morning = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_morning).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					const event_afternoon = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_afternoon).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type


					}


					const event_evening = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_evening).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_evening).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type


					}

					const event_night = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': moment(start_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'end': moment(end_date_time_night).add('days', i).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': freq_type

					}

					//push to events array 
					eventArray.push(event_morning);
					eventArray.push(event_night);
					eventArray.push(event_evening);
					eventArray.push(event_afternoon);
				}

				console.log(eventArray);

			} else if (freq_type >= 6 || infusion.drug_administration_frequency_id > 5) {
				// //custom Regular 4
				// //get date and time 
				// const start_date_time = $('#startDateTime_prescriptionService_inf').val();
				// //console.log('start date and time:' + start_date_time);

				// //get number of time the task would be created 
				// const number_of_task = (numberOfDays * 24) / 4
				// //console.log('Number of task:'+number_of_task);

				// for (let i = 0; i < number_of_task; i++) {
				// 	//Create task and push to event array 
				// 	let event = {
				// 		'title': eventTitle,
				// 		'task_desc': desc,
				// 		'task_duration_in_minutes': task_duration,
				// 		'start': moment(start_date_time).add('hours', (i == 0) ? 0 : (4 * i)).format("YYYY-MM-DD HH:mm:ss"),
				// 		'end': moment(start_date_time).add('hours', (i == 0) ? 0 : (4 * i)).add('minutes', task_duration).format("YYYY-MM-DD HH:mm:ss"),
				// 		'drug_administration_frequency_id': freq_type

				// 	}
					
				// 	eventArray.push(event)
					
				// }


				let regular_value;
				let myFreq;
				if (freq_type) {
					myFreq = freq_type;
				} else {
					myFreq = infusion.drug_administration_frequency_id;
				}
				switch (myFreq) {
					case 6:
						regular_value = 2
						break;
					case 7:
						regular_value = 3
						break;
					case 8:
						regular_value = 4
						break;
					case 9:
						regular_value = 6
						break;
					case 10:
						regular_value = 8
						break;
					case 11:
						regular_value = 12
						break;
					case 12:
						regular_value = 24
						break;
				
					default:
						break;
				}
				for (let index = 0; index < numberOfDays * (24 / regular_value); index++) {
					let state_datetime = moment($(\`[name='inf_dose_date\${(index + 1)}']\`).val())
					let event = {
						'title': eventTitle,
						'task_desc': desc,
						'task_duration_in_minutes': task_duration,
						'start': state_datetime.format("YYYY-MM-DD HH:mm:ss"),
						'end': state_datetime.add('minutes', task_duration).format("YYYY-MM-DD HH:mm:ss"),
						'drug_administration_frequency_id': myFreq
						
					}
					
					eventArray.push(event)
				}


				// console.log(eventArray)

			}


			//Run ajax if array is not empty 
			if (eventArray.length != 0) {
				eventArray.sort((a, b) => {
					if(a.start > b.start) {
						return 1
					}
					return -1
				})
				//save values to database 
				$.ajax({

					type: "POST",
					data: {
						events: eventArray,
						site_location:$('#site_location_inf').val(),
						site_method:$('#site_method_inf').val()
					},
					url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitInfusionTasks', 'action' => 'add']) -->/<!-- php: = $patient_visit_id -->/\${infusion_id}\`
				}).done((data, textstatus, xhr) => {
					// console.log("add Infusion task done")
					// console.log(data)

					//find way to validate successful post request

					if (xhr.status == 200) {

						//reload MAR Section
						sheetTab();

						//Show Success Alertify
						alertify.success(data);
					} else {
						alertify.error(data);
					}






					//Reload page
					//window.location.reload()
				}).fail((data) => {
					// console.log("Add Infusion task fail")
					// console.log(data)

					alertify.error('Internal Server Error');
				})

			} else {
				//Display error message
				//event array is null
			}


		})

	}
	function setupTransfusionModal(transfusion) {

		//Show event modal 
		$("#transfusionModal").modal('show');

		const transfusion_id = transfusion.id;
		const numberOfDays = transfusion.number_of_days;


		//Append detaisl
		//Req date
		appendDetails('req_date_trans_modal', moment(new Date(transfusion.date_created)).format("DD MMM YYYY, hh:mm A"));

		//Requester Name
		appendDetails('req_trans_user_name', \`\${transfusion.user.first_name} \${transfusion.user.last_name}\`);

		//Requester Role
		appendDetails('req_trans_user_role', transfusion.user.role.name);



		//drug name 
		appendDetails('rm_drugName_trans', transfusion.item_stock.item.full_name);

		//number of days 
		// appendDetails('rm_days_trans', transfusion.number_of_days);

		//drug frequency 
		// appendDetails('rm_frequency_trans', (transfusion.drug_administration_frequency_id == -1 ? 'STAT' : transfusion.drug_administration_frequency.name));
		// appendDetails('rm_frequency_2_trans', (transfusion.drug_administration_frequency_id == -1 ? 'STAT' : transfusion.drug_administration_frequency.name));
		$('#rm_start_date_trans').html(moment(transfusion.start_date).format("DD/MM/YY HH:mm"));
		$('#rm_start_date_2_trans').html(moment(transfusion.start_date).format("DD/MM/YY HH:mm"));


		// if(transfusion.hold_vital_id > 0) {
		// 	$('#inf_hold_vitals').show()
		// 	appendDetails('inf_heart_rate_trans', transfusion.hold_vital.heart_rate);
		// 	appendDetails('inf_sys_dys_trans', transfusion.hold_vital.systolic + " " + transfusion.hold_vital.diastolic);
		// 	appendDetails('inf_res_rate_trans', transfusion.hold_vital.respiratory_rate);
		// 	appendDetails('inf_pulse_trans', transfusion.hold_vital.pulse);
		// } else {
		// 	$('#inf_hold_vitals').hide()
		// }

		if(transfusion.is_complete && transfusion.status_id == 23) {
			// audit = transfusion.item_audits
			// audit_last = audit[audit.length - 1]
			$('#perform_trans_bt_user_name').html(\`\${transfusion?.drug_issued_by?.first_name} \${transfusion?.drug_issued_by?.last_name}\`)
			$('#perform_date_trans_modal').html(moment(transfusion.issue_date).format("DD/MM/YY HH:mm:ss"))
		} else {
			$('#perform_trans_bt_user_name').html(\`Not Issued\`)

		}

		// if(transfusion.peak_levels.length > 0) {
		// 	$("#inf_levels").show()
		// 	console.log("peak Level Available")
		// 	$('#rm_peak_trough_levels_trans').text("Add Peak Information");
		// } else if (transfusion.trough_levels.length > 0) {
		// 	$("#inf_levels").show()
		// 	console.log("Trough Level Available")
		// 	$('#rm_peak_trough_levels_trans').text("Add Trough Information");
		// } else {
		// 	$("#inf_levels").hide()
		// }

		//Custom event title 
		$('#eventTitle_trans').val("Administer " + transfusion.item_stock.item.full_name + " " + transfusion.administer_transfusion + " routine");
		$("#rm_administer_trans").html(transfusion.administer_transfusion)
		let administer_transfusion_val1 = transfusion.administer_transfusion.split(" ")
		administer_transfusion_val = administer_transfusion_val1[administer_transfusion_val1.length - 2]
		$('#rm_duration_trans').html(administer_transfusion_val + " hr(s)")
		// $('#rm_total_quantity_trans').html(transfusion.quantity + " bags")
		$('#rm_duration_total_trans').html(transfusion.quantity * administer_transfusion_val + " hr(s)")
		let rate = administer_transfusion_val1.slice(3, 5)
		$('#rm_rate_trans').html(rate.join(" "))
		let unit_vol = transfusion.item_stock.item.unit_type.quantity.split(" ")[0]
		let total_vol = parseInt(transfusion.quantity) * parseInt(unit_vol)
		// $('#rm_total_volme_trans').html( total_vol + " ml")
		$('#taskDurationSelect_trans').val(administer_transfusion_val)


		// $('#taskFrequencySelect_trans').change(function() {
		// 	if ($(this).find(':selected').val() > 5) {

		// 		//hide start date contianer
		// 		//add d-none if d-none does not already exisit
		// 		if (!$('#sd_container_trans').hasClass()) {
		// 			$('#sd_container_trans').addClass('d-none');
		// 		}

		// 		//show start date time section 
		// 		$('#sdt_container_trans').removeClass('d-none');



		// 	} else {
		// 		//hide start date time section
		// 		if (!$('#sdt_container_trans').hasClass()) {
		// 			$('#sdt_container_trans').addClass('d-none');
		// 		}

		// 		//show start date section
		// 		$('#sd_container_trans').removeClass('d-none');

		// 	}
		// })

		//Onclick save button

		$("#save_transfusionService_trans").off().on('click', function() {
			//Get Relevant Data 
			//constants
			const eventTitle = $("#eventTitle_trans").val();
			const desc = $('#taskDec_trans').val();
			const task_duration = $('#taskDurationSelect_trans').val() * 60;
			// const freq_type = $('#taskFrequencySelect_trans').find(':selected').val();

			let start_time;
			let end_time;
			let eventArray = [];



			start_date = $('#startDateTime_prescriptionService_trans').val()
			//console.log(start_date);
			// start_time = '8:00:00'

			// const start_date_time = start_date;
			// console.log('start date time:' + start_date_time);

			end_date = moment(start_date).add(task_duration, 'minutes').format("YYYY-MM-DD HH:mm:ss");
			//console.log("end date for prescription:"+end_date);
			// end_time = moment.utc(start_date).add(task_duration, 'minutes').format('');

			// const end_date_time = "" + start_date + " " + end_time;


			const event = {
				'title': eventTitle,
				'task_desc': desc,
				'task_duration_in_minutes': task_duration,
				'start': moment(start_date).format("YYYY-MM-DD HH:mm:ss"),
				'end': end_date,
				// 'drug_administration_frequency_id': freq_type

			}
			eventArray.push(event);
			// console.log(eventArray);

			//Run ajax if array is not empty 
			if (eventArray.length != 0) {
				eventArray.sort((a, b) => {
					if(a.start > b.start) {
						return 1
					}
					return -1
				})
				//save values to database 
				$.ajax({

					type: "POST",
					data: {
						events: eventArray,
						site_location:$('#site_location_trans').val(),
						site_method:$('#site_method_trans').val()
					},
					url: \`<!-- php: = $this->Url->build(['controller' => 'patientVisitTransfusionTasks', 'action' => 'add']) -->/<!-- php: = $patient_visit_id -->/\${transfusion_id}\`
				}).done((data, textstatus, xhr) => {
					// console.log("add Infusion task done")
					// console.log(data)

					//find way to validate successful post request
					if (xhr.status == 200) {

						//reload MAR Section
						sheetTab();

						//Show Success Alertify
						alertify.success(data);
					} else {
						alertify.error(data);
					}

					//Reload page
					//window.location.reload()
				}).fail((data) => {
					// console.log("Add Infusion task fail")
					// console.log(data)

					alertify.error('Internal Server Error');
				})
			}
		})

	}

	function passPrescriptions() {

		$('#prescription_table').DataTable().destroy();
		$('#prescription_table').DataTable({
			"processing": true,
			"serverSide": true,
			"searching": false,
			"ordering": false,
			"paging": false,
			"ajax": \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedPrescriptions']) -->/<!-- php: = $selectedVisit->id -->/\${$('#prescription_filter').find(':selected').val()}\`,
			/*
			"ajax": {
				"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
				"error": function (xhr, error, thrown) {
					console.log( 'Error loading medication table' );
				}
			}
			*/
		});





	}

	function passSampleCollections() {

		$('#sampleCollection_table').DataTable().destroy();
		$('#sampleCollection_table').DataTable({
			"processing": true,
			"serverSide": true,
			"searching": true,
			"ordering": false,
			"dom": 'QBfrtip',
			"paging": false,
			"ajax": \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedSampleCollections']) -->/<!-- php: = $selectedVisit->id -->/\${$('#sampleCollection_filter').find(':selected').val()}\`,
			/*
			"ajax": {
				"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
				"error": function (xhr, error, thrown) {
					console.log( 'Error loading medication table' );
				}
			}
			*/
		});





	}

	function passPRN() {

		$('#prn_table').DataTable().destroy();
		$('#prn_table').DataTable({
			"processing": true,
			"serverSide": true,
			"searching": false,
			"ordering": false,
			"paging": false,
			"ajax": \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedMedicationPRN']) -->/<!-- php: = $selectedVisit->id -->/\${$('#prn_filter').find(':selected').val()}\`,
			/*
			"ajax": {
				"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
				"error": function (xhr, error, thrown) {
					console.log( 'Error loading medication table' );
				}
			}
			*/
		});





	}

	function passInfusions() {

		$('#infusions_table').DataTable().destroy();
		$('#infusions_table').DataTable({
			"processing": true,
			"serverSide": true,
			"searching": false,
			"ordering": false,
			"paging": false,
			"ajax": {
				"url": \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedInfusions']) -->/<!-- php: = $selectedVisit->id -->/\${$('#infusion_filter').find(':selected').val()}\`,
				"error": function(xhr, error, code) {
					console.log('Request infusion');
					// console.log(xhr, code)
				}
			}
			/*
			"ajax": {
				"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
				"error": function (xhr, error, thrown) {
					console.log( 'Error loading medication table' );
				}
			}
			*/
		});




	}
	function passTransfusions() {

		$('#transfusion_table').DataTable().destroy();
		$('#transfusion_table').DataTable({
			"processing": true,
			"serverSide": true,
			"searching": false,
			"ordering": false,
			"paging": false,
			"ajax": {
				"url": \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedTransfusions']) -->/<!-- php: = $selectedVisit->id -->/\${$('#infusion_filter').find(':selected').val()}\`,
				"error": function(xhr, error, code) {
					console.log('Request Transfusion Failed');
					// console.log(xhr, code)
				}
			}
			/*
			"ajax": {
				"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
				"error": function (xhr, error, thrown) {
					console.log( 'Error loading medication table' );
				}
			}
			*/
		});




	}
	function passMiscellaneous() {

		$('#miscellaneous_table').DataTable().destroy();
		$('#miscellaneous_table').DataTable({
			"processing": true,
			"serverSide": true,
			"searching": false,
			"ordering": false,
			"paging": false,
			"ajax": {
				"url": \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getMiscellaneousTasks']) -->/<!-- php: = $selectedVisit->id -->/\${$('#infusion_filter').find(':selected').val()}\`,
				"error": function(xhr, error, code) {
					console.log('Request Transfusion Failed');
					// console.log(xhr, code)
				}
			}
			/*
			"ajax": {
				"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
				"error": function (xhr, error, thrown) {
					console.log( 'Error loading medication table' );
				}
			}
			*/
		});




	}

	function toggle_inf_end_note(params) {
		let result = $("input[name='inf_status']:checked").val()
		// console.log("this is the result of the change",result)
		if(result != 3){
			$('#administer_volume_inf').removeAttr('required');
			$('#administer_rate_volume_inf').removeAttr('required');
			$('#administer_waste_volume_inf').removeAttr('required');
			$("#end_note_section").hide(500)
		}else {
			$("#end_note_section").show(500)
			$('#administer_volume_inf').attr('required', 'required');
			$('#administer_rate_volume_inf').attr('required', 'required');
			$('#administer_waste_volume_inf').attr('required', 'required');
		}
	}

	function getSiteMethods() {
		$.ajax({
				type: "GET",
				url: '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'siteMethods']) -->'
		}).done((data) => {
				result = ''
				if(Array.isArray(data.data)) {
						data.data.forEach(element => {
								result += \`<option value="\${element.id}">\${element.name}</option>\`
						});
				}
				$('.site_method').html(result)
				$('.site_method').selectpicker('refresh')
		}).fail((data) => {

		})
	}

	function getSiteLocation() {
		$.ajax({
				type: "GET",
				url: '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'siteLocations']) -->'
		}).done((data) => {
				//Logs
				result = ''
				
				if(Array.isArray(data.data)) {
						data.data.forEach(element => {
								result += \`<option value="\${element.id}">\${element.name}</option>\`
						});
				}
				$('.site_location').html(result)
				$('.site_location').selectpicker('refresh')
		}).fail((data) => {
				//Logs
				
		})
	}

	function setupMisc(params) {
				/**
		 * GET miscllaneous task and append to miscellaneous to dos 
		 * Using Ajax and Cake Php controller = getAll within the patientVistMiscellaneousTasksController 
		 */
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'patientVisitMiscellaneousTasks', 'action' => 'getTasks', $patient_visit_id]) -->"
		}).done((data) => {
			//Logs 
			// console.log('getAll miscellaneous task @ sheets done ')
			// console.log(data)

			const array = jQuery.parseJSON(data);

			//Append to total task section 
			$("#miscellaneousTaskTotal").text(array.length)

			//check data exisit
			if (data != null && array.length != 0) {


				//empty to do list 
				$('.miscellaneous-task-list').empty();


				//Loop through the data 
				$.each(array, function(key, value) {


				})
			} else {
				//Empty to dos
				$('.miscellaneous-task-list').empty();

				//Append the data to To dos
				$('.miscellaneous-task-list').append(\`<li style="width:90%;"><div  style="font-size: 12px; padding: 2px 2px 8px 8px; margin-bottom: 2px;"><br><div class="row col-md-12 "><span class="" style="font-size: 8px;margin-right: 10px;"></span><span style="font-weight: bold; font-size: 15px;">No Task Available</span> <br></div></div></li>\`)

			}

		}).fail((data) => {
			//Logs
			// console.log('getAll miscellaneous task @ sheets fail')
			// console.log(data)
			alertify.error("An error Occured")
		})
	}

	function sheetTab() {


		/***********************SET UP SHEET TAB*******************/

		//Set up MAR 
		setupMAR();

		//Set Accordions 
		//Prescriptions 
		passPrescriptions();

		//PRN
		passPRN();


		//Infusions
		passInfusions();
		passTransfusions();

		//Sample Collection
		passSampleCollections();

		// Misc
		setupMisc()
		passMiscellaneous()

		//get Site Methods And Locations
		getSiteMethods()
    getSiteLocation()


	}

	function recordSampleCollectionPeakLevel(id,collection_type,med_type, col_id) {
		$.ajax({
			type: 'GET',
			url: \`<!-- php: = $this->Url->build(['controller' => 'PeakLevels', 'action' => 'get']) -->/\${id}\`
		}).done((data) => {
			//logs 
			// console.log('Get Sample collection Trough level record Modal Done');
			// console.log(data);


			//function to set up View modal for Sample collection accordion
			setupSampleCollectionRecordModal(jQuery.parseJSON(data)[0], collection_type,med_type, col_id);
		}).fail((data) => {
			//logs 
			// console.log('Get Sample collection Trough level record Modal Failed');
			alertify.error("An error Occured")
			// console.log(data);
		})
	}
</script>

`;

export default function ElementElementPatientvisitSheets() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
