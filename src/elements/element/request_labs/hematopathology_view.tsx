const rawHtml = `
<style>
    .report-container {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background: #fff;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }

    .report-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #3498db;
    }

    .report-header h1 {
        color: #2c3e50;
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    .report-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
    }

    .report-section h2 {
        color: #2c3e50;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #dee2e6;
    }

    .report-section h3 {
        color: #3498db;
        font-size: 1.2rem;
        margin: 1rem 0;
    }

    .data-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

    .data-item {
        margin-bottom: 0.5rem;
    }

    .data-label {
        font-weight: 600;
        color: #495057;
        margin-bottom: 0.25rem;
    }

    .data-value {
        color: #212529;
    }

    .checkbox-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .checkbox-list li {
        display: inline-block;
        margin-right: 1rem;
        margin-bottom: 0.5rem;
        padding: 0.25rem 0.5rem;
        background: #e9ecef;
        border-radius: 4px;
    }

    .text-block {
        white-space: pre-wrap;
        background: #fff;
        padding: 1rem;
        border-radius: 4px;
        border: 1px solid #dee2e6;
    }

    .unit {
        color: #6c757d;
        font-size: 0.875rem;
        margin-left: 0.25rem;
    }

    @media print {
        .report-container {
            box-shadow: none;
            margin: 0;
            padding: 1rem;
        }

        .report-section {
            break-inside: avoid;
            background: none;
            border: 1px solid #dee2e6;
        }
    }
</style>

<div class="report-container">
    <div class="report-header">
        <h1>HEMATOPATHOLOGY LABORATORY REPORT</h1>
        <p>Report Date: <!-- php: = h($data['specimenInformation']['reportDate']) --></p>
    </div>

    <!-- Specimen Information -->
    <div class="report-section">
        <h2>SPECIMEN INFORMATION</h2>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Accession Number</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['accessionNumber']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Collection Date/Time</div>
                <div class="data-value"><!-- php: = h($data['specimenInformation']['collectionDateTime']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Collection Site</div>
                <div class="data-value">
                    <!-- php: = h($data['specimenInformation']['collectionSite']) -->
                    <!-- php: if (!empty($data['specimenInformation']['otherCollectionSite'])): -->
                        (<!-- php: = h($data['specimenInformation']['otherCollectionSite']) -->)
                    <!-- php: endif; -->
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Specimen Type</div>
                <div class="data-value">
                    <ul class="checkbox-list">
                        <!-- php: foreach ($data['specimenInformation']['specimenType'] as $type): -->
                            <li><!-- php: = h($type) --></li>
                        <!-- php: endforeach; -->
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Peripheral Blood Examination -->
    <div class="report-section">
        <h2>PERIPHERAL BLOOD EXAMINATION</h2>
        
        <!-- CBC Results -->
        <h3>CBC Results</h3>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">WBC Count</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['cbcResults']['wbcCount']) -->
                    <span class="unit">× 10^9/L</span>
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">RBC Count</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['cbcResults']['rbcCount']) -->
                    <span class="unit">× 10^12/L</span>
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Hemoglobin</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['cbcResults']['hemoglobin']) -->
                    <span class="unit">g/dL</span>
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Hematocrit</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['cbcResults']['hematocrit']) -->
                    <span class="unit">%</span>
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Platelet Count</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['cbcResults']['plateletCount']) -->
                    <span class="unit">× 10^9/L</span>
                </div>
            </div>
        </div>

        <!-- Differential Count -->
        <h3>Differential Count</h3>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Neutrophils</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['differentialCount']['neutrophilsPercent']) -->%
                    (<!-- php: = h($data['peripheralBloodExam']['differentialCount']['neutrophilsAbsolute']) --> × 10^9/L)
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Lymphocytes</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['differentialCount']['lymphocytesPercent']) -->%
                    (<!-- php: = h($data['peripheralBloodExam']['differentialCount']['lymphocytesAbsolute']) --> × 10^9/L)
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Monocytes</div>
                <div class="data-value">
                    <!-- php: = h($data['peripheralBloodExam']['differentialCount']['monocytesPercent']) -->%
                    (<!-- php: = h($data['peripheralBloodExam']['differentialCount']['monocytesAbsolute']) --> × 10^9/L)
                </div>
            </div>
        </div>

        <!-- Blood Smear Morphology -->
        <h3>Blood Smear Morphology</h3>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">RBC Morphology</div>
                <div class="data-value">
                    <ul class="checkbox-list">
                        <!-- php: foreach ($data['peripheralBloodExam']['bloodSmearMorphology']['rbcMorphology'] as $morphology): -->
                            <li><!-- php: = h($morphology) --></li>
                        <!-- php: endforeach; -->
                    </ul>
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">WBC Morphology</div>
                <div class="data-value">
                    <ul class="checkbox-list">
                        <!-- php: foreach ($data['peripheralBloodExam']['bloodSmearMorphology']['wbcMorphology'] as $morphology): -->
                            <li><!-- php: = h($morphology) --></li>
                        <!-- php: endforeach; -->
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Bone Marrow Aspirate Examination -->
    <div class="report-section">
        <h2>BONE MARROW ASPIRATE EXAMINATION</h2>
        
        <!-- Cellularity -->
        <h3>Cellularity</h3>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Overall Cellularity</div>
                <div class="data-value"><!-- php: = h($data['boneMarrowAspirateExam']['cellularity']['cellularity']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Cellularity Percentage</div>
                <div class="data-value">
                    <!-- php: = h($data['boneMarrowAspirateExam']['cellularity']['cellularityPercentage']) -->
                    <span class="unit">% of expected for age</span>
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">M:E Ratio</div>
                <div class="data-value"><!-- php: = h($data['boneMarrowAspirateExam']['cellularity']['meRatio']) --></div>
            </div>
        </div>

        <!-- Erythroid Series -->
        <h3>Erythroid Series</h3>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Percentage</div>
                <div class="data-value">
                    <!-- php: = h($data['boneMarrowAspirateExam']['erythroidSeries']['percentage']) -->
                    <span class="unit">%</span>
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Maturation</div>
                <div class="data-value"><!-- php: = h($data['boneMarrowAspirateExam']['erythroidSeries']['maturation']) --></div>
            </div>
        </div>
        <div class="data-item">
            <div class="data-label">Description</div>
            <div class="data-value text-block"><!-- php: = h($data['boneMarrowAspirateExam']['erythroidSeries']['description']) --></div>
        </div>
    </div>

    <!-- Diagnosis & Classification -->
    <div class="report-section">
        <h2>DIAGNOSIS & CLASSIFICATION</h2>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Hematologic Diagnosis</div>
                <div class="data-value"><!-- php: = h($data['diagnosisClassification']['hematologicDiagnosis']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">WHO Classification</div>
                <div class="data-value"><!-- php: = h($data['diagnosisClassification']['whoClassification']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Disease Status</div>
                <div class="data-value"><!-- php: = h($data['diagnosisClassification']['diseaseStatus']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Risk Stratification</div>
                <div class="data-value"><!-- php: = h($data['diagnosisClassification']['riskStratification']) --></div>
            </div>
        </div>
    </div>

    <!-- Interpretation & Clinical Correlation -->
    <div class="report-section">
        <h2>INTERPRETATION & CLINICAL CORRELATION</h2>
        <div class="data-item">
            <div class="data-label">Summary of Findings</div>
            <div class="data-value text-block"><!-- php: = h($data['interpretationCorrelation']['summaryFindings']) --></div>
        </div>
        <div class="data-item">
            <div class="data-label">Clinicopathologic Correlation</div>
            <div class="data-value text-block"><!-- php: = h($data['interpretationCorrelation']['clinicopathologicCorrelation']) --></div>
        </div>
    </div>

    <!-- Recommendations -->
    <div class="report-section">
        <h2>RECOMMENDATIONS</h2>
        <div class="data-item">
            <div class="data-label">Additional Studies</div>
            <div class="data-value text-block"><!-- php: = h($data['recommendations']['additionalStudies']) --></div>
        </div>
        <div class="data-item">
            <div class="data-label">Follow-up</div>
            <div class="data-value text-block"><!-- php: = h($data['recommendations']['followUp']) --></div>
        </div>
    </div>
</div> 
`;

export default function ElementElementRequestLabsHematopathologyView() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
