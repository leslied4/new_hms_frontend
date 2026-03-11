import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitTreatments/edit_treatment.php';
const rawHtml = `
<!-- php: $this->extend('/layout/visit/edit_record'); -->

<div class="card-head">
	<header>Vitals - Edit Patient Vitals</header>
</div>
<div class="card-body" id="bar-parent">
	<!-- php: = $this->Form->create($treatment); -->
		<div class="form-body">
			<div class="form-group row">
				<label class="control-label col-md-4">Treatment Plan
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<textarea name="treatment_plan" data-required="1" placeholder="" class="form-control text-area" ><!-- php: = $treatment->treatment_plan --></textarea> 
				</div>
			</div>
			<div class="row">
				<div class="offset-md-4 col-md-8">
					<button type="submit" id="submit" class="btn btn-info">Submit</button>
					<a href="<!-- php: =$this->Url->build(['controller'=>'Patients', 'action'=>'viewVisit', $treatment->patient_visit->patient_id, $treatment->patient_visit->id]) -->"><button type="button" class="btn btn-default">Cancel</button></a>
				</div>
			</div>

		</div>
	<!-- php: =$this->Form->end(); -->

</div>


<script>
$(function () {
	$("#submit").click(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>
`;

export default function PatientVisitTreatmentsEditTreatmentPage() {
  return (
    <PageShell title="PatientVisitTreatments/edit_treatment.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
