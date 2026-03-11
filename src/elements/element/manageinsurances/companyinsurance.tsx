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
                        <a href="<!-- php: =$this->Url->build(['controller'=>'ManageInsurances', 'action'=>'editPrivateInsurance', $value->id]) -->"><button type="button" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">Edit</button></a>             
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

    <div class="modal fade" id="list_employees_<!-- php: =$value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
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
    
  </script>


<!-- php: else: -->
  <div style="text-align:center">
    No Company Payer/Sponsor Policies available
  </div>
<!-- php: endif -->
`;

export default function ElementElementManageinsurancesCompanyinsurance() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
