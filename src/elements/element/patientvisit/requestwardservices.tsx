const rawHtml = `
<!-- php: $requestedWardServices = isset($requestedWardServices) ? $requestedWardServices : $selectedVisit->requested_ward_services; -->

<!--Requested Ward Services Table section-->
<section class="mb-5">

    <div class="table-scrollable" id="labTableData">
        <table class="table table-hover order-column full-width" id="ward_service_table1" style="width: 100%">
            <thead>
                <tr>
                    <th scope="col">Date Created</th>
                    <th scope="col">Service</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Cost (GHS)</th>
                    <th scope="col">Requested By</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

        <div class="" id="labModals">

        </div>
    </div>

    <br />

    <hr class="mt-3" />

</section>

<!--New Ward Service Request Section-->
<!-- php: if ($isCurrentVisit) { -->

    <form id="wardServiceForm" method="post">
        <h3>Add Other Service</h3>
        <!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
        <div class="form-body">
        
            <!--Lab Test - internal -->
            <div class="form-group row">
                <label class="control-label col-md-3">Services
                    <span class="required"> * </span>
                </label>
                <div class="col-md-5">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="ward_service_id" id="ward_service_id" title="Select Service" data-live-search="true" required>
                    <option value="">Select Service</option>
                    <!-- php: foreach ($wardServices as $key => $service) { -->
                        <option value="<!-- php: = $service->id -->" data-content='<!-- php: = $service->name --> <span class="badge badge-danger">Price:<!-- php: = $service->price --></span>'>
                            <!-- php: = $service->name -->(Price => <!-- php: = $service->price -->)
                        </option>
                    <!-- php: } -->
                </SearchableSelectField>
            </div>

            </div>
            
            <!--Quantity-->
            <div class="form-group row">
                <label class="control-label col-md-3">Quantity
                    <span class="required"> * </span>
                </label>
                <div class="col-md-5">

                    <input type="number" class="form-control input-height show-menu-arrow show-tick"class="form-control input-height" name="quantity" id="quantity" placeholder="Quantity" required/>


                </div>
            </div>
            <!--Charge bill to-->
            <div class="form-group row">
                <label class="control-label col-md-3">Charge Bill To
                    <span class="required"> * </span>
                </label>
                <div class="col-md-5">

                    <SearchableSelectField class="form-control input-height patient_insurance_setters show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required>
                    </SearchableSelectField>
                </div>
            </div>

            <!--Service Place-->
            <div class="form-group row">
                <label class="control-label col-md-3">Service Place
                    <span class="required"> * </span>
                </label>
                <div class="col-md-5">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height"  name="ward_id" id="ward_id" data-max-options="1" required readonly>
                    <!-- php: if (($admission_ward)) { -->
                        <option value="<!-- php: = $admission_ward['id'] -->">
                            <!-- php: = $admission_ward['name'] -->
                        </option>
                    <!-- php: } -->
                    </SearchableSelectField>
                </div>
            </div>
           
            </div>

            <div class="row">
                <div class="offset-md-3 col-md-8">
                    <button type="submit" class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-default" onclick='clearLabsForm()'>Reset</button>
                </div>
            </div>
    </form>
    <!-- </?= $this->Form->end() ?> -->

<!-- php: } -->

<div class="" id="my_alert_box">
</div>

<!-- php: = $this->Html->script('/js/cornerstone.js'); -->
<!-- php: = $this->Html->script('/js/cornerstoneMath.js'); -->
<!-- php: = $this->Html->script('/js/cornerstoneTools.js'); -->
<!-- php: = $this->Html->script('/js/dicomParser.js'); -->
<!-- php: = $this->Html->script('/js/cornerstoneWADOImageLoader.js'); -->
<!-- php: = $this->Html->script('/js/uids.js'); -->
<script>window.cornerstoneWADOImageLoader || document.write('<script src="https://unpkg.com/cornerstone-wado-image-loader">\x3C/script>')</script>
<!-- php: = $this->Html->script('/js/initializeWebWorkers.js'); -->
<!-- php: = $this->Html->script('/js/custom_scan_viewer.js'); -->

<script>
    const wardContinuousCare = '<!-- php: = $continuousCare -->'
    const getAllRequestedWardService_ward_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllRequestedWardService' :'getRequestedWardService', $patient->id, $selectedVisit->id, ]) -->"
    const addWardServiceRequest_ward_link = '<!-- php: = $this->Url->build(['controller'=>'Patients', 'action'=>'addWardServiceRequest', $patient->id, $selectedVisit->id]); -->'
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestwardservices.js') -->
`;

export default function ElementElementPatientvisitRequestwardservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
