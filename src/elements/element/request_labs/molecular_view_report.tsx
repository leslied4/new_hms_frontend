const rawHtml = `
<!-- php: /** * Molecular Test Report View Template * Displays the extracted molecular test data in a professional format */ -->
<style>
    .molecular-report {

        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        /* background-color: #fff; */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .molecular-report h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid ;
        padding-bottom: 10px;
    }
    .molecular-report .timestamp {
        text-align: right;
        font-style: italic;
        color: #7f8c8d;
        margin-bottom: 20px;
    }
</style>

<div class="">
    <div class="">
        <div class="timestamp">
            Report Generated: <!-- php: = ($date_created) -->
        </div>
        

        <div class="">
            <!-- php: if (!empty($data['tests'])): -->
                <!-- php: foreach ($data['tests'] as $test): -->
                    <div class="test-report mb-4">
                        <div class="card">
                            <div class="card-header bg-light">
                                <h5 class="mb-0">Test #<!-- php: = h($test['testNumber']) -->: <!-- php: = h($test['testName']) --></h5>
                            </div>
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <strong>Methodology:</strong> <!-- php: = h($test['methodology']) -->
                                    </div>
                                    <div class="col-md-6">
                                        <strong>Equipment Used:</strong> <!-- php: = h($test['equipmentUsed']) -->
                                    </div>
                                </div>

                                <div class="results-section">
                                    <h6 class="border-bottom pb-2">Test Results</h6>
                                    <div class="row">
                                        <div class="col-md-6 mb-2">
                                            <strong>Gene/Target:</strong> <!-- php: = h($test['results']['geneTarget']) -->
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <strong>Mutation/Variant:</strong> 
                                            <span class="badge <!-- php: = $test['results']['mutationDetected'] === 'positive' ? 'bg-danger' : 'bg-success' -->">
                                                <!-- php: = h(ucfirst($test['results']['mutationDetected'])) -->
                                            </span>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-4 mb-2">
                                            <strong>Viral Load:</strong> 
                                            <!-- php: = !empty($test['results']['viralLoad']) ? h($test['results']['viralLoad']) . ' copies/mL' : 'N/A' -->
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <strong>Coverage Depth:</strong> 
                                            <!-- php: = !empty($test['results']['coverageDepth']) ? h($test['results']['coverageDepth']) . 'x' : 'N/A' -->
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <strong>Quality Score:</strong>
                                            <span class="badge <!-- php: = $test['results']['qualityScore'] === 'pass' ? 'bg-success' : 'bg-danger' -->">
                                                <!-- php: = h(strtoupper($test['results']['qualityScore'])) -->
                                            </span>
                                        </div>
                                    </div>

                                    <div class="interpretation mt-3">
                                        <strong>Interpretation:</strong>
                                        <p class="mt-2"><!-- php: = nl2br(h($test['results']['interpretation'])) --></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- php: endforeach; -->
            <!-- php: else: -->
                <div class="alert alert-info">
                    No test data available.
                </div>
            <!-- php: endif; -->
        </div>
    </div>
</div>

<style>
    .test-report .card {
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .test-report .card-header {
        border-bottom: 1px solid rgba(0,0,0,0.125);
    }
    .interpretation {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
    }
    .badge {
        font-size: 0.9em;
        padding: 5px 10px;
    }
</style> 
`;

export default function ElementElementRequestLabsMolecularViewReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
