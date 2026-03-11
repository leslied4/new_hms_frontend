const rawHtml = `
<div style="max-width:1000px;margin:0 auto;padding:20px;box-shadow:0 0 10px rgba(0,0,0,0.1);font-family:'Inter',Arial,sans-serif;color:#333;line-height:1.6;">
    
    <h1 style="color:#2c3e50;text-align:center;margin-bottom:30px;border-bottom:2px solid #2c3e50;padding-bottom:10px;">
        Molecular Test Report
    </h1>

    <div style="text-align:right;font-style:italic;color:#7f8c8d;margin-bottom:20px;">
        Report Generated: <!-- php: = ($date_created) -->
    </div>

    <div>
        <!-- php: if (!empty($data['tests'])): -->
            <!-- php: foreach ($data['tests'] as $test): -->
                <div style="margin-bottom:30px;border:1px solid #dee2e6;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);overflow:hidden;">
                    
                    <div style="background-color:#f8f9fa;padding:10px 15px;border-bottom:1px solid #dee2e6;">
                        <h3 style="margin:0;font-size:1.2rem;color:#2c3e50;">
                            Test #<!-- php: = h($test['testNumber']) -->: <!-- php: = h($test['testName']) -->
                        </h3>
                    </div>

                    <div style="padding:20px;">
                        <table style="width:100%;border-collapse:collapse;margin-bottom:15px;">
                            <tr>
                                <td style="width:50%;padding:5px;vertical-align:top;">
                                    <strong>Methodology:</strong> <!-- php: = h($test['methodology']) -->
                                </td>
                                <td style="width:50%;padding:5px;vertical-align:top;">
                                    <strong>Equipment Used:</strong> <!-- php: = h($test['equipmentUsed']) -->
                                </td>
                            </tr>
                        </table>

                        <div style="margin-top:10px;">
                            <h4 style="border-bottom:1px solid #dee2e6;padding-bottom:8px;margin-bottom:15px;color:#2c3e50;">Test Results</h4>

                            <table style="width:100%;border-collapse:collapse;">
                                <tr>
                                    <td style="width:50%;padding:5px;vertical-align:top;">
                                        <strong>Gene/Target:</strong> <!-- php: = h($test['results']['geneTarget']) -->
                                    </td>
                                    <td style="width:50%;padding:5px;vertical-align:top;">
                                        <strong>Mutation/Variant:</strong> 
                                        <span style="display:inline-block;font-size:0.9em;padding:5px 10px;border-radius:4px;color:#fff;background-color:<!-- php: = $test['results']['mutationDetected'] === 'positive' ? '#dc3545' : '#28a745' -->;">
                                            <!-- php: = h(ucfirst($test['results']['mutationDetected'])) -->
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:33%;padding:5px;vertical-align:top;">
                                        <strong>Viral Load:</strong> 
                                        <!-- php: = !empty($test['results']['viralLoad']) ? h($test['results']['viralLoad']) . ' copies/mL' : 'N/A' -->
                                    </td>
                                    <td style="width:33%;padding:5px;vertical-align:top;">
                                        <strong>Coverage Depth:</strong> 
                                        <!-- php: = !empty($test['results']['coverageDepth']) ? h($test['results']['coverageDepth']) . 'x' : 'N/A' -->
                                    </td>
                                    <td style="width:34%;padding:5px;vertical-align:top;">
                                        <strong>Quality Score:</strong>
                                        <span style="display:inline-block;font-size:0.9em;padding:5px 10px;border-radius:4px;color:#fff;background-color:<!-- php: = $test['results']['qualityScore'] === 'pass' ? '#28a745' : '#dc3545' -->;">
                                            <!-- php: = h(strtoupper($test['results']['qualityScore'])) -->
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <div style="margin-top:15px;background-color:#f8f9fa;padding:15px;border-radius:5px;border:1px solid #dee2e6;">
                                <strong>Interpretation:</strong>
                                <p style="margin-top:10px;white-space:pre-wrap;"><!-- php: = nl2br(h($test['results']['interpretation'])) --></p>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- php: endforeach; -->
        <!-- php: else: -->
            <div style="background-color:#e9f7fd;color:#0c5460;padding:15px;border-radius:5px;border:1px solid #bee5eb;">
                No test data available.
            </div>
        <!-- php: endif; -->
    </div>
</div>

`;

export default function ElementElementRequestLabsEmailMolecularViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
