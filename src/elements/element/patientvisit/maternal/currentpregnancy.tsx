const rawHtml = `
<div class="col-md-12">
    <div class="card-head legend-head">
        <header>Current Pregnancy Details</header>
        <!-- php: if(null !==($valueObject) && $valueObject != null) { -->
            <div style="float: right;">
                <a id="update_pregnancy_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_pregnancy_div, #pregnancy_details_div, #update_pregnancy_button').hide(0);$('#update_pregnancy_div,#view_pregnancy_button').show({ direction: 'top' }, 3000)">Update Pregnancy</a>
                <a id="view_pregnancy_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_pregnancy_div, #pregnancy_details_div, #update_pregnancy_button').show({ direction: 'top' }, 3000);$('#update_pregnancy_div,#view_pregnancy_button').hide(0);" style="display: none;">View Details</a>
            </div>
        <!-- php: } -->
    </div>

    <div class="card card-box" id="update_pregnancy_div" style="display: none;">
        <div class="card-body" id="bar-pregnancy-parent">
            <!-- php: = $this->Form->create($valueObject, ['url' => ['controller' => 'History', 'action' => 'editPastPregnancy', $valueObject->id], 'class' => 'form-horizontal']) -->
                <div class="form-body">

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Pregnancy Number 
                            <span class="required">*</span>
                        </label>
                        <div class="col-md-6">
                            <input type="number" min="1" step="1" name="pregnancy_number" value="<!-- php: = $valueObject->pregnancy_number -->" data-required="1" placeholder="Eg. Preg 1" class="form-control input-height" required /> 
                        </div>
                    </div>

                                                                                        
                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Mode of Conception
                        
                        </label>
                        <div class="col-md-6">
                            
                            <SearchableSelectField class="form-control input-height" value="<!-- php: = $valueObject->mode_of_conception -->" name="mode_of_conception" id="mode_of_conception" >
                                <option>Select</option>
                                <option value="Assisted" <!-- php: = ($valueObject->mode_of_conception == 'Assisted') ? 'selected="selected"' : '' -->>Assisted</option>
                                <option value="Natural" <!-- php: = ($valueObject->mode_of_conception == 'Natural') ? 'selected="selected"' : '' -->>Natural</option>
                            </SearchableSelectField>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">First Day of LMP
                        
                        </label>
                        <div class="col-md-6">
                            <div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input25" data-link-format="yyyy-mm-dd">
                                <input class="form-control input-height" value="<!-- php: = isset($valueObject->last_menstrual_period) ? $valueObject->last_menstrual_period->i18nFormat('yyyy-MM-dd') : '' -->" size="16" placeholder="Enter First day of LMP" data-required="0" name="last_menstrual_period" id = "last_menstrual_period" type="text"  >
                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                            </div>
                            <input type="hidden" id="dtp_input25" value="" />
                            
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Estimated Date of Delivery
                        
                        </label>
                        <div class="col-md-6">
                            <div class="input-group date form_date " data-date="" data-date-startdate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input26" data-link-format="yyyy-mm-dd">
                                <input class="form-control input-height" value="<!-- php: = isset($valueObject->edd) ? $valueObject->edd->i18nFormat('yyyy-MM-dd') : '' -->" size="16" placeholder="Enter Estimated Date of Delivery" data-required="0" name = "edd" id = "edd" type="text"  >
                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                            </div>
                            <input type="hidden" id="dtp_input26" value="" />
                            
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Weight (KG) - Before 12weeks
                        
                        </label>
                        <div class="col-md-6">
                            <input type="number" min="0.01" step="0.01" name="weight" value="<!-- php: = $valueObject->weight -->" id="currpregnancy_matweight" data-required="0" placeholder="Enter weight before 12weeks" onchange="javascript:updateMaternalBMI('currpregnancy_matweight', 'currpregnancy_matheight', 'currpregnancy_matbmi');" class="form-control input-height" /> 
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Height (cm) - Before 12weeks
                        
                        </label>
                        <div class="col-md-6">
                            <input type="number" min="0.1" step="0.1" name="height" value="<!-- php: = $valueObject->height -->" id="currpregnancy_matheight" data-required="0" placeholder="Enter height before 12weeks" onchange="javascript:updateMaternalBMI('currpregnancy_matweight', 'currpregnancy_matheight', 'currpregnancy_matbmi');" class="form-control input-height" /> 
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">BMI (Before 12weeks)
                        
                        </label>
                        <div class="col-md-6">
                            <input type="number" min="0.01" step="0.01" name="bmi" value="<!-- php: = $valueObject->bmi -->" id="currpregnancy_matbmi" data-required="0" placeholder="BMI before 12weeks" class="form-control input-height" /> 
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Estimated weight for EDD (KG)
                        
                        </label>
                        <div class="col-md-6">
                            <input type="number" min="0.1" step="0.1" name="weight_edd" value="<!-- php: = $valueObject->weight_edd -->" data-required="0" placeholder="Enter estimated date at edd" class="form-control input-height" /> 
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Contraception used before Pregnancy
                        
                        </label>
                        <div class="col-md-6">
                            <input type="text" name="contraception_type" value="<!-- php: = $valueObject->contraception_type -->" data-required="0" placeholder="Enter pregnancy contraception" class="form-control input-height" /> 
                        </div>
                    </div>

                    <hr/>

                    <legend><strong>More Details</strong></legend>                                                                                            
                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Mode of Delivery
                        
                        </label>
                        <div class="col-md-6">
                            
                            <SearchableSelectField class="form-control input-height" value="<!-- php: = $valueObject->mode_of_delivery -->" name="mode_of_delivery" id="mode_of_delivery" >
                                <option>Select</option>																	
                                <option value="CS" <!-- php: = ($valueObject->mode_of_delivery == 'CS') ? 'selected="selected"' : '' -->>CS</option>
                                <option value="Medical evacuation" <!-- php: = ($valueObject->mode_of_delivery == 'Medical evacuation') ? 'selected="selected"' : '' -->>Medical evacuation</option>
                                <option value="Vaginal Delivery (Induced)" <!-- php: = ($valueObject->mode_of_delivery == 'Vaginal Delivery (Induced)') ? 'selected="selected"' : '' -->>Vaginal Delivery (Induced)</option>
                                <option value="Vaginal Delivery (Spontaneous)" <!-- php: = ($valueObject->mode_of_delivery == 'Vaginal Delivery (Spontaneous)') ? 'selected="selected"' : '' -->>Vaginal Delivery (Spontaneous)</option>
                            </SearchableSelectField>
                        </div>
                    </div>
                                                                                        
                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Outcoume
                        
                        </label>
                        <div class="col-md-6">
                            <SearchableSelectField class="form-control input-height" name="outcome" >
                                <option>Select</option> 
                                <option value="Live Birth" <!-- php: = $valueObject->outcome == "Live Birth" ? 'selected="selected"' : '' --> >Live Birth</option>
                                <option value="Miscarriage" <!-- php: = $valueObject->outcome == "Miscarriage" ? 'selected="selected"' : '' --> >Miscarriage</option>
                                <option value="Still Birth" <!-- php: = $valueObject->outcome == "Still Birth" ? 'selected="selected"' : '' --> >Still Birth</option>
                                <option value="Termination" <!-- php: = $valueObject->outcome == "Termination" ? 'selected="selected"' : '' --> >Termination</option>
                            </SearchableSelectField>
                        </div>
                    </div>
                                                                                        
                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Pregnancy Complications
                        
                        </label>
                        <div class="col-md-6">
                            <input type="text" name="pregnancy_complications" value="<!-- php: = $valueObject->pregnancy_complications -->" data-required="0" placeholder="Enter pregnancy complications" class="form-control input-height" /> 
                        </div>
                    </div>
                                                                                        
                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Sex
                        
                        </label>
                        <div class="col-md-6">
                            
                            <SearchableSelectField class="form-control input-height" value="<!-- php: = $valueObject->gender_id -->" name="gender_id" id="gender_id" required>
                                <option>Select...</option>
                                    <!-- php: foreach($genders as $gender) { -->
                                        <option value="<!-- php: = $gender->id -->" <!-- php: = ($valueObject->gender_id == $gender->id) ? 'selected="selected"' : '' -->><!-- php: = $gender->name --></option>
                                    <!-- php: } -->
                            </SearchableSelectField>
                        </div>
                    </div>
                                                                                        
                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Weight (KG)
                        
                        </label>
                        <div class="col-md-6">
                            <input type="number" min="0.1" step="0.1" value="<!-- php: = $valueObject->weight -->" name="weight" data-required="0" placeholder="Enter current info on child" class="form-control input-height" /> 
                        </div>
                    </div>
                                                                                        
                    <div class="form-group row">
                        <label class="control-label col-md-4" style="text-align: left;">Current Info On Child
                        
                        </label>
                        <div class="col-md-6">
                            <input type="text" name="child_info" value="<!-- php: = $valueObject->child_info -->" data-required="0" placeholder="Enter current info on child" class="form-control input-height" /> 
                        </div>
                    </div>
                                                                
                    <div class="form-actions">
                        <div class="row">
                            <div class="offset-md-4 col-md-9">
                                <button type="submit" class="btn btn-info">Submit</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
                            </div>
                        </div>
                    </div>
            
                </div>
            <!-- php: = $this->Form->end() -->
        </div>
    </div>

    <!-- php: if(!isset($valueObject) || $valueObject == null) { -->
        <div class="card card-box" id="no_pregnancy_div">
            <div class="card-body no-padding height-9">
                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">Current pregnancy not set. Please select or create a pregnancy</h3>
            </div>
        </div>
    <!-- php: } else { -->
        <div class="card card-box" id="pregnancy_details_div">
			<div class="card-body no-padding height-9">
                <ul class="list-group list-group-unbordered">
                    <li class="list-group-item">
                        <b>Pregnancy Number</b>
                        <div class="profile-desc-item pull-right">Pregnancy <!-- php: = $valueObject->pregnancy_number --></div>
                    </li>

                    <li class="list-group-item">
                        <b>Mode of Conception</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->mode_of_conception --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Last Menstrual Period</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->has('last_menstrual_period') ? $valueObject->last_menstrual_period->i18nFormat('d/MM/Y') : '' --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Estimated Date of Delivery</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->has('edd') ? $valueObject->edd->i18nFormat('d/MM/Y') : '' --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Weight</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->weight --> KG</div>
                    </li>
                    <li class="list-group-item">
                        <b>Height</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->height --> cm</div>
                    </li>
                    <li class="list-group-item">
                        <b>BMI</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->bmi --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Estimated Weight at EDD</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->weight_edd --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Contrapception used before Pregnancy</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->contraception_type --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Mode of Delivery</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->mode_of_delivery --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Outcome</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->outcome --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Pregnancy Complications</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->pregnancy_complications --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Sex</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->has('gender') ? $valueObject->gender->name : '' --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Weight</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->weight --></div>
                    </li>
                    <li class="list-group-item">
                        <b>Current Info On Child</b>
                        <div class="profile-desc-item pull-right"><!-- php: = $valueObject->child_info --></div>
                    </li>
                </ul>
            </div>
        </div>
    <!-- php: } -->
</div>


<script>
    function calculateBMI() {
        
    }
</script>
`;

export default function ElementElementPatientvisitMaternalCurrentpregnancy() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
