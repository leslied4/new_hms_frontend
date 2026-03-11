const rawHtml = `
<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			
			<div class="card  card-box">
				<div class="card-head">
					<header>Completed Doctor's Queue</header>
				</div>
				<div class="card-body ">
					
				  <div class="table-scrollable">
					<table class="table table-hover table-checkable table-striped order-column full-width customDataTable">
						<thead>
							<tr>
								<th></th>
								<th>Queue Time</th>
								<th>Patient</th>
								<th>Folder No.</th>
								<th>Assigned Doctor</th>
								<!-- th>Comment</th -->
								<th class="center">Action</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: foreach ($completed_queue as $doctorQueue): // Get the last vital recorded $lastVital = null; $severityColor = ''; $severityTitle = ''; $severityComment = ''; if($doctorQueue->has('patient_visit') && isset($doctorQueue->patient_visit->patie... -->
							<tr class="odd gradeX">
								<td>
									<span class="<!-- php: = $severityColor != '' ? 'label label-mini' : '' -->" style="<!-- php: = $severityColor != '' ? 'background: #' . $severityColor : '' -->" title="<!-- php: = $severityTitle -->" >&nbsp;</span>
								</td>
								<td><!-- php: = isset($doctorQueue->date_created) ? $doctorQueue->date_created->nice() : '' --></td>
								<td>
									<a href="<!-- php: =$this->Url->build(['controller'=>'Patients', 'action'=>'viewPatient', $doctorQueue->patient_visit->patient_id]) -->" >
										<!-- php: = $doctorQueue->patient_visit->patient->first_name .' '. $doctorQueue->patient_visit->patient->last_name -->
									</a>	
								</td>
								<td><!-- php: = $doctorQueue->patient_visit->patient->folder --></td>
								<td><!-- php: = isset($doctorQueue->assigned_user)? $doctorQueue->assigned_user->full_name : "" --></td>
								<!-- td>
									<!-- php: // = $severityComment -->
								</td -->
								
								<td class="center">
									<a href="<!-- php: =$this->Url->build(['controller'=>'Patients', 'action'=>'viewVisit', $doctorQueue->patient_visit->patient_id, $doctorQueue->patient_visit->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">
										Visit
									</a>		
									<a href="<!-- php: =$this->Url->build(['controller'=>'Queue', 'action'=>'processPatient', $doctorQueue->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">
										Complete
									</a>																						
								</td>
							</tr>
						<!-- php: endforeach; -->									
						</tbody>
					</table>
				  </div>
				</div>
			</div>


		</div>
	</div>
</div>
`;

export default function ElementElementQueueDoctorsCompleted() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
