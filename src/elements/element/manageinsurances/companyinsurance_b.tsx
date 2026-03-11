const rawHtml = `
<!-- php: if($partnerCompanies): -->
  <ul class="nav nav-tabs justify-content-center" id="CompanyInsuranceNav">
    <!-- php: foreach($partnerCompanies as $partnerCompany): -->
      <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#companies_nav_<!-- php: =$partnerCompany->id -->" id="company_nav_<!-- php: =$partnerCompany->id -->"><!-- php: = $partnerCompany->company_name --></a></li>
    <!-- php: endforeach -->
  </ul>

  <div class="tab-content">
    <!-- php: foreach ($partnerCompanies as $partnerCompany): -->
      <div class="tab-pane fade" id="companies_nav_<!-- php: =$partnerCompany->id -->">
        <div class="row">
          <div class="borderBox light bordered col-md-12">
            <div class="card  card-box">
              <div class="card-body ">
                <div class="table-scrollable">
                <table class="table table-hover order-column full-width customDataTable">
                  <thead>
                    <tr>
                      <th class="left">Name</th>
                      <th class="left">Location/<br>Address</th>
                      <th class="left">Authorizing/ <br> Relationship Agent</th>
                      <th class="left">Employee/<br>Staff</th>
                      <!-- <th class="left">Tier</th> -->
                      <th class="left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  <!-- php: foreach ($partnerCompany->insurance_profile->insurance_profile_policies as $value): -->
                  
                    <tr class="odd gradeX">
                      <!-- <td class="left"><!-- php: // $value->insurance_profile->insurance_name --></td> -->
                      <td class="left"><!-- php: = $value->name --></td>
                      <td class="left"><!-- php: = $partnerCompany->insurance_profile->directorate --></td>
                      <td class="left"><!-- php: = $partnerCompany->relationship_manager_name -->
                      <td class="left">
                        <a data-toggle="modal" data-target="#list_employees_<!-- php: =$value->id -->" href="javascript:" class="" >Employee List</a>
                      </td>
                      <!-- <td class="left">
                        <!-- php: // $companyInsurances[$value->policy_name] -->
                      </td> -->
                      <td class="left">
                        <!-- php: if ($value->status_id == 2) { -->
                            <!-- php: = $this->Form->postLink(__('Enable'), ['controller'=>'ManageInsurances','action'=>'toggleinsurance',$value->id], ['class' => 'btn btn-success btn-xs']) -->
                        <!-- php: } -->
                        <!-- php: if ($value->status_id == 1) { -->
                            <!-- php: = $this->Form->postLink(__('Disable'), ['controller'=>'ManageInsurances','action'=>'toggleinsurance',$value->id], ['class' => 'btn btn-secondary btn-xs']) -->
                        <!-- php: } -->
                        <!-- php: if (!($value->is_configured)) { -->
                            <a data-toggle="modal" data-target="#configureCompanyInsurance_<!-- php: = $value->id -->" href="javascript:" class="btn btn-xs">
                              Configure
                            </a>
                        <!-- php: } -->
                        <a data-toggle="modal" onclick="setEditMode()" data-target="#editCompanyDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
                          Edit
                        </a>
                        <a data-toggle="modal" onclick="setViewMode()" data-target="#editCompanyDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-info btn-xs">
                          View
                        </a>                
                      </td>
                    </tr>
                      
        
                      
                      
                  <!-- php: endforeach; -->									
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- php: endforeach -->
  </div>



  <!-- php: foreach($partnerCompanies as $partnerCompany): -->
  <!-- php: foreach($partnerCompany->insurance_profile->insurance_profile_policies as $value): -->
    <!-- Configure Company Insurance Profile Policy-->
    <div class="modal fade" id="configureCompanyInsurance_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true"> 
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title" id="editProviderDialogueTitle">Configure <!-- php: = $partnerCompany->company_name --> <!-- php: = $value->name --></h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div class="card card-box">
                <div class="card-body">
                  <div class="form-group row">
                    <label class="control-label col-md-4">Mandatory Company Template
                      <span class="required"> * </span>
                    </label>
                    <div class="col-md-5">
                      <!-- php: = $this->Html->link('Copy of Template File', '/files/template.csv',['download'=>'template.csv']); -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div class="card card-box">
                <div class="card-head">
                  <header>Configure Tier</header>
                </div>
                <div class="card-body" id="bar-parent">
                  <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageInsurances', 'action' => 'configureCompanyInsurance', $value->id], 'type'=>'file', 'class' => 'form-horizontal']) -->
                  <div class="form-body">
                    <div class="form-group row">
                      <label class="control-label col-md-4">Employee CSV file
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <!-- php: =$this->Form->file('company_csv', ['label' =>'company_csv','accept'=>'.csv', 'class'=>"form-control input-height", 'required'=>true]) -->
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="control-label col-md-4">Bundled Services
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <label class="switchToggle">
                          <input name="bundled_service" type="checkbox" checked="checked" id="tcompanyServices_<!-- php: =$value->id -->" onclick="companyServices('tcompanyServices_<!-- php: =$value->id -->', <!-- php: =$value->id -->)">
                          <span class="slider green round"></span>
                        </label>
                      </div>
                    </div>
                    <!-- <div class="form-group row" style="display" id="selectCompanyServices_<!-- php: //$value->id -->">
                      <label class="control-label col-md-4">
                        <div class="col-md-12 mb-4">Services</div>
                        <div class="col-md-12 mb-4">Investigations</div>
                        <div class="col-md-12 mb-4">Items</div>
                      </label>
                      <div class="col-md-5">
                        <div class="col-md-12">
                          <SearchableSelectField name="bundled_services[]" id="" class="input-height selectpicker show-tick all-services" style="" title="Select Services"  data-live-search="true" multiple>

                          </SearchableSelectField>
                        </div>
                        <div class="col-md-12">
                          <SearchableSelectField name="bundled_investigations[]" id="" class="input-height selectpicker show-tick all-investigations" style="" title="Select Services"  data-live-search="true" multiple>

                          </SearchableSelectField>
                        </div>
                        <div class="col-md-12" id="company_<!-- php: // $partnerCompany->id -->_<!-- php: //$value->id -->">
                          <SearchableSelectField name="bundled_items[]" id="" class="input-height selectpicker show-tick all-items" style="" title="Select Services"  data-live-search="true" multiple>

                          </SearchableSelectField>
                        </div>
                      </div>
                    </div> -->
                    </div>
                    <div class="form-actions">
                      <div class="row">
                        <div class="offset-md-3 col-md-9">
                          <button type="submit" class="btn btn-info">Submit</button>
                          <button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
                        </div>
                      </div>
                    </div>
                  <!-- php: = $this->Form->end() -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  <!-- php: endforeach -->
  <!-- php: endforeach -->

  <!-- php: foreach($partnerCompanies as $partnerCompany): -->
  <!-- php: foreach($partnerCompany->insurance_profile->insurance_profile_policies as $insurance_profile_policy): -->
    

    <div class="modal fade" id="list_employees_<!-- php: =$insurance_profile_policy->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="editInvestigationDialogueTitle"><!-- php: = $partnerCompany->company_name --> | <!-- php: =$value->name --> Employees</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">

                <table class="table table-hover order-column full-width">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Gender</th>
                      <!-- <th>Folder Number</th> -->
                      <th>Date of Birth</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- php: foreach($value->patients as $pat): -->
                      <tr>
                        <td><!-- php: = $pat->first_name --></td>
                        <td><!-- php: = $pat->last_name --></td>
                        <td><!-- php: = ($pat->gender_id == 1) ? 'Male':'Female' --></td>
                        <!-- <td><!-- php: $pat->folder_number --></td> -->
                        <td><!-- php: = $pat->date_of_birth --></td>
                        <td><!-- php: = $pat->phone --></td>
                        <td><!-- php: = $pat->email --></td>
                        <!-- <td><a href="#" class="btn btn-xs edit">Edit</a></td> -->
                      </tr>
                    <!-- php: endforeach -->
                  </tbody>
    
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- php: endforeach -->
  <!-- php: endforeach -->

  <!-- php: foreach($partnerCompanies as $partnerCompany): $required = $partnerCompany->insurance_profile; -->
  <!-- php: foreach($required->insurance_profile_policies as $value): -->
    <div class="modal fade" id="editCompanyDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true" >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="">
        <div class="modal-content">
          <div class="modal-header">
          <h4 class="modal-title" id="Edit"><!-- php: = $partnerCompany->company_name --> <!-- php: = $value->name --> 
          Company Insurance
          <button class="btn btn-xs btn-secondary" onclick="$('#edit_private_policy<!-- php: =$value->id -->').show();$('#edit_private_insurance_settings<!-- php: =$value->id -->').hide();"><span class="header_edit">Edit</span> Insurance Profile</button>
          <button class="btn btn-xs btn-primary" onclick="$('#edit_private_insurance_settings<!-- php: =$value->id -->').show();$('#edit_private_policy<!-- php: =$value->id -->').hide();"><span class="header_edit">Edit</span> Insurance Profile Setting</button>
          </h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div class="modal-body">
          
          <div class="row full-width">
            <div class="col-md-12 col-sm-12 col-xl-12" id="edit_private_policy<!-- php: =$value->id -->">
              <div class="card card-box">
                <div class="card-head">
                  <header> <span class="header_edit">Edit</span>  Insurance Policy</header>
                </div>
                <div class="card-body" id="bar-parent">
                  <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageInsurances', 'action' => 'editInsuranceProfilePolicy', $value->id,$required->id], 'class' => 'form-horizontal']) -->
                    <div class="form-body">

                      <div class="form-group row">
                        <label class="control-label col-md-4">Policy Name
                          <span class="required"> * </span>
                        </label>
                        <div class="col-md-5">
                          <input type="text" value="<!-- php: = $value->name -->" name="name" class="form-control" placeholder="Policy Name" required>
                        </div>
                      </div>

                      
                    </div>
                    <div class="form-actions action_edit" >
                      <div class="row">
                        <div class="offset-md-3 col-md-9">
                          <button type="submit" class="btn btn-info">Submit</button>
                          <button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
                        </div>
                      </div>
                    </div>
                  <!-- php: = $this->Form->end() -->
                </div>
              </div>
            </div>
            <!-- php: if (($value->is_configured)): -->
              <div class="col-md-12 col-sm-12 col-xl-12" id="edit_private_insurance_settings<!-- php: =$value->id -->" style="display:none">
                <div class="card card-box">
                  <div class="card-head">
                    <header> <span class="header_edit" >Edit</span>  Insurance Profile Policy Settings</header>
                  </div>
                  <div class="card-body" id="bar-parent">
                    <!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageInsurances', 'action' => 'editCompanyInsuranceProfilePolicySetting', $value->insurance_profile_policy_setting->id], 'class' => 'form-horizontal']) -->
                      <div class="form-body">


                        <div class="form-group row">
                          <label class="control-label col-md-4">Bundled Services
                            <span class="required"> * </span>
                          </label>
                          <div class="col-md-5">
                            <label class="switchToggle">
                              <input name="bundled_service" type="checkbox" checked="checked" id="privacyServices_<!-- php: =$value->id -->" onclick="privateServices('privacyServices_<!-- php: =$value->id -->', <!-- php: =$value->id -->)">
                              <span class="slider green round"></span>
                            </label>
                          </div>
                        </div>
                        <!-- <div class="form-group row" style="display:" id="">
                          <label class="control-label col-md-4">
                            <div class="col-md-12 mb-4">Services</div>
                            <div class="col-md-12 mb-4">Investigations</div>
                            <div class="col-md-12 mb-4">Items</div>
                          </label>
                          <div class="col-md-5">
                            <div class="col-md-12">
                            </div>
                            <div class="col-md-12">
                              <SearchableSelectField name="bundled_services[]" id="selected_company_services_<!-- php: // $partnerCompany->id -->_<!-- php: //$value->id -->" class="input-height selectpicker show-tick all-services" style="" title="Select Services"  data-live-search="true" multiple>

                              </SearchableSelectField>
                            </div>
                            <div class="col-md-12">
                              <SearchableSelectField name="bundled_investigations[]" id="selected_company_investigations_<!-- php: // $partnerCompany->id -->_<!-- php: //$value->id -->" class="input-height selectpicker show-tick all-investigations" style="" title="Select Services"  data-live-search="true" multiple>

                              </SearchableSelectField>
                            </div>
                            <div class="col-md-12">
                              <SearchableSelectField name="bundled_items[]" id="selected_company_items_<!-- php: // $partnerCompany->id -->_<!-- php: //$value->id -->" class="input-height selectpicker show-tick all-items" style="" title="Select Services"  data-live-search="true" multiple>

                              </SearchableSelectField>
                            </div>
                          </div>
                        </div> -->
                      </div>
                      <div class="form-actions action_edit">
                        <div class="row">
                          <div class="offset-md-3 col-md-9">
                            <button type="submit" class="btn btn-info">Submit</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
                          </div>
                        </div>
                      </div>
                    <!-- php: = $this->Form->end() -->
                  </div>
                </div>
              </div>
            <!-- php: else : -->
              <div class="col-md-12 col-sm-12 col-xl-12" id="edit_private_insurance_settings<!-- php: =$value->id -->" style="display:none">
                <h4>Please Configure the Insurance Profile Policy Setting to be able to edit it</h4>
              </div>
            <!-- php: endif -->
          </div>
          </div>
        </div>
      </div>
    </div>
  <!-- php: endforeach; -->
  <!-- php: endforeach; -->

  <script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#CompanyInsuranceNav a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('CompanyInsuranceNav', $(this).attr('href'));
		});
		
		// display last tab if exist
		var manageProvidersLastTab = localStorage.getItem('CompanyInsuranceNav');
		if (manageProvidersLastTab) {
		   $('#CompanyInsuranceNav a[href=' + manageProvidersLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#CompanyInsuranceNav a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>

  <script>
    function companyServices(checker, id) {
      checker = \`#\${checker}\`
      a = $(checker).is(':checked');
  
      targetElm = \`#selectCompanyServices_\${id}\`
      if(a){
        $(targetElm).hide(500);
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
      }
      else {
        $(targetElm).show(500);
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
      }
    }

    function name(params) {
      
    }
  <!-- php: foreach($partnerCompanies as $partnerCompany): $required = $partnerCompany->insurance_profile; -->
  <!-- php: foreach($required->insurance_profile_policies as $value): -->
    id="<!-- php: = $partnerCompany->id -->_<!-- php: =$value->id -->"
    selected_services = []
    selected_investigations = []
    selected_items = []

    all_services = JSON.parse(\`<!-- php: =json_encode($value->insurance_profile_policy_setting->services) -->\`)
    all_investigations = JSON.parse(\`<!-- php: =json_encode($value->insurance_profile_policy_setting->investigations) -->\`)
    all_items = JSON.parse(\`<!-- php: =json_encode($value->insurance_profile_policy_setting->items) -->\`)

    all_services?.forEach(element => {
      selected_services.push(\`#selected_company_services_\${id} option[value=\${element.id}]\`);
    });
    $(selected_services.join(',')).prop("selected", "selected");

    all_investigations?.forEach(element => {
      selected_investigations.push(\`#selected_company_investigations_\${id} option[value=\${element.id}]\`);
    });
    $(selected_investigations.join(',')).prop("selected", "selected");

    all_items?.forEach(element => {
      selected_items.push(\`#selected_company_items_\${id} option[value=\${element.id}]\`);
    });
    $(selected_items.join(',')).prop("selected", "selected");
  <!-- php: endforeach; -->
  <!-- php: endforeach; -->
    
  </script>


<!-- php: else: -->
  <div style="text-align:center">
    No Company Payer/Sponsor Policies available
  </div>
<!-- php: endif -->
`;

export default function ElementElementManageinsurancesCompanyinsuranceB() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
