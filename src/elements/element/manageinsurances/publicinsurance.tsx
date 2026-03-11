const rawHtml = `
<!-- php: if ($publicInsuranceProfilePolicies): -->
  <div class="row">
    <div class="borderBox light bordered col-md-12">
      <div class="card  card-box">
        <div class="card-body ">
          <div class="table-scrollable">
          <table class="table table-hover order-column full-width customDataTable">
            <thead>
              <tr>
                <th class="left">Insurance Name</th>
                <th class="left">Accreditation Number</th>
                <th class="left">HCP/ <br> Prescription Level</th>
                <th class="left">Copay</th>
                <!-- <th class="left">Capitation</th> -->
                <th class="left">Direcorate</th>
                <th class="left">Action</th>
              </tr>
            </thead>
            <tbody>
            <!-- php: foreach ($publicInsuranceProfilePolicies as $value): -->
            
              <tr class="odd gradeX">
                <td class="left"><!-- php: = $value->insurance_profile->name --></td>
                <td class="left"><!-- php: = $value->insurance_profile->accreditation_no --></td>
                <td class="left">
                  <!-- php: = $value->insurance_profile->health_care_provider_level --> /
                  <!-- php: = $value->insurance_profile->health_care_prescription_level -->
                </td>
                <td class="left">
                  <!-- php: $result = $value->copay ? '<span class="badge badge-primary">Co Pay</span>' : null -->
                  <!-- php: = $result -->
                </td>
                <!-- <td class="left">
                  <!-- php: $result = $value->capitation ? '<span class="badge badge-success">Capitation</span>' : null -->
                  <!-- php: $result -->
                </td> -->
                <td class="left">
                  <!-- php: = $value->insurance_profile->directorate --><br>
                </td>
                <td class="left">
                  <!-- php: if ($value->status_id == 2 || $value->status_id == null) { -->
                      <!-- php: = $this->Form->postLink(__('Enable'), ['controller'=>'ManageInsurances','action'=>'toggleinsurance',$value->id], ['class' => 'btn btn-success btn-xs']) -->
                  <!-- php: } -->
                  <!-- php: if ($value->status_id == 1) { -->
                      <!-- php: = $this->Form->postLink(__('Disable'), ['controller'=>'ManageInsurances','action'=>'toggleinsurance',$value->id], ['class' => 'btn btn-secondary btn-xs']) -->
                  <!-- php: } -->
                  <!-- php: if (!($value->is_configured)) { -->
                      <a data-toggle="modal" data-target="#configurePublicInsurance_<!-- php: = $value->id -->" href="javascript:" class="btn btn-xs">
                        Configure
                      </a>
                  <!-- php: } -->
                  <a href="<!-- php: =$this->Url->build(['controller'=>'ManageInsurances', 'action'=>'editPublicInsurance', $value->id]) -->"><button type="button" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">Edit</button></a> 
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

  <!-- php: foreach($publicInsuranceProfilePolicies as $value): -->
    <div class="modal fade" id="configurePublicInsurance_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title" id="editProviderDialogueTitle"><!-- php: = $value->name --></h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="card card-box">
              <div class="card-head">
                <header>Configure Public Insurance Policy</header>
              </div>
              <div class="card-body" id="bar-parent">
                <!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageInsurances', 'action' => 'configurePublicInsurance', $value->id], 'class' => 'form-horizontal']) -->
                  <div class="form-body">

                    <div class="form-group row">
                      <label class="control-label col-md-4">Submission type
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        
                        <SearchableSelectField class="form-control input-height" name="claim_type" id="public_claim_select_<!-- php: =$value->id -->" required>
                          <option value="">Select Claims Submission type</option>
                          <!-- php: $claimTypes = ['Manual', 'Automatic']; foreach($claimTypes as $claimType) { -->
                          <option value="<!-- php: =$claimType -->"><!-- php: =$claimType --></option>
                          <!-- php: } -->
                        </SearchableSelectField>
                      </div>
                    </div>
                    
                    <div class="form-group row">
                      <label class="control-label col-md-4">Capitation
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <label class="switchToggle">
                          <input type="checkbox" name="capitation" >
                          <span class="slider green round"></span>
                        </label>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="control-label col-md-4">Override Detention with Surgery
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <label class="switchToggle">
                          <input type="checkbox" name="override_detention_with_surgery" id="gen_detention_<!-- php: =$value->id -->" onclick="detentionDuration('gen_detention_<!-- php: =$value->id -->', <!-- php: =$value->id -->, 'editor_detentionParameter_')">
                          <span class="slider green round"></span>
                        </label>
                      </div>
                    </div>
                    <div class="form-group row" style="display:none" id="editor_detentionParameter_<!-- php: =$value->id -->">
                      <label class="control-label col-md-4">Detention Parameter
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                      <SearchableSelectField name="detention_parameter" id="detention_parameter" class="form-control input-height">
                        <option value="8">Eight Hours</option>
                        <option value="20">Twenty Hours</option>
                        <option value="24">1 Day</option>
                        <option value="48">2 Day</option>
                      </SearchableSelectField>

                        <!-- <input type="text" name="detention_parameter" class="form-control" placeholder="Indicate Detention Parameter"> -->
                      </div>
                    </div>


                    <div class="form-group row">
                      <label class="control-label col-md-4">Override Detention With Capitation
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <label class="switchToggle">
                          <input type="checkbox" name="override_detention_with_capitation" id="overrideDetentionCapitation_<!-- php: =$value->id -->" onclick="">
                          <span class="slider green round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="control-label col-md-4">Public Dependent
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <div class="row" stlye="">
                          <div class="col-md-3">
                            <label class="switchToggle">
                              <input type="checkbox" name="public_dependent" id="tpublicDependent_<!-- php: =$value->id -->" onclick="togglePublicDependent('#tpublicDependent_<!-- php: =$value->id -->',<!-- php: =$value->id -->);">
                              <span class="slider green round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row" style="display:none" id="publicDependentParameter_<!-- php: =$value->id -->">
                      <label class="control-label col-md-4">Select Public Dependent
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick full-width" data-size="5" name="public_dependents[]" title="Select Private Dependent" id="publicDependent_<!-- php: =$value->id -->"  data-live-search="true" multiple>
                          <!-- php: foreach ($insuranceDependents as $v) { -->
                            <option value="<!-- php: =$v->id -->" selected="selected"><!-- php: = $v->title --></option>
                          <!-- php: } -->
                        </SearchableSelectField>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="control-label col-md-4">Claim Code
                        <span class="required"> * </span>
                      </label>
                      <div class="col-md-5">
                        <div class="row d-flex flex-column" stlye="">
                          <div class="col-md-3">
                            <label class="switchToggle">
                              <input type="checkbox" name="claim_code" id="tclaimCode_<!-- php: =$value->id -->" checked="checked" onclick="togglePublicInsurance('#tclaimCode_<!-- php: =$value->id -->','#claimCode<!-- php: =$value->id -->');">
                              <span class="slider green round"></span>
                            </label>
                          </div>
                          <div class="col-md-9">
                            <!-- <SearchableSelectField name="claim_codes[]" id="" class="input-height selectpicker show-tick full-width" style="" title="Select Claims"  data-live-search="true" multiple>
                            <!-- php: foreach ($insuranceClaimCodes as $value) { -->
                              <option value="<!-- php: =$value->id -->"><!-- php: = $value->title --></option>
                              <!-- php: } -->
                            </SearchableSelectField> -->
                          </div>
                          <input value="" type="text" minlength="5" maxlength="5" placeholder="Claim Code(Numeric)" name="claim_code" class="input-height " style="width:100%;" pattern="[0-9]+" required id="claimCode<!-- php: =$value->id -->">
                        </div>
                      </div>
                    </div>
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
  <!-- php: endforeach; -->



  <script>
    function clearProviderFields(){
      $('#name').val('');
      $('#description').val('');
    }

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
      function detentionDuration(checker, id, target=null) {
      checker = \`#\${checker}\`
      a = $(checker).is(':checked');
      // console.log('here oo here')
      targetElm = \`#\${target}\${id}\`
      if(a){
        $(targetElm).show(500);
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
      }
      else {
        $(targetElm).hide(500);
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
      }
      // targetElm = \`#edit_detentionParameter_\${id}\`
      // if(a){
      //   $(targetElm).show(500);
      //   $(targetElm).prop('required',true);
      //   $(targetElm).attr('data-required',1);
      // }
      // else {
      //   $(targetElm).hide(500);
      //   $(targetElm).attr('data-required',0);
      //   $(targetElm).removeAttr('required')
      // }
    }
    function togglePublicDependent(checker, id) {
      a = $(checker).is(':checked');
    
      targetElm = \`#publicDependent_\${id}\`
      if(a){
        $(targetElm).prop( "disabled", false );
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
        $(\`#publicDependentParameter_\${id}\`).show(500);
        $(\`.selectpicker\${targetElm}\`).removeClass("disabled");
        $(\`\${targetElm} option\`).prop('selected', true)
        $('.selectpicker').selectpicker('refresh');
      }
      else {
        $(targetElm).prop( "disabled", true );
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
        $(\`#publicDependentParameter_\${id}\`).hide(500);
        $(\`.selectpicker\${targetElm}\`).addClass("disabled");
        $(\`\${targetElm} option\`).prop('selected', false)
        $('.selectpicker').selectpicker('refresh');
      } 
      targetElm = \`#edit_publicDependentParameter_\${id}\`
      if(a){
        $(targetElm).prop( "disabled", false );
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
        $(targetElm).show(500);
        $(\`.selectpicker\${targetElm}\`).removeClass("disabled");
        $(\`\${targetElm} option\`).prop('selected', true)
        $('.selectpicker').selectpicker('refresh');
      }
      else {
        $(targetElm).prop( "disabled", true );
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
        $(targetElm).hide(500);
        $(\`.selectpicker\${targetElm}\`).addClass("disabled");
        $(\`\${targetElm} option\`).prop('selected', false)
        $('.selectpicker').selectpicker('refresh');
      } 

    }
    function togglePublicInsurance(checker, targetElm) {
      a = $(checker).is(':checked');
    
      if(a){
        $(targetElm).prop( "disabled", false );
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
      }
      else {
        $(targetElm).prop( "disabled", true );
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
      } 

    }
</script>

  <script>
    <!-- php: foreach ($publicInsuranceProfilePolicies as $key => $value) { if(($value->insurance_profile_policy_setting->override_detention_with_surgery == 1)){ -->

        targetElm = '#edit_detentionParameter_<!-- php: =$value->id -->'
        $(targetElm).show(500);
        $(targetElm).prop('required',true);
        $(targetElm).attr('data-required',1);
        
    <!-- php: }else{ -->
        targetElm = '#edit_detentionParameter_<!-- php: =$value->id -->'
        $(targetElm).hide(500);
        $(targetElm).attr('data-required',0);
        $(targetElm).removeAttr('required')
    <!-- php: }} -->

    <!-- php: foreach ($publicInsuranceProfilePolicies as $key => $value) { $defaults=$value->insurance_profile_policy_setting->insurance_dependents -->
      array = []
      <!-- php: foreach ($defaults as $key => $default) { -->
        array.push("<!-- php: =$default->id -->")
      <!-- php: } -->
      // console.log(array)
      $("#edit_publicDependent_<!-- php: =$value->id -->").val(function(i) { 
        // console.log(i);
        return array[i] 
      });

    <!-- php: } -->
  </script>

<!-- php: else: -->
  <div style="text-align:center">
    No Public Payer/Sponsor Policies available
  </div>
<!-- php: endif -->
`;

export default function ElementElementManageinsurancesPublicinsurance() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
