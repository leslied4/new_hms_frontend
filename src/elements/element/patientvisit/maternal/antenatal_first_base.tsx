const rawHtml = `
<div class="col-md-12">
    <div class="card-head legend-head">
        <header>Antenatal</header>
        <div style="float: right;">
            <a id="add_antenatal_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_antenatal_div, #antenatal_list_div, #add_antenatal_button').hide(0);$('#add_antenatal_div, #view_antenatals_button').show({ direction: 'top' }, 3000)">Add Antenatal</a>
            <a id="view_antenatals_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_antenatal_div, #antenatal_list_div, #add_antenatal_button').show({ direction: 'top' }, 3000);$('#add_antenatal_div,#view_antenatals_button').hide(0);" style="display: none;">View Antenatals</a>
        </div>
    </div>

    <div class="card card-box" id="add_antenatal_div" style="display: none;">
        <div class="card-body" id="bar-antenatal_div">
            <!-- php: = $this->Form->create(null, ['id' => 'addAntenatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addAntenatal', $selectedVisit->patient_id, $selectedVisit->id]]); -->
                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                <div class="form-body">
                    <fieldset>
                        <!-- legend><strong>Vitals</strong></legend>
                        <div class="form-group row">
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
                                Fetal Heart Rate (bpm)
                            </label>
                            <div class="col-md-7">
                                <input type="number" min="0" name="heart_rate" id="heart_rate" data-required="1" placeholder="Provide comment" class="form-control input-height" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-3">
                                Fundal Height (cm)
                            </label>
                            <div class="col-md-7">
                                <input type="number" min="1" name="height" id="height" data-required="1" placeholder="Enter height" class="form-control input-height" />
                            </div>
                        </div>   
                        <div class="form-group row">
                            <label class="control-label col-md-3">
                            Presentation
                            </label>
                            <div class="col-md-7">
                                <input type="text" name="presentation" id="presentation" data-required="1" placeholder="Enter presentation" class="form-control input-height" />
                            </div>
                        </div>  
                        <div class="form-group row">
                            <label class="control-label col-md-3">
                            Descent
                            </label>
                            <div class="col-md-7">
                                <input type="text" name="descent" id="descent" data-required="1" placeholder="Enter descent" class="form-control input-height" />
                            </div>
                        </div>                                                                                 

                    </fieldset>

                    <hr/>

                    <fieldset>
                        <legend><strong>Investigation & Examination</strong></legend>
                        <div class="form-group row">
                            <label class="control-label col-md-3">
                            Gestation Age/Weeks
                            </label>
                            <div class="col-md-7">
                                <input type="text" name="gestation" id="gestation" data-required="1" placeholder="Provide gestation days or weeks" class="form-control input-height" />
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
                                                                                    
                    </fieldset>

                    <hr/>

                    <fieldset>
                        <legend><strong>Condition</strong></legend>                                                                                       
                        <div class="form-group row">
                            <label class="control-label col-md-3">
                            Iron-Folic Acid
                            </label>
                            <div class="col-md-7">
                                <input type="text" name="iron" id="iron" data-required="1" placeholder="Enter supplied days" class="form-control input-height" />
                            </div>
                        </div>                                                      
                    </fieldset>

                    <hr/>
                
                    <fieldset>
                        <legend><strong> Remarks & Comments</strong></legend>
                        
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
                                <textarea type="text" name="remarks" id="remarks" data-required="1" placeholder="Provide comment" class="form-control"></textarea>
                            </div>
                        </div>

                        <input type="hidden" id="hidden" name="request_type" value="new_maternal_care_mother_antenatal">
                        <div class="row">
                            <div class="offset-md-3 col-md-8">
                                <button type="submit" class="btn bg-blue btn-labeled ml-auto"><b><i class="icon-paperplane"></i></b>Save</button>
                                <button type="button" class="btn btn-default" onclick='clearChildAntenatal()'>Reset</button>
                            </div>
                        </div>

                    </fieldset>

                </div>                               
            <!-- php: =$this->Form->end(); -->
        </div>
    </div>

    <!-- php: if(!isset($antenatalList) || $antenatalList == null) { -->
        <div class="card card-box" id="no_antenatal_div">
            <div class="card-body no-padding height-9">
                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No antenatal recorded</h3>
            </div>
        </div>
    <!-- php: } else { -->
        <div class="card-body" id="antenatal_list_div">
            <div class="table-scrollable">        
                <table class="table table-hover order-column full-width customDataTable" id="maternal_antenatal_table">
                    <thead>
                        <tr>
                            <th>Visit</th>
                            <th>Next</th>
                            <th>Weight</th>
                            <th>BP</th>
                            <th>Pres</th>
                            <th>Descent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- php: foreach ($antenatalList as $antenatal): -->
                        <tr class="odd gradeX">
                            <td><!-- php: = $antenatal->date_added != null ? $antenatal->date_added->i18nFormat('d/M/Y') : '' --></td>
                            <td><!-- php: = $antenatal->date_of_next_visit != null ? $antenatal->date_of_next_visit->i18nFormat('d/M/Y') : '' --></td>
                            <td><!-- php: = $antenatal->weight --></td>
                            <td><!-- php: = $antenatal->bp --></td>
                            <td><!-- php: = $antenatal->presentation --></td>
                            <td><!-- php: = $antenatal->descent --></td>
                            <td><!-- php: = $antenatal->heart_rate --></td>
                        </tr>
                        <!-- php: endforeach; -->
                    </tbody>
                </table>                                                                                                
            </div>

        </div>
    <!-- php: } -->
</div>

`;

export default function ElementElementPatientvisitMaternalAntenatalFirstBase() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
