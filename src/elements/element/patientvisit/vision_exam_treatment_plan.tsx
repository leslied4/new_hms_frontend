const rawHtml = `

<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'addSessionAssessmentPlans', $patient->id, $selectedVisit->id], 'id' => 'assessment_plan_form_submit', 'class' => 'row',]); -->

    <div class="container">
        <!-- <h2 class="text-center mb-1 mt-1">Vision Examination</h2> -->
        <div class="form-body">

       

  

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#spectable_prescription').toggle()">
                        Spectacle Prescription
                    </button>
                </div>
                <div id="spectable_prescription" class="card-body" style="display:none">
                    <span class="btn btn-xs btn-success" id="spectable_btn1" onclick="toggleBtnSection('spectable_btn1','spectable_btn2')">Spectacle Prescription</span>
                    <span class="btn btn-xs" id="spectable_btn2" onclick="toggleBtnSection('spectable_btn2','spectable_btn1')">Contact Lens</span>
                    <table id="spectable_btn1_table" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Spectacle Prescription</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;"></td>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD)</td>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Sphere (SPH):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> +0.25 D (Mild Hyperopia)<br>
                                <input type="checkbox"> +0.50 D<br>
                                <input type="checkbox"> +0.75 D<br>
                                <input type="checkbox"> +1.00 D (Moderate Hyperopia)<br>
                                <input type="checkbox"> +1.25 D<br>
                                <input type="checkbox"> +1.50 D<br>
                                <input type="checkbox"> -0.25 D (Mild Myopia)<br>
                                <input type="checkbox"> -0.50 D<br>
                                <input type="checkbox"> -0.75 D<br>
                                <input type="checkbox"> -1.00 D (Moderate Myopia)<br>
                                Other: <input type="text" style="width: 50px;"> D
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> +0.25 D (Mild Hyperopia)<br>
                                <input type="checkbox"> +0.50 D<br>
                                <input type="checkbox"> +0.75 D<br>
                                <input type="checkbox"> +1.00 D (Moderate Hyperopia)<br>
                                <input type="checkbox"> +1.25 D<br>
                                <input type="checkbox"> +1.50 D<br>
                                <input type="checkbox"> -0.25 D (Mild Myopia)<br>
                                <input type="checkbox"> -0.50 D<br>
                                <input type="checkbox"> -0.75 D<br>
                                <input type="checkbox"> -1.00 D (Moderate Myopia)<br>
                                Other: <input type="text" style="width: 50px;"> D
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Cylinder (CYL):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> 0.00 D (No Astigmatism)<br>
                                <input type="checkbox"> -0.25 D (Mild Astigmatism)<br>
                                <input type="checkbox"> -0.50 D<br>
                                <input type="checkbox"> -0.75 D<br>
                                <input type="checkbox"> -1.00 D (Moderate Astigmatism)<br>
                                Other: <input type="text" style="width: 50px;"> D
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> 0.00 D (No Astigmatism)<br>
                                <input type="checkbox"> -0.25 D (Mild Astigmatism)<br>
                                <input type="checkbox"> -0.50 D<br>
                                <input type="checkbox"> -0.75 D<br>
                                <input type="checkbox"> -1.00 D (Moderate Astigmatism)<br>
                                Other: <input type="text" style="width: 50px;"> D
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Axis:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> 0°<br>
                                <input type="checkbox"> 90°<br>
                                <input type="checkbox"> 180°<br>
                                Other: <input type="text" style="width: 50px;">°
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> 0°<br>
                                <input type="checkbox"> 90°<br>
                                <input type="checkbox"> 180°<br>
                                Other: <input type="text" style="width: 50px;">°
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Add (for Presbyopia):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> +1.00 D<br>
                                <input type="checkbox"> +1.25 D<br>
                                <input type="checkbox"> +1.50 D<br>
                                <input type="checkbox"> +2.00 D<br>
                                Other: <input type="text" style="width: 50px;"> D
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> +1.00 D<br>
                                <input type="checkbox"> +1.25 D<br>
                                <input type="checkbox"> +1.50 D<br>
                                <input type="checkbox"> +2.00 D<br>
                                Other: <input type="text" style="width: 50px;"> D
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Prism (if applicable):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Base:<br>
                                <input type="checkbox"> Up<br>
                                <input type="checkbox"> Down<br>
                                <input type="checkbox"> Right<br>
                                <input type="checkbox"> Left<br>
                                Power: <input type="text" style="width: 50px;"> (in prism diopters)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Base:<br>
                                <input type="checkbox"> Up<br>
                                <input type="checkbox"> Down<br>
                                <input type="checkbox"> Right<br>
                                <input type="checkbox"> Left<br>
                                Power: <input type="text" style="width: 50px;"> (in prism diopters)
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Pupillary Distance (PD):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Distance PD:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mm
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mm
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Near PD:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mm
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mm
                            </td>
                        </tr>
                    </table>

                    <table id="spectable_btn2_table" style="width: 100%; border-collapse: collapse; display:none">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Contact Lens</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;"></td>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD)</td>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Soft<br>
                                <input type="checkbox"> Rigid Gas Permeable (RGP)<br>
                                <input type="checkbox"> Toric<br>
                                <input type="checkbox"> Multifocal<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Soft<br>
                                <input type="checkbox"> Rigid Gas Permeable (RGP)<br>
                                <input type="checkbox"> Toric<br>
                                <input type="checkbox"> Multifocal<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Prescription:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Base Curve:<br>
                                <input type="checkbox"> 8.4 mm<br>
                                <input type="checkbox"> 8.6 mm<br>
                                <input type="checkbox"> 8.8 mm<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Diameter:<br>
                                <input type="checkbox"> 14.0 mm<br>
                                <input type="checkbox"> 14.2 mm<br>
                                <input type="checkbox"> 14.5 mm<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Sphere (SPH):<br>
                                <input type="checkbox"> +0.25<br>
                                <input type="checkbox"> +0.50<br>
                                <input type="checkbox"> +0.75<br>
                                <input type="checkbox"> +1.00<br>
                                <input type="checkbox"> -0.25<br>
                                <input type="checkbox"> -0.50<br>
                                <input type="checkbox"> -0.75<br>
                                <input type="checkbox"> -1.00<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Cylinder (CYL) (if applicable):<br>
                                <input type="checkbox"> 0.00<br>
                                <input type="checkbox"> -0.25<br>
                                <input type="checkbox"> -0.50<br>
                                <input type="checkbox"> -0.75<br>
                                <input type="checkbox"> -1.00<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Axis (if applicable):<br>
                                <input type="checkbox"> 0°<br>
                                <input type="checkbox"> 10°<br>
                                <input type="checkbox"> 20°<br>
                                <input type="checkbox"> 30°<br>
                                <input type="checkbox"> 40°<br>
                                <input type="checkbox"> 50°<br>
                                <input type="checkbox"> 60°<br>
                                <input type="checkbox"> 70°<br>
                                <input type="checkbox"> 80°<br>
                                <input type="checkbox"> 90°<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Add (if multifocal):<br>
                                <input type="checkbox"> +1.00<br>
                                <input type="checkbox"> +1.25<br>
                                <input type="checkbox"> +1.50<br>
                                <input type="checkbox"> +1.75<br>
                                <input type="checkbox"> +2.00<br>
                                Other: <input type="text" style="width: 50px;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Base Curve:<br>
                                <input type="checkbox"> 8.4 mm<br>
                                <input type="checkbox"> 8.6 mm<br>
                                <input type="checkbox"> 8.8 mm<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Diameter:<br>
                                <input type="checkbox"> 14.0 mm<br>
                                <input type="checkbox"> 14.2 mm<br>
                                <input type="checkbox"> 14.5 mm<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Sphere (SPH):<br>
                                <input type="checkbox"> +0.25<br>
                                <input type="checkbox"> +0.50<br>
                                <input type="checkbox"> +0.75<br>
                                <input type="checkbox"> +1.00<br>
                                <input type="checkbox"> -0.25<br>
                                <input type="checkbox"> -0.50<br>
                                <input type="checkbox"> -0.75<br>
                                <input type="checkbox"> -1.00<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Cylinder (CYL) (if applicable):<br>
                                <input type="checkbox"> 0.00<br>
                                <input type="checkbox"> -0.25<br>
                                <input type="checkbox"> -0.50<br>
                                <input type="checkbox"> -0.75<br>
                                <input type="checkbox"> -1.00<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Axis (if applicable):<br>
                                <input type="checkbox"> 0°<br>
                                <input type="checkbox"> 10°<br>
                                <input type="checkbox"> 20°<br>
                                <input type="checkbox"> 30°<br>
                                <input type="checkbox"> 40°<br>
                                <input type="checkbox"> 50°<br>
                                <input type="checkbox"> 60°<br>
                                <input type="checkbox"> 70°<br>
                                <input type="checkbox"> 80°<br>
                                <input type="checkbox"> 90°<br>
                                Other: <input type="text" style="width: 50px;"><br>
                                Add (if multifocal):<br>
                                <input type="checkbox"> +1.00<br>
                                <input type="checkbox"> +1.25<br>
                                <input type="checkbox"> +1.50<br>
                                <input type="checkbox"> +1.75<br>
                                <input type="checkbox"> +2.00<br>
                                Other: <input type="text" style="width: 50px;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Lens Brand:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;" placeholder="Select field">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;" placeholder="Select field">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Wearing Schedule:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Daily Wear<br>
                                <input type="checkbox"> Extended Wear<br>
                                <input type="checkbox"> Continuous Wear<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Daily Wear<br>
                                <input type="checkbox"> Extended Wear<br>
                                <input type="checkbox"> Continuous Wear<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Lens Coatings:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> UV Protection<br>
                                <input type="checkbox"> Anti-reflective Coating<br>
                                <input type="checkbox"> Blue Light Filtering<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> UV Protection<br>
                                <input type="checkbox"> Anti-reflective Coating<br>
                                <input type="checkbox"> Blue Light Filtering<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Comments/Notes:</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">
                                <textarea name="notes" id="" class="form-control" placeholder="Notes" row="3" class="mt-1" ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Follow-up Schedule:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Next Appointment Date:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Comments:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Patient Education:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Discussed proper cleaning and handling of contact lenses?</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Yes<br>
                                <input type="checkbox"> No
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Provided information on wearing schedules and replacement schedules?</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Yes<br>
                                <input type="checkbox"> No
                            </td>
                        </tr>

                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#surgical_options').toggle()">
                        Surgical Options
                    </button>
                </div>
                <div id="surgical_options" class="card-body" style="display:none">
                    <span class="btn btn-xs btn-success" onclick="toggleBtnSection('sur_btn1', 'sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn11', )" id="sur_btn1">Cataract Surgery</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn2', 'sur_btn1', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn11' )" id="sur_btn2">Refractive Surgery (LASIK, PRK)</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn3', 'sur_btn2', 'sur_btn1', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn11' )" id="sur_btn3">Lens Replacement (e.g., Intraocular Lens (IOL))</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn4', 'sur_btn2', 'sur_btn3', 'sur_btn1', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn11' )" id="sur_btn4">Glaucoma Surgery (e.g., Trabeculectomy, Shunt)</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn5', 'sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn1', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn11' )" id="sur_btn5">Corneal Transplant</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn6', 'sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn1', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn11' )" id="sur_btn6">Vitrectomy</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn7', 'sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn1', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn11' )" id="sur_btn7">Retinal Detachment Repair</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn8', 'sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn1', 'sur_btn9', 'sur_btn10', 'sur_btn11' )" id="sur_btn8">Pterygium Surgery</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn9', 'sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn1', 'sur_btn10', 'sur_btn11' )" id="sur_btn9">Chalazion or Stye Removal</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn10','sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn1', 'sur_btn11'  )" id="sur_btn10">Eyelid Surgery (e.g., Blepharoplasty)</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('sur_btn11','sur_btn2', 'sur_btn3', 'sur_btn4', 'sur_btn5', 'sur_btn6', 'sur_btn7', 'sur_btn8', 'sur_btn9', 'sur_btn10', 'sur_btn1'  )" id="sur_btn11">Summary and Recommendations</span>

                    <table style="width: 100%; border-collapse: collapse;" id="sur_btn1_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Surgical Options (if applicable):</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">1. Cataract Surgery</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Cataract Surgery:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Phacoemulsification">Phacoemulsification</option>
                                    <option value="Manual Extracapsular Extraction">Manual Extracapsular Extraction</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Phacoemulsification">Phacoemulsification</option>
                                    <option value="Manual Extracapsular Extraction">Manual Extracapsular Extraction</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/60)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/60)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure"> Intraocular Pressure (mmHg)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure"> Intraocular Pressure (mmHg)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="5" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/25)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/25)
                            </td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Intraocular Pressure(mmHg)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Intraocular Pressure(mmHg)
                            </td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Posterior Capsule Opacification<br>
                                <input type="checkbox"> Intraoperative Floppy Iris Syndrome<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Posterior Capsule Opacification<br>
                                <input type="checkbox"> Intraoperative Floppy Iris Syndrome<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn2_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">2. Refractive Surgery (LASIK, PRK)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="LASIK">LASIK</option>
                                    <option value="PRK">PRK</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="LASIK">LASIK</option>
                                    <option value="PRK">PRK</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/200)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/200)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Corneal Thickness (microns)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Corneal Thickness (microns)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Dry Eye<br>
                                <input type="checkbox"> Halos or Glare<br>
                                <input type="checkbox"> Ectasia<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Dry Eye<br>
                                <input type="checkbox"> Halos or Glare<br>
                                <input type="checkbox"> Ectasia<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn3_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">3. Lens Replacement (e.g., Intraocular Lens (IOL))</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Anterior Chamber IOL">Anterior Chamber IOL</option>
                                    <option value="Posterior Chamber IOL">Posterior Chamber IOL</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Anterior Chamber IOL">Anterior Chamber IOL</option>
                                    <option value="Posterior Chamber IOL">Posterior Chamber IOL</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/70)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/70)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Intraocular Pressure (mmHg)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Intraocular Pressure (mmHg)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/30)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/30)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Dislocated IOL<br>
                                <input type="checkbox"> Opacification<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Dislocated IOL<br>
                                <input type="checkbox"> Opacification<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn4_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">4. Glaucoma Surgery (e.g., Trabeculectomy, Shunt)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Trabeculectomy">Trabeculectomy</option>
                                    <option value="Glaucoma Drainage Device">Glaucoma Drainage Device</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Trabeculectomy">Trabeculectomy</option>
                                    <option value="Glaucoma Drainage Device">Glaucoma Drainage Device</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/50)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/50)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Intraocular Pressure (mmHg)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Intraocular Pressure (mmHg)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="5" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/40)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/40)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Intraocular Pressure (mmHg)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Intraocular Pressure">Intraocular Pressure (mmHg)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Hypotony<br>
                                <input type="checkbox"> Bleeding<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Hypotony<br>
                                <input type="checkbox"> Bleeding<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn5_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">5. Corneal Transplant</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Penetrating Keratoplasty (PKP)">Penetrating Keratoplasty (PKP)</option>
                                    <option value="Descemet Stripping Endothelial Keratoplasty (DSEK)">Descemet Stripping Endothelial Keratoplasty (DSEK)</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Penetrating Keratoplasty (PKP)">Penetrating Keratoplasty (PKP)</option>
                                    <option value="Descemet Stripping Endothelial Keratoplasty (DSEK)">Descemet Stripping Endothelial Keratoplasty (DSEK)</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/100)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/100)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/60)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/60)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Rejection<br>
                                <input type="checkbox"> Graft Failure<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Rejection<br>
                                <input type="checkbox"> Graft Failure<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn6_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">6. Vitrectomy</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Pars Plana Vitrectomy">Pars Plana Vitrectomy</option>

                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Pars Plana Vitrectomy">Pars Plana Vitrectomy</option>

                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/200)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/200)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/50)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/50)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Retinal Detachment<br>
                                <input type="checkbox"> Infection<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Retinal Detachment<br>
                                <input type="checkbox"> Infection<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn7_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">7. Retinal Detachment Repair</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Scleral Buckle">Scleral Buckle</option>
                                    <option value="Vitrectomy">Vitrectomy</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Scleral Buckle">Scleral Buckle</option>
                                    <option value="Vitrectomy">Vitrectomy</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/100)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/100)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/30)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/30)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Re-detachment<br>
                                <input type="checkbox"> Subretinal Haemorrhage<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Re-detachment<br>
                                <input type="checkbox"> Subretinal Haemorrhage<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn8_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">8. Pterygium Surgery</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Excision with Conjunctival Autograft">Excision with Conjunctival Autograft</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Excision with Conjunctival Autograft">Excision with Conjunctival Autograft</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/25)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/25)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Recurrence<br>
                                <input type="checkbox"> Scarring<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Recurrence<br>
                                <input type="checkbox"> Scarring<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn9_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">9. Chalazion or Stye Removal</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Incision">Incision</option>
                                    <option value="Drainage">Drainage</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Incision">Incision</option>
                                    <option value="Drainage">Drainage</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/30)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/30)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Infection<br>

                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Infection<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn10_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">10. Eyelid Surgery (e.g., Blepharoplasty)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Procedure:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Upper Blepharoplasty">Upper Blepharoplasty</option>
                                    <option value="Lower Blepharoplasty">Lower Blepharoplasty</option>

                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField multiple data-size="5" name="plus_range[]" style="height: 100px;" class="form-control selectpicker">
                                    <option value="" selected disabled hidden>Type of Procedure</option>
                                    <option value="Upper Blepharoplasty">Upper Blepharoplasty</option>
                                    <option value="Lower Blepharoplasty">Lower Blepharoplasty</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Before Surgery:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/25)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;" placeholder="Visual Acuity"> Visual Acuity (e.g., 20/25)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="border: 1px solid #000; padding: 10px; font-weight: bold;">After Surgery:</td>
                        </tr>
                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> Visual Acuity(e.g., 20/20)
                            </td>
                        </tr>

                        <tr>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Scarring<br>

                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Complications: <br> 
                                <input type="checkbox"> Scarring<br>

                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="sur_btn11_table">
                        <tr>
                        <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">11. Summary and Recommendations</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Diagnosis:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Lens Pathology<br>
                                <input type="checkbox"> Refractive Error<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Recommendations:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Further Evaluation<br>
                                <input type="checkbox"> Treatment (Specify): <input type="text" style="width: 100%;"><br>
                                <input type="checkbox"> Follow-Up Appointment: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Notes: <input type="text" style="width: 100%;"></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#medical_management').toggle()">
                        Medical Management
                    </button>
                </div>
                <div id="medical_management" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Medical Management:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;"></td>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Right Eye (OD)</td>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Left Eye (OS)</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Anti-allergy Drops:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class="  selectpicker form-control">
                                    <option value="allergic_conjunctivitis">Allergic conjunctivitis</option>
                                    <option value="seasonal_allergies">Seasonal allergies</option>
                                    <option value="itching">Itching</option>
                                    <option value="redness">Redness</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;" class=" selectpicker form-control">
                                <SearchableSelectField style="width: 100%;" class="  selectpicker form-control">
                                    <option value="allergic_conjunctivitis">Allergic conjunctivitis</option>
                                    <option value="seasonal_allergies">Seasonal allergies</option>
                                    <option value="itching">Itching</option>
                                    <option value="redness">Redness</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Options:</td>
                            
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Antihistamine Drops (e.g., Ketotifen, Olopatadine)<br>
                                <input type="checkbox"> Mast Cell Stabilizers (e.g., Cromolyn sodium, Nedocromil)<br>
                                <input type="checkbox"> Combination Drops (e.g., Azelastine, Olopatadine)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Antihistamine Drops (e.g., Ketotifen, Olopatadine)<br>
                                <input type="checkbox"> Mast Cell Stabilizers (e.g., Cromolyn sodium, Nedocromil)<br>
                                <input type="checkbox"> Combination Drops (e.g., Azelastine, Olopatadine)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Artificial Tears:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class="  selectpicker form-control">
                                    <option value="dry_eye_syndrome">Dry eye syndrome</option>
                                    <option value="environmental_exposure">Environmental exposure</option>
                                    <option value="post_surgery_dryness">Post-surgery dryness</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class="  selectpicker form-control">
                                    <option value="dry_eye_syndrome">Dry eye syndrome</option>
                                    <option value="environmental_exposure">Environmental exposure</option>
                                    <option value="post_surgery_dryness">Post-surgery dryness</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Options:</td>
                            
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Preservative-Free Drops (e.g., Sodium hyaluronate, Carboxymethylcellulose)<br>
                                <input type="checkbox"> Ointments (e.g., Mineral oil, Petrolatum)<br>
                                <input type="checkbox"> Gel Formulations (e.g., Hydroxypropyl methylcellulose)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Preservative-Free Drops (e.g., Sodium hyaluronate, Carboxymethylcellulose)<br>
                                <input type="checkbox"> Ointments (e.g., Mineral oil, Petrolatum)<br>
                                <input type="checkbox"> Gel Formulations (e.g., Hydroxypropyl methylcellulose)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Antibiotic Drops:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class="  selectpicker form-control">
                                    <option value="bacterial_conjunctivitis">Bacterial conjunctivitis</option>
                                    <option value="keratitis">Keratitis</option>
                                    <option value="other_eye_infections">Other eye infections</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;" >
                                <SearchableSelectField style="width: 100%;" class="  selectpicker form-control">
                                    <option value="bacterial_conjunctivitis">Bacterial conjunctivitis</option>
                                    <option value="keratitis">Keratitis</option>
                                    <option value="other_eye_infections">Other eye infections</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Options:</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Moxifloxacin (Vigamox)<br>
                                <input type="checkbox"> Ciprofloxacin (Ciloxan)<br>
                                <input type="checkbox"> Tobramycin (Tobrex)<br>
                                <input type="checkbox"> Ofloxacin (Ocuflox)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Moxifloxacin (Vigamox)<br>
                                <input type="checkbox"> Ciprofloxacin (Ciloxan)<br>
                                <input type="checkbox"> Tobramycin (Tobrex)<br>
                                <input type="checkbox"> Ofloxacin (Ocuflox)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Anti-inflammatory Drops:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class="  selectpicker form-control">
                                    <option value="inflammation_post_surgery">Inflammation post-surgery</option>
                                    <option value="allergic_reactions">Allergic reactions</option>
                                    <option value="uveitis">Uveitis</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="inflammation_post_surgery">Inflammation post-surgery</option>
                                    <option value="allergic_reactions">Allergic reactions</option>
                                    <option value="uveitis">Uveitis</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Options:</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Steroid Drops (e.g., Prednisolone acetate, Dexamethasone, Fluorometholone)<br>
                                <input type="checkbox"> Nonsteroidal Anti-inflammatory Drugs (NSAIDs) (e.g., Ketorolac, Bromfenac)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Steroid Drops (e.g., Prednisolone acetate, Dexamethasone, Fluorometholone)<br>
                                <input type="checkbox"> Nonsteroidal Anti-inflammatory Drugs (NSAIDs) (e.g., Ketorolac, Bromfenac)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Glaucoma Medications:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="elevated_intraocular_pressure">Elevated intraocular pressure</option>
                                    <option value="glaucoma_management">Glaucoma management</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="elevated_intraocular_pressure">Elevated intraocular pressure</option>
                                    <option value="glaucoma_management">Glaucoma management</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Options:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Prostaglandin Analogs (e.g., Latanoprost, Bimatoprost, Travoprost)<br>
                                <input type="checkbox"> Beta Blockers (e.g., Timolol, Betaxolol, Carteolol)<br>
                                <input type="checkbox"> Alpha Agonists (e.g., Brimonidine, Apraclonidine)<br>
                                <input type="checkbox"> Carbonic Anhydrase Inhibitors (e.g., Dorzolamide, Brinzolamide)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Prostaglandin Analogs (e.g., Latanoprost, Bimatoprost, Travoprost)<br>
                                <input type="checkbox"> Beta Blockers (e.g., Timolol, Betaxolol, Carteolol)<br>
                                <input type="checkbox"> Alpha Agonists (e.g., Brimonidine, Apraclonidine)<br>
                                <input type="checkbox"> Carbonic Anhydrase Inhibitors (e.g., Dorzolamide, Brinzolamide)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Antiviral Drops:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="viral_conjunctivitis">Viral conjunctivitis</option>
                                    <option value="herpes_simplex_keratitis">Herpes simplex keratitis</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="viral_conjunctivitis">Viral conjunctivitis</option>
                                    <option value="herpes_simplex_keratitis">Herpes simplex keratitis</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Trifluridine (Viroptic)<br>
                                <input type="checkbox"> Ganciclovir (Zirgan)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Trifluridine (Viroptic)<br>
                                <input type="checkbox"> Ganciclovir (Zirgan)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Topical Anaesthetics:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="pain_relief">Pain relief during procedures</option>
                                    <option value="foreign_body_removal">Foreign body removal</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="pain_relief">Pain relief during procedures</option>
                                    <option value="foreign_body_removal">Foreign body removal</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Options:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Proparacaine (Alcaine)<br>
                                <input type="checkbox"> Tetracaine (Pontocaine)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Proparacaine (Alcaine)<br>
                                <input type="checkbox"> Tetracaine (Pontocaine)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Systemic Medications:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="inflammatory_conditions">Inflammatory conditions</option>
                                    <option value="infections">Infections</option>
                                </SearchableSelectField>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <SearchableSelectField style="width: 100%;" class=" selectpicker form-control">
                                    <option value="inflammatory_conditions">Inflammatory conditions</option>
                                    <option value="infections">Infections</option>
                                </SearchableSelectField>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Options:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Oral Antibiotics (e.g., Amoxicillin, Doxycycline)<br>
                                <input type="checkbox"> Oral Anti-inflammatories (e.g., NSAIDs, Corticosteroids)<br>
                                <input type="checkbox"> Immunosuppressive agents (e.g., Methotrexate, Azathioprine)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Oral Antibiotics (e.g., Amoxicillin, Doxycycline)<br>
                                <input type="checkbox"> Oral Anti-inflammatories (e.g., NSAIDs, Corticosteroids)<br>
                                <input type="checkbox"> Immunosuppressive agents (e.g., Methotrexate, Azathioprine)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Other Treatments:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Scleral lenses (for severe dry eyes)<br>
                                <input type="checkbox"> Punctal plugs (to reduce tear drainage)<br>
                                <input type="checkbox"> Lubricating ointments (for overnight relief)<br>
                                <input type="checkbox"> Vitamin and Nutritional Supplements (e.g., Omega-3 fatty acids, Lutein)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Scleral lenses (for severe dry eyes)<br>
                                <input type="checkbox"> Punctal plugs (to reduce tear drainage)<br>
                                <input type="checkbox"> Lubricating ointments (for overnight relief)<br>
                                <input type="checkbox"> Vitamin and Nutritional Supplements (e.g., Omega-3 fatty acids, Lutein)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Details:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Medication Name:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Dosage:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Frequency:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Duration:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#patient_management_medical_conditions').toggle()">
                        Patient Management & Considerations
                    </button>
                </div>
                <div id="patient_management_medical_conditions" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Patient Management & Considerations</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Patient Education</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">To ensure patient compliance and understanding of their treatment plan.</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Options:<br>
                                <input type="checkbox"> Explanation of medication use and administration<br>
                                <input type="checkbox"> Discussion of potential side effects<br>
                                <input type="checkbox"> Emphasis on the importance of follow-up appointments<br>
                                <input type="checkbox"> Lifestyle modifications:<br>
                                <input type="checkbox"> Hydration and screen time reduction (for dry eye)<br>
                                <input type="checkbox"> UV protection (for light-sensitive conditions)<br>
                                <input type="checkbox"> Smoking cessation (for AMD and cataract risk reduction)<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Follow-up Plan</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">To monitor progress and adjust treatment as necessary.</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Options:<br>
                                <input type="checkbox"> Follow-up in 1 week<br>
                                <input type="checkbox"> Follow-up in 1 month<br>
                                <input type="checkbox"> As needed (PRN)<br>
                                <input type="checkbox"> Referral to a specialist:<br>
                                <input type="checkbox"> Ophthalmologist<br>
                                <input type="checkbox"> Retinal specialist<br>
                                <input type="checkbox"> Corneal specialist<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Allergy Management</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">To address any known drug allergies.</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Options:<br>
                                <input type="checkbox"> Assess for drug allergies<br>
                                <input type="checkbox"> Document any allergic reactions<br>
                                <input type="checkbox"> Prescribe alternative medications as needed<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Systemic Health Considerations</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">4.1 Diabetes Management</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Purpose:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Monitor for ocular complications related to diabetes, such as diabetic retinopathy or macular edema.</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Blood Sugar Levels:</td>

                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Controlled (Target: Fasting <130 mg/dL, Postprandial <180 mg/dL)<br>
                                <input type="checkbox"> Elevated <br>
                                <input type="checkbox"> Unstable, refer for further endocrinology review<br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">HbA1c Levels:</td>

                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> <7% (Good Control)<br>
                                <input type="checkbox"> 7-8% (Moderate Control)<br>
                                <input type="checkbox"> >8% (Poor Control, discuss with PCP/endocrinologist)<br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Retinal Exam Findings:</td>

                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> No diabetic retinopathy<br>
                                <input type="checkbox"> Mild NPDR (Non-Proliferative Diabetic Retinopathy)<br>
                                <input type="checkbox"> Moderate NPDR<br>
                                <input type="checkbox"> Severe NPDR<br>
                                <input type="checkbox"> PDR (Proliferative Diabetic Retinopathy)<br>
                                <input type="checkbox"> Macular Edema
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">4.2 Hypertension Management</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Purpose:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Monitor for hypertensive retinopathy or other vascular-related eye changes.</td>
                        </tr>
                        <tr>
                            <tr>
                                <td colspan="3" style="border: 1px solid #000; padding: 10px;">Results to Document:</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000; padding: 10px;">Blood Pressure Readings:</td>
                                <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                    <input type="checkbox"> Within target range (e.g., <140/90 mmHg)<br>
                                    <input type="checkbox"> Slightly elevated (140-159/90-99 mmHg)<br>
                                    <input type="checkbox"> Moderately elevated (160-179/100-109 mmHg)<br>
                                    <input type="checkbox"> Severely elevated (≥180/110 mmHg, consider urgent care)
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000; padding: 10px;">Cardiovascular Health Indicators:</td>
                                <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                    <input type="checkbox"> No ocular findings related to hypertension<br>
                                    <input type="checkbox"> Mild Hypertensive Retinopathy (arteriolar narrowing)<br>
                                    <input type="checkbox"> Moderate Retinopathy (AV nicking, haemorrhages)<br>
                                    <input type="checkbox"> Severe Retinopathy (cotton wool spots, papilledema)
                                </td>
                            </tr>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">4.3 Autoimmune Disease Management</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Purpose:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">To monitor ocular manifestations associated with autoimmune diseases, as well as side effects from medications (e.g., corticosteroids).</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Conditions & Result Options:</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold">Rheumatoid Arthritis</td>
                        </tr>
                        <tr>
                            <td  style="border: 1px solid #000; padding: 10px;">Common Ocular Manifestations:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> No ocular involvement detected<br>
                                <input type="checkbox"> Uveitis (Acute/Chronic)<br>
                                <input type="checkbox"> Scleritis (Anterior/Posterior)<br>
                                <input type="checkbox"> Dry Eye Syndrome
                            </td>
                        </tr>
                        <tr>

                            <td  style="border: 1px solid #000; padding: 10px;">Symptom Severity:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Mild<br>
                                <input type="checkbox"> Moderate<br>
                                <input type="checkbox"> Severe (consider corticosteroid or immunosuppressant therapy)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold">Systemic Lupus Erythematosus (SLE)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Common Ocular Manifestations:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> No ocular manifestations detected<br>
                                <input type="checkbox"> Retinal Vasculitis<br>
                                <input type="checkbox"> Dry Eye Syndrome<br>
                                <input type="checkbox"> Episcleritis/Scleritis<br>
                                <input type="checkbox"> Optic Neuritis
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Severity of Involvement:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Mild (regular monitoring)<br>
                                <input type="checkbox"> Moderate (additional testing or referral to rheumatology)<br>
                                <input type="checkbox"> Severe (urgent management, systemic therapy adjustment)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold">Other Autoimmune Conditions:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Document specific findings and symptom severity based on condition (e.g., Sjogren’s syndrome - dry eye severity, ankylosing spondylitis - risk of uveitis).</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">4.4 Other Systemic Conditions:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Document any other relevant systemic health impacts on ocular health, specifying:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <textarea name=""  id=""></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#monitoring_plans').toggle()">
                        Monitoring Plan
                    </button>
                </div>
                <div id="monitoring_plans" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Monitoring Plan</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Follow-up Appointment:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                Date: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Purpose:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Routine Check-Up<br>
                                <input type="checkbox"> Post-Operative Review<br>
                                <input type="checkbox"> Monitor Progress of Condition<br>
                                <input type="checkbox"> Medication Review<br>
                                <input type="checkbox"> Assess Response to Treatment<br>
                                <input type="checkbox"> Evaluate New Symptoms<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Additional Testing:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">To monitor ocular health status and detect any progression or changes in condition.</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Tests to Consider:</td>
                            <td style="border: 1px solid #000; padding: 10px;">Purpose:</td>
                            <td style="border: 1px solid #000; padding: 10px;">Parameters:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Visual Field Testing</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="" class="form-control">Assess peripheral vision and detect visual field defects (e.g., glaucoma monitoring).</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="text" name="" class="form-control" id="">Defect location, severity, progression from previous tests.</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">OCT (Optical Coherence Tomography)</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="" class="form-control">Obtain cross-sectional images of the retina and optic nerve.</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="text" name="" class="form-control" id="">Retinal thickness, nerve fiber layer integrity, macular edema presence.</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Fundus Photography</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="" class="form-control">Document retinal appearance and monitor for progressive changes.</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="text" name="" class="form-control" id="">Retinal lesions, haemorrhages, macular condition.</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Anterior Segment Photography</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="" class="form-control">Capture changes in the anterior segment, such as corneal or lens abnormalities.</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="text" name="" class="form-control" id="">Corneal clarity, iris details, cataract progression.</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Corneal Topography</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="" class="form-control">Evaluate corneal curvature, especially for contact lens fitting or keratoconus monitoring.</td>
                            <td style="border: 1px solid #000; padding: 10px;"><input type="text" name="" class="form-control" id="">Keratometric values, corneal astigmatism.</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Other:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;"><input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Patient Education:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Indications:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">Ensure the patient understands the need for follow-up, adherence, and lifestyle considerations.</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Instructions:<br>
                                <input type="checkbox"> Discuss warning signs to watch for, indicating potential condition changes (e.g., flashes, floaters, vision loss).<br>
                                <input type="checkbox"> Emphasise adherence to prescribed medications and follow-up.<br>
                                <input type="checkbox"> Advise on lifestyle changes for ocular health (e.g., diet, UV protection, smoking cessation).
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Follow-up Summary:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Date of Last Appointment:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Key Findings/Notes:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Patient's Adherence to Treatment Plan:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Patient's Concerns/Comments:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Next Steps:</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">
                                Follow-up Actions:<br>
                                <input type="checkbox"> Schedule next appointment based on findings.<br>
                                <input type="checkbox"> Refer to specialist if needed (e.g., retinal, glaucoma).<br>
                                <input type="checkbox"> Adjust treatment plan based on new findings.<br>
                                Notes/Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#progressive_notes').toggle()">
                        Progressive Notes
                    </button>
                </div>
                <div id="progressive_notes" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Progressive Notes (Ongoing Visits)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Date of Follow-up:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Patient’s Response to Medication:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Changes in Symptoms:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Observations from Testing:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Patient's Adherence to Treatment Plan:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Patient's Concerns/Comments:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Key Findings:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">New Recommendations or Adjustments:</td>
                            <td colspan="2" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;">
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

    function toggleBtnSection() {
        [...arguments].forEach((ele, id) => {

            $('#'+ele+'_table').hide()
            $('#'+ele).removeClass('btn-success')
        });
        console.log(arguments[0])
        $('#'+arguments[0]+'_table').show()
        $('#'+arguments[0]).addClass('btn-success')
    }


</script>

`;

export default function ElementElementPatientvisitVisionExamTreatmentPlan() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
