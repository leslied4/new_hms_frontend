const rawHtml = `
<style>
    /* Slider container styles */
    .slider-container {
        width: 100%;
        overflow: hidden;
    }

    /* Slide wrapper */
    .slides {
        display: flex;
        transition: transform 0.3s ease-in-out;
    }

    /* Individual slides */
    .slide {
        min-width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }

    /* Arrows */
    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        border-radius: 50%;
        z-index: 10;
    }

    .arrow:hover {
        background-color: #0056b3;
    }

    .arrow.left {
        left: 10px;
    }

    .arrow.right {
        right: 10px;
    }

    /* Slide content styles */
    .section-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .detail-row {
        margin-bottom: 8px;
    }

    .label {
        font-weight: bold;
    }

    .value {
        margin-left: 8px;
    }
</style>
<style>
    .card {
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        background-color: #fff;
    }

    .card-title {
        font-size: 1.2rem;
        font-weight: 600;
    }

    .hidden-section {
        display: none;
    }

    .form-control {
        border-radius: 5px;
        border: 1px solid #ced4da;
        padding: 0.5rem;
    }

    .form-check-input:checked {
        background-color: #007bff;
        border-color: #007bff;
    }

    .form-card {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        padding: 30px;
    }
    .section-header {
        color: #3498db;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .form-check-input:checked {
        background-color: #3498db;
        border-color: #3498db;
    }

    .summary-card {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        padding: 30px;
    }
    .section-header {
        color: #3498db;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .detail-row {
        margin-bottom: 15px;
        padding: 10px;
        border-radius: 8px;
        transition: background-color 0.3s ease;
    }
    .detail-row:hover {
        background-color: #f8f9fa;
    }
    .label {
        font-weight: bold;
        color: #2c3e50;
    }
    .value {
        color: #34495e;
    }

    .check-sets {
        position: relative;
    }
    .check-set {
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .check-set.active {
        display: block;
        opacity: 1;
    }
    .list-group-item {
        border-left: none;
        border-right: none;
    }


</style>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    body {
        background-color: #f5f7fa;
        color: #333;
        padding: 20px;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .header-title {
        color: #1e40af;
        font-size: 24px;
        font-weight: bold;
    }
    
    .header-info {
        color: #64748b;
        font-size: 14px;
        margin-top: 5px;
    }
    
    .last-updated {
        background-color: #e0f2fe;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
    }
    
    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }
    
    .card {
        background-color: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
    }
    
    .card-title {
        color: #1e40af;
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 8px;
        border-bottom: 1px solid #e2e8f0;
        margin: 0;
        margin-bottom: 12px;
    }
    
    .label {
        color: #64748b;
        font-size: 14px;
        margin-bottom: 4px;
    }
    
    .value {
        font-weight: 500;
        margin-bottom: 8px;
    }
    
    .list {
        list-style-type: disc;
        padding-left: 20px;
    }
    
    .button {
        background: none;
        border: none;
        color: #2563eb;
        cursor: pointer;
        font-size: 12px;
        margin-left: 8px;
    }
    
    .button:hover {
        color: #1e40af;
    }
    
    .checkbox {
        height: 16px;
        width: 16px;
        background-color: #e2e8f0;
        border-radius: 4px;
        display: inline-block;
    }
    
    .checkbox.checked {
        background-color: #3b82f6;
    }
    
    .alert {
        display: inline-block;
        background-color: #fee2e2;
        color: #b91c1c;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 8px;
    }
    
    .vitals-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }
    
    .vital-box {
        background-color: #f8fafc;
        padding: 8px;
        border-radius: 6px;
    }
    
    .vital-label {
        font-size: 12px;
        color: #64748b;
    }
    
    .vital-value {
        font-size: 18px;
        font-weight: bold;
    }
    
    .med-item, .test-item, .intervention-item {
        padding: 8px;
        border-radius: 6px;
        margin-bottom: 12px;
    }
    
    .med-item {
        background-color: #f0fdf4;
    }
    
    .med-inactive {
        background-color: #f8fafc;
    }
    
    .med-header, .test-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    
    .status-pill {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 100px;
        font-weight: 500;
    }
    
    .status-active {
        background-color: #dcfce7;
        color: #166534;
    }
    
    .status-inactive {
        background-color: #e2e8f0;
        color: #475569;
    }
    
    .status-abnormal {
        background-color: #fef3c7;
        color: #92400e;
    }
    
    .status-normal {
        background-color: #dcfce7;
        color: #166534;
    }
    
    .med-details, .test-details {
        font-size: 14px;
        color: #64748b;
    }
    
    .goal-item {
        display: flex;
        margin-bottom: 8px;
    }
    
    .goal-bullet {
        color: #3b82f6;
        margin-right: 8px;
    }
    
    .intervention-item {
        background-color: #f8fafc;
    }
    
    .intervention-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .status-indicator {
        display: flex;
        align-items: center;
    }
    
    .status-dot {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        margin-right: 4px;
    }
    
    .status-text {
        font-size: 12px;
    }
    
    .adherence-label {
        font-size: 12px;
        color: #64748b;
        margin-bottom: 4px;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background-color: #e2e8f0;
        border-radius: 100px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        border-radius: 100px;
    }
    
    .progress-high {
        background-color: #4CAF50;
    }
    
    .progress-medium {
        background-color: #FFC107;
    }
    
    .progress-low {
        background-color: #F44336;
    }
    
    .adherence-value {
        text-align: right;
        font-size: 12px;
        margin-top: 4px;
    }
    
    .appointment-item, .team-item {
        padding: 12px 0;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .appointment-header, .team-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    
    .appointment-provider, .team-role {
        font-size: 14px;
        color: #64748b;
    }
    
    .team-contact {
        font-size: 14px;
        color: #2563eb;
    }
    
    .updates-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    
    .update-item {
        background-color: #eff6ff;
        padding: 12px;
        border-radius: 6px;
    }
    
    .update-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    
    .update-date {
        font-size: 14px;
        color: #64748b;
    }
    
    .update-author {
        font-size: 14px;
    }
    
    .legend-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
    }
    
    .legend-dot {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        margin-right: 8px;
    }
    
    /* Status Colors */
    .stable {
        background-color: #4CAF50;
    }
    
    .needs-modification {
        background-color: #FFC107;
    }
    
    .requires-intervention {
        background-color: #F44336;
    }
    
    .improving {
        background-color: #03A9F4;
    }
    
    .at-risk {
        background-color: #FF5722;
    }
    
    .controlled {
        background-color: #009688;
    }
    
    /* Responsive adjustments */
    @media (max-width: 900px) {
        .dashboard-grid {
            grid-template-columns: 1fr;
        }
        
        .updates-grid, .legend-grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Treatment Plan </span>
			</div>
			<ul class="nav nav-tabs" id="requestTab">
				<li class="nav-item request_lab">
					<a href="#showTreatmentDashboard" data-toggle="tab">Dashboard</a>
				</li>

				<li class="nav-item request_lab">
					<a href="#showTreatmentAccordion" data-toggle="tab">Detail View And Additions</a>
				</li>


			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane request_lab_content" id="showTreatmentDashboard">
                    <div class="container">

                        
                        <!-- Main Dashboard Grid -->
                        <div class="dashboard-grid">
                            <!-- Left Column -->
                            <div>
                                <!-- Diagnosis Card -->
                                <div class="card">
                                    <h2 class="card-title">Diagnosis Summary</h2>
                                    <div class="diagnoses-list-class">
                                        
                                    </div>
                                </div>
                                <!-- Care Goals -->
                                <div class="card">
                                    <h2 class="card-title">Care Goals</h2>
                                    <div id="care_goals_tp_dashboard">
                                        
                                    </div>
                                </div>

                                <!-- Vital Signs -->
                                <div class="card">
                                    <h2 class="card-title">Vital Signs Monitoring</h2>
                                    <div class="vitals-grid">
                                        <div class="vital-box">
                                            <p class="vital-label">Blood Pressure(mmHg)</p>
                                            <p class="vital-value" id="blood_pressure_tp_dashboard"></p>
                                        </div>
                                        <div class="vital-box">
                                            <p class="vital-label">Respiratory Rate(bpm)</p>
                                            <p class="vital-value" id="resp_rate_tp_dashboard"></p>
                                        </div>
                                        <div class="vital-box">
                                            <p class="vital-label">Temperature(°C)</p>
                                            <p class="vital-value" id="temperature_tp_dashboard"></p>
                                        </div>
                                        <div class="vital-box">
                                            <p class="vital-label">SpO2(%)</p>
                                            <p class="vital-value" id="spo_tp_dashboard"></p>
                                        </div>
                                        <div class="vital-box">
                                            <p class="vital-label">Weight(kg)</p>
                                            <p class="vital-value" id="weight_tp_dashboard"></p>
                                        </div>
                                        <div class="vital-box">
                                            <p class="vital-label">BMI(kg/m²)</p>
                                            <p class="vital-value" id="bmi_tp_dashboard"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Middle Column -->
                            <div>
                                <!-- Medications -->
                                <div class="card">
                                    <h2 class="card-title">Medications</h2>
                                    <div id="medication_dashboard_tp">

                                    </div>
                                </div>
                                
                                <!-- Investigations -->
                                <div class="card">
                                    <h2 class="card-title">Investigations</h2>
                                    <div id="investigation_dashboard_tp">

                                        <!-- <div class="test-item">
                                            <div class="test-header">
                                                <p class="value">Lipid Panel</p>
                                                <span class="status-pill status-abnormal">Abnormal</span>
                                            </div>
                                            <div class="test-details" style="display: flex; justify-content: space-between;">
                                                <p>LDL: 130</p>
                                                <p>2025-02-01</p>
                                            </div>
                                        </div>
                                        <div class="test-item">
                                            <div class="test-header">
                                                <p class="value">Creatinine</p>
                                                <span class="status-pill status-normal">Normal</span>
                                            </div>
                                            <div class="test-details" style="display: flex; justify-content: space-between;">
                                                <p>0.9</p>
                                                <p>2025-02-01</p>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                

                            </div>
                            
                            <!-- Right Column -->
                            <div>
                                <!-- Intervention Status -->
                                <div class="card d-none">
                                    <h2 class="card-title">Intervention Status</h2>
                                    <div>
                                        <div class="intervention-item">
                                            <div class="intervention-header">
                                                <p class="value">Diabetes Management</p>
                                                <div class="status-indicator">
                                                    <div class="status-dot needs-modification"></div>
                                                    <span class="status-text">Needs Modification</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="adherence-label">Adherence</p>
                                                <div class="progress-bar">
                                                    <div class="progress-fill progress-medium" style="width: 70%"></div>
                                                </div>
                                                <p class="adherence-value">70%</p>
                                            </div>
                                        </div>
                                        <div class="intervention-item">
                                            <div class="intervention-header">
                                                <p class="value">Blood Pressure Control</p>
                                                <div class="status-indicator">
                                                    <div class="status-dot stable"></div>
                                                    <span class="status-text">Stable</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="adherence-label">Adherence</p>
                                                <div class="progress-bar">
                                                    <div class="progress-fill progress-high" style="width: 95%"></div>
                                                </div>
                                                <p class="adherence-value">95%</p>
                                            </div>
                                        </div>
                                        <div class="intervention-item">
                                            <div class="intervention-header">
                                                <p class="value">Dietary Changes</p>
                                                <div class="status-indicator">
                                                    <div class="status-dot at-risk"></div>
                                                    <span class="status-text">At Risk</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="adherence-label">Adherence</p>
                                                <div class="progress-bar">
                                                    <div class="progress-fill progress-low" style="width: 45%"></div>
                                                </div>
                                                <p class="adherence-value">45%</p>
                                            </div>
                                        </div>
                                        <div class="intervention-item">
                                            <div class="intervention-header">
                                                <p class="value">Exercise Regimen</p>
                                                <div class="status-indicator">
                                                    <div class="status-dot improving"></div>
                                                    <span class="status-text">Improving</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="adherence-label">Adherence</p>
                                                <div class="progress-bar">
                                                    <div class="progress-fill progress-medium" style="width: 60%"></div>
                                                </div>
                                                <p class="adherence-value">60%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <!-- Footer - Recent Updates -->
                        <div class="card">
                            <h2 class="card-title">Recent Updates</h2>
                            <div class="updates-grid" id="recent_update_tp_section">
                                
                            </div>
                        </div>
                        
                        <!-- Status Legend -->
                        <div class="card">
                            <h2 class="card-title">Intervention Status Legend</h2>
                            <div class="legend-grid">
                                <div class="legend-item">
                                    <div class="legend-dot stable"></div>
                                    <span>Stable</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot needs-modification"></div>
                                    <span>Needs Modification</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot requires-intervention"></div>
                                    <span>Requires Immediate Intervention</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot improving"></div>
                                    <span>Improving</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot at-risk"></div>
                                    <span>At Risk</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot controlled"></div>
                                    <span>Controlled</span>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>

				<div class="tab-pane " id="showTreatmentAccordion">
                    <div id="accordion" style="max-width: 60vw; margin: 0 auto;">
                        <div class="accordion-item" id="clinicalDecisionSupport" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#A96424"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-640v560h560v-560h-80v280l-100-60-100 60v-280H200Zm0 560v-560 560Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Clinical Decision Support</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Clinical Decision Support</h3>
                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Utilize tools for patient risk stratification and evidence-based pathways, including screenings for preventive care.</p>

                                                <p><strong>How to Use:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Click the Update button to input data into decision support tools, document risk assessments, and outline recommended care pathways.</small></li>
                                                    <li><small><strong>View Info:</strong> Select the View button to review past clinical decisions and recommendations. Navigate through them using the Previous and Next buttons to evaluate decision-making processes.</small></li>
                                                </ul>

                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="cds_section_update" onclick="javascript:showOnClick('cds_section_form', 'cds_section_view_btn');hideOnClick('cds_section_update', 'cds_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="cds_section_view_btn" onclick="javascript:hideOnClick('cds_section_form', 'cds_section_view_btn');showOnClick('cds_section_update', 'cds_section_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="cds_section_form" style="display:none">
                                        <!-- Risk Stratification -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Risk Stratification</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="risk_stratification" id="riskLow" value="Low">
                                                <label class="form-check-label" for="riskLow">Low Risk</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="risk_stratification" id="riskModerate" value="Moderate">
                                                <label class="form-check-label" for="riskModerate">Moderate Risk</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="risk_stratification" id="riskHigh" value="High">
                                                <label class="form-check-label" for="riskHigh">High Risk</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Risk Factors</label>
                                                <textarea class="form-control" name="risk_factors" id="riskFactors" placeholder="E.g., age, comorbidities, lifestyle factors" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Evidence-Based Treatment Pathways -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Evidence-Based Treatment Pathways</h5>
                                            <div class="mb-4">
                                                <h5 class="section-header">Pathway Selection</h5>
                                                <div class="form-group">
                                                    <label for="conditionDisease">Condition/Disease:</label>
                                                    <SearchableSelectField onchange="handleDiagnosisSelectUpdate()" class="form-control selectpicker" id="diagnosis_selectoptions" name="condition_disease_record_id[]" multiple>
                                                        <option value="">Select Condition/Disease</option>
                                                    </SearchableSelectField>

                                                </div>
                                                <div id="selected_diagnosis" class="d-flex flex-wrap">

                                                    
                                                </div>
                                            </div>

                                            <div class="mb-4">
                                                <h5 class="section-header">Diagnostic Details</h5>
                                                <div class="form-group">
                                                    <label for="diagnosticsCompleted">Diagnostics Completed:</label>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" id="diagnosticsYes" name="diagnostics_completed" value="Yes" checked onchange="checkRadioValue()">
                                                        <label class="form-check-label" for="diagnosticsYes">Yes</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" id="diagnosticsNo" name="diagnostics_completed" value="No" onchange="checkRadioValue()">
                                                        <label class="form-check-label" for="diagnosticsNo">No</label>
                                                    </div>
                                                </div>
                                                <div class="form-group" id="required_tests_inf_no" style="display:none">
                                                    <label for="pendingTests">Required Tests/Investigations:</label>
                                                    <div class="form-check">
                                                        <label class="form-check-label" for="laboratoryTests">Laboratory Tests (e.g., CBC, Blood Glucose)</label>
                                                        <input type="text" class="form-control" id="laboratoryTestsDetails" name="pending_laboratory_tests_details" placeholder="Details">
                                                    </div>
                                                    <div class="form-check">
                                                        <label class="form-check-label" for="imaging">Imaging (e.g., X-Ray, Ultrasound)</label>
                                                        <input type="text" class="form-control" id="imagingDetails" name="pending_imaging_details" placeholder="Details">
                                                    </div>
                                                    <div class="form-check">
                                                        <label class="form-check-label" for="others">Others</label>
                                                        <input type="text" class="form-control" id="othersDetails" name="pending_others_details" placeholder="Details">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="findingsSummary">Findings Summary:</label>
                                                    <textarea class="form-control" id="findingsSummary" name="findings_summary" rows="2"></textarea>
                                                </div>
                                            </div>

                                            <div class="mb-4">
                                                <h5 class="section-header">First-Line Therapy</h5>
                                                <div id="firstline_therapy">
                                                    <div class="d-flex flex-wrap">
                                                        <div class="col-md-6 form-group">
                                                            <label for="primaryTreatment">Primary Treatment/Drug:</label>
                                                            <textarea class="form-control" id="primaryTreatment" name="primary_treatment[]" rows="2"></textarea>
                                                        </div>
                                                        <div class="col-md-6 form-group">
                                                            <label for="dosageDosing">Dosage & Dosing:</label>
                                                            <textarea class="form-control" id="dosageDosing" name="dosage_dosing[]" rows="2"></textarea>
                                                        </div>
                                                        <div class="col-md-10 form-group">
                                                            <label for="firstLineTherapyNotes">Notes:</label>
                                                            <textarea class="form-control" id="firstLineTherapyNotes" name="first_line_therapy_notes[]" rows="2"></textarea>
                                                        </div>
                                                        <div class="col-md-2 d-flex align-items-end form-group">
                                                            <button type="button" class="btn btn-xs btn-outline-info" onclick="createFirstline()">+ add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mb-4">
                                                <h5 class="section-header">Alternative/Second-Line Therapy</h5>
                                                <div id="secondline_therapy">
                                                    <div class="d-flex flex-wrap justify-content-between">
                                                        <div class="form-group col-md-4">
                                                            <label for="alternativeTreatment">Alternative Treatment/Drug:</label>
                                                            <textarea class="form-control" id="alternativeTreatment" name="alternative_treatment[]" rows="2"></textarea>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                            <label for="indicationForUse">Indication for Use:</label>
                                                            <textarea class="form-control" id="indicationForUse" name="indication_for_use[]" rows="2"></textarea>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                            <label for="alternativeTherapyDosage">Dosage & Dosing:</label>
                                                            <textarea class="form-control" id="alternativeTherapyDosage" name="therapy_dosage[]" rows="2"></textarea>
                                                        </div>
                                                        <div class="form-group col-md-11">
                                                            <label for="alternativeTherapyNotes">Notes:</label>
                                                            <textarea class="form-control" id="alternativeTherapyNotes" name="alternative_therapy_notes[]" rows="2"></textarea>
                                                        </div>
                                                        <div class="d-flex align-items-end">
                                                            <button type="button" class="btn btn-xs btn-outline-info" onclick="addSecondline()">+add</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="mb-4">
                                                <h5 class="section-header">Adjunct Therapies</h5>
                                                <div class="form-group">
                                                    <label for="painManagement">Pain Management:</label>
                                                    <input type="text" class="form-control" id="painManagement" name="pain_management">
                                                </div>
                                                <div class="form-group">
                                                    <label for="supportiveCare">Supportive Care:</label>
                                                    <input type="text" class="form-control" id="supportiveCare" name="supportive_care">
                                                </div>
                                                <div class="form-group">
                                                    <label for="prophylaxis">Prophylaxis:</label>
                                                    <input type="text" class="form-control" id="prophylaxis" name="prophylaxis">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Evidence-Based Treatment Pathways -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Pathway Adherene</h5>

                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="pathway_adherence" id="adherenceFull" value="Full">
                                                <label class="form-check-label" for="adherenceFull">Full</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="pathway_adherence" id="adherenceModified" value="Modified">
                                                <label class="form-check-label" for="adherenceModified">Modified</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="pathway_adherence" id="adherenceAlternative" value="Alternative">
                                                <label class="form-check-label" for="adherenceAlternative">Alternative</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">If Modified, Rationale</label>
                                                <textarea class="form-control" name="modification_rationale" id="modificationRationale" placeholder="E.g., patient preferences, contraindications" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Preventive Care Due -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Preventive Care Due</h5>
                                            <label class="">Immunizations:</label>
                                            <div class="detail-row">
                                                <SearchableSelectField class="form-control mb-1 selectpicker" name="immunizations[]" id="immunizationsSelect" multiple>
                                                    <option value="">Select Immunizations</option>
                                                    <option value="influenza">Influenza</option>
                                                    <option value="pneumococcal">Pneumococcal</option>
                                                    <option value="COVID-19">COVID-19</option>
                                                    <option value="tetanusBooster">Tetanus Booster</option>
                                                </SearchableSelectField>
                                                <input type="text" name="immunizations_value" class="form-control" id="immunizationsValue" placeholder="Specify immunizations">
                                            </div>
                                            <label class="">Cancer Screenings:</label>
                                            <div class="detail-row">
                                                <SearchableSelectField class="form-control mb-1 selectpicker" name="cancer_screenings[]" id="cancerScreeningsSelect" multiple>
                                                    <option value="">Select Cancer Screenings</option>
                                                    <option value="mammogram">Mammogram</option>
                                                    <option value="colonoscopy">Colonoscopy</option>
                                                    <option value="papSmear">Pap Smear</option>
                                                    <option value="prostateScreening">Prostate Screening</option>
                                                </SearchableSelectField>
                                                <input type="text" name="cancer_screenings_value" class="form-control" id="cancerScreeningsValue" placeholder="Specify cancer screenings">
                                            </div>
                                            <label class="">Other Preventive Services:</label>
                                            <div class="detail-row">

                                                <SearchableSelectField class="form-control mb-1 selectpicker" name="other_services[]" id="otherServicesSelect" multiple>
                                                    <option value="">Select Other Preventive Services</option>
                                                    <option value="cholesterolCheck">Cholesterol Check</option>
                                                    <option value="osteoporosisScreening">Osteoporosis Screening</option>
                                                    <option value="mentalHealthScreening">Mental Health Screening</option>
                                                </SearchableSelectField>

                                                <input type="text" name="other_services_value" class="form-control" id="otherServicesValue" placeholder="Specify other services">
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save Clinical Decision Support</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    <div id="cds_section_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div id="slides_clinical_decisions_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_clinical_decisions">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_clinical_decisions">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_clinical_decisions">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" id="socialDeterminantsOfHealth" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#264E5B"><path d="M350-63q-46 0-82.5-24T211-153q-16 21-40.5 32.5T120-109q-51 0-85.5-35T0-229q0-43 28-77.5T99-346q-14-20-21.5-42.5T70-436q0-40 20.5-75t57.5-57q5 18 13.5 38.5T181-494q-14 11-22 26.5t-8 32.5q0 56 46 69t87 21l19 32q-11 32-19 54.5t-8 40.5q0 30 21.5 52.5T350-143q38 0 63-34t41-80q16-46 24.5-93t13.5-72l78 21q-9 45-22 103t-36.5 110.5Q488-135 449.5-99T350-63ZM120-189q17 0 28.5-11.5T160-229q0-17-11.5-28.5T120-269q-17 0-28.5 11.5T80-229q0 17 11.5 28.5T120-189Zm284-158q-46-41-83.5-76.5t-64.5-69q-27-33.5-41.5-67T200-629q0-65 44.5-109.5T354-783q4 0 7 .5t7 .5q-4-10-6-20t-2-21q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h14q60 0 102 38.5t50 95.5q-18-3-40.5-3t-41.5 2q-7-23-25.5-38T606-703q-35 0-54.5 20.5T498-623h-37q-35-41-54.5-60.5T354-703q-32 0-53 21t-21 53q0 23 13 47.5t36.5 52q23.5 27.5 57 58.5t74.5 67l-57 57Zm76-436q17 0 28.5-11.5T520-823q0-17-11.5-28.5T480-863q-17 0-28.5 11.5T440-823q0 17 11.5 28.5T480-783ZM609-63q-22 0-43.5-6T524-88q11-14 22-33t20-35q11 7 22 10t22 3q32 0 53.5-22.5T685-219q0-19-8-41t-19-54l19-32q42-8 87.5-21t45.5-69q0-40-29.5-58T716-512q-42 0-98 16t-131 41l-21-78q78-25 139-42t112-17q69 0 121 41t52 115q0 25-7.5 47.5T861-346q43 5 71 39.5t28 77.5q0 50-34.5 85T840-109q-26 0-50.5-11.5T749-153q-20 42-56.5 66T609-63Zm232-126q17 0 28-11.5t11-28.5q0-17-11.5-29T840-270q-17 0-28.5 11.5T800-230q0 17 12 29t29 12Zm-721-40Zm360-594Zm360 593Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Social Determinants of Health</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Social Determinants of Health</h3>
                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Assess and document factors like housing status, transportation access, food security, social support, and financial barriers affecting patient care quality.</p>

                                                <p><strong>How to Use:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Select the Update button to record assessments of social determinants and plan interventions to address identified issues.</small></li>
                                                    <li><small><strong>View Info:</strong> Click the View button to review past assessments and interventions. Navigate through them using the Previous and Next buttons to monitor changes and impacts over time.</small></li>
                                                </ul>

                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="sdoh_section_update" onclick="javascript:showOnClick('sdoh_section_form', 'sdoh_section_view_btn');hideOnClick('sdoh_section_update', 'sdoh_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="sdoh_section_view_btn" onclick="javascript:hideOnClick('sdoh_section_form', 'sdoh_section_view_btn');showOnClick('sdoh_section_update', 'sdoh_section_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="sdoh_section_form" style="display:none">
                                        <!-- Housing Status -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Housing Status</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="housingStatus" id="housingStable" value="Stable">
                                                <label class="form-check-label" for="housingStable">Stable</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="housingStatus" id="housingTemporary" value="Temporary">
                                                <label class="form-check-label" for="housingTemporary">Temporary</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="housingStatus" id="housingHomeless" value="Homeless">
                                                <label class="form-check-label" for="housingHomeless">Homeless</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Additional Housing Notes</label>
                                                <textarea class="form-control" id="housingNotes" name="housing_notes" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Transportation Access -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Transportation Access</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="hasReliableVehicle" name="has_reliable_vehicle" value="Reliable Vehicle">
                                                <label class="form-check-label" for="hasReliableVehicle">Has Reliable Vehicle</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="hasPublicTransport" name="has_public_transport" value="Public Transport">
                                                <label class="form-check-label" for="hasPublicTransport">Public Transportation Available</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="needsTransportAssistance" name="needs_transport_assistance" value="Needs Transport Assistance">
                                                <label class="form-check-label" for="needsTransportAssistance">Needs Transportation Assistance</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Transportation Notes</label>
                                                <textarea class="form-control" id="transportationNotes" name="transportation_notes" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Food Security -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Food Security</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="foodSecurity" id="foodSecure" value="Secure">
                                                <label class="form-check-label" for="foodSecure">Food Secure</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="foodSecurity" id="foodInsecure" value="Insecure">
                                                <label class="form-check-label" for="foodInsecure">Food Insecure</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Food Security Notes</label>
                                                <textarea class="form-control" id="foodSecurityNotes" name="food_security_notes" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Social Support -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Social Support</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="hasFamily" name="has_family" value="Family">
                                                <label class="form-check-label" for="hasFamily">Family Support</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="hasFriends" name="has_friends" value="Friends">
                                                <label class="form-check-label" for="hasFriends">Friend Support</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="hasCommunity" name="has_community" value="Community">
                                                <label class="form-check-label" for="hasCommunity">Community Support</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Social Support Notes</label>
                                                <textarea class="form-control" id="socialSupportNotes" name="social_support_notes" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Financial Barriers to Care -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Financial Barriers to Care</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="financialBarriersMedications" name="financial_barriers_medications" value="Difficulty Affording Medications">
                                                <label class="form-check-label" for="financialBarriersMedications">Difficulty Affording Medications</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="financialBarriersAppointments" name="financial_barriers_appointments" value="Difficulty Affording Appointments">
                                                <label class="form-check-label" for="financialBarriersAppointments">Difficulty Affording Appointments</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="financialBarriersTreatments" name="financial_barriers_treatments" value="Difficulty Affording Treatments">
                                                <label class="form-check-label" for="financialBarriersTreatments">Difficulty Affording Treatments</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Financial Barriers Notes</label>
                                                <textarea class="form-control" id="financialBarriersNotes" name="financial_barriers_notes" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Resource Referrals -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Resource Referrals</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="transportationServices" name="transportation_services" value="Transportation Services">
                                                <label class="form-check-label" for="transportationServices">Transportation Services</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="foodAssistance" name="food_assistance" value="Food Assistance">
                                                <label class="form-check-label" for="foodAssistance">Food Assistance</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="housingResources" name="housing_resources" value="Housing Resources">
                                                <label class="form-check-label" for="housingResources">Housing Resources</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="financialCounseling" name="financial_counseling" value="Financial Counseling">
                                                <label class="form-check-label" for="financialCounseling">Financial Counseling</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Other Referrals</label>
                                                <textarea class="form-control" id="otherReferrals" name="other_referrals" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save SDOH Assessment</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    <div id="sdoh_section_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div class="" id="slides_health_social_determinants_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_health_social_determinants">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_health_social_determinants">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_health_social_determinants">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" id="medicalManagement" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M420-260h120v-100h100v-120H540v-100H420v100H320v120h100v100ZM280-120q-33 0-56.5-23.5T200-200v-440q0-33 23.5-56.5T280-720h400q33 0 56.5 23.5T760-640v440q0 33-23.5 56.5T680-120H280Zm0-80h400v-440H280v440Zm-40-560v-80h480v80H240Zm40 120v440-440Z"/></svg>
                                </span>
                                <span style="font-size: 16px"> Medication Management</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">

                                <div id="current-medications">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4" >Current Medications</h3>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="medication_section_update" onclick="javascript:showOnClick('actions', 'medication_section_form', 'medication_section_view_btn');hideOnClick('medication_section_update', 'medication_section_allergy', 'medication_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="medication_section_view_btn" onclick="javascript:hideOnClick('actions', 'medication_section_form', 'medication_section_view_btn');showOnClick('medication_section_update', 'medication_section_allergy', 'medication_section_view')">
                                                    view
                                                </button>
                                                <button class="btn btn-md" onclick="javascript:drugInteractionModal()" id="medication_interaction_btn">
                                                    Drug Interactions
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <table class="table table-hover order-column full-width" id="treatment_medications_table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Date Created</th>
                                                    <th scope="col">Medication</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Note</th>
                                                    <th scope="col">Order Details</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                            
                                            </tbody>
                                        </table>
                                    </div>


                                    <form method="post" class="row" id="medication_section_form" style="display:none">
                                        <div class="col-md-6">
                                            <div class="card shadow-sm">
                                                <div class="card-body">
                                                    <h3 class="card-title text-primary mb-4">Medication Safety Checks</h3>
                            
                                                    <div class="mb-4">
                                                        <h5>Drug Interactions Reviewed</h5>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="drug_reviewed" value="yes" id="insuranceYes" onclick="toggleInput('drugInteractionTp', true)">
                                                            <label class="form-check-label" for="insuranceYes">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="drug_reviewed" value="no" checked="True" id="insuranceNo" onclick="toggleInput('drugInteractionTp', false)">
                                                            <label class="form-check-label" for="insuranceNo">No</label>
                                                        </div>
                                                        <div id="drugInteractionTp" class="hidden-section mt-3" style="display: none;">
                                                            <label for="insuranceDetails" class="form-label">Details:</label>
                                                            <input name="drug_reviewed_details" type="text" class="form-control" id="insuranceDetails" placeholder="Enter details...">
                                                        </div>
                                                    </div>
                            
                                                    <div class="mb-4">
                                                        <h5>Renal Dose Adjustments Needed</h5>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="renal_dose" value="yes" id="genericYes" onclick="toggleInput('renalDoseInfoTp', true)">
                                                            <label class="form-check-label" for="genericYes">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="renal_dose" value="no" checked="True" id="genericNo" onclick="toggleInput('renalDoseInfoTp', false)">
                                                            <label class="form-check-label" for="genericNo">No</label>
                                                        </div>
                                                        <div id="renalDoseInfoTp" class="hidden-section mt-3" style="display: none;">
                                                            <label for="genericDetails" class="form-label">Details:</label>
                                                            <input type="text" name="renal_dose_details" class="form-control" id="genericDetails" placeholder="Enter details...">
                                                        </div>
                                                    </div>
                            
                                                    <div class="mb-4">
                                                        <h5>Hepatic Dose Adjustments Needed</h5>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="hepatic_dose" value="yes" id="assistanceYes" onclick="toggleInput('hepaticDoseInfoTp', true)">
                                                            <label class="form-check-label" for="assistanceYes">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="hepatic_dose" value="no" checked="True" id="assistanceNo" onclick="toggleInput('hepaticDoseInfoTp', false)">
                                                            <label class="form-check-label" for="assistanceNo">No</label>
                                                        </div>
                                                        <div id="hepaticDoseInfoTp" class="hidden-section mt-3" style="display: none;">
                                                            <label for="assistanceDetails" class="form-label">Details:</label>
                                                            <input type="text" name="hepatic_dose_details" class="form-control" id="assistanceDetails" placeholder="Enter details...">
                                                        </div>
                                                    </div>
                            
                                                    <div class="mb-4">
                                                        <h5>PDMP Checked (if applicable)</h5>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="pdmp" value="yes" id="assistanceYes" onclick="toggleInput('pmdpInfoTp', true)">
                                                            <label class="form-check-label" for="assistanceYes">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="pdmp" value="no" checked="True" id="assistanceNo" onclick="toggleInput('pmdpInfoTp', false)">
                                                            <label class="form-check-label" for="assistanceNo">No</label>
                                                        </div>
                                                        <div id="pmdpInfoTp" class="hidden-section mt-3" style="display: none;">
                                                            <label for="assistanceDetails" class="form-label">Details:</label>
                                                            <input type="text" name="pdmp_details" class="form-control" id="assistanceDetails" placeholder="Enter details...">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="card shadow-sm">
                                                <div class="card-body">
                                                    <h3 class="card-title text-primary mb-4">Cost Considerations</h3>
                            
                                                    <div class="mb-4">
                                                        <h5>Insurance Coverage Verified</h5>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="insurance_coverage" value="yes" id="insuranceYes" onclick="toggleInput('insuranceCoverageInfo', true)">
                                                            <label class="form-check-label" for="insuranceYes">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="insurance_coverage" value="no" checked="True" id="insuranceNo" onclick="toggleInput('insuranceCoverageInfo', false)">
                                                            <label class="form-check-label" for="insuranceNo">No</label>
                                                        </div>
                                                        <div id="insuranceCoverageInfo" class="hidden-section mt-3" style="display: none;">
                                                            <label for="insuranceDetails" class="form-label">Details:</label>
                                                            <input type="text" name="insurance_coverage_details" class="form-control" id="insuranceDetails" placeholder="Enter details...">
                                                        </div>
                                                    </div>
                            
                                                    <div class="mb-4">
                                                        <h5>Prior Authorization Status</h5>
                                                        <input type="text" name="prior_authorization_status" class="form-control" placeholder="Enter status...">
                                                    </div>
                            
                                                    <div class="mb-4">
                                                        <h5>Generic Alternatives Considered</h5>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="generic_alternatives" value="yes" id="genericYes" onclick="toggleInput('genericAlternativesInfo', true)">
                                                            <label class="form-check-label" for="genericYes">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="generic_alternatives" value="no" checked="True" id="genericNo" onclick="toggleInput('genericAlternativesInfo', false)">
                                                            <label class="form-check-label" for="genericNo">No</label>
                                                        </div>
                                                        <div id="genericAlternativesInfo" class="hidden-section mt-3" style="display: none;">
                                                            <label for="genericDetails" class="form-label">Details:</label>
                                                            <input type="text" name="generic_alternatives_details" class="form-control" id="genericDetails" placeholder="Enter details...">
                                                        </div>
                                                    </div>
                            
                                                    <div class="mb-4">
                                                        <h5>Patient Assistance Needed</h5>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="patient_assistance" value="yes" id="assistanceYes" onclick="toggleInput('patientAssistanceInfo', true)">
                                                            <label class="form-check-label" for="assistanceYes">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="patient_assistance" value="no" checked="True" id="assistanceNo" onclick="toggleInput('patientAssistanceInfo', false)">
                                                            <label class="form-check-label" for="assistanceNo">No</label>
                                                        </div>
                                                        <div id="patientAssistanceInfo" class="hidden-section mt-3" style="display: none;">
                                                            <label for="assistanceDetails" class="form-label">Details:</label>
                                                            <input type="text" name="patient_assistance_details" class="form-control" id="assistanceDetails" placeholder="Enter details...">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mt-3 d-flex justify-content-center">
                                            <button class="btn btn-md btn-primary">
                                                Submit Medication Safety Checks and Cost Considerations
                                            </button>
                                        </div>
                                    </form>

                                    <div class="row" id="medication_section_view">
                                        <div class="col-md-12">

                                            <div class="card shadow-sm p-4 my-4 col-md-12 ">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="mb-4">
                                                                <div class="row justify-content-between align-items-center">

                                                                    <h4 class="card-title text-primary mb-4 col-md-9">
                                                                        Medication Safety Checks
                                                                    </h4>
                                                                    <div class=" col-md-3">
                                                                        <span class="" onclick="cycleSetTp('prev', 'safety-check-set', 'currentSafetyCheckIndex', 'currentSetLabel')" style="cursor: pointer;" id="">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                                                                        </span>
                                                                        <span id="currentSetLabel">1</span>
                                                                        <span class="" onclick="cycleSetTp('next', 'safety-check-set', 'currentSafetyCheckIndex', 'currentSetLabel')" style="cursor: pointer;" id="">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                                                                        </span>
                                                                        <input type="hidden" id="currentSafetyCheckIndex" value="1">
                                                                    </div>
                                                                </div>

                                                                <div class="check-sets" id="all_safety_checks_tp">

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div class="col-md-6">
                                                            <!-- Medication Safety Checks -->
                                                            <div class="mb-4">
                                                                <div class="row justify-content-between align-items-center">

                                                                    <h4 class="card-title text-primary mb-4 col-md-9">
                                                                        Cost Considerations
                                                                    </h4>
                                                                    <div class=" col-md-3">
                                                                        <span class="" onclick="cycleSetTp('prev', 'cost-consideration-set', 'currentCostConsiderationCheckIndex', 'currentCostLabel')" style="cursor: pointer;" id="">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                                                                        </span>
                                                                        <span style="width: 10px" id="currentCostLabel">1</span>
                                                                        <span class="" onclick="cycleSetTp('next', 'cost-consideration-set', 'currentCostConsiderationCheckIndex', 'currentCostLabel')" style="cursor: pointer;" id="">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                                                                        </span>
                                                                        <input type="hidden" id="currentCostConsiderationCheckIndex" value="1">
                                                                    </div>
                                                                </div>

                                                                <div class="check-sets" id="all_cost_considerations_tp">


                                                                </div>
                                                            </div>


                                                        </div>

                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="accordion col-md-12" id="medicationNotesAccordionTp">
                                            <div class="accordionDiv mt-3">
                                                <div id="drHeading" class="accordion-header bold  " data-toggle="collapse" data-target="#doctorsMecationNotesAccordTp" aria-expanded="false" aria-controls="doctorsMecationNotesAccordTp">
                                                    Medication Notes
                                                </div>
                                                <div id="doctorsMecationNotesAccordTp" class="collapse">
                            
                                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitDoctorNotes', 'action' => 'addDoctorNote', $patient->id, $selectedVisit->id], 'id' => 'doctorsMedicationNotesFormTp']); -->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <textarea class="form-control" id="doctorsMedicationNotesAreaTp" rows="2" class="full-width"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-end">
                                                            <input type="submit" class="btn btn-sm btn-success mr-4 closeBtn">
                                                            <a href="javascript:;" onclick="$('#doctorsMedicationNotesAreaTp').summernote('code', '');" class="btn btn-sm btn-secondary mr-3 resetBtn"> Reset</a>
                                                        </div>
                                                    <!-- php: = $this->Form->end() -->
                            
                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">								
                                        <div class="col-md-12 mt-5">
                                            <div class="col-md-12 col-sm-12">
                                                <div class="card card-box">
                                                    <div class="card-body" id="medication_notes_parent_tp">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        

                                </div>

                            
                                <div id="medication_section_allergy">
                                    <h3 class="card-title text-primary mb-4">Contraindications/Allergies/Adverse Reactions</h3>
                                    <table class="customDataTable">
                                        <thead>
                                            <tr style="">
                                                <th style="">Allergy / Medication</th>
                                                <th style="">Reaction</th>
                                                <th style="">Severity</th>
                                                <th style="">Date Identified</th>
                                            </tr>
                                        </thead>
                                        <tbody id="allergies_table_body_tp">

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div class="accordion-item" id="investigationManagement" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2854C5"><path d="M320-280v-80h87q-5 20-6.5 40t.5 40h-81Zm0 200q-83 0-141.5-58.5T120-280v-360q-33 0-56.5-23.5T40-720v-80q0-33 23.5-56.5T120-880h400q33 0 56.5 23.5T600-800v80q0 33-23.5 56.5T520-640v121q-24 15-44 35t-35 44H320v-80h120v-120H200v360q0 50 35 85t85 35q30 0 54.5-13t41.5-36q8 20 18 38t24 35q-27 26-62 41t-76 15ZM120-720h400v-80H120v80Zm540 520q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM864-40 756-148q-22 14-46 21t-50 7q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50t-21 46L920-96l-56 56ZM120-720v-80 80Z"/></svg>
                                </span>
                                <span style="font-size: 16px"> Investigation Management</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">

                                <div id="current-medications">
                                    <div class="row mb-5">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4" >Required Tests/Investigations</h3>
                                        </div>
                                        <div class="col-md-12 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="investigation_section_update" onclick="javascript:showOnClick('investigation_form', 'investigation_section_view_btn');hideOnClick('investigation_table', 'investigation_view', 'investigation_selector', 'investigation_section_update')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md  btn-outline-primary" id="investigation_section_view_btn" onclick="javascript:hideOnClick('investigation_form', 'investigation_section_view_btn');showOnClick('investigation_table', 'investigation_view', 'investigation_selector', 'investigation_section_update')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="" id="investigation_selector">
                                        <div id="investigation_selector" class="col-md-12 d-flex justify-content-center">
                                            
                                            <SearchableSelectField name="" class="selectpicker form-control" id="all_lab_scan_requests_tp" onchange="setInvestigationInfo()">
                                            </SearchableSelectField>
                                        </div>
                                    </div>

                                    <div class="row mt-5" id="investigation_table">
                                        <div class="col-md-12 px-5">
                                            <table class="table table-hover order-column full-width">
                                                <thead>
                                                    <tr style="">
                                                        <th style="">Date</th>
                                                        <th style="">Name</th>
                                                        <th style="">Type</th>
                                                        <th style="">Requested By</th>
                                                        <th style="">Abnormal Values</th>
                                                        <th style="">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="investigation_table_body_tp">
                            
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="accordion px-5 col-md-12" id="specialInstructionsAccordion" id="medicationNotesAccord">
                                            <div class="accordionDiv mt-3">
                                                <div id="drHeading" class="accordion-header bold  " data-toggle="collapse" data-target="#doctorsSpecialInstructionAccord" aria-expanded="false" aria-controls="doctorsSpecialInstructionAccord">
                                                    Special Instructions
                                                </div>
                                                <div id="doctorsSpecialInstructionAccord" class="collapse">
                            
                                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitDoctorNotes', 'action' => 'addDoctorNote', $patient->id, $selectedVisit->id], 'id' => 'doctorsSpecialInstructionForm']); -->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <textarea class="form-control" id="doctorsSpecialInstruction" rows="2" class="full-width"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-end">
                                                            <input type="submit" class="btn btn-sm btn-success mr-4 closeBtn">
                                                            <a href="javascript:;" onclick="$('#doctorsSpecialInstruction').summernote('code', '');" class="btn btn-sm btn-secondary mr-3 resetBtn"> Reset</a>
                                                        </div>
                                                    <!-- php: = $this->Form->end() -->
                            
                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="row">								
                                        <div class="col-md-12 mt-5">
                                            <div class="col-md-12 col-sm-12">
                                                <div class="card card-box">
                                                    <div class="card-body" id="special_instructions_notes_parent_tp">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <form class="row" id="investigation_form" style="display:none">
                                        <div class="col-md-12">

                                            <div class="col-md-12">
                                                <h4 class="card-title text-primary mb-4">Specialist Referrals</h4>
                                            </div>
                                            <div class="">
                                                <div class="col-md-12 d-flex justify-content-around">
                                                    <div class="row col-md-5">
                                                        <h5 class="card-title mb-4">Specialty</h5>
                                                        <textarea name="referral_specialist_tp[]" id="" class="form-control"></textarea>
                                                    </div>
                                                    <div class="row col-md-5">
                                                        <h5 class="card-title mb-4">Reason</h5>
                                                        <textarea name="referral_reasons_tp[]" id="" class="form-control"></textarea>
                                                    </div>
                                                    <div class="col-md-2 mt-4 align-items-center">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="" id="add_more_referral_fields">

                                            </div>

                                            <div class="col-md-12 d-flex justify-content-end">
                                                <button type="button" class="btn btn-sm btn-primary" onclick="addMoreFields()">Add More</button>
                                            </div>
                            
                                            <div class="col-md-12 d-flex justify-content-center mt-5">
                                                <button class="btn btn-md">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <div class="row" id="investigation_view">
                                        <div class="col-md-12">

                                            <div class="card shadow-sm p-4 my-4 col-md-12 ">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-12">

                                                            <div class="mb-4">
                                                                <h4 class="card-title text-primary mb-3">Specialist Referral</h4>
                                                                <ul class="list-group" id="inte_exte_referals_tp">
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="accordion-item" id="surgicalManagement" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6B2346"><path d="M760-520q-38 0-81-21.5T599-601q-37-38-58.5-81T519-762q0-17 5-31t15-24q26-26 105.5-45.5T794-879q25 2 41.5 6t24.5 12q7 7 11.5 21.5T878-803q5 69-14 152t-46 110q-10 10-25.5 15.5T760-520Zm35-200q2-18 3-38t2-42q-20-1-40.5.5T719-796q11 8 21.5 17t19.5 18q10 10 18.5 20t16.5 21Zm-35 120q1-20-15-49.5T703-704q-25-25-53.5-40.5T601-760q2 23 17 52t37 51q24 24 52.5 39.5T760-600Zm92 388L664-400H264L52-612l56-56 188 188h400l212 212-56 56ZM320-80v-160q0-33 23.5-56.5T400-320h160q33 0 56.5 23.5T640-240v160H320Zm80-80h160v-80H400v80Zm0 0v-80 80Z"/></svg>
                                </span>
                                <span style="font-size: 16px"> Surgical Management</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">

                                <div class="row">
                                    <div class="col-md-6">
                                        <h3 class="card-title text-primary mb-4" >Surgical Management</h3>

                                        
                                        <i class="text-muted">

                                            <small>Schedule, monitor, and update surgical intervention details.</small>
                            
                                            <small><strong>How to Use:</strong></small>
                                            <ul>
                                                <li><small><strong>Add Info:</strong> Enter details of upcoming or recent surgeries, including dates, procedure types, and postoperative care.</small></li>
                                                <li><small><strong>View Info:</strong> Browse past surgical records using navigation buttons to review history.</small></li>
                                            </ul>
                                        </i>
                                    </div>
                                    <div class="col-md-6 d-flex justify-content-end">
                                        <div id="">
                                            <button class="btn btn-md btn-outline-success" id="surgery_section_update" onclick="javascript:showOnClick('surgery_section_form', 'surgery_section_view_btn');hideOnClick('surgery_section_update', 'surgery_section_view')">
                                                add info
                                            </button>
                                            <button style="display:none" class="btn btn-md btn-outline-primary" id="surgery_section_view_btn" onclick="javascript:hideOnClick('surgery_section_form', 'surgery_section_view_btn');showOnClick('surgery_section_update', 'surgery_section_view')">
                                                view info
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="">

                                    <div class="">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-card">

                                                    
                                                    <form id="surgery_section_form" style="display:none">
                                                        <!-- Surgical Intervention Status -->
                                                        <div class="mb-4">
                                                            <h5 class="section-header">Surgical Intervention Status</h5>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" checked type="radio" name="surgical_intervention_status" id="statusUnderConsideration" value="Under Consideration" onclick="hideSection('surgical_planning');hideSection('post_operative_care_plan');hideSection('surgical_details')">
                                                                        <label class="form-check-label" for="statusUnderConsideration">Under Consideration</label>
                                                                    </div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="radio" name="surgical_intervention_status" id="statusPlanned" value="Planned" onclick="showSection('surgical_planning');hideSection('post_operative_care_plan'); showSection('surgical_details')">
                                                                        <label class="form-check-label" for="statusPlanned">Planned</label>
                                                                    </div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="radio" name="surgical_intervention_status" id="statusPostCare" value="Post-operative care" onclick="hideSection('surgical_planning');showSection('post_operative_care_plan'); showSection('surgical_details')">
                                                                        <label class="form-check-label" for="statusPostCare">Post-operative Care</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Surgical Details -->
                                                        <div class="mb-4" style="display: none" id="surgical_details">
                                                            <h5 class="section-header">Surgical Details</h5>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-check mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="cardiacClearance" name="cardiac_clearance_required" value="yes">
                                                                        <label class="form-check-label" for="cardiacClearance">Cardiac Clearance Required</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label class="form-label">Pre-op Testing Needed</label>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" id="testECG" name="pre_op_testing_needed" value="ECG">
                                                                        <label class="form-check-label" for="testECG">ECG</label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" id="testXRay" name="pre_op_testing_needed" value="Chest X-ray">
                                                                        <label class="form-check-label" for="testXRay">Chest X-ray</label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" id="testLabs" name="pre_op_testing_needed" value="Labs">
                                                                        <label class="form-check-label" for="testLabs">Labs</label>
                                                                    </div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="radio" id="testOther" name="pre_op_testing_needed" value="Other">
                                                                        <label class="form-check-label" for="testOther">Other</label>
                                                                    </div>
                                                                    <input type="text" class="form-control" placeholder="Specify other tests" id="otherTests" name="other_tests">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Surgical Planning -->
                                                        <div class="mb-4" id="surgical_planning" style="display: none">
                                                            <h5 class="section-header">Surgical Planning</h5>
                                                            <div class="row">
                                                                <div class="col-md-12 mb-3">
                                                                    <label for="procedureType" class="form-label">Procedure Type</label>
                                                                    <div>

                                                                        <SearchableSelectField class="form-control form-select selectpicker" id="requested_surgery_items_tp1" name="procedure_type">
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 mb-3">
                                                                    <label for="estimatedDuration" class="form-label">Estimated Duration</label>
                                                                    <input type="text" class="form-control" id="estimatedDuration" placeholder="Enter estimated duration" name="estimated_duration">
                                                                </div>
                                                                <div class="col-md-6 mb-3">
                                                                    <label for="lengthOfStay" class="form-label">Expected Length of Stay</label>
                                                                    <input type="text" class="form-control" id="lengthOfStay" placeholder="Enter expected length of stay" name="length_of_stay">
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6 mb-3">
                                                                    <label class="form-label">Admission Type</label>
                                                                    <div class="form-check">
                                                                        <input class="form-control" type="text" name="admission_type" id="admissionType" value="">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Post-operative Care Plan -->
                                                        <div class="mb-4" id="post_operative_care_plan" style="display: none">
                                                            <h5 class="section-header">Post-operative Care Plan</h5>
                                                            <div class="row">
                                                                <div class="col-md-12 mb-3">
                                                                    <label for="procedureType" class="form-label">Procedure Type</label>
                                                                    <div>

                                                                        <SearchableSelectField class="form-control form-select selectpicker" id="requested_surgery_items_tp2" name="post_op_procedure_type">
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6 mb-3">
                                                                    <label for="painManagement" class="form-label">Pain Management</label>
                                                                    <input type="text" class="form-control" id="painManagement" placeholder="Enter pain management details" name="pain_management">
                                                                </div>
                                                                <div class="col-md-6 mb-3">
                                                                    <label for="woundCare" class="form-label">Wound Care</label>
                                                                    <input type="text" class="form-control" id="woundCare" placeholder="Enter wound care details" name="wound_care">
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6 mb-3">
                                                                    <label for="activityRestrictions" class="form-label">Activity Restrictions</label>
                                                                    <input type="text" class="form-control" id="activityRestrictions" placeholder="Enter activity restrictions" name="activity_restrictions">
                                                                </div>
                                                                <div class="col-md-6 mb-3">
                                                                    <label for="durationRestrictions" class="form-label">Duration of Restrictions</label>
                                                                    <input type="text" class="form-control" id="durationRestrictions" placeholder="Enter duration of restrictions" name="duration_restrictions">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- Rehabilitation Plan -->
                                                        <div class="mb-4" style="display: none" id="rehabilitation_plan">
                                                            <h5 class="section-header">Rehabilitation Plan</h5>
                                                            <div class="row">
                                                                <div class="col-md-12 mb-3">
                                                                    <label class="form-label">Type of Rehabilitation</label>
                                                                    <div class="row">
                                                                        <div class="col-md-3">
                                                                            <div class="form-check">
                                                                                <input class="form-check-input" type="checkbox" id="physicalTherapy" name="rehabilitation_type[]" value="Physical Therapy">
                                                                                <label class="form-check-label" for="physicalTherapy">Physical Therapy</label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <div class="form-check">
                                                                                <input class="form-check-input" type="checkbox" id="occupationalTherapy" name="rehabilitation_type[]" value="Occupational Therapy">
                                                                                <label class="form-check-label" for="occupationalTherapy">Occupational Therapy</label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <div class="form-check">
                                                                                <input class="form-check-input" type="checkbox" id="speechTherapy" name="rehabilitation_type[]" value="Speech Therapy">
                                                                                <label class="form-check-label" for="speechTherapy">Speech Therapy</label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <div class="form-check">
                                                                                <input class="form-check-input" type="checkbox" id="otherTherapy" name="rehabilitation_type[]" value="Other">
                                                                                <label class="form-check-label" for="otherTherapy">Other</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <input type="text" class="form-control mt-2" placeholder="Specify other rehabilitation type" id="otherRehabilitationType" name="other_rehabilitation_type">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Risk Assessment -->
                                                        <div class="mb-4">
                                                            <h5 class="section-header">Risk Assessment</h5>
                                                            <div class="row">
                                                                <div class="col-md-12 mb-3">
                                                                    <label class="form-label">Patient Physical Status</label>
                                                                    <div>

                                                                        <SearchableSelectField class="form-control selectpicker" name="patient_physical_status">
                                                                            <option value="">Select Physical Status</option>
                                                                            <option value="Class I:  Normal healthy patient">Class I: Normal healthy patient</option>
                                                                            <option value="Class II:  Mild systemic disease">Class II: Mild systemic disease</option>
                                                                            <option value="Class III:  Severe systemic disease">Class III: Severe systemic disease</option>
                                                                            <option value="Class IV:  Severe systemic disease, constant life threat">Class IV: Severe systemic disease, constant life threat</option>
                                                                            <option value="Class V:  Moribund, not expected to survive">Class V: Moribund, not expected to survive</option>
                                                                            <option value="Class VI:  Brain-dead, organ donor">Class VI: Brain-dead, organ donor</option>
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12 mb-3">
                                                                    <label for="patientRisks" class="form-label">Patient-Specific Risks</label>
                                                                    <div>

                                                                        <SearchableSelectField class="form-control selectpicker" name="patient_specific_risks">
                                                                            <option value="">Select Physical Status</option>
                                                                            <option value="Cardiac Risk">Cardiac Risk</option>
                                                                            <option value="Pulmonary Risk">Pulmonary Risk</option>
                                                                            <option value="Infection Risk">Infection Risk</option>
                                                                            <option value="Bleeding Risk">Bleeding Risk</option>
                                                                            <option value="Allergic Reactions">Allergic Reactions</option>
                                                                            <option value="Surgical-Site Risk">Surgical-Site Risks</option>
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <label for="riskMitigation" class="form-label">Risk Mitigation Strategy</label>
                                                                    <div>
                                                                        <SearchableSelectField class="form-control selectpicker" name="risk_mitigation_strategy">
                                                                            <option value="">Select Physical Status</option>
                                                                            <option value="Cardiac Clearance">Cardiac Clearance</option>
                                                                            <option value="Pulmonary Optimization">Pulmonary Optimization</option>
                                                                            <option value="Infection Control">Infection Control</option>
                                                                            <option value="Bleeding Prevention">Bleeding Prevention</option>
                                                                            <option value="Allergy Prevention">Allergy Prevention</option>
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Notes -->
                                                        <div class="mb-4">
                                                            <h5 class="section-header">Additional Notes</h5>
                                                            <textarea class="form-control" id="notes" placeholder="Enter additional notes" name="additional_notes"></textarea>
                                                        </div>

                                                        <!-- Submit Button -->
                                                        <div class="text-center">
                                                            <button type="submit" class="btn btn-primary btn-md">Submit Surgical Plan</button>
                                                        </div>
                                                    </form>

                                                    <div id="surgery_section_view">
                                                        <div class="slider-container">
                                                            <!-- Slides Wrapper -->
                                                            <div id="slides_buttons">

                                                                <button class="btn btn-danger btn-xs" id="prevBtn">←Previous</button>
                                                                <button class="btn btn-info btn-xs" id="nextBtn">Next→</button>
                                                            </div>
                                                            <div class="slides" id="slides">
                                                            
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    
                                </div>

                            </div>
                        </div>

                        <div class="accordion-item" id="lifestyleRecommendations" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#48752C"><path d="m216-160-56-56 384-384H440v80h-80v-160h233q16 0 31 6t26 17l120 119q27 27 66 42t84 16v80q-62 0-112.5-19T718-476l-40-42-88 88 90 90-262 151-40-69 172-99-68-68-266 265Zm-96-280v-80h200v80H120ZM40-560v-80h200v80H40Zm739-80q-33 0-57-23.5T698-720q0-33 24-56.5t57-23.5q33 0 57 23.5t24 56.5q0 33-24 56.5T779-640Zm-659-40v-80h200v80H120Z"/></svg>
                                </span>
                                <span style="font-size: 16px"> Lifestyle Recommendations</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4" >Lifestyle Recommendations</h3>

                                            <div class="text-muted ">
                                                <p><strong>Lifestyle Recommendations</strong></p>
                                                <small>Provide and update guidance on diet, exercise, meal planning, and weight management.</small>
                            
                                                <p><strong>How to Use:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Use the Update button to input personalized lifestyle advice, set goals, and note patient progress in areas like nutrition and physical activity.</small></li>
                                                    <li><small><strong>View Info:</strong> Access previous lifestyle recommendations by clicking the View button. Use the Previous and Next buttons to track changes and adherence over time.</small></li>
                                                </ul>
                                            </div>
                                                
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="lifestyle_section_update" onclick="javascript:showOnClick('lifestyle_section_form', 'lifestyle_section_view_btn');hideOnClick('lifestyle_section_update', 'lifestyle_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="lifestyle_section_view_btn" onclick="javascript:hideOnClick('lifestyle_section_form', 'lifestyle_section_view_btn');showOnClick('lifestyle_section_update', 'lifestyle_section_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <form class="card shadow-sm" id="lifestyle_section_form" style="display:none">
                                                <div class="card-body">

                                                    <!-- Diet Type Options -->
                                                    <div class="mb-4 row">
                                                        <div class="col-md-12">
                                                            <h5 class="section-header">Diet Type Options</h5>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <label class="form-check-label" for="dietRegular">Regular</label>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietRegular" name="diet_type_regular" value="Regular">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class="form-label">Therapeutic Diets:</label>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietDiabetes" name="diet_type_diabetes" value="Diabetes (ADA)">
                                                                <label class="form-check-label" for="dietDiabetes">Diabetes (ADA)</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietDash" name="diet_type_dash" value="DASH">
                                                                <label class="form-check-label" for="dietDash">DASH</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietMediterranean" name="diet_type_mediterranean" value="Mediterranean">
                                                                <label class="form-check-label" for="dietMediterranean">Mediterranean</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietLowSodium" name="diet_type_low_sodium" value="Low-Sodium">
                                                                <label class="form-check-label" for="dietLowSodium">Low-Sodium</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietRenal" name="diet_type_renal" value="Renal">
                                                                <label class="form-check-label" for="dietRenal">Renal</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietCardiac" name="diet_type_cardiac" value="Cardiac">
                                                                <label class="form-check-label" for="dietCardiac">Cardiac</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietKetogenic" name="diet_type_ketogenic" value="Ketogenic">
                                                                <label class="form-check-label" for="dietKetogenic">Ketogenic</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietPlantBased" name="diet_type_plant_based" value="Plant-based">
                                                                <label class="form-check-label" for="dietPlantBased">Plant-based</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietGlutenFree" name="diet_type_gluten_free" value="Gluten-free">
                                                                <label class="form-check-label" for="dietGlutenFree">Gluten-free</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="dietOther" name="diet_type_other" value="Other">
                                                                <label class="form-check-label" for="dietOther">Other</label>
                                                            </div>
                                                            <input type="text" class="form-control mt-2" placeholder="Specify other diets" id="otherDiet" name="other_diet">
                                                        </div>
                                                    </div>

                                                    <!-- Notes -->
                                                    <div class="mb-4">
                                                        <h5 class="section-header">Notes</h5>
                                                        <textarea class="form-control" id="notesDiet" name="diet_notes" placeholder="Enter notes"></textarea>
                                                    </div>

                                                    <!-- Caloric Prescription -->
                                                    <div class="mb-4">
                                                        <h5 class="section-header">Caloric Prescription</h5>
                                                        <label for="currentWeight" class="form-label">Current Weight (kg)</label>
                                                        <input type="text" class="form-control mb-2" id="currentWeight" name="current_weight" placeholder="Enter current weight">
                                                        <label for="goalWeight" class="form-label">Goal Weight (kg)</label>
                                                        <input type="text" class="form-control mb-2" id="goalWeight" name="goal_weight" placeholder="Enter goal weight">
                                                        <label for="bmi" class="form-label">BMI</label>
                                                        <input type="text" class="form-control mb-2" id="bmi" name="bmi" placeholder="Enter BMI">
                                                        <label for="calculatedNeeds" class="form-label">Calculated Needs (kcal/day)</label>
                                                        <input type="text" class="form-control mb-2" id="calculatedNeeds" name="calculated_needs" placeholder="Enter calculated needs">
                                                        <label for="prescribedIntake" class="form-label">Prescribed Intake (kcal/day)</label>
                                                        <input type="text" class="form-control mb-2" id="prescribedIntake" name="prescribed_intake" placeholder="Enter prescribed intake">
                                                    </div>

                                                    <!-- Specific Restrictions -->
                                                    <div class="mb-4">
                                                        <h5 class="section-header">Specific Restrictions</h5>
                                                        <label for="sodiumRestriction" class="form-label">Sodium</label>
                                                        <input type="text" class="form-control mb-2" id="sodiumRestriction" name="sodium_restriction" placeholder="Enter sodium restriction">
                                                        <label for="carbsRestriction" class="form-label">Carbs</label>
                                                        <input type="text" class="form-control mb-2" id="carbsRestriction" name="carbs_restriction" placeholder="Enter carb restriction">
                                                        <label for="proteinRestriction" class="form-label">Protein</label>
                                                        <input type="text" class="form-control mb-2" id="proteinRestriction" name="protein_restriction" placeholder="Enter protein restriction">
                                                        <label for="fluidsRestriction" class="form-label">Fluids</label>
                                                        <input type="text" class="form-control" id="fluidsRestriction" name="fluids_restriction" placeholder="Enter fluid restriction">
                                                    </div>

                                                    <!-- Meal Planning -->
                                                    <div class="mb-4">
                                                        <h5 class="section-header">Meal Planning</h5>
                                                        <label for="mealsPerDay" class="form-label">Meals per Day</label>
                                                        <input type="text" class="form-control mb-2" id="mealsPerDay" name="meals_per_day" placeholder="Enter meals per day">
                                                        <label for="snacksPerDay" class="form-label">Snacks per Day</label>
                                                        <input type="text" class="form-control mb-2" id="snacksPerDay" name="snacks_per_day" placeholder="Enter snacks per day">
                                                        <label for="timingRecommendations" class="form-label">Timing Recommendations</label>
                                                        <textarea class="form-control" id="timingRecommendations" name="timing_recommendations" placeholder="Enter timing recommendations"></textarea>
                                                    </div>

                                                    <!-- Exercise Prescription -->
                                                    <div class="mb-4">
                                                        <h5 class="section-header">Exercise Prescription</h5>
                                                        <label for="activityType" class="form-label">Type of Activity</label>
                                                        <input type="text" class="form-control mb-2" id="activityType" name="activity_type" placeholder="Enter type of activity">
                                                        <label for="intensity" class="form-label">Intensity</label>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="intensity" id="intensityLight" value="Light">
                                                            <label class="form-check-label" for="intensityLight">Light</label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="intensity" id="intensityModerate" value="Moderate">
                                                            <label class="form-check-label" for="intensityModerate">Moderate</label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="intensity" id="intensityVigorous" value="Vigorous">
                                                            <label class="form-check-label" for="intensityVigorous">Vigorous</label>
                                                        </div>
                                                        <label for="duration" class="form-label mt-3">Duration (minutes)</label>
                                                        <input type="text" class="form-control mb-2" id="duration" name="duration" placeholder="Enter duration">
                                                        <label for="frequency" class="form-label">Frequency (times per week)</label>
                                                        <input type="text" class="form-control mb-2" id="frequency" name="frequency" placeholder="Enter frequency">
                                                        <label for="specialPrecautions" class="form-label">Special Precautions</label>
                                                        <textarea class="form-control" id="specialPrecautions" name="special_precautions" placeholder="Enter special precautions"></textarea>
                                                    </div>

                                                    <!-- Submit Button -->
                                                    <div class="text-center">
                                                        <button class="btn btn-primary btn-md" type="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>


                                        <!-- Add this after the lifestyle form -->
                                        <div class="col-md-12" id="lifestyle_section_view" >
                                            <div class="slider-container">
                                                <!-- Slides Wrapper -->
                                                <div id="lifestyle_slides_buttons">

                                                    <button class="btn btn-danger btn-xs" id="prevBtn_lifestyle">←Previous</button>
                                                    <button class="btn btn-info btn-xs" id="nextBtn_lifestyle">Next→</button>
                                                </div>
                                                <div class="slides" id="lifestyle_slides">
                                                
                                                </div>

                                            </div>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item" id="monitoringPlan" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#321D71"><path d="M280-80v-200H80v-400h200v-200h400v200h200v400H680v200H280ZM160-520h200q10 0 19 5t14 13l35 52 54-162q4-12 14.5-20t23.5-8q10 0 19 5t14 13l68 102h179v-80H600v-200H360v200H160v80Zm200 360h240v-200h200v-80H600q-10 0-19-5t-15-13l-34-52-54 162q-4 12-15 20t-24 8q-10 0-19-5t-14-13l-68-102H160v80h200v200Zm120-320Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Monitoring Plan</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Monitoring Plan</h3>
                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Establish and adjust plans for disease-specific monitoring, vital signs tracking, and set treatment goals with follow-up schedules.</p>

                                                <p><strong>How to Use:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Select the Update button to define or modify monitoring parameters, such as blood pressure targets, glucose levels, and schedule upcoming appointments.</small></li>
                                                    <li><small><strong>View Info:</strong> Click the View button to review existing monitoring plans. Navigate through past plans using the Previous and Next buttons to observe trends and outcomes.</small></li>
                                                </ul>
                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="monitoring_section_update" onclick="javascript:showOnClick('monitoring_section_form', 'monitoring_section_view_btn');hideOnClick('monitoring_section_update', 'monitoring_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="monitoring_section_view_btn" onclick="javascript:hideOnClick('monitoring_section_form', 'monitoring_section_view_btn');showOnClick('monitoring_section_update', 'monitoring_section_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="monitoring_section_form" style="display:none">
                                        <!-- Disease-Specific Monitoring -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Disease-Specific Monitoring</h5>
                                            <div class="row mb-3">
                                                <div class="col-md-12">
                                                    <label class="form-label">Condition</label>
                                                    <div>

                                                        <SearchableSelectField class="form-control" name="standard_diagnoses_id" id="monitoringCondition">
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <!-- Vital Signs Monitoring --> 
                                        <div class="mb-4">
                                            <div class="mb-4">
                                                <h5 class="section-header">Vital Signs Monitoring
                                                </h5>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="searchField"
                                                    placeholder="Search for a vital (e.g., Temperature, Heart Rate)"
                                                />

                                            </div>
                                            

                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    Vital
                                                </div>
                                                <div class="col-md-3">
                                                    Frequency
                                                </div>
                                                <div class="col-md-3">
                                                    Target
                                                </div>
                                                <div class="col-md-3">
                                                    Alert
                                                </div>
                                            </div>

                                            <div id="selected_plan_vital">

                                            </div>

                                        </div>

                                        <!-- extra information -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Self-Monitoring Instructions</h5>
                                            <div class="row mb-3">
                                                <div class="col-md-12">
                                                    <label class="form-label">Parameters to Track</label>
                                                    <div>

                                                        <textarea class="form-control" name="parameters_to_track"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label">Recording Method</label>
                                                    <div>
                                                        <div class="col-md-3">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="paper_log" name="recording_method[]" value="Paper Log">
                                                                <label class="form-check-label" for="paper_log">Paper Log</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="app" name="recording_method[]" value="App">
                                                                <label class="form-check-label" for="app">App</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="device" name="recording_method[]" value="Device">
                                                                <label class="form-check-label" for="device">Device</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label">When to Contact Doctor </label>
                                                    <div>

                                                        <textarea class="form-control" name="contact_doctor"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <h5 class="section-header">Treatment Goals</h5>
                                            <div class="row mb-3">
                                                <div class="col-md-12">
                                                    <label class="form-label">Short term (1-3 months)</label>
                                                    <div>

                                                        <textarea class="form-control" name="short_term_goals"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label">Long term (6-12 months)</label>
                                                    <div>

                                                        <textarea class="form-control" name="long_term_goals"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label">Warning Signs/Red Flags </label>
                                                    <div>

                                                        <textarea class="form-control" name="warning_signs"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-4">
                                            <h5 class="section-header">Follow-up Schedule </h5>
                                            <div class="row mb-3">
                                                <div class="col-md-12">
                                                    <label class="form-label">Primary Care: Every (weeks/months)</label>
                                                    <div>
                                                        <input class="form-control" name="primary_care_followup" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label">Specialist: Every (weeks/months)</label>
                                                    <div>
                                                        <input class="form-control" name="specialist_followup" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label">Laboratory: Every (weeks/months)</label>
                                                    <div>
                                                        <input class="form-control" name="laboratory_followup" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label">Next Appointment: </label>
                                                    <div>
                                                        <input class="form-control" name="next_appointment" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save Monitoring Plan</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    
                                    <div class="col-md-12" id="monitoring_section_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div id="slides_vitals_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_monitoring">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_monitoring">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_vitals">
                                            
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item" id="progressNotes" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2854C5"><path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Progress Notes</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Progress Notes</h3>

                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Record ongoing patient care details, including interval history, medication adherence, objective findings, physical exams, and risk assessments.</p>

                                                <p><strong>How to Use:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Press the Update button to document new observations, patient interactions, and any changes in clinical status.</small></li>
                                                    <li><small><strong>View Info:</strong> Use the View button to access previous progress notes. Browse through them with the Previous and Next buttons to review the patient’s clinical journey.</small></li>
                                                </ul>
                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="progress_notes_update" onclick="javascript:showOnClick('progress_notes_form', 'progress_notes_view_btn');hideOnClick('progress_notes_update', 'progress_notes_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="progress_notes_view_btn" onclick="javascript:hideOnClick('progress_notes_form', 'progress_notes_view_btn');showOnClick('progress_notes_update', 'progress_notes_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="progress_notes_form" style="display:none">
                                        <!-- Visit Details -->
                                        <div class="mb-4 row">
                                            <div class="col-md-6">
                                                <label class="form-label">Visit Date</label>
                                                <input type="text" readonly class="form-control" id="visit_date" value="<!-- php: = $selectedVisit->date_created->nice() -->" name="visit_date">
                                            </div>

                                        </div>

                                        <!-- Interval History -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Interval History</h5>
                                            <div class="mb-3">
                                                <label class="form-label">Symptoms Progression</label>
                                                <textarea class="form-control" id="symptomsProgression" name="symptoms_progression" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">New Complaints</label>
                                                <textarea class="form-control" id="newComplaints" name="new_complaints" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Treatment Updates</label>
                                                <textarea class="form-control" id="treatmentUpdates" name="treatment_updates" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Patient-reported Concerns</label>
                                                <textarea class="form-control" id="patientConcerns" name="patient_concerns" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Medication Compliance -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Medication Compliance</h5>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="medication_compliance" id="complianceFull" value="Full">
                                                <label class="form-check-label" for="complianceFull">Full</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="medication_compliance" id="compliancePartial" value="Partial">
                                                <label class="form-check-label" for="compliancePartial">Partial</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="medication_compliance" id="compliancePoor" value="Poor">
                                                <label class="form-check-label" for="compliancePoor">Poor</label>
                                            </div>
                                            <div class="mt-2">
                                                <label class="form-label">Side Effects Reported</label>
                                                <textarea class="form-control" id="sideEffects" name="side_effects" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Objective Findings -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Objective Findings</h5>
                                            <div class="row">
                                                <div class="table-scrollable">
                                                    <table class="table table-hover table-checkable order-column full-width" id="progress_notes_vitals">
                                                        <thead>
                                                            <tr>
                                                                <th class="center"> Date</th>
                                                                <th class="center"> Temperature </th>
                                                                <th class="center"> SpO<sub>2</sub> </th>
                                                                <th class="center"> Respiratory Rate </th>
                                                                <th class="center"> Pulse </th>
                                                                <th class="center"> Blood Pressure </th>
                                                                <th class="center"> Weight </th>
                                                                <th class="center"> Height </th>
                                                                <th class="center"> BMI </th>
                                                                <th class="center"> Blood Sugar</th>
                                                                <th class="center"> AVPU</th>

                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                                                        
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Physical Exam -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Physical Exam</h5>
                                            <div class="mb-2 reviewListTp">

                                            </div>
                                        </div>

                                        <!-- Assessment -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Assessment</h5>
                                            <div class="mb-3">
                                                <label class="form-label">Disease Status</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="disease_status" id="statusImproved" value="Improved">
                                                    <label class="form-check-label" for="statusImproved">Improved</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="disease_status" id="statusStable" value="Stable">
                                                    <label class="form-check-label" for="statusStable">Stable</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="disease_status" id="statusWorsening" value="Worsening">
                                                    <label class="form-check-label" for="statusWorsening">Worsening</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Complication (if Present)</label>
                                                <div class="form-check">
                                                    <textarea class="form-control" id="disease_complication" name="disease_complication" placeholder="Specify modifications..." rows="3"></textarea>

                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Risk Assessment</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="risk_assessment" id="riskLow" value="Low">
                                                    <label class="form-check-label" for="riskLow">Low</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="risk_assessment" id="riskModerate" value="Moderate">
                                                    <label class="form-check-label" for="riskModerate">Moderate</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="risk_assessment" id="riskHigh" value="High">
                                                    <label class="form-check-label" for="riskHigh">High</label>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Plan -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Plan</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="progress_plan" id="continue_current_treatment" value="continue" onclick="togglePlanModifications(false)">
                                                <label class="form-check-label" for="continue_current_treatment">Continue current treatment</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="progress_plan" id="modify_treatment" value="modify" onclick="togglePlanModifications(true)">
                                                <label class="form-check-label" for="modify_treatment">Modify treatment</label>

                                                <textarea class="form-control" id="modify_treatment_notes" name="modify_treatment_notes" placeholder="Specify modifications..." rows="3"></textarea>

                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="progress_plan" id="new_intervention" value="new intervention" onclick="togglePlanModifications(false)">
                                                <label class="form-check-label" for="new_intervention">New Interventions</label>

                                                <textarea class="form-control" id="intervention_notes" name="intervention_notes" placeholder="Specify modifications..." rows="3"></textarea>

                                            </div>
                                        </div>

                                        <div class="mb-4" id="plan_modifications" style="display:none">
                                            <h5 class="section-header">Plan Modifications</h5>
                                            <div class="form-check">
                                                <label class="form-check-label" for="medications">Medications</label>
                                                <textarea class="form-control" id="medications" name="medications" placeholder="Specify modifications..." rows="3"></textarea>
                                            </div>
                                            <div class="form-check">
                                                <label class="form-check-label" for="testing">Testing</label>
                                                <textarea class="form-control" id="testing" name="testing" placeholder="Specify modifications..." rows="3"></textarea>
                                            </div>
                                            <div class="form-check">
                                                <label class="form-check-label" for="referrals">Referrals</label>
                                                <textarea class="form-control" id="referrals" name="referrals" placeholder="Specify modifications..." rows="3"></textarea>
                                            </div>
                                            <div class="form-check">
                                                <label class="form-check-label" for="patient_education">Patient Education</label>
                                                <textarea class="form-control" id="patient_education" name="patient_education" placeholder="Specify modifications..." rows="3"></textarea>
                                            </div>
                                        </div>

                                        <div class="mb-4">
                                            <h5 class="section-header">Follow-up Schedule</h5>
                                            <div class="form-group">
                                                <label for="next_visit">Next Visit:</label>
                                                <input type="text" class="form-control" id="next_visit" name="next_visit" placeholder="Plan or fill from routine care plan">
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="visit_type" id="in_person" value="In-Person">
                                                <label class="form-check-label" for="in_person">In-Person</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="visit_type" id="virtual" value="Virtual">
                                                <label class="form-check-label" for="virtual">Virtual</label>
                                            </div>
                                            <div class="form-group">
                                                <label for="procedure_interval">Procedure Interval:</label>
                                                <input type="text" class="form-control" id="procedure_interval" name="procedure_interval" placeholder="Indicate how frequently procedures or evaluations should occur">
                                            </div>
                                            <div class="form-group">
                                                <label for="treating_physician">Treating Physician:</label>
                                                <input type="text" class="form-control" id="treating_physician" name="treating_physician" placeholder="Name of the lead physician managing the patient’s care">
                                            </div>
                                            <div class="form-group">
                                                <label for="additional_care_team">Additional Care Team Members:</label>
                                                <textarea class="form-control" id="additional_care_team" name="additional_care_team" placeholder="List other involved members (e.g., specialists, nurses, social workers)" rows="3"></textarea>
                                            </div>
                                        </div>

                                        <div class="mb-4">
                                            <h5 class="section-header">Documentation Checklist</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="problem_list_updated" name="documentation_checklist[]" value="Problem list updated">
                                                <label class="form-check-label" for="problem_list_updated">Problem list updated</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="medications_reconciled" name="documentation_checklist[]" value="Medications reconciled">
                                                <label class="form-check-label" for="medications_reconciled">Medications reconciled</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="request_orders_placed" name="documentation_checklist[]" value="Request Orders placed">
                                                <label class="form-check-label" for="request_orders_placed">Request Orders placed</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="patient_instructions_provided" name="documentation_checklist[]" value="Patient Instructions provided">
                                                <label class="form-check-label" for="patient_instructions_provided">Patient Instructions provided</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="visit_summary_given" name="documentation_checklist[]" value="Visit Summary given to patient">
                                                <label class="form-check-label" for="visit_summary_given">Visit Summary given to patient</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="billing_coding_completed" name="documentation_checklist[]" value="Billing/Coding completed">
                                                <label class="form-check-label" for="billing_coding_completed">Billing/Coding completed</label>
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save Progress Note</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    <div id="progress_notes_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div id="slides_progressnotes_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_progressnotes">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_progressnotes">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_progressnotes">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="accordion-item" id="interdisciplinaryCareCoordination" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4B77D1"><path d="M320-320q33 0 56.5-23.5T400-400q0-33-23.5-56.5T320-480q-33 0-56.5 23.5T240-400q0 33 23.5 56.5T320-320Zm320 0q33 0 56.5-23.5T720-400q0-33-23.5-56.5T640-480q-33 0-56.5 23.5T560-400q0 33 23.5 56.5T640-320ZM480-560q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 480q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Interdisciplinary Care Coordination</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Interdisciplinary Care Coordination</h3>
                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Plan and document collaborative patient care among the clinical team, noting shared responsibilities and communication channels.</p>

                                                <p><strong>How to Use:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Use the Update button to outline care plans, assign tasks to team members, and establish communication protocols.</small></li>
                                                    <li><small><strong>View Info:</strong> Access previous coordination records by clicking the View button. Use the Previous and Next buttons to track collaborative efforts and adjustments.</small></li>
                                                </ul>

                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="care_coordination_update" onclick="javascript:showOnClick('care_coordination_form', 'care_coordination_view_btn');hideOnClick('care_coordination_update', 'care_coordination_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="care_coordination_view_btn" onclick="javascript:hideOnClick('care_coordination_form', 'care_coordination_view_btn');showOnClick('care_coordination_update', 'care_coordination_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="care_coordination_form" style="display:none">
                                        <!-- Care Team Members -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Care Team Members</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="primaryCare">
                                                <label class="form-check-label" for="primaryCare">Primary Care</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="specialists">
                                                <label class="form-check-label" for="specialists">Specialists</label>
                                                <input type="text" class="form-control mt-2" id="specialistsDetails" placeholder="Specify specialists">
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="careManager">
                                                <label class="form-check-label" for="careManager">Care Manager</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="socialWorker">
                                                <label class="form-check-label" for="socialWorker">Social Worker</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="pharmacist">
                                                <label class="form-check-label" for="pharmacist">Pharmacist</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="otherCareTeam">
                                                <label class="form-check-label" for="otherCareTeam">Other</label>
                                                <input type="text" class="form-control mt-2" id="otherCareTeamDetails" placeholder="Specify other team members">
                                            </div>
                                        </div>

                                        <!-- Care Coordination Notes -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Care Coordination Notes</h5>
                                            <div class="mb-3">
                                                <label class="form-label">Communication Plan</label>
                                                <textarea class="form-control" id="communicationPlan" rows="2" name="communication_plan" placeholder="Define how team members will communicate (e.g., weekly meetings, EHR messaging, teleconferences)"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Role Responsibilities</label>
                                                <textarea class="form-control" id="roleResponsibilities" rows="2" name="role_reponsibilities" placeholder="Clearly outline responsibilities of each team member to avoid duplication of efforts"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Care Gaps Identified</label>
                                                <textarea class="form-control" id="careGaps" rows="2" name="care_gaps" placeholder="Highlight gaps in care that need addressing"></textarea>
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save Care Coordination</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    <div id="care_coordination_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div class="" id="slides_interdisciplinary_care_coordinations_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_interdisciplinary_care_coordinations">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_interdisciplinary_care_coordinations">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_interdisciplinary_care_coordinations">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="accordion-item" id="patientEngagementEducation" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EAC452"><path d="m590-488 160-92-160-92-160 92 160 92Zm0 122 110-64v-84l-110 64-110-64v84l110 64ZM480-480Zm320 320H600q0-20-1.5-40t-4.5-40h206v-480H160v46q-20-3-40-4.5T80-680v-40q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160Zm-720 0v-120q50 0 85 35t35 85H80Zm200 0q0-83-58.5-141.5T80-360v-80q117 0 198.5 81.5T360-160h-80Zm160 0q0-75-28.5-140.5t-77-114q-48.5-48.5-114-77T80-520v-80q91 0 171 34.5T391-471q60 60 94.5 140T520-160h-80Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Patient Engagement & Education</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Patient Engagement & Education</h3>
                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Document patient literacy levels, learning preferences, and strategies for effective self-management education.</p>

                                                <p><strong>How to Use:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Press the Update button to note educational materials provided, patient understanding, and engagement strategies tailored to the individual’s needs.</small></li>
                                                    <li><small><strong>View Info:</strong> Use the View button to access records of past educational efforts. Browse through them with the Previous and Next buttons to evaluate patient progress and adjust approaches as needed.</small></li>
                                                </ul>

                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="engagement_section_update" onclick="javascript:showOnClick('engagement_section_form', 'engagement_section_view_btn');hideOnClick('engagement_section_update', 'engagement_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="engagement_section_view_btn" onclick="javascript:hideOnClick('engagement_section_form', 'engagement_section_view_btn');showOnClick('engagement_section_update', 'engagement_section_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="engagement_section_form" style="display:none">
                                        <!-- Health Literacy Assessment -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Health Literacy Assessment</h5>
                                            <div class="mb-3">
                                                <label class="form-label" for="primaryLanguageField">Primary Language</label>
                                                <SearchableSelectField class="form-control" id="primaryLanguageField" name="primary_language">
                                                    <option value="">Select Language</option>
                                                    <option value="English">English</option>
                                                    <option value="Spanish">Spanish</option>
                                                    <option value="French">French</option>
                                                    <option value="Other">Other</option>
                                                </SearchableSelectField>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="interpreterNeededField" name="interpreter_needed" value="yes">
                                                <label class="form-check-label" for="interpreterNeededField">Interpreter Needed</label>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="learningPreferences">Learning Preferences</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="visualLearnerField" name="visual_learner" value="Visual Materials">
                                                    <label class="form-check-label" for="visualLearnerField">Visual Materials</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="auditoryLearnerField" name="auditory_learner" value="Verbal Instructions">
                                                    <label class="form-check-label" for="auditoryLearnerField">Verbal Instructions</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="handsonLearnerField" name="hands_on_learner" value="Hands-on Demonstration">
                                                    <label class="form-check-label" for="handsonLearnerField">Hands-on Demonstration</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="learningBarriersField">Barriers to Understanding</label>
                                                <textarea class="form-control" id="learningBarriersField" name="learning_barriers" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Education Provided -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Education Provided</h5>
                                            <div class="mb-3">
                                                <label class="form-label" for="educationFormat">Format</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="verbalFormatField" name="verbal_format" value="Verbal">
                                                    <label class="form-check-label" for="verbalFormatField">Verbal</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="writtenFormatField" name="written_format" value="Written">
                                                    <label class="form-check-label" for="writtenFormatField">Written</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="videoFormatField" name="video_format" value="Video">
                                                    <label class="form-check-label" for="videoFormatField">Video</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="demoFormatField" name="demo_format" value="Demonstration">
                                                    <label class="form-check-label" for="demoFormatField">Demonstration</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="topicsCoveredField">Topics Covered</label>
                                                <textarea class="form-control" id="topicsCoveredField" name="topics_covered" rows="2"></textarea>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="understandingVerifiedField" name="understanding_verified" value="yes">
                                                <label class="form-check-label" for="understandingVerifiedField">Understanding Verified</label>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="takeHomeMaterialsField">Take-Home Materials</label>
                                                <textarea class="form-control" id="takeHomeMaterialsField" name="take_home_materials" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Self-Management Goals -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Self-Management Goals</h5>
                                            <div class="mb-3">
                                                <label class="form-label" for="patientGoalsField">Patient-Identified Goals</label>
                                                <textarea class="form-control" id="patientGoalsField" name="patient_goals" rows="3"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="achievementBarriersField">Barriers to Achievement</label>
                                                <textarea class="form-control" id="achievementBarriersField" name="achievement_barriers" rows="3"></textarea>
                                            </div>
                                        </div>

                                        <!-- Follow-up Support -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Follow-up Support</h5>
                                            <div class="mb-3">
                                                <label class="form-label" for="checkinMethod">Check-in Method</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="checkin_method" id="visitCheckinField" value="Visit">
                                                    <label class="form-check-label" for="visitCheckinField">Visit</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="checkin_method" id="portalCheckinField" value="Portal">
                                                    <label class="form-check-label" for="portalCheckinField">Portal</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="checkin_method" id="phoneCheckinField" value="Phone">
                                                    <label class="form-check-label" for="phoneCheckinField">Phone</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="checkinFrequencyField">Frequency</label>
                                                <input type="text" class="form-control" id="checkinFrequencyField" name="checkin_frequency">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="supportPersonField">Support Person Involved</label>
                                                <input type="text" class="form-control" id="supportPersonField" name="support_person">
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save Patient Engagement</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    <div id="engagement_section_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div class="" id="slides_patient_educations_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_patient_educations">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_patient_educations">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_patient_educations">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item" id="outcomeMeasures" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9B5278"><path d="M320-240h60v-200h100l40 80h200v-240H600l-40-80H320v440Zm237-180-40-80H380v-120h143l40 80h97v120H557ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Outcome Measures</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Outcome Measures</h3>
                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Define and track measurable clinical outcomes, quality of life scores, and adherence to treatment standards.</p>

                                                <p><strong>Instructions:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Click Update to set new outcome targets, record progress, and update quality of life assessments.</small></li>
                                                    <li><small><strong>View Info:</strong> Use the View button to access historical outcome measures, and navigate with the Previous/Next buttons.</small></li>
                                                </ul>

                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="outcomes_section_update" onclick="javascript:showOnClick('outcomes_section_form', 'outcomes_section_view_btn');hideOnClick('outcomes_section_update', 'outcomes_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="outcomes_section_view_btn" onclick="javascript:hideOnClick('outcomes_section_form', 'outcomes_section_view_btn');showOnClick('outcomes_section_update', 'outcomes_section_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="outcomes_section_form" style="display:none">
                                        <!-- Clinical Outcomes -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Clinical Outcomes</h5>
                                            <div class="mb-3">
                                                <label class="form-label">Targets</label>
                                                <div class="input-group">
                                                    <textarea class="form-control" id="clinical_outcome_targets" name="clinical_outcome_targets" rows="2"></textarea>
                                                </div>
                                            </div>

                                        </div>

                                        <!-- Patient-Reported Outcomes -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Patient-Reported Outcomes</h5>
                                            <div class="mb-3">
                                                <label class="form-label">Quality of Life Score (0-100)</label>
                                                <input type="range" class="form-range" id="qolScore" name="qol_score" min="0" max="100">
                                                <div class="text-center" id="qolScoreDisplay">50</div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Functional Status</label>
                                                <SearchableSelectField class="form-control" id="functionalStatus" name="functional_status">
                                                    <option value="">Select Status</option>
                                                    <option value="Independent">Fully Independent</option>
                                                    <option value="MinimalAssistance">Minimal Assistance</option>
                                                    <option value="ModerateAssistance">Moderate Assistance</option>
                                                    <option value="MaximalAssistance">Maximal Assistance</option>
                                                </SearchableSelectField>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Symptom Burden</label>
                                                <textarea class="form-control" id="symptomBurden" name="symptom_burden" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Treatment Adherence -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Treatment Adherence</h5>
                                            <div class="mb-3">
                                                <label class="form-label">Medication Adherence Rate</label>
                                                <SearchableSelectField class="form-control" id="medicationAdherence" name="medication_adherence_rate">
                                                    <option value="">Select Rate</option>
                                                    <option value=">90% adherence">>90% adherence</option>
                                                    <option value="75-90% adherence">75-90% adherence</option>
                                                    <option value="50-75% adherence">50-75% adherence</option>
                                                    <option value="<50% adherence"><50% adherence</option>
                                                </SearchableSelectField>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Appointment Adherence</label>
                                                <div class="input-group">
                                                    <input type="number" class="form-control" id="appointmentAdherenceRate" name="appointment_adherence_rate">
                                                    <span class="input-group-text">% of appointments attended</span>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Lifestyle Modification Adherence</label>
                                                <textarea class="form-control" id="lifestyleModificationAdherence" name="lifestyle_modification_adherence" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save Outcome Measures</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    <div id="outcomes_section_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div class="" id="slides_outcome_measures_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_outcome_measures">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_outcome_measures">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_outcome_measures">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="accordion-item" id="contingencyPlanning" style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <div onclick="toggleAccordion(this)" 
                                style="padding: 15px; cursor: pointer; background-color: none; color: none; font-weight: bold; border-radius: 5px 5px 0 0;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#BB271A"><path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z"/></svg>
                                </span>
                                <span style="font-size: 16px">Contingency Planning</span>
                            </div>
                            <div style="display: none; padding: 15px; background-color: none; border-top: 1px solid none;">
                                <div class="">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3 class="card-title text-primary mb-4">Contingency Planning</h3>
                                            <i class="text-muted">
                                                <p><strong>Purpose:</strong> Develop and update emergency action plans and backup strategies for critical or alert situations.</p>

                                                <p><strong>Instructions:</strong></p>
                                                <ul>
                                                    <li><small><strong>Add Info:</strong> Click Update to enter or revise contingency plans for emergencies, including protocols and escalation procedures.</small></li>
                                                    <li><small><strong>View Info:</strong> Click View to review past contingency planning records. Use the Previous/Next buttons to view historical updates.</small></li>
                                                </ul>

                                            </i>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div>
                                                <button class="btn btn-md btn-outline-success" id="contingency_section_update" onclick="javascript:showOnClick('contingency_section_form', 'contingency_section_view_btn');hideOnClick('contingency_section_update', 'contingency_section_view')">
                                                    add info
                                                </button>
                                                <button style="display:none" class="btn btn-md btn-outline-primary" id="contingency_section_view_btn" onclick="javascript:hideOnClick('contingency_section_form', 'contingency_section_view_btn');showOnClick('contingency_section_update', 'contingency_section_view')">
                                                    view
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Form Section -->
                                    <form id="contingency_section_form" style="display:none">
                                        <!-- Emergency Action Plan -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Emergency Action Plan</h5>
                                            <div class="mb-3">
                                                <label class="form-label" for="warningSigns">Warning Signs</label>
                                                <textarea class="form-control" id="warningSigns" name="warning_signs" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="emergencyCare">When to Seek Emergency Care</label>
                                                <textarea class="form-control" id="emergencyCare" name="emergency_care" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="emergencyContacts">Emergency Contacts</label>
                                                <textarea class="form-control" id="emergencyContacts" name="emergency_contacts" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="emergencyFacility">Preferred Emergency Facility</label>
                                                <input type="text" class="form-control" id="emergencyFacility" name="emergency_facility">
                                            </div>
                                        </div>

                                        <!-- Backup Plans -->
                                        <div class="mb-4">
                                            <h5 class="section-header">Backup Plans</h5>
                                            <div class="mb-3">
                                                <label class="form-label" for="medicationAccess">Medication Access</label>
                                                <textarea class="form-control" id="medicationAccess" name="medication_access" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="careAccess">Care Access</label>
                                                <textarea class="form-control" id="careAccess" name="care_access" rows="2"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="supportSystems">Support Systems</label>
                                                <textarea class="form-control" id="supportSystems" name="support_systems" rows="2"></textarea>
                                            </div>
                                        </div>

                                        <!-- Submit Button -->
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary">Save Contingency Plan</button>
                                        </div>
                                    </form>

                                    <!-- View Section -->
                                    <div id="contingency_section_view">
                                        <div class="slider-container">
                                            <!-- Slides Wrapper -->
                                            <div class="" id="slides_contingency_plannings_buttons">
                                                <button class="btn btn-danger btn-xs" id="prevBtn_contingency_plannings">←Previous</button>
                                                <button class="btn btn-info btn-xs" id="nextBtn_contingency_plannings">Next→</button>
                                            </div>
                                            <div class="slides" id="slides_contingency_plannings">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="modal fade" id="editMedicationRefillTP" tabindex="-1" role="dialog" aria-labelledby="select"
                            aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" id="exampleModalLongTitle">Edit Medication</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <div class="row">
                                            <div class="col-md-12 col-sm-12">
                                                <div class="card card-box">
                                                    <div class="card-head">
                                                        <header><span id="medication_name_tp"></span></header>
                                                    </div>
                                                    <div class="card-body" id="bar-parent">
                                                        <div id="manageMedicationFormTP">

                                                        
                                                            <div class="form-body">

                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-5">Refill Medication
                                                                        <span class="required"> </span>
                                                                    </label>
                                                                    <div class="col-md-7">
                                                                        <input id="refill_date_range_tp" placeholder="Click to select date range" data-required="1" class="form-control col-md-12" onchange="" readonly='true' class="w-100" />
                                                                        <input type="hidden" name="" id="1medication_id_tp">
                                                                        <input type="hidden" name="" id="1medication_type_tp">
                                                                        <input type="hidden" name="" id="1medication_extra_tp">
                                                                    </div>
                                                                    <div class="mt-3 col-md-12"></div>  
                                                                    <label class="control-label col-md-5">Refill Reason
                                                                        <span class="required"> </span>
                                                                    </label>
                                                                    <div class="col-md-7">
                                                                        <input type="text" id="refill_reason_tp" name="reason" class="form-control col-md-12">
                                                                    </div>
                                                                    <div class="col-md-12 mt-3 d-flex justify-content-center">
                                                                        <button type="submit" onclick="submitRefillInformationTP()"
                                                                            class="btn btn-info btn-xs">Submit</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="editMedicationChangeTP" tabindex="-1" role="dialog" aria-labelledby="select"
                            aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" id="exampleModalLongTitle">Edit Medication</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <div class="row">
                                            <div class="col-md-12 col-sm-12">
                                                <div class="card card-box">
                                                    <div class="card-head">
                                                        <header><span id="medication_name_tp"></span></header>
                                                    </div>
                                                    <div class="card-body" id="bar-parent">
                                                        <div id="manageMedicationFormTP">

                                                        
                                                            <div class="form-body">
                                                                
                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-5">Change Frequency
                                                                        <span class="required"> </span>
                                                                    </label>
                                                                    <div class="col-md-7">
                                                                        <input type="hidden" name="" id="2medication_id_tp">
                                                                        <input type="hidden" name="" id="2medication_type_tp">
                                                                        <SearchableSelectField id="change_date_range_tp" name="frequency" class="medicationFrequencySelect_tp form-control show-menu-arrow show-tick col-md-12" data-required="1" data-live-search="true" data-size="5" title="Select New Frequency"></SearchableSelectField>

                                                                    </div>
                                                                    <div class="mt-3 col-md-12"></div>
                                                                    <label class="control-label col-md-5">Change Reason
                                                                        <span class="required"> </span>
                                                                    </label>
                                                                    <div class="col-md-7">
                                                                        <input type="text" id="change_reason_tp" name="reason" class="form-control col-md-12">
                                                                    </div>
                                                                    <div class="col-md-12 mt-3 d-flex justify-content-center">
                                                                        <button type="submit" onclick="submitChangeInformationTP()"
                                                                            class="btn btn-info btn-xs">Submit</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="lab_report_information_tp" role="dialog">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-body lab_report_tp" id="labReportTP">
                                    </div>
                                    <div class="modal-footer">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="scan_report_information_tp" role="dialog">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-body scan_report_tp" id="labReportTP">
                                    </div>
                                    <div class="modal-footer">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="viewMedicationDialogTp" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" id="viewMedicationTitle"><!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --> Details</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-body medTp">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="viewMedicationInteractionTp" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" id="viewMedicationTitle">Drug Interactions</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body medInteractionTp">

                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
				</div>

			</div>
		</div>
	</div>
</div>

<input type="hidden" id="all_added_treatment_information">


<script>
    let doctorsSpecialInstructionForm_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitDoctorNotes', 'action' => 'add', isset($patient) ? $patient->id : '', isset($selectedVisit) ? $selectedVisit->id : ' ']) -->\`
    let patient_id = "<!-- php: = $patient->id -->";
    let visit_id = "<!-- php: = $selectedVisit->id -->";
    let treatmentMedicationsTab_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => ('getAllMedicationsTP'), $patient->id, $selectedVisit->id, ]) -->"
    let populateMedicationDashboardItemsTp_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => ('getAllMedicationsTPDashboard'), $patient->id, $selectedVisit->id, ]) -->"
    let fetchLabsNRadioTP_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRequestRadioLabs', $selectedVisit->patient_id, $selectedVisit->id]) -->\`
    let fetchSpecialInstructionNotesTp_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDoctorNotes', 'action' => 'getAllSpecialInstructionsDoctorNotes', $selectedVisit->id]) -->"
    let fetchMedicationNotesTp_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDoctorNotes', 'action' => 'getAllMedicationDoctorNotes', $selectedVisit->id]) -->"
    let fetchMedicalManagement_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getMedicalManagement', $selectedVisit->patient_id, $selectedVisit->id]) -->"
    let populateAllergiesTableTp_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientAllergies', $patient->id ] ); -->"
    let populateReferalsTp_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAllConsultationRequestTp', $patient->id ]) -->"
    let populateSurgeryDetails_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getRequestedSurgeriesItems', $patient->id ] ); -->"
    let populateSurgicalManagement_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestSurgeries', 'action' => 'getSurgicalManagement', $patient->id ] ); -->"
    let populateLifeStyleRecommendations_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getLifestyleRecommendation', $patient->id ] ); -->"
    let populateMonitoringPlanDiagnosis_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAllPatientDiagnosis', $patient->id, $selectedVisit->id, '?' => ['_location' => 'diagnosis']]) -->"
    let populateMonitoringPlans_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getMonitoringPlans', $patient->id ] ); -->"
    let populateProgressNotes_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getProgressNotes', $patient->id ] ); -->"
    let progressNotesvitalsInfo_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitVitals']) -->"
    let populateClinicalDecisions_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getClinicalDecisions', $patient->id ] ); -->"
    let populateInterdisciplinaryCareCoordinations_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getInterdisciplinaryCareCoordinations', $patient->id ] ); -->" 
    let populateHealthSocialDeterminants_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getHealthSocialDeterminants', $patient->id ] ); -->"
    let populatePatientEducations_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getPatientEducations', $patient->id ] ); -->"
    let populateOutcomeMeasures_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getOutcomeMeasures', $patient->id ] ); -->"
    let populateContingencyPlannings_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getContingencyPlannings', $patient->id ] ); -->"

    let investigation_form_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'saveReferralTreatmentAction', isset($patient) ? $patient->id : '', isset($selectedVisit) ? $selectedVisit->id : ' ']) -->\`
    let medication_section_form_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'addMedicalManagement', $selectedVisit->patient_id, $selectedVisit->id ]) -->\`
    let doctorsMedicationNotesFormTp_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitDoctorNotes', 'action' => 'add', isset($patient) ? $patient->id : '', isset($selectedVisit) ? $selectedVisit->id : ' ']) -->\`
    let setNewMedicationStatusTP_pres_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionStatus']) -->\`
    let setNewMedicationStatusTP_infus_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionStatus']) -->\`
    let pauseMedicationTP_pres_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionStatus']) -->\`
    let pauseMedicationTP_infus_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionStatus']) -->\`
    let completeMedicationTP_pres_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionStatus']) -->\`
    let completeMedicationTP_infus_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionStatus']) -->\`
    let setFrequencyChangeTP_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getDrugAdminFrequencies']) -->\`
    let submitChangeInformationTP_pres_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionFrequency']) -->\`
    let submitChangeInformationTP_infus_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionFrequency']) -->\`
    let refillInfusionTPSubmit_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestInfusion', $patient->id, $selectedVisit->id]) -->\`
    let refillPrescriptionTPSubmit_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestPrescription', $patient->id, $selectedVisit->id]) -->\`
    let setInvestigationInfo_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRelatedInvestigation', $patient->id, $selectedVisit->id]) -->\`
    let showLabReportInfoTp_link = "<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'patientVisitLabReport', isset($selectedVisit) ? $selectedVisit->id : '',]) -->/"
    let showScanReportInfoTp_link = "<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'viewPatientScanFiles']) -->/"
    let loadPrescriptionDetailsTp_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewPrescriptionTp']) -->?id="
    let loadInfusionDetailsTp_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewInfusionTp']) -->?id="
    let drugInteractionModal_link = "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'allPatientRequestedMedicationTp', $patient->id]) -->"
    let surgery_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestSurgeries', 'action' => 'saveSurgicalManagement', $patient->id, $selectedVisit->id ] ); -->"
    let lifestyle_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveLifestyleRecommendation', $patient->id, $selectedVisit->id ] ); -->"
    let monitoring_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveMonitoringPlans', $patient->id, $selectedVisit->id ] ); -->"
    let progress_notes_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveProgressNotes', $patient->id, $selectedVisit->id ] ); -->"
    let cds_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveClinicalDecisionSupport', $patient->id, $selectedVisit->id ] ); -->"
    let care_coordination_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveCareCoordination', $patient->id, $selectedVisit->id ] ); -->"
    let sdoh_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveSocialDeterminants', $patient->id, $selectedVisit->id ] ); -->"
    let engagement_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'savePatientEngagement', $patient->id, $selectedVisit->id ] ); -->"
    let outcomes_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveOutcomeMeasure', $patient->id, $selectedVisit->id ] ); -->"
    let contingency_section_form_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'saveContingencyPlan', $patient->id, $selectedVisit->id ] ); -->"
    let patient_date_of_birth = '<!-- php: = $patient->date_of_birth -->'

    let populateInvestigationDashboardItemsTp_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRelatedInvestigationTPDashboard', $patient->id, $selectedVisit->id]) -->\`
    const recentUpdates = []
    

</script>
<!-- php: = $this->Html->script('../assets/js/pages/visit_space/treatment_plan.js') -->
<script>

    async function treatmentPlan() {
		treatmentMedicationsTab(treatmentMedicationsTab_link, patient_id, visit_id)
		fetchLabsNRadioTP(fetchLabsNRadioTP_link, patient_id, visit_id)
		await fetchSpecialInstructionNotesTp(fetchSpecialInstructionNotesTp_link, patient_id, visit_id, recentUpdates)
		await fetchMedicationNotesTp(fetchMedicationNotesTp_link, patient_id, visit_id, recentUpdates)
		await fetchMedicalManagement(fetchMedicalManagement_link, patient_id, visit_id, recentUpdates)
		populateAllergiesTableTp(populateAllergiesTableTp_link, patient_id, visit_id)
		populateReferalsTp(populateReferalsTp_link, patient_id, visit_id)
		populateSurgeryDetails(populateSurgeryDetails_link, patient_id, visit_id)
		await populateSurgicalManagement(populateSurgicalManagement_link, patient_id, visit_id, recentUpdates)
		await populateLifeStyleRecommendations(populateLifeStyleRecommendations_link, patient_id, visit_id, recentUpdates)
		populateMonitoringPlanDiagnosis(populateMonitoringPlanDiagnosis_link, patient_id, visit_id)
		await populateMonitoringPlans(populateMonitoringPlans_link, patient_id, visit_id, recentUpdates)
		await populateProgressNotes(populateProgressNotes_link, patient_id, visit_id, recentUpdates)
		progressNotesvitalsInfo(progressNotesvitalsInfo_link, patient_id, visit_id)
		await populateClinicalDecisions(populateClinicalDecisions_link, patient_id, visit_id, recentUpdates)
		await populateInterdisciplinaryCareCoordinations(populateInterdisciplinaryCareCoordinations_link, patient_id, visit_id, recentUpdates)
		await populateHealthSocialDeterminants(populateHealthSocialDeterminants_link, patient_id, visit_id, recentUpdates)
		await populatePatientEducations(populatePatientEducations_link, patient_id, visit_id, recentUpdates)
		await populateOutcomeMeasures(populateOutcomeMeasures_link, patient_id, visit_id, recentUpdates)
		await populateContingencyPlannings(populateContingencyPlannings_link, patient_id, visit_id, recentUpdates)

        populateMedicationDashboardItemsTp(populateMedicationDashboardItemsTp_link,)
        populateInvestigationDashboardItemsTp(populateInvestigationDashboardItemsTp_link,)
        console.log("recentUpdates",recentUpdates)
        $('#recent_update_tp_section').html(recentUpdates.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0,4).map(ele => {
            return \`
                <div class="update-item">
                    <div class="update-header">
                        <p class="value">\${ele.title}</p>
                        <p class="update-date">\${new Date(ele.date).toLocaleString()}</p>
                    </div>
                    <p class="update-author">Updated by: \${ele.user}</p>
                </div>
            \`
        }).join(''));
	}

</script>
`;

export default function ElementElementPatientvisitTreatmentPlan() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
