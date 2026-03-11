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
		.problemsCard-1 {
			border-color: #B9FFF8;
		}

		.historyCard {
			border-color: #6c757d;
		}
		.historyCard-1 {
			border-color: #EBC7E8;
		}
		.historyCard-2 {
			border-color: #F94892;
		}
		.historyCard-3 {
			border-color: #90B77D;
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
		.historyCard-2 .card-header {
			background: #F94892 ;
			font-weight: bold;
			border-radius: 10px;
		}
		.historyCard-3 .card-header {
			background: #90B77D;
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
		.problemsCard-1 .card-header {
			background: #B9FFF8;
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
				<span class="caption-subject font-dark bold uppercase mr-5">Current Anaesthesia</span>
        <SearchableSelectField style="width:100%" data-max-options="1" class="form-control selectpicker show-menu-arrow show-tick col-md-2" data-size="4" name="" id="select_current_anaesthesia" 
          title="Select Field" data-live-search="true" data-style="bg-white" onchange="getCurrAnaesthesia(this, event)" multiple>
          <option value="pre_anaesthesia_evaluation">Immediate Preanesthesia Assessment and Evaluation</option>
          <option value="equipment">Anaesthesia Equipment - Safety Check</option>
          <option value="monitors">Monitors</option>
          <option value="anaesthesia_technique">Anaesthesia Technique</option>
          <option value="airway_management">Airway Management</option>
          <option value="comment_notes">Comments / Notes</option>
          <option value="pacu_transport">Transport to PACU/ICU</option>
          <option value="ventilation_mode">Ventilation Mode and Rate</option>
          <option value="Patient_protection">Patient Protection</option>
          <option value="plan_anaesthesia_care">Plan of Anaesthesia Care and Informed Consent</option>
        </SearchableSelectField>
			</div>
		</div>


		<div class="borderBox-body clinicalMain">

			<div class="row">

				<div class="col-md-6 stylish-card-section">

					<div class="col-md-12" id="pre_anaesthesia_evaluation">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard with-transform">
							<div class="card-header ">Immediate Preanesthesia Assessment and Evaluation<span class="float-right"></span> </div>
							<div class="card-body">
								<div class="row">
									<textarea id="assessment_evaluation" class="form-control notesEditor" rows="5"></textarea>
									<div class="mt-3">
										<a href="javascript:;" class="btn btn-sm btn-success float-right mr-4 closeBtn"> Reset</a>
										<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-3 resetBtn"> Save</a>
									</div>
								</div>

							</div>
						</div>						
						<!--//medication card-->
					</div>
					<div class="col-md-12" id="equipment">
						<!---medication card-->
            <div class="card bg-light mb-3 medicationCard-2 with-transform">
							<div class="card-header ">Anaesthesia Equipment - Safety Check<span class="float-right"></span> </div>
							<div class="card-body">
								<div class="form-group row">
									<label class="control-label col-md-6">Medical Equipment 1 (CD - 1056)
										<span class="required"> * </span>
									</label>
									<div class="col-md-6">
										<label class="switchToggle">
											<input name="bundled_service" type="checkbox" checked="checked" id="">
											<span class="slider green round"></span>
										</label>
									</div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-6">Medical Equipment 2 (CD - 1056)
										<span class="required"> * </span>
									</label>
									<div class="col-md-6">
										<label class="switchToggle">
											<input name="bundled_service" type="checkbox" checked="checked" id="">
											<span class="slider green round"></span>
										</label>
									</div>
								</div>

							</div>
						</div>				
						<!--//medication card-->
					</div>
					<div class="col-md-12" id="monitors">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard-3 with-transform">
							<div class="card-header ">Monitors<span class="float-right"></span> </div>
							<div class="card-body">
								<div class="form-group row">
                  <label class="control-label col-md-4">Electrocardiogram (EKG) • Blood pressure
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Temperature
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Pulse oximeter
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">End-tidal carbon dioxide
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Oxygen/agent
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">EKG leads monitored, computerised ST
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">segment analysis, EKG rhythm rate, diagnostic criteria used to assess ST segment deviation
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Spirometer
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Neuromuscular blockade monitor
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Depth of anaesthesia monitor
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Precordial, esophageal stethoscope
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Intracranial pressure
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Central venous pressure, pulmonary artery
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">pressure, SvO2
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Doppler
                  </label>
									<ul class="col-md-8">
									</ul>
                </div>
							</div>
						</div>
						
						<!--//medication card-->
					</div>

					<div class="col-md-12" id="anaesthesia_technique">
						<div class="card bg-light mb-3 allergyCard with-transform ">
							<div class="card-header ">Anaesthesia Technique<span class="float-right"></span> </div>
							<div class="card-body pl-3">
								<div class="form-group row">
                  <label class="control-label col-md-4">Technique
                  </label>
									<ul class="col-md-8">
										<li>General</li>
										<li>Regional</li>
										<li>Monitored anaesthesia care  </li>
										<li>Other</li>
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">Mode of drug administration
                  </label>
									<ul class="col-md-8">
										<li>General</li>
									</ul>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-4">
                  </label>
									<ul class="col-md-8">
										<button class="btn btn-xs btn-primary">View Image</button>
										When real-time image guidance is used, an image of needle placement is placed in the patient record
									</ul>
                </div>                             
							</div>
						</div>
					</div>

					<div class="col-md-12" id="airway_management">
						<div class="card bg-light mb-3 historyCard-1 with-transform ">
							<div class="card-header ">Airway Management<span class="float-right"></span> </div>
							<div class="card-body pl-3">
              Natural
              o Oral airway size
              o Nasal airway size and nare
              • Mask
              • Supraglottic airway
              o Size
              o Condition of teeth, lips 
              o Minimum leak cuff
              • Endotracheal tube
              o Oral, nasal, double lumen
              o Endotracheal tube size and type
              o Cuffed, uncuffed
              o Laryngoscope – blade type and size o Technique: direct vision, blind,
              fiber optic
              o Glottic visualisation
              Verification of placement: 
              Breath sounds
              EtCO2
              cm at lip/teeth
              Cuff inflated with: air, saline, other
              Condition of teeth, lips
              Awake, asleep
              Topicalization
              Difficult airway management
              techniques/equipment
							</div>
						</div>
					</div>
					<div class="col-md-12" id="comment_notes">
						<div class="card bg-light mb-3 historyCard-2 with-transform ">
							<div class="card-header ">Comments / Notes<span class="float-right"></span> </div>
							<div class="card-body pl-3">
								<div class="row pl-2 pr-2">
									<textarea id="comments_notes" class="form-control notesEditor" rows="5"></textarea>
									<div class="mt-3">
										<a href="javascript:;" class="btn btn-sm btn-success float-right mr-4 closeBtn"> Reset</a>
										<a href="javascript:;" class="btn btn-sm btn-danger float-right mr-3 resetBtn"> Save</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-12" id="pacu_transport">
						<div class="card bg-light mb-3 historyCard-3 with-transform ">
							<div class="card-header ">Transport to PACU/ICU<span class="float-right"></span> </div>
							<div class="card-body pl-3">

								<div class="form-group row">
                  <label class="control-label col-md-6 bold">Level of consciousness:
                  </label>
									<div class="col-md-6">
										12
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-6 bold">Monitor (e.g., EKG, arterial line, SpO2):
                  </label>
									<div class="col-md-6">
										Reading
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-6 bold">Type of oxygen delivery device:
                  </label>
									<div class="col-md-6">
										
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-6 bold">Delivery Device Position:
                  </label>
									<div class="col-md-6">
										Nose
									</div>
                </div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-6 stylish-card-section">

					<div class="col-md-12" id="ventilation_mode">
						<!--Problems Card-->
						<div class="card bg-light mb-3 problemsCard with-transform" style="min-height: 370px;">
							<div class="card-header  ">Ventilation Mode and Rate<span class="float-right"></span>
							</div>
							<div class="card-body">
								<div class="form-group row">
                  <label class="control-label col-md-5">Spontaneous rate:
                  </label>
								<div class="col-md-7">
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-5">Assisted rate:
                  </label>
									<div class="col-md-7">
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-5">Pressure support ventilation (PSV):
                  </label>
									<div class="col-md-7">
										<div class="row">
											<div class="col-md-6">Rate</div>
											<div class="col-md-6" id="">  </div>
										</div>
										<div class="row">
											<div class="col-md-6">Pressure Support Level</div>
											<div class="col-md-6" id=""></div>
										</div>
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-5">Mechanical ventilation mode [volume
                (VCV) or pressure controlled ventilation (PCV)]:
                  </label>
									<div class="col-md-7">
										<div class="row">
											<div class="col-md-6">Rate</div>
											<div class="col-md-6" id="">  </div>
										</div>
										<div class="row">
											<div class="col-md-6">Parameters are specific for ventilation
												mode
											</div>
											<div class="col-md-6" id=""></div>
										</div>
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-5">Positive end expiratory pressure (PEEP):
                  </label>
									<div class="col-md-7">
									</div>
                </div>
								<div class="form-group row">
                  <label class="control-label col-md-5">Continuous positive airway pressure (CPAP):
                  </label>
									<div class="col-md-7">
									</div>
                </div>
              </div>
						</div>
						<!--//Problems Card-->

					</div>

					<div class="col-md-12" id="Patient_protection">
						<!--Problems Card-->
						<div class="card bg-light mb-3 problemsCard-1 with-transform" style="min-height: 370px;">
							<div class="card-header  ">Patient Protection<span class="float-right"></span>
							</div>
							<div class="card-body">
								Position of patient and bed 
                Position changes
                Use of bed extensions, positioning belts
                Pressure points, plexus protection, alignment of extremities, head, and neck
                Who positioned the patient, type of position used
                Placement and type of eye protection (e.g., eyelids taped closed prior to laryngoscopy, protective goggles, laser eye glasses)
                Dressing and securing of monitoring lines
                Other


              </div>
						</div>
						<!--//Problems Card-->

					</div>


					<div class="col-md-12" id="plan_anaesthesia_care">
						<!--History card-->
						<!-- <div class="card bg-light mb-3 historyCard with-transform " style="min-height: 370px;">
							<div class="card-header ">Plan of Anaesthesia Care and Informed Consent <span class="float-right"></span></div>
							<div class="card-body">
                Physician(s) Signature(s) Date and Time
              </div>
						</div> -->
						<!--//History card-->

					</div>

				</div>

			</div>

		</div>

	</div>



</div>

	<!--Editor JS-->
	<!--Actually ck editor 5-->
	<!-- php: =$this->Html->script('../assets/js/editor.js') -->
<script>
  function getCurrAnaesthesia(ele, event) {
    let val = $(ele).val();
    let options = ["pre_anaesthesia_evaluation", "equipment", "monitors", "anaesthesia_technique", "airway_management", "comment_notes", "pacu_transport", "ventilation_mode", "Patient_protection", "plan_anaesthesia_care"]
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

	$('.notesEditor').each(function() {

		ClassicEditor.create(document.querySelector(\`#\${$(this).attr('id')}\`), {
			placeholder: 'Type some text here...'
		})

	})
</script>
`;

export default function ElementElementRequestSurgeriesCurrentAnaesthesia() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
