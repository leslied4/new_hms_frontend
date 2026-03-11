const rawHtml = `
<style>
    .toxicology-report {

        /* max-width: 1000px; */
        margin: 0 auto;
        padding: 20px;
        /* background-color: #fff; */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .toxicology-report h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid ;
        padding-bottom: 10px;
    }

    .toxicology-report .section {
        margin-bottom: 30px;
        padding: 20px;
        /* background-color: #f8f9fa; */
        border-radius: 5px;

    }

    .toxicology-report .section h2 {
        color: #34495e;
        margin-bottom: 20px;
        font-size: 1.5em;
    }

    .toxicology-report .data-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .toxicology-report .data-item {
        margin-bottom: 10px;
    }

    .toxicology-report .data-label {
        font-weight: bold;
        color: #7f8c8d;
        margin-bottom: 5px;
    }

    .toxicology-report .data-value {
        color: #2c3e50;
    }

    .toxicology-report table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    .toxicology-report th {
        /* background-color: ; */
        /* color: white; */
        padding: 12px;
        text-align: left;
    }

    .toxicology-report td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    .toxicology-report tr:nth-child(even) {
        /* background-color: #f2f2f2; */
    }

    .toxicology-report .result-positive {
        color: #e74c3c;
        font-weight: bold;
    }

    .toxicology-report .result-negative {
        color: #27ae60;
        font-weight: bold;
    }

    .toxicology-report .result-normal {
        color: ;
    }

    .toxicology-report .result-above {
        color: #f39c12;
        font-weight: bold;
    }

    .toxicology-report .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 0.9em;
        color: #7f8c8d;
    }

    .toxicology-report .timestamp {
        text-align: right;
        font-style: italic;
        color: #7f8c8d;
        margin-bottom: 20px;
    }
</style>

<div class="toxicology-report">

    
    <div class="timestamp">
        Report Generated: <!-- php: = ($date_created) -->
    </div>

    <!-- Specimen Information Section -->
    <div class="section">
        <h2>Specimen Information</h2>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Type of Specimen</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['typeOfSpecimen']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Specimen Source</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['specimenSource']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Number of Specimens</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['numberOfSpecimens']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Volume Collected</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['volumeCollected']) --> <!-- php: = h($toxicologyData['specimenInfo']['volumeUnit']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Weight</div>
                <div class="data-value">
                    <!-- php: if (!empty($toxicologyData['specimenInfo']['weight'])): -->
                        <!-- php: = h($toxicologyData['specimenInfo']['weight']) --> <!-- php: = h($toxicologyData['specimenInfo']['weightUnit']) -->
                    <!-- php: else: -->
                        N/A
                    <!-- php: endif; -->
                </div>
            </div>
            <div class="data-item">
                <div class="data-label">Sample Condition</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['sampleCondition']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Color & Consistency</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['colorConsistency']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Tissue Description</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['tissueDescription']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Margins</div>
                <div class="data-value"><!-- php: = h($toxicologyData['specimenInfo']['margins']) --></div>
            </div>
        </div>
    </div>

    <!-- Tests Performed Section -->
    <div class="section">
        <h2>Tests Performed</h2>
        <table>
            <thead>
                <tr>
                    <th>Analyte</th>
                    <th>Method Used</th>
                    <th>Cutoff Level</th>
                    <th>Result</th>
                    <th>Units</th>
                </tr>
            </thead>
            <tbody>
                <!-- php: foreach ($toxicologyData['tests'] as $test): -->
                    <tr>
                        <td><!-- php: = h($test['analyte']) --></td>
                        <td><!-- php: = h($test['method']) --></td>
                        <td><!-- php: = h($test['cutoff']) --></td>
                        <td class="result-<!-- php: = strtolower(str_replace(' ', '-', $test['result'])) -->">
                            <!-- php: = h($test['result']) -->
                        </td>
                        <td><!-- php: = h($test['units']) --></td>
                    </tr>
                <!-- php: endforeach; -->
            </tbody>
        </table>
    </div>

    <!-- Interpretation Section -->
    <div class="section">
        <h2>Interpretation of Results</h2>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Detected Substances</div>
                <div class="data-value"><!-- php: = nl2br(h($toxicologyData['interpretation']['detectedSubstances'])) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Therapeutic Range</div>
                <div class="data-value"><!-- php: = h($toxicologyData['interpretation']['therapeuticRange']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Toxic Range</div>
                <div class="data-value"><!-- php: = h($toxicologyData['interpretation']['toxicRange']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Lethal Range</div>
                <div class="data-value"><!-- php: = h($toxicologyData['interpretation']['lethalRange']) --></div>
            </div>
            <div class="data-item" style="grid-column: span 2;">
                <div class="data-label">Possible Clinical Effects</div>
                <div class="data-value"><!-- php: = nl2br(h($toxicologyData['interpretation']['clinicalEffects'])) --></div>
            </div>
        </div>
    </div>

    <!-- Quality Control Section -->
    <div class="section">
        <h2>Quality Control & Assurance</h2>
        <div class="data-grid">
            <div class="data-item">
                <div class="data-label">Internal Controls Used</div>
                <div class="data-value"><!-- php: = h($toxicologyData['qualityControl']['internalControls']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">External Quality Checks</div>
                <div class="data-value"><!-- php: = h($toxicologyData['qualityControl']['externalQuality']) --></div>
            </div>
            <div class="data-item">
                <div class="data-label">Lab Accreditation</div>
                <div class="data-value"><!-- php: = h($toxicologyData['qualityControl']['labAccreditation']) --></div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>This report was generated by the Laboratory Information System</p>
        <p>For any questions or concerns, please contact the laboratory department</p>
    </div>
</div> 
`;

export default function ElementElementRequestLabsToxicologyViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
