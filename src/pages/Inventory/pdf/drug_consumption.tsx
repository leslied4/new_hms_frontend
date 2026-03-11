import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Inventory/pdf/drug_consumption.php';
const rawHtml = `
<style>
	table tr th,
	table tbody tr th {
		border-top: none; 
		border-bottom: 1px solid #ff1010;
		color: #ff1010;
	}
</style>

<div class="tab-pane active" id="drugChartReportTab">
	<div class="row">
		<div class="col-md-12" style="text-align: center;">
			<!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 40px', 'fullBase' => true]) -->
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="pull-left" style="float: left">
				<address>
					<p class="text-muted m-l-5">
						<!-- php: = $this->Text->autoParagraph($inst_name->address) -->
					</p>
				</address>
			</div>
			<div class="pull-right text-right">
				<address>
					<p class="text-muted m-l-30">
						Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email: <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 --> 
					</p>
				</address>
			</div>
		</div>
	</div>
	<hr style="height: 5px; margin-top: 2px; margin-down: 2px">
	<div style="clear: both"></div>
	
	<h4 class="font-bold" style="text-align: center;">Drug Stock Bin Chart</h4>

	<div class="table-responsive">
		<table class="table table-scrollable">
			<tr>
				<td colspan="8">Generic Name, Dosage Form, Strength: <strong><!-- php: = $drug->full_name --></strong></td>
			</tr>
			
			<tr>
				<td colspan="4" width="50%"></td>
				<td colspan="2">Quantity: <strong><!-- php: = $drug->total_quantity --></strong></td>
				<td colspan="2">Unit Cost Price: <strong><!-- php: = $drug->price --></strong></td>
			</tr>
			<tr>
				<td colspan="4" style="border-top: none;"></td>
				<td colspan="2">Date: <strong><!-- php: = $drug->date_created --></strong></td>
				<td colspan="2"></td>
				<!-- td colspan="2">Unit Selling Price: <strong><!-- php: // = $drug->price --></strong></td -->
			</tr>

		</table>

		<table class="table table-scrollable">

			<tbody>
				<tr>  
					<th style="border-top: none;">Date</th>
					<th style="border-top: none;">From / To</th>
					<th style="border-top: none;">In</th>
					<th style="border-top: none;">Out</th>
					<th style="border-top: none;">Balance</th>
					<th style="border-top: none;">Staff</th>
					<th style="border-top: none;">Remarks</th>
				</tr>

				<!-- php: foreach ($drug->drug_audits as $value) { -->
					<tr class="even_row">
						<td><!-- php: = $value->date_created->i18nFormat('Y-MM-dd') --></td>
						<td><!-- php: = $value->direction == 1 ? $value->source : ($value->destination == 'Patient' && $value->has('patient') ? 'Patient - ' . $value->patient->full_name : $value->destination) --></td>
						<td><!-- php: = $value->direction == 1 ? $value->quantity : '' --></td>
						<td><!-- php: = $value->direction == 1 ? '' : $value->quantity --></td>
						<td><!-- php: = $value->balance --></td>
						<td><!-- php: = $value->has('user') ? $value->user->full_name : '' --></td>
						<td><!-- php: = $value->remarks --></td>
					</tr>
				<!-- php: } -->

			</tbody>

		</table>
	</div>
	
	<div class="table-responsive" style="margin-top: 20px">
		<table class="table table-scrollable">
			<tbody>
				<tr>  
					<th colspan="4" style="border-top: none; border-bottom: 1px solid #ff1010; text-align: center">Average Monthly Consumption</th>
				</tr>
				<tr>  
					<th>Date</th>
					<th>Quantity</th>
					<th>Rate</th>
					<th>Remarks</th>
				</tr>
			</tbody>
		</table>
	</div>
</div>
`;

export default function InventoryPdfDrugConsumptionPage() {
  return (
    <PageShell title="Inventory/pdf/drug_consumption.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
