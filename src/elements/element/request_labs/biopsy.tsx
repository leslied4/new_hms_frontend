const rawHtml = `

    <style scoped>
        #biopsy_template .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        #biopsy_template .section {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        #biopsy_template .section-title {
            background-color: #f0f0f0;
            padding: 10px;
            margin: -15px -15px 15px -15px;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }
        #biopsy_template .form-group {
            margin-bottom: 15px;
        }
        #biopsy_template label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        #biopsy_template input[type="text"],
        #biopsy_template input[type="date"],
        #biopsy_template input[type="number"],
        #biopsy_template select,
        #biopsy_template textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        #biopsy_template textarea {
            height: 100px;
            resize: vertical;
        }
        #biopsy_template .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        #biopsy_template .checkbox-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        #biopsy_template button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #biopsy_template button:hover {
            background-color: #45a049;
        }
        #biopsy_template .auto-fill {
            background-color: #f8f8f8;
            color: #666;
        }
        #biopsy_template .two-column {
            display: flex;
            gap: 20px;
        }
        #biopsy_template .column {
            flex: 1;
        }
        #biopsy_template .result-field {
            margin-top: 5px;
            padding: 5px;
            background-color: #f9f9f9;
            border: 1px solid #eee;
            border-radius: 4px;
        }
    </style>

<div id="biopsy_template">
    <div class="container">
        <h1>Biopsy Report Template</h1>
        <form id="biopsyTemplateForm">
            <!-- Patient Information Section -->

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
                        <option value="biopsy">Biopsy</option>
                        <option value="excision">Excision</option>
                        <option value="fna">Fine Needle Aspiration (FNA)</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="biopsySite">Site of Biopsy:</label>
                    <SearchableSelectField id="biopsySite">
                        <option value="">Select Site</option>
                        <option value="breast">Breast</option>
                        <option value="lung">Lung</option>
                        <option value="colon">Colon</option>
                        <option value="skin">Skin</option>
                        <option value="other">Other (specify)</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="procedure">Procedure:</label>
                    <SearchableSelectField id="procedure">
                        <option value="">Select Procedure</option>
                        <option value="endoscopic">Endoscopic</option>
                        <option value="coreNeedle">Core Needle</option>
                        <option value="incisional">Incisional</option>
                        <option value="excisional">Excisional</option>
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
                        <option value="formalin">Formalin</option>
                        <option value="frozen">Frozen</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
            </div>

            <!-- Grossing Workflow Section -->
            <div class="section">
                <div class="section-title">Grossing Workflow</div>
                <div class="form-group">
                    <label for="specimenReceived">Specimen Received:</label>
                    <textarea id="specimenReceived" placeholder="Description of containers and labeling"></textarea>
                </div>
                <div class="form-group">
                    <label for="specimenDimensions">Specimen Dimensions:</label>
                    <input type="text" id="specimenDimensions">
                </div>
                <div class="form-group">
                    <label for="specimenWeight">Specimen Weight:</label>
                    <input type="text" id="specimenWeight">
                </div>
                <div class="form-group">
                    <label for="colorConsistency">Color & Consistency:</label>
                    <input type="text" id="colorConsistency">
                </div>
                <div class="form-group">
                    <label for="specimenDescription">Specimen Description:</label>
                    <textarea id="specimenDescription" placeholder="Detailed description"></textarea>
                </div>
                <div class="form-group">
                    <label>Photographs Taken:</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="radio" id="photosYes" name="photos" value="yes">
                            <label for="photosYes">Yes</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="radio" id="photosNo" name="photos" value="no">
                            <label for="photosNo">No</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="orientationMarkings">Tissue Orientation Markings:</label>
                    <SearchableSelectField id="orientationMarkings">
                        <option value="">Select</option>
                        <option value="ink">Ink</option>
                        <option value="sutures">Sutures</option>
                        <option value="clips">Clips</option>
                        <option value="none">None</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="sectionsSubmitted">Sections Submitted for Processing:</label>
                    <input type="text" id="sectionsSubmitted">
                </div>
                <div class="form-group">
                    <label for="cassetteSummary">Cassette Summary:</label>
                    <textarea id="cassetteSummary"></textarea>
                </div>
                <div class="form-group">
                    <label for="grossImpression">Gross Impression:</label>
                    <textarea id="grossImpression"></textarea>
                </div>
            </div>

            <!-- Tissue Processing & Embedding Section -->
            <div class="section">
                <div class="section-title">Tissue Processing & Embedding</div>
                <div class="form-group">
                    <label for="fixationType">Fixation Type & Duration:</label>
                    <SearchableSelectField id="fixationType">
                        <option value="">Select</option>
                        <option value="formalin">Formalin</option>
                        <option value="bouins">Bouin's</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="dehydrationReagents">Dehydration Reagents Used:</label>
                    <SearchableSelectField id="dehydrationReagents">
                        <option value="">Select</option>
                        <option value="ethanol">Ethanol</option>
                        <option value="xylene">Xylene</option>
                        <option value="acetone">Acetone</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="clearingParaffin">Clearing & Paraffin Embedding:</label>
                    <SearchableSelectField id="clearingParaffin">
                        <option value="">Select</option>
                        <option value="xylene">Xylene</option>
                        <option value="toluene">Toluene</option>
                        <option value="paraffin">Paraffin</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="automatedProcessing">Automated Processing System Used:</label>
                    <SearchableSelectField id="automatedProcessing">
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="embeddingOrientation">Embedding Orientation:</label>
                    <SearchableSelectField id="embeddingOrientation">
                        <option value="">Select</option>
                        <option value="standard">Standard</option>
                        <option value="custom">Custom</option>
                    </SearchableSelectField>
                </div>
            </div>

            <!-- Microtomy & Staining Section -->
            <div class="section">
                <div class="section-title">Microtomy & Staining</div>
                <div class="form-group">
                    <label for="sectionThickness">Microtomy Section Thickness:</label>
                    <SearchableSelectField id="sectionThickness">
                        <option value="">Select</option>
                        <option value="3">3µm</option>
                        <option value="4">4µm</option>
                        <option value="5">5µm</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="slidePreparation">Slide Preparation:</label>
                    <SearchableSelectField id="slidePreparation">
                        <option value="">Select</option>
                        <option value="manual">Manual</option>
                        <option value="automated">Automated</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="routineStain">Routine Stain Used:</label>
                    <SearchableSelectField id="routineStain">
                        <option value="">Select</option>
                        <option value="he">H&E</option>
                        <option value="pas">PAS</option>
                        <option value="giemsa">Giemsa</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label>Special Stains Requested:</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="specialStain1" name="specialStains">
                            <label for="specialStain1">PAS</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="specialStain2" name="specialStains">
                            <label for="specialStain2">Alcian Blue</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="specialStain3" name="specialStains">
                            <label for="specialStain3">Congo Red</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="specialStain4" name="specialStains">
                            <label for="specialStain4">Other</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>IHC Panel Ordered:</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihc1" name="ihcPanel">
                            <label for="ihc1">ER</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihc2" name="ihcPanel">
                            <label for="ihc2">PR</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihc3" name="ihcPanel">
                            <label for="ihc3">HER2</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihc4" name="ihcPanel">
                            <label for="ihc4">Ki-67</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihc5" name="ihcPanel">
                            <label for="ihc5">P53</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihc6" name="ihcPanel">
                            <label for="ihc6">Other</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="controlSlides">Control Slides Used:</label>
                    <SearchableSelectField id="controlSlides">
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </SearchableSelectField>
                </div>
            </div>

            <!-- Microscopic Examination Section -->
            <div class="section">
                <div class="section-title">Microscopic Examination</div>
                <div class="form-group">
                    <label for="tissueType">Tissue Type:</label>
                    <input type="text" id="tissueType" placeholder="Identified tissue types">
                </div>
                <div class="form-group">
                    <label for="histologicalFindings">Histological Findings:</label>
                    <textarea id="histologicalFindings" placeholder="Detailed description"></textarea>
                </div>
                <div class="form-group">
                    <label for="histologicType">Histologic Type:</label>
                    <SearchableSelectField id="histologicType">
                        <option value="">Select</option>
                        <option value="adenocarcinoma">Adenocarcinoma</option>
                        <option value="squamousCellCarcinoma">Squamous Cell Carcinoma</option>
                        <option value="melanoma">Melanoma</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="tumorGrade">Tumor Grade:</label>
                    <SearchableSelectField id="tumorGrade">
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="high">High</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="tumorSize">Tumor Size:</label>
                    <input type="text" id="tumorSize">
                </div>
                <div class="form-group">
                    <label for="marginStatus">Margin Status:</label>
                    <SearchableSelectField id="marginStatus">
                        <option value="">Select</option>
                        <option value="clear">Clear</option>
                        <option value="involved">Involved</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="lymphovascularInvasion">Lymphovascular Invasion:</label>
                    <SearchableSelectField id="lymphovascularInvasion">
                        <option value="">Select</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="perineuralInvasion">Perineural Invasion:</label>
                    <SearchableSelectField id="perineuralInvasion">
                        <option value="">Select</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="necrosis">Necrosis:</label>
                    <SearchableSelectField id="necrosis">
                        <option value="">Select</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="necrosisExtent">Necrosis Extent (if present):</label>
                    <input type="text" id="necrosisExtent">
                </div>
            </div>

            <!-- Special Stains & Immunohistochemistry Section -->
            <div class="section">
                <div class="section-title">Special Stains & Immunohistochemistry (IHC)</div>
                <div class="form-group">
                    <label for="specialStainsPerformed">Special Stains Performed:</label>
                    <SearchableSelectField id="specialStainsPerformed">
                        <option value="">Select</option>
                        <option value="pas">PAS</option>
                        <option value="giemsa">Giemsa</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="specialStainResults">Special Stain Results:</label>
                    <textarea id="specialStainResults"></textarea>
                </div>
                <div class="form-group">
                    <label>IHC Markers:</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihcMarker1" name="ihcMarkers">
                            <label for="ihcMarker1">ER</label>
                            <div class="result-field">
                                <input type="text" placeholder="Result">
                            </div>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihcMarker2" name="ihcMarkers">
                            <label for="ihcMarker2">PR</label>
                            <div class="result-field">
                                <input type="text" placeholder="Result">
                            </div>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihcMarker3" name="ihcMarkers">
                            <label for="ihcMarker3">HER2</label>
                            <div class="result-field">
                                <input type="text" placeholder="Result">
                            </div>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihcMarker4" name="ihcMarkers">
                            <label for="ihcMarker4">Ki-67</label>
                            <div class="result-field">
                                <input type="text" placeholder="Result">
                            </div>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihcMarker5" name="ihcMarkers">
                            <label for="ihcMarker5">P53</label>
                            <div class="result-field">
                                <input type="text" placeholder="Result">
                            </div>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="ihcMarker6" name="ihcMarkers">
                            <label for="ihcMarker6">Other</label>
                            <div class="result-field">
                                <input type="text" placeholder="Result">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ihcResults">Immunohistochemistry Results:</label>
                    <textarea id="ihcResults" placeholder="Detailed results"></textarea>
                </div>
                <div class="form-group">
                    <label for="molecularTesting">Molecular Testing (If Applicable):</label>
                    <input type="text" id="molecularTesting">
                </div>
                <div class="form-group">
                    <label for="molecularResults">Molecular Results:</label>
                    <textarea id="molecularResults"></textarea>
                </div>
            </div>

            <!-- Pathologic Staging Section -->
            <div class="section">
                <div class="section-title">Pathologic Staging (TNM Classification)</div>
                <div class="form-group">
                    <label for="tStage">T (Tumor):</label>
                    <SearchableSelectField id="tStage">
                        <option value="">Select</option>
                        <option value="t1">T1</option>
                        <option value="t2">T2</option>
                        <option value="t3">T3</option>
                        <option value="t4">T4</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="nStage">N (Nodes):</label>
                    <SearchableSelectField id="nStage">
                        <option value="">Select</option>
                        <option value="n0">N0</option>
                        <option value="n1">N1</option>
                        <option value="n2">N2</option>
                        <option value="n3">N3</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="mStage">M (Metastasis):</label>
                    <SearchableSelectField id="mStage">
                        <option value="">Select</option>
                        <option value="m0">M0</option>
                        <option value="m1">M1</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="overallStage">Overall Stage Grouping:</label>
                    <input type="text" id="overallStage" class="auto-fill" readonly>
                </div>
                <div class="form-group">
                    <label for="ajccStage">AJCC Stage Group:</label>
                    <input type="text" id="ajccStage">
                </div>
            </div>

            <!-- Diagnosis & Summary Section -->
            <div class="section">
                <div class="section-title">Diagnosis & Summary</div>
                <div class="form-group">
                    <label for="primaryDiagnosis">Primary Diagnosis:</label>
                    <textarea id="primaryDiagnosis" placeholder="With Auto-Suggestions"></textarea>
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
                    <label for="commentsRecommendations">Comments & Recommendations:</label>
                    <textarea id="commentsRecommendations"></textarea>
                </div>
                <div class="form-group">
                    <label for="suggestedFollowUp">Suggested Follow-Up:</label>
                    <SearchableSelectField id="suggestedFollowUp">
                        <option value="">Select</option>
                        <option value="repeatBiopsy">Repeat Biopsy</option>
                        <option value="imaging">Imaging</option>
                        <option value="oncologyConsultation">Oncology Consultation</option>
                        <option value="other">Other</option>
                    </SearchableSelectField>
                </div>
            </div>

            <!-- Tumor Characteristics Section -->
            <div class="section">
                <div class="section-title">Tumor Characteristics (If Applicable)</div>
                <div class="form-group">
                    <label for="tumorHistologicalType">Histological Type:</label>
                    <input type="text" id="tumorHistologicalType" placeholder="Specify">
                </div>
                <div class="form-group">
                    <label for="tumorGradeDetails">Grade:</label>
                    <input type="text" id="tumorGradeDetails" placeholder="Specify grading system and result">
                </div>
                <div class="form-group">
                    <label for="tumorSizeDetails">Size:</label>
                    <input type="text" id="tumorSizeDetails" placeholder="Largest dimension in cm">
                </div>
                <div class="form-group">
                    <label for="tumorInvasion">Invasion:</label>
                    <input type="text" id="tumorInvasion" placeholder="Present/Absent, depth if applicable">
                </div>
                <div class="form-group">
                    <label for="tumorMargins">Margins:</label>
                    <input type="text" id="tumorMargins" placeholder="Status - Positive/Negative, distance to closest margin">
                </div>
                <div class="form-group">
                    <label for="tumorLymphovascularInvasion">Lymphovascular Invasion:</label>
                    <input type="text" id="tumorLymphovascularInvasion" placeholder="Present/Absent">
                </div>
                <div class="form-group">
                    <label for="tumorPerineuralInvasion">Perineural Invasion:</label>
                    <input type="text" id="tumorPerineuralInvasion" placeholder="Present/Absent">
                </div>
                <div class="form-group">
                    <label for="tumorNecrosis">Necrosis:</label>
                    <input type="text" id="tumorNecrosis" placeholder="Present/Absent, extent if present">
                </div>
            </div>

            <button type="submit">Submit Report</button>
        </form>
    </div>
</div>

    <script>
        // Auto-fill current date for report date
        document.getElementById('reportDate').valueAsDate = new Date();
        
        // Calculate overall stage based on TNM values
        function calculateOverallStage() {
            const tStage = document.getElementById('tStage').value;
            const nStage = document.getElementById('nStage').value;
            const mStage = document.getElementById('mStage').value;
            
            if (tStage && nStage && mStage) {
                let stage = '';
                
                // Simple example logic - would need to be expanded for actual staging
                if (tStage === 't1' && nStage === 'n0' && mStage === 'm0') {
                    stage = 'Stage I';
                } else if (tStage === 't2' && nStage === 'n0' && mStage === 'm0') {
                    stage = 'Stage II';
                } else if (nStage !== 'n0' && mStage === 'm0') {
                    stage = 'Stage III';
                } else if (mStage === 'm1') {
                    stage = 'Stage IV';
                } else {
                    stage = 'Stage cannot be determined';
                }
                
                document.getElementById('overallStage').value = stage;
            }
        }
        
        // Add event listeners for TNM dropdowns
        document.getElementById('tStage').addEventListener('change', calculateOverallStage);
        document.getElementById('nStage').addEventListener('change', calculateOverallStage);
        document.getElementById('mStage').addEventListener('change', calculateOverallStage);
        
        // // Calculate age based on DOB
        // document.getElementById('dob').addEventListener('change', function() {
        //     if (this.value) {
        //         const dob = new Date(this.value);
        //         const today = new Date();
        //         let age = today.getFullYear() - dob.getFullYear();
        //         const monthDiff = today.getMonth() - dob.getMonth();
                
        //         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        //             age--;
        //         }
                
        //         document.getElementById('age').value = age;
        //     }
        // });

        // Function to extract form data
        function extractBiopsyFormData() {
            const formData = {
                specimenInformation: {
                    accessionNumber: document.getElementById('accessionNumber').value,
                    collectionDate: document.getElementById('collectionDate').value,
                    reportDate: document.getElementById('reportDate').value,
                    specimenType: document.getElementById('specimenType').value,
                    biopsySite: document.getElementById('biopsySite').value,
                    procedure: document.getElementById('procedure').value,
                    clinicalIndication: document.getElementById('clinicalIndication').value,
                    collectedBy: document.getElementById('collectedBy').value,
                    fixative: document.getElementById('fixative').value
                },
                grossingWorkflow: {
                    specimenReceived: document.getElementById('specimenReceived').value,
                    specimenDimensions: document.getElementById('specimenDimensions').value,
                    specimenWeight: document.getElementById('specimenWeight').value,
                    colorConsistency: document.getElementById('colorConsistency').value,
                    specimenDescription: document.getElementById('specimenDescription').value,
                    photos: document.querySelector('input[name="photos"]:checked')?.value,
                    orientationMarkings: document.getElementById('orientationMarkings').value,
                    sectionsSubmitted: document.getElementById('sectionsSubmitted').value,
                    cassetteSummary: document.getElementById('cassetteSummary').value,
                    grossImpression: document.getElementById('grossImpression').value
                },
                tissueProcessing: {
                    fixationType: document.getElementById('fixationType').value,
                    dehydrationReagents: document.getElementById('dehydrationReagents').value,
                    clearingParaffin: document.getElementById('clearingParaffin').value,
                    automatedProcessing: document.getElementById('automatedProcessing').value,
                    embeddingOrientation: document.getElementById('embeddingOrientation').value
                },
                microtomyAndStaining: {
                    sectionThickness: document.getElementById('sectionThickness').value,
                    slidePreparation: document.getElementById('slidePreparation').value,
                    routineStain: document.getElementById('routineStain').value,
                    specialStains: Array.from(document.querySelectorAll('input[name="specialStains"]:checked')).map(cb => cb.id),
                    ihcPanel: Array.from(document.querySelectorAll('input[name="ihcPanel"]:checked')).map(cb => cb.id),
                    controlSlides: document.getElementById('controlSlides').value
                },
                microscopicExamination: {
                    tissueType: document.getElementById('tissueType').value,
                    histologicalFindings: document.getElementById('histologicalFindings').value,
                    histologicType: document.getElementById('histologicType').value,
                    tumorGrade: document.getElementById('tumorGrade').value,
                    tumorSize: document.getElementById('tumorSize').value,
                    marginStatus: document.getElementById('marginStatus').value,
                    lymphovascularInvasion: document.getElementById('lymphovascularInvasion').value,
                    perineuralInvasion: document.getElementById('perineuralInvasion').value,
                    necrosis: document.getElementById('necrosis').value,
                    necrosisExtent: document.getElementById('necrosisExtent').value
                },
                specialStainsAndIHC: {
                    specialStainsPerformed: document.getElementById('specialStainsPerformed').value,
                    specialStainResults: document.getElementById('specialStainResults').value,
                    ihcMarkers: Array.from(document.querySelectorAll('input[name="ihcMarkers"]:checked')).map(cb => ({
                        marker: cb.id,
                        result: cb.parentElement.querySelector('.result-field input').value
                    })),
                    ihcResults: document.getElementById('ihcResults').value,
                    molecularTesting: document.getElementById('molecularTesting').value,
                    molecularResults: document.getElementById('molecularResults').value
                },
                pathologicStaging: {
                    tStage: document.getElementById('tStage').value,
                    nStage: document.getElementById('nStage').value,
                    mStage: document.getElementById('mStage').value,
                    overallStage: document.getElementById('overallStage').value,
                    ajccStage: document.getElementById('ajccStage').value
                },
                diagnosisAndSummary: {
                    primaryDiagnosis: document.getElementById('primaryDiagnosis').value,
                    additionalFindings: document.getElementById('additionalFindings').value,
                    differentialDiagnosis: document.getElementById('differentialDiagnosis').value,
                    commentsRecommendations: document.getElementById('commentsRecommendations').value,
                    suggestedFollowUp: document.getElementById('suggestedFollowUp').value
                },
                tumorCharacteristics: {
                    tumorHistologicalType: document.getElementById('tumorHistologicalType').value,
                    tumorGradeDetails: document.getElementById('tumorGradeDetails').value,
                    tumorSizeDetails: document.getElementById('tumorSizeDetails').value,
                    tumorInvasion: document.getElementById('tumorInvasion').value,
                    tumorMargins: document.getElementById('tumorMargins').value,
                    tumorLymphovascularInvasion: document.getElementById('tumorLymphovascularInvasion').value,
                    tumorPerineuralInvasion: document.getElementById('tumorPerineuralInvasion').value,
                    tumorNecrosis: document.getElementById('tumorNecrosis').value
                }
            };

            // Log the extracted data to console
            console.log('Extracted Form Data:', formData);
            
            // You can also convert to JSON string if needed
            const jsonData = JSON.stringify(formData, null, 2);
            console.log('JSON Format:', jsonData);
            
            return formData;
        }



        function submitBiopsyForm() {

            $.ajax({
                url: '<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'processLabTemplate', $requestLab->id, $patientVisit->id, $template]) -->',
                type: 'POST',
                data: extractBiopsyFormData(),
                success: function(response) {
                    alertify.log(response);
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
        }

        document.getElementById('biopsyTemplateForm').addEventListener('submit', function(event) {
            event.preventDefault();
            submitBiopsyForm();
            $('#labRequestResultDialog').modal("hide");
        });
    </script>

`;

export default function ElementElementRequestLabsBiopsy() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
