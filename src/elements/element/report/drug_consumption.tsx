const rawHtml = `

				  <div class="table-scrollable">
					<table class="table table-hover table-striped order-column full-width">
						<thead>
							<tr>
								<th>Date Created</th>
								<th>Drug Name</th>
								<th>Batch #.</th>
								<th style="text-align: right">In</th>
								<th style="text-align: right">Out</th>
								<th style="text-align: right">Remainder</th>
								<th style="text-align: right">Revenue</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: foreach ($audits as $audit): -->
							<tr class="odd gradeX">
								<td><!-- php: = $audit->date_created->i18nFormat('Y-MM-dd hh:mm') --></td>
								<td><!-- php: = $audit->drug->name --></td>
								<td><!-- php: = $audit->has('drug_stock') ? $audit->drug_stock->batch_number : '' --></td>
								<td style="text-align: right"><!-- php: = $audit->in --></td>
								<td style="text-align: right"><!-- php: = $audit->out --></td>
								<td style="text-align: right"><!-- php: = $audit->balance --></td>
								<td style="text-align: right"><!-- php: = $this->Number->precision($audit->amount, 2) --></td>								
								<td><!-- php: = $audit->has('drug_stock') ? $audit->drug_stock->availability_status : '' --></td>
							</tr>
						<!-- php: endforeach; -->									
						</tbody>
						<tfoot>
							<tr style="text-align: right; font-weight: 700; border-top: 2px solid #bababa">
								<td colspan="3">
									Total:
								</td>
								<td>
									<!-- php: = $this->Number->precision($inTotal, 0) -->
								</td>
								<td>
									<!-- php: = $this->Number->precision($outTotal, 0) -->
								</td>
								<td>
									<!-- php: = $this->Number->precision($balanceTotal, 0) -->
								</td>
								<td>
									<!-- php: = $this->Number->precision($total, 2) -->
								</td>
								<td></td>
							</tr>
						</tfoot>
					</table>
					</div>
					
`;

export default function ElementElementReportDrugConsumption() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
