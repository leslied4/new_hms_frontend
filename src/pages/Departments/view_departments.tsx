import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Departments/view_departments.php';
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
									<header>All Departments</header>
									<div class="tools">
										<a class="btn btn-primary" style="margin-top: 5px" href="<!-- php: = $this->Url->build(['controller' => 'Departments', 'action' => 'addDepartment']) -->">Add Department</a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="example4">
										<thead>
											<tr>
												<th class="center">Date Added</th>
												<th class="center"> Name </th>
												<th class="center"> Action </th>
											</tr>
										</thead>
										<tbody>
										
										<!-- php: $x = 1; foreach ($departments as $department): -->
											<tr class="odd gradeX">
												<td class="center"><!-- php: =$department->date_created --></td>
												<td class="center"><!-- php: =$department->name --></td>
												<td class="center">
													<a href="<!-- php: =$this->Url->build(['controller'=>'Departments','action'=>'editDepartment', $department->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs patient_edit_patient_details">
														Edit
													</a>
												</td>
											</tr>
										<!-- php: $x++; endforeach; -->									
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

export default function DepartmentsViewDepartmentsPage() {
  return (
    <PageShell title="Departments/view_departments.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
