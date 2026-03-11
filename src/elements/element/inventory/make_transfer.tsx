const rawHtml = `
<div class="card  card-box">
    <div class="card-head">
        <header>Transfer Mode: <span class="text-primary">Warehouse</span></header>
    </div>
    <div class="card-body ">
        <div class="row">
            <div class="borderBox light bordered col-md-12">
                <div class="borderBox-body">
                    <div class="tab-content">
                        <div class="d-none align-items-center">
                            <div class="col-md-4 pl-0">
                                <div class="d-flex align-items-center">
                                    <!-- php: = $this->Html->image('../assets/img/clipboard.png',['class' =>'', 'style'=> 'height:80px;width:auto']) -->
                                    <div class="ml-3">
                                        <h6 style="font-size:14px!important" class="text-secondary my-0">No. Of
                                            Transfers</h6>
                                        <p style="font-size:20px!important" class="font-weight-bold my-0 mt-2">6</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 pl-0">
                                <div class="d-flex align-items-center">
                                    <!-- php: = $this->Html->image('../assets/img/cash.png',['class' =>'', 'style'=> 'height:80px;width:auto']) -->
                                    <div class="ml-3">
                                        <h6 style="font-size:14px!important" class="text-secondary my-0">Total Cost</h6>
                                        <p style="font-size:20px!important" class="font-weight-bold my-0 mt-2">1300</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 pl-0">
                                <div class="d-flex align-items-center">
                                    <!-- php: = $this->Html->image('../assets/img/cash.png',['class' =>'', 'style'=> 'height:80px;width:auto']) -->
                                    <div class="ml-3">
                                        <h6 style="font-size:14px!important" class="text-secondary my-0">Total Selling
                                            Price</h6>
                                        <p style="font-size:20px!important" class="font-weight-bold my-0 mt-2">2429.90
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-5 d-none">
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
                                        <div id="range"></div>
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
                        <div class="col-md-6">
                            <span class="label label-md label-danger">
								<strong><!-- php: = $this->Paginator->counter(__('Total Records: {{count}}'), [ 'format' => __('Total Records: {{count}}'), 'model' => $defaultModel ]) --></strong>
							</span>
							- 
							<span>
								<!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}'), [ 'format' => __('Page {{page}} of {{pages}}'), 'model' => $defaultModel ]) -->
							</span>
                        </div>
                        <div class="table-responsive">
                            <table id="" class="table table-hover full-width" style="width: 100%">
                                <thead>
                                    <tr>
                                        <th>Item Name/ID</th>
                                        <th>Batch No. (Exp)</th>
                                        <th>VSP Name</th>
                                        <th>Purchase Quantity</th>
                                        <th>Transferred Quantity</th>
                                        <th>Balance (<!-- php: = $configs['currency'] -->)</th>
                                        <th>Total Cost Price (<!-- php: = $configs['currency'] -->)</th>
                                        <th>Total Selling Price (<!-- php: = $configs['currency'] -->)</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    <!-- php: foreach ($current_stocks as $stock): -->
                                        <!-- php: $transferredQuantity = 0; if (isset($stock['item']['stock_transfers']) && !empty($stock['item']['stock_transfers'])) { foreach ($stock['item']['stock_transfers'] as $transfer) { $transferredQuantity += $transfer['quantity']; } } -->
                                        <tr>
                                            <td><!-- php: = h($stock['item']['full_name']); --><br />
                                                <small class="text-secondary">(<!-- php: = h($stock['item']['item_code']); -->)</small>
                                            </td>
                                            <td><!-- php: = h($stock['batch_number']); --><br />
                                                <small class="text-primary">(<!-- php: = date('m/d/Y', strtotime($stock['expiry_date'])); -->)</small>
                                            </td>
                                            <td><span class="text-primary"><!-- php: = isset($stock['supplier']['name']) ? h($stock['supplier']['name']) : ''; --></span></td>
                                            <td><span class="text-primary"><!-- php: = h($stock['quantity']); --></span></td>
                                            <td><!-- php: = h($stock['quantity_transfered']); --></td>
                                            <td><!-- php: = h($stock['quantity'] - $stock['quantity_sold'] - $stock['quantity_transfered']); --></td>
                                            <td><!-- php: = h($stock['unit_cost_price'] * $stock['quantity']); --></td>
                                            <td><!-- php: = h($stock['unit_selling_price'] * $stock['quantity']); --></td>
                                            <td>
                                                <button data-toggle="modal" data-target="#transfer_modal_<!-- php: = $stock['id'] -->" class="btn btn-danger btn-xs">Transfer</button>
                                            </td>
                                        </tr>
                                    <!-- php: endforeach; -->
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
							<div class="col-md-6">
                                <!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total'),[ 'format' => __('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total'), 'model' => $defaultMode... -->
							</div>
							
							<div class="col-md-6">
								<div class="dataTables_paginate paging_simple_numbers" style="float: right;">
									<ul class="pagination">
										<!-- php: = $this->Paginator->prev(__('previous'), ['model' => $defaultModel]) -->
										<!-- php: = $this->Paginator->numbers(['model' => $defaultModel]) -->
										<!-- php: = $this->Paginator->next(__('next'), ['model' => $defaultModel]) -->
									</ul>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- php: foreach ($current_stocks as $stock): -->
<div class="modal fade" id="transfer_modal_<!-- php: = $stock['id'] -->" tabindex="-1" aria-labelledby="transfer_modal" aria-hidden="true" aria-hidden="true">
    <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Transfer <!-- php: = h($stock['item']['full_name']); --></h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <!-- php: //= $this->Form->create($shift, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'addShift']]); -->
                <div class="container-fluid py-3 bg-white">
                        <div class="d-flex justify-content-between">
                            <div class="col-md-6 px-0">
                                <div class="form-group">
                                    Batch No <small class="text-danger">*</small>
                                    <input type="text" class="form-control" value="<!-- php: = $stock['batch_number'] -->">
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="form-group">
                                        <div>Remaining Quantity <small class="text-danger">*</small></div>
                                        <input type="text" class="form-control" value="<!-- php: = h($stock['quantity'] - $stock['quantity_sold']); -->">
                                    </div>
                                    
                                    <div class="form-group">
                                        <div>Pricing Unit <small class="text-danger">*</small></div>
                                        <input type="text" class="form-control" value="<!-- php: = isset($stock['item']['item_type']['type_name']) ? htmlspecialchars($stock['item']['item_type']['type_name']) : '' -->">
                                    </div>
                                </div>
                        <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Inventory', 'action' => 'addTransfer', $stock->id]]); -->

                                <h6 class="font-weight-bold text-center">Select Department(s) to Transfer</h6>
                                <div class="card p-3">

                                    <SearchableSelectField name="department_id" id="department_select_<!-- php: = $stock['id'] -->" class="form-control selectpicker" onchange="updateDepartmentFields('<!-- php: = $stock['id'] -->')">
                                        <option value="">Select Department</option>
                                        <!-- php: foreach ($departments as $key => $department): -->
                                            <option value="<!-- php: = $department->id -->" data-department-name="<!-- php: = $department->name -->"><!-- php: = $department->name --></option>
                                        <!-- php: endforeach; -->
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="col-md-5">

                               <!-- Available Quantity at <b>Department1</b> <small class="text-danger">*</small> -->
                                <div class="d-flex justify-content-between w-100" id="dep-avail-quantities_<!-- php: = $stock['id'] -->">
                                    
                                </div>

                                Available Quantity at <span id="department_name_<!-- php: = $stock->id -->"></span> <small class="text-danger">*</small>
                                <div class="d-flex justify-content-between w-100">
                                    <div class="form-group col-md-12 p-0 pr-1">
                                        <input type="text" disabled id="available_quantity_<!-- php: = $stock->id -->" style="height:35px" class="form-control w-100">
                                    </div>

                                </div>
                               Transfer Quantity to <span id="department_name_1<!-- php: = $stock->id -->"></span> <small class="text-danger">*</small>
                                <div class="d-flex justify-content-between w-100">
                                    <div class="form-group col-md-12 p-0 pr-1">
                                        <input type="text" name="quantity" style="height:35px" class="form-control w-100">
                                        <input type="hidden" name="item_store_id" value="<!-- php: = $stock->id -->">
                                    </div>

                                </div>

                                <div class="form-group">
                                    Unit Cost Price<small class="text-danger">*</small>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    Unit Selling Price<small class="text-danger">*</small>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    Total Selling Price<small class="text-danger">*</small>
                                    <input type="text" class="form-control">
                                </div>

                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <button class="btn btn-danger">Cancel</button>
                                    <button class="btn btn-primary">Add for Transfer</button>
                                </div>
                            <!-- php: = $this->Form->end(); -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- php: endforeach; -->

<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->

<script>
    $('#make-transfer-table').DataTable();

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
<script>
    function updateDepartmentFields(id) {

        var departmentId = $('#department_select_'+id).val();
        var departmentName = $('#department_select_'+id).find(":selected").text();

        displayDepartmentFields(departmentId, departmentName, id);
    }
    function displayDepartmentFields(departmentId, departmentName, id) 
    {

        $('#available_quantity_'+id).val(10);
        $('#department_name_'+id).html(departmentName);
        $('#department_name_1'+id).html(departmentName);
    }

</script>


`;

export default function ElementElementInventoryMakeTransfer() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
