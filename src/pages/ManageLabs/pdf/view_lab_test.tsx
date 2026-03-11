import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/ManageLabs/pdf/view_lab_test.php';
const rawHtml = `
<div class="modal-header">
											  <h4 class="modal-title">Test Item:<!-- php: = $test->name --></h4>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
																<div class="row">
															 <div class="col-md-6 p-2">
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.TestName') != null ? Cake\Core\Configure::read('LAB_STRINGS.TestName') : 'Name' -->
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->name --></h5> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' -->
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5> <!-- php: = $test->investigation->name --></h5>
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">New Price
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->value_new --></h5>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Description
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->description --></h5>
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Service Place
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->service_place --></h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Gender
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->gender --></h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Age
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->age --></h5>
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Specialities/Clinic
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->specialities --></h5>
																		</div>
																	</div>
																	
																	
																	
																</div>
																	</div>
																	<div class="col-md-6 p-2">
																		<h5 class="font-weight-bold">Advanced Details</h5>
																		<hr class="bg-dark"/>
																	<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Sample Collected
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->samples_collected --></h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Age Specification
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->age_spec --></h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Weight Specification
																			
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->weight_spec --></h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Outsourced
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->outsourced==1 ? 'Yes' : 'No' --></h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">CoPay
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $test->copay==1 ? 'Yes' : 'No' --></h5>
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

export default function ManageLabsPdfViewLabTestPage() {
  return (
    <PageShell title="ManageLabs/pdf/view_lab_test.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
