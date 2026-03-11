const rawHtml = `
<div style="margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">

    <!-- Report Header -->
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
        <h1>Biopsy Pathology Report</h1>
        <p style="color: #666;">Comprehensive Diagnostic Analysis</p>
    </div>

    <!-- Specimen Information -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Specimen Information</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Collection Date</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="collectionDate"><!-- php: = h($reportData['specimenInformation']['collectionDate']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Type</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenType"><!-- php: = h($reportData['specimenInformation']['specimenType']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Biopsy Site</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="biopsySite"><!-- php: = h($reportData['specimenInformation']['biopsySite']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Procedure</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="procedure"><!-- php: = h($reportData['specimenInformation']['procedure']) --></div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Clinical Indication</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="clinicalIndication"><!-- php: = h($reportData['specimenInformation']['clinicalIndication']) --></div>
            </div>
        </div>
    </div>

    <!-- Grossing Workflow -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Grossing Workflow</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Dimensions</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenDimensions"><!-- php: = h($reportData['grossingWorkflow']['specimenDimensions']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Weight</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenWeight"><!-- php: = h($reportData['grossingWorkflow']['specimenWeight']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Color & Consistency</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="colorConsistency"><!-- php: = h($reportData['grossingWorkflow']['colorConsistency']) --></div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Description</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenDescription"><!-- php: = h($reportData['grossingWorkflow']['specimenDescription']) --></div>
            </div>
        </div>
    </div>

    <!-- Microscopic Examination -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Microscopic Examination</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tissue Type</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tissueType"><!-- php: = h($reportData['microscopicExamination']['tissueType']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Histologic Type</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="histologicType"><!-- php: = h($reportData['microscopicExamination']['histologicType']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Grade</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorGrade"><!-- php: = h($reportData['microscopicExamination']['tumorGrade']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Size</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorSize"><!-- php: = h($reportData['microscopicExamination']['tumorSize']) --></div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Histological Findings</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="histologicalFindings"><!-- php: = h($reportData['microscopicExamination']['histologicalFindings']) --></div>
            </div>
        </div>
    </div>

    <!-- Pathologic Staging -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Pathologic Staging</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 5px;">T (Tumor)</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tStage"><!-- php: = h($reportData['pathologicStaging']['tStage']) --></div>
            </div>
            <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 5px;">N (Nodes)</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="nStage"><!-- php: = h($reportData['pathologicStaging']['nStage']) --></div>
            </div>
            <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 5px;">M (Metastasis)</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="mStage"><!-- php: = h($reportData['pathologicStaging']['mStage']) --></div>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Overall Stage</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="overallStage"><!-- php: = h($reportData['pathologicStaging']['overallStage']) --></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">AJCC Stage</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="ajccStage"><!-- php: = h($reportData['pathologicStaging']['ajccStage']) --></div>
            </div>
        </div>
    </div>

    <!-- Special Stains & IHC -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Grossing Workflow</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Photos</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="photos">
                    <!-- php: = h($reportData['grossingWorkflow']['photos']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Weight</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenWeight">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenWeight']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Cassette Summary</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="cassetteSummary">
                    <!-- php: = h($reportData['grossingWorkflow']['cassetteSummary']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Gross Impression</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="grossImpression">
                    <!-- php: = h($reportData['grossingWorkflow']['grossImpression']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Color Consistency</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="colorConsistency">
                    <!-- php: = h($reportData['grossingWorkflow']['colorConsistency']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Received</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenReceived">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenReceived']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Sections Submitted</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="sectionsSubmitted">
                    <!-- php: = h($reportData['grossingWorkflow']['sectionsSubmitted']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Dimensions</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenDimensions">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenDimensions']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Orientation Markings</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="orientationMarkings">
                    <!-- php: = h($reportData['grossingWorkflow']['orientationMarkings']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Description</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenDescription">
                    <!-- php: = h($reportData['grossingWorkflow']['specimenDescription']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Tissue Processing -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Tissue Processing</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Fixation Type</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="fixationType">
                    <!-- php: = h($reportData['tissueProcessing']['fixationType']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Clearing Paraffin</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="clearingParaffin">
                    <!-- php: = h($reportData['tissueProcessing']['clearingParaffin']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Automated Processing</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="automatedProcessing">
                    <!-- php: = h($reportData['tissueProcessing']['automatedProcessing']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Dehydration Reagents</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="dehydrationReagents">
                    <!-- php: = h($reportData['tissueProcessing']['dehydrationReagents']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Embedding Orientation</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="embeddingOrientation">
                    <!-- php: = h($reportData['tissueProcessing']['embeddingOrientation']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Pathologic Staging -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Pathologic Staging</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">M Stage</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="mStage">
                    <!-- php: = h($reportData['pathologicStaging']['mStage']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">N Stage</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="nStage">
                    <!-- php: = h($reportData['pathologicStaging']['nStage']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">T Stage</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tStage">
                    <!-- php: = h($reportData['pathologicStaging']['tStage']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">AJCC Stage</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="ajccStage">
                    <!-- php: = h($reportData['pathologicStaging']['ajccStage']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Overall Stage</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="overallStage">
                    <!-- php: = h($reportData['pathologicStaging']['overallStage']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Diagnosis & Summary -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Diagnosis & Summary</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Primary Diagnosis</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="primaryDiagnosis">
                    <!-- php: = h($reportData['diagnosisAndSummary']['primaryDiagnosis']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Suggested Follow-up</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="suggestedFollowUp">
                    <!-- php: = h($reportData['diagnosisAndSummary']['suggestedFollowUp']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Additional Findings</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="additionalFindings">
                    <!-- php: = h($reportData['diagnosisAndSummary']['additionalFindings']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Differential Diagnosis</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="differentialDiagnosis">
                    <!-- php: = h($reportData['diagnosisAndSummary']['differentialDiagnosis']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Comments & Recommendations</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="commentsRecommendations">
                    <!-- php: = h($reportData['diagnosisAndSummary']['commentsRecommendations']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Special Stains & IHC -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Special Stains & Immunohistochemistry</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">IHC Results</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="ihcResults">
                    <!-- php: = h($reportData['specialStainsAndIHC']['ihcResults']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Molecular Results</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="molecularResults">
                    <!-- php: = h($reportData['specialStainsAndIHC']['molecularResults']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Molecular Testing</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="molecularTesting">
                    <!-- php: = h($reportData['specialStainsAndIHC']['molecularTesting']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Special Stain Results</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specialStainResults">
                    <!-- php: = h($reportData['specialStainsAndIHC']['specialStainResults']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Special Stains Performed</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specialStainsPerformed">
                    <!-- php: = h($reportData['specialStainsAndIHC']['specialStainsPerformed']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Specimen Information -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Specimen Information</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Fixative</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="fixative">
                    <!-- php: = h($reportData['specimenInformation']['fixative']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Procedure</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="procedure">
                    <!-- php: = h($reportData['specimenInformation']['procedure']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Biopsy Site</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="biopsySite">
                    <!-- php: = h($reportData['specimenInformation']['biopsySite']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Report Date</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="reportDate">
                    <!-- php: = h($reportData['specimenInformation']['reportDate']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Collected By</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="collectedBy">
                    <!-- php: = h($reportData['specimenInformation']['collectedBy']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Specimen Type</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="specimenType">
                    <!-- php: = h($reportData['specimenInformation']['specimenType']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Collection Date</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="collectionDate">
                    <!-- php: = h($reportData['specimenInformation']['collectionDate']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Accession Number</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="accessionNumber">
                    <!-- php: = h($reportData['specimenInformation']['accessionNumber']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Clinical Indication</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="clinicalIndication">
                    <!-- php: = h($reportData['specimenInformation']['clinicalIndication']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Microtomy And Staining -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Microtomy And Staining</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">IHC Panel</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="ihcPanel">
                    <!-- php: = implode(', ', $reportData['microtomyAndStaining']['ihcPanel']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Routine Stain</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="routineStain">
                    <!-- php: = h($reportData['microtomyAndStaining']['routineStain']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Control Slides</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="controlSlides">
                    <!-- php: = h($reportData['microtomyAndStaining']['controlSlides']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Tumor Characteristics -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Tumor Characteristics</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Margins</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorMargins">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorMargins']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Invasion</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorInvasion">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorInvasion']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Necrosis</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorNecrosis">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorNecrosis']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Size Details</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorSizeDetails">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorSizeDetails']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Grade Details</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorGradeDetails">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorGradeDetails']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Histological Type</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorHistologicalType">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorHistologicalType']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Perineural Invasion</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorPerineuralInvasion">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorPerineuralInvasion']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Lymphovascular Invasion</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorLymphovascularInvasion">
                    <!-- php: = h($reportData['tumorCharacteristics']['tumorLymphovascularInvasion']) -->
                </div>
            </div>
        </div>
    </div>

    <!-- Microscopic Examination -->
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #2c3e50; margin-bottom: 15px;">Microscopic Examination</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Necrosis</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="necrosis">
                    <!-- php: = h($reportData['microscopicExamination']['necrosis']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Size</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorSize">
                    <!-- php: = h($reportData['microscopicExamination']['tumorSize']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tissue Type</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tissueType">
                    <!-- php: = h($reportData['microscopicExamination']['tissueType']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Tumor Grade</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="tumorGrade">
                    <!-- php: = h($reportData['microscopicExamination']['tumorGrade']) -->
                </div>
            </div>
            <div style="margin-bottom: 10px; grid-column: 1 / -1;">
                <div style="font-weight: bold; color: #555; margin-bottom: 5px;">Margin Status</div>
                <div style="padding: 5px; background-color: #f9f9f9; border-radius: 4px; min-height: 25px;" id="marginStatus">
                    <!-- php: = h($reportData['microscopicExamination']['marginStatus']) -->
                </div>
            </div>
        </div>
    </div>

    
</div>
`;

export default function ElementElementRequestLabsEmailBiopsyViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
