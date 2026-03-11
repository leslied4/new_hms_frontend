import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Followups/report.php';
const rawHtml = `

<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card  card-box">
								<div class="card-head">
									<header>Follow Ups Report</header>
									<div class="tools">
										<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover order-column full-width customDataTable">
										<thead>
											<tr>
												<th class="center"> Patient</th>
												<th class="center"> Date of Visit </th>
												<th class="center"> Assigned Doctor </th>
												<th class="center"> Created By </th>
												<th class="center"> Comment </th>
												<th class="center"> Created</th>
												<th class="center"> Status </th>
											</tr>
										</thead>
										<tbody>
										<!-- php: foreach ($followUps as $patientFollowup): -->
											<!-- php: $patientVisit = $patientFollowup->patient_visit; if (isset($patientVisit)): -->
											<tr class="odd gradeX">
												<td><!-- php: = $patientVisit->has('patient') ? $this->Html->link($patientVisit->patient->first_name . ' ' . $patientVisit->patient->last_name, ['controller' => 'Patients', 'action' => 'viewPatient', $patientVisit->patient->id]) : '' --></td>
												<td class="center"><!-- php: =$patientFollowup->date_of_visit->nice() --></td>
												<td class="center"><!-- php: =isset($patientFollowup->user)? $patientFollowup->user->first_name. ' '.$patientFollowup->user->last_name : '' --></td>
												<td class="center"><!-- php: =isset($patientFollowup->created_by_user)? $patientFollowup->created_by_user->first_name. ' '.$patientFollowup->created_by_user->last_name : '' --></td>
												<td class="center"><!-- php: =$patientFollowup->comment --></td>
												<td class="center"><!-- php: =$patientFollowup->date_created->nice() --></td>
												<td class="center"><!-- php: =$patientFollowup->followupstatus->name --></td>
											</tr>
										<!-- php: endif; endforeach; -->									
										</tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



`;

export default function FollowupsReportPage() {
  return (
    <PageShell title="Followups/report.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
