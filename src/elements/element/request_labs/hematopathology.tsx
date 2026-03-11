const rawHtml = `

<style>
    /* Base Styles */
    #body_hematopathology {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.6;
        color: var(--text-color);
        background-color: var(--background-color);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #body_hematopathology .container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 1.5rem;
    }

    /* Typography */
    #body_hematopathology h1,
    #body_hematopathology h2,
    #body_hematopathology h3 {
        color: var(--primary-color);
        font-weight: 600;
        line-height: 1.3;
    }

    #body_hematopathology h1 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }

    #body_hematopathology h2 {
        font-size: 1.5rem;
        margin-bottom: 1.25rem;
        padding-bottom: 0.75rem;
        border-bottom: 2px solid var(--border-color);
    }

    #body_hematopathology h3 {
        font-size: 1.25rem;
        margin: 1.5rem 0 1rem;
        color: var(--secondary-color);
    }

    /* Header Styles */
    #body_hematopathology header {
        background-color: var(--card-background);
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        margin-bottom: 2rem;
        text-align: center;
    }

    /* Form Section Styles */
    #body_hematopathology .form-section {
        background-color: var(--card-background);
        padding: 2rem;
        margin-bottom: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-sm);
        transition: var(--transition);
    }

    #body_hematopathology .form-section:hover {
        box-shadow: var(--shadow-md);
    }

    /* Form Grid Layout */
    #body_hematopathology .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    /* Form Group Styles */
    #body_hematopathology .form-group {
        margin-bottom: 1.25rem;
    }

    #body_hematopathology .form-group.full-width {
        grid-column: 1 / -1;
    }

    /* Label Styles */
    #body_hematopathology label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text-color);
    }

    /* Input Styles */
    #body_hematopathology input[type="text"],
    #body_hematopathology input[type="number"],
    #body_hematopathology input[type="date"],
    #body_hematopathology input[type="datetime-local"],
    #body_hematopathology select,
    #body_hematopathology textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #d2d6de;
        border-radius: var(--border-radius);
        font-size: 1rem;
        transition: var(--transition);
        background-color: var(--card-background);
    }

    #body_hematopathology input[type="text"]:focus,
    #body_hematopathology input[type="number"]:focus,
    #body_hematopathology input[type="date"]:focus,
    #body_hematopathology input[type="datetime-local"]:focus,
    #body_hematopathology select:focus,
    #body_hematopathology textarea:focus {
        outline: none;
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    #body_hematopathology input[readonly] {
        background-color: var(--background-color);
        cursor: not-allowed;
    }

    /* Textarea Styles */
    #body_hematopathology textarea {
        resize: vertical;
        min-height: 100px;
    }

    /* Select Styles */
    #body_hematopathology select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%232c3e50' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        padding-right: 2.5rem;
    }

    /* Checkbox and Radio Styles */
    #body_hematopathology .checkbox-group,
    #body_hematopathology .radio-group {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 0.5rem;
    }

    #body_hematopathology .checkbox-item,
    #body_hematopathology .radio-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: var(--border-radius);
        transition: var(--transition);
    }

    #body_hematopathology .checkbox-item:hover,
    #body_hematopathology .radio-item:hover {
        background-color: rgba(52, 152, 219, 0.1);
    }

    /* Button Styles */
    #body_hematopathology .form-actions {
        text-align: center;
        margin-top: 2rem;
    }

    #body_hematopathology .btn-primary {
        background-color: var(--secondary-color);
        color: white;
        padding: 0.75rem 2rem;
        border: none;
        border-radius: var(--border-radius);
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
        box-shadow: var(--shadow-sm);
    }

    #body_hematopathology .btn-primary:hover {
        background-color: #2980b9;
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
    }

    #body_hematopathology .btn-primary:active {
        transform: translateY(0);
    }

    /* Input with Unit Styles */
    #body_hematopathology .input-with-unit {
        position: relative;
        display: flex;
        align-items: center;
    }

    #body_hematopathology .input-with-unit input {
        padding-right: 4rem;
    }

    #body_hematopathology .input-with-unit .unit {
        position: absolute;
        right: 1rem;
        color: var(--text-light);
        font-size: 0.875rem;
    }

    /* Error States */
    #body_hematopathology .error {
        border-color: var(--accent-color) !important;
    }

    #body_hematopathology .error-message {
        color: var(--accent-color);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    /* Success States */
    #body_hematopathology .success {
        border-color: var(--success-color) !important;
    }

    /* Loading States */
    #body_hematopathology .loading {
        opacity: 0.7;
        pointer-events: none;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        #body_hematopathology .container {
            padding: 1rem;
        }

        #body_hematopathology .form-section {
            padding: 1.5rem;
        }

        #body_hematopathology .form-grid {
            grid-template-columns: 1fr;
        }

        #body_hematopathology h1 {
            font-size: 1.75rem;
        }

        #body_hematopathology h2 {
            font-size: 1.25rem;
        }
    }

    /* Print Styles */
    @media print {
        #body_hematopathology body {
            background-color: white;
        }

        #body_hematopathology .container {
            max-width: none;
            margin: 0;
            padding: 0;
        }

        #body_hematopathology .form-section {
            box-shadow: none;
            border: 1px solid var(--border-color);
            page-break-inside: avoid;
        }

        #body_hematopathology .btn-primary {
            display: none;
        }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
        #body_hematopathology * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }

    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
        #body_hematopathology :root {
            --primary-color: #ecf0f1;
            --text-color: #ecf0f1;
            --text-light: #bdc3c7;
            --background-color: #1a1a1a;
            --card-background: #2d2d2d;
            --border-color: #404040;
        }

        #body_hematopathology select {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ecf0f1' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
        }
    }
</style>

<div id="body_hematopathology">
    <div class="container">
        <header>
            <h1>HEMATOPATHOLOGY LABORATORY REPORT</h1>
        </header>
        <form id="hematopathologyForm">


            <!-- Specimen Information Section -->
            <section id="specimenInfo" class="form-section">
                <h2>SPECIMEN INFORMATION</h2>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="accessionNumber">Accession Number:</label>
                        <input type="text" id="accessionNumber" name="accessionNumber" readonly>
                    </div>
                    <div class="form-group">
                        <label for="collectionDateTime">Collection Date/Time:</label>
                        <input type="datetime-local" id="collectionDateTime" name="collectionDateTime" required>
                    </div>
                    <div class="form-group">
                        <label for="reportDate">Report Date:</label>
                        <input type="date" id="reportDate" name="reportDate" required>
                    </div>
                    <div class="form-group full-width">
                        <label>Specimen Type:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="peripheralBlood" name="specimenType" value="peripheralBlood">
                                <label for="peripheralBlood">Peripheral Blood</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="boneMarrowAspirate" name="specimenType"
                                    value="bone Marrow Aspirate">
                                <label for="boneMarrowAspirate">Bone Marrow Aspirate</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="boneMarrowTrephine" name="specimenType"
                                    value="bone Marrow Trephine">
                                <label for="boneMarrowTrephine">Bone Marrow Trephine Biopsy</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="touchImprint" name="specimenType" value="touchImprint">
                                <label for="touchImprint">Touch Imprint</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="clotSection" name="specimenType" value="clotSection">
                                <label for="clotSection">Clot Section</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="collectionSite">Collection Site:</label>
                        <SearchableSelectField id="collectionSite" name="collectionSite" required>
                            <option value="">Select Site</option>
                            <option value="iliacCrest">Iliac Crest</option>
                            <option value="sternum">Sternum</option>
                            <option value="vertebralBody">Vertebral Body</option>
                            <option value="other">Other</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group" id="otherCollectionSiteGroup" style="display: none;">
                        <label for="otherCollectionSite">Specify Other Site:</label>
                        <input type="text" id="otherCollectionSite" name="otherCollectionSite">
                    </div>
                    <div class="form-group">
                        <label for="fixativeAnticoagulant">Fixative/Anticoagulant Used:</label>
                        <SearchableSelectField id="fixativeAnticoagulant" name="fixativeAnticoagulant" required>
                            <option value="">Select</option>
                            <option value="edta">EDTA</option>
                            <option value="heparin">Heparin</option>
                            <option value="acd">Acid-Citrate-Dextrose</option>
                            <option value="formalin">Formalin (for core)</option>
                            <option value="other">Other</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group" id="otherFixativeGroup" style="display: none;">
                        <label for="otherFixative">Specify Other Fixative/Anticoagulant:</label>
                        <input type="text" id="otherFixative" name="otherFixative">
                    </div>
                    <div class="form-group full-width">
                        <label>Specimens Collected:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="wrightGiemsa" name="specimensCollected" value="wrightGiemsa">
                                <label for="wrightGiemsa">Wright-Giemsa Stained Smears</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="heStained" name="specimensCollected" value="heStained">
                                <label for="heStained">H&E Stained Slides</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="unstainedSlides" name="specimensCollected"
                                    value="unstained Slides">
                                <label for="unstainedSlides">Unstained Slides</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="coreBiopsy" name="specimensCollected" value="core Biopsy">
                                <label for="coreBiopsy">Core Biopsy</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="clotSectionCollected" name="specimensCollected"
                                    value="clot Section">
                                <label for="clotSectionCollected">Clot Section</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="flowCytometry" name="specimensCollected"
                                    value="flow Cytometry">
                                <label for="flowCytometry">Flow Cytometry</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cytogenetics" name="specimensCollected" value="cytogenetics">
                                <label for="cytogenetics">Cytogenetics</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="molecular" name="specimensCollected" value="molecular">
                                <label for="molecular">Molecular</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="collectionPerformedBy">Collection Performed By:</label>
                        <input type="text" id="collectionPerformedBy" name="collectionPerformedBy" required>
                    </div>
                    <div class="form-group">
                        <label for="collectionQuality">Collection Quality/Adequacy:</label>
                        <SearchableSelectField id="collectionQuality" name="collectionQuality" required>
                            <option value="">Select</option>
                            <option value="adequate">Adequate</option>
                            <option value="hemodiluted">Hemodiluted</option>
                            <option value="hypocellular">Hypocellular</option>
                            <option value="dryTap">Dry Tap</option>
                            <option value="other">Other</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group" id="otherQualityGroup" style="display: none;">
                        <label for="otherQuality">Specify Other Quality/Adequacy:</label>
                        <input type="text" id="otherQuality" name="otherQuality">
                    </div>
                </div>
            </section>

            <!-- Peripheral Blood Section -->
            <section id="peripheralBloodExam" class="form-section">
                <h2>PERIPHERAL BLOOD EXAMINATION</h2>
                <div class="form-grid">
                    <div>

                        <h3>CBC Results:</h3>
                        <div class="form-group">
                            <label for="wbcCount">WBC Count:</label>
                            <div class="input-with-unit">
                                <input type="number" id="wbcCount" name="wbcCount" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="rbcCount">RBC Count:</label>
                            <div class="input-with-unit">
                                <input type="number" id="rbcCount" name="rbcCount" step="0.1">
                                <span class="unit">× 10^12/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="hemoglobin">Hemoglobin:</label>
                            <div class="input-with-unit">
                                <input type="number" id="hemoglobin" name="hemoglobin" step="0.1">
                                <span class="unit">g/dL</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="hematocrit">Hematocrit:</label>
                            <div class="input-with-unit">
                                <input type="number" id="hematocrit" name="hematocrit" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="plateletCount">Platelet Count:</label>
                            <div class="input-with-unit">
                                <input type="number" id="plateletCount" name="plateletCount">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="mcv">MCV:</label>
                            <div class="input-with-unit">
                                <input type="number" id="mcv" name="mcv" step="0.1">
                                <span class="unit">fL</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="mch">MCH:</label>
                            <div class="input-with-unit">
                                <input type="number" id="mch" name="mch" step="0.1">
                                <span class="unit">pg</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="mchc">MCHC:</label>
                            <div class="input-with-unit">
                                <input type="number" id="mchc" name="mchc" step="0.1">
                                <span class="unit">g/dL</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="rdw">RDW:</label>
                            <div class="input-with-unit">
                                <input type="number" id="rdw" name="rdw" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="reticulocyteCount">Reticulocyte Count:</label>
                            <div class="input-with-unit">
                                <input type="number" id="reticulocyteCount" name="reticulocyteCount" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                    </div>

                    <div>

                        <h3>Differential Count:</h3>
                        <div class="form-group">
                            <label for="neutrophilsPercent">Neutrophils:</label>
                            <div class="input-with-unit">
                                <input type="number" id="neutrophilsPercent" name="neutrophilsPercent" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="neutrophilsAbsolute">Neutrophils (Absolute):</label>
                            <div class="input-with-unit">
                                <input type="number" id="neutrophilsAbsolute" name="neutrophilsAbsolute" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lymphocytesPercent">Lymphocytes:</label>
                            <div class="input-with-unit">
                                <input type="number" id="lymphocytesPercent" name="lymphocytesPercent" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lymphocytesAbsolute">Lymphocytes (Absolute):</label>
                            <div class="input-with-unit">
                                <input type="number" id="lymphocytesAbsolute" name="lymphocytesAbsolute" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="monocytesPercent">Monocytes:</label>
                            <div class="input-with-unit">
                                <input type="number" id="monocytesPercent" name="monocytesPercent" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="monocytesAbsolute">Monocytes (Absolute):</label>
                            <div class="input-with-unit">
                                <input type="number" id="monocytesAbsolute" name="monocytesAbsolute" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="eosinophilsPercent">Eosinophils:</label>
                            <div class="input-with-unit">
                                <input type="number" id="eosinophilsPercent" name="eosinophilsPercent" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="eosinophilsAbsolute">Eosinophils (Absolute):</label>
                            <div class="input-with-unit">
                                <input type="number" id="eosinophilsAbsolute" name="eosinophilsAbsolute" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="basophilsPercent">Basophils:</label>
                            <div class="input-with-unit">
                                <input type="number" id="basophilsPercent" name="basophilsPercent" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="basophilsAbsolute">Basophils (Absolute):</label>
                            <div class="input-with-unit">
                                <input type="number" id="basophilsAbsolute" name="basophilsAbsolute" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="blastsPercent">Blasts:</label>
                            <div class="input-with-unit">
                                <input type="number" id="blastsPercent" name="blastsPercent" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="blastsAbsolute">Blasts (Absolute):</label>
                            <div class="input-with-unit">
                                <input type="number" id="blastsAbsolute" name="blastsAbsolute" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="otherCellsPercent">Other Cells:</label>
                            <div class="input-with-unit">
                                <input type="number" id="otherCellsPercent" name="otherCellsPercent" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="otherCellsAbsolute">Other Cells (Absolute):</label>
                            <div class="input-with-unit">
                                <input type="number" id="otherCellsAbsolute" name="otherCellsAbsolute" step="0.1">
                                <span class="unit">× 10^9/L</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Blood Smear Morphology:</h3>
                        <div class="form-group full-width">
                            <label>RBC Morphology:</label>
                            <div class="checkbox-group">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="normocytic" name="rbcMorphology" value="normocytic">
                                    <label for="normocytic">Normocytic</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="microcytic" name="rbcMorphology" value="microcytic">
                                    <label for="microcytic">Microcytic</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="macrocytic" name="rbcMorphology" value="macrocytic">
                                    <label for="macrocytic">Macrocytic</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="anisocytosis" name="rbcMorphology" value="anisocytosis">
                                    <label for="anisocytosis">Anisocytosis</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="poikilocytosis" name="rbcMorphology"
                                        value="poikilocytosis">
                                    <label for="poikilocytosis">Poikilocytosis</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="polychromasia" name="rbcMorphology"
                                        value="polychromasia">
                                    <label for="polychromasia">Polychromasia</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="basophilicStippling" name="rbcMorphology"
                                        value="basophilic Stippling">
                                    <label for="basophilicStippling">Basophilic Stippling</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="howellJollyBodies" name="rbcMorphology"
                                        value="howell Jolly Bodies">
                                    <label for="howellJollyBodies">Howell-Jolly Bodies</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="otherRbcMorphology" name="rbcMorphology" value="other">
                                    <label for="otherRbcMorphology">Other</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="rbcDistribution">RBC Distribution:</label>
                            <SearchableSelectField id="rbcDistribution" name="rbcDistribution">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="rouleaux">Rouleaux</option>
                                <option value="agglutination">Agglutination</option>
                            </SearchableSelectField>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label>WBC Morphology:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="normalWbc" name="wbcMorphology" value="normal">
                                <label for="normalWbc">Normal</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="toxicGranulation" name="wbcMorphology"
                                    value="toxicGranulation">
                                <label for="toxicGranulation">Toxic Granulation</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="dohleBodies" name="wbcMorphology" value="dohleBodies">
                                <label for="dohleBodies">Döhle Bodies</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="hypersegmentedNeutrophils" name="wbcMorphology"
                                    value="hypersegmentedNeutrophils">
                                <label for="hypersegmentedNeutrophils">Hypersegmented Neutrophils</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="hyposegmentedNeutrophils" name="wbcMorphology"
                                    value="hyposegmentedNeutrophils">
                                <label for="hyposegmentedNeutrophils">Hyposegmented Neutrophils</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="otherWbcMorphology" name="wbcMorphology" value="other">
                                <label for="otherWbcMorphology">Other</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label>Lymphocyte Morphology:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="normalLymphocytes" name="lymphocyteMorphology"
                                    value="normal">
                                <label for="normalLymphocytes">Normal</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="reactiveLymphocytes" name="lymphocyteMorphology"
                                    value="reactive">
                                <label for="reactiveLymphocytes">Reactive</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="atypicalLymphocytes" name="lymphocyteMorphology"
                                    value="atypical">
                                <label for="atypicalLymphocytes">Atypical</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="abnormalLymphocytes" name="lymphocyteMorphology"
                                    value="abnormal">
                                <label for="abnormalLymphocytes">Abnormal</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label for="blastMorphology">Blast Morphology (if present):</label>
                        <textarea id="blastMorphology" name="blastMorphology" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label>Platelet Morphology:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="normalPlatelets" name="plateletMorphology" value="normal">
                                <label for="normalPlatelets">Normal</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="largePlatelets" name="plateletMorphology" value="large">
                                <label for="largePlatelets">Large</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="giantPlatelets" name="plateletMorphology" value="giant">
                                <label for="giantPlatelets">Giant</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="hypogranularPlatelets" name="plateletMorphology"
                                    value="hypogranular">
                                <label for="hypogranularPlatelets">Hypogranular</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="otherPlateletMorphology" name="plateletMorphology"
                                    value="other">
                                <label for="otherPlateletMorphology">Other</label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Bone Marrow Aspirate Examination Section -->
            <section id="boneMarrowAspirateExam" class="form-section">
                <h2>BONE MARROW ASPIRATE EXAMINATION</h2>
                <div class="form-grid">
                    <div>
                        <div class="form-group">
                            <label for="cellularity">Cellularity:</label>
                            <SearchableSelectField id="cellularity" name="cellularity">
                                <option value="">Select</option>
                                <option value="hypocellular">Hypocellular</option>
                                <option value="normocellular">Normocellular</option>
                                <option value="hypercellular">Hypercellular</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="cellularityPercentage">Cellularity Percentage:</label>
                            <div class="input-with-unit">
                                <input type="number" id="cellularityPercentage" name="cellularityPercentage" step="0.1">
                                <span class="unit">% of expected for age</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="particleNumber">Particle Number:</label>
                            <SearchableSelectField id="particleNumber" name="particleNumber">
                                <option value="">Select</option>
                                <option value="adequate">Adequate</option>
                                <option value="few">Few</option>
                                <option value="none">None</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="particleCellularity">Particle Cellularity:</label>
                            <SearchableSelectField id="particleCellularity" name="particleCellularity">
                                <option value="">Select</option>
                                <option value="cellular">Cellular</option>
                                <option value="hypocellular">Hypocellular</option>
                                <option value="acellular">Acellular</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="meRatio">M:E Ratio:</label>
                            <input type="text" id="meRatio" name="meRatio" placeholder="e.g., 3:1">
                        </div>
                    </div>

                    <div>

                        <h3>Erythroid Series:</h3>
                        <div class="form-group">
                            <label for="erythroidPercentage">Percentage:</label>
                            <div class="input-with-unit">
                                <input type="number" id="erythroidPercentage" name="erythroidPercentage" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="erythroidMaturation">Maturation:</label>
                            <SearchableSelectField id="erythroidMaturation" name="erythroidMaturation">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="leftShifted">Left-shifted</option>
                                <option value="megaloblastic">Megaloblastic</option>
                                <option value="dysplastic">Dysplastic</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group full-width">
                            <label for="erythroidDescription">Description:</label>
                            <textarea id="erythroidDescription" name="erythroidDescription" rows="3"></textarea>
                        </div>
                    </div>

                    <div>

                        <h3>Myeloid Series:</h3>
                        <div class="form-group">
                            <label for="myeloidPercentage">Percentage:</label>
                            <div class="input-with-unit">
                                <input type="number" id="myeloidPercentage" name="myeloidPercentage" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="myeloidMaturation">Maturation:</label>
                            <SearchableSelectField id="myeloidMaturation" name="myeloidMaturation">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="leftShifted">Left-shifted</option>
                                <option value="rightShifted">Right-shifted</option>
                                <option value="dysplastic">Dysplastic</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group full-width">
                            <label for="myeloidDescription">Description:</label>
                            <textarea id="myeloidDescription" name="myeloidDescription" rows="3"></textarea>
                        </div>
                    </div>



                    <div>
                        <h3>Megakaryocytes:</h3>
                        <div class="form-group">
                            <label for="megakaryocyteNumber">Number:</label>
                            <SearchableSelectField id="megakaryocyteNumber" name="megakaryocyteNumber">
                                <option value="">Select</option>
                                <option value="adequate">Adequate</option>
                                <option value="increased">Increased</option>
                                <option value="decreased">Decreased</option>
                                <option value="absent">Absent</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="megakaryocyteMorphology">Morphology:</label>
                            <SearchableSelectField id="megakaryocyteMorphology" name="megakaryocyteMorphology">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="hypolobated">Hypolobated</option>
                                <option value="hyperlobated">Hyperlobated</option>
                                <option value="dysplastic">Dysplastic</option>
                                <option value="micromegakaryocytes">Micromegakaryocytes</option>
                                <option value="other">Other</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group full-width">
                            <label for="megakaryocyteDescription">Description:</label>
                            <textarea id="megakaryocyteDescription" name="megakaryocyteDescription" rows="3"></textarea>
                        </div>
                    </div>

                    <div>
                        <h3>Lymphocytes:</h3>
                        <div class="form-group">
                            <label for="lymphocytePercentage">Percentage:</label>
                            <div class="input-with-unit">
                                <input type="number" id="lymphocytePercentage" name="lymphocytePercentage" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lymphocyteMorphology">Morphology:</label>
                            <SearchableSelectField id="lymphocyteMorphology" name="lymphocyteMorphology">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="atypical">Atypical</option>
                                <option value="abnormal">Abnormal</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="lymphocyteDistribution">Distribution:</label>
                            <SearchableSelectField id="lymphocyteDistribution" name="lymphocyteDistribution">
                                <option value="">Select</option>
                                <option value="diffuse">Diffuse</option>
                                <option value="nodular">Nodular</option>
                                <option value="interstitial">Interstitial</option>
                                <option value="paratrabecular">Paratrabecular</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group full-width">
                            <label for="lymphocyteDescription">Description:</label>
                            <textarea id="lymphocyteDescription" name="lymphocyteDescription" rows="3"></textarea>
                        </div>
                    </div>

                    <div>

                        <h3>Plasma Cells:</h3>
                        <div class="form-group">
                            <label for="plasmaCellPercentage">Percentage:</label>
                            <div class="input-with-unit">
                                <input type="number" id="plasmaCellPercentage" name="plasmaCellPercentage" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="plasmaCellMorphology">Morphology:</label>
                            <SearchableSelectField id="plasmaCellMorphology" name="plasmaCellMorphology">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="atypical">Atypical</option>
                                <option value="abnormal">Abnormal</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group full-width">
                            <label for="plasmaCellDescription">Description:</label>
                            <textarea id="plasmaCellDescription" name="plasmaCellDescription" rows="3"></textarea>
                        </div>

                    </div>

                    <div>

                        <h3>Blast Cells:</h3>
                        <div class="form-group">
                            <label for="blastPercentage">Percentage:</label>
                            <div class="input-with-unit">
                                <input type="number" id="blastPercentage" name="blastPercentage" step="0.1">
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="form-group full-width">
                            <label for="blastMorphology">Morphology:</label>
                            <textarea id="blastMorphology" name="blastMorphology" rows="3"></textarea>
                        </div>
                    </div>



                    <div class="form-group full-width">
                        <label for="otherCells">Other Cells:</label>
                        <textarea id="otherCells" name="otherCells" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="ironStores">Iron Stores:</label>
                        <SearchableSelectField id="ironStores" name="ironStores">
                            <option value="">Select</option>
                            <option value="absent">Absent</option>
                            <option value="1plus">1+</option>
                            <option value="2plus">2+</option>
                            <option value="3plus">3+</option>
                            <option value="4plus">4+</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="ringSideroblasts">Ring Sideroblasts:</label>
                        <SearchableSelectField id="ringSideroblasts" name="ringSideroblasts">
                            <option value="">Select</option>
                            <option value="absent">Absent</option>
                            <option value="present">Present</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group" id="ringSideroblastPercentageGroup" style="display: none;">
                        <label for="ringSideroblastPercentage">Ring Sideroblast Percentage:</label>
                        <div class="input-with-unit">
                            <input type="number" id="ringSideroblastPercentage" name="ringSideroblastPercentage"
                                step="0.1">
                            <span class="unit">%</span>
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label>Cytochemical Stains:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="myeloperoxidase" name="cytochemicalStains"
                                    value="myeloperoxidase">
                                <label for="myeloperoxidase">Myeloperoxidase</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="sudanBlackB" name="cytochemicalStains" value="sudanBlackB">
                                <label for="sudanBlackB">Sudan Black B</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="nonSpecificEsterase" name="cytochemicalStains"
                                    value="nonSpecificEsterase">
                                <label for="nonSpecificEsterase">Non-specific Esterase</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="specificEsterase" name="cytochemicalStains"
                                    value="specificEsterase">
                                <label for="specificEsterase">Specific Esterase</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="pas" name="cytochemicalStains" value="pas">
                                <label for="pas">PAS</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="ironStain" name="cytochemicalStains" value="ironStain">
                                <label for="ironStain">Iron Stain</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="otherCytochemical" name="cytochemicalStains" value="other">
                                <label for="otherCytochemical">Other</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label for="cytochemicalResults">Cytochemical Stain Results:</label>
                        <textarea id="cytochemicalResults" name="cytochemicalResults" rows="3"></textarea>
                    </div>
                </div>
            </section>

            <!-- Bone Marrow Biopsy Examination Section -->
            <section id="boneMarrowBiopsyExam" class="form-section">
                <h2>BONE MARROW BIOPSY EXAMINATION</h2>
                <div class="form-grid">
                    <div>
                        <div class="form-group">
                            <label for="biopsyDimensions">Biopsy Dimensions:</label>
                            <input type="text" id="biopsyDimensions" name="biopsyDimensions"
                                placeholder="e.g., 1.5 x 0.2 cm">
                        </div>
                        <div class="form-group">
                            <label for="biopsyAdequacy">Adequacy:</label>
                            <SearchableSelectField id="biopsyAdequacy" name="biopsyAdequacy">
                                <option value="">Select</option>
                                <option value="adequate">Adequate</option>
                                <option value="suboptimal">Suboptimal</option>
                                <option value="inadequate">Inadequate</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="biopsyCellularity">Overall Cellularity:</label>
                            <SearchableSelectField id="biopsyCellularity" name="biopsyCellularity">
                                <option value="">Select</option>
                                <option value="hypocellular">Hypocellular</option>
                                <option value="normocellular">Normocellular</option>
                                <option value="hypercellular">Hypercellular</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="biopsyCellularityPercentage">Cellularity Percentage:</label>
                            <div class="input-with-unit">
                                <input type="number" id="biopsyCellularityPercentage" name="biopsyCellularityPercentage"
                                    step="0.1">
                                <span class="unit">% of expected for age</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Hematopoietic Elements:</h3>
                        <div class="form-group">
                            <label for="erythroidPrecursors">Erythroid Precursors:</label>
                            <SearchableSelectField id="erythroidPrecursors" name="erythroidPrecursors">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="increased">Increased</option>
                                <option value="decreased">Decreased</option>
                                <option value="absent">Absent</option>
                                <option value="dysplastic">Dysplastic</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="myeloidPrecursors">Myeloid Precursors:</label>
                            <SearchableSelectField id="myeloidPrecursors" name="myeloidPrecursors">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="increased">Increased</option>
                                <option value="decreased">Decreased</option>
                                <option value="absent">Absent</option>
                                <option value="dysplastic">Dysplastic</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="biopsyMegakaryocytes">Megakaryocytes:</label>
                            <SearchableSelectField id="biopsyMegakaryocytes" name="biopsyMegakaryocytes">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="increased">Increased</option>
                                <option value="decreased">Decreased</option>
                                <option value="absent">Absent</option>
                                <option value="dysplastic">Dysplastic</option>
                            </SearchableSelectField>
                        </div>
                    </div>

                    <div>
                        <h3>Bone Architecture:</h3>
                        <div class="form-group">
                            <label for="trabeculae">Trabeculae:</label>
                            <SearchableSelectField id="trabeculae" name="trabeculae">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="thinned">Thinned</option>
                                <option value="thickened">Thickened</option>
                                <option value="fragmented">Fragmented</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="osteoblasts">Osteoblasts:</label>
                            <SearchableSelectField id="osteoblasts" name="osteoblasts">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="increased">Increased</option>
                                <option value="decreased">Decreased</option>
                            </SearchableSelectField>
                        </div>
                        <div class="form-group">
                            <label for="osteoclasts">Osteoclasts:</label>
                            <SearchableSelectField id="osteoclasts" name="osteoclasts">
                                <option value="">Select</option>
                                <option value="normal">Normal</option>
                                <option value="increased">Increased</option>
                                <option value="decreased">Decreased</option>
                            </SearchableSelectField>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="reticulinFibrosis">Reticulin Fibrosis:</label>
                        <SearchableSelectField id="reticulinFibrosis" name="reticulinFibrosis">
                            <option value="">Select</option>
                            <option value="MF-0">MF-0</option>
                            <option value="MF-1">MF-1</option>
                            <option value="MF-2">MF-2</option>
                            <option value="MF-3">MF-3</option>
                        </SearchableSelectField>
                    </div>

                    <div class="form-group">
                        <label for="abnormalInfiltrates">Abnormal Infiltrates:</label>
                        <SearchableSelectField id="abnormalInfiltrates" name="abnormalInfiltrates"
                            onchange="toggleInfiltratePattern()">
                            <option value="">Select</option>
                            <option value="none">None</option>
                            <option value="present">Present</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group" id="infiltratePatternGroup" style="display: none;">
                        <label for="infiltratePattern">Pattern of Infiltration:</label>
                        <SearchableSelectField id="infiltratePattern" name="infiltratePattern">
                            <option value="">Select</option>
                            <option value="diffuse">Diffuse</option>
                            <option value="nodular">Nodular</option>
                            <option value="interstitial">Interstitial</option>
                            <option value="paratrabecular">Paratrabecular</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group full-width">
                        <label for="infiltrateDescription">Description of Infiltrates:</label>
                        <textarea id="infiltrateDescription" name="infiltrateDescription" rows="3"></textarea>
                    </div>
                </div>
            </section>

            <section id="ancillaryStudies" class="form-section">
                <h2>ANCILLARY STUDIES</h2>

                <!-- Immunophenotypic Analysis -->
                <h3>IMMUNOPHENOTYPIC ANALYSIS</h3>
                <div class="form-grid">

                    <div class="form-group">
                        <label for="flowCytometry">Flow Cytometry:</label>
                        <SearchableSelectField id="flowCytometry" name="flowCytometry">
                            <option value="">Select</option>
                            <option value="performed">Performed</option>
                            <option value="notPerformed">Not Performed</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group full-width">
                        <label for="flowCytometryResults">Flow Cytometry Results:</label>
                        <textarea id="flowCytometryResults" name="flowCytometryResults" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="abnormalPopulation">Abnormal Population Identified:</label>
                        <SearchableSelectField id="abnormalPopulation" name="abnormalPopulation">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group full-width">
                        <label for="immunophenotype">Immunophenotype of Abnormal Population:</label>
                        <textarea id="immunophenotype" name="immunophenotype" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="mrdAnalysis">Minimal Residual Disease (MRD) Analysis:</label>
                        <SearchableSelectField id="mrdAnalysis" name="mrdAnalysis">
                            <option value="">Select</option>
                            <option value="performed">Performed</option>
                            <option value="notPerformed">Not Performed</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group full-width">
                        <label for="mrdResults">MRD Results:</label>
                        <textarea id="mrdResults" name="mrdResults" rows="3"></textarea>
                    </div>
                </div>

                <!-- Immunohistochemistry -->
                <h3>IMMUNOHISTOCHEMISTRY</h3>
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Immunohistochemical Stains Performed:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="cd3" name="ihcStains" value="cd3">
                                <label for="cd3">CD3</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cd5" name="ihcStains" value="cd5">
                                <label for="cd5">CD5</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cd10" name="ihcStains" value="cd10">
                                <label for="cd10">CD10</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cd20" name="ihcStains" value="cd20">
                                <label for="cd20">CD20</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cd34" name="ihcStains" value="cd34">
                                <label for="cd34">CD34</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cd61" name="ihcStains" value="cd61">
                                <label for="cd61">CD61</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cd117" name="ihcStains" value="cd117">
                                <label for="cd117">CD117</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="mpo" name="ihcStains" value="mpo">
                                <label for="mpo">MPO</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="tdt" name="ihcStains" value="tdt">
                                <label for="tdt">TdT</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="pax5" name="ihcStains" value="pax5">
                                <label for="pax5">PAX5</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="otherIhc" name="ihcStains" value="other">
                                <label for="otherIhc">Other</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label for="ihcResults">Immunohistochemical Stain Results:</label>
                        <textarea id="ihcResults" name="ihcResults" rows="3"></textarea>
                    </div>
                </div>

                <!-- Cytogenetic Studies -->
                <h3>CYTOGENETIC STUDIES</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="conventionalCytogenetics">Conventional Cytogenetics:</label>
                        <SearchableSelectField id="conventionalCytogenetics" name="conventionalCytogenetics">
                            <option value="">Select</option>
                            <option value="performed">Performed</option>
                            <option value="notPerformed">Not Performed</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group full-width">
                        <label for="karyotypeResults">Karyotype Results:</label>
                        <textarea id="karyotypeResults" name="karyotypeResults" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="fishStudies">FISH Studies:</label>
                        <SearchableSelectField id="fishStudies" name="fishStudies">
                            <option value="">Select</option>
                            <option value="performed">Performed</option>
                            <option value="notPerformed">Not Performed</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group full-width">
                        <label>FISH Probes Used:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="bcrAbl1" name="fishProbes" value="bcrAbl1">
                                <label for="bcrAbl1">BCR-ABL1</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="pmlRara" name="fishProbes" value="pmlRara">
                                <label for="pmlRara">PML-RARA</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="runx1Runx1t1" name="fishProbes" value="runx1Runx1t1">
                                <label for="runx1Runx1t1">RUNX1-RUNX1T1</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cbfbMyh11" name="fishProbes" value="cbfbMyh11">
                                <label for="cbfbMyh11">CBFB-MYH11</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="kmt2a" name="fishProbes" value="kmt2a">
                                <label for="kmt2a">KMT2A</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="otherFish" name="fishProbes" value="other">
                                <label for="otherFish">Other</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label for="fishResults">FISH Results:</label>
                        <textarea id="fishResults" name="fishResults" rows="3"></textarea>
                    </div>
                </div>

                <!-- Molecular Studies -->
                <h3>MOLECULAR STUDIES</h3>
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Molecular Tests Performed:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-item">
                                <input type="checkbox" id="flt3" name="molecularTests" value="flt3">
                                <label for="flt3">FLT3</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="npm1" name="molecularTests" value="npm1">
                                <label for="npm1">NPM1</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="cebpa" name="molecularTests" value="cebpa">
                                <label for="cebpa">CEBPA</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="idh" name="molecularTests" value="idh">
                                <label for="idh">IDH1/2</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="tp53" name="molecularTests" value="tp53">
                                <label for="tp53">TP53</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="asxl1" name="molecularTests" value="asxl1">
                                <label for="asxl1">ASXL1</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="runx1" name="molecularTests" value="runx1">
                                <label for="runx1">RUNX1</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="dnmt3a" name="molecularTests" value="dnmt3a">
                                <label for="dnmt3a">DNMT3A</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="tet2" name="molecularTests" value="tet2">
                                <label for="tet2">TET2</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="ngs" name="molecularTests" value="ngs">
                                <label for="ngs">Next-Generation Sequencing</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="pcr" name="molecularTests" value="pcr">
                                <label for="pcr">PCR</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="otherMolecular" name="molecularTests" value="other">
                                <label for="otherMolecular">Other</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label for="molecularResults">Molecular Results:</label>
                        <textarea id="molecularResults" name="molecularResults" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="variantAlleleFrequencies">Variant Allele Frequencies:</label>
                        <textarea id="variantAlleleFrequencies" name="variantAlleleFrequencies" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="molecularRisk">Molecular Risk Classification:</label>
                        <SearchableSelectField id="molecularRisk" name="molecularRisk">
                            <option value="">Select</option>
                            <option value="favorable">Favorable</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="adverse">Adverse</option>
                            <option value="notApplicable">Not Applicable</option>
                        </SearchableSelectField>
                    </div>
                </div>
            </section>


            <!-- Diagnosis & Classification Section -->
            <section id="diagnosisClassification" class="form-section">
                <h2>DIAGNOSIS & CLASSIFICATION</h2>
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label for="hematologicDiagnosis">Hematologic Diagnosis:</label>
                        <input type="text" id="hematologicDiagnosis" name="hematologicDiagnosis" list="icd10Codes">
                        <datalist id="icd10Codes">
                            <!-- ICD-10 codes will be populated dynamically -->
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="whoClassification">WHO Classification (2022):</label>
                        <SearchableSelectField id="whoClassification" name="whoClassification" onchange="updateWhoSubclassification()">
                            <option value="">Select</option>
                            <option value="aml">AML and Related Neoplasms</option>
                            <option value="mds">Myelodysplastic Neoplasms</option>
                            <option value="mpn">Myeloproliferative Neoplasms</option>
                            <option value="mdsMpn">Myelodysplastic/Myeloproliferative Neoplasms</option>
                            <option value="lymphoid">Lymphoid Neoplasms</option>
                            <option value="histiocytic">Histiocytic and Dendritic Cell Neoplasms</option>
                            <option value="mastocytosis">Mastocytosis</option>
                            <option value="ptld">Post-transplant Lymphoproliferative Disorders</option>
                            <option value="nonNeoplastic">Non-neoplastic Hematologic Disorder</option>
                            <option value="other">Other</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="whoSubclassification">Disease-Specific WHO Subclassification:</label>
                        <SearchableSelectField id="whoSubclassification" name="whoSubclassification">
                            <option value="">Select WHO Classification first</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="riskStratification">Risk Stratification (if applicable):</label>
                        <SearchableSelectField id="riskStratification" name="riskStratification">
                            <option value="">Select</option>
                            <option value="low">Low</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="high">High</option>
                            <option value="veryHigh">Very High</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="diseaseStatus">Disease Status:</label>
                        <SearchableSelectField id="diseaseStatus" name="diseaseStatus">
                            <option value="">Select</option>
                            <option value="newDiagnosis">New Diagnosis</option>
                            <option value="persistent">Persistent</option>
                            <option value="remission">Remission</option>
                            <option value="relapse">Relapse</option>
                            <option value="refractory">Refractory</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="mrdStatus">Minimal Residual Disease Status (if applicable):</label>
                        <SearchableSelectField id="mrdStatus" name="mrdStatus">
                            <option value="">Select</option>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                        </SearchableSelectField>
                    </div>
                    <div class="form-group">
                        <label for="mrdPercentage">MRD Percentage:</label>
                        <div class="input-with-unit">
                            <input type="number" id="mrdPercentage" name="mrdPercentage" step="0.01">
                            <span class="unit">%</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Interpretation & Clinical Correlation Section -->
            <section id="interpretationCorrelation" class="form-section">
                <h2>INTERPRETATION & CLINICAL CORRELATION</h2>
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label for="summaryFindings">Summary of Findings:</label>
                        <textarea id="summaryFindings" name="summaryFindings" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="clinicopathologicCorrelation">Clinicopathologic Correlation:</label>
                        <textarea id="clinicopathologicCorrelation" name="clinicopathologicCorrelation"
                            rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="comments">Comments:</label>
                        <textarea id="comments" name="comments" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="responseToTherapy">Response to Therapy (if applicable):</label>
                        <textarea id="responseToTherapy" name="responseToTherapy" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="diseaseProgression">Disease Progression/Evolution (if applicable):</label>
                        <textarea id="diseaseProgression" name="diseaseProgression" rows="3"></textarea>
                    </div>
                </div>
            </section>

            <!-- Recommendations Section -->
            <section id="recommendations" class="form-section">
                <h2>RECOMMENDATIONS</h2>
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label for="additionalStudies">Recommended Additional Studies:</label>
                        <textarea id="additionalStudies" name="additionalStudies" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="followUp">Recommended Follow-up:</label>
                        <textarea id="followUp" name="followUp" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="nextBoneMarrowEval">Timing of Next Bone Marrow Evaluation (if applicable):</label>
                        <textarea id="nextBoneMarrowEval" name="nextBoneMarrowEval" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label for="clinicalTrialEligibility">Clinical Trial Eligibility Considerations:</label>
                        <textarea id="clinicalTrialEligibility" name="clinicalTrialEligibility" rows="3"></textarea>
                    </div>
                </div>
            </section>


            <div class="form-actions">
                <button type="submit" class="btn-primary">Submit Report</button>
            </div>
        </form>
    </div>

    <script>
        // Form initialization and utility functions
        document.addEventListener('DOMContentLoaded', function () {
            // Set current date for report date
            const reportDate = document.getElementById('reportDate');
            if (reportDate) {
                const today = new Date().toISOString().split('T')[0];
                reportDate.value = today;
            }

            // Calculate age based on date of birth
            const dobInput = document.getElementById('dob');
            const ageInput = document.getElementById('age');

            if (dobInput && ageInput) {
                dobInput.addEventListener('change', function () {
                    const dob = new Date(this.value);
                    const today = new Date();
                    let age = today.getFullYear() - dob.getFullYear();
                    const monthDiff = today.getMonth() - dob.getMonth();

                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                        age--;
                    }

                    ageInput.value = age;
                });
            }

            // Toggle transfusion date visibility
            const recentTransfusion = document.getElementById('recentTransfusion');
            const transfusionDateContainer = document.getElementById('transfusionDateContainer');

            if (recentTransfusion && transfusionDateContainer) {
                recentTransfusion.addEventListener('change', function () {
                    transfusionDateContainer.style.display = this.checked ? 'block' : 'none';
                });
            }

            // Form validation
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    if (validateForm()) {
                        // Handle form submission
                        console.log('Form is valid, submitting...');
                        // Add your form submission logic here
                    }
                });
            }
        });

        // Form validation function
        function validateForm() {
            let isValid = true;
            const requiredFields = document.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    // Add error message if it doesn't exist
                    if (!field.nextElementSibling?.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage?.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });

            return isValid;
        }

        // Dynamic form section loading
        function loadFormSection(sectionName) {
            // Add your section loading logic here
            console.log(\`Loading section: \${sectionName}\`);
        }

        // Handle numeric input validation
        function validateNumericInput(input) {
            input.value = input.value.replace(/[^0-9.]/g, '');
            if (input.value.split('.').length > 2) {
                input.value = input.value.replace(/\.+$/, '');
            }
        }

        // Handle date input validation
        function validateDateInput(input) {
            const date = new Date(input.value);
            if (isNaN(date.getTime())) {
                input.classList.add('error');
                return false;
            }
            input.classList.remove('error');
            return true;
        }

        // // Export functions for use in other modules
        // export {
        //     validateForm,
        //     loadFormSection,
        //     validateNumericInput,
        //     validateDateInput
        // };

        function extractHematopathologyFormData() {
            const form = document.getElementById('hematopathologyForm');
            if (!form) {
                console.error('Form not found');
                return null;
            }

            // Initialize the data object with main sections
            const formData = {
                patientInformation: {},
                specimenInformation: {},
                peripheralBloodExam: {
                    cbcResults: {},
                    differentialCount: {},
                    bloodSmearMorphology: {
                        rbcMorphology: [],
                        wbcMorphology: [],
                        lymphocyteMorphology: [],
                        plateletMorphology: []
                    }
                },
                boneMarrowAspirateExam: {
                    cellularity: {},
                    erythroidSeries: {},
                    myeloidSeries: {},
                    megakaryocytes: {},
                    lymphocytes: {},
                    plasmaCells: {},
                    blastCells: {},
                    ironStores: {},
                    cytochemicalStains: []
                },
                boneMarrowBiopsyExam: {
                    biopsyDetails: {},
                    hematopoieticElements: {},
                    boneArchitecture: {},
                    abnormalInfiltrates: {}
                },
                ancillaryStudies: {
                    immunophenotypicAnalysis: {},
                    immunohistochemistry: {
                        stainsPerformed: [],
                        results: ''
                    },
                    cytogeneticStudies: {
                        conventionalCytogenetics: {},
                        fishStudies: {
                            probesUsed: [],
                            results: ''
                        }
                    },
                    molecularStudies: {
                        testsPerformed: [],
                        results: '',
                        variantAlleleFrequencies: ''
                    }
                },
                diagnosisClassification: {},
                interpretationCorrelation: {},
                recommendations: {}
            };

            // Helper function to get checkbox values
            function getCheckboxValues(name) {
                const checkboxes = document.querySelectorAll(\`input[name="\${name}"]:checked\`);
                return Array.from(checkboxes).map(cb => cb.value);
            }

            // Helper function to get input value with error handling
            function getInputValue(id) {
                const element = document.getElementById(id);
                return element ? element.value : '';
            }

            // Extract Patient Information
            // formData.patientInformation = {
            //     patientName: getInputValue('patientName'),
            //     patientId: getInputValue('patientId'),
            //     dob: getInputValue('dob'),
            //     gender: getInputValue('gender'),
            //     age: getInputValue('age'),
            //     referringPhysician: getInputValue('referringPhysician'),
            //     clinicalHistory: getInputValue('clinicalHistory'),
            //     priorDiagnoses: getInputValue('priorDiagnoses'),
            //     currentMedications: getInputValue('currentMedications'),
            //     recentTransfusions: getInputValue('recentTransfusions'),
            //     transfusionDate: getInputValue('transfusionDate')
            // };

            // Extract Specimen Information
            formData.specimenInformation = {
                accessionNumber: getInputValue('accessionNumber'),
                collectionDateTime: getInputValue('collectionDateTime'),
                reportDate: getInputValue('reportDate'),
                specimenType: getCheckboxValues('specimenType'),
                collectionSite: getInputValue('collectionSite'),
                otherCollectionSite: getInputValue('otherCollectionSite'),
                fixativeAnticoagulant: getInputValue('fixativeAnticoagulant'),
                otherFixative: getInputValue('otherFixative'),
                specimensCollected: getCheckboxValues('specimensCollected'),
                collectionPerformedBy: getInputValue('collectionPerformedBy'),
                collectionQuality: getInputValue('collectionQuality'),
                otherQuality: getInputValue('otherQuality')
            };

            // Extract CBC Results
            formData.peripheralBloodExam.cbcResults = {
                wbcCount: getInputValue('wbcCount'),
                rbcCount: getInputValue('rbcCount'),
                hemoglobin: getInputValue('hemoglobin'),
                hematocrit: getInputValue('hematocrit'),
                plateletCount: getInputValue('plateletCount'),
                mcv: getInputValue('mcv'),
                mch: getInputValue('mch'),
                mchc: getInputValue('mchc'),
                rdw: getInputValue('rdw'),
                reticulocyteCount: getInputValue('reticulocyteCount')
            };

            // Extract Differential Count
            formData.peripheralBloodExam.differentialCount = {
                neutrophilsPercent: getInputValue('neutrophilsPercent'),
                neutrophilsAbsolute: getInputValue('neutrophilsAbsolute'),
                lymphocytesPercent: getInputValue('lymphocytesPercent'),
                lymphocytesAbsolute: getInputValue('lymphocytesAbsolute'),
                monocytesPercent: getInputValue('monocytesPercent'),
                monocytesAbsolute: getInputValue('monocytesAbsolute'),
                eosinophilsPercent: getInputValue('eosinophilsPercent'),
                eosinophilsAbsolute: getInputValue('eosinophilsAbsolute'),
                basophilsPercent: getInputValue('basophilsPercent'),
                basophilsAbsolute: getInputValue('basophilsAbsolute'),
                blastsPercent: getInputValue('blastsPercent'),
                blastsAbsolute: getInputValue('blastsAbsolute'),
                otherCellsPercent: getInputValue('otherCellsPercent'),
                otherCellsAbsolute: getInputValue('otherCellsAbsolute')
            };

            // Extract Blood Smear Morphology
            formData.peripheralBloodExam.bloodSmearMorphology = {
                rbcMorphology: getCheckboxValues('rbcMorphology'),
                rbcDistribution: getInputValue('rbcDistribution'),
                wbcMorphology: getCheckboxValues('wbcMorphology'),
                lymphocyteMorphology: getCheckboxValues('lymphocyteMorphology'),
                blastMorphology: getInputValue('blastMorphology'),
                plateletMorphology: getCheckboxValues('plateletMorphology')
            };

            // Extract Bone Marrow Aspirate Examination
            formData.boneMarrowAspirateExam = {
                cellularity: {
                    cellularity: getInputValue('cellularity'),
                    cellularityPercentage: getInputValue('cellularityPercentage'),
                    particleNumber: getInputValue('particleNumber'),
                    particleCellularity: getInputValue('particleCellularity'),
                    meRatio: getInputValue('meRatio')
                },
                erythroidSeries: {
                    percentage: getInputValue('erythroidPercentage'),
                    maturation: getInputValue('erythroidMaturation'),
                    description: getInputValue('erythroidDescription')
                },
                myeloidSeries: {
                    percentage: getInputValue('myeloidPercentage'),
                    maturation: getInputValue('myeloidMaturation'),
                    description: getInputValue('myeloidDescription')
                },
                megakaryocytes: {
                    number: getInputValue('megakaryocyteNumber'),
                    morphology: getInputValue('megakaryocyteMorphology'),
                    description: getInputValue('megakaryocyteDescription')
                },
                lymphocytes: {
                    percentage: getInputValue('lymphocytePercentage'),
                    morphology: getInputValue('lymphocyteMorphology'),
                    distribution: getInputValue('lymphocyteDistribution'),
                    description: getInputValue('lymphocyteDescription')
                },
                plasmaCells: {
                    percentage: getInputValue('plasmaCellPercentage'),
                    morphology: getInputValue('plasmaCellMorphology'),
                    description: getInputValue('plasmaCellDescription')
                },
                blastCells: {
                    percentage: getInputValue('blastPercentage'),
                    morphology: getInputValue('blastMorphology')
                },
                ironStores: {
                    ironStores: getInputValue('ironStores'),
                    ringSideroblasts: getInputValue('ringSideroblasts'),
                    ringSideroblastPercentage: getInputValue('ringSideroblastPercentage')
                },
                cytochemicalStains: getCheckboxValues('cytochemicalStains'),
                cytochemicalResults: getInputValue('cytochemicalResults')
            };

            // Extract Diagnosis & Classification
            formData.diagnosisClassification = {
                hematologicDiagnosis: getInputValue('hematologicDiagnosis'),
                whoClassification: getInputValue('whoClassification'),
                whoSubclassification: getInputValue('whoSubclassification'),
                riskStratification: getInputValue('riskStratification'),
                diseaseStatus: getInputValue('diseaseStatus'),
                mrdStatus: getInputValue('mrdStatus'),
                mrdPercentage: getInputValue('mrdPercentage')
            };

            // Extract Interpretation & Clinical Correlation
            formData.interpretationCorrelation = {
                summaryFindings: getInputValue('summaryFindings'),
                clinicopathologicCorrelation: getInputValue('clinicopathologicCorrelation'),
                comments: getInputValue('comments'),
                responseToTherapy: getInputValue('responseToTherapy'),
                diseaseProgression: getInputValue('diseaseProgression')
            };

            // Extract Recommendations
            formData.recommendations = {
                additionalStudies: getInputValue('additionalStudies'),
                followUp: getInputValue('followUp'),
                nextBoneMarrowEval: getInputValue('nextBoneMarrowEval'),
                clinicalTrialEligibility: getInputValue('clinicalTrialEligibility')
            };

            return formData;
        }

        function submitHematoForm() {

            $.ajax({
                url: '<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'processLabTemplate', $requestLab->id, $patientVisit->id, $template]) -->',
                type: 'POST',
                data: extractHematopathologyFormData(),
                success: function(response) {
                    alertify.log(response);
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
        }

        document.getElementById('hematopathologyForm').addEventListener('submit', function(event) {
            event.preventDefault();
            submitHematoForm();
            $('#labRequestResultDialog').modal("hide");
        });
    </script>
</div>

`;

export default function ElementElementRequestLabsHematopathology() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
