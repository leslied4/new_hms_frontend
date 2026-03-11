import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/PatientVisitVitals/edit_vitals.php';
const rawHtml = `
<!-- php: $this->extend('/layout/visit/edit_record'); -->

<div class="card-head">
	<header>Vitals - Edit Patient Vitals</header>
</div>
<div class="card-body" id="bar-parent">
	<!-- php: = $this->Form->create($vital); -->
		<div class="form-body">
			<div class="form-group row">
				<label class="control-label col-md-4">Temperature(degrees)
				</label>
				<div class="col-md-5">
					<input type="number" step="any" name="temperature" data-required="0" placeholder="" value = "<!-- php: = $vital->temperature -->" class="form-control input-height"  /> </div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">SpO<sub>2</sub>
				</label>
				<div class="col-md-5">
					<input type="number" step="any" name="oxygen_saturation" data-required="0" placeholder="enter pulse" value = "<!-- php: = $vital->oxygen_saturation -->" class="form-control input-height"  /> </div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Respiratory Rate(cpm)
				</label>
				<div class="col-md-5">
					<input type="number" step="any" name="respiratory_rate" data-required="0" placeholder="" value = "<!-- php: = $vital->respiratory_rate -->" class="form-control input-height"  /> </div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Pulse(bpm)
				</label>
				<div class="col-md-5">
					<input type="number" step="any" name="pulse" id="pulse" data-required="0" placeholder="" value = "<!-- php: = $vital->pulse -->" class="form-control input-height"  /> </div>
			</div>
			<!-- div class="form-group row">
				<label class="control-label col-md-4">Heart Rate
					<span class="required"> * </span>
				</label>
				<div class="col-md-5">
					<input type="number" step="any" name="heart_rate" id="heart_rate" data-required="1" placeholder="enter height" value = "<!-- php: //= $vital->heart_rate -->" class="form-control input-height"  /> </div>
			</div -->
			<div class="form-group row">
				<label class="control-label col-md-4">Blood Pressure(mm Hg)
				</label>
				<div class="col-md-4">
					<div style ="float: left ;  width: 50px ; margin-right : 20px">
						<input type="text" name="blood_pressure_1" data-required="0" placeholder="" value="<!-- php: = $vital->blood_pressure_1 -->" class="form-control input-height"  /> 
					</div>
					<div style ="font-size : 26px ; float:left ; margin-right : 20px">
					 &frasl;
					</div>
					<div style ="float: left ; width: 50px ; margin-right : 20px">
						<input type="text" name="blood_pressure_2" data-required="0" placeholder="" value="<!-- php: = $vital->blood_pressure_2 -->" class="form-control input-height"  /> 
					</div>
				</div>	
				<input type="hidden" id="hidden" name="request_type" value="new_vitals">

			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Weight

				</label>
				<div class="col-md-5">
					<input type="number" step="any" min="0" name="weight" id="weight" data-required="0" placeholder="enter weight" value = "<!-- php: = $vital->weight -->" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Height

				</label>
				<div class="col-md-5">
					<input type="number" step="0.01" min="0" name="height" id="height" data-required="0" placeholder="enter height" value = "<!-- php: = $vital->height -->" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">BMI

				</label>
				<div class="col-md-5">
					<input type="number" step="0.01" value="<!-- php: = $vital->bmi -->" id="bmi" readonly class="form-control input-height" /> </div>
			</div>
			<!-- div class="form-group row">
				<label class="control-label col-md-4">Glassgow
				</label>
				<div class="col-md-5">
					<input type="number" step="any" name="glasgow" id="glasgow" placeholder="enter height" value = "<!-- php: //= $vital->glasgow -->" class="form-control input-height"  /> </div>
			</div -->
			<div class="form-group row">
				<label class="control-label col-md-4">Fasting Blood Sugar(mg/dL)

				</label>
				<div class="col-md-5">
					<input type="number" step="any" min="0" name="fasting_blood_sugar" id="fbs" data-required="0" placeholder="enter fasting blood sugar" value = "<!-- php: = $vital->fasting_blood_sugar -->" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">Random Blood Sugar(mg/dL)

				</label>
				<div class="col-md-5">
					<input type="number" step="0.01" min="0" name="random_blood_sugar" id="rbs" data-required="0" placeholder="enter random blood sugar" value = "<!-- php: = $vital->random_blood_sugar -->" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-4">AVPU Score
				</label>
				<div class="col-md-5">
					<SearchableSelectField class="form-control input-height" name="avpu_score">
						<option>Select</option>
						<option <!-- php: = $vital->avpu_score == 'Alert' ? 'selected' : '' --> value="Alert">ALERT</option>
						<option <!-- php: = $vital->avpu_score == 'Verbal' ? 'selected' : '' --> value="Verbal">VERBAL RESPONSE</option>
						<option <!-- php: = $vital->avpu_score == 'Pain' ? 'selected' : '' --> value="Pain">PAIN RESPONSE</option>
						<option <!-- php: = $vital->avpu_score == 'Unresponsive' ? 'selected' : '' --> value="Unresponsive">UNRESPONSIVE</option>
					</SearchableSelectField>
				</div>
			</div>
			<div class="row">
				<div class="offset-md-4 col-md-8">
					<button type="submit" id="submit" class="btn btn-info">Submit</button>
					<a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewVisit',$vital->patient_visit->patient_id,$vital->patient_visit->id]) -->"><button type="button" class="btn btn-default">Cancel</button></a>
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

<script>
	
	function updateBMI() {
		weight = 0;
		height = 0;
		
		weight = $('#weight').val();
		height = $('#height').val();
		
		if(weight > 0 && height > 0) {
			bmiVal = weight/(height * height * 0.0001);
			bmi = (Math.round(bmiVal * 100) + Number.EPSILON)/100;
			$('#bmi').val(bmi);
		}
		else {
			$('#bmi').val(0);
		}
		
	}
</script>
`;

export default function PatientVisitVitalsEditVitalsPage() {
  return (
    <PageShell title="PatientVisitVitals/edit_vitals.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
