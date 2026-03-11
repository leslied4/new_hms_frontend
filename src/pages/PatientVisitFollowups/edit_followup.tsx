import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/PatientVisitFollowups/edit_followup.php';
const rawHtml = `
<!-- php: $this->extend('/layout/visit/edit_record'); -->

<div class="card-head">
	<header>Follow Up - Edit Follow Up</header>
</div>
<div class="card-body" id="bar-parent">
	<!-- php: = $this->Form->create($patientVisitFollowup); -->
		<div class="form-body">
			<div class="form-group row">
				<label class="control-label col-md-4">Description/Problem
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<input type="text" name="description" id="description" value="<!-- php: = $patientVisitFollowup->description -->" data-required="1" placeholder="Title" class="form-control input-height" />
				</div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Assigned Doctor
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<SearchableSelectField class="form-control input-height" name="user_id" id="user_id" required >
						<option value="">Select Doctor</option>
						<!-- php: foreach($users as $doctor) { -->
						<option <!-- php: = $patientVisitFollowup->user_id == $doctor->id ? 'selected' : '' --> value="<!-- php: =$doctor->id -->"><!-- php: =$doctor->first_name.' '. $doctor->last_name --></option>
						<!-- php: } -->
					</SearchableSelectField>
				</div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Department Name
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<SearchableSelectField class="form-control input-height" name="department_id" id="department_id" required>
						<option value="">Select Department</option>
						<!-- php: foreach($departments as $department) { -->
						<option <!-- php: = $patientVisitFollowup->department_id == $department->id ? 'selected' : '' --> value="<!-- php: =$department->id -->"><!-- php: =$department->name --></option>
						<!-- php: } -->
					</SearchableSelectField>
				</div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Date of Visit
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
						<input class="form-control input-height" value="<!-- php: = $patientVisitFollowup->date_of_visit->i18nFormat('yyyy-M-dd') -->" placeholder="Select date for next visit" size="16" placeholder="" name = "date_of_visit" id = "date_of_visit" type="text" value="" required >
						<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
					</div>
					<input type="hidden" id="dtp_input2" value="" />
				</div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Notes
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<textarea name="comment" id="comment" placeholder="Notes" class="form-control textarea" rows="5" ><!-- php: = $patientVisitFollowup->comment --></textarea>
				</div>
			</div>
			<div class="row">
				<div class="offset-md-4 col-md-8">
					<button type="submit" id="submit" class="btn btn-info">Submit</button>
					<a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewVisit',$patientVisitFollowup->patient_visit->patient_id,$patientVisitFollowup->patient_visit->id]) -->"><button type="button" class="btn btn-default">Cancel</button></a>
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

export default function PatientVisitFollowupsEditFollowupPage() {
  return (
    <PageShell title="PatientVisitFollowups/edit_followup.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
