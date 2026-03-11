const rawHtml = `
<!-- php: $viewSetting = $viewSettings != null ? $viewSettings->first() : null; -->	

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Facility</span>
			</div>
			
			<div style="float: right">
				<a href="<!-- php: =$this->Url->build(['controller'=>'Settings','action'=>'editSetting', $viewSetting != null ? $viewSetting->id : 1]) -->" class="btn btn-primary btn-sm patient_edit_patient_details">
					Edit Facility Details
				</a>
			</div>
			
			<div style="clear: both"></div>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active" id="departments_view">
					
					<div class="col-md-12">
						<div class="card-head legend-head">
							<header>Facility Details</header>
						</div>
											
						<!-- php: if ($viewSetting != null) { -->
							<ul class="list-group list-group-unbordered">
								<li class="list-group-item">
									<b>Name </b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->institution --></div>
								</li>
								<li class="list-group-item">
									<b>Address </b>
									<div class="profile-desc-item pull-right"><!-- php: = $this->Text->autoParagraph($viewSetting->address) --></div>
								</li>
								<li class="list-group-item">
									<b>General Service Discount </b>
									<div class="profile-desc-item pull-right"><!-- php: = $this->Number->precision($viewSetting->service_discount, 2) -->%</div>
								</li>
								<li class="list-group-item">
									<b>General Drug Discount </b>
									<div class="profile-desc-item pull-right"><!-- php: = $this->Number->precision($viewSetting->drug_discount, 2) -->%</div>
								</li>
							</ul>

							<div class="card-head legend-head" style="margin-top: 20px">
								<header>Contact Information</header>
							</div>
							<ul class="list-group list-group-unbordered">
								<li class="list-group-item">
									<b>Phone </b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->phone1 --></div>
								</li>
								<li class="list-group-item">
									<b>Phone Alt</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->phone2 --></div>
								</li>
								<li class="list-group-item">
									<b>Email </b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->email1 --></div>
								</li>
								<li class="list-group-item">
									<b>Email Alt</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->email2 --></div>
								</li>
							</ul>

							<div class="card-head legend-head" style="margin-top: 20px">
								<header>Configurations</header>
							</div>

							<ul class="list-group list-group-unbordered">
								<li class="list-group-item">
									<b>Folders Counter</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->folder_counter --></div>
								</li>
								<li class="list-group-item">
									<b>Folder Number Prefix</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->folder_prefix --></div>
								</li>
								<li class="list-group-item">
									<b>Folder Number Separater</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->folder_separater --></div>
								</li>
								<li class="list-group-item">
									<b>Automate Folder Numbers</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->automate_folder_numbers == 1 ? 'Yes' : 'No' --></div>
								</li>
								<li class="list-group-item">
									<b>Labs Counter</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->lab_counter --></div>
								</li>
								<li class="list-group-item">
									<b>Lab Number Prefix</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->lab_prefix --></div>
								</li>
								<li class="list-group-item">
									<b>Co  Pay</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->co_pay == 0 ? 'Disabled' : 'Enabled'; --></div>
								</li>
								<li class="list-group-item">
									<b>Currency</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->currency --></div>
								</li>
								<li class="list-group-item">
									<b>Refund Approval Mode</b>
									<div class="profile-desc-item pull-right">
										<!-- php: = ($viewSetting->refund_approval_mode == 1) ? "Manual" : (($viewSetting->refund_approval_mode == 2) ? "Automatic" : "Unknown mode"); -->
									</div>
								</li>
							</ul>

							<div class="card-head legend-head" style="margin-top: 20px">
								<header>Tax Settings</header>
							</div>

							<ul class="list-group list-group-unbordered">
								<li class="list-group-item">
									<b>VAT Inclusive</b>
									<div class="profile-desc-item pull-right"><!-- php: = $viewSetting->vat_inclusive == '0' ? 'No' : 'Yes' --></div>
								</li>
								<li class="list-group-item">
									<b>VAT</b>
									<div class="profile-desc-item pull-right"><!-- php: = $this->Number->precision($viewSetting->vat_rate, 2) -->%</div>
								</li>
								<!-- <li class="list-group-item">
									<b>GEFL</b>
									<div class="profile-desc-item pull-right"><!-- php: // $this->Number->precision($viewSetting->gefl, 2) -->%</div>
								</li>
								<li class="list-group-item">
									<b>NHIL</b>
									<div class="profile-desc-item pull-right"><!-- php: // $this->Number->precision($viewSetting->nhil, 2) -->%</div>
								</li> -->
							</ul>

						<!-- php: } -->
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>
`;

export default function ElementElementSettingsFacility() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
