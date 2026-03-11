const rawHtml = `

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card">
			<div class="card-head">
				<header>History</header>
			</div>
			<div class="card-body " id="bar-parent">
				<div class="row">
					<div class="col-md-2 col-sm-3 col-xs-3">
						<ul class="nav nav-tabs tabs-left left-tab-card" id="historyTab">
							<li class="nav-item">
								<a href="#pastMedicalHistoryTab" class="" data-toggle="tab">
									Past Medical History
								</a>
							</li>
							<li class="nav-item">
								<a href="#drugHistoryTab" class="" data-toggle="tab">
									Drug History
								</a>
							</li>
							<li class="nav-item">								
								<a href="#familyHistoryTab" class="" data-toggle="tab">
									Family History
								</a>
							</li>
							
							<!-- php: if($patient->gender_id == 2) { -->
							<li class="nav-item">								
								<a href="#gynaecologicHistoryTab" class="" data-toggle="tab">
									Gynaecologic History
								</a>
							</li>
							<!-- php: } -->
							
							<!-- php: if($patient->gender_id == 2) { -->
							<li class="nav-item">								
								<a href="#contraceptionHistoryTab" class="" data-toggle="tab">
									Contraception History
								</a>
							</li>
							<!-- php: } -->
							
							<!-- php: if($patient->gender_id == 2) { -->
							<li class="nav-item">								
								<a href="#obstetricHistoryTab" class="" data-toggle="tab">
									Obstetric History
								</a>
							</li>
							<!-- php: } -->
							
							<li class="nav-item">								
								<a href="#socialHistoryTab" class="" data-toggle="tab">
									Social History
								</a>
							</li>
						</ul>
					</div>
					<div class="col-md-10 col-sm-9 col-xs-9">
						<div class="tab-content">
							<div class="tab-pane" id="pastMedicalHistoryTab">
								<!-- h4>Past Medical History</h4 -->
								<!-- php: = $this->element('patientvisit/history/pastmedicalhistory') -->
							</div>
							<div class="tab-pane" id="drugHistoryTab">
								<!-- h4>Drug History</h4 -->
								<!-- php: = $this->element('patientvisit/history/pastdrughistory') -->
							</div>
							<div class="tab-pane" id="familyHistoryTab">
								<!-- h4>Family History</h4 -->
								<!-- php: = $this->element('patientvisit/history/pastfamilyhistory') -->
							</div>
							<div class="tab-pane" id="gynaecologicHistoryTab">
								<!-- php: = $this->element('patientvisit/history/pastgynaecologichistory') -->
							</div>
							<div class="tab-pane" id="contraceptionHistoryTab">
								<!-- h4>Contraception History</h4 -->
								<!-- php: = $this->element('patientvisit/history/pastcontraceptionhistory') -->
							</div>
							<div class="tab-pane" id="obstetricHistoryTab">
								<!-- h4>Obstetric History</h4 -->
								<!-- php: = $this->element('patientvisit/history/pastobstetrichistory') -->
							</div>
							<div class="tab-pane" id="socialHistoryTab">
								<!-- h4>Social History</h4 -->
								<!-- php: = $this->element('patientvisit/history/pastsocialhistory') -->
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#historyTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('lastHistoryTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var lastHistoryTab = localStorage.getItem('lastHistoryTab');
		if (lastHistoryTab) {
		   $('#historyTab a[href=' + lastHistoryTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#historyTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ElementElementPatientvisitHistory() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
