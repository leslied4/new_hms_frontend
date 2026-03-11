import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/PatientVisits/careflow_condition_builder.php';
const rawHtml = `
<style>

    #careflowbody {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #ffffff;
        /* min-height: 100vh; */
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    #careflowbody .form-container {
        background: #ffffff;
        padding: 40px;

        width: 100%;
    }

    #careflowbody .form-header {
        text-align: center;
        margin-bottom: 40px;
    }

    #careflowbody .form-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 10px;
        letter-spacing: -0.02em;
    }

    #careflowbody .form-subtitle {
        color: #6b7280;
        font-size: 1.1rem;
        font-weight: 400;
        margin-bottom: 30px;
        line-height: 1.5;
    }

    #careflowbody .progress-container {
        margin-bottom: 20px;
    }

    #careflowbody .progress-steps {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
    }

    #careflowbody .progress-steps::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background: #e5e7eb;
        z-index: 1;
        transform: translateY(-50%);
    }

    #careflowbody .progress-line {
        position: absolute;
        top: 50%;
        left: 0;
        height: 2px;
        background: #3b82f6;
        z-index: 2;
        transform: translateY(-50%);
        width: 0;
        transition: width 0.6s ease;
        border-radius: 1px;
    }

    #careflowbody .step {
        position: relative;
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        padding: 5px;
    }

    #careflowbody .step-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s ease;
        margin-bottom: 8px;
        border: 2px solid transparent;
    }

    #careflowbody .step.active .step-circle {
        background: #3b82f6;
        color: white;
        transform: scale(1.05);
    }

    #careflowbody .step.completed .step-circle {
        background: #10b981;
        color: white;
    }

    #careflowbody .step.pending .step-circle {
        background: #f3f4f6;
        color: #9ca3af;
        border-color: #e5e7eb;
    }

    #careflowbody .step-label {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        /* min-height: 32px; */
        display: flex;
        align-items: center;
    }

    #careflowbody .step.active .step-label {
        color: #3b82f6;
        font-weight: 600;
    }

    #careflowbody .step.completed .step-label {
        color: #10b981;
    }

    #careflowbody .step.pending .step-label {
        color: #9ca3af;
    }

    #careflowbody .current-step-info {
        text-align: center;
        padding: 20px 0;
    }

    #careflowbody .current-step-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 8px;
    }

    #careflowbody .current-step-description {
        color: #6b7280;
        font-size: 0.95rem;
        line-height: 1.5;
    }

    @media (max-width: 640px) {
        #careflowbody .form-container {
            padding: 30px 20px;
        }
        
        #careflowbody .form-title {
            font-size: 2rem;
        }
        
        #careflowbody .step-circle {
            width: 32px;
            height: 32px;
            font-size: 12px;
        }
        
        #careflowbody .step-label {
            font-size: 11px;
        }
    }

    #careflowbody .step-circle.check::after {
        content: '✓';
        font-size: 16px;
        font-weight: bold;
    }

    #careflowbody .step.completed .step-circle.check {
        background: #10b981;
        color: white;
    }

    #careflowbody .step-content {
        display: none;
    }

    #careflowbody .step-content.active {
        display: block;
    }


    #careflowbody .form-sectioned {
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 25px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: 0.2s ease;
    }
    #careflowbody .form-sectioned:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
    #careflowbody .form-sectioned h3 {
      margin-top: 0;
      font-size: 18px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
      color: #007bff;
    }

    #careflowbody .condition-row {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      align-items: center;
      padding: 8px;
      background: #f9fbfc;
      border-radius: 8px;
      border: 1px solid #e5e9f0;
    }
    #careflowbody select, input {
      padding: 6px 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      min-width: 120px;
      font-size: 14px;
    }
    #careflowbody input[type=text] { flex: 1; }

    #careflowbody .add-btn {
      margin-top: 10px;
      padding: 6px 12px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    #careflowbody .add-btn:hover { background: #0056b3; }

    #careflowbody .delete-btn {
      background: #ff4d4d;
      border: none;
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
    }
    #careflowbody .delete-btn:hover { background: #cc0000; }

    #careflowbody .navigation {
        display: flex;
        /* justify-content: space-between; */
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #e1e5e9;
        justify-content: end;
    }

    #careflowbody .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    #careflowbody .btn-secondary {
        background: #e1e5e9;
        color: #4a5568;
    }

    #careflowbody .btn-primary {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
    }

    #careflowbody .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    /* #careflowbody .tab-icon-active {
        margin-right: 8px;
    } */
    #careflowbody .section-toggle {
        cursor: pointer;
    }
    #careflowbody .code-badge {
        background-color: #ede9fe;
        color: #6b21a8;
        padding: 4px 8px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.875rem;
    }
    #careflowbody .nav-tabs .nav-link {
        border: none;
        border-bottom: 2px solid transparent;
        color: #6b7280;
        font-weight: 500;
        padding: 12px 16px;
        white-space: nowrap;
    }
    #careflowbody .nav-tabs .nav-link.active {
        border-bottom: 2px solid #8b5cf6;
        color: #8b5cf6;
        background-color: #f5f3ff;
    }
    #careflowbody .nav-tabs .nav-link:hover {
        color: #374151;
        border-bottom-color: #d1d5db;
    }

    #careflowbody .bullet-point {
        width: 8px;
        height: 8px;
        background-color: #8b5cf6;
        border-radius: 50%;
        margin-top: 10px;
        flex-shrink: 0;
    }

    /* Limit autocomplete dropdown height */
    .ui-autocomplete {
      max-height: 200px;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 10000 !important;
    }
</style>
<style>
    .medical-container {
        max-width: 800px;
        margin: 20px auto;
        font-family: Arial, sans-serif;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 20px;
    }

    .medical-container .section {
        margin-bottom: 25px;
        padding: 15px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
    }

    .medical-container .section h3 {
        margin: 0 0 15px 0;
        color: #333;
        border-bottom: 2px solid #007bff;
        padding-bottom: 5px;
    }

    .medical-container .tag {
        display: inline-block;
        background: #007bff;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        margin: 2px;
        font-size: 14px;
    }

    .medical-container .item {
        background: #f8f9fa;
        padding: 10px;
        margin: 8px 0;
        border-radius: 4px;
        border-left: 3px solid #007bff;
    }

    .medical-container .diagnosis {
        background: #dc3545;
    }

    .medical-container .empty {
        color: #666;
        font-style: italic;
        padding: 10px;
    }
</style>
<style>
    /* Add to existing styles */
    .emergency-flag {
        background-color: #ffebee;
        border-left: 4px solid #f44336;
        padding: 10px;
        margin: 10px 0;
    }
    
    .tews-indicator {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        margin-right: 5px;
    }
    
    .tews-blue { background-color: #1976d2; }
    .tews-red { background-color: #d32f2f; }
    .tews-orange { background-color: #f57c00; }
    .tews-yellow { background-color: #fbc02d; }
    .tews-green { background-color: #388e3c; }
    
    .pathway-category {
        margin-bottom: 20px;
    }
    
    .category-option {
        display: inline-block;
        padding: 10px 15px;
        margin-right: 10px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
    }
    .triage-option {
        display: inline-block;
        padding: 10px 15px;
        margin-right: 10px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .category-option.selected {
        border-color: #3b82f6;
        background-color: #eff6ff;
    }
    .triage-option.selected {
        border-color: #3b82f6;
        background-color: #eff6ff;
    }
    
    /* .category-option.emergency {
        border-color: #dc2626;
    } */
    
    .category-option.emergency.selected {
        background-color: #f2a5a5ff;
    }
    
    .tews-conditions {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        margin: 15px 0;
        border: 1px solid #e9ecef;
    }
    
    .tews-age-group {
        margin-bottom: 15px;
    }
    
    .tews-table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
    }
    
    .tews-table th, .tews-table td {
        border: 1px solid #dee2e6;
        padding: 8px;
        text-align: left;
    }
    
    .tews-table th {
        background-color: #e9ecef;
    }
</style>
<style>
.emergency-stabilization-wrapper {
    margin-top: 13px;
}

.emergency-stabilization-wrapper .es-form-container {
    max-width: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    overflow: hidden;
    margin: 1rem 0;
}

/* .emergency-stabilization-wrapper .es-form-header {
    background: #495057;
    color: white;
    padding: 1.5rem;
    text-align: center;
}

.emergency-stabilization-wrapper .es-form-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
} */

.emergency-stabilization-wrapper .es-form-body {
    padding: 2rem;
}

.emergency-stabilization-wrapper .es-step-item {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;
}

.emergency-stabilization-wrapper .es-step-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.emergency-stabilization-wrapper .es-step-label {
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    display: block;
}

.emergency-stabilization-wrapper .es-step-letter {
    display: inline-block;
    background: #495057;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-right: 0.75rem;
}

.emergency-stabilization-wrapper .es-form-control {
    width: 100%;
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 0.75rem;
    font-size: 0.95rem;
    font-family: inherit;
}

.emergency-stabilization-wrapper .es-form-control:focus {
    outline: none;
    border-color: #495057;
    box-shadow: 0 0 0 0.2rem rgba(73, 80, 87, 0.1);
}

.emergency-stabilization-wrapper .es-form-control::placeholder {
    color: #6c757d;
    opacity: 1;
}
</style>

<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'careflowConditionBuilder'], 'class' => 'p-2', 'id' => 'careflowbody']); -->
  <div class="form-container">
      <div class="form-header">
          <h1 class="form-title">Clinical Pathway</h1>
          <p class="form-subtitle">Complete the form below to create your pathway for clinical care</p>
          
          <div class="progress-container">
              <div class="progress-steps">
                  <div class="progress-line" id="progressLine"></div>
                  
                  <div class="step active">
                      <div class="step-circle">1</div>
                      <div class="step-label">General<br>Information</div>
                  </div>
                  
                  <div class="step pending">
                      <div class="step-circle">2</div>
                      <div class="step-label">Filter<br>Details</div>
                  </div>
                  
                  <div class="step pending">
                      <div class="step-circle">3</div>
                      <div class="step-label">Details</div>
                  </div>
                  <div class="step pending">
                      <div class="step-circle">4</div>
                      <div class="step-label">Services</div>
                  </div>
                  <div class="step pending">
                      <div class="step-circle">5</div>
                      <div class="step-label">Preview</div>
                  </div>
              </div>
          </div>
          
          <div class="step-content active" id='step1'>
              <h2 class="current-step-title">General Information</h2>
                <div class="form-group row">
                    <label class="control-label col-md-2">Title
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-10">
                        <input type="text" name="title" id="title" data-required="1" placeholder="Enter Title" class="form-control input-height" required /> 
                    </div>
                </div>
                <div class="form-group row pathway-category">
                    <label class="control-label col-md-2">Pathway Category
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-10 d-flex">
                        <div class="category-option" data-category="chronic" onclick="selectCategory('chronic')">
                            <input type="radio" name="pathway_category" value="chronic" id="category_chronic" style="display: none;">
                            <label for="category_chronic" style="cursor: pointer;">Chronic Care</label>
                        </div>
                        <div class="category-option" data-category="acute" onclick="selectCategory('acute')">
                            <input type="radio" name="pathway_category" value="acute" id="category_acute" style="display: none;">
                            <label for="category_acute" style="cursor: pointer;">Acute Care</label>
                        </div>
                        <div class="category-option emergency" data-category="emergency" onclick="selectCategory('emergency')">
                            <input type="radio" name="pathway_category" value="emergency" id="category_emergency" style="display: none;">
                            <label for="category_emergency" style="cursor: pointer;">Emergency</label>
                        </div>
                        <div class="category-option" data-category="preventive" onclick="selectCategory('preventive')">
                            <input type="radio" name="pathway_category" value="preventive" id="category_preventive" style="display: none;">
                            <label for="category_preventive" style="cursor: pointer;">Preventive / Screening</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row pathway-category" id="triage_color" style="display: none">
                    <label class="control-label col-md-2">Triage Color
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-10 d-flex">
                        <div class="triage-option" data-category="blue" onclick="selectTriageCategory('blue')">
                            <input type="radio" name="triage_color" value="blue" id="category_blue" style="display: none;">
                            <label for="category_blue" style="cursor: pointer;">🔵 Blue: Dead</label>
                        </div>
                        <div class="triage-option" data-category="red" onclick="selectTriageCategory('red')">
                            <input type="radio" name="triage_color" value="red" id="category_red" style="display: none;">
                            <label for="category_red" style="cursor: pointer;">🔴 Red: Emergency (Care within 0 min)</label>
                        </div>
                        <div class="triage-option" data-category="orange" onclick="selectTriageCategory('orange')">
                            <input type="radio" name="triage_color" value="orange" id="category_orange" style="display: none;">
                            <label for="category_orange" style="cursor: pointer;">🟠 Orange: Urgent (Care within 10 min)</label>
                        </div>
                        <div class="triage-option" data-category="yellow" onclick="selectTriageCategory('yellow')">
                            <input type="radio" name="triage_color" value="yellow" id="category_yellow" style="display: none;">
                            <label for="category_yellow" style="cursor: pointer;">🟡 Yellow: Less Urgent (Care within 1 hour)</label>
                        </div>
                    </div>
                </div>
                <div id="emergency-notice" class="row emergency-flag" style="display: none;">
                  <h4><span class="tews-indicator tews-red">EMERGENCY PATHWAY</span></h4>
                  <p>This pathway will automatically set strict response-time targets, pre-assign emergency team roles, and load rapid stabilization protocols.</p>
                    <div class="form-group row">

                      <label class="control-label col-md-2">Urgency Response (minutes)
                      </label>
                      <div class="col-md-10">
                          <input type="text" placeholder="eg. 10" class="form-control" name="urgency_response_time" id="urgency_response_time">
                      </div>
                    </div>
                </div>
                <div class="form-group row" id="acute-notice_duration" style="display: none;">

                      <label class="control-label col-md-2">Episode Duration (days)
                      </label>
                      <div class="col-md-10">
                          <input type="text" placeholder="eg. 10" class="form-control" name="episode_duration">
                      </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-2">Specialty
                    </label>
                    <div class="col-md-10">
                        <SearchableSelectField multiple data-live-search="true" name="specialty[]" title="Select Specialty" id="specialty_select" class="form-control input-height selectpicker" data-size="3">
                          <!-- php: foreach ($specialties as $key => $type): -->
                            <option value="<!-- php: = $type->id -->"><!-- php: = $type->name --></option>
                          <!-- php: endforeach -->
                        </SearchableSelectField>
                    </div>
                </div>
                
            
                <div class="form-group row">
                    <label class="control-label col-md-2">Gender Specifications
                        
                    </label>
                    <div class="col-md-10">
                  <SearchableSelectField data-size="5" name="genders[]" class="form-control selectpicker" id="gender_specification" data-live-search="true" title="Select Gender" multiple>
                    <!-- php: foreach ($genders as $key => $gender): if($gender->id === '3') continue; // Skip -->
                      <option value="<!-- php: = ($gender->id) -->" <!-- php: = ($gender->id === $key) ? 'selected' : '' -->><!-- php: = ($gender->name) --></option>
                    <!-- php: endforeach; -->
                  </SearchableSelectField>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-2">Age Specifications
                        
                    </label>
                    <div class="col-md-10">
                  <SearchableSelectField data-size="5" name="age_specifications[]" id="age_specifications" class="form-control selectpicker" data-live-search="true" title="Select Age Specifications" multiple>
                    <!-- php: foreach ($age_specifications as $age_specification) { -->
                                <option value="<!-- php: = $age_specification->id -->"><!-- php: = $age_specification->age --></option>
                    <!-- php: } -->
                  </SearchableSelectField>
                    </div>
                </div>

          </div>
          <div class="step-content" id='step2'>
              <h2 class="current-step-title">Filter Details</h2>
              <div>
                <div class="form-sectioned">
                  <h3>0 - 3 Years</h3>

                  <div id="youngerThan3">

                  </div>
                  <span><a href="javascript:void(0);" class="add-btn" onclick="addMoreVitalsPerAge('youngerThan3')" id="add_more_button">+Add Vital</a></span><br>
                </div>
                <div class="form-sectioned">
                  <h3>3 - 12 Years</h3>

                  <div id="3to12">

                  </div>
                  <span><a href="javascript:void(0);" class="add-btn" onclick="addMoreVitalsPerAge('3to12')" id="add_more_button">+Add Vital</a></span><br>
                </div>
                <div class="form-sectioned">
                  <h3>Above 12 Years </h3>

                  <div id="olderThan12">

                  </div>
                  <span><a href="javascript:void(0);" class="add-btn" onclick="addMoreVitalsPerAge('olderThan12')" id="add_more_button">+Add Vital</a></span><br>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-12">
                  <div id="condition-builder">

                  </div>
                </div>
              </div>
          </div>
          <div class="step-content" id='step4'>
              <h2 class="current-step-title">Services</h2>
              <div class="form-sectioned">
                <h3>Diagnosis</h3>

                <div id="diagnosis-container">

                </div>
              </div>
              <div class="form-group row mt-3" id="modifier_div">
                  <div class="col-md-12">
                      <div class="row mb-1">
                          <div class="" id="">
                            
                          </div>
                          <div class="col-md-5" id="">
                              Name
                          </div>
                          <div class="col-md-5" id="">
                              Options
                          </div>
                      </div>
                      <div class="row mb-4">
                          <div class="" id="service_type_deleter">
                            
                          </div>
                          <div class="col-md-5" id="service_type_name">
                              
                          </div>
                          <div class="col-md-5" id="service_type_options">
                              
                          </div>
                      </div>
                      <span><a href="javascript:void(0);" class="add btn btn-md btn-info" onclick="addMoreServices()" id="add_more_button">+Add Service</a></span><br>
                  </div>
              </div>

          </div>
          <div class="step-content" id='step3'>
              <h2 class="current-step-title">Add Details Per Section</h2>
              <!-- detailspersection -->
                <!-- Tab Navigation -->
                <div class="card mb-4">
                    <div class="p-0">
                        <ul class="nav nav-tabs" style="margin-bottom: 0" id="" role="tablist">
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="emergency-tab" href="#emergency" role="tab" data-toggle="tab">
                                <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>Emergency
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link active" id="triage-tab" href="#triage" role="tab" data-toggle="tab">
                                <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>Triage
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="clinical_notes-tab" href="#clinical_notes" role="tab" data-toggle="tab">
                                <i class="bi bi-file-text-fill text-primary me-2"></i>Clinical Notes
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="ros_exam-tab" href="#ros_exam" role="tab" data-toggle="tab">
                                <i class="bi bi-heart-pulse-fill text-success me-2"></i>ROS/Examinations
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="diagnoses-tab" href="#diagnoses" role="tab" data-toggle="tab">
                                <i class="bi bi-cpu-fill text-purple me-2"></i>Diagnoses (ICD-10)
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="treatment_plan-tab" href="#treatment_plan" role="tab" data-toggle="tab">
                                <i class="bi bi-clipboard-fill text-warning me-2"></i>Treatment Plan
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="mar-tab" href="#mar" role="tab" data-toggle="tab">
                                <i class="bi bi-capsule-pill text-pink me-2"></i>MAR
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="flowsheets-tab" href="#flowsheets" role="tab" data-toggle="tab">
                                <i class="bi bi-activity text-indigo me-2"></i>Flowsheets
                              </a>
                            </li>
                            <li class="nav-item" role="presentation">
                              <a class="nav-link" id="followups-tab" href="#followups" role="tab" data-toggle="tab">
                                <i class="bi bi-calendar-event text-info me-2"></i>Follow-ups
                              </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    
              


                  <!-- Tab Content -->
                  <div class="tab-content" id="preconceptionTabContent">
                      <div class="tab-pane fade" id="emergency" role="tabpanel">
                        <div id="emergency_section_details">
                            <!-- <div class="form-group row" id="">

                              <label class="control-label col-md-2">Response Notes
                              </label>
                              <div class="col-md-10">
                                  <textarea class="form-control" name="emergency_response" placeholder="eg. Activate emergency team immediately" rows="2"></textarea>
                              </div>

                            </div> -->

                            <!--  -->
                            <div class="mt-5 emergency-stabilization-wrapper">
                                <div class="es-form-container">
                                    <div class="form-sectioned">
                                        <h3 class="es-form-title">Stabilization Steps</h3>
                                    </div>
                                    
                                    <div class="es-form-body">
                                        <div class="es-step-item">
                                            <label for="step_airway" class="es-step-label">
                                                <span class="es-step-letter">A</span>Airway
                                            </label>
                                            <input 
                                                type="text" 
                                                class="es-form-control" 
                                                id="step_airway" 
                                                name="emergency_stabilization_steps[airway]" 
                                                placeholder="Airway assessment and management"
                                            >
                                        </div>

                                        <div class="es-step-item">
                                            <label for="step_breathing" class="es-step-label">
                                                <span class="es-step-letter">B</span>Breathing
                                            </label>
                                            <input 
                                                type="text" 
                                                class="es-form-control" 
                                                id="step_breathing" 
                                                name="emergency_stabilization_steps[breathing]" 
                                                placeholder="Breathing assessment and support"
                                            >
                                        </div>

                                        <div class="es-step-item">
                                            <label for="step_circulation" class="es-step-label">
                                                <span class="es-step-letter">C</span>Circulation
                                            </label>
                                            <input 
                                                type="text" 
                                                class="es-form-control" 
                                                id="step_circulation" 
                                                name="emergency_stabilization_steps[circulation]" 
                                                placeholder="Circulation assessment and control"
                                            >
                                        </div>

                                        <div class="es-step-item">
                                            <label for="step_disability" class="es-step-label">
                                                <span class="es-step-letter">D</span>Disability / Neurological status
                                            </label>
                                            <input 
                                                type="text" 
                                                class="es-form-control" 
                                                id="step_disability" 
                                                name="emergency_stabilization_steps[disability]" 
                                                placeholder="Neurological assessment"
                                            >
                                        </div>

                                        <div class="es-step-item">
                                            <label for="step_exposure" class="es-step-label">
                                                <span class="es-step-letter">E</span>Exposure / Environment
                                            </label>
                                            <input 
                                                type="text" 
                                                class="es-form-control" 
                                                id="step_exposure" 
                                                name="emergency_stabilization_steps[exposure]" 
                                                placeholder="Full examination and environmental control"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--  -->

                            <div class="form-group row" id="">
                                <div class="form-sectioned col-md-12">
                                  <h3>Add Emergency Team Members</h3>
                                </div>
                                <div class="col-md-12">
                                    <div class="row mb-1">
                                        <div class="" id="">
                                          
                                        </div>
                                        <div class="col-md-5" id="">
                                            Name
                                        </div>
                                        <div class="col-md-5" id="">
                                            Desc.
                                        </div>
                                    </div>
                                    <div class="row mb-4">
                                        <div class="" id="emergency_team_deleter">
                                          
                                        </div>
                                        <div class="col-md-5" id="emergency_team_name">
                                            
                                        </div>
                                        <div class="col-md-5" id="emergency_team_options">
                                            
                                        </div>
                                    </div>
                                    <span><a href="javascript:void(0);" class="add btn btn-md btn-info" onclick="addMoreTeam()" id="add_more_button">+Add Member</a></span><br>
                                </div>
                            </div>

                            <div class="form-sectioned mt-4">
                              <h3>Protocols</h3>

                              <div id="">
                                  <SearchableSelectField data-size="5" name="protocols[]" id="protocols" class="form-control selectpicker" data-live-search="true" title="Select Protocol" multiple>
                                    <option value="">Proto</option>
                                  </SearchableSelectField>

                              </div>
                            </div>
                        </div>
                      </div>
                      <div class="tab-pane fade show active" id="triage" role="tabpanel">
                        <div id="triage_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('triage_section_details')">+ Add Triage Details</button>
                      </div>
                      <div class="tab-pane fade" id="clinical_notes" role="tabpanel">
                        <div class="row">

                          <label class="col-md-4 border" for="ccHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="ccHeading" name="ccHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Chief Complaint</span>
                          </label>

                          <label class="col-md-4 border" for="odqHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="odqHeading" name="odqHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">ODQ</span>
                          </label>

                          <label class="col-md-4 border" for="pmhHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="pmhHeading" name="pmhHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Past Medical History</span>
                          </label>

                          <label class="col-md-4 border" for="allergyHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="allergyHeading" name="allergyHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Allergies</span>
                          </label>

                          <label class="col-md-4 border" for="fhHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="fhHeading" name="fhHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Family History</span>
                          </label>

                          <label class="col-md-4 border" for="pshHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="pshHeading" name="pshHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Past Surgical History</span>
                          </label>

                          <label class="col-md-4 border" for="chHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="chHeading" name="chHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Childhood History</span>
                          </label>

                          <label class="col-md-4 border" for="phHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="phHeading" name="phHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Psychiatric History</span>
                          </label>

                          <label class="col-md-4 border" for="ghHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="ghHeading" name="ghHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Gynecological History</span>
                          </label>

                          <label class="col-md-4 border" for="ohHeading" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="ohHeading" name="ohHeading" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            <span style="font-size: 16px; font-weight: bold;">Occupational History</span>
                          </label>
                        </div>

                        <div id="clinical_notes_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('clinical_notes_section_details')">+ Add Clinical Notes Details</button>
                      </div>
                      <div class="tab-pane fade" id="ros_exam" role="tabpanel">
                        <div id="ros_exam_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('ros_exam_section_details')">+ Add ROS Details</button>
                      </div>
                      <div class="tab-pane fade" id="diagnoses" role="tabpanel">
                        <div id="diagnoses_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('diagnoses_section_details')">+ Add Diagnosis Details</button>
                      </div>
                      <div class="tab-pane fade" id="treatment_plan" role="tabpanel">
                        <div class="row">

                          <label class="col-md-4 border" for="cds-toggle" 
                                style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            
                            <input type="checkbox" id="cds-toggle" name="clinical_decision_support" value="1" 
                                  style="accent-color: #A96424; width: 18px; height: 18px;">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" 
                                viewBox="0 -960 960 960" fill="#A96424">
                              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 
                                      56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-640v560h560v-560h-80v280
                                      l-100-60-100 60v-280H200Zm0 560v-560 560Z"/>
                            </svg>
                            
                            <span style="font-size: 16px; font-weight: bold;">Clinical Decision Support</span>
                          </label>
                          <label class="col-md-4 border" for="sdoh-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            
                            <input type="checkbox" id="sdoh-toggle" name="social_determinants_of_health" value="1" 
                              style="accent-color: #264E5B; width: 18px; height: 18px;">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" 
                            viewBox="0 -960 960 960" fill="#264E5B">
                              <path d="M350-63q-46 0-82.5-24T211-153q-16 21-40.5 32.5T120-109q-51 0-85.5-35T0-229q0-43 28-77.5T99-346q-14-20-21.5-42.5T70-436q0-40 20.5-75t57.5-57q5 18 13.5 38.5T181-494q-14 11-22 26.5t-8 32.5q0 56 46 69t87 21l19 32q-11 32-19 54.5t-8 40.5q0 30 21.5 52.5T350-143q38 0 63-34t41-80q16-46 24.5-93t13.5-72l78 21q-9 45-22 103t-36.5 110.5Q488-135 449.5-99T350-63ZM120-189q17 0 28.5-11.5T160-229q0-17-11.5-28.5T120-269q-17 0-28.5 11.5T80-229q0 17 11.5 28.5T120-189Zm284-158q-46-41-83.5-76.5t-64.5-69q-27-33.5-41.5-67T200-629q0-65 44.5-109.5T354-783q4 0 7 .5t7 .5q-4-10-6-20t-2-21q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h14q60 0 102 38.5t50 95.5q-18-3-40.5-3t-41.5 2q-7-23-25.5-38T606-703q-35 0-54.5 20.5T498-623h-37q-35-41-54.5-60.5T354-703q-32 0-53 21t-21 53q0 23 13 47.5t36.5 52q23.5 27.5 57 58.5t74.5 67l-57 57Zm76-436q17 0 28.5-11.5T520-823q0-17-11.5-28.5T480-863q-17 0-28.5 11.5T440-823q0 17 11.5 28.5T480-783ZM609-63q-22 0-43.5-6T524-88q11-14 22-33t20-35q11 7 22 10t22 3q32 0 53.5-22.5T685-219q0-19-8-41t-19-54l19-32q42-8 87.5-21t45.5-69q0-40-29.5-58T716-512q-42 0-98 16t-131 41l-21-78q78-25 139-42t112-17q69 0 121 41t52 115q0 25-7.5 47.5T861-346q43 5 71 39.5t28 77.5q0 50-34.5 85T840-109q-26 0-50.5-11.5T749-153q-20 42-56.5 66T609-63Zm232-126q17 0 28-11.5t11-28.5q0-17-11.5-29T840-270q-17 0-28.5 11.5T800-230q0 17 12 29t29 12Zm-721-40Zm360-594Zm360 593Z"/>
                            </svg>
                            
                            <span style="font-size: 16px; font-weight: bold;">Social Determinants of Health</span>
                          </label>
                          <label class="col-md-4 border" for="medication-management-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="medication-management-toggle" name="medication_management" value="1" 
                              style="accent-color: #5f6368; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                              <path d="M420-260h120v-100h100v-120H540v-100H420v100H320v120h100v100ZM280-120q-33 0-56.5-23.5T200-200v-440q0-33 23.5-56.5T280-720h400q33 0 56.5 23.5T760-640v440q0 33-23.5 56.5T680-120H280Zm0-80h400v-440H280v440Zm-40-560v-80h480v80H240Zm40 120v440-440Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Medication Management</span>
                          </label>
                          <label class="col-md-4 border" for="investigation-management-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="investigation-management-toggle" name="investigation_management" value="1" 
                              style="accent-color: #2854C5; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2854C5">
                              <path d="M320-280v-80h87q-5 20-6.5 40t.5 40h-81Zm0 200q-83 0-141.5-58.5T120-280v-360q-33 0-56.5-23.5T40-720v-80q0-33 23.5-56.5T120-880h400q33 0 56.5 23.5T600-800v80q0 33-23.5 56.5T520-640v121q-24 15-44 35t-35 44H320v-80h120v-120H200v360q0 50 35 85t85 35q30 0 54.5-13t41.5-36q8 20 18 38t24 35q-27 26-62 41t-76 15ZM120-720h400v-80H120v80Zm540 520q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM864-40 756-148q-22 14-46 21t-50 7q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50t-21 46L920-96l-56 56ZM120-720v-80 80Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Investigation Management</span>
                          </label>
                          <label class="col-md-4 border" for="surgical-management-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="surgical-management-toggle" name="surgical_management" value="1" 
                              style="accent-color: #6B2346; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6B2346">
                              <path d="M760-520q-38 0-81-21.5T599-601q-37-38-58.5-81T519-762q0-17 5-31t15-24q26-26 105.5-45.5T794-879q25 2 41.5 6t24.5 12q7 7 11.5 21.5T878-803q5 69-14 152t-46 110q-10 10-25.5 15.5T760-520Zm35-200q2-18 3-38t2-42q-20-1-40.5.5T719-796q11 8 21.5 17t19.5 18q10 10 18.5 20t16.5 21Zm-35 120q1-20-15-49.5T703-704q-25-25-53.5-40.5T601-760q2 23 17 52t37 51q24 24 52.5 39.5T760-600Zm92 388L664-400H264L52-612l56-56 188 188h400l212 212-56 56ZM320-80v-160q0-33 23.5-56.5T400-320h160q33 0 56.5 23.5T640-240v160H320Zm80-80h160v-80H400v80Zm0 0v-80 80Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Surgical Management</span>
                          </label>
                          <label class="col-md-4 border" for="lifestyle-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="lifestyle-toggle" name="lifestyle_recommendations" value="1" 
                              style="accent-color: #48752C; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#48752C">
                              <path d="m216-160-56-56 384-384H440v80h-80v-160h233q16 0 31 6t26 17l120 119q27 27 66 42t84 16v80q-62 0-112.5-19T718-476l-40-42-88 88 90 90-262 151-40-69 172-99-68-68-266 265Zm-96-280v-80h200v80H120ZM40-560v-80h200v80H40Zm739-80q-33 0-57-23.5T698-720q0-33 24-56.5t57-23.5q33 0 57 23.5t24 56.5q0 33-24 56.5T779-640Zm-659-40v-80h200v80H120Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Lifestyle Recommendations</span>
                          </label>
                          <label class="col-md-4 border" for="monitoring-plan-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="monitoring-plan-toggle" name="monitoring_plan" value="1" 
                              style="accent-color: #321D71; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#321D71">
                              <path d="M280-80v-200H80v-400h200v-200h400v200h200v400H680v200H280ZM160-520h200q10 0 19 5t14 13l35 52 54-162q4-12 14.5-20t23.5-8q10 0 19 5t14 13l68 102h179v-80H600v-200H360v200H160v80Zm200 360h240v-200h200v-80H600q-10 0-19-5t-15-13l-34-52-54 162q-4 12-15 20t-24 8q-10 0-19-5t-14-13l-68-102H160v80h200v200Zm120-320Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Monitoring Plan</span>
                          </label>
                          <label class="col-md-4 border" for="progress-notes-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="progress-notes-toggle" name="progress_notes" value="1" 
                              style="accent-color: #2854C5; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2854C5">
                              <path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Progress Notes</span>
                          </label>
                          <label class="col-md-4 border" for="interdisciplinary-care-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="interdisciplinary-care-toggle" name="interdisciplinary_care_coordination" value="1" 
                              style="accent-color: #4B77D1; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4B77D1">
                              <path d="M320-320q33 0 56.5-23.5T400-400q0-33-23.5-56.5T320-480q-33 0-56.5 23.5T240-400q0 33 23.5 56.5T320-320Zm320 0q33 0 56.5-23.5T720-400q0-33-23.5-56.5T640-480q-33 0-56.5 23.5T560-400q0 33 23.5 56.5T640-320ZM480-560q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 480q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Interdisciplinary Care Coordination</span>
                          </label>
                          <label class="col-md-4 border" for="patient-engagement-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="patient-engagement-toggle" name="patient_engagement_education" value="1" 
                              style="accent-color: #EAC452; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EAC452">
                              <path d="m590-488 160-92-160-92-160 92 160 92Zm0 122 110-64v-84l-110 64-110-64v84l110 64ZM480-480Zm320 320H600q0-20-1.5-40t-4.5-40h206v-480H160v46q-20-3-40-4.5T80-680v-40q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160Zm-720 0v-120q50 0 85 35t35 85H80Zm200 0q0-83-58.5-141.5T80-360v-80q117 0 198.5 81.5T360-160h-80Zm160 0q0-75-28.5-140.5t-77-114q-48.5-48.5-114-77T80-520v-80q91 0 171 34.5T391-471q60 60 94.5 140T520-160h-80Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Patient Engagement & Education</span>
                          </label>
                          <label class="col-md-4 border" for="outcome-measures-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="outcome-measures-toggle" name="outcome_measures" value="1" 
                              style="accent-color: #9B5278; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9B5278">
                              <path d="M320-240h60v-200h100l40 80h200v-240H600l-40-80H320v440Zm237-180-40-80H380v-120h143l40 80h97v120H557ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Outcome Measures</span>
                          </label>
                          <label class="col-md-4 border" for="contingency-planning-toggle" 
                            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; border-radius: 5px;">
                            <input type="checkbox" id="contingency-planning-toggle" name="contingency_planning" value="1" 
                              style="accent-color: #BB271A; width: 18px; height: 18px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#BB271A">
                              <path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z"/>
                            </svg>
                            <span style="font-size: 16px; font-weight: bold;">Contingency Planning</span>
                          </label>
                        </div>
                        <div id="treatment_plan_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('treatment_plan_section_details')">+ Add Treatment Plan Details</button>
                      </div>
                      <div class="tab-pane fade" id="mar" role="tabpanel">
                        <div id="mar_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('mar_section_details')">+ Add MAR Details</button>
                      </div>
                      <div class="tab-pane fade" id="flowsheets" role="tabpanel">
                        <div id="flowsheets_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('flowsheets_section_details')">+ Add Flowsheet Details</button>
                      </div>
                      <div class="tab-pane fade" id="followups" role="tabpanel">
                        <div id="followups_section_details">

                        </div>

                        <button type="button" class="add-btn mb-2" onclick="addSectionDetailsForm('followups_section_details')">+ Add Followups Details</button>
                      </div>
                      

                  </div>


              <!-- detailspersection -->
          </div>
          <div class="step-content" id="step5">
              <div class="medical-container" id="step5container">
                <!-- Content will be generated here -->
              </div>
          </div>
          <div class="navigation">
            <button type="button" class="btn btn-secondary" onclick="previousStep()" id="prevBtn" >Previous</button>
            <button type="button" class="btn btn-info" onclick="nextStep()" id="nextBtn">Next Step</button>
            <button type="submit" class="btn btn-info" onclick="" id="submitBtn" style="display: none;">Submit</button>
          </div>
      </div>
  </div>

<!-- php: =$this->Form->end(); -->



<div class="modal fade" id="prescription_configuration" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 600px">
	<div class="modal-content">
		<div class="modal-header">
		<h4 class="modal-title" id="exampleModalLongTitle">Configure Prescription Details</h4>

		</div>
		<div class="modal-body">
		
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<div class="card card-box">

					<div class="card-body" id="bar-parent">
				

						<form class="form-body d-flex flex-column" action="#" method="POST" onsubmit="populatePrescriptionConfiguration()" id="prescription_configuration_form">
							
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Dosage Frequency
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
								<input type="hidden" name="" id="prescription_form_id"/>
									<SearchableSelectField class="form-control show-menu-arrow show-tick frequencySelect" name="drug_administration_frequency_id" data-required="1" data-live-search="true" data-size="5" title="Select Frequency" id="prescription_frequency" required>

									</SearchableSelectField>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Quantity
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" class="form-control input-height" name="quantity" required/>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Days
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_days" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Doses
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_doses" class="form-control input-height" required/>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Strength To Administer (eg. 500 MG)
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" step="0.1" name="dose" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Form (eg. 1 Tablet)
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" step="0.1" name="form" class="form-control input-height" required/>
								</div>
							</div>
							
							<div class="row mt-5">
								<div class="offset-md-3 col-md-8">
									<button type="submit" class="btn btn-info">Save</button>
									<button type="button" onclick="$('#prescription_configuration').modal('hide');" class="btn btn-default">Cancel</button>
								</div>
							</div>
						</form>

					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>
<div class="modal fade" id="infusion_configuration" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 600px">
	<div class="modal-content">
		<div class="modal-header">
		<h4 class="modal-title" id="exampleModalLongTitle">Configure Infusion Details</h4>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		</div>
		<div class="modal-body">
		
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<div class="card card-box">

					<div class="card-body" id="bar-parent">
				

						<form class="form-body d-flex flex-column" action="#" method="POST" id="infusion_configuration_form" onsubmit="populateInfusionConfiguration()">
							
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Dosage Frequency
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									<input type="hidden" name="" id="infusion_form_id"/>
									<SearchableSelectField class="form-control show-menu-arrow show-tick frequencySelect" name="drug_administration_frequency_id" data-required="1" data-live-search="true" data-size="5" title="Select Frequency" id="prescription_frequency" required>

									</SearchableSelectField>
								</div>
							</div>

							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Quantity
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="text" class="form-control input-height" name="quantity" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Days
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_days" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Number Of Doses
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="number_of_doses" class="form-control input-height" required/>
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Volume
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="volume" class="form-control input-height" required/> 
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Rate
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="rate" class="form-control input-height" required/> 
								</div>
							</div>
							<div class="form-group row mt-1">
								<label class="control-label col-md-3">Duration
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									
									<input type="number" step="0.1" name="duration" class="form-control input-height" required/> 
								</div>
							</div>
							
							<div class="row mt-5">
								<div class="offset-md-3 col-md-8">
									<button type="submit" class="btn btn-info">Save</button>
									<button type="button" onclick="$('#infusion_configuration').modal('hide');" class="btn btn-default">Cancel</button>
								</div>
							</div>
						</form>

					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>

<script>
  var doctors = '';
	function clearHealthFacilityFields(){
		$('#title').val('');
		$('#gender_specification').val('');
		$('#gender_specification').selectpicker('refresh');
		$('#age_specifications').val('');
		$('#age_specifications').selectpicker('refresh');

		for (let i = 0; i < $('.type-related-sections>select').length; i++) {
			const ele = $('.type-related-sections>select')[i].id;
			console.log("this is ele", ele)
			deleteAddedService(ele.split('_')[ele.split('_').length - 1])
		}
	}

	function generateTypeSelect(count_me) {
		return \`
			<div class="d-flex" style="flex-wrap: no-wrap" id="container_div_\${count_me}">
				<span id="span_\${count_me}" onclick="deleteAddedService('\${count_me}')" class="text-danger mr-1 delete-btn" style="margin-left: -10px; cursor:pointer ">❌</span>
				<SearchableSelectField required data-live-search="true" name="name_[]" title="Select Service Type" id="service_type_select_\${count_me}" onchange="selectedServiceType('service_type_select_\${count_me}', '\${count_me}')" class="form-control input-height selectpicker type-related-sections" data-size="3">
				<!-- php: foreach ($itemTypes as $key => $type): if (in_array($type->id, ['2', '3', '7', '8', '12', '9', '10'])): -->
						<option value="<!-- php: = $type->id -->"><!-- php: = $type->name --></option>
					<!-- php: endif; endforeach -->
				</SearchableSelectField>
			</div>
		\`
	}
	function generateDepartmentSelect(count_me) {
		return \`
			<div class="d-flex" style="flex-wrap: no-wrap" id="container_department_div_\${count_me}">
				<SearchableSelectField data-live-search="true" name="specialty[]" title="Select Specialty" id="specialty_select_\${count_me}" onchange="selectedSpecialtyType('specialty_select_\${count_me}', '\${count_me}')" class="form-control input-height selectpicker" data-size="3">
					<!-- php: foreach ($specialties as $key => $type): -->
						<option value="<!-- php: = $type->id -->"><!-- php: = $type->name --></option>
					<!-- php: endforeach -->
				</SearchableSelectField>
			</div>
		\`
	}
	function generateUserSelect(count_me) {
		return \`
			<div class="d-flex" style="flex-wrap: no-wrap" id="container_user_div_\${count_me}">
				<SearchableSelectField data-live-search="true" name="user[]" title="Select Specialty" id="user_select_\${count_me}"  class="form-control input-height selectpicker" data-size="3">
				</SearchableSelectField>
			</div>
		\`
	}
	function generateUserTeamSelect(count_me) {
		return \`
			<div class="d-flex" style="flex-wrap: no-wrap; margin-bottom: 3px" id="container_user_team_div_\${count_me}">
        <span id="emergency_span_\${count_me}" onclick="deleteAddedEmergencyTeam('\${count_me}')" class="text-danger mr-1 delete-btn" style="margin-left: -10px; cursor:pointer ">❌</span>
				<SearchableSelectField data-live-search="true" name="emergency_team[]" title="Select Team" id="user_team_select_\${count_me}"  class="form-control input-height selectpicker" data-size="3">
          \${doctors}
				</SearchableSelectField>
			</div>
		\`
	}
	var counteree = 0
	var teamCounteree = 0

	function addMoreServices() {
		$("#service_type_name").append(generateTypeSelect(counteree))
		$("#service_type_options").append(\`<div id="div_\${counteree}"></div>\`)
		// $("#service_type_quantity").append(\`<div id="quantity_div_\${counteree}"></div>\`)
		// $("#service_type_price").append(\`<div id="price_div_\${counteree}"></div>\`)
		// $("#service_type_duration").append(\`<div id="duration_div_\${counteree}"></div>\`)
		// $("#service_type_discount").append(\`<div id="discount_div_\${counteree}"></div>\`)
		// $("#service_type_department").append(generateDepartmentSelect(counteree))
		// $("#service_type_user_id").append(generateUserSelect(counteree))
		$(\`#service_type_select_\${counteree}\`).selectpicker("refresh");
		$(\`#specialty_select_\${counteree}\`).selectpicker("refresh");
		$(\`#user_select_\${counteree}\`).selectpicker("refresh");
		counteree++;
	}
	function addMoreTeam() {
		$("#emergency_team_name").append(generateUserTeamSelect(teamCounteree))
		$("#emergency_team_options").append(\`<div id="emergency_div_\${teamCounteree}" style="margin-bottom: 4px"><input type="text" class="form-control input-height" name="emergency_team_member_description" ></div>\`)
		$(\`#user_team_select_\${teamCounteree}\`).selectpicker("refresh");
		teamCounteree++;
	}

	function deleteAddedService(s_counter) {
		$("#container_div_"+s_counter).html('')
		$("#div_"+s_counter).html('')
		$("#quantity_div_"+s_counter).html('')
		$("#price_div_"+s_counter).html('')
		$("#duration_div_"+s_counter).html('')
		$("#discount_div_"+s_counter).html('')
		$("#container_department_div_"+s_counter).html('')
		$("#container_user_div_"+s_counter).html('')

		changeRelatedSections()
		changePriceRelatedSections()
	}
	function deleteAddedEmergencyTeam(s_counter) {
		$("#container_user_team_div_"+s_counter).html('')
		$("#emergency_div_"+s_counter).html('')
	}
	function getInfusionDrugs(position) {
        $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getDrugInfusions']) -->",
			success: function g(data, textStatus) {
				result = ''

                if (Array.isArray(data) && data && data.length > 0 ) {
                    data?.forEach(drug => {
                        result += \`
                            <option 
                                value="\${ drug?.id }" data-name="\${drug?.full_name}"
                                data-content="">\${drug?.full_name}
							</option>
                        \`
                    });
                }

				$('#infusion_drug_stock_select_' + position).html(result)
				$("#infusion_drug_stock_select_" + position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
    }
	function getPrescriptionDrugs(position) {

        $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getPrescriptionItems']) -->",
			success: function g(data, textStatus) {
				let result = ''
                if (Array.isArray(data) && data && data.length > 0 ) {
                    data?.forEach(drug => {
                        let insurancePrice = []
						
                        result += \`
                            <option 
                                value="\${ drug?.id }" data-name="\${drug?.full_name}"
                                data-content="">\${drug?.full_name}
							</option>
                        \`
						// console.log("it came here", option_result)

                    });

                    $('#medication_drug_stock_select_' + position).html(result)
                    $("#medication_drug_stock_select_" + position).selectpicker("refresh");
                }
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }
	function getDoctors() {

    $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewUsersSpecialty']) -->/",
			success: function g(data, textStatus) {
				let result = ''
        if (Array.isArray(data) && data && data.length > 0 ) {

          data?.forEach(user => {

            result += \`
                <option 
                    value="\${ user?.id }" 
                    data-content="">\${user?.first_name} \${user?.last_name}
                </option>
            \`

          });

          doctors = result
        }
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }
	function selectedSpecialtyType(id, position) {
		let selectedSpecialty = $('#' + id).val();
		if (selectedSpecialty == null || selectedSpecialty == '') {
			return
		}

    $.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewUsersSpecialty']) -->/" + selectedSpecialty,
			success: function g(data, textStatus) {
				let result = ''
        if (Array.isArray(data) && data && data.length > 0 ) {
          
          data?.forEach(user => {

            result += \`
                <option 
                    value="\${ user?.id }" 
                    data-content="">\${user?.first_name} \${user?.last_name}
                </option>
            \`

          });

          $('#user_select_' + position).html(result)
          $("#user_select_" + position).selectpicker("refresh");
        }
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
  }
  function populateLabTests(position) {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getLabTests']) -->",
			success: function g(data, textStatus) {
				let result = ''
				data.forEach(element => {
					result += \`
							<option value="\${element.id}" data-price="\${element.value_new}" data-name="\${element.name}"
                                data-content="\${element.name} <span class='badge badge-danger'>\${element.value_new}</span>"
                            >
								\${element.name}
							</option>
						\`
				});
				$('#lab_test_id_'+position).html(result)
				$("#lab_test_id_"+position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
    function getRadioScans(position) {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getRadioScans']) -->",
			success: function g(data, textStatus) {
				let result = ''
				data.forEach(element => {
					result += \`
							<option value="\${element.id}" data-price="\${element.value_new}" data-name="\${element.name}"
                data-content="\${element.name} <span class='badge badge-danger'>\${element.value_new}</span>"
              >
								\${element.name}
							</option>
						\`
				});
				$('#radio_scan_id_'+position).html(result)
				$("#radio_scan_id_"+position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
    function getConsultations(position) {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getConsultations']) -->",
			success: function g(data, textStatus) {
				let result = ''
				data.forEach(element => {
					result += \`
							<option value="\${element.id}" data-price="\${element.price}" data-name="\${element.name}"
                                data-content="\${element.name} <span class='badge badge-danger'>\${element.price}</span>"
                            >
								\${element.name} -> \${element.price} 
							</option>
						\`
				});
				$('#consultation_id_'+position).html(result)
				$("#consultation_id_"+position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
    function getOtherServices(position) {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getOtherServices']) -->",
			success: function g(data, textStatus) {
				let result = ''
				data.forEach(element => {
					result += \`
							<option value="\${element.id}" data-price="\${element.price}" data-name="\${element.name}"
                                data-content="\${element.name} <span class='badge badge-danger'>\${element.price}</span>"
                            >
								\${element.name} -> \${element.price}
							</option>
						\`
				});
				$('#other_service_id_'+position).html(result)
				$("#other_service_id_"+position).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

    function getProcedures(position) {
		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getAllProcedures']) -->\`,
			success: function g(data, textStatus) {
				let procedure_data = ''
				if(Array.isArray(data)) {
					data?.forEach(element => {
						procedure_data += (\`<option data-name="\${element.name}" data-price="\${element.price}" data-content="\${element.name} <span class='badge badge-danger'>\${element.price}</span>" value="\${element.id}" >\${element.name} -> \${element.price} </option>\`)
					});
				}
				$('#surgery_stock_select_'+position).html(procedure_data);
				$('#surgery_stock_select_'+position).selectpicker("refresh");

			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
    }

	function setModalValue(id, value) {
		$('#'+id).val(value)
	}

	function selectedServiceType(id, position) {
		$(\`#quantity_div_\${position}\`).html(\`<div style="height: 45px"><input type="number" required name="quantity[]" value='1' onchange="changePriceRelatedSections()" class="form-control quantity_related_sections px-1"  id="quantity_\${position}" /></div>\`)
		$(\`#price_div_\${position}\`).html(\`
			<div style="height: 45px">
				<input type="number" required onchange="changePriceRelatedSections(\${position})" name="unit_cost[]" class="form-control  px-1" id="price_\${position}" />
				<input type="hidden"  id="hidden_price_\${position}" />
			</div>
		\`)
		$(\`#duration_div_\${position}\`).html(\`
			<div style="height: 45px">
				<input type="number" required name="duration[]" class="form-control duration_related_sections px-1" id="duration_\${position}" />
			</div>
		\`)
		$(\`#discount_div_\${position}\`).html(\`<div style="height: 45px"><span id="discount_\${position}">0</span></div>\`)
		if ($('#'+id).val() == '9') {
			let drugs = ''

			$(\`#div_\${position}\`).html(
				\`
				<div class="d-flex align-items-center" style="flex-wrap: no-wrap">
					<SearchableSelectField class="col-md-12 form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" onchange="changeRelatedSections(\${position}, 'prescription_name_')" data-size="5" title="Drug / Form / Dosage" name="item_id[]" id="medication_drug_stock_select_\${position}" data-live-search="true" required>
					</SearchableSelectField>
					<input type="hidden" name="configuration[]" id="prescription_configuration_\${position}">
					<input type="hidden" name="item_name[]" id="prescription_name_\${position}">
					<a href="javascript:" data-toggle="modal" onclick="setModalValue('prescription_form_id','\${position}')" data-target="#prescription_configuration" class="ml-2">config</a>
				</div>
				\`
			)
			getPrescriptionDrugs(position)

		}	
		else if ($('#'+id).val() == '10') {
			let drugs = ''

			$(\`#div_\${position}\`).html(
				\`
				<div class="d-flex align-items-center" style="flex-wrap: no-wrap">
					<SearchableSelectField class="col-md-12 form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" onchange="changeRelatedSections(\${position}, 'infusion_name_')" data-size="5" title="Drug / Form / Dosage" name="item_id[]" id="infusion_drug_stock_select_\${position}" data-live-search="true" required>
					</SearchableSelectField>
					<input type="hidden" name="configuration[]" id="infusion_configuration_\${position}">
					<input type="hidden" name"item_name[]" id="infusion_name_\${position}">
					<a href="javascript:" data-toggle="modal" onclick="setModalValue('infusion_form_id','\${position}')" data-target="#infusion_configuration" class="ml-2">config</a>
				</div>
				\`
			)
			getInfusionDrugs(position)

		}
		else if ($('#'+id).val() == '2') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField multiple class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" onchange="changeRelatedSections(\${position}, 'lab_test_name_')" data-size="5" title="Lab Test" name="item_id[]" id="lab_test_id_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="lab_test_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				<input type="hidden" id="lab_test_name_\${position}" name="item_name[]" value=''>
				\`
			)
			populateLabTests(position)

		}
		else if ($('#'+id).val() == '7') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField multiple class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" onchange="changeRelatedSections(\${position}, 'radio_scan_name_')" data-size="5" title="Radiology Scan" name="item_id[]" id="radio_scan_id_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="radio_scan_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				<input type="hidden" id="radio_scan_name_\${position}" name="item_name[]" value=''>
				\`
			)
			getRadioScans(position)

		}
		else if ($('#'+id).val() == '8') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" onchange="changeRelatedSections(\${position}, 'consultation_name_')" data-size="5" title="Consultation" name="item_id[]" id="consultation_id_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="consultation_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				<input type="hidden" id="consultation_name_\${position}" name="item_name[]" value=''>
				\`
			)
			getConsultations(position)

		}
		else if ($('#'+id).val() == '12') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" onchange="changeRelatedSections(\${position}, 'other_service_name_')" data-size="5" title="Other Service" name="item_id[]" id="other_service_id_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="other_service_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				<input type="hidden" id="other_service_name_\${position}" name="item_name[]" value=''>
				\`
			)
			getOtherServices(position)

		}

		else if ($('#'+id).val() == '3') {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick drug-related-sections" onchange="changeRelatedSections(\${position}, 'surgery_name_')" data-size="5" title="Select Surgery" name="item_id[]" id="surgery_stock_select_\${position}" data-live-search="true" required>
				</SearchableSelectField>
				<input type="hidden" id="surgery_config_\${position}" name="configuration[]" value='\${JSON.stringify(config)}'>
				<input type="hidden" id="surgery_name_\${position}" name="item_name[]" value=''>
				\`
			)
			getProcedures(position)

		} else {
			let drugs = ''
			let config = {
				quantity: 1
			}
			$(\`#div_\${position}\`).html(
				\`
				<div class="form-control input-height " style="border:none">
				</div>
				\`
			)
		}
		
	}

	function setDrugAdminFrequencies(position) {
		$.ajax({
			type: "GET",
			url: \`<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getDrugAdminFrequencies']) -->\`,
			success: function g(data, textStatus) {
				let result = []
				data = data.sort((a,b) => {
					try {
						return parseInt(a.id)-parseInt(b.id)
					} catch (error) {
						return 0
					}
				})
				data.forEach(drugAdminFreq => {
					if(drugAdminFreq.id == -1) {
						result.push(\`<option value="\${drugAdminFreq.id}" data-dose-per-day="\${drugAdminFreq.dose_per_day}" data-content="<span class='badge badge-danger ml-2'>STAT</span>"></option>\`)
					} else {
						result.push(\`<option value="\${drugAdminFreq.id}" data-dose-per-day="\${drugAdminFreq.dose_per_day}">\${drugAdminFreq.name}</option>\`)
					}
				});

				$('.frequencySelect').append(result.join(""));
				$('.frequencySelect').selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
	}
	$(document).ready(function () {
		setDrugAdminFrequencies()
	})

	
    function serializeFormToJson(form_id) {
      var formData = {};
      var formElements = document.getElementById(form_id).elements;
  
      for (var i = 0; i < formElements.length; i++) {
          var field = formElements[i];
          if(field.type == 'radio') {
            if(field.checked) {
              formData[field.name] = field.value;
            }
          } else {
            if (field.name) {
                formData[field.name] = field.value;
            }
          }
      }
  
      return formData
    }

	function populateInfusionConfiguration() {
		let config = serializeFormToJson('infusion_configuration_form')
		let position = $('#infusion_form_id').val()
		$('#infusion_configuration_' + position).val(JSON.stringify(config))
		return false
	}
	function populatePrescriptionConfiguration() {
		let config = serializeFormToJson('prescription_configuration_form')
		let position = $('#prescription_form_id').val()
		$('#prescription_configuration_' + position).val(JSON.stringify(config))
		return false
	}

	var prescription_config_form = document.getElementById('prescription_configuration_form');
    prescription_config_form.addEventListener('submit', function(event) {
      event.preventDefault();
		$('#prescription_configuration').modal('toggle')
	  populatePrescriptionConfiguration()
	})

	var infusion_config_form = document.getElementById('infusion_configuration_form');
    infusion_config_form.addEventListener('submit', function(event) {
      event.preventDefault();
		$('#infusion_configuration').modal('toggle')
	  populatePrescriptionConfiguration()
	})

	function setEditModalValues(editForm_id,edit_title,edit_description,edit_price) {
		$('#editForm_id').val(editForm_id)
		$('#edit_title').val(edit_title)
		$('#edit_description').val(edit_description)
		$('#edit_price').val(edit_price)
	}

	function changeRelatedSections(position=null, name_id) {
		let total_price = 0

		for (let i = 0; i < $('.drug-related-sections>select').length; i++) {
			const ele = $('.drug-related-sections>select')[i].id;
			console.log("element id", ele)
			let price = $('#'+ele).find(':selected').attr('data-price')
			let selected_name = $('#'+ele).find(':selected').attr('data-name') || ''
			$('#' + name_id + ele.split('_')[ele.split('_').length - 1]).val(selected_name.trim())
			if (position || position == 0) {
				if (ele.split('_')[ele.split('_').length - 1] == position) {
					
					$(\`#price_\${position}\`).val(price).trigger('change')
					$(\`#hidden_price_\${position}\`).val(price)
					$(\`#discount_\${position}\`).html(0)
				}
			}
			total_price += parseFloat(price)
		}


	}
	function changePriceRelatedSections(position=null) {
		let total_discounted_price = 0

		for (let i = 0; i < $('.price_related_sections').length; i++) {
			const ele = $('.price_related_sections')[i].id;
			let price = $('#'+ele).val()
			let quantity = $('#quantity_'+ele.split('_')[ele.split('_').length - 1]).val() || 1
			if (position || position == 0) {
				let hidden_price = $(\`#hidden_price_\${position}\`).val()
				console.log("hidden price", hidden_price, "price", price)
				$(\`#discount_\${position}\`).html(parseFloat(hidden_price) - parseFloat(price))
			}
			total_discounted_price += parseFloat(price * quantity)
		}

	}


</script>

<script>
  const formSchema = {
    "sections": [
      {
        "id": "vitals",
        "title": "General Vitals",
        "fields": [
          { "id": "systolic_bp", "label": "Systolic BP", "type": "number" },
          { "id": "diastolic_bp", "label": "Diastolic BP", "type": "number" },
          { "id": "temperature", "label": "Temperature", "type": "number" },
          { "id": "pulse", "label": "Pulse (bpm)", "type": "number" },
          { "id": "respiratory_rate", "label": "Respiratory Rate (cpm)", "type": "number" },
          { "id": "oxygen_saturation", "label": "SpO2", "type": "number" },
          { "id": "fbs", "label": "FBS (mg/dL)", "type": "number" },
          { "id": "rbs", "label": "RBS (mg/dL)", "type": "number" },
        ]
      },
      {
        "id": "odqs",
        "title": "ODQS",
        "fields": [
          { "id": "pain_scale", "label": "Pain Scale", "type": "select", "options": ["0","1","2","3","4","5","6","7","8","9","10"] }
        ]
      },
      {
        "id": "diagnosis",
        "title": "Diagnosis (ICD-10)",
        "fields": [
          { "id": "icd10", "label": "ICD-10 Code", "type": "string" }
        ]
      }
    ]
  };

  function renderConditionBuilder(schema, containerId) {
    const $container = $("#" + containerId);
    $container.empty(); // instead of innerHTML = ""

    $.each(schema.sections, function(_, section) {
      const $sectionDiv = $("<div>").addClass("form-sectioned");
      $sectionDiv.append(\`<h3>\${section.title}</h3>\`);

      // Conditions container
      const $conditionContainer = $("<div>", { id: section.id + "-conditions" });
      $sectionDiv.append($conditionContainer);

      if (section.id === "odqs") {
        // ODQ section
        const $odqCategorySection = $("<div>", { id: "odq-div" });
        const $odqCategoryUl = $("<ul>").addClass("nav nav-tabs odq-categories");
        $odqCategorySection.append($odqCategoryUl);

        const $odqTabSection = $("<div>", {
          id: "odq-form",
          class: "tab-content odq-tab-content"
        });

        $sectionDiv.append($odqCategorySection, $odqTabSection);

      } else if (section.id === "diagnosis") {
        // Diagnosis section
        const $diagCategorySection = $("<div>", { id: "diag-div" });

        const $diagCategoryInput = $("<input>", {
          class: "form-control",
          id: "diagnosis-searcher",
          placeholder: "Search Diagnosis"
        });

        const $diagCategorySelect = $("<SearchableSelectField>", {
          class: "form-control selectpicker",
          id: "diagnosis-picker",
          multiple: "multiple",
          "data-live-search": "true"
        });

        $diagCategorySection.append($diagCategoryInput, $diagCategorySelect);
        $sectionDiv.append($diagCategorySection);

      } else {
        // Add condition button
        const $addBtn = $("<button>", {
          type: "button",
          class: "add-btn",
          text: \`+ Add \${section.title} Condition\`
        }).on("click", function() {
          // Pass raw DOM node to addCondition
          addCondition(section, $conditionContainer[0]);
        });

        $sectionDiv.append($addBtn);
      }

      $container.append($sectionDiv);
    });

    fetchOdqInfo();
  }




  function addCondition(section, container) {
    const $row = $("<div>").addClass("condition-row");

    // Field dropdown
    const $fieldSelect = $("<SearchableSelectField>");
    $.each(section.fields, function(_, field) {
      $("<option>")
        .val(field.id)
        .text(field.label)
        .appendTo($fieldSelect);
    });

    // Comparator dropdown
    let comparators = [">", "<", ">=", "<=", "="];
    if (section.id === "diagnosis") {
      comparators = ["=", "includes"];
    }

    const $comparatorSelect = $("<SearchableSelectField>");
    $.each(comparators, function(_, op) {
      $("<option>")
        .val(op)
        .text(op)
        .appendTo($comparatorSelect);
    });

    // Value input
    const $valueInput = $("<input>", {
      type: "text",
      placeholder: "Enter value"
    });

    // Delete button
    const $deleteBtn = $("<button>", {
      type: "button",
      class: "delete-btn",
      text: "❌"
    }).on("click", function() {
      $row.remove();
    });

    // Build row
    $row.append($deleteBtn, $fieldSelect, $comparatorSelect, $valueInput);

    // Append to container (convert DOM → jQuery)
    $(container).append($row);
  }
  function addMoreVitalsPerAge(container, selectedPick=null, selectedComp=null, selectedValue=null) {
    const $row = $("<div>").addClass("condition-row");

    // Field dropdown
    const $fieldSelect = $("<SearchableSelectField>");
    const fields = [
          { "id": "systolic_bp", "label": "Systolic BP", "type": "number" },
          { "id": "diastolic_bp", "label": "Diastolic BP", "type": "number" },
          { "id": "temperature", "label": "Temperature", "type": "number" },
          { "id": "pulse", "label": "Pulse (bpm)", "type": "number" },
          { "id": "respiratory_rate", "label": "Respiratory Rate (cpm)", "type": "number" },
          { "id": "oxygen_saturation", "label": "SpO2", "type": "number" },
          { "id": "heart_rate", "label": "Heart Rate", "type": "number" },
          { "id": "avpu", "label": "AVPU", "type": "text" },
          { "id": "fbs", "label": "FBS (mg/dL)", "type": "number" },
          { "id": "rbs", "label": "RBS (mg/dL)", "type": "number" },
        ]
    $.each(fields, function(_, field) {
      $("<option>")
        .val(field.id)
        .text(field.label)
        .prop('selected', field.id === selectedPick)
        .appendTo($fieldSelect);
    });

    // Comparator dropdown
    let comparators = [">", "<", ">=", "<=", "="];


    const $comparatorSelect = $("<SearchableSelectField>");
    $.each(comparators, function(_, op) {
      $("<option>")
        .val(op)
        .text(op)
        .prop('selected', op === selectedComp)
        .appendTo($comparatorSelect);
    });

    // Value input
    const $valueInput = $("<input>", {
      type: "text",
      placeholder: "Enter value",
      value: selectedValue,
    });

    // Delete button
    const $deleteBtn = $("<button>", {
      type: "button",
      class: "delete-btn",
      text: "❌"
    }).on("click", function() {
      $row.remove();
    });

    // Build row
    $row.append($deleteBtn, $fieldSelect, $comparatorSelect, $valueInput);

    // Append to container (convert DOM → jQuery)
    $('#'+container).append($row);
  }

        // Age groups for reference
        const ageGroups = {
            "youngerThan3": "Younger than 3 years",
            "3to12": "3 to 12 years old",
            "olderThan12": "Older than 12 years"
        };

        // Escalation conditions based on age groups with the new format
        const escalationConditions = {
            blue: {
                label: "🔵 Blue",
                level: "Dead",
                condition: "Patient unresponsive, no vital signs (cardiac arrest confirmed).",
                tews: {
                    "youngerThan3": [
                        ['heart_rate', '=', '0'],
                        ['respiratory_rate', '=', '0'],
                        ['avpu', '=', 'Unresponsive'],
                        ['systolic_bp', '=', '0']
                    ],
                    "3to12": [
                        ['heart_rate', '=', '0'],
                        ['respiratory_rate', '=', '0'],
                        ['avpu', '=', 'Unresponsive'],
                        ['systolic_bp', '=', '0']
                    ],
                    "olderThan12": [
                        ['heart_rate', '=', '0'],
                        ['respiratory_rate', '=', '0'],
                        ['avpu', '=', 'Unresponsive'],
                        ['systolic_bp', '=', '0']
                    ]
                },
                response: "Immediate death certification or resuscitation attempt per protocol.",
                responseTime: 0,
                escalation: "Automatically trigger Emergency Pathway → Cardiac Arrest (Adult/Pediatric)."
            },
            red: {
                label: "🔴 Red",
                level: "Emergency (Care within 0 min)",
                condition: "Immediate life-threatening derangement.",
                tews: {
                    "youngerThan3": [
                        ['respiratory_rate', '>=', '50'],
                        ['heart_rate', '>=', '160'],
                        ['avpu', '=', 'Unresponsive to pain'],
                        ['trauma', '=', 'true']
                    ],
                    "3to12": [
                        ['respiratory_rate', '>=', '27'],
                        ['heart_rate', '>=', '130'],
                        ['avpu', '=', 'Pain/Unresponsive'],
                        ['trauma', '=', 'true']
                    ],
                    "olderThan12": [
                        ['respiratory_rate', '>', '29'],
                        ['respiratory_rate', '<', '9'],
                        ['heart_rate', '>', '129'],
                        ['heart_rate', '<', '41'],
                        ['systolic_bp', '<', '71'],
                        ['avpu', '=', 'Unresponsive']
                    ]
                },
                response: "Activate emergency team immediately, stabilize in 0 minutes.",
                responseTime: 0,
                escalation: "Direct trigger → Immediate Stabilization Protocol."
            },
            orange: {
                label: "🟠 Orange",
                level: "Urgent (Care within 10 min)",
                condition: "Severe derangements but not immediate cardiac arrest risk.",
                tews: {
                    "youngerThan3": [
                        ['heart_rate', '>=', '131'],
                        ['heart_rate', '<=', '159'],
                        ['respiratory_rate', '>=', '40'],
                        ['respiratory_rate', '<=', '49'],
                        ['avpu', '=', 'Responds only to voice']
                    ],
                    "3to12": [
                        ['heart_rate', '>=', '100'],
                        ['heart_rate', '<=', '129'],
                        ['respiratory_rate', '>=', '22'],
                        ['respiratory_rate', '<=', '26'],
                        ['avpu', '=', 'Responds only to voice']
                    ],
                    "olderThan12": [
                        ['heart_rate', '>=', '111'],
                        ['heart_rate', '<=', '129'],
                        ['respiratory_rate', '>=', '21'],
                        ['respiratory_rate', '<=', '29'],
                        ['systolic_bp', '>=', '71'],
                        ['systolic_bp', '<=', '80'],
                        ['avpu', '=', 'Confused']
                    ]
                },
                response: "Rapid evaluation, assigned to trauma/resus bay within 10 minutes.",
                responseTime: 10,
                escalation: "Alert team, prepare emergency equipment, but lower SLA than red."
            },
            yellow: {
                label: "🟡 Yellow",
                level: "Less Urgent (Care within 1 hour)",
                condition: "Moderate abnormal vital signs, potential risk.",
                tews: {
                    "youngerThan3": [
                        ['heart_rate', '>=', '80'],
                        ['heart_rate', '<=', '130'],
                        ['respiratory_rate', '>=', '26'],
                        ['respiratory_rate', '<=', '39']
                    ],
                    "3to12": [
                        ['heart_rate', '>=', '80'],
                        ['heart_rate', '<=', '99'],
                        ['respiratory_rate', '>=', '17'],
                        ['respiratory_rate', '<=', '21']
                    ],
                    "olderThan12": [
                        ['heart_rate', '>=', '101'],
                        ['heart_rate', '<=', '110'],
                        ['respiratory_rate', '>=', '15'],
                        ['respiratory_rate', '<=', '20'],
                        ['systolic_bp', '>=', '81'],
                        ['systolic_bp', '<=', '100']
                    ]
                },
                response: "Monitor and evaluate in ≤1 hour.",
                responseTime: 60,
                escalation: "Assign to observation, trigger alert if vitals worsen."
            }
        };

        function selectTriageCategory(color) {
            // Update UI to show selected category
            $('.triage-option').removeClass('selected');
            $(\`.triage-option[data-category="\${color}"]\`).addClass('selected');
            
            // Get the selected age group

            
            // Get the escalation condition data
            const result = escalationConditions[color];
            
            // Update response time
            $('#urgency_response_time').val(result.responseTime + ' minutes');
            
            // Populate conditions
            populateEmergencyConditions(result, 'vitals-conditions');
        }

        function populateEmergencyConditions(levelData) {
            
            const $levelDiv = $("<div>").addClass("emergency-level");
            $levelDiv.append(\`<h3>\${levelData.label} - \${levelData.level}</h3>\`);
            $levelDiv.append(\`<p><strong>Condition:</strong> \${levelData.condition}</p>\`);
            
            // Get the TEWS data for the selected age group
            // const tewsData = levelData.tews[ageGroup];
            
            // Create condition items for each vital sign condition
            console.log("levelData.tews",levelData.tews)
            Object.keys(levelData.tews).forEach(ageGroup => {
              $('#'+ageGroup).html('')
              const tewsData = levelData.tews[ageGroup]
              tewsData.forEach(condition => {
                  const [field, comparator, value] = condition;
                  
                  addMoreVitalsPerAge(ageGroup, field, comparator, value)
              });
            });
        }
    

  renderConditionBuilder(formSchema, "condition-builder");



  function fetchOdqInfo() {
    $.ajax({
      type: 'GET',
      url: "<!-- php: echo $this->Url->build([ 'controller' => 'PatientVisits', 'action' => 'getOdqsWithCategories' ]); -->",
      cache: false,
      success: function (response) {
        const res = JSON.parse(response);
        const odq_severities = res.odq_severities;
        const odq_durations = res.odq_durations;

        // clear old categories and content
        $(".odq-categories").empty();
        $(".odq-tab-content").empty();

        res.odq_categories.forEach(category => {
          const tabId = \`#\${category.id}tab\`;
          const tabContentId = \`\${category.id}tab\`;
          const odqCategoryClass = \`nav-item\${category.id}\`;
          const odqCardBodyClass = \`odq-card-body\${category.id}\`;

          // append nav item if it doesn't exist
          if (!$(\`.odq-categories .\${odqCategoryClass}\`).length) {
            const $navItem = $(\`
              <li class="nav-item \${odqCategoryClass}">
                <a href="\${tabId}" class="nav-link" data-toggle="tab">\${category.name}</a>
              </li>
            \`);
            $(".odq-categories").append($navItem);
          }

          // append tab content
          const $tabContent = $(\`
            <div class="tab-pane" id="\${tabContentId}">
              <div class="card-body \${odqCardBodyClass} d-flex flex-column"></div>
            </div>
          \`);
          $(".odq-tab-content").append($tabContent);

          // sort odqs
          const odqs = category.odqs.sort((a, b) => parseInt(a.id) - parseInt(b.id));
          const $cardBody = $(\`.\${odqCardBodyClass}\`).empty();

          odqs.forEach(odq => {
            // special bold labels
            if (category.id == '10' && odq.id == '84') {
              $cardBody.append(\`<div style="font-weight: bold">Joint Noises (Crepitus)</div>\`);
            } else if (category.id == '10' && odq.id == '88') {
              $cardBody.append(\`<div style="font-weight: bold">Joint Stiffness</div>\`);
            } else if (category.id == '10' && odq.id == '96') {
              $cardBody.append(\`<div style="font-weight: bold">Difficulty Moving (does patient have difficulty moving all or part of the body?)</div>\`);
            } else if (category.id == '11' && odq.id == '109') {
              $cardBody.append(\`<div style="font-weight: bold">Single Joint (monoarticular joint pain)</div>\`);
            } else if (category.id == '11' && odq.id == '124') {
              $cardBody.append(\`<div style="font-weight: bold">Many Joints (polyarticular joint pain)</div>\`);
            }

            if (category.id == odq.odq_category_id) {
              const commentSpanId = \`span\${odq.id}\`;
              const rawCommentSpanId = \`span\${odq.id}\`;

              const $field = $(\`
                <div class="form-check form-check-inline" style="margin:0">
                  <input 
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault\${odq.id}"
                    value="\${odq.id}"
                    name="odq_value_\${odq.id}"
                  >
                  <label class="form-check-label" for="flexSwitchCheckDefault\${odq.id}">
                    \${odq.name}
                  </label>
                  <span class="ml-3" id="\${rawCommentSpanId}"></span>
                </div>
              \`);

              // attach onchange handler with jQuery
              $field.find("input").on("change", function() {
                commentsFieldDisplay(
                  this,
                  commentSpanId,
                  odq_severities,
                  odq_durations,
                  odq.id
                );
              });

              $cardBody.append($field);
            }
          });
        });

        // Activate first category tab
        $(".odq-categories .nav-item:first a").tab("show");
      }
    });
  }
  function commentsFieldDisplay(obj, span_id, odq_severities, odq_durations, id) {
    if ($(obj).is(":checked")) {
        let html = \`
            <div class="p-3 mt-2 shadow-sm rounded-lg" style="background:#f9f9f9; border:1px solid #ddd;">                       
                <div class="mb-2">
                    <strong class="text-danger">Severity:</strong>
                </div>
                <div class="d-flex flex-wrap gap-2 mb-3">\`;

        for (let s of odq_severities) {
            html += \`
                <label class="btn btn-sm text-slate-900" style="background-color:\${s.color_code}; border-radius:20px;">
                    <input type="radio" 
                           class="btn-check" 
                           name="odq_severity_\${id}" 
                           value="\${s.id}">
                    \${s.severity}
                </label>\`;
        }

        html += \`</div>
                <div class="mb-2">
                    <strong class="text-danger">Duration:</strong>
                </div>
                <div class="d-flex flex-wrap gap-3">\`;

        for (let d of odq_durations) {
            html += \`
                <label class="btn btn-outline-dark btn-sm" style="border-radius:20px;">
                    <input type="radio" 
                           class="btn-check" 
                           name="odq_duration_\${id}" 
                           value="\${d.id}">
                    \${d.duration}
                </label>\`;
        }

        html += \`</div></div>\`;
        $("#" + span_id).html(html);
    } else {
        $("#" + span_id).html(" ");
    }
  }


(function() {
  let reopenTimer;

  const $input = $('#diagnosis-searcher');

  $input.autocomplete({
    minLength: 3,
    delay: 0,
    source: function(request, response) {
      $.ajax({
        url: '<!-- php: = $this->Url->build(["controller" => "PatientVisitDiagnoses", "action" => "getDiagnosesFromLocalStore"]) -->/' + encodeURIComponent(request.term),
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          // adjust if your API isn't nested at [0]
          const list = (Array.isArray(data[0]) ? data[0] : data) || [];
          response(list.map(ele => ({
            label: \`\${ele.name} (\${ele.code})\`,
            value: ele.id,
            data: ele
          })));
        }
      });
    },
    select: function(event, ui) {
      event.preventDefault();

      const term = $input.val();       // keep what the user typed
      const leData = ui.item.data;

      // prevent duplicates
      if ($(\`#diagnosis-picker option[value="\${leData.id}"]\`).length === 0) {
        const optionHtml = \`
          <option value="\${leData.id}" selected
                  data-content='\${leData.name} <span class="badge badge-danger">\${leData.code}</span>'>
            \${leData.name}
          </option>
        \`;
        $('#diagnosis-picker').append(optionHtml);
      }

      // refresh selectpicker on the next tick so it doesn't steal focus right now
      setTimeout(() => {
        $("#diagnosis-picker").selectpicker("refresh");
      }, 0);

      // re-open AFTER jQuery UI finishes closing the menu
      clearTimeout(reopenTimer);
      reopenTimer = setTimeout(() => {
        $input.focus();
        $input.autocomplete('search', term);  // use same term (meets minLength)
      }, 100); // small delay ensures the default close has completed
    }
  });

  // If the user clicks back into the field, show suggestions again for the current term
  $input.on('focus', function() {
    const v = this.value || '';
    if (v.length >= 3 && !$input.autocomplete('widget').is(':visible')) {
      $input.autocomplete('search', v);
    }
  });
})();



</script>

<script>
  var currentStep = 1
  function progressUpdate() {

    for (let index = 0; index < currentStep; index++) {
      $('.step')[index].classList.remove('pending')
      $('.step')[index].classList.add('completed')
      
    }
    
    for (let index = currentStep; index < 5; index++) {
      
      $('.step')[index].classList.add('pending')
      
    }
    $('.step')[currentStep - 1].classList.add('active')
    $('.step')[currentStep - 1].classList.remove('completed')
    $('.step')[currentStep - 1].classList.remove('pending')

    const progressLine = document.getElementById('progressLine');
    const progressPercent = ((currentStep - 1) / (5 - 1)) * 100;
    progressLine.style.width = progressPercent + '%';
  }
	function nextStep() {
    
		if (currentStep < 5) {
			// Hide current step
			document.querySelector(\`#step\${currentStep}\`).classList.remove('active');
			
			currentStep++;
			
			// Show next step
			document.querySelector(\`#step\${currentStep}\`).classList.add('active');
			
			// Update navigation
			document.getElementById('prevBtn').style.display = 'block';
			

      if (currentStep === 5) {
          document.getElementById('nextBtn').style.display = 'none';
          document.getElementById('submitBtn').style.display = 'block';
          submitForm()
      } else if(currentStep === 3) {
          selectedDiag = getSelectedDiagnosis()
          createEmergencyDiagnosis(selectedDiag)
      } else {
          document.getElementById('nextBtn').style.display = 'block';
          document.getElementById('submitBtn').style.display = 'none';
      }
		}
    progressUpdate()

	}
  function getSelectedDiagnosis() {
    let selectedOptions = [];

    $('#diagnosis-picker option:selected').each(function() {
        let value = $(this).val();
        let content = $(this).data('content'); // data-content attribute
        selectedOptions.push({ value: value, content: content });
    });

    return selectedOptions;
  }
  var allBundledServices = [];
  function populateBundledServices() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getBundledServices']) -->",
			success: function g(data, textStatus) {
				result = ''
                if(Array.isArray(data) && data.length > 0) {
                  allBundledServices = data
                    // data.forEach(element => {
                    //     result += \`
                    //             <option value="\${element.id}" data-bundled-items='\${JSON.stringify(element.bundled_service_items)}' data-content="\${element.name}"> \${element.name}
                    //             </option>
                    //         \`
                    // });
                    // $('#bundled_services_id').html(result)
                    // $("#bundled_services_id").selectpicker("refresh");
                }
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
  function createEmergencyDiagnosis(selectedDiagnoses) {

    const bundledOptions = [
        { value: "b1", content: "Bundle 1 <span class='badge bg-info'>B1</span>" },
        { value: "b2", content: "Bundle 2 <span class='badge bg-success'>B2</span>" }
    ];

    const $container = $('#diagnosis-container');
    $container.empty();

    selectedDiagnoses.forEach((diag, index) => {
        // Create a wrapper div per diagnosis
        const $wrapper = $('<div class="mb-3"></div>');

        // Show diagnosis name
        const $diagName = $('<div class="fw-bold mb-1"></div>').html(diag.content);
        $wrapper.append($diagName);

        // Create selectpicker for bundled services
        const $select = $(\`
            <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="bundled_service_id" id="bundled_services_id" title="Select Bundled Service" data-live-search="true" onchange="bundledServiceChange(this, event)" data-max-options="1" multiple required>
            </SearchableSelectField>
        \`);

        // Add bundled options
        allBundledServices.forEach(opt => {
            const $option = $('<option></option>')
                .val(opt.id)
                .attr('data-content', opt.name);
                // .attr('data-content', opt.name);
            $select.append($option);
        });

        $wrapper.append($select);
        $container.append($wrapper);

        // Refresh selectpicker to apply Bootstrap styling
        $select.selectpicker('refresh');
    });
  }
  function bundledServiceChange(ele) {
      let bundled_items = $("#bundled_services_id option:selected").attr('data-bundled-items')

      let bundled_json = JSON.parse(bundled_items)
      let result = bundled_json.map(ele => {
          return showBundledServiceInfo(
              itemResult(ele), ele.invoice_item_type.name, '#61affe'
          )
      });
      

      $('#process_bundled_items').html(
          result
      )
  }
	function submitBooking() {
		$('#sessionsSection').submit()
	}
	function previousStep() {
    const progressLine = document.getElementById('progressLine');
    const progressPercent = ((currentStep - 1) / (5 - 1)) * 100;
    progressLine.style.width = progressPercent + '%';
		if (currentStep > 1) {
			// Hide current step
			document.querySelector(\`#step\${currentStep}\`).classList.remove('active');
			currentStep--;
			
			// Show previous step
			document.querySelector(\`#step\${currentStep}\`).classList.add('active');

			// Update navigation
			if (currentStep === 1) {
				document.getElementById('prevBtn').style.display = 'none';
			}
			
			document.getElementById('nextBtn').textContent = 'Next Step';
			document.getElementById('nextBtn').onclick = nextStep;
      if (currentStep === 5) {
          document.getElementById('nextBtn').style.display = 'none';
          document.getElementById('submitBtn').style.display = 'block';
          submitForm()
      } else {
          document.getElementById('nextBtn').style.display = 'block';
          document.getElementById('submitBtn').style.display = 'none';
      }
		}
    progressUpdate()
	}
  function addSectionDetailsForm(id) {
    $('#'+id).append(\`
      <div class="card card-body" id="\${id}\${$('#'+id+'.card.card-body').length}">
        <div class="form-group row">
          <div class="col-md-2">
            <label for="">Section Title</label>
          </div>
          <div class="col-md-10">
            <input type="text" name="section_name" data-required="1" placeholder="Enter Section Title" class="form-control input-height" required /> 
          </div>
        </div>
        <div class="form-group row" >
          <div class="col-md-2">
            <label for="">Section Details</label>
            <button type="button" class="delete-btn" onclick="$('#\${id}\${$('#'+id+'.card.card-body').length}').remove()">Delete</button>
          </div>
          <div class="col-md-10">
            <textarea class="form-control mt-2" name="section_notes" id="\${id}_\${$('#'+id+'.card.card-body').length}_notes" rows="3" placeholder="Enter Section Details"></textarea>
          </div>
        </div>
      </div>
    \`)
  }
</script>

<script>
  function submitForm() {
      const formData = {
          step1: collectStep1Data(),
          step2: collectStep2Data(),
          step3: collectStep3Data(),
          step4: collectStep4Data()
      };
      
      console.log('Form Data:', formData);
      render(formData)
      return formData;

  }

  function collectStep1Data() {
      return {
          title: document.getElementById('title').value,
          specialties: Array.from(document.getElementById('specialty_select').selectedOptions).map(opt => ({
              id: opt.value,
              name: opt.text
          })),
          genders: Array.from(document.getElementById('gender_specification').selectedOptions).map(opt => ({
              id: opt.value,
              name: opt.text
          })),
          ageSpecifications: Array.from(document.getElementById('age_specifications').selectedOptions).map(opt => ({
              id: opt.value,
              age: opt.text
          }))
      };
  }

  function collectStep2Data() {
      const conditions = {};
      
      // Collect vitals conditions
      const vitalsConditions = document.querySelectorAll('#vitals-conditions .condition-row');
      conditions.vitals = Array.from(vitalsConditions).map(row => {
          const selects = row.querySelectorAll('select');
          const input = row.querySelector('input[type="text"]');
          return {
              field: selects[0].value,
              comparator: selects[1].value,
              value: input.value
          };
      });
      
      // Collect ODQS data
      conditions.odqs = collectOdqsData();
      
      // Collect diagnosis data
      conditions.diagnosis = Array.from(document.getElementById('diagnosis-picker').selectedOptions).map(opt => ({
          id: opt.value,
          name: opt.text,
          code: opt.getAttribute('data-content').match(/\((.*?)\)/)?.[1] || ''
      }));
      
      return conditions;
  }

  function collectOdqsData() {
      const odqs = [];
      const odqCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="flexSwitchCheckDefault"]');
      
      odqCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
              const id = checkbox.value;
              const severity = document.querySelector(\`input[name="odq_severity_\${id}"]:checked\`)?.value;
              const duration = document.querySelector(\`input[name="odq_duration_\${id}"]:checked\`)?.value;
              
              odqs.push({
                  id: id,
                  name: checkbox.nextElementSibling.textContent.trim(),
                  severity: severity,
                  duration: duration
              });
          }
      });
      
      return odqs;
  }

  function collectStep3Data() {
      const services = [];
      
      // Get all service containers
      const serviceContainers = document.querySelectorAll('#service_type_name > div');
      
      serviceContainers.forEach((container, index) => {
          const serviceTypeSelect = container.querySelector('select');
          if (!serviceTypeSelect) return;
          
          const serviceTypeId = serviceTypeSelect.value;
          const serviceTypeName = serviceTypeSelect.selectedOptions[0]?.text;
          
          // Get the corresponding options div
          const optionsDiv = document.getElementById(\`div_\${index}\`);
          if (!optionsDiv) return;
          
          let serviceData = {
              type: {
                  id: serviceTypeId,
                  name: serviceTypeName
              },
              quantity: document.getElementById(\`quantity_\${index}\`)?.value || '1',
              unitCost: document.getElementById(\`price_\${index}\`)?.value || '0',
              duration: document.getElementById(\`duration_\${index}\`)?.value || '0',
              discount: document.getElementById(\`discount_\${index}\`)?.textContent || '0'
          };
          
          // Add service-specific data based on type
          switch(serviceTypeId) {
              case '9': // Prescription
                  const medSelect = document.getElementById(\`medication_drug_stock_select_\${index}\`);
                  serviceData.item = {
                      id: medSelect?.value,
                      name: $(\`#medication_drug_stock_select_\${index}\`).find(':selected').attr('data-name'),
                      configuration: JSON.parse(document.getElementById(\`prescription_configuration_\${index}\`)?.value || '{}')
                  };
                  break;
                  
              case '10': // Infusion
                  const infusionSelect = document.getElementById(\`infusion_drug_stock_select_\${index}\`);
                  serviceData.item = {
                      id: infusionSelect?.value,
                      name: $(\`#infusion_drug_stock_select_\${index}\`).find(':selected').attr('data-name'),
                      configuration: JSON.parse(document.getElementById(\`infusion_configuration_\${index}\`)?.value || '{}')
                  };
                  break;
                  
              case '2': // Lab Test
                  const labSelect = document.getElementById(\`lab_test_id_\${index}\`);
                  serviceData.items = Array.from(labSelect.selectedOptions).map(opt => ({
                      id: opt.value,
                      name: opt.text,
                      price: opt.getAttribute('data-price')
                  }));
                  serviceData.configuration = JSON.parse(document.getElementById(\`lab_test_config_\${index}\`)?.value || '{}');
                  break;
                  
              // Add cases for other service types (7, 8, 12, 3) similarly
              default:
                  // Handle other service types
                  const itemSelect = optionsDiv.querySelector('select');
                  if (itemSelect) {
                      serviceData.items = Array.from(itemSelect.selectedOptions).map(opt => ({
                          id: opt.value,
                          name: opt.text,
                          price: opt.getAttribute('data-price')
                      }));
                      
                      const configElement = document.getElementById(\`\${itemSelect.id.split('_')[0]}_config_\${index}\`);
                      if (configElement) {
                          serviceData.configuration = JSON.parse(configElement.value || '{}');
                      }
                  }
          }
          
          services.push(serviceData);
      });
      
      return services;
  }

function collectStep4Data() {
    const sections = {};
    const tabIds = ['triage', 'clinical_notes', 'ros_exam', 'diagnoses', 'treatment_plan', 'mar', 'flowsheets', 'followups'];
    
    tabIds.forEach(tabId => {
        const sectionDiv = document.getElementById(\`\${tabId}_section_details\`);
        if (!sectionDiv) return;
        
        const sectionCards = sectionDiv.querySelectorAll('.card.card-body');
        sections[tabId] = {
            details: Array.from(sectionCards).map(card => {
                const titleInput = card.querySelector('input[name="section_name"]');
                const notesTextarea = card.querySelector('textarea[name="section_notes"]');
                
                return {
                    title: titleInput?.value || '',
                    notes: notesTextarea?.value || ''
                };
            })
        };

        // Special handling for clinical_notes tab with checkboxes
        if (tabId === 'clinical_notes') {
            sections[tabId].checkboxes = {
                ccHeading: document.getElementById('ccHeading')?.checked || false,
                odqHeading: document.getElementById('odqHeading')?.checked || false,
                pmhHeading: document.getElementById('pmhHeading')?.checked || false,
                allergyHeading: document.getElementById('allergyHeading')?.checked || false,
                fhHeading: document.getElementById('fhHeading')?.checked || false,
                pshHeading: document.getElementById('pshHeading')?.checked || false,
                chHeading: document.getElementById('chHeading')?.checked || false,
                phHeading: document.getElementById('phHeading')?.checked || false,
                ghHeading: document.getElementById('ghHeading')?.checked || false,
                ohHeading: document.getElementById('ohHeading')?.checked || false
            };
        }
        
        // Special handling for treatment_plan tab with checkboxes
        if (tabId === 'treatment_plan') {
            sections[tabId].checkboxes = {
                clinicalDecisionSupport: document.getElementById('cds-toggle')?.checked || false,
                socialDeterminantsOfHealth: document.getElementById('sdoh-toggle')?.checked || false,
                medicalManagement: document.getElementById('medication-management-toggle')?.checked || false,
                investigationManagement: document.getElementById('investigation-management-toggle')?.checked || false,
                surgicalManagement: document.getElementById('surgical-management-toggle')?.checked || false,
                lifestyleRecommendations: document.getElementById('lifestyle-toggle')?.checked || false,
                monitoringPlan: document.getElementById('monitoring-plan-toggle')?.checked || false,
                progressNotes: document.getElementById('progress-notes-toggle')?.checked || false,
                interdisciplinaryCareCoordination: document.getElementById('interdisciplinary-care-toggle')?.checked || false,
                patientEngagementEducation: document.getElementById('patient-engagement-toggle')?.checked || false,
                outcomeMeasures: document.getElementById('outcome-measures-toggle')?.checked || false,
                contingencyPlanning: document.getElementById('contingency-planning-toggle')?.checked || false
            };
        }
    });
    
    return sections;
}
  function render(data) {
      const container = document.getElementById('step5container');
      let html = '';

      // Step 1
      html += \`
          <div class="section">
              <h3>Step 1: \${data.step1.title}</h3>
              <p><strong>Specialties:</strong> \${data.step1.specialties.map(s => \`<span class="tag">\${s.name}</span>\`).join('')}</p>
              <p><strong>Genders:</strong> \${data.step1.genders.map(g => \`<span class="tag">\${g.name}</span>\`).join('')}</p>
              <p><strong>Ages:</strong> \${data.step1.ageSpecifications.map(a => \`<span class="tag">\${a.age}</span>\`).join('')}</p>
          </div>
      \`;

      // Step 2
      html += \`
          <div class="section">
              <h3>Step 2: Assessment</h3>
              <p><strong>Vitals:</strong> \${data.step2.vitals.length > 0 ? data.step2.vitals.join(', ') : '<span class="empty">None recorded</span>'}</p>
              <p><strong>Complaints:</strong></p>
              \${data.step2.odqs.map(odq => \`
                  <div class="item">
                      \${odq.name} - Severity: \${odq.severity}, Duration: \${odq.duration}
                  </div>
              \`).join('')}
              <p><strong>Diagnoses:</strong> \${data.step2.diagnosis.map(d => \`<span class="tag diagnosis">\${d.name}</span>\`).join('')}</p>
          </div>
      \`;

      // Step 3
      html += \`
          <div class="section">
              <h3>Step 3: Treatment</h3>
              \${data.step3.map(t => \`
                  <div class="item">
                      <strong>\${t.type.name}</strong> - Qty: \${t.quantity}, Cost: $\${t.unitCost}
                  </div>
              \`).join('')}
          </div>
      \`;

      // Step 4
      html += \`
          <div class="section">
              <h3>Step 4: Documentation</h3>
              \${data.step4.triage.length > 0 ? 
                  data.step4.triage.details.map(t => \`<div class="item"><strong>\${t.title}:</strong> \${t.notes}</div>\`).join('') : 
                  '<div class="empty">No triage notes</div>'
              }
              <p><strong>Records:</strong> Clinical Notes (\${data.step4.clinical_notes.details.length}), ROS Exam (\${data.step4.ros_exam.details.length}), Follow-ups (\${data.step4.followups.details.length})</p>
          </div>
      \`;

      container.innerHTML = html;
  }

  document.getElementById('careflowbody').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = submitForm();
    $.ajax({
			type: 'POST',
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'addClinicalPathway']) -->",
			data: formData,
			success: function g(data, textStatus) {
        alertify.log(data.message)
			},
			fail: function g(xhr, textStatus, errorThrown) {
        console.log(xhr);
			}
		});
  });

</script>


<script>
  // JavaScript to handle pathway category selection and emergency-specific features
  function selectCategory(category) {
      // Update UI to show selected category
      document.querySelectorAll('.category-option').forEach(opt => {
          opt.classList.remove('selected');
      });
      document.querySelector(\`.category-option[data-category="\${category}"]\`).classList.add('selected');
      
      // Set the radio button value
      document.querySelector(\`input[name="pathway_category"][value="\${category}"]\`).checked = true;
      
      // Show/hide emergency notice
      const emergencyNotice = document.getElementById('emergency-notice');
      const emergencyTab = $('#emergency-tab');
      const acuteNotice = $('#acute-notice_duration');
      const triageColor = $('#triage_color');

      emergencyNotice.style.display = 'none';
      acuteNotice.hide();
      emergencyTab.hide();
      triageColor.hide();

      if (category === 'emergency') {
          emergencyNotice.style.display = 'block';
          emergencyTab.show();
          triageColor.show();
          
          // Auto-fill emergency-specific values
          // document.getElementById('title').value = 'Cardiac Arrest – Adult';
          // Select emergency specialty if available
          const specialtySelect = document.getElementById('specialty_select');
          for (let i = 0; i < specialtySelect.options.length; i++) {
              if (specialtySelect.options[i].text.includes('Emergency') || 
                  specialtySelect.options[i].text.includes('Critical')) {
                  specialtySelect.options[i].selected = true;
                  // Refresh selectpicker if needed
                  if (typeof specialtySelect.refresh === 'function') {
                      specialtySelect.refresh();
                  }
                  break;
              }
          }
      } else if(category == 'acute') {
        acuteNotice.show();
      } else {
          emergencyNotice.style.display = 'none';
          acuteNotice.hide();
          emergencyTab.hide();
          triageColor.hide();
      }
  }

  function ageSpecificationPicker() {
    return \`
      <SearchableSelectField data-size="5" name="age_specifications[]" id="age_specifications" class="form-control selectpicker" data-live-search="true" title="Select Age Specifications" multiple>
        <!-- php: foreach ($age_specifications as $age_specification) { -->
            <option value="<!-- php: = $age_specification->id -->"><!-- php: = $age_specification->age --></option>
        <!-- php: } -->
      </SearchableSelectField>
    \`
  }


  function addTEWSCondition() {
      // Implementation for adding TEWS conditions to the pathway
      alert('TEWS condition addition would be implemented here');
  }

  // Function to handle emergency pathway triggering from chronic care
  function triggerEmergencyPathway(patientId, chronicPathwayId, emergencyReason) {
      // This would be called when emergency conditions are detected
      console.log(\`Emergency triggered for patient \${patientId} on pathway \${chronicPathwayId}: \${emergencyReason}\`);
      
      // In a real implementation, this would:
      // 1. Pause the current chronic pathway
      // 2. Instantiate the emergency pathway
      // 3. Link them in the timeline
      // 4. Once stabilized, return to chronic management
  }

  // Example of how TEWS monitoring might work
  function monitorTEWS(vitals) {
      // This would be called regularly with patient vitals
      const { age, hr, rr, sbp, responsiveness } = vitals;
      
      // Determine TEWS score and color based on age-specific criteria
      let tewsColor = 'green';
      
      if (age < 3) {
          // Younger child criteria
          if (hr === 0 && rr === 0) tewsColor = 'blue';
          else if (rr >= 50 || hr >= 160 || responsiveness === 'unresponsive') tewsColor = 'red';
          else if ((hr >= 131 && hr <= 159) || (rr >= 40 && rr <= 49)) tewsColor = 'orange';
          else if ((hr >= 80 && hr <= 130) || (rr >= 26 && rr <= 39)) tewsColor = 'yellow';
      } else if (age >= 3 && age <= 12) {
          // Older child criteria
          if (hr === 0 && rr === 0) tewsColor = 'blue';
          else if (rr >= 27 || hr >= 130 || responsiveness === 'unresponsive') tewsColor = 'red';
          else if ((hr >= 100 && hr <= 129) || (rr >= 22 && rr <= 26)) tewsColor = 'orange';
          else if ((hr >= 80 && hr <= 99) || (rr >= 17 && rr <= 21)) tewsColor = 'yellow';
      } else {
          // Adult criteria
          if (hr === 0 && rr === 0) tewsColor = 'blue';
          else if (rr > 29 || rr < 9 || hr > 129 || hr < 41 || sbp < 71 || responsiveness === 'unresponsive') tewsColor = 'red';
          else if ((hr >= 111 && hr <= 129) || (rr >= 21 && rr <= 29) || (sbp >= 71 && sbp <= 80)) tewsColor = 'orange';
          else if ((hr >= 101 && hr <= 110) || (rr >= 15 && rr <= 20) || (sbp >= 81 && sbp <= 100)) tewsColor = 'yellow';
      }
      
      // Trigger emergency response if needed
      if (tewsColor === 'blue' || tewsColor === 'red') {
          // In a real implementation, this would trigger the emergency pathway
          console.log(\`EMERGENCY: TEWS \${tewsColor.toUpperCase()} detected - triggering emergency pathway\`);
          
          // This would connect to your actual emergency triggering mechanism
          // triggerEmergencyPathway(patientId, currentPathwayId, \`TEWS \${tewsColor} condition\`);
      }
      
      return tewsColor;
  }

  // Initialize with no category selected
  document.addEventListener('DOMContentLoaded', function() {
      getDoctors()
      populateBundledServices()
      // Set up category selection handlers
      document.querySelectorAll('.category-option').forEach(opt => {
          opt.addEventListener('click', function() {
              selectCategory(this.dataset.category);
          });
      });
  });
</script>
`;

export default function PatientVisitsCareflowConditionBuilderPage() {
  return (
    <PageShell title="PatientVisits/careflow_condition_builder.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
