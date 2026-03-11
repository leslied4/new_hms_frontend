import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/discharge_summary_cancelled.php';
const rawHtml = `
<!-- php: $admission_record = null; foreach ($selectedVisit->patient_visit_admissions as $admission) { if($admission->outcome_setter_id == null) { $admission_record = $admission; break; } else { $admission_record = $admission; } } -->
<div>									
	<div class="row">
		<div class="col-md-12 col-sm-12">
			<div class="card card-box">
				<div class="card-body" id="bar-parent">
                <!-- php: if ((sizeof($selectedVisit->patient_visit_admissions) > 0 && $admission_record->outcome_setter_id != null) || ((sizeof($selectedVisit->patient_visit_admissions) == 0))): -->
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'setCancelledVisitOutcome'], 'class' => 'form-horizontal', 'id' => 'discharge_modal_form']) -->
                        <div class="form-body" id="discharge_modal_form_body">
                            <div class="form-group row">
                                <!-- php: if(sizeof($selectedVisit->patient_visit_admissions)): -->
                                    <label class="control-label text-uppercase bold col-md-4">Admission Date:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $admission_record->admission_start->nice() -->
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
                                        <!-- php: = $admission_record->outcome_setter_id == null ? "You need to End admission to Discharge Patient": $admission_record->admission_end->nice() -->
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
                                        <input type="hidden" name="patient_visit_id" value="<!-- php: = $selectedVisit->id -->">
                                        <input type="hidden" name="visit_outcome_id" value="7">
                                        <!-- php: = $selectedVisit->patient_visit_purpose->name -->
                                    </div>
                                </div>
                                <div class="form-group row">
                                    
                                    <label class="control-label text-uppercase bold col-md-4">Visit Amount:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $receiptTotal -->
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label text-uppercase bold col-md-4">Amount Paid:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $amountPaid -->
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label text-uppercase bold col-md-4">Amount Due:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $receiptTotal - $amountPaid -->
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label text-uppercase bold col-md-4">Amount Due:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <!-- php: = $receiptTotal - $amountPaid -->
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label text-uppercase bold col-md-4">Reason for Cancellation:
                                    </label>
                                    <div class="col-md-8  d-flex align-items-end">
                                        <textarea name="additional_info" class="form-control" id="" cols="30" rows="5"></textarea>
                                    </div>
                                </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="offset-md-3 col-md-8 ">
                                    <button type="submit" class="btn btn-info">Flag Patient</button>
                                    <button type="button" data-dismiss="modal" class="btn btn-default">close</button>
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

export default function PatientVisitsDischargeSummaryCancelledPage() {
  return (
    <PageShell title="PatientVisits/discharge_summary_cancelled.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
