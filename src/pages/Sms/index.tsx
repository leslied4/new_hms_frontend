import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Sms/index.php';
const rawHtml = `
<!-- <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.3.1/flatly/bootstrap.min.css"> -->
		<style>
/* body { background-color: #fafafa; } */
/* .container { margin: 150px auto; } */
			.no_background {
				background: none
			}
		</style>
		<!-- <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script> -->
		
		<script>
$(document).ready(function(){

	// $(".textarea1").maxLength();

	$("#text-message").maxLength({
		maxChars: 160,
		clearChars: false,
		countHolder: '.chars-count2',
		remainHolder: '.chars-remaining2',
		maxHolder: '.chars-max2',
		onLimitOver: function(){ $('#text-message').css('color', 'red'); $('.chars-remaining2-container').css('color', 'red'); },
		onLimitUnder: function(){ $('#text-message').css('color', '#000'); $('.chars-remaining2-container').css('color', '#000'); }
	});

});
		</script>
<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			
			<div class="card  card-box">
				<div class="card-head">
					<ul class="nav " id="patientInfoTab">
							<li class="nav-item tab-all">
								<a class="nav-link active font-weight-bold" href="#send_bulk_sms" data-toggle="tab"><!-- php: = $pageTitle --></a>
							</li>
							<li class="nav-item tab-all p-l-20">
								<a class="nav-link font-weight-bold" href="#sms_info" data-toggle="tab">SMS Information</a>
							</li>
							<li class="nav-item tab-all p-l-20">
								<a class="nav-link font-weight-bold" href="#sms_history" data-toggle="tab">SMS History</a>
							</li>
						</ul>
				</div>
				<div class="card-body ">
				 <div class="tab-content">
				     <div class="tab-pane active" id="send_bulk_sms">
				         <div class="row">
				             <div class="col-md-12">
				                 <h5 style="text-align: center">Patient SMS Filter Options </h5>
				                 <!-- php: //= $this->Form->create(null, ['type' => 'get']); -->
								 <form id="recipients_filter_form">
									<div id="filter_section" style="background: #fafafa; border-radius: 5px; padding: 10px">

										<div class="row">
											<div class="col-md-6">
												<div class="form-group row">
													<label class="col-md-4 control-label">Reg Start Date</label>
													<div class="input-group date form_date col-md-8 " data-date=""
														data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd"
														data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
														<input class="form-control input-height" value="<!-- php: = $filterStartDate -->"
															size="16" placeholder="YYYY-MM-DD" data-required="0"
															name="filter_start_date" id="filter_start_date" type="text" value="">
														<span class="input-group-addon" style="background:none; border:none"><span class="fa fa-calendar"></span></span>
													</div>
													<input type="hidden" id="dtp_input2" value="" />
													<br />
												</div>
											</div>

											<div class="col-md-6">
												<div class="form-group row">
													<label class="col-md-4 control-label">Reg End Date</label>
													<div class="input-group date form_date col-md-8 " data-date=""
														data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd"
														data-link-field="dtp_input3" data-link-format="yyyy-mm-dd">
														<input class="form-control input-height" value="<!-- php: = $filterEndDate -->"
															size="16" placeholder="YYYY-MM-DD" data-required="0" name="filter_end_date"
															id="filter_end_date" type="text" value="">
														<span class="input-group-addon" style="background:none; border:none"><span class="fa fa-calendar"></span></span>
													</div>
													<input type="hidden" id="dtp_input3" value="" />
													<br />
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-6">
												<div class="form-group row">
													<label class="col-md-4 control-label">Patient Name</label>
													<div class="input-group col-md-8">
														<input class="form-control" type="text" value="<!-- php: = $filterPatient -->"
															name="filter_patient" id="filter_patient" placeholder="Patient Name">
														<span class="input-group-addon" style="background:none; border:none" title="Clear Patient Filter"
															onclick="javascript:$('#filter_patient').val('');"><span
																class="fa fa-remove"></span></span>
													</div>
													<br />
												</div>
												<div class="form-group row">
													<label class="col-md-4 control-label">Gender</label>
													<div class="input-group col-md-8">
														<SearchableSelectField class="form-control selectpicker no_background show-menu-arrow show-tick"
															data-live-search="true" data-required="0" name="filter_genders[]"
															id="filter_genders" multiple>

															<!-- php: foreach($genders as $key => $gender) { -->
															<option <!-- php: = in_array($key, $filterGenders) ? 'selected' : '' -->
																value="<!-- php: = $key -->"><!-- php: = $gender --></option>
															<!-- php: } -->
														</SearchableSelectField>
														<span class="p-2" title="Clear Gender Filter"
															onclick="javascript:$('#filter_genders').prop('selectedIndex',-1); $('#filter_genders').selectpicker('refresh');"><span
																class="fa fa-remove"></span></span>
													</div>
													<br />
												</div>
												<div class="form-group row">
													<label class="col-md-4 control-label">Specialties/Mdc</label>
													<div class="input-group col-md-8">
														<SearchableSelectField class="form-control no_background selectpicker show-menu-arrow show-tick"
															data-live-search="true" data-required="0" name="filter_specialties[]"
															id="filter_specialties" multiple>

															<!-- php: foreach($specialties as $key => $specialty) { -->
															<option <!-- php: = in_array($key, $filterSpecialties) ? 'selected' : '' -->
																value="<!-- php: = $key -->"><!-- php: = $specialty->name --></option>
															<!-- php: } -->
														</SearchableSelectField>
														<span class="p-2" title="Clear Gender Filter"
															onclick="javascript:$('#filter_genders').prop('selectedIndex',-1); $('#filter_genders').selectpicker('refresh');"><span
																class="fa fa-remove"></span></span>
													</div>
													<br />
												</div>
												<div class="form-group row">
													<label class="col-md-4 control-label">Drg (Diagnostic grouping)</label>
													<div class="input-group col-md-8">
														<SearchableSelectField class="form-control selectpicker show-menu-arrow no_background show-tick"
															data-live-search="true" data-required="0" name="filter_drg[]"
															id="filter_drg" multiple>

														</SearchableSelectField>
														<span class="p-2" title="Clear Drg Filter"
															onclick="javascript:$('#filter_drg').prop('selectedIndex',-1); $('#filter_drg').selectpicker('refresh');"><span
																class="fa fa-remove"></span></span>
													</div>
													<br />
												</div>
											</div>

											<div class="col-md-6">

												<div class="form-group row">
													<label class="col-md-4 control-label">Folder No</label>
													<div class="input-group col-md-8">
														<input class="form-control" type="text" value="<!-- php: = $filterFolderNumber -->"
															name="filter_folder_number" id="filter_folder_number"
															placeholder="Patient Folder No.">
														<span class="input-group-addon" title="Clear Folder Number Filter"
															onclick="javascript:$('#filter_folder_number').val('');"><span
																class="fa fa-remove"></span></span>
													</div>
													<br />
												</div>

												<div class="form-group row">
													<label class="col-md-4 control-label">Age</label>
													<div class="input-group col-md-8">
														<input class="form-control" min="0" type="number" value="<!-- php: = $filterAge -->"
															name="filter_age" id="filter_age" placeholder="Age">
														<span class="input-group-addon">
															<SearchableSelectField class="form-control" data-required="0" name="filter_age_flag"
																id="filter_age_flag">
																<!-- <option <!-- php: //= $filterAgeFlag == 'eq' ? 'selected' : '' --> value="eq">=
																</option> -->
																<option <!-- php: = $filterAgeFlag == 'le' ? 'selected' : '' --> value="le">&le;
																</option>
																<option <!-- php: = $filterAgeFlag == 'ge' ? 'selected' : '' --> value="ge">&ge;
																</option>
																<option <!-- php: = $filterAgeFlag == 'lt' ? 'selected' : '' --> value="lt">&lt;
																</option>
																<option <!-- php: = $filterAgeFlag == 'gt' ? 'selected' : '' --> value="gt">&gt;
																</option>
																<!-- <option <!-- php: //= $filterAgeFlag == 'ne' ? 'selected' : '' --> value="ne">&ne;
																</option> -->
															</SearchableSelectField>
															<!-- span class="fa fa-remove" title="Clear Gender Filter" onclick="javascript:$('#filter_age_flag').prop('selectedIndex',-1); $('#filter_age_flag').selectpicker('refresh'); $('#filter_age').val('');"></span -->
														</span>
													</div>
													<br />
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-12">
												<div style="float: right">
													<button type="submit" class="btn btn-info">Submit</button>
													<button onclick="javascript:resetFilters(); getAllReceipients(); return false;"
														class="btn btn-info">Reset Filters</button>
												</div>
											</div>
										</div>
										<div style="clear: both"></div>
									</div>
								</form>
				                 <!-- php: //= $this->Form->end() -->
				             </div>
				             <div class="col-md-12 mb-4 mt-2 ">
				                 <h5 style="text-align: center">Send SMS</h5>
				                 <!-- php: //= $this->Form->create(null, ['url' => array_merge($this->request->getQuery(), $this->request->getData())]); -->
								 <form id="sending_message_form">
									<div id="filter_section" style="background: #fafafa; border-radius: 5px; padding: 10px">

										<div class="row">
											<label class="col-md-12 control-label">Message</label>
											<div class="col-md-12">
												<div class="form-group row">
													<div class="col-md-12">
														<textarea id="text-message" class="form-control text-area" rows="4"
															id="filter_message" name="filter_message"><!-- php: = $filterMessage --></textarea>
													</div>
													<br />
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-12">

												<span class="chars-count2  badge badge-primary"></span> / <span
													class="chars-max2 badge badge-info"></span><br />
												<span class="chars-remaining2-container"><span
														class="chars-remaining2  badge badge-danger"></span> characters remaining</span><br />



												<div style="float: right">
													<button type="submit" class="btn btn-info">Submit</button>
												</div>
											</div>
										</div>
										<div style="clear: both"></div>
									</div>
								</form>
				                 <!-- php: //= $this->Form->end() -->
				             </div>
				         </div>

				         <div style="clear: both" class="mt-1"></div>


				         <!-- <div class="table-scrollable">
				             <table id="receipients-table" class="table table-hover table-striped order-column full-width">
				                 <thead>
				                     <tr>
				                         <th> Name </th>
				                         <th> Sex </th>
				                         <th> Date of Birth</th>
				                         <th> Age</th>
				                         <th> Folder No. </th>
				                         <th> Mobile </th>
				                         <th> Reg Date </th>
				                     </tr>
				                 </thead>
				                 <tbody id="receipients-body">
				                   
				                 </tbody>
				             </table>
				         </div> -->

				        
				     </div>
				     <div class="tab-pane" id="sms_info">
				         <div class="container">

				             <h4 class="mt-4 d-flex justify-content-between">Account Information
				                 <button onclick="overviewTab()" style="box-shadow:none!important"
				                     class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
				             <div class="row d-flex justify-content-between">
				                 <div class="col-md-4 card p-3">
				                     <small class="text-success mb-0 pb-0">BALANCE LEFT</small>
				                     <h3 id="current" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">
									 <span id="balance_sms">400</span> <small style="font-weight:bold">SMS</small></h3>
				                 </div>
				                 <div class="col-md-4 card p-3">
				                     <small class="text-danger mb-0 pb-0">USED</small>
				                     <h3 id="billable" style="margin-top:0px!important;margin-bottom:0px!important;"
				                         class="my-0 pb-0"><span id="used_sms">400</span> <small style="font-weight:bold">SMS</small></h3>
				                     <!-- <small class="text-secondary mt-0 d-none">1-15 days</small> -->
				                 </div>
								 <!-- php: = $this->Form->create(null, ['url' =>['controller' => 'Settings','action'=>'submitSmsTopupRequest'], 'class'=>'col-md-4 card p-3']); -->

				                     <small class="text-primary mb-0 pb-0">TOPUP</small>
				                     <div class="row mt-2">
				                         <div class="col-4 pr-0">
				                             <input onchange="syncSmsConversion(event)" id="top-up-amount" style="font-size:16px" type="number" placeholder="Amount" name="amount" class="form-control">
				                         </div>
										 <div class="col-1 d-flex align-items-center justify-content-center px-0">
											<h3 class="m-0 p-0"> =</h3>
										 </div>
				                         <div class="col-4 pl-0">

				                             <input onchange="syncSmsConversion(event)" id="top-sms" style="font-size:16px" type="number" placeholder="SMS" name="quantity" class="form-control">
				                         </div>
										 <div class="col-3 pl-0">
											<button type="buttom" class="btn btn-sm btn-info" style="height:100%">Request</button>
										 </div>
				                     </div>
				                     <!-- <small class="text-secondary mt-0 d-none">1-15 days</small> -->

								 <!-- php: = $this->Form->end(); -->
				             </div>
				         </div>

						 <div class="container mt-4 p-3">
            <h4>Account Summary</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: = $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div d-none', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="account_summary" style="height: 400px;width:1100px; min-width: 100%;"></div>
                    </div>
                    <div class="col-md-2">
                        <SearchableSelectField id="account-summary-year" onchange="requestDifferentHistoryYear()"  class="form-control mt-3">
                            <option value='2025'>2025</option>
                            <option value='2024'>2024</option>
                            <option value='2023'>2023</option>
                            <option value='2022'>2022</option>
							<option value='2021'>2021</option>
                            <option value='2020'>2020</option>
                            <option value='2019'>2019</option>
                        </SearchableSelectField>
                        <!-- <h6 class="text-primary mt-5 mb-0 pb-0">Total Waiting for Approval</h6>
                        <h2 id="total-waiting-approval" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                        <!-- <h6 class="darkorange mt-4 mb-0 pb-0">Total </h6>
                        <h2 id="total-due" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-danger mt-4 mb-0 pb-0">Total Overdue</h6>
                        <h2 id="total-overdue" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-pending" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                    </div>
                </div>
            </div>
        </div>

				     </div>
					 <div class="tab-pane" id="sms_history">
						<h3 class="mt-3">SMS History</h3>
						<div class="table-responsive mt-1">
							<table class="table" id="sms-history">
								<thead>
								<tr>
									<th>Date</th>
									<th>Subject</th>
									<th>Message</th>
									<th>Delivered</th>
									<th>User</th>
									<th>Actions</th>
								
								</tr>
								</thead>
								<tbody id="bulkSmsTable">

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

<div class="modal fade" id="showreceipients" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-danger">
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Bulk Sms Receipients</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <h4 class="text-secondary">these are the recepients of message: <span></span></h4>
                   <form id="cancelRoutineCareForm">
                    <div class="d-flex align-items-center">

                        
                    </div>
                    <div class="row align-items-center ">
						<ul id="receipients_lists">

						</ul>


                    </div>
                </div>
            </div>
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center py-1 justify-content-end">
                
               <!-- php: //= $this->Form->create(null, ['id'=>'cancelRoutineCareForm','url' => ['controller' => 'Patients', 'action' => 'canceRoutineCare']]); -->
               <input type="hidden" name="id" id="cancel_id"/>
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                  <!-- php: //= $this->Form->end() -->
                  </form>
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

	<!-- php: = $this->Html->script('/js/echarts.js'); -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
	<!-- php: =$this->Html->script('../assets/js/jquery.maxlength.min.js') -->
<script>
	$('#sms-history').dataTable();
	function resetFilters() {
		$('#filter_patient').val('');
		$('#filter_start_date').val('');
		$('#filter_end_date').val('');
		$('#filter_folder_number').val('');
		$('#filter_genders').prop('selectedIndex',-1); 
		$('#filter_genders').selectpicker('refresh');
		$('#filter_age').val('');
		$('#filter_message').val('');
		$('#filter_age_flag').prop('selectedIndex',0); 
		// $('#filter_age_flag').selectpicker('refresh');
	}
	var account_summary = echarts.init(document.getElementById("account_summary"));
    // var date_period = a.init(document.getElementById("date_period_container"));
    window.onresize = function () {
        account_summary.resize();
    };
    window.addEventListener('resize', function () {
        account_summary.resize();
    });

 function getAccountSummary(data) {
     account_summary.setOption({
         title: {
             text: 'Account Summary',
             // subtext: 'Total due + Total overdue',
             left: 'center'
         },
         xAxis: {
             type: 'category',
             data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
         },
         yAxis: {
             type: 'value'
         },
         series: [{
			data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].reduce((acc,curr) => {
				acc.push((data[curr] || 0))
				return acc
			}, []),
			itemStyle: {
				color: 'darkorange'
			},
			type: 'bar'
		}]
     });
 }

//  getAccountSummary({data:{
// 	summary: [1,0,4,3,1,0,3,2,7,1,8,9]
//  }});


function syncSmsConversion(event) {
    const RATE = 0.035;
    const amountInput = document.getElementById('top-up-amount');
    const smsInput = document.getElementById('top-sms');
    
    // Check which input was changed
    if (event.target.id === 'top-up-amount') {
        // Amount changed -> Calculate SMS (round down to nearest whole number)
        const amount = parseFloat(event.target.value) || 0;
        smsInput.value = Math.floor(amount / RATE);
    } else if (event.target.id === 'top-sms') {
        // SMS changed -> Calculate Amount (round to 2 decimal places)
        const count = parseInt(event.target.value) || 0;
        amountInput.value = (count * RATE).toFixed(2);
    }
}


//  $('#text-message').on('keyup', function(){
//   if($('#text-message').val() < 1){
// 	$('#char-count').html(Math.abs(160));
//   } else{  //parseInt($('#char-count').text()) - parseInt($('#text-message').val().length)
// 	$('#char-count').html(parseInt($('#char-count').text()) - 1);
//   }
//  });
$('#text-message').maxLength({
	maxChars: 160
});

function formatDateAndCalculateAge(dateString) {
  let formattedDate = new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  let birthDate = new Date(dateString);
  let today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return { formattedDate, age };
}

// Declare table variable in the global scope
var table;

$(document).ready(function () {
    // Initialize DataTable
    // table = $('#receipients-table').DataTable();
	let year = new Date().getFullYear()
	res = ''
	for (let index = 0; index < 4; index++) {
		res+= \`<option value="\${year - index}"> \${year-index}</option>\`
	}
	$('#account-summary-year').html(res)
    // getAllReceipients();
    getBulkSms();
    getSmsGraphs();
});

function requestDifferentHistoryYear() {
	getSmsGraphs(\`\${$('#account-summary-year').val()}\`)
}

function getAllReceipients() {

    $.ajax({
        url: '<!-- php: =$this->Url->build(['controller'=>'Sms','action'=>'getRecipients']) -->',
        method: 'GET',
        beforeSend: function () {
            $('#receipients-body').html('Loading..');
        },
        success: function (data) {
			table = $("#receipients-table").DataTable()
			table.destroy()

            data.forEach(patient => {
                $('#receipients-body').append(\`
                    <tr class="odd gradeX">
                        <td>\${patient?.first_name} \${patient?.last_name}</td>
                        <td>\${patient?.gender?.name}</td>
                        <td>\${formatDateAndCalculateAge(patient?.date_of_birth).formattedDate}</td>
                        <td>\${formatDateAndCalculateAge(patient?.date_of_birth).age}</td>
                        <td>\${patient?.folder_number}</td>
                        <td>\${patient?.phone}</td>
                        <td>\${formatDateAndCalculateAge(patient?.registration_date).formattedDate}</td>
                    </tr>
                \`);
            });

            // Destroy and reinitialize DataTable
            // if (table) {
            //     table.destroy();
            // }
            // table = $('#receipients-table').DataTable();
			$("#receipients-table").DataTable()
			
        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
}
function getBulkSms() {
	table = $("#receipients-table").DataTable()
	table.destroy()
    $.ajax({
        url: '<!-- php: =$this->Url->build(['controller'=>'Sms','action'=>'getBulkSms']) -->',
        method: 'GET',
        beforeSend: function () {
            let table = $('#sms-history').DataTable();
			table.destroy()
        },
        success: function (data) {
			$('#receipients-body').html('');
			console.log(data)
            data.forEach(bulk => {
				let receipients = ''
				bulk.facility_communications.forEach(ele => {
					receipients+= ele?.patient?.first_name + ' ' + ele?.patient?.last_name +\` - \${ele.date_delivered ? 'delivered' : 'pending'} ||\`
				});
                $('#bulkSmsTable').append(\`
                    <tr class="odd gradeX">
                        <td>\${new Date(bulk.date_created).toGMTString()}</td>
                        <td>\${bulk?.subject}</td>
                        <td>\${bulk?.body}</td>
                        <td>\${(bulk.facility_communications.filter(r => (!!r.date_delivered))).length}/\${(bulk.facility_communications).length}</td>
                        <td>\${bulk?.user.first_name} \${bulk?.user.last_name}</td>
                        <td>
							<a href="javascript:" data-toggle="modal" data-target="#showreceipients" onclick="showReceipients('\${receipients}')"  class="btn btn-success btn-xs">view receipients</a>
						</td>
                    </tr>
                \`);
            });
			$("#sms-history").DataTable()
        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
}

function showReceipients(info) {
	$('#receipients_lists').html('')
	info.split("||").forEach(inf => {
		if (inf.trim() != '') {
			
			$('#receipients_lists').append(\`<li> \${inf} </li>\`)
		}
	});
}
const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return \`\${String(date.getMonth() + 1).padStart(2, '0')}\`;
};

function getSmsGraphs(year=\`\${new Date().getFullYear()}\`) {

    $.ajax({
        url: '<!-- php: =$this->Url->build(['controller'=>'Sms','action'=>'getSmsHistory']) -->/?',
        method: 'GET',
        beforeSend: function () {
        },
        success: function (data) {
			let used_sms = 0
			let balance = data.sms_balance || 0
			const groupedData = data.info.reduce((acc, item) => {
				const monthYear = getMonthYear(item.date_delivered);
				if (!acc[monthYear]) {
					acc[monthYear] = 0;
				}
				if (monthYear) {
					used_sms++
				}
				if (new Date(item.date_delivered).getFullYear() == year) {
					
					acc[monthYear]++;
				}
				return acc;
			}, {});
			$('#used_sms').html(used_sms)
			$('#balance_sms').html(balance - used_sms)
			getAccountSummary(groupedData)
			console.log("information", groupedData)
        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
}

$('#recipients_filter_form').on('submit', function (e) {
    e.preventDefault();
    console.log('submitting filters');
	table = $("#receipients-table").DataTable()
	table.destroy()
    $.ajax({
        url: '<!-- php: =$this->Url->build(['controller'=>'Sms','action'=>'getRecipients']) -->',
        method: 'GET',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function () {
            $('#receipients-body').html('Loading..');
        },
        success: function (data) {
			console.log(data)
            $('#receipients-body').html('');
            data.map(patient => {
                $('#receipients-body').append(\`
                    <tr class="odd gradeX">
                        <td>\${patient?.first_name} \${patient?.last_name}</td>
                        <td>\${patient?.gender?.name}</td>
                        <td>\${formatDateAndCalculateAge(patient?.date_of_birth).formattedDate}</td>
                        <td>\${formatDateAndCalculateAge(patient?.date_of_birth).age}</td>
                        <td>\${patient?.folder_number}</td>
                        <td>\${patient?.phone}</td>
                        <td>\${formatDateAndCalculateAge(patient?.registration_date).formattedDate}</td>
                    </tr>
                \`);
            });

            // Destroy and reinitialize DataTable
            // if (table) {
            //     table.destroy();
            // }
            // table = $('#receipients-table').DataTable();
			$("#receipients-table").DataTable()
        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
});

$('#sending_message_form').on('submit', function (e) {
    e.preventDefault();
	if(!confirm("Are you sure you want to submit?")){
		return
	}
    console.log('submitting filters');
	var formData1 = $('#recipients_filter_form').serialize();
	var formData2 = $(this).serialize();

	// Merge the serialized form data
	var mergedFormData = formData1 + '&' + formData2;
	table = $("#receipients-table").DataTable()
	table.destroy()

    $.ajax({
        url: '<!-- php: =$this->Url->build(['controller'=>'Sms','action'=>'sendBulkSms']) -->',
        method: 'GET',
        data: mergedFormData,
        dataType: 'json',
        beforeSend: function () {
            $('#receipients-body').html('Loading..');
        },
        success: function (data) {
			window.location.reload()
        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
});




	
</script>
`;

export default function SmsIndexPage() {
  return (
    <PageShell title="Sms/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
