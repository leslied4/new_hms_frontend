const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Symptoms & Notes</span>
			</div>
			
			<br/>
			<br/>
			
			<div class="table-scrollable">
				<table class="full-width">
					<tbody>						
						<tr class="odd gradeX">
							<td class="center"><a href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPatientSymptom', $selectedVisit->patient_id, $selectedVisit->id]) -->" class="btn btn-lg <!-- php: = Cake\Core\Configure::read('Classes.View') -->">Symptoms</a></td>
							<td class="center"><a href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPatientHistory', $selectedVisit->patient_id, $selectedVisit->id]) -->" class="btn btn-lg <!-- php: = Cake\Core\Configure::read('Classes.View') -->">History</a></td>
							<td class="center"><a href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPatientExamination', $selectedVisit->patient_id, $selectedVisit->id]) -->" class="btn btn-lg <!-- php: = Cake\Core\Configure::read('Classes.View') -->">Examination</a></td>
						</tr>						
					</tbody>
				</table>
			</div>
							
		</div>
	</div>
</div>

`;

export default function ElementElementPatientvisitSymptomsandnotes() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
