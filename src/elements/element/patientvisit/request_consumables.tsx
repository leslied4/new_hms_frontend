const rawHtml = `
<!-- php: $billTo = null; //$requestLabs = isset($requestLabs) ? $requestLabs : $selectedVisit->request_labs; -->

<!--Lab Table section-->
<section class="mb-5">

    <h4 class="col-md-12" id="scanTableDescription">
        Consumables
    </h4>

    <div class="table-scrollable" id="labTableData">
        <table class="table table-hover order-column full-width" id="consumables_table">
            <thead>
                <tr>
                    <th scope="col">Date Created</th>
                    <th scope="col">Name</th>
                    <th scope="col">Cost (GHS)</th>
                    <th scope="col">Quantity</th>
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
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Patients', 'action' => 'addConsumablesRequest', $patient->id, $selectedVisit->id], 'id' => 'consumable_form_submit', 'class' => 'row',]); -->
        <div class="form-body col-md-7 px-5">
            <h3>Add Consumable</h3>
            <!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->

            <!--Lab Test - internal -->
            <div class="form-group row">
                <label class="control-label col-md-3">Consumable
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="consumable_id" id="consumables_service_id" title="Select Consumables" data-live-search="true" onchange="" data-max-options="1" multiple required>
                    </SearchableSelectField>
                </div>

            </div>
            <div class="form-group row">
                <label class="control-label col-md-3">Quantity
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <input class="form-control input-height  show-menu-arrow show-tick" name="quantity" id="quantity_id" required />
                </div>

            </div>



            <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]); -->

            <div class="row mt-3">
                <div class="offset-md-3 col-md-8">
                    <button type="submit" class="btn btn-info">Submit</button>
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
    const getConsumableStocks_consumable_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getConsumableStocks', $selectedVisit->id]) -->"
    const consumableBillTo = '<!-- php: = $billTo -->'
    const consumableContCare = '<!-- php: = $continuousCare -->'
    const getUsedConsumables_consumable_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllUsedConsumables' : 'getUsedConsumables', $patient->id, $selectedVisit->id, ]) -->"
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/request_consumables.js') -->
`;

export default function ElementElementPatientvisitRequestConsumables() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
