import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/PatientVisits/discharge_summary.php';
const rawHtml = `
<!-- php: $admission_record = null; foreach ($selectedVisit->patient_visit_admissions as $admission) { if($admission->outcome_setter_id == null) { $admission_record = $admission; break; } else { $admission_record = $admission; } } -->
<div>									
	<div class="row">
		<div class="col-md-12 col-sm-12">
			<div class="card card-box">
				<div class="card-body" id="bar-parent">
                <!-- php: if ((sizeof($selectedVisit->patient_visit_admissions) > 0 && $admission_record->outcome_setter_id != null) || ((sizeof($selectedVisit->patient_visit_admissions) == 0))): -->
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'setDischargedVisitOutcome'], 'class' => 'form-horizontal', 'id' => 'discharge_modal_form']) -->
                        <div class="form-body" id="discharge_modal_form_body">
                            <div class="form-group row">
                                <!-- php: if(sizeof($selectedVisit->patient_visit_admissions)): -->
                                    <label class="control-label text-uppercase bold col-md-4">Admission Date:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $selectedVisit->patient_visit_admissions[0]->admission_start->nice() -->
                                    </div>
                                <!-- php: else: -->
                                    <label class="control-label text-uppercase bold col-md-4">Visit Date:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $selectedVisit->date_created->nice() -->
                                    </div>
                                <!-- php: endif; -->
                            </div>
                            <!-- php: if(sizeof($selectedVisit->patient_visit_admissions)): -->
                                <div class="form-group row">
                                    <label class="control-label text-uppercase bold col-md-4">Discharge Date:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $selectedVisit->patient_visit_admissions[0]->outcome_setter_id == null ? "You need to End admission to Discharge Patient": $selectedVisit->patient_visit_admissions[0]->admission_end->nice() -->
                                    </div>
                                </div>
                            <!-- php: endif; -->
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Admission Diagnosis:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <ul>
                                        <!-- php: foreach ($selectedVisit->patient_visit_diagnoses as $key => $diagnosis): -->
                                            <!-- php: if (isset($diagnosis->patient_visit_provisional_diagnoses)) { foreach ($diagnosis->patient_visit_provisional_diagnoses as $key => $provi_diagnosis): -->
                                                <li>
                                                    <!-- php: = $provi_diagnosis->diagnosis->name -->
                                                    <span class="badge badge-danger"><!-- php: = $provi_diagnosis->diagnosis->code --></span>
                                                    <span class="badge badge-success " style="background:green;color: white">Provisional</span>
                                                </li>
                                            <!-- php: endforeach; } -->
                                            <!-- php: if (isset($diagnosis->patient_visit_differential_diagnoses)) { foreach ($diagnosis->patient_visit_differential_diagnoses as $key => $provi_diagnosis): -->
                                                <li>
                                                    <!-- php: = $provi_diagnosis->diagnosis->name -->
                                                    <span class="badge badge-danger"><!-- php: = $provi_diagnosis->diagnosis->code --></span>
                                                    <span class="badge badge-warning" style="background:orange;color: white">Differential</span>
                                                </li>
                                            <!-- php: endforeach; } -->
                                            <!-- php: if (isset($diagnosis->patient_visit_other_diagnoses)) { foreach ($diagnosis->patient_visit_other_diagnoses as $key => $provi_diagnosis): -->
                                                <li>
                                                    <!-- php: = $provi_diagnosis->diagnosis->name -->
                                                    <span class="badge badge-danger"><!-- php: = $provi_diagnosis->diagnosis->code --></span>
                                                    <span class="badge badge-secondary " style="background:grey;color: white">Other</span>
                                                </li>
                                            <!-- php: endforeach; } -->
                                        <!-- php: endforeach; -->
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Discharge Diagnosis:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <div>
                                        <!-- php: if ($primary_diagnosis) { -->
                                            <!-- php: = $primary_diagnosis->patient_visit_primary_diagnoses[0]->primary_diagnosis->name -->
                                            <span style="background: <!-- php: = $primary_diagnosis->patient_visit_primary_diagnoses[0]->ill_episode == "chronic" ? "#9b59b6" : "#34ace0" -->" class="badge align-self-end">
                                                <!-- php: =$primary_diagnosis->patient_visit_primary_diagnoses[0]->ill_episode -->
                                            </span>
                                            <span class="badge badge-danger"><!-- php: = $primary_diagnosis->patient_visit_primary_diagnoses[0]->code --></span>
                                            <span class="badge badge-primary " style="background:red;color: white">Primary</span>
                                        <!-- php: } else { echo "N/A"; } -->
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Consults:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <!-- php: = $selectedVisit->patient_visit_purpose->name -->
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Procedures:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Discharge Diagnosis Assessment:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <input type="text" class="form-control full-width" name="diagnosis_assessment"/>
                                    <input type="hidden" name="patient_visit_id" value="<!-- php: = $selectedVisit->id -->">
                                    <input type="hidden" name="visit_outcome_id" value="1">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Discharge To:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <SearchableSelectField name="discharge_to_id" class="form-control full-width"id="">
                                        <option selected value="Home">Home</option>
                                        <option  value="Home with Home Care Services">Home with Home Care Services</option>
                                        <option  value="Referred to Another Facility">Referred to Another Facility</option>
                                        <option  value="Transferred to Higher-Level Facility">Transferred to Higher-Level Facility</option>
                                        <option  value="Transferred to Lower-Level Facility">Transferred to Lower-Level Facility</option>
                                        <option  value="Rehabilitation Center">Rehabilitation Center</option>
                                        <option  value="Nursing Home">Nursing Home</option>
                                        <option  value="Hospice">Hospice</option>
                                        <option  value="Against Medical Advice">Against Medical Advice</option>
                                        <option  value="Left Without Being Seen">Left Without Being Seen</option>
                                        <option  value="Police Custody">Police Custody</option>
                                        <option  value="Mortuary">Mortuary</option>
                                        <option  value="Other (Specify)">Other (Specify)</option>
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Discharge Condition:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <SearchableSelectField name="discharge_condition_id" class="form-control full-width"id="">
                                        <option value="Stable">Stable</option>
                                        <option value="Improved">Improved</option>
                                        <option value="Unchanged">Unchanged</option>
                                        <option value="Critical">Critical</option>
                                        <option value="Deteriorating">Deteriorating</option>
                                        <option value="Deceased">Deceased</option>
                                        <option value="Follow-Up Required">Follow-Up Required</option>
                                        <option value="Condition Not Fully Assessed">Condition Not Fully Assessed</option>
                                        <option value="Pending Diagnostic Results">Pending Diagnostic Results</option>
                                        <option value="Patient Left Against Medical Advice">Patient Left Against Medical Advice</option>
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Discharge Medications: (Please select take home medications)
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <ul>
                                        <!-- php: foreach ($prescriptions as $key => $ele): -->
                                            <li class="">
                                                <input type="checkbox" id="scales" name="prescriptions[]" value="<!-- php: = $ele->id -->">
                                                <label for="scales"><!-- php: =$ele->item_stock->item->full_name --></label>
                                               
                                            </li>
                                        <!-- php: endforeach; -->
                                        <!-- php: foreach ($infusions as $key => $ele): -->
                                            <li class="">
                                                <input type="checkbox" id="scales" name="infusions[]" value="<!-- php: = $ele->id -->">
                                                <label for="scales"><!-- php: =$ele->item_stock->item->full_name --></label>
                                               
                                            </li>
                                        <!-- php: endforeach; -->
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Discharge Instructions:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <input type="text" class="form-control full-width" name="diagnosis_instructions"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Pending Labs:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <ul>
                                        <!-- php: foreach($selectedVisit->request_labs as $request_pre): if(!$request_pre->is_completed): -->
                                            <li>
                                                <!-- php: = $request_pre->lab_test->name -->
                                                <span class="badge badge-primary " style="background:red;color: white"><!-- php: = $request_pre->investigation->name --></span>
                                            </li>
    
                                        <!-- php: endif; endforeach; -->
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Follow Up:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <!-- php: = "" -->
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="offset-md-3 col-md-8 ">
                                    <button type="submit" class="btn btn-info">Submit</button>
                                    <button type="button" data-dismiss="modal" class="btn btn-default">Cancel</button>
                                </div>
                            </div>
                        </div>
                    <!-- php: = $this->Form->end() -->
                <!-- php: else: -->
                    <div class="form-body" id="discharge_modal_form_body">
                        <div class="form-group row">
                            <div class="col-md-12  d-flex align-items-end justify-content-center">
                                <span style="font-weight:bold; font-size:18px">
                                    You need to End admission to Discharge Patient
                                </span>
                            </div>
                        </div>

                    </div>
                <!-- php: endif -->
				</div>
			</div>
		</div>
	</div>
</div>
`;

export default function PatientVisitsDischargeSummaryPage() {
  return (
    <PageShell title="PatientVisits/discharge_summary.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
