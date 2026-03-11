const rawHtml = `
<!-- php: if (($privateInsuranceProfiles)): -->

  <ul class="nav nav-tabs justify-content-center" id="privateInsuranceNav">
    <!-- php: foreach($privateInsuranceProfiles as $privateInsuranceProfile): -->
      <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#policies_nav_<!-- php: =$privateInsuranceProfile->id -->" id="private_policies_nav_<!-- php: =$privateInsuranceProfile->id -->"><!-- php: = $privateInsuranceProfile->name --></a></li>
    <!-- php: endforeach -->
  </ul>

  <div class="tab-content">
    <!-- php: foreach($privateInsuranceProfiles as $privateInsuranceProfile): -->
      <div id="policies_nav_<!-- php: = $privateInsuranceProfile->id -->" class="tab-pane fade">
        <div class="row">
          <div class="borderBox light bordered col-md-12">
            <div class="card  card-box">
              <div class="card-body ">
                <div class="table-scrollable">
                <table class="table table-hover order-column full-width customDataTable">
                  <thead>
                    <tr>
                      <th class="left">Name</th>
                      <th class="left">Accreditation Number</th>
                      <th class="left">HCP/ <br> Prescription Level</th>
                      <th class="left">Copay</th>
                      <th class="left">Direcorate</th>
                      <th class="left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  <!-- php: foreach ($privateInsuranceProfile->insurance_profile_policies as $value): -->
                  
                    <tr class="odd gradeX">
                      <td class="left"><!-- php: = $value->name --></td>
                      <td class="left"><!-- php: = $privateInsuranceProfile->accreditation_no --></td>
                      <td class="left">
                        <!-- php: = $privateInsuranceProfile->health_care_provider_level --> /
                        <!-- php: = $privateInsuranceProfile->health_care_prescription_level -->
                      </td>
                      <td class="left">
                        <!-- php: $result = $value->copay ? '<span class="badge badge-primary">Co Pay</span>' : null -->
                        <!-- php: = $result -->
                      </td>
                      <td class="left">
                          <!-- php: = $privateInsuranceProfile->directorate --><br>
                      </td>
                      <td class="left">
                        <!-- php: if ($value->status_id == 2) { -->
                            <!-- php: = $this->Form->postLink(__('Enable'), ['controller'=>'ManageInsurances','action'=>'toggleinsurance',$value->id], ['class' => 'btn btn-success btn-xs']) -->
                        <!-- php: } -->
                        <!-- php: if ($value->status_id == 1) { -->
                            <!-- php: = $this->Form->postLink(__('Disable'), ['controller'=>'ManageInsurances','action'=>'toggleinsurance',$value->id], ['class' => 'btn btn-secondary btn-xs']) -->
                        <!-- php: } -->
                        <!-- php: if (!($value->is_configured)) { -->
                            <a data-toggle="modal" data-target="#configurePrivateInsurance_<!-- php: = $value->id -->" href="javascript:" class="btn btn-xs">
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

  <!-- php: foreach($privateInsuranceProfiles as $privateInsuranceProfile): -->
    <!-- php: foreach($privateInsuranceProfile->insurance_profile_policies as $value): -->
      <div class="modal fade" id="configurePrivateInsurance_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="editProviderDialogueTitle"><!-- php: = $privateInsuranceProfile->name. ' ' . $value->name . '' --></h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="card card-box">
                    <div class="card-head">
                      <header>Configure Private Insurance Policy</header>
                    </div>
                    <div class="card-body" id="bar-parent">
                      <!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageInsurances', 'action' => 'configurePrivateInsurance', $value->id], 'class' => 'form-horizontal']) -->
                        <div class="form-body">

                          <div class="form-group row">
                            <label class="control-label col-md-4">Submission type
                              <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                              
                              <SearchableSelectField class="form-control input-height" name="claim_type" id="private_claim_select_<!-- php: =$value->id -->" required>
                                <option value="">Select Claims Submission type</option>
                                <!-- php: $claimTypes = ['Manual', 'Automatic']; foreach($claimTypes as $claimType) { -->
                                <option value="<!-- php: =$claimType -->"><!-- php: =$claimType --></option>
                                <!-- php: } -->
                              </SearchableSelectField>
                            </div>
                          </div>

                          <div class="form-group row">
                            <label class="control-label col-md-4">Override Detention with Surgery
                              <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                              <label class="switchToggle">
                                <input type="checkbox" name="override_detention_with_surgery" id="private_gen_detention_<!-- php: =$value->id -->" onclick="detentionPrivateDuration('private_gen_detention_<!-- php: =$value->id -->', <!-- php: =$value->id -->)">
                                <span class="slider green round"></span>
                              </label>
                            </div>
                          </div>
                          <div class="form-group row" style="display:none" id="private_detentionParameter_<!-- php: =$value->id -->">
                            <label class="control-label col-md-4">Detention Parameter
                              <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                              <SearchableSelectField name="detention_parameter" id="detention_parameter_<!-- php: =$value->id -->" class="form-control input-height">
                                <option value>Select Detention Parameter</option>
                                <option value="8" >Eight Hours</option>
                                <option value="20" >Twenty Hours</option>
                                <option value="24" >1 Day</option>
                                <option value="48" >2 Day</option>
                              </SearchableSelectField>
                              <!-- <input type="text" id="detention_parameter_</?=$value->id?>" name="detention_parameter" class="form-control" placeholder="Indicate Detention Parameter"> -->
                            </div>
                          </div>


                          <!-- <div class="form-group row">
                            <label class="control-label col-md-4">Override Detention With Capitation
                              <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                              <label class="switchToggle">
                                <input type="checkbox" name="override_detention_with_capitation" id="private_overrideDetentionCapitation_<!-- php: =$value->id -->" onclick="">
                                <span class="slider green round"></span>
                              </label>
                            </div>
                          </div> -->

                          <div class="form-group row">
                            <label class="control-label col-md-4">Private Dependent
                              <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                              <div class="row" stlye="">
                                <div class="col-md-3">
                                  <label class="switchToggle">
                                    <input type="checkbox" name="is_private_dependent" id="tprivateDependent_<!-- php: =$value->id -->" onclick="togglePrivateDependent('#tprivateDependent_<!-- php: =$value->id -->',<!-- php: =$value->id -->);">
                                    <span class="slider green round"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="form-group row" style="display:none" id="dependentParameter_<!-- php: =$value->id -->">
                            <label class="control-label col-md-4">Select Private Dependent
                              <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                              <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick full-width" data-size="5" name="private_dependent[]" title="Select Private Dependent" id="privateDependent_<!-- php: =$value->id -->"  data-live-search="true" multiple>
                                <!-- php: foreach ($insuranceDependents as $value) { -->
                                  <option value="<!-- php: =$value->id -->"><!-- php: = $value->title --></option>
                                <!-- php: } -->
                              </SearchableSelectField>
                            </div>
                          </div>

                          <div class="form-group row">
                            <label class="control-label col-md-4">Bundled Services
                              <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                              <label class="switchToggle">
                                <input name="is_bundled" type="checkbox" checked=checked id="configureprivacyServices_<!-- php: =$value->id -->_<!-- php: =$privateInsuranceProfile->id -->" onclick="togglePrivateInsurance('#configureprivacyServices_<!-- php: =$value->id -->_<!-- php: =$privateInsuranceProfile->id -->', '#configureServices_<!-- php: =$value->id -->_<!-- php: =$privateInsuranceProfile->id -->')">
                                <span class="slider green round"></span>
                              </label>
                            </div>
                          </div>
                          <!-- <div class="form-group row" style="display" id="configureServices_<!-- php: //$value->id -->_<!-- php: //$privateInsuranceProfile->id -->">
                            <label class="control-label col-md-4">
                              <div class="col-md-12 mb-4">Services</div>
                              <div class="col-md-12 mb-4">Investigations</div>
                              <div class="col-md-12 mb-4">Items</div>
                            </label>
                            <div class="col-md-5">
                              <div class="col-md-12">
                                <SearchableSelectField name="bundled_services[]" id="" class="input-height selectpicker all-services show-tick" style="" title="Select Services"  data-live-search="true" multiple>

                                </SearchableSelectField>
                              </div>
                              <div class="col-md-12">
                                <SearchableSelectField name="bundled_investigations[]" id="" class="input-height selectpicker all-investigations show-tick" style="" title="Select Services"  data-live-search="true" multiple>

                                </SearchableSelectField>
                              </div>
                              <div class="col-md-12">
                                <SearchableSelectField name="bundled_items[]" id="" class="input-height selectpicker all-items show-tick " style="" title="Select Services"  data-live-search="true" multiple>

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


  <script>
    function clearProviderFields(){
      $('#name').val('');
      $('#description').val('');
    }
  </script>

  <script>
    function clearProviderPolicyFields(){
      $('#name').val('');
      $('#description').val('');
    }

    function selectpublicinsurance() {
      d = document.getElementById("region_select").value;
      switch (d) {
        case 'Ghana':
          document.getElementById("public_insurance_payer").value = 'NHIS';
          break;
          
        default:
          document.getElementById("public_insurance_payer").value = '';
          break;
      }
    }
    function selectProviderType() {
      d = document.getElementById("provider_type_id").value;
      switch (d) {
        case 'Public':
          $("premium_type_id").val("Premium");
          document.getElementById("premium_type_id").setAttribute("disabled", "disabled");
          break;
          
        default:
          // document.getElementById("premium_type_id").value = '';
          break;
      }
    }
  </script>

  <script>
    function detentionPrivateDuration(checker, id) {
      checker = \`#\${checker}\`
      a = $(checker).is(':checked');
  
      targetElm = \`#private_detentionParameter_\${id}\`
      if(a){
        $(targetElm).show(500);
        $(\`#detention_parameter_\${id}\`).prop('required',true);
        $(\`#detention_parameter_\${id}\`).attr('data-required',1);
      }
      else {
        $(targetElm).hide(500);
        $(\`#detention_parameter_\${id}\`).attr('data-required',0);
        $(\`#detention_parameter_\${id}\`).removeAttr('required')
      }
    }
    function togglePrivateDependent(checker, id) {
      a = $(checker).is(':checked');
    
      targetElm = \`#privateDependent_\${id}\`
      if(a){
        $(targetElm).prop( "disabled", false );
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
        $(\`.selectpicker\${targetElm}\`).removeClass("disabled");
        $(\`#dependentParameter_\${id}\`).show(500);
        $(\`\${targetElm} option\`).prop('selected', true)
        $('.selectpicker').selectpicker('refresh');
      }
      else {
        $(targetElm).prop( "disabled", true );
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
        $(\`.selectpicker\${targetElm}\`).addClass("disabled");
        $(\`#dependentParameter_\${id}\`).hide(500);
        $(\`\${targetElm} option\`).prop('selected', false)
        $('.selectpicker').selectpicker('refresh');
      } 

    }
    function togglePrivateInsurance(checker, targetElm) {
      a = $(checker).is(':checked');
    
      if(a){
        // console.log('here i am')
        $(targetElm).prop( "disabled", false );
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
        $(targetElm).hide(500);
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
        
      }
      else {
        // console.log('here i was')
        $(targetElm).prop( "disabled", true );
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
        $(targetElm).show(500);
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
      } 

    }
  </script>

  <script>
    function privateServices(checker, id, targetElm=null) {
      checker = \`#\${checker}\`
      a = $(checker).is(':checked');
  
      if(targetElm == null){
        targetElm = \`#Services_\${id}\`
      }
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
      
      // targetElm = \`#selectPrivateServices_\${id}\`
      // if(a){
      //   $(targetElm).hide(500);
      //   $(targetElm).attr('data-required',0);
      //   $(targetElm).removeAttr('required')
      // }
      // else {
      //   $(targetElm).show(500);
      //   $(targetElm).prop('required',true);
      //   $(targetElm).attr('data-required',1);
      // }
    }
  </script>
  
<!-- php: else: -->
  <div style="text-align:center">
    No Private Payer/Sponsor Policies available
  </div>
<!-- php: endif -->

<script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#privateInsuranceNav a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('privateInsuranceNav', $(this).attr('href'));
		});
		
		// display last tab if exist
		var manageProvidersLastTab = localStorage.getItem('privateInsuranceNav');
		if (manageProvidersLastTab) {
		   $('#privateInsuranceNav a[href=' + manageProvidersLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#privateInsuranceNav a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ElementElementManageinsurancesPrivateinsurance() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
