const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase"><!-- php: = $elementTitle --></span>
			</div>
		</div>
		<div class="borderBox-body">
			<div class="card  card-box">
				<div class="card-body ">
				
					<div class="row">
						<div class="col-md-6">
							<span class="label label-md label-danger">
								<strong><!-- php: = $this->Paginator->counter(__('Total Records: {{count}}'), [ 'format' => __('Total Records: {{count}}'), 'model' => $defaultModel ]) --></strong>
							</span>
							- 
							<span>
								<!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}'), [ 'format' => __('Page {{page}} of {{pages}}'), 'model' => $defaultModel ]) -->
							</span>
						</div>
						<div class="col-md-6">
							<!-- php: = $this->Form->create(null, ['type' => 'get']); -->
							<div class="input-group" style="max-width: 250px; float: right;">
								<input type="text" class="form-control" name="searchValue<!-- php: = $defaultModel -->" type="text" id="itemSearch<!-- php: = $defaultModel -->Box" placeholder="Search" value="" />
								<span class="input-group-btn">
									<button type="submit" class="btn btn-info btn-flat">Go!</button>
								</span>
							</div>

							<!-- php: = $this->Form->end() -->
						</div>
					</div>

					<div class="table-scrollable">
					<table class="table table-hover order-column full-width">
						<thead>
							<tr>
								<th class="left">Date Transferred</th>
								<th class="left">Item</th>
								<th class="left">Batch Number</th>
								<th class="left">Quantity</th>
								<th class="left">From</th>
								<th class="left">To</th>
								<th class="left">User</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: if (isset($transferList) && $transferList != null) { foreach ($transferList as $value): -->
							<tr class="odd gradeX">
								<td class="left"><!-- php: = $value->date_added --></td>
								<td class="left"><!-- php: = $value->has('item') ? $value->item->name : '' --></td>
								<td class="left"><!-- php: = $value->has('from_item_store') ? $value->from_item_store->batch_number : '' --></td>
								<td class="left"><!-- php: = $value->quantity --></td>
								<td class="left"><!-- php: = $value->from --></td>
								<td class="left"><!-- php: = $value->to --></td>
								<td class="left"><!-- php: = $value->has('user') ? $value->user->full_name : '' --></td>
							</tr>
						<!-- php: endforeach; } -->									
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
`;

export default function ElementElementInventoryTransfers() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
