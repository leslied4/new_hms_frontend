const rawHtml = `
<style scoped>
    #toxicology_template .container {
        margin: 0 auto;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #toxicology_template h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
    }

    #toxicology_template .section {
        margin-bottom: 30px;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 5px;
    }

    #toxicology_template .section h2 {
        color: #34495e;
        margin-bottom: 20px;
    }

    #toxicology_template .form-group {
        margin-bottom: 15px;
    }

    #toxicology_template label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    #toxicology_template input[type="text"],
    #toxicology_template input[type="date"],
    #toxicology_template input[type="time"],
    #toxicology_template input[type="number"],
    #toxicology_template select,
    #toxicology_template textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }

    #toxicology_template table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    #toxicology_template th,
    #toxicology_template td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    #toxicology_template th {
        background-color: #f2f2f2;
    }

    #toxicology_template .btn-submit {
        background-color: #3498db;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    #toxicology_template .btn-submit:hover {
        background-color: #2980b9;
    }

    #toxicology_template .btn-add-test {
        background-color: #2ecc71;
        color: white;
        padding: 8px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 15px;
    }

    #toxicology_template .btn-add-test:hover {
        background-color: #27ae60;
    }

    #toxicology_template .btn-remove-test {
        background-color: #e74c3c;
        color: white;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }

    #toxicology_template .btn-remove-test:hover {
        background-color: #c0392b;
    }
</style>

<div id="toxicology_template">

    <div class="container">
        <h1>Toxicology Lab Report Form</h1>
        <form id="process_toxicology_report" method="POST">
    
    
            <!-- 2. Sample Information -->
            <div class="section">
                <h2> Sample Information</h2>
                <div class="form-group">
                    <label for="type_of_specimen">Type of Specimen:</label>
                    <SearchableSelectField id="type_of_specimen" name="type_of_specimen" required>
                        <option value="">Select Type</option>
                        <option value="Blood">Blood</option>
                        <option value="Urine">Urine</option>
                        <option value="Hair">Hair</option>
                        <option value="Tissue">Tissue</option>
                        <option value="Other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="specimen_source">Specimen Source (if applicable):</label>
                    <SearchableSelectField id="specimen_source" name="specimen_source">
                        <option value="">Select Source</option>
                        <option value="Liver">Liver</option>
                        <option value="Kidney">Kidney</option>
                        <option value="Lungs">Lungs</option>
                        <option value="Other">Other</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="number_of_specimens">Number of Specimens Received:</label>
                    <input type="number" id="number_of_specimens" name="number_of_specimens" required>
                </div>
                <div class="form-group">
                    <label for="volume_collected">Volume Collected:</label>
                    <input type="number" id="volume_collected" name="volume_collected" step="0.1" required>
                    <SearchableSelectField id="volume_unit" name="volume_unit" required>
                        <option value="mL">mL</option>
                        <option value="µL">µL</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="weight">Weight (if applicable):</label>
                    <input type="number" id="weight" name="weight" step="0.1">
                    <SearchableSelectField id="weight_unit" name="weight_unit">
                        <option value="g">g</option>
                        <option value="mg">mg</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="sample_condition">Sample Condition:</label>
                    <SearchableSelectField id="sample_condition" name="sample_condition" required>
                        <option value="">Select Condition</option>
                        <option value="Normal">Normal</option>
                        <option value="Hemolyzed">Hemolyzed</option>
                        <option value="Clotted">Clotted</option>
                        <option value="Contaminated">Contaminated</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="color_consistency">Color & Consistency:</label>
                    <textarea id="color_consistency" name="color_consistency" rows="2"></textarea>
                </div>
                <div class="form-group">
                    <label for="tissue_description">Tissue Description (if applicable):</label>
                    <textarea id="tissue_description" name="tissue_description" rows="2"></textarea>
                </div>
                <div class="form-group">
                    <label for="margins">Margins (if applicable):</label>
                    <SearchableSelectField id="margins" name="margins">
                        <option value="">Select Margins</option>
                        <option value="Clear">Clear</option>
                        <option value="Positive">Positive</option>
                        <option value="Close">Close</option>
                        <option value="Not applicable">Not applicable</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="attached_images">Attached Images / Annotations:</label>
                    <input type="file" id="attached_images" name="attached_images" multiple>
                </div>
            </div>
    
            <!-- 3. Tests Performed -->
            <div class="section">
                <div class="d-flex align-items-center justify-content-between">
                    <h2> Tests Performed</h2>
                    <button type="button" class="btn-add-test" onclick="addTestRow()">Add New Test</button>
                </div>
                <table id="tests-table">
                    <thead>
                        <tr>
                            <th>Analyte</th>
                            <th>Method Used</th>
                            <th>Cutoff Level</th>
                            <th>Result</th>
                            <th>Units</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Default rows will be added here -->
                    </tbody>
                </table>
            </div>
    
            <!-- 4. Interpretation of Results -->
            <div class="section">
                <h2> Interpretation of Results</h2>
                <div class="form-group">
                    <label for="detected_substances">Detected Substances:</label>
                    <textarea id="detected_substances" name="detected_substances" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="therapeutic_range">Therapeutic Range:</label>
                    <input type="text" id="therapeutic_range" name="therapeutic_range" required>
                </div>
                <div class="form-group">
                    <label for="toxic_range">Toxic Range:</label>
                    <input type="text" id="toxic_range" name="toxic_range" required>
                </div>
                <div class="form-group">
                    <label for="lethal_range">Lethal Range:</label>
                    <input type="text" id="lethal_range" name="lethal_range" required>
                </div>
                <div class="form-group">
                    <label for="clinical_effects">Possible Clinical Effects:</label>
                    <textarea id="clinical_effects" name="clinical_effects" rows="3" required></textarea>
                </div>
            </div>
    
            <!-- 5. Quality Control & Assurance -->
            <div class="section">
                <h2> Quality Control & Assurance</h2>
                <div class="form-group">
                    <label for="internal_controls">Internal Controls Used:</label>
                    <SearchableSelectField id="internal_controls" name="internal_controls" required>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="external_quality">External Quality Checks:</label>
                    <SearchableSelectField id="external_quality" name="external_quality" required>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </SearchableSelectField>
                </div>
                <div class="form-group">
                    <label for="lab_accreditation">Lab Accreditation:</label>
                    <SearchableSelectField id="lab_accreditation" name="lab_accreditation" required>
                        <option value="ISO">ISO</option>
                        <option value="CLIA">CLIA</option>
                        <option value="CAP">CAP</option>
                    </SearchableSelectField>
                </div>
            </div>
    
            <div class="form-group" style="text-align: center;">
                <button type="submit" class="btn-submit">Submit Report</button>
            </div>
        </form>
    </div>
</div>

<script>

    addTestRow()
    addTestRow()

    function addTestRow() {
        const tbody = document.querySelector('#tests-table tbody');
        const row = document.createElement('tr');

        row.innerHTML = \`
            <td><input type="text" name="tests[analyte][]" required></td>
            <td><input type="text" name="tests[method][]" required></td>
            <td><input type="text" name="tests[cutoff][]" required></td>
            <td>
                <SearchableSelectField name="tests[result][]" required>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                    <option value="Within Normal Range">Within Normal Range</option>
                    <option value="Above Normal Range">Above Normal Range</option>
                </SearchableSelectField>
            </td>
            <td><input type="text" name="tests[units][]" required></td>
            <td><button type="button" class="btn-remove-test" onclick="removeTestRow(this)">Remove</button></td>
        \`;

        tbody.appendChild(row);
    }

    function removeTestRow(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }

    function extractToxicologyFormData() {
        // Create an object to store all form data
        const formData = {
            specimenInfo: {},
            tests: [],
            interpretation: {},
            qualityControl: {}
        };

        // Extract specimen information
        formData.specimenInfo = {
            typeOfSpecimen: document.getElementById('type_of_specimen').value,
            specimenSource: document.getElementById('specimen_source').value,
            numberOfSpecimens: document.getElementById('number_of_specimens').value,
            volumeCollected: document.getElementById('volume_collected').value,
            volumeUnit: document.getElementById('volume_unit').value,
            weight: document.getElementById('weight').value,
            weightUnit: document.getElementById('weight_unit').value,
            sampleCondition: document.getElementById('sample_condition').value,
            colorConsistency: document.getElementById('color_consistency').value,
            tissueDescription: document.getElementById('tissue_description').value,
            margins: document.getElementById('margins').value
        };

        // Extract tests data
        const testRows = document.querySelectorAll('#tests-table tbody tr');
        testRows.forEach(row => {
            const test = {
                analyte: row.querySelector('input[name="tests[analyte][]"]').value,
                method: row.querySelector('input[name="tests[method][]"]').value,
                cutoff: row.querySelector('input[name="tests[cutoff][]"]').value,
                result: row.querySelector('select[name="tests[result][]"]').value,
                units: row.querySelector('input[name="tests[units][]"]').value
            };
            formData.tests.push(test);
        });

        // Extract interpretation data
        formData.interpretation = {
            detectedSubstances: document.getElementById('detected_substances').value,
            therapeuticRange: document.getElementById('therapeutic_range').value,
            toxicRange: document.getElementById('toxic_range').value,
            lethalRange: document.getElementById('lethal_range').value,
            clinicalEffects: document.getElementById('clinical_effects').value
        };

        // Extract quality control data
        formData.qualityControl = {
            internalControls: document.getElementById('internal_controls').value,
            externalQuality: document.getElementById('external_quality').value,
            labAccreditation: document.getElementById('lab_accreditation').value
        };

        // Log the extracted data to console for debugging
        console.log('Extracted Toxicology Form Data:', formData);
        
        return formData;
    }


function submitToxicologyForm() {

    $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'processLabTemplate', $requestLab->id, $patientVisit->id, $template]) -->',
        type: 'POST',
        data: extractToxicologyFormData(),
        success: function(response) {
            alertify.log(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

document.getElementById('process_toxicology_report').addEventListener('submit', function(event) {
    event.preventDefault();
    submitToxicologyForm();
    $('#labRequestResultDialog').modal("hide");
});


</script>

`;

export default function ElementElementRequestLabsToxicology() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
