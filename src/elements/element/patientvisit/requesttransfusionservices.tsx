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

<!-- php: $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->




<!--Cards section-->
<section>
    <div class="row stylish-card-section"  style="width:100%">
        <div class="col-md-6">

            <div class="col-md-12">
                <!--Problems Card-->
                <div class="accordion" id="accordionProblems">
                    <div class="card bg-light mb-3 problemsCard with-transform">
                        
                        <div class="card-header" id="problemsHeader">
                            Problems <span class="float-right"><a type="button" data-toggle="collapse" data-target="#collapseProblems" aria-expanded="true" aria-controls="collapseProblems">(All Active)</a></span>
                        </div>
                        <div id="collapseProblems" class="collapse" aria-labelledby="problemsHeader" data-parent="#accordionProblems">
                            <div class="card-body">

                                <!-- Complaints -->
                                <span class="float-left text-primary">Complaints</span><span class="ml-2" id="complaint-action-span"></span><br>
                                <div>
                                    <!-- Set class d-none when live -->
                                    <div class="cc-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- ODQs -->
                                <span class="float-left text-primary">ODQs</span><span class="ml-2" id="odqs-action-span"></span><br>
                                <div>
                                    <!-- Set class d-none when live -->
                                    <div class="odqs-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- Comorbidity -->
                                <span class="float-left text-primary">Comorbidity</span><span class="ml-2" id="comorbidity-action-span"></span><br>
                                <div>
                                    <!-- Set class d-none when live -->
                                    <div class="comorbidities-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- Surgeries -->
                                <span class="float-left text-primary">Surgeries</span> <br>
                                <div>
                                    <!-- Set class d-none when live -->
                                    <div class="surgeries-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!-- Diagnosis -->
                                <span class="float-left text-primary">Diagnosis</span> <br>
                                <div>
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
                <div class="accordion" id="vitalsAccordion3">
                    <div class="card bg-light mb-3 vitalsCard with-transform">
                        <div class="card-header" id="vitalsHeading3">
                            Vitals <span class="float-right"> <a data-toggle="collapse" data-target="#vitalsCollapse3" aria-expanded="true" aria-controls="vitalsCollapse3"> (Last Entered) </a></span>
                        </div>

                        <div id="vitalsCollapse3" class="collapse" aria-labelledby="vitalsHeading3" data-parent="#vitalsAccordion3">
                            <div class="card-body">
                                <p id="vitals_noneText" class="d-none">
                                    <span class="bold">No Vitals Recorded</span>
                                </p>
                                <!-- set class d-none when live -->
                                <div class="row" id="vitals_section">
                                    <div class="col-md-6">
                                        <span class="float-left text-primary">Recent</span><br>
                                        <div class="recent-vitals-taken">
                                            <span>
                                                No vitals recorded
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="float-left text-primary">Previous</span><br>
                                        <div class="previous-vitals-taken">
                                            <span>
                                                No vitals recorded
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="pr-3 pb-2">
                                <a href="javascript:;" class="pull-right text-slate-900 text-primary">View All</a>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<!--New Prescription section-->
<section style="margin-bottom: 50px; margin-top: 50px;">
    <h4 class="bold text-uppercase mb-2">Transfusions</h4>
    <!--Table Button section ontop-->
    <div class="row pl-3 col-md-12 ">
        <!-- <span class="btn btn-sm bg-success mr-2">View Previous Prescriptions</span> -->
        <!-- <span class="btn btn-md bg-warning mr-2">Reconciliation</span> -->
        <!-- <span class="btn btn-sm bg-secondary text-slate-900 mr-2">External Rx Hx</span> -->
        <!-- <span class="btn btn-md text-slate-900 mr-2" style="background-color: #2d3436;">Rx Plans</span> -->

        <input type="search" class="form-control" style="width: 30%; height: 100%; margin-left: auto;" placeholder="Search..." aria-controls="transfusions_table">
        <!-- <span class="btn btn-md bg-success" style="margin-left: 56%;"><i class="fa fa-eye text-slate-900" aria-hidden="true"></i>View</span> -->

    </div>
    <!--New prescription table-->
    <div class="table-scrollable ">
        <table class="table table-hover order-column full-width new_prescription_table" id="transfusions_table">
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
    <!-- php: if ($isCurrentVisit) { -->
        <!--Button section below table -->
        <div class="row mt-4 pl-3">
            <a class="btn btn-sm text-slate-900" style="background-color: #636e72;" onclick="javascript:$('#transfusionForm').toggle(500); moveToId('transfusionForm');currentForm='transfusion'">Add Transfusion</a>




        </div>

    <!-- php: } -->
</section>

<br />
<hr />

<div class="modal fade" id="viewTransfusionDialog" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
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


<!--Add Transfusion-->
<!-- php: if ($isCurrentVisit) { -->
    <!--Might have to change the controller to requested transfusion , seperate it from medications-->
    <!-- php: = $this->Form->create(null, ['id' => 'transfusionForm', 'url' => ['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id], 'id' => 'transfusionForm', 'style' => 'display:none;', 'onsubmit'... -->
    <h3>Add Transfusion</h3>
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
                            <input type="checkbox" checked="checked" name="in_house_medication_status" onclick="updatePrescriptionType(this.checked);">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Internal Drugs-->
                <div class="form-group row" id="stock_drugs">
                    <label class="control-label col-md-4">Internal Drugs
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick drug-related-sections" onchange="getModifiers();" data-size="10" title="Drug / Form / Dosage" name="transfusion_drug_stock_id" id="transfusion_drug_stock_select" data-live-search="true" required>

                        </SearchableSelectField>
                    </div>
                </div>

                <!--All Drugs (for exernal pharmacy)-->
                <div class="form-group row" id="all_drugs" style="display: none">
                    <label class="control-label col-md-4">All Drugs
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" onchange="$('#transfusionForm').validate().element('#drug_id_transfusion');" data-size="10" title="Select Transfusion" name="transfusion_id" id="drug_id_transfusion" data-live-search="true">

                        </SearchableSelectField>
                    </div>
                </div>

                <div class="form-group row" id="stock_drugs">
                    <label class="control-label col-md-4">Modifier
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick drug-related-sections" onchange="getIndications();" data-size="10" title="Select Modifier" name="transfusion_modifier_id" id="transfusion_modifier_select" data-live-search="true" required>

                        </SearchableSelectField>
                    </div>
                </div>
                <div class="form-group row" id="stock_drugs">
                    <label class="control-label col-md-4">Indications
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick drug-related-sections" onchange="" data-size="10" title="Set Indication" name="transfusion_indicator_id" id="transfusion_indicator_select" data-live-search="true" required>

                        </SearchableSelectField>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="control-label col-md-4"> Administer Transfusion Dose
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input type="text" id="administer_transfusion" data-required="1" placeholder="Administer transfusion Dose" class="form-control  ui-autocomplete-input" required>
                        </div>
                        <div class="mt-2">
                            <span id="transfusion_calculator" class="btn btn-xs btn-primary">Calculator</span>
                        </div>


                    </div>
                </div>

                <!--Infuse Over-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Infuse Over (hr)
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <input type="text" id="transfuse_over" data-required="1" placeholder="Enter Duration of Infuse Over (hr)" class="form-control " />
                    </div>
                </div>

                <div class="form-group row">
                    <label class="control-label col-md-4">Route Of Administration
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" onchange="" data-size="5" data-required="1" data-live-search="true" class="form-control " name="route_of_administration" id="route_of_administration_id" required>
                            <option value="">Select Administration Route</option>
                            <!-- php: foreach ($dosageForms as $key => $dosageForm) { -->
                                <option value="<!-- php: = $key -->"><!-- php: = h($dosageForm) --></option>
                            <!-- php: } -->
                        </SearchableSelectField>
                    </div>
                </div>


                <div class="form-group row">
                    <label class="control-label col-md-4">Priority
                    </label>
                    <div class="col-md-7">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="priority" id="stat_radio" checked value="1" checked>
                            <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Routine</span></label>
                        </div>
                    </div>
                </div>

                <!--Start & End Date-->
                <div class="form-group row">
                    <label class="control-label col-md-4"> Date and Time
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <!-- <input id="input-picker" class="w-100" /> -->
                            <input id="transfusion_date_range" placeholder="Click to select date range" data-required="1" class="form-control" readonly='true' class="w-100" />
                        </div>


                        <div class="mt-2  d-none" id="transfusion_dose_desc_section">
                            <span class="mr-2">First Dose: <b id="transfusion_first_dose_date"></b></span>
                            <!-- <span class="mr-2">Number of Day(s): <b id="transfusion_number_of_days"></b></span> <br> -->
                            <!-- <span id="mr-2">Frequency: <b id="transfusion_frequency_schedule"></b></span> <br> -->
                            <span class="mr-2">Quantity: <b id="transfusion_quantity"></b></span> <br/>
                            <input type="hidden" name="transfusion_quantity" id="transfusion_quantity_bags">
                            <a href="javascript:;" id="transfusion_scheduled_time" onclick="createInfusionSchedule()" class="text-success d-none" data-toggle="modal" data-target="#scheduleTimeModal">Schedule Time</a> <br>
                            <ul style="text-decoration: none;">
                                <!-- <li>08/03/2022 11:00pm</li> -->
                            </ul>

                        </div>
                    </div>
                </div>



            </div>

            <div class="col-md-6">

                <div class="form-group row" id="patient_pregnant" style="display:none">
                    <label class="control-label col-md-4">Has Patient been pregnant in past 3 months?
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-4">

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="patient_pregnant" id="inlineRadio1" value="Yes">
                            <label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="patient_pregnant" id="inlineRadio2" value="No">
                            <label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
                        </div>

                    </div>
                </div>
                <div class="form-group row" id="patient_edd" style="display:none">
                    <label class="control-label col-md-4">EDD
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <input type="text" class="form-control" readonly='true' name="patient_estimated_delivery_date" id="patient_estimated_delivery_date" placeholder="Previous Estimated Delivery Date">

                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-4">Has Patient been transfused in past 3 months?
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-4">

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="patient_transfused" id="inlineRadio1" value="Yes">
                            <label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="patient_transfused" id="inlineRadio2" value="No">
                            <label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
                        </div>

                    </div>
                </div>
                <div class="form-group row transfusion_in_3" style="display:none">
                    <label class="control-label col-md-4">Where
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <input type="text" class="form-control" name="previous_transfusion_place" id="previous_transfusion_place" placeholder="Previous transfusion location">

                    </div>
                </div>
                <div class="form-group row transfusion_in_3" style="display:none">
                    <label class="control-label col-md-4">When
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <input type="text" class="form-control" readonly='true' name="previous_transfusion_date" id="previous_transfusion_date" placeholder="Previous transfusion Date">

                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-4">Is Patient IgA deficient?
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="iga_deficient" id="inlineRadio1" value="Yes">
                            <label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="iga_deficient" id="inlineRadio2" value="No">
                            <label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
                        </div>

                    </div>
                </div>
                <div class="form-group row transfusion_in_3" style="display:none">
                    <label class="control-label col-md-4">Known Antibodies
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <input type="text" name="known_antibodies" id="known_antibodies_id" class="form-control" id="" placeholder="type known Antibodies">

                    </div>
                </div>
                <div class="form-group row transfusion_in_3" style="display:none">
                    <label class="control-label col-md-4">Ordering Provider
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <input type="text" name="ordering_provider" id="ordering_provider_id" class="form-control" id="" placeholder="type Ordering Provider">

                    </div>
                </div>

               

                <!--Bill-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Charge Bill To
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <SearchableSelectField class="form-control  patient_insurance_setters show-menu-arrow show-tick" onchange="" data-required="1" data-size="5" data-live-search="true" class="form-control " name="bill_to_id" id="bill_to_id_transfusion" required>
                        </SearchableSelectField>
                    </div>
                </div>

                <!--Service Place-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Service Place
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " onchange="javascript:updateRefillDate(value);" name="service_place" id="service_place_transfusion" required>
                            <option value="">Select...</option>
                            <option value="0" selected>Place 1</option>
                            <option value="1">Place 2</option>
                        </SearchableSelectField>
                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" id="hidden" name="request_type" value="new_request_medication">
        <div class="row">
            <div class="offset-md-6 col-md-6">
                <button id="submit_transfusion_form" class="btn btn-info">Submit</button>
                <button type="button" id="resetMedication" class="btn btn-default" onclick='clearMedications()'>Reset</button>
            </div>
        </div>
    </div>
    <!-- php: = $this->Form->end(); -->
<!-- php: } -->



<!-- transfusion dose calculator modal-->
<div class="modal fade" id="transfusionCalculatorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Transfusion Calculator</h5>
                <span class="pull-left" style="color: red;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase "><b>Transfusion Calculation for “<span class="modal_drug_title"></span>”</b>
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


                            <dl class="item-property tablet_section">
                                <dt>transfusion Details</dt>
                                <dd>
                                    <p>
                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse"> Volume (ml):</label>
                                        <div class="col-md-7">
                                            <input type="text" data-required="1" placeholder="Enter transfusion Volume (ml)" id="transfusion_volume" class="form-control ">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-4 d-flex flex-row-reverse">Rate (ml/hr):</label>
                                        <div class="col-md-7">
                                            <input type="text" data-required="1" placeholder="Enter Rate of transfusion (ml/hr)" id="rate_transfusion" list="rate_suggestions" class="form-control ">
                                            <datalist id="rate_suggestions">
                                                <option value="125">
                                                <option value="100">
                                                <option value="50">
                                            </datalist>
                                            <span id="transfusion_cal" class="btn btn-xs btn-primary float-right mt-2">Calculate</span>
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
                                        <input type="number" data-required="1" id="transfusion_over_cal" readonly class="form-control ">
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
                    <button id="save_transfusion_cal" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                        save</button>
                    <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                        Cancel</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!--//transfusion dose calculator modal-->
<div class="modal fade" id="compatibility_tests_view_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Transfusions</h5>
                <span class="pull-left" style="color: red;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="mb-2">
                <span class="label label-lg bg-primary text-uppercase "><b>Compatibility Lab Test For Transfusion </b>
                </span>
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


                            <dl class="item-property tablet_section">
                                <dt>Compatibility Tests</dt>
                                <dd>
                                    <p>
                                        <div class="form-group row">
                                            <div class="offset-md-2 col-md-7" style="font-size:18px">
                                                This transfusion Request requires the following compatibility laboratory tests
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <!-- <form class="offset-md-2 col-md-7" id="transfusion_compatibility_form"> -->
                                            <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestLabs', 'action' => 'addRequestLab', $patient->id, $selectedVisit->id], 'id' => 'transfusion_compatibility_form', 'class' => "offset-md-2 col-md-7", 'style' => '']); -->
                                                <ol id="compatibilty_lab_tests_list" style="font-size:18px">

                                                </ol>
                                            </form>
                                        </div>
                                    </p>
                                </dd>
                            </dl>








                            <hr>


                            <hr>






                            <hr>






                        </article>
                        <!--//Requested Service Details-->





                    </div> <!-- row.// -->



                    <hr>


                </div> <!-- row.// -->
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                    <button id="transfusion_lab_request_button" onclick="requestCompatibilityLabTest()" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                        Noted
                    </button>
                    <!-- <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                        Cancel</button> -->
                </div>
            </div>
        </div>

    </div>
</div>



<script>
    const transfusion_BillTo = "<!-- php: = $billTo -->"
    const addRequestTransfusion_transfusion_link = '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestTransfusion', $patient->id, $selectedVisit->id, ]) -->'
    const cancelRequestTransfusion_transfusion_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'cancelRequestTransfusion',]) -->/"
    const getDrugTransfusions_transfusion_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getDrugTransfusions']) -->"
    const getTransfusionModifiers_transfusion_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getTransfusionModifiers']) -->"
    const getTransfusionIndications_transfusion_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getTransfusionIndications']) -->"
    const viewTransfusion_transfusion_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewTransfusion']) -->?id="
    const getAllTransfusions_transfusion_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => $continuousCare ? 'getAllVisitTransfusions' :'getAllTransfusions', $patient->id, $selectedVisit->id, ]) -->"
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requesttransfusionservices.js') -->
`;

export default function ElementElementPatientvisitRequesttransfusionservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
