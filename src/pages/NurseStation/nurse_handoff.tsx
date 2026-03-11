import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/NurseStation/nurse_handoff.php';
const rawHtml = `

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nurse Handoff Tool</title>
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap-select/css/bootstrap-select.min.css') -->
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
            height: 100vh;
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
            <li><span href="#" data-target="current-status"> Current Status </span></li>
            <li><span href="#" data-target="medical-history"> Medical History </span></li>
            <li><span href="#" data-target="medications"> Medications </span></li>
            <li><span href="#" data-target="ongoing-care"> Ongoing Care </span></li>
            <li><span href="#" data-target="lab-results"> Lab Results </span></li>
            <li><span href="#" data-target="shift-summary"> Shift Summary </span></li>
            <li><span href="#" data-target="plan-of-care"> Plan of care </span></li>
            <li><span href="#" data-target="social-behavioral-factors"> Social Behavioral factors </span></li>
        </ul>
        <form id="current-status" class="section">
            <h2><i class="fas fa-heartbeat"></i>Current Status</h2>

            <div class="form-group">
                <label><i class="fas fa-walking"></i> Code Status</label>
                <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" data-size="4" id="code_status_select" name="code_status">
                    <option value="Full Code" data-content="Full Code <span class='badge badge-pill' style='background: #28A745'>&nbsp;</span> All resuscitation efforts allowed" >Full Code</option>
                    <option value="DNR" data-content="DNR <span class='badge badge-pill' style='background: #DC3545'>&nbsp;</span> No CPR or advanced cardiac life support" >DNR</option>
                    <option value="DNI" data-content="DNI <span class='badge badge-pill' style='background: #FD7E14'>&nbsp;</span> No intubation, but CPR & meds allowed" >DNI</option>
                    <option value="DNR/DNI" data-content="DNR/DNI <span class='badge badge-pill' style='background: #FFC107'>&nbsp;</span> No CPR & no intubation" >DNR/DNI</option>
                    <option value="Comfort Measures Only / Hospice Care" data-content="Comfort Measures Only <span class='badge badge-pill' style='background: #007BFF'>&nbsp;</span> Pain management & symptom relief" >Comfort Measures Only / Hospice Care</option>
                    <option value="Limited Code / Partial Code" data-content="Limited Code <span class='badge badge-pill' style='background: #6F42C1'>&nbsp;</span> Selective resuscitation measures" >Limited Code / Partial Code</option>
                    <option value="Chemical Code" data-content="Chemical Code <span class='badge badge-pill' style='background: #343A40'>&nbsp;</span> Medications only, no CPR/intubation" >Chemical Code</option>
                    <option value="CPR Only" data-content="CPR Only <span class='badge badge-pill' style='background: #795548'>&nbsp;</span> CPR allowed, but no intubation" >CPR Only</option>
                    <option value="Intubation Only" data-content="Intubation Only <span class='badge badge-pill' style='background: #EDEDED'>&nbsp;</span> Intubation allowed, but no CPR" >Intubation Only</option>
                </SearchableSelectField>
                <textarea class="form-control" placeholder="Additional notes" name="other_code_status"></textarea>
            </div>

            <div class="form-group">
                <label><i class="fas fa-brain"></i> Mental Status</label>
                <SearchableSelectField class="form-control" name="mental_status">
                    <option>Alert</option>
                    <option>Oriented</option>
                    <option>Lethargic</option>
                    <option>Confused</option>
                    <option>Sedated</option>
                </SearchableSelectField>
            </div>

            <div class="form-group">
                <label><i class="fas fa-head-side-cough"></i> Pain Score (0-10)</label>
                <div style="display:flex">

                    <input type="range" min="0" max="10" class="pain-slider" id="pain-score-slider" value="0" name="pain_score" onchange="$('#pain_score_value').html($('#pain-score-slider').val())">
                    <span class="badge badge-pill badge-primary" id="pain_score_value">0</span>
                </div>
                <textarea class="form-control" placeholder="Pain management strategies" name="pain_management_strategies"></textarea>
            </div>

            <div class="form-group">
                <label><i class="fas fa-walking"></i> Activity Level</label>
                <SearchableSelectField class="form-control" name="activity_level">
                    <option>Bedrest</option>
                    <option>Ambulatory</option>
                    <option>Limited mobility</option>
                </SearchableSelectField>
            </div>

            <div class="form-group">
                <label><i class="fas fa-exclamation-triangle"></i> Fall Risk</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="fall_risk" value="1"> Yes
                    </label>
                    <label>
                        <input type="radio" name="fall_risk" value="0"> No
                    </label>
                </div>
                <textarea class="form-control" placeholder="Additional notes" name="fall_risk_notes"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </form>

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
        <form id="medications" class="section">
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
            
            <div class="form-group">
                <label><i class="fas fa-walking"></i> Pending Medication Changes</label>
                <textarea class="form-control" placeholder="Additional notes" name="medication_changes"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </form>
        <form id="ongoing-care" class="section">
            <h2><i class="fas fa-pills"></i>Ongoing Care/Intervention</h2>
            <label>Flow Sheet</label>
            <div class="form-control">
                <ul id="scheduled_flow_sheets">

                </ul>
                
            </div>

            <h4><i class="fas fa-walking"></i>Lines/Tubes/Drains</h4>
            <div class="form-group">
                <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" data-size="4" id="lines_tubes_drains" multiple name="lines_tubes_drains">
                    <option>IV Line (peripheral)</option>
                    <option>Central Line (PICC, Port-a-Cath, Hickman)</option>
                    <option>Arterial Line</option>
                    <option>Foley Catheter</option>
                    <option>Suprapubic Catheter</option>
                    <option>Chest Tube</option>
                    <option>Nasogastric (NG) Tube</option>
                    <option>Orogastric (OG) Tube</option>
                    <option>Jejunostomy (J) Tube</option>
                    <option>Tracheostomy</option>
                    <option>Wound Vac (NPWT)</option>
                    <option>Jackson-Pratt (JP) Drain</option>
                    <option>Hemovac Drain</option>
                    <option>Epidural Catheter</option>
                    <option>Dialysis Catheter</option>
                    <option>Chest Drain</option>
                </SearchableSelectField>
                <textarea class="form-control mt-1 mb-1" placeholder="Other" name="lines_tubes_drains_other"></textarea>
                <textarea class="form-control" placeholder="Additional notes" name="lines_tubes_drains_notes"></textarea>
            </div>
            <h4><i class="fas fa-walking"></i>Wound Care</h4>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Dressing Type</label>
                <SearchableSelectField class="form-control" name="dressing_type">
                    <option value="Sterile Gauze">Sterile gauze</option>
                    <option value="Hydrocolloid">Hydrocolloid</option>
                    <option value="Alginate">Alginate</option>
                    <option value="Foam">Foam</option>
                    <option value="Transparent Film">Transparent film</option>
                    <option value="Antimicrobial">Antimicrobial (e.g., Silvercel)</option>
                    <option value="ABD Pad">ABD pad</option>
                    <option value="Non Adherent">Non-adherent (e.g., Adaptic)</option>
                    <option value="Wet to Dry">Wet-to-dry</option>
                </SearchableSelectField>
                <textarea class="form-control" placeholder="Other Dressing Type" name="Other"></textarea>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Frequency</label>
                <SearchableSelectField class="form-control" name="frequency">
                    <option value="Daily">Daily</option>
                    <option value="Every 12 hours (BID)">Every 12 hours (BID)</option>
                    <option value="Every 8 hours (TID)">Every 8 hours (TID)</option>
                    <option value="Weekly">Weekly</option>
                    <option value="PRN (e.g., soiling)">PRN (e.g., soiling)</option>
                    
                </SearchableSelectField>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Wound Location</label>
                <textarea class="form-control" placeholder="Additional notes" name="wound_location"></textarea>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Size</label>
                <textarea class="form-control" placeholder="Additional notes" name="size"></textarea>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Signs of Infection</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="signs_of_infection" value="Erythema"> Erythema
                    </label>
                    <label>
                        <input type="radio" name="signs_of_infection" value="Purulent"> Purulent
                    </label>
                    <label>
                        <input type="radio" name="signs_of_infection" value="Odor"> Odor
                    </label>
                    <label>
                        <input type="radio" name="signs_of_infection" value="Swelling"> Swelling
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Last Dressing Change</label>
                <input type="datetime-local" name="last_dressing_change" class="form-control" id="">
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Aditional Notes</label>
                <textarea class="form-control" placeholder="Additional notes" name="additional_notes"></textarea>
            </div>
            <h4><i class="fas fa-walking"></i>Special Equipment</h4>
            
            <div class="form-group">
                <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" data-size="4" multiple name="special_equipment">
                    <option value="Oxygen Therapy (specify: nasal cannula, mask, high-flow)">Oxygen Therapy (specify: nasal cannula, mask, high-flow)</option>
                    <option value="CPAP/BiPAP">CPAP/BiPAP</option>
                    <option value="Mechanical Ventilator">Mechanical Ventilator</option>
                    <option value="Sequential Compression Devices (SCDs)">Sequential Compression Devices (SCDs)</option>
                    <option value="Mobility Aids (walker, wheelchair, cane)">Mobility Aids (walker, wheelchair, cane)</option>
                    <option value="Prosthetics">Prosthetics</option>
                    <option value="Telemetry Monitoring">Telemetry Monitoring</option>
                    <option value="Feeding Pump">Feeding Pump</option>
                    <option value="PCA Pump (Patient-Controlled Analgesia)">PCA Pump (Patient-Controlled Analgesia)</option>
                    <option value="BIPAP/CPAP">BIPAP/CPAP</option>
                    <option value="Orthotic Devices (e.g., braces, splints)">Orthotic Devices (e.g., braces, splints)</option>
                    <option value="Suction Equipment">Suction Equipment</option>
                </SearchableSelectField>
                <textarea class="form-control" placeholder="Additional notes" name="special_equipment_other"></textarea>
            </div>
            <h4><i class="fas fa-walking"></i>Additional Considerations</h4>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Infection Precautions</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="infection_precautions" value="Contact"> Contact
                    </label>
                    <label>
                        <input type="radio" name="infection_precautions" value="Droplet"> Droplet
                    </label>
                    <label>
                        <input type="radio" name="infection_precautions" value="Airborne"> Airborne
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Activity Restrictions</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="activity_restriction" value="Bedrest"> Bedrest
                    </label>
                    <label>
                        <input type="radio" name="activity_restriction" value="Ambulate with assist"> Ambulate with assist
                    </label>
                    <label>
                        <input type="radio" name="activity_restriction" value="Non-weight-bearing"> Non-weight-bearing
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i>Fall Precautions</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="fall_precaution" value="Bed alarm"> Bed alarm
                    </label>
                    <label>
                        <input type="radio" name="fall_precaution" value="Low bed"> Low bed
                    </label>
                    <label>
                        <input type="radio" name="fall_precaution" value="Assist x1"> Assist x1
                    </label>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </form>

        <div id="lab-results" class="section">
            <h2><i class="fas fa-pills"></i>Lab Results/Diagnostics</h2>
            <div class="form-group">
                <label>Pending Results | Critical Results | Imaging Studies</label>
                <div class="">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="form-control">
                                    <div>
                                        <ul id="all_lab_scan_requests_tp">
    
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Flagged</label>
                                <div class="form-control">
                                    
                                    <div id="investigation_dashboard_nurse_handoff">

                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
            
        </div>
        <form id="shift-summary" class="section">
            <h2><i class="fas fa-pills"></i>Shift Summary</h2>
            
            <div class="form-group">
                <label><i class="fas fa-walking"></i> Key Events in Current Shift</label>
                <textarea class="form-control" placeholder="Additional notes" name="key_events"></textarea>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i> Patient Response to Treatment</label>
                <textarea class="form-control" placeholder="Additional notes" name="patient_response_to_treatment"></textarea>
            </div>
            <div class="form-group">
                <label><i class="fas fa-walking"></i> Concerns or Escalation Needs</label>
                <textarea class="form-control" placeholder="Additional notes" name="concerns"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </form>

        <form id="plan-of-care" class="section">
            <h2><i class="fas fa-tasks"></i>Plan of Care</h2>
            <div class="form-group">
                <label>Immediate Tasks</label>
                <div class="form-control">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Checklist Options</label>
                                <div class="form-control">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="medication-administration" name="immediate_tasks[]" value="Medication Administration">
                                                <label class="form-check-label" for="medication-administration">Medication Administration (e.g., antibiotics, anticoagulants, pain management)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="lab-draws" name="immediate_tasks[]" value="Lab Draws">
                                                <label class="form-check-label" for="lab-draws">Lab Draws (e.g., CBC, electrolytes, blood cultures)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="wound-dressing-changes" name="immediate_tasks[]" value="Wound Dressing Changes">
                                                <label class="form-check-label" for="wound-dressing-changes">Wound Dressing Changes (specify type/time: ___________)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="vital-sign-monitoring" name="immediate_tasks[]" value="Vital Sign Monitoring">
                                                <label class="form-check-label" for="vital-sign-monitoring">Vital Sign Monitoring (e.g., q4h neuro checks, strict I&Os)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="imaging-studies" name="immediate_tasks[]" value="Imaging Studies">
                                                <label class="form-check-label" for="imaging-studies">Imaging Studies (e.g., chest X-ray, ultrasound)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="blood-transfusion" name="immediate_tasks[]" value="Blood Transfusion">
                                                <label class="form-check-label" for="blood-transfusion">Blood Transfusion</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="iv-fluid-management" name="immediate_tasks[]" value="IV Fluid Management">
                                                <label class="form-check-label" for="iv-fluid-management">IV Fluid Management (e.g., adjust rate per protocol)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="tube-feeds-flushes" name="immediate_tasks[]" value="Tube Feeds Flushes">
                                                <label class="form-check-label" for="tube-feeds-flushes">Tube Feeds/Flushes (e.g., NG tube, PEG tube)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="ambulation-pt-ot-sessions" name="immediate_tasks[]" value="Ambulation Pt Ot Sessions">
                                                <label class="form-check-label" for="ambulation-pt-ot-sessions">Ambulation/PT/OT Sessions</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="pre-procedure-prep" name="immediate_tasks[]" value="Pre Procedure Prep">
                                                <label class="form-check-label" for="pre-procedure-prep">Pre-procedure Prep (e.g., NPO after midnight, consent signed)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="patient-education" name="immediate_tasks[]" value="Patient Education">
                                                <label class="form-check-label" for="patient-education">Patient Education (e.g., insulin administration, fall precautions)</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Notes</label>
                                <textarea name="immediate_care_notes" class="form-control" placeholder="Include timeframes, flag urgent tasks"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Long-Term Goals</label>
                <textarea notes="long_term_goals" class="form-control" placeholder="Examples: Ambulate independently x3 daily with walker by discharge."></textarea>
            </div>
            <div class="form-group">
                <label>Anticipated Discharge Needs</label>
                <div class="form-control">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Dropdown Options</label>
                                <div class="form-control">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="home-health-services" name="anticipated_discharge_needs[]" value="home health services">
                                        <label class="form-check-label" for="home-health-services">Home Health Services (nursing, PT, wound care)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="skilled-nursing-facility" name="anticipated_discharge_needs[]" value="skilled nursing facility">
                                        <label class="form-check-label" for="skilled-nursing-facility">Skilled Nursing Facility (SNF) Placement</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="medical-equipment" name="anticipated_discharge_needs[]" value="medical equipment">
                                        <label class="form-check-label" for="medical-equipment">Medical Equipment (e.g., O2, walker, hospital bed)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="outpatient-follow-up" name="anticipated_discharge_needs[]" value="outpatient follow up">
                                        <label class="form-check-label" for="outpatient-follow-up">Outpatient Follow-Up (e.g., cardiology, wound clinic)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="pharmacy-coordination" name="anticipated_discharge_needs[]" value="pharmacy coordination">
                                        <label class="form-check-label" for="pharmacy-coordination">Pharmacy Coordination (e.g., specialty meds, prior auth)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="transportation-assistance" name="anticipated_discharge_needs[]" value="transportation assistance">
                                        <label class="form-check-label" for="transportation-assistance">Transportation Assistance</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="social-work-case-management" name="anticipated_discharge_needs[]" value="social work case management">
                                        <label class="form-check-label" for="social-work-case-management">Social Work/Case Management Involvement</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="family-caregiver-training" name="anticipated_discharge_needs[]" value="family caregiver training">
                                        <label class="form-check-label" for="family-caregiver-training">Family Caregiver Training</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="hospice-palliative-care-referral" name="anticipated_discharge_needs[]" value="hospice palliative care referral">
                                        <label class="form-check-label" for="hospice-palliative-care-referral">Hospice/Palliative Care Referral</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="other">Other: [Free-text]</label>
                                        <textarea class="form-control" id="other" name="discharge_needs_other"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Notes</label>
                                <textarea name="discharge_needs_notes" class="form-control" placeholder="Example: Pending SNF authorization; family assessing home safety for O2 use."></textarea>
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
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="pt-ot" name="pending_consults[]" value="PT OT">
                                                <label class="form-check-label" for="pt-ot">PT/OT</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="dietary" name="pending_consults[]" value="Dietary">
                                                <label class="form-check-label" for="dietary">Dietary</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="psychiatry" name="pending_consults[]" value="Psychiatry">
                                                <label class="form-check-label" for="psychiatry">Psychiatry</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="infectious-disease" name="pending_consults[]" value="Infectious Disease">
                                                <label class="form-check-label" for="infectious-disease">Infectious Disease</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Barriers to Discharge</label>
                                <textarea class="form-control" name="barriers_to_discharge" placeholder="Awaiting insurance approval for SNF"></textarea>
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
                                <div class="form-control">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" id="completed" name="education_status" value="completed">
                                                <label class="form-check-label" for="completed">Completed</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" id="pending" name="education_status" value="pending">
                                                <label class="form-check-label" for="pending">Pending</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Key Contacts</label>
                                <textarea class="form-control" name="patient_education" placeholder="Case manager: Jane Doe, ext. 1234"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </form>

        <form class="section" id="social-behavioral-factors">
            <h2>Social and Behavioral Factors</h2>
            <div class="form-control">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Family Involvement</label>
                            <SearchableSelectField class="form-control" name="family_involvement">
                                <option value="High">High (e.g., family at bedside daily, involved in decision-making)</option>
                                <option value="Moderate">Moderate (e.g., occasional visits, limited involvement)</option>
                                <option value="Low">Low (e.g., no family contact, patient declines family involvement)</option>
                            </SearchableSelectField>
                            <textarea class="form-control" placeholder="Eg. Spouse is primary contact; daughter visits evenings. Family requests updates via phone daily" name="family_involvement_details"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Communication Needs</label>
                            <label>
                                Language Barrier
                                <input class="form-control" type="text" name="communication_needs[]" value="" id="language_id" placeholder="Enter Details">
                            </label>
                            <label>
                                Hearing Impairment
                                <input class="form-control" type="text" name="communication_needs[]" value="" id="hearing_id" placeholder="Enter Details">
                            </label>
                            <label>
                                Vision Impairment
                                <input class="form-control" type="text" name="communication_needs[]" value="" id="vision_id" placeholder="Enter Details">
                            </label>
                            <label>
                                Speech Impairment
                                <input class="form-control" type="text" name="communication_needs[]" value="" id="speech_id" placeholder="Enter Details">
                            </label>
                            <label>
                                Cognitive/Literacy Limitations
                                <input class="form-control" type="text" name="communication_needs[]" value="" id="cognitive_id" placeholder="Enter Details">
                            </label>
                            <textarea class="form-control" placeholder="Example: Patient speaks Mandarin only—interpreter service used daily." name="other_communication_needs"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Behavioral Concerns</label>
                            <textarea name="behavioral_concerns" class="form-control" placeholder="Agitation at night; responds best to redirection and low lighting."></textarea>
                            <div class="checkbox-group">
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="Agitation"> Agitation</label>
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="Confusion"> Confusion</label>
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="Refusal of care"> Refusal of care</label>
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="Wandering"> Wandering</label>
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="Depression/Anxiety"> Depression/Anxiety</label>
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="Substance withdrawal"> Substance withdrawal</label>
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="Safety measures in place"> Safety measures in place (e.g., sitter, bed alarm)</label>
                                <label><input type="checkbox" name="behavioral_concerns_checklist[]" value="De-escalation techniques documented"> De-escalation techniques documented</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Additional Considerations</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Cultural/Religious Needs:</label>
                                    <textarea name="cultural_religious_needs" class="form-control" placeholder="Free-text, e.g., 'Requires Kosher meals; no blood products per beliefs'"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label>Substance Use:</label>
                                    <div class="checkbox-group">
                                        <label><input type="checkbox" name="substance_use[]" value="Active smoker"> Active smoker</label>
                                        <label><input type="checkbox" name="substance_use[]" value="Alcohol use"> Alcohol use</label>
                                        <label><input type="checkbox" name="substance_use[]" value="Recreational drug use"> Recreational drug use (specify: _______)</label>
                                        <label><input type="checkbox" name="substance_use[]" value="Withdrawal protocols in place"> Withdrawal protocols in place?</label>
                                    </div>
                                    <textarea class="form-control" name="substance_use_details" placeholder="Add Specifics Here"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Mental Health History:</label>
                                    <textarea class="form-control" name="mental_health_history" placeholder="Free-text, e.g., 'History of bipolar disorder; stable on lithium'"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label>Safety Alerts:</label>
                                    <div class="checkbox-group">
                                        <label><input type="checkbox" name="safety_alerts[]" value="Suicide precautions"> Suicide precautions</label>
                                        <label><input type="checkbox" name="safety_alerts[]" value="Elopement risk"> Elopement risk</label>
                                        <label><input type="checkbox" name="safety_alerts[]" value="Restraints"> Restraints </label>
                                    </div>
                                    <textarea class="form-control" name="safety_alerts_details" placeholder="Add Specifics Here"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group mt-2">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>
</div>

<!-- php: =$this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->
<script>

    $('#code_status_select').selectpicker('refresh');
    $('#lines_tubes_drains').selectpicker('refresh');
</script>

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
    var populateInvestigationDashboardItemsTp_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRelatedInvestigationTPDashboard', $patient->id, $selectedVisit->id]) -->\`

    function generateInvestigationItemTp(ele) {
        return \`
            <div class="test-item">
                <div class="test-header">
                    <p class="value">\${ele['name']}</p>
                </div>
                <div class="test-details" style="display: flex; justify-content: space-between;">
                    \${
                        ele.flagged ? ele.flagged.map(flag => 
                            \`<div>\${flag[0]}: <span class="badge badge-secondary">\${flag[1]}</span> <span class="badge badge-danger">\${flag[2]}</span></div>\`
                        ).join('') : ''
                    }
                </div>
            </div>
        \`
    }


    function populateInvestigationDashboardItemsTp() {
        $.ajax({
            type: 'GET',
            url: populateInvestigationDashboardItemsTp_link,
			data: {
				patient_id: patient_id,
				patient_visit_id: visit_id
			},
            cache: false,
            success: function (response){
                let result = ""
                response.forEach(ele => {
                    if (ele.flagged.length > 0) {
                        result += generateInvestigationItemTp(ele)
                    }
                });

                $('#investigation_dashboard_nurse_handoff').html('')
                $('#investigation_dashboard_nurse_handoff').html(result.length > 0 ? result : 'None')
			}
		})
    }

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
                    getNurseStationNotesView()
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
                    getNurseStationNotesView()
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
                    getNurseStationNotesView()
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
                    getNurseStationNotesView()
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
                    getNurseStationNotesView()
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
                    getNurseStationNotesView()
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
        formData['communication_needs'] = ['language_id','hearing_id','vision_id','speech_id','cognitive_id'].map(ele => {
            let res = {
                'language_id': "Language Barrier",
                'hearing_id': "Hearing Impairment",
                'vision_id': "Vision Impairment",
                'speech_id': "Speech Impairment",
                'cognitive_id': "Cognitive/Literacy Limitations",
            }[ele]

            if ($('#'+ele).val() != '') {
                
                return \`\${res}: \${$('#'+ele).val()}\`
            }
        }).join(';;');
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
                    getNurseStationNotesView()
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
    populateInvestigationDashboardItemsTp()
</script>
`;

export default function NurseStationNurseHandoffPage() {
  return (
    <PageShell title="NurseStation/nurse_handoff.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
