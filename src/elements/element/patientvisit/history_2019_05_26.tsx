const rawHtml = `

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-blue custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs justify-content-end" style="margin-bottom: 0px;" id="historyTab" >
					<li class="nav-item top-caption">
						<a href="#pastMedicalHistoryTab" class="" data-toggle="tab">
							Past Medical History
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#drugHistoryTab" class="" data-toggle="tab">
							Drug History
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#familyHistoryTab" class="" data-toggle="tab">
							Family History
						</a>
					</li>					
					<!-- li class="nav-item top-caption">
						<a href="#gynaecologicHistoryTab" class="" data-toggle="tab">
							Gynaecologic History
						</a>
					</li -->					
					<li class="nav-item top-caption">
						<a href="#contraceptionHistoryTab" class="" data-toggle="tab">
							Contraception History
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#obstetricHistoryTab" class="" data-toggle="tab">
							Obstetric History
						</a>
					</li>
					<li class="nav-item top-caption">
						<a href="#socialHistoryTab" class="" data-toggle="tab">
							Social History
						</a>
					</li>
				</ul>
			</header>
			<div class="panel-body">
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
					<!-- div class="tab-pane" id="gynaecologicHistoryTab">
						<h4>Gynaecologic History</h4>
					</div -->
					<div class="tab-pane" id="contraceptionHistoryTab">
						<!-- h4>Contraception History</h4 -->
						<!-- php: = $this->element('patientvisit/history/pastcontraceptionhistory') -->
					</div>
					<div class="tab-pane" id="obstetricHistoryTab">
						<h4>Obstetric History</h4>
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

export default function ElementElementPatientvisitHistory20190526() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
