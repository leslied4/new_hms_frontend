const rawHtml = `
<!-- php: $YESNO = [ 'Yes' => 'Yes', 'No' => 'No' ]; -->
<div class="borderBox light col-md-12">
    <div class="borderBox-title tabbable-line">
        <div class="caption">
            <!-- span class="caption-subject font-dark bold uppercase">Delivery</span -->
            <header style="color: #558; line-height: 17px; font-size: 20px; font-weight: 600;">Delivery</header>
        </div>
        
        <ul class="nav nav-tabs" id="maternalDeliveryTab">
            <li class="nav-item">
                <a href="#maternal_delivery_outcome" data-toggle="tab">Delivery Outcome</a>
            </li>
            <li class="nav-item">
                <a href="#maternal_delivery_for_mother" data-toggle="tab">Mother's Condition</a>
            </li>
            <li class="nav-item ">
                <a href="#maternal_delivery_for_child" data-toggle="tab">Child's Condition</a>
            </li>
            <li class="nav-item ">
                <a href="#maternal_delivery_discharge_summary" data-toggle="tab">Discharge Summary</a>
            </li>
        </ul>
    </div>

    <div class="borderBox-body">
        <div class="tab-content">
            <div class="tab-pane" id="maternal_delivery_outcome">
                <div>
                    <div class="card-head legend-head">
                        <header style="font-weight: 100;">Delivery Outcome</header>
                        <div style="float: right;">
                            <a id="add_delivery_outcome_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_outcome_div, #delivery_outcome_details_div, #add_delivery_outcome_button').hide(0);$('#add_delivery_outcome_div, #view_delivery_outcome_button').show({ direction: 'top' }, 3000)"><!-- php: = (!isset($outcomeObject) || $outcomeObject == null) ? 'Add' : 'Update' --> Delivery Outcome</a>
                            <a id="view_delivery_outcome_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_outcome_div, #delivery_outcome_details_div, #add_delivery_outcome_button').show({ direction: 'top' }, 3000);$('#add_delivery_outcome_div,#view_delivery_outcome_button').hide(0);" style="display: none;">View Delivery Outcome</a>
                        </div>
                    </div>

                    <div class="card card-box" id="add_delivery_outcome_div" style="display: none;">
                        <div class="card-body" id="bar-delivery_outcome_div">                            
                            <!-- php: = $this->Form->create($outcomeObject, ['id' => 'deliveryOutcomeForm', 'url' => ['controller' => 'Maternal', 'action' => ($outcomeObject != null ? 'updateDeliveryOutcome' : 'addDeliveryOutcome'), $patient->id, $selectedVisit->id, ($outcomeOb... -->
                                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                                <div class="form-body">                                    
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Weeks of Pregnancy
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="1" min="0" value="<!-- php: = $outcomeObject != null ? $outcomeObject->weeks_of_pregnancy : '' -->" name="weeks_of_pregnancy" id="out_weeks_of_pregnancy" placeholder="Enter weeks of pregnancy" class="form-control input-height" required /> 
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Date of Delivery
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                <input class="form-control input-height" size="16" placeholder="" value="<!-- php: = $outcomeObject!= null && isset($outcomeObject->delivery_date) ? $outcomeObject->delivery_date->i18nFormat('yyyy-MM-dd') : '' -->" name = "delivery_date" id = "delivery_date" type="text" value="" required >
                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input2" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Time of Delivery
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                                                <input class="form-control" value="<!-- php: = $outcomeObject!= null && isset($outcomeObject->delivery_time) ? $outcomeObject->delivery_time->i18nFormat('hh:mm') : '' -->" name="delivery_time" id="out_delivery_time" size="16" type="text" value="">
                                                <span class="input-group-addon"><span class="fa fa-clock-o"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input3" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Time of Placenta Delivery
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input4" data-link-format="hh:ii">
                                                <input class="form-control" value="<!-- php: = $outcomeObject!= null && isset($outcomeObject->placenta_delivery_time) ? $outcomeObject->placenta_delivery_time->i18nFormat('hh:mm') : '' -->" name="placenta_delivery_time" id = "out_placenta_delivery_time" size="16" type="text" value="">
                                                <span class="input-group-addon"><span class="fa fa-clock-o"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input4" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Labour Duration (Hours)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $outcomeObject != null ? $outcomeObject->labour_duration_hours : '' -->" name="labour_duration_hours" id="out_labour_duration_hours" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Labour Duration (Mins)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $outcomeObject != null ? $outcomeObject->labour_duration_minutes : '' -->" name="labour_duration_minutes" id="out_labour_duration_minutes" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Type of Delivery
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $DELIVERY_TYPES = [ 'Normal' => 'Normal', 'Vacuum' => 'Vacuum', 'Caesarean Section' => 'Caesarean Section', 'Others' => 'Others' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="delivery_type" id="out_delivery_type">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($DELIVERY_TYPES as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->delivery_type == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Indication for Vacuum / CS
                                        </label>
                                        <div class="col-md-7">
                                            <input type="text" value="<!-- php: = $outcomeObject != null ? $outcomeObject->indication_for_vacuum : '' -->" name="indication_for_vacuum" id="out_indication_for_vacuum" placeholder="Indication for vacuum" class="form-control input-height" required  /> 
                                        </div>            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Anaesthesia
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $ANAESTHESIAS = [ 'No' => 'No', 'Epidural Anesthesia' => 'Epidural Anesthesia', 'Spinal Anesthesia' => 'Spinal Anesthesia', 'General Anesthesia' => 'General Anesthesia' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="anesthesia" id="out_anesthesia">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($ANAESTHESIAS as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->anesthesia == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Estimated Blood Loss (ml)
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="1" min="0" value="<!-- php: = $outcomeObject != null ? $outcomeObject->blood_loss : '' -->" name="blood_loss" id="out_blood_loss" placeholder="Estimated Blood Loss" class="form-control input-height" required />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Blood Transfusion
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="blood_transfusion" id="out_blood_transfusion" onchange="toggleBloodtrans(this)">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->blood_transfusion == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>  
                                    </div>
                                    <div class="form-group row" style="display:<!-- php: = ($outcomeObject != null && $outcomeObject->blood_transfusion == 'Yes')? '' : 'none' -->" id="bloodTrans">
                                        <div class="col-md-3"></div>
                                        <div class="col-md-7">
                                            <div class="col-md-12">
                                                <div class="row d-flex justify-content-between">
                                                    <input type="text" name="blood_product" value="<!-- php: = $outcomeObject != null ? $outcomeObject->blood_product : '' -->" id="blood_product_1" class="col-md-3 input-height" placeholder="Enter Blood Product">
                                                    <input type="number" min='0' value="<!-- php: = $outcomeObject != null ? $outcomeObject->blood_volume : '' -->" name="blood_volume" id="volume_1" class="col-md-3 input-height" placeholder="Enter Volume">
                                                    <input type="number" min='0' value="<!-- php: = $outcomeObject != null ? $outcomeObject->transfusion_duration : '' -->" name="transfusion_duration" id="transfusion_duration_1" class="col-md-3 input-height" placeholder="Transfusion Duration (mins)">
                                                    <!-- <div class="col-md-3">
                                                        <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                                                            <input class="form-control" value="<!-- php: = $outcomeObject!= null && isset($outcomeObject->delivery_time) ? $outcomeObject->delivery_time->i18nFormat('hh:mm') : '' -->" name="transfusion_duration" id="transfusion_duration_1" size="16" type="text" value="">
                                                            <span class="input-group-addon"><span class="fa fa-clock-o"></span></span>
                                                        </div>
                                                        <input type="hidden" id="dtp_input3" value="" />
                                                    </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">State of Placenta and Membranes
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $PLACENTA_STATES = [ 'Complete' => 'Complete', 'Incomplete' => 'Incomplete', 'Other' => 'Other' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="placenta_state" id="out_placenta_state">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($PLACENTA_STATES as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->placenta_state == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Manual Removal of Placenta
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="placenta_manual_removal" id="out_placenta_manual_removal">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->placenta_manual_removal == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">State of Perineum
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $PERINEUM_STATES = [ 'Intact' => 'Intact', 'Tear' => 'Tear', 'Episiotomy' => 'Episiotomy' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="perineum_state" id="out_perineum_state">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($PERINEUM_STATES as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->perineum_state == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Labour & Delivery Complications
                                        </label>
                                        <div class="col-md-5">
                                            <input type="text" value="<!-- php: = $outcomeObject != null ? $outcomeObject->labour_complications : '' -->" name="labour_complications" id="out_labour_complications" placeholder="Complications during labour and delivery" class="form-control input-height" required  /> 
                                        </div>            
                                        <div class="col-md-2">
                                            <div class="btn btn-xs btn-primary" id="toggleLaborComplications"><i class="fa fa-plus"></i> Clinical Indications</div>
                                        </div>
                                    </div>
                                    <div class="form-group row" style="display:none" id="laborComplics">
                                        <div class="col-md-3"></div>
                                        <div class="col-md-7">
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="primary_diagnosis_ids[]" id="primary_diagnosis_id" title="Select diagnosis"  data-live-search="true" multiple>
                                                                        
                                                        <!-- php: foreach($standardDiagnoses as $code => $standardDiagnosis) { $idCode = explode(' ', $code); -->
                                                                <option value="<!-- php: = $idCode[0] -->" data-content="<!-- php: = h($standardDiagnosis) -->   <span class='badge badge-danger'><!-- php: = h($idCode[1]) --></span>"><!-- php: = h($standardDiagnosis) --></option>
                                                            <!-- php: } -->
                                                    </SearchableSelectField>
                                                </div>
                                                <!-- <div class="col-md-12">
                                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" title="Indicate the procedure" name="procedure_ids[]" id="procedure_ids"  data-live-search="true"  multiple>
                                                        
                                                        <!-- php: foreach($procedures as $code => $procedure) { $idCode = explode(' ', $code); -->
                                                                <option title="<!-- php: = h($idCode[1]) -->" value="<!-- php: = h($idCode[0]) -->" data-content="<!-- php: = h($procedure) -->   <span class='badge badge-danger'><!-- php: = h($idCode[1]) --></span>"><!-- php: = h($procedure) --></option>
                                                            <!-- php: } -->
                                                    </SearchableSelectField>
                                                </div> -->
                                            </div>
                                        </div>
                                        <a style="color:red" href="javascript:void(0);" id="removeLaborComplics">Remove</a>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Birth Attendant
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $BIRTH_ATTENDANTS = [ 'Doctor' => 'Doctor', 'Midwife' => 'Midwife', 'Nurse' => 'Nurse', 'TBA' => 'TBA', 'Relative' => 'Relative', 'Relative' => 'Other' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="birth_attendant" id="out_birth_attendant">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($BIRTH_ATTENDANTS as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->birth_attendant == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Name of Birth Attendant
                                        </label>
                                        <div class="col-md-7">
                                            <!-- <SearchableSelectField name="attendant_name" id="out_attendant_name" placeholder="Name of Attendant" class="form-control input-height" required  > -->
                                            <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="attendant_name" id="out_attendant_name" title="Select Attendant"  data-live-search="true" required>
                                                <!-- php: if($outcomeObject->attendant_name != null): -->
                                                    <option value="<!-- php: = $outcomeObject->attendant_name -->" selected='selected'><!-- php: = $outcomeObject->attendant_name --></option>
                                                <!-- php: endif -->
                                            <!-- php: foreach($users as $code => $user) { -->
                                                        <option value="<!-- php: = $user->first_name. ' ' . $user->last_name -->"><!-- php: = $user->first_name .' '. $user->last_name --></option>
                                                    <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Place of Delivery
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $DELIVERY_PLACES = [ 'Hospital' => 'Hospital', 'Health Centre' => 'Health Centre', 'CHPS' => 'CHPS', 'Home' => 'Home', 'Relative' => 'Other' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="place_of_delivery" id="out_place_of_delivery">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($DELIVERY_PLACES as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->place_of_delivery == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Type of Hospital
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $DELIVERY_PLACES = [ 'Relative' => 'Other', 'Hospital' => 'Hospital', 'Health Centre' => 'Health Centre', 'CHPS' => 'CHPS', 'Home' => 'Home', ]; -->
                                            <SearchableSelectField class="form-control input-height" name="type_of_hospital" id="out_type_of_hospital">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($DELIVERY_PLACES as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->place_of_delivery == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Name of Health Facility
                                        </label>
                                        <div class="col-md-7">
                                            <input type="text" value="<!-- php: = $outcomeObject != null ? $outcomeObject->name_of_health_facility : '' -->" name="name_of_health_facility" id="out_name_of_health_facility" placeholder="Name of Facility" class="form-control input-height" required  /> 
                                        </div>            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Breastfeeding Started Within 30mins?
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="breastfeeding_within_30" id="out_breastfeeding_within_30">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->breastfeeding_within_30 == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Skin-to-skin Contact with Mother?
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="skin_to_skin_contact" id="out_skin_to_skin_contact">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $outcomeObject != null && $outcomeObject->skin_to_skin_contact == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="row">
                                        <div class="offset-md-3 col-md-7">
                                            <button type="submit" class="btn btn-info">Submit</button>
                                            <button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            <!-- php: =$this->Form->end(); -->
                        </div>
                    </div>
                    
                    <!-- php: if(!isset($outcomeObject) || $outcomeObject == null) { -->
                        <div class="card card-box" id="no_delivery_outcome_div">
                            <div class="card-body no-padding height-9">
                                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No delivery outcome recorded</h3>
                            </div>
                        </div>
                    <!-- php: } else { -->
                        <div class="card-body " id="delivery_outcome_details_div">
                            <div class="card-body no-padding height-9">
                                <ul class="list-group list-group-unbordered">
                                    <li class="list-group-item">
                                        <b>Weeks Of Pregnancy</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->weeks_of_pregnancy --> weeks</div>
                                    </li>
                                    <!-- li class="list-group-item">
                                        <b>Date Of Delivery</b>
                                        <div class="profile-desc-item pull-right"><!-- php: // = $outcomeObject->delivery_date != null ? $outcomeObject->delivery_date->i18nFormat('d/MM/Y') : '' --></div>
                                    </li -->
                                    <li class="list-group-item">
                                        <b>Time Of Delivery</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->delivery_time != null ? $outcomeObject->delivery_time->i18nFormat('HH:mm') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Time Of Placenta Delivery</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->placenta_delivery_time != null ? $outcomeObject->placenta_delivery_time->i18nFormat('HH:mm') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Duration of Labour & Delivery</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->labour_duration_hours . ' hours ' . $outcomeObject->labour_duration_minutes . ' Minutes' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Type of Delivery</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->delivery_type --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Indication for Vacuum / CS</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->indication_for_vacuum --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Anaesthesia</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->anesthesia --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Estimated Blood Loss</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->blood_loss --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Blood Transfusion</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->blood_transfusion --></div>
                                    </li>
                                    <!-- php: if ($outcomeObject->blood_transfusion == 'Yes'): -->
                                        <li class="list-group-item">
                                            <b>Blood Product</b>
                                            <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->blood_product --></div>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Blood Volume</b>
                                            <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->blood_volume --></div>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Transfusion Duration</b>
                                            <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->transfusion_duration --> minute(s)</div>
                                        </li>
                                    <!-- php: endif -->
                                    <li class="list-group-item">
                                        <b>State of Placenta and Membranes</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->placenta_state --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>State of Perineum</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->perineum_state --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Labour & Delivery Complications</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->labour_complications --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Birth Attendant</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->birth_attendant --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Name of Birth Attendant</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->attendant_name --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Place of Delivery</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->place_of_delivery --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Name of Health Facility</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->name_of_health_facility --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Breastfeeding start within 30mins?</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->breastfeeding_within_30 --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Skin-to-skin contact with Mother?</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $outcomeObject->skin_to_skin_contact --></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <!-- php: } -->
                </div>
            </div>
            
            <div class="tab-pane" id="maternal_delivery_for_mother">
                <div>
                    <div class="card-head legend-head">
                        <header style="font-weight: 100;">Mother's Condition</header>
                        <div style="float: right;">
                            <a id="add_delivery_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_div, #delivery_list_div, #add_delivery_button').hide(0);$('#add_delivery_div, #view_deliverys_button').show({ direction: 'top' }, 3000)"><!-- php: = (!isset($motherCondition) || $motherCondition == null) ? 'Add' : 'Update' --> Mother's Condition</a>
                            <a id="view_deliverys_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_div, #delivery_list_div, #add_delivery_button').show({ direction: 'top' }, 3000);$('#add_delivery_div,#view_deliverys_button').hide(0);" style="display: none;">View Mother's Condition</a>
                        </div>
                    </div>

                    <div class="card card-box" id="add_delivery_div" style="display: none;">
                        <div class="card-body" id="bar-delivery_div">
                            <!-- php: = $this->Form->create($motherCondition, ['id' => 'deliveryMotherConditionForm', 'url' => ['controller' => 'Maternal', 'action' => ($motherCondition != null ? 'updateMotherCondition' : 'addMotherCondition'), $patient->id, $selectedVisit->id,... -->
                                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                                <div class="form-body">

                                    <!-- div class="form-group row">
                                        <label class="control-label col-md-3">Date
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                <input class="form-control input-height" size="16" placeholder="" value="<!-- php: // = $motherCondition!= null && isset($motherCondition->date_added) ? $motherCondition->date_added->i18nFormat('yyyy-MM-dd') : '' -->" name = "date_added" id = "date_added" type="text" required >
                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input2" value="" />
                                        </div>
                                    </div -->
                                    <!-- <div class="form-group row">
                                        <label class="control-label col-md-3">Status
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="delivery_outcome" id="delc_delivery_outcome">
                                                <option value="">Select...</option>
                                                <!-- php: $DELIVERY_OUTCOMES = ['Live Birth', 'Death']; -->
                                                <!-- php: foreach($DELIVERY_OUTCOMES as $key => $value) { -->
                                                    <option <!-- php: = $motherCondition != null && $motherCondition->delivery_outcome == $key ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div> -->
                                    <div class="form-group row" style="" id="">
                                        <label class="control-label col-md-3">
                                            Status
                                            <span class="required"> * </span>
                                        </label>
                                        <div classd="col-md-7">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="delivery_outcome" id="stat_radio" value="0" checked>
                                                <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Live</span></label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="delivery_outcome" id="routine_radio" value="1">
                                                <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Dead</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">BP
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group">
                                                <input class="form-control input-height" size="3" placeholder="" value="<!-- php: = $motherCondition!= null ? $motherCondition->blood_pressure_1 : '' -->" name = "blood_pressure_1" id = "delm_blood_pressure_1" type="number" min=0 required >
                                                <span class="input-group-addon"><span class="" style="font-size : 18px"> / </span></span>
                                                <input class="form-control input-height" size="3" placeholder="" value="<!-- php: = $motherCondition!= null ? $motherCondition->blood_pressure_2 : '' -->" name = "blood_pressure_2" id = "delm_blood_pressure_2" type="number" min=0 required >
                                            </div>
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Temperature
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $motherCondition != null ? $motherCondition->temperature : '' -->" name="temperature" id="delm_temperature" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Pulse
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $motherCondition != null ? $motherCondition->pulse : '' -->" name="pulse" id="delm_pulse" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Condition of Uterus
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $UTERUS_CONDITIONS = [ 'Contracted' => 'Contracted', 'Not Contracted' => 'Not Contracted' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="condition_of_uterus" id="delm_condition_of_uterus">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($UTERUS_CONDITIONS as $key => $value) { -->
                                                    <option <!-- php: = $motherCondition != null && $motherCondition->condition_of_uterus == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Fundal Height
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $motherCondition != null ? $motherCondition->fundal_height : '' -->" name="fundal_height" id="delm_fundal_height" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Lochia Colour
                                        </label>
                                        <div class="col-md-7">
                                            <input type="text" value="<!-- php: = $motherCondition != null ? $motherCondition->lochia_colour : '' -->" name="lochia_colour" id="delm_lochia_colour" placeholder="Indication Lochia Colour" class="form-control input-height" required  /> 
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Lochia Odour
                                        </label>
                                        <div class="col-md-7">
                                            <input type="text" value="<!-- php: = $motherCondition != null ? $motherCondition->lochia_odour : '' -->" name="lochia_odour" id="delm_lochia_odour" placeholder="Indication Lochia Odour" class="form-control input-height" required  /> 
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Incision Perineum / CS
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $INCISIONS = [ 'Clean' => 'Clean', 'Infected' => 'Infected', 'Other' => 'Other' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="incision_perineum" id="delm_incision_perineum">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($INCISIONS as $key => $value) { -->
                                                    <option <!-- php: = $motherCondition != null && $motherCondition->incision_perineum == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Condition of Breast
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $BREASTCONDITIONS = [ 'Lactating' => 'Lactating', 'Not Lactating' => 'Not Lactating', 'Engorged' => 'Engorged' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="breast_condition" id="delm_breast_condition">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($BREASTCONDITIONS as $key => $value) { -->
                                                    <option <!-- php: = $motherCondition != null && $motherCondition->breast_condition == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField> 
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Number of Days Iron Supplied
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $motherCondition != null ? $motherCondition->iron : '' -->" name="iron" id="delm_iron" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Date of Next Visit
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input24" data-link-format="yyyy-mm-dd">
                                                <input class="form-control input-height" size="16" placeholder="" value="<!-- php: = $motherCondition!= null && isset($motherCondition->date_of_next_visit) ? $motherCondition->date_of_next_visit->i18nFormat('yyyy-MM-dd') : '' -->" name = "date_of_next_visit" id = "delm_date_of_next_visit" type="text" required >
                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input24" value="" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="offset-md-3 col-md-7">
                                            <button type="submit" class="btn btn-info">Submit</button>
                                            <button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            <!-- php: =$this->Form->end(); -->
                        </div>
                    </div>
                    
                    <!-- php: if(!isset($motherCondition) || $motherCondition == null) { -->
                        <div class="card card-box" id="no_delivery_div">
                            <div class="card-body no-padding height-9">
                                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No record for mother's condition</h3>
                            </div>
                        </div>
                    <!-- php: } else { -->
                        <div class="card-body " id="delivery_list_div">
                            <div class="card-body no-padding height-9">
                                <ul class="list-group list-group-unbordered">
                                    <li class="list-group-item">
                                        <b>Date</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->has('date_added') ? $motherCondition->date_added->i18nFormat('d/MM/Y') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Status</b>
                                        <!-- php: $DELIVERY_OUTCOMES = ['Live Birth', 'Death']; -->
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->delivery_outcome != -1 ? $DELIVERY_OUTCOMES[$motherCondition->delivery_outcome] : 'n/a' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>BP</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->blood_pressure_1 . '/' . $motherCondition->blood_pressure_2 --> mm/Hg</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Pulse</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->pulse --> b/min</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Temperature</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->temperature --> <sup>0</sup>C</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Condition of Uterus</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->condition_of_uterus --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Fundal Height</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->fundal_height --> cm</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Lochia Colour</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->lochia_colour --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Lochia Odour</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->lochia_odour --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Incision Perineum / CS</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->incision_perineum --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Condition of Breast</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->breast_condition --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Number of Days Iron Supplied</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->iron --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Date of Next Visit</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $motherCondition->has('date_of_next_visit') ? $motherCondition->date_of_next_visit->i18nFormat('d/MM/Y') : '' --></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <!-- php: } -->
                </div>
            </div>

            <div class="tab-pane" id="maternal_delivery_for_child">
                <div>
                    <div class="card-head legend-head">
                        <header style="font-weight: 100;">Child's Condition (Total: <!-- php: = sizeof($fetus) --> Babies)</header>
                        <div style="float: right;">
                            <a id="add_delivery_child_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_child_div, #delivery_child_list_div, #add_delivery_child_button').hide(0);$('#add_delivery_child_div, #view_deliverys_child_button').show({ direction: 'top' }, 3000)"><!-- php: = (!isset($babyConditions) || $babyConditions == null || $babyConditions == []) ? 'Add' : 'Add' --> Baby's Condition</a>
                            <a id="view_deliverys_child_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_child_div, #delivery_child_list_div, #add_delivery_child_button').show({ direction: 'top' }, 3000);$('#add_delivery_child_div,#view_deliverys_child_button').hide(0);" style="display: none;">View Baby's Condition</a>
                        </div>
                    </div>

                    <div class="card card-box" id="add_delivery_child_div" style="display: none;">
                        <div class="card-body" id="bar-delivery_child_div">                       
                            <!-- php: = $this->Form->create($babyCondition, ['id' => 'deliveryBabyConditionForm', 'url' => ['controller' => 'Maternal', 'action' => 'addBabyCondition', $patient->id, $selectedVisit->id]]); -->
                                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                                <div class="form-body">
                                    <div class="card-head legend-head mb-5">
                                        <header style="font-weight: Bold;">Enter Conditions for Baby <!-- php: = sizeof($babyConditions) + 1 --></header>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Delivery Outcome
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $DELIVERY_OUTCOMES = [ 'Live Birth' => 'Live Birth', 'StillBirth' => 'StillBirth', 'Early Neonatal Death' => 'Early Neonatal Death' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="delivery_outcome" id="delc_delivery_outcome">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($DELIVERY_OUTCOMES as $key => $value) { -->
                                                    <option <!-- php: = $babyCondition != null && $babyCondition->delivery_outcome == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Sex Of Baby
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $BABY_SEXS = [ 'Male' => 'Male', 'Female' => 'Female', 'Unidentified' => 'Unidentified' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="sex" id="delc_sex">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($BABY_SEXS as $key => $value) { -->
                                                    <option <!-- php: = $babyCondition != null && $babyCondition->sex == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Number Of Babies
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $BABY_TOTAL = [ 'Single' => 'Single', // 'Twin' => 'Twin', // 'Triplet' => 'Triplet', // 'Other' => 'Other' ]; -->
                                            <SearchableSelectField class="form-control input-height" name="number_of_babies" id="delc_number_of_babies">
                                                <!-- php: foreach($BABY_TOTAL as $key => $value) { -->
                                                    <option <!-- php: = $babyCondition != null && $babyCondition->number_of_babies == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Weight (kg)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $babyCondition != null ? $babyCondition->weight : '' -->" name="weight" id="delc_weight" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Length (cm)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $babyCondition != null ? $babyCondition->length : '' -->" name="length" id="delc_length" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Head Circumference (cm)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $babyCondition != null ? $babyCondition->head_circumference : '' -->" name="head_circumference" id="delc_head_circumference" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Apgar Score
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group">
                                                <span class="input-group-addon"><span class=""> 1 min </span></span>
                                                <input class="form-control input-height" size="3" placeholder="" value="<!-- php: = $babyCondition!= null ? $babyCondition->apgar_score_1 : '' -->" name = "apgar_score_1" id = "delc_apgar_score_1" type="number" min=0 required >
                                                <span class="input-group-addon"><span class="">/ 10 </span></span>
                                                <span class="input-group-addon"><span class=""> &nbsp;&nbsp;&nbsp;&nbsp; </span></span>
                                                <span class="input-group-addon"><span class=""> 5 min </span></span>
                                                <input class="form-control input-height" size="3" placeholder="" value="<!-- php: = $babyCondition!= null ? $babyCondition->apgar_score_5 : '' -->" name = "apgar_score_5" id = "delc_apgar_score_5" type="number" min=0 required >
                                                <span class="input-group-addon"><span class="">/ 10 </span></span>
                                            </div>
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Resuscitation
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="resuscitation" id="delc_resuscitation" onchange="toggleResuscitation(this)">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $babyCondition != null && $babyCondition->resuscitation == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>                                            
                                    </div>
                                    <div class="form-group row" style="display:none" id="toggleResuscitation">
                                        <div class="col-md-3"></div>
                                        <div class="col-md-7">
                                            ""Flow Sheet From Peter""                                          
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Congenital Malformation
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="congenital_malformation" id="delc_congenital_malformation">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $babyCondition != null && $babyCondition->congenital_malformation == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Complications at Birth
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="birth_complications" id="delc_birth_complications" onchange="toggleBirthComplications(this)">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $babyCondition != null && $babyCondition->birth_complications == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>                                            
                                    </div>
                                    <div class="form-group row" style="display:none" id="birth_complications_toggle">
                                        <label class="control-label col-md-3">Diagnosis
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="primary_diagnosis_ids[]" id="primary_diagnosis_id" title="Select diagnosis"  data-live-search="true" multiple>
                                                                        
                                                        <!-- php: foreach($standardDiagnoses as $code => $standardDiagnosis) { $idCode = explode(' ', $code); -->
                                                                <option value="<!-- php: = $idCode[0] -->" data-content="<!-- php: = h($standardDiagnosis) -->   <span class='badge badge-danger'><!-- php: = h($idCode[1]) --></span>"><!-- php: = h($standardDiagnosis) --></option>
                                                            <!-- php: } -->
                                                    </SearchableSelectField>
                                                </div>
                                                <div class="col-md-12">
                                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" title="Indicate the procedure" name="procedure_ids[]" id="procedure_ids"  data-live-search="true"  multiple>
                                                        
                                                        <!-- php: foreach($procedures as $code => $procedure) { $idCode = explode(' ', $code); -->
                                                                <option title="<!-- php: = h($idCode[1]) -->" value="<!-- php: = h($idCode[0]) -->" data-content="<!-- php: = h($procedure) -->   <span class='badge badge-danger'><!-- php: = h($idCode[1]) --></span>"><!-- php: = h($procedure) --></option>
                                                            <!-- php: } -->
                                                    </SearchableSelectField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="form-group row" style>
                                        <label class="control-label col-md-3">Complications Diagnosis
                                        </label>
                                        <div class="col-md-7">
                                            <input type="text" value="<!-- php: = $babyCondition != null ? $babyCondition->complications_diagnosis : '' -->" name="complications_diagnosis" id="delc_complications_diagnosis" placeholder="Indication diagnosis of complications at birth if any" class="form-control input-height"/> 
                                        </div>
                                    </div> -->
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Consult To / Referral
                                        </label>
                                        <div class="col-md-7">
                                            <input type="text" value="<!-- php: = $babyCondition != null ? $babyCondition->complications_referred_to : '' -->" name="complications_referred_to" id="delc_complications_referred_to" placeholder="Indication referred to" class="form-control input-height"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="offset-md-3 col-md-7">
                                            <button type="submit" class="btn btn-info">Submit</button>
                                            <button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            <!-- php: =$this->Form->end(); -->
                        </div>
                    </div>

                    <!-- php: if(!isset($babyConditions) || $babyConditions == null || $babyConditions == []) { -->
                        <div class="card card-box" id="no_delivery_child_div">
                            <div class="card-body no-padding height-9">
                                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No record for child's condition</h3>
                            </div>
                        </div>
                    <!-- php: } else { -->
                        <div class="" id="delivery_child_list_div">
                            <!-- php: $childConditionScheme = [ ['name' => 'Delivery Outcome', 'keyIndex' => 'delivery_outcome', 'type' => 'text', 'unit' => ''], ['name' => 'Sex Of Baby', 'keyIndex' => 'sex', 'type' => 'text', 'unit' => ''], ['name' => 'Number Of Babies', 'keyI... -->

                            <div class="table-scrollable">                                
                                <table class="table table-hover order-column full-width">
                                    <thead>
                                        <tr>
                                            <th class="active-table-header">Children</th>
                                            <!-- php: foreach($babyConditions as $key => $value) { -->
                                                <th class="active-table-header">Child - <!-- php: = $key + 1 --></th>
                                            <!-- php: } -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- php: foreach($childConditionScheme as $scheme) { -->
                                            <tr class="odd gradeX">
                                                <th class="active-table-header"><!-- php: = $scheme['name'] --></th>
                                                <!-- php: foreach ($babyConditions as $value): -->
                                                    <td>
                                                        <!-- php: if(null !==($value[$scheme['keyIndex']]) && $value[$scheme['keyIndex']] != null && $scheme['type'] == 'date') { echo ($value[$scheme['keyIndex']])->i18nFormat('d/M/Y'); } else { echo $value[$scheme['keyIndex']]; } echo ' ' . $scheme['unit']... -->
                                                    </td>
                                                <!-- php: endforeach; -->
                                            </tr>
                                        <!-- php: } -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    <!-- php: } -->
                </div>
            </div>
            
            <div class="tab-pane" id="maternal_delivery_discharge_summary">
                <div>
                    <div class="card-head legend-head">
                        <header style="font-weight: 100;">Discharge Summary</header>
                        <div style="float: right;">
                            <a id="add_delivery_summary_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_summary_div, #delivery_summary_div, #add_delivery_summary_button').hide(0);$('#add_delivery_summary_div, #view_delivery_summary_button').show({ direction: 'top' }, 3000)"><!-- php: = (!isset($deliverySummary) || $deliverySummary == null) ? 'Add' : 'Update' --> Discharge Summary</a>
                            <a id="view_delivery_summary_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_delivery_summary_div, #delivery_summary_div, #add_delivery_summary_button').show({ direction: 'top' }, 3000);$('#add_delivery_summary_div,#view_delivery_summary_button').hide(0);" style="display: none;">View Discharge Summary</a>
                        </div>
                    </div>

                    <div class="card card-box" id="add_delivery_summary_div" style="display: none;">
                        <div class="card-body" id="bar-delivery_summary_div">                       
                            <!-- php: = $this->Form->create($deliverySummary, ['id' => 'deliveryDeliverySummaryForm', 'url' => ['controller' => 'Maternal', 'action' => ($deliverySummary != null ? 'updateDeliverySummary' : 'addDeliverySummary'), $patient->id, $selectedVisit->id,... -->
                                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                                <div class="form-body">

                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Heart Rate (b/min)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $deliverySummary != null ? $deliverySummary->heart_rate : '' -->" name="heart_rate" id="dels_heart_rate" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>                                                                                            
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Respiratory Rate (c/min)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $deliverySummary != null ? $deliverySummary->respiratory_rate : '' -->" name="respiratory_rate" id="dels_respiratory_rate" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Temperature (<sup>0</sup>C)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $deliverySummary != null ? $deliverySummary->temperature : '' -->" name="temperature" id="dels_temperature" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Weight (kg)
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-7">
                                            <input type="number" step="any" min="0" value="<!-- php: = $deliverySummary != null ? $deliverySummary->weight : '' -->" name="weight" id="dels_weight" data-required="1" placeholder="" class="form-control input-height" required />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Breast Feeding Initiation
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="breast_feeding_initiation" id="dels_breast_feeding_initiation">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->breast_feeding_initiation == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Baby Suckling Established
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="baby_suckling_established" id="baby_suckling_established">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->baby_suckling_established == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Exclusive Breastfeeding
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="exclusive_breastfeeding" id="exclusive_breastfeeding">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->exclusive_breastfeeding == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Meconium Passed
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="meconium_passed" id="dels_meconium_passed">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->meconium_passed == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Urine Passed
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="urine_passed" id="dels_urine_passed">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->urine_passed == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Chloramphenicol / Tetracycline for Eye Care
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="chlo_for_eye_care" id="dels_chlo_for_eye_care">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->chlo_for_eye_care == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Cord Care
                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="form-control input-height" name="cord_care" id="dels_cord_care" onchange="toggleCordCare()">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($YESNO as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->cord_care == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row" style="display: <!-- php: = $deliverySummary != null && $deliverySummary->cord_care == 'Yes'? '' : 'none' -->" id="cord_care_with">
                                        <label class="control-label col-md-3">
                                            Cord Care With
                                            <span class="required"> * </span>
                                        </label>
                                        <div classd="col-md-7">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="cord_care_with" id="stat_radio" value="chlorhexidine" checked>
                                                <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Chlorhexidine</span></label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="cord_care_with" id="routine_radio" value="methylated_spirit">
                                                <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Methylated Spirit</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Vitamin K (Date)
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input31" data-link-format="yyyy-mm-dd">
                                                <input class="form-control input-height" size="16" placeholder="" value="<!-- php: = $deliverySummary!= null && isset($deliverySummary->vitamin_k_date) ? $deliverySummary->vitamin_k_date->i18nFormat('yyyy-MM-dd') : '' -->" name = "vitamin_k_date" id = "dels_vitamin_k_date" type="text" >
                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input31" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">BCG (Date)
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input32" data-link-format="yyyy-mm-dd">
                                                <input class="form-control input-height" size="16" placeholder="" value="<!-- php: = $deliverySummary!= null && isset($deliverySummary->bcg_date) ? $deliverySummary->bcg_date->i18nFormat('yyyy-MM-dd') : '' -->" name = "bcg_date" id = "dels_bcg_date" type="text" >
                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input32" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Hepatitis B (Date)
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input33" data-link-format="yyyy-mm-dd">
                                                <input class="form-control input-height" size="16" placeholder="" value="<!-- php: = $deliverySummary!= null && isset($deliverySummary->hepatitis_b_date) ? $deliverySummary->hepatitis_b_date->i18nFormat('yyyy-MM-dd') : '' -->" name = "hepatitis_b_date" id = "dels_hepatitis_b_date" type="text" >
                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input33" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Oral Polio (Date)
                                        </label>
                                        <div class="col-md-7">
                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input34" data-link-format="yyyy-mm-dd">
                                                <input class="form-control input-height" size="16" placeholder="" value="<!-- php: = $deliverySummary!= null && isset($deliverySummary->oral_polio_date) ? $deliverySummary->oral_polio_date->i18nFormat('yyyy-MM-dd') : '' -->" name = "oral_polio_date" id = "dels_oral_polio_date" type="text" >
                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                            </div>
                                            <input type="hidden" id="dtp_input34" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Discharge Condition
                                        </label>
                                        <div class="col-md-7">
                                            <!-- php: $DISCHARGE_CONDITIONS = [ 'Normal' => 'Normal', 'Abnormal' => 'Abnormal', ]; -->
                                            <SearchableSelectField class="form-control input-height" name="discharge_condition" id="dels_discharge_condition">
                                                <option value="">Select...</option>
                                                <!-- php: foreach($DISCHARGE_CONDITIONS as $key => $value) { -->
                                                    <option <!-- php: = $deliverySummary != null && $deliverySummary->discharge_condition == $value ? 'selected="selected"' : '' --> value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3">Discharge Condition Details
                                        
                                        </label>
                                        <div class="col-md-7">
                                            <input type="text" value="<!-- php: = $deliverySummary != null ? $deliverySummary->discharge_condition_details : '' -->" name="discharge_condition_details" id="dels_discharge_condition_details" data-required="0" placeholder="" class="form-control input-height" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="offset-md-3 col-md-7">
                                            <button type="submit" class="btn btn-info">Submit</button>
                                            <button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            <!-- php: =$this->Form->end(); -->
                        </div>
                    </div>
                    
                    <!-- php: if(!isset($deliverySummary) || $deliverySummary == null) { -->
                        <div class="card card-box" id="no_delivery_summary_div">
                            <div class="card-body no-padding height-9">
                                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No discharge summary recorded</h3>
                            </div>
                        </div>
                    <!-- php: } else { -->
                        <div class="card-body " id="delivery_summary_div">
                            <div class="card-body no-padding height-9">
                                <ul class="list-group list-group-unbordered">
                                    <li class="list-group-item">
                                        <b>Date</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->has('date_added') ? $deliverySummary->date_added->i18nFormat('d/MM/Y') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Heart Rate</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->heart_rate --> b/min</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Respiratory Rate</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->respiratory_rate --> c/min</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Temperature</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->temperature --> <sup>0</sup>C</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Weight</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->weight --> kg</div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Breastfeeding / Breast Milk Initiation</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->breast_feeding_initiation --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Baby Suckling established</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->baby_suckling_established --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Exclusive Breastfeeding</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->exclusive_breastfeeding --> </div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Meconium Passed</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->meconium_passed --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Urine Passed</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->urine_passed --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Chloramphenicol / Tetracycline for eye care</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->chlo_for_eye_care --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Cord Care</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->cord_care --> <!-- php: = $deliverySummary->cord_care_with != '' && $deliverySummary->cord_care_with != null ? '(with '.$deliverySummary->cord_care_with . ')': '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Vitamin K</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->has('vitamin_k_date') ? $deliverySummary->vitamin_k_date->i18nFormat('d/MM/Y') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>BCG</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->has('bcg_date') ? $deliverySummary->bcg_date->i18nFormat('d/MM/Y') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Hepatitis B</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->has('hepatitis_b_date') ? $deliverySummary->hepatitis_b_date->i18nFormat('d/MM/Y') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Oral Polio</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->has('oral_polio_date') ? $deliverySummary->oral_polio_date->i18nFormat('d/MM/Y') : '' --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Baby's Condition at Discharge</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->discharge_condition --></div>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Details for Abnormal Discharge</b>
                                        <div class="profile-desc-item pull-right"><!-- php: = $deliverySummary->discharge_condition_details --></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <!-- php: } -->
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
	$(document).ready(function() {
        // save tab in local storage
		$('#maternalDeliveryTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('maternalDeliveryLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var maternalDeliveryLastTab = localStorage.getItem('maternalDeliveryLastTab');
		if (maternalDeliveryLastTab) {
		   $('#maternalDeliveryTab a[href=' + maternalDeliveryLastTab + ']').tab('show');
		}		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#maternalDeliveryTab a[data-toggle="tab"]:first').tab('show');
		}
		
	});
    
    function toggleBloodtrans(sel) {
        switch (sel.value) {
            case 'Yes':
                $('#bloodTrans').show()
                break;
            case 'No':
                $('#bloodTrans').hide()
                $('#blood_product_1').val('')
                $('#volume_1').val('')
                $('#transfusion_duration_1').val('')
                break;
        }
        console.log(sel.value)
    }

    $('#toggleLaborComplications').on('click', function() {
        $('#laborComplics').show()
        // $(\`\`).appendTo("#laborComplics");
        document.getElementById("primary_diagnosis_id").setAttribute('required', '');
            return false;
    });

    $('#removeLaborComplics').on('click', function () {
        $('#laborComplics').hide();
        document.getElementById("primary_diagnosis_id").removeAttribute('required');
    })

    function toggleResuscitation(select) {
        switch (select.value) {
            case 'Yes':
                $('#toggleResuscitation').show()
                break;
            case 'No':
                $('#toggleResuscitation').hide()
                break;
        
            default:
                break;
        }
    }
    function toggleBirthComplications(select) {
        switch (select.value) {
            case 'Yes':
                $('#birth_complications_toggle').show()
                break;
            case 'No':
                $('#birth_complications_toggle').hide()
                break;
        
            default:
                break;
        }
    }
    function toggleCordCare() {
        result = $("#dels_cord_care").val();
        if (result == 'Yes') {
            $('#cord_care_with').show()
        }else{
            $("#cord_care_with").hide()
            $("input[type='radio'][name=cord_care_with]").val('');
        }
    }
</script>
`;

export default function ElementElementPatientvisitMaternalDelivery() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
