const rawHtml = `
<style>
    .biopsy-report {
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        line-height: 1.6;
    }

    .biopsy-report .report-header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #333;
        padding-bottom: 20px;
    }

    .biopsy-report .report-section {
        margin-bottom: 25px;
        page-break-inside: avoid;
    }

    .biopsy-report .section-title {
        background-color: #f5f5f5;
        padding: 10px;
        font-weight: bold;
        border-left: 4px solid #2c3e50;
        margin-bottom: 15px;
    }

    .biopsy-report .data-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 15px;
    }

    .biopsy-report .data-item {
        margin-bottom: 10px;
    }

    .biopsy-report .data-label {
        font-weight: bold;
        color: #555;
        margin-bottom: 5px;
    }

    .biopsy-report .data-value {
        padding: 5px;
        background-color: #f9f9f9;
        border-radius: 4px;
        min-height: 25px;
    }

    .biopsy-report .full-width {
        grid-column: 1 / -1;
    }

    .biopsy-report .checkbox-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .biopsy-report .checkbox-item {
        background-color: #f9f9f9;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.9em;
    }

    .biopsy-report . {
        /* background-color: #f9f9f9;
        padding: 10px;
        border-radius: 4px;
        margin-top: 5px;
        white-space: pre-wrap; */
    }

    .biopsy-report .staging-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 15px;
    }

    .biopsy-report .staging-item {
        text-align: center;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 4px;
    }

    .biopsy-report .staging-label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    @media print {
        .biopsy-report .biopsy-report {
            padding: 0;
        }

        .biopsy-report .report-section {
            page-break-inside: avoid;
        }

        .biopsy-report .section-title {
            background-color: #f5f5f5 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
    }
</style>

<div class="biopsy-report">


    <!-- Specimen Information -->
    <div class="report-section">
        <div class="section-title">Specimen Information</div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Collection Date</div>
                <div class="data-value" id="collectionDate"><!-- php: = h($reportData['specimenInformation']['collectionDate']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Specimen Type</div>
                <div class="data-value" id="specimenType"><!-- php: = h($reportData['specimenInformation']['specimenType']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Biopsy Site</div>
                <div class="data-value" id="biopsySite"><!-- php: = h($reportData['specimenInformation']['biopsySite']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Procedure</div>
                <div class="data-value" id="procedure"><!-- php: = h($reportData['specimenInformation']['procedure']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Clinical Indication</div>
                <div class="" id="clinicalIndication"><!-- php: = h($reportData['specimenInformation']['clinicalIndication']) --></div>
            </div>
        </div>
    </div>

    <!-- Grossing Workflow -->
    <div class="report-section">
        <div class="section-title">Grossing Workflow</div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Specimen Dimensions</div>
                <div class="data-value" id="specimenDimensions"><!-- php: = h($reportData['grossingWorkflow']['specimenDimensions']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Specimen Weight</div>
                <div class="data-value" id="specimenWeight"><!-- php: = h($reportData['grossingWorkflow']['specimenWeight']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Color & Consistency</div>
                <div class="data-value" id="colorConsistency"><!-- php: = h($reportData['grossingWorkflow']['colorConsistency']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Specimen Description</div>
                <div class="" id="specimenDescription"><!-- php: = h($reportData['grossingWorkflow']['specimenDescription']) --></div>
            </div>
        </div>
    </div>

    <!-- Microscopic Examination -->
    <div class="report-section">
        <div class="section-title">Microscopic Examination</div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Tissue Type</div>
                <div class="data-value" id="tissueType"><!-- php: = h($reportData['microscopicExamination']['tissueType']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Histologic Type</div>
                <div class="data-value" id="histologicType"><!-- php: = h($reportData['microscopicExamination']['histologicType']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Tumor Grade</div>
                <div class="data-value" id="tumorGrade"><!-- php: = h($reportData['microscopicExamination']['tumorGrade']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Tumor Size</div>
                <div class="data-value" id="tumorSize"><!-- php: = h($reportData['microscopicExamination']['tumorSize']) --></div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Histological Findings</div>
                <div class="" id="histologicalFindings"><!-- php: = h($reportData['microscopicExamination']['histologicalFindings']) --></div>
            </div>
        </div>
    </div>

    <!-- Pathologic Staging -->
    <div class="report-section">
        <div class="section-title">Pathologic Staging</div>
        <div class="staging-grid">
            <div class="staging-item">
                <div class="staging-label">T (Tumor)</div>
                <div class="data-value" id="tStage"><!-- php: = h($reportData['pathologicStaging']['tStage']) --></div>
            </div>
            <div class="staging-item">
                <div class="staging-label">N (Nodes)</div>
                <div class="data-value" id="nStage"><!-- php: = h($reportData['pathologicStaging']['nStage']) --></div>
            </div>
            <div class="staging-item">
                <div class="staging-label">M (Metastasis)</div>
                <div class="data-value" id="mStage"><!-- php: = h($reportData['pathologicStaging']['mStage']) --></div>
            </div>
        </div>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Overall Stage</div>
                <div class="data-value" id="overallStage"><!-- php: = h($reportData['pathologicStaging']['overallStage']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">AJCC Stage</div>
                <div class="data-value" id="ajccStage"><!-- php: = h($reportData['pathologicStaging']['ajccStage']) --></div>
            </div>
        </div>
    </div>

    <!-- Special Stains & IHC -->
    <div class="report-section">
        <div class="section-title">Grossing Workflow</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">Photos</div>
                <div class="" id="photos">
                    <!-- php: = h($reportData['grossingWorkflow']['photos']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Specimen Weight</div>
                <div class="" id="specimenWeight">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenWeight']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Cassette Summary</div>
                <div class="" id="cassetteSummary">
                    <!-- php: = h($reportData['grossingWorkflow']['cassetteSummary']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Gross Impression</div>
                <div class="" id="grossImpression">
                    <!-- php: = h($reportData['grossingWorkflow']['grossImpression']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Color Consistency</div>
                <div class="" id="colorConsistency">
                    <!-- php: = h($reportData['grossingWorkflow']['colorConsistency']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Specimen Received</div>
                <div class="" id="specimenReceived">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenReceived']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Sections Submitted</div>
                <div class="" id="sectionsSubmitted">
                    <!-- php: = h($reportData['grossingWorkflow']['sectionsSubmitted']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Specimen Dimensions</div>
                <div class="" id="specimenDimensions">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenDimensions']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Orientation Markings</div>
                <div class="" id="orientationMarkings">
                    <!-- php: = h($reportData['grossingWorkflow']['orientationMarkings']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Specimen Description</div>
                <div class="" id="specimenDescription">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenDescription']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Tissue Processing -->
    <div class="report-section">
        <div class="section-title">Tissue Processing</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">Fixation Type</div>
                <div class="" id="fixationType">
                    <!-- php: = h($reportData['tissueProcessing']['fixationType']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Clearing Paraffin</div>
                <div class="" id="clearingParaffin">
                    <!-- php: = h($reportData['tissueProcessing']['clearingParaffin']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Automated Processing</div>
                <div class="" id="automatedProcessing">
                    <!-- php: = h($reportData['tissueProcessing']['automatedProcessing']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Dehydration Reagents</div>
                <div class="" id="dehydrationReagents">
                    <!-- php: = h($reportData['tissueProcessing']['dehydrationReagents']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Embedding Orientation</div>
                <div class="" id="embeddingOrientation">
                    <!-- php: = h($reportData['tissueProcessing']['embeddingOrientation']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Pathologic Staging -->
    <div class="report-section">
        <div class="section-title">Pathologic Staging</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">M Stage</div>
                <div class="" id="mStage">
                    <!-- php: = h($reportData['pathologicStaging']['mStage']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">N Stage</div>
                <div class="" id="nStage">
                    <!-- php: = h($reportData['pathologicStaging']['nStage']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">T Stage</div>
                <div class="" id="tStage">
                    <!-- php: = h($reportData['pathologicStaging']['tStage']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">AJCC Stage</div>
                <div class="" id="ajccStage">
                    <!-- php: = h($reportData['pathologicStaging']['ajccStage']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Overall Stage</div>
                <div class="" id="overallStage">
                    <!-- php: = h($reportData['pathologicStaging']['overallStage']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Diagnosis & Summary -->
    <div class="report-section">
        <div class="section-title">Diagnosis & Summary</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">Primary Diagnosis</div>
                <div class="" id="primaryDiagnosis">
                    <!-- php: = h($reportData['diagnosisAndSummary']['primaryDiagnosis']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Suggested Follow-up</div>
                <div class="" id="suggestedFollowUp">
                    <!-- php: = h($reportData['diagnosisAndSummary']['suggestedFollowUp']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Additional Findings</div>
                <div class="" id="additionalFindings">
                    <!-- php: = h($reportData['diagnosisAndSummary']['additionalFindings']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Differential Diagnosis</div>
                <div class="" id="differentialDiagnosis">
                    <!-- php: = h($reportData['diagnosisAndSummary']['differentialDiagnosis']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Comments & Recommendations</div>
                <div class="" id="commentsRecommendations">
                    <!-- php: = h($reportData['diagnosisAndSummary']['commentsRecommendations']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Special Stains & IHC -->
    <div class="report-section">
        <div class="section-title">Special Stains & Immunohistochemistry</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">IHC Results</div>
                <div class="" id="ihcResults">
                    <!-- php: = h($reportData['specialStainsAndIHC']['ihcResults']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Molecular Results</div>
                <div class="" id="molecularResults">
                    <!-- php: = h($reportData['specialStainsAndIHC']['molecularResults']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Molecular Testing</div>
                <div class="" id="molecularTesting">
                    <!-- php: = h($reportData['specialStainsAndIHC']['molecularTesting']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Special Stain Results</div>
                <div class="" id="specialStainResults">
                    <!-- php: = h($reportData['specialStainsAndIHC']['specialStainResults']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Special Stains Performed</div>
                <div class="" id="specialStainsPerformed">
                    <!-- php: = h($reportData['specialStainsAndIHC']['specialStainsPerformed']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Specimen Information -->
    <div class="report-section">
        <div class="section-title">Specimen Information</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">Fixative</div>
                <div class="" id="fixative">
                    <!-- php: = h($reportData['specimenInformation']['fixative']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Procedure</div>
                <div class="" id="procedure">
                    <!-- php: = h($reportData['specimenInformation']['procedure']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Biopsy Site</div>
                <div class="" id="biopsySite">
                    <!-- php: = h($reportData['specimenInformation']['biopsySite']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Report Date</div>
                <div class="" id="reportDate">
                    <!-- php: = h($reportData['specimenInformation']['reportDate']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Collected By</div>
                <div class="" id="collectedBy">
                    <!-- php: = h($reportData['specimenInformation']['collectedBy']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Specimen Type</div>
                <div class="" id="specimenType">
                    <!-- php: = h($reportData['specimenInformation']['specimenType']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Collection Date</div>
                <div class="" id="collectionDate">
                    <!-- php: = h($reportData['specimenInformation']['collectionDate']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Accession Number</div>
                <div class="" id="accessionNumber">
                    <!-- php: = h($reportData['specimenInformation']['accessionNumber']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Clinical Indication</div>
                <div class="" id="clinicalIndication">
                    <!-- php: = h($reportData['specimenInformation']['clinicalIndication']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Microtomy And Staining -->
    <div class="report-section">
        <div class="section-title">Microtomy And Staining</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">IHC Panel</div>
                <div class="" id="ihcPanel">
                    <!-- php: = implode(', ', $reportData['microtomyAndStaining']['ihcPanel']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Routine Stain</div>
                <div class="" id="routineStain">
                    <!-- php: = h($reportData['microtomyAndStaining']['routineStain']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Control Slides</div>
                <div class="" id="controlSlides">
                    <!-- php: = h($reportData['microtomyAndStaining']['controlSlides']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Tumor Characteristics -->
    <div class="report-section">
        <div class="section-title">Tumor Characteristics</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">Tumor Margins</div>
                <div class="" id="tumorMargins">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorMargins']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Invasion</div>
                <div class="" id="tumorInvasion">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorInvasion']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Necrosis</div>
                <div class="" id="tumorNecrosis">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorNecrosis']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Size Details</div>
                <div class="" id="tumorSizeDetails">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorSizeDetails']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Grade Details</div>
                <div class="" id="tumorGradeDetails">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorGradeDetails']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Histological Type</div>
                <div class="" id="tumorHistologicalType">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorHistologicalType']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Perineural Invasion</div>
                <div class="" id="tumorPerineuralInvasion">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorPerineuralInvasion']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Lymphovascular Invasion</div>
                <div class="" id="tumorLymphovascularInvasion">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorLymphovascularInvasion']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Microscopic Examination -->
    <div class="report-section">
        <div class="section-title">Microscopic Examination</div>
        <div class="data-grid">
            <div class="data-item full-width">
                <div class="data-label">Necrosis</div>
                <div class="" id="necrosis">
                    <!-- php: = h($reportData['microscopicExamination']['necrosis']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Size</div>
                <div class="" id="tumorSize">
                    <!-- php: = h($reportData['microscopicExamination']['tumorSize']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tissue Type</div>
                <div class="" id="tissueType">
                    <!-- php: = h($reportData['microscopicExamination']['tissueType']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Tumor Grade</div>
                <div class="" id="tumorGrade">
                    <!-- php: = h($reportData['microscopicExamination']['tumorGrade']) -->
                </div>
            </div>
            <div class="data-item full-width">
                <div class="data-label">Margin Status</div>
                <div class="" id="marginStatus">
                    <!-- php: = h($reportData['microscopicExamination']['marginStatus']) -->
                </div>
            </div>
        </div>
    </div>

    
</div>

`;

export default function ElementElementRequestLabsBiopsyViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
