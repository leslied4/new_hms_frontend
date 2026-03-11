const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Symptoms & Notes</span>
			</div>
			<ul class="nav nav-tabs" id="symtomsNotesTab">
				<li class="nav-item symptoms">
					<a href="#borderBox_symptoms" data-toggle="tab">Symptoms</a>
				</li>
				<li class="nav-item history">
					<a href="#borderBox_history" data-toggle="tab">History</a>
				</li>
				<li class="nav-item history">
					<a href="#borderBox_examination" data-toggle="tab">Examination</a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane request_lab_content" id="borderBox_symptoms">
					<!-- php: = $this->element('patientvisit/symptom/symptoms') -->											
				</div>
				<div class="tab-pane borderBox_history" id="borderBox_history">
					<!-- php: //= $this->element('patientvisit/history') -->											
				</div>
				<div class="tab-pane borderBox_examination" id="borderBox_examination">
					<!-- php: //= $this->element('patientvisit/examination') -->
				</div>
				
			</div>
		</div>
	</div>
</div>
					
					
<script>

$(function () {
	
	$("#symptomsForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
	
	$("#chief_complaint").tagsInput();
	$("#history").tagsInput();
	$("#other_complaint").tagsInput();
	$("#co_morbidities").tagsInput();
});


function clearSymptoms(){
	$('#chief_complaint').importTags('');
	$('#history').importTags('');
	$('#other_complaint').importTags('');
	$('#co_morbidities').importTags('');
	// $('#tags-input').importTags('');
	
}

</script>


<script type="text/javascript">
	$(document).ready(function() {
		// save tab in local storage
		$('#symtomsNotesTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('symtomsNotesLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var symtomsNotesLastTab = localStorage.getItem('symtomsNotesLastTab');
		if (symtomsNotesLastTab) {
		   $('#symtomsNotesTab a[href=' + symtomsNotesLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#symtomsNotesTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ElementElementPatientvisitSymptomsandnotes20190607() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
