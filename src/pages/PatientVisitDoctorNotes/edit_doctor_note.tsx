import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitDoctorNotes/edit_doctor_note.php';
const rawHtml = `
<!-- php: $this->extend('/layout/visit/edit_record'); -->

<div class="card-head">
	<header>Doctor Note - Edit Doctor Note</header>
</div>
<div class="card-body" id="bar-parent">
	<!-- php: = $this->Form->create($patientVisitDoctorNote); -->
		<div class="form-body">
			<div class="form-group row">
				<label class="control-label col-md-4">Title
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<input type="text" name="title" id="title" value="<!-- php: = $patientVisitDoctorNote->title -->" data-required="1" placeholder="Title" class="form-control input-height" />
				</div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Note
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<textarea name="notes" id="notes" placeholder="Notes" class="form-control textarea" rows="5" ><!-- php: = $patientVisitDoctorNote->notes --></textarea>
				</div>
			</div>
			<div class="row">
				<div class="offset-md-4 col-md-8">
					<button type="submit" id="submit" class="btn btn-info">Submit</button>
					<a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewVisit',$patientVisitDoctorNote->patient_visit->patient_id,$patientVisitDoctorNote->patient_visit->id]) -->"><button type="button" class="btn btn-default">Cancel</button></a>
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

export default function PatientVisitDoctorNotesEditDoctorNotePage() {
  return (
    <PageShell title="PatientVisitDoctorNotes/edit_doctor_note.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
