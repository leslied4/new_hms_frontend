const rawHtml = `

    <div class="container mt-4">
        <div class="d-flex align-items-center justify-content-between">

            <h2 class="text-center mb-4">Molecular Test Report</h2>
            <div>
                <button type="button" class="btn btn-success btn-sm" id="molecular_addTestBtn">
                    <i class="bi bi-plus-circle"></i> Add Test
                </button>
            </div>
        </div>
        
        <form id="molecular_molecularTestForm" class="needs-validation" novalidate>

            <div id="molecular_testsContainer">
                <!-- Test entries will be added here dynamically -->
            </div>

            <!-- Template for test entry (hidden) -->
            <template id="molecular_testEntryTemplate">
                <div class="test-entry mb-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Test #<span class="test-number"></span></h5>
                        <button type="button" class="btn btn-danger btn-sm remove-test">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                    <div class="">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Test Name</label>
                                <SearchableSelectField class="form-select test-name form-control" required>
                                    <option value="">Select</option>
                                    <option value="pcr">PCR for SARS-CoV-2</option>
                                    <option value="brca">BRCA1 & BRCA2 Genetic Panel</option>
                                    <option value="wes">Whole Exome Sequencing</option>
                                </SearchableSelectField>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Methodology</label>
                                <SearchableSelectField class="form-select methodology form-control" required>
                                    <option value="">Select</option>
                                    <option value="rt-pcr">RT-PCR</option>
                                    <option value="ngs">Next-Gen Sequencing</option>
                                    <option value="microarray">Microarray</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Equipment Used</label>
                                <SearchableSelectField class="form-select equipment-used form-control" required>
                                    <option value="">Select</option>
                                    <option value="thermo">Thermo Fisher QuantStudio</option>
                                    <option value="illumina">Illumina NovaSeq</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <!-- Results Section for this test -->
                        <div class="results-section mt-3">
                            <h6>Results</h6>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Gene/Target Name</label>
                                    <input type="text" class="form-control gene-target" placeholder="e.g., BRAF V600E">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Mutation/Variant Detected</label>
                                    <SearchableSelectField class="form-select mutation-detected form-control">
                                        <option value="">Select</option>
                                        <option value="positive">Positive</option>
                                        <option value="negative">Negative</option>
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label class="form-label">Viral Load (copies/mL)</label>
                                    <input type="number" class="form-control viral-load">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label class="form-label">Coverage Depth (x)</label>
                                    <input type="number" class="form-control coverage-depth">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label class="form-label">Quality Score</label>
                                    <SearchableSelectField class="form-select quality-score form-control">
                                        <option value="">Select</option>
                                        <option value="pass">PASS</option>
                                        <option value="fail">FAIL</option>
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Interpretation</label>
                                <textarea class="form-control interpretation" rows="2" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </template>



            <!-- Action Buttons -->
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                <button type="reset" class="btn btn-secondary me-md-2">Reset Form</button>
                <button type="submit" class="btn btn-primary">Submit Report</button>
            </div>
        </form>
    </div>


    <script>
        // ... existing code ...

        // Molecular Test Report Form Specific Functions
        // Initialize Select2 for dropdowns

        // Initialize form validation
        var molecularForm = document.getElementById('molecular_molecularTestForm');
        if (molecularForm) {
            molecularForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (validateMolecularForm()) {
                    const formData = extractMolecularFormData();
                    console.log('Extracted Form Data:', formData);
                    // You can now use formData object to:
                    // 1. Send to server via AJAX
                    // 2. Save to localStorage
                    // 3. Export as JSON
                    // 4. Or any other processing you need
                }
            });
        }

        // Handle adding new test entries
        var addTestBtn = document.getElementById('molecular_addTestBtn');
        var testsContainer = document.getElementById('molecular_testsContainer');
        var testTemplate = document.getElementById('molecular_testEntryTemplate');
        var testCounter = 0;

        if (addTestBtn && testsContainer && testTemplate) {
            addTestBtn.addEventListener('click', function () {
                testCounter++;
                const testEntry = testTemplate.content.cloneNode(true);

                // Update test number
                testEntry.querySelector('.test-number').textContent = testCounter;

                // Add the new test entry to the container
                testsContainer.appendChild(testEntry);

                // Initialize Select2 for the new entry's dropdowns
                const newEntry = testsContainer.lastElementChild;
                // $(newEntry).find('.select2').select2({
                //     theme: 'bootstrap-5',
                //     width: '100%'
                // });

                // Add event listener for test name change
                const testNameSelect = newEntry.querySelector('.test-name');
                const methodologySelect = newEntry.querySelector('.methodology');
                const equipmentSelect = newEntry.querySelector('.equipment-used');

                testNameSelect.addEventListener('change', function () {
                    const selectedTest = this.value;

                    // Reset methodology and equipment
                    methodologySelect.value = '';
                    equipmentSelect.value = '';

                    // Set appropriate methodology and equipment based on test
                    switch (selectedTest) {
                        case 'pcr':
                            methodologySelect.value = 'rt-pcr';
                            equipmentSelect.value = 'thermo';
                            break;
                        case 'brca':
                        case 'wes':
                            methodologySelect.value = 'ngs';
                            equipmentSelect.value = 'illumina';
                            break;
                    }
                });

                // Add event listener for remove button
                const removeBtn = newEntry.querySelector('.remove-test');
                removeBtn.addEventListener('click', function () {
                    newEntry.remove();
                });
            });

            // Add first test entry by default
            addTestBtn.click();
        }

        // Set current date for sign-off date
        var signOffDate = document.getElementById('molecular_signOffDate');
        if (signOffDate) {
            const today = new Date().toISOString().split('T')[0];
            signOffDate.value = today;
        }

        // Set current date-time for specimen collected
        var specimenCollected = document.getElementById('molecular_specimenCollected');
        if (specimenCollected) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            specimenCollected.value = \`\${year}-\${month}-\${day}T\${hours}:\${minutes}\`;
        }


        // Molecular form validation
        function validateMolecularForm() {
            let isValid = true;
            const form = document.getElementById('molecular_molecularTestForm');
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');

                    // Add error message if it doesn't exist
                    if (!field.nextElementSibling?.classList.contains('invalid-feedback')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'invalid-feedback';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('is-invalid');
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage?.classList.contains('invalid-feedback')) {
                        errorMessage.remove();
                    }
                }
            });

            // Validate numeric fields
            const numericFields = form.querySelectorAll('input[type="number"]');
            numericFields.forEach(field => {
                if (field.value && isNaN(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    if (!field.nextElementSibling?.classList.contains('invalid-feedback')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'invalid-feedback';
                        errorMessage.textContent = 'Please enter a valid number';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                }
            });

            // Validate that at least one test is added
            const testEntries = form.querySelectorAll('.test-entry');
            if (testEntries.length === 0) {
                isValid = false;
                const testsContainer = document.getElementById('molecular_testsContainer');
                if (!testsContainer.nextElementSibling?.classList.contains('invalid-feedback')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'invalid-feedback';
                    errorMessage.textContent = 'At least one test is required';
                    testsContainer.parentNode.insertBefore(errorMessage, testsContainer.nextSibling);
                }
            }

            return isValid;
        }

        // Function to extract form data
        function extractMolecularFormData() {
            const formData = {
                tests: []
            };

            // Get all test entries
            const testEntries = document.querySelectorAll('.test-entry');
            
            testEntries.forEach((entry, index) => {
                const testData = {
                    testNumber: index + 1,
                    testName: entry.querySelector('.test-name').value,
                    methodology: entry.querySelector('.methodology').value,
                    equipmentUsed: entry.querySelector('.equipment-used').value,
                    results: {
                        geneTarget: entry.querySelector('.gene-target').value,
                        mutationDetected: entry.querySelector('.mutation-detected').value,
                        viralLoad: entry.querySelector('.viral-load').value,
                        coverageDepth: entry.querySelector('.coverage-depth').value,
                        qualityScore: entry.querySelector('.quality-score').value,
                        interpretation: entry.querySelector('.interpretation').value
                    }
                };
                
                formData.tests.push(testData);
            });

            return formData;
        }

        function submitMolecularForm() {

            $.ajax({
                url: '<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'processLabTemplate', $requestLab->id, $patientVisit->id, $template]) -->',
                type: 'POST',
                data: extractMolecularFormData(),
                success: function(response) {
                    alertify.log(response);
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
        }

        document.getElementById('molecular_molecularTestForm').addEventListener('submit', function(event) {
            event.preventDefault();
            submitMolecularForm();
            $('#labRequestResultDialog').modal("hide");
        });

        // ... existing code ...
    </script>

`;

export default function ElementElementRequestLabsMolecular() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
