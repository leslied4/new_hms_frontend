const rawHtml = `
<div class="modal fade" id="patientBillDialog" role="dialog">
    <div class="modal-dialog modal-xs" style="width: 400px">
        <div class="modal-content">
            <div class="modal-body" id="patientBill">
                <div style="text-align: center;">
                    <!-- php: = $this->Html->image('../assets/img/logo.jpg', ['style' => 'width: 50px; height: auto;']) -->
                    <br/>
                    <h4><!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h4>
                </div>
                <!-- Text input-->
                <h4 style="text-align: center;">Billing Summary</h4>
                <hr/>
                <table>
                    <tr><th style="text-align: left;">Patient:</th><td><!-- php: = $invoice->patient_visit->patient->full_name --></td></tr>
                    <tr><th style="text-align: left;">Visit: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><td><!-- php: = $invoice->patient_visit->date_created->i18nFormat('dd, MMM Y'); --></td></tr>
                    <tr><th style="text-align: left;">Type: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><td><!-- php: = $invoice->patient_visit->has('patient_visit_purpose') ? $invoice->patient_visit->patient_visit_purpose->name : ($invoice->patient_visit->walk_in == 1 ? 'Walk-In' : '') --></td></tr>
                </table>
                <hr/>
                <div class="">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="text-align: left;">Item</th>
                                <th style="text-align: right;">Price</th>
                                <th style="text-align: right;">Qty</th>
                                <th style="text-align: right;">Amount</th>
                            </tr>
                        </thead>
                        <tbody id="patient_bill_body">
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>------</td>
                                <td>------</td>
                                <td>------</td>
                                <td>------</td>
                            </tr>
                            <!-- php: $receiptTotal = 0; $receiptDiscount = 0; $receiptFinalTotal = 0; $invoiceItemList = $invoice->patient_invoice_items; foreach($invoiceItemList as $invoiceItem) { if($invoiceItem->status_id == 27 || $invoiceItem->status_id == 24) { continue; ... -->
                                <tr>
                                    <th style="text-align: left;"><!-- php: = $invoiceItem->item_name --></th>
                                    <th><!-- php: = $this->Number->precision($invoiceItem->unit_cost, 2) --></th>
                                    <th><!-- php: = $invoiceItem->quantity --></th>
                                    <th><!-- php: = $this->Number->precision($invoiceItem->final_amount, 2) --></th>
                                </tr>
                            <!-- php: } -->
                            <!-- php: $receiptFinalTotal = $receiptTotal - $receiptDiscount; -->
                            <tr>
                                <td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Total</b></td>
                                <td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="sub_total"><!-- php: = $this->Number->precision($receiptFinalTotal, 2) --></span></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <p style="text-align: center; margin-top: 20px;">
                    Summary for the patient bill<br/>
                    <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --><br/>
                </p>
                <p style="text-align: center;"><!-- php: = date("d/m/Y H:i:s") --></p>
            </div>

            <div class="modal-footer">
                <p style="text-align: center;">
                    <button onclick="javascript:printPOSDiv('patientBill')" class="btn btn-sm btn-<!-- php: = $theme2 --> btn-outline no-print" type="button"> <span><i class="fa fa-print"></i> Print Bill</span> </button>
                </p>
            </div>
        </div>
    </div>
</div>

<script>
	function printPOSDiv(divName) {
		var printContents = document.getElementById(divName).innerHTML;

		var printwindow = window.open('', 'PRINT', 'height=400,width=700');

		printwindow.document.write('<html><head><title>' + document.title  + '</title>' + '</head><body >');
	    printwindow.document.write(printContents);
		printwindow.document.write('</body></html>');

		printwindow.document.close(); // necessary for IE >= 10
		printwindow.focus(); // necessary for IE >= 10*/

		printwindow.print();
		printwindow.close();

	    return true;
	}
</script>
`;

export default function ElementElementPatientvisitDialogsPatientBill() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
