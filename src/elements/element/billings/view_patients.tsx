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
									<div class="tools">
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="example4">
										<thead>
											<tr>
												<th>No</th>
												<th> Name </th>
												<th> Sex </th>
												<th> Folder No. </th>
												<th> Mobile </th>
												<th> Insurance Type </th>
												<th> Action</th>
											</tr>
										</thead>
										<tbody>
										<!-- php: $i = 0; foreach ($patients as $patient): $i++; -->
											<tr class="odd gradeX">
												<td><!-- php: =$i --></td>
												<td><!-- php: = $patient->first_name .' '. $patient->last_name --></td>
												<td><!-- php: =isset($patient->gender)? $patient->gender->name : "" --></td>
												<td><!-- php: =$patient->folder --></td>
												<td><!-- php: =$patient->phone --></td>
												<td><!-- php: =isset($patient->insurance_type)? $patient->insurance_type->type_name : "" --></td>
												<td>																								
													<a title="Add or View Bills" href="<!-- php: =$this->Url->build(['controller'=>'Billings','action'=>'viewBillingInfo',$patient->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_bill">
														Bill
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
			</div>
		</div>
	</div>
</div>


`;

export default function ElementElementBillingsViewPatients() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
