const rawHtml = `
<!-- php: // 'MaternalMotherAntenatals', 'MaternalCurrentPregnancies', 'MaternalChildPostnatals', 'MaternalMotherPostnatals' $maternalChildPostnatals = $selectedVisit->maternal_child_postnatals; $maternalMotherPostnatals = $selectedVisit->maternal_mo... -->
<style>
     fieldset {
        border-style: solid;
        border-width: 1px;
        padding: 10px;
        border-color: #dddddd;
    }
</style>

<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <div class="caption">
                <span class="caption-subject font-dark bold uppercase">Maternal Care</span>
            </div>
            <ul class="nav nav-tabs" id="maternalTab">
                <li class="nav-item ">
                    <a href="#borderBox_care_currentpregnancy" data-toggle="tab">Current Pregnancy</a>
                </li>
                <li class="nav-item ">
                    <a href="#borderBox_care_mother" data-toggle="tab">Mother</a>
                </li>
                <li class="nav-item ">
                    <a href="#borderBox_care_child" data-toggle="tab">Child</a>
                </li>
                <li class="nav-item ">
                    <a href="#maternalHistory" data-toggle="tab">History</a>
                </li>
            </ul>
        </div>
		
        <div class="borderBox-body">
            <div class="tab-content">

                <div class="tab-pane current_pregnancy_content" id="borderBox_care_currentpregnancy">	
                    <div class="borderBox light bordered col-md-12">

                        <div class="borderBox-title tabbable-line">
                            <div class="caption">
                                <span class="caption-subject font-dark bold uppercase">Current Pregnancy</span>
                            </div>
                            <ul class="nav nav-tabs">
                                <li class="nav-item ">
                                    <a href="#borderBox_tab29" data-toggle="tab"> Add </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#borderBox_tab30" data-toggle="tab"> View </a>
                                </li>
                            </ul>
                        </div>

                        <div class="borderBox-body">
                            <div class="tab-content">

                                <div class="tab-pane currentpregnancy_add_currentpregnancy" id="borderBox_tab29">
                                    <!-- php: = $this->Form->create(null, ['id' => 'currentPregnancyForm', 'url' => ['controller' => 'Maternal', 'action' => 'addCurrentPregnancy', $patient->id, $selectedVisit->id]]); -->
                                    <div class="form-body">

                                    <div id="error" class="alert alert-danger" style="display:none;"></div>
										<div id="success" class="alert alert-success" style="display:none;"></div>

										<div class="form-body">

											<div class="form-group row">

												<div class="col-md-12">

													<fieldset>
														<legend class="text-danger"><strong>Current Pregnancy</strong></legend>                                                                           
														<div class="form-group row">
															<label class="control-label col-md-3">
																Date of Last Menstrual Period (LMP)
															</label>
															<div class="col-md-5">
																<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																	<input class="form-control input-height" placeholder="Select Date" name="last_menstrual_period_date" id="last_menstrual_period_date" type="text" value="">
																	<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																</div>
																<input type="hidden" id="dtp_input2" value="" />
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">
															   Estimate of Devery Date (EDD)
															</label>
															<div class="col-md-5">
																<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																	<input class="form-control input-height" placeholder="Select Date" name="estimated_delivery_date" id="estimated_delivery_date" type="text" value="">
																	<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																</div>
																<input type="hidden" id="dtp_input2" value="" />
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">
																Weight (kg)
															</label>
															<div class="col-md-5">
																<input type="number" min="0" name="weight" id="weight" data-required="1" placeholder="Enter weight" class="form-control input-height" />
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">
																Height (cm)
															</label>
															<div class="col-md-5">
																<input type="number" min="1" name="height" id="height" data-required="1" placeholder="Enter height" class="form-control input-height" />
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">
																BMI at ANCI (Before 12 Weeks)
															</label>
															<div class="col-md-5">
																<input type="text" name="bmi" id="bmi" data-required="1" placeholder="Enter BMI at ANCI" class="form-control input-height" />
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">
																Estimate of Desired Weight (EDD/kg)
															</label>
															<div class="col-md-5">
																<input type="number" min="0" name="estimated_desired_weight" id="estimated_desired_weight" data-required="1" placeholder="Enter estimated desired weight" class="form-control input-height" />
															</div>
														</div>
													</fieldset>


													<fieldset>
														<legend><strong>Contraception</strong></legend>
														<div class="form-group row">
															<label class="control-label col-md-3">
																Contraception Type
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
																<SearchableSelectField class="form-control input-height" name="contraception_type_id" id="contraception_type_id" data-size="10" title="select contraception"  required>
																	
																	<option>Select</option>
																	<!-- php: foreach($contraceptionTypes as $key => $value) { -->
																		<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																		<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>   
														
														<div class="row">
															<div class="offset-md-3 col-md-8">
																<button type="submit" class="btn bg-blue btn-labeled ml-auto"><b><i class="icon-paperplane"></i></b>Save</button>
																<button type="button" class="btn btn-default" onclick='clearCurrentPregnancy()'>Reset</button>
															</div>
														</div>                                                                                                                             
													</fieldset>
												</div>
											</div>
										</div>                                       
                                    </div>
                                    <!-- php: =$this->Form->end(); -->
                                </div>

                                <div class="tab-pane currentpregnancy_view_currentpregnancy active" id="borderBox_tab30">

                                    <div class="card  card-box">
                                        <div class="card-body ">
                                        <div class="table-scrollable">
                                            <table class="table table-hover order-column full-width customDataTable">
                                                <thead>
													<tr>
														<th> Last Menstrual Period (LMP)</th>
														<th> Estimated Delivery Date (EDD) </th>
														<th> Weight (kg) </th>
														<th> Height (cm) </th>
														<th> BMI at ANCI </th>
														<th> EDD (kg) </th>
													</tr>
                                                </thead>
                                                <tbody>
                                                <!-- php: $x = 1; foreach ($maternalCurrentPregnancies as $value): -->							
                                                    <tr class="odd gradeX">
                                                    <tr>
														<td><!-- php: = $value->last_menstrual_period_date->i18nFormat('Y-MM-dd') --></td>
                                                        <td><!-- php: = $value->estimated_delivery_date->i18nFormat('Y-MM-dd') --></td>
														<td><!-- php: = $value->weight --></td>
														<td><!-- php: = $value->height --></td>
														<td><!-- php: = $value->bmi --></td>
														<td><!-- php: = $value->estimated_desired_weight --></td>
                                                    </tr>
                                                    
                                                    <div class="modal fade" id="editCurrentPregnancyDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h4 class="modal-title" id="editStockItemDialogueTitle">Current Pregnancy</h4>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            
                                                            <div class="row">
                                                                <div class="col-md-12 col-sm-12">
                                                                    <div class="card card-box">
                                                                        <div class="card-head">
                                                                            <header>Edit Summary Details</header>
                                                                        </div>
                                                                        <div class="card-body" id="bar-parent">
                                                                            <!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Maternal', 'action' => 'editCurrentPregnancy', $patient->id, $selectedVisit->id], 'class' => 'form-horizontal']) -->
                                                                                <div class="form-body">																										
                                                                                    <div class="form-group row">
                                                                                        <label class="control-label col-md-4">	
                                                                                            Number of Pregnancies
                                                                                            <span class="required"> * </span>
                                                                                        </label>
                                                                                        <div class="col-md-8">
                                                                                            <input type="number" name="pregnancies_number" id="pregnancies_number" data-required="0" value="<!-- php: = $value->pregnancies_number -->" placeholder="Enter number of pregnancies" class="form-control input-height" required/> 
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="form-group row">
                                                                                        <label class="control-label col-md-4">
                                                                                            Number of Births			
                                                                                            <span class="required"> * </span>				
                                                                                        </label>
                                                                                        <div class="col-md-8">
                                                                                            <input type="number" name="births_number" id="births_number" data-required="0" value="<!-- php: = $value->births_number -->" placeholder="Enter number of births" class="form-control input-height" required/> 
                                                                                        </div>
                                                                                    </div>     
                                                                                    <div class="form-group row">
                                                                                        <label class="control-label col-md-4">
                                                                                            Number of Abortions	
                                                                                            <span class="required"> * </span>						
                                                                                        </label>
                                                                                        <div class="col-md-8">
                                                                                            <input type="number" name="abortions_number" id="abortions_number" data-required="0" value="<!-- php: = $value->abortions_number -->" placeholder="Enter number of abortions" class="form-control input-height" required/> 
                                                                                        </div>
                                                                                    </div>             
                                                                                    <div class="form-group row">
                                                                                        <label class="control-label col-md-4">
                                                                                        Last Mentrual Period	
                                                                                        </label>
                                                                                        <div class="col-md-8">
                                                                                            <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                                                                <input class="form-control input-height" placeholder="Select Date" name="last_menstrual_period_date" id="last_menstrual_period_date" value="<!-- php: = $value->last_menstrual_period_date -->" type="text" value="">
                                                                                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                                                            </div>
                                                                                            <input type="hidden" id="dtp_input2" value="" />
                                                                                        </div>
                                                                                    </div>                                                    																						                                                              
                                                                                    <div class="form-group row">
                                                                                        <label class="control-label col-md-4">
                                                                                            Breastfeed Last Child ? If NO, indicate why
                                                                                            <span class="required"> * </span>
                                                                                        </label>
                                                                                        <div class="col-md-8">
                                                                                            <SearchableSelectField  value="<!-- php: = $value->last_child_breastfeed -->" class="form-control input-height" data-size="10" name="last_child_breastfeed" id="last_child_breastfeed" required>
                                                                                                <option value="1">Yes</option>
                                                                                                <option value="0">No</option>
                                                                                            </SearchableSelectField>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="form-group row">
                                                                                            <label class="control-label col-md-4">
                                                                                                Duration of Exclusive Breastfeeding							
                                                                                            </label>
                                                                                            <div class="col-md-8">
                                                                                                <input type="text" name="exclusive_duration_breastfeeding" id="exclusive_duration_breastfeeding" data-required="0" value="<!-- php: = $value->exclusive_duration_breastfeeding -->" class="form-control input-height" /> 
                                                                                            </div>
                                                                                    </div>  
                                                                                    <div class="form-group row">
                                                                                            <label class="control-label col-md-4">
                                                                                                Duration of Breastfeeding							
                                                                                            </label>
                                                                                            <div class="col-md-8">
                                                                                                <input type="text" name="duration_breastfeeding" id="duration_breastfeeding" data-required="0" value="<!-- php: = $value->duration_breastfeeding -->" class="form-control input-height" /> 
                                                                                            </div>
                                                                                    </div>  

                                                                                </div>

                                                                                <div class="form-actions">
                                                                                    <div class="row">
                                                                                        <div class="offset-md-4 col-md-8">
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
                                                <!-- php: $x++; endforeach; -->									
                                                </tbody>
                                            </table>


                                            </div>
                                        </div>
                                        </div>
                                
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

				<div class="tab-pane care_mother_content" id="borderBox_care_mother">	
                    <div class="borderBox light bordered col-md-12">

                        <div class="borderBox-title tabbable-line">
                            <div class="caption">
                                <span class="caption-subject font-dark bold uppercase">Mother</span>
                            </div>
                            <ul class="nav nav-tabs">
                                <li class="nav-item mothercare_add_mothercare">
                                    <a href="#borderBox_tab40" data-toggle="tab"> Add </a>
                                </li>                              
                                <li class="nav-item mothercare_view_mothercare_antenatal">
                                    <a href="#borderBox_tab41" data-toggle="tab"> View Antenatal </a>
                                </li>
                                <li class="nav-item deliveries_view_deliveries">
                                    <a href="#borderBox_tab42" data-toggle="tab"> View Delivery </a>
                                </li>
                                <li class="nav-item mothercare_view_mothercare_postnatal">
                                    <a href="#borderBox_tab43" data-toggle="tab"> View Postnatal </a>
                                </li>
                            </ul>
                        </div>

                        <div class="borderBox-body">
                            <div class="tab-content">



                                        <div class="tab-pane mothercare_add_mothercare" id="borderBox_tab40">

                                            <h3>Add a new case</h3>
                                            <div class="form-group row">
                                                    <label class="control-label col-md-3">
                                                        Case Category
                                                        <span class="required"> * </span>
                                                    </label>
                                                    <div class="col-md-5">
                                                        <SearchableSelectField onchange="PopupModalMother();" class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select case category" name="case_category_id1" id="case_category_id1" data-live-search="true" required>
                                                            <option><!-- php: = 'Antenatal' --></option>
                                                            <option><!-- php: = 'Delivery' --></option>
                                                            <option><!-- php: = 'Postnatal' --></option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>

                                            <div class="form-body">                                              

                                                <!-- php: = $this->Form->create(null, ['id' => 'motherPostnatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addPostnatal', $patient->id, $selectedVisit->id]]); -->
                                                    <!-- modals-->
                                                    <div class="row">
                                                        <!-- Horizontal form modal -->
                                                        <div id="modal_form_horizontal1" class="modal fade" tabindex="-1" role="dialog">
                                                            <div class="modal-dialog modal-lg">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title">Add New Postnatal Care Mother</h5>
                                                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                    </div>

                                                                    <div class="modal-body">

                                                                        <div id="error" class="alert alert-danger" style="display:none;"></div>
                                                                        <div id="success" class="alert alert-success" style="display:none;"></div>


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
                                                                        </div>
                                                                    </div>
                                                                    <!-- /horizontal form modal -->
                                                                </div>
                                                                <!-- modals-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- modals-->                                               
                                                <!-- php: =$this->Form->end(); -->


                                                <!-- php: = $this->Form->create(null, ['id' => 'motherAntenatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addAntenatal', $patient->id, $selectedVisit->id]]); -->
                                                    <!-- modals-->
                                                    <div class="row">
                                                        <!-- Horizontal form modal -->
                                                        <div id="modal_form_horizontal_mother_antenatal" class="modal fade" tabindex="-1" role="dialog">
                                                            <div class="modal-dialog modal-lg">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title">Add New Antenatal Care Mother</h5>
                                                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                    </div>

                                                                    <div class="modal-body">

                                                                        <div id="error" class="alert alert-danger" style="display:none;"></div>
                                                                        <div id="success" class="alert alert-success" style="display:none;"></div>


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
                                                                                                Height (cm)
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
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- /horizontal form modal -->
                                                                </div>
                                                                <!-- modals-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- modals-->                                               
                                                <!-- php: =$this->Form->end(); -->

                                            </div>
                                        </div>


                                        
                                         <!-- delivery modals-->
                                        <div class="row">
                                                    <!-- Horizontal form modal -->
                                                    <div id="modal_form_horizontal_delivery_mother" class="modal fade" tabindex="-1" role="dialog">
                                                        <div class="modal-dialog modal-lg">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title">Add New Delivery</h5>
                                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                </div>

                                                                <div class="modal-body">

                                                                    <div id="error" class="alert alert-danger" style="display:none;"></div>
                                                                    <div id="success" class="alert alert-success" style="display:none;"></div>

                                                                        <div class="tab-pane deliveries_add_delivery " id="borderBox_tab22">
                                                                            <!-- php: = $this->Form->create(null, ['id' => 'deliveryForm', 'url' => ['controller' => 'Maternal', 'action' => 'addDelivery', $patient->id, $selectedVisit->id]]); -->
                                                                                <fieldset>
                                                                                <legend class="text-danger"><strong>Delivery</strong></legend>
                                                                        
                                                                                    <div class="form-body">
                                                                                        <div class="form-group row">
                                                                                            <label class="control-label col-md-3">Admission Date
                                                                                                <span class="required"> * </span>
                                                                                            </label>
                                                                                            <div class="col-md-7">
                                                                                                <div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                                                                    <input class="form-control input-height" size="16" placeholder="" name = "admission_date" id = "admission_date" type="text" value="" required >
                                                                                                    <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                                                                </div>
                                                                                                <input type="hidden" id="dtp_input2" value="" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                            <label class="control-label col-md-3">Delivery Date
                                                                                                <span class="required"> * </span>
                                                                                            </label>
                                                                                            <div class="col-md-7">
                                                                                                <div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                                                                    <input class="form-control input-height" size="16" placeholder="" name = "delivery_date" id = "delivery_date" type="text" value="" required >
                                                                                                    <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                                                                </div>
                                                                                                <input type="hidden" id="dtp_input2" value="" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                            <label class="control-label col-md-3">Gender
                                                                                                <span class="required"> * </span>
                                                                                            </label>
                                                                                            <div class="col-md-7">
                                                                                                <SearchableSelectField class="form-control input-height" name="gender_id" id="delgender_id" required>
                                                                                                    <option value="">Select...</option>
                                                                                                    <!-- php: foreach($genders as $gender) { -->
                                                                                                    <option value="<!-- php: =$gender->id -->"><!-- php: =$gender->name --></option>
                                                                                                    <!-- php: } -->
                                                                                                </SearchableSelectField>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                            <label class="control-label col-md-3">Birth Weight(kg)
                                                                                                <span class="required"> * </span>
                                                                                            </label>
                                                                                            <div class="col-md-7">
                                                                                                <input type="number" step="any" min="0" name="birth_weight" id="birth_weight" data-required="1" placeholder="" class="form-control input-height" required /> 
                                                                                            </div>                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Gestational Age At Delivery
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="number" min="0" name="gestational_age_at_delivery" id="gestational_age_at_delivery" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">First Minute Apgar
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="number" name="first_minute_apgar" min="0" max="10" id="first_minute_apgar" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Fifth Minute Apgar
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="number" name="fifth_minute_apgar" min="0" max="10" id="fifth_minute_apgar" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Head Circumference(cm)
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="number" step="any" name="head_circumference" id="head_circumference" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Birth Length(cm)
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="number" step="any" name="birth_length" id="birth_length" data-required="1" placeholder="" class="form-control input-height" required  /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                            <label class="control-label col-md-3">Mode of Delivery
                                                                                                <span class="required"> * </span>
                                                                                            </label>
                                                                                            <div class="col-md-7">
                                                                                                <!-- php: $DELIVERY_MODES = [ 21 => 'Vaginal Delivery', 22 => 'Elective Caesarean Section', 23 => 'Emergency Caesarean Section', ]; -->
                                                                                                <SearchableSelectField class="form-control input-height" name="mode_of_delivery" id="mode_of_delivery">
                                                                                                    
                                                                                                    <option value="">Select...</option>
                                                                                                        <!-- php: foreach($DELIVERY_MODES as $key => $value) { -->
                                                                                                    <option value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                                                                    <!-- php: } -->
                                                                                                </SearchableSelectField>
                                                                                            </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Type of Labor
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                <!-- php: $LABOR_TYPES = [ 25 => 'Spontaneous', 26 => 'Induced', 27 => 'Augmented', 28 => 'Not Applicable', ]; -->
                                                                                                <SearchableSelectField class="form-control input-height" name="type_of_labor" id="type_of_labor">
                                                                                                    
                                                                                                    <option value="">Select...</option>
                                                                                                        <!-- php: foreach($LABOR_TYPES as $key => $value) { -->
                                                                                                    <option value="<!-- php: = $value -->"><!-- php: = $value --></option>
                                                                                                    <!-- php: } -->
                                                                                                </SearchableSelectField>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Operative Delivery Indication
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="text" name="operative_delivery_indication" id="operative_delivery_indication" data-required="1" placeholder="" class="form-control input-height" required  /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Congenital Anomalies
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="text" name="congenital_anomalies" id="congenital_anomalies" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Complications
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="text" name="complications" id="complications" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Mother Condition At Discharge
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="text" name="mother_condition_at_discharge" id="mother_condition_at_discharge" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                                <label class="control-label col-md-3">Baby Condition At Discharge
                                                                                                    <span class="required"> * </span>
                                                                                                </label>
                                                                                                <div class="col-md-7">
                                                                                                    <input type="text" name="baby_condition_at_discharge" id="baby_condition_at_discharge" data-required="1" placeholder="" class="form-control input-height" required /> </div>
                                                                                            
                                                                                        </div>
                                                                                        <div class="form-group row">
                                                                                            <label class="control-label col-md-3">Discharge Date
                                                                                                <span class="required"> * </span>
                                                                                            </label>
                                                                                            <div class="col-md-7">
                                                                                                <div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                                                                                    <input class="form-control input-height" size="16" placeholder="" name = "discharge_date" id = "discharge_date" type="text" value="" required >
                                                                                                    <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                                                                                </div>
                                                                                                <input type="hidden" id="dtp_input2" value="" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <input type="hidden" id="hidden" name="request_type" value="new_deliveries">
                                                                                        <div class="row">
                                                                                            <div class="offset-md-3 col-md-7">
                                                                                                <button type="submit" class="btn btn-info">Submit</button>
                                                                                                <button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </fieldset>
                                                                            <!-- php: =$this->Form->end(); -->
                                                                        </div>

                                                                </div>
                                                                <!-- /horizontal form modal -->
                                                            </div>
                                                            <!-- modals-->
                                                        </div>
                                                    </div>
                                        </div>
                                        <!-- delivery modals-->


                                      	<!--  other delivery form-->
										<div class="tab-pane deliveries_view_deliveries" id="borderBox_tab42">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover order-column full-width customDataTable" >
														<thead>
															<tr>
																<th> Date </th>
																<th> Admission Date </th>
																<th> Delivery Date </th>
																<th> Gender </th>
																<th> Birth Weight </th>
																<th> Gestational Age At Delivery </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: foreach ($patientDeliveries as $patientDelivery): -->
															<tr class="odd gradeX">
																<td class="center"><!-- php: = $patientDelivery->date_created --></td>
																<td class="center"><!-- php: = $patientDelivery->admission_date --></td>
																<td class="center"><!-- php: = $patientDelivery->delivery_date --></td>
																<td class="center"><!-- php: = $patientDelivery->gender->name --></td>
																<td class="center"><!-- php: = $patientDelivery->birth_weight --></td>
																<td class="center"><!-- php: = $patientDelivery->gestational_age_at_delivery --></td>
															</tr>
														<!-- php: endforeach; -->									
														</tbody>
													</table>
												</div>
											</div>
										</div>                           
                                
                                
                                        <!--  other antinatal form-->
                                        <div class="tab-pane mothercare_view_mothercare_antenatal active" id="borderBox_tab41">
                                            <div class="card-body ">

                                                <div class="table-scrollable">        
                                                    <table class="table table-hover order-column full-width customDataTable" id="maternal_care_mother_antenatal_table">
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
                                                            <!-- php: foreach ($maternalMotherAntenatals as $motherValue): -->
                                                            <tr class="odd gradeX">
                                                                <td><!-- php: = $motherValue->date_added --></td>
                                                                <td><!-- php: = $motherValue->has('session') ? $motherValue->session->name : '' --></td>
                                                                <td><!-- php: = $motherValue->date_of_next_visit --></td>
                                                                <td><!-- php: = $motherValue->weight --></td>
                                                                <td><!-- php: = $motherValue->bp --></td>
                                                                <td><!-- php: = $motherValue->heart_rate --></td>
                                                            </tr>
                                                            <!-- php: endforeach; -->
                                                        </tbody>
                                                    </table>                                                                                                
                                                </div>

                                            </div>
                                        </div>

                                        <!--  other postnatal form-->
                                        <div class="tab-pane mothercare_view_mothercare_postnatal" id="borderBox_tab43">
                                            <div class="card-body ">

                                                <div class="table-scrollable">
                                                    <table class="table table-hover order-column full-width customDataTable" id="maternal_care_mother_postnatal_table">
                                                        <thead>
                                                            <tr>
                                                                <th> Date</th>
                                                                <th> Session </th>
                                                                <th> Next Visit </th>
                                                                <th> Weight </th>
                                                                <th> BP </th>
                                                                <th> Temperature </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <!-- php: foreach ($maternalMotherPostnatals as $motherValue): -->
                                                            <tr class="odd gradeX">
                                                                <td><!-- php: = $motherValue->date_added --></td>
                                                                <td><!-- php: = $motherValue->has('session') ? $motherValue->session->name : '' --></td>
                                                                <td><!-- php: = $motherValue->date_of_next_visit --></td>
                                                                <td><!-- php: = $motherValue->weight --></td>
                                                                <td><!-- php: = $motherValue->bp --></td>
                                                                <td><!-- php: = $motherValue->temperature --></td>
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
                </div>

                <div class="tab-pane care_child_content" id="borderBox_care_child">
                    <div class="borderBox light bordered col-md-12">

                        <div class="borderBox-title tabbable-line">
                            <div class="caption">
                                <span class="caption-subject font-dark bold uppercase">Child</span>
                            </div>
                            <ul class="nav nav-tabs">
                                <li class="nav-item childcare_add_childcare">
                                    <a href="#borderBox_tab50" data-toggle="tab"> Add </a>
                                </li>
                                <li class="nav-item childcare_view_childcare_postnatal">
                                    <a href="#borderBox_tab53" data-toggle="tab"> View Postnatal </a>
                                </li>
                            </ul>
                        </div>

                        <div class="borderBox-body">
                            <div class="tab-content">


                                <div class="tab-pane childcare_add_childcare " id="borderBox_tab50">
                                    <h3>Add a new case</h3>
                                    <div class="form-group row">
                                            <label class="control-label col-md-3">
                                                Case Category
                                                <span class="required"> * </span>
                                            </label>
                                            <div class="col-md-5">
                                                <SearchableSelectField onchange="PopupModalChild();" class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select case category" name="case_category_id" id="case_category_id" data-live-search="true" required>
                                                    <option><!-- php: = 'Postnatal' --></option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>


                                                <!-- php: = $this->Form->create(null, ['id' => 'childPostnatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addChildPostnatal', $patient->id, $selectedVisit->id]]); -->
                                                    <!-- modals-->
                                                    <div class="row">
                                                        <!-- Horizontal form modal -->
                                                        <div id="modal_form_horizontal" class="modal fade" tabindex="-1" role="dialog">
                                                            <div class="modal-dialog modal-lg">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title">Add New Postnatal Care Child</h5>
                                                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                    </div>

                                                                    <div class="modal-body">

                                                                        <div id="error" class="alert alert-danger" style="display:none;"></div>
                                                                        <div id="success" class="alert alert-success" style="display:none;"></div>


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
                                                                    </div>
                                                                    <!-- /horizontal form modal -->
                                                                </div>
                                                                <!-- modals-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- modals-->
                                                <!-- php: =$this->Form->end(); -->
                               
                                </div>

                                <div class="tab-pane childcare_view_childcare_postnatal active" id="borderBox_tab53">
                                    <div class="card-body ">

                                        <div class="table-scrollable">
											<table class="table table-hover order-column full-width customDataTable" id="maternal_care_child_postnatal_table">
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
                                                            <!-- php: foreach ($maternalChildPostnatals as $value): -->
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
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
		   
				<div class="tab-pane" id="maternalHistory">
					<!-- php: = $this->element('patientvisit/history/pastobstetrichistory') -->
				</div>
		    </div>     
      
        </div>
    </div>
</div>






<script>
    $(function () {
        $("#motherAntenatalForm").submit(function () {
            return confirm('Are you sure you want to submit ?');
            // return true;
        });

        $("#motherPostnatalForm").submit(function () {
            return confirm('Are you sure you want to submit ?');
            // return true;
        });

        $("#childPostnatalForm").submit(function () {
            return confirm('Are you sure you want to submit ?');
            // return true;
        });

        $("#currentPregnancyForm").submit(function () {
            return confirm('Are you sure you want to submit ?');
            // return true;
        });

        $("#deliveryForm").submit(function () {
            return confirm('Are you sure you want to submit ?');
            // return true;
        });

    });
</script>


<script>

    function clearMotherPostnatal() {
        $('#session_id').val('');
        $('#date_added').val('');
    }

    function clearChildPostnatal() {
        $('#session_id').val('');
        $('#date_added').val('');
    }

</script>

<script type="text/javascript">
    $(document).ready(function () {
        // save tab in local storage
        $('#maternalTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
            localStorage.setItem('maternalLastTab', $(this).attr('href'));
        });

        // display last tab if exist
        var maternalLastTab = localStorage.getItem('maternalLastTab');
        if (maternalLastTab) {
            $('#maternalTab a[href=' + maternalLastTab + ']').tab('show');
        }
        else {
            // Set the first tab if cookie do not exist
            $('#maternalTab a[data-toggle="tab"]:first').tab('show');
        }
    });
</script>


<script>
        function PopupModalChild() {
            if ($("#case_category_id option:selected").text().toLowerCase() == "postnatal") {
				$('#modal_form_horizontal').modal('toggle');
            }
        }

		function PopupModalMother() {
            if ($("#case_category_id1 option:selected").text().toLowerCase() == "antenatal") {
				$('#modal_form_horizontal_mother_antenatal').modal('toggle');
            } 
            else if ($("#case_category_id1 option:selected").text().toLowerCase() == "postnatal") {
				$('#modal_form_horizontal1').modal('toggle');
            } 
            else if ($("#case_category_id1 option:selected").text().toLowerCase() == "delivery") {
				$('#modal_form_horizontal_delivery_mother').modal('toggle');
            } 
        }
</script>

`;

export default function ElementElementPatientvisitMaternalcare() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
