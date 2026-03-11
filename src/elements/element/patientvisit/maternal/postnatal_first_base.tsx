const rawHtml = `
<div class="col-md-12">
    <div class="card-head legend-head">
        <header>Postnatal</header>
        <div style="float: right;">
            <a id="add_postnatal_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_postnatal_div, #postnatal_list_div, #add_postnatal_button').hide(0);$('#add_postnatal_div, #view_postnatals_button').show({ direction: 'top' }, 3000)">Add Postnatal</a>
            <a id="view_postnatals_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_postnatal_div, #postnatal_list_div, #add_postnatal_button').show({ direction: 'top' }, 3000);$('#add_postnatal_div,#view_postnatals_button').hide(0);" style="display: none;">View Postnatals</a>
        </div>
    </div>

    <div class="card card-box" id="add_postnatal_div" style="display: none;">
        <div class="card-body" id="bar-postnatal_div">
            <!-- php: = $this->Form->create(null, ['id' => 'addPostnatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addPostnatal', $selectedVisit->patient_id, $selectedVisit->id]]); -->
                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                <div class="form-body">
                        
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
                                Blood Presure(mmHg)
                                </label>
                                <div class="col-md-7">
                                    <input type="text" name="bp" id="bp" data-required="1" placeholder="Enter blood presure" class="form-control input-height" />
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
                                    Respiratory Rate  (c/min)
                                </label>
                                <div class="col-md-7">
                                    <input type="number" min="0" name="respiratory_rate" id="respiratory_rate" data-required="1" placeholder="Provide comment" class="form-control input-height" />
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
                            <legend><strong>Investigation & Examination</strong></legend>

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
                        </fieldset>

                        <fieldset>
                            <legend><strong>Condition</strong></legend>

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
                                    <textarea type="text" name="remarks" id="remarks" data-required="1" placeholder="Provide comment" class="form-control">
                                    </textarea>
                                </div>
                            </div>

                            
                            <input type="hidden" id="hidden" name="request_type" value="new_maternal_care_mother_postnatal">
                            <div class="row">
                                <div class="offset-md-3 col-md-8">
                                    <button type="submit" class="btn bg-blue btn-labeled ml-auto"><b><i class="icon-paperplane"></i></b>Save</button>
                                    <button type="button" class="btn btn-default" onclick='clearChild()'>Reset</button>
                            </div>
                            </div>

                        </fieldset>

                        </div>
                </div>                             
            <!-- php: =$this->Form->end(); -->
        </div>
    </div>
    
    <!-- php: if(!isset($postnatalList) || $postnatalList == null) { -->
        <div class="card card-box" id="no_postnatal_div">
            <div class="card-body no-padding height-9">
                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No postnatal recorded</h3>
            </div>
        </div>
    <!-- php: } else { -->
        <div class="card-body " id="postnatal_list_div">
            <div class="table-scrollable">        
                <table class="table table-hover order-column full-width customDataTable" id="maternal_postnatal_table">
                    <thead>
                        <tr>
                            <th> Date</th>
                            <th> Session </th>
                            <th> Next Visit </th>
                            <th> Weight </th>
                            <th> BP </th>
                            <th> Heart Rate </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- php: foreach ($postnatalList as $postnatal): -->
                        <tr class="odd gradeX">
                            <td><!-- php: = $postnatal->date_added --></td>
                            <td><!-- php: = $postnatal->has('session') ? $postnatal->session->name : '' --></td>
                            <td><!-- php: = $postnatal->date_of_next_visit --></td>
                            <td><!-- php: = $postnatal->weight --></td>
                            <td><!-- php: = $postnatal->bp --></td>
                            <td><!-- php: = $postnatal->heart_rate --></td>
                        </tr>
                        <!-- php: endforeach; -->
                    </tbody>
                </table>                                                                                                
            </div>

        </div>
    <!-- php: } -->
</div>

`;

export default function ElementElementPatientvisitMaternalPostnatalFirstBase() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
