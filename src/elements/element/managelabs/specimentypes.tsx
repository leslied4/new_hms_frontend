const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Sample Types</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#specimentypes_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#specimentypes_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="specimentypes_add">
					<h4>Add a new Sample Type</h4>
					<!-- php: = $this->Form->create($specimenType, ['url' => ['controller' => 'ManageLabs', 'action' => 'addSpecimenType']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<input type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" /> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Container Type
								
							</label>
							<div class="col-md-5">
								<SearchableSelectField name="container_type" id="container_type_id" onchange="changeContainerType('container_type_id', 'color', 'container_type_other')"  class="form-control">
									<option value=""></option>
									<option value="ETDA Tube">ETDA Tube</option>
									<option value="Serum Separator Tube">Serum Separator Tube</option>
									<option value="Heparin Tube">Heparin Tube</option>
									<option value="Salive Kit">Saliva Kit</option>
									<option value="FFPE Block">FFPE Block</option>
									<option value="Viral Transport Medium">Viral Transport Medium</option>
									<option value="Other">Other</option>
								</SearchableSelectField>
								<input type="text" name="container_type_other"  id="container_type_other" data-required="0" placeholder="Enter Other Container Type" class="form-control input-height" style="display:none" /> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Color
								
							</label>
							<div class="col-md-5">
								<input type="color" name="color" id="color" data-required="0" placeholder="" class="form-control input-height" /> 
							</div>
						</div>
						<div class="form-group row">
							<label for="" class="control-label col-md-4">Related Lab Tests
								<span class="required">*</span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField name="lab_tests[]" data-required="0" class="form-control selectpicker" title="Select Compatibility Tests" data-live-search="true" id="related_lab_tests" data-style="bg-white" multiple></SearchableSelectField> 
									
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearSpecimenTypeFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="specimentypes_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Name</th>
										<th class="left">Description</th>
										<th class="left">Color</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($specimenTypes as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
										<td class="left"><!-- php: =$value->name --></td>
										<td class="left"><!-- php: =$value->description --></td>
										<td class="left"><!-- php: =$value->color --></td>
										<td class="left">

											<button onclick="editSpecimenType('<!-- php: = $value->id -->')" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</button>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageLabs','action'=>'deleteSpecimenType',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Del... -->
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

<div class="modal fade" id="labRequestResultDialog" role="dialog">
	<div class="modal-dialog modal-lg d-flex justify-content-center" style="">
		<div class="modal-content">
			<div class="modal-body lab_request_result" id="patientBill">
			</div>
		</div>
	</div>
</div>

<script>
	function clearSpecimenTypeFields(){
		$('#name').val('');
		$('#description').val('');
	}

	function changeContainerType(id, color, other) {
		value = $('#'+id).val() 
		value == 'Other' ? $('#'+other).show() : $('#container_type_other').hide()		

		const color_mappings = {
			'ETDA Tube': '#800080',
			'Serum Separator Tube': '#FFFF00',
			'Heparin Tube': '#008000',
			'Salive Kit': '#008000',
			'FFPE Block': '#008000',
			'Viral Transport Medium': '#FF0000'
		}

		$('#'+color).val(color_mappings[value])
	}

	function getLabTests() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'ManageLabs', 'action' => 'getCompatibilityLabTests',]) -->"
		}).done((data) => {
			let result = []
			if (Array.isArray(data) && data && data.length > 0 ) {
				data?.forEach((element, index) => {
					result.push(\`
						<option value="\${element.id}"> \${element.name}</option>
					\`)
				});
			}
			$('#related_lab_tests').append(result.join(""));
			$('#related_lab_tests').selectpicker("refresh");
		}).fail((data) => {
			console.log("Getting Labs failed")
			console.log(data)
		})
	}
	$(document).ready(function () {
		getLabTests()
	})

	const specimen_link = "<!-- php: = $this->Url->build(['controller' => 'ManageLabs', 'action' => 'editSpecimenTypeModal']) -->"
	function editSpecimenType(id) {
		$('.modal-body.lab_request_result').load(
			specimen_link + \`/\${id}\`,
			function () {
				$('#labRequestResultDialog').modal({
					show: true
				});
			});
	}
</script>

`;

export default function ElementElementManagelabsSpecimentypes() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
