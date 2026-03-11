const rawHtml = `
<div style="margin: 0 auto; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

    <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px; border-bottom: 2px solid; padding-bottom: 10px;">Toxicology Report</h1>
    
    <div style="text-align: right; font-style: italic; color: #7f8c8d; margin-bottom: 20px;">
        Report Generated: <!-- php: = ($date_created) -->
    </div>

    <!-- Specimen Information Section -->
    <div style="margin-bottom: 30px; padding: 20px; border-radius: 5px;">
        <h2 style="color: #34495e; margin-bottom: 20px; font-size: 1.5em;">Specimen Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Type of Specimen</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['typeOfSpecimen']) --></div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Specimen Source</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['specimenSource']) --></div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Number of Specimens</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['numberOfSpecimens']) --></div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Volume Collected</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['volumeCollected']) --> <!-- php: = h($toxicologyData['specimenInfo']['volumeUnit']) --></div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Weight</div>
                    <div style="color: #2c3e50;">
                        <!-- php: if (!empty($toxicologyData['specimenInfo']['weight'])): -->
                            <!-- php: = h($toxicologyData['specimenInfo']['weight']) --> <!-- php: = h($toxicologyData['specimenInfo']['weightUnit']) -->
                        <!-- php: else: -->
                            N/A
                        <!-- php: endif; -->
                    </div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Sample Condition</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['sampleCondition']) --></div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Color & Consistency</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['colorConsistency']) --></div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Tissue Description</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['tissueDescription']) --></div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;" colspan="2">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Margins</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['specimenInfo']['margins']) --></div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Tests Performed Section -->
    <div style="margin-bottom: 30px; padding: 20px; border-radius: 5px;">
        <h2 style="color: #34495e; margin-bottom: 20px; font-size: 1.5em;">Tests Performed</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr>
                    <th style="padding: 12px; text-align: left;">Analyte</th>
                    <th style="padding: 12px; text-align: left;">Method Used</th>
                    <th style="padding: 12px; text-align: left;">Cutoff Level</th>
                    <th style="padding: 12px; text-align: left;">Result</th>
                    <th style="padding: 12px; text-align: left;">Units</th>
                </tr>
            </thead>
            <tbody>
                <!-- php: foreach ($toxicologyData['tests'] as $test): -->
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><!-- php: = h($test['analyte']) --></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><!-- php: = h($test['method']) --></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><!-- php: = h($test['cutoff']) --></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; 
                            <!-- php: $resultClass = strtolower(str_replace(' ', '-', $test['result'])); if ($resultClass === 'positive') echo 'color: #e74c3c; font-weight: bold;'; elseif ($resultClass === 'negative') echo 'color: #27ae60; font-weight: bold;'; elseif ($resultCl... -->">
                            <!-- php: = h($test['result']) -->
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><!-- php: = h($test['units']) --></td>
                    </tr>
                <!-- php: endforeach; -->
            </tbody>
        </table>
    </div>

    <!-- Interpretation Section -->
    <div style="margin-bottom: 30px; padding: 20px; border-radius: 5px;">
        <h2 style="color: #34495e; margin-bottom: 20px; font-size: 1.5em;">Interpretation of Results</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Detected Substances</div>
                    <div style="color: #2c3e50;"><!-- php: = nl2br(h($toxicologyData['interpretation']['detectedSubstances'])) --></div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Therapeutic Range</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['interpretation']['therapeuticRange']) --></div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Toxic Range</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['interpretation']['toxicRange']) --></div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Lethal Range</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['interpretation']['lethalRange']) --></div>
                </td>
            </tr>
            <tr>
                <td style="width: 100%; padding: 5px; vertical-align: top;" colspan="2">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Possible Clinical Effects</div>
                    <div style="color: #2c3e50;"><!-- php: = nl2br(h($toxicologyData['interpretation']['clinicalEffects'])) --></div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Quality Control Section -->
    <div style="margin-bottom: 30px; padding: 20px; border-radius: 5px;">
        <h2 style="color: #34495e; margin-bottom: 20px; font-size: 1.5em;">Quality Control & Assurance</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Internal Controls Used</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['qualityControl']['internalControls']) --></div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">External Quality Checks</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['qualityControl']['externalQuality']) --></div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%; padding: 5px; vertical-align: top;">
                    <div style="font-weight: bold; color: #7f8c8d; margin-bottom: 5px;">Lab Accreditation</div>
                    <div style="color: #2c3e50;"><!-- php: = h($toxicologyData['qualityControl']['labAccreditation']) --></div>
                </td>
                <td style="width: 50%; padding: 5px; vertical-align: top;"></td>
            </tr>
        </table>
    </div>

    <div style="margin-top: 30px; text-align: center; font-size: 0.9em; color: #7f8c8d;">
        <p>This report was generated by the Laboratory Information System</p>
        <p>For any questions or concerns, please contact the laboratory department</p>
    </div>
</div>
`;

export default function ElementElementRequestLabsEmailToxicologyViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
