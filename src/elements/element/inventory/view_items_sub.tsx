const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase"><!-- php: = $elementTitle --></span>
			</div>
		</div>
		<div class="borderBox-body">
		
			<div class="tab-pane active" id="drugs_view">
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
						<table class="table table-hover full-width">
							<thead>
								<tr>
									<th class="left">Full Name</th>
									<th class="left">Code</th>
									<th class="left">Unit/Type</th>
									<!-- php: if (isset($showCategory) && $showCategory == true) { -->
										<th class="left">Category</th>									
									<!-- php: } -->
									<th style="text-align: right">Reorder</th>									
									<th style="text-align: right">Quantity</th>									
									<th style="text-align: right">Value</th>									
									<th class="left">Action</th>
								</tr>
							</thead>
							<tbody>
							<!-- php: $x = 1; foreach ($selectedItems as $value): -->
							
								<tr class="odd gradeX">
									<td class="left"><!-- php: = $value->full_name --></td>
									<td class="left"><!-- php: = $value->item_code --></td>
									<td class="left"><!-- php: = $value->has('item_type') ? $value->item_type->type_name : '' --></td>
									<!-- php: if (isset($showCategory) && $showCategory == true) { -->
										<td class="left"><!-- php: = $value->has('item_category') ? $value->item_category->name : '' --></td>
									<!-- php: } -->
									<td style="text-align: right"><!-- php: = $value->reorder_level --></td>
									<td style="text-align: right"><!-- php: = $value->total_quantity --></td>
									<td style="text-align: right"><!-- php: = $this->Number->precision($value->total_value, 2) --></td>
								
									<td class="left">
										<a type="button" href="javascript:" onclick="editItemModalSub('<!-- php: = $value->id -->')"
											class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs"
										>
											Edit
										</a>
										<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Inventory', 'action' => 'drugConsumption', $value->id]) -->" class="btn btn-xs <!-- php: = Cake\Core\Configure::read('Classes.Visit') -->" escape=false>
											Consumption
										</a>
										<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Inventory','action'=>'deleteDrug',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delete') . '... -->
									</td>
									
								</tr>

									
									
							<!-- php: $x++; endforeach; -->									
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

<script>
	function clearDrugFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>


<script>
	var searchPredictiveItemName_link = '<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'searchPredictiveItemName']) -->'
	$('#itemSearch<!-- php: = $defaultModel -->Box').autocomplete({
        source: function (request, response) {

            $.ajax({
                url: searchPredictiveItemName_link,
                data: { searchValue: request.term },
                // dataType: 'json',
                type: "GET",
                success: function (data) {
                    let itemNames = data.map(item => {
                        return {
                            label: \`\${item.full_name} \${item.name} (\${item.item_code})\`,
                            value: item.name,
                        }
                    })
                    response(itemNames);
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            event.preventDefault(); // Prevent the default behavior
            $('#itemSearch<!-- php: = $defaultModel -->Box').val(ui.item.value); // Set the input value to the full label

            console.log("Selected Item number:", ui.value);

        }
    });
</script>
`;

export default function ElementElementInventoryViewItemsSub() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
