const rawHtml = `
<div class="tab-pane" id="view_po_access">
    <div class="card mt-3  card-box">
        <div class="card-body ">
            <div class="table-responsive mt-2">
                <table id="po_table"
                    class="table table-hover customDatable full-width po_table">
                    <thead>
                        <tr>
                            <th>PO Date</th>
                            <th>P0 Name/Number</th>
                            <th>Items Number</th>
                            <th>Indicative Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    <!-- php: foreach($purchaseOrders as $order): -->
                        <tr>
                            <td><!-- php: = $order->date -->
                            </td>
                            <td><!-- php: = $order->name --></td>
                            <td><!-- php: = $order->total_number --></td>
                            <td><!-- php: = $configs['currency'] --> <!-- php: = $order->amount --></td>
                            <td>
                                <a href="javascript:" data-toggle="modal" data-target="#view_po_items<!-- php: =$order->id -->" class="btn btn-sm btn-primary">Order Items</a>
                            </td>
                        </tr>
                    <!-- php: endforeach; -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- php: foreach($purchaseOrders as $order): -->
        <div class="modal fade" id="view_po_items<!-- php: = $order->id -->" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="text-slate-900 my-0">Order Items for #<!-- php: = $order->name -->
                                </h4>
                                <div>
                                    <button data-dismiss="modal" aria-label="Close"
                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                            class="fa fa-times text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="container bg-white p-2">
                            <div class="container-fluid">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr style="line-height: 12px">
                                                <th class="left"
                                                    style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                    Item Name</th>
                                                <th class="left"
                                                    style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                    Unit Cost</th>
                                                <th class="left"
                                                    style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                    Quantity</th>
                                                <th class="left"
                                                    style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                    Indicative Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- php: $ttl = 0; $inventoryTotal = 0; $vspCatalogueTotal = 0; $nonCatalogueTotal = 0; foreach($order->vsp_purchase_order_items as $item){ $amount = $item->total_amount; $type = $item->type; switch($type) { case 1: // inventory Item $inventoryTotal... -->   
                                            <tr>
                                                <td>
                                                    <!-- php: = $item->type == 2 ? $item->item_name : ($item->type == 3 ? $item->item->full_name : ($item->type == 1 ? $item->vsp_procurement_item->name : ' ')); -->
                                                </td>
                                                <td><!-- php: = $configs['currency'] --> <!-- php: = $item->total_amount --></td>
                                                <td><!-- php: = $item->qty --></td>
                                                <td><!-- php: = $configs['currency'] --> <!-- php: = $item->total_amount --></td>
                                            </tr>
                                            <!-- php: $ttl = $ttl + $item->total_amount; } -->
                                            <tr style="line-height: 12px">
                                                <th class="left" style="border:none"></th>
                                                <th class="left" style="border:none"></th>
                                                <th class="left" style="border:none"></th>
                                                <th class="left" style="border:none">Inventory Items: <!-- php: = $configs['currency'] --> <!-- php: = $inventoryTotal --></th>
                                            </tr>
                                            <tr style="line-height: 12px">
                                                <th class="left" style="border:none"></th>
                                                <th class="left" style="border:none"></th>
                                                <th class="left" style="border:none"></th>
                                                <th class="left" style="border:none">VSP Catalogue Items: <!-- php: = $configs['currency'] --> <!-- php: = $vspCatalogueTotal --></th>
                                            </tr>
                                            <tr style="line-height: 12px">
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style="border:none">Non-Catalogue Items: <!-- php: = $configs['currency'] --> <!-- php: = $nonCatalogueTotal --></th>
                                            </tr>
                                            <tr style="line-height: 12px">
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style="border-top: 2px solid #ef6575;border-bottom: 2px solid #ef6575;"> Total Indicative Price: <!-- php: = $configs['currency'] --> <!-- php: = $ttl --></th>
                                            </tr>
                                            </tr>
                                            <tr style="line-height: 12px">
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style=" border:none"></th>
                                                <th class="left" style=" border:none"></th>
                                                <th class="left p-0" style=" border:none">
                                                    <div
                                                        class="container-fluid d-none p-5 mt-3">

                                                    </div>
                                                </th>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center py-1 justify-content-end">
                                <button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- php: endforeach; -->
</div>
<script>            
    $('#po_table').DataTable();
</script>
`;

export default function ElementElementRequestApprovalPurchaseOrders() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
