import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/PatientVisitDiagnoses/edit_diagnoses.php';
const rawHtml = `
<!-- php: $this->extend('/layout/visit/edit_record'); -->

<div class="card-head">
	<header>Diagnoses - Edit Patient Diagnosis</header>
</div>
<div class="card-body" id="bar-parent">
	<div class="form-group row">

		<div class="col-md-12">											
			<div class="row mb-3">
				<div class="col-md-6 bold">Diagnosis</div>
				<div class="col-md-6 bold">Resolved</div>
			</div>
			<div id="diagnosis_clearance">
			</div>

		</div>
	</div>
	<!-- php: = $this->Form->create($diagnosis, ['id'=>'editDiagnosesForm']); -->
		<!-- php: $selectedProcedures = []; foreach($diagnosis->patient_visit_procedures as $selectedProcedure) { array_push($selectedProcedures, $selectedProcedure->procedure_id); } $selectedSecondaryDiagnoses = []; foreach($diagnosis->patient_visit_seconda... -->
		<div class="form-body">
									
			<div class="form-group row">
				<label class="control-label col-md-3">Diagnosis (Note)
					<span class="required"> * </span>
				</label>
				<div class="col-md-8">
					<td>
						<textarea placeholder="Summarize Diagnosis" style="" class="form-control text-area" name="diagnosis_text" id="diagnosis_text" rows="2" cols="4" ><!-- php: = $diagnosis->diagnosis_text --></textarea>
					</td>
				</div>
			</div>
			
			<div class="form-group row">
				<label class="control-label col-md-3">Primary Diagnoses
					<span class="required"> * </span>
				</label>
				<div class="col-md-8">
					<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="primary_diagnosis_ids[]" id="primary_diagnosis_id" title="Select primary diagnoses"  data-live-search="true" data-max-options="1"onchange="diseaseType(this, event)" multiple>

					</SearchableSelectField>
				</div>
			</div>
			<div class="offset-md-3 col-md-8 mb-1" style="display:none" id="chronic_status">
				<div id="prescription_form_priority">
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="ill_episode" id="stat_radio" value="chronic" checked>
						<label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Chronic</span></label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" name="ill_episode" id="routine_radio" value="acute">
						<label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Acute</span></label>
					</div>
				</div>
			</div>
			<div class="form-group row">
				<label class="control-label col-md-3">Provisional Diagnoses
					<span class="required"> * </span>
				</label>
				<div class="col-md-8">
					<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="provisional_diagnosis_ids[]" id="provisional_diagnosis_id" title="Select Provisional diagnoses"  data-live-search="true" multiple >

					</SearchableSelectField>
				</div>
			</div>

			<div class="form-group row">
				<label class="control-label col-md-3">Differential Diagnoses
					<span class="required"> * </span>
				</label>
				<div class="col-md-8">
					<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="differential_diagnosis_ids[]" id="differential_diagnosis_id" title="Select Differential diagnoses"  data-live-search="true" multiple >

					</SearchableSelectField>
				</div>
			</div>

			<div class="form-group row">
				<label class="control-label col-md-3">Other Diagnoses
					<span class="required"> * </span>
				</label>
				<div class="col-md-8">
					<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="other_diagnosis_ids[]" id="other_diagnosis_id" title="Select Other diagnoses"  data-live-search="true" multiple >

					</SearchableSelectField>
				</div>
			</div>


			<div class="form-group row">
				<label class="control-label col-md-3">Clinical Summary
				
				</label>
				<div class="col-md-8">
					<textarea name="clinical_summary" id="clinical_summary" placeholder="Provide actionable information on patient diagnosis" class="form-control textarea" rows="5" ><!-- php: = $diagnosis->clinical_summary --></textarea>
				</div>
			</div>

			<!-- <div class="form-group row">
				<label class="control-label col-md-3">
					Procedure
				</label>
				<div class="col-md-8">											
					<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" title="Indicate the procedure" name="procedure_ids[]" id="procedure_ids"  data-live-search="true"  multiple>

						<!-- php: // foreach($procedures as $code => $procedure) // { // $idCode = explode(' ', $code); -->
								<option <!-- php: // in_array($idCode[0], $selectedProcedures) ? 'selected' : '' --> title="<!-- php: // h($idCode[1]) -->" value="<!-- php: // h($idCode[0]) -->" data-content="<!-- php: // h($procedure) -->   <span class='badge badge-danger'><!-- php: // h($idCode[1]) --></span>"><!-- php: // h($procedure) --></option>
							<!-- php: // } -->
					</SearchableSelectField>

				</div>
			</div> -->

			<!-- div class="form-group row">
				<label class="control-label col-md-3">Procedure Instructions
				</label>
				<div class="col-md-8">
					<input name="procedure_instructions" value="<!-- php: // = $diagnosis->procedure_instructions -->" id="procedure_instructions" placeholder="Provide instructions for procedure" class="form-control" />
				</div>
			</div -->

			<div class="row">
				<div class="offset-md-4 col-md-8">
					<button type="submit" class="btn btn-info">Submit</button>
					<a href="<!-- php: =$this->Url->build(['controller'=>'Patients', 'action'=>'viewVisit', $diagnosis->patient_visit->patient_id, $diagnosis->patient_visit->id]) -->"><button type="button" class="btn btn-default">Cancel</button></a>
				</div>
			</div>

		</div>
	<!-- php: =$this->Form->end(); -->

</div>


<script>
	selectedProvisionalDiagnosis = [];
	selectedPrimaryDiagnosis = [];
	selectedDifferentialDiagnosis = [];
	selectedOtherDiagnosis = [];
	provisional = JSON.parse(\`<!-- php: =json_encode($diagnosis->patient_visit_provisional_diagnoses) -->\`)
	primary = JSON.parse(\`<!-- php: =json_encode($diagnosis->patient_visit_primary_diagnoses) -->\`)
	differential = JSON.parse(\`<!-- php: =json_encode($diagnosis->patient_visit_differential_diagnoses) -->\`)
	other = JSON.parse(\`<!-- php: =json_encode($diagnosis->patient_visit_other_diagnoses) -->\`)


	$(function () {
		$("#submit").click(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});
	});


	function populateStandardDiagnosis() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getStandardDiagnosis']) -->",
			success: function g(data, textStatus) {
					result = ''
					data.forEach((element, index) => {
						result += \`
						<option title="\${element.code}" value="\${element.id}" data-content="\${element.name}   <span class='badge badge-danger'>\${element.code}</span>">\${element.name}</option>
						\`
					});
					$('#primary_diagnosis_id').html(result)
					$('#provisional_diagnosis_id').html(result)
					$('#differential_diagnosis_id').html(result)
					$('#other_diagnosis_id').html(result)

					if (primary != null) {
						primary?.forEach(element => {
							selectedPrimaryDiagnosis.push(\`#primary_diagnosis_id option[value=\${element.primary_diagnosis_id}]\`);
						});
						$(selectedPrimaryDiagnosis.join(',')).prop("selected", "selected");
					}
					if (provisional != null) {
						provisional?.forEach(element => {
							selectedProvisionalDiagnosis.push(\`#provisional_diagnosis_id option[value=\${element.diagnosis_id}]\`);
						});
						$(selectedProvisionalDiagnosis.join(',')).prop("selected", "selected");
					}
					if (differential != null) {
						differential.forEach(element => {
							selectedDifferentialDiagnosis.push(\`#differential_diagnosis_id option[value=\${element.diagnosis_id}]\`);
						});
						$(selectedDifferentialDiagnosis.join(',')).prop("selected", "selected");
					}
					if (other != null) {
						other.forEach(element => {
							selectedOtherDiagnosis.push(\`#other_diagnosis_id option[value=\${element.diagnosis_id}]\`);
						});
						$(selectedOtherDiagnosis.join(',')).prop("selected", "selected");
					}



					$("#primary_diagnosis_id").selectpicker("refresh");
					$("#provisional_diagnosis_id").selectpicker("refresh");
					$("#differential_diagnosis_id").selectpicker("refresh");
					$("#other_diagnosis_id").selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}
	populateStandardDiagnosis()
	function diseaseType(ele, event) {
		var val = $(ele).val();
		if (val.length > 0) {
			$('#chronic_status').show(400)
		}else{
			$('#chronic_status').hide(400)
		}
	}
	$("#editDiagnosesForm").submit(function() {
		additional_info = ""
		<!-- php: if(null !==($diagnosis->patient_visit->primary_diagnosis_id) && ($diagnosis->patient_visit->primary_diagnosis_id != $diagnosis->id)) { -->
			if($('#primary_diagnosis_id').val().length > 0){
				additional_info = 
					"The Primary Diagnosis has already been set. This action will update it.\n"
			}
		<!-- php: } -->
		if(!confirm(additional_info + ' Are you sure you want to submit ?')){
			return false;
		}
	});

	function toggleIsCleared(id, type) {
		$.ajax({
			type: 'POST',
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'toggleIsCleared']) -->/<!-- php: = $id -->",
			data: { 
				id: id, 
				type: type,
				toggle: $(\`#\${type}_\${id}\`).is(":checked")
			},
			success: function g(data, textStatus) {
				console.log("status", data.status)
				if (data.status) {
					alertify.success("Status Changed")
				} else {
					alertify.error("An error Occured")
				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function getDiagnosisType(row) {
		switch (row) {
			case 1:
				color = 'red';
				badge_color = 'danger'
				value = 'Primary';
				break;
			case 2:
				color = 'green';
				badge_color = 'success'
				value = 'Provisional';
				break;
			case 3:
				color = 'orange';
				badge_color = 'warning'
				value = 'Differential';
				break;

			default:
				color = 'grey';
				badge_color = 'secondary'
				value = 'Other';
				break;
		}
		return \`<span class="badge badge-\${badge_color} " style="background:\${color};color: white">\${value}</span>\`;
	}

	function makeText(name, isCleared, id, type ) {
		return \`
			<div class="row mb-1" style="">
				<div class="col-md-6">\${name}</div>
				<div class="col-md-6">
					<div class="col-md-5">
						<label class="switchToggle">
							<input name="bundled_service" type="checkbox" \${isCleared ? 'checked' : ''} id="\${type}_\${id}" onclick="toggleIsCleared('\${id}', '\${type}',)">
							<span class="slider green round"></span>
						</label>
					</div>
				</div>
			</div>
		\`
	}
	function getDiagnosis() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'getPatientVisitDiagnosis']) -->/<!-- php: = $id -->",
			success: function g(data, textStatus) {
				let result = ['<ul style="padding:0">']
				let row = data;
				if (row?.patient_visit_primary_diagnoses && row?.patient_visit_primary_diagnoses.length > 0) {
					row?.patient_visit_primary_diagnoses?.forEach(primaryDiagnosis => {
						
						if (primaryDiagnosis?.primary_diagnosis != undefined) {
							let name = \`\${primaryDiagnosis?.primary_diagnosis?.name} <span class="badge badge-danger">\${primaryDiagnosis?.primary_diagnosis?.code}</span>
							\${getDiagnosisType(1)} \${\`| \${primaryDiagnosis.ill_episode}\`}\`

							result.push(makeText(name, primaryDiagnosis.is_cleared, primaryDiagnosis.id, 'primary'))

						} else {
							// result += 'N/A'
						}
					});
				}
				if (row?.patient_visit_provisional_diagnoses && row?.patient_visit_provisional_diagnoses.length > 0) {
					row?.patient_visit_provisional_diagnoses?.forEach(prDiagnosis => {

						if (prDiagnosis?.diagnosis != undefined) {
							let name = \`\${prDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${prDiagnosis?.diagnosis?.code}</span>
							\${getDiagnosisType(2)}\`
							result.push(makeText(name, prDiagnosis.is_cleared, prDiagnosis.id, 'provi'))
						} else {
							// result += 'N/A'
						}
					});
				}
				if (row?.patient_visit_differential_diagnoses && row?.patient_visit_differential_diagnoses.length > 0) {
					row?.patient_visit_differential_diagnoses?.forEach(dDiagnosis => {
						if (dDiagnosis?.diagnosis != undefined) {
							let name = \`\${dDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${dDiagnosis?.diagnosis?.code}</span>
							\${getDiagnosisType(3)}\`
							result.push(makeText(name, dDiagnosis.is_cleared, dDiagnosis.id, 'diff'))
						} else {
							// result += 'N/A'
						}
					});
				}
				if (row?.patient_visit_other_diagnoses && row?.patient_visit_other_diagnoses.length > 0) {
					row?.patient_visit_other_diagnoses?.forEach(oDiagnosis => {
						if (oDiagnosis?.diagnosis != undefined) {
							let name =  \`\${oDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${oDiagnosis?.diagnosis?.code}</span>
							\${getDiagnosisType(4)}\`
							result.push(makeText(name, oDiagnosis.is_cleared, oDiagnosis.id, 'other'))
						} else {
							// result += 'N/A'
						}
					});
				}

				$("#diagnosis_clearance").html(result.join(""))
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
				console.log(xhr);
			}
		});
	}

	$(document).ready(function() {
		getDiagnosis()
	})
</script>
`;

export default function PatientVisitDiagnosesEditDiagnosesPage() {
  return (
    <PageShell title="PatientVisitDiagnoses/edit_diagnoses.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
