const rawHtml = `
<div class="tab-pane active fontawesome-demo" id="tab1">
	<div class="row">
		<div class="borderBox light bordered col-md-12">
			<div class="borderBox-title tabbable-line">
				<div class="caption">
					<span class="caption-subject font-dark bold uppercase">Vitals</span>
				</div>
				<ul class="nav nav-tabs">
					<li class="nav-item vitals_add_vital">
						<a href="#borderBox_tab1" data-toggle="tab"> Add </a>
					</li>
					<li class="nav-item vitals_view_vitals">
						<a href="#borderBox_tab2" data-toggle="tab"> View </a>
					</li>
					<!--<li class="nav-item">
						<a href="#borderBox_tab3" data-toggle="tab" class="active"> Tab 3 </a>
					</li>-->
				</ul>
			</div>
			<div class="borderBox-body">
				<div class="tab-content">
					<div class="tab-pane vitals_add_vital " id="borderBox_tab1">
						
						<!-- php: = $this->Form->create($vitals); -->
							<div class="form-body">
								<div class="form-group row">
									<label class="control-label col-md-4">Weight(kg)
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<input type="number" name="weight" id="weight" data-required="1" placeholder="enter weight" class="form-control input-height"  /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Temperature(degrees)
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<input type="number" step="any" name="temperature" id="temperature" data-required="1" placeholder="enter temperature" class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Pulse
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<input type="number" name="pulse" id="pulse" data-required="1" placeholder="enter pulse" class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Height(centimeters)
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<input type="number" name="height" id="height" data-required="1" placeholder="enter height" class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Blood Pressure(mm Hg) hehe
										<span class="required"> * </span>
									</label>
									<div class="col-md-4">
										<div style ="float: left ;  width: 50px ; margin-right : 20px">
											<input type="text" name="blood_pressure_1" id="blood_pressure_1" data-required="1" placeholder="" class="form-control input-height" /> 
										</div>
										<div style ="font-size : 26px ; float:left ; margin-right : 20px">
										 &frasl;
										</div>
										<div style ="float: left ; width: 50px ; margin-right : 20px">
											<input type="text" name="blood_pressure_2" id="blood_pressure_2" data-required="1" placeholder="" class="form-control input-height" /> 
										</div>
									</div>	
									<input type="hidden" id="hidden" name="request_type" value="new_vitals">
									
								</div>
								<div class="row">
									<div class="offset-md-4 col-md-8">
										<button type="submit" class="btn btn-info">Submit</button>
										<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
									</div>
								</div>
								
							</div>
						<!-- php: =$this->Form->end(); -->
						
					</div>
					<div class="tab-pane active vitals_view_vitals" id="borderBox_tab2">
						<div class="card-body ">
							<div class="table-scrollable">
								<table class="table table-hover table-checkable order-column full-width" id="example4">
									<thead>
										<tr>
											<th class="center"> Date</th>
											<th class="center"> Weight </th>
											<th class="center"> Temperature </th>
											<th class="center"> Pulse </th>
											<th class="center"> Blood Pressure </th>
											<th class="center"> Actions</th>
											
										</tr>
									</thead>
									<tbody>
									<!-- php: foreach ($patientVitals as $patientVital): -->
										<tr class="odd gradeX">
											<td class="center"><!-- php: = $patientVital->date_created --></td>
											<td class="center"><!-- php: =$patientVital->weight --></td>
											<td class="center"><!-- php: =$patientVital->temperature --></td>
											<td class="center"><!-- php: =$patientVital->pulse --></td>
											<td class="center"><!-- php: =$patientVital->blood_pressure_1 . ' / ' .$patientVital->blood_pressure_2 --></td>
											<td class="center">
												<a href="<!-- php: =$this->Url->build(['controller'=>'Vitals','action'=>'editVitals',$patientVital->id]) -->" class="btn btn-primary btn-xs vitals_edit_vital ">
													Edit
												</a>
												<a href="<!-- php: =$this->Url->build(['controller'=>'Vitals','action'=>'viewVitals',$patientVital->id]) -->" class="btn btn-primary btn-xs vitals_view_patient_vital ">
													View
												</a>
												<!--<a class="btn btn-tbl-delete btn-xs">
													<i class="fa fa-trash-o "></i>
												</a>-->
											</td>
										</tr>
									<!-- php: endforeach; -->									
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="tab-pane" id="borderBox_tab3">
						<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
							<p>
								<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
							</p>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>
`;

export default function ElementElementVitals() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
