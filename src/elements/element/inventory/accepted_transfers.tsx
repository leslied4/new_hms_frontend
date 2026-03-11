const rawHtml = `
<div class="card  card-box">
    <div class="card-head">
        <header>Accepted Transfers</header>
    </div>
    <div class="card-body ">
        <div class="row">
            <div class="borderBox light bordered col-md-12">
                <div class="borderBox-body">
                    <div class="tab-content">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <div class="d-flex align-items-start">
                                   
                                    <div style="border:none; box-shadow: none; background:transparent; color: #000"
                                        class="d-flex btn align-items-center pl-0">
                                        Select Department: <SearchableSelectField name="" id="accepted_department" class="form-control ml-3" onchange="filterAcceptedTransfer()">
                                            <option value="">All Departments</option>
                                            <!-- php: foreach ($departments as $key => $department): -->
                                                <option value="<!-- php: = $department->id -->"><!-- php: = $department->name --></option>
                                            <!-- php: endforeach -->
                                        </SearchableSelectField>
                                    </div>
                                </div><br/>
                            </div>
                        </div>
                        <div class="card  card-box">
                            <div class="card-head">
                                <header>View Transfers</header>
                            </div>
                            <div class="card-body ">
                                <div class="row">
                                    <div class="borderBox light bordered col-md-12">
                                        <div class="borderBox-body">

                                            <div class="row">
                                                <div class="col-md-2 pr-3">
                                                    <div class="form-group">
                                                        <label>Filter:</label>
                                                        <SearchableSelectField name="" id="date-filter2" class="form-control">
                                                            <option value="today">Today</option>
                                                            <option value="this-week">This Week</option>
                                                            <option value="this-month">This Month</option>
                                                            <option value="custom">Custom</option>
                                                        </SearchableSelectField>

                                                        <div class="d-none" id="custom-date-range-container2">

                                                            <label>
                                                                Start
                                                                <input id="start2" mbsc-input placeholder="Please select..." />
                                                            </label>
                                                            <label>
                                                                End
                                                                <input id="end2" mbsc-input placeholder="Please select..." />
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

                                                <div class="table-responsive">
                                                    <table id="view-accepted_transfer-table" class="table table-hover order-column full-width">
                                                        <thead>
                                                            <tr>
                                                                <th>Item Name/ID</th>
                                                                <th>Batch No. (Exp)</th>
                                                                <th>VSP Name</th>
                                                                <th>Source</th>
                                                                <th>Destination</th>
                                                                <th>Transferred Quantity</th>
                                                                <th>Total Cost Price</th>
                                                                <th>Total Selling Price</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                            
                                                        </thead>
                                                        <tbody>

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
    </div>
</div>


<div class="modal fade" id="transfer_modal" tabindex="-1" aria-labelledby="transfer_modal" aria-hidden="true"
    aria-hidden="true">
    <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Transfer 1 GANG SWITCHED SOCKET (PHMED2) to Outlet(s)</h4>
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
                                <input type="text" class="form-control">
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="form-group">
                                    <div>Remaining Quantity <small class="text-danger">*</small></div>
                                    <input type="text" class="form-control">
                                </div>

                                <div class="form-group">
                                    <div>Pricing Unit <small class="text-danger">*</small></div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <h6 class="font-weight-bold text-center">Select Department to Transfer</h6>
                            <div class="card p-3">
                                <div class="d-flex align-items-center">
                                    <!-- php: = $this->Html->image('../assets/img/circle-check.png',['class' =>'', 'style'=> 'height:50px;width:auto']) -->
                                    <h4 class="my-0 ml-2">Department1</h4>
                                </div>
                                <div class="d-flex align-items-center mt-4">
                                    <!-- php: = $this->Html->image('../assets/img/circle-check.png',['class' =>'', 'style'=> 'height:50px;width:auto']) -->
                                    <h4 class="my-0 ml-2">Department1</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            Available Quantity at <b>Department1</b> <small class="text-danger">*</small>
                            <div class="d-flex justify-content-between w-100">
                                <div class="form-group col-md-6 p-0 pr-1">
                                    <input type="text" style="height:35px" class="form-control w-100">
                                </div>
                                <div class="form-group col-md-6 p-0 pl-1">
                                    <SearchableSelectField name="" id="" style="height:35px" class="form-control w-100">
                                        <option value="">fdsfs</option>
                                    </SearchableSelectField>
                                </div>
                            </div>

                            Transfer Quantity to <b>Department1</b> <small class="text-danger">*</small>
                            <div class="d-flex justify-content-between w-100">
                                <div class="form-group col-md-6 p-0 pr-1">
                                    <input type="text" style="height:35px" class="form-control w-100">
                                </div>
                                <div class="form-group col-md-6 p-0 pl-1">
                                    <SearchableSelectField name="" id="" style="height:35px" class="form-control w-100">
                                        <option value="">fdsfs</option>
                                    </SearchableSelectField>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
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

    function filterAcceptedTransfer() {
        getAllAcceptedTransfers($('#accepted_department').val())
    }

    function getAllAcceptedTransfers(department_id) {
        table = $('#view-accepted_transfer-table').DataTable();
        table.destroy();
        $('#view-accepted_transfer-table').DataTable({
            "ordering": false,
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'filterTransfers',2,]) -->/"+department_id,
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.item_store?.item?.full_name}<br/> <small class="text-secondary">\${ row?.item_store?.item?.item_code || ''}</small>\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.item_store?.batch_number }<br/> <small class="text-primary">(\${ new Date(row?.item_store?.expiry_date).toDateString() })</small>\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.item_store?.supplier?.name}\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`Stock\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.department?.name}\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`<span class="text-primary">\${ row?.transfer_quantity }</span>\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.transfer_quantity * row?.item_store?.unit_cost_price }\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.transfer_quantity * row?.item_store?.unit_selling_price } <b>(\${ ((row?.item_store?.unit_selling_price - row?.item_store?.unit_cost_price) / row?.item_store?.unit_cost_price ) * 100 }%)\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.transfer_quantity * row?.item_store?.unit_selling_price } <b>(\${ ((row?.item_store?.unit_selling_price - row?.item_store?.unit_cost_price) / row?.item_store?.unit_cost_price ) * 100 }%)\`
                    }
                },

            ]
        });
    }
    $(document).ready(function() {  
        getAllAcceptedTransfers('')
    })
</script>
`;

export default function ElementElementInventoryAcceptedTransfers() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
