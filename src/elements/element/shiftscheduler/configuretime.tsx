const rawHtml = `

<div class="card card-topline-<!-- php: = $theme1 -->">

    <div class="card  card-box">
        <div class="card-head">
            <header>Time Slot</header>
        </div>
        <div class="card-body">
            <div class="row">

                <div class="borderBox light bordered col-md-12">

                    <div class="borderBox-title tabbable-line">
                        <div class="caption">
                            <!-- <span class="caption-subject font-dark bold uppercase">Time Slot</span> -->
                        </div>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a href="#investigations_add" data-toggle="tab"> Add </a>
                            </li>
                            <li class="nav-item">
                                <a href="#investigations_view" data-toggle="tab"> View </a>
                            </li>
                        </ul>
                    </div>
                    <div class="borderBox-body">
                        <div class="tab-content">
                            <div class="tab-pane " id="investigations_add">
                                <div class="container px-5 mt-3">
                                    <!-- php: = $this->Form->create($timeslot, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'addTimeSlot']]); -->
                                    <div class="form-group row">
                                        <label class="control-label col-md-2">Name
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-5">
                                            <SearchableSelectField name="name" id="name" class="form-control">
                                                <option>-- Select Type --</option>
                                                <option value="Morning">Morning</option>
                                                <option value="Afternoon">Afternoon</option>
                                                <option value="Evening">Evening</option>
                                                <option value="Night">Night</option>
                                                <option value="OverNight">OverNight</option>
                                                <option value="Mid-Morning">Mid-Morning</option>
                                                <option value="Mid-Afternoon">Mid-Afternoon</option>
                                            </SearchableSelectField>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="control-label col-md-2">Start

                                        </label>
                                        <div class="col-md-5">
                                            <input type="time" name="start" id="start" data-required="0"
                                                placeholder="Enter Start" class="form-control input-height" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-2">End

                                        </label>
                                        <div class="col-md-5">
                                            <input type="time" name="end" id="end" data-required="0"
                                                placeholder="Enter End" class="form-control input-height" />
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="offset-md-2 col-md-8">
                                            <button type="submit" class="btn btn-info">Submit</button>
                                            <!-- <button type="button" class="btn btn-default" onclick = 'clearInvestigationFields()'>Reset</button> -->
                                        </div>
                                    </div>
                                    <!-- php: =$this->Form->end(); -->
                                </div>
                            </div>

                            <div class="tab-pane active" id="investigations_view">
                                <div class="card  card-box">
                                    <div class="card-body ">
                                        <div class="table-scrollable">
                                            <table
                                                class="table table-hover table-checkable order-column full-width slimDataTable">
                                                <thead>
                                                    <tr>
                                                        <th class="left">Name</th>
                                                        <th class="left">Start</th>
                                                        <th class="left">End</th>
                                                        <th class="left">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- php: foreach($timeslots as $timeslot) { echo ' <tr> <td>'.$timeslot->name.'</td> <td>'.$timeslot->start.'</td> <td>'.$timeslot->end.'</td> <td> <a href="javascript:" data-toggle="modal" data-target="#edit-timeslot'.$timeslot->id.'" class="btn bt... -->
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
</div>
<!-- php: foreach($timeslots as $val) { -->
	<div class="modal fade" id="edit-timeslot<!-- php: = $val->id -->" aria-labelledby="modsample" aria-hidden="true" aria-hidden="true">
		<div class="modal-dialog  modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="container px-0 border border-0">
					<div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
						<div class="d-flex align-items-center justify-content-between">
							<h4 class="text-slate-900 my-0">Edit Time Slot</h4>
							<div>
								<button data-dismiss="modal" aria-label="Close"
									class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
										class="fa fa-times text-primary"></i> </button>
							</div>
						</div>
					</div>
				  <div class="container p-4 bg-white">
                  <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'editTimeSlot', $val->id]]); -->
        <div class="form-group row">
            <label class="control-label col-md-2">Name
                <span class="required"> * </span>
            </label>
            <div class="col-md-8">
                <SearchableSelectField name="name" id="name" class="form-control">
                    <option>-- Select Type --</option>
                    <option <!-- php: = $val->name == "Morning" ? "selected" : "" --> value="Morning">Morning</option>
                    <option <!-- php: = $val->name == "Afternoon" ? "selected" : "" --> value="Afternoon">Afternoon</option>
                    <option <!-- php: = $val->name == "Evening" ? "selected" : "" --> value="Evening">Evening</option>
                    <option <!-- php: = $val->name == "Night" ? "selected" : "" --> value="Night">Night</option>
                    <option <!-- php: = $val->name == "OverNight" ? "selected" : "" --> value="OverNight">OverNight</option>
                    <option <!-- php: = $val->name == "Mid-Morning" ? "selected" : "" --> value="Mid-Morning">Mid-Morning</option>
                    <option <!-- php: = $val->name == "Mid-Afternoon" ? "selected" : "" --> value="Mid-Afternoon">Mid-Afternoon</option>
                </SearchableSelectField>
            </div>
        </div>
        
        <div class="form-group row">
            <label class="control-label col-md-2">Start
                
            </label>
            <div class="col-md-8">
                <input type="time" value="<!-- php: = $val->start -->" name="start" id="start" data-required="0" placeholder="Enter Start" class="form-control input-height" /> 
            </div>
        </div>
        <div class="form-group row">
            <label class="control-label col-md-2">End
                
            </label>
            <div class="col-md-8">
                <input type="time" value="<!-- php: = $val->end -->" name="end" id="end" data-required="0" placeholder="Enter End" class="form-control input-height" /> 
            </div>
        </div>
				  </div>
				  <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center py-1 justify-content-end">
                        <button id="submit-recurring-followups" style="height:20px;width:auto;"
                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i
                                class="fa fa-check text-success fa-1x"></i> </button>	    <!-- php: =$this->Form->end(); -->

                        <!-- <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Reset&nbsp;
							<i class="fa fa-refresh" aria-hidden="true"></i> </button> -->
                        <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                            data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                class="fa fa-times text-danger fa-1x"></i> </button>
                    </div>
                </div>
				</div>
			</div>
		</div>
	</div>
<!-- php: } -->
<!-- data tables -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->


<script>
	function clearInvestigationFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementShiftschedulerConfiguretime() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
