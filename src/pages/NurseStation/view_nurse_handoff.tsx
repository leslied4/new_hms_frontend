import PageShell from '../../components/PageShell';

const sourcePath = 'templates/NurseStation/view_nurse_handoff.php';
const rawHtml = `

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nurse Handoff Tool</title>
    <style>
        html {
            scroll-behavior: smooth;
        }
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #3498db;
            --background-light: #f4f4f4;
            --text-color: #34495e;
            --accent-color: #2ecc71;
            --sidebar-bg: white;
            --sidebar-text: #2c3e50;
        }


        .my_div {
            display: flex;
            height: 85vh;
            background-color: var(--background-light);
            color: var(--text-color);
            line-height: 1.6;
        }

        .side-panel {
            width: 300px;
            background-color: var(--sidebar-bg);
            color: var(--sidebar-text);
            padding: 15px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            box-shadow: 4px 0 15px rgba(0,0,0,0.1);
        }

        .side-panel h2 {
            text-align: center;
            margin-bottom: 25px;
            color: var(--primary-color);
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border-bottom: 2px solid var(--secondary-color);
            /* padding-bottom: 15px; */
            margin: 0;
            font-size: 25px !important;
        }

        .side-panel h2 i {
            color: var(--secondary-color);
        }

        .patient-info {
            background-color: #f9f9f9;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
            border: 1px solid #e9e9e9;
        }

        .patient-info-item {
            margin-bottom: 15px;
        }

        .patient-info-item label {
            display: block;
            color: var(--primary-color);
            margin-bottom: 8px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .patient-info-item input, 
        .patient-info-item textarea {
            width: 100%;
            background-color: white;
            border: 1px solid #ddd;
            color: var(--primary-color);
            padding: 10px;
            border-radius: 6px;
            transition: all 0.3s ease;
        }

        .patient-info-item input:focus, 
        .patient-info-item textarea:focus {
            outline: none;
            border-color: var(--secondary-color);
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
        }

        .side-panel-menu {
            list-style-type: none;
        }

        .side-panel-menu li {
            margin-bottom: 15px;
        }

        .side-panel-menu span {
            color: var(--primary-color);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            padding: 10px;
            border-radius: 6px;
            cursor: pointer
        }

        .side-panel-menu span:hover {
            background-color: #f1f1f1;
            color: var(--secondary-color);
        }

        .side-panel-menu span i {
            color: var(--secondary-color);
            margin-right: 10px;
        }

        .main-content {
            position: relative;
            flex-grow: 1;
            padding: 0px;
            overflow-y: auto;
            background-color: white;
        }

        .section {
            background-color: #f9f9f9;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 1px solid #e9e9e9;
        }

        .section h2 {
            color: var(--primary-color);
            border-bottom: 3px solid var(--secondary-color);
            /* padding-bottom: 10px; */
            margin: 0;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section h2 i {
            color: var(--secondary-color);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: var(--text-color);
            font-weight: 600;
        }

        .form-control {
            width: 100%;
            /* padding: 10px; */
            border: 1px solid #ddd;
            border-radius: 6px;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--secondary-color);
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }

        .row {
            display: flex;
            gap: 15px;
        }

        .row > * {
            flex: 1;
        }

        .pain-slider {
            width: 100%;
            accent-color: var(--secondary-color);
        }

        .radio-group {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .radio-group label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }

        .radio-group input {
            accent-color: var(--secondary-color);
        }

        @media (max-width: 768px) {
            body {
                flex-direction: column;
            }

            .side-panel {
                width: 100%;
                height: auto;
            }

            .row {
                flex-direction: column;
            }
        }

        .top-panel-menu {

            position: sticky;
            top: 0;
            /* left: 0; */
            width: 100%;
            display: flex;
            list-style-type: none;
            padding: 0;
            margin: 0;
            background-color: #f8f9fa;
            border-bottom: 1px solid #e0e0e0;
            z-index: 1000;
        }

        .top-panel-menu li {
            flex-grow: 1;
            text-align: center;
            font-size: 12px
        }

        .top-panel-menu span {
            color: var(--primary-color);
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            padding: 15px 10px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
        }

        .top-panel-menu span:hover {
            background-color: #f1f1f1;
            color: var(--secondary-color);
            border-bottom-color: var(--secondary-color);
        }

        .top-panel-menu span i {
            color: var(--secondary-color);
            margin-right: 10px;
        }

        .top-panel-menu .badge {
            margin-left: 5px;
        }
        .side-panel-vitals {
            list-style: none;
            padding: 4px;
            margin: 0;
            background: #f8f9fa; /* Light background */
            border-radius: 8px; /* Rounded corners */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
            font-family: Arial, sans-serif;
        }

        .side-panel-vitals li {
            padding: 4px 8px;
            border-bottom: 1px solid #ddd; /* Subtle separator */
        }

        .side-panel-vitals li:last-child {
            border-bottom: none;
        }

        .side-panel-vitals span {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #333;
        }

        .side-panel-vitals li:first-child span {
            font-weight: bold;
            font-size: 16px;
            color: #007bff; /* Highlight first item */
            cursor: pointer;
        }

        .side-panel-vitals li:first-child span:hover {
            text-decoration: underline;
        }
    </style>
</head>
<div class="my_div">
    <div class="side-panel">
        <h2><i class="fas fa-hospital-user"></i>Nurse Handoff</h2>
        
        <div class="patient-info">
            <div class="patient-info-item form-control">
                <label><span><!-- php: = $patient->name --></span></label>
            </div>
            <div class="patient-info-item">
                <label><i class="fas fa-id-card"></i> Folder No: <span><!-- php: = $patient->folder_number --></span></label>
            </div>
            <div class="patient-info-item">
                <label><i class="fas fa-bed"></i> Room/Bed Number: <span><!-- php: = $latest_admission->bed->ward->name --> (<!-- php: = $latest_admission->bed->name -->)</span></label>
            </div>
            <div class="patient-info-item">
                <label><i class="fas fa-notes-medical"></i> Primary Diagnosis: <span><!-- php: = isset($patient_visit_primary_diagnoses->primary_diagnosis) ? $patient_visit_primary_diagnoses->primary_diagnosis->name : '' --></span></label>
            </div>
            <div class="patient-info-item">
                <label><i class="fas fa-file-medical"></i> Reason for Admission: <span>
                    <!-- php: = $selectedVisit->patient_visit_purpose->name; -->;
                    <!-- php: = $selectedVisit->description -->
                </span></label>
            </div>
        </div>

        <ul class="side-panel-vitals">
            <li>
                <span> Vital Signs </span>
            </li>
            <!-- php: if (isset($selectedVisit->patient_visit_vitals[0])): -->
                <li><span>Temperature: <!-- php: = $selectedVisit->patient_visit_vitals[0]->temperature --> °C/°F</span></li>
                <li><span>Heart Rate: <!-- php: = $selectedVisit->patient_visit_vitals[0]->heart_rate --> bpm</span></li>
                <li><span>Blood Pressure: <!-- php: = $selectedVisit->patient_visit_vitals[0]->blood_pressure_1 --> / <!-- php: = $selectedVisit->patient_visit_vitals[0]->blood_pressure_2 --> mmHg</span></li>
                <li><span>Respiratory Rate: <!-- php: = $selectedVisit->patient_visit_vitals[0]->respiratory_rate --> breaths/min</span></li>
                <li><span>Oxygen Saturation: <!-- php: = $selectedVisit->patient_visit_vitals[0]->oxygen_saturation --> %</span></li>
                <li><span>BMI: <!-- php: = $selectedVisit->patient_visit_vitals[0]->bmi --></span></li>
            <!-- php: endif; -->
        </ul>

    </div>
    
    <div class="main-content">
    
        <ul class="top-panel-menu">
            <li><span href="#" data-target="current-status"> Current Status <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = sizeof($selectedVisit->nurse_station_current_statuses) --></span> </span></li>
            <li><span href="#" data-target="medical-history"> Medical History </span></li>
            <li><span href="#" data-target="medications"> Medications <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = sizeof($selectedVisit->nurse_station_medications) --></span> </span></li>
            <li><span href="#" data-target="ongoing-care"> Ongoing Care <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = sizeof($selectedVisit->nurse_station_ongoing_cares) --></span> </span></li>
            <li><span href="#" data-target="lab-results"> Lab Results </span></li>
            <li><span href="#" data-target="shift-summary"> Shift Summary <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = sizeof($selectedVisit->nurse_station_shift_summaries) --></span> </span></li>
            <li><span href="#" data-target="plan-of-care"> Plan of care <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = sizeof($selectedVisit->nurse_station_plan_cares) --></span> </span></li>
            <li><span href="#" data-target="social-behavioral-factors"> Social Behavioral factors <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = sizeof($selectedVisit->nurse_station_social_behavioral_factors) --></span> </span></li>
        </ul>
        <div id="current-status" class="section">
            <h2><i class="fas fa-heartbeat"></i>Current Status</h2>
            <!-- php: foreach ($selectedVisit->nurse_station_current_statuses as $key => $value): -->

    
                <div class="form-group"><span class="badge badge-pill badge-primary text-slate-900"><!-- php: = $value->date_created->nice() --></span>
                    <!-- php: if ($value->code_status != null || $value->other_code_status != null): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i> Code Status</label>
                            <!-- php: = $value->code_status -->
                            <!-- php: = $value->other_code_status -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (!empty($value->mental_status)): -->
                        <div class="form-group">
                            <label><i class="fas fa-brain"></i> Mental Status</label>
                            <!-- php: = $value->mental_status -->
                        </div>
                    <!-- php: endif; -->
        
                    <!-- php: if (!empty($value->pain_score) || !empty($value->pain_management_strategies)): -->
                        <div class="form-group">
                            <label><i class="fas fa-head-side-cough"></i> Pain Score (0-10)</label>
                            <!-- php: = $value->pain_score -->
                            <!-- php: = $value->pain_management_strategies -->
                        </div>
                    <!-- php: endif; -->
        
                    <!-- php: if (!empty($value->activity_level)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i> Activity Level</label>
                            <!-- php: = $value->activity_level -->
                        </div>
                    <!-- php: endif; -->
        
                    <!-- php: if (!empty($value->fall_risk) || !empty($value->fall_risk_notes)): -->
                        <div class="form-group">
                            <label><i class="fas fa-exclamation-triangle"></i> Fall Risk</label>
                            <!-- php: = $value->fall_risk -->
                            <!-- php: = $value->fall_risk_notes -->
                        </div>
                    <!-- php: endif; -->
                </div>
            <!-- php: endforeach -->
        </div>
        
        <div id="medical-history" class="section">
            <h2><i class="fas fa-pills"></i>Medical History</h2>
            <div class="form-group">
                <label>Conditions | Allergies | Recent Procedures</label>
                <div class="form-control">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Conditions</label>
                                <div class="form-control">
                                    <div class="row">
                                        <div class="">
                                            <div class="diagnoses-small-card" id="problem_complaints_noneText">
                                                <span class="">
                                                    None
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Allergies</label>
                                <div class="form-control">
                                    <div class="row">
                                        <ul id="allergies_table_body_tp">

                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Recent Procedures</label>
                                <div class="form-control">
                                    <ul id="surgeries_table">

                                    </ul>


                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>

        </div>
        <div id="medications" class="section">
            <h2><i class="fas fa-pills"></i>Medications</h2>
            <div class="form-group">
                <label>Scheduled Medications | PRN Medications Administered</label>
                <div class="form-control">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Scheduled Medications</label>
                                <div class="form-control">
                                    <ul id="scheduled_medication">

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>PRN Medications Administered</label>
                                <div class="form-control">
                                    <ul id="prn_medications">

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
            <!-- php: foreach ($selectedVisit->nurse_station_medications as $key => $value): -->
                <div class="form-group"><span class="badge badge-pill badge-primary text-slate-900"><!-- php: = $value->date_created->nice() --></span>
                    
                    <!-- php: if (isset($value->medication_changes)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i> Pending Medication Changes</label>
                            <!-- php: = $value->medication_changes -->
                        </div>
                    <!-- php: endif; -->
                </div>
            <!-- php: endforeach -->
        </div>

        <div id="ongoing-care" class="section">
            <h2><i class="fas fa-pills"></i>Ongoing Care/Intervention</h2>
            <label>Flow Sheet</label>
            <div class="form-control">
                <ul id="scheduled_flow_sheets">

                </ul>
                
            </div>
            <!-- php: foreach ($selectedVisit->nurse_station_ongoing_cares as $key => $value): -->
                <div class="form-group"> <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = $value->date_created->nice() --></span>
                    <!-- php: if (isset($value->lines_tubes_drains) || isset($value->lines_tubes_drains_other)): -->
                        <h4><i class="fas fa-walking"></i>Lines/Tubes/Drains</h4>
                        <div class="form-group">
                            <!-- php: = $value->lines_tubes_drains ?? '' -->
                            <!-- php: = $value->lines_tubes_drains_other ?? '' -->
                        </div>
                    <!-- php: endif; -->
                    <h4><i class="fas fa-walking"></i>Wound Care</h4>
                    <!-- php: if (isset($value->dressing_type) || isset($value->other)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i>Dressing Type</label>
                            <!-- php: = $value->dressing_type ?? '' -->
                            <!-- php: = $value->other ?? '' -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (isset($value->frequency)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i>Frequency</label>
                            <!-- php: = $value->frequency -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (isset($value->wound_location)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i>Wound Location</label>
                            <!-- php: = $value->wound_location -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (isset($value->size)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i>Size</label>
                            <!-- php: = $value->size -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (isset($value->signs_of_infection)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i>Signs of Infection</label>
                            <!-- php: = $value->signs_of_infection -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (isset($value->last_dressing_change)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i>Last Dressing Change</label>
                            <!-- php: = $value->last_dressing_change -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (isset($value->additional_notes)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i>Aditional Notes</label>
                            <!-- php: = $value->additional_notes -->
                        </div>
                    <!-- php: endif; -->

                    <!-- php: if (isset($value->special_equipment) || isset($value->special_equipment_other)): -->
                        <h4><i class="fas fa-walking"></i>Special Equipment</h4>
                        <div class="form-group">
                            <!-- php: = $value->special_equipment ?? '' -->
                            <!-- php: = $value->special_equipment_other ?? '' -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (isset($value->infection_precautions) || isset($value->activity_restriction) || isset($value->fall_precaution)): -->
                        <h4><i class="fas fa-walking"></i>Additional Considerations</h4>
                        <!-- php: if (isset($value->infection_precautions)): -->
                            <div class="form-group">
                                <label><i class="fas fa-walking"></i>Infection Precautions</label>
                                <!-- php: = $value->infection_precautions -->
                            </div>
                        <!-- php: endif; -->
                        <!-- php: if (isset($value->activity_restriction)): -->
                            <div class="form-group">
                                <label><i class="fas fa-walking"></i>Activity Restrictions</label>
                                <!-- php: = $value->activity_restriction -->
                            </div>
                        <!-- php: endif; -->
                        <!-- php: if (isset($value->fall_precaution)): -->
                            <div class="form-group">
                                <label><i class="fas fa-walking"></i>Fall Precautions</label>
                                <!-- php: = $value->fall_precaution -->
                            </div>
                        <!-- php: endif; -->
                    <!-- php: endif; -->
                </div>
            <!-- php: endforeach -->
        </div>

        <div id="lab-results" class="section">
            <h2><i class="fas fa-pills"></i>Lab Results/Diagnostics</h2>
            <div class="form-group">
                <label>Pending Results | Critical Results | Imaging Studies</label>
                <div class="form-control">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Scheduled Medications</label>
                                <div class="form-control">
                                    <div>
                                        <ul id="all_lab_scan_requests_tp">
    
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-md-6">
                            <div class="form-group">
                                <label>PRN Medications Administered</label>
                                <div class="form-control">
                                    <div class="row">
                                        <div class="col-md-3"></div>
                                        <div class="col-md-3"></div>
                                        <div class="col-md-3"></div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div> -->

                    </div>
                    
                </div>
            </div>
            
        </div>
        <div id="shift-summary" class="section">
            <h2><i class="fas fa-pills"></i>Shift Summary</h2>
            <!-- php: foreach ($selectedVisit->nurse_station_shift_summaries as $key => $value): -->
                <div class="form-group"><span class="badge badge-pill badge-primary text-slate-900"><!-- php: = $value->date_created->nice() --></span>
                    <!-- php: if (!empty($value->key_events)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i> Key Events in Current Shift</label>
                            <!-- php: = $value->key_events -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (!empty($value->patient_response_to_treatment)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i> Patient Response to Treatment</label>
                            <!-- php: = $value->patient_response_to_treatment -->
                        </div>
                    <!-- php: endif; -->
                    <!-- php: if (!empty($value->concerns)): -->
                        <div class="form-group">
                            <label><i class="fas fa-walking"></i> Concerns or Escalation Needs</label>
                            <!-- php: = $value->concerns -->
                        </div>
                    <!-- php: endif; -->
                </div>
            <!-- php: endforeach -->
        </div>

        <div id="plan-of-care" class="section">
            <h2><i class="fas fa-tasks"></i>Plan of Care</h2>
            <!-- php: foreach ($selectedVisit->nurse_station_plan_cares as $key => $value): -->
                <div class="form-group"> <span class="badge badge-pill badge-primary text-slate-900"><!-- php: = $value->date_created->nice() --></span>
                    <div class="form-group">
                        <label>Immediate Tasks</label>
                        <div class="form-control">
                            <div class="row">
                                <!-- php: if (isset($value->immediate_tasks)): -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Checklist Options</label>
                                            <div class="form-control">
                                                <!-- php: = $value->immediate_tasks -->
                                            </div>
                                        </div>
                                    </div>
                                <!-- php: endif; -->
                                <!-- php: if (isset($value->immediate_care_notes)): -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Notes</label>
                                            <!-- php: = $value->immediate_care_notes -->
                                        </div>
                                    </div>
                                <!-- php: endif; -->
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Long-Term Goals</label>
                        <!-- php: = $value->long_term_goals -->
                    </div>
                    <div class="form-group">
                        <label>Anticipated Discharge Needs</label>
                        <div class="form-control">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <!-- php: = $value->anticipated_discharge_needs -->
                                        
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Notes</label>
                                        <!-- php: = $value->discharge_needs_notes -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Additional Considerations</label>
                        <div class="form-control">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Pending Consults</label>
                                        <div class="form-control">
                                            <!-- php: = $value->pending_consults -->
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Barriers to Discharge</label>
                                        <!-- php: = $value->barriers_to_discharge -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Patient Education Status</label>
                        <div class="form-control">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Key Contacts</label>
                                        <!-- php: = $value->education_status -->
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Key Contacts</label>
                                        <!-- php: = $value->patient_education -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- php: endforeach -->
        </div>
        <div class="section" id="social-behavioral-factors">
            <h2>Social and Behavioral Factors</h2>
            <!-- php: foreach ($selectedVisit->nurse_station_social_behavioral_factors as $key => $value): -->
                <div class="form-control"><span class="badge badge-pill badge-primary text-slate-900"><!-- php: = $value->date_created->nice() --></span>
                    <div class="form-control">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Family Involvement</label>
                                    <!-- php: = $value->family_involvement -->
                                    <!-- php: = $value->family_involvement_details -->
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Communication Needs</label>
                                    
                                    <!-- php: = $value->communication_needs -->
                                    <!-- php: = $value->other_communication_needs -->
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Behavioral Concerns</label>
                                    <!-- php: = $value->behavioral_concerns -->
                                    <!-- php: = $value->behavioral_concerns_checklist -->
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Additional Considerations</label>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Cultural/Religious Needs:</label>
                                            <!-- php: = $value->cultural_religious_needs -->
                                            
                                        </div>
                                        <div class="col-md-6">
                                            <label>Substance Use:</label>
                                            <!-- php: = $value->substance_use -->
                                            <!-- php: = $value->substance_use_details -->
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Mental Health History:</label>
                                            <!-- php: = $value->mental_health_history -->
                                            
                                        </div>
                                        <div class="col-md-6">
                                            <label>Safety Alerts:</label>
                                            <!-- php: = $value->safety_alerts -->
                                            <!-- php: = $value->safety_alerts_details -->                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- php: endforeach -->
        </div>
    </div>
</div>

<script>
    var populateAllergiesTableTp_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientAllergies', $patient->id ] ); -->"
    var patient_id = '<!-- php: = $selectedVisit->patient_id; -->'
    var visit_id = '<!-- php: = $selectedVisit->id; -->'
    function populateAllergiesTableTp() {
		$.ajax({
            type: 'GET',
            url: populateAllergiesTableTp_link,
			data: {
				patient_id: patient_id,
				patient_visit_id: visit_id
			},
            cache: false,
            success: function (response){
				
                let result = []
				response.encounters.forEach(ele => {
					let allergies = ele.patient_visit_clinical_encounter_note_allergies
					let allergy_reactions = ele.patient_visit_clinical_encounter_note_allergy_reactions
                    let stated_allergies = []
                    let stated_reactions = []
                    let stated_severities = []
					if(allergies){
						for (var i in allergies){
							stated_allergies.push(allergies[i].encounter_allergy?.name)
							stated_severities.push(allergies[i].encounter_allergy_severity?.name)
						}
					}
					
					if(allergy_reactions){
                        for(var i in allergy_reactions){
                            stated_reactions.push(allergy_reactions[i].encounter_allergy_reaction.name)
						}
					}
                    if (Array.isArray(allergy_reactions) && allergy_reactions.length > 0) {
                        
                        result.push(\`
                            <li>\${stated_allergies.join(", ")}; \${stated_reactions.join(", ")}; \${stated_severities.join(", ")}</li>
                        \`)
                    }
                    
				});
                if (result.length > 0) {
                    
                    $('#allergies_table_body_tp').html(result.join(""))
                } else {
                    $('#allergies_table_body_tp').html('None')

                }
			}
		})
	}
    var getAllRequestedSurgeries_surgery_link = "<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'getAllRequestedSurgeries', $patient->id, $selectedVisit->id, ]) -->"

    function populateSurgeryTable() {
		$.ajax({
            type: 'GET',
            url: getAllRequestedSurgeries_surgery_link,
			data: {
				patient_id: patient_id,
				patient_visit_id: visit_id
			},
            cache: false,
            success: function (res){
                if (res.data.length > 0) {
                    $('#surgeries_table').html(
                        res.data.map(ele => {
                            return \`<li><span class="badge badge-pill badge-secondary">\${ele[0]}</span>\${ele[1]}</li>\`
                        }).join('')
                    )
                } else {
                    $('#surgeries_table').html('None')

                }
                
			}
		})
	}

    var populateDiagnoses_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAllPatientDiagnosis', $patient->id, $selectedVisit->id,]) -->"

	function getDiagnosisType(row) {
		switch (row) {
			case 1:
				color = 'red';
				badge_color = 'danger'
				value = 'Primary';
				break;
			case 2:
				color = 'green';
				badge_color = 'success'
				value = 'Provisional';
				break;
			case 3:
				color = 'orange';
				badge_color = 'warning'
				value = 'Differential';
				break;

			default:
				color = 'grey';
				badge_color = 'secondary'
				value = 'Other';
				break;
		}
		return \`<span class="badge badge-\${badge_color} " style="background:\${color};color: white">\${value}</span>\`;
	}
    function makeText(name, isCleared, id, type ) {

        return \`
            <div class="row mb-1" style="">
                <div class="col-md-6">\${name}</div>
                <div class="col-md-6">
                    <div class="col-md-5">
                        <label class="switchToggle">
                            <input name="bundled_service" type="checkbox" \${isCleared == 1 ? 'checked' : ''} id="\${type}_\${id}" onclick="toggleIsCleared('\${id}', '\${type}',)">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>
            </div>
        \`
    }
    function makeDiagnosisOptions(diagnosis_record_id, diagnosis_id, diagnosis_type, name, raw_name, standard_diagnosis_id) {
        return {
            diagnosis_record_id: diagnosis_record_id,
            diagnosis_type: diagnosis_type,
            diagnosis_id: diagnosis_id,
            standard_diagnosis_id: standard_diagnosis_id,
            name: name,
            raw_name: raw_name,
        }
    }
    function populateDiagnoses() {
        $.ajax({
            type: 'GET',
            url: populateDiagnoses_link,
            cache: false,
            success: function (res) {
                if(res.data.length > 0){
                    $(".diagnoses-small-card").html("<span><ul class='diagnoses-list-class'></ul></span>")

                    let result = ''
                    let modalInfo = []
                    let diagnosisOptions = []


                    res?.data.forEach(row => {
                        if (row?.patient_visit_primary_diagnoses && row?.patient_visit_primary_diagnoses.length > 0) {
                            row?.patient_visit_primary_diagnoses?.forEach(primaryDiagnosis => {
                                result += "<li>"
                                if (primaryDiagnosis?.primary_diagnosis != undefined) {
                                    let name = \`\${primaryDiagnosis?.primary_diagnosis?.name} <span class="badge badge-danger">\${primaryDiagnosis?.primary_diagnosis?.code}</span>
                                    \${getDiagnosisType(1)} \${\`| \${primaryDiagnosis.ill_episode}\`} <i class="fa fa-circle" style="color:\${primaryDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
                                    result += name;
                                    modalInfo.push(makeText(name, primaryDiagnosis.is_cleared, primaryDiagnosis.id, 'primary'))
                                    diagnosisOptions.push(makeDiagnosisOptions(row.id, primaryDiagnosis.id, 'primary', name, primaryDiagnosis?.primary_diagnosis?.name + " ("+primaryDiagnosis?.primary_diagnosis?.code+ ")" , primaryDiagnosis.primary_diagnosis_id))
                                } else {
                                    result += 'N/A'
                                }
                                result += "</li>"
                            });
                        }
                        if (row?.patient_visit_provisional_diagnoses && row?.patient_visit_provisional_diagnoses.length > 0) {
                            row?.patient_visit_provisional_diagnoses?.forEach(prDiagnosis => {
                                result += "<li>"
                                if (prDiagnosis?.diagnosis != undefined) {
                                    let name = \`\${prDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${prDiagnosis?.diagnosis?.code}</span>
                                    \${getDiagnosisType(2)} <i class="fa fa-circle" style="color:\${prDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
                                    result += name;
                                    modalInfo.push(makeText(name, prDiagnosis.is_cleared, prDiagnosis.id, 'provi'))
                                    diagnosisOptions.push(makeDiagnosisOptions(row.id, prDiagnosis.id, 'provisional', name, prDiagnosis?.diagnosis?.name + " ("+prDiagnosis?.diagnosis?.code+ ")" , prDiagnosis.diagnosis_id))
                                } else {
                                    result += 'N/A'
                                }
                                result += "</li>"
                            });
                        }
                        if (row?.patient_visit_differential_diagnoses && row?.patient_visit_differential_diagnoses.length > 0) {
                            row?.patient_visit_differential_diagnoses?.forEach(dDiagnosis => {
                                result += "<li>"
                                if (dDiagnosis?.diagnosis != undefined) {
                                    let name = \`\${dDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${dDiagnosis?.diagnosis?.code}</span>
                                    \${getDiagnosisType(3)} <i class="fa fa-circle" style="color:\${dDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
                                    result += name;
                                    modalInfo.push(makeText(name, dDiagnosis.is_cleared, dDiagnosis.id, 'diff'))
                                    diagnosisOptions.push(makeDiagnosisOptions(row.id, dDiagnosis.id, 'differential', name, dDiagnosis?.diagnosis?.name + " ("+dDiagnosis?.diagnosis?.code+ ")" , dDiagnosis.diagnosis_id))
                                } else {
                                    result += 'N/A'
                                }
                                result += "</li>"
                            });
                        }
                        if (row?.patient_visit_other_diagnoses && row?.patient_visit_other_diagnoses.length > 0) {
                            row?.patient_visit_other_diagnoses?.forEach(oDiagnosis => {
                                result += "<li>"
                                if (oDiagnosis?.diagnosis != undefined) {
                                    let name = \`\${oDiagnosis?.diagnosis?.name} <span class="badge badge-danger">\${oDiagnosis?.diagnosis?.code}</span>
                                    \${getDiagnosisType(4)} <i class="fa fa-circle" style="color:\${oDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
                                    result += name;
                                    modalInfo.push(makeText(name, oDiagnosis.is_cleared, oDiagnosis.id, 'other'))
                                    diagnosisOptions.push(makeDiagnosisOptions(row.id, oDiagnosis.id, 'other', name, oDiagnosis?.diagnosis?.name + " ("+oDiagnosis?.diagnosis?.code+ ")" , oDiagnosis.diagnosis_id))
                                } else {
                                    result += 'N/A'
                                }
                                result += "</li>"
                            });
                        }
                    });
                    $(".diagnoses-list-class").append(result)
                    $("#diagnosis_clearance").html(modalInfo.join(""))

                    $('#diagnosis_selectoptions').html(diagnosisOptions.map(opt => {
                        return \`
                            <option value="\${opt.diagnosis_record_id}" data-standard-diagnosis="\${opt.standard_diagnosis_id}" data-type="\${opt.diagnosis_type}" data-name='\${opt.raw_name}' data-id="\${opt.diagnosis_id}" data-content='\${opt.name}'>\${opt.raw_name}</option>
                        \`
                    }).join(""))
                    $('#diagnosis_selectoptions').selectpicker('refresh')
                }else{
                    $(".diagnoses-small-card").html("<span class='bold'>Patient has not been diagnosed</span>")
                }
            }
        });
    }

    var getRequestedPrescriptions_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedPrescriptions']) -->/<!-- php: = $selectedVisit->id -->/2\`
    function passPrescriptions() {

        $.ajax({
            type: 'GET',
            url: getRequestedPrescriptions_link,
			data: {
				patient_id: patient_id,
				patient_visit_id: visit_id
			},
            cache: false,
            success: function (res){
                if (res.data.length > 0) {
                    $('#scheduled_medication').append(
                        res.data.map(ele => {
                            return \`<li><span class="badge badge-pill badge-secondary">\${ele[0]}</span><span class="badge badge-pill badge-info">prescription</span>\${ele[3]}</li>\`
                        }).join('')
                    )
                } else {
                    $('#scheduled_medication').append('None')

                }
                
			}
		})
    }
    var getRequestedFlowSheets_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestFlowSheets', 'action' => 'getSelectedFlowSheetRequests', $selectedVisit->id, ]) -->\`
    function passFlowSheets() {

        $.ajax({
            type: 'GET',
            url: getRequestedFlowSheets_link,
			data: {
				patient_id: patient_id,
				patient_visit_id: visit_id
			},
            cache: false,
            success: function (res){
                $('#scheduled_flow_sheets').html('')
                if (res.data.length > 0) {
                    $('#scheduled_flow_sheets').append(
                        res.data.map(ele => {
                            return \`
                            <li>
                                <span class="badge badge-pill badge-secondary">Date Created: \${ele[0]}</span>
                                    \${ele[1]}
                                </span>
                                <span class="badge badge-pill badge-info">frequency: \${ele[4]}</span>
                                <span class="">Status: \${ele[3]}</span>
                            </li>
                            \`
                        }).join('')
                    )
                } else {
                    $('#scheduled_flow_sheets').append('None')

                }
                
			}
		})
    }
    var getRequestedInfusions_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedInfusions']) -->/<!-- php: = $selectedVisit->id -->/2\`
    function passInfusions() {

        $.ajax({
            type: 'GET',
            url: getRequestedInfusions_link,
			data: {
				patient_id: patient_id,
				patient_visit_id: visit_id
			},
            cache: false,
            success: function (res){
                if (res.data.length > 0) {
                    $('#scheduled_medication').append(
                        res.data.map(ele => {
                            return \`<li><span class="badge badge-pill badge-secondary">\${ele[0]}</span><span class="badge badge-pill badge-info">infusion</span>\${ele[3]}</li>\`
                        }).join('')
                    )
                } else {
                    $('#scheduled_medication').append('None')

                }
                
			}
		})
    }
    var getRequestedMedicationPRN_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getRequestedMedicationPRN']) -->/<!-- php: = $selectedVisit->id -->/0\`
    function passPRN() {

        $.ajax({
            type: 'GET',
            url: getRequestedMedicationPRN_link,
			data: {
				patient_id: patient_id,
				patient_visit_id: visit_id
			},
            cache: false,
            success: function (res){
                if (res.data.length > 0) {
                    $('#prn_medications').append(
                        res.data.map(ele => {
                            return \`<li><span class="badge badge-pill badge-secondary">\${ele[0]}</span>\${ele[1]}</li>\`
                        }).join('')
                    )
                } else {
                    $('#prn_medications').append('None')

                }
                
			}
		})
    }
    var fetchLabsNRadioTP_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRequestRadioLabs', $selectedVisit->patient_id, $selectedVisit->id]) -->\`
    function fetchLabsNRadioTP() {
        console.log("it came here")
		$.ajax({
			type: "GET",
			url: fetchLabsNRadioTP_link,
			success: function g(data, textStatus) {
				let result = []
				Object.values(data).forEach(request => {

                    result.push(\`<li>\${request.name} <span class='badge badge-pill badge-primary'>\${(request.type)}</span></li>\`)

				});
				$(\`#all_lab_scan_requests_tp\`).append(result.join(""));
				$(\`#all_lab_scan_requests_tp\`).selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.error('Error Occured. Please try again');
			}
		});
	}

    var currentStatus_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'currentStatusSave', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    var medicalHistory_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'medicalHistorySave', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    var medications_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'medicationsSave', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    var ongoingCare_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'ongoingCareSave', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    var labResults_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'labResultsSave', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    var shiftSummary_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'shiftSummarySave', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    var planCare_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'planCareSave', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    var socialBehavioralFactors_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'NurseStation', 'action' => 'socialBehavioralFactorsSave', $selectedVisit->patient_id, $selectedVisit->id]) -->'

    $('#current-status').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serialize(); // Serialize the form data

        $.ajax({
            type: 'POST',
            url: currentStatus_submitForm_link,
            data: formData,
            success: function(data) {
                if(data) {
                    alertify.success('Saved Successfully')
                } else {
                    alertify.error('An Error Occured')
                }
            },
            error: function(xhr, status, error) {
                alertify.error('An error Occured')
                console.error('Error submitting form:', error);
            }
        });
    });
    $('#medical-history').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serialize(); // Serialize the form data

        $.ajax({
            type: 'POST',
            url: medicalHistory_submitForm_link,
            data: formData,
            success: function(data) {
                if(data) {
                    alertify.success('Saved Successfully')
                } else {
                    alertify.error('An Error Occured')
                }
            },
            error: function(xhr, status, error) {
                alertify.error('An error Occured')
                console.error('Error submitting form:', error);
            }
        });
    });
    $('#medications').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serialize(); // Serialize the form data

        $.ajax({
            type: 'POST',
            url: medications_submitForm_link,
            data: formData,
            success: function(data) {
                if(data) {
                    alertify.success('Saved Successfully')
                } else {
                    alertify.error('An Error Occured')
                }
            },
            error: function(xhr, status, error) {
                alertify.error('An error Occured')
                console.error('Error submitting form:', error);
            }
        });
    });
    $('#ongoing-care').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serializeArray().reduce((acc, curr) => {acc[curr.name] = curr.value; return acc}, {}); // Serialize the form data
        formData['lines_tubes_drains'] = $('select[name="lines_tubes_drains"]').map(function() {return $(this).val();}).get().join('; ');
        formData['special_equipment'] = $('select[name="special_equipment"]').map(function() {return $(this).val();}).get().join('; ');
        

        $.ajax({
            type: 'POST',
            url: ongoingCare_submitForm_link,
            data: formData,
            success: function(data) {
                if(data) {
                    alertify.success('Saved Successfully')
                } else {
                    alertify.error('An Error Occured')
                }
            },
            error: function(xhr, status, error) {
                alertify.error('An error Occured')
                console.error('Error submitting form:', error);
            }
        });
    });
    $('#shift-summary').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serialize(); // Serialize the form data

        $.ajax({
            type: 'POST',
            url: shiftSummary_submitForm_link,
            data: formData,
            success: function(data) {
                if(data) {
                    alertify.success('Saved Successfully')
                } else {
                    alertify.error('An Error Occured')
                }
            },
            error: function(xhr, status, error) {
                alertify.error('An error Occured')
                console.error('Error submitting form:', error);
            }
        });
    });
    $('#plan-of-care').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serializeArray().reduce((acc, curr) => {acc[curr.name] = curr.value; return acc}, {}); // Serialize the form data
        formData['immediate_care_tasks'] = $('input[name="immediate_tasks[]"]:checked').map(function() { return $(this).val(); }).get().join('; ');
        formData['anticipated_discharge_needs'] = $('input[name="anticipated_discharge_needs[]"]:checked').map(function() { return $(this).val(); }).get().join('; ');
        formData['pending_consults'] = $('input[name="pending_consults[]"]:checked').map(function() { return $(this).val(); }).get().join('; ');

        $.ajax({
            type: 'POST',
            url: planCare_submitForm_link,
            data: formData,
            success: function(data) {
                if(data) {
                    alertify.success('Saved Successfully')
                } else {
                    alertify.error('An Error Occured')
                }
            },
            error: function(xhr, status, error) {
                alertify.error('An error Occured')
                console.error('Error submitting form:', error);
            }
        });
    });
    $('#social-behavioral-factors').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serializeArray().reduce((acc, curr) => {acc[curr.name] = curr.value; return acc}, {}); // Serialize the form data
        formData['behavioral_concerns_checklist'] = $('input[name="behavioral_concerns_checklist[]"]:checked').map(function() { return $(this).val(); }).get().join('; ');
        formData['substance_use'] = $('input[name="substance_use[]"]:checked').map(function() { return $(this).val(); }).get().join('; ');
        formData['safety_alerts'] = $('input[name="safety_alerts[]"]:checked').map(function() { return $(this).val(); }).get().join('; ');
        console.log("form Data", formData)
        $.ajax({
            type: 'POST',
            url: socialBehavioralFactors_submitForm_link,
            data: formData,
            success: function(data) {
                if(data) {
                    alertify.success('Saved Successfully')
                } else {
                    alertify.error('An Error Occured')
                }
            },
            error: function(xhr, status, error) {
                alertify.error('An error Occured')
                console.error('Error submitting form:', error);
            }
        });
    });

    document.querySelector('[data-target="current-status"]').addEventListener('click', function() {
        document.getElementById('current-status').scrollIntoView();
    });
    document.querySelector('[data-target="medical-history"]').addEventListener('click', function() {
        document.getElementById('medical-history').scrollIntoView();
    });
    document.querySelector('[data-target="medications"]').addEventListener('click', function() {
        document.getElementById('medications').scrollIntoView();
    });
    document.querySelector('[data-target="ongoing-care"]').addEventListener('click', function() {
        document.getElementById('ongoing-care').scrollIntoView();
    });
    document.querySelector('[data-target="lab-results"]').addEventListener('click', function() {
        document.getElementById('lab-results').scrollIntoView();
    });
    document.querySelector('[data-target="shift-summary"]').addEventListener('click', function() {
        document.getElementById('shift-summary').scrollIntoView();
    });
    document.querySelector('[data-target="plan-of-care"]').addEventListener('click', function() {
        document.getElementById('plan-of-care').scrollIntoView();
    });
    document.querySelector('[data-target="social-behavioral-factors"]').addEventListener('click', function() {
        document.getElementById('social-behavioral-factors').scrollIntoView();
    });
    
    populateSurgeryTable()
    populateAllergiesTableTp()
    populateDiagnoses()
    $('#scheduled_medication').html('')
    passPrescriptions()
    passInfusions()
    passFlowSheets()
    passPRN()
    fetchLabsNRadioTP()
</script>
`;

export default function NurseStationViewNurseHandoffPage() {
  return (
    <PageShell title="NurseStation/view_nurse_handoff.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
