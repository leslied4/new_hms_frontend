const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Consulting Rooms</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#consulting_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#consulting_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="consulting_add">
					<h4>Add a new Consulting Room</h4>
					<!-- php: = $this->Form->create($addSpecialty, ['url' => ['controller' => 'Specialties', 'action' => 'addSpecialty'], 'id' => 'specialty']); -->
						<div class="form-body">
						

							<div class="form-actions">
							<div class="row">
								<div class="offset-md-3 col-md-9">
									<button type="submit" id ="submit" class="btn btn-info">Submit</button>
									<button type="button" onclick = 'clearFields()' class="btn btn-success">Reset</button>
								</div>
							</div>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
				</div>
				<div class="tab-pane active" id="consulting_view">
					<div class="card  card-box">
						<div class="card-body ">
						  	<div class="table-scrollable">
								
								<table class="table table-hover order-column full-width customDataTable">
									<thead>
										<tr>
											<th>Room</th>
											<th> Action </th>
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

<!-- end page content -->
<script>
	$(function () {
		$("#specialty").submit(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});

		var counter = 0;
        $('#add_more_button').on('click', function() {
            counter ++
            $('<div id="name_'+ counter +'"><input type="text" name="name[]" id="name"  placeholder="Enter MDC Name" class="form-control input-height" required/><br></div>').appendTo("#mdc_name_div");
            $('<div id="price_'+ counter +'"><input type="number" name="code[]" id="code"  placeholder="Code" class="form-control input-height" required/><br></div>').appendTo("#mdc_code_div");
            $('<div id="code_'+ counter +'"><input type="number" name="tariff[]" id="code"  placeholder="Tariff" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#mdc_tariff_div");
        });
    });

    function removeExtraFields(counter){
        $('#name_' + counter).remove();
        $('#price_' + counter).remove();
        $('#code_' + counter).remove();
    }
</script>

`;

export default function ElementElementManagesecurityConsultingrooms() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
