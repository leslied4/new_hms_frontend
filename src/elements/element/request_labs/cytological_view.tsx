const rawHtml = `
<style>
    .cytology-report {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        line-height: 1.6;
    }

    .report-header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #333;
        padding-bottom: 20px;
    }

    .report-header h1 {
        color: #2c3e50;
        margin-bottom: 10px;
    }

    .report-section {
        margin-bottom: 25px;
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section-title {
        color: #2c3e50;
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
    }

    .data-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .data-item {
        margin-bottom: 10px;
    }

    .data-label {
        font-weight: bold;
        color: #555;
        margin-bottom: 3px;
    }

    .data-value {
        color: #333;
    }

    .checkbox-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .checkbox-list li {
        margin-bottom: 5px;
        padding-left: 20px;
        position: relative;
    }

    .checkbox-list li:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #27ae60;
    }

    .full-width {
        grid-column: 1 / -1;
    }

    .text-block {
        white-space: pre-wrap;
        background-color: white;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }

    .report-footer {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        text-align: right;
        font-size: 0.9em;
        color: #666;
    }

    @media print {
        .cytology-report {
            box-shadow: none;
        }
        
        .report-section {
            break-inside: avoid;
            box-shadow: none;
        }
    }
</style>

<div class="cytology-report">
    <div class="report-header">
        <h1>Cytology Laboratory Report</h1>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Accession Number:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['accessionNumber']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Report Date:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['reportDate']) --></div>
            </div>
        </div>
    </div>

    <!-- Specimen Information Section -->
    <div class="report-section">
        <div class="section-title">Specimen Information</div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Collection Date:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['collectionDate']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Specimen Type:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['specimenType']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Collection Site:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['collectionSite']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Procedure:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['procedure']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Collected By:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['collectedBy']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Fixative Used:</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['fixative']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Clinical Indication:</div>
                <div class="text-block"><!-- php: = h($data['specimenInformation']['clinicalIndication']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Previous Results:</div>
                <div class="text-block"><!-- php: = h($data['specimenInformation']['previousResults']) --></div>
            </div>
        </div>
    </div>

    <!-- Specimen Processing Section -->
    <div class="report-section">
        <div class="section-title">Specimen Processing</div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Preparation Technique:</div>
                <div class="data-value"><!-- php: = h($data['specimenProcessing']['preparationTechnique']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Staining Method:</div>
                <div class="data-value"><!-- php: = h($data['specimenProcessing']['stainingMethod']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Special Processing:</div>
                <div class="data-value"><!-- php: = h($data['specimenProcessing']['specialProcessing']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Cell Block:</div>
                <div class="data-value"><!-- php: = h($data['specimenProcessing']['cellBlock']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Rapid On-Site Evaluation (ROSE):</div>
                <div class="data-value"><!-- php: = h($data['specimenProcessing']['rose']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">ROSE Results:</div>
                <div class="text-block"><!-- php: = h($data['specimenProcessing']['roseResults']) --></div>
            </div>
        </div>
    </div>

    <!-- Microscopic Examination Section -->
    <div class="report-section">
        <div class="section-title">Microscopic Examination</div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Specimen Adequacy:</div>
                <div class="data-value"><!-- php: = h($data['microscopicExamination']['adequacy']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Cellularity:</div>
                <div class="data-value"><!-- php: = h($data['microscopicExamination']['cellularity']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Background:</div>
                <div class="data-value"><!-- php: = h($data['microscopicExamination']['background']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Cell Morphology:</div>
                <div class="data-value"><!-- php: = h($data['microscopicExamination']['cellMorphology']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Cellular Arrangement:</div>
                <div class="data-value"><!-- php: = h($data['microscopicExamination']['cellularArrangement']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Microorganisms:</div>
                <div class="data-value"><!-- php: = h($data['microscopicExamination']['microorganisms']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Cellular Pattern:</div>
                <div class="text-block"><!-- php: = h($data['microscopicExamination']['cellularPattern']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Nuclear Features:</div>
                <div class="text-block"><!-- php: = h($data['microscopicExamination']['nuclearFeatures']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Cytoplasmic Features:</div>
                <div class="text-block"><!-- php: = h($data['microscopicExamination']['cytoplasmicFeatures']) --></div>
            </div>
        </div>
    </div>

    <!-- Specific Classifications Section -->
    <div class="report-section">
        <div class="section-title">Specific Classifications</div>
        <!-- php: if ($data['specimenInformation']['specimenType'] === 'papSmear'): -->
            <div class="data-grid">
                <div class="data-item">
                    <div class="data-label">Bethesda Classification:</div>
                    <div class="data-value"><!-- php: = h($data['specificClassifications']['papSmear']['bethesdaClassification']) --></div>
                </div>
                <div class="data-item">
                    <div class="data-label">Endocervical Component:</div>
                    <div class="data-value"><!-- php: = h($data['specificClassifications']['papSmear']['endocervicalComponent']) --></div>
                </div>
                <div class="data-item">
                    <div class="data-label">Hormonal Evaluation:</div>
                    <div class="data-value"><!-- php: = h($data['specificClassifications']['papSmear']['hormonalEvaluation']) --></div>
                </div>
                <!-- php: if (!empty($data['specificClassifications']['papSmear']['epithelialAbnormalities'])): -->
                    <div class="data-item full-width">
                        <div class="data-label">Epithelial Cell Abnormalities:</div>
                        <ul class="checkbox-list">
                            <!-- php: foreach ($data['specificClassifications']['papSmear']['epithelialAbnormalities'] as $abnormality): -->
                                <li><!-- php: = h($abnormality) --></li>
                            <!-- php: endforeach; -->
                        </ul>
                    </div>
                <!-- php: endif; -->
            </div>
        <!-- php: endif; -->

        <!-- php: if ($data['specimenInformation']['specimenType'] === 'fna'): -->
            <div class="data-grid">
                <div class="data-item full-width">
                    <div class="data-label">Descriptive Diagnosis:</div>
                    <div class="text-block"><!-- php: = h($data['specificClassifications']['fna']['descriptiveDiagnosis']) --></div>
                </div>
                <div class="data-item">
                    <div class="data-label">Milan System:</div>
                    <div class="data-value"><!-- php: = h($data['specificClassifications']['fna']['milanSystem']) --></div>
                </div>
                <div class="data-item">
                    <div class="data-label">Bethesda Thyroid:</div>
                    <div class="data-value"><!-- php: = h($data['specificClassifications']['fna']['bethesdaThyroid']) --></div>
                </div>
                <div class="data-item">
                    <div class="data-label">IAC Yokohama System:</div>
                    <div class="data-value"><!-- php: = h($data['specificClassifications']['fna']['iacYokohama']) --></div>
                </div>
            </div>
        <!-- php: endif; -->

        <!-- php: if ($data['specimenInformation']['specimenType'] === 'bodyFluid'): -->
            <div class="data-grid">
                <!-- php: if (!empty($data['specificClassifications']['bodyFluid']['cellTypes'])): -->
                    <div class="data-item full-width">
                        <div class="data-label">Cell Types Present:</div>
                        <ul class="checkbox-list">
                            <!-- php: foreach ($data['specificClassifications']['bodyFluid']['cellTypes'] as $cellType): -->
                                <li><!-- php: = h($cellType) --></li>
                            <!-- php: endforeach; -->
                        </ul>
                    </div>
                <!-- php: endif; -->
                <div class="data-item">
                    <div class="data-label">Atypical/Malignant Cells:</div>
                    <div class="data-value"><!-- php: = h($data['specificClassifications']['bodyFluid']['atypicalCells']) --></div>
                </div>
            </div>
        <!-- php: endif; -->
    </div>

    <!-- Diagnosis & Interpretation Section -->
    <div class="report-section">
        <div class="section-title">Diagnosis & Interpretation</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">Primary Diagnosis:</div>
                <div class="text-block"><!-- php: = h($data['diagnosisAndInterpretation']['primaryDiagnosis']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Diagnostic Category:</div>
                <div class="data-value"><!-- php: = h($data['diagnosisAndInterpretation']['diagnosticCategory']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Additional Findings:</div>
                <div class="text-block"><!-- php: = h($data['diagnosisAndInterpretation']['additionalFindings']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Differential Diagnosis:</div>
                <div class="text-block"><!-- php: = h($data['diagnosisAndInterpretation']['differentialDiagnosis']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Clinical Correlation:</div>
                <div class="text-block"><!-- php: = h($data['diagnosisAndInterpretation']['clinicalCorrelation']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Previous Correlation:</div>
                <div class="text-block"><!-- php: = h($data['diagnosisAndInterpretation']['previousCorrelation']) --></div>
            </div>
        </div>
    </div>

    <!-- Recommendations Section -->
    <div class="report-section">
        <div class="section-title">Recommendations</div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Suggested Follow-up:</div>
                <div class="data-value"><!-- php: = h($data['recommendations']['followUp']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Recommended Time Frame:</div>
                <div class="data-value"><!-- php: = h($data['recommendations']['timeFrame']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Additional Testing Recommended:</div>
                <div class="text-block"><!-- php: = h($data['recommendations']['additionalTesting']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Comments:</div>
                <div class="text-block"><!-- php: = h($data['recommendations']['comments']) --></div>
            </div>
        </div>
    </div>

    <div class="report-footer">
        <p>Report generated on: <!-- php: = date('Y-m-d H:i:s') --></p>
    </div>
</div> 
`;

export default function ElementElementRequestLabsCytologicalView() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
