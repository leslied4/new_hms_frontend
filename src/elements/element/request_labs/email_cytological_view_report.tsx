const rawHtml = `
<div style="margin:0 auto;padding:20px;font-family:Arial,sans-serif;line-height:1.6;">
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
        <div style="margin-bottom:10px;">
            <div style="font-weight:bold;color:#555;margin-bottom:3px;">Accession Number:</div>
            <div style="color:#333;"><!-- php: = h($data['specimenInformation']['accessionNumber']) --></div>
        </div>
        <div style="margin-bottom:10px;">
            <div style="font-weight:bold;color:#555;margin-bottom:3px;">Report Date:</div>
            <div style="color:#333;"><!-- php: = h($data['specimenInformation']['reportDate']) --></div>
        </div>
    </div>

    <div style="margin-bottom:25px;padding:15px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="color:#2c3e50;font-size:1.2em;font-weight:bold;margin-bottom:15px;padding-bottom:5px;border-bottom:1px solid #ddd;">Specimen Information</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Collection Date:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenInformation']['collectionDate']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Specimen Type:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenInformation']['specimenType']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Collection Site:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenInformation']['collectionSite']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Procedure:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenInformation']['procedure']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Collected By:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenInformation']['collectedBy']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Fixative Used:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenInformation']['fixative']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Clinical Indication:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['specimenInformation']['clinicalIndication']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Previous Results:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['specimenInformation']['previousResults']) --></div>
            </div>
        </div>
    </div>

    <div style="margin-bottom:25px;padding:15px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="color:#2c3e50;font-size:1.2em;font-weight:bold;margin-bottom:15px;padding-bottom:5px;border-bottom:1px solid #ddd;">Specimen Processing</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Preparation Technique:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenProcessing']['preparationTechnique']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Staining Method:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenProcessing']['stainingMethod']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Special Processing:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenProcessing']['specialProcessing']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Cell Block:</div>
                <div style="color:#333;"><!-- php: = h($data['specimenProcessing']['cellBlock']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Rapid On-Site Evaluation (ROSE):</div>
                <div style="color:#333;"><!-- php: = h($data['specimenProcessing']['rose']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">ROSE Results:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['specimenProcessing']['roseResults']) --></div>
            </div>
        </div>
    </div>

    <div style="margin-bottom:25px;padding:15px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="color:#2c3e50;font-size:1.2em;font-weight:bold;margin-bottom:15px;padding-bottom:5px;border-bottom:1px solid #ddd;">Microscopic Examination</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Specimen Adequacy:</div>
                <div style="color:#333;"><!-- php: = h($data['microscopicExamination']['adequacy']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Cellularity:</div>
                <div style="color:#333;"><!-- php: = h($data['microscopicExamination']['cellularity']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Background:</div>
                <div style="color:#333;"><!-- php: = h($data['microscopicExamination']['background']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Cell Morphology:</div>
                <div style="color:#333;"><!-- php: = h($data['microscopicExamination']['cellMorphology']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Cellular Arrangement:</div>
                <div style="color:#333;"><!-- php: = h($data['microscopicExamination']['cellularArrangement']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Microorganisms:</div>
                <div style="color:#333;"><!-- php: = h($data['microscopicExamination']['microorganisms']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Cellular Pattern:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['microscopicExamination']['cellularPattern']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Nuclear Features:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['microscopicExamination']['nuclearFeatures']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Cytoplasmic Features:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['microscopicExamination']['cytoplasmicFeatures']) --></div>
            </div>
        </div>
    </div>

    <div style="margin-bottom:25px;padding:15px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="color:#2c3e50;font-size:1.2em;font-weight:bold;margin-bottom:15px;padding-bottom:5px;border-bottom:1px solid #ddd;">Specific Classifications</div>

        <!-- php: if ($data['specimenInformation']['specimenType'] === 'papSmear'): -->
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
                <div style="margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">Bethesda Classification:</div>
                    <div style="color:#333;"><!-- php: = h($data['specificClassifications']['papSmear']['bethesdaClassification']) --></div>
                </div>
                <div style="margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">Endocervical Component:</div>
                    <div style="color:#333;"><!-- php: = h($data['specificClassifications']['papSmear']['endocervicalComponent']) --></div>
                </div>
                <div style="margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">Hormonal Evaluation:</div>
                    <div style="color:#333;"><!-- php: = h($data['specificClassifications']['papSmear']['hormonalEvaluation']) --></div>
                </div>

                <!-- php: if (!empty($data['specificClassifications']['papSmear']['epithelialAbnormalities'])): -->
                    <div style="grid-column:1 / -1;margin-bottom:10px;">
                        <div style="font-weight:bold;color:#555;margin-bottom:3px;">Epithelial Cell Abnormalities:</div>
                        <ul style="list-style:none;padding:0;margin:0;">
                            <!-- php: foreach ($data['specificClassifications']['papSmear']['epithelialAbnormalities'] as $abnormality): -->
                                <li style="margin-bottom:5px;padding-left:20px;position:relative;">
                                    <span style="position:absolute;left:0;color:#27ae60;">✓</span>
                                    <!-- php: = h($abnormality) -->
                                </li>
                            <!-- php: endforeach; -->
                        </ul>
                    </div>
                <!-- php: endif; -->
            </div>
        <!-- php: endif; -->

        <!-- php: if ($data['specimenInformation']['specimenType'] === 'fna'): -->
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
                <div style="grid-column:1 / -1;margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">Descriptive Diagnosis:</div>
                    <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['specificClassifications']['fna']['descriptiveDiagnosis']) --></div>
                </div>
                <div style="margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">Milan System:</div>
                    <div style="color:#333;"><!-- php: = h($data['specificClassifications']['fna']['milanSystem']) --></div>
                </div>
                <div style="margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">Bethesda Thyroid:</div>
                    <div style="color:#333;"><!-- php: = h($data['specificClassifications']['fna']['bethesdaThyroid']) --></div>
                </div>
                <div style="margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">IAC Yokohama System:</div>
                    <div style="color:#333;"><!-- php: = h($data['specificClassifications']['fna']['iacYokohama']) --></div>
                </div>
            </div>
        <!-- php: endif; -->

        <!-- php: if ($data['specimenInformation']['specimenType'] === 'bodyFluid'): -->
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
                <!-- php: if (!empty($data['specificClassifications']['bodyFluid']['cellTypes'])): -->
                    <div style="grid-column:1 / -1;margin-bottom:10px;">
                        <div style="font-weight:bold;color:#555;margin-bottom:3px;">Cell Types Present:</div>
                        <ul style="list-style:none;padding:0;margin:0;">
                            <!-- php: foreach ($data['specificClassifications']['bodyFluid']['cellTypes'] as $cellType): -->
                                <li style="margin-bottom:5px;padding-left:20px;position:relative;">
                                    <span style="position:absolute;left:0;color:#27ae60;">✓</span>
                                    <!-- php: = h($cellType) -->
                                </li>
                            <!-- php: endforeach; -->
                        </ul>
                    </div>
                <!-- php: endif; -->
                <div style="margin-bottom:10px;">
                    <div style="font-weight:bold;color:#555;margin-bottom:3px;">Atypical/Malignant Cells:</div>
                    <div style="color:#333;"><!-- php: = h($data['specificClassifications']['bodyFluid']['atypicalCells']) --></div>
                </div>
            </div>
        <!-- php: endif; -->
    </div>

    <div style="margin-bottom:25px;padding:15px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="color:#2c3e50;font-size:1.2em;font-weight:bold;margin-bottom:15px;padding-bottom:5px;border-bottom:1px solid #ddd;">Diagnosis & Interpretation</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Primary Diagnosis:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['diagnosisAndInterpretation']['primaryDiagnosis']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Diagnostic Category:</div>
                <div style="color:#333;"><!-- php: = h($data['diagnosisAndInterpretation']['diagnosticCategory']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Additional Findings:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['diagnosisAndInterpretation']['additionalFindings']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Differential Diagnosis:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['diagnosisAndInterpretation']['differentialDiagnosis']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Clinical Correlation:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['diagnosisAndInterpretation']['clinicalCorrelation']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Previous Correlation:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['diagnosisAndInterpretation']['previousCorrelation']) --></div>
            </div>
        </div>
    </div>

    <div style="margin-bottom:25px;padding:15px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="color:#2c3e50;font-size:1.2em;font-weight:bold;margin-bottom:15px;padding-bottom:5px;border-bottom:1px solid #ddd;">Recommendations</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Suggested Follow-up:</div>
                <div style="color:#333;"><!-- php: = h($data['recommendations']['followUp']) --></div>
            </div>
            <div style="margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Recommended Time Frame:</div>
                <div style="color:#333;"><!-- php: = h($data['recommendations']['timeFrame']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Additional Testing Recommended:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['recommendations']['additionalTesting']) --></div>
            </div>
            <div style="grid-column:1 / -1;margin-bottom:10px;">
                <div style="font-weight:bold;color:#555;margin-bottom:3px;">Comments:</div>
                <div style="white-space:pre-wrap;padding:10px;border-radius:4px;border:1px solid #ddd;"><!-- php: = h($data['recommendations']['comments']) --></div>
            </div>
        </div>
    </div>

    <div style="margin-top:30px;padding-top:20px;border-top:1px solid #ddd;text-align:right;font-size:0.9em;color:#666;">
        <p>Report generated on: <!-- php: = date('Y-m-d H:i:s') --></p>
    </div>
</div>


<div style="margin-top:30px;padding-top:20px;border-top:1px solid #ddd;text-align:right;font-size:0.9em;color:#666;">
    <p>Report generated on: <!-- php: = date('Y-m-d H:i:s') --></p>
</div>
</div>
`;

export default function ElementElementRequestLabsEmailCytologicalViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
