import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/view_patient.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dental Appointment Modal</title>
    <style>


        /* Modal Container */
        .dental-modal {
            background: white;
            border-radius: 12px;

            display: flex;
            position: relative;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            overflow: hidden;
        }

        .dental-modal .close-btn {
            position: absolute;
            top: 20px;
            right: 25px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #999;
            z-index: 10;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .dental-modal .close-btn:hover {
            background: #f5f5f5;
            color: #666;
        }

        /* Left Panel - Treatment Timeline */
        .dental-modal .modal-left {
            width: 45%;
            padding: 35px 30px;
            background: #fafbfc;

            overflow-y: auto;
        }

        /* Left Panel - Treatment Timeline */
        .dental-modal .modal-middle {
            display: flex;
            gap: 20px;
            flex-direction: column;
            align-items: center;
            width: 5%;
            background: #fafbfc;
            padding-top: 35px;

            overflow-y: auto;
        }

        .dental-modal .timeline-header {
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .dental-modal .timeline-header h2 {
            font-size: 22px;
            font-weight: 600;
            color: #2c3e50;
        }

        .dental-modal .timeline-arrow {
            color: #3498db;
            font-size: 20px;
        }

        /* Treatment Timeline */
        .dental-modal .treatment-timeline {
            position: relative;
        }

        .dental-modal .timeline-item {
            position: relative;
            padding-left: 80px;
            margin-bottom: 35px;
        }

        .dental-modal .timeline-item:last-child {
            margin-bottom: 0;
        }

        .dental-modal .timeline-date {
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            width: 60px;
        }

        .dental-modal .timeline-date .month {
            font-size: 11px;
            color: #7f8c8d;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .dental-modal .timeline-date .day {
            font-size: 24px;
            font-weight: 700;
            color: #2c3e50;
            line-height: 1;
            margin-top: 2px;
        }

        .dental-modal .timeline-dot {
            position: absolute;
            left: 65px;
            top: 12px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #3498db;
            border: 3px solid #fff;
            box-shadow: 0 0 0 2px #3498db;
        }

        .dental-modal .timeline-dot.done {
            background: #27ae60;
            box-shadow: 0 0 0 2px #27ae60;
        }

        .dental-modal .timeline-line {
            position: absolute;
            left: 71px;
            top: 26px;
            width: 2px;
            height: calc(100% + 10px);
            background: linear-gradient(to bottom, #e8ecef 0%, #e8ecef 100%);
        }

        .dental-modal .timeline-item:last-child .timeline-line {
            display: none;
        }

        .dental-modal .treatment-card {
            background: white;
            border-radius: 8px;
            padding: 22px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            border: 1px solid #f1f3f4;
            transition: all 0.2s;
        }

        .dental-modal .treatment-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
        }

        .dental-modal .treatment-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 18px;
        }

        .dental-modal .treatment-title-group {
            flex: 1;
        }

        .dental-modal .treatment-title {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 6px;
        }

        .dental-modal .treatment-type {
            background: #e3f2fd;
            color: #1565c0;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .dental-modal .treatment-progress {
            font-size: 12px;
            color: #7f8c8d;
            font-weight: 500;
        }

        .dental-modal .status-badge {
            padding: 6px 14px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
        }

        .dental-modal .status-upcoming {
            background: #fff3e0;
            color: #ef6c00;
        }

        .dental-modal .status-done {
            background: #e8f5e8;
            color: #2e7d32;
        }

        .dental-modal .treatment-details {
            font-size: 14px;
            color: #5d6d7e;
            line-height: 1.5;
            margin-bottom: 18px;
        }

        .dental-modal .treatment-details strong {
            color: #2c3e50;
            font-weight: 600;
        }

        .dental-modal .treatment-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .dental-modal .meta-item {
            font-size: 13px;
        }

        .dental-modal .meta-label {
            color: #7f8c8d;
            text-transform: uppercase;
            font-size: 10px;
            letter-spacing: 0.8px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .dental-modal .meta-value {
            color: #2c3e50;
            font-weight: 500;
            line-height: 1.3;
        }

        /* Right Panel - Patient Details */
        .dental-modal .modal-right {
            flex: 1;
            padding: 35px 30px;
            overflow-y: auto;
            background: white;
        }

        .dental-modal .patient-header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 25px;
            padding-bottom: 25px;
            border-bottom: 1px solid #f1f3f4;
        }

        .dental-modal .patient-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            /* border: 1px solid #d3d3d3; */
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 22px;
            flex-shrink: 0;
        }
        .dental-modal .middle-icons {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #D3D3D3;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 22px;
            flex-shrink: 0;
            cursor: pointer; /* show it's clickable */
            transition: background 0.3s, transform 0.2s;
        }

        .dental-modal .middle-icons.selected {
            background: #007bff; /* example selected color */
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
            transform: scale(1.1);
        }

        .dental-modal .middle-icons:not(.selected) {
            opacity: 0.6; /* dim unselected ones */
        }

        .dental-modal .patient-info {
            display: flex;
            align-items: center;
            flex: 1;
        }

        .dental-modal .patient-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
            font-size: 13px;
            color: #7f8c8d;
        }

        .dental-modal .patient-meta strong {
            color: #2c3e50;
            font-weight: 600;
        }

        .dental-modal .appointment-type {
            background: #fff3e0;
            color: #ef6c00;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .dental-modal .edit-icon {
            color: #3498db;
            cursor: pointer;
            font-size: 16px;
        }

        .dental-modal .patient-name {
            font-size: 24px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
        }

        .dental-modal .patient-status {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #7f8c8d;
        }

        .dental-modal .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #27ae60;
        }

        .dental-modal .patient-note {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 25px;
            font-style: italic;
            color: #6c757d;
            font-size: 14px;
            line-height: 1.5;
            position: relative;
        }

        .dental-modal .edit-note {
            position: absolute;
            top: 16px;
            right: 16px;
            color: #3498db;
            cursor: pointer;
            font-size: 14px;
            font-style: normal;
        }

        /* Appointment Card */
        .dental-modal .appointment-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid #e9ecef;
        }

        .dental-modal .appointment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .dental-modal .appointment-icon {
            font-size: 24px;
            color: #3498db;
        }

        .dental-modal .reminder-btn {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
        }

        .dental-modal .reminder-btn:hover {
            background: #ffeb9c;
            transform: translateY(-1px);
        }

        .dental-modal .appointment-details {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 25px;
            margin-bottom: 20px;
        }

        .dental-modal .detail-group h4 {
            font-size: 10px;
            text-transform: uppercase;
            color: #7f8c8d;
            letter-spacing: 0.8px;
            font-weight: 600;
            margin-bottom: 6px;
        }

        .dental-modal .detail-group p {
            font-size: 14px;
            color: #2c3e50;
            font-weight: 500;
            line-height: 1.4;
        }

        .dental-modal .payment-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .dental-modal .payment-info span {
            font-size: 14px;
            color: #2c3e50;
        }

        .dental-modal .payment-info strong {
            font-weight: 600;
        }

        .dental-modal .payment-status {
            background: #ffebee;
            color: #c62828;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        /* General Info */
        .dental-modal .general-info {
            background: white;
            border-radius: 10px;
            padding: 25px;
            border: 1px solid #f1f3f4;
        }

        .dental-modal .general-info h3 {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 25px;
        }

        .dental-modal .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px 25px;
        }

        .dental-modal .info-item {
            margin-bottom: 20px;
        }

        .dental-modal .info-label {
            font-size: 10px;
            text-transform: uppercase;
            color: #7f8c8d;
            letter-spacing: 0.8px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .dental-modal .info-value {
            font-size: 14px;
            color: #2c3e50;
            font-weight: 500;
            line-height: 1.4;
        }

        /* Action Buttons */
        .dental-modal .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 35px;
            padding-top: 25px;
            border-top: 1px solid #f1f3f4;
        }

        .dental-modal .btn {
            padding: 12px 28px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .dental-modal .btn-cancel {
            background: white;
            border: 2px solid #dee2e6;
            color: #6c757d;
        }

        .dental-modal .btn-cancel:hover {
            border-color: #adb5bd;
            color: #495057;
        }

        .dental-modal .btn-primary {
            background: #3498db;
            color: white;
        }

        .dental-modal .btn-primary:hover {
            background: #2980b9;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .dental-modal .modal {
                flex-direction: column;
                height: 95vh;
            }
            
            .dental-modal .modal-left {
                width: 100%;
                max-height: 40%;
            }
            
            .dental-modal .appointment-details {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .dental-modal .info-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="dental-modal">
        <button class="close-btn" onclick="closeModal()">×</button>
        
        <!-- Left Panel - Treatment Timeline -->
        <div class="modal-left">
            <div class="timeline-header">
                <h2 id="selectedIconHeading">Sessions</h2>
                <span class="timeline-arrow">→</span>
            </div>

            <div class="treatment-timeline">

                <!-- <div class="timeline-item">
                    <div class="timeline-date">
                        <div class="month">MAY</div>
                        <div class="day">08</div>
                    </div>
                    <div class="timeline-dot"></div>
                    <div class="timeline-line"></div>
                    
                    <div class="treatment-card">
                        <div class="treatment-header">
                            <div class="treatment-title-group">
                                <div class="treatment-title">
                                    Root Canal
                                    <span class="treatment-type">MULTIPLE</span>
                                </div>
                                <div class="treatment-progress">Total treatment: 3/4 visit</div>
                            </div>
                            <span class="status-badge status-upcoming">
                                ⏰ Upcoming
                            </span>
                        </div>

                        <div class="treatment-details">
                            <strong>Visit #4 - Root Canal Phase 4</strong><br>
                            ID reservation: <strong>#RSVA0014</strong>
                        </div>

                        <div class="treatment-meta">
                            <div class="meta-item">
                                <div class="meta-label">TIME</div>
                                <div class="meta-value">11:00 am - 02:00 pm</div>
                            </div>
                            <div class="meta-item">
                                <div class="meta-label">DENTIST</div>
                                <div class="meta-value">drg. Soap Mactavish, MM, SpKGA</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="timeline-item">
                    <div class="timeline-date">
                        <div class="month">MAY</div>
                        <div class="day">02</div>
                    </div>
                    <div class="timeline-dot done"></div>
                    <div class="timeline-line"></div>
                    
                    <div class="treatment-card">
                        <div class="treatment-header">
                            <div class="treatment-title-group">
                                <div class="treatment-title">Root Canal Phase 3</div>
                            </div>
                            <span class="status-badge status-done">
                                ✅ Done
                            </span>
                        </div>

                        <div class="treatment-details">
                            <strong>Visit #3 - Root Canal Phase 3</strong><br>
                            ID reservation: <strong>#RSVA0013</strong>
                        </div>

                        <div class="treatment-meta">
                            <div class="meta-item">
                                <div class="meta-label">TIME</div>
                                <div class="meta-value">11:00 am - 02:00 pm</div>
                            </div>
                            <div class="meta-item">
                                <div class="meta-label">DENTIST</div>
                                <div class="meta-value">drg. Soap Mactavish, MM, SpKGA</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="timeline-item">
                    <div class="timeline-date">
                        <div class="month">APR</div>
                        <div class="day">26</div>
                    </div>
                    <div class="timeline-dot done"></div>
                    <div class="timeline-line"></div>
                    
                    <div class="treatment-card">
                        <div class="treatment-header">
                            <div class="treatment-title-group">
                                <div class="treatment-title">
                                    Single Tooth Scaling
                                    <span class="treatment-type">SINGLE</span>
                                </div>
                            </div>
                            <span class="status-badge status-done">
                                ✅ Done
                            </span>
                        </div>

                        <div class="treatment-details">
                            ID reservation: <strong>#RSVA015</strong>
                        </div>

                        <div class="treatment-meta">
                            <div class="meta-item">
                                <div class="meta-label">TIME</div>
                                <div class="meta-value">11:00 am - 02:00 pm</div>
                            </div>
                            <div class="meta-item">
                                <div class="meta-label">DENTIST</div>
                                <div class="meta-value">drg. Soap Mactavish, MM, SpKGA</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="timeline-item">
                    <div class="timeline-date">
                        <div class="month">APR</div>
                        <div class="day">22</div>
                    </div>
                    <div class="timeline-dot done"></div>
                    
                    <div class="treatment-card">
                        <div class="treatment-header">
                            <div class="treatment-title-group">
                                <div class="treatment-title">
                                    Root Canal
                                    <span class="treatment-type">MULTIPLE</span>
                                </div>
                                <div class="treatment-progress">Total treatment: 2/4 visit</div>
                            </div>
                            <span class="status-badge status-done">
                                ✅ Done
                            </span>
                        </div>

                        <div class="treatment-details">
                            <strong>Visit #2 - Root Canal Phase 2</strong><br>
                            ID reservation: <strong>#RSVA0012</strong>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="modal-middle">
            <div class="middle-icons selected" id="middle-sessions" onclick="fetchPatientSessions('sessions')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
            </div>
            <div class="middle-icons" id="middle-labs" onclick="fetchPatientRequestLabs('labs')">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#434343"><path d="M230-120q-13 0-21.5-8.5T200-150q0-13 8.5-21.5T230-180h178v-104h-15q-81 0-137-56t-56-137q0-61 35-111t92-70q-2 15 .5 30t9.5 29q-37 14-57 48t-20 74q0 55 39 94t94 39h317q13 0 21.5 8.5T740-314q0 13-8.5 21.5T710-284H508v104h222q13 0 21.5 8.5T760-150q0 13-8.5 21.5T730-120H230Zm338-398-2-6-15 5q-12 5-22.5 0T513-536l-15-40q14-14 21-31.5t7-37.5q0-39-26-67.5T435-745l-11-31q-5-12 0-22.5t17-15.5l13-5-1-4q-5-14 .5-27t19.5-18q14-5 27 .5t18 19.5l2 5 12-4q11-4 22 1t16 16l92 239q5 12-.5 23T644-552l-14 5 2 5q5 14-1 26.5T611-498q-13 5-25.5-1T568-518Zm-142-77q-21 0-35.5-14.5T376-645q0-21 14.5-35.5T426-695q21 0 35.5 14.5T476-645q0 21-14.5 35.5T426-595Z"/></svg>
            </div>
            <div class="middle-icons" id="middle-radiology" onclick="fetchPatientRequestRadiology('radiology')">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#434343"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-28q0-14 9-23t23-9q14 0 23.5 9t9.5 23v28h340v-28q0-14 9-23t23-9q14 0 23.5 9t9.5 23v28h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm210-60q13 0 21.5-8.5T420-170v-73q0-6-7-19l-80-94q-7-8-10-17t-3-18q11 5 22.5 7.5T366-381q20 0 39.5-8t34.5-24q8-8 18.5-12t21.5-4q12 0 22.5 4t17.5 12q15 16 35 24t40 8q12 0 23-2.5t22-7.5q0 9-3 18t-10 17l-80 94q-3 5-5 9.5t-2 9.5v73q0 13 8.5 21.5T570-140q13 0 21.5-8.5T600-170v-62l72-84q11-11 19.5-30t8.5-44q0-13-3-25.5t-9-24.5q5-11 8.5-23.5T700-489q0-20-6.5-38.5T673-562l-73-86v-82q0-13-8.5-21.5T570-760q-13 0-21.5 8.5T540-730v93q0 5 1.5 10t5.5 9l80 95q6 8 9.5 16.5T640-489q0 19-13 33.5T594-441q-8 0-16-3t-15-10q-17-17-38.5-26t-44.5-9q-23 0-44.5 9T397-454q-6 7-14 10t-17 3q-20 0-33-14.5T320-490q0-9 3-17.5t10-16.5l80-94q3-5 5-9.5t2-9.5v-93q0-13-8.5-21.5T390-760q-13 0-21.5 8.5T360-730v82l-72 84q-11 11-19.5 30t-8.5 44q0 14 3 26.5t8 23.5q-6 12-8.5 24.5T260-390q0 25 8.5 44t19.5 30l72 84v62q0 13 8.5 21.5T390-140Z"/></svg>
            </div>
            <div class="middle-icons" id="middle-medications" onclick="fetchPatientMedications('medications')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M183-120q-31.15 0-48.57-25Q117-170 127-199l80-236-80-236q-10-29 7.43-54 17.42-25 48.57-25h464l49-135q5-14 19.5-20.5t28.5-1q14 5.5 20 19t1 27.5l-40 110h52q31.15 0 48.57 25.5Q843-699 833-670l-81 235 81 235q10 29-7.43 54.5Q808.15-120 777-120H183Zm269-161h60v-124h124v-60H512v-124h-60v124H328v60h124v124ZM182-180h596l-88-255 88-255H182l88 255-88 255Zm0 0 88-255-88-255h596l-88 255 88 255H182Z"/></svg>
            </div>
        </div>

        <!-- Right Panel - Patient Details -->
        <div class="modal-right">
            <div class="patient-header">
                <div class="patient-info">
                    <div class="patient-avatar">
    
                        <!-- php: echo $this->Html->image((isset($patient->image) ? $patient->image->file_path : (($patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg')),['class' =>'img-responsive', 'style' => 'height: 40px']); -->
                    </div>
                    <h3 class="patient-name"><!-- php: = $patient->full_name --></h3>
                    <!-- <div class="patient-status">
                        <span class="status-indicator"></span>
                        <span><strong><!-- php: // $patie --></strong></span>
                    </div> -->
                </div>
                <div class="patient-meta">
                    Folder: <strong>#<!-- php: = $patient->folder_number --></strong>
                    <!-- <span class="appointment-type">MANUAL APPOINTMENT</span> -->
                </div>
            </div>

            <!-- <div class="appointment-card">
                <div class="appointment-header">
                    <span class="appointment-icon">📋</span>
                    <button class="reminder-btn">
                        🔔 Send Reminder
                    </button>
                </div>

                <div class="appointment-details">
                    <div class="detail-group">
                        <h4>TREATMENT</h4>
                        <p>General Checkup</p>
                    </div>
                    <div class="detail-group">
                        <h4>DATE AND TIME</h4>
                        <p>Wed, 24 Jun<br>10:00-11:00 AM</p>
                    </div>
                    <div class="detail-group">
                        <h4>DENTIST</h4>
                        <p>Drg Soap Mactavish</p>
                    </div>
                </div>

                <div class="payment-info">
                    <span>Payment: <strong>Bill #10102</strong></span>
                    <span class="payment-status">UNPAID</span>
                </div>
            </div> -->

            <div class="general-info">
                <h3>General Info</h3>
                
                <div class="info-grid">
                    <div>
                        <div class="info-item">
                            <div class="info-label">FULL NAME</div>
                            <div class="info-value"><!-- php: = $patient->full_name --></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Folder Number</div>
                            <div class="info-value"><!-- php: = $patient->folder_number --></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">AGE</div>
                            <div class="info-value"><!-- php: = $patient->patient_age --></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">GENDER</div>
                            <div class="info-value"><!-- php: = $patient->gender->name --></div>
                        </div>
                    </div>
                    <div>
                        <div class="info-item">
                            <div class="info-label">PHONE NUMBER</div>
                            <div class="info-value"><!-- php: = $patient->phone --></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">EMAIL</div>
                            <div class="info-value"><!-- php: = $patient->email --></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">ADDRESS</div>
                            <div class="info-value"><!-- php: = $patient->home_address --></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="action-buttons">
                <!-- <button class="btn btn-cancel" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary">Reschedule</button>
            </div> -->
        </div>
    </div>

    <script>
        function closeModal() {
            // In a real application, this would close the modal
            console.log('Modal would be closed');
            alert('Modal close functionality would be implemented here');
        }

        // Interactive elements
        // document.querySelector('.dental-modal .reminder-btn').addEventListener('click', function() {
        //     alert('Reminder sent to patient!');
        // });


        // Treatment card hover effects
        document.querySelectorAll('.dental-modal .treatment-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        function fetchPatientSessions() {

            $.ajax({
                type: 'GET',
                url: '<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'setupPatientPlanner']) -->/<!-- php: = $patient->id -->',
                cache: false,
                beforeSend: function () {
                    $('#selectedIconHeading').html('Sessions');
                    $('.middle-icons').removeClass('selected');
                    $('#middle-sessions').addClass('selected');
                    $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">Loading sessions...</div>');
                },
                success: function (response) {
                    var sessions = [];
                    try {
                        sessions = response['task'];
                        // Sort sessions by start date ascending
                        sessions.sort(function(a, b) {
                            return new Date(b.start) - new Date(a.start);
                        });
                    } catch (e) {
                        console.error(e)
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;color:red;">Failed to load sessions.</div>');
                        return;
                    }

                    if (!sessions.length) {
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">No sessions found.</div>');
                        return;
                    }

                    var html = '';
                    sessions.forEach(function(session, idx) {
                        // Parse date
                        var dateObj = new Date(session.start);
                        var month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                        var day = ('0' + dateObj.getDate()).slice(-2);

                        // Status and dot
                        var isUpcoming = session.due_days >= 0;
                        var dotClass = isUpcoming ? '' : 'done';
                        var statusBadge = isUpcoming
                            ? '<span class="status-badge status-upcoming">⏰ Upcoming</span>'
                            : session.visit_id ? '<span class="status-badge status-done">✅ Done</span>' : '<span class="status-badge status-upcoming">🛑 Overdue</span>';

                        // Timeline line (hide for last item)
                        var timelineLine = (idx < sessions.length - 1) ? '<div class="timeline-line"></div>' : '';

                        html += \`
                        <div class="timeline-item">
                            <div class="timeline-date">
                                <div class="month">\${month}</div>
                                <div class="day">\${day}</div>
                            </div>
                            <div class="timeline-dot \${dotClass}"></div>
                            \${timelineLine}
                            <div class="treatment-card">
                                <div class="treatment-header">
                                    <div class="treatment-title-group">
                                        <div class="treatment-title">
                                            \${session.specialty || 'Session'}
                                            <span class="treatment-type">\${session.type ? session.type.toUpperCase() : ''}</span>
                                        </div>
                                        <div class="treatment-progress">\${session.details || ''}</div>
                                    </div>
                                    \${statusBadge}
                                </div>
                                <div class="treatment-details">
                                    <strong>\${session.title || ''}</strong><br>
                                    ID reservation: <strong>\${session.single_id || ''}</strong>
                                </div>
                                <div class="treatment-meta">
                                    <div class="meta-item">
                                        <div class="meta-label">TIME</div>
                                        <div class="meta-value">\${'All Day' || dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                    <div class="meta-item">
                                        <div class="meta-label">Assigned Doctor</div>
                                        <div class="meta-value">\${session.assigned_user || ''}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        \`;
                    });

                    $('.treatment-timeline').html(html);
                    
                    console.log('success')
                }
            });
        }

        function fetchPatientRequestLabs() {
            $.ajax({
                type: 'GET',
                url: '<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'patientRequestLabs']) -->/<!-- php: = $patient->id -->',
                cache: false,
                beforeSend: function () {
                    $('#selectedIconHeading').html('Requested Labs');
                    $('.middle-icons').removeClass('selected');
                    $('#middle-labs').addClass('selected');
                    $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">Loading lab requests...</div>');
                },
                success: function (response) {
                    let labs = [];
                    try {
                        labs = response;
                        // Sort labs by creation date (descending)
                        labs.sort(function(a, b) {
                            return new Date(b.date_created) - new Date(a.date_created);
                        });
                    } catch (e) {
                        console.error(e);
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;color:red;">Failed to load lab requests.</div>');
                        return;
                    }

                    if (!labs.length) {
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">No lab requests found.</div>');
                        return;
                    }

                    let html = '';
                    labs.forEach(function(lab, idx) {
                        // Date formatting
                        const dateObj = new Date(lab.date_created);
                        const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                        const day = ('0' + dateObj.getDate()).slice(-2);

                        // Determine status
                        const statusName = lab.status?.name || 'Pending';
                        const statusBadge = \`<span class="status-badge">\${statusName}</span>\`;

                        // Timeline line
                        const timelineLine = (idx < labs.length - 1) ? '<div class="timeline-line"></div>' : '';

                        html += \`
                        <div class="timeline-item">
                            <div class="timeline-date">
                                <div class="month">\${month}</div>
                                <div class="day">\${day}</div>
                            </div>
                            <div class="timeline-dot"></div>
                            \${timelineLine}
                            <div class="treatment-card">
                                <div class="treatment-header">
                                    <div class="treatment-title-group">
                                        <div class="treatment-title">
                                            \${lab.investigation?.name || 'Lab Request'}
                                            <span class="treatment-type">\${lab.priority?.name || ''}</span>
                                        </div>
                                        <div class="treatment-progress">\${lab.specimen_type?.name || ''}</div>
                                    </div>
                                    \${statusBadge}
                                </div>
                                <div class="treatment-details">
                                    <strong>\${lab.lab_test?.name || ''}</strong><br>
                                    Specimen Source: <strong>\${lab.specimen_source?.name || ''}</strong>
                                </div>
                                <div class="treatment-meta">
                                    <div class="meta-item">
                                        <div class="meta-label">REQUESTED BY</div>
                                        <div class="meta-value">\${lab.user.first_name || ''}</div>
                                    </div>
                                    <div class="meta-item">
                                        <div class="meta-label">TIME</div>
                                        <div class="meta-value">\${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        \`;
                    });

                    $('.treatment-timeline').html(html);
                    console.log('Lab requests loaded');
                }
            });
        }

        function fetchPatientRequestRadiology() {
            $.ajax({
                type: 'GET',
                url: '<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'patientRequestRadiology']) -->/<!-- php: = $patient->id -->',
                cache: false,
                beforeSend: function () {
                    $('#selectedIconHeading').html('Requested Radiology');
                    $('.middle-icons').removeClass('selected');
                    $('#middle-radiology').addClass('selected');
                    $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">Loading radiology requests...</div>');
                },
                success: function (response) {
                    let radiologyRequests = [];
                    try {
                        radiologyRequests = response;
                        // Sort by created date descending
                        radiologyRequests.sort(function(a, b) {
                            return new Date(b.date_created) - new Date(a.date_created);
                        });
                    } catch (e) {
                        console.error(e);
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;color:red;">Failed to load radiology requests.</div>');
                        return;
                    }

                    if (!radiologyRequests.length) {
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">No radiology requests found.</div>');
                        return;
                    }

                    let html = '';
                    radiologyRequests.forEach(function(request, idx) {
                        // Date formatting
                        const dateObj = new Date(request.date_created);
                        const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                        const day = ('0' + dateObj.getDate()).slice(-2);

                        // Status badge
                        const statusName = request.status?.name || 'Pending';
                        const statusBadge = \`<span class="status-badge">\${statusName}</span>\`;

                        // Timeline line
                        const timelineLine = (idx < radiologyRequests.length - 1) ? '<div class="timeline-line"></div>' : '';

                        html += \`
                        <div class="timeline-item">
                            <div class="timeline-date">
                                <div class="month">\${month}</div>
                                <div class="day">\${day}</div>
                            </div>
                            <div class="timeline-dot"></div>
                            \${timelineLine}
                            <div class="treatment-card">
                                <div class="treatment-header">
                                    <div class="treatment-title-group">
                                        <div class="treatment-title">
                                            \${request.radiology_category?.name || 'Radiology Request'}
                                            <span class="treatment-type">\${request.priority?.name || ''}</span>
                                        </div>
                                        <div class="treatment-progress">\${request.radiology_scan?.name || ''}</div>
                                    </div>
                                    \${statusBadge}
                                </div>
                                <div class="treatment-details">
                                    <strong>Scan Result:</strong> \${request.radiology_scan_result?.result_text || 'Not available'}
                                </div>
                                <div class="treatment-meta">
                                    <div class="meta-item">
                                        <div class="meta-label">REQUESTED BY</div>
                                        <div class="meta-value">\${request.user?.first_name || ''}</div>
                                    </div>
                                    <div class="meta-item">
                                        <div class="meta-label">TIME</div>
                                        <div class="meta-value">\${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        \`;
                    });

                    $('.treatment-timeline').html(html);
                    console.log('Radiology requests loaded');
                }
            });
        }

        function fetchPatientMedications() {
            $.ajax({
                type: 'GET',
                url: '<!-- php: = $this->Url->build(["controller" => "PatientVisits", "action" => "patientMedications"]) -->/<!-- php: = $patient->id -->',
                cache: false,
                beforeSend: function () {
                    $('#selectedIconHeading').html('Medications');
                    $('.middle-icons').removeClass('selected');
                    $('#middle-medications').addClass('selected');
                    $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">Loading medications...</div>');
                },
                success: function (response) {
                    let allMeds = [];

                    try {
                        // Tag each array with its type
                        const prescriptions = (response.requestPrescriptions || []).map(m => ({ ...m, medType: 'Prescription' }));
                        const infusions = (response.requestInfusions || []).map(m => ({ ...m, medType: 'Infusion' }));
                        const transfusions = (response.requestTransfusions || []).map(m => ({ ...m, medType: 'Transfusion' }));

                        // Merge arrays into one
                        allMeds = [...prescriptions, ...infusions, ...transfusions];

                        // Sort by created date descending
                        allMeds.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

                    } catch (e) {
                        console.error(e);
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;color:red;">Failed to load medications.</div>');
                        return;
                    }

                    if (!allMeds.length) {
                        $('.treatment-timeline').html('<div style="padding:30px;text-align:center;">No medications found.</div>');
                        return;
                    }

                    let html = '';
                    allMeds.forEach((med, idx) => {
                        const dateObj = new Date(med.date_created);
                        const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                        const day = ('0' + dateObj.getDate()).slice(-2);

                        const statusName = med.status?.name || 'Pending';
                        const statusBadge = \`<span class="status-badge">\${statusName}</span>\`;

                        const timelineLine = (idx < allMeds.length - 1) ? '<div class="timeline-line"></div>' : '';

                        html += \`
                        <div class="timeline-item">
                            <div class="timeline-date">
                                <div class="month">\${month}</div>
                                <div class="day">\${day}</div>
                            </div>
                            <div class="timeline-dot"></div>
                            \${timelineLine}
                            <div class="treatment-card">
                                <div class="treatment-header">
                                    <div class="treatment-title-group">
                                        <div class="treatment-title">
                                            \${med.drug_stock?.drug?.name || med.drug_stock?.infusion?.name || 'Medication'}
                                            <span class="treatment-type">\${med.medType}</span>
                                        </div>
                                        <div class="treatment-progress">
                                            \${med.dosage_form?.name || ''} 
                                            \${med.dose ? \`- \${med.dose}\` : ''}
                                        </div>
                                    </div>
                                    \${statusBadge}
                                </div>
                                <div class="treatment-details">
                                    <strong>Frequency:</strong> \${med.drug_administration_frequency?.name || ''} <br>
                                    <strong class="d-none">Quantity:</strong> \${'' || med.quantity || ''}
                                </div>
                                <div class="treatment-meta">
                                    <div class="meta-item">
                                        <div class="meta-label">REQUESTED BY</div>
                                        <div class="meta-value">\${med.user?.first_name || ''}</div>
                                    </div>
                                    <div class="meta-item">
                                        <div class="meta-label">TIME</div>
                                        <div class="meta-value">\${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        \`;
                    });

                    $('.treatment-timeline').html(html);
                    console.log('Medications loaded');
                }
            });
        }


        fetchPatientSessions('sessions');
    </script>
</body>
</html>
`;

export default function PatientVisitsViewPatientPage() {
  return (
    <PageShell title="PatientVisits/view_patient.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
