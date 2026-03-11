const rawHtml = `

<!-- php: $requestServices = isset($requestServices) ? $requestServices : $selectedVisit->request_services; -->

<h4>Services</h4>

<div class="table-scrollable">
    <table class="table table-hover order-column full-width">
        <thead>
            <tr>
                <th> Date</th>
                <th> Service</th>
                <th> Comment </th>
                <th> Cost (GHS) </th>
                <th> Status </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($requestServices as $service): -->
                <tr class="odd gradeX">
                    <td><!-- php: = $service->date_created --></td>
                    <td><!-- php: = $service->has('service_stock')? $service->service_stock->procedure_name : '' --></td>
                    <td><!-- php: = $service->comment --></td>
                    <td>
                        <!-- php: foreach($service->invoice_items as $invoiceItem) { -->
                            <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
                                <span class="mdl-chip__contact mdl-color--<!-- php: = $invoiceItem->insurance_profile_policy_id != -1 ? 'orange' : ($invoiceItem->status_id == 27 ? 'green' : 'red') --> mdl-color-text--white">
                                    <i class="fa fa-<!-- php: = $invoiceItem->insurance_profile_policy_id != -1 ? 'credit-card' : ($invoiceItem->status_id == 27 ? 'money' : 'question') -->"></i>
                                </span>
                                <span class="mdl-chip__text">
                                    <strong><!-- php: = $invoiceItem->insurance_profile_policy_id != -1 ? 'Insurance' : ($invoiceItem->status_id == 27 ? 'Paid' : 'Not Paid') -->: </strong> 
                                </span>
                                <span class="mdl-chip__text" style="float: right;">
                                    GHS <!-- php: = $this->Number->precision($invoiceItem->final_amount, 2) -->
                                </span>
                            </span>
                            <br/>
                        <!-- php: } -->
                        <!-- php: // = $service->has('invoice_item') ? "<span class='badge badge-" . ($service->invoice_item->status_id == 27 ? "success" : "danger") . "'>" . ($service->invoice_item->status_id == 27 ? "&nbsp;Paid&nbsp;" : "Pend") . "</span> " . $this->Numbe... -->
                    </td>
                    <td><!-- php: = $service->has('status') ? $service->status->name : 'N/A' --></td>

                    <td>
                        
                        <!-- php: if(!in_array($service->status_id, [23, 24])) { -->
                            <a href="<!-- php: =$this->Url->build(['controller'=>'RequestServices','action'=>'cancelRequestService',$service->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Cancel') --> btn-xs">
                                Cancel
                            </a>
                        <!-- php: } -->
                        
                        <!-- php: if($service->status_id == 20) { -->
                            <a href="<!-- php: =$this->Url->build(['controller'=>'RequestServices', 'action'=>'processService', $service->id, 'Done']) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Complete') --> btn-xs">
                                Complete
                            </a>
                        <!-- php: } -->
                    </td>
                </tr>
            <!-- php: endforeach; -->									
        </tbody>
    </table>
</div>

<!-- php: if(!isset($hidePreviousProcedures) || $hidePreviousProcedures == false) { -->
<div style="margin-top: 40px;" id="previous_services_button">
    <div style="float: right;"><a class="btn btn-sm btn-success" onclick="javascript:$('#previous_services').toggle(500); moveToId('previous_services_button');">View Previous Services</a></div>
    <div style="clear: both;"></div>
</div>
<!-- php: } -->

<!-- php: if(!isset($hidePreviousProcedures) || $hidePreviousProcedures == false) { -->
<div id="previous_services" style="display: none;">
    
    <!-- php: foreach($patientVisits as $pVisit) { $dateDiff = $pVisit->date_created->diffForHumans($selectedVisit->date_created); if(sizeof($pVisit->request_services) <= 0 || $pVisit->id == $selectedVisit->id || (!stristr($dateDiff, 'ago') && !stristr($... -->

        <br/><br/>
        <div class="col-sm-12"><h4>Details for visit: <!-- php: = $pVisit->date_created->nice() . ' (' . $dateDiff . ')' --></h4></div>
        
        <div class="table-scrollable">
            <table class="table table-hover order-column full-width">
                <thead>
                    <tr>
                        <th> Date</th>
                        <th> Service</th>
                        <th> Comment </th>
                        <th> Status </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- php: foreach ($pVisit->request_services as $service): -->
                        <tr class="odd gradeX">
                            <td><!-- php: = $service->date_created --></td>
                            <td><!-- php: = $service->has('service_stock')? $service->service_stock->procedure_name : '' --></td>
                            <td><!-- php: = $service->comment --></td>
                            <td><!-- php: = $service->has('status') ? $service->status->name : 'N/A' --></td>
                        </tr>
                    <!-- php: endforeach; -->									
                </tbody>
            </table>
        </div>

    <!-- php: } -->
</div>
<!-- php: } -->

<br/>
<hr/>
<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestServices', 'action' => 'addRequestService', $patient->id, $selectedVisit->id] , 'id'=>'serviceForm']); -->
    <h3>Make a new Service Request</h3>

    <div class="form-body">
        <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]); -->
        <div class="form-group row">
            <label class="control-label col-md-3">Service
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Service" name="service_stock_id" id="service_stock_id" data-live-search="true"  required>
                    <!-- option value="">Select...</option -->
                    <!-- php: foreach($serviceStocks as $item) { -->
                            <option value="<!-- php: = $item->id -->" data-content="<!-- php: = $item->procedure_name -->  <span class='badge badge-danger'><!-- php: = $item->facility_price --></span>" ?></option>
                    <!-- php: } -->
                </SearchableSelectField>
            </div>
        </div> 

        <div class="form-group row">
            <label class="control-label col-md-3">Quantity
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <input type="number" min="1" step="1" name="quantity" id="quantity" value="1" data-required="1" placeholder="" class="form-control input-height" />
            </div>
        </div> 
        
        <div class="form-group row">
            <label class="control-label col-md-3">Status
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Status" name="status_id" id="status_id" data-live-search="true"  required>
                    <option selected value="20" data-content="Pending" ?></option>
                    <option value="23" data-content="Completed" ?></option>
                </SearchableSelectField>
            </div>
        </div>

        <div class="form-group row">
            <label class="control-label col-md-3">Charge Bill To
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required >
                    <option value="">Select Bill To</option>
                    <option <!-- php: = $billTo == -1 ? 'selected' : '' --> value="-1">Patient</option>
                    <!-- php: foreach($providers as $provider) { -->
                            <option <!-- php: = $billTo == $provider->id ? 'selected' : '' --> value="<!-- php: = $provider->id -->" data-content="<!-- php: = $provider->insurance_profile->name --><span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile_type->name : '' --></span>"></option>
                        <!-- php: } -->
                </SearchableSelectField>
            </div>
        </div>

        <div class="row">
            <div class="offset-md-4 col-md-8">
                <button type="submit" class="btn btn-info">Submit</button>
                <button type="button" class="btn btn-default" onclick = 'clearService()'>Reset</button>
            </div>
        </div>
    </div>
            
<!-- php: =$this->Form->end(); -->
`;

export default function ElementElementPatientvisitRequestprocedureservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
