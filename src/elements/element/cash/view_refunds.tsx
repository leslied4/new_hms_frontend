const rawHtml = `
<style>
    .table-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .summary-info,
    .filter-section {
        margin-bottom: 10px;
        text-align: center;
    }

    /* Center the elements on small screens */
    @media (max-width: 576px) {
        .summary-info,
        .filter-section {
            margin-right: auto;
            margin-left: auto;
            max-width: 100%;
            flex: 0 0 100%;
        }
    }

    /* Make the table responsive */
    @media (max-width: 767px) {
        table {
            width: 100%;
            margin-bottom: 16px;
            overflow-x: auto;
            display: block;
        }

        th, td {
            white-space: nowrap;
        }
    }
</style>

<div class="table-responsive">
    <div class="table-header row">
        <!-- php: $totalRefunds = 0; $totalRefundedAmount = 0; $totalPending = 0; $totalApproved = 0; foreach ($refunds as $refund) { $totalRefunds += 1; $totalRefundedAmount += $refund['amount']; switch ($refund['status']) { case 1: $totalApproved += $refun... -->

        <div class="summary-info col-sm-2">
            <h4 class="font-weight-bold">Refunds: <!-- php: = $totalRefunds --></h4>
        </div>

        <div class="summary-info col-sm-2">
            <h4 class="font-weight-bold">Total Amount: <!-- php: = $totalRefundedAmount --></h4>
        </div>

        <div class="summary-info col-sm-2">
            <h4 class="font-weight-bold">Total Pending: <!-- php: = $totalPending --></h4>
        </div>

        <div class="summary-info col-sm-2">
            <h4 class="font-weight-bold">Total Approved: <!-- php: = $totalApproved --></h4>
        </div>

        <div class="filter-section col-sm-3">
            <SearchableSelectField id="statusFilter" class="selectpicker show-menu-arrow show-tick mt-2" data-size="5" data-live-search="true" data-placeholder="Select status">
                <option value="">Filter by status</option>
                <option value="">All</option>
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Settled</option>
            </SearchableSelectField>
        </div>

    </div>

    <table id="refundsTable" class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Invoice Number</th>
                <th>Invoice Amount</th>
                <th>Refund Mode</th>
                <th>Refund Amount</th>
                <th>Reason</th>
                <th>Voucher</th>
                <th>Requester</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- php: foreach ($refunds as $refund) { -->
                <tr>
                    <td><!-- php: = $refund['date_added'] --></td>
                    <td style="white-space: nowrap;">
                        <!-- php: = $refund['patient']['first_name'].' '.$refund['patient']['last_name'] -->
                        <span class="badge" style="background-color: #c8a2c8; color: #fff; padding: 5px; border-radius: 3px;">
                            <!-- php: = $refund['patient']['folder_number'] -->
                        </span>
                    </td>
                    <td>
                        <a target="_blank" href="<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'viewInvoice', $refund['invoice']['id']]) -->"> <i class="fa fa-eye"></i> <!-- php: = $refund['invoice']['invoice_number'] --></a>
                    </td>
                    <td><!-- php: = $configs['currency'] --> <!-- php: = $refund['invoice']['final_amount'] --></td>
                    <td><!-- php: = empty($refund['refund_vouchers']) ? 'Cash' : 'Voucher' --></td>
                    <td><!-- php: = $configs['currency'] --> <!-- php: = $refund['amount'] --></td>
                    <td><!-- php: = $refund['reason'] --></td>
                    <td><!-- php: = empty($refund['refund_vouchers']) ? '' : $refund['refund_vouchers'][0]['unique_code'] --></td>
                    <td><!-- php: = $refund['requested_by'] --></td>
                    <td>
                        <!-- php: switch ($refund['status']) { case 0: echo 'Pending'; break; case 1: echo 'Approved'; break; case 2: echo 'Settled'; break; default: echo 'Unknown Status'; break; } -->
                    </td>
                    <td>
                        <a data-toggle="modal" data-target="#viewRefundDetails_<!-- php: = $refund['id'] -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">View</a>
                        <!-- php: if ($this->request->getSession()->read()['Auth']['User']['id'] === $refund['refunds_approver']): -->
                            <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Cash', 'action' => 'approveOrDeclineRefund'], 'method' => 'post']) -->
                            <!-- php: if ($refund['status'] == 0): -->
                                <button class="btn btn-xs btn-success" type="submit" name="action" value="approve_<!-- php: = $refund['id'] -->">Approve</button>
                            <!-- php: elseif ($refund['status'] == 1): -->
                                <button class="btn btn-xs btn-danger" type="submit" name="action" value="disapprove_<!-- php: = $refund['id'] -->">Decline</button>
                                <button class="btn btn-xs btn-warning" type="submit" name="action" value="report_<!-- php: = $refund['id'] -->">Report</button>
                            <!-- php: elseif ($refund['status'] == 2): -->
                                <button class="btn btn-xs btn-secondary" type="button" disabled>Settled</button>
                                <!-- <a data-toggle="modal" data-target="#viewRefundDetails_</?= $refund['id'] ?>" href="javascript:" class="btn </?= Cake\Core\Configure::read('Classes.Delete') ?> btn-xs">Report Money Out</a> -->
                            <!-- php: endif; -->
                            <!-- php: = $this->Form->end() -->
                        <!-- php: else: -->
                            <button class="btn btn-xs btn-secondary" type="button" disabled>Unauthorised</button>
                        <!-- php: endif; -->
                    </td>  
                </tr>
                <div class="modal fade" id="viewRefundDetails_<!-- php: = $refund['id'] -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 1000px;">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h4 class="modal-title" id="editInvestigationDialogueTitle">Refund Details</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                        
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <div class="card card-box">
                                    <div class="card-head">
                                        <header>View Refund Items</header>
                                    </div>
                                    <div class="card-body" id="bar-parent">
                                        <div class="form-body">
                                            <div class="form-group row">
                                                <label class="control-label col-md-3"><b>Item</b></label>
                                                <label class="control-label col-md-3"><b>Refund Quantity</b></label>
                                                <label class="control-label col-md-3"><b>Unit Price</b></label>
                                                <label class="control-label col-md-3"><b>Refund Total</b></label>
                                                <!-- php: $x = 1; foreach ($refund['refund_items'] as $item): //echo $bed -->
                                                    <label class="control-label col-md-3"><!-- php: = $item->item_name --></label>
                                                    <label class="control-label col-md-3"><!-- php: = $item->refund_quantity --></label>
                                                    <label class="control-label col-md-3"><!-- php: = $configs['currency'] --> <!-- php: = $item->unit_cost --></label>
                                                    <label class="control-label col-md-3"><!-- php: = $configs['currency'] --> <!-- php: = $item->refund_total --></label>
                                                <!-- php: $x++; endforeach; -->		
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
            <!-- php: } -->
        </tbody>
    </table>
</div>
<!-- data tables -->
<!-- <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') --> -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->

<!-- <script>
    $("#refundsTable").DataTable();
</script> -->
<script>
    $(document).ready(function () {
        // Initialize DataTable with status filter
        var table = $("#refundsTable").DataTable({
            initComplete: function () {
                this.api().columns(9).every(function () { // Update the column index to 5 for the "Status" column
                    var column = this;
                    var select = $('<SearchableSelectField><option value="">All</option></SearchableSelectField>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>');
                    });
                });
            }
        });

        // Apply status filter
        $('#statusFilter').on('change', function () {
            var val = $(this).val();
            var statusText;

            switch (val) {
                case '0':
                    statusText = 'Pending';
                    break;
                case '1':
                    statusText = 'Approved';
                    break;
                case '2':
                    statusText = 'Settled';
                    break;
                default:
                    statusText = ''; 
                    break;
            }

            table.column(9).search(statusText).draw();
        });
    });
</script>

`;

export default function ElementElementCashViewRefunds() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
