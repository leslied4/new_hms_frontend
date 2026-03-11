const rawHtml = `
<style>
	.full-width {
		/* float: left; */
		width: 100% !important;
	}
	.mdl-chip {
		display: inline-flex;
		align-items: center;
		border-radius: 16px;
		padding: 0 12px;
		font-size: 13px;
		height: 32px;
		line-height: 32px;
		background: #f1f1f1; /* light grey background */
		color: rgba(0, 0, 0, 0.87);
	}

	.mdl-chip--contact {
		padding-left: 0;
	}

	.mdl-chip__contact {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		margin-right: 8px;
		font-size: 14px;
	}

	/* Orange background */
	.mdl-color--orange {
	background-color: #ff9800; /* Material Orange 500 */
	}

	/* White text */
	.mdl-color-text--white {
		color: #ffffff !important;
	}

	/* Green background (Material Green 500) */
	.mdl-color--green {
		background-color: #4caf50; /* Material Green */
	}

	/* Red background (Material Red 500) */
	.mdl-color--red {
		background-color: #f44336; /* Material Red */
	}

</style>
<!-- start header -->
<!-- php: $fullName = $this->request->getSession()->read()['Auth']['User']['first_name'] . ' ' . $this->request->getSession()->read()['Auth']['User']['last_name']; $sessionRole= $this->request->getSession()->read()['Auth']['User']['role']['name']; -->
	<div class="page-header navbar navbar-fixed-top">
		<div class="page-header-inner ">
			<!-- logo start -->
			<div class="page-logo d-flex align-items-end" style="">

				<!-- php: =$this->Html->image("../assets/img/logo.png",[ 'style' => 'width: 149.7px; margin: 0; padding:0; height: 51px;' ]); -->
				
			</div>
			<!-- logo end closing_navbar -->
			<!-- <ul class="nav navbar-nav navbar-left in">
				<li><a href="javascript:;" class="menu-toggler sidebar-toggler font-size-20"><i class="fa fa-exchange" aria-hidden="true"></i></a></li>
			</ul> -->
			
			<!-- <ul class="nav navbar-nav navbar-left in hidden-xs">
				<li><a href="javascript:;" class="fullscreen-click font-size-20"><i class="fa fa-arrows-alt"></i></a></li>
			</ul> -->
				
			<ul class="ml-2 nav navbar-nav navbar-left in hidden-xs">
				<li>
					<button type="button" class="btn btn-lg red btn-outline"><!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></button>
				</li>
			</ul>
			<ul class="nav navbar-nav navbar-left in hidden-xs">
				<!-- php: = $this->Form->create(null, ['type' => 'get','url'=>['controller'=>'Patients','action'=>'viewPatients']]); -->
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width" style="padding : 13px 0 0 50px; display: flex;">
					<input class="mdl-textfield__input form-control" type="text" name="searchValue" id="patientBox" placeholder ="Search Patient"  required/>
					<div class="d-flex align-items-center">
						<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'viewPatient'])) { -->
							<button 
							id="viewPatientDetsHeader"
							title="Add or View Visits"
							type="button"
							class="btn btn-xs patient_view_patient_profile"
							style="display:none"
							data-bs-toggle="modal"
							onclick="loadPatientSurroundView('patient_dets_modal')"
							data-url="<!-- php: = $this->Url->build(['controller'=>'PatientVisits','action'=>'viewPatient']) -->"
						>
							360&deg;
						</button>
						<!-- php: } -->
						<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'viewVisits'])) { -->
							<a id="viewPatientVisitHeader" title="Add or View Visits" href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewVisit',]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Visit') --> btn-xs patient_view_patient_profile" style="display:none">
								Visit
							</a>
						<!-- php: } -->
						<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Patients', 'action' => 'chiroSpace'])) { -->
							<a id="viewPatientVisitHeader" title="Add or View Visits" href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'chiroSpace',]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Visit') --> btn-xs patient_view_patient_profile" style="display:none">
								Visit
							</a>
						<!-- php: } -->
						<a id="editPatientHeader" href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'editPatient',]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs patient_edit_patient_details" style="display:none">
							Edit
						</a>
						<a id="viewPatientHeader" href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient',]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info" style="display:none">
							View
						</a>
						<a id="labPatientHeader" href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'findLabs',]) -->" class="btn btn-danger btn-xs" style="display:none">
							Lab
						</a>
					</div>
				</div>
				<!-- php: = $this->Form->end(); -->
			</ul>
			
			

			<!-- start mobile menu -->
			<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
				<span></span>
			</a>
			
		   <!-- end mobile menu -->
			<!-- start header menu -->
			<div class="top-menu">
			    <ul class="nav navbar-nav pull-right">
					<!-- <li class="dropdown dropdown-extended dropdown-notification">
			            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
			                data-close-others="true">
			                <i class="material-icons" data-toggle="tooltip" data-placement="top" title="Kindly set up your availability for consultations at profile update section">exposure</i>
			            </a>
			            <ul class="dropdown-menu">
			                <li class="external">
			                    <span class="">Kindly set up your availability to be booked for consultations at profile update section. Click <a href="">here</a></span>
			                </li>
			            </ul>
			        </li> -->
					<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Accounts', 'action' => 'index'])) { -->
			        <li class="dropdown dropdown-extended dropdown-notification">
			            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
			                data-close-others="true">
			                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h171q8-31 33.5-51.5T480-888q34 0 59.5 20.5T573-816h171q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm264-552q10.4 0 17.2-6.8 6.8-6.8 6.8-17.2 0-10.4-6.8-17.2-6.8-6.8-17.2-6.8-10.4 0-17.2 6.8-6.8 6.8-6.8 17.2 0 10.4 6.8 17.2 6.8 6.8 17.2 6.8ZM216-216v-528 528Z"/></svg>
			                <span class="<!-- php: = $complianceTasksCount > 0 ? 'notify' : '' -->"></span>
			                <span class="<!-- php: = $complianceTasksCount > 0 ? 'heartbeat' : '' -->"></span>
			            </a>
			            <ul class="dropdown-menu">
			                <li class="external">
			                    <h3><span class="bold">Compliance</span></h3>
			                    <span class="notification-label bg-warning">Pending <!-- php: = $complianceTasksCount --></span>
								
			                </li>
			                <li>
			                    <ul class="dropdown-menu-list small-slimscroll-style" data-handle-color="#637283">
								<!-- php: foreach($compliancePendingTasks as $pending_task){ -->
											<li>
												<a href="<!-- php: = $this->Url->build(['controller' => 'Accounts', 'action' => 'requiredActions']) -->">
													<h6 class="font-weight-bold"><!-- php: = $pending_task->title --> <span class="badge <!-- php: if($pending_task->priority == "HIGH"){ echo "bg-danger"; } else if($pending_task->priority == "MEDIUM"){ echo "bg-primary"; } else if($pending_task->priority == "LOW"){ echo "bg-success"; } -->"><!-- php: = $pending_task->priority --> Priority</span> <br/>
													        <small style="border-radius:5px;font-size:12px;"
                                                        class="bg-success font-weight-bold p-1 px-2"> 
														<!-- php: if($pending_task->account_id != 0){ -->
														<i class="fa fa-school"></i> 
														<!-- php: = $pending_task->account->account_name == null ? ucwords(strtolower($pending_task->account->banks_list->name)) : ucwords(strtolower($pending_task->account->account_name)) -->
														<!-- php: } else{ -->
															 Refund
														<!-- php: } -->
														</small>
									</h6>   
													
													<small class="text-secondary">
													<!-- php: if($pending_task->account_id != 0){ -->
													<!-- php: = $pending_task->title --> recorded at <!-- php: = $pending_task->account->account_name == null ? ucwords(strtolower($pending_task->account->banks_list->name)) : ucwords(strtolower($pending_task->account->account_name)) --> on <!-- php: = $pending_task->date_created --> and is 
                                                        valid within <!-- php: = $pending_task->due_date -->
													<!-- php: } else { -->
														Refund recorded at <!-- php: = $pending_task->due_date --> and is valid within <!-- php: = $pending_task->due_date -->
													<!-- php: } -->
													</small>
												</a>
											</li>
										<!-- php: } -->
			                    </ul>
			            </ul>
			        </li>
			        <li class="dropdown dropdown-extended dropdown-notification">
						<a href="mailto:support@firstline24.atlassian.net" class="dropdown-toggle" data-close-others="true">
			                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h624q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H168Zm312-240L168-611v347h624v-347L480-432Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z"/></svg>
			            </a>
			        </li>
					<!-- php: } -->
			



					<!-- php: if($this->AuthUser->hasAccess(['controller' => 'VisitFollowups', 'action' => 'index'])) { -->
						<!-- start notification dropdown -->
						<li class="dropdown dropdown-extended dropdown-notification" >
							<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
								<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v53q85 16 138.5 82T720-528v240h48v72H192Zm288-276Zm-.21 396Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21ZM312-288h336v-240q0-70-49-119t-119-49q-70 0-119 49t-49 119v240Z"/></svg>
								<span class="<!-- php: = $notificationFollowUpsCount > 0 ? 'notify' : '' -->"></span>
								<span class="<!-- php: = $notificationFollowUpsCount > 0 ? 'heartbeat' : '' -->"></span>
								<!-- php: if($this->request->getSession()->read()['Auth']['User']['role']['id'] == 1 && $consultation_notification == 1){ -->
									<span class="heartbeat"></span>
								<!-- php: } -->
							</a>
							<ul class="dropdown-menu">
								<li class="external">
									<!-- php: if($this->request->getSession()->read()['Auth']['User']['role']['id'] == 1 && $consultation_notification == 1){ -->
										<span class="">Kindly set up your availability to be booked for consultations.</span>
										<hr>
									<!-- php: } -->
									<h3><span class="bold">Follow Ups</span></h3>
									<span class="notification-label purple-bgcolor">Pending <!-- php: = $notificationFollowUpsCount --></span>
								</li>
								<li>
									<ul class="dropdown-menu-list small-slimscroll-style" data-handle-color="#637283">
										<!-- php: foreach ($notificationFollowUps as $patientFollowup): -->
											<!-- php: $patientVisit = $patientFollowup->patient_visit; if (isset($patientVisit)): -->
											<li>
												<a href="<!-- php: = $this->Url->build(['controller' => 'Followups']) -->">
													<span class="time"><!-- php: =$patientFollowup->date_of_visit --></span>
													<span class="details">
													<span class="notification-icon circle deepPink-bgcolor"><i class="fa fa-user o"></i></span><!-- php: = $patientVisit->has('patient') ? $patientVisit->patient->first_name . ' ' . $patientVisit->patient->last_name : '' --></span>
												</a>
											</li>
										<!-- php: endif; endforeach; -->

									</ul>
									<div class="dropdown-menu-footer" style="<!-- php: = $notificationFollowUpsCount <= 0 ? 'display:none;' : '' -->">
										<a href="<!-- php: = $this->Url->build(['controller' => 'Followups']) -->"> All Follow Ups </a>
									</div>
								</li>
							</ul>
						</li>
					<!-- php: } -->
					
					<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Inventory', 'action' => 'index'])) { -->
						<!-- start notification dropdown -->
						<li class="dropdown dropdown-extended dropdown-notification" >
							<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
								<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M275.79-384q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm0-132q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm0-132q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM384-384h240v-72H384v72Zm0-132h336v-72H384v72Zm0-132h336v-72H384v72ZM96-96v-696q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v480q0 29.7-21.15 50.85Q821.7-240 792-240H240L96-96Zm114-216h582v-480H168v522l42-42Zm-42 0v-480 480Z"/></svg>
								<span class="<!-- php: = $notificationExpiredDrugsCount || $notificationExpiringDrugsCount > 0 ? 'notify' : '' -->"></span>
								<span <!-- php: = $notificationExpiredDrugsCount > 0 ? 'class="heartbeat red" style="border-color: #ff0000"' : ($notificationExpiringDrugsCount > 0 ? 'class="heartbeat yellow" style="border-color: #ffff00"' : '') --> ></span>
							</a>
							<ul class="dropdown-menu">
								<li class="external">
									<h3><span class="bold">Expired Drugs</span></h3>
									<span class="notification-label red">Expired <!-- php: = $notificationExpiredDrugsCount --></span>
								</li>
								<li>
									<ul class="dropdown-menu-list small-slimscroll-style" data-handle-color="#637283">
										<!-- php: foreach ($notificationExpiredDrugs as $expiredDrug): -->
											<li>
												<a href="<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'drugStockFiltered', 'expired']) -->">
													<span class="time"><!-- php: =$expiredDrug->expiry_date->i18nFormat('Y-MM-dd'); --></span>
													<span class="details">
													<span class="notification-icon circle red"></span><!-- php: = $expiredDrug->drug->name --></span>
												</a>
											</li>
										<!-- php: endforeach; -->

									</ul>
									<div class="dropdown-menu-footer" style="<!-- php: = $notificationExpiredDrugsCount <= 0 ? 'display:none;' : '' -->">
										<a href="<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'drugStockFiltered', 'expired']) -->"> All Expired Drugs </a>
									</div>
								</li>
								<li class="external">
									<h3><span class="bold">Expiring Drugs</span></h3>
									<span class="notification-label yellow">Expiring <!-- php: = $notificationExpiringDrugsCount --></span>
								</li>
								<li>
									<ul class="dropdown-menu-list small-slimscroll-style" data-handle-color="#637283">
										<!-- php: foreach ($notificationExpiringDrugs as $expiringDrug): -->
											<li>
												<a href="<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'drugStockFiltered', 'expiring']) -->">
													<span class="time"><!-- php: =$expiringDrug->expiry_date->i18nFormat('Y-MM-dd'); --></span>
													<span class="details">
													<span class="notification-icon circle yellow"></span><!-- php: = $expiringDrug && $expiringDrug->has('drug') ? $expiringDrug->drug->name : '' --></span>
												</a>
											</li>
										<!-- php: endforeach; -->

									</ul>
									<div class="dropdown-menu-footer" style="<!-- php: = $notificationExpiringDrugsCount <= 0 ? 'display:none;' : '' -->">
										<a href="<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'drugStockFiltered', 'expiring']) -->"> All Expiring Drugs </a>
									</div>
								</li>
								<li class="external">
									<h3><span class="bold">Reorder Alert</span></h3>
									<span class="notification-label pink">Reorder Alerts <!-- php: = sizeof($reorderAlert) --></span>
								</li>
								<li>
									<ul class="dropdown-menu-list small-slimscroll-style" data-handle-color="#FF1493">
										<!-- php: foreach ($reorderAlert as $reorderDrug): -->
											<li>
												<a href="<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'drugFiltered', 'reorder']) -->">
													<span class="time"><!-- php: = $reorderDrug->total_quantity . ' of ' . $reorderDrug->reorder_level; --></span>
													<span class="details">
													<span class="notification-icon circle pink"></span><!-- php: = $reorderDrug->name --></span>
												</a>
											</li>
										<!-- php: endforeach; -->

									</ul>
									<div class="dropdown-menu-footer" style="<!-- php: = sizeof($reorderAlert) <= 0 ? 'display:none;' : '' -->">
										<a href="<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'drugFiltered', 'reorder']) -->"> All reorder Alerts </a>
									</div>
								</li>
							</ul>
						</li>
					<!-- php: } -->
					<li class="dropdown dropdown-extended dropdown-notification" >
							<!-- php: if($ttl_hours_expected_today != 0){ if(!$this->request->getSession()->check('id')){ echo '<a href="javascript:" class="dropdown-toggle" data-close-others="true" data-toggle="modal" data-target="#signin-time"> Clock In </a>'; } else{ echo ' ... -->
							<ul class="dropdown-menu">
								<li>
									<div class="dropdown-menu-footer" id="notificationDrop" style="<!-- php: = $generalNotificationsCount <= 0 ? 'display:none;' : '' -->">
										<a href="<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'index']) -->"> All Notifications </a>
									</div>
								</li>
							</ul>
						</li>
					<!-- start notification dropdown -->
					<li class="dropdown dropdown-extended dropdown-notification" >
						<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M360-816v-72h240v72H360Zm84 432h72v-240h-72v240Zm36 288q-70 0-130.92-26.51-60.92-26.5-106.49-72.08-45.58-45.57-72.08-106.49Q144-362 144-432q0-70 26.51-130.92 26.5-60.92 72.08-106.49 45.57-45.58 106.49-72.08Q410-768 479.56-768q58.28 0 111.86 19.5T691-694l52-51 50 50-51 52q35 45 54.5 98.81T816-431.86q0 69.86-26.51 130.78-26.5 60.92-72.08 106.49-45.57 45.58-106.49 72.08Q550-96 480-96Zm0-72q110 0 187-77t77-187q0-110-77-187t-187-77q-110 0-187 77t-77 187q0 110 77 187t187 77Zm0-264Z"/></svg>
						</a>
						<ul class="dropdown-menu" style="width: 400px">
						<form>
						<li class="external bg-<!-- php: = $theme2 --> p-0">
								<h5 class="ml-2 mt-0 pt-3"><span class="bold">Shift Information</span></h5>
								<h6 class="ml-2 mt-2"><span class="bold"><!-- php: = $fullName --> (<!-- php: = $sessionRole -->)</span></h6>
							</li>
							<li>
								<ul class="dropdown-menu-list small-slimscroll-style" data-handle-color="#637283">
									<li>
										<div class="container-fluid p-3">
										<div id="demo-daily-events"></div>
										</div>
									</li>
									
									
								</ul>
							</li>
							</form>
						</ul>
					</li>

					<!-- php: // if($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'index']) || $this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'index'])) { -->
					<!-- php: if(1 == 2 && $this->AuthUser->hasRole('labtechnician') || $this->AuthUser->hasRole('pharmacist') || $this->AuthUser->hasRole('doctor') || $this->AuthUser->hasRole('superadmin')) { -->
						<!-- start notification dropdown -->
						<li class="dropdown dropdown-extended dropdown-notification" title="Notifications (<!-- php: = $generalNotificationsCount -->)" >
							<a href="<!-- php: = $this->Url->build(['controller' => 'Notifications', 'action' => 'index']) -->" class="dropdown-toggle" data-close-others="true">
								<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M120-144q-29.7 0-50.85-21.15Q48-186.3 48-216v-192q0-29.7 21.15-50.85Q90.3-480 120-480h24v-148q-21-8-34.5-26.5T96-696v-48q0-29.7 21.15-50.85Q138.3-816 168-816h216q29.7 0 50.85 21.15Q456-773.7 456-744v48q0 23-13.5 41.5T408-628v148h144v-152q-21-8-34.5-26.5T504-700v-44q0-29.7 21.15-50.85Q546.3-816 576-816h216q29.7 0 50.85 21.15Q864-773.7 864-744v44q0 23-13.5 41.5T816-632v152h24q29.7 0 50.85 21.15Q912-437.7 912-408v192q0 29.7-21.15 50.85Q869.7-144 840-144H120Zm456-552h216v-48H576v48Zm-408 0h216v-48H168v48Zm456 216h120v-148H624v148Zm-408 0h120v-144H216v144Zm-96 264h720v-192H120v192Zm48-480v-48 48Zm408 0v-48 48ZM120-216v-192 192Z"/></svg>
								<sup style="top: -0.2em;" id="notificationElement" class="badge badge-<!-- php: = $generalNotificationsCount > 0 ? 'primary' : 'secondary' -->"><!-- php: = $generalNotificationsCount --></sup>
							</a>
							<ul class="dropdown-menu">
								<li>
									<div class="dropdown-menu-footer" id="notificationDrop" style="<!-- php: = $generalNotificationsCount <= 0 ? 'display:none;' : '' -->">
										<a href="<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'index']) -->"> All Notifications </a>
									</div>
								</li>
							</ul>
						</li>
					<!-- php: } -->
					
					<!-- </?php if($this->AuthUser->hasAccess(['controller' => 'Admin', 'action' => 'index'])) { ?> -->
					<li class="dropdown dropdown-extended dropdown-notification" >
						<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="m403-96-22-114q-23-9-44.5-21T296-259l-110 37-77-133 87-76q-2-12-3-24t-1-25q0-13 1-25t3-24l-87-76 77-133 110 37q19-16 40.5-28t44.5-21l22-114h154l22 114q23 9 44.5 21t40.5 28l110-37 77 133-87 76q2 12 3 24t1 25q0 13-1 25t-3 24l87 76-77 133-110-37q-19 16-40.5 28T579-210L557-96H403Zm59-72h36l19-99q38-7 71-26t57-48l96 32 18-30-76-67q6-17 9.5-35.5T696-480q0-20-3.5-38.5T683-554l76-67-18-30-96 32q-24-29-57-48t-71-26l-19-99h-36l-19 99q-38 7-71 26t-57 48l-96-32-18 30 76 67q-6 17-9.5 35.5T264-480q0 20 3.5 38.5T277-406l-76 67 18 30 96-32q24 29 57 48t71 26l19 99Zm18-168q60 0 102-42t42-102q0-60-42-102t-102-42q-60 0-102 42t-42 102q0 60 42 102t102 42Zm0-144Z"/></svg>
						</a>
						<ul class="dropdown-menu" style="width: auto">
							<li class="external">
								<h3><span class="bold">Management</span></h3>
							</li>
							<li>
								<ul class="dropdown-menu-list small-slimscroll-style" data-handle-color="#637283">
									
									<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Settings', 'action' => 'index'])) { -->
										<li>
											<a href="<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'index']) -->">
												<span class="details">Facility Settings</span>
											</a>
										</li>
									<!-- php: } -->
									
									<!-- php: if($this->AuthUser->hasAccess(['controller' => 'CashBook', 'action' => 'index'])) { -->
										<li>
											<a href="<!-- php: = $this->Url->build(['controller' => 'CashBook', 'action' => 'index']) -->">
												<span class="details">Price Book</span>
											</a>
										</li>
									<!-- php: } -->
									
									<!-- php: if($this->AuthUser->hasAccess(['controller' => 'ManageInsurances', 'action' => 'index'])) { -->
										<li>
											<a href="<!-- php: = $this->Url->build(['controller' => 'ManageInsurances', 'action' => 'index']) -->">
												<span class="details">Payers/Sponsors</span>
											</a>
										</li>
									<!-- php: } -->
									
									<!-- php: if($this->AuthUser->hasAccess(['controller' => 'ManageSecurity', 'action' => 'index'])) { -->
										<li>
											<a href="<!-- php: = $this->Url->build(['controller' => 'ManageSecurity', 'action' => 'index']) -->">
												<span class="details">Security</span>
											</a>
										</li>
									<!-- php: } -->
									
									<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Sms', 'action' => 'index'])) { -->
										<li>
											<a href="<!-- php: = $this->Url->build(['controller' => 'Sms', 'action' => 'index']) -->">
												<span class="details">SMS</span>
											</a>
										</li>
									<!-- php: } -->
									
									<!-- php: if($this->AuthUser->hasAccess(['controller' => 'ManageWards', 'action' => 'index'])) { -->
										<li>
											<a href="<!-- php: = $this->Url->build(['controller' => 'ManageWards', 'action' => 'index']) -->">
												<span class="details">Wards</span>
											</a>
										</li>
									<!-- php: } -->
									<!-- php: if($this->AuthUser->hasAccess(['controller' => 'Settings', 'action' => 'incallQueue'])) { -->
										<li>
											<a href="<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'incallQueue']) -->">
												<span class="details">Call System</span>
											</a>
										</li>
									<!-- php: } -->


									<li>
										<a href="<!-- php: = $this->Url->build(['controller' => 'InsuranceProfiles', 'action' => 'index']) -->">
											<span class="details">Insurance</span>
										</a>
									</li>
									
								</ul>
							</li>
						</ul>
					</li>
					<!-- </?php } ?> -->
					
					<!-- start manage user dropdown -->
					<!-- php: $sex = $this->request->getSession()->read()['Auth']['User']['gender_id']; -->
					<li class="dropdown dropdown-user">
						<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<!--<img alt="" class="img-circle " src="../assets/img/dp.jpg" />-->
							<!-- php: if($sex == 1){ echo $this->Html->image('../assets/img/dp.jpg',['class'=>'img-circle']); } else { echo $this->Html->image('../assets/img/nurse-100.jpg',['class'=>'img-circle']); } -->
						</a>
						<ul class="dropdown-menu dropdown-menu-default">
							<li>
								<a href="<!-- php: =$this->Url->build(['controller'=>'Users','action'=>'updateProfile']) -->">
									<i class="fa fa-user"></i> Profile </a>
							</li>
							
							<li>
								<a href="<!-- php: =$this->Url->build(['controller'=>'Users','action'=>'changePassword']) -->">
									<i class="fa fa-lock"></i> Change Password </a>
							</li>
							
							<li class="divider"> </li>
							<li>
								<a href="<!-- php: =$this->Url->build(['controller'=>'Users','action'=>'logout']) -->">
									<i class="fa fa-sign-out"></i> Log Out </a>
							</li>
						</ul>
					</li>
				</ul>
		
				
			</div>

			</div>
		</div>
		<!-- php: if($this->request->getSession()->check('id')){ -->
		<div class="modal fade" id="signout-time" tabindex="-1" aria-labelledby="signout-time" aria-hidden="true" aria-hidden="true">
<div class="modal-dialog  modal-dialog-centered" role="document">
	<div class="modal-content">
	 <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
         <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="text-slate-900 my-0">Clock Out</h4>
					<div>
						<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
					</div> 
			</div>	   
	</div>
	    
		 <!-- php: = $this->Form->create($timesheet, ['url' => ['controller' => 'TimeSheet', 'action' => 'addClockout', $this->request->getSession()->check('id') ? $this->request->getSession()->read('id') : null ]]); -->
	<div class="container bg-white p-2">
		<div class="container-fluid">
    
	<div class="row mt-4 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Name:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="text" value="<!-- php: = $fullName -->" name="name" class="form-control form-control-sm" readonly>
        </div>
	</div>
	<div class="row mt-4 mb-3 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Department:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
		<input type="text" value="<!-- php: = $dep->department != null ? $dep->department->name : 'None' -->" name="department" class="form-control form-control-sm" readonly>
        </div>
	</div>
	<div class="row mt-4 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Role:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="text" value="<!-- php: = $sessionRole -->" name="role" class="form-control form-control-sm" readonly>
        </div>
	</div>
	<div class="row mt-4 mb-3 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Time Out:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="datetime-local" name="end" id="curtime" class="form-control form-control-sm" readonly>
			<input type="hidden" name="status" value="1">
			
        </div>
	</div>
	<div class="row mt-4 mb-3 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Total Hours:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
		<input type="text" class="form-control" value="8 hours" readonly>
        </div>
	</div>
	<!-- <button id="start-btn" type="button" name="start">start</button> -->
		</div>
		 </div>
<div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
	<div class="d-flex align-items-center py-1 justify-content-end">
    <input name="color" type="hidden" value="#3498db">
    <input name="category" type="hidden" value="work">
		<button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
		<!-- php: = $this->Form->end(); -->
		<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
	</div>
</div>
</div>
						</div>
						</div>
						</div>
						 <!-- php: } else { -->
<div class="modal fade" id="signin-time" tabindex="-1" aria-labelledby="signin-time" aria-hidden="true" aria-hidden="true">
<div class="modal-dialog  modal-dialog-centered" role="document">
	<div class="modal-content">
	 <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
         <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="text-slate-900 my-0">Clock In</h4>
					<div>
						<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
					</div> 
			</div>	   
	</div>
		 <!-- php: = $this->Form->create($timesheet, ['url' => ['controller' => 'TimeSheet', 'action' => 'addClockIn']]); -->
	<div class="container bg-white p-2">
		<div class="container-fluid">
    
	<div class="row mt-4 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Name:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="text" value="<!-- php: = $fullName -->" name="name" class="form-control form-control-sm" readonly>
			<input type="hidden" value="<!-- php: = $this->request->getSession()->read()['Auth']['User']['id'] -->" name="user_id"/>
        </div>
	</div>
	<div class="row mt-4 mb-3 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Department:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
		<input type="text" value="<!-- php: = ($dep && $dep->department != null)? $dep->department->name : 'None' -->" name="department" class="form-control form-control-sm" readonly>
        </div>
	</div>
	<div class="row mt-4 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Role:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="text" value="<!-- php: = $sessionRole -->" name="role" class="form-control form-control-sm" readonly>
        </div>
	</div>
	<div class="row mt-4 mb-3 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Time In:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="datetime-local" name="start" id="curtime" class="form-control form-control-sm" readonly>
			<input type="hidden" name="status" value="0">
			<input type="hidden" name="end" value="">
        </div>
	</div>
	<div class="row mt-4 mb-3 pl-2">
	    <div class="col-md-3 p-1">
			<h5>Total Hours:</h5>
		</div>
		<div class="col-md-7 d-flex align-items-center p-1">
			<input type="text" name="total_hours" class="form-control" value="<!-- php: = $ttl_hours_expected_today -->" readonly>
        </div>
	</div>
	<!-- <button id="start-btn" type="button" name="start">start</button> -->
		</div>
		 </div>
<div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
	<div class="d-flex align-items-center py-1 justify-content-end">
    <input name="color" type="hidden" value="#3498db">
    <input name="category" type="hidden" value="work">
		<button <!-- php: = $ttl_hours_expected_today == 0 ? 'disabled' : '' --> style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
		<!-- php: = $this->Form->end(); -->
		<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
	</div>
</div>
</div>
</div>
<!-- php: } -->
</div>
	</div>
<!-- end header -->

<!-- <script>
	// function toggleClock(this){
       
	// }
	setInterval(() => {
		var now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
document.getElementById('curtime').value = now.toISOString().slice(0,16);
	}, 100);

var inst = mobiscroll.eventcalendar('#demo-daily-events', {
    theme: 'ios',
    themeVariant: 'light',
	data: <!-- php: // json_encode($schedules_data) -->,
    view: {
        calendar: { type: 'week' },
        agenda: { type: 'day' }
    },
        onEventClick: function (event, inst) {
            mobiscroll.toast({
                message: event.event.title
            });
        }
});
</script> -->

<div>
	<style>

		.chat-box {
			position: fixed;
			bottom: 80px;
			right: 20px;
			width: 300px;
			height: 400px;
			background-color: white;
			border: 1px solid #ccc;
			border-radius: 10px;
			display: none;
			flex-direction: column;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			z-index: 2000;
		}

		.chat-header {
			background-color: #007bff;
			color: white;
			padding: 10px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.chat-body {
			flex: 1;
			padding: 10px;
			overflow-y: auto;
		}

		.chat-footer {
			padding: 10px;
			border-top: 1px solid #ccc;
			display: flex;
			align-items: center;
		}

		.chat-footer input[type="text"] {
			flex: 1;
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 20px;
			margin-right: 10px;
		}

		.chat-footer button {
			background-color: #007bff;
			color: white;
			padding: 10px 20px;
			border: none;
			border-radius: 20px;
			cursor: pointer;
		}
	</style>
	<div class="chat-button" style="
		position: fixed; bottom: 70px; right: 20px; background-color: #007bff; color: white; padding: 10px 20px;
		border-radius: 30px; cursor: pointer; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); z-index: 2000; 
		" onClick="toggleChatBox()" >
		<a  class="" id="notificationsCounter">0</a>	
	</div>
	<!-- php: if ($this->AuthUser->hasAccess(['controller' => 'PatientVisits', 'action' => 'reorderQueue'])): -->
		<div class="chat-button" style="
			position: fixed; bottom: 70px; right: 80px; background-color: #007bff; color: white; padding: 10px 12px;
			border-radius: 30px; cursor: pointer; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); z-index: 2000; 
			" onClick="showVisitQueue()" >
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M480-480q-17 0-28.5-11.5T440-520q0-17 11.5-28.5T480-560q17 0 28.5 11.5T520-520q0 17-11.5 28.5T480-480Zm0-240q-17 0-28.5-11.5T440-760q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760q0 17-11.5 28.5T480-720Zm80 120q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680q17 0 28.5 11.5T600-640q0 17-11.5 28.5T560-600Zm40 120q-17 0-28.5-11.5T560-520q0-17 11.5-28.5T600-560q17 0 28.5 11.5T640-520q0 17-11.5 28.5T600-480Zm0-240q-17 0-28.5-11.5T560-760q0-17 11.5-28.5T600-800q17 0 28.5 11.5T640-760q0 17-11.5 28.5T600-720Zm80 120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm40 120q-17 0-28.5-11.5T680-520q0-17 11.5-28.5T720-560q17 0 28.5 11.5T760-520q0 17-11.5 28.5T720-480Zm0-240q-17 0-28.5-11.5T680-760q0-17 11.5-28.5T720-800q17 0 28.5 11.5T760-760q0 17-11.5 28.5T720-720Zm80 120q-17 0-28.5-11.5T760-640q0-17 11.5-28.5T800-680q17 0 28.5 11.5T840-640q0 17-11.5 28.5T800-600Zm40 120q-17 0-28.5-11.5T800-520q0-17 11.5-28.5T840-560q17 0 28.5 11.5T880-520q0 17-11.5 28.5T840-480Zm0-240q-17 0-28.5-11.5T800-760q0-17 11.5-28.5T840-800q17 0 28.5 11.5T880-760q0 17-11.5 28.5T840-720Zm-42 600q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
		</div>
	<!-- php: endif; -->
	<div class="chat-box" id="chatBox">
		<div class="chat-header">
			<span>Search</span>
			<div>
				<button data-toggle="modal" data-target="#notificationsPopup" class='btn btn-xs btn-info mr-1'>maximize</button>
				<button onClick="toggleChatBox()" class='btn btn-xs btn-info pb-1' style="border-radius: 10px ">X</button>
			</div>
		</div>
		<div class="chat-body" id="chat_body_html">


		</div>
		<div class="chat-footer">
			<input type="text" class="form-control" placeholder="search">
		</div>
	</div>
</div>

<audio id="audio_player" preload="auto" style="display: none"></audio>
<audio id="audio_player1" preload="auto" style="display: none"></audio>
<audio id="queue_audio_player" preload="auto" style="display: none"></audio>
<audio id="queue_audio_player1" preload="auto" style="display: none"></audio>

<div class="modal fade" id="notificationsPopup" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="container px-0 border border-2 border-primary">
				<div class="container-fluid pr-0 bg-primary">
				<div class="d-flex align-items-center justify-content-between">
					<h4 class="text-slate-900 my-0">Doctor Notifications</h4>
					<div>
						<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
					</div>
				</div>
				</div>
				<div class="container bg-white p-2">
					<div class="container-fluid">
					
						<div class="row">
							<div id="requestServicesTableBodyInfo">

							</div>
						</div>
					</div>
				</div>
				<div class="chat-footer">
					<input type="text" class="form-control" placeholder="search">
				</div>
				<div class="container-fluid pr-0 bg-primary">
					<div class="d-flex align-items-center py-1 justify-content-end">
						<button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> </button>

						<button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="queue_manager_modal" tabindex="-1" role="dialog"
	aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Call Queue</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body queue_manager" style="margin: 0">


			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="scan-file-viewer" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header d-flex justify-content-between">
				<h4 class="modal-title">Files For Scan: </h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>

			</div>
			<div class="modal-body view-scan-file">

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="patient_dets_modal" tabindex="-1" role="dialog"
    aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="min-width:1250px;">
        <div class="modal-content">
            <div class="modal-body view_patient_dets" style="margin: 0; padding-top: 0">


            </div>
        </div>
    </div>
</div>

<script>
	const viewScanFiles_link = "<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'scanTestResult']) -->/"
	const getNotifications_link = "<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'getNotifications']) -->"
	const remindRoutineCare_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'remindRoutineCare']) -->"
	const deliverFacilitySms_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'deliverFacilitySms']) -->"
	const retrieveCallPatient_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'retrieveCallPatient']) -->"
	const callNextPatientInQueue_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'callNextPatientInQueue']) -->"
	const markAsRead_link = "<!-- php: = $this->Url->build(['controller' => 'Notifications', 'action' => 'markAsRead']) -->/"
	const fetchDoctorNotifs_link = "<!-- php: = $this->Url->build(['controller' => 'Notifications', 'action' => 'getDoctorNotifs']) -->"
	const freeUserInQueueManager_link = '<!-- php: =$this->Url->build(['controller'=>'PatientVisits','action'=>'freeUserInQueueManager']) -->/'
	const noShowInQueueManager_link = '<!-- php: =$this->Url->build(['controller'=>'PatientVisits','action'=>'noShowInQueueManager']) -->/'
	const searchPredictivePatientName_link = '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'searchPredictivePatientName']) -->'
	const processNotification_link = "<!-- php: =$this->Url->build(['controller'=>'Notifications', 'action'=>'processNotification']) -->/"

	const getQueueManager_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getQueueManager', ]) -->"
	var subscribedLocations = <!-- php: = json_encode($subscribedLocationIds) -->;
</script>
<!-- php: = $this->Html->script('../assets/js/pages/header.js') -->

<script>

	setTimeout(async () => {
		const resp = await fetch('<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'getSubscribedLocations']) -->/');
		if (!resp.ok) {
			console.error("Locations not fetched")
		}
		const data = await resp.json();
		subscribedLocations = data
		callNewPatient()
	}, 10000)
	setTimeout(async () => {
		fetchDoctorNotifs()
	}, 10000)
	setInterval(async () => {
		fetchDoctorNotifs()
	}, 120000);

	setInterval(async () => {
		try {
			const resp = await fetch('<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'checkIsLoggedIn']) -->/');
			if (resp.status === 401) {
				alert("Your session expired. Please log in again.");
				window.location.reload(true); // Force reload from server
			}
		} catch (err) {
			console.error("Session check failed:", err);
			// Optionally, you could show a warning or retry
		}
	}, 3 * 60 * 1000); // every 3 minutes

</script>
`;

export default function ElementElementHeader() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
