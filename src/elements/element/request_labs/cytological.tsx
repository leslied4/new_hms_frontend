const rawHtml = `
<style scoped>
    #cytological_template .container {
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    #cytological_template .section {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    #cytological_template .section-title {
        background-color: #f0f0f0;
        padding: 10px;
        margin: -15px -15px 15px -15px;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    #cytological_template .form-group {
        margin-bottom: 15px;
    }
    #cytological_template label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    #cytological_template input[type="text"],
    #cytological_template input[type="date"],
    #cytological_template select,
    #cytological_template textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #cytological_template textarea {
        height: 100px;
        resize: vertical;
    }
    #cytological_template .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    #cytological_template .checkbox-item {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    #cytological_template button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    #cytological_template button:hover {
        background-color: #45a049;
    }
    #cytological_template .auto-fill {
        background-color: #f8f8f8;
        color: #666;
    }
</style>

<div id="cytological_template">
    <div class="container">
        <h1>Cytology Laboratory Report</h1>
        <form id="cytologyForm">

            <!-- Specimen Information Section -->
            <div class="section">
                <div class="section-title">Specimen Information</div>
                <div class="form-group">
                    <label for="accessionNumber">Accession Number:</label>
                    <input type="text" id="accessionNumber" class="auto-fill" readonly>
                </div>
                <div class="form-group">
                    <label for="collectionDate">Specimen Collection Date:</label>
                    <input type="date" id="collectionDate">
                </div>
                <div class="form-group">
                    <label for="reportDate">Report Date:</label>
                    <input type="date" id="reportDate" class="auto-fill" readonly>
                </div>
                <div class="form-group">
                    <label for="specimenType">Specimen Type:</label>
                    <SearchableSelectField id="specimenType">
                        <option value="">Select Type</option>
                        <option value="papSmear">Pap Smear</option>
                        <option value="fna">Fine Needle Aspiration</option>
                        <option value="bodyFluid">Body Fluid</option>
                        <option value="brushing">Brushing</option>
                        <option value="washing">Washing</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="collectionSite">Site of Collection:</label>
                    <SearchableSelectField id="collectionSite">
                        <option value="">Select Site</option>
                        <option value="cervix">Cervix</option>
                        <option value="thyroid">Thyroid</option>
                        <option value="lung">Lung</option>
                        <option value="breast">Breast</option>
                        <option value="pleuralFluid">Pleural Fluid</option>
                        <option value="peritonealFluid">Peritoneal Fluid</option>
                        <option value="csf">CSF</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="procedure">Procedure:</label>
                    <SearchableSelectField id="procedure">
                        <option value="">Select Procedure</option>
                        <option value="conventionalSmear">Conventional Smear</option>
                        <option value="thinPrep">ThinPrep</option>
                        <option value="surePath">SurePath</option>
                        <option value="directFNA">Direct FNA</option>
                        <option value="usGuidedFNA">Ultrasound-guided FNA</option>
                        <option value="ctGuidedFNA">CT-guided FNA</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="clinicalIndication">Clinical Indication:</label>
                    <textarea id="clinicalIndication"></textarea>
                </div>
                <div class="form-group">
                    <label for="collectedBy">Collected By:</label>
                    <input type="text" id="collectedBy" class="auto-fill" readonly>
                </div>
                <div class="form-group">
                    <label for="fixative">Fixative Used:</label>
                    <SearchableSelectField id="fixative">
                        <option value="">Select Fixative</option>
                        <option value="liquidBased">Liquid-Based Cytology</option>
                        <option value="airDried">Air-Dried</option>
                        <option value="alcoholFixed">Alcohol-Fixed</option>
                        <option value="cytoLyt">CytoLyt</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="previousResults">Previous Cytology Results:</label>
                    <textarea id="previousResults"></textarea>
                </div>
            </div>

            <!-- Specimen Processing Section -->
            <div class="section">
                <div class="section-title">Specimen Processing</div>
                <div class="form-group">
                    <label for="preparationTechnique">Preparation Technique:</label>
                    <SearchableSelectField id="preparationTechnique">
                        <option value="">Select Technique</option>
                        <option value="directSmear">Direct Smear</option>
                        <option value="liquidBased">Liquid-Based</option>
                        <option value="cellBlock">Cell Block</option>
                        <option value="cytospin">Cytospin</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="stainingMethod">Staining Method:</label>
                    <SearchableSelectField id="stainingMethod">
                        <option value="">Select Method</option>
                        <option value="papanicolaou">Papanicolaou</option>
                        <option value="diffQuik">Diff-Quik</option>
                        <option value="he">H&E</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="specialProcessing">Special Processing:</label>
                    <SearchableSelectField id="specialProcessing">
                        <option value="">Select Processing</option>
                        <option value="none">None</option>
                        <option value="filtration">Filtration</option>
                        <option value="centrifugation">Centrifugation</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="cellBlock">Cell Block Preparation:</label>
                    <SearchableSelectField id="cellBlock">
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="rose">Rapid On-Site Evaluation (ROSE):</label>
                    <SearchableSelectField id="rose">
                        <option value="">Select</option>
                        <option value="performed">Performed</option>
                        <option value="notPerformed">Not Performed</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="roseResults">ROSE Results (If Applicable):</label>
                    <textarea id="roseResults"></textarea>
                </div>
            </div>

            <!-- Microscopic Examination Section -->
            <div class="section">
                <div class="section-title">Microscopic Examination</div>
                <div class="form-group">
                    <label for="adequacy">Specimen Adequacy:</label>
                    <SearchableSelectField id="adequacy">
                        <option value="">Select</option>
                        <option value="satisfactory">Satisfactory</option>
                        <option value="unsatisfactory">Unsatisfactory</option>
                        <option value="limited">Limited by (specify)</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="cellularity">Cellularity:</label>
                    <SearchableSelectField id="cellularity">
                        <option value="">Select</option>
                        <option value="abundant">Abundant</option>
                        <option value="moderate">Moderate</option>
                        <option value="scant">Scant</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="background">Background:</label>
                    <SearchableSelectField id="background">
                        <option value="">Select</option>
                        <option value="clean">Clean</option>
                        <option value="inflammatory">Inflammatory</option>
                        <option value="necrotic">Necrotic</option>
                        <option value="bloody">Bloody</option>
                        <option value="mucoid">Mucoid</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="cellMorphology">Cell Morphology:</label>
                    <SearchableSelectField id="cellMorphology">
                        <option value="">Select</option>
                        <option value="benign">Benign</option>
                        <option value="reactive">Reactive</option>
                        <option value="atypical">Atypical</option>
                        <option value="suspicious">Suspicious for Malignancy</option>
                        <option value="malignant">Malignant</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="cellularPattern">Cellular Pattern:</label>
                    <textarea id="cellularPattern"></textarea>
                </div>
                <div class="form-group">
                    <label for="cellularArrangement">Cellular Arrangement:</label>
                    <SearchableSelectField id="cellularArrangement">
                        <option value="">Select</option>
                        <option value="singleCells">Single Cells</option>
                        <option value="sheets">Sheets</option>
                        <option value="clusters">Clusters</option>
                        <option value="papillary">Papillary</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="nuclearFeatures">Nuclear Features:</label>
                    <textarea id="nuclearFeatures"></textarea>
                </div>
                <div class="form-group">
                    <label for="cytoplasmicFeatures">Cytoplasmic Features:</label>
                    <textarea id="cytoplasmicFeatures"></textarea>
                </div>
                <div class="form-group">
                    <label for="microorganisms">Microorganisms (If Present):</label>
                    <SearchableSelectField id="microorganisms">
                        <option value="">Select</option>
                        <option value="none">None</option>
                        <option value="bacterial">Bacterial</option>
                        <option value="fungal">Fungal</option>
                        <option value="viral">Viral</option>
                        <option value="parasitic">Parasitic</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
            </div>

            <!-- Microscopic Examination Section -->
            <div class="section">
                <div class="section-title">Microscopic Examination</div>
            </div>

            <!-- Specific Classifications Section -->
            <div class="section">
                <div class="section-title">Specific Classifications</div>
                
                <!-- Pap Smear Classifications -->
                <div id="papSmearClassifications" class="classification-group">
                    <h3>Pap Smear Classifications</h3>
                    <div class="form-group">
                        <label for="bethesdaClassification">Bethesda Classification:</label>
                        <SearchableSelectField id="bethesdaClassification">
                            <option value="">Select Classification</option>
                            <option value="nilm">NILM (Negative for Intraepithelial Lesion or Malignancy)</option>
                            <option value="asc_us">ASC-US (Atypical Squamous Cells of Undetermined Significance)</option>
                            <option value="asc_h">ASC-H (Atypical Squamous Cells, cannot exclude HSIL)</option>
                            <option value="lsil">LSIL (Low-grade Squamous Intraepithelial Lesion)</option>
                            <option value="hsil">HSIL (High-grade Squamous Intraepithelial Lesion)</option>
                            <option value="scc">SCC (Squamous Cell Carcinoma)</option>
                            <option value="agc">AGC (Atypical Glandular Cells)</option>
                            <option value="ais">AIS (Adenocarcinoma In Situ)</option>
                            <option value="adenocarcinoma">Adenocarcinoma</option>
                            <option value="other">Other</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label>Epithelial Cell Abnormalities:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalities1" name="abnormalities">
                                <label for="abnormalities1">Atypical Squamous Cells</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalities2" name="abnormalities">
                                <label for="abnormalities2">Low-grade Squamous Intraepithelial Lesion</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalities3" name="abnormalities">
                                <label for="abnormalities3">High-grade Squamous Intraepithelial Lesion</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalities4" name="abnormalities">
                                <label for="abnormalities4">Squamous Cell Carcinoma</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalities5" name="abnormalities">
                                <label for="abnormalities5">Atypical Glandular Cells</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalities6" name="abnormalities">
                                <label for="abnormalities6">Adenocarcinoma In Situ</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalities7" name="abnormalities">
                                <label for="abnormalities7">Adenocarcinoma</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="endocervicalComponent">Endocervical/Transformation Zone Component:</label>
                        <SearchableSelectField id="endocervicalComponent">
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="hormonalEvaluation">Hormonal Evaluation (If Applicable):</label>
                        <SearchableSelectField id="hormonalEvaluation">
                            <option value="">Select</option>
                            <option value="atrophic">Atrophic</option>
                            <option value="consistent">Consistent with age and history</option>
                            <option value="other">Other</option>
                        </SearchableSelectField>
                    </div>
                </div>
                
                <!-- FNA Classifications -->
                <div id="fnaClassifications" class="classification-group">
                    <h3>FNA Classifications</h3>
                    <div class="form-group">
                        <label for="descriptiveDiagnosis">Descriptive Diagnosis:</label>
                        <textarea id="descriptiveDiagnosis"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="milanSystem">Milan System for Reporting Salivary Gland Cytopathology (If Applicable):</label>
                        <SearchableSelectField id="milanSystem">
                            <option value="">Select</option>
                            <option value="category1">Category I: Non-diagnostic</option>
                            <option value="category2">Category II: Non-neoplastic</option>
                            <option value="category3">Category III: Atypia of Undetermined Significance (AUS)</option>
                            <option value="category4">Category IV: Neoplasm</option>
                            <option value="category5">Category V: Suspicious for Malignancy</option>
                            <option value="category6">Category VI: Malignant</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="bethesdaThyroid">Bethesda System for Reporting Thyroid Cytopathology (If Applicable):</label>
                        <SearchableSelectField id="bethesdaThyroid">
                            <option value="">Select</option>
                            <option value="category1">I: Nondiagnostic/Unsatisfactory</option>
                            <option value="category2">II: Benign</option>
                            <option value="category3">III: Atypia of Undetermined Significance (AUS)</option>
                            <option value="category4">IV: Follicular Neoplasm/Suspicious for Follicular Neoplasm</option>
                            <option value="category5">V: Suspicious for Malignancy</option>
                            <option value="category6">VI: Malignant</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="iacYokohama">International Academy of Cytology (IAC) Yokohama System (For Breast FNA):</label>
                        <SearchableSelectField id="iacYokohama">
                            <option value="">Select</option>
                            <option value="category1">Category 1: Insufficient Material</option>
                            <option value="category2">Category 2: Benign</option>
                            <option value="category3">Category 3: Atypical, probably benign</option>
                            <option value="category4">Category 4: Suspicious, probably in situ or invasive carcinoma</option>
                            <option value="category5">Category 5: Malignant</option>
                        </SearchableSelectField>
                    </div>
                </div>
                
                <!-- Body Fluid Classifications -->
                <div id="bodyFluidClassifications" class="classification-group">
                    <h3>Body Fluid Classifications</h3>
                    <div class="form-group">
                        <label>Cell Types Present:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="cellType1" name="cellTypes">
                                <label for="cellType1">Mesothelial Cells</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cellType2" name="cellTypes">
                                <label for="cellType2">Macrophages</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cellType3" name="cellTypes">
                                <label for="cellType3">Lymphocytes</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cellType4" name="cellTypes">
                                <label for="cellType4">Neutrophils</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cellType5" name="cellTypes">
                                <label for="cellType5">Eosinophils</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cellType6" name="cellTypes">
                                <label for="cellType6">Other</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="atypicalCells">Atypical/Malignant Cells:</label>
                        <SearchableSelectField id="atypicalCells">
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                        </SearchableSelectField>
                    </div>
                </div>
            </div>

            <!-- Diagnosis & Interpretation Section -->
            <div class="section">
                <div class="section-title">Diagnosis & Interpretation</div>
                <div class="form-group">
                    <label for="primaryDiagnosis">Primary Diagnosis:</label>
                    <textarea id="primaryDiagnosis"></textarea>
                </div>
                <div class="form-group">
                    <label for="diagnosticCategory">Diagnostic Category:</label>
                    <SearchableSelectField id="diagnosticCategory">
                        <!-- Options will be populated based on specimen type -->
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="additionalFindings">Additional Findings:</label>
                    <textarea id="additionalFindings"></textarea>
                </div>
                <div class="form-group">
                    <label for="differentialDiagnosis">Differential Diagnosis:</label>
                    <textarea id="differentialDiagnosis"></textarea>
                </div>
                <div class="form-group">
                    <label for="clinicalCorrelation">Correlation with Clinical/Radiological Findings:</label>
                    <textarea id="clinicalCorrelation"></textarea>
                </div>
                <div class="form-group">
                    <label for="previousCorrelation">Correlation with Previous Specimens:</label>
                    <textarea id="previousCorrelation"></textarea>
                </div>
            </div>

            <!-- Recommendations Section -->
            <div class="section">
                <div class="section-title">Recommendations</div>
                <div class="form-group">
                    <label for="followUp">Suggested Follow-up:</label>
                    <SearchableSelectField id="followUp">
                        <option value="">Select</option>
                        <option value="routineScreening">Routine Screening</option>
                        <option value="repeatCytology">Repeat Cytology</option>
                        <option value="colposcopy">Colposcopy</option>
                        <option value="biopsy">Biopsy</option>
                        <option value="surgicalConsultation">Surgical Consultation</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="timeFrame">Recommended Time Frame:</label>
                    <SearchableSelectField id="timeFrame">
                        <option value="">Select</option>
                        <option value="immediate">Immediate</option>
                        <option value="3months">3 months</option>
                        <option value="6months">6 months</option>
                        <option value="1year">1 year</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="additionalTesting">Additional Testing Recommended:</label>
                    <textarea id="additionalTesting"></textarea>
                </div>
                <div class="form-group">
                    <label for="comments">Comments:</label>
                    <textarea id="comments"></textarea>
                </div>
            </div>

            <button type="submit">Submit Report</button>
            <button type="button" id="extractData">Extract Data</button>
        </form>
    </div>
</div>

<script>
    // Add JavaScript for dynamic form behavior
    document.getElementById('specimenType').addEventListener('change', function() {
        const diagnosticCategory = document.getElementById('diagnosticCategory');
        diagnosticCategory.innerHTML = ''; // Clear existing options
        
        // Hide all classification sections first
        document.getElementById('papSmearClassifications').style.display = 'none';
        document.getElementById('fnaClassifications').style.display = 'none';
        document.getElementById('bodyFluidClassifications').style.display = 'none';
        
        // Add options based on specimen type
        const options = {
            'papSmear': [
                'Negative for Intraepithelial Lesion or Malignancy (NILM)',
                'Atypical Squamous Cells of Undetermined Significance (ASC-US)',
                'Atypical Squamous Cells, cannot exclude HSIL (ASC-H)',
                'Low-grade Squamous Intraepithelial Lesion (LSIL)',
                'High-grade Squamous Intraepithelial Lesion (HSIL)',
                'Squamous Cell Carcinoma (SCC)',
                'Atypical Glandular Cells (AGC)',
                'Atypical Glandular Cells, favor neoplastic',
                'Adenocarcinoma In Situ (AIS)',
                'Adenocarcinoma'
            ],
            'fna': [
                'Category I: Non-diagnostic/Unsatisfactory',
                'Category II: Benign',
                'Category III: Atypia of Undetermined Significance (AUS)',
                'Category IV: Neoplasm',
                'Category V: Suspicious for Malignancy',
                'Category VI: Malignant'
            ],
            'bodyFluid': [
                'Negative for Malignancy',
                'Atypical Cells Present',
                'Suspicious for Malignancy',
                'Positive for Malignancy',
                'Non-diagnostic/Unsatisfactory'
            ]
        };

        const selectedType = this.value;
        if (options[selectedType]) {
            options[selectedType].forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.toLowerCase().replace(/[^a-z0-9]/g, '_');
                opt.textContent = option;
                diagnosticCategory.appendChild(opt);
            });
            
            // Show the appropriate classification section
            if (selectedType === 'papSmear') {
                document.getElementById('papSmearClassifications').style.display = 'block';
            } else if (selectedType === 'fna') {
                document.getElementById('fnaClassifications').style.display = 'block';
            } else if (selectedType === 'bodyFluid') {
                document.getElementById('bodyFluidClassifications').style.display = 'block';
            }
        }
    });

    // Function to extract form data
    function extractCytologicalFormData() {
        const formData = {
            specimenInformation: {
                accessionNumber: document.getElementById('accessionNumber').value,
                collectionDate: document.getElementById('collectionDate').value,
                reportDate: document.getElementById('reportDate').value,
                specimenType: document.getElementById('specimenType').value,
                collectionSite: document.getElementById('collectionSite').value,
                procedure: document.getElementById('procedure').value,
                clinicalIndication: document.getElementById('clinicalIndication').value,
                collectedBy: document.getElementById('collectedBy').value,
                fixative: document.getElementById('fixative').value,
                previousResults: document.getElementById('previousResults').value
            },
            specimenProcessing: {
                preparationTechnique: document.getElementById('preparationTechnique').value,
                stainingMethod: document.getElementById('stainingMethod').value,
                specialProcessing: document.getElementById('specialProcessing').value,
                cellBlock: document.getElementById('cellBlock').value,
                rose: document.getElementById('rose').value,
                roseResults: document.getElementById('roseResults').value
            },
            microscopicExamination: {
                adequacy: document.getElementById('adequacy').value,
                cellularity: document.getElementById('cellularity').value,
                background: document.getElementById('background').value,
                cellMorphology: document.getElementById('cellMorphology').value,
                cellularPattern: document.getElementById('cellularPattern').value,
                cellularArrangement: document.getElementById('cellularArrangement').value,
                nuclearFeatures: document.getElementById('nuclearFeatures').value,
                cytoplasmicFeatures: document.getElementById('cytoplasmicFeatures').value,
                microorganisms: document.getElementById('microorganisms').value
            },
            specificClassifications: {
                papSmear: {
                    bethesdaClassification: document.getElementById('bethesdaClassification').value,
                    endocervicalComponent: document.getElementById('endocervicalComponent').value,
                    hormonalEvaluation: document.getElementById('hormonalEvaluation').value,
                    epithelialAbnormalities: Array.from(document.querySelectorAll('input[name="abnormalities"]:checked')).map(cb => cb.id)
                },
                fna: {
                    descriptiveDiagnosis: document.getElementById('descriptiveDiagnosis').value,
                    milanSystem: document.getElementById('milanSystem').value,
                    bethesdaThyroid: document.getElementById('bethesdaThyroid').value,
                    iacYokohama: document.getElementById('iacYokohama').value
                },
                bodyFluid: {
                    cellTypes: Array.from(document.querySelectorAll('input[name="cellTypes"]:checked')).map(cb => cb.id),
                    atypicalCells: document.getElementById('atypicalCells').value
                }
            },
            diagnosisAndInterpretation: {
                primaryDiagnosis: document.getElementById('primaryDiagnosis').value,
                diagnosticCategory: document.getElementById('diagnosticCategory').value,
                additionalFindings: document.getElementById('additionalFindings').value,
                differentialDiagnosis: document.getElementById('differentialDiagnosis').value,
                clinicalCorrelation: document.getElementById('clinicalCorrelation').value,
                previousCorrelation: document.getElementById('previousCorrelation').value
            },
            recommendations: {
                followUp: document.getElementById('followUp').value,
                timeFrame: document.getElementById('timeFrame').value,
                additionalTesting: document.getElementById('additionalTesting').value,
                comments: document.getElementById('comments').value
            }
        };

        // Log the extracted data to console
        console.log('Extracted Form Data:', formData);
        return formData
        // // You can also convert to JSON string for easy viewing
        // console.log('JSON Format:', JSON.stringify(formData, null, 2));
        
        // // Optional: Create a download link for the JSON data
        // const dataStr = JSON.stringify(formData, null, 2);
        // const dataBlob = new Blob([dataStr], { type: 'application/json' });
        // const url = URL.createObjectURL(dataBlob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'cytology_report_data.json';
        // link.click();
        // URL.revokeObjectURL(url);
    }

    // Add event listener to the extract data button
    document.getElementById('extractData').addEventListener('click', extractCytologicalFormData);

    // Auto-fill current date for report date
    document.getElementById('reportDate').valueAsDate = new Date();
    
    document.getElementById('papSmearClassifications').style.display = 'none';
    document.getElementById('fnaClassifications').style.display = 'none';
    document.getElementById('bodyFluidClassifications').style.display = 'none';
    // Initialize classification sections as hidden
    document.addEventListener('DOMContentLoaded', function() {
    });

    function submitCytologyForm() {

        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'processLabTemplate', $requestLab->id, $patientVisit->id, $template]) -->',
            type: 'POST',
            data: extractCytologicalFormData(),
            success: function(response) {
                alertify.log(response);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    document.getElementById('cytologyForm').addEventListener('submit', function(event) {
        event.preventDefault();
        submitCytologyForm();
        $('#labRequestResultDialog').modal("hide");
    });
</script>
    
`;

export default function ElementElementRequestLabsCytological() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
