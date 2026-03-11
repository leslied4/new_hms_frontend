const rawHtml = `

<div class="borderBox light col-md-12">
    <div class="borderBox-title tabbable-line">
        <div class="caption">
            <!-- span class="caption-subject font-dark bold uppercase">Postnatal</span -->
            <header style="color: #558; line-height: 17px; font-size: 20px; font-weight: 600;">Postnatal</header>
        </div>
        
        <ul class="nav nav-tabs" id="maternalPostnatalTab">
            <li class="nav-item">
                <a href="#maternal_postnatal_for_mother" data-toggle="tab">Mother</a>
            </li>

            <li class="nav-item ">
                <a href="#maternal_postnatal_for_child" data-toggle="tab">Child</a>
            </li>
        </ul>
    </div>

    <div class="borderBox-body">
        <div class="tab-content">
            <div class="tab-pane" id="maternal_postnatal_for_mother">
                <div>
                    <div class="card-head legend-head">
                        <header style="font-weight: 100;">Records For Mother</header>
                        <div style="float: right;">
                            <a id="add_postnatal_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_postnatal_div, #postnatal_list_div, #add_postnatal_button').hide(0);$('#add_postnatal_div, #view_postnatals_button').show({ direction: 'top' }, 3000)">Add Mother Postnatal</a>
                            <a id="view_postnatals_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_postnatal_div, #postnatal_list_div, #add_postnatal_button').show({ direction: 'top' }, 3000);$('#add_postnatal_div,#view_postnatals_button').hide(0);" style="display: none;">View Mother Postnatals</a>
                        </div>
                    </div>

                    <div class="card card-box" id="add_postnatal_div" style="display: none;">
                        <div class="card-body" id="bar-postnatal_div">
                            <!-- php: = $this->Form->create(null, ['id' => 'matAddPostnatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addPostnatal', $selectedVisit->patient_id, $selectedVisit->id]]); -->
                                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                                    <div class="form-body">
                                        <div class="form-group row">
                                            <div class="col-md-12">

                                                <!-- div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Session
                                                        <span class="required"> * </span>
                                                        <!-- php: /* $maternalSessions = [ 1 => 'Morning', 2 => 'Afternoon', 3 => 'Evening' ] */ -->
                                                    </label>

                                                    <div class="col-md-7">
                                                        <SearchableSelectField  class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Session" name="session_id" id="session_id" data-live-search="true" required>
                                                            <!-- php: // foreach($maternalSessions as $key => $sessionValue) // { -->
                                                            <option value="<!-- php: // = $key -->"><!-- php: // = $sessionValue --></option>
                                                            <!-- php: // } -->
                                                        </SearchableSelectField>
                                                    </div>
                                                </div -->

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Weight (kg)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" name="weight" id="weight" data-required="1" placeholder="Enter weight" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                    Blood Presure(mmHg)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="text" name="bp" id="bp" data-required="1" placeholder="Enter blood presure" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Pulse (bpm)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" name="heart_rate" id="heart_rate" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <!-- div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Respiratory Rate  (c/min)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" name="respiratory_rate" id="respiratory_rate" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div -->

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Temperature
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" step="0.01" name="temperature" id="temperature" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                    Urine Protein
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="text" name="urine_protein" id="urine_protein" data-required="1" placeholder="Provide urine protein" class="form-control input-height" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                    Urine Sugar
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="text" name="urine_sugar" id="urine_sugar" data-required="1" placeholder="Provide urine sugar" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Fundal Height
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" step="1" name="height" id="height_pnc" data-required="1" placeholder="Enter fundal height" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                    Lochia Color
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="text" name="colour" id="colour" data-required="1" placeholder="Provide color" class="form-control input-height" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                    Lochia Odour
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="text" name="odour" id="odour" data-required="1" placeholder="Enter odour" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Incision Perineum/CS
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="incision" id="incision" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Clean">Clean</option>
                                                            <option value="Infected">Infected</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div> 
                                                
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Breast & Nipple
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="breast_nipple" id="breast_nipple" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Lacting">Lacting</option>
                                                            <option value="Not Lacting">Not Lacting</option>
                                                            <option value="Engorged">Engorged</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Mood Changes
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="mood" id="mood" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                    Iron-Folic Acid
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="text" name="iron" id="iron" data-required="1" placeholder="Enter supplied days" class="form-control input-height" />
                                                    </div>
                                                </div>   

                                                <!-- div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Date
                                                    </label>
                                                    <div class="col-md-7">
                                                        <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                            <input class="form-control input-height" placeholder="Select Date" name="date_added" id="date_added" type="text" value="">
                                                            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                        </div>
                                                        <input type="hidden" id="dtp_input2" value="" />
                                                    </div>
                                                </div -->

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Remarks
                                                    </label>
                                                    <div class="col-md-7">
                                                        <textarea type="text" name="remarks" id="remarks" data-required="1" placeholder="Provide comment" class="form-control"></textarea>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Date of next visit
                                                    </label>
                                                    <div class="col-md-7">
                                                        <div class="input-group date form_date " data-date="" title="Select date of next visit" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                            <input class="form-control input-height" placeholder="Select Date" name="date_of_next_visit" id="date_of_next_visit" type="text" value="">
                                                            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                        </div>
                                                        <input type="hidden" id="dtp_input2" value="" />
                                                    </div>
                                                </div>
                                                
                                                <input type="hidden" id="hidden" name="request_type" value="new_maternal_care_mother_postnatal">
                                                <div class="row">
                                                    <div class="offset-md-3 col-md-8">
                                                        <button type="submit" class="btn bg-blue btn-labeled ml-auto"><b><i class="icon-paperplane"></i></b>Save</button>
                                                        <button type="button" class="btn btn-default" onclick='clearChild()'>Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                             
                            <!-- php: =$this->Form->end(); -->
                        </div>
                    </div>
                    
                    <!-- php: if(!isset($postnatalList) || $postnatalList == null) { -->
                        <div class="card card-box" id="no_postnatal_div">
                            <div class="card-body no-padding height-9">
                                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No postnatal recorded for mother</h3>
                            </div>
                        </div>
                    <!-- php: } else { -->
                        <div class="card-body " id="postnatal_list_div">
                            <div class="table-scrollable">        
                                <table class="table table-hover order-column full-width customDataTable" id="maternal_postnatal_table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Weight</th>
                                            <th>BP</th>
                                            <th>Pulse</th>
                                            <th>Fundal Height</th>
                                            <th>Breast and Nipple</th>
                                            <th>Mood</th>
                                            <th>IFA</th>
                                            <th>Remarks</th>
                                            <th>Next</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- php: foreach ($postnatalList as $postnatal): -->
                                        <tr class="odd gradeX">
                                            <td><!-- php: = $postnatal->date_added != null ? $postnatal->date_added->i18nFormat('d/M/Y') : '' --></td>
                                            <td><!-- php: = $postnatal->weight --></td>
                                            <td><!-- php: = $postnatal->bp --></td>
                                            <td><!-- php: = $postnatal->heart_rate --></td>
                                            <td><!-- php: = $postnatal->height --></td>
                                            <td><!-- php: = $postnatal->breast_nipple --></td>
                                            <td><!-- php: = $postnatal->mood --></td>
                                            <td><!-- php: = $postnatal->iron --></td>
                                            <td><!-- php: = $postnatal->remarks --></td>
                                            <td><span class="badge badge-<!-- php: = $theme2 -->"><i class="fa fa-calender"></i><!-- php: = $postnatal->date_of_next_visit != null ? $postnatal->date_of_next_visit->i18nFormat('d/M/Y') : '' --></span></td>
                                        </tr>
                                        <!-- php: endforeach; -->
                                    </tbody>
                                </table>                                                                                                
                            </div>

                        </div>
                    <!-- php: } -->
                </div>
            </div>

            <div class="tab-pane" id="maternal_postnatal_for_child">
                <div>
                    <div class="card-head legend-head">
                        <header style="font-weight: 100;">Records For Child</header>
                        <div style="float: right;">
                            <a id="add_postnatal_child_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_postnatal_child_div, #postnatal_child_list_div, #add_postnatal_child_button').hide(0);$('#add_postnatal_child_div, #view_postnatals_child_button').show({ direction: 'top' }, 3000)">Add Child Postnatal</a>
                            <a id="view_postnatals_child_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_postnatal_child_div, #postnatal_child_list_div, #add_postnatal_child_button').show({ direction: 'top' }, 3000);$('#add_postnatal_child_div,#view_postnatals_child_button').hide(0);" style="display: none;">View Child Postnatals</a>
                        </div>
                    </div>

                    <div class="card card-box" id="add_postnatal_child_div" style="display: none;">
                        <div class="card-body" id="bar-postnatal_child_div">
                            <!-- php: = $this->Form->create(null, ['id' => 'matChildPostnatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addChildPostnatal', $patient->id, $selectedVisit->id]]); -->

                                <div class="form-body">

                                    <div class="form-group row">

                                        <div class="col-md-12">

                                            <fieldset>
                                                <legend class="text-danger"><strong>Vitals</strong></legend>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Session
                                                        <span class="required"> * </span>
                                                        <!-- php: $maternalSessions = [ 1 => 'Morning', 2 => 'Afternoon', 3 => 'Evening' ] -->
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField  class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Session" name="session_id" id="session_id" data-live-search="true" required>
                                                            <!-- php: foreach($maternalSessions as $key => $sessionValue) { -->
                                                            <option value="<!-- php: = $key -->"><!-- php: = $sessionValue --></option>
                                                            <!-- php: } -->
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Weight (kg)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" name="weight" id="weight" data-required="1" placeholder="Enter weight" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Length (cm)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="1" name="length" id="length" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Head Circumference (cm)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="1" name="circumference" id="circumference" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Heart Rate (bpm)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" name="heart_rate" id="heart_rate" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Respiration  (c/min)
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" name="respiration_rate" id="respiration_rate" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div>


                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Temperature
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="number" min="0" step="0.01" name="temperature" id="temperature" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                                                    </div>
                                                </div>
                                            </fieldset>


                                            <fieldset>
                                                <legend><strong>Activity</strong></legend>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Feeding
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="feeding" id="feeding" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Activities
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="activities" id="activities" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>

                                            </fieldset>

                                            <fieldset>
                                                <legend><strong>Body Review</strong></legend>


                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Pallor
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="pallor" id="pallor" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Jaundice
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="jaundice" id="jaundice" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Head
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="head" id="head" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Eyes
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="eyes" id="eyes" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Abdomen
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="abdomen" id="abdomen" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Limbs
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="limbs" id="limbs" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Back
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="back" id="back" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="1">Normal</option>
                                                            <option value="2">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Neck
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="neck" id="neck" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Skin
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="skin" id="skin" required>
                                                            <option value="">--  select  --</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Abnormal">Abnormal</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>


                                            </fieldset>

                                            <fieldset>
                                                <legend><strong> Condition</strong></legend>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Passing Urine
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" name="passing_urine" id="passing_urine" required>
                                                            <option value="">--  passing urine ? --</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Passing Stools
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-7">
                                                        <SearchableSelectField class="form-control input-height" data-size="10" title="Select passing tools" name="passing_tools" id="passing_tools" required>
                                                            <option value="">--  passing tools ? --</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Condition of umbilical cord
                                                    </label>
                                                    <div class="col-md-7">
                                                        <input type="text" name="condition_umbilical_cord" id="condition_umbilical_cord" data-required="1" placeholder="Provide condition of umbilicatl cord" class="form-control input-height" />
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset>
                                                <legend><strong> Remarks & Comments</strong></legend>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Date
                                                    </label>
                                                    <div class="col-md-7">
                                                        <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                            <input class="form-control input-height" placeholder="Select Date" name="date_added" id="date_added" type="text" value="">
                                                            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                        </div>
                                                        <input type="hidden" id="dtp_input2" value="" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Date of next visit
                                                    </label>
                                                    <div class="col-md-7">
                                                        <div class="input-group date form_date " data-date="" title="Select date of next visit" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                            <input class="form-control input-height" placeholder="Select Date" name="date_of_next_visit" id="date_of_next_visit" type="text" value="">
                                                            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                        </div>
                                                        <input type="hidden" id="dtp_input2" value="" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Remarks
                                                    </label>
                                                    <div class="col-md-7">
                                                        <textarea type="text" name="remarks" id="remarks" data-required="1" placeholder="Provide comment" class="form-control textarea-height">
                                                        </textarea>
                                                    </div>
                                                </div>

                                                <input type="hidden" id="hidden" name="request_type" value="new_maternal_care_child_postnatal">
                                                <div class="row">
                                                    <div class="offset-md-3 col-md-8">
                                                        <button type="submit" class="btn bg-blue btn-labeled ml-auto"><b><i class="icon-paperplane"></i></b>Save</button>
                                                        <button type="button" class="btn btn-default" onclick='clearChild()'>Reset</button>
                                                    </div>
                                                </div>

                                            </fieldset>

                                        </div>
                                    </div>
                                </div>
                            <!-- php: =$this->Form->end(); -->
                        </div>
                    </div>

                    <!-- php: if(!isset($postnatalChildList) || $postnatalChildList == null) { -->
                        <div class="card card-box" id="no_postnatal_child_div">
                            <div class="card-body no-padding height-9">
                                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No postnatal recorded for child</h3>
                            </div>
                        </div>
                    <!-- php: } else { -->
                        <div class="card-body " id="postnatal_child_list_div">
                            <div class="table-scrollable">                                
                                <table class="table table-hover order-column full-width customDataTable" id="maternal_child_postnatal_table">
                                    <thead>
                                        <tr>
                                            <th> Date</th>
                                            <th> Session </th>
                                            <th> Next Visit </th>
                                            <th> Weight </th>
                                            <th> Temperature </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- php: foreach ([] as $value): -->
                                        <tr class="odd gradeX">
                                            <td><!-- php: = $value->date_added --></td>
                                            <td><!-- php: = $value->has('session') ? $value->session->name : '' --></td>
                                            <td><!-- php: = $value->date_of_next_visit --></td>
                                            <td><!-- php: = $value->weight --></td>
                                            <td><!-- php: = $value->temperature --></td>
                                        </tr>                                                    
                                        <!-- php: endforeach; -->
                                    </tbody>
                                </table>
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
		$('#maternalPostnatalTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('maternalPostnatalLastTaba', $(this).attr('href'));
		});
		
		// display last tab if exist
		var maternalPostnatalLastTab = localStorage.getItem('maternalPostnatalLastTaba');
		if (maternalPostnatalLastTab) {
		   $('#maternalPostnatalTab a[href=' + maternalPostnatalLastTab + ']').tab('show');
		}		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#maternalPostnatalTab a[data-toggle="tab"]:first').tab('show');
		}
		
	});
</script>
`;

export default function ElementElementPatientvisitMaternalPostnatalChildFirstBase() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
