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
				<span class="caption-subject font-dark bold uppercase mr-5">Post Anaesthesia</span>
        <SearchableSelectField style="width:100%" data-max-options="1" class="form-control selectpicker show-menu-arrow show-tick col-md-2" data-size="4" name="" id="select_current_anaesthesia" 
          title="Select Field" data-live-search="true" data-style="bg-white" onchange="getPostAnaesthesia(this, event)" multiple>
          <option value="procedure_post">Procedure</option>
          <option value="health_history_post">Health History </option>
          <option value="anaesthesia_post">Anaesthesia</option>
        </SearchableSelectField>
			</div>
		</div>


		<div class="borderBox-body clinicalMain">

			<div class="row">

				<div class="col-md-6 stylish-card-section">

					<div class="col-md-12" id="procedure_post">
						<!---medication card-->
						<div class="card bg-light mb-3 medicationCard with-transform">
							<div class="card-header ">Procedure<span class="float-right"></span> </div>
							<div class="card-body">

                              Procedure
                Anaesthesia professional(s)
                Surgeon/Proceduralist
                Position, if other than supine

							</div>
						</div>
						<!--//medication card-->
					</div>
					<div class="col-md-12" id="health_history_post">
						<!---medication card-->
            <div class="card bg-light mb-3 medicationCard-2 with-transform">
							<div class="card-header ">Health History <span class="float-right"></span> </div>
							<div class="card-body">
                              Preoperative vital signs
                Pertinent health and medication history
                Physical status score
                Preoperative cognitive function
                Extremity restrictions, preoperative level of Activity

							</div>
						</div>
						<!--//medication card-->
					</div>

          
				</div>
        
				<div class="col-md-6 stylish-card-section">
          <div class="col-md-12" id="anaesthesia_post">
            <div class="card bg-light mb-3 allergyCard with-transform ">
              <div class="card-header ">Anaesthesia<span class="float-right"></span> </div>
              <div class="card-body pl-3">
                Admit Status and details including ward/bed - Ambulatory Surgery, Plan to Discharge Same day (AS SD), Plan to discharge next day (AS ND). Inpatient, InPatient One Day Prior to Surgery
              </div>
            </div>
          </div>


				</div>

			</div>

		</div>

	</div>



</div>


<script>
  function getPostAnaesthesia(ele, event) {
    let val = $(ele).val();
    let options = ["procedure_post", "health_history_post", "anaesthesia_post"]
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
</script>
`;

export default function ElementElementRequestSurgeriesPostAnaesthesia() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
