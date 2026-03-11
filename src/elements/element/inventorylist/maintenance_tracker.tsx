const rawHtml = `
<div class="row">

    <div class="borderBox light bordered col-md-12">
       
        <div class="borderBox-body">
<div class="container-fluid px-2">
    <div class="row justify-content-center">
        <div class="container-fluid text-center p-3 mt-3 mb-2">
            <div class="card px-5 pt-4 mt-1 mb-3">
            <table id="maintenance-table" class="table">
                    <thead>
                        <th>Date Added</th>
                        <th>Model No. / Name</th>
                        <th>Qty and Cost</th>
                        <th>Maintenance Status</th>
                        <th>Work Order Status</th>
                        <th>Work Order Supervisor</th>
                        <th>Maintenance Cost</th>
                        <th>Actions</th>
                    <thead>
                    <tbody id="maintenance_table_body">
                       <!-- php: foreach($maintenances as $maintenance): -->
                        <tr>
                            <td><!-- php: = date_format(date_create($maintenance->start), "Y/m/d") --></td>
                            <td><!-- php: = isset($maintenance->equipment_management) ? $maintenance->equipment_management->name : '' --> <span class="badge badge-success"><!-- php: if(null !==($maintenance->equipment_management->risk_level) && $maintenance->equipment_management->risk_level == 0){ echo 'Custom'; } else{ echo ($maintenance->equipment_management->risk_level ?? '').' months'; } --></span> </td>
                            <td><!-- php: = $maintenance->equipment_management->cost ?? '' --> (<!-- php: = $maintenance->equipment_management->quantity ?? '' -->)</td>
                            <td><!-- php: = $maintenance->status --></td>
                            <td><span class="badge badge-warning" ><!-- php: = $maintenance->work_status --></span></td>
                            <td><!-- php: = $maintenance->supervisor --></td>
                            <td><!-- php: = $maintenance->amount --></td>
                            <td>
                                <!-- php: if($maintenance->work_order == 0){ -->
                                    <button onclick="startWork('<!-- php: = $maintenance->id -->', '<!-- php: = $maintenance->equipment_id -->', '<!-- php: =$maintenance->equipment_management->model ?? '' -->', '<!-- php: =$maintenance->equipment_management->risk_level ?? '' -->', '<!-- php: = $maintenance->start ?? '' -->' )" class="btn btn-xs btn-success">Start work order</button>
                                <!-- php: } else{ -->
                                    <button class="btn btn-xs btn-secondary">Work Order Started</button>
                                <!-- php: } -->
                                <button onclick="decommission(<!-- php: = $maintenance->equipment_id -->)" class="btn btn-xs btn-danger">Decommision</button>
                                <!-- php: if($maintenance->purchased == 0){ -->
                                <button onclick="purchaseRequest(<!-- php: = $maintenance->id -->, '<!-- php: = $maintenance->equipment_management->name ?? '' -->', <!-- php: = $maintenance->equipment_management->cost ?? '' -->, <!-- php: = $maintenance->equipment_management->quantity ?? '' --> )" class="btn btn btn-xs btn-info">Purchase Requisition</button>
                                <!-- php: } -->
                                <button class="btn text-primary btn-xs">Report</button>
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
<div class="modal fade" id="startWorkModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Start Work Order</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <form id="startWorkForm">
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            <h4 id="work_order_label" class="mb-3">Are you sure you want to start work order ?</h4>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="planned" id="planned_work"
                                    value="1" checked>
                                <label class="form-check-label" for="inlineRadio1">Planned</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="planned" id="unplanned_work"
                                    value="0">
                                <label class="form-check-label" for="inlineRadio2">Unplanned</label>
                            </div>
                            <h6 class="text-danger mt-3">The next planned schedule is <span id="work_order_start_date"></span></h6>
                            <div id="unplanned_form" class="container mt-2 pl-0 d-none">
                                 <div class="row">
                                    <div class="col-md-2">
                                        <label class="text-left" for="">Reason:</label>
                                    </div>
                                    <div class="col-md-8">
                                        <textarea name="reason" id="work_order_reason" rows="2" class="form-control w-100"></textarea>
                                    </div>
                                 </div>
                            </div>

                            <input type="hidden" name="equip_maintenance_id" id="equip_maintenance_id" />
                            <input type="hidden" name="equip_id" id="equipment_recurr_id">
                            <input type="hidden" name="model_no" id="equipment_model_id">
                            <input type="hidden" name="risk_level" id="equipment_risk_level">
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Yes
                                &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                </form>
                <button style="height:20px;width:auto;"
                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                    data-dismiss="modal" aria-label="Close">No&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                </button>
            </div>
        </div>
    </div>
</div></div></div>
<div class="modal fade" id="decommissionModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Decommission Maintenance Schedule</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <form id="decommissionForm">
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            <h4>Are you sure you want to decommision maintenance schedule ?</h4>
                            <input type="hidden" name="equip_id" id="decom_equip_id">
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Yes
                                &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                </form>
                <button style="height:20px;width:auto;"
                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                    data-dismiss="modal" aria-label="Close">No&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                </button>
            </div>
        </div>
    </div>
</div></div></div>
<div class="modal fade" id="viewMaintenanceModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Equipment Maintenance Information</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <form id="viewMaintenanceForm">
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            
                            <input type="hidden" name="equip_id" id="view_id">
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Yes
                                &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                </form>
                <button style="height:20px;width:auto;"
                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                    data-dismiss="modal" aria-label="Close">No&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                </button>
            </div>
        </div>
    </div>
</div></div></div>
<div class="modal fade" id="purchaseRequestModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Purchase Requisition by <!-- php: =$this->request->getSession()->read()['Auth']['User']['first_name'] . ' ' . $this->request->getSession()->read()['Auth']['User']['last_name']; --> - <!-- php: = $this->request->getSession()->read()['Auth']['User']['role']['name'] --> on <!-- php: = date('j F Y'); --></h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <form id="purchaseRequestForm">
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                        <!-- <h4 class="mt-4"></h4> -->
                            <input type="hidden" name="equip_id" id="pr_id">
                            <div class="container mt-5">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th style="width:30%">Item Name</th>
                                                <th>Unit Cost</th>
                                                <th>Quantity</th>
                                                <th>Indicative Price</th>
                                            </tr>
                                        </thead>
                                        <tbody id="item-body2">
                                        <tr>
                                            <td><input type="text" name="item_name[]" id="pr_item_name" class="form-control"></td>
                                            <td><input name="unit_cost[]" id="pr_unit_cost" type="number" class="form-control" readonly placeholder="Select Item" /></td>
                                            <td><input type="number" min="1" step="1" name="qty[]" id="pr_qty" class="form-control" placeholder="Enter Quantity"></td>
                                            <td><input name="amount[]" placeholder="Amount" readonly id="pr_amount" class="form-control"/>
                                                <input type="hidden" name="indicative_amount"  id="indicative_amt" class="form-control"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                               <div class="row mt-3">
                                <div class="col-md-6"></div>
                                <div class="col-md-6 text-right">
                                    <h4 id="pr_ttl">Total Indicative Price :</h4>
                                    <!-- <h4>Available Budget :</h4> -->
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Yes
                                &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                </form>
                <button style="height:20px;width:auto;"
                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                    data-dismiss="modal" aria-label="Close">No&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                </button>
            </div>
        </div>
    </div>
</div></div></div>
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>
    $('#maintenance-table').DataTable({
        buttons:['searchBuilder'],
        dom: 'QBfrtip', "ordering": false,
    });
    function startWork(id, equipment_id, model_no, risk_level, date){
        $("#startWorkModal").modal("show");
        $("#equip_maintenance_id").val(id);
        $("#equipment_recurr_id").val(equipment_id);
        $("#equipment_model_id").val(model_no);
        $("#equipment_risk_level").val(risk_level);
        $("#work_order_start_date").html(new Date(date).toLocaleDateString());
        //   console.log("i ran bro;");
   }
   function decommission(id){
        $("#decommissionModal").modal("show");
        $("#decom_equip_id").val(id);
        //   console.log("i ran bro;");
   }

   function purchaseRequest(id, item_name, cost, quantity){
        let ttl = Number(cost) * Number(quantity);

        $("#purchaseRequestModal").modal("show");
        $('#pr_id').val(id);
        $('#pr_item_name').val(item_name);
        $('#pr_unit_cost').val(cost);
        $('#pr_qty').val(quantity);
        $('#pr_amount').val(ttl);
        $('#indicative_amt').val(ttl);
        $('#pr_ttl').html('Total Indicative Price: '+ttl);
   }
    $("#pr_qty").on("change", function(){
    let cost = $('#pr_unit_cost').val();
    let qty = Number($(this).val());
    let ttl = cost * qty;
    $('#pr_amount').val(ttl);
    $('#indicative_amt').val(ttl);
    $('#pr_ttl').html('Total Indicative Price: '+ttl);
    });
    $("#startWorkForm").on("submit", function(e){
    e.preventDefault();

    $.ajax({
            url: '<!-- php: = $this->Url->build(['controller'=>'InventoryList', 'action'=>'startWork']); -->',
            type: 'POST',
            data: $(this).serialize(),
            cache: false, 
            beforeSend: function(){
            $("#startWorkButton").html("Loading...");
            },
            success: function(res){
            console.log(res);

            $("#startWorkModal").modal("hide");
            $("#maintenance_table_body").html(res.table_data);
            alertify.success(res.message);
            // location.reload();
            }
        });
    
    });
    $("#decommissionForm").on("submit", function(e){
     e.preventDefault();

      $.ajax({
            url: '<!-- php: = $this->Url->build(['controller'=>'InventoryList', 'action'=>'decommission']); -->',
            type: 'POST',
            data: $(this).serialize(),
            cache: false, 
            beforeSend: function(){
            $("#decomButton").html("Loading...");
            },
            success: function(res){
            console.log(res); 
            $("#decommissionModal").modal("hide");
            $("#maintenance_table_body").html(res.table_data);

        
            //  $("#equipment_table_body").html(res.table_data);
            alertify.success(res.message);
            // location.reload();
            }
        });
    
    });
    $("#purchaseRequestForm").on("submit", function(e){
      e.preventDefault();

      $.ajax({
            url: '<!-- php: = $this->Url->build(['controller'=>'RequestApproval', 'action'=>'addRequestApproval']); -->',
            type: 'POST',
            data: $(this).serialize(),
            cache: false, 
            beforeSend: function(){
            // $("#decomButton").html("Loading...");
            },
            success: function(res){
            //console.log(res); 
            $("#purchaseRequestModal").modal("hide");
            $("#maintenance_table_body").html(res.table_data);

        
            //  $("#equipment_table_body").html(res.table_data);
            alertify.success(res.message);
            // location.reload();
            }
        });
    
    });
    $("#unplanned_work").on("change", function(){
        if($(this).is(':checked')){
        $("#unplanned_form").removeClass("d-none");
        $("#work_order_label").text("Are you sure you want to start an unplanned work order ?");
        }
    });
    $("#planned_work").on("change", function(){
        if($(this).is(':checked')){
        $("#unplanned_form").addClass("d-none");
        $("#work_order_label").text("Are you sure you want to start a planned work order ?");
        }
    });
</script>
`;

export default function ElementElementInventorylistMaintenanceTracker() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
