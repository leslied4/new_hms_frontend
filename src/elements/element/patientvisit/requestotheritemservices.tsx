const rawHtml = `

<!-- php: $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->

<!--New Prescription section-->
<section style="margin-bottom: 50px; margin-top: 50px;">
    <h4 class="bold text-uppercase mb-2">Other Specialty Services</h4>
    <div class="row pl-3 col-md-12 ">
        <input type="search" class="form-control" style="width: 30%; height: 100%; margin-left: auto;" placeholder="Search..." aria-controls="optics_table">
    </div>
    <div class="table-scrollable ">
        <table class="table table-hover order-column full-width new_prescription_table" id="optics_table">
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
</section>

<br />
<hr />

<!--Add Transfusion-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['id' => 'opticalForm', 'url' => ['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id], 'id' => 'opticalForm', 'onsubmit' => "event.preventDefault();"]); -->
    <h3>Add Optical Service</h3>
    <div class="form-body">
        <div class="row">
            <div class="col-md-6">
                <!--Internal Pharmacy Toggle-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Internal Specialty Services
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-2">
                        <label class="switchToggle">
                            <input type="checkbox" checked="checked" name="in_house_medication_status" id='in_house_optic_status_ci' onclick="updatePrescriptionType(this.checked);">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Internal Drugs-->
                <div class="form-group row" id="stock_drugs_prescription">
                    <label class="control-label col-md-4">Internal Specialty Services
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <div>
                            <input class="input-box" name="searchValue" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ced4da; " class="form-control" id="search-optic-drug-box" placeholder="" />
                        </div>
                        <div id="search-optic-drug-params">

                        </div>
                        <div style="display: none">


                            <input type="hidden" name="optic_drug_stock_select" id="optic_drug_stock_id">

                        </div>
                    </div>
                </div>

                <!--All Drugs (for exernal pharmacy)-->
                <div class="form-group row" id="all_drugs" style="display: none">
                    <label class="control-label col-md-4">All Drugs
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" onchange="$('#opticalForm').validate().element('#drug_id_optical');" data-size="10" title="Select Transfusion" name="optical_id" id="drug_id_optical" data-live-search="true">

                        </SearchableSelectField>
                    </div>
                </div>



                <!--Bill-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Quantity
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <input onchange="" type="number" min='0' class="form-control" name="quantity_optical_id" id="quantity_optical_id" required />
                    </div>
                </div>


                <!--Bill-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Charge Bill To
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">

                        <SearchableSelectField class="form-control  patient_insurance_setters show-menu-arrow show-tick" onchange="" data-required="1" data-size="5" data-live-search="true" class="form-control " name="bill_to_id" id="bill_to_id_optical" required>
                        </SearchableSelectField>
                    </div>
                </div>

                <!--Service Place-->
                <div class="form-group row">
                    <label class="control-label col-md-4">Service Place
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control " onchange="javascript:updateRefillDate(value);" name="service_place" id="service_place_optical" required>
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
            <div class="col-md-6">
                <button id="submit_optical_form" class="btn btn-info">Submit</button>
                <button type="button" id="resetMedication" class="btn btn-default" onclick='clearOpticaForm()'>Reset</button>
            </div>
        </div>
    </div>
    <!-- php: = $this->Form->end(); -->
<!-- php: } -->


<script>
    const optical_BillTo = "<!-- php: = $billTo -->"
    const searchOpticStocks_link = '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'searchOpticStocks']) -->'
    const addRequestOpticalService_optical_link = '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestOtherService', $patient->id, $selectedVisit->id, ]) -->'
    const cancelRequestTransfusion_optical_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'cancelRequestTransfusion',]) -->/"
    const viewTransfusion_optical_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewTransfusion']) -->?id="
    const getAll_optical_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => $continuousCare ? 'getAllVisitOtherServices' :'getAllOtherServices', $patient->id, $selectedVisit->id, ]) -->"
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestotheritemservices.js') -->
`;

export default function ElementElementPatientvisitRequestotheritemservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
