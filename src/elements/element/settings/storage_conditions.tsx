const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Storage Conditions</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#storage_conditions_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#storage_conditions_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="storage_conditions_add">
					<h4>Add a new Storage Condition</h4>
					<!-- php: = $this->Form->create(null, ['type' => 'file', 'url' => ['controller' => 'Settings', 'action' => 'addStorageConditions']]); -->
					<div class="form-group row">
						<label class="control-label col-md-4">Code
							<span class="required"> * </span>
						</label>
						<div class="col-md-5">
							<!-- <SearchableSelectField data-live-search="true" class="form-control selectpicker" name="specialty_id" id="specialty_id">

							</SearchableSelectField> -->
							<input type="text" name="code" id="temp_min" placeholder="Code" class="form-control" required />
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-4">Condition Name
							<span class="required"> * </span>
						</label>
						<div class="col-md-5">
							<input type="text" name="condition_name" data-required="1" placeholder="Enter name" class="form-control input-height" required />

						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-4">Temperature Range
							<span class="required"> * </span>
						</label>
						<div class="col-md-5 d-flex align-items-center">
							<div class="input-group" style="width:100%">
								<input type="number" step="0.1" name="temperature_min" id="temp_min" placeholder="Min" class="form-control" required />
								<span class="input-group-text" style="display:flex;align-items:center;justify-content:center">to</span>
								<input type="number" step="0.1" name="temperature_max" id="temp_max" placeholder="Max" class="form-control" required />
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-4">Humidity
							<span class="required"> * </span>
						</label>
						<div class="col-md-5 d-flex align-items-center">
							<div class="input-group" style="width:100%">
								<input type="number" step="0.1" name="humidity_min" id="humidity_min" placeholder="Min%" class="form-control" required />
								<span class="input-group-text" style="display:flex;align-items:center;justify-content:center">to</span>
								<input type="number" step="0.1" name="humidity_max" id="humidity_max" placeholder="Max%" class="form-control" required />
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-4">Light Sensitivity
							<span class="required"> * </span>
						</label>
						<div class="col-md-5 d-flex align-items-center">
							<div class="input-group" style="width:100%">
								<SearchableSelectField name="light_sensitivity" id="light_sensitivity" class="form-control" style="width:100px;">
									<option value="Normal">Normal</option>
									<option value="Protect From Light">Protect From Light</option>
									<option value="Dark Storage Only">Dark Storage Only</option>
								</SearchableSelectField>

							</div>
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-4">Ventilation
							<span class="required"> * </span>
						</label>
						<div class="col-md-5 d-flex align-items-center">
							<div class="input-group" style="width:100%">
								<Textarea class="form-control" name="ventilation" row="1"></Textarea>

							</div>
						</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-md-4">Remarks
							<span class="required"> * </span>
						</label>
						<div class="col-md-5 d-flex align-items-center">
							<div class="input-group" style="width:100%">
								<Textarea class="form-control" name="remarks" row="3"></Textarea>

							</div>
						</div>
					</div>


					<div class="row">
						<div class="offset-md-4 col-md-8">
							<button type="submit" class="btn btn-info">Submit</button>
							<button type="button" class="btn btn-default" onclick='clearHealthFacilityFields()'>Reset</button>
						</div>
					</div>
					<!-- php: = $this->Form->end(); -->

				</div>
				<div class="tab-pane active" id="storage_conditions_view">
					<div class="card  card-box">
						<div class="card-body ">
							<div class="table-scrollable">
								<table class="table table-hover table-checkable order-column full-width slimDataTable" id="storageConditionsTable">
									<thead>
										<tr>
											<th class="left">Date Created</th>
											<th class="left">Code</th>
											<th class="left">Condition Name</th>
											<th class="left">Temperature Range</th>
											<th class="left">Humidity</th>
											<th class="left">Light Sensitivity</th>
											<th class="left">Ventilation</th>
											<th class="left">Remarks</th>
										</tr>
									</thead>
									<tbody>
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
<!-- php: = $this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->

<script>
	$('#storageConditionsTable').DataTable({
		"ordering": false,
		ajax: {
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'viewStorageConditions',]) -->",
			data: {
				status: status
			},
			dataSrc: 'data'
		},
		columns: [{
				data: "",
				render: function(data, type, row) {
					return new Date(row?.date_created).toLocaleString()
				}
			},
			{
				data: "",
				render: function(data, type, row) {
					return row?.code
				}
			},
			{
				data: "",
				render: function(data, type, row) {
					return row?.condition_name
				}
			},
			{
				data: "",
				render: function(data, type, row) {
					return row?.temperature_min + "°C to " + row?.temperature_max + "°C"
				}
			},
			{
				data: "",
				render: function(data, type, row) {
					return row?.humidity_min + "% to " + row?.humidity_max + "%"
				}
			},
			{
				data: "",
				render: function(data, type, row) {
					return row.light_sensitivity
				}
			},
			{
				data: "",
				render: function(data, type, row) {
					return row.ventilation
				}
			},
			{
				data: "",
				render: function(data, type, row) {
					return row.remarks
				}
			},

		]
	});
</script>
`;

export default function ElementElementSettingsStorageConditions() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
