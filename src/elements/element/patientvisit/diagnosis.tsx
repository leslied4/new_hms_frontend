const rawHtml = `
<style>
	/* Ck Editor Textbox*/

	.ck-editor__editable {
		width: 100%;
		height: 200px;
	}

	#info-block section {
		border-radius: 15px 15px 15px 15px;
		font-size: 16px;
	}

	.file-marker>div {
		padding: 0 3px;
		min-height: 100px;
		margin-top: -0.8em;

	}

	.box-title {
		display: inline-block;
		padding: 0 2px;
		margin-left: 8em;
		background: white;
		font-size: 16px;
	}

	.stylish_checkbox {
		cursor: pointer;
		color: #383A3F;
		display: block;
		margin-bottom: 10px;
		font-size: 1.2em;
	}

	.stylish_checkbox input[type="checkbox"]+.label-text:hover:before {
		color: #fe4365;
	}

	.stylish_checkbox input[type="checkbox"] {
		display: none;
	}

	.stylish_checkbox input[type="checkbox"]+.label-text:before {
		content: "\f096";
		color: #dddfe6;
		font-family: "fontAwesome";
		line-height: 1;
		width: 1em;
		display: inline-block;
		margin-right: 5px;
	}

	.stylish_checkbox input[type="checkbox"]:checked+.label-text:before {
		content: "\f14a";
		color: #fe4365;
		animation: tick 150ms ease-in;
	}

	.stylish_checkbox input[type="checkbox"]:disabled+.label-text:before {
		content: "\f0c8";
		color: #dddfe6;
	}

	@keyframes tick {
		0% {
			transform: scale(0);
		}

		90% {
			transform: scale(1.3);
		}

		100% {
			transform: scale(1);
		}
	}

	/** card plan stylish-accordions**/
	.stylish-accordion {
		min-width: 700px;
		max-width: 100%;
		margin: 50px auto;

		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.stylish-accordion .item {
		box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
		padding: 15px;
		cursor: pointer;
		display: grid;
		grid-template-columns: auto 1fr auto;
		column-gap: 24px;
		row-gap: 32px;
		border-top: 4px solid transparent;
		align-items: center;
		transition: border-top 0.3s;
	}

	.stylish-accordion .item.open {
		border-top: 4px solid #087f5b;
	}

	.stylish-accordion .item.open .hidden-box {
		display: block;
	}

	.stylish-accordion .item.open .text {
		color: #087f5b;
	}

	.stylish-accordion .number {
		color: #ced4da;
	}

	.stylish-accordion .number,
	.stylish-accordion .text {
		font-size: 24px;
		font-weight: 500;
	}

	.stylish-accordion .item.open .text {
		transition: color 0.3s;
	}

	.stylish-accordion .icon {
		width: 24px;
		height: 24px;
		stroke: #087f5b;
		transition: transform 0.5s ease-in;
	}

	.stylish-accordion .item.open .icon {
		transform: rotate(180deg);
	}

	.stylish-accordion .hidden-box {
		grid-column: 2;
		display: none;
		transition: display 0.5 ease-in;
	}

	.stylish-accordion .hidden-box p {
		line-height: 1.6;
		margin-bottom: 24px;
	}



	/********Tab content*********/




	.tab_section a.active {
		border-bottom: 2px solid #55c57a
	}

	.tab_section .nav-link {
		color: rgb(110, 110, 110);
		font-weight: 500
	}

	.tab_section .nav-link:hover {
		color: #55c57a
	}



	.tab_section .nav-pills .nav-link.active {
		color: black;
		background-color: white;
		border-radius: 0.5rem 0.5rem 0 0;
		font-weight: 600
	}

	.tab_section .tab-content {
		padding-bottom: 1.3rem
	}

	.tab_section .form-control {
		background-color: rgb(241, 243, 247);
		border: none
	}

	.tab_section span {
		margin-left: 0.5rem;
		padding: 1px 10px;
		color: white;
		background-color: rgb(143, 143, 143);
		border-radius: 4px;
		font-weight: 600
	}

	.tab_section .third {
		padding: 0 1.5rem 0 1.5rem
	}

	.tab_section label {
		font-weight: 500;
		color: rgb(104, 104, 104)
	}

	.tab_section .btn-success {
		float: right
	}

	.tab_section .form-control:focus {
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 7px rgba(0, 0, 0, 0.2)
	}

	.tab_section select {
		-webkit-appearance: none;
		-moz-appearance: none;
		text-indent: 1px;
		text-overflow: ""
	}

	.tab_section ul {
		list-style: none;
		margin-top: 1rem;
		padding-inline-start: 0
	}

	.tab_section .search {
		padding: 0 1rem 0 1rem
	}

	.tab_section .ccontent li .wrapp {
		padding: 0.3rem 1rem 0.001rem 1rem
	}

	.tab_section .ccontent li .wrapp div {
		font-weight: 600
	}

	.tab_section .ccontent li .wrapp p {
		font-weight: 360
	}

	.tab_section .ccontent li:hover {
		background-color: rgb(117, 93, 255);
		color: white
	}

	.tab_section .addinfo {
		padding: 0 1rem
	}


	/************Table within accordion***********/



	.widget-subheading {
		color: #858a8e;
		font-size: 10px
	}

	.card-header.card-header-tab .card-header-title {
		display: flex;
		align-items: center;
		white-space: nowrap
	}

	.card-header .header-icon {
		font-size: 1.65rem;
		margin-right: 0.625rem
	}

	.card-header.card-header-tab .card-header-title {
		display: flex;
		align-items: center;
		white-space: nowrap
	}

	.btn-actions-pane-right {
		margin-left: auto;
		white-space: nowrap
	}

	.text-capitalize {
		text-transform: capitalize !important
	}

	.scroll-area-sm {
		height: 288px;
		overflow-x: hidden
	}

	.list-group-item {
		position: relative;
		display: block;
		padding: 0.75rem 1.25rem;
		margin-bottom: -1px;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.125)
	}

	.list-group {
		display: flex;
		flex-direction: column;
		padding-left: 0;
		margin-bottom: 0
	}

	.todo-indicator {
		position: absolute;
		width: 4px;
		height: 60%;
		border-radius: 0.3rem;
		left: 0.625rem;
		top: 20%;
		opacity: .6;
		transition: opacity .2s
	}

	.bg-warning {
		background-color: #f7b924 !important
	}

	.widget-content {
		padding: 1rem;
		flex-direction: row;
		align-items: center
	}

	.widget-content .widget-content-wrapper {
		display: flex;
		flex: 1;
		position: relative;
		align-items: center
	}

	.widget-content .widget-content-right.widget-content-actions {
		visibility: hidden;
		opacity: 0;
		transition: opacity .2s
	}

	.widget-content .widget-content-right {
		margin-left: auto
	}

	.btn:not(:disabled):not(.disabled) {
		cursor: pointer
	}

	.btn {
		position: relative;
		transition: color 0.15s, background-color 0.15s, border-color 0.15s, box-shadow 0.15s
	}

	.btn-outline-success {
		color: #3ac47d;
		border-color: #3ac47d
	}

	.btn-outline-success:hover {
		color: #fff;
		background-color: #3ac47d;
		border-color: #3ac47d
	}

	.btn-outline-success:hover {
		color: #fff;
		background-color: #3ac47d;
		border-color: #3ac47d
	}

	.btn-primary {
		color: #fff;
		background-color: #3f6ad8;
		border-color: #3f6ad8
	}

	.btn {
		position: relative;
		transition: color 0.15s, background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
		outline: none !important
	}

	.card-footer {
		background-color: #fff
	}

	/* The animation code */
	@keyframes animate-prescription-treatment {
		from {color: red;}
		to {color: blue;}
	}

	/* The element to apply the animation to */
	#treat-with-prescription {
		color: red;
		animation-name: animate-prescription-treatment;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}

	.arrow-diag {
		position: absolute;
		/* top: 50%;
		left: 50%; */
		transform: translate(-50%, -50%);
		transform: rotate(360deg);
		cursor: pointer;
	}

	.arrow-diag span {
		display: block;
		width: 1vw;
		height: 1vw;
		border-bottom: 5px solid green;
		border-right: 5px solid green;
		transform: rotate(45deg);
		margin: -10px;
		animation: animate-care-plan-note 2s infinite;
	}

	.arrow-diag span:nth-child(2) {
		animation-delay: -0.2s;
	}

	.arrow-diag span:nth-child(3) {
		animation-delay: -0.4s;
	}

	@keyframes animate-care-plan-note {
		0% {
			opacity: 0;
			transform: rotate(45deg) translate(-20px, -20px);
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: rotate(45deg) translate(20px, 20px);
		}
	}
</style>
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title ">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">DIAGNOSIS</span>
			</div>

		</div>

		<div class="borderBox-body">
			<div class="">
				<!-- php: if (true) { -->
				<div class="tab-pane diagnoses_add_diagnosis " id="borderBox_tab7">
					<div class="row">

						<div class="card-body ">

							<div class="row mt-4 pl-3">
								<a class="btn btn-sm text-slate-900 mr-2" style="background-color: #6c5ce7;"
									data-toggle="modal" data-target="#exampleModalCenter">Diagnosis Details History</a>
							</div>
							<div class="table">
								<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitDiagnoses', 'action' => 'add', $selectedVisit->patient_id, $selectedVisit->id], 'id' => 'diagnoses', 'class' => 'row']); -->
								<table class="table table-hover order-column full-width" id="patient_diagnosis_table" style="width: 100%">
									<thead>
										<tr>
											<th class="left"> Date</th>
											<th class="left"> Doctor's Diagnosis</th>
											<th class="left"> ICD-10 </th>
											<th class="left"> Actions </th>
										</tr>
									</thead>
									<tbody></tbody>
									<!-- php: if($isCurrentVisit): -->
										<tfoot>
											<tr>
												<td></td>
												<td>
													<textarea placeholder="Summarize Diagnosis" style=""
														class="form-control text-area" name="diagnosis_text"
														id="diagnosis_text" rows="4" cols="4"></textarea>
												</td>
												<td>
													<div class="row">
														<div class="mb-2 ml-3">
															<button type="button" class="btn btn-outline-danger" id="btn-outline-primary">Primary</button>
															<button type="button" class="btn btn-outline-success" id="btn-outline-success">Provisional</button>
															<button type="button" class="btn btn-outline-warning" id="btn-outline-warning">Differential </button>
															<button type="button" class="btn btn-outline-secondary" id="btn-outline-secondary">Other</button>
														</div>
														<div class="col-md-8" id="primary-div" hidden>
															<SearchableSelectField style="width:100%" data-max-options="1"
																data-width="100%"
																class="form-control selectpicker show-menu-arrow show-tick"
																data-size="4" name="primary_diagnosis_ids[]"
																id="primary_diagnosis_id" title="Select Primary Diagnosis"
																data-live-search="true" data-style="bg-white"
																onchange="diseaseType(this, event)" multiple>
															</SearchableSelectField>
															<div class="" style="display:none" id="chronic_status">
																<div id="prescription_form_priority">
																	<div class="form-check form-check-inline">
																		<input class="form-check-input" type="radio"
																			name="ill_episode" id="stat_radio"
																			value="chronic" checked>
																		<label class="form-check-label"
																			for="stat_radio"><span
																				class="badge rounded-pill"
																				style="background-color: #d63031;">Chronic</span>
																		</label>
																	</div>
																	<div class="form-check form-check-inline">
																		<input class="form-check-input" type="radio"
																			name="ill_episode" id="routine_radio"
																			value="acute">
																		<label class="form-check-label"
																			for="routine_radio"><span
																				class="badge rounded-pill"
																				style="background-color: #0984e3;">Acute</span>
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-md-8" id="provisional-div" hidden>
															<SearchableSelectField style="width:100%" data-width="100%"
																class="form-control selectpicker show-menu-arrow show-tick"
																data-size="4" name="provisional_diagnosis_ids[]"
																id="provisional_diagnosis_id"
																title="Select Provisional Diagnosis" data-live-search="true"
																data-style="bg-white" multiple>
															</SearchableSelectField>
														</div>
														<div class="col-md-8" id="differential-div" hidden>
															<SearchableSelectField style="width:100%" data-width="100%"
																class="form-control selectpicker show-menu-arrow show-tick"
																data-size="4" name="differential_diagnosis_ids[]"
																id="differential_diagnosis_id"
																title="Select Differential Diagnosis"
																data-live-search="true" data-style="bg-white" multiple>
															</SearchableSelectField>
														</div>
														<div class="col-md-8" id="other-div" hidden>
															<SearchableSelectField style="width:100%" data-width="100%"
																class="form-control selectpicker show-menu-arrow show-tick"
																data-size="4" name="other_diagnosis_ids[]"
																id="other_diagnosis_id" title="Select Other Diagnosis"
																data-live-search="true" data-style="bg-white" multiple>
															</SearchableSelectField>
														</div>
													</div>
												</td>
												<td>
													<div class="full-width"><button type="submit" class="btn btn-info"
															style="width:75%" id="submit">Add</button></div>
													<div class="full-width"><button type="button" class="btn btn-danger"
															style="width:75%" onclick="clearDiagnosisInput()">Reset</button>
													</div>
												</td>
											</tr>

										</tfoot>
									<!-- php: endif; -->
								</table>
								<!-- php: = $this->Form->end(); -->
							</div>
							<div class="modal fade" id="selectFurtherNotes" tabindex="-1" role="dialog"
								aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Further Notes
											</h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">

											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create(null, ['class' => 'form-horizontal', 'onsubmit' => "return assignFurtherNote(event)"]) -->
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-3">Type
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-9">
																			<!-- php: = $this->Form->select( 'note_preference', ['clinical_summary' => 'Clinical Summary', 'procedure_ids' => 'Procedure'], ['required' => true, 'class' => 'form-control input-height', 'onchange' => 'preferenceCheck(this)'] ); -->
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-3">Note
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-9">
																			<!-- php: = $this->Form->textarea( 'cnotes', ['required' => false, 'class' => "form-control textarea", 'id' => "clinical_summary_notes"] ); -->
																			<div style="display:none"
																				id="procedure_ids_notes">
																				<SearchableSelectField
																					class="form-control input-height selectpicker show-menu-arrow show-tick"
																					data-size="5"
																					title="Indicate the procedure"
																					name="pnotes" id="pnotesId"
																					data-live-search="true" multiple>
																				</SearchableSelectField>
																			</div>
																		</div>
																	</div>

																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="submit"
																				class="btn btn-info">Apply</button>
																			<button type="button" class="btn btn-default"
																				data-dismiss="modal">Cancel</button>
																		</div>
																	</div>
																</div>
															<!-- php: = $this->Form->end() -->
														</div>
													</div>
												</div>
											</div>


											<div style="margin-top: 40px;" id="previous_principal_diagnoses_button">
												<div style="float: right;">
													<a class="btn btn-sm btn-success"
														onclick="javascript:$('#previous_principal_diagnoses').toggle(500); moveToId('previous_principal_diagnoses_button');">View
														Previous Principal Diagnoses
													</a>
												</div>
												<div style="clear: both;"></div>
											</div>
										</div>
									</div>
								</div>

								<div style="margin-top: 40px;" id="previous_principal_diagnoses_button">
									<div style="float: right;">
										<a class="btn btn-sm btn-success"
											onclick="javascript:$('#previous_principal_diagnoses').toggle(500); moveToId('previous_principal_diagnoses_button');">View
											Previous Principal Diagnoses
										</a>
									</div>
									<div style="clear: both;"></div>
								</div>

								<div id="previous_principal_diagnoses" style="display: none;">

								</div>
							</div>

						</div>	

						<!--Card Plan-->
						<div class="row col-md-12">
							<div class="col-md-12 px-5">
								<div class="stylish-accordion" id="stylish-accordion-div">

								</div>
							</div>
						</div>


						<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
							aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="exampleModalLongTitle">Diagnosis History</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body" id="current_history_modal">

									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary"
											data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>


						<!--Stuff below-->
						<div class="row col-md-12 px-5">
							<div class="col-md-4 col-sm-12">
								<h3>Please Note</h3>
								<div>
									Cant find a diagnoses? Click button below to add it create a new one
									<div style="padding-bottom: 10px">
										<a href="javascript:" type="button" class="btn btn-primary" data-toggle="modal"
											data-target="#newDiagnoseDialog">Add New Diagnoses</a>
									</div>
									<br />
									--- OR ---
									<br />
									Search from available diagnoses
									<div style="padding-bottom: 10px">
										<a href="javascript:" type="button" class="btn btn-primary" data-toggle="modal"
											data-target="#existingDiagnoseDialog">Search Diagnoses</a>
									</div>
								</div>
							</div>


							<div class="modal fade" id="newDiagnoseDialog" tabindex="-1" role="dialog"
								aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title" id="exampleModalLongTitle">Add a New Diagnoses</h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>

										<div class="modal-body">

											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>New Diagnoses Form</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitDiagnoses', 'action' => 'addDiagnoses', 'activeTab' => 'diagnoses'], 'class' => 'form-horizontal']) -->
															<div class="form-body">
																<div class="form-group row">
																	<label class="control-label col-md-5">Name
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<input type="text" name="name" data-required="1"
																			placeholder="Short name for diagnoses"
																			class="form-control input-height"
																			required />
																	</div>
																</div>
																<div class="form-group row">
																	<label class="control-label col-md-5">Code
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<input type="text" name="code" data-required="1"
																			placeholder="ICD Code for diagnoses"
																			class="form-control input-height"
																			required />
																	</div>
																</div>
																<div class="form-group row">
																	<label class="control-label col-md-5">Description
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<input type="text" name="long_name"
																			data-required="1"
																			placeholder="Long for diagnoses"
																			class="form-control input-height"
																			required />
																	</div>
																</div>
															</div>
															<div class="form-actions">
																<div class="row">
																	<div class="offset-md-3 col-md-9">
																		<button type="submit"
																			class="btn btn-info">Submit</button>
																		<button type="button"
																			class="btn btn-default">Cancel</button>
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

							<div class="modal fade" id="existingDiagnoseDialog" tabindex="-1" role="dialog"
								aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title" id="searchDiagnosesDialogTitle">Search Existing
												Diagnoses Database</h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">

											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitDiagnoses', 'action' => 'addDiagnosesFromLocalStore'], 'class' => 'form-horizontal']) -->
															<div class="form-body">
																<div class="form-group row">
																	<label class="control-label col-md-4">Name / ICD10
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-8">
																		<input type="text" id="search_diagnosis"
																			name="name" data-required="1"
																			placeholder="Enter Name or ICD10"
																			class="form-control input-height" />
																	</div>
																</div>

																<div class="row">
																	<div class="offset-md-3 col-md-9">
																		<button type="button" class="btn btn-info"
																			onclick="javascript:searchDiagnosis()">Search</button>
																	</div>
																</div>

																<hr />

																<div class="row">
																	<div class="col-md-12">
																		<p id="result_label"
																			style="text-align: center; color: #119">
																			Search results</p>
																	</div>
																</div>

																<div class="form-group row">
																	<label class="control-label col-md-4">Diagnoses /
																		ICD10
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-8">
																		<SearchableSelectField id="found_diagnosis_list"
																			name="found_diagnoses_ids[]"
																			data-placeholder="Select Diagnoses List"
																			class="form-control selectpicker" multiple
																			required>
																			<option>Select Diagnoses
																			<option>
																		</SearchableSelectField>
																	</div>
																</div>

																<hr />

																<div class="row">
																	<div class="offset-md-3 col-md-9">
																		<button type="submit"
																			class="btn btn-success">Add to Diagnoses
																			List</button>
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
				<!-- php: } -->
			</div>
		</div>
	</div>
</div>

<script>
	const setPrimaryDiagnosis = '<!-- php: = isset($selectedVisit -> primary_diagnosis_id) -->'
	const selectVisitDiagnosis = '<!-- php: = $selectedVisit->id -->'

	const continuousCareDiagnosis = '<!-- php: = $continuousCare -->'
	const currentVisitDiagnosis = '<!-- php: = ($isCurrentVisit) -->'

	const searchDiagnosis_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'getDiagnosesFromLocalStore']) -->/"
	const generateDiagnosisTable_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllPatientVisitDiagnosis' : 'getPatientVisitDiagnosis', $patient->id, $selectedVisit->id, '?' => ['_location' => 'diagnosis']]) -->"
	const editDiagnoses_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'editDiagnoses']) -->/\`
	const PatientVisitDiagnosesDelete_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'delete']) -->/\`
	const getProcedureOfDiagnoses_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getProcedureFromDuplicateGdrgs']) -->"
	const performSuggestedProcedure_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getProceduresAndPrices' ] ); -->"
	const requestCarePlan_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitDiagnosis', $patient->id, $selectedVisit->id, '?' => ['_location' => 'diagnosis']]) -->"
	const populateStandardDiagnosis_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getStandardDiagnosis']) -->"

</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/diagnosis.js') -->
`;

export default function ElementElementPatientvisitDiagnosis() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
