const rawHtml = `
<!-- php: //$requestLabs = isset($requestLabs) ? $requestLabs : $selectedVisit->request_labs; -->

<!--Lab Table section-->
<!-- <section class="mb-1">

    <h4 class="col-md-12" id="scanTableDescription">
        <span class="font-weight-bold">Session Assessment and Plan:</span> <br>
        Use this structured form to curate and document all assessments needed, planned treatments and therapies, as well as progress notes for a patient
    </h4>

</section>
<div class=" mt-4">
    <h2 class="text-center mb-2">Submitted Assessments</h2>
    <div class="d-flex" style="overflow-x:scroll; flex-wrap: no-wrap" id="submittedAssessments">
        <div class="col-md-3 mb-3">
            <div class="card border-info">
                <div class="card-header">
                    <h5 class="card-title"></h5>
                </div>
                <div class="card-body">
                    <p><strong>No Submitted Assessments</strong> </p>
                </div>
            </div>
        </div>

    </div>
</div>
 -->

<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'addSessionAssessmentPlans', $patient->id, $selectedVisit->id], 'id' => 'assessment_plan_form_submit', 'class' => 'row',]); -->

    <div class="container">
        <!-- <h2 class="text-center mb-1 mt-1">Vision Examination</h2> -->
        <div class="form-body">

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#subjective').toggle()">
                        Visual Acuity
                    </button>
                </div>
                <div id="subjective" class="card-body" style="display:none">
                    <span>
                        Measures the sharpness of vision, both at a distance and near, to assess how well the patient sees with and without correction (glasses or contact lenses).
                    </span>
                    <span class="btn btn-xs btn-success" onclick="$('#distance_acuity').show();$('#near_acuity').hide();$('#presbyopia').hide();$('#distance_acuity_button').addClass('btn-success');$('#near_acuity_button').removeClass('btn-success')" id="distance_acuity_button">Distance Visual Acuity</span>
                    <span class="btn btn-xs" onclick="$('#near_acuity').show();$('#presbyopia').show();$('#distance_acuity').hide();$('#near_acuity_button').addClass('btn-success');$('#distance_acuity_button').removeClass('btn-success')" id="near_acuity_button">Near Visual Acuity</span>
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #000;" id="distance_acuity" class="mt-2">
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">Distance Visual Acuity (Snellen Chart)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Right Eye (OD)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Left Eye (OS)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Both Eyes (OU)</th>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px;">Uncorrected</td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px;">With Correction</td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px;">Best Corrected Visual Acuity (BCVA)</td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/20"> 20/20</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/25"> 20/25</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> 20/30</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> 20/40</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/50"> 20/50</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/60"> 20/60</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #000; display: none" id="near_acuity" class="mt-2">
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">Near Visual Acuity (Jaeger Chart)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Right Eye (OD)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Left Eye (OS)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Both Eyes (OU)</th>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px;">Uncorrected</td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px;">Corrected</td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px;">Best Near Acuity With Correction</td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 8px;">
                                <label><input type="checkbox" name="snellen_os" value="20/25"> J1+</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/20"> J1</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/30"> J2</label><br>
                                <label><input type="checkbox" name="snellen_os" value="20/40"> J3</label><br>
                                <label><input type="checkbox" name="snellen_os" value="other"> Other: <input type="text" name="snellen_os_other"></label><br>
                            </td>
                        </tr>
                    </table>
                    <div class="" id="presbyopia" style="display: none">
                        <div class="d-flex flex-column mt-2 justify-content-between" >
                            Presbyopia (if applicable):
                            <input type="text" name="onset_age" placeholder="Onset Age" class="mt-1">
                            <textarea name="notes" id="" placeholder="Notes" row="3" class="mt-1" ></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#refraction').toggle()">
                    Refraction Testing
                    </button>
                </div>
                <div id="refraction" class="card-body" style="display:none">
                    <span>
                    Determines the prescription for glasses or contact lenses by assessing the eyes' ability to focus light correctly on the retina.
                    </span>
                    <br>
                    <span class="btn btn-xs btn-success" onclick="showRefractionSectionOnly('subjective_refraction')" id="subjective_refraction_btn">Subjective Refraction</span>
                    <span class="btn btn-xs" onclick="showRefractionSectionOnly('corrected_visual_acuity')" id="corrected_visual_acuity_btn">Best Corrected Visual Acuity</span>
                    <span class="btn btn-xs" onclick="showRefractionSectionOnly('contrast_visual_acuity')" id="contrast_visual_acuity_btn">Contrast Visual Acuity</span>
                    <span class="btn btn-xs" onclick="showRefractionSectionOnly('cycloplegic_refraction')" id="cycloplegic_refraction_btn">Cycloplegic Refraction</span>
                    <span class="btn btn-xs" onclick="showRefractionSectionOnly('auto_refraction')" id="auto_refraction_btn">Auto Objective Refraction</span>

                    <table style="width: 100%; border-collapse: collapse;" class="mt-3" id="subjective_refraction">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; text-align: center;">1. Subjective Refraction</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="4">Sphere (SPH):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="4">Cylinder (CYL):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Select Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="">Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="3">Axis:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Options (Degrees)</option>
                                    <option value="0">0°</option>
                                    <option value="5">5°</option>
                                    <option value="10">10°</option>
                                    <option value="15">15°</option>
                                    <option value="20">20°</option>
                                    <option value="25">25°</option>
                                    <option value="30">30°</option>
                                    <option value="35">35°</option>
                                    <option value="40">40°</option>
                                    <option value="45">45°</option>
                                    <option value="50">50°</option>
                                    <option value="55">55°</option>
                                    <option value="60">60°</option>
                                    <option value="65">65°</option>
                                    <option value="70">70°</option>
                                    <option value="75">75°</option>
                                    <option value="80">80°</option>
                                    <option value="85">85°</option>
                                    <option value="90">90°</option>
                                    <option value="95">95°</option>
                                    <option value="100">100°</option>
                                    <option value="105">105°</option>
                                    <option value="110">110°</option>
                                    <option value="115">115°</option>
                                    <option value="120">120°</option>
                                    <option value="125">125°</option>
                                    <option value="130">130°</option>
                                    <option value="135">135°</option>
                                    <option value="140">140°</option>
                                    <option value="145">145°</option>
                                    <option value="150">150°</option>
                                    <option value="155">155°</option>
                                    <option value="160">160°</option>
                                    <option value="165">165°</option>
                                    <option value="170">170°</option>
                                    <option value="175">175°</option>
                                    <option value="180">180°</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Options (Degrees)</option>
                                    <option value="0">0°</option>
                                    <option value="5">5°</option>
                                    <option value="10">10°</option>
                                    <option value="15">15°</option>
                                    <option value="20">20°</option>
                                    <option value="25">25°</option>
                                    <option value="30">30°</option>
                                    <option value="35">35°</option>
                                    <option value="40">40°</option>
                                    <option value="45">45°</option>
                                    <option value="50">50°</option>
                                    <option value="55">55°</option>
                                    <option value="60">60°</option>
                                    <option value="65">65°</option>
                                    <option value="70">70°</option>
                                    <option value="75">75°</option>
                                    <option value="80">80°</option>
                                    <option value="85">85°</option>
                                    <option value="90">90°</option>
                                    <option value="95">95°</option>
                                    <option value="100">100°</option>
                                    <option value="105">105°</option>
                                    <option value="110">110°</option>
                                    <option value="115">115°</option>
                                    <option value="120">120°</option>
                                    <option value="125">125°</option>
                                    <option value="130">130°</option>
                                    <option value="135">135°</option>
                                    <option value="140">140°</option>
                                    <option value="145">145°</option>
                                    <option value="150">150°</option>
                                    <option value="155">155°</option>
                                    <option value="160">160°</option>
                                    <option value="165">165°</option>
                                    <option value="170">170°</option>
                                    <option value="175">175°</option>
                                    <option value="180">180°</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="3">Best Corrected Visual Acuity(BCVA):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Unaided Vision">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Unaided Vision">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="With Correction">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="With Correction">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;"> Pupillary Distance (PD)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="eg 10"> mm
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="eg 10"> mm
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;"> Height of Glasses (HGT)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="eg 10"> mm
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="eg 10"> mm
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" class="mt-3" id="corrected_visual_acuity">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; text-align: center;">2.  Best Corrected Visual Acuity (BCVA)</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="3">Best Corrected Visual Acuity::</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Unaided Vision</option>
                                    <option value="20/20">20/20</option>
                                    <option value="20/25">20/25</option>
                                    <option value="20/30">20/30</option>
                                    <option value="20/40">20/40</option>
                                    <option value="20/50">20/50</option>
                                    <option value="20/60">20/60</option>
                                    <option value="20/70">20/70</option>
                                    <option value="20/80">20/80</option>
                                    <option value="20/100">20/100</option>
                                    <option value="20/200">20/200</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Unaided Vision</option>
                                    <option value="20/20">20/20</option>
                                    <option value="20/25">20/25</option>
                                    <option value="20/30">20/30</option>
                                    <option value="20/40">20/40</option>
                                    <option value="20/50">20/50</option>
                                    <option value="20/60">20/60</option>
                                    <option value="20/70">20/70</option>
                                    <option value="20/80">20/80</option>
                                    <option value="20/100">20/100</option>
                                    <option value="20/200">20/200</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select With Correction</option>
                                    <option value="20/20">20/20</option>
                                    <option value="20/25">20/25</option>
                                    <option value="20/30">20/30</option>
                                    <option value="20/40">20/40</option>
                                    <option value="20/50">20/50</option>
                                    <option value="20/60">20/60</option>
                                    <option value="20/70">20/70</option>
                                    <option value="20/80">20/80</option>
                                    <option value="20/100">20/100</option>
                                    <option value="20/200">20/200</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select With Correction</option>
                                    <option value="20/20">20/20</option>
                                    <option value="20/25">20/25</option>
                                    <option value="20/30">20/30</option>
                                    <option value="20/40">20/40</option>
                                    <option value="20/50">20/50</option>
                                    <option value="20/60">20/60</option>
                                    <option value="20/70">20/70</option>
                                    <option value="20/80">20/80</option>
                                    <option value="20/100">20/100</option>
                                    <option value="20/200">20/200</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Correction Method:</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Correction Method</option>
                                    <option value="Spectacles">Spectacles</option>
                                    <option value="Contact Lenses">Contact Lenses</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Correction Method</option>
                                    <option value="Spectacles">Spectacles</option>
                                    <option value="Contact Lenses">Contact Lenses</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Comments:</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Observations</option>
                                    <option value="Normal (≥ 20/40)">Normal (≥ 20/40)</option>
                                    <option value="Reduced (20/50 to 20/80)">Reduced (20/50 to 20/80)</option>
                                    <option value="Poor (≤ 20/100)">Poor (≤ 20/100)</option>
                                    <option value="Contact Lenses">Contact Lenses</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Observations</option>
                                    <option value="Normal (≥ 20/40)">Normal (≥ 20/40)</option>
                                    <option value="Reduced (20/50 to 20/80)">Reduced (20/50 to 20/80)</option>
                                    <option value="Poor (≤ 20/100)">Poor (≤ 20/100)</option>
                                    <option value="Contact Lenses">Contact Lenses</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr style="border: 1px solid #000; padding: 10px;">
                            <td style="border: 1px solid #000; padding: 10px;">
                                Overall Assessment
                            </td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <textarea name="" row="1" style="width:100%" id=""></textarea>
                            </td>
                        </tr>

                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" class="mt-3" id="contrast_visual_acuity">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; text-align: center;">3. Low Contrast Visual Acuity </td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Testing Method</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Pelli-Robson Chart">Pelli-Robson Chart</option>
                                    <option value="Mars Chart">Mars Chart</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Pelli-Robson Chart">Pelli-Robson Chart</option>
                                    <option value="Mars Chart">Mars Chart</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Low Contrast Visual Acuity Result:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Letter Size/Contrast Level:</option>
                                    <option value="200 (very low contrast)">200 (very low contrast)</option>
                                    <option value="100 (low contrast)">100 (low contrast)</option>
                                    <option value="80 (medium contrast)">80 (medium contrast)</option>
                                    <option value="40 (high contrast)">40 (high contrast)</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Letter Size/Contrast Level:</option>
                                    <option value="200 (very low contrast)">200 (very low contrast)</option>
                                    <option value="100 (low contrast)">100 (low contrast)</option>
                                    <option value="80 (medium contrast)">80 (medium contrast)</option>
                                    <option value="40 (high contrast)">40 (high contrast)</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Comments:</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Observations</option>
                                    <option value="Normal (≥ 20/40)">Normal (≥ 20/40)</option>
                                    <option value="Reduced (20/50 to 20/80)">Reduced (20/50 to 20/80)</option>
                                    <option value="Poor (≤ 20/100)">Poor (≤ 20/100)</option>
                                    <option value="Contact Lenses">Contact Lenses</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Observations</option>
                                    <option value="Normal (≥ 20/40)">Normal (≥ 20/40)</option>
                                    <option value="Reduced (20/50 to 20/80)">Reduced (20/50 to 20/80)</option>
                                    <option value="Poor (≤ 20/100)">Poor (≤ 20/100)</option>
                                    <option value="Contact Lenses">Contact Lenses</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>

                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" class="mt-3" id="cycloplegic_refraction">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; text-align: center;">4. Cycloplegic Refraction</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="4">Sphere (SPH):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="4">Cylinder (CYL):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Plus Range</option>
                                    <option value="+0.25 D">+0.25 D</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="+1.75 D">+1.75 D</option>
                                    <option value="+2.00 D">+2.00 D</option>
                                    <option value="+2.25 D">+2.25 D</option>
                                    <option value="+2.50 D">+2.50 D</option>
                                    <option value="+2.75 D">+2.75 D</option>
                                    <option value="+3.00 D">+3.00 D</option>
                                    <option value="+3.25 D">+3.25 D</option>
                                    <option value="+3.50 D">+3.50 D</option>
                                    <option value="+3.75 D">+3.75 D</option>
                                    <option value="+4.00 D">+4.00 D</option>
                                    <option value="+4.25 D">+4.25 D</option>
                                    <option value="+4.50 D">+4.50 D</option>
                                    <option value="+4.75 D">+4.75 D</option>
                                    <option value="+5.00 D">+5.00 D</option>
                                    <option value="+5.25 D">+5.25 D</option>
                                    <option value="+5.50 D">+5.50 D</option>
                                    <option value="+5.75 D">+5.75 D</option>
                                    <option value="+6.00 D">+6.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="minus_range[]" placeholder="Select Minus Range" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Minus Range</option>
                                    <option value="">Select Minus Range</option>
                                    <option value="-0.25 D">-0.25 D</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                    <option value="-1.75 D">-1.75 D</option>
                                    <option value="-2.00 D">-2.00 D</option>
                                    <option value="-2.25 D">-2.25 D</option>
                                    <option value="-2.50 D">-2.50 D</option>
                                    <option value="-2.75 D">-2.75 D</option>
                                    <option value="-3.00 D">-3.00 D</option>
                                    <option value="-3.25 D">-3.25 D</option>
                                    <option value="-3.50 D">-3.50 D</option>
                                    <option value="-3.75 D">-3.75 D</option>
                                    <option value="-4.00 D">-4.00 D</option>
                                    <option value="-4.25 D">-4.25 D</option>
                                    <option value="-4.50 D">-4.50 D</option>
                                    <option value="-4.75 D">-4.75 D</option>
                                    <option value="-5.00 D">-5.00 D</option>
                                    <option value="-5.25 D">-5.25 D</option>
                                    <option value="-5.50 D">-5.50 D</option>
                                    <option value="-5.75 D">-5.75 D</option>
                                    <option value="-6.00 D">-6.00 D</option>
                                    <option value="-6.25 D">-6.25 D</option>
                                    <option value="-6.50 D">-6.50 D</option>
                                    <option value="-6.75 D">-6.75 D</option>
                                    <option value="-7.00 D">-7.00 D</option>
                                    <option value="-7.25 D">-7.25 D</option>
                                    <option value="-7.50 D">-7.50 D</option>
                                    <option value="-7.75 D">-7.75 D</option>
                                    <option value="-8.00 D">-8.00 D</option>
                                    <option value="-8.25 D">-8.25 D</option>
                                    <option value="-8.50 D">-8.50 D</option>
                                    <option value="-8.75 D">-8.75 D</option>
                                    <option value="-9.00 D">-9.00 D</option>
                                    <option value="-9.25 D">-9.25 D</option>
                                    <option value="-9.50 D">-9.50 D</option>
                                    <option value="-9.75 D">-9.75 D</option>
                                    <option value="-10.00 D">-10.00 D</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="2">Axis:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Options (Degrees)</option>
                                    <option value="0">0°</option>
                                    <option value="5">5°</option>
                                    <option value="10">10°</option>
                                    <option value="15">15°</option>
                                    <option value="20">20°</option>
                                    <option value="25">25°</option>
                                    <option value="30">30°</option>
                                    <option value="35">35°</option>
                                    <option value="40">40°</option>
                                    <option value="45">45°</option>
                                    <option value="50">50°</option>
                                    <option value="55">55°</option>
                                    <option value="60">60°</option>
                                    <option value="65">65°</option>
                                    <option value="70">70°</option>
                                    <option value="75">75°</option>
                                    <option value="80">80°</option>
                                    <option value="85">85°</option>
                                    <option value="90">90°</option>
                                    <option value="95">95°</option>
                                    <option value="100">100°</option>
                                    <option value="105">105°</option>
                                    <option value="110">110°</option>
                                    <option value="115">115°</option>
                                    <option value="120">120°</option>
                                    <option value="125">125°</option>
                                    <option value="130">130°</option>
                                    <option value="135">135°</option>
                                    <option value="140">140°</option>
                                    <option value="145">145°</option>
                                    <option value="150">150°</option>
                                    <option value="155">155°</option>
                                    <option value="160">160°</option>
                                    <option value="165">165°</option>
                                    <option value="170">170°</option>
                                    <option value="175">175°</option>
                                    <option value="180">180°</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Options (Degrees)</option>
                                    <option value="0">0°</option>
                                    <option value="5">5°</option>
                                    <option value="10">10°</option>
                                    <option value="15">15°</option>
                                    <option value="20">20°</option>
                                    <option value="25">25°</option>
                                    <option value="30">30°</option>
                                    <option value="35">35°</option>
                                    <option value="40">40°</option>
                                    <option value="45">45°</option>
                                    <option value="50">50°</option>
                                    <option value="55">55°</option>
                                    <option value="60">60°</option>
                                    <option value="65">65°</option>
                                    <option value="70">70°</option>
                                    <option value="75">75°</option>
                                    <option value="80">80°</option>
                                    <option value="85">85°</option>
                                    <option value="90">90°</option>
                                    <option value="95">95°</option>
                                    <option value="100">100°</option>
                                    <option value="105">105°</option>
                                    <option value="110">110°</option>
                                    <option value="115">115°</option>
                                    <option value="120">120°</option>
                                    <option value="125">125°</option>
                                    <option value="130">130°</option>
                                    <option value="135">135°</option>
                                    <option value="140">140°</option>
                                    <option value="145">145°</option>
                                    <option value="150">150°</option>
                                    <option value="155">155°</option>
                                    <option value="160">160°</option>
                                    <option value="165">165°</option>
                                    <option value="170">170°</option>
                                    <option value="175">175°</option>
                                    <option value="180">180°</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Pupillary Distance (Distance PD)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Distance (PD)</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                    <option value="66">66 mm</option>
                                    <option value="67">67 mm</option>
                                    <option value="68">68 mm</option>
                                    <option value="69">69 mm</option>
                                    <option value="70">70 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Distance (PD)</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                    <option value="66">66 mm</option>
                                    <option value="67">67 mm</option>
                                    <option value="68">68 mm</option>
                                    <option value="69">69 mm</option>
                                    <option value="70">70 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Pupillary Distance (Near PD)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Near (PD)</option>
                                    <option value="50">50 mm</option>
                                    <option value="51">51 mm</option>
                                    <option value="52">52 mm</option>
                                    <option value="53">53 mm</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                    <option value="66">66 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Near (PD)</option>
                                    <option value="50">50 mm</option>
                                    <option value="51">51 mm</option>
                                    <option value="52">52 mm</option>
                                    <option value="53">53 mm</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                    <option value="66">66 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Height of Geometric Center of the Lens (HGT)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Measurement (mm)</option>
                                    <option value="10">10 mm</option>
                                    <option value="11">11 mm</option>
                                    <option value="12">12 mm</option>
                                    <option value="13">13 mm</option>
                                    <option value="14">14 mm</option>
                                    <option value="15">15 mm</option>
                                    <option value="16">16 mm</option>
                                    <option value="17">17 mm</option>
                                    <option value="18">18 mm</option>
                                    <option value="19">19 mm</option>
                                    <option value="20">20 mm</option>
                                    <option value="21">21 mm</option>
                                    <option value="22">22 mm</option>
                                    <option value="23">23 mm</option>
                                    <option value="24">24 mm</option>
                                    <option value="25">25 mm</option>
                                    <option value="26">26 mm</option>
                                    <option value="27">27 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField class="form-control selectpicker" data-size="5" multiple>
                                    <option value="" selected disabled hidden>Select Measurement (mm)</option>
                                    <option value="10">10 mm</option>
                                    <option value="11">11 mm</option>
                                    <option value="12">12 mm</option>
                                    <option value="13">13 mm</option>
                                    <option value="14">14 mm</option>
                                    <option value="15">15 mm</option>
                                    <option value="16">16 mm</option>
                                    <option value="17">17 mm</option>
                                    <option value="18">18 mm</option>
                                    <option value="19">19 mm</option>
                                    <option value="20">20 mm</option>
                                    <option value="21">21 mm</option>
                                    <option value="22">22 mm</option>
                                    <option value="23">23 mm</option>
                                    <option value="24">24 mm</option>
                                    <option value="25">25 mm</option>
                                    <option value="26">26 mm</option>
                                    <option value="27">27 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>

                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="3">Best Corrected Visual Acuity (BCVA)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Unaided Vision">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Unaided Vision">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="With Correction">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="With Correction">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="3">Suggested Diagnosis & Recommenations:</td>
                        </tr>
                            
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Refractive Error Diagnosis</option>
                                    <option value="Myopia (Near-sightedness)">Myopia (Near-sightedness)</option>
                                    <option value="Hyperopia (Far-sightedness)">Hyperopia (Far-sightedness)</option>
                                    <option value="Astigmatism">Astigmatism</option>
                                    <option value="Presbyopia">Presbyopia</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Refractive Error Diagnosis</option>
                                    <option value="Myopia (Near-sightedness)">Myopia (Near-sightedness)</option>
                                    <option value="Hyperopia (Far-sightedness)">Hyperopia (Far-sightedness)</option>
                                    <option value="Astigmatism">Astigmatism</option>
                                    <option value="Presbyopia">Presbyopia</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr>


                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Recommendations for Treatment</option>
                                    <option value="Spectacle Prescription">Spectacle Prescription</option>
                                    <option value="Contact Lens Fitting">Contact Lens Fitting</option>
                                    <option value="Further Evaluation">Further Evaluation</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Recommendations for Treatment</option>
                                    <option value="Spectacle Prescription">Spectacle Prescription</option>
                                    <option value="Contact Lens Fitting">Contact Lens Fitting</option>
                                    <option value="Further Evaluation">Further Evaluation</option>
                                </SearchableSelectField>
                                <input type="text" style="width: 100%; padding: 5px; margin-top: 5px;" id="other_vision" name="other_vision" placeholder="Other">
                            </td>
                        </tr>
                        <tr style="border: 1px solid #000; padding: 10px;">
                            <td style="border: 1px solid #000; padding: 10px;">
                                Overall Assessment
                            </td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <textarea name="" row="1" style="width:100%" id=""></textarea>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" class="mt-3" id="auto_refraction">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; text-align: center;">5. Auto Objective Refraction</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Sphere (SPH):</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="+0.25 D">+0.25 D (Mild Hyperopia)</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D (Moderate Hyperopia)</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="-0.25 D">-0.25 D (Mild Myopia)</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D (Moderate Myopia)</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="+0.25 D">+0.25 D (Mild Hyperopia)</option>
                                    <option value="+0.50 D">+0.50 D</option>
                                    <option value="+0.75 D">+0.75 D</option>
                                    <option value="+1.00 D">+1.00 D (Moderate Hyperopia)</option>
                                    <option value="+1.25 D">+1.25 D</option>
                                    <option value="+1.50 D">+1.50 D</option>
                                    <option value="-0.25 D">-0.25 D (Mild Myopia)</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D (Moderate Myopia)</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Cylindrical Power (CYL):</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="0.00 D">0.00 D (No Astigmatism)</option>
                                    <option value="-0.25 D">-0.25 D (Mild Astigmatism)</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D (Moderate Astigmatism)</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="0.00 D">0.00 D (No Astigmatism)</option>
                                    <option value="-0.25 D">-0.25 D (Mild Astigmatism)</option>
                                    <option value="-0.50 D">-0.50 D</option>
                                    <option value="-0.75 D">-0.75 D</option>
                                    <option value="-1.00 D">-1.00 D (Moderate Astigmatism)</option>
                                    <option value="-1.25 D">-1.25 D</option>
                                    <option value="-1.50 D">-1.50 D</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Axis:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="0">0°</option>
                                    <option value="90">90°</option>
                                    <option value="180">180°</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="0">0°</option>
                                    <option value="90">90°</option>
                                    <option value="180">180°</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Pupil Size:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Normal">Normal (2-4 mm in bright light, 4-8 mm in dim light)</option>
                                    <option value="Dilated">Dilated ( > 8 mm)</option>
                                    <option value="Constricted">Constricted (< 2 mm)</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Normal">Normal (2-4 mm in bright light, 4-8 mm in dim light)</option>
                                    <option value="Dilated">Dilated ( > 8 mm)</option>
                                    <option value="Constricted">Constricted (< 2 mm)</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Corneal Reflex</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Abnormal">Abnormal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Abnormal">Abnormal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Pupillary Distance (PD)</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="mm">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="mm">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Height of Glasses (HGT)</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="mm">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="mm">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#binocular_vision').toggle()">
                    Binocular Vision
                    </button>
                </div>
                <div id="binocular_vision" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Pupillary Distance (Distane PD):</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                    <option value="66">66 mm</option>
                                    <option value="67">67 mm</option>
                                    <option value="68">68 mm</option>
                                    <option value="69">69 mm</option>
                                    <option value="70">70 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                    <option value="66">66 mm</option>
                                    <option value="67">67 mm</option>
                                    <option value="68">68 mm</option>
                                    <option value="69">69 mm</option>
                                    <option value="70">70 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Pupillary Distance (Near PD):</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="50">50 mm</option>
                                    <option value="51">51 mm</option>
                                    <option value="52">52 mm</option>
                                    <option value="53">53 mm</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="50">50 mm</option>
                                    <option value="51">51 mm</option>
                                    <option value="52">52 mm</option>
                                    <option value="53">53 mm</option>
                                    <option value="54">54 mm</option>
                                    <option value="55">55 mm</option>
                                    <option value="56">56 mm</option>
                                    <option value="57">57 mm</option>
                                    <option value="58">58 mm</option>
                                    <option value="59">59 mm</option>
                                    <option value="60">60 mm</option>
                                    <option value="61">61 mm</option>
                                    <option value="62">62 mm</option>
                                    <option value="63">63 mm</option>
                                    <option value="64">64 mm</option>
                                    <option value="65">65 mm</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Convergence Testing (Near Point of Convergence - NPC):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Normal">Normal (≤ 6 cm)</option>
                                    <option value="Mild Convergence Insufficiency">Mild Convergence Insufficiency (> 6 cm to ≤ 10 cm)</option>
                                    <option value="Moderate Convergence Insufficiency">Moderate Convergence Insufficiency (> 10 cm to ≤ 14 cm)</option>
                                    <option value="Severe Convergence Insufficiency">Severe Convergence Insufficiency (> 14 cm)</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Normal">Normal (≤ 6 cm)</option>
                                    <option value="Mild Convergence Insufficiency">Mild Convergence Insufficiency (> 6 cm to ≤ 10 cm)</option>
                                    <option value="Moderate Convergence Insufficiency">Moderate Convergence Insufficiency (> 10 cm to ≤ 14 cm)</option>
                                    <option value="Severe Convergence Insufficiency">Severe Convergence Insufficiency (> 14 cm)</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other range">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Cover Test (Distance):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Esophoria">Esophoria</option>
                                    <option value="Exophoria">Exophoria</option>


                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Tropia">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Esophoria">Esophoria</option>
                                    <option value="Exophoria">Exophoria</option>


                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Tropia">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Cover Test (Near):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Esophoria">Esophoria</option>
                                    <option value="Exophoria">Exophoria</option>


                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Tropia">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Esophoria">Esophoria</option>
                                    <option value="Exophoria">Exophoria</option>


                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Tropia">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">
                            <strong>Ocular Motility:</strong>  Assesses the muscles controlling eye movement to detect any abnormalities in how the eyes move and coordinate
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Record abnormalities in eye movements:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Full Range of Motion">Full Range of Motion</option>
                                    <option value="Restrictions in Upward Gaze">Restrictions in Upward Gaze</option>
                                    <option value="Restrictions in Downward Gaze">Restrictions in Downward Gaze</option>
                                    <option value="Restrictions in Left Gaze">Restrictions in Left Gaze</option>
                                    <option value="Restrictions in Right Gaze">Restrictions in Right Gaze</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result</option>
                                    <option value="Full Range of Motion">Full Range of Motion</option>
                                    <option value="Restrictions in Upward Gaze">Restrictions in Upward Gaze</option>
                                    <option value="Restrictions in Downward Gaze">Restrictions in Downward Gaze</option>
                                    <option value="Restrictions in Left Gaze">Restrictions in Left Gaze</option>
                                    <option value="Restrictions in Right Gaze">Restrictions in Right Gaze</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Stereopsis (Depth Perception)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Stereopsis (Depth Perception):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Test performed</option>
                                    <option value="Randot Stereopsis Test">Randot Stereopsis Test</option>
                                    <option value="Titmus Test">Titmus Test</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Result">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Test performed</option>
                                    <option value="Randot Stereopsis Test">Randot Stereopsis Test</option>
                                    <option value="Titmus Test">Titmus Test</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Result">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Measured in arc seconds:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result Options</option>
                                    <option value="Normal: < 40 arc seconds">Normal: < 40 arc seconds</option>
                                    <option value="Mild Deficit: 40-80 arc seconds">Mild Deficit: 40-80 arc seconds</option>
                                    <option value="Significant Deficit: > 80 arc seconds or unable to perceive depth">Significant Deficit: > 80 arc seconds or unable to perceive depth</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="width: 100%; height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Result Options</option>
                                    <option value="Normal: < 40 arc seconds">Normal: < 40 arc seconds</option>
                                    <option value="Mild Deficit: 40-80 arc seconds">Mild Deficit: 40-80 arc seconds</option>
                                    <option value="Significant Deficit: > 80 arc seconds or unable to perceive depth">Significant Deficit: > 80 arc seconds or unable to perceive depth</option>
                                </SearchableSelectField>
                            </td>
                        </tr>

                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#accomodation_testing').toggle()">
                        Accomodation Testing and Assessment
                    </button>
                </div>
                <div id="accomodation_testing" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Near Point of Accommodation (NPA) (cm)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Amplitude of Accommodation (D)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Accommodative Lag/Lead (D)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Near retinoscopy result">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Near retinoscopy result">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Accommodative Facility (cpm)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Divergence Testing(cm)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Vergence Ranges <br> Positive Fusional Vergence (PFV)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Vergence Ranges <br> Negative Fusional Vergence (NFV)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Eye Alignment Assessment</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Method Used">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Method Used">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Assessment of Binocular Fusion</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Test performed">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Test Performed">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#expanded_tests').toggle()">
                        Expanded Tests - Phoria, Heterophoria, Vergence, and Accommodation
                    </button>
                </div>
                <div id="expanded_tests" class="card-body" style="display:none">
                    <span class="btn btn-xs btn-success" onclick="showExTestsSectionOnly('phoria_table')" id="phoria_table_btn">Phoria</span>
                    <span class="btn btn-xs" onclick="showExTestsSectionOnly('heterophoria_table')" id="heterophoria_table_btn">Heterophoria</span>
                    <span class="btn btn-xs" onclick="showExTestsSectionOnly('distance_near_table')" id="distance_near_table_btn">Distance and Near Vergence Range Testing</span>
                    <span class="btn btn-xs" onclick="showExTestsSectionOnly('ac_table')" id="ac_table_btn">AC/A Ratio</span>
                    <span class="btn btn-xs" onclick="showExTestsSectionOnly('npc_table')" id="npc_table_btn">NPC</span>
                    <span class="btn btn-xs" onclick="showExTestsSectionOnly('pra_table')" id="pra_table_btn">PRA</span>
                    <span class="btn btn-xs" onclick="showExTestsSectionOnly('stereopsis_table')" id="stereopsis_table_btn">Stereopsis</span>
                    <table style="width: 100%; border-collapse: collapse;" id="phoria_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px">
                                <strong>Phoria Test</strong> Record if exophoria, esophoria, hyperphoria detected
                            </td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Distance Δ</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Exophoria">
                                <input type="text" class="form-control" placeholder="Esophoria">
                                <input type="text" class="form-control" placeholder="Hyperphoria">
                                <input type="text" class="form-control" placeholder="Hypophoria">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Exophoria">
                                <input type="text" class="form-control" placeholder="Esophoria">
                                <input type="text" class="form-control" placeholder="Hyperphoria">
                                <input type="text" class="form-control" placeholder="Hypophoria">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Near Δ</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Exophoria">
                                <input type="text" class="form-control" placeholder="Esophoria">
                                <input type="text" class="form-control" placeholder="Hyperphoria">
                                <input type="text" class="form-control" placeholder="Hypophoria">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Exophoria">
                                <input type="text" class="form-control" placeholder="Esophoria">
                                <input type="text" class="form-control" placeholder="Hyperphoria">
                                <input type="text" class="form-control" placeholder="Hypophoria">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" id="heterophoria_table">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">Heterophoria and Vergence Tests</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Near Heterophoria Δ</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Exophoria">
                                <input type="text" class="form-control" placeholder="Esophoria">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Exophoria">
                                <input type="text" class="form-control" placeholder="Esophoria">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">Vergence Amplitude</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Positive Fusional Vergence (Convergence)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal 12 Δ to 30 Δ">Normal 12 Δ to 30 Δ</option>
                                    <option value="Reduced < 12 Δ">Reduced < 12 Δ</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal 12 Δ to 30 Δ">Normal 12 Δ to 30 Δ</option>
                                    <option value="Reduced < 12 Δ">Reduced < 12 Δ</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Negative Fusional Vergence (Convergence)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal 6 Δ to 10 Δ">Normal 6 Δ to 10 Δ</option>
                                    <option value="Reduced  < 6 Δ">Reduced  < 6 Δ</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal 6 Δ to 10 Δ">Normal 6 Δ to 10 Δ</option>
                                    <option value="Reduced  < 6 Δ">Reduced  < 6 Δ</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" id="distance_near_table">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">Distance and Near Vergence Range Testing</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Base In (Divergence)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Base Out (Convergence)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Notes</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">Near Vergence Range Testing</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Base In (Divergence)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Base Out (Convergence)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <input type="text" class="form-control" placeholder="Recovery point">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Notes</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" id="ac_table">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">AC/A Ratio (Accommodative Convergence/Accommodation)</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Measurement</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal: 3:1 to 5:1">Normal: 3:1 to 5:1</option>
                                    <option value="High: > 6:1">High: > 6:1</option>
                                    <option value="Low: < 3:1">Low: < 3:1</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal: 3:1 to 5:1">Normal: 3:1 to 5:1</option>
                                    <option value="High: > 6:1">High: > 6:1</option>
                                    <option value="Low: < 3:1">Low: < 3:1</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Notes</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" id="npc_table">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">NPC (Near Point of Convergence)</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">NPC (Break Point)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">NPC (Recovery Point)</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Notes</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" id="pra_table">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">PRA (Positive Relative Accommodation) and NRA (Negative Relative Accommodation)</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">PRA</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="notes">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Break point">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="notes">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">NRA</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="notes">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="notes">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display: none" id="stereopsis_table">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">Stereopsis</td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Stereopsis Test</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="result">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="notes">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="result">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="Normal">Normal</option>
                                    <option value="Below Normal">Below Normal</option>
                                    <option value="Above Normal">Above Normal</option>
                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="notes">
                            </td>
                        </tr>


                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#color_vision_test').toggle()">
                        Color Vision Test
                    </button>
                </div>
                <div id="color_vision_test" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px">
                                Evaluates the patient’s ability to perceive colors correctly, used to detect color blindness.
                            </td>
                        </tr>
                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Testing Method</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Ishihara Plates">Ishihara Plates</option>
                                    <option value="Farnsworth D-15 Test">Farnsworth D-15 Test</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">
                            </td>
                            <td style="border: 1px solid #000; padding : 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Ishihara Plates">Ishihara Plates</option>
                                    <option value="Farnsworth D-15 Test">Farnsworth D-15 Test</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;" rowspan="">Test Results</td>

                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Ishihara Plates: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Number of Plates Shown">
                                <div class="d-flex justify-content-between">
                                    <input type="text" class="form-control col-md-5" placeholder="plates passed"> / <input type="text" class="form-control col-md-5" placeholder="plates passed">
                                </div>
                                <input type="text" class="form-control" placeholder="Plate 1">
                                <input type="text" class="form-control" placeholder="Plate 2">
                                <input type="text" class="form-control" placeholder="Plate 3">
                                <input type="text" class="form-control" placeholder="Plate 4">
                                <input type="text" class="form-control" placeholder="Plate 5">
                                <input type="text" class="form-control" placeholder="Comments on any errors or unusual findings">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Number of Plates Shown">
                                <div class="d-flex justify-content-between">
                                    <input type="text" class="form-control col-md-5" placeholder="plates passed"> / <input type="text" class="form-control col-md-5" placeholder="plates passed">
                                </div>
                                <input type="text" class="form-control" placeholder="Plate 1">
                                <input type="text" class="form-control" placeholder="Plate 2">
                                <input type="text" class="form-control" placeholder="Plate 3">
                                <input type="text" class="form-control" placeholder="Plate 4">
                                <input type="text" class="form-control" placeholder="Plate 5">
                                <input type="text" class="form-control" placeholder="Comments on any errors or unusual findings">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Farnsworth D-15 Test: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 1">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 2">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 3">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 4">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 5">
                                <input type="text" class="form-control" placeholder="Final Arrangement">

                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 1">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 2">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 3">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 4">
                                <input type="text" class="form-control" placeholder="Order of Colors Selected 5">
                                <input type="text" class="form-control" placeholder="Final Arrangement">

                            </td>
                        </tr>

                        <tr>

                            <td colspan="3" style="border: 1px solid #000; padding: 10px;" rowspan="">Clinical Observations</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Type of Color Vision Deficiency (if any): </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Protanopia">Protanopia</option>
                                    <option value="Deuteranopia">Deuteranopia</option>
                                    <option value="Tritanopia">Tritanopia</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Protanopia">Protanopia</option>
                                    <option value="Deuteranopia">Deuteranopia</option>
                                    <option value="Tritanopia">Tritanopia</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Comments on Visibility: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Observations">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Observations">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Functional Impact Assessment: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Symptoms</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Symptoms</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Management and Recommendations: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Recommendations Based on Results</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Recommendations Based on Results</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Follow-Up Plan: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                
                                <input type="text" class="form-control" placeholder="Next Appointment Date">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Purpose</option>

                                    <option value="Re-evaluation">Re-evaluation</option>
                                    <option value="Monitor progress">Monitor progress</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                
                                <input type="text" class="form-control" placeholder="Next Appointment Date">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Purpose</option>

                                    <option value="Re-evaluation">Re-evaluation</option>
                                    <option value="Monitor progress">Monitor progress</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">

                            </td>
                        </tr>
                        
                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#visual_field_test').toggle()">
                        Visual Field Test
                    </button>
                </div>
                <div id="visual_field_test" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px">
                                Measures the patient’s peripheral vision to detect blind spots (scotomas) or visual field defects. 
                            </td>
                        </tr>

                        <tr>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold; width: 200px"></td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD):</td>
                            <td colspan="" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS):</td>
                        </tr>

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; width: 200px">
                                <strong>Confrontation Visual Field Test</strong> Instructions, Record the results of the confrontation visual field test for each eye.
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Temporal</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Superior</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Nasal</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Inferior</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Testing Method</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Comments">
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;" rowspan="">Automated Visual Field Test (Perimetry)</td>

                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Test Parameters</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Test Type</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Test Date">
                                <input type="text" class="form-control" placeholder="Testing Duration">
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Test Type</option>
                                    <option value="Full">Full</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Blind Spot">Blind Spot</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Test Date">
                                <input type="text" class="form-control" placeholder="Testing Duration">
                            </td>

                        </tr>

                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px;" rowspan="">Results</td>

                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Mean Deviation (MD) dB">
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Mean Deviation (MD) dB">
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Pattern Standard Deviation (PSD) dB">
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="Pattern Standard Deviation (PSD) dB">
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">

                                <input value="" class="form-control" placeholder="Central vision loss" />
                                <input value="" class="form-control" placeholder="Peripheral vision loss" />
                                <input value="" class="form-control" placeholder="Hemianopia" />
                                <input value="" class="form-control" placeholder="Quadrantanopia" />
                                <input value="" class="form-control" placeholder="Scotoma" />
                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">

                                <input value="" class="form-control" placeholder="Central vision loss" />
                                <input value="" class="form-control" placeholder="Peripheral vision loss" />
                                <input value="" class="form-control" placeholder="Hemianopia" />
                                <input value="" class="form-control" placeholder="Quadrantanopia" />
                                <input value="" class="form-control" placeholder="Scotoma" />
                            </td>

                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Visual Field Graphs </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="file" name="" class="form-control" id="">
                                
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="file" name="" class="form-control" id="">
                            </td>
                        </tr>
                        
                        <tr>
                            
                            <td style="border: 1px solid #000; padding: 10px;" colspan="3">Clinical Impression</td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Findings Summary </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" placeholder="">

                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Recommendations</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input value="" class="form-control" placeholder="Referral to Specialist" />
                                <input value="" class="form-control" placeholder="Further Testing Required" />
                                <input value="" class="form-control" placeholder="Follow-up Appointment Scheduled for" />

                            </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input value="" class="form-control" placeholder="Referral to Specialist" />
                                <input value="" class="form-control" placeholder="Further Testing Required" />
                                <input value="" class="form-control" placeholder="Follow-up Appointment Scheduled for" />

                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Comments on Visibility: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Observations">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>
                                    <option value="Difficulty distinguishing red from green">Difficulty distinguishing red from green</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Observations">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Functional Impact Assessment: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Symptoms</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Symptoms</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Management and Recommendations: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Recommendations Based on Results</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Recommendations Based on Results</option>
                                    <option value="Difficulty with color-coded information">Difficulty with color-coded information</option>
                                    <option value="Trouble in activities that require color discrimination (e.g., driving, reading maps)">Trouble in activities that require color discrimination (e.g., driving, reading maps)</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other Comments">

                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;" rowspan="">Follow-Up Plan: </td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                
                                <input type="text" class="form-control" placeholder="Next Appointment Date">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Purpose</option>

                                    <option value="Re-evaluation">Re-evaluation</option>
                                    <option value="Monitor progress">Monitor progress</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">

                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                
                                <input type="text" class="form-control" placeholder="Next Appointment Date">
                                <SearchableSelectField name="" id="" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Select Purpose</option>

                                    <option value="Re-evaluation">Re-evaluation</option>
                                    <option value="Monitor progress">Monitor progress</option>

                                </SearchableSelectField>
                                <input type="text" class="form-control" placeholder="Other">

                            </td>
                        </tr>
                        
                    </table>
                </div>
            </div>


            <div class="row mt-4">
                <div class="col-md-6 offset-md-3">
                    <button type="submit" class="btn btn-lg btn-info w-100">Finalize Documentation</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bd-example-modal-lg" id="assessment_view_modal" tabindex="-1" role="dialog"
        aria-labelledby="select" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body assessment_details">


                </div>
            </div>
        </div>
    </div>

    <style>
        .form-infomation::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        .form-infomation::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }

        /* Handle */
        .form-infomation::-webkit-scrollbar-thumb {
            background: #888; 
        }

        /* Handle on hover */
        .form-infomation::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    </style>

    <!-- php: = $this->Form->end() -->


<!-- php: } -->

<script>
    scan_object = {};

    function generateAssessmentInfo(info) {
        return \`
            <div class="col-md-3 mb-1">
                <div class="card border-info">
                    <div class="card-header">
                        <h5 class="card-title">\${new Date(info.date_added).toGMTString()}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>Filled By:</strong>\${info.user?.first_name || ''} \${info.user?.last_name || ''}</p>
                        <button class="btn btn-xs btn-primary" onclick="viewAssessmentDetails('\${(info.id)}')">View Details</button>
                    </div>
                </div>
            </div>
        \`
    }

    function viewAssessmentDetails(assessment_id) {
        $('.modal-body.assessment_details').load(
            "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'singleChiroAssessmentPlanVisitReport', isset($selectedVisit) ? $selectedVisit->patient_id : '', isset($selectedVisit) ? $selectedVisit->id : '']) -->/"+assessment_id,
            function () {
                $('#' + 'assessment_view_modal').modal({
                    show: true
                });
            });
    }

    function populateSessionStatuses() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'sessionProgressNotes', $selectedVisit->patient_id, $selectedVisit->id]) -->",
			success: function g(data, textStatus) {
				$('#sessions_count').val(data['session_count'])
				$('#next_visit_date').val(data['next_visit'])

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function populateSessionAssessments() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getSessionAssessmentPlans', $selectedVisit->patient_id, $selectedVisit->id]) -->",
			success: function g(data, textStatus) {
				result = ''
                data.forEach(ele => {
                    result+=generateAssessmentInfo(ele)
                });
                if ((data.length) > 0) {
                    
                    $('#submittedAssessments').html(result)
                }

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});

        populateSessionStatuses()
	}
    function showSessionAssessmentInfo(title, info, cardStyle) {
        return \`
            <div class="card bg-light mb-3 with-transform" style="width: 100%; box-shadow:none;border-color:\${cardStyle}">
                <div class="card-body" style="background:white">
                    <h5 class="card-subtitle mb-2">\${title}</h5>
                    <p class="card-text text-muted">\${info}</p>
                </div>
            </div>
        \`
    }

    function itemResult(info) {
        if(['9', '10'].includes(info.item_type_id)) {
            return info.item.full_name
        } else if(info.item_type_id == '2') {
            return info.lab_test.name
        } else if(info.item_type_id == '7') {
            return info.radiology_scan.name
        } else if(info.item_type_id == '3') {
            return info.procedure_stock.name
        }
    }
    function sessionAssessmentChange(ele, event) {
        let bundled_items = $("#bundled_services_id option:selected").attr('data-bundled-items')
        console.log("Bundled Items", bundled_items)
        let bundled_json = JSON.parse(bundled_items)
        let result = bundled_json.map(ele => {
            return showSessionAssessmentInfo(
                itemResult(ele), ele.invoice_item_type.name, '#61affe'
            )
        });
        

        $('#process_bundled_items').html(
            result
        )
    }

    function submitSessionAssessment(link, value, table=null) {
      $.ajax({
        type: "POST",
        url: link,
        data: value,
        success: function g(data, textStatus) {
            // flash_message(data['status'], data['message'])
            // console.log(value["radioScans"])
            alertify.success("Record Has been Saved");
            // clearScan()
            // clearLabsForm()
            // $(\`#\${table}\`).DataTable().ajax.reload();
            populateSessionAssessments()
        },
        fail: function g(xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
      });
    }

    $('#assessment_plan_form_submit').submit(function(e){
        e.preventDefault();
        form = document.getElementById('assessment_plan_form_submit')
        var data = $('#assessment_plan_form_submit').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        data['frequency'] = 1
        if(!!data.scan_date_range){
            let newDateRange = data.scan_date_range.split('-')

            data['start_date'] = moment( newDateRange[0]).format('YYYY/MM/DD')
            data['end_date'] = moment( newDateRange[1]).format('YYYY/MM/DD')
            data['frequency'] = $('#scan_freq_text').html()
        }
        var action = form.action

      submitSessionAssessment(action,data, "bundled_service_table")
    })



</script>
<script type="text/javascript">
    function showRefractionSectionOnly(section_id) {
        $('#subjective_refraction').hide()
        $('#corrected_visual_acuity').hide()
        $('#contrast_visual_acuity').hide()
        $('#cycloplegic_refraction').hide()
        $('#auto_refraction').hide()
        $('#subjective_refraction_btn').removeClass('btn-success')
        $('#corrected_visual_acuity_btn').removeClass('btn-success')
        $('#contrast_visual_acuity_btn').removeClass('btn-success')
        $('#cycloplegic_refraction_btn').removeClass('btn-success')
        $('#auto_refraction_btn').removeClass('btn-success')
        
        $('#'+section_id).show()
        $('#'+section_id + '_btn').addClass('btn-success')
        
    }
    function showExTestsSectionOnly(section_id) {
        $('#phoria_table').hide()
        $('#heterophoria_table').hide()
        $('#distance_near_table').hide()
        $('#ac_table').hide()
        $('#npc_table').hide()
        $('#pra_table').hide()
        $('#stereopsis_table').hide()

        $('#phoria_table_btn').removeClass('btn-success')
        $('#heterophoria_table_btn').removeClass('btn-success')
        $('#distance_near_table_btn').removeClass('btn-success')
        $('#ac_table_btn').removeClass('btn-success')
        $('#npc_table_btn').removeClass('btn-success')
        $('#pra_table_btn').removeClass('btn-success')
        $('#stereopsis_table_btn').removeClass('btn-success')
        
        $('#'+section_id).show()
        $('#'+section_id + '_btn').addClass('btn-success')
        
    }


</script>

`;

export default function ElementElementPatientvisitVisionExamination() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
