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
            <header class="d-flex align-items-center">Stock Count <button data-toggle="modal" data-target="#new_count_modal" class="btn btn-success ml-2">New Count</button> </header>
        </div>
        <div class="card-body ">
            <div class="row">
                <div class="borderBox light bordered col-md-12">
                    <div class="borderBox-body">
                        <div class="tab-content">
                            <div class="row">
                                <div class="col-md-2 pr-3">
                                    <div class="form-group">
                                        <label>Filter:</label>
                                        <SearchableSelectField name="" id="date-filter" class="form-control">
                                            <option value="today">Today</option>
                                            <option value="this-week">This Week</option>
                                            <option value="this-month">This Month</option>
                                            <option value="custom">Custom</option>
                                        </SearchableSelectField>

                                        <div class="d-none" id="custom-date-range-container">
                                            <label>
                                                Start
                                                <input id="start" mbsc-input placeholder="Please select..." />
                                            </label>
                                            <label>
                                                End
                                                <input id="end" mbsc-input placeholder="Please select..." />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            

                                <div class="col-md-4 d-flex align-start">
                                
                                    <div class="form-group col-md-6">
                                        <label>Sort By:</label>
                                        <div class="d-flex align-items-start">
                                            <SearchableSelectField name="" id="" class="form-control">

                                            </SearchableSelectField>
                                            <button id="go-btn" type="submit" class="btn btn-sm btn-primary">Go</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="table-responsive">
                                <table id="stock-count-table" class="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Count Type</th>
                                            <th>Stock Value</th>
                                            <th>Count Value</th>
                                            <th>Gain/Loss</th>
                                            <th>By</th>
                                            <th>On</th>
                                            <th>Stock Reconciliation</th>
                                            <th>Actions</th>
                                        </tr>
                                        
                                    </thead>
                                    <tbody>
                                        <!-- php: foreach($counts as $key => $count): $stock_val = 0; $count_val = 0; $count_type = ''; $types = explode("||", $count->count_type); foreach ($types as $key => $type) { if ($type == 'central_store') { $count_type.='Central Store, '; continue; ... -->

                                            <tr>
                                                <td><!-- php: = $count->name --></td>
                                                <td><span class="badge bg-<!-- php: = $count->status_id == '19' ? 'warning' : 'success' --> text-slate-900"><!-- php: = $count->status == '19' ? 'Ongoing' : $count->status->name --></span></td>
                                                <td><!-- php: = $count_type --></td>
                                                <td>
                                                    <!-- php: = $stock_val -->
                                                </td>
                                                <td><!-- php: = $count_val --></td>
                                                <td><!-- php: = $count_val - $stock_val > 0 ? '<span class="badge badge-danger">Gain</span>' : ($count_val - $stock_val < 0 ? '<span class="badge badge-danger">Loss</span>':'') --></td>
                                                <td><!-- php: = $count->user->first_name --> <!-- php: = $count->user->last_name --></td>
                                                <td><!-- php: = $count->date_created->nice() --></td>
                                                <td></td>
                                                <td>
                                                    <!-- php: if($count->status_id == '19'): -->
                                                        <a href="<!-- php: =$this->Url->build(['controller'=>'Inventory','action'=>'viewStockCount', $count->id]) -->" class="btn btn-primary btn-xs">Continue</a>
                                                    <!-- php: else: -->
                                                        <a href="<!-- php: =$this->Url->build(['controller'=>'Inventory','action'=>'viewStockCount', $count->id]) -->" class="btn btn-primary btn-xs">View</a>
                                                    <!-- php: endif -->
            
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

<div class="modal fade" id="new_count_modal" tabindex="-1" aria-labelledby="new_count_modal" aria-hidden="true" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Create New Count</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Inventory', 'action' => 'createStockCount']]); -->
                <div class="container bg-white p-2">
                    <div class="container-fluid">
                        <div class="form-group row">
                            <div class="col-md-3">Count Title <small class="text-danger">*</small></div>
                            <div class="col-md-7">
                                <input type="text" name="name" class="form-control">
                                <input type="hidden" name="count_location" value="consumables">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-3">Location <small class="text-danger">*</small></div>
                            <div class="col-md-7">
                                <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" id="stock_count_type_picker" data-size="4" name="count_type[]" multiple>
                                    <option value="central_store">Central Store</option>
                                    <!-- php: foreach ($departments as $key => $department): -->
                                        <option value="department_<!-- php: = $department->id -->"><!-- php: = $department->name --></option>
                                    <!-- php: endforeach -->
                                </SearchableSelectField>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center py-1 justify-content-end">
                        <button style="height:20px;width:auto;"
                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Create Count </button>
                <!-- php: = $this->Form->end(); -->
                        <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                            data-dismiss="modal" aria-label="Close">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="loss_report_modal" tabindex="-1" aria-labelledby="loss_report_modal" aria-hidden="true" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-danger">
                <div class="container-fluid pr-0 bg-danger">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Loss Report</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <!-- php: //= $this->Form->create($shift, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'addShift']]); -->
                <div class="container bg-white p-2">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center">
                            <!-- php: = $this->Html->image('../assets/img/calendar-red.svg',['class' =>'', 'style'=> 'height:25px;width:auto']) -->
                            <p class="my-0 ml-2">30th March, 2023 by Leslie Daafour</p>
                        </div>

                        <div class="table-responsive mt-5">
                            <table class="table" id="loss-report-table">
                                <thead>
                                    <tr>
                                        <th>Item Name/ID</th>
                                        <th>Batch No.</th>
                                        <th>System Count</th>
                                        <th>Manual Count</th>
                                        <th>Gain Loss</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>21ST ZOO FRIENDS GUMMIES MULTI GUMMIES</td>
                                        <td>21ST23</td>
                                        <td>10</td>
                                        <td>1</td>
                                        <td>+9</td>
                                    </tr>
                                    <tr>
                                        <td>21ST ZOO FRIENDS GUMMIES MULTI GUMMIES</td>
                                        <td>21ST23</td>
                                        <td>10</td>
                                        <td>1</td>
                                        <td>+9</td>
                                    </tr>
                                    <tr>
                                        <td>21ST ZOO FRIENDS GUMMIES MULTI GUMMIES</td>
                                        <td>21ST23</td>
                                        <td>10</td>
                                        <td>1</td>
                                        <td>+9</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="form-group mt-3">
                            <label for="">Notes</label>
                            <textarea name="" id="" class="form-control"></textarea>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="gain_report_modal" tabindex="-1" aria-labelledby="gain_report_modal" aria-hidden="true" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-success">
                <div class="container-fluid pr-0 bg-success">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Gain Report</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <!-- php: //= $this->Form->create($shift, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'addShift']]); -->
                <div class="container bg-white p-2">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center">
                            <!-- php: = $this->Html->image('../assets/img/calendar-green.svg',['class' =>'', 'style'=> 'height:25px;width:auto']) -->
                            <p class="my-0 ml-2">30th March, 2023 by Leslie Daafour</p>
                        </div>

                        <div class="table-responsive mt-5">
                            <table class="table" id="gain-report-table">
                                <thead>
                                    <tr>
                                        <th>Item Name/ID</th>
                                        <th>Batch No.</th>
                                        <th>System Count</th>
                                        <th>Manual Count</th>
                                        <th>Gain Loss</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>21ST ZOO FRIENDS GUMMIES MULTI GUMMIES</td>
                                        <td>21ST23</td>
                                        <td>10</td>
                                        <td>1</td>
                                        <td>+9</td>
                                    </tr>
                                    <tr>
                                        <td>21ST ZOO FRIENDS GUMMIES MULTI GUMMIES</td>
                                        <td>21ST23</td>
                                        <td>10</td>
                                        <td>1</td>
                                        <td>+9</td>
                                    </tr>
                                    <tr>
                                        <td>21ST ZOO FRIENDS GUMMIES MULTI GUMMIES</td>
                                        <td>21ST23</td>
                                        <td>10</td>
                                        <td>1</td>
                                        <td>+9</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="form-group mt-3">
                            <label for="">Notes</label>
                            <textarea name="" id="" class="form-control"></textarea>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</div>


<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->

<script>
    $('#stock-count-table').DataTable();
    $('#loss-report-table').DataTable();
    $('#gain-report-table').DataTable();

    $('#date-filter').on('change', function(e){
        if(e.target.value == 'custom'){
            $('#custom-date-range-container').removeClass('d-none')
        } else {
            $('#custom-date-range-container').addClass('d-none')
 
        }
    })

    mobiscroll.datepicker('#range', {
    controls: ['datetime'],
    select: 'range',
    startInput: '#start',
    endInput: '#end',
    touchUi: true
});
    
</script>
`;

export default function ElementElementInventoryDepartmentStockCount() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
