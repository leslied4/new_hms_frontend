const rawHtml = `

<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'addSessionAssessmentPlans', $patient->id, $selectedVisit->id], 'id' => 'assessment_plan_form_submit', 'class' => 'row',]); -->

    <div class="container">
        <!-- <h2 class="text-center mb-1 mt-1">Vision Examination</h2> -->
        <div class="form-body">

       

  

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#binocular_visionz').toggle()">
                        Frontal Adnexa Examination
                    </button>
                </div>
                <div id="binocular_visionz" class="card-body" style="display:none">
                    <span class="btn btn-xs btn-success" onclick="toggleBtnSection('fron_btn1', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn1">Eyelids</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn2', 'fron_btn1', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn2">Conjunctiva</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn3', 'fron_btn2', 'fron_btn1', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn3">Corneal Examination</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn4', 'fron_btn2', 'fron_btn3', 'fron_btn1', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn4">Lacrimal System</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn5', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn1', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn5">Periocular Skin and Orbit</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn6', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn1', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn6">Orbital Region</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn7', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn1', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn7">Palpation of the Orbital Rim</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn8', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn1', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn8">Slit Lamp Microscopy Examination</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn9', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn1', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn9">Anterior Chamber</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn10', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn1', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn10">Iris</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn11', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn1', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn11">Pupil</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn12', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn1', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn12">Relative Afferent Pupillary Defect (RAPD)</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn13', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn1', 'fron_btn14', 'fron_btn15', 'fron_btn16',)" id="fron_btn13">Lens</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn14', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn1', 'fron_btn15', 'fron_btn16',)" id="fron_btn14">Tear Film</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn15', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn1', 'fron_btn16',)" id="fron_btn15">Intraocular Pressure (IOP)</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fron_btn16', 'fron_btn2', 'fron_btn3', 'fron_btn4', 'fron_btn5', 'fron_btn6', 'fron_btn7', 'fron_btn8', 'fron_btn9', 'fron_btn10', 'fron_btn11', 'fron_btn12', 'fron_btn13', 'fron_btn14', 'fron_btn15', 'fron_btn1',)" id="fron_btn16">Gonioscopy (if performed)</span>

                    <table style="width: 100%; border-collapse: collapse;" id="fron_btn1_table">
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;"></th>
                            <th style="border: 1px solid #000; padding: 8px;">Right Eye (OD)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Left Eye (OS)</th>
                        </tr>

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Eyelids:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Position:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Ptosis (Drooping)<br>
                                <input type="checkbox"> Ectropion (Outward Turn)<br>
                                <input type="checkbox"> Entropion (Inward Turn)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Ptosis (Drooping)<br>
                                <input type="checkbox"> Ectropion (Outward Turn)<br>
                                <input type="checkbox"> Entropion (Inward Turn)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Lid Margins:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Inflammation (Blepharitis)<br>
                                <input type="checkbox"> Telangiectasia<br>
                                <input type="checkbox"> Crusty or Flaky<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Inflammation (Blepharitis)<br>
                                <input type="checkbox"> Telangiectasia<br>
                                <input type="checkbox"> Crusty or Flaky<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Appearance:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Puffy (Edema)<br>
                                <input type="checkbox"> Dry (Desquamation)<br>
                                <input type="checkbox"> Redness<br>
                                <input type="checkbox"> Swelling<br>
                                <input type="checkbox"> Discoloration (e.g., Hyperpigmentation)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Puffy (Edema)<br>
                                <input type="checkbox"> Dry (Desquamation)<br>
                                <input type="checkbox"> Redness<br>
                                <input type="checkbox"> Swelling<br>
                                <input type="checkbox"> Discoloration (e.g., Hyperpigmentation)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Movement:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Impaired (Lagophthalmos, Restricted Eye Closure)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Impaired (Lagophthalmos, Restricted Eye Closure)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Lashes:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Trichiasis (Inward Growth)<br>
                                <input type="checkbox"> Madarosis (Loss of Lashes)<br>
                                <input type="checkbox"> Distichiasis (Abnormal Row of Lashes)<br>
                                <input type="checkbox"> Folliculitis (Infection of Hair Follicles)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Trichiasis (Inward Growth)<br>
                                <input type="checkbox"> Madarosis (Loss of Lashes)<br>
                                <input type="checkbox"> Distichiasis (Abnormal Row of Lashes)<br>
                                <input type="checkbox"> Folliculitis (Infection of Hair Follicles)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn2_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Conjunctiva:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Bulbar Conjunctiva:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Injected<br>
                                <input type="checkbox"> Slightly Injected<br>
                                <input type="checkbox"> Yellow<br>
                                <input type="checkbox"> Growth (e.g., Pinguecula, Pterygium)<br>
                                <input type="checkbox"> Lesion (e.g., Nevus, Tumor)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Injected<br>
                                <input type="checkbox"> Slightly Injected<br>
                                <input type="checkbox"> Yellow<br>
                                <input type="checkbox"> Growth (e.g., Pinguecula, Pterygium)<br>
                                <input type="checkbox"> Lesion (e.g., Nevus, Tumor)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Palpebral Conjunctiva:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Papillae<br>
                                <input type="checkbox"> Follicles<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Papillae<br>
                                <input type="checkbox"> Follicles<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn3_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Corneal Examination:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Transparency:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Edema<br>
                                <input type="checkbox"> Scarring<br>
                                <input type="checkbox"> Haze<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Edema<br>
                                <input type="checkbox"> Scarring<br>
                                <input type="checkbox"> Haze<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Epithelium:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Intact<br>
                                <input type="checkbox"> Abrasions<br>
                                <input type="checkbox"> Erosion<br>
                                <input type="checkbox"> Dendritic Ulcers<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Fluorescein Staining: <input type="checkbox"> Positive <input type="checkbox"> Negative<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Intact<br>
                                <input type="checkbox"> Abrasions<br>
                                <input type="checkbox"> Erosion<br>
                                <input type="checkbox"> Dendritic Ulcers<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Fluorescein Staining: <input type="checkbox"> Positive <input type="checkbox"> Negative<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Stroma:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Dystrophy (e.g., Fuchs')<br>
                                <input type="checkbox"> Infiltrate<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Dystrophy (e.g., Fuchs')<br>
                                <input type="checkbox"> Infiltrate<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Endothelium:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Guttata<br>
                                <input type="checkbox"> Polymegathism<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Guttata<br>
                                <input type="checkbox"> Polymegathism<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn4_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Lacrimal System:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Tear Meniscus:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Elevated<br>
                                <input type="checkbox"> Reduced (Tear Deficiency)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Elevated<br>
                                <input type="checkbox"> Reduced (Tear Deficiency)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Puncta:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Blocked (Impediment)<br>
                                <input type="checkbox"> Malpositioned<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Blocked (Impediment)<br>
                                <input type="checkbox"> Malpositioned<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Nasolacrimal Duct:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Patency (Fluorescein Dye Test):<br>
                                <input type="checkbox"> Patent<br>
                                <input type="checkbox"> Obstruction Suspected<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Patency (Fluorescein Dye Test):<br>
                                <input type="checkbox"> Patent<br>
                                <input type="checkbox"> Obstruction Suspected<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Lacrimal Gland (Palpation/Observation):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Swollen (Dacryoadenitis)<br>
                                <input type="checkbox"> Tenderness<br>
                                <input type="checkbox"> Atrophy<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Swollen (Dacryoadenitis)<br>
                                <input type="checkbox"> Tenderness<br>
                                <input type="checkbox"> Atrophy<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn5_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Periocular Skin and Orbit:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Skin Condition:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Dermatitis<br>
                                <input type="checkbox"> Neoplasms (Lesions)<br>
                                <input type="checkbox"> Xanthelasma<br>
                                <input type="checkbox"> Blepharitis<br>
                                <input type="checkbox"> Herpes Zoster<br>
                                <input type="checkbox"> Ptosis<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Dermatitis<br>
                                <input type="checkbox"> Neoplasms (Lesions)<br>
                                <input type="checkbox"> Xanthelasma<br>
                                <input type="checkbox"> Blepharitis<br>
                                <input type="checkbox"> Herpes Zoster<br>
                                <input type="checkbox"> Ptosis<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn6_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Orbital Region:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Signs of Infection/Inflammation:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Periorbital Edema<br>
                                <input type="checkbox"> Cellulitis<br>
                                <input type="checkbox"> Preseptal Cellulitis<br>
                                <input type="checkbox"> Orbital Cellulitis<br>
                                <input type="checkbox"> Chalazion/Hordeolum (Stye)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Periorbital Edema<br>
                                <input type="checkbox"> Cellulitis<br>
                                <input type="checkbox"> Preseptal Cellulitis<br>
                                <input type="checkbox"> Orbital Cellulitis<br>
                                <input type="checkbox"> Chalazion/Hordeolum (Stye)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Proptosis (Forward Displacement of the Eye)</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Absent<br>
                                <input type="checkbox"> Present<br>
                                Measurement: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Absent<br>
                                <input type="checkbox"> Present<br>
                                Measurement: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn7_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Palpation of the Orbital Rim:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Tenderness:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Present (specify location: superior, inferior, medial, lateral)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Present (specify location: superior, inferior, medial, lateral)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>


                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Masses:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Present (specify location: superior, inferior, medial, lateral)<br>
                                Size: <input type="text" style="width: 100%;"><br>
                                Mobility: <input type="checkbox"> Fixed <input type="checkbox"> Mobile<br>
                                Consistency: <input type="checkbox"> Soft <input type="checkbox"> Firm <input type="checkbox"> Hard<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Present (specify location: superior, inferior, medial, lateral)<br>
                                Size: <input type="text" style="width: 100%;"><br>
                                Mobility: <input type="checkbox"> Fixed <input type="checkbox"> Mobile<br>
                                Consistency: <input type="checkbox"> Soft <input type="checkbox"> Firm <input type="checkbox"> Hard<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn8_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Slit Lamp Microscopy Examination:</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Sclera:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Appearance:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> White and Clear<br>
                                <input type="checkbox"> Yellow (Jaundice)<br>
                                <input type="checkbox"> Episcleritis<br>
                                <input type="checkbox"> Scleritis<br>
                                <input type="checkbox"> Injected/Red<br>
                                <input type="checkbox"> Bluish Tint (common in thin sclera)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> White and Clear<br>
                                <input type="checkbox"> Yellow (Jaundice)<br>
                                <input type="checkbox"> Episcleritis<br>
                                <input type="checkbox"> Scleritis<br>
                                <input type="checkbox"> Injected/Red<br>
                                <input type="checkbox"> Bluish Tint (common in thin sclera)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn9_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Anterior Chamber:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Depth:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Shallow<br>
                                <input type="checkbox"> Deep<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Shallow<br>
                                <input type="checkbox"> Deep<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Contents:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Cells (Indicating Inflammation)<br>
                                <input type="checkbox"> Flare (Protein Leakage)<br>
                                <input type="checkbox"> Hyphema (Blood in Anterior Chamber)<br>
                                <input type="checkbox"> Hypopyon (Pus in Anterior Chamber)<br>
                                <input type="checkbox"> Pigment Dispersion<br>
                                <input type="checkbox"> Fibrin Strands<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Cells (Indicating Inflammation)<br>
                                <input type="checkbox"> Flare (Protein Leakage)<br>
                                <input type="checkbox"> Hyphema (Blood in Anterior Chamber)<br>
                                <input type="checkbox"> Hypopyon (Pus in Anterior Chamber)<br>
                                <input type="checkbox"> Pigment Dispersion<br>
                                <input type="checkbox"> Fibrin Strands<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn10_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Iris:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Shape:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Irregular<br>
                                <input type="checkbox"> Coloboma (Partial Absence of the Iris)<br>
                                <input type="checkbox"> Corectopia (Displacement of Pupil)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Irregular<br>
                                <input type="checkbox"> Coloboma (Partial Absence of the Iris)<br>
                                <input type="checkbox"> Corectopia (Displacement of Pupil)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Color:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Heterochromia (Different Colors Between Eyes or Within the Same Eye)<br>
                                <input type="checkbox"> Iris Atrophy<br>
                                <input type="checkbox"> Pigment Dispersion<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Heterochromia (Different Colors Between Eyes or Within the Same Eye)<br>
                                <input type="checkbox"> Iris Atrophy<br>
                                <input type="checkbox"> Pigment Dispersion<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Surface:</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Smooth<br>
                                <input type="checkbox"> Synechiae (Anterior/Posterior Iris Adhesions)<br>
                                <input type="checkbox"> Neovascularization<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Smooth<br>
                                <input type="checkbox"> Synechiae (Anterior/Posterior Iris Adhesions)<br>
                                <input type="checkbox"> Neovascularization<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn11_table">

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Pupil:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Size:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Right Eye <input type="text" style="width: 50px;"> mm<br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Left Eye <input type="text" style="width: 50px;"> mm<br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Shape:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Round<br>
                                <input type="checkbox"> Irregular<br>
                                <input type="checkbox"> Corectopia (Displacement of Pupil)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Round<br>
                                <input type="checkbox"> Irregular<br>
                                <input type="checkbox"> Corectopia (Displacement of Pupil)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Response to Light:</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Reactive<br>
                                <input type="checkbox"> Non-reactive<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Reactive<br>
                                <input type="checkbox"> Non-reactive<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn12_table">

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Relative Afferent Pupillary Defect (RAPD):</td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Relative Afferent Pupillary Defect (RAPD):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn13_table">

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Lens:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Clarity:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Cataract:<br>
                                <input type="checkbox"> Nuclear (Central opacity)<br>
                                <input type="checkbox"> Cortical (Peripheral or spoke-like opacity)<br>
                                <input type="checkbox"> Posterior Subcapsular (Opacity near the back of the lens)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Cataract:<br>
                                <input type="checkbox"> Nuclear (Central opacity)<br>
                                <input type="checkbox"> Cortical (Peripheral or spoke-like opacity)<br>
                                <input type="checkbox"> Posterior Subcapsular (Opacity near the back of the lens)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Position:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Subluxation/Dislocation (Partial or complete lens dislocation)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Subluxation/Dislocation (Partial or complete lens dislocation)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Intraocular Lens (IOL) (If post-surgery):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Present (Indicates cataract surgery with lens implant)<br>
                                <input type="checkbox"> Absent (No lens implant or natural lens intact)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Present (Indicates cataract surgery with lens implant)<br>
                                <input type="checkbox"> Absent (No lens implant or natural lens intact)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn14_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Tear Film:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Tear Film Assessment</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Tear Break-Up Time (TBUT):<br>
                                <input type="text" style="width: 50px;"> seconds<br>

                                Result Options:<br>
                                <input type="checkbox"> Normal (10+ seconds)<br>
                                <input type="checkbox"> Mild Deficiency (5–10 seconds)<br>
                                <input type="checkbox"> Severe Deficiency (Less than 5 seconds)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Tear Break-Up Time (TBUT):<br>
                                <input type="text" style="width: 50px;"> seconds<br>

                                Result Options:<br>
                                <input type="checkbox"> Normal (10+ seconds)<br>
                                <input type="checkbox"> Mild Deficiency (5–10 seconds)<br>
                                <input type="checkbox"> Severe Deficiency (Less than 5 seconds)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Tear Production (Schirmer’s Test):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Schirmer Test I (Without Anesthesia):<br>
                                <input type="text" style="width: 50px;"> mm (normal: 10-15 mm in 5 minutes)<br>

                                <input type="checkbox"> Normal <input type="checkbox"> Reduced<br>
                                Schirmer Test II (With Anesthesia):<br>
                                <input type="text" style="width: 50px;"> mm (normal: 5-10 mm in 5 minutes)<br>

                                <input type="checkbox"> Normal <input type="checkbox"> Reduced<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Schirmer Test I (Without Anesthesia):<br>
                                <input type="text" style="width: 50px;"> mm (normal: 10-15 mm in 5 minutes)<br>
                                <input type="checkbox"> Normal <input type="checkbox"> Reduced<br>
                                Schirmer Test II (With Anesthesia):<br>
                                <input type="text" style="width: 50px;"> mm (normal: 5-10 mm in 5 minutes)<br>
                                <input type="checkbox"> Normal <input type="checkbox"> Reduced<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Meibomian Glands:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Condition:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Blocked/Dysfunctional<br>
                                <input type="checkbox"> Meibomian Gland Dysfunction (MGD)<br>
                                <input type="checkbox"> Gland Atrophy<br>
                                Signs of Dysfunction:<br>
                                <input type="checkbox"> Thickened or cloudy secretions<br>
                                <input type="checkbox"> Capped glands<br>
                                <input type="checkbox"> Gland dropout<br>
                                <input type="checkbox"> Lid margin telangiectasia (enlarged blood vessels)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Condition:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Blocked/Dysfunctional<br>
                                <input type="checkbox"> Meibomian Gland Dysfunction (MGD)<br>
                                <input type="checkbox"> Gland Atrophy<br>
                                Signs of Dysfunction:<br>
                                <input type="checkbox"> Thickened or cloudy secretions<br>
                                <input type="checkbox"> Capped glands<br>
                                <input type="checkbox"> Gland dropout<br>
                                <input type="checkbox"> Lid margin telangiectasia (enlarged blood vessels)<br>
                                Notes: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Ocular Surface Staining:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Fluorescein Staining:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OS): <input type="checkbox"> None <input type="checkbox"> Mild <input type="checkbox"> Moderate <input type="checkbox"> Severe<br>
                                Pattern: <input type="checkbox"> Diffuse <input type="checkbox"> Inferior <input type="checkbox"> Superior <input type="checkbox"> Central
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OS): <input type="checkbox"> None <input type="checkbox"> Mild <input type="checkbox"> Moderate <input type="checkbox"> Severe<br>
                                Pattern: <input type="checkbox"> Diffuse <input type="checkbox"> Inferior <input type="checkbox"> Superior <input type="checkbox"> Central
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Lissamine Green Staining:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OS): <input type="checkbox"> None <input type="checkbox"> Mild <input type="checkbox"> Moderate <input type="checkbox"> Severe<br>
                                Pattern: <input type="checkbox"> Diffuse <input type="checkbox"> Inferior <input type="checkbox"> Superior <input type="checkbox"> Central
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OS): <input type="checkbox"> None <input type="checkbox"> Mild <input type="checkbox"> Moderate <input type="checkbox"> Severe<br>
                                Pattern: <input type="checkbox"> Diffuse <input type="checkbox"> Inferior <input type="checkbox"> Superior <input type="checkbox"> Central
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Diagnosis and Follow-Up:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Diagnosis:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Dry Eye Disease (DED)<br>
                                <input type="checkbox"> Meibomian Gland Dysfunction (MGD)<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Dry Eye Disease (DED)<br>
                                <input type="checkbox"> Meibomian Gland Dysfunction (MGD)<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Follow-Up Plan:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Routine Monitoring<br>
                                <input type="checkbox"> Initiate/Continue Dry Eye Treatment<br>
                                <input type="checkbox"> Refer for Additional Testing
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Routine Monitoring<br>
                                <input type="checkbox"> Initiate/Continue Dry Eye Treatment<br>
                                <input type="checkbox"> Refer for Additional Testing
                            </td>
                        </tr>
                        
                        <!--  -->
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn15_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Intraocular Pressure (IOP)</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">IOP Measurement Details</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Method Used:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Non-Contact Tonometry (NCT, air-puff test)<br>
                                <input type="checkbox"> Goldmann Applanation Tonometry (Gold standard)<br>
                                <input type="checkbox"> Tonopen (Handheld device)<br>
                                <input type="checkbox"> Perkins Tonometry<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Non-Contact Tonometry (NCT, air-puff test)<br>
                                <input type="checkbox"> Goldmann Applanation Tonometry (Gold standard)<br>
                                <input type="checkbox"> Tonopen (Handheld device)<br>
                                <input type="checkbox"> Perkins Tonometry<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">IOP Readings:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mmHg<br>
                                Time of Day: <input type="text" style="width: 100%;"> (Note: IOP can fluctuate during the day)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mmHg<br>
                                Time of Day: <input type="text" style="width: 100%;"> (Note: IOP can fluctuate during the day)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Target IOP (if known):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Target IOP Range for Glaucoma Management: <input type="text" style="width: 50px;"> mmHg<br>
                                <input type="checkbox"> Not applicable
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Target IOP Range for Glaucoma Management: <input type="text" style="width: 50px;"> mmHg<br>
                                <input type="checkbox"> Not applicable
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Additional Notes:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;"></td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Diurnal IOP fluctuations observed.<br>
                                <input type="checkbox"> IOP Spikes (e.g., during specific times of the day).<br>
                                Corneal Thickness (Pachymetry):<br>
                                OD: <input type="text" style="width: 50px;"> microns<br>
                                OS: <input type="text" style="width: 50px;"> microns<br>
                                Corneal Compensated IOP (if available):<br>
                                OD: <input type="text" style="width: 50px;"> mmHg<br>
                                OS: <input type="text" style="width: 50px;"> mmHg<br>
                                Gonioscopy Findings (if applicable):<br>
                                Angle: <input type="text" style="width: 100%;"> (e.g., open, narrow, closed)<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Diurnal IOP fluctuations observed.<br>
                                <input type="checkbox"> IOP Spikes (e.g., during specific times of the day).<br>
                                Corneal Thickness (Pachymetry):<br>
                                OD: <input type="text" style="width: 50px;"> microns<br>
                                OS: <input type="text" style="width: 50px;"> microns<br>
                                Corneal Compensated IOP (if available):<br>
                                OD: <input type="text" style="width: 50px;"> mmHg<br>
                                OS: <input type="text" style="width: 50px;"> mmHg<br>
                                Gonioscopy Findings (if applicable):<br>
                                Angle: <input type="text" style="width: 100%;"> (e.g., open, narrow, closed)<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Follow-Up Plan</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Next IOP Check:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;"> (Date)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 100%;"> (Date)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Purpose:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Routine Glaucoma Monitoring<br>
                                <input type="checkbox"> Post-Medication Adjustment<br>
                                <input type="checkbox"> Pre-Surgery Evaluation<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Routine Glaucoma Monitoring<br>
                                <input type="checkbox"> Post-Medication Adjustment<br>
                                <input type="checkbox"> Pre-Surgery Evaluation<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <!--  -->

                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fron_btn16_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Gonioscopy (if performed)</td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Angle Status:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Open Angle<br>
                                <input type="checkbox"> Narrow Angle<br>
                                <input type="checkbox"> Angle Closure<br>
                                <input type="checkbox"> Plateau Iris<br>
                                <input type="checkbox"> Peripheral Anterior Synechiae (PAS)<br>
                                Angle Grade: <input type="text" style="width: 50px;"> (e.g., Shaffer Grading 0 to 4)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Open Angle<br>
                                <input type="checkbox"> Narrow Angle<br>
                                <input type="checkbox"> Angle Closure<br>
                                <input type="checkbox"> Plateau Iris<br>
                                <input type="checkbox"> Peripheral Anterior Synechiae (PAS)<br>
                                Angle Grade: <input type="text" style="width: 50px;"> (e.g., Shaffer Grading 0 to 4)
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Anterior Chamber Angle Appearance:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Pigmentation:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Mild<br>
                                <input type="checkbox"> Moderate<br>
                                <input type="checkbox"> Heavy
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Mild<br>
                                <input type="checkbox"> Moderate<br>
                                <input type="checkbox"> Heavy
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Other Findings:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Iris Processes<br>
                                <input type="checkbox"> Neovascularization of the Angle<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Iris Processes<br>
                                <input type="checkbox"> Neovascularization of the Angle<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Notes:</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">
                                <input type="text" class="form-control" style="width: 100%;">
                            </td>
                        </tr>

                        <!--  -->

                    </table>
                </div>
            </div>
  

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#anterior_chamber_exam').toggle()">
                        Anterior Chamber Examination (under Slit Lamp Microscopy)
                    </button>
                </div>
                <div id="anterior_chamber_exam" class="card-body" style="display:none">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;"></th>
                            <th style="border: 1px solid #000; padding: 8px;">Right Eye (OD)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Left Eye (OS)</th>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Anterior Chamber Depth:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Measurement:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mm<br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> mm<br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Notes:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Shallow<br>
                                <input type="checkbox"> Deep<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Shallow<br>
                                <input type="checkbox"> Deep<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Contents of Anterior Chamber:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Observation:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Cells (Intraocular Inflammation):<br>
                                Quantity: <input type="text" style="width: 50px;"> (None/Few/Moderate/Numerous)<br>
                                <input type="checkbox"> Flare (Protein Leakage):<br>
                                Grade: <input type="text" style="width: 50px;"> (None/Mild/Moderate/Severe)<br>
                                <input type="checkbox"> Hyphema (Blood in Anterior Chamber):<br>
                                Quantity: <input type="text" style="width: 50px;"> (Trace/Mild/Moderate/Severe)<br>
                                <input type="checkbox"> Hypopyon (Pus in Anterior Chamber):<br>
                                <input type="text" style="width: 100%;"> Other:<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Cells (Intraocular Inflammation):<br>
                                Quantity: <input type="text" style="width: 50px;"> (None/Few/Moderate/Numerous)<br>
                                <input type="checkbox"> Flare (Protein Leakage):<br>
                                Grade: <input type="text" style="width: 50px;"> (None/Mild/Moderate/Severe)<br>
                                <input type="checkbox"> Hyphema (Blood in Anterior Chamber):<br>
                                Quantity: <input type="text" style="width: 50px;"> (Trace/Mild/Moderate/Severe)<br>
                                <input type="checkbox"> Hypopyon (Pus in Anterior Chamber):<br>
                                <input type="text" style="width: 100%;"> Other:<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Angle Assessment (if performed):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Angle Configuration:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Method Used:<br>
                                <input type="checkbox"> Gonioscopy<br>
                                <input type="checkbox"> Van Herick Method<br>
                                Angle Status:<br>
                                (OD):<br>
                                <input type="checkbox"> Open Angle<br>
                                <input type="checkbox"> Narrow Angle<br>
                                <input type="checkbox"> Closure (Peripheral Anterior Synechiae)<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Method Used:<br>
                                <input type="checkbox"> Gonioscopy<br>
                                <input type="checkbox"> Van Herick Method<br>
                                Angle Status:<br>
                                (OD):<br>
                                <input type="checkbox"> Open Angle<br>
                                <input type="checkbox"> Narrow Angle<br>
                                <input type="checkbox"> Closure (Peripheral Anterior Synechiae)<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Keratic Precipitates (KP):</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">(OD):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Few<br>
                                <input type="checkbox"> Moderate<br>
                                <input type="checkbox"> Numerous<br>
                                Type:<br>
                                <input type="checkbox"> Granular<br>
                                <input type="checkbox"> Mutton Fat<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> None<br>
                                <input type="checkbox"> Few<br>
                                <input type="checkbox"> Moderate<br>
                                <input type="checkbox"> Numerous<br>
                                Type:<br>
                                <input type="checkbox"> Granular<br>
                                <input type="checkbox"> Mutton Fat<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Anterior Chamber Reaction:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Ciliary Flush:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent<br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent<br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Iritis:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent<br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent<br>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Other Findings:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Presence of Foreign Bodies:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Yes (Describe): <input type="text" style="width: 100%;"> <br>
                                <input type="checkbox"> No<br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Yes (Describe): <input type="text" style="width: 100%;"> <br>
                                <input type="checkbox"> No<br>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Additional Examinations:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Fluorescein Staining:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Performed<br>
                                Results: <input type="text" style="width: 100%;"><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Performed<br>
                                Results: <input type="text" style="width: 100%;"><br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Specular Microscopy (if performed):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                Results: <input type="text" style="width: 100%;"><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                Results: <input type="text" style="width: 100%;"><br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Optical Coherence Tomography (OCT) (if performed):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                Results: <input type="text" style="width: 100%;"><br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                Results: <input type="text" style="width: 100%;"><br>
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
                    <button type="button" class="btn btn-link" onclick="$('#posterior_adnexa').toggle()">
                    Posterior Adnexa Examination Form
                    </button>
                </div>
                <div id="posterior_adnexa" class="card-body" style="display:none">
                    <span class="btn btn-xs btn-success" onclick="toggleBtnSection('pos_btn1', 'pos_btn2', 'pos_btn3', 'pos_btn4', 'pos_btn5',)" id="pos_btn1">Vitreous Examination</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('pos_btn2', 'pos_btn1', 'pos_btn3', 'pos_btn4', 'pos_btn5',)" id="pos_btn2">Retina Examination</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('pos_btn3', 'pos_btn2', 'pos_btn1', 'pos_btn4', 'pos_btn5',)" id="pos_btn3">Choroid Examination</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('pos_btn4', 'pos_btn2', 'pos_btn3', 'pos_btn1', 'pos_btn5',)" id="pos_btn4">Additional Tests</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('pos_btn5', 'pos_btn2', 'pos_btn3', 'pos_btn4', 'pos_btn1',)" id="pos_btn5">Summary and Recommendations</span>
                    <!-- ddd -->
                    <table style="width: 100%; border-collapse: collapse;" id="pos_btn1_table">
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;"></th>
                            <th style="border: 1px solid #000; padding: 8px;">Right Eye (OD)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Left Eye (OS)</th>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Vitreous Examination</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Vitreous Clarity:</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Hazy<br>
                                <input type="checkbox"> Opacities:<br>
                                <input type="checkbox"> Floaters<br>
                                <input type="checkbox"> Haemorrhage<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Clear<br>
                                <input type="checkbox"> Hazy<br>
                                <input type="checkbox"> Opacities:<br>
                                <input type="checkbox"> Floaters<br>
                                <input type="checkbox"> Haemorrhage<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Vitreous Attachment:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Assessment:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OD):<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Posterior Vitreous Detachment (PVD)<br>
                                <input type="checkbox"> Traction<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                (OS):<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Posterior Vitreous Detachment (PVD)<br>
                                <input type="checkbox"> Traction<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>


                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Optic Disc (Optic Nerve Head):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <span style="font-weight: bold">Cup-to-Disc Ratio (CDR):</span><br>
                                <input type="checkbox"> 0.1 - 0.3 (Normal)<br>
                                <input type="checkbox"> 0.4 - 0.6 (Suspicious for Glaucoma)<br>
                                <input type="checkbox"> >0.6 (Possible Glaucoma)<br>
                                <span style="font-weight: bold">Disc Margins:</span><br>
                                <input type="checkbox"> Sharp<br>
                                <input type="checkbox"> Blurred (Papilledema or Optic Neuritis)<br>
                                <span style="font-weight: bold">Disc Colour:</span><br>
                                <input type="checkbox"> Normal (Pink/Orange)<br>
                                <input type="checkbox"> Pale (Optic Atrophy)<br>
                                <input type="checkbox"> Hyperemic (Swollen Disc)<br>
                                <span style="font-weight: bold">Other Findings:</span><br>
                                <input type="checkbox"> Peripapillary Atrophy<br>
                                <input type="checkbox"> Optic Nerve Drusen<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <span style="font-weight: bold">Cup-to-Disc Ratio (CDR):</span><br>
                                <input type="checkbox"> 0.1 - 0.3 (Normal)<br>
                                <input type="checkbox"> 0.4 - 0.6 (Suspicious for Glaucoma)<br>
                                <input type="checkbox"> >0.6 (Possible Glaucoma)<br>
                                <span style="font-weight: bold">Disc Margins:</span><br>
                                <input type="checkbox"> Sharp<br>
                                <input type="checkbox"> Blurred (Papilledema or Optic Neuritis)<br>
                                <span style="font-weight: bold">Disc Colour:</span><br>
                                <input type="checkbox"> Normal (Pink/Orange)<br>
                                <input type="checkbox"> Pale (Optic Atrophy)<br>
                                <input type="checkbox"> Hyperemic (Swollen Disc)<br>
                                <span style="font-weight: bold">Other Findings:</span><br>
                                <input type="checkbox"> Peripapillary Atrophy<br>
                                <input type="checkbox"> Optic Nerve Drusen<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="pos_btn2_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Retina Examination</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Retina Assessment:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Overall Appearance:</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Edema<br>
                                <input type="checkbox"> Retinal Haemorrhage<br>
                                <input type="checkbox"> Exudates (Cotton Wool Spots, Hard Exudates)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Edema<br>
                                <input type="checkbox"> Retinal Haemorrhage<br>
                                <input type="checkbox"> Exudates (Cotton Wool Spots, Hard Exudates)<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Macular Assessment:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <span style="font-weight: bold">Foveal Reflex:</span><br>
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent<br>
                                <span style="font-weight: bold">Pigment Changes:</span><br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Hyperpigmentation<br>
                                <input type="checkbox"> Hypopigmentation<br>
                                <span style="font-weight: bold">Macular Abnormalities:</span><br>
                                <input type="checkbox"> Macular Edema<br>
                                <input type="checkbox"> Drusen (Signs of Age-related Macular Degeneration)<br>
                                <input type="checkbox"> Epiretinal Membrane<br>
                                <input type="checkbox"> Macular Hole<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <span style="font-weight: bold">Foveal Reflex:</span><br>
                                <input type="checkbox"> Present<br>
                                <input type="checkbox"> Absent<br>
                                <span style="font-weight: bold">Pigment Changes:</span><br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Hyperpigmentation<br>
                                <input type="checkbox"> Hypopigmentation<br>
                                <span style="font-weight: bold">Macular Abnormalities:</span><br>
                                <input type="checkbox"> Macular Edema<br>
                                <input type="checkbox"> Drusen (Signs of Age-related Macular Degeneration)<br>
                                <input type="checkbox"> Epiretinal Membrane<br>
                                <input type="checkbox"> Macular Hole<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Peripheral Retina Assessment:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Peripheral Retina Assessment:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Peripheral Findings:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Retinal Tears<br>
                                <input type="checkbox"> Retinal Detachment<br>
                                <input type="checkbox"> Lattice Degeneration<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Peripheral Findings:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Retinal Tears<br>
                                <input type="checkbox"> Retinal Detachment<br>
                                <input type="checkbox"> Lattice Degeneration<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Retinal Background:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Retinal Haemorrhages<br>
                                <input type="checkbox"> Cotton-Wool Spots<br>
                                <input type="checkbox"> Retinal Exudates (Hard Exudates)<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Retinal Haemorrhages<br>
                                <input type="checkbox"> Cotton-Wool Spots<br>
                                <input type="checkbox"> Retinal Exudates (Hard Exudates)<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Vessels</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Arteriovenous (AV) Ratio:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal (2:3)<br>
                                <input type="checkbox"> Narrowed Arteries (Hypertensive Retinopathy)<br>
                                <input type="checkbox"> Tortuous Vessels<br>
                                <input type="checkbox"> Venous Beading (Diabetic Retinopathy)<br>
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal (2:3)<br>
                                <input type="checkbox"> Narrowed Arteries (Hypertensive Retinopathy)<br>
                                <input type="checkbox"> Tortuous Vessels<br>
                                <input type="checkbox"> Venous Beading (Diabetic Retinopathy)<br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Abnormalities:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> AV Nicking<br>
                                <input type="checkbox"> Retinal Neovascularization<br>
                                <input type="checkbox"> Retinal Venous Occlusion<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> AV Nicking<br>
                                <input type="checkbox"> Retinal Neovascularization<br>
                                <input type="checkbox"> Retinal Venous Occlusion<br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Impression / Diagnosis:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal Posterior Segment<br>
                                <input type="checkbox"> Diabetic Retinopathy<br>
                                <input type="checkbox"> Hypertensive Retinopathy<br>
                                <input type="checkbox"> Glaucoma Suspicion (High CDR)<br>
                                <input type="checkbox"> Macular Degeneration<br>
                                Other Diagnosis: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal Posterior Segment<br>
                                <input type="checkbox"> Diabetic Retinopathy<br>
                                <input type="checkbox"> Hypertensive Retinopathy<br>
                                <input type="checkbox"> Glaucoma Suspicion (High CDR)<br>
                                <input type="checkbox"> Macular Degeneration<br>
                                Other Diagnosis: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Plan / Management:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Follow-up in __ months<br>
                                <input type="checkbox"> Referral to Retina Specialist<br>
                                <input type="checkbox"> OCT for Macular Evaluation<br>
                                <input type="checkbox"> Fundus Photography<br>
                                <input type="checkbox"> Fluorescein Angiography (FA)<br>
                                Other Treatment Recommendations: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Follow-up in __ months<br>
                                <input type="checkbox"> Referral to Retina Specialist<br>
                                <input type="checkbox"> OCT for Macular Evaluation<br>
                                <input type="checkbox"> Fundus Photography<br>
                                <input type="checkbox"> Fluorescein Angiography (FA)<br>
                                Other Treatment Recommendations: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="pos_btn3_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">3. Choroid Examination</td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Choroidal Assessment:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Findings:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Choroidal Neovascularization (CNV)<br>
                                <input type="checkbox"> Choroidal Melanoma<br>
                                <input type="checkbox"> Choroidal Atrophy<br>
                                <input type="checkbox"> Choroidal Haemorrhage<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Findings:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Choroidal Neovascularization (CNV)<br>
                                <input type="checkbox"> Choroidal Melanoma<br>
                                <input type="checkbox"> Choroidal Atrophy<br>
                                <input type="checkbox"> Choroidal Haemorrhage<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="pos_btn4_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Additional Tests
                                <textarea name="" class="form-control" style="width: 100%" id=""></textarea>
                            </td>
                            
                        </tr>
                    
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Fundus Examination:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Method Used:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Direct Ophthalmoscopy<br>
                                <input type="checkbox"> Indirect Ophthalmoscopy<br>
                                <input type="checkbox"> Fundus Photography<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Direct Ophthalmoscopy<br>
                                <input type="checkbox"> Indirect Ophthalmoscopy<br>
                                <input type="checkbox"> Fundus Photography<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Comments: <input type="text" style="width: 100%;"></td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Optical Coherence Tomography (OCT):</td>
                            <td style="border: 1px solid #000; padding: 10px;">Results: <input type="text" style="width: 100%;"></td>
                            <td style="border: 1px solid #000; padding: 10px;">Results: <input type="text" style="width: 100%;"></td>
                        </tr>
                        
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Retinal Imaging (if performed):</td>
                            <td style="border: 1px solid #000; padding: 10px;">Results: <input type="text" style="width: 100%;"></td>
                            <td style="border: 1px solid #000; padding: 10px;">Results: <input type="text" style="width: 100%;"></td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="pos_btn5_table">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Summary and Recommendations:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Diagnosis:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Vitreous Pathology<br>
                                <input type="checkbox"> Retinal Pathology<br>
                                <input type="checkbox"> Choroidal Pathology<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Diagnosis:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Vitreous Pathology<br>
                                <input type="checkbox"> Retinal Pathology<br>
                                <input type="checkbox"> Choroidal Pathology<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Recommendations:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Further Evaluation<br>
                                <input type="checkbox"> Treatment (Specify): <input type="text" style="width: 100%;"><br>
                                <input type="checkbox"> Follow-Up Appointment: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Further Evaluation<br>
                                <input type="checkbox"> Treatment (Specify): <input type="text" style="width: 100%;"><br>
                                <input type="checkbox"> Follow-Up Appointment: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Notes: <input type="text" style="width: 100%;"></td>
                        </tr>
                    </table>
                    <!-- ddd -->
                </div>
            </div>


            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#fundus_examination').toggle()">
                        Fundus Examination
                    </button>
                </div>
                <div id="fundus_examination" class="card-body" style="display:none">
                    <span class="btn btn-xs btn-success" onclick="toggleBtnSection('fun_btn1', 'fun_btn2', 'fun_btn3', 'fun_btn4', 'fun_btn5', 'fun_btn6',)" id="fun_btn1">Method of Examination</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fun_btn2', 'fun_btn1', 'fun_btn3', 'fun_btn4', 'fun_btn5', 'fun_btn6', 'fun_btn7')" id="fun_btn2">Optic Nerve Head Assessment</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fun_btn3', 'fun_btn2', 'fun_btn1', 'fun_btn4', 'fun_btn5', 'fun_btn6', 'fun_btn7')" id="fun_btn3">Vascular Assessment</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fun_btn4', 'fun_btn2', 'fun_btn3', 'fun_btn1', 'fun_btn5', 'fun_btn6', 'fun_btn7')" id="fun_btn4">Macular Assessment</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fun_btn5', 'fun_btn2', 'fun_btn3', 'fun_btn4', 'fun_btn1', 'fun_btn6', 'fun_btn7')" id="fun_btn5">Peripheral Retina Assessment</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fun_btn6', 'fun_btn2', 'fun_btn3', 'fun_btn4', 'fun_btn5', 'fun_btn1', 'fun_btn7')" id="fun_btn6">Additional Tests (if performed)</span>
                    <span class="btn btn-xs" onclick="toggleBtnSection('fun_btn7', 'fun_btn2', 'fun_btn3', 'fun_btn4', 'fun_btn5', 'fun_btn6', 'fun_btn1')" id="fun_btn7">Summary and Recommendations:</span>
                    <!--  -->
                    <table style="width: 100%; border-collapse: collapse;" id="fun_btn1_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 8px;">
                                This Fundus Examination Form is designed to provide a thorough documentation of 
                                the findings from a fundoscopic examination, covering all critical aspects of 
                                the posterior segment of the eye which includes more detailed options for assessing 
                                the Cup-to-Disc Ratio (CDR) and the Optic Disc specifically.
                            </td>
                        </tr>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;"></th>
                            <th style="border: 1px solid #000; padding: 8px;">Right Eye (OD)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Left Eye (OS)</th>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">1. Method of Examination:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Type of Fundoscopy:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Direct Ophthalmoscopy<br>
                                <input type="checkbox"> Indirect Ophthalmoscopy<br>
                                <input type="checkbox"> Fundus Photography<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Direct Ophthalmoscopy<br>
                                <input type="checkbox"> Indirect Ophthalmoscopy<br>
                                <input type="checkbox"> Fundus Photography<br>
                                Other: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Fundus Appearance:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Overall Appearance:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Abnormal<br>
                                Specific Findings:<br>
                                <input type="checkbox"> Retinal Detachment<br>
                                Haemorrhage:<br>
                                <input type="checkbox"> Pre-retinal<br>
                                <input type="checkbox"> Intraretinal<br>
                                <input type="checkbox"> Subretinal<br>
                                <input type="checkbox"> Edema<br>
                                Exudates:<br>
                                <input type="checkbox"> Hard Exudates<br>
                                <input type="checkbox"> Soft Exudates<br>
                                <input type="checkbox"> Drusen<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Overall Appearance:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Abnormal<br>
                                Specific Findings:<br>
                                <input type="checkbox"> Retinal Detachment<br>
                                Haemorrhage:<br>
                                <input type="checkbox"> Pre-retinal<br>
                                <input type="checkbox"> Intraretinal<br>
                                <input type="checkbox"> Subretinal<br>
                                <input type="checkbox"> Edema<br>
                                Exudates:<br>
                                <input type="checkbox"> Hard Exudates<br>
                                <input type="checkbox"> Soft Exudates<br>
                                <input type="checkbox"> Drusen<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fun_btn2_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Optic Nerve Head Assessment</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Optic Disc Appearance:</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                Disc Colour:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Pale<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Findings:<br>
                                <input type="checkbox"> Edema (Papilledema)<br>
                                <input type="checkbox"> Cupping<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                <span style="font-weight: bold">Cup-to-Disc Ratio (CDR):</span><br>
                                Vertical CDR: <input type="text" style="width: 50px;"> / <input type="text" style="width: 50px;"><br>
                                Horizontal CDR: <input type="text" style="width: 50px;"> / <input type="text" style="width: 50px;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <span style="font-weight: bold">Disc Col</span>our:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Pale<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                <span style="font-weight: bold">Findings:<b</span>r>
                                <input type="checkbox"> Edema (Papilledema)<br>
                                <input type="checkbox"> Cupping<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                <span style="font-weight: bold">Cup-to-Disc Ratio (CDR):</span><br>
                                Vertical CDR: <input type="text" style="width: 50px;"> / <input type="text" style="width: 50px;"><br>
                                Horizontal CDR: <input type="text" style="width: 50px;"> / <input type="text" style="width: 50px;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fun_btn3_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Vascular Assessment</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Retinal Vessels:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Vessel Appearance:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Narrowing<br>
                                <input type="checkbox"> Atherosclerosis<br>
                                <input type="checkbox"> Neovascularization<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Vessel Appearance:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Narrowing<br>
                                <input type="checkbox"> Atherosclerosis<br>
                                <input type="checkbox"> Neovascularization<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fun_btn4_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Macular Assessment</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Macular Appearance:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Drusen<br>
                                <input type="checkbox"> Macular Edema<br>
                                <input type="checkbox"> Macular Hole<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Drusen<br>
                                <input type="checkbox"> Macular Edema<br>
                                <input type="checkbox"> Macular Hole<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fun_btn5_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Peripheral Retina Assessment</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Peripheral Findings:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Observation:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Tears<br>
                                <input type="checkbox"> Lattice Degeneration<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Observation:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Tears<br>
                                <input type="checkbox"> Lattice Degeneration<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fun_btn6_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Additional Tests (if performed)</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Optical Coherence Tomography (OCT):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Results: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Results: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Fundus Photography (if performed):</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Results: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Results: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="fun_btn7_table">
                        <tr>
                            <td colspan="3"  style="border: 1px solid #000; padding: 10px; font-weight: bold;">Summary and Recommendations:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;"></td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Diagnosis:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Vitreous Pathology<br>
                                <input type="checkbox"> Retinal Pathology<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Recommendations:<br>
                                <input type="checkbox"> Further Evaluation<br>
                                <input type="checkbox"> Treatment (Specify): <input type="text" style="width: 100%;"><br>
                                <input type="checkbox"> Follow-Up Appointment: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Diagnosis:<br>
                                <input type="checkbox"> Normal<br>
                                <input type="checkbox"> Vitreous Pathology<br>
                                <input type="checkbox"> Retinal Pathology<br>
                                Other: <input type="text" style="width: 100%;"><br>
                                Recommendations:<br>
                                <input type="checkbox"> Further Evaluation<br>
                                <input type="checkbox"> Treatment (Specify): <input type="text" style="width: 100%;"><br>
                                <input type="checkbox"> Follow-Up Appointment: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">Notes: <input type="text" style="width: 100%;"></td>
                        </tr>

                    </table>
                    <!--  -->
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#optical_coherence').toggle()">
                        Optical Coherence Tomography (OCT)
                    </button>
                </div>
                <div id="optical_coherence" class="card-body" style="display:none">
                <span class="btn btn-xs btn-success" onclick="toggleBtnSection('opt_btn1', 'opt_btn2',)" id="opt_btn1">Section 1</span>
                <span class="btn btn-xs" onclick="toggleBtnSection('opt_btn2', 'opt_btn1',)" id="opt_btn2">Section 2</span>
                    <table style="width: 100%; border-collapse: collapse;" id="opt_btn1_table">
                        <tr>
                            <th colspan="3" style="border: 1px solid #000; padding: 8px;">
                                Provides cross-sectional images of the retina, particularly useful for diagnosing macular diseases and glaucoma
                            </th>

                        </tr>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;"></th>
                            <th style="border: 1px solid #000; padding: 8px;">Right Eye (OD)</th>
                            <th style="border: 1px solid #000; padding: 8px;">Left Eye (OS)</th>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Optical Coherence Tomography (OCT)</td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Normal Findings</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal Retinal Structure<br>
                                <input type="checkbox"> Normal Macular Thickness<br>
                                <input type="checkbox"> Normal Choroidal Thickness
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Normal Retinal Structure<br>
                                <input type="checkbox"> Normal Macular Thickness<br>
                                <input type="checkbox"> Normal Choroidal Thickness
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Retinal Findings</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Presence of Drusen<br>
                                <input type="checkbox"> Hard Drusen<br>
                                <input type="checkbox"> Soft Drusen<br>
                                <input type="checkbox"> Macular Edema<br>
                                <input type="checkbox"> Cystoid Macular Edema<br>
                                <input type="checkbox"> Diffuse Macular Edema<br>
                                <input type="checkbox"> Retinal Pigment Epithelium (RPE) Changes<br>
                                <input type="checkbox"> RPE Atrophy<br>
                                <input type="checkbox"> RPE Hyperplasia<br>
                                <input type="checkbox"> Retinal Detachment<br>
                                <input type="checkbox"> Retinal Tear
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Presence of Drusen<br>
                                <input type="checkbox"> Hard Drusen<br>
                                <input type="checkbox"> Soft Drusen<br>
                                <input type="checkbox"> Macular Edema<br>
                                <input type="checkbox"> Cystoid Macular Edema<br>
                                <input type="checkbox"> Diffuse Macular Edema<br>
                                <input type="checkbox"> Retinal Pigment Epithelium (RPE) Changes<br>
                                <input type="checkbox"> RPE Atrophy<br>
                                <input type="checkbox"> RPE Hyperplasia<br>
                                <input type="checkbox"> Retinal Detachment<br>
                                <input type="checkbox"> Retinal Tear
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Retinal Thickness</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                Central Foveal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Temporal Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Nasal Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Superior Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Inferior Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Results: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                Central Foveal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Temporal Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Nasal Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Superior Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Inferior Retina Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Results: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Choroidal Findings</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Choroidal Neovascularization (CNV)<br>
                                <input type="checkbox"> Type 1 CNV<br>
                                <input type="checkbox"> Type 2 CNV<br>
                                <input type="checkbox"> Choroidal Melanoma<br>
                                <input type="checkbox"> Choroidal Thickness Abnormalities<br>
                                <input type="checkbox"> Increased Thickness<br>
                                <input type="checkbox"> Decreased Thickness
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Choroidal Neovascularization (CNV)<br>
                                <input type="checkbox"> Type 1 CNV<br>
                                <input type="checkbox"> Type 2 CNV<br>
                                <input type="checkbox"> Choroidal Melanoma<br>
                                <input type="checkbox"> Choroidal Thickness Abnormalities<br>
                                <input type="checkbox"> Increased Thickness<br>
                                <input type="checkbox"> Decreased Thickness
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Choroidal Thickness Measurements</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                Subfoveal Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Temporal Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Nasal Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Superior Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Inferior Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Results: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Subfoveal Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Temporal Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Nasal Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Superior Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Inferior Choroidal Thickness: <input type="text" style="width: 50px;"> microns<br>
                                Results: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
                            </td>
                        </tr>

                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Other Findings</td>

                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Vitreous Changes<br>
                                <input type="checkbox"> Vitreomacular Traction<br>
                                <input type="checkbox"> Posterior Vitreous Detachment (PVD)<br>
                                <input type="checkbox"> Presence of Exudates<br>
                                Other Pathologies: <input type="text" style="width: 100%;">
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Vitreous Changes<br>
                                <input type="checkbox"> Vitreomacular Traction<br>
                                <input type="checkbox"> Posterior Vitreous Detachment (PVD)<br>
                                <input type="checkbox"> Presence of Exudates<br>
                                Other Pathologies: <input type="text" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; display:none" id="opt_btn2_table">
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Additional Conditions and Specifics for OCT</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Macular Conditions</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Macular Hole<br>
                                <input type="checkbox"> Full Thickness Macular Hole<br>
                                <input type="checkbox"> Lamellar Macular Hole<br>
                                <input type="checkbox"> Macular Pucker (Epiretinal Membrane)<br>
                                <input type="checkbox"> Serous Retinal Detachment
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Macular Hole<br>
                                <input type="checkbox"> Full Thickness Macular Hole<br>
                                <input type="checkbox"> Lamellar Macular Hole<br>
                                <input type="checkbox"> Macular Pucker (Epiretinal Membrane)<br>
                                <input type="checkbox"> Serous Retinal Detachment
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Diabetic Retinopathy</td>
    
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Non-Proliferative Diabetic Retinopathy (NPDR)<br>
                                <input type="checkbox"> Mild NPDR<br>
                                <input type="checkbox"> Moderate NPDR<br>
                                <input type="checkbox"> Severe NPDR<br>
                                <input type="checkbox"> Proliferative Diabetic Retinopathy (PDR)<br>
                                <input type="checkbox"> Neovascularization<br>
                                <input type="checkbox"> Vitreous Haemorrhage
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Non-Proliferative Diabetic Retinopathy (NPDR)<br>
                                <input type="checkbox"> Mild NPDR<br>
                                <input type="checkbox"> Moderate NPDR<br>
                                <input type="checkbox"> Severe NPDR<br>
                                <input type="checkbox"> Proliferative Diabetic Retinopathy (PDR)<br>
                                <input type="checkbox"> Neovascularization<br>
                                <input type="checkbox"> Vitreous Haemorrhage
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Glaucoma-related Findings</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Optic Nerve Head Changes<br>
                                <input type="checkbox"> Cup-to-Disk Ratio Changes<br>
                                <input type="checkbox"> Rim Thinning<br>
                                <input type="checkbox"> Retinal Nerve Fiber Layer (RNFL) Thinning<br>
                                <input type="checkbox"> Glaucomatous Damage
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="checkbox"> Optic Nerve Head Changes<br>
                                <input type="checkbox"> Cup-to-Disk Ratio Changes<br>
                                <input type="checkbox"> Rim Thinning<br>
                                <input type="checkbox"> Retinal Nerve Fiber Layer (RNFL) Thinning<br>
                                <input type="checkbox"> Glaucomatous Damage
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Age-related Macular Degeneration (AMD)</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Dry AMD<br>
                                <input type="checkbox"> Geographic Atrophy<br>
                                <input type="checkbox"> Wet AMD<br>
                                <input type="checkbox"> Active CNV<br>
                                <input type="checkbox"> Inactive CNV
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Dry AMD<br>
                                <input type="checkbox"> Geographic Atrophy<br>
                                <input type="checkbox"> Wet AMD<br>
                                <input type="checkbox"> Active CNV<br>
                                <input type="checkbox"> Inactive CNV
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Inflammatory Conditions</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Uveitis<br>
                                <input type="checkbox"> Anterior Uveitis<br>
                                <input type="checkbox"> Intermediate Uveitis<br>
                                <input type="checkbox"> Posterior Uveitis<br>
                                <input type="checkbox"> Sarcoidosis<br>
                                <input type="checkbox"> Behçet's Disease
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Uveitis<br>
                                <input type="checkbox"> Anterior Uveitis<br>
                                <input type="checkbox"> Intermediate Uveitis<br>
                                <input type="checkbox"> Posterior Uveitis<br>
                                <input type="checkbox"> Sarcoidosis<br>
                                <input type="checkbox"> Behçet's Disease
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Retinal Vascular Conditions</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Central Retinal Vein Occlusion (CRVO)<br>
                                <input type="checkbox"> Branch Retinal Vein Occlusion (BRVO)<br>
                                <input type="checkbox"> Central Retinal Artery Occlusion (CRAO)
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Central Retinal Vein Occlusion (CRVO)<br>
                                <input type="checkbox"> Branch Retinal Vein Occlusion (BRVO)<br>
                                <input type="checkbox"> Central Retinal Artery Occlusion (CRAO)
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">Miscellaneous Findings</td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Hyperreflective Foci<br>
                                <input type="checkbox"> Changes in Retinal Thickness<br>
                                <input type="checkbox"> Increased Thickness<br>
                                <input type="checkbox"> Decreased Thickness<br>
                                <input type="checkbox"> Presence of Retinal Hemorrhages<br>
                                <input type="checkbox"> Flame Hemorrhages<br>
                                <input type="checkbox"> Dot-and-Blot Hemorrhages
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">

                                <input type="checkbox"> Hyperreflective Foci<br>
                                <input type="checkbox"> Changes in Retinal Thickness<br>
                                <input type="checkbox"> Increased Thickness<br>
                                <input type="checkbox"> Decreased Thickness<br>
                                <input type="checkbox"> Presence of Retinal Hemorrhages<br>
                                <input type="checkbox"> Flame Hemorrhages<br>
                                <input type="checkbox"> Dot-and-Blot Hemorrhages
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px; font-weight: bold;">Choroidal Thickness Measurements:</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Subfoveal Choroidal Thickness:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Temporal Choroidal Thickness:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Nasal Choroidal Thickness:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Superior Choroidal Thickness:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">Inferior Choroidal Thickness:</td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                            <td style="border: 1px solid #000; padding: 10px;">
                                <input type="text" style="width: 50px;"> microns
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="border: 1px solid #000; padding: 10px;">
                                Results: <input type="text" style="width: 100%;"><br>
                                Comments: <input type="text" style="width: 100%;">
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

export default function ElementElementPatientvisitOccularHealthAssessment() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
