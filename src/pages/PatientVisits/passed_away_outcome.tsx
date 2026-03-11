import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/passed_away_outcome.php';
const rawHtml = `
<div>									
	<div class="row">
		<div class="col-md-12 col-sm-12">
			<div class="card card-box">
				<div class="card-body" id="bar-parent">
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'setPassedAwayVisitOutcome'], 'class' => 'form-horizontal', 'id' => 'discharge_modal_form']) -->
                        <div class="form-body" id="discharge_modal_form_body">
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Diagnosis:
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
                                <label class="control-label text-uppercase bold col-md-4">Time of Death:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <input type="hidden" name="patient_visit_id" value="<!-- php: = $selectedVisit->id -->">
                                    <input type="hidden" name="visit_outcome_id" value="3">
                                    <input class="form-control deathTimeSet" id="set_death_time" name="date_of_death" size="16" type="text" placeholder="Set Time of Death" style="max-height: 35px;">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Reason for Death:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <textarea name="reason_for_death" class="form-control" id="" cols="30" rows="5"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label text-uppercase bold col-md-4">Next Steps:
                                </label>
                                <div class="col-md-8  d-flex align-items-end">
                                    <textarea name="next_steps" class="form-control" id="" cols="30" rows="5"></textarea>
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
				</div>
			</div>
		</div>
	</div>
</div>

<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
<script>
    mobiscroll.datepicker('.deathTimeSet', {
        controls: ['datetime'],
        touchUi: true,
        min: moment(new Date()).format("yyyy-mm-dd HH:mm"),
        returnFormat: 'moment',
        theme: 'ios',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        themeVariant: 'light'
    });
</script>
`;

export default function PatientVisitsPassedAwayOutcomePage() {
  return (
    <PageShell title="PatientVisits/passed_away_outcome.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
