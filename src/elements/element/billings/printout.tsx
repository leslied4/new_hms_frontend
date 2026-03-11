const rawHtml = `
<!-- php: = $this->Form->create(null) -->
<div class="modal fade" id="printReceipt" role="dialog">
	<div class="modal-dialog modal-xs" style="width: 400px">
		<div class="modal-content">
			<div class="modal-body" id="paymentReceipt">
				<div style="text-align: center;">
					<!-- php: = $this->Html->image("../assets/img/logo4.png", ['class' => "login-img", 'style' => 'width: auto; height: 25px']) -->
					<br>
					<h4><!-- php: = $inst_name->institution --></h4>
				</div>

				<h4 align="center">Receipt</h4>
				
				<table class="table">
					<thead>
						<th>Item</th>
						<th style="text-align: right;">Price</th>
						<th style="text-align: right;">Qty</th>
						<th style="text-align: right;">Amount</th>
						</tr>
					</thead>

					<tbody id="invoice_body">
						<!-- php: foreach($paymentList as $item) { -->
							<tr>
								<td>Drug 1</td>
								<td style="text-align: right;">300.00</td>
								<td style="text-align: right;">1</td>
								<td style="text-align: right;">300.00</td>
							</tr>
							<tr>
								<td>Lab 1</td>
								<td style="text-align: right;">150.00</td>
								<td style="text-align: right;">3</td>
								<td style="text-align: right;">450.00</td>
							</tr>
							<tr>
								<td>Lab 2</td>
								<td style="text-align: right;">80.00</td>
								<td style="text-align: right;">2</td>
								<td style="text-align: right;">160.00</td>
							</tr>
						<!-- php: } -->
					</tbody>
						<tfoot>
							<tr>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
							<tr>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Payment Type</b></td>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><span id="payment_type_receipt">Cash</span></td>
							</tr>
							<tr>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Total</b></td>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="sub_total">910.00</span></td>
							</tr>
							<tr>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Discount</b></td>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="discount_total">0.00</span></td>
							</tr>
							<tr>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Final Total</b></td>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="main_total">910.00</span></td>
							</tr>
							<tr>
								<td colspan="4" style="text-align: right;">============================</td>
							</tr>
							<tr>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Amount Paid</b></td>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="invoice_amount_paid">1300.00</span></td>
							</tr>
							<tr>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Change</b></td>
								<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="invoice_change">0.00</span></td>
							</tr>
						</tfoot>
					</tbody>
				</table>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" style="float: right">Close</button>
				<button type="submit" class="btn btn-default" data-dismiss="modal" style="float: right; margin-right: 20px">Print</button>
			</div>
		</div>
	</div>
</div>
<!-- php: = $this->Form->end() -->
`;

export default function ElementElementBillingsPrintout() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
