const rawHtml = `
<style>
	.lightblue 
	{
		background-color:#51aff124;
	}
</style>
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Order Service</span>
			</div>
			<!-- <ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#service_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#service_view" data-toggle="tab"> View </a>
				</li>
			</ul> -->
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				
				<div class="tab-pane active" id="service_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
						  <table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.TestName') != null ? Cake\Core\Configure::read('LAB_STRINGS.TestName') : 'Name' --></th>
										<th class="left"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' --></th>
										<th class="left">Old Price</th>
										<th class="left">New Price</th>
										<th class="left">Copay</th>
										<th class="left">Outsourced</th>
										<th class="left">Claim/Credit Pricing</th>
										<!-- <th class="left">Result</th> -->
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($labTests as $value): -->								
									<tr class="odd gradeX ">
										<td class="left"><a href="javascript:" data-toggle="modal" data-target="#viewItem_<!-- php: = $value->id -->"><!-- php: = $value->name --></a></td>
										<td class="left"><!-- php: = $value->investigation->name --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->value_old, 2) --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->value_new, 2) --></td>
										<td><!-- php: = $value->copay == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "" --></td>
										<td class="left"><!-- php: = $value->outsourced == 1 ? "<span class='badge bg-info'>Yes</span>" : "" --></td>
										<td class="left"><a href="javascript:" data-toggle="modal" data-target="#viewClaim_<!-- php: =$value->id -->" class="btn btn-xs">View</a></td>
										<!-- <td class="left">
											<a href="<!-- php: = $this->Url->build(['controller' => 'ManageLabs', 'action' => 'updateLabTemplate', $value->id]) -->" class="btn btn-xs">
												Template
											</a>
										</td> -->
										<td class="left">
											
									  <!-- php: = $value->enabled ? $this->Form->postLink(__('Disable'), ['controller'=>'ManageLabs','action'=>'toggleEnable',$value->id,0], ['class' => 'btn btn-secondary btn-xs']) : $this->Form->postLink(__('Enable'), ['controller'=>'ManageLabs','action'... -->
										
										
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageLabs','action'=>'deleteLabTest',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delete')... -->
										
											
										</td>
									</tr>
										
								<!-- php: $x++; endforeach; -->									
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


<script>
	function clearServiceFields(){
		$('#name').val('');
	}
</script>

`;

export default function ElementElementManagelabsOrderservice() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
