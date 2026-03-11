const rawHtml = `
<style>
    /****New prescription table***/
    .new_prescription_table ul li {
        list-style-type: square;
    }

    /**stylish accordions**/
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

    .stylish-accordion .item.open .accordion-text {
        color: #087f5b;
    }

    .stylish-accordion .accordion-number {
        color: #ced4da;
    }

    .stylish-accordion .accordion-number,
    .stylish-accordion .accordion-text {
        font-size: 24px;
        font-weight: 500;
    }

    .stylish-accordion .item.open .accordion-text {
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




    .has-error .bootstrap-select .btn {
        border-color: #f00;
    }

    .has-success .bootstrap-select .btn {
        border-color: #0f0;
    }

    button.btn.dropdown-toggle.btn-light {
        height: 35px;
    }



    /*Vitals Container */
    .vitals-container {
        padding: 30px;
        box-sizing: border-box;
    }

    .heading {
        text-align: center;
    }

    .heading__title {
        font-weight: 600;
    }

    .heading__credits {
        margin: 10px 0px;
        color: #888888;
        font-size: 25px;
        transition: all 0.5s;
    }

    .heading__link {
        text-decoration: none;
    }

    .heading__credits .heading__link {
        color: inherit;
    }

    /* CARDS */



    .vitals-container .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }



    .card__link,
    .card__exit,
    .card__icon {
        position: relative;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.9);
    }

    .card__link::after {
        position: absolute;
        top: 25px;
        left: 0;
        content: "";
        width: 0%;
        height: 3px;
        background-color: rgba(255, 255, 255, 0.6);
        transition: all 0.5s;
    }

    .card__link:hover::after {
        width: 100%;
    }

    .card__exit {
        grid-row: 1/2;
        justify-self: end;
    }

    .card__icon {

        font-size: 12px;
    }

    .card__title {
        grid-row: 1/4;
        font-weight: 400;
        color: #ffffff;
    }

    .card__apply {
        grid-row: 4/5;
        align-self: center;
    }



    /* RESPONSIVE */

    @media (max-width: 1600px) {
        .cards {
            justify-content: center;
        }
    }

    .vitalsCard {
        border-color: pink;

    }

    .vitalsCard .card-header {
        background: pink;
        font-weight: bold;
        border-radius: 10px;
    }


    .problemsCard .card-header {
        background: rgba(97, 175, 254, .2);
        font-weight: bold;
        border-radius: 10px;
    }
</style>

<!-- php: $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy->insurance_profile_id : -1; -->

<section>
    <div class="row stylish-card-section" style="width:100%">
        <div class="col-md-6">
            <div class="col-md-12">
                <!--Problems Card-->
                <div id="accordion">
                    <div class="card bg-light mb-3 problemsCard with-transform">
                        <div class="card-header">
                            Problems <span class="float-right"><a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> (All Active) </a></span>
                        </div>
                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">

                                <!-- Complaints -->
                                <span class="float-left text-primary">Complaints</span><span class="ml-2" id="complaint-action-span"></span><br>
                                <div class="">
                                    <!-- Set class d-none when live -->
                                    <div class="cc-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- ODQs -->
                                <span class="float-left text-primary">ODQs</span><span class="ml-2" id="odqs-action-span"></span><br>
                                <div class="">
                                    <!-- Set class d-none when live -->
                                    <div class="odqs-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- Comorbidity -->
                                <span class="float-left text-primary">Comorbidity</span><span class="ml-2" id="comorbidity-action-span"></span><br>
                                <div class="">
                                    <!-- Set class d-none when live -->
                                    <div class="comorbidities-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- Surgeries -->
                                <span class="float-left text-primary">Surgeries</span> <br>
                                <div class="">
                                    <!-- Set class d-none when live -->
                                    <div class="surgeries-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- Diagnosis -->
                                <span class="float-left text-primary">Diagnosis</span> <br>
                                <div class="">
                                    <div class="diagnoses-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <span class="float-left text-primary">Hospitalization/Procedures</span> <br>
                                <div class="pl-4">
                                    <div class="hospitalization-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- System review -->
                                <span class="float-left text-primary">System Review</span> <br>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <!--Vitals card-->
            <div class="col-md-12">
            <div class="accordion" id="vitalsAccordion">
                <div class="card bg-light mb-3 vitalsCard with-transform">
                    <div class="card-header" id="vitalsHeading">
                        Vitals <span class="float-right"> <a data-toggle="collapse" data-target="#vitalsCollapse" aria-expanded="true" aria-controls="vitalsCollapse"> (Last Entered) </a></span>
                    </div>

                    <div id="vitalsCollapse" class="collapse" aria-labelledby="vitalsHeading" data-parent="#vitalsAccordion">
                        <div class="card-body">
                            <p id="vitals_noneText" class="d-none">
                                <span class="bold">No Vitals Recorded</span>
                            </p>
                            <!--set class d-none when live-->
                            <div class="row" id="vitals_section">
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
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!--New Prescription section-->
<section style="margin-bottom: 50px; margin-top: 50px;">
    <h4 class="bold text-uppercase ml-3">New Prescriptions</h4>
    <div class="row pl-3 col-md-12 ">

        <input type="search" class="form-control" style="width: 30%; height: 100%; margin-left: auto;" placeholder="Search..." aria-controls="medications_table">

    </div>
    <!--New prescription table-->
    <div class="table-scrollable ">
        <table class="table table-hover order-column full-width new_prescription_table" id="medications_table">
            <thead>
                <tr>
                    <th scope="col">Date Created</th>
                    <th scope="col">Type</th>
                    <th scope="col">Order Name</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Order Details</th>
                    <th scope="col">Charges</th>
                    <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
                </tr>
            </thead>
        </table>
    </div>
    <!-- <div class="row">
        <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" id="medications_table_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div>
        </div>
        <div class="col-sm-12 col-md-7"></div>
    </div> -->
    <!-- php: if ($isCurrentVisit) { -->
        <!--Button section below table -->
        <div class="row mt-4 pl-3">
            <a class="btn btn-sm text-slate-900 mr-2" style="background-color: #e74c3c;" onclick="javascript:$('#prescriptionForm').toggle(500); moveToId('prescriptionForm'); currentForm ='prescription' ">Add Prescription</a>
            <a class="btn btn-sm text-slate-900 mr-2" style="background-color: #6c5ce7;" onclick="javascript:$('#continousInfusionForm').toggle(500); moveToId('continousInfusionForm');currentForm='infusion'">Add Continuous Infusion</a>
            <!-- <a class="btn btn-sm text-slate-900" style="background-color: #636e72;" onclick="javascript:$('#transfusionForm').toggle(500); moveToId('transfusionForm');currentForm='transfusion'">Add Transfusion</a> -->
        </div>

    <!-- php: } -->
</section>

<br />
<hr />

<div class="modal fade" id="viewMedicationDialog" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="viewMedicationTitle"><!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --> Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body med">

            </div>
        </div>
    </div>
</div>

<!--Add Medication-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['id' => 'prescriptionForm', 'url' => ['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id], 'id' => 'prescriptionForm', 'style' => 'display:none;']); -->
    <h3>Add <!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --></h3>
    <div class="form-body">
        <div class="row">
            <div class="col-md-6">
                <!--Internal Pharmacy Toggle-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Internal Pharmacy
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" checked="checked" id="in_house_med_status" name="in_house_medication_status" onclick="updatePrescriptionType(this.checked);">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Internal Drugs-->
                <div class="form-group row" id="stock_drugs_prescription">
                    <label class="control-label col-md-4">Internal Drugs
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input class="input-box" name="searchValue" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ced4da; " class="form-control" id="search-prescription-drug-box" placeholder="" />
                        </div>
                        <div id="search-prescription-drug-params">

                        </div>
                        <div style="display: none">

                            <SearchableSelectField  class="form-control selectpicker show-menu-arrow show-tick drug-related-sections" onchange="$('#prescriptionForm').validate().element('#medication_drug_stock_select'); showLeastDosageQuantityPerUnit(this.id); checkRxcuiDetails('prescription')" data-size="5" title="Drug / Form / Dosage" name="medication_drug_stock_id" id="medication_drug_stock_select" data-live-search="true" required>
    
                            </SearchableSelectField>
                        </div>
                    </div>
                </div>

                <div class="form-group row" style="display:none" id="sub_route_section">
                    <label class="control-label col-md-4">Specify Route
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField name="sub_route_field" id="sub_route_field" class="form-control">
                            <option value="" selected disabled>Specify Sub ROA</option>
                            <option value="Intravenous IV">Intravenous IV</option>
                            <option value="Intramuscular IM">Intramuscular IM</option>
                            <option value="Intrathecal">Intrathecal</option>
                            <option value="Intraosseous IO">Intraosseous IO</option>
                            <option value="Subcutaneous SC">Subcutaneous SC</option>
                            <option value="Unspecified">Unspecified</option>
                        </SearchableSelectField>
                    </div>
                </div>

                <!--All Drugs (for exernal pharmacy)-->
                <div class="form-group row" id="all_drugs_prescription" style="display: none">
                    <label class="control-label col-md-4">All Drugs 
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" onchange="$('#prescriptionForm').validate().element('#drug_id'); showLeastDosageQuantityPerUnit(this)" data-size="10" title="Drug / Form / Dosage" id="drug_id_prescription" data-live-search="true">

                        </SearchableSelectField>
                    </div>
                </div>


                <!---Administer Dose-->
                <div class="form-group row">
                    <label class="control-label col-md-4"> Administer Per Dose
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input type="text" id="administer_dose_prescription" data-required="1" placeholder="10 mg / 1 tablet" onchange="$('#prescriptionForm').validate().element('#administer_dose_prescription');" class="form-control  ui-autocomplete-input" required>
                        </div>
                        <div class="mt-2">
                            <span id="medication_calculator" class="btn btn-xs btn-primary">Calculator</span>
                        </div>


                    </div>
                </div>

                <!--PRN toggle-->
                <div class="form-group row">
                    <label class="control-label col-md-4">PRN
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" id="prn_slider_presc" onchange="toggleFrequency('prn_slider_presc')">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>


                <!--Dosage Freq-->
                <div class="form-group row" id="prescriptionFrequencyPrnToggle">
                    <label class="control-label col-md-4">Dosage Frequency
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control show-menu-arrow show-tick frequencySelect" data-required="1" onchange="$('#prescriptionForm').validate().element('#prescription_frequency');" data-live-search="true" data-size="5" title="Select Frequency" id="prescription_frequency">

                        </SearchableSelectField>
                    </div>
                </div>

                <!--Dosage Instructions-->
                <div class="form-group row" id="prnDosageInstructionToggles">
                    <label class="control-label col-md-4">Dosage Instruction
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <!-- <input type="text" class="form-control full-width" placeholder="Instruction" id="prescription_instruction_info"> -->
                        <textarea class="form-control full-width" placeholder="Instruction" id="prescription_instruction_info" rows="2" cols="45">
                        </textarea>
                    </div>
                </div>

                <!--Priority-->
                <div class="form-group row" id="prescription_priority_div">
                    <label class="control-label col-md-4">Priority
                    </label>
                    <div class="col-md-7">
                        <span class="badge text-slate-900" style="background: #0984e3;">Routine</span>
                    </div>
                </div>

                <!--Start & End Date-->
                <div class="form-group row" id="prescription_date_div">
                    <label class="control-label col-md-4"> Start & End Date
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">


                        <div>
                            <input id="prescription_date_range" placeholder="Click to select date range" data-required="1" class="form-control" onchange="$('#prescriptionForm').validate().element('#prescription_date_range');" readonly='true' class="w-100" />
                        </div>

                        <div class="mt-2  d-none" id="prescription_dose_desc_section">
                            <span class="mr-2">First Dose: <b id="prescription_first_dose_date"></b></span>
                            <span id="prescription_dose_span" class="d-none">Number of Dose(s): <b id="prescription_dose_text"></b></span> <br>
                            <span class="mr-2">Number of Day(s): <b id="prescription_number_of_days"></b></span> 
                            <span class="mr-2">Quantity: <b id="prescription_quantity"></b></span> <br>
                            <a href="javascript:;" onclick="createPrescriptionSchedule()" id="prescription_scheduled_time" class="d-none btn btn-xs" data-toggle="modal" data-target="#scheduleTimeModal">Schedule Time</a> <span class="text-danger" id="presScheduledTimeInfo" style="font-weight: bold"></span> <br>
                            <ul style="text-decoration: none;">
                                <!-- <li>08/03/2022 11:00pm</li> -->
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="form-group row" id="prescription_start_date_div" style="display:none">
                    <label class="control-label col-md-4"> Start Date
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input type="date" id="prn_prescription_start_date" placeholder="Select Start Date" data-required="1" class="form-control" onchange="" class="w-100" />
                        </div>
                    </div>
                </div>
                <div class="form-group row" id="prescription_end_date_div" style="display:none">
                    <label class="control-label col-md-4"> End Date
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input type="date" id="prn_prescription_end_date" placeholder="Select End Date" data-required="1" class="form-control" onchange="" class="w-100" />
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-md-6">
                <!--Fulfilled-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Fulfilled
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" id="fulfilled_slider_presc">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>


                <!--Bolus-->
                <div class="form-group row" hidden>
                    <label class="control-label col-md-4">Bolus
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" id="bolus_slider_presc">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>


                <!-- php: if($selectedVisit->admitted == 1): -->
                <!--Shown only for in patient or admitted patient -->
                    <!--Hold section-->
                    <div class="form-group row">
                        <label class="control-label col-md-4">Hold For Specific Vitals<span class="required"> * </span>
                        </label>
                        <div class="col-md-7">
                            <a href="javascript:;" class="text-success" id="prescription_hold_vitals">Set Vitals to hold</a> <br>
                            <ul style="text-decoration: none;" id="prescription_hold_vital_summary">
                            </ul>

                        </div>
                    </div>
                <!-- php: endif; -->





                <!--Shown only for in patient or admitted patient -->
                <!-- php: if ($selectedVisit->admitted == 1) { -->
                    <!--Trough Level-->
                    <div class="form-group row">
                        <label class="control-label col-md-4">Trough Level
                            <span class="required"> * </span>
                        </label>
                        <div class="col-md-7">
                            <a href="javascript:;" class="text-success" id="prescription_trough_level">Set Trough Level</a> <br>
                            <ul style="text-decoration: none;" id="prescription_trough_level_summary">

                            </ul>
                        </div>
                    </div>

                <!-- php: } -->



                <!--Shown only for in patient or admitted patient -->
                <!-- php: if ($selectedVisit->admitted == 1) { -->
                    <!--Peak Level-->
                    <div class="form-group row">
                        <label class="control-label col-md-4">Peak Level
                            <span class="required"> * </span>
                        </label>
                        <div class="col-md-7">
                            <a href="javascript:;" class="text-success" id="prescription_peak_level">Set Peak Level</a> <br>
                            <ul style="text-decoration: none;" id="prescription_peak_level_summary">

                            </ul>
                        </div>
                    </div>


                <!-- php: } -->

                

                <!--Bill-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Charge Bill To
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <SearchableSelectField class="form-control  patient_insurance_setters show-menu-arrow show-tick" onchange="$('#prescriptionForm').validate().element('#bill_to_id_prescription');" data-required="1" data-size="5" data-live-search="true" class="form-control " id="bill_to_id_prescription" required>
                        </SearchableSelectField>
                    </div>
                </div>

                <!--Service Place-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Service Place
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " onchange="$('#prescriptionForm').validate().element('#service_place_presc');" id="service_place_presc" required>
                            <option value="">Select...</option>
                            <option value="0" selected>Place 1</option>
                            <option value="1">Place 2</option>
                        </SearchableSelectField>
                    </div>
                </div>

                
                <!--Repeat Prescription-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Refill Prescription
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " onchange="$('#prescriptionForm').validate().element('#prescription_repeat');" id="prescription_repeat" required>
                            <!-- <option value="">Select...</option> -->
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </SearchableSelectField>
                    </div>
                </div>

                <div class="form-group row" id="diag-med-treatment" onmouseover="diagPresAlert(this, 'diag-for-pres-select')">
                    <label class="control-label col-md-4">Diagnoses for Request
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control" data-required="1" data-size="5" class="form-control " id="diag-for-pres-select" name="prescription_diagnoses_id">
                            <option value="">Select...</option>
                        </SearchableSelectField>
                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" id="hidden" name="request_type" value="new_request_medication">
        <div class="row">
            <div class="offset-md-4 col-md-7">
                <button type="button" id="submit_prescription_form" class="btn btn-info">Submit</button>
                <button type="button" style="display:none" class="btn btn-info" id="drugdrugIntereaction"></button>
                <button class="btn btn-danger" onclick="javascript:$('#prescriptionForm').toggle(500); moveToId('prescriptionForm'); currentForm ='none' ">Cancel</button>
                <button type="button" id="resetPrescriptionForm" class="btn btn-default" onclick='clearPrescriptionForm()'>Reset</button>
            </div>
        </div>
    </div>
    <!-- php: = $this->Form->end(); -->
<!-- php: } -->

<!--Add Continous Infusion-->
<!-- php: if ($isCurrentVisit) { -->
    <!--Might have to change the controller to requested infusion , seperate it from medications-->
    <!-- php: = $this->Form->create(null, ['id' => 'continousInfusionForm', 'url' => ['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id], 'id' => 'continousInfusionForm', 'style' => 'display:none;'... -->
    <h3>Add Continuous Infusion</h3>
    <div class="form-body">
        <div class="row">
            <div class="col-md-6">
                <!--Internal Pharmacy Toggle-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Internal Pharmacy
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" checked="checked" name="in_house_medication_status" id="in_house_med_status_ci" onclick="updateInfusionType(this.checked);">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Internal Infusions-->
                <div class="form-group row" id="stock_drugs_infusion">
                    <label class="control-label col-md-4">Internal Infusions
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input class="input-box" name="searchValue" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ced4da; " class="form-control" id="search-infusion-drug-box" placeholder="" />
                        </div>
                        <div id="search-infusion-drug-params">

                        </div>
                        <div style="display: none">

                            <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick infusion-related-sections" onchange="checkRxcuiDetails('')" data-size="10" title="Drug / Form / Dosage" name="infusion_drug_stock_id" id="infusion_drug_stock_select" data-live-search="true" required>
    
                            </SearchableSelectField>
                        </div>

                    </div>
                </div>
                <input type="hidden" name="infusion_quantity" id="infusion_quantity_bags">

                <div class="form-group row" style="display:none" id="inf_sub_route_section">
                    <label class="control-label col-md-4">Specify Route
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField name="inf_sub_route_field" id="inf_sub_route_field" class="form-control">
                            <option value="" selected disabled>Specify Sub ROA</option>
                            <option value="Intravenous IV">Intravenous IV</option>
                            <option value="Intramuscular IM">Intramuscular IM</option>
                            <option value="Intrathecal">Intrathecal</option>
                            <option value="Intraosseous IO">Intraosseous IO</option>
                            <option value="Subcutaneous SC">Subcutaneous SC</option>
                            <option value="Unspecified">Unspecified</option>
                        </SearchableSelectField>
                    </div>
                </div>

                <!--All Infusions (for exernal pharmacy)-->
                <div class="form-group row" id="all_drugs_infusion" style="display: none">
                    <label class="control-label col-md-4">All Infusions
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-size="10" title="Drug / Form / Dosage" name="drug_id" id="drug_id_infusion" data-live-search="true">

                        </SearchableSelectField>
                    </div>
                </div>

                <!---Administer Infusion Dose-->
                <div class="form-group row">
                    <label class="control-label col-md-4"> Administer Infusion Dose
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input type="text" id="administer_infusion" data-required="1" placeholder="Administer Infusion Dose" class="form-control  ui-autocomplete-input" required>
                        </div>
                        <div class="mt-2">
                            <span id="infusion_calculator" class="btn btn-xs btn-primary">Calculator</span>
                        </div>


                    </div>
                </div>


                <!--Infuse Over-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Infuse Over (hr)
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <input type="text" id="infuse_over" data-required="1" placeholder="Enter Duration of Infuse Over (hr)" class="form-control " />
                    </div>
                </div>


                <!--PRN toggle-->
                <div class="form-group row">
                    <label class="control-label col-md-4">PRN
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" id="prn_slider_infusion" onchange="toggleFrequency('prn_slider_infusion')">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Frequency-->
                <div class="form-group row" id="continuousInfusionFrequencyPrn">
                    <label class="control-label col-md-4">Frequency
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control show-menu-arrow show-tick frequencySelect" data-required="1" data-live-search="true" data-size="5" id="infusion_frequency" title="Select Frequency">
                        </SearchableSelectField>
                    </div>
                </div>




                <!--Priority-->
                <div class="form-group row" id="infusion_priority_div">
                    <label class="control-label col-md-4">Priority
                    </label>
                    <div class="col-md-7">
                        <span class="badge text-slate-900" style="background: #0984e3;">Routine</span>
                    </div>
                </div>


                <!--Start & End Date-->
                <div class="form-group row" id="infusion_date_div">
                    <label class="control-label col-md-4"> Start & End Date
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">


                        <div>
                            <input id="infusion_date_range" placeholder="Click to select date range" data-required="1" class="form-control" readonly='true' class="w-100" />
                        </div>

                        <div class="mt-2  d-none" id="infusion_dose_desc_section">
                            <span class="mr-2">First Dose: <b id="infusion_first_dose_date"></b></span>
                            <span class="mr-2">Number of Day(s): <b id="infusion_number_of_days"></b></span> <br>
                            <span id="mr-2">Frequency: <b id="infusion_frequency_schedule"></b></span> <br>
                            <span class="mr-2">Quantity: <b id="infusion_quantity"></b></span> <br/>
                            <a href="javascript:;" id="infusion_scheduled_time" onclick="createInfusionSchedule()" class="d-none btn btn-xs" data-toggle="modal" data-target="#scheduleTimeModal">Schedule Time</a> <span class="text-danger" style="font-weight: bold" id="infScheduledTimeInfo"></span><br>
                            <ul style="text-decoration: none;">
                                <!-- <li>08/03/2022 11:00pm</li> -->
                            </ul>

                        </div>
                    </div>
                </div>


                <div class="form-group row" id="infusion_start_date_div" style="display:none">
                    <label class="control-label col-md-4"> Start Date
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input type="date" id="prn_infusion_start_date" placeholder="Select Start Date" data-required="1" class="form-control" onchange="" class="w-100" />
                        </div>
                    </div>
                </div>
                <div class="form-group row" id="infusion_end_date_div" style="display:none">
                    <label class="control-label col-md-4"> End Date
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input type="date" id="prn_infusion_end_date" placeholder="Select End Date" data-required="1" class="form-control" onchange="" class="w-100" />
                        </div>
                    </div>
                </div>



            </div>

            <div class="col-md-6">
                <!--Fulfilled-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Fulfilled
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" id="fulfilled_slider_infusion">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Bolus-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Bolus
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" id="bolus_slider_infusion">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>


                <!-- php: if($selectedVisit->admitted == 1): -->
                <!--Shown only for in patient or admitted patient -->
                    <!--Hold section-->
                    <div class="form-group row">
                        <label class="control-label col-md-4">Hold For Specific Vitals<span class="required"> * </span>
                        </label>
                        <div class="col-md-7">
                            <a href="javascript:;" class="text-success" id="infusion_hold_vitals">Set Vitals to hold</a> <br>
                            <ul style="text-decoration: none;" id="infusion_hold_vital_summary">
                                <!-- <li class="bold">Hold for heart rate/pulse less than 50<i class="fa fa-window-close text-danger ml-3" aria-hidden="true"></i></li>
                            <li class="bold">Hold for SBP less than 25 <i class="fa fa-window-close text-danger ml-3" aria-hidden="true"></i></li> -->
                            </ul>

                        </div>
                    </div>

                <!--Shown only for in patient or admitted patient -->
                    <!--Trough Level-->
                    <div class="form-group row">
                        <label class="control-label col-md-4">Trough Level
                            <span class="required"> * </span>
                        </label>
                        <div class="col-md-7">
                            <a href="javascript:;" class="text-success" id="infusion_trough_level">Set Trough Level</a> <br>
                            <ul style="text-decoration: none;" id="infusion_trough_level_summary">

                            </ul>
                        </div>
                    </div>
               

                <!--Shown only for in patient or admitted patient -->
                    <!--Peak Level-->
                    <div class="form-group row">
                        <label class="control-label col-md-4">Peak Level
                            <span class="required"> * </span>
                        </label>
                        <div class="col-md-7">
                            <a href="javascript:;" class="text-success" id="infusion_peak_level">Set Peak Level</a> <br>
                            <ul style="text-decoration: none;" id="infusion_peak_level_summary">
                            </ul>
                        </div>
                    </div>
                <!-- php: endif; -->
                


                <!--Bill-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Charge Bill To
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <SearchableSelectField class="form-control  patient_insurance_setters show-menu-arrow show-tick" data-required="1" data-size="5" data-live-search="true" class="form-control " id="bill_to_id_infusion" required>
                        </SearchableSelectField>
                    </div>
                </div>

                <!--Service Place--> 
                <div class="form-group row">
                    <label class="control-label col-md-4">Service Place
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " id="service_place_infusion" required>
                            <option value="">Select...</option>
                            <option value="0" selected>Place 1</option>
                            <option value="1">Place 2</option>
                        </SearchableSelectField>
                    </div>
                </div>

                <div class="form-group row" id="diag-med-treatment" onmouseover="diagPresAlert(this, 'diag-for-med-select')">
                    <label class="control-label col-md-4">Diagnoses for Request
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control" data-required="1" data-size="5" class="form-control " id="diag-for-med-select" name="prescription_diagnoses_id">
                            <option value="">Select...</option>
                        </SearchableSelectField>
                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" id="hidden" name="request_type" value="new_request_medication">
        <div class="row">
            <div class="offset-md-4 col-md-7">
                <button type="button" id="submit_infusion_form" class="btn btn-info">Submit</button>
                <button class="btn btn-danger" onclick="javascript:$('#continousInfusionForm').toggle(500); moveToId('continousInfusionForm'); currentForm='none'">Cancel</button>
                <button type="button" class="btn btn-default" onclick='clearInfusionForm()'>Reset</button>
            </div>
        </div>
    </div>
    <!-- php: = $this->Form->end(); -->
<!-- php: } -->



<!--schedule time modal-->
<div class="modal fade" id="scheduleTimeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Custom Schedule</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase "><b>Schedule Time</b>
                </span>
            </div>
            <form id="scheduleRegularTimesForm">
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
                                            <div class="">
                                                <div class="allergy-reactions-small-card" id="problem_complaints_noneText">
                                                    <span class="">
                                                        None
                                                    </span>
                                                </div>
                                            </div>
                                            </p>

                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <hr>


                            <!--Start and End date-->
                            <dl class="item-property">
                                <dt>Start & End Date </dt>
                                <dd>
                                    <p><span class="bold"><span class="badge badge-success" id="schedule_time_startDate">Today</span>, <span class="badge badge-success" id="schedule_time_endDate"> 15 Mar 2022</span></span></p>
                                </dd>
                            </dl>

                            <hr>


                            <hr>


                            <!--Choose Start Time-->
                            <dl class="item-property">
                                <dt>Choose Start Time</dt>
                                <dd>
                                    <p>
                                        <input id="startTime_scheduleModal" class="form-control  w-100" />
                                    </p>
                                </dd>
                            </dl>

                            <hr>

                            <!--scheduling custom frequency -->
                            <dl class="item-property">
                                <dt>Custom Frequency</dt>

                                <dd id="customFrequencySchedule"></dd>

                            </dl>

                        </article>
                        <!--//Requested Service Details-->





                    </div> <!-- row.// -->



                    <hr>

                    <input type="hidden" id="openedModal">


                </div> <!-- row.// -->
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                    <button id="save_schedule_time" onclick="recalculateDoses()" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
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
<!--//schedule time  modal-->

<!--hold vitals modal-->
<div class="modal fade" id="holdVitalsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Hold Vitals</h5>
                <span class="pull-left" style="color: red;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase "><b>Hold Vitals for "<span class="modal_drug_title"></span>”</b>
                </span>
            </div>

            <form id="holdVitalsForm">
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
                                            <div class="">
                                                <div class="allergy-reactions-small-card" id="problem_complaints_noneText">
                                                    <span class="">
                                                        None
                                                    </span>
                                                </div>
                                            </div>
                                            </p>

                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <hr>


                            <!--Vital Select-->
                            <dl class="item-property">
                                <dt>Vitals Values</dt>
                                <dd>
                                    <p>

                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse">Heart Rate</label>
                                        <div class="col-md-7">
                                            <input type="number" data-required="1" placeholder="Enter Heart Rate (BPM)" name="heart_rate_value" id="heart_rate_value" class="form-control " onchange="$('#holdVitalsForm').validate().element('#heart_rate_value');" required>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse">Pulse</label>
                                        <div class="col-md-7">
                                            <input type="number" data-required="1" placeholder="Enter Pulse (BPM)" name="pulse_value" id="pulse_value" class="form-control " onchange="$('#holdVitalsForm').validate().element('#pulse_value');" required>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse">Respiratory Rate</label>
                                        <div class="col-md-7">
                                            <input type="number" data-required="1" placeholder="Enter RR (CPM)" name="rr_value" id="rr_value" class="form-control " onchange="$('#holdVitalsForm').validate().element('#rr_value');" required>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse">Blood Pressure</label>
                                        <div class=" col-md-7">
                                            <div class="input-group">
                                                <input class="form-control " size="3" placeholder="Systolic (mm Hg)" name="blood_pressure_1" id="prescription_syst" data-required="1" type="number" min="0" onchange="$('#holdVitalsForm').validate().element('#blood_pressure_1');">
                                                <span class="input-group-addon"><span class="" style="font-size : 18px"> ⁄ </span></span>
                                                <input class="form-control " size="3" placeholder="Diastolic (mm Hg)" name="blood_pressure_2" id="prescription_dia" data-required="1" type="number" min="0" onchange="$('#holdVitalsForm').validate().element('#blood_pressure_2');">
                                            </div>
                                        </div>
                                    </div>

                                    </p>
                                </dd>
                            </dl>
                            <hr>


                            <!--Bill-->
                            <dl class="item-property">
                                <dt>Charge Bill</dt>
                                <dd>
                                    <p>
                                        <SearchableSelectField class="form-control  patient_insurance_setters show-menu-arrow show-tick" onchange="$('#holdVitalsForm').validate().element('#bill_to_id');" data-required="1" data-size="5" data-live-search="true" class="form-control " name="bill_to_id" id="bill_to_id" required>
                                        </SearchableSelectField>


                                    </p>
                                </dd>
                            </dl>




                        </article>
                        <!--//Requested Service Details-->





                    </div> <!-- row.// -->



                    <hr>


                </div> <!-- row.// -->
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                    <button id="vitals_modal_save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                        save</button>
                    <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                        Cancel</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!--//hold vitals modal-->


<!-- end of recurring prescription -->

<!--dose calculator modal-->
<div class="modal fade" id="doseCalculatorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Dose Calculator</h5>
                <span class="pull-left" style="color: red;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase text-slate-900"><b>Dose Calculation for “<span class="modal_drug_title"></span>”</b>
                </span>
            </div>

            <form id="holdVitalsForm">
                <div class="modal-body" style="margin:0">
                    <div class="row">


                        <!--Requested service Details-->
                        <article class="card-body pl-5 pr-5 p-0">


                            <!-- <div class="row ml-2">
                                <div class="mr-5">
                                    <dl class="item-property">
                                        <dt>Patient Details</dt>

                                        <dd>
                                            <p>
                                                Name: <span class="bold text-success"><!-- php: // $patient->first_name . ' ' . $patient->last_name --></span><br>
                                                Age: <span class="bold text-success"><!-- php: // isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </span><br>
                                                Gender: <span class="bold text-success"><!-- php: // isset($patient->gender) ? $patient->gender->name : "" --> </span> <br>
                                                location: <br>
                                                Folder No: <span class="bold text-success"><!-- php: // $patient->folder --></span>

                                            </p>

                                        </dd>
                                    </dl>
                                </div>

                                <div>
                                    <dl class="item-property">
                                        <dt>Allergy</dt>

                                        <dd>
                                            <p>
                                            <div class="">
                                                <div class="allergy-reactions-small-card" id="problem_complaints_noneText">
                                                    <span class="">
                                                        None
                                                    </span>
                                                </div>
                                            </div>
                                            </p>

                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <hr> -->

                            <!--Drug Type-->
                            <dl class="item-property">
                                <dt>Least Dosage Quantity Per Unit</dt>
                                <dd id="least-dosage-quantity">
                                    <p>
                                       Selected Drug has no least dosage quantity
                                    </p>
                                </dd>
                            </dl>
                            <hr>

                            <!--Drug Type-->
                            <dl class="item-property">
                                <dt>Drug Type</dt>
                                <dd>
                                    <p>
                                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " name="drug_type" id="drug_type_select" aria-required="true" required title="Select Drug Type">
                                            <option value="0">Tablets</option>
                                            <option value="1">Fluid</option>
                                        </SearchableSelectField>

                                    </p>
                                </dd>
                            </dl>
                            <hr>


                            <!-- php: if ((date('Y') - $patient->date_of_birth->year) <= 12) { -->
                                <!--For patients 12years and younger -->
                                <!--Tablet Dosage For Children -->
                                <dl class="item-property d-none tablet_section">
                                    <dt>Weight to Dose </dt>
                                    <dd>
                                        <p>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Required Dose (mg/kg):</label>
                                            <div class="col-md-7">
                                                <input type="text" data-required="1" placeholder="Enter Child's Required Dose (mg/kg)" id="child_req_dose_tablet" class="form-control ">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Child Weight (kg):</label>
                                            <div class="col-md-7">
                                                <input type="text" data-required="1" placeholder="Chid Weight (kg)" id="child_weight_tablet" class="form-control ">
                                                <span id="child_tablet_dose_cal" class="btn btn-xs btn-primary float-right mt-2">Calculate</span>
                                            </div>
                                        </div>
                                        </p>
                                    </dd>
                                </dl>

                                <!--Fluid Dosage for children-->
                                <dl class="item-property d-none fluid_section">
                                    <dt>Weight to Dose </dt>
                                    <dd>
                                        <p>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Required Dose (mg/kg):</label>
                                            <div class="col-md-7">
                                                <input type="text" data-required="1" placeholder="Enter Child's Required Dose (mg/kg)" id="child_req_dose_fluid" class="form-control ">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Child Weight (kg):</label>
                                            <div class="col-md-7">
                                                <input type="text" data-required="1" placeholder="Chid Weight (kg)" id="child_weight_fluid" class="form-control ">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Stock Dose (mg): </label>
                                            <div class="col-md-7">
                                                <input type="text" data-required="1" placeholder="Enter Stock Dose (mg)" id="child_stock_dose" class="form-control ">
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Stock Volume (mL): </label>
                                            <div class="col-md-7">
                                                <input type="text" data-required="1" placeholder="Enter Stock Volumne (mL)" id="child_stock_volume" class="form-control ">

                                                <span id="child_fluid_dose_cal" class="btn btn-xs btn-primary flaot-right mt-2">Calculate</span>
                                            </div>
                                        </div>
                                        </p>
                                    </dd>
                                </dl>




                            <!-- php: } else { -->
                                <!--For Patients older than 12 years -->
                                <dl class="item-property d-none tablet_section">
                                    <dt>Required Dose </dt>
                                    <dd>
                                        <p>
                                            <input type="number" id="require_dose_tablet" data-required="1" placeholder="Enter Required Dose (mg)" class="form-control ">

                                        </p>
                                    </dd>
                                </dl>

                                <dl class="item-property d-none fluid_section">
                                    <dt>Fluid Dose</dt>
                                    <dd>
                                        <p>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Required Dose (mg):</label>
                                            <div class="col-md-7">
                                                <input type="number" data-required="1" placeholder="Enter Required Dose (mg)" id="adult_req_dose_fluid" class="form-control ">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Stock Dose (mg): </label>
                                            <div class="col-md-7">
                                                <input type="number" data-required="1" placeholder="Enter Stock Dose (mg)" id="adult_stock_dose" class="form-control ">
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="control-label col-md-4 d-flex flex-row-reverse">Stock Volume (mL): </label>
                                            <div class="col-md-7">
                                                <input type="number" data-required="1" placeholder="Enter Stock Volumne (mL)" id="adult_stock_volume" class="form-control ">
                                                <span class="btn btn-xs btn-primary float-right mt-2" id="adult_fluid_cal">Calculate</span>
                                            </div>
                                        </div>

                                        </p>
                                    </dd>
                                </dl>









                            <!-- php: } -->






                            <hr>





                            <!--Administer section-->
                            <dl class="item-property">
                                <dt>Single Dose to Administer (mg)</dt>
                                <dd>
                                    <p>
                                        <input type="number" data-required="1" value="0.00" min="0" id="administer_dose_cal" readonly class="form-control ">
                                    </p>
                                </dd>
                            </dl>
                            <hr>


                            <!--Tablet section-->
                            <dl class="item-property tablet_section d-none">
                                <dt>Tablet to Administer </dt>
                                <dd>
                                    <p>
                                        <input type="number" id="tablet_administer" data-required="1" value="0.00" min="0" readonly class="form-control ">
                                    </p>
                                </dd>
                            </dl>

                            <!--Volume section-->
                            <dl class="item-property fluid_section d-none">
                                <dt>Volume to Administer (ml)</dt>
                                <dd>
                                    <p>
                                        <input type="number" data-required="1" id="administer_vol_cal" value="0.00" min="0" readonly class="form-control ">
                                    </p>
                                </dd>
                            </dl>

                            <hr>







                        </article>
                        <!--//Requested Service Details-->





                    </div> <!-- row.// -->


                </div> <!-- row.// -->
                <div class="modal-footer border-top-0 d-flex justify-content-center" style="margin:0; padding-top:0">
                    <button id="save_administer_dose" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                        save</button>
                    <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                        Cancel</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!--//dose calculator modal-->

<!-- infusion dose calculator modal-->
<div class="modal fade" id="infusionCalculatorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Infusion Calculator</h5>
                <span class="pull-left" style="color: red;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase "><b>Infusion Calculation for “<span class="modal_drug_title"></span>”</b>
                </span>
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
                                            <div class="">
                                                <div class="allergy-reactions-small-card" id="problem_complaints_noneText">
                                                    <span class="">
                                                        None
                                                    </span>
                                                </div>
                                            </div>
                                            </p>

                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <hr>


                            <dl class="item-property inf_tablet_section">
                                <dt>Infusion Details</dt>
                                <dd>
                                    <p>
                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse"> Volume (ml):</label>
                                        <div class="col-md-7">
                                            <input type="text" data-required="1" placeholder="Enter Infusion Volume (ml)" id="infusion_volume" class="form-control ">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse">Rate (ml/hr):</label>
                                        <div class="col-md-7">
                                            <input type="text" data-required="1" placeholder="Enter Rate of Infusion (ml/hr)" id="rate_infusion" list="rate_suggestions" class="form-control " value="125">
                                            <datalist id="rate_suggestions">
                                                <option value="125">
                                                <option value="100">
                                                <option value="50">
                                            </datalist>
                                            <span id="infusion_cal" class="btn btn-xs btn-primary float-right mt-2">Calculate</span>
                                        </div>
                                    </div>
                                    </p>
                                </dd>
                            </dl>








                            <hr>





                            <!--Administer section-->
                            <dl class="item-property">
                                <dt>Infuse Over</dt>
                                <dd>
                                    <p>
                                        <input type="number" data-required="1" value="0.00" min="0" id="infuse_over_cal" readonly class="form-control ">
                                    </p>
                                </dd>
                            </dl>
                            <hr>






                            <hr>






                        </article>
                        <!--//Requested Service Details-->





                    </div> <!-- row.// -->



                    <hr>


                </div> <!-- row.// -->
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                    <button id="save_infusion_cal" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                        save</button>
                    <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                        Cancel</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!--//infusion dose calculator modal-->

<!--trough level modal-->
<div class="modal fade" id="troughLevelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Trough Level</h5>
                <span class="pull-left" style="color: red;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase "><b>Therapeutic drug monitoring for “<span class="modal_drug_title"></span>”</b>
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
                                            <div class="">
                                                <div class="allergy-reactions-small-card" id="problem_complaints_noneText">
                                                    <span class="">
                                                        None
                                                    </span>
                                                </div>
                                            </div>
                                            </p>

                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <hr>


                            <!--Specimen Source-->
                            <dl class="item-property">
                                <dt>Specimen Source </dt>
                                <dd>
                                    <p>
                                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " id="trough_specimen_source" required>
                                            <option value="">Select Source</option>
                                            <option value="0">Blood</option>
                                            <option value="1">Urine</option>
                                            <option value="2">Saliva</option>
                                        </SearchableSelectField>
                                    </p>
                                </dd>
                            </dl>
                            <hr>

                            <!--Collection Priority-->
                            <dl class="item-property">
                                <dt>Collection Priority</dt>
                                <dd>
                                    <p>
                                    <div id="trough_priority">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="priority" id="timedStudy_radio" value="timed study" checked>
                                            <label class="form-check-label" for="timedStudy_radio"><span class="badge rounded-pill" style="background-color: #636e72;">Timed Study</span></label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="priority" id="stat_radio" value="stat">
                                            <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Stat</span></label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="priority" id="routine_radio" value="routine">
                                            <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Routine</span></label>
                                        </div>

                                    </div>

                                    </p>
                                </dd>
                            </dl>

                            <hr>

                            <!--Frequency-->
                            <dl class="item-property">
                                <dt>Frequency </dt>
                                <dd>
                                    <p>
                                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " id="trough_frequency" required>
                                            <option value="">Select Frequency </option>
                                            <option value="5">5 mins</option>
                                            <option value="10">10 mins</option>
                                            <option value="15">15 mins</option>
                                            <option value="20">20 mins</option>
                                            <option value="25">25 mins</option>
                                            <option value="30">30 mins</option>
                                        </SearchableSelectField>
                                    </p>
                                </dd>
                            </dl>
                            <hr>


                            <!--Collection date and time -->
                            <dl class="item-property">
                                <dt>Collection Date & Time</dt>
                                <dd>
                                    <p>

                                    </p>
                                </dd>
                            </dl>
                            <hr>


                            <!--Bill-->
                            <dl class="item-property">
                                <dt>Charge Bill</dt>
                                <dd>
                                    <p>
                                        <!-- php: // default to patient if no provider is found // $billTo = $selectedVisit->has('patient_provider') ? $selectedVisit->patient_provider->provider_id : -1; -->
                                        <SearchableSelectField class="form-control  patient_insurance_setters show-menu-arrow show-tick" onchange="$('#prescriptionForm').validate().element('#bill_to_id');" data-required="1" data-size="5" data-live-search="true" class="form-control " name="bill_to_id" id="trough_bill_to_id" required>
                                            </SearchableSelectField>

                                    </p>
                                </dd>
                            </dl>




                        </article>
                        <!--//Requested Service Details-->





                    </div> <!-- row.// -->



                    <hr>


                </div> <!-- row.// -->
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                    <button id="trough_modal_save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                        save</button>
                    <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                        Cancel</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!--//trough level modal-->


<!--peak level modal-->
<div class="modal fade" id="peakLevelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Peak Level</h5>
                <span class="pull-left" style="color: red;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase "><b>Therapeutic drug monitoring for “<span class="modal_drug_title"></span>”</b>
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
                                            <div class="">
                                                <div class="allergy-reactions-small-card" id="problem_complaints_noneText">
                                                    <span class="">
                                                        None
                                                    </span>
                                                </div>
                                            </div>
                                            </p>

                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <hr>


                            <!--Specimen Source-->
                            <dl class="item-property">
                                <dt>Specimen Source </dt>
                                <dd>
                                    <p>
                                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " name="repeat_prescription" id="peak_specimen_source" required>
                                            <option value="">Select Source</option>
                                            <option value="0">Blood</option>
                                            <option value="1">Urine</option>
                                            <option value="2">Saliva</option>
                                        </SearchableSelectField>
                                    </p>
                                </dd>
                            </dl>
                            <hr>

                            <!--Collection Priority-->
                            <dl class="item-property">
                                <dt>Collection Priority</dt>
                                <dd>
                                    <p>
                                    <div id="peak_priority">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="priority" id="timedStudy_radio" value="0" checked>
                                            <label class="form-check-label" for="timedStudy_radio"><span class="badge rounded-pill" style="background-color: #636e72;">Timed Study</span></label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="priority" id="stat_radio" value="1">
                                            <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Stat</span></label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="priority" id="routine_radio" value="2">
                                            <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Routine</span></label>
                                        </div>

                                    </div>
                                    </p>
                                </dd>
                            </dl>

                            <hr>

                            <!--Frequency-->
                            <dl class="item-property">
                                <dt>Frequency </dt>
                                <dd>
                                    <p>
                                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " id="peak_frequency" required>
                                            <option value="">Select Frequency </option>
                                            <option value="15">15 mins</option>
                                            <option value="20">20 mins</option>
                                            <option value="25">25 mins</option>
                                            <option value="30">30 mins</option>
                                            <option value="35">35 mins</option>
                                            <option value="40">40 mins</option>
                                            <option value="45">45 mins</option>
                                            <option value="50">50 mins</option>
                                            <option value="60">60 mins</option>
                                        </SearchableSelectField>
                                    </p>
                                </dd>
                            </dl>
                            <hr>


                            <!--Collection date and time -->
                            <dl class="item-property">
                                <dt>Collection Date & Time</dt>
                                <dd>
                                    <p>

                                    </p>
                                </dd>
                            </dl>
                            <hr>




                            <!--Bill-->
                            <dl class="item-property">
                                <dt>Charge Bill</dt>
                                <dd>
                                    <p>
                                        <!-- php: // default to patient if no provider is found // $billTo = $selectedVisit->has('patient_provider') ? $selectedVisit->patient_provider->provider_id : -1; -->
                                        <SearchableSelectField class="form-control  patient_insurance_setters show-menu-arrow show-tick" onchange="$('#prescriptionForm').validate().element('#bill_to_id');" data-required="1" data-size="5" data-live-search="true" class="form-control " id="peak_bill_to_id" required>
                                            </SearchableSelectField>

                                    </p>
                                </dd>
                            </dl>




                        </article>
                        <!--//Requested Service Details-->





                    </div> <!-- row.// -->



                    <hr>


                </div> <!-- row.// -->
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                    <button id="peak_modal_save" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                        save</button>
                    <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                        Cancel</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!--//peak level modal-->
<div class="modal fade" id="prescription_recurring" tabindex="-1" aria-labelledby="prescription_recurring" aria-hidden="true"
    aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div style="border:2px solid #8e44ad;" class="container px-0">
                <div style="background:#8e44ad;" class="container-fluid pr-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Make Prescription Recurring For Routine Care</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>

                <div class="container bg-white p-2">
                    <div class="container-fluid">
					<div class="row mt-2 pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Internal Drugs:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="medication_drug_stock_select_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Administer Dose:</h5>
					    </div>
					    <div class="col-md-4 d-flex align-items-center p-1">
					       <span id="administer_dose_prescription_recurring" class="badge badge-warning"></span>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Dosage Frequency:</h5>
                            
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="prescription_frequency_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Dosage Instruction:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="prescription_instruction_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Quantity:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="prescription_instruction_quantity" style="my-0"></p>
					    </div>
					</div>
                        <div id="start-end5">
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Start:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="recur_start" id="start5"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>End:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="shift_end" id="end5"
                                        class="form-control form-control-sm">
                                    <input type="hidden" id="totalHours5" name="hours">

                                </div>
                            </div>
                        </div>
						<form id="recurring-medication-form">
                        <div class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Recurring:</h5>
                            </div>
                            <div class="col-md-7 d-flex align-items-center p-1">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="daily5"
                                        value="daily">
                                    <label class="form-check-label" for="daily">Daily</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="weekly5"
                                        value="weekly">
                                    <label class="form-check-label" for="weekly">Weekly</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="monthly5"
                                        value="monthly">
                                    <label class="form-check-label" for="monthly">Monthly</label>
                                </div>
                            </div>
                        </div>
                        <div id="repeat-daily5" class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Repeat every: </h5>
                            </div>
                            <div class="col-md-3 d-flex align-items-center p-1">
                                <input type="number" name="every_day" class="form-control">
                            </div>
                            <div class="col-md-2 p-1">
                                <h5>days</h5>
                            </div>
                        </div>
                        <div id="repeat-weekly5" class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Repeat every: </h5>
                            </div>
                            <div class="col-md-3 d-flex align-items-center p-1">
                                <input type="number" name="every_week" class="form-control">
                            </div>
                            <div class="col-md-2 p-1">
                                <h5>weeks</h5>
                            </div>
                        </div>
                        <div id="repeat-monthly5" class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Repeat every: </h5>
                            </div>
                            <div class="col-md-3 d-flex align-items-center p-1">
                                <input type="number" name="every_month" class="form-control">
                            </div>
                            <div class="col-md-2 p-1">
                                <h5>months</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div id="until5" class="container-fluid p-2">
                                <!-- <h5 class="text-left">Stop Condition</h5> -->
                                <div style="border: 1px solid #ccc; border-radius:5px;" class="container py-4 p-3">
                                    <div class="row">
                                    </div>
                                    <div class="row mt-3">
                                        <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                        <div class="col-md-11">
                                            <div class="d-flex align-items-center">
                                                <div class="col-md-5">
                                                    <h5 class="text-dark text-left m-0 p-0">Stop Condition </h5>
                                                </div>
                                                <div class="col-md-6 text-left">
												<div class="form-check form-check-inline">
												    <input class="form-check-input" type="radio" name="condition" id="stop-occurence5"
												        value="stop-occurence">
												    <label class="form-check-label" for="stop-occurence">Occurence</label>
												</div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="condition"
                                                            id="stop-date5" value="stop-date">
                                                        <label class="form-check-label" for="stop-date">Date</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="specific-date5" class="row mt-3">
                                        <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                        <div class="col-md-11">
                                            <div class="d-flex align-items-center">
                                                <div class="col-md-5">
                                                    <h5 class="text-dark text-left m-0 p-0">Run until a
                                                        specific date</h5>
                                                </div>
                                                <div class="col-md-6"><input type="date" class="form-control"
                                                        id="recur-type" name="recur_end" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="specific-occurence5" class="row mt-3">
                                        <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                        <div class="col-md-11">
                                            <div class="d-flex align-items-center">
                                                <div class="col-md-5">
                                                    <h5 class="text-dark text-left m-0 p-0"
                                                        style="padding-right:33px!important">Run until it
                                                        reaches</h5>
                                                </div>
                                                <div class="col-md-3"><input type="text" class="form-control"
                                                        id="recur-type" name="occurence" /></div>
                                                <div style="white-space: nowrap;" class="col-md-2 pl-1">
                                                    occurences</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
					
                    </div>
                </div>
                <div style="background:#8e44ad;" class="container-fluid pr-0">
                    <div class="d-flex align-items-center py-1 justify-content-end">
                        <button id="submit-recurring-followups" style="height:20px;width:auto;"
                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Done&nbsp;<i
                                class="fa fa-check text-success fa-1x"></i> </button>	</form>
                        <!-- <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Reset&nbsp;
							<i class="fa fa-refresh" aria-hidden="true"></i> </button> -->
                        <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                            data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                class="fa fa-times text-danger fa-1x"></i> </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script>
    const medicationBillTo = "<!-- php: = $billTo -->"
    const addRequestInfusion_link = '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestInfusion', $patient->id, $selectedVisit->id, ]) -->'
    const searchDrugStocks_link = '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'searchDrugStocks']) -->'
    const getDrugStocks_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getDrugStocks']) -->"
    const getSpecimenSources_link = "<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'getSpecimenSources']) -->"
    const searchDrugInfusions_link = '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'searchDrugInfusions']) -->'
    const getDrugInfusions_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getDrugInfusions']) -->"
    const addRequestPrescription_link = '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestPrescription', $patient->id, $selectedVisit->id, ]) -->'
    const addRequestMedication_link = '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id, ]) -->'
    const viewMedication_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewMedication']) -->?id="
    const viewPrescription_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewPrescription']) -->?id="
    const viewInfusion_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewInfusion']) -->?id="
    const cancelRequestPrescription_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'cancelRequestPrescription',]) -->/"
    const cancelRequestInfusion_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'cancelRequestInfusion',]) -->/"
    const getAllMedications_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => ( $continuousCare ? 'getAllVisitMedications' : 'getAllMedications'), $patient->id, $selectedVisit->id, ]) -->"
    const addRecurringRequestPrescription_link = '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRecurringRequestPrescription', $patient->id, $selectedVisit->id, ]) -->'
    const getAllDrugs_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getAllDrugs', $selectedVisit->id]) -->\`
    const medicationsgetPatientVisitDiagnosis_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitDiagnosis', $patient->id, $selectedVisit->id, '?' => ['_location' => 'diagnosis']]) -->"
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestmedicationservices.js') -->
`;

export default function ElementElementPatientvisitRequestmedicationservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
