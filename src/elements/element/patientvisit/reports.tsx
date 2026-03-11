const rawHtml = `
<!-- php: //= $this->Html->script('../assets/js/print-div.js') -->
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">REPORTS</span>
			</div>
			<ul class="nav nav-tabs" id="reportTab">
				<li class="nav-item request_lab d-none">
					<a href="#visitReportTab" data-toggle="tab">Visit Report</a>
				</li>
				<li class="nav-item request_medication d-none">
					<a href="#drugChartReportTab" data-toggle="tab">Drug Chart Report</a>
				</li>
				<!-- php: if($selectedVisit->visit_outcome_id == 2) { // Only show for refered visits -->
					<li class="nav-item request_medication d-none">
						<a href="#referralReportTab" data-toggle="tab">Referral Report</a>
					</li>
				<!-- php: } -->
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="visitReportTab">
					<h4 class="font-bold mt-5">Visit Report</h4>
					<p class="text-secondary">In this report, you will find summarised health record including patient health information, medications and problems list and account balances.</p>
					<div class="tools d-flex justify-content-start">
						<!--<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
						<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
						<a class="t-close btn-color fa fa-times" href="javascript:;"></a>-->
						<a href="javascript:" onclick="visitReport()" class="export-link" escape=false>
						<!-- <a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'vi', $patient->id, $selectedVisit->id, 'visit_report', '_ext' => 'pdf']) -->" class="export-link" escape=false> -->
							<!-- php: = $this->Html->image('../assets/img/mail-to.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
						<!-- <a href="javascript:" onclick="javascript:PrintDiv('#visit-report')" class="export-link" target="_blank" escape=false>
							<!-- php: //= $this->Html->image('../assets/img/print.png',['class' => 'export-action', 'title' => 'Print', 'style' => 'width: 30px; height: auto']) -->

						</a> -->

						<!-- a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', $patient->id, $selectedVisit->id, 'action' => 'viewPatientProfile', '_ext' => 'xlsx']) -->" class="export-link" escape=false>
							<!-- php: //= $this->Html->image('../assets/img/excel.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a -->

						<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'visitReport', $patient->id, $selectedVisit->id]) -->" target="_blank" class="export-link" escape=false>
							<!-- php: = $this->Html->image('../assets/img/pdf.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
					</div>
					<h4 class="font-bold mt-5">Drug Chart</h4>
					<p class="text-secondary">in this report, you will find summarised medication administration records and any deterioration management flowsheets scheduled during patient visit</p>
					<div class="tools d-flex justify-content-start">
						<!--<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
						<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
						<a class="t-close btn-color fa fa-times" href="javascript:;"></a>-->
						<a href="javascript:" target="_blank" class="export-link" escape=false>
						<!-- <a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'vi', $patient->id, $selectedVisit->id, 'visit_report', '_ext' => 'pdf']) -->" class="export-link" escape=false> -->
							<!-- php: = $this->Html->image('../assets/img/mail-to.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
						<!-- <a href="javascript:" onclick="javascript:PrintDiv('#visit-report')" class="export-link" escape=false target="_blank">
							<!-- php: //= $this->Html->image('../assets/img/print.png',['class' => 'export-action', 'title' => 'Print', 'style' => 'width: 30px; height: auto']) -->

						</a> -->

						<!-- a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', $patient->id, $selectedVisit->id, 'action' => 'viewPatientProfile', '_ext' => 'xlsx']) -->" class="export-link" escape=false>
							<!-- php: //= $this->Html->image('../assets/img/excel.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a -->

						<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'visitReport', $patient->id, $selectedVisit->id]) -->" target="_blank" class="export-link" escape=false>
						<!-- <a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'vi', $patient->id, $selectedVisit->id, 'visit_report', '_ext' => 'pdf']) -->" class="export-link" escape=false> -->
							<!-- php: = $this->Html->image('../assets/img/pdf.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
					</div>
					<h4 class="font-bold mt-5">Routine Care Report</h4>
					<p class="text-secondary">In this report, you will find planned preventive and management care scheduled for patient i.e. Follow-up appointment, medication refills, lab and imaging, immunisation and other procedures.</p>
					<div class="tools d-flex justify-content-start">
						<!--<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
						<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
						<a class="t-close btn-color fa fa-times" href="javascript:;"></a>-->
						<a href="javascript:" onclick="getRoutineCareReport()" class="export-link" escape=false>
						<!-- <a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'vi', $patient->id, $selectedVisit->id, 'visit_report', '_ext' => 'pdf']) -->" class="export-link" escape=false> -->
							<!-- php: = $this->Html->image('../assets/img/mail-to.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
						<!-- <a href="javascript:" onclick="javascript:PrintDiv('#visit-report')" class="export-link" escape=false target="_blank">
							<!-- php: //= $this->Html->image('../assets/img/print.png',['class' => 'export-action', 'title' => 'Print', 'style' => 'width: 30px; height: auto']) -->

						</a> -->

						<!-- a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', $patient->id, $selectedVisit->id, 'action' => 'viewPatientProfile', '_ext' => 'xlsx']) -->" class="export-link" escape=false>
							<!-- php: //= $this->Html->image('../assets/img/excel.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a -->

						<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'routineCareReport', $patient->id, $selectedVisit->id]) -->" target="_blank"  class="export-link" escape=false>
						<!-- <a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'vi', $patient->id, $selectedVisit->id, 'visit_report', '_ext' => 'pdf']) -->" class="export-link" escape=false> -->
							<!-- php: = $this->Html->image('../assets/img/pdf.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
						
					</div>
					<!-- php: if($selectedVisit->visit_outcome_id == 2): -->
					<h4 class="font-bold mt-5">Referral Report</h4>
					<p class="text-secondary">In this report you will find any referral on details.</p>
					<div class="tools d-flex justify-content-start">
						<!--<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
						<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
						<a class="t-close btn-color fa fa-times" href="javascript:;"></a>-->
						<a href="javascript:" onclick="referralReport()" class="export-link" escape=false>
						<!-- <a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'vi', $patient->id, $selectedVisit->id, 'visit_report', '_ext' => 'pdf']) -->" class="export-link" escape=false> -->
							<!-- php: = $this->Html->image('../assets/img/mail-to.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
						<!-- <a href="javascript:" onclick="javascript:PrintDiv('#visit-report')" class="export-link" escape=false target="_blank">
							<!-- php: //= $this->Html->image('../assets/img/print.png',['class' => 'export-action', 'title' => 'Print', 'style' => 'width: 30px; height: auto']) -->

						</a> -->

						<!-- a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', $patient->id, $selectedVisit->id, 'action' => 'viewPatientProfile', '_ext' => 'xlsx']) -->" class="export-link" escape=false>
							<!-- php: //= $this->Html->image('../assets/img/excel.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a -->

						<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'referalReport', $patient->id, $selectedVisit->id]) -->" target="_blank"  class="export-link" escape=false>
						<!-- <a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'vi', $patient->id, $selectedVisit->id, 'visit_report', '_ext' => 'pdf']) -->" class="export-link" escape=false> -->
							<!-- php: = $this->Html->image('../assets/img/pdf.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
						
					</div>
					<!-- php: endif -->

					<div style="clear: both"></div><br/>
					<!-- span style="float: right"><a class="btn btn-danger" href="">Download Excel</a></span -->
					<!-- <div id="visit-report" style="border-top: 4px solid #dddddd; border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-radius: 7px; padding: 20px">

						<!-- php: //= $this->element('patientvisit/report/visit_report') -->
					</div> -->
				</div>
			
				<div class="tab-pane" id="drugChartReportTab">
					<h4 class="font-bold"><center>Drug Administration Chart</center></h4>
					<div class="tools">
						<a href="javascript:" onclick="javascript:PrintDiv('#drug-chart')" class="export-link" target="_blank" escape=false>
							<!-- php: = $this->Html->image('../assets/img/print.png',['class' => 'export-action', 'title' => 'Print', 'style' => 'width: 30px; height: auto']) -->

						</a>
						<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'viewVisit', $patient->id, $selectedVisit->id, 'drug_administration_chart', '_ext' => 'pdf']) -->" target="_blank"  class="export-link" escape=false>
							<!-- php: = $this->Html->image('../assets/img/pdf.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

						</a>
					</div>

					<div style="clear: both"></div><br/>
					<div id="drug-chart" style="border-top: 4px solid #dddddd; border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-radius: 7px; padding: 20px">
						<!-- php: = $this->element('patientvisit/report/drug_administration_chart') -->
					</div>
				</div>

				<!-- php: if($selectedVisit->visit_outcome_id == 2) { // Only show for refered visits -->
					<div class="tab-pane" id="referralReportTab">
						<h4 class="font-bold"><center>Referral Report</center></h4>
						<div class="tools">
							<!--<a class="fa fa-repeat btn-color box-refresh" href="javascript:;"></a>
							<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
							<a class="t-close btn-color fa fa-times" href="javascript:;"></a>-->
							<a href="javascript:" onclick="javascript:PrintDiv('#referral-report')" target="_blank" class="export-link" escape=false>
								<!-- php: = $this->Html->image('../assets/img/print.png',['class' => 'export-action', 'title' => 'Print', 'style' => 'width: 30px; height: auto']) -->

							</a>

							<!-- a href="<!-- php: //= Cake\Routing\Router::url(['controller' => 'Patients', $patient->id, $selectedVisit->id, 'action' => 'viewPatientProfile', '_ext' => 'xlsx']) -->" class="export-link" escape=false>
								<!-- php: //= $this->Html->image('../assets/img/excel.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

							</a -->

							<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Patients', 'action' => 'viewVisit', $patient->id, $selectedVisit->id, 'referral_report', '_ext' => 'pdf']) -->" target="_blank" class="export-link" escape=false>
								<!-- php: = $this->Html->image('../assets/img/pdf.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->

							</a>
						</div>

						<div style="clear: both"></div><br/>
						<!-- span style="float: right"><a class="btn btn-danger" href="">Download Excel</a></span -->
						<div id="referral-report" style="border-top: 4px solid #dddddd; border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-radius: 7px; padding: 20px">

							<!-- php: = $this->element('patientvisit/report/referral_report') -->
						</div>
					</div>
				<!-- php: } -->
				
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="send_reminder" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Send <span id="title"></span> Report as Email</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <!-- <!-- php: //= $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'sendRecurring']]); --> -->
                <form id="sendReminderForm">
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                           
                            <div class="row mb-3 mt-4">
                                <div class="col-md-12">
                                    <div class="form-check form-check-inline">
										<h5 style="white-space: nowrap;" class="my-0 py-0 pr-4">Email Address: </h5>
                                        <input type="text" name="receiver_email" required
                                            value="<!-- php: = $selectedVisit->patient->email -->" class="form-control">
										<input type="hidden" name="report-type" id="report-type">
										<input type="hidden" name="patient_id" value="<!-- php: = $selectedVisit->patient->id -->">
										<input type="hidden" name="visit_id" value="<!-- php: = $selectedVisit->id -->">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Send
                                &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                            <!-- <!-- php: //= $this->Form->end(); --> -->
                            <form>
                                <button style="height:20px;width:auto;"
                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                        class="fa fa-times text-danger fa-1x"></i> </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
	$(document).ready(function() {
		// save tab in local storage
		$('#reportTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('reportLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var reportLastTab = localStorage.getItem('reportLastTab');
		if (reportLastTab) {
		   $('#reportTab a[href=' + reportLastTab + ']').tab('show');
		}		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#reportTab a[data-toggle="tab"]:first').tab('show');
		}
	});

	function getRoutineCareReport(){
		$("#report-type").val("routine");
		$("#send_reminder").modal("show");
		$("#title").html("Routine Care");
	}
	function visitReport(){
		$("#report-type").val("visit_report");
		$("#send_reminder").modal("show");
		$("#title").html("Visit");
	}
	function referralReport(){
		$("#report-type").val("referral_report");
		$("#send_reminder").modal("show");
		$("#title").html("Referral Report");
	}

	$("#sendReminderForm").on("submit", function(e){
		e.preventDefault('')
		$.ajax({
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'emailReport']) -->",
			type: "POST",
			data: $(this).serialize(),
			beforeSend: function(e){
				alertify.success("Processing...");
				$("#send_reminder").modal("hide");
		},
		success: function(res){
			// console.log(res);
			var data = res;
			console.log(data);
			if(data.success){
				alertify.success(data.message);
				$("#send_reminder").modal("hide");
			} else {
				alertify.error(data.message);

			}
		},
		error: function(err){
			console.log(err);
			alertify.success("unexpected error occurred");

		}
  })
	});
</script>
`;

export default function ElementElementPatientvisitReports() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
