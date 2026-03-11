import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/CreditClaims/diag_backup.php';
const rawHtml = `
<div class="modal fade" id="chargesAndDiagnoses" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width:55%;">
    <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title" id="editInvestigationDialogueTitle">Tariff and Diagnoses</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="card card-box">
                    <div class="card-head" style="background-color:#dee2e6">
                        <header>
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a href="#charges" data-toggle="tab">Tariff</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#giadnoses" data-toggle="tab" onclick="diagnoses()">Diagnoses</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#add_service_charge" data-toggle="tab">Add Procedure/Service Tariff</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#add_investigation_charge" data-toggle="tab">Add Investigation Tariff</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#add_medication_charge" data-toggle="tab">Add Medication Tariff</a>
                                </li>
                            </ul>
                        </header>
                    </div>
                    <div class="card-body" id="bar-parent">
                        <div class="tab-content">
                            <div class="tab-pane" id="charges">
                                
                            </div>															
                            <div class="tab-pane " id="giadnoses">
                               
                                
                                <!-- <div class="p-2">
                                    <button data-toggle="modal" data-target="#addDiagnosesModal" class="btn btn-secondary btn-xs">Add Diagnosis</button>
                                </div> -->
                            </div>
                            <div class="tab-pane " id="add_service_charge">
                                
                            </div>
                            <div class="tab-pane " id="add_investigation_charge">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Investigation 
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-4">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Investigation" name="investigation_selector" id="investigation_selector" data-live-search="true" required>	
                                            <!-- php: foreach($labTests as $l): -->				
                                                <option data-content="<!-- php: = $l->name -->" data-investigation-invoice-id="<!-- php: =$invoice->id -->" data-investigation-cost="<!-- php: = $l->value_new -->" 
                                                data-provider-id="<!-- php: =$invoice->insurance_profile_policy_id -->" data-status-id="<!-- php: =$invoice->insurance_invoice_items[0]->status_id -->" 
                                                data-investigation-name="<!-- php: = $l->name -->" data-investigation-id="<!-- php: = $l->id -->">
                                            </option>					
                                            <!-- php: endforeach; -->										
                                        </SearchableSelectField>
                                        <input hidden type="text" id="investigation_status_id" name="status_id"/>
                                        <input hidden type="text" id="investigation_provider_id" name="insurance_profile_policy_id"/>
                                        <input hidden type="text" id="investigation_cost" name="investigation_cost"/>
                                        <input hidden type="text" id="investigation_invoice_id" name="invoice_id">
                                        <input hidden type="text" id="investigation_id" name="item_id">
                                        <input hidden type="text" id="investigation_name" name="item_name">
                                    </div>
                                </div>		
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Action
                                        <span class="required">  </span>
                                    </label>
                                    <div class="col-md-8">
                                        <button class="btn btn-info btn-xs" onclick="saveInvestigation()">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane " id="add_medication_charge">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Medication
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-4">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Medication" name="medication_selector" id="medication_selector" data-live-search="true" required>					
                                            <!-- php: foreach($medications as $m): -->				
                                                <option data-content="<!-- php: = $m->drug->full_name --> <span class='badge badge-danger'><!-- php: = $m->drug->item_code --></span>" data-invoice-id="<!-- php: =$invoice->id -->"
                                                    data-status-id="<!-- php: =$invoice->insurance_invoice_items[0]->status_id -->" data-provider-id="<!-- php: =$invoice->insurance_profile_policy_id -->" 
                                                    data-unit-cost="<!-- php: =$m->unit_selling_price -->" data-item-id="<!-- php: =$m->item_id -->" data-item-name="<!-- php: =$m->drug->full_name -->"
                                                ></option>					
                                            <!-- php: endforeach; -->							
                                        </SearchableSelectField>
                                        <input hidden type="text" id="medication_status_id" name="status_id"/>
                                        <input hidden type="text" id="medication_provider_id" name="insurance_profile_policy_id"/>
                                        <input hidden type="text" id="unit_cost" name="unit_cost"/>
                                        <input hidden type="text" id="medication_invoice_id" name="invoice_id">
                                        <input hidden type="text" id="item_id" name="item_id">
                                        <input hidden type="text" id="item_name" name="item_name">
                                    </div>
                                </div>		
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Action
                                        <span class="required">  </span>
                                    </label>
                                    <div class="col-md-8">
                                        <button class="btn btn-info btn-xs" onclick="saveMedication()">Submit</button>
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
</div>
`;

export default function CreditClaimsDiagBackupPage() {
  return (
    <PageShell title="CreditClaims/diag_backup.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
