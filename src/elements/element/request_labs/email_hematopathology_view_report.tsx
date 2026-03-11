const rawHtml = `
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 2rem auto; padding: 2rem; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
    <p style="margin-bottom: 1.5rem;">Report Date: <!-- php: = h($data['specimenInformation']['reportDate']) --></p>

    <!-- SPECIMEN INFORMATION -->
    <div style="margin-bottom: 2rem; padding: 1.5rem; border-radius: 8px;">
        <h2 style="color: #2c3e50; font-size: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #ccc;">SPECIMEN INFORMATION</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <div style="margin-bottom: 0.5rem;">
                <div style="font-weight: 600; color: #495057; margin-bottom: 0.25rem;">Accession Number</div>
                <div style="color: #212529;"><!-- php: = h($data['specimenInformation']['accessionNumber']) --></div>
            </div>
            <div style="margin-bottom: 0.5rem;">
                <div style="font-weight: 600; color: #495057; margin-bottom: 0.25rem;">Collection Date/Time</div>
                <div style="color: #212529;"><!-- php: = h($data['specimenInformation']['collectionDateTime']) --></div>
            </div>
            <div style="margin-bottom: 0.5rem;">
                <div style="font-weight: 600; color: #495057; margin-bottom: 0.25rem;">Collection Site</div>
                <div style="color: #212529;">
                    <!-- php: = h($data['specimenInformation']['collectionSite']) -->
                    <!-- php: if (!empty($data['specimenInformation']['otherCollectionSite'])): -->
                        (<!-- php: = h($data['specimenInformation']['otherCollectionSite']) -->)
                    <!-- php: endif; -->
                </div>
            </div>
            <div style="margin-bottom: 0.5rem;">
                <div style="font-weight: 600; color: #495057; margin-bottom: 0.25rem;">Specimen Type</div>
                <div style="color: #212529;">
                    <ul style="list-style:none; padding:0; margin:0;">
                        <!-- php: foreach ($data['specimenInformation']['specimenType'] as $type): -->
                            <li style="display:inline-block; margin-right:1rem; margin-bottom:0.5rem; padding:0.25rem 0.5rem; border-radius:4px;"><!-- php: = h($type) --></li>
                        <!-- php: endforeach; -->
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- PERIPHERAL BLOOD EXAMINATION -->
    <div style="margin-bottom: 2rem; padding: 1.5rem; border-radius: 8px;">
        <h2 style="color: #2c3e50; font-size: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #ccc;">PERIPHERAL BLOOD EXAMINATION</h2>

        <h3 style="font-size: 1.2rem; margin: 1rem 0;">CBC Results</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <!-- php: $cbc = $data['peripheralBloodExam']['cbcResults']; $cbcItems = [ ['label' => 'WBC Count', 'value' => $cbc['wbcCount'], 'unit' => '× 10^9/L'], ['label' => 'RBC Count', 'value' => $cbc['rbcCount'], 'unit' => '× 10^12/L'], ['label' => 'Hemoglo... -->
                <div style="margin-bottom: 0.5rem;">
                    <div style="font-weight:600; color:#495057; margin-bottom:0.25rem;"><!-- php: = $item['label'] --></div>
                    <div style="color:#212529;">
                        <!-- php: = h($item['value']) -->
                        <span style="color:#6c757d; font-size:0.875rem; margin-left:0.25rem;"><!-- php: = $item['unit'] --></span>
                    </div>
                </div>
            <!-- php: endforeach; -->
        </div>

        <h3 style="font-size: 1.2rem; margin: 1rem 0;">Differential Count</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <!-- php: $diff = $data['peripheralBloodExam']['differentialCount']; $diffItems = [ 'Neutrophils' => $diff['neutrophilsPercent'].'% ('.$diff['neutrophilsAbsolute'].' × 10^9/L)', 'Lymphocytes' => $diff['lymphocytesPercent'].'% ('.$diff['lymphocytesAbs... -->
                <div style="margin-bottom: 0.5rem;">
                    <div style="font-weight:600; color:#495057; margin-bottom:0.25rem;"><!-- php: = $label --></div>
                    <div style="color:#212529;"><!-- php: = h($value) --></div>
                </div>
            <!-- php: endforeach; -->
        </div>

        <h3 style="font-size: 1.2rem; margin: 1rem 0;">Blood Smear Morphology</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <!-- php: $morphs = $data['peripheralBloodExam']['bloodSmearMorphology']; $morphLabels = ['RBC Morphology' => $morphs['rbcMorphology'], 'WBC Morphology' => $morphs['wbcMorphology']]; foreach ($morphLabels as $label => $list): -->
                <div style="margin-bottom: 0.5rem;">
                    <div style="font-weight:600; color:#495057; margin-bottom:0.25rem;"><!-- php: = $label --></div>
                    <ul style="list-style:none; padding:0; margin:0;">
                        <!-- php: foreach ($list as $item): -->
                            <li style="display:inline-block; margin-right:1rem; margin-bottom:0.5rem; padding:0.25rem 0.5rem; border-radius:4px;"><!-- php: = h($item) --></li>
                        <!-- php: endforeach; -->
                    </ul>
                </div>
            <!-- php: endforeach; -->
        </div>
    </div>

    <!-- BONE MARROW ASPIRATE EXAMINATION -->
    <div style="margin-bottom: 2rem; padding: 1.5rem; border-radius: 8px;">
        <h2 style="color:#2c3e50; font-size:1.5rem; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid #ccc;">BONE MARROW ASPIRATE EXAMINATION</h2>

        <h3 style="font-size:1.2rem; margin:1rem 0;">Cellularity</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:1rem;">
            <div><div style="font-weight:600; color:#495057;">Overall Cellularity</div><div><!-- php: = h($data['boneMarrowAspirateExam']['cellularity']['cellularity']) --></div></div>
            <div><div style="font-weight:600; color:#495057;">Cellularity Percentage</div><div><!-- php: = h($data['boneMarrowAspirateExam']['cellularity']['cellularityPercentage']) --> <span style="color:#6c757d; font-size:0.875rem;">% of expected for age</span></div></div>
            <div><div style="font-weight:600; color:#495057;">M:E Ratio</div><div><!-- php: = h($data['boneMarrowAspirateExam']['cellularity']['meRatio']) --></div></div>
        </div>

        <h3 style="font-size:1.2rem; margin:1rem 0;">Erythroid Series</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:1rem;">
            <div><div style="font-weight:600; color:#495057;">Percentage</div><div><!-- php: = h($data['boneMarrowAspirateExam']['erythroidSeries']['percentage']) --><span style="color:#6c757d; font-size:0.875rem;">%</span></div></div>
            <div><div style="font-weight:600; color:#495057;">Maturation</div><div><!-- php: = h($data['boneMarrowAspirateExam']['erythroidSeries']['maturation']) --></div></div>
        </div>
        <div><div style="font-weight:600; color:#495057;">Description</div><div style="white-space:pre-wrap; padding:1rem; border-radius:4px; border:1px solid #ccc;"><!-- php: = h($data['boneMarrowAspirateExam']['erythroidSeries']['description']) --></div></div>
    </div>

    <!-- DIAGNOSIS & CLASSIFICATION -->
    <div style="margin-bottom:2rem; padding:1.5rem; border-radius:8px;">
        <h2 style="color:#2c3e50; font-size:1.5rem; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid #ccc;">DIAGNOSIS & CLASSIFICATION</h2>
        <!-- php: $diag = $data['diagnosisClassification']; -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:1rem;">
            <div><div style="font-weight:600; color:#495057;">Hematologic Diagnosis</div><div><!-- php: = h($diag['hematologicDiagnosis']) --></div></div>
            <div><div style="font-weight:600; color:#495057;">WHO Classification</div><div><!-- php: = h($diag['whoClassification']) --></div></div>
            <div><div style="font-weight:600; color:#495057;">Disease Status</div><div><!-- php: = h($diag['diseaseStatus']) --></div></div>
            <div><div style="font-weight:600; color:#495057;">Risk Stratification</div><div><!-- php: = h($diag['riskStratification']) --></div></div>
        </div>
    </div>

    <!-- INTERPRETATION -->
    <div style="margin-bottom:2rem; padding:1.5rem; border-radius:8px;">
        <h2 style="color:#2c3e50; font-size:1.5rem; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid #ccc;">INTERPRETATION & CLINICAL CORRELATION</h2>
        <div><div style="font-weight:600; color:#495057;">Summary of Findings</div><div style="white-space:pre-wrap; padding:1rem; border-radius:4px; border:1px solid #ccc;"><!-- php: = h($data['interpretationCorrelation']['summaryFindings']) --></div></div>
        <div><div style="font-weight:600; color:#495057;">Clinicopathologic Correlation</div><div style="white-space:pre-wrap; padding:1rem; border-radius:4px; border:1px solid #ccc;"><!-- php: = h($data['interpretationCorrelation']['clinicopathologicCorrelation']) --></div></div>
    </div>

    <!-- RECOMMENDATIONS -->
    <div style="margin-bottom:2rem; padding:1.5rem; border-radius:8px;">
        <h2 style="color:#2c3e50; font-size:1.5rem; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid #ccc;">RECOMMENDATIONS</h2>
        <div><div style="font-weight:600; color:#495057;">Additional Studies</div><div style="white-space:pre-wrap; padding:1rem; border-radius:4px; border:1px solid #ccc;"><!-- php: = h($data['recommendations']['additionalStudies']) --></div></div>
        <div><div style="font-weight:600; color:#495057;">Follow-up</div><div style="white-space:pre-wrap; padding:1rem; border-radius:4px; border:1px solid #ccc;"><!-- php: = h($data['recommendations']['followUp']) --></div></div>
    </div>
</div>

`;

export default function ElementElementRequestLabsEmailHematopathologyViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
