const rawHtml = `

<style>
.md-timezone-meeting-planner .mbsc-schedule-color-text {
    padding: 16px 0;
    text-align: center;
}
.slot-name {
    line-height: 20px;
    font-size: 15px;
}

.slot-time {
    opacity: .5;
    line-height: 20px;
    font-size: 13px;
}

.md-shift-template .mbsc-timeline-header-placeholder {
    height: 74px;
}

.md-shift-template .mbsc-timeline-slots {
    height: 48px;
    text-align: center;
}
/* 
.md-shift-template .mbsc-schedule-event {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
} */

.md-shift-template .mbsc-timeline-slot-title {
    padding: 0;
}

.md-timezone-meeting-planner.mbsc-ios-dark .mbsc-timeline-color,
.md-timezone-meeting-planner.mbsc-material-dark .mbsc-timeline-color,
.md-timezone-meeting-planner.mbsc-windows-dark .mbsc-timeline-color {
    color: #fff !important;
}

.md-meeting-planner-cont {
    font-size: 12px;
    font-weight: 600;
    height: 100%;
    background: #1ad404;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    border-radius: 6px;
    overflow: hidden;
}

.md-meeting-planner-wrapper {
    background: rgba(255, 255, 255, .5);
    height: 100%;
    box-sizing: border-box;
    padding: 0 6px;
    transition: background .15s ease-in-out;
}

.mbsc-schedule-event-hover .md-meeting-planner-wrapper {
    background: rgba(255, 255, 255, .3);
}

.md-meeting-planner-title {
    padding-top: 3px;
    color: initial;
}

.md-meeting-planner-time {
    color: #666;
}

.md-meeting-planner-title,
.md-meeting-planner-time {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.md-meeting-planner-header {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.md-meeting-planner-zone {
    font-size: 12px;
    padding: 3px 6px;
    margin: 0 5px;
    border-radius: 16px;
    color: #888;
}

.md-meeting-planner-work {
    background: #f7f7bb4d;
}

.md-meeting-planner-flex {
    background: #a5ceff4d;
}

.md-meeting-planner-off {
    background: #ffbaba4d;
}

.md-meeting-participant-cont {
    position: relative;
    padding-left: 15px;
    max-height: 40px;
    line-height: 20px;
}

.md-meeting-participant-avatar {
    position: absolute;
    max-height: 40px;
    max-width: 40px;
    top: 25px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    left: 20px;
    border-radius:20px
}

.md-meeting-participant-name {
    font-size: 16px;
}

.md-meeting-participant-offset {
    font-size: 12px;
    opacity: 0.6;
}
.md-work-week-picker {
    flex: 0.5 0 auto;
}

.md-work-week-nav {
    width: 200px;
}
.mbsc-calendar-controls {
    justify-content: space-between;
}

</style>
<div class="card card-topline-<!-- php: = $theme1 -->">

<div class="card  card-box">
    <div class="card-head">
        <header>Shift Scheduler</header>
    </div>
    <div class="card-body ">
    <div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-body">
			<div class="tab-content">
				
				
<div style="position:relative;" class="container-fluid px-2">
    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modsample"><i class="fa fa-calendar"></i>&nbsp; Multi Work Schedule</button>
    <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#vacationModal"><i class="fa fa-umbrella"></i>&nbsp; Vacation Schedule</button>
    <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#emergencyModal"><i class="fa fa-exclamation-triangle"></i>&nbsp; Emergency Schedule</button>
    <button onclick="printCalendar()" style="float:right" class="btn btn-success btn-sm"><i class="fa fa-print"></i>&nbsp; Print</button>
    
</div>
<div class="container-fluid mt-4 p-2">
    <div mbsc-page class="demo-daily-weekly-monthly-yearly-timeline" id="custom-calendar" style="height: 100%;">
        <div id="demo-work-order-scheduling" class="md-switching-timeline-view-cont md-shift-template"></div>
    </div>

    <div id="demo-work-order-popup">
        <div class="mbsc-form-group">
            <label>
                Title
                <input mbsc-input id="work-order-title" />
            </label>
            <label>
                Location
                <input mbsc-input id="work-order-location" />
            </label>
            <label>
                Notes
                <textarea mbsc-textarea id="work-order-notes"></textarea>
            </label>
        </div>
        <div class="mbsc-form-group">
            <label>
                Starts
                <input mbsc-input id="work-order-start" />
            </label>
            <label>
                Ends
                <input mbsc-input id="work-order-end" />
            </label>
            <div id="work-order-date"></div>
        </div>
        <div id="work-order-resources" class="mbsc-form-group">

        </div>

        <div class="mbsc-button-group">
            <button class="mbsc-button-block" id="work-order-delete" mbsc-button data-color="danger"
                data-variant="outline">Delete work order</button>
        </div>
    </div>
 </div> 


<div class="modal fade" id="modsample" tabindex="-1" aria-labelledby="modsample" aria-hidden="true" aria-hidden="true">
<div class="modal-dialog  modal-dialog-centered" role="document">
	<div class="modal-content">
	 <div class="container px-0 border border-2 border-primary">
         <div class="container-fluid pr-0 bg-primary">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="text-slate-900 my-0">Add Multiple Schedules</h4>
					<div>
						<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
					</div> 
			</div>	   
		 </div>
         <!-- php: = $this->Form->create($shift, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'addShift']]); -->
	<div class="container bg-white p-2">
		<div class="container-fluid">
     <div class="row mt-4 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Title:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="text" placeholder="Enter Title Of Shift Schedule" name="title" class="form-control form-control-sm">
        </div>
	</div>
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Time Slot:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<SearchableSelectField name="slot" id="slot1" class="form-control">
                <option>Select Time Slot</option>
                <option value="custom">Custom</option>
                <!-- php: foreach($timeslots as $sl){ -->
                <option value="<!-- php: =$sl->id -->" data-start="<!-- php: = $sl->start -->" data-end = "<!-- php: = $sl->end -->"><!-- php: = $sl->name --> (<!-- php: = $sl->start --> - <!-- php: = $sl->end -->)</option>
                <!-- php: } -->
            </SearchableSelectField>
        </div>
	</div>
    
    <div id="start-end1">
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Start:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="datetime-local" name="recur_start" id="start1" class="form-control form-control-sm">
        </div>
	</div>
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			<h5>End:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="datetime-local" name="shift_end" id="end1" class="form-control form-control-sm">
            <input type="hidden" id="totalHours1" name="hours">
        </div>
	</div>
                </div>
                <div class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Recurring:</h5>
                     </div> 
                     <div class="col-md-7 d-flex align-items-center p-1">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="inlineRadio1" value="daily">
                           <label class="form-check-label" for="daily">Daily</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="inlineRadio2" value="weekly">
                           <label class="form-check-label" for="weekly">Weekly</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="inlineRadio3" value="monthly">
                           <label class="form-check-label" for="monthly">Monthly</label>
                        </div> 
                     </div>
                  </div>
                  <div id="repeat-daily1" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_day" class="form-control">
                     </div>
                     <div class="col-md-2 p-1">
                        <h5>days</h5>
                     </div>
                  </div> 
                   <div id="repeat-weekly1" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_week" class="form-control">
                     </div>
                     <div class="col-md-2 p-1">
                        <h5>weeks</h5>
                     </div>
                     <!-- <div class="col-md-12">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                           <label class="form-check-label" for="mon">Sun</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                           <label class="form-check-label" for="mon">Mon</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="tue" value="tue">
                           <label class="form-check-label" for="tue">Tue</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="wed" value="wed">
                           <label class="form-check-label" for="wed">Wed</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="thu" value="thu">
                           <label class="form-check-label" for="thu">Thu</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="fri" value="fri">
                           <label class="form-check-label" for="fri">Fri</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="sat" value="sat">
                           <label class="form-check-label" for="sat">Sat</label>
                        </div>
                     </div> -->
                  </div>
                  <div id="repeat-monthly1" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_month" class="form-control">
                     </div>
                     <div class="col-md-2 p-1">
                        <h5>months</h5>
                     </div>
                  </div> 
                  <div class="row">
                  <div id="until1" class="container-fluid p-2">
                        <!-- <h5 class="text-left">Stop Condition</h5> -->
                        <div style="border: 1px solid #ccc; border-radius:5px;" class="container py-4 p-3">
                           <!-- <div class="row">
                              <div class="col-md-1"><input type="radio" id="recur-type" name="recur-type"/></div>
                              <div class="col-md-7">
                                  <h5 class="text-dark m-0 p-0 text-left">Never Stop</h5>
                                  <h6 class="text-left" style="color:#ccc!important">This will repeat indefinitely</h6>
                              </div>
                              </div> -->
                              <div class="row">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              
                           </div>
                           <div class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                    <div class="col-md-5">
                                    <h5 class="text-dark text-left m-0 p-0">Stop Condition</h5>
                                    </div>
                                    <div class="col-md-6 text-left">
                                    <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="condition" id="stop-date1" value="stop-date">
                           <label class="form-check-label" for="stop-date">Date</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="condition" id="stop-occurence1" value="stop-occurence">
                           <label class="form-check-label" for="stop-occurence">Occurence</label>
                        </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div id="specific-date1" class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                    <div class="col-md-5">
                                    <h5 class="text-dark text-left m-0 p-0">Run until a specific date</h5>
                                    </div>
                                    <div class="col-md-6"><input type="date" class="form-control" id="recur-type" name="recur_end"/></div>
                                 </div>
                              </div>
                           </div>
                           <div id="specific-occurence1" class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                   <div class="col-md-5">
                                   <h5 class="text-dark text-left m-0 p-0" style="padding-right:33px!important">Run until it reaches</h5>
                                   </div>
                                    <div class="col-md-3"><input type="text" class="form-control" id="recur-type" name="occurence"/></div>
                                    <div style="white-space: nowrap;" class="col-md-2 pl-1">occurences</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			Roles
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<SearchableSelectField class="form-control" name="role" id="role1">
                <option>Select Role</option>
                <!-- php: foreach($roles as $role) { echo "<option value='".$role->id."'>".$role->name."</option>"; } -->
            </SearchableSelectField>
        </div>
	</div>
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			Users
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
        <SearchableSelectField data-actions-box="true" class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="users_id[]" id="id1" title="Select Users"  data-live-search="true" multiple required>
		    								
		</SearchableSelectField>
        </div>
	</div>
		</div>
		 </div>
<div class="container-fluid pr-0 bg-primary">
	<div class="d-flex align-items-center py-1 justify-content-end">
    <input name="color" type="hidden" value="#3498db">
    <input name="category" type="hidden" value="work">
		<button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
        <!-- php: =$this->Form->end(); -->
		<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Reset&nbsp;<i class="fa fa-sync text-secondary fa-1x"></i> </button>
		<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
	</div>
</div>
</div>
</div>
</div>
				
			</div>


    <div class="modal fade" id="vacationModal" tabindex="-1" aria-labelledby="vacationModal" aria-hidden="true"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="container px-0 border border-2 border-warning">
                    <div class="container-fluid pr-0 bg-warning">
                        <div class="d-flex align-items-center justify-content-between">
                            <h4 class="text-slate-900 my-0">Add Multiple Vacation Schedules</h4>
                            <div>
                                <button data-dismiss="modal" aria-label="Close"
                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                        class="fa fa-times text-primary"></i> </button>
                            </div>
                        </div>
                    </div>
                    <!-- php: = $this->Form->create($shift, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'addShift']]); -->
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            <div class="row mt-4 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Title:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="text" name="title" placeholder="Enter Title Of Shift Schedule"
                                        class="form-control form-control-sm">
                                </div>
                            </div>

                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Time Slot:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <SearchableSelectField name="slot" id="slot2" class="form-control">
                                        <option>Select Time Slot</option>
                                        <option value="custom">Custom</option>
                                        <!-- php: foreach($timeslots as $sl){ -->
                                        <option value="<!-- php: =$sl->id -->" data-start="<!-- php: = $sl->start -->"
                                            data-end="<!-- php: = $sl->end -->"><!-- php: = $sl->name --> (<!-- php: = $sl->start --> -
                                            <!-- php: = $sl->end -->)</option>
                                        <!-- php: } -->
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div id="start-end2">
                                <div class="row mt-2 pl-2">
                                    <div class="col-md-3 p-1">
                                        <h5>Start:</h5>
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <input type="datetime-local" name="recur_start" id="start2"
                                            class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="row mt-2 pl-2">
                                    <div class="col-md-3 p-1">
                                        <h5>End:</h5>
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <input type="datetime-local" name="shift_end" id="end2"
                                            class="form-control form-control-sm">
                                        <input type="hidden" id="totalHours2" name="hours">

                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Recurring:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="type"
                                            id="inlineRadio4" value="daily">
                                        <label class="form-check-label" for="daily">Daily</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="type"
                                            id="inlineRadio5" value="weekly">
                                        <label class="form-check-label" for="weekly">Weekly</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="type"
                                            id="inlineRadio6" value="monthly">
                                        <label class="form-check-label" for="monthly">Monthly</label>
                                    </div>
                                </div>
                            </div>
                            <div id="repeat-daily2" class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Repeat every: </h5>
                                </div>
                                <div class="col-md-3 d-flex align-items-center p-1">
                                    <input type="number" name="every_day" class="form-control">
                                </div>
                                <div class="col-md-2 p-1">
                                    <h5>days</h5>
                                </div>
                            </div>
                            <div id="repeat-weekly2" class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Repeat every: </h5>
                                </div>
                                <div class="col-md-3 d-flex align-items-center p-1">
                                    <input type="number" name="every_week" class="form-control">
                                </div>
                                <div class="col-md-2 p-1">
                                    <h5>weeks</h5>
                                </div>
                                <!-- <div class="col-md-12">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                    <label class="form-check-label" for="mon">Sun</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                    <label class="form-check-label" for="mon">Mon</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="week_day" id="tue" value="tue">
                    <label class="form-check-label" for="tue">Tue</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="week_day" id="wed" value="wed">
                    <label class="form-check-label" for="wed">Wed</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="week_day" id="thu" value="thu">
                    <label class="form-check-label" for="thu">Thu</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="week_day" id="fri" value="fri">
                    <label class="form-check-label" for="fri">Fri</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="week_day" id="sat" value="sat">
                    <label class="form-check-label" for="sat">Sat</label>
                </div>
                </div> -->
                            </div>
                            <div id="repeat-monthly2" class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Repeat every: </h5>
                                </div>
                                <div class="col-md-3 d-flex align-items-center p-1">
                                    <input type="number" name="every_month" class="form-control">
                                </div>
                                <div class="col-md-2 p-1">
                                    <h5>months</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div id="until2" class="container-fluid p-2">
                                    <!-- <h5 class="text-left">Stop Condition</h5> -->
                                    <div style="border: 1px solid #ccc; border-radius:5px;"
                                        class="container py-4 p-3">
                                        <!-- <div class="row">
                        <div class="col-md-1"><input type="radio" id="recur-type" name="recur-type"/></div>
                        <div class="col-md-7">
                            <h5 class="text-dark m-0 p-0 text-left">Never Stop</h5>
                            <h6 class="text-left" style="color:#ccc!important">This will repeat indefinitely</h6>
                        </div>
                        </div> -->
                                        <div class="row">
                                            <!-- <div class="col-md-1"><input type="radio"/></div> -->

                                        </div>
                                        <div class="row mt-3">
                                            <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                            <div class="col-md-11">
                                                <div class="d-flex align-items-center">
                                                    <div class="col-md-5">
                                                        <h5 class="text-dark text-left m-0 p-0">Stop Condition
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-6 text-left">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="condition" id="stop-date2"
                                                                value="stop-date">
                                                            <label class="form-check-label"
                                                                for="stop-date">Date</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="condition" id="stop-occurence2"
                                                                value="stop-occurence">
                                                            <label class="form-check-label"
                                                                for="stop-occurence">Occurence</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="specific-date2" class="row mt-3">
                                            <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                            <div class="col-md-11">
                                                <div class="d-flex align-items-center">
                                                    <div class="col-md-5">
                                                        <h5 class="text-dark text-left m-0 p-0">Run until a
                                                            specific date</h5>
                                                    </div>
                                                    <div class="col-md-6"><input type="date"
                                                            class="form-control" id="recur-type"
                                                            name="recur_end" /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="specific-occurence2" class="row mt-3">
                                            <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                            <div class="col-md-11">
                                                <div class="d-flex align-items-center">
                                                    <div class="col-md-5">
                                                        <h5 class="text-dark text-left m-0 p-0"
                                                            style="padding-right:33px!important">Run until it
                                                            reaches</h5>
                                                    </div>
                                                    <div class="col-md-3"><input type="text"
                                                            class="form-control" id="recur-type"
                                                            name="occurence" /></div>
                                                    <div style="white-space: nowrap;" class="col-md-2 pl-1">
                                                        occurences</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    Roles
                                </div>
                                <div id="roles1" class="col-md-7 d-flex align-items-center p-1">
                                    <SearchableSelectField class="form-control" name="role" id="role2">
                                        <option>Select Role</option>
                                        <!-- php: foreach($roles as $role) { echo "<option value='".$role->id."'>".$role->name."</option>"; } -->
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    Users
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <SearchableSelectField data-actions-box="true"
                                        class="form-control input-height selectpicker show-menu-arrow show-tick"
                                        data-size="5" name="users_id[]" id="id2" title="Select Users"
                                        data-live-search="true" multiple required>

                                    </SearchableSelectField>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-warning">
                        <input name="color" type="hidden" value="#f1c40f">
                        <input name="category" type="hidden" value="vacation">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button type="submit" style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i
                                    class="fa fa-check text-success fa-1x"></i> </button>
                            <!-- php: =$this->Form->end(); -->

                            <button style="height:20px;width:auto;"
                                class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Reset&nbsp;<i
                                    class="fa fa-sync text-secondary fa-1x"></i> </button>
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


<div class="modal fade" id="emergencyModal" tabindex="-1" aria-labelledby="emergencyModal" aria-hidden="true" aria-hidden="true">
<div class="modal-dialog  modal-dialog-centered" role="document">
	<div class="modal-content">
	 <div class="container px-0 border border-2 border-danger">
         <div class="container-fluid pr-0 bg-danger">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="text-slate-900 my-0">Add Multiple Emergency Schedules</h4>
					<div>
						<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
					</div> 
			</div>	   
		 </div>
         <!-- php: = $this->Form->create($shift, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'addShift']]); -->

	<div class="container bg-white p-2">
		<div class="container-fluid">
     <div class="row mt-4 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Title:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="text" placeholder="Enter Title Of Shift Schedule" name="title" class="form-control form-control-sm">
        </div>
	</div>
    
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Time Slot:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<SearchableSelectField name="slot" id="slot3" class="form-control">
                <option>Select Time Slot</option>
                <option value="custom">Custom</option>
               <!-- php: foreach($timeslots as $sl){ -->
                <option value="<!-- php: =$sl->id -->" data-start="<!-- php: = $sl->start -->" data-end = "<!-- php: = $sl->end -->"><!-- php: = $sl->name --> (<!-- php: = $sl->start --> - <!-- php: = $sl->end -->)</option>
                <!-- php: } -->
            </SearchableSelectField>
        </div>
	</div>
    <div id="start-end3">
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Start:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="datetime-local" name="recur_start" id="start3" class="form-control form-control-sm">
        </div>
	</div>
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			<h5>End:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="datetime-local" name="shift_end" id="end3" class="form-control form-control-sm">
            <input type="hidden" id="totalHours3" name="hours">
        </div>
	</div>
               </div>
               <div class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Recurring:</h5>
                     </div> 
                     <div class="col-md-7 d-flex align-items-center p-1">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="inlineRadio7" value="daily">
                           <label class="form-check-label" for="daily">Daily</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="inlineRadio8" value="weekly">
                           <label class="form-check-label" for="weekly">Weekly</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="inlineRadio9" value="monthly">
                           <label class="form-check-label" for="monthly">Monthly</label>
                        </div> 
                     </div>
                  </div>
                  <div id="repeat-daily3" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_day" class="form-control">
                     </div>
                     <div class="col-md-2 p-1">
                        <h5>days</h5>
                     </div>
                  </div> 
                   <div id="repeat-weekly3" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_week" class="form-control">
                     </div>
                     <div class="col-md-2 p-1">
                        <h5>weeks</h5>
                     </div>
                     <!-- <div class="col-md-12">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                           <label class="form-check-label" for="mon">Sun</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                           <label class="form-check-label" for="mon">Mon</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="tue" value="tue">
                           <label class="form-check-label" for="tue">Tue</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="wed" value="wed">
                           <label class="form-check-label" for="wed">Wed</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="thu" value="thu">
                           <label class="form-check-label" for="thu">Thu</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="fri" value="fri">
                           <label class="form-check-label" for="fri">Fri</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="week_day" id="sat" value="sat">
                           <label class="form-check-label" for="sat">Sat</label>
                        </div>
                     </div> -->
                  </div>
                  <div id="repeat-monthly3" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_month" class="form-control">
                     </div>
                     <div class="col-md-2 p-1">
                        <h5>months</h5>
                     </div>
                  </div> 
                  <div class="row">
                  <div id="until3" class="container-fluid p-2">
                        <!-- <h5 class="text-left">Stop Condition</h5> -->
                        <div style="border: 1px solid #ccc; border-radius:5px;" class="container py-4 p-3">
                           <!-- <div class="row">
                              <div class="col-md-1"><input type="radio" id="recur-type" name="recur-type"/></div>
                              <div class="col-md-7">
                                  <h5 class="text-dark m-0 p-0 text-left">Never Stop</h5>
                                  <h6 class="text-left" style="color:#ccc!important">This will repeat indefinitely</h6>
                              </div>
                              </div> -->
                              <div class="row">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              
                           </div>
                           <div class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                    <div class="col-md-5">
                                    <h5 class="text-dark text-left m-0 p-0">Stop Condition</h5>
                                    </div>
                                    <div class="col-md-6 text-left">
                                    <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="condition" id="stop-date3" value="stop-date">
                           <label class="form-check-label" for="stop-date">Date</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="condition" id="stop-occurence3" value="stop-occurence">
                           <label class="form-check-label" for="stop-occurence">Occurence</label>
                        </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div id="specific-date3" class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                    <div class="col-md-5">
                                    <h5 class="text-dark text-left m-0 p-0">Run until a specific date</h5>
                                    </div>
                                    <div class="col-md-6"><input type="date" class="form-control" id="recur-type" name="recur_end"/></div>
                                 </div>
                              </div>
                           </div>
                           <div id="specific-occurence3" class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                   <div class="col-md-5">
                                   <h5 class="text-dark text-left m-0 p-0" style="padding-right:33px!important">Run until it reaches</h5>
                                   </div>
                                    <div class="col-md-3"><input type="text" class="form-control" id="recur-type" name="occurence"/></div>
                                    <div style="white-space: nowrap;" class="col-md-2 pl-1">occurences</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			Roles
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<SearchableSelectField class="form-control" name="role" id="role3">
                <option>Select Role</option>
                <!-- php: foreach($roles as $role) { echo "<option value='".$role->id."'>".$role->name."</option>"; } -->
            </SearchableSelectField>
        </div>
	</div>
    <div class="row mt-2 pl-2">
	    <div class="col-md-3 p-1">
			Users
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
        <SearchableSelectField data-actions-box="true" class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="users_id[]" id="id3" title="Select Users"  data-live-search="true" multiple required>
		    								
		</SearchableSelectField>
        </div>
	</div>
		</div>
		 </div>
<div class="container-fluid pr-0 bg-danger">
	<div class="d-flex align-items-center py-1 justify-content-end">
    <input name="color" type="hidden" value="tomato">
    <input name="category" type="hidden" value="emergency">
		<button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
        <!-- php: =$this->Form->end(); -->
		<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Reset&nbsp;<i class="fa fa-sync text-secondary fa-1x"></i> </button>
		<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
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
		
	</div>
</div>

<!-- php: =$this->Html->script('../assets/js/html2canvas.js') -->
<script>
  function printCalendar(){
    newWindow = window.open("", "newWindow", "width=1000, height=600");
    html2canvas(document.querySelector("#custom-calendar")).then(canvas => {
        // document.body.appendChild(canvas)
        newWindow.document.body.appendChild(canvas);
        newWindow.print();
    });
  }
</script>
<script>
$('#specific-date1').hide();
$('#specific-occurence1').hide();
$('#specific-date2').hide();
$('#specific-occurence2').hide();
$('#specific-date3').hide();
$('#specific-occurence3').hide();

$('#stop-occurence1').on('change', function(){
   $('#specific-date1').hide();
$('#specific-occurence1').show();
});

$('#stop-date1').on('change', function(){
   $('#specific-date1').show();
$('#specific-occurence1').hide();
});

$('#stop-occurence2').on('change', function(){
   $('#specific-date2').hide();
$('#specific-occurence2').show();
});

$('#stop-date2').on('change', function(){
   $('#specific-date2').show();
$('#specific-occurence2').hide();
});

$('#stop-occurence3').on('change', function(){
   $('#specific-date3').hide();
$('#specific-occurence3').show();
});

$('#stop-date3').on('change', function(){
   $('#specific-date3').show();
$('#specific-occurence3').hide();
});

$('#role1').on('change', function(){
       $.ajax({
           type:"POST",
           data: {value:$('#role1').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#id1').html(html);
               $('#id1').selectpicker("refresh");
           },
           error: function(){
               alert('false');
           }

       });
    });
    $('#role2').on('change', function(){
       $.ajax({
           type:"POST",
           data: {value:$('#role2').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#id2').html(html);
               $('#id2').selectpicker("refresh");
           },
           error: function(){
               alert('false');
           }

       });
    });
    $('#role3').on('change', function(){
       $.ajax({
           type:"POST",
           data: {value:$('#role3').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#id3').html(html);
               $('#id3').selectpicker("refresh");
           },
           error: function(){
               alert('false');
           }

       });
    });
    document.querySelector("#end1").addEventListener("change", myFunction);
    document.querySelector("#end2").addEventListener("change", myFunction2);
    document.querySelector("#end3").addEventListener("change", myFunction3);

function myFunction() {

  //value start
  var start = Date.parse($("input#start1").val()); //get timestamp

  //value end
  var end = Date.parse($("input#end1").val()); //get timestamp

  totalHours = NaN;
  if (start < end) {
    totalHours = Math.floor((end - start) / 1000 / 60 / 60); //milliseconds: /1000 / 60 / 60
  }else{
    alert('Error: Invalid Date Range');
}

 $("#totalHours1").val(totalHours);


}

function myFunction2() {

//value start
var start = Date.parse($("input#start2").val()); //get timestamp

//value end
var end = Date.parse($("input#end2").val()); //get timestamp

totalHours = NaN;
if (start < end) {
  totalHours = Math.floor((end - start) / 1000 / 60 / 60); //milliseconds: /1000 / 60 / 60
}
else{
    alert('Error: Invalid Date Range');
}

$("#totalHours2").val(totalHours);


}
function myFunction3() {

//value start
var start = Date.parse($("input#start3").val()); //get timestamp

//value end
var end = Date.parse($("input#end3").val()); //get timestamp

totalHours = NaN;
if (start < end) {
  totalHours = Math.floor((end - start) / 1000 / 60 / 60); //milliseconds: /1000 / 60 / 60
}else{
    alert('Error: Invalid Date Range');
}

$("#totalHours3").val(totalHours);


}

mobiscroll.setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

var calendar,
    popup,
    range,
    oldEvent,
    tempEvent = {},
    deleteEvent,
    restoreEvent,
    titleInput = document.getElementById('work-order-title'),
    tooltip = document.getElementById('custom-event-tooltip-popup'),
    locationInput = document.getElementById('work-order-location'),
    notesTextarea = document.getElementById('work-order-notes'),
    deleteButton = document.getElementById('work-order-delete'),
    resourceCont = document.getElementById('work-order-resources');

var myData = <!-- php: = json_encode($schedules) -->;
var slots = <!-- php: = count($slots) > 0 ? json_encode($slots) : json_encode(array()) -->;
var myResources = <!-- php: = json_encode($collab) -->

function createAddPopup(elm) {
    // hide delete button inside add popup
    deleteButton.style.display = 'none';
    deleteEvent = true;
    restoreEvent = false;

    // set popup header text and buttons for adding
    popup.setOptions({
        headerText: 'New work order',
        buttons: [
            'cancel',
            {
                text: 'Add',
                keyCode: 'enter',
                handler: function () {
                    calendar.updateEvent(tempEvent);
                    deleteEvent = false;

                    // navigate the calendar to the correct view
                    calendar.navigate(tempEvent.start);

                    popup.close();
                },
                cssClass: 'mbsc-popup-button-primary'
            }
        ]
    });

    // fill popup with a new event data
    mobiscroll.getInst(titleInput).value = tempEvent.title;
    mobiscroll.getInst(locationInput).value = '';
    mobiscroll.getInst(notesTextarea).value = '';
    range.setVal([tempEvent.start, tempEvent.end]);
    // setCheckboxes(tempEvent.resource);

    // set anchor for the popup
    popup.setOptions({ anchor: elm });

    popup.open();
}

function createEditPopup(args) {
    var ev = args.event;

    // show delete button inside edit popup
    deleteButton.style.display = 'block';

    deleteEvent = false;
    restoreEvent = true;

    // set popup header text and buttons for editing
    popup.setOptions({
        headerText: 'Edit event',
        buttons: [
            'cancel',
            {
                text: 'Save',
                keyCode: 'enter',
                handler: function () {
                    var date = range.getVal();
                    // update event with the new properties on save button click
                    calendar.updateEvent({
                        id: ev.id,
                        title: titleInput.value,
                        location: locationInput.value,
                        notes: notesTextarea.value,
                        start: date[0],
                        end: date[1],
                        color: ev.color,
                        resource: ev.resource,
                    });

                    // navigate the calendar to the correct view
                    calendar.navigate(date[0]);;

                    restoreEvent = false;
                    popup.close();
                },
                cssClass: 'mbsc-popup-button-primary'
            }
        ]
    });

    // fill popup with the selected event data
    mobiscroll.getInst(titleInput).value = ev.title || '';
    mobiscroll.getInst(locationInput).value = ev.location || '';
    mobiscroll.getInst(notesTextarea).value = ev.notes || '';
    range.setVal([ev.start, ev.end]);
    // setCheckboxes(ev.resource);

    // set anchor for the popup
    popup.setOptions({ anchor: args.domEvent.currentTarget });
    popup.open();
}

calendar = mobiscroll.eventcalendar('#demo-work-order-scheduling', {
    clickToCreate: false,
    dragToCreate: false,
    dragToMove: false,
    dragToResize: false,
    dragTimeStep: 30,
    view: {
        timeline: {
            type: 'week',
            startDay: 1,
            eventList: true,
            endDay: 5
        },
        timeCellStep: 1440,
        timeLabelStep: 1440,
        weekNumbers: false
            
    },
    data: myData,
    slots: slots,
    resources: myResources,
    extendDefaultEvent: function (ev) {
        var d = ev.start;
        var start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), ev.slot == 1 ? 7 : 12);
        var end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), ev.slot == 1 ? 13 : 18);

        return {
            title: formatDate('HH:mm', start) + ' - ' + formatDate('HH:mm', end),
            start: start,
            end: end,
            resource: ev.resource
        };
    },
    extendDefaultEvent: function () {
        return {
            title: 'Work order',
            location: ''
        };
    },
    onEventClick: function (args) {
        oldEvent = { ...args.event };
        tempEvent = args.event;

        if (!popup.isVisible()) {
            createEditPopup(args);
        }
    },
    onEventCreated: function (args) {
        popup.close();
        // store temporary event
        tempEvent = args.event;
        createAddPopup(args.target);
    },
    onEventDeleted: function (args) {
        mobiscroll.snackbar({            button: {
                action: function () {
                    calendar.addEvent(args.event);
                },
                text: 'Undo'
            },
            message: 'Event deleted'
        });
    },
    renderResource: function (resource) {
            return '<div class="md-meeting-participant-cont">' +
                '<div class="md-meeting-participant-name">' + resource.name + '</div>' +
                '<span class="md-meeting-participant-offset">' + (resource.department != undefined ? resource.department : '') + '</span></div>' +
                '<img class="md-meeting-participant-avatar" src="' + (resource.img != undefined ? resource.img : '') + '"/>' +
                '</div>';
        },
        renderHeader: function () {
        return '<div mbsc-calendar-nav class="md-work-week-nav"></div>' +
            '<div class="md-work-week-picker">' +
            '<label>Day<input mbsc-segmented type="radio" name="view" value="day" class="md-view-change"></label>' +
            '<label>Week<input mbsc-segmented type="radio" name="view" value="week" class="md-view-change"  checked></label>' +
            '<label>Month<input mbsc-segmented type="radio" name="view" value="month" class="md-view-change"></label>' +
            '<label>Year<input mbsc-segmented type="radio" name="view" value="year" class="md-view-change"></label>' +
            '</div>' +
            '<div class="d-flex"><div mbsc-calendar-prev class="md-work-week-prev"></div>' +
            '<div mbsc-calendar-today class="md-work-week-today"></div>' +
            '<div mbsc-calendar-next class="md-work-week-next"></div></div>';
    },
    renderSlot: function (args) {
        var slotId = args.slot.id;
        return '<div style=";padding:4px;">' +
            '<div class="slot-name">' + args.slot.name + '</div>' +
            '<div class="slot-time">' + args.slot.start + ' - '+ args.slot.end + '</div>' +
            '</div>';
    }
});
document.querySelectorAll('.md-view-change').forEach(function (elm) {
    elm.addEventListener('change', function (ev) {
        switch (ev.target.value) {
            case 'day':
                calendar.setOptions({
                    view: {
                        timeline: { type: 'day' }
                    }
                })
                break;
            case 'week':
                calendar.setOptions({
                    view: {
                        timeline: {
                            type: 'week',
                            startDay: 1,
                            endDay: 5
                        }
                    }
                })
                break;
            case 'month':
                calendar.setOptions({
                    view: {
                        calendar: {
                            labels: 'true'
                        }
                    }
                })
                break;
                case 'year':
                calendar.setOptions({
                    view: {
                        calendar: {
                            type: 'year',
                            label: 'true'
                        }
                    }
                })
                break;
        }
    });
});

popup = mobiscroll.popup('#demo-work-order-popup', {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    scrollLock: false,
    onClose: function () {
        if (deleteEvent) {
            calendar.removeEvent(tempEvent);
        } else if (restoreEvent) {
            calendar.updateEvent(oldEvent);
        }
    },
    responsive: {
        medium: {
            display: 'anchored',
            width: 520,
            fullScreen: false,
            touchUi: false
        }
    }
});

titleInput.addEventListener('input', function (ev) {
    // update current event's title
    tempEvent.title = ev.target.value;
});

locationInput.addEventListener('input', function (ev) {
    // update current event's title
    tempEvent.location = ev.target.value;
});

notesTextarea.addEventListener('change', function (ev) {
    // update current event's title
    tempEvent.notes = ev.target.value;
});

range = mobiscroll.datepicker('#work-order-date', {
    controls: ['time'],
    select: 'range',
    startInput: '#work-order-input',
    endInput: '#work-order-input',
    showRangeLabels: false,
    touchUi: false,
    stepMinute: 30,
    minTime: '06:00',
    maxTime: '22:00',
    onChange: function (args) {
        var date = args.value;
        // update event's start date
        tempEvent.start = date[0];
        tempEvent.end = date[1];
    }
});

document.querySelectorAll('input[name=event-status]').forEach(function (elm) {
    elm.addEventListener('change', function () {
        // update current event's free property
        tempEvent.free = mobiscroll.getInst(freeSegmented).checked;
    });
});

deleteButton.addEventListener('click', function () {
    // delete current event on button click
    calendar.removeEvent(tempEvent);
    popup.close();

    // save a local reference to the deleted event
    var deletedEvent = tempEvent;

    mobiscroll.snackbar({        button: {
            action: function () {
                calendar.addEvent(deletedEvent);
            },
            text: 'Undo'
        },
        message: 'Event deleted'
    });
});

// function setCheckboxes(resources) {
//     var checkboxes = document.getElementsByClassName('work-order-checkbox');

//     for (var i = 0; i < checkboxes.length; i++) {
//         var checkbox = checkboxes[i];
//         mobiscroll.getInst(checkbox).checked = resources.indexOf(checkbox.getAttribute('data-value')) !== -1;
//     }
// }

// function appendChekboxes() {
//     var checkboxes = '<div class="mbsc-grid mbsc-no-padding"><div class="mbsc-row">';

//     for (var i = 0; i < myResources.length; ++i) {
//         for (var j = 0; j < myResources[i].children.length; ++j) {
//             var resource = myResources[i].children[j];

//             checkboxes += '<div class="mbsc-col-sm-4"><div class="mbsc-form-group-title">' + resource.name + '</div>';

//             for (var k = 0; k < resource.children.length; ++k) {
//                 var r = resource.children[k];
//                 checkboxes += '<label class="work-order-checkbox-label"><input class="work-order-checkbox" data-value="' +
//                     r.id + '" type="checkbox" mbsc-checkbox data-theme="material" data-label="' + r.name + '"/></label>';

//             }
//             checkboxes += '</div>';
//         }
//     }
//     checkboxes += '</div></div>';

//     resourceCont.innerHTML = checkboxes;
//     mobiscroll.enhance(resourceCont);
// }

$('#start-end1').hide();
$('#start-end2').hide();
$('#start-end3').hide();
$('#until1').hide();
$('#until2').hide();
$('#until3').hide();
$('#repeat-daily1').hide();
$('#repeat-weekly1').hide();
$('#repeat-monthly1').hide();
$('#repeat-daily2').hide();
$('#repeat-weekly2').hide();
$('#repeat-monthly2').hide();
$('#repeat-daily3').hide();
$('#repeat-weekly3').hide();
$('#repeat-monthly3').hide();
$('#slot1').on('change', function(){
 var value = $(this).val();
 var start = $(this).find(':selected').data('start');
 var end = $(this).find(':selected').data('end');
if(value == 'custom')
 {
     $('#start-end1').show();
 }
 else {
    $('#start-end1').hide();
   $('#start1').val('<!-- php: = date('Y-m-d') -->T'+start);
   $('#end1').val('<!-- php: = date('Y-m-d') -->T'+end);
   myFunction();
 }
});
$('#slot2').on('change', function(){
 var value = $(this).val();
 var start = $(this).find(':selected').data('start');
 var end = $(this).find(':selected').data('end');
 if(value == 'custom')
 {
     $('#start-end2').show();
 }
 else {
    $('#start-end2').hide();
   $('#start2').val('<!-- php: = date('Y-m-d') -->T'+start);
   $('#end2').val('<!-- php: = date('Y-m-d') -->T'+end);
   myFunction2();
 }
});
$('#slot3').on('change', function(){
 var value = $(this).val();
 var start = $(this).find(':selected').data('start');
 var end = $(this).find(':selected').data('end');
 if(value == 'custom')
 {
     $('#start-end3').show();
 }
 else {
    $('#start-end3').hide();
   $('#start3').val('<!-- php: = date('Y-m-d') -->T'+start);
   $('#end3').val('<!-- php: = date('Y-m-d') -->T'+end);
   myFunction3();
 }
});

$('#inlineRadio1').on('change', function(){
    $('#repeat-daily1').show();
    $('#repeat-weekly1').hide();
    $('#repeat-monthly1').hide();
    $('#until1').show();
});
$('#inlineRadio2').on('change', function(){
    $('#repeat-daily1').hide();
    $('#repeat-weekly1').show();
    $('#repeat-monthly1').hide();
    $('#until1').show();
});
$('#inlineRadio3').on('change', function(){
    $('#repeat-daily1').hide();
    $('#repeat-weekly1').hide();
    $('#repeat-monthly1').show();
    $('#until1').show();
});
$('#inlineRadio4').on('change', function(){
    $('#repeat-daily2').show();
    $('#repeat-weekly2').hide();
    $('#repeat-monthly2').hide();
    $('#until2').show();
});
$('#inlineRadio5').on('change', function(){
    $('#repeat-daily2').hide();
    $('#repeat-weekly2').show();
    $('#repeat-monthly2').hide();
    $('#until2').show();
});
$('#inlineRadio6').on('change', function(){
    $('#repeat-daily2').hide();
    $('#repeat-weekly2').hide();
    $('#repeat-monthly2').show();
    $('#until2').show();
});
$('#inlineRadio7').on('change', function(){
    $('#repeat-daily3').show();
    $('#repeat-weekly3').hide();
    $('#repeat-monthly3').hide();
    $('#until3').show();
});
$('#inlineRadio8').on('change', function(){
    $('#repeat-daily3').hide();
    $('#repeat-weekly3').show();
    $('#repeat-monthly3').hide();
    $('#until3').show();
});
$('#inlineRadio9').on('change', function(){
    $('#repeat-daily3').hide();
    $('#repeat-weekly3').hide();
    $('#repeat-monthly3').show();
    $('#until3').show();
});

// appendChekboxes();
</script>
`;

export default function ElementElementShiftschedulerScheduler() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
