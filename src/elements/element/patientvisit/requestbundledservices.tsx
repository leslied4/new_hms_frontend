const rawHtml = `
<!-- php: //$requestLabs = isset($requestLabs) ? $requestLabs : $selectedVisit->request_labs; -->

<!--Lab Table section-->
<section class="mb-5">

    <h4 class="col-md-12" id="scanTableDescription">
        Bundled Services
    </h4>

    <div class="table-scrollable" id="labTableData">
        <table class="table table-hover order-column full-width" id="bundled_service_table" style="width: 100%">
            <thead>
                <tr>
                    <th scope="col">Date Created</th>
                    <th scope="col">Name</th>
                    <th scope="col">Cost (GHS)</th>
                    <th scope="col">Status</th>
                    <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

        <div class="" id="labModals"></div>
    </div>

    <br />




    <hr class="mt-3" />

</section>


<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'BundledServices', 'action' => 'addRequestBundleService', $patient->id, $selectedVisit->id], 'id' => 'bundle_form_submit', 'class' => 'row',]); -->
        <div class="form-body col-md-7 px-5">
            <h3>Request A Bundled Service</h3>
            <!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->

            <!--Lab Test - internal -->
            <div class="form-group row">
                <label class="control-label col-md-3">Bundled Service
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="bundled_service_id" id="bundled_services_id" title="Select Bundled Service" data-live-search="true" onchange="bundledServiceChange(this, event)" data-max-options="1" multiple required>
                    </SearchableSelectField>
                </div>

            </div>

            <!--Charge bill to-->
            <div class="form-group row">
                <label class="control-label col-md-3">Charge Bill To
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">

                <SearchableSelectField class="form-control input-height patient_insurance_setters show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="scan_bill_to_id" data-max-options="1" multiple  required>
                    </SearchableSelectField>
                </div>
            </div>

            <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]); -->

            <div class="row mt-3">
                <div class="offset-md-3 col-md-8">
                    <button type="submit" class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-default" onclick='clearScan()'>Reset</button>
                </div>
            </div>
        </div>
        <style>

            .form-infomation::-webkit-scrollbar {
                width: 10px;
            }

            /* Track */
            .form-infomation::-webkit-scrollbar-track {
                background: #f1f1f1; 
            }
            
            /* Handle */
            .form-infomation::-webkit-scrollbar-thumb {
                background: #888; 
            }

            /* Handle on hover */
            .form-infomation::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
            
        </style>
        <div class="form-infomation col-md-5" id="process_bundled_items" style="height: 500px;overflow-y: auto;">

        </div>
    <!-- php: = $this->Form->end() -->

<!-- php: } -->


<script>
    const populateBundledServices_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getBundledServices']) -->"
    const continuousCareBundledCare = '<!-- php: = $continuousCare -->'
    const requestBundleServiceGenerator_link = "<!-- php: = $this->Url->build(['controller' => 'BundledServices', 'action' => $continuousCare ? 'getAllRequestedBundledServices' : 'getRequestedBundledServices', $patient->id, $selectedVisit->id, ]) -->"
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestbundledservices.js') -->
`;

export default function ElementElementPatientvisitRequestbundledservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
