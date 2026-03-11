const rawHtml = `
<style>
    .work-order-checkbox-label.mbsc-checkbox {
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .lightblue {
        background-color: #51aff124;
    }

    .panel-title:after {
        font-family: FontAwesome;
        content: "\f107";
        float: right;
        color: grey;
        font-size: 16px;
    }

    .panel-title[aria-expanded="true"]:after {
        content: "\f106";
    }

    .black_button {
        color:white;
        background: #6c757d;
    }
    .white_button {
        color:black;
        background: white;
    }

    .conflict-viewer {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .conflict-viewer h1 {
        color: #333;
        margin-bottom: 24px;
        font-size: 24px;
        font-weight: 600;
    }

    .conflict-group {
        border: 1px solid #e74c3c;
        border-radius: 6px;
        margin-bottom: 20px;
        background: #fff;
    }

    .conflict-header {
        background: #e74c3c;
        color: white;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .conflict-date {
        font-weight: 600;
        font-size: 16px;
    }

    .conflict-time {
        background: rgba(255,255,255,0.2);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 14px;
    }

    .tasks-list {
        padding: 16px;
    }

    .task-item {
        background: #f8f9fa;
        border-radius: 4px;
        padding: 12px;
        margin-bottom: 8px;
        border-left: 4px solid;
    }

    .task-item:last-child {
        margin-bottom: 0;
    }

    .task-title {
        font-weight: 600;
        margin-bottom: 4px;
    }

    .task-details {
        font-size: 14px;
        color: #666;
    }

    .task-time {
        font-size: 12px;
        color: #888;
        margin-top: 4px;
    }
</style>

<!-- php: function isDateLate($date, $format = 'Y-m-d') { $date = new DateTime($date); $date->setTime(0, 0); $currentDate = new DateTime(); $currentDate->setTime(0, 0); if ($date < $currentDate) { return true; } else { return false; } } -->
<div>


    <div class="card-body row">

        <!--Filter -->
        <div class="col-md-2" style="">
            <div style="
            font-size: 11px !important;
            color: #fff;
            -webkit-border-radius: 12px !important;
            -moz-border-radius: 12px!important;
            border-radius: 12px !important;
            text-shadow: none !important;
            text-align: center;
            " class="badge-rounded badge-warning">
                <div style="
                    font-size: 13px;

                    font-weight: 600;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                ">Active <br> Records</div>
                
                <div style="
                    font-size: 32px;
                    font-weight: 800;
                    color: #111827;
                    letter-spacing: -0.5px;
                ">
                    <span id="total_pending_tasks">0</span>
                </div>
            </div>

        </div>
        <div class="col-md-2" style="">
            <div style="
            font-size: 11px !important;
            color: #fff;
            -webkit-border-radius: 12px !important;
            -moz-border-radius: 12px!important;
            border-radius: 12px !important;
            text-shadow: none !important;
            text-align: center;
            " class="badge-rounded badge-warning">
                <div style="
                    font-size: 13px;

                    font-weight: 600;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                ">Week <br> Sessions</div>
                
                <div style="
                    font-size: 32px;
                    font-weight: 800;
                    color: #111827;
                    letter-spacing: -0.5px;
                ">
                    <span id="total_pending_week">0</span>
                </div>
            </div>

        </div>
        <div class="col-md-2" style="">
            <div style="
            font-size: 11px !important;
            color: #fff;
            -webkit-border-radius: 12px !important;
            -moz-border-radius: 12px!important;
            border-radius: 12px !important;
            text-shadow: none !important;
            text-align: center;
            " class="badge-rounded badge-warning">
                <div style="
                    font-size: 13px;

                    font-weight: 600;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                ">Completion <br> Rate</div>
                
                <div style="
                    font-size: 32px;
                    font-weight: 800;
                    color: #111827;
                    letter-spacing: -0.5px;
                ">
                    <span id="total_completion_rate">0</span>
                </div>
            </div>

        </div>
        <div class="col-md-2" style="">
            <div style="
            font-size: 11px !important;
            color: #fff;
            -webkit-border-radius: 12px !important;
            -moz-border-radius: 12px!important;
            border-radius: 12px !important;
            text-shadow: none !important;
            text-align: center;
            " class="badge-rounded badge-danger">
                <div style="
                    font-size: 13px;

                    font-weight: 600;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                ">
                    Conflicts
                    <br>
                    <span style="text-decoration: underline; color: #007bff; cursor: pointer" data-toggle="modal" data-target="#conflictReviewModal" class="review">review</span>
                </div>
                
                <div style="
                    font-size: 32px;
                    font-weight: 800;
                    color: #111827;
                    letter-spacing: -0.5px;
                ">
                    <span id="total_conflicts_tasks">0</span>
                </div>
            </div>

        </div>


    </div>

    <div class="card-body">
        <div class="row">
            <div class="filter-group">
                <label>Type:</label>
                <SearchableSelectField onchange="filterOptionsCalendar()" id="bundletypefilter" class="selectpicker form-control" data-size="5" data-live-search="true">

                </SearchableSelectField>
            </div>
            <div class="filter-group">
                <label>Doctor:</label>
                <SearchableSelectField onchange="filterOptionsCalendar()" id="doctorfilter" class="selectpicker form-control" data-size="5" data-live-search="true">

                </SearchableSelectField>
            </div>
            <div class="filter-group">
                <label>Patients:</label>
                <SearchableSelectField onchange="filterOptionsCalendar()" id="patientfilter" class="selectpicker form-control" data-size="5" data-live-search="true">

                </SearchableSelectField>
            </div>
        </div>
    </div>
    <div class="card-body p-2">
        <div id="demo-work-order-scheduling"></div>




    </div>

        <!--Update Surgery Task Modal -->
    <!-- Booking Modal -->
    <div class="modal fade" id="conflictReviewModal" tabindex="-1" aria-labelledby="conflictReviewLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div id="conflicts-container">

                </div>
            </div>
        </div>
    </div>
    <!-- Booking Modal -->
    <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
        <div class="modal-header">
            <h5 class="modal-title" id="bookingModalLabel">Appointment Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
            <div id="modal" class="bookingModal">


                <!-- Patient and Provider Info -->
                <div style="
                    padding: 24px;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                ">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                        <!-- Patient Info -->
                        <div>
                            <div style="
                                display: flex;
                                align-items: center;
                                margin-bottom: 12px;
                            ">
                                <div style="
                                    width: 8px;
                                    height: 8px;
                                    background: #10b981;
                                    border-radius: 50%;
                                    margin-right: 8px;
                                "></div>
                                <span style="
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: #374151;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                ">Patient</span>
                            </div>
                            <div style="
                                font-size: 18px;
                                font-weight: 700;
                                color: #111827;
                                margin-bottom: 4px;
                            " id="patientName"></div>
                            <div style="
                                font-size: 14px;
                                color: #6b7280;
                                margin-bottom: 2px;
                            ">Folder Number: <span style="font-weight: 600;" id="folderNumber"></span></div>
                            <div style="
                                font-size: 14px;
                                color: #6b7280;
                                margin-bottom: 2px;
                            ">Booking Code: <span style="font-weight: 600; color: #059669;" id="bookingCode"></span></div>
                            <div style="
                                font-size: 14px;
                                color: #6b7280;
                            ">Contact: <span style="font-weight: 600;" id="patientPhone"></span></div>
                            <div style="
                                font-size: 14px;
                                color: #111827;
                            ">Email: <span style="font-weight: 600;" id="patientEmail">wolanyoyawa@gmail.com</span></div>
                        </div>
                        
                        <!-- Provider Info -->
                        <div>
                            <div style="
                                display: flex;
                                align-items: center;
                                margin-bottom: 12px;
                            ">
                                <div style="
                                    width: 8px;
                                    height: 8px;
                                    background: #3b82f6;
                                    border-radius: 50%;
                                    margin-right: 8px;
                                "></div>
                                <span style="
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: #374151;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                ">Provider</span>
                            </div>
                            <div style="
                                font-size: 18px;
                                font-weight: 700;
                                color: #111827;
                                margin-bottom: 4px;
                            " id="providerName"></div>
                            <div style="
                                font-size: 14px;
                                color: #6b7280;
                                margin-bottom: 2px;
                            ">Specialty: <span style="font-weight: 600;" id="specialty"></span></div>
                            <!-- <div style="
                                font-size: 14px;
                                color: #6b7280;
                            ">Email: <span style="font-weight: 600;" id="providerEmail">enochscoffield90@</span></div> -->
                        </div>
                    </div>
                </div>
                
                <!-- Appointment Details -->
                <div style="
                    padding: 24px;
                    border-bottom: 1px solid #e2e8f0;
                ">
                    <h3 style="
                        font-size: 18px;
                        font-weight: 700;
                        color: #111827;
                        margin-bottom: 16px;
                        display: flex;
                        align-items: center;
                    ">
                        <div style="
                            width: 6px;
                            height: 6px;
                            background: #f59e0b;
                            border-radius: 50%;
                            margin-right: 8px;
                        "></div>
                        Appointment Details
                    </h3>
                    
                    <div style="
                        background: #eff6ff;
                        border: 1px solid #bfdbfe;
                        border-radius: 12px;
                        padding: 20px;
                    ">
                        <div style="
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                            gap: 16px;
                        ">
                            <div>
                                <div style="
                                    font-size: 12px;
                                    font-weight: 600;
                                    color: #1e40af;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    margin-bottom: 4px;
                                ">Date & Day</div>
                                <div style="
                                    font-size: 16px;
                                    font-weight: 600;
                                    color: #111827;
                                " id="appointmentDate"></div>
                            </div>
                            
                            <div>
                                <div style="
                                    font-size: 12px;
                                    font-weight: 600;
                                    color: #1e40af;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    margin-bottom: 4px;
                                ">Time</div>
                                <div style="
                                    font-size: 16px;
                                    font-weight: 600;
                                    color: #111827;
                                " id="appointmentTime"></div>
                            </div>
                            
                            <div>
                                <div style="
                                    font-size: 12px;
                                    font-weight: 600;
                                    color: #1e40af;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    margin-bottom: 4px;
                                ">Type</div>
                                <div style="
                                    display: inline-block;
                                    background: #059669;
                                    color: white;
                                    padding: 4px 12px;
                                    border-radius: 20px;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                " id="appointmentType"></div>
                            </div>
                            
                            <div>
                                <div style="
                                    font-size: 12px;
                                    font-weight: 600;
                                    color: #1e40af;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    margin-bottom: 4px;
                                ">Status</div>
                                <div style="
                                    display: inline-block;
                                    background: #fbbf24;
                                    color: white;
                                    padding: 4px 12px;
                                    border-radius: 20px;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                " id="appointmentStatus"></div>
                            </div>

                            <div>
                                <div style="
                                    font-size: 12px;
                                    font-weight: 600;
                                    color: #1e40af;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    margin-bottom: 4px;
                                ">Visit Status</div>
                                <div style="
                                    display: inline-block;
                                    background: #dc2626;
                                    color: white;
                                    padding: 4px 12px;
                                    border-radius: 20px;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                " class="userhasanactivevisit">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div id="booking_cancel_routine" style="display: none; max-width: 800px; width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
                    <!-- Header -->
                    <div style="background: #dc2626; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
                        <h4 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">Are you sure you want to cancel Booking?</h4>
                        <button onclick="cancelBookingCare('booking_cancel_routine')" style="background: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #dc2626; font-size: 18px;">
                            <i class="">X</i>
                        </button>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 24px;">
                        <!-- Warning message -->
                        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px; display: flex; align-items: flex-start;">

                            <p style="color: #7f1d1d; margin: 0; font-weight: 500;">This booking will be cancelled and cannot be undone</p>
                        </div>
                        
                        <!-- Cancellation Form -->
                        <form id="cancelRoutineCareForm">
                            <input type="hidden" name="id" class="booking_record_id">
                            <!-- Notification Options -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 12px;">Inform Patient of Cancellation?</label>
                                <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                                    <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="email" style="margin-right: 8px;">
                                        Email
                                    </label>
                                    <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="sms" style="margin-right: 8px;">
                                        SMS
                                    </label>
                                    <!-- <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="autocall" style="margin-right: 8px;">
                                        Autocall
                                    </label> -->
                                    <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="none" style="margin-right: 8px;">
                                        None
                                    </label>
                                </div>
                            </div>
                            
                            <!-- Reason Input -->
                            <div style="display: flex; align-items: center; margin-bottom: 24px;">
                                <label for="cancellation_reason" style="font-weight: 600; color: #374151; width: 120px; text-align: right; padding-right: 16px;">Reason:</label>
                                <input type="text" name="reason" id="cancellation_reason" style="flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" placeholder="Enter cancellation reason">
                            </div>
                            
                            <!-- Action Buttons -->
                            <div style="display: flex; justify-content: flex-end; gap: 12px;">
                                <button type="button" onclick="cancelBookingCare()" type="button" style="padding: 10px 20px; background: white; border: 1px solid #d1d5db; border-radius: 8px; color: #374151; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                    Close
                                </button>
                                <button type="submit" style="padding: 10px 20px; background: #dc2626; border: none; border-radius: 8px; color: white; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                    Confirm Cancellation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="booking_reschedule_routine" style="display: none; max-width: 800px; width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #dc2626;">
                    <!-- Header -->
                    <div style="background: #dc2626; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
                        <h4 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">Are you sure you want to reschedule routine care?</h4>
                        <button onclick="rescheduleBookingModal('booking_reschedule_routine')" style="background: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #dc2626; font-size: 18px;">
                            <i class="">X</i>
                        </button>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 24px;">
                        <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Book', 'action' => 'updateBooking']]); -->
                            <input type="hidden" name="id" class="booking_record_id">
                            <input type="hidden" name="" id="mdc_selector">
                            <!-- Notification Options -->
                            <div style="margin-bottom: 24px;">
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 12px;">Inform Patient of Reschedule?</label>
                                <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                                    <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="email" style="margin-right: 8px;">
                                        Email
                                    </label>
                                    <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="sms" style="margin-right: 8px;">
                                        SMS
                                    </label>
                                    <!-- <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="autocall" style="margin-right: 8px;">
                                        Autocall
                                    </label> -->
                                    <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                        <input type="radio" name="inform_patient" value="none" style="margin-right: 8px;">
                                        None
                                    </label>
                                </div>
                            </div>
                            
                            <!-- Date Selection -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 8px;">Select Date</label>
                                    <input type="date" name="appointment_time" value="<!-- php: echo date('Y-m-d'); -->" min="<!-- php: echo date('Y-m-d'); -->" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" id="appointment_date" onchange="getDayFromDate()">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 8px;">Day of Week</label>
                                    <input type="text" readonly name="appointment_day" value="" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; background-color: #f9fafb;" id="day-selected">
                                </div>
                            </div>
                            
                            <!-- Doctors Selection -->
                            <div style="margin-bottom: 24px;">
                                <h3 style="font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 16px; display: flex; align-items: center;">
                                    <div style="width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%; margin-right: 8px;"></div>
                                    Available Doctors
                                </h3>
                                
                                <div id="available-doctors-div" class="row">
                                </div>
                            </div>
                            
                            <!-- Hidden field for time slot -->
                            <input type="hidden" id="time_slot_id" name="booking_timeslot_id" value="">
                            <!-- Footer -->
                            <div style="background: #dc2626; padding: 12px 24px; display: flex; align-items: center; justify-content: flex-end; gap: 12px;">
                                <button type="button" onclick="rescheduleBookingModal('booking_reschedule_routine')" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #dc2626; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                    Close
                                </button>
                                <button type="submit" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #dc2626; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                    Submit
                                </button>
                            </div>
                        <!-- php: = $this->Form->end() -->
                    </div>
                    
                </div>

                <div id="booking_create_visit" style="display: none; max-width: 800px; width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #059669;">
                    <!-- Header -->
                    <div style="background: #059669; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
                        <h4 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">Create Visit</h4>
                        <button onclick="createBookingVisitModal('booking_create_visit')" style="background: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #059669; font-size: 18px;">
                            X
                        </button>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 24px;">
                        <!-- php: = $this->Form->create(null, ['type' => 'file', 'id'=>'','url' => ['controller' => 'Book', 'action' => 'createAppointmentVisit']]); -->
                            <input type="hidden" name="id" class="booking_record_id">
                            <h4 style="color: #374151; margin-bottom: 20px; font-weight: 600;">Confirm Appointee Details In Order to Create Visit</h4>
                            
                            <!-- Insurance Selection -->
                            <div style="margin-bottom: 24px;">
                                <div style="display: none; align-items: center; margin-bottom: 16px;" id="newPatient_insurance">
                                    <span style="font-weight: 500; margin-right: 12px;">Does Patient Have Insurance?</span>
                                    <label style="display: flex; align-items: center; cursor: pointer;">
                                        <input type="checkbox" name="sponsor_alternative" style="margin-right: 8px; width: 16px; height: 16px;" onclick="$('#alt_div').toggle(500)">
                                        Yes, add insurance details
                                    </label>
                                </div>
                                
                                <!-- Insurance Dropdown (for existing patients) -->
                                <div style="margin-bottom: 16px; display: none;" id="oldPatient_insurance">
                                    <label style="display: block; font-weight: 500; margin-bottom: 8px;">Select Insurance Policy</label>
                                    <SearchableSelectField
                                        style="width:100%" data-max-options="1"
                                        data-max-options="1"
                                        data-width="100%"
                                        class="form-control selectpicker show-menu-arrow show-tick"
                                        data-size="4" name="patient_insurance_profile_policy_id"
                                        id="patient_insurance_profile_policy_id" title="Select Insurance Policy"
                                        data-live-search="true" data-style="bg-white"
                                        onchange="changePaymentTypePatient(this, event)"
                                    >
                                    </SearchableSelectField>
                                    
                                    <div style="display: none; margin-top: 16px;" id="claimCode2">
                                        <div style="display: flex; align-items: center;">
                                            <label style="font-weight: 500; width: 120px; text-align: right; padding-right: 16px;">Claim Code</label>
                                            <input type="text" minlength="5" maxlength="5" placeholder="Claim Code (Numeric)" name="claim_code2" style="flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" pattern="[0-9]+">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Insurance Details Form (initially hidden) -->
                            <div id="alt_div" style="display: none; background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                                <h4 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 16px; display: flex; align-items: center;">
                                    <div style="width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%; margin-right: 8px;"></div>
                                    Insurance Details
                                </h4>
                                
                                <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                                    <!-- Sponsor Selection -->
                                    <div>
                                        <label style="display: block; font-weight: 500; margin-bottom: 8px;">Sponsor</label>
                                        <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" onchange="return changePaymentType(this, event)" data-size="5" name="insurance_profile_policy_id" id="provider_id" onchange="javascript:updatePolicies(this.value);" title="Select sponsor" data-live-search="true" >
                                            <option value="">Select Type of Sponsor</option>
                                                <!-- php: foreach($providers as $provider) { -->
                                                    <option value="<!-- php: = $provider->id -->" 
                                                        data-content="<!-- php: = $provider->insurance_profile->name --> <span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile->insurance_profile_type->name : '' --></span>"></option>
                                                <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                    
                                    <!-- Claim Code -->
                                    <div style="display: none;" id="claimCode">
                                        <label style="display: block; font-weight: 500; margin-bottom: 8px;">Claim Code</label>
                                        <input type="text" minlength="5" maxlength="5" placeholder="Claim Code (Numeric)" name="claim_code" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" pattern="[0-9]+">
                                    </div>
                                    
                                    <!-- Card Details -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                        <div>
                                            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Membership Card Name <span style="color: #dc2626;">*</span></label>
                                            <input name="insurance_card_name" type="text" placeholder="Insurance card name" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                        </div>
                                        
                                        <div>
                                            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Card Serial Number <span style="color: #dc2626;">*</span></label>
                                            <input name="insurance_card_serial" type="text" placeholder="Insurance card serial number" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                        </div>
                                    </div>
                                    
                                    <!-- Membership Details -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                        <div>
                                            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Membership ID <span style="color: #dc2626;">*</span></label>
                                            <input name="insurance_number" type="text" placeholder="Insurance number" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                        </div>
                                        
                                        <div>
                                            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Scheme No</label>
                                            <input name="scheme_number" type="text" placeholder="Scheme number" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                        </div>
                                    </div>
                                    
                                    <!-- Co-pay Toggle -->
                                    <div style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #d1d5db;">
                                        <label style="font-weight: 500;">Co Pay</label>
                                        <label style="position: relative; display: inline-block; width: 50px; height: 24px;">
                                            <input onchange="copayChecker('booking_create_visit')" id="copay_check" type="checkbox" style="opacity: 0; width: 0; height: 0;">
                                            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
                                            <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                                        </label>
                                        <input type="hidden" id="copay" name="copay" value="0">
                                    </div>
                                    
                                    <!-- Date Fields -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                        <div>
                                            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Date of Issue</label>
                                            <div style="position: relative;">
                                                <input type="date" name="date_of_issue" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">

                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Date of Renewal</label>
                                            <div style="position: relative;">
                                                <input type="date" name="date_of_renewal" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <!-- Hidden field -->

                            <!-- Footer -->
                            <div style="background: #059669; padding: 12px 24px; display: flex; align-items: center; justify-content: flex-end; gap: 12px;">
                                <button type="button" onclick="createBookingVisitModal('booking_create_visit')" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #059669; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                    Cancel
                                </button>
                                <button type="submit" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #059669; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                    Submit
                                </button>
                            </div>
                        <!-- php: = $this->Form->end() -->
                    </div>
                    
                </div>
                
                <!-- Action Buttons -->
                <div style="
                    padding: 24px;
                    background: #f8fafc;
                    border-radius: 0 0 16px 16px;
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                ">
                    <button onclick="rescheduleBookingModal('booking_reschedule_routine')" style="
                        background: white;
                        border: 1px solid #d1d5db;
                        color: #374151;

                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    " onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='white'">
                        Reschedule
                    </button>
                    
                    <button onclick="cancelBookingCare('booking_cancel_routine')" style="
                        background: #dc2626;
                        border: none;
                        color: white;

                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    " onmouseover="this.style.backgroundColor='#b91c1c'" onmouseout="this.style.backgroundColor='#dc2626'">
                        Cancel Appointment
                    </button>
                    
                    <button onclick="createBookingVisitModal('booking_create_visit'); configureVisitModal('booking_create_visit')" style="
                        background: #059669;
                        border: none;
                        color: white;

                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    " onmouseover="this.style.backgroundColor='#047857'" onmouseout="this.style.backgroundColor='#059669'">
                        Create Visit
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>

    <div class="modal fade" id="recurringModal" tabindex="-1" aria-labelledby="labRequestModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content rounded-3 shadow-lg">
        <div class="modal-header bg-primary text-slate-900">
            <h5 class="modal-title fw-bold" id="labRequestModalLabel">Details</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body requestsModal">
                <!-- Modal Container -->
                <div style="
                    padding: 20px;
                ">
                    <!-- Modal Content -->
                    <div id="" style="">
                        
                        <!-- Patient and Provider Info -->
                        <div style="
                            background: #f8fafc;
                            border-bottom: 1px solid #e2e8f0;
                        ">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                                <!-- Patient Info -->
                                <div>
                                    <div style="
                                        display: flex;
                                        align-items: center;
                                        margin-bottom: 12px;
                                    ">
                                        <div style="
                                            width: 8px;
                                            height: 8px;
                                            background: #10b981;
                                            border-radius: 50%;
                                            margin-right: 8px;
                                        "></div>
                                        <span style="
                                            font-size: 14px;
                                            font-weight: 600;
                                            color: #374151;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                        ">Patient</span>
                                    </div>
                                    <div style="
                                        font-size: 18px;
                                        font-weight: 700;
                                        color: #111827;
                                        margin-bottom: 4px;
                                    " id="patientName"></div>
                                    <div style="
                                        font-size: 14px;
                                        color: #6b7280;
                                        margin-bottom: 2px;
                                    ">Folder Number: <span style="font-weight: 600;" id="bundleId"></span></div>
                                    <!-- <div style="
                                        font-size: 14px;
                                        color: #6b7280;
                                    ">Progress: <span style="font-weight: 600; color: #059669;" id="progress">1 of 1 sessions</span></div> -->
                                </div>
                                
                                <!-- Provider Info -->
                                <div>
                                    <div style="
                                        display: flex;
                                        align-items: center;
                                        margin-bottom: 12px;
                                    ">
                                        <div style="
                                            width: 8px;
                                            height: 8px;
                                            background: #3b82f6;
                                            border-radius: 50%;
                                            margin-right: 8px;
                                        "></div>
                                        <span style="
                                            font-size: 14px;
                                            font-weight: 600;
                                            color: #374151;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                        ">Provider</span>
                                    </div>
                                    <div style="
                                        font-size: 18px;
                                        font-weight: 700;
                                        color: #111827;
                                        margin-bottom: 4px;
                                    " id="providerName"></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Current Session Details -->
                        <div style="
                            padding: 24px;
                            border-bottom: 1px solid #e2e8f0;
                        ">
                            <h3 style="
                                font-size: 18px;
                                font-weight: 700;
                                color: #111827;
                                margin-bottom: 16px;
                                display: flex;
                                align-items: center;
                            ">
                                <div style="
                                    width: 6px;
                                    height: 6px;
                                    background: #f59e0b;
                                    border-radius: 50%;
                                    margin-right: 8px;
                                "></div>
                                Current Session
                            </h3>
                            
                            <div style="
                                background: #fffbeb;
                                border: 1px solid #fed7aa;
                                border-radius: 12px;
                                padding: 20px;
                            ">
                                <div style="
                                    display: grid;
                                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                                    gap: 16px;
                                ">
                                    <div>
                                        <div style="
                                            font-size: 12px;
                                            font-weight: 600;
                                            color: #92400e;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                            margin-bottom: 4px;
                                        ">Activity</div>
                                        <div style="
                                            font-size: 16px;
                                            font-weight: 600;
                                            color: #111827;
                                        " id="activityName"></div>
                                    </div>
                                    
                                    <div>
                                        <div style="
                                            font-size: 12px;
                                            font-weight: 600;
                                            color: #92400e;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                            margin-bottom: 4px;
                                        ">Date & Time</div>
                                        <div style="
                                            font-size: 16px;
                                            font-weight: 600;
                                            color: #111827;
                                        " id="sessionDateTime"></div>
                                    </div>
                                    
                                    <div>
                                        <div style="
                                            font-size: 12px;
                                            font-weight: 600;
                                            color: #92400e;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                            margin-bottom: 4px;
                                        ">Duration</div>
                                        <div style="
                                            font-size: 16px;
                                            font-weight: 600;
                                            color: #111827;
                                        " id="sessionDuration"></div>
                                    </div>
                                    
                                    <div>
                                        <div style="
                                            font-size: 12px;
                                            font-weight: 600;
                                            color: #92400e;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                            margin-bottom: 4px;
                                        ">Status</div>
                                        <div style="
                                            display: inline-block;
                                            background: #fbbf24;
                                            color: white;
                                            padding: 4px 12px;
                                            border-radius: 20px;
                                            font-size: 12px;
                                            font-weight: 600;
                                            text-transform: uppercase;
                                        " id="sessionStatus"></div>
                                    </div>
                                    <div>
                                        <div style="
                                            font-size: 12px;
                                            font-weight: 600;
                                            color: #1e40af;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                            margin-bottom: 4px;
                                        ">Visit Status</div>
                                        <div style="
                                            display: inline-block;
                                            background: #dc2626;
                                            color: white;
                                            padding: 4px 12px;
                                            border-radius: 20px;
                                            font-size: 12px;
                                            font-weight: 600;
                                            text-transform: uppercase;
                                        " class="userhasanactivevisit">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Upcoming Sessions -->
                        <div style="
                            padding: 24px;
                            border-bottom: 1px solid #e2e8f0;
                        ">
                            <h3 style="
                                font-size: 18px;
                                font-weight: 700;
                                color: #111827;
                                margin-bottom: 16px;
                                display: flex;
                                align-items: center;
                            ">
                                <div style="
                                    width: 6px;
                                    height: 6px;
                                    background: #6366f1;
                                    border-radius: 50%;
                                    margin-right: 8px;
                                "></div>
                                Upcoming Sessions
                            </h3>
                            
                            <div id="upcoming_sessions">

                            </div>
                        </div>

                        <div id="appointment_cancel_routine" style="display: none; max-width: 800px; width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
                            <!-- Header -->
                            <div style="background: #dc2626; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
                                <h4 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">Are you sure you want to cancel Booking?</h4>
                                <button onclick="cancelBookingCare('appointment_cancel_routine')" style="background: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #dc2626; font-size: 18px;">
                                    X
                                </button>
                            </div>
                            
                            <!-- Content -->
                            <div style="padding: 24px;">
                                <!-- Warning message -->
                                <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px; display: flex; align-items: flex-start;">

                                    <p style="color: #7f1d1d; margin: 0; font-weight: 500;">This booking will be cancelled and cannot be undone</p>
                                </div>
                                
                                <!-- Cancellation Form -->
                                <form id="cancelAppointmentCareForm">
                                    <input type="hidden" name="id" class="booking_record_id">
                                    <input type="hidden" name="record_type" class="booking_record_type">
                                    <!-- Notification Options -->
                                    <div style="margin-bottom: 20px;">
                                        <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 12px;">Inform Patient of Cancellation?</label>
                                        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                                            <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="email" style="margin-right: 8px;">
                                                Email
                                            </label>
                                            <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="sms" style="margin-right: 8px;">
                                                SMS
                                            </label>
                                            <!-- <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="autocall" style="margin-right: 8px;">
                                                Autocall
                                            </label> -->
                                            <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="none" style="margin-right: 8px;">
                                                None
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <!-- Reason Input -->
                                    <div style="display: flex; align-items: center; margin-bottom: 24px;">
                                        <label for="cancellation_reason" style="font-weight: 600; color: #374151; width: 120px; text-align: right; padding-right: 16px;">Reason:</label>
                                        <input type="text" name="reason" id="cancellation_reason" style="flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" placeholder="Enter cancellation reason">
                                    </div>
                                    
                                    <!-- Action Buttons -->
                                    <div style="display: flex; justify-content: flex-end; gap: 12px;">
                                        <button type="button" onclick="cancelBookingCare('appointment_cancel_routine')" type="button" style="padding: 10px 20px; background: white; border: 1px solid #d1d5db; border-radius: 8px; color: #374151; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                            Close
                                        </button>
                                        <button type="submit" style="padding: 10px 20px; background: #dc2626; border: none; border-radius: 8px; color: white; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                            Confirm Cancellation
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div id="appointment_reschedule_routine" style="display: none; max-width: 800px; width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #dc2626;">
                            <!-- Header -->
                            <div style="background: #dc2626; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
                                <h4 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">Are you sure you want to reschedule routine care?</h4>
                                <button onclick="rescheduleBookingModal('appointment_reschedule_routine')" style="background: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #dc2626; font-size: 18px;">
                                    <i class="">X</i>
                                </button>
                            </div>
                            
                            <!-- Content -->
                            <div style="padding: 24px;">
                                <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Sessions', 'action' => 'updateBooking']]); -->
                                    <input type="hidden" name="id" class="booking_record_id">
                                    <input type="hidden" name="" id="mdc_selector">
                                    <input type="hidden" name="record_type" class="booking_record_type">
                                    <!-- Notification Options -->
                                    <div style="margin-bottom: 24px;">
                                        <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 12px;">Inform Patient of Reschedule?</label>
                                        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                                            <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="email" style="margin-right: 8px;">
                                                Email
                                            </label>
                                            <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="sms" style="margin-right: 8px;">
                                                SMS
                                            </label>
                                            <!-- <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="autocall" style="margin-right: 8px;">
                                                Autocall
                                            </label> -->
                                            <label style="display: flex; align-items: center; cursor: pointer; background: #f9fafb; padding: 10px 16px; border-radius: 8px; transition: all 0.2s;">
                                                <input type="radio" name="inform_patient" value="none" style="margin-right: 8px;">
                                                None
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <!-- Date Selection -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                                        <div>
                                            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 8px;">Select Date</label>
                                            <input type="datetime-local" name="appointment_time" value="" min="<!-- php: echo date('Y-m-d'); -->" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" id="appointment_date">
                                        </div>
                                    </div>
                                    
                                    <!-- Footer -->
                                    <div style="background: #dc2626; padding: 12px 24px; display: flex; align-items: center; justify-content: flex-end; gap: 12px;">
                                        <button onclick="rescheduleBookingModal('appointment_reschedule_routine')" type="button" onclick="rescheduleBookingModal()" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #dc2626; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                            Close
                                        </button>
                                        <button type="submit" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #dc2626; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                            Submit
                                        </button>
                                    </div>
                                <!-- php: = $this->Form->end() -->
                            </div>
                            
                        </div>

                        <div id="appointment_create_visit" style="display: none; max-width: 800px; width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #059669;">
                            <!-- Header -->
                            <div style="background: #059669; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
                                <h4 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">Create Visit</h4>
                                <button onclick="createBookingVisitModal('appointment_create_visit')" style="background: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #059669; font-size: 18px;">
                                    X
                                </button>
                            </div>
                            
                            <!-- Content -->
                            <div style="padding: 24px;">
                                <!-- php: = $this->Form->create(null, ['type' => 'file', 'id'=>'','url' => ['controller' => 'Sessions', 'action' => 'createAppointmentVisit']]); -->
                                    <input type="hidden" name="id" class="booking_record_id">
                                    <input type="hidden" name="record_type" class="booking_record_type">
                                    <h4 style="color: #374151; margin-bottom: 20px; font-weight: 600;">Confirm Appointee Details In Order to Create Visit</h4>
                                    
                                    <!-- Insurance Selection -->
                                    <div style="margin-bottom: 24px;">
                                        <div style="display: none; align-items: center; margin-bottom: 16px;" id="newPatient_insurance">
                                            <span style="font-weight: 500; margin-right: 12px;">Does Patient Have Insurance?</span>
                                            <label style="display: flex; align-items: center; cursor: pointer;">
                                                <input type="checkbox" name="sponsor_alternative" style="margin-right: 8px; width: 16px; height: 16px;" onclick="$('#appointment_create_visit #alt_div').toggle(500)">
                                                Yes, add insurance details
                                            </label>
                                        </div>
                                        
                                        <!-- Insurance Dropdown (for existing patients) -->
                                        <div style="margin-bottom: 16px; display: none;" id="oldPatient_insurance">
                                            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Select Insurance Policy</label>
                                            <SearchableSelectField
                                                style="width:100%" data-max-options="1"
                                                data-max-options="1"
                                                data-width="100%"
                                                class="form-control selectpicker show-menu-arrow show-tick"
                                                data-size="4" name="patient_insurance_profile_policy_id"
                                                id="patient_insurance_profile_policy_id" title="Select Insurance Policy"
                                                data-live-search="true" data-style="bg-white"
                                                onchange="changePaymentTypePatient(this, event)"
                                            >
                                            </SearchableSelectField>
                                            
                                            <div style="display: none; margin-top: 16px;" id="claimCode2">
                                                <div style="display: flex; align-items: center;">
                                                    <label style="font-weight: 500; width: 120px; text-align: right; padding-right: 16px;">Claim Code</label>
                                                    <input type="text" minlength="5" maxlength="5" placeholder="Claim Code (Numeric)" name="claim_code2" style="flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" pattern="[0-9]+">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Insurance Details Form (initially hidden) -->
                                    <div id="alt_div" style="display: none; background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                                        <h4 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 16px; display: flex; align-items: center;">
                                            <div style="width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%; margin-right: 8px;"></div>
                                            Insurance Details
                                        </h4>
                                        
                                        <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                                            <!-- Sponsor Selection -->
                                            <div>
                                                <label style="display: block; font-weight: 500; margin-bottom: 8px;">Sponsor</label>
                                                <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" onchange="return changePaymentType(this, event)" data-size="5" name="insurance_profile_policy_id" id="provider_id" onchange="javascript:updatePolicies(this.value);" title="Select sponsor" data-live-search="true" >
                                                    <option value="">Select Type of Sponsor</option>
                                                        <!-- php: foreach($providers as $provider) { -->
                                                            <option value="<!-- php: = $provider->id -->" 
                                                                data-content="<!-- php: = $provider->insurance_profile->name --> <span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile->insurance_profile_type->name : '' --></span>"></option>
                                                        <!-- php: } -->
                                                </SearchableSelectField>
                                            </div>
                                            
                                            <!-- Claim Code -->
                                            <div style="display: none;" id="claimCode">
                                                <label style="display: block; font-weight: 500; margin-bottom: 8px;">Claim Code</label>
                                                <input type="text" minlength="5" maxlength="5" placeholder="Claim Code (Numeric)" name="claim_code" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" pattern="[0-9]+">
                                            </div>
                                            
                                            <!-- Card Details -->
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                                <div>
                                                    <label style="display: block; font-weight: 500; margin-bottom: 8px;">Membership Card Name <span style="color: #dc2626;">*</span></label>
                                                    <input name="insurance_card_name" type="text" placeholder="Insurance card name" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                                </div>
                                                
                                                <div>
                                                    <label style="display: block; font-weight: 500; margin-bottom: 8px;">Card Serial Number <span style="color: #dc2626;">*</span></label>
                                                    <input name="insurance_card_serial" type="text" placeholder="Insurance card serial number" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                                </div>
                                            </div>
                                            
                                            <!-- Membership Details -->
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                                <div>
                                                    <label style="display: block; font-weight: 500; margin-bottom: 8px;">Membership ID <span style="color: #dc2626;">*</span></label>
                                                    <input name="insurance_number" type="text" placeholder="Insurance number" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                                </div>
                                                
                                                <div>
                                                    <label style="display: block; font-weight: 500; margin-bottom: 8px;">Scheme No</label>
                                                    <input name="scheme_number" type="text" placeholder="Scheme number" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                                </div>
                                            </div>
                                            
                                            <!-- Co-pay Toggle -->
                                            <div style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #d1d5db;">
                                                <label style="font-weight: 500;">Co Pay</label>
                                                <label style="position: relative; display: inline-block; width: 50px; height: 24px;">
                                                    <input onchange="copayChecker('appointment_create_visit')" id="copay_check" type="checkbox" style="opacity: 0; width: 0; height: 0;">
                                                    <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
                                                    <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                                                </label>
                                                <input type="hidden" id="copay" name="copay" value="0">
                                            </div>
                                            
                                            <!-- Date Fields -->
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                                <div>
                                                    <label style="display: block; font-weight: 500; margin-bottom: 8px;">Date of Issue</label>
                                                    <div style="position: relative;">
                                                        <input type="date" name="date_of_issue" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">

                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <label style="display: block; font-weight: 500; margin-bottom: 8px;">Date of Renewal</label>
                                                    <div style="position: relative;">
                                                        <input type="date" name="date_of_renewal" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                    <!-- Hidden field -->

                                    <!-- Footer -->
                                    <div style="background: #059669; padding: 12px 24px; display: flex; align-items: center; justify-content: flex-end; gap: 12px;">
                                        <button type="button" onclick="createBookingVisitModal('appointment_create_visit')" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #059669; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                            Cancel
                                        </button>
                                        <button type="submit" style="padding: 8px 16px; background: white; border: none; border-radius: 6px; color: #059669; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                                            Submit
                                        </button>
                                    </div>
                                <!-- php: = $this->Form->end() -->
                            </div>
                            
                        </div>
                        
                        <!-- Action Buttons -->
                        <!-- Action Buttons -->
                        <div style="
                            padding: 24px;
                            background: #f8fafc;
                            border-radius: 0 0 16px 16px;
                            display: flex;
                            gap: 12px;
                            justify-content: flex-end;
                        ">
                            <button onclick="rescheduleBookingModal('appointment_reschedule_routine')" style="
                                background: white;
                                border: 1px solid #d1d5db;
                                color: #374151;

                                border-radius: 8px;
                                font-size: 14px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.2s;
                            " onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='white'">
                                Reschedule
                            </button>
                            
                            <button onclick="cancelBookingCare('appointment_cancel_routine')" style="
                                background: #dc2626;
                                border: none;
                                color: white;

                                border-radius: 8px;
                                font-size: 14px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.2s;
                            " onmouseover="this.style.backgroundColor='#b91c1c'" onmouseout="this.style.backgroundColor='#dc2626'">
                                Cancel Appointment
                            </button>
                            
                            <button onclick="createBookingVisitModal('appointment_create_visit'); configureVisitModal('appointment_create_visit')" style="
                                background: #059669;
                                border: none;
                                color: white;

                                border-radius: 8px;
                                font-size: 14px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.2s;
                            " onmouseover="this.style.backgroundColor='#047857'" onmouseout="this.style.backgroundColor='#059669'">
                                Create Visit
                            </button>
                        </div>

                    </div>
                </div>
        </div>
        </div>
    </div>
    </div>





</div>



<!-- End of Accordions -->

<script>
    /**
     * Append Value to Text Function  
     */
    function appendDetails(v1, v2) {
        //Append 
        $(\`#\${v1}\`).text(v2);
    }

    function cancelRequestSurgery(id) {
        if (!confirm("Are you sure you want to cancel this request?")) {
            return
        }
        $.ajax({
            type: "POST",
            url: \`<!-- php: = $this->Url->build(['controller' => 'OrPlanner', 'action' => 'cancelRequestSurgery']) -->/\${id}\`,
            // data: {roles: roles}
        }).done((data) => {
            if(data.status) {

                alertify.success(data.data);
                setTimeout(() => {
                    // location.reload()
                }, 2000);
            }else {
                alertify.error(data.data);
            }
        })
    }

    function getUsers() {
        let roles = [1, 2, 8]
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'OrPlanner', 'action' => 'getUsersByRole']) -->\`,
            data: {roles: roles}
        }).done(data => {
            // $('.nurse_users').html('')
            // $('.surgeon_users').html('')
            // $('.anesthesiologist_users').html('')
            data.forEach(elem => {
                if ([2 , 8].includes(parseInt(elem.role_id))) {
                    // $('.nurse_users').append(\`<option value="">None</option>\`)
                    $('.nurse_users').append(\`<option value="\${elem.id}">\${elem.first_name} \${elem.last_name}</option>\`)
                }
                if (elem.role_id == 1) {
                    // $('.surgeon_users').append(\`<option value="">None</option>\`)
                    $('.surgeon_users').append(\`<option value="\${elem.id}">\${elem.first_name} \${elem.last_name}</option>\`)
                }
                if (elem.role_id == 1) {
                    // $('.anesthesiologist_users').append(\`<option value="">None</option>\`)
                    $('.anesthesiologist_users').append(\`<option value="\${elem.id}">\${elem.first_name} \${elem.last_name}</option>\`)
                }
            });
            // $('.selectpicker').selectpicker("refresh")
        })
    }
    function getPrescriptions() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'filterItemsByTypes', '1']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.add_prescriptions').append(\`<option value=\${elem.id}>\${elem.full_name}</option>\`)
                // }
            });

        })
    }
    function getInfusions() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'filterItemsByTypes', '4']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.add_infusions').append(\`<option value=\${elem.id}>\${elem.full_name}</option>\`)
                // }
            });

        })
    }
    function getMedicalEquipment() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'InventoryList', 'action' => 'overview']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.add_medical_equipment').append(\`<option value=\${elem.id}>\${elem.name}</option>\`)
                // }
            });

        })
    }
    function getSurgicalUnits() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'OrPlanner', 'action' => 'getTreatmentRooms']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.surgical_units').append(\`<option value=\${elem.id}>\${elem.name}</option>\`)
                // }
            });
        })
    }
    // getSurgicalUnits()
    getUsers()
    // getPrescriptions()
    // getInfusions()
    // getMedicalEquipment()

    function findConflicts(tasks) {
        const conflicts = [];
        const grouped = {};

        for (const task of tasks) {
            // pick best key available
            const groupKey = task.user_id || task.user || task.resource || "unknown";

            if (!grouped[groupKey]) grouped[groupKey] = [];
            grouped[groupKey].push(task);
        }

        for (const userKey in grouped) {
            const userTasks = grouped[userKey].sort(
            (a, b) => new Date(a.start) - new Date(b.start)
            );

            let cluster = [];
            let clusterStart = null;
            let clusterEnd = null;

            for (const task of userTasks) {
            const start = new Date(task.start).getTime();
            const end = new Date(task.end).getTime();

            if (!cluster.length) {
                cluster = [task];
                clusterStart = start;
                clusterEnd = end;
            } else if (start < clusterEnd) {
                cluster.push(task);
                clusterEnd = Math.max(clusterEnd, end);
            } else {
                if (cluster.length > 1) {
                conflicts.push({
                    key: userKey,
                    start: new Date(clusterStart).toISOString(),
                    end: new Date(clusterEnd).toISOString(),
                    tasks: cluster
                });
                }
                cluster = [task];
                clusterStart = start;
                clusterEnd = end;
            }
            }

            if (cluster.length > 1) {
            conflicts.push({
                key: userKey,
                start: new Date(clusterStart).toISOString(),
                end: new Date(clusterEnd).toISOString(),
                tasks: cluster
            });
            }
        }

        return conflicts;
    }

    function getTotalPendingThisWeek(tasks) {
        const now = new Date();
        
        // Find start of this week (Monday)
        const startOfWeek = new Date(now);
        startOfWeek.setUTCHours(0, 0, 0, 0);
        startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay() + 1); // Monday

        // Find end of this week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
        endOfWeek.setUTCHours(23, 59, 59, 999);

        return tasks.filter(task => {
            const date = new Date(task.date);
            return (
            task.resource !== "booking" && // exclude bookings
            date >= startOfWeek &&
            date <= endOfWeek
            );
        }).length;
    }


    var plannerData = {
        'task': [],
        'resource': [],
        'completionRate': 0,
    }

    function fetchPlannerData() {

        //Get Planner values 
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'setupDoctorPlanner', $editUser->id]) -->/\`,
            data: {
                filter: $('input[name="mar_filter"]:checked').val()
            }
        }).done((data) => {
            plannerData = data
            const bundletypefilter = Object.values(data['resource'].reduce((acc, curr) => {
                acc[curr.id] = \`<option value=\${curr.id}>\${curr.name}</option>\`
                return acc
            }, {}))
            bundletypefilter.unshift('<option value="">All</option>')
            $('#bundletypefilter').html(
                bundletypefilter.join('')
            )
            const doctorfilter = Object.values(data['task'].reduce((acc, curr) => {
                acc[curr.user_id] = \`<option value=\${curr.user_id}>\${curr.user}</option>\`
                return acc
            }, {}))
            doctorfilter.unshift('<option value="">All</option>')
            $('#doctorfilter').html(
                doctorfilter.join('')
            )
            const patientfilter = Object.values(data['task'].reduce((acc, curr) => {
                acc[curr.patient_id] = \`<option value=\${curr.patient_id.split(' ').join('')}>\${curr.patient}</option>\`
                return acc
            }, {}))
            patientfilter.unshift('<option value="">All</option>')
            $('#patientfilter').html(
                patientfilter.join('')
            )

            $('.selectpicker').selectpicker('refresh')
                console.log("this is the data", data)
            setORPlanner(data)
        }).fail((data) => {
            
        })
        
        
    }
    let calendarInstance = null;

    function setORPlanner(data = plannerData) {

        if (calendarInstance) {
            calendarInstance.destroy();
            calendarInstance = null;
        }

        const array = data;
        all_conflicts = findConflicts(data['task'], 'user_id')

        $('#total_pending_tasks').html(data['task'].length)
        $('#total_completion_rate').html(data['completionRate'])
        
        $('#total_pending_week').html(getTotalPendingThisWeek(data['task']))
        $('#total_conflicts_tasks').html(all_conflicts.length)
        renderConflicts(all_conflicts);

        if (array != null && array.length != 0) {
            mobiscroll.setOptions({
                theme: 'material',
                themeVariant: 'light'
            });

            var calendar,
                range,
                oldEvent,
                tempEvent = {},
                deleteEvent,
                restoreEvent,
                titleInput = document.getElementById('work-order-title'),
                locationInput = document.getElementById('work-order-location'),
                notesTextarea = document.getElementById('work-order-notes'),
                deleteButton = document.getElementById('work-order-delete'),
                resourceCont = document.getElementById('work-order-resources');

            var myData = array['task'];

            var myResources = array['resource'];

            function createAddPopup(elm) {
                // hide delete button inside add popup
                deleteButton.style.display = 'none';

                deleteEvent = true;
                restoreEvent = false;

                // set popup header text and buttons for adding
                popup.setOptions({
                    headerText: 'New work order',
                    buttons: [
                        'cancel',
                        {
                            text: 'Add',
                            keyCode: 'enter',
                            handler: function() {
                                calendar.updateEvent(tempEvent);
                                deleteEvent = false;

                                // navigate the calendar to the correct view
                                calendar.navigate(tempEvent.start);

                                popup.close();
                            },
                            cssClass: 'mbsc-popup-button-primary'
                        }
                    ]
                });

                // fill popup with a new event data
                mobiscroll.getInst(titleInput).value = tempEvent.title;
                mobiscroll.getInst(locationInput).value = '';
                mobiscroll.getInst(notesTextarea).value = '';
                range.setVal([tempEvent.start, tempEvent.end]);
                // setCheckboxes(tempEvent.resource);

                // set anchor for the popup
                popup.setOptions({
                    anchor: elm
                });

                popup.open();
            }

            function createEditPopup(args) {
                var ev = args.event;

                // show delete button inside edit popup
                deleteButton.style.display = 'block';

                deleteEvent = false;
                restoreEvent = true;

                // set popup header text and buttons for editing
                popup.setOptions({
                    headerText: 'Edit event',
                    buttons: [
                        'cancel',
                        {
                            text: 'Save',
                            keyCode: 'enter',
                            handler: function() {
                                var date = range.getVal();
                                // update event with the new properties on save button click
                                calendar.updateEvent({
                                    id: ev.id,
                                    title: titleInput.value,
                                    location: locationInput.value,
                                    notes: notesTextarea.value,
                                    start: date[0],
                                    end: date[1],
                                    color: ev.color,
                                    resource: ev.resource,
                                });

                                // navigate the calendar to the correct view
                                calendar.navigate(date[0]);;

                                restoreEvent = false;
                                popup.close();
                            },
                            cssClass: 'mbsc-popup-button-primary'
                        }
                    ]
                });

                // fill popup with the selected event data
                mobiscroll.getInst(titleInput).value = ev.title || '';
                mobiscroll.getInst(locationInput).value = ev.location || '';
                mobiscroll.getInst(notesTextarea).value = ev.notes || '';
                range.setVal([ev.start, ev.end]);
                // setCheckboxes(ev.resource);

                // set anchor for the popup
                popup.setOptions({
                    anchor: args.domEvent.currentTarget
                });
                popup.open();
            }

            calendar = mobiscroll.eventcalendar('#demo-work-order-scheduling', {
                cssClass: 'mds-resource-filtering-calendar',
                clickToCreate: false,
                dragToCreate: false,
                dragToMove: false,
                dragToResize: false,
                dragTimeStep: 30,
                view: {
                    timeline: {
                        type: 'week',
                        startDay: 0,
                        eventList: true,
                        endDay: 7
                    },
                    timeCellStep: 1440,
                    timeLabelStep: 1440,
                    weekNumbers: false
                        
                },
                data: myData.map(val => {

                    return {
                        ...val,
                        start: new Date(val.start),
                        end: new Date(val.end),
                    }
                }),
                resources: myResources,
                extendDefaultEvent: function() {
                    return {
                        title: 'Work order',
                        location: ''
                    };
                },
                onEventClick: function(args) {
                    updateModal(args.event.task_id);
                },
                onEventCreated: function(args) {
                    popup.close();
                    // store temporary event
                    tempEvent = args.event;
                    createAddPopup(args.target);
                },
                onEventDeleted: function(args) {
                    mobiscroll.snackbar({
                        button: {
                            action: function() {
                                calendar.addEvent(args.event);
                            },
                            text: 'Undo'
                        },
                        message: 'Event deleted'
                    });
                },
                renderHeader: function () {
                    return '<div class="d-flex justify-content-between align-items-center full-width"><div mbsc-calendar-nav class="md-work-week-nav"></div>' +
                        '<div class="md-work-week-picker w-50">' +
                        '<label>Day<input mbsc-segmented type="radio" name="view" value="day" class="md-view-change"></label>' +
                        '<label>Week<input mbsc-segmented type="radio" name="view" value="week" class="md-view-change"  checked></label>' +
                        '<label>Month<input mbsc-segmented type="radio" name="view" value="month" class="md-view-change"></label>' +
                        '<label>Year<input mbsc-segmented type="radio" name="view" value="year" class="md-view-change"></label>' +
                        '</div>' +
                        '<div class="d-flex"><div mbsc-calendar-prev class="md-work-week-prev"></div>' +
                        '<div mbsc-calendar-today class="md-work-week-today"></div>' +
                        '<div mbsc-calendar-next class="md-work-week-next"></div></div></div>';
                },
                renderResourceHeader: function () {
                    return '<div class="mds-popup-sort-resource-header">' + 'Services' + '</div>';
                },
                renderScheduleEventContent: function (event) {
                    return \`
                        <div>\${event.original.title}</div>
                        <div class="mds-popup-sort-event-attr">
                        Patient: \${event.original.patient}
                        </div>
                        <div class="mds-popup-sort-event-attr">
                        User: \${event.original.user}
                        </div>
                        <div class="mds-popup-sort-event-attr">
                        \${event.original.specialty ? 'Specialty: '+ event.original.specialty : ''}
                        </div>
                    \`;
                },
                // renderResource: function (resource) {
                //     const metricValue = resource[sortColumn];
                //     const barValue = sortColumn === 'payload' ? metricValue : (metricValue / 168) * 100;
                //     const barColor = barValue <= 33 ? 'green' : barValue <= 66 ? 'yellow' : 'red';

                //     return \`
                //         <div class="mds-popup-sort-resource-cell">
                //             <strong>\${resource.title}</strong>
                //             <div class="mds-popup-sort-resource-attr">Model: \${resource.model}</div>
                //             <div class="mds-popup-sort-resource-attr">Capacity: \${resource.capacity}T</div>
                //             <div class="mds-popup-sort-resource-attr">
                //                 \${sortColumnLabel}: \${metricValue}\${sortColumn === 'payload' ? '%' : 'h'}
                //             </div>
                //             <div class="mds-popup-sort-bar-track">
                //                 <div class="mds-popup-sort-bar mds-popup-sort-bar-\${barColor}\${metricBarAnimation ? ' mds-popup-sort-bar-animation' : ''}" 
                //                     style="width: \${barValue}%;">
                //                 </div>
                //             </div>
                //         </div>
                //     \`;
                // },

            });

            calendarInstance = calendar;


            document.querySelectorAll('.md-view-change').forEach(function (elm) {
                elm.addEventListener('change', function (ev) {
                    switch (ev.target.value) {
                        case 'day':
                            calendar.setOptions({
                                view: {
                                    timeline: { type: 'day' }
                                }
                            })
                            break;
                        case 'week':
                            calendar.setOptions({
                                view: {
                    timeline: {
                        type: 'week',
                        startDay: 0,
                        eventList: true,
                        endDay: 7
                    },
                    timeCellStep: 1440,
                    timeLabelStep: 1440,
                    weekNumbers: false
                        
                }
                            })
                            break;
                        case 'month':
                            calendar.setOptions({
                                view: {
                                    calendar: {
                                        labels: 'true'
                                    }
                                }
                            })
                            break;
                        case 'year':
                            calendar.setOptions({
                                view: {
                                    calendar: {
                                        type: 'year',
                                        label: 'true'
                                    }
                                }
                            })
                            break;
                    }
                });
            });








        } else {
            //Display error
        }

    }





    function assignModal(requested_surgery_id) {

        //Get particular surgery

        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'get']) -->/\${requested_surgery_id}\`
        }).done((data) => {

            //show modal 

            $('#assignModal').modal('show');


            setupAssignModal(data[0]);




        }).fail((data) => {

            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');

        })







        //Submit Add Surgery / Theater task form 
        $('#addPlannerTaskForm').off('submit').submit(function(e) {
            e.preventDefault();

            console.log('Submit form working...');

            if (confirm('Are you sure you want to add task?')) {
                console.log($(this).serialize());


                var formData = new FormData(document.getElementById('addPlannerTaskForm'));

                submitPlannerTask(requested_surgery_id, formData, resetAddPlannerTaskForm);

                //close modal 
                $('#assignModal').modal('hide');
            }


            return false;
        })

    }



        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        function formatTime(dateString) {
            return new Date(dateString).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }

        function getGenderText(genderId) {
            return genderId === "1" ? "Male" : "Female";
        }

        function formatTimeBooking(timeString) {
            // Convert 24-hour format to 12-hour format
            const [hours, minutes] = timeString.split(':');
            const hour12 = ((parseInt(hours) + 11) % 12) + 1;
            const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
            return \`\${hour12}:\${minutes} \${ampm}\`;
        }


        function formatDateTime(dateString) {
            const date = new Date(dateString);
            return formatDate(dateString) + ' at ' + formatTime(dateString);
        }

        function formatDuration(minutes) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return hours > 0 ? \`\${hours}h \${mins}m\` : \`\${mins}m\`;
        }

        function populateModal(jsonData) {
            const data = jsonData[0]; // Main appointment data
            const scheduleData = jsonData[1]; // Schedule data
            
            // Update patient info
            document.querySelector('.requestsModal #patientName').textContent = \`\${data.patient.first_name} \${data.patient.last_name}\`;
            document.querySelector('.requestsModal #bundleId').textContent = data.patient.folder_number;
            // document.querySelector('.requestsModal #progress').textContent = '1 of 1 sessions'; // Based on single session
            
            // Update provider info
            const doctorName = (data.assigned_user.first_name + ' ' + data.assigned_user.last_name).trim();
            document.querySelector('.requestsModal #providerName').textContent = doctorName;
            
            // Update session details
            document.querySelector('.requestsModal #activityName').textContent = data.activity;
            document.querySelector('.requestsModal #sessionDateTime').textContent = formatDateTime(data.date);
            document.querySelector('.requestsModal #sessionDuration').textContent = formatDuration(data.duration);
            // document.querySelector('.requestsModal #sessionStatus').textContent = scheduleData?.status;
            
            if (scheduleData.length > 1) {
                
                $('#upcoming_sessions').html(scheduleData.map(ele => {
                    
                    return \`
                        <div style="
                            color: #6b7280;
                            font-style: italic;
                            padding: 20px;
                            text-align: center;
                            background: #f9fafb;
                            border-radius: 8px;
                            border: 1px dashed #d1d5db;
                        " id="upcoming_sessions">
                            \${ele.title}: \${formatDateTime(ele.start)} - \${formatDateTime(ele.end)}
                        </div>
                    \`
                }).join(''));
            } else {
                $('#upcoming_sessions').html(\`
                    <div style="
                        color: #6b7280;
                        font-style: italic;
                        padding: 20px;
                        text-align: center;
                        background: #f9fafb;
                        border-radius: 8px;
                        border: 1px dashed #d1d5db;
                    " id="upcoming_sessions">
                        No Upcoming Sessions
                    </div>
                \`);
                
            }
        }

        function populateBookingModal(jsonData) {
            const data = jsonData[0]; // Main appointment data
            
            // Update patient info
            document.querySelector('.bookingModal #patientName').textContent = \`\${data.first_name} \${data.last_name}\`;
            document.querySelector('.bookingModal #folderNumber').textContent = data.patient.folder_number;
            document.querySelector('.bookingModal #bookingCode').textContent = data.booking_code;
            document.querySelector('.bookingModal #patientPhone').textContent = data.phone;
            document.querySelector('.bookingModal #patientEmail').textContent = data.email;
            
            // Update provider info
            const doctorName = (data.user.first_name + ' ' + data.user.last_name).trim();
            document.querySelector('.bookingModal #providerName').textContent = doctorName;
            document.querySelector('.bookingModal #specialty').textContent = data.specialty.name;
            // document.querySelector('.bookingModal #providerEmail').textContent = data.user.email;
            
            // Update appointment details
            document.querySelector('.bookingModal #appointmentDate').textContent = \`\${formatDate(data.appointment_time)} (\${data.appointment_day})\`;
            document.querySelector('.bookingModal #appointmentTime').textContent = formatTimeBooking(data.selected_doctor_booking_timeslot.booking_timeslot_value);
            document.querySelector('.bookingModal #appointmentType').textContent = data.type;
            document.querySelector('.bookingModal #appointmentStatus').textContent = data.status.name;
            
            // Update visit information
            // document.querySelector('.bookingModal #visitPurpose').textContent = data.patient_visit_purpose.name;
            // document.querySelector('.bookingModal #visitDescription').textContent = data.patient_visit_purpose.description;
            // document.querySelector('.bookingModal #dateOfBirth').textContent = formatDate(data.date_of_birth);
            // document.querySelector('.bookingModal #gender').textContent = getGenderText(data.gender_id);
            
            // Update status colors based on status
            const statusElement = document.querySelector('.bookingModal #appointmentStatus');
            const typeElement = document.querySelector('.bookingModal #appointmentType');
            
            if (data.status.name === 'Pending') {
                statusElement.style.backgroundColor = '#fbbf24';
            } else if (data.status.name === 'Confirmed') {
                statusElement.style.backgroundColor = '#059669';
            } else if (data.status.name === 'Cancelled') {
                statusElement.style.backgroundColor = '#dc2626';
            }
            
            if (data.type === 'ONLINE') {
                typeElement.style.backgroundColor = '#059669';
            } else {
                typeElement.style.backgroundColor = '#3b82f6';
            }
        }





    function updateModal(task_id) {

        console.log('Task id:'+task_id);

        //Get particular surgery

        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'getTask']) -->/\${task_id.split(':').join('/')}\`
        }).done((data) => {
            //show modal 
            $(".userhasanactivevisit").html(data[2] ? 'PATIENT HAS AN ACTIVE VISIT' : '')
            if (task_id.split(':')[0] == 'BK') {
                
                $('#bookingModal').modal('show');
                populateBookingModal(data);
                $(".booking_record_id").val(task_id.split(':')[1])
                $(".booking_record_type").val(task_id.split(':')[0])
                $("#mdc_selector").val(data[0].specialty_id)
                
            } else {
                $(".booking_record_id").val(task_id.split(':')[1])
                $(".booking_record_type").val(task_id.split(':')[0])
                $("#mdc_selector").val(data[0].specialty_id)
                
                $('#recurringModal').modal('show');
                populateModal(data)
            }




        }).fail((data) => {

            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');

        })




        //Submit update Surgery / Theater task form 
        $('#updatePlannerTaskForm').off('submit').submit(function(e) {
            e.preventDefault();


            if (confirm('Are you sure you want to update Task?')) {
                console.log($(this).serialize());

                updatePlannerTask(task_id, $(this).serialize(), resetUpdatePlannerTaskForm);

                //close modal 
                $('#assignModal').modal('hide');
            }


            return false;
        })



    }


    function setupUpdateModal(task)
    {
        console.log(task);
        //Patient details 
        appendDetails('patientName_updateModal', task.request_surgery.patient_visit.patient.name);
        appendDetails('patientAge_updateModal', task.request_surgery.patient_visit.patient.age);
        appendDetails('patientGender_updateModal', task.request_surgery.patient_visit.patient.gender.name);
        // appendDetails('patientLocation_updateModal', task.request_surgery.patient_visit.patient.location == null ? 'N/A' : requested_surgery.patient_visit.patient.location.name);
        appendDetails('patientFolderNo_updateModal', task.request_surgery.patient_visit.patient.folder_number);

        //Request Details
        appendDetails('reqDate_updateModal', moment(new Date(task.request_surgery.date_created)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('requester_updateModal', \`\${task.request_surgery.user.first_name} \${task.request_surgery.user.last_name}\`);
        appendDetails('procedure_updateModal', (task.request_surgery.surgery_stock?.procedure_name || task.request_surgery?.procedure_stock.name));
        appendDetails('procedureCode_updateModal', \`\${(task.request_surgery.surgery_stock?.procedure_code || task.request_surgery.procedure_stock?.code) }\`);
        appendDetails('surgeon_updateModal',\`Dr. \${task.surgeon?.first_name || ''} \${task.surgeon?.last_name || ''}\`);
        appendDetails('nurse_updateModal',\` \${task?.nurse?.first_name || ''} \${task?.nurse?.last_name || ''} \`);
        appendDetails('anaesthesiologist_updateModal', \`Dr. \${task.anesthesiologist?.first_name || ''} \${task.anesthesiologist?.last_name || ''}\`)
        // appendDetails('assignModal_start_time', moment(new Date(requested_surgery.start_time)).format("DD MMM YYYY, hh:mm A"));
        // appendDetails('assignModal_end_time', moment(new Date(requested_surgery.end_time)).format("DD MMM YYYY, hh:mm A"));
        // appendDetails('assignModal_duration', requested_surgery.duration);

        let tableInfo = task.theatre_planner_tasks_participants.reduce((acc, curr) => {
            acc += \`
                <tr>
                    <td>\${curr.user.first_name} \${curr.user.last_name}</td>
                    <td>\${curr.role}</td>
                </tr>
            \`
            return acc
        }, '');
        $('#participants_updateModal').html(tableInfo);

        let filesInfo = task.theatre_planner_tasks_files.reduce((acc, curr, index) => {
            acc += \`
                <tr>
                    <td>
                        <a href="<!-- php: = $this->Url->build('/img/', ['fullBase' => true]) -->\${curr.file_path}" target="_blank" >File \${index + 1}</a>
                    </td>
                </tr>
            \`
            return acc
        }, '');
        
        $('#files_updateModal').html(filesInfo);
        
        let selected_infusions_n_medications = task.request_surgery.theatre_planner_task_medications.map((ele) => {
            return ele.item_id
        });
        let selected_equipments = task.request_surgery.theatre_planner_task_equipments.map((ele) => {
            return ele.item_id
        });

        $('#update_prescriptions').val(selected_infusions_n_medications)
        $('#update_infusions').val(selected_infusions_n_medications)
        $('#update_medical_equipment').val(selected_equipments)

        $('#update_prescriptions').selectpicker('refresh')
        $('#update_infusions').selectpicker('refresh')
        $('#update_medical_equipment').selectpicker('refresh')
        
        // set title
        // $('#task_title_updateModal').val(task.title);








    }


    function resetAddPlannerTaskForm() {
        // //Loop for inputs
        // $('#addPlannerTaskForm').find('input').each(function() {
        //     $(this).val("");
        // });



        // //Loop for selects
        // $('#addPlannerTaskForm').find('select').each(function() {
        //     $(this).val('').selectpicker('refresh');
        // });

    }
    function resetUpdatePlannerTaskForm() {
        // //Loop for inputs
        // $('#updatePlannerTaskForm').find('input').each(function() {
        //     $(this).val("");
        // });



        // //Loop for selects
        // $('#addPlannerTaskForm').find('select').each(function() {
        //     $(this).val('').selectpicker('refresh');
        // });

    }


    function submitPlannerTask(requested_surgery_id, data, resetFormCallback) {
        //ajax 
        $.ajax({

            type: "POST",
            url: \`<!-- php: = $this->Url->build(['controller' => 'TheatrePlannerTasks', 'action' => 'add']) -->/\${requested_surgery_id}\`,
            data: data,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Prevent jQuery from setting the content type
        }).done((data, textstatus, xhr) => {
            if (xhr.status == 200) {
                alertify.success(data);

                //Reload OR Planner calendar
                setORPlanner();



                //Rest Form
                resetFormCallback()

                // location.reload()


            } else {
                alertify.error(data);
            }
        }).fail((data) => {
            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');
        })

    }

    function updatePlannerTask(requested_surgery_id, data, resetFormCallback) {
        //ajax 
        $.ajax({

            type: "POST",
            url: \`<!-- php: = $this->Url->build(['controller' => 'TheatrePlannerTasks', 'action' => 'update']) -->/\${requested_surgery_id}\`,
            data: data,
        }).done((data, textstatus, xhr) => {
            if (xhr.status == 200) {
                alertify.success(data);

                //Reload OR Planner calendar
                $('#updateModal').modal('hide');
                setORPlanner();



                //Rest Form
                resetFormCallback()


            } else {
                alertify.error(data);
            }
        }).fail((data) => {
            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');
        })

    }



    function showResourceFilter(id) {

        console.log("selected filter:" + id)

        //Get element 
        const element = $(\`.\${id}\`);
        console.log(element);

        if (element.hasClass('d-none')) {
            // console.log(\`\${id} has d-none\`);
            element.removeClass('d-none');
        } else {
            element.addClass('d-none');
        }

        //hide siblings 
        element.siblings().each(function() {
            if (!$(this).hasClass('d-none')) {
                $(this).addClass('d-none');
            }
        })




    }


    function setupAssignModal(requested_surgery) {

        // console.log(requested_surgery);

        appendDetails('patientName_assignModal', requested_surgery.patient_visit.patient.name);
        appendDetails('patientAge_assignModal', requested_surgery.patient_visit.patient.age);
        appendDetails('patientGender_assignModal', requested_surgery.patient_visit.patient.gender.name);
        appendDetails('patientLocation_assignModal', requested_surgery.patient_visit.patient.location == null ? 'N/A' : requested_surgery.patient_visit.patient.location.name);
        appendDetails('patientFolderNo_assignModal', requested_surgery.patient_visit.patient.folder_number);

        appendDetails('reqDate_assignModal', moment(new Date(requested_surgery.date_created)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('requester_assignModal', \`\${requested_surgery.user.first_name} \${requested_surgery.user.last_name}\`);
        appendDetails('procedure_assignModal', (requested_surgery.surgery_stock?.procedure_name || requested_surgery.procedure_stock.name) );
        appendDetails('procedureCode_assignModal', \`\${requested_surgery.surgery_stock?.procedure_code }\`);
        appendDetails('assignModal_start_time', moment(new Date(requested_surgery.start_time)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('assignModal_end_time', moment(new Date(requested_surgery.end_time)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('assignModal_duration', requested_surgery.duration);

        //set title
        $('#task_title').val((requested_surgery.surgery_stock?.procedure_name || requested_surgery.procedure_stock.name));





    }
</script>

<script>
    $('input[type=radio][name=mar_filter]').on('change', function() {
        // switch ($(this).val()) {
        // 	case '1':
        // 		console.log('All Filter clicked');
        // 		break;
        // 	case '2':
        // 		console.log('Scheduled Filter Clicked');
        // 		break;
        // }

        setORPlanner();
    });

    $(function() {

        /*********************GLOBAL***************************/
        mobiscroll.datepicker('.surgery_date', {
            controls: ['calendar'],
            touchUi: true,
            dateFormat: 'YYYY-MM-DD',
            min: moment(new Date()).format("yyyy-mm-dd"),
            returnFormat: 'moment',
            theme: 'material',
            themeVariant: 'light'

        });


        mobiscroll.datepicker('.surgery_start_time', {
            controls: ['time'],
            touchUi: true,
            timeFormat: "HH:mm",
            returnFormat: 'moment',
            theme: 'material',
            themeVariant: 'light'

        });


        mobiscroll.datepicker('.surgery_end_time', {
            controls: ['time'],
            touchUi: true,
            timeFormat: "HH:mm",
            returnFormat: 'moment',
            theme: 'material',
            themeVariant: 'light'

        });

        //set up or planner on page reload 
        fetchPlannerData();



        /********************TRIGGERS*******************/







    });
</script>

<script>


    function cancelBookingCare(id){
        console.log("It showed here");
        $("#"+id).toggle();
       
    }
    function rescheduleBookingModal(id){
        $("#" + id).toggle();
    }
    function createBookingVisitModal(id){
        $("#"+id).toggle();
    }
    function configureVisitModal(id){
        item_id = $(".booking_record_id").val();
        booking_record_type = $(".booking_record_type").val();
        $.ajax({
            url: (
                booking_record_type == 'BK' ? 
                    '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getAppointmentPatientDetails']) -->/' + item_id
                :
                    '<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'getAppointmentInsurancePatientDetails']) -->/' + [item_id,booking_record_type].join('/')
            ),
            type:'POST',
            data: $(this).serialize(),
            success: function(data){

                console.log("this is the data", data)

                if (data == false) {
                    console.log("it came here", \`#\${id} #newPatient_insurance\`)
                    $(\`#\${id} #newPatient_insurance\`).show(400)
                    $(\`#\${id} oldPatient_insurance\`).hide(400)
                } else {
                    $(\`#\${id} #oldPatient_insurance\`).show(400)
                    $(\`#\${id} #newPatient_insurance\`).hide(400)
                    if (Array.isArray(data) && data && data.length > 0 ) {
                        data?.forEach(ins => {
                            result += \`
                                <option 
                                    data-type="\${ ins?.insurance_profile?.insurance_profile_type_id }" 
                                    value="\${ ins?.id }" 
                                    data-content="\${ins?.insurance_profile?.name }"
                                >\${ins?.insurance_profile?.name }</option>
                            \`
                        });
                        $(\`#\${id}#patient_insurance_profile_policy_id\`).html(result)
                        $(\`#\${id}#patient_insurance_profile_policy_id\`).selectpicker("refresh");
    
                    }
                }


            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");
    
            }
        });
    }

    function getDayFromDate() {
        var weekday = ["Sunday/7","Monday/1","Tuesday/2","Wednesday/3","Thursday/4","Friday/5","Saturday/6"]
        var a = new Date($("#appointment_date").val())
        var split = weekday[a.getDay()].split("/")
        appointment_day_id = split[1]
        $('#appointment_type').trigger('change');
        getAvailableDoctors()
        $("#day-selected").val(split[0])
    }

    function getAvailableDoctors() {
        let val = $('#mdc_selector').val()
        $("#specialty_id").val(val)

        let weekday = ["Sunday/7","Monday/1","Tuesday/2","Wednesday/3","Thursday/4","Friday/5","Saturday/6"]
        let a = new Date($("#appointment_date").val())
        let split = weekday[a.getDay()].split("/")
        let appointment_day_id = split[1]

        
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getAvailableDoctors']) -->/'+ val + '/' + appointment_day_id,
            data: {
                'date' : new Date($("#appointment_date").val()).toLocaleDateString()
            },
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                displayDoctorsAndTheirAvailability(res)
            },
            error: function(){
                console.log("Error Occured");
            }
        });
    }
    function displayDoctorsAndTheirAvailability(doctors) {
        var doctors_and_timslots = ''
        for(var i in doctors){
            let doctor_image = doctors[i].user.image?.file_path
            if(!doctor_image)
            {
                doctor_image = '/img/../assets/img/dp.jpg'
                // echo $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-circle user-img-circle']);
            }
            /**
             * drawing out doctors and their times slots based on specialty and consultations selected by user
             */
            timeSlotdata = '';
            for(var q = 0; q < doctors[i].availability.length; q++){
                console.log(doctors[i].availability[q].BookingTimeslots.slot);
                timeSlotdata += \`<div class="col-md-3 p-1"> <button type="button" style="font-size:12px;" class="btn third-step time-slot-button p-3 \${doctors[i].user.id}" id="\${doctors[i].availability[q].id}\${doctors[i].user.id}" onclick="passTimslotId('\${doctors[i].availability[q].id}', '\${doctors[i].user.id}')">\${doctors[i].availability[q].booking_timeslot_value}</button></div>\`;
            }
            if (timeSlotdata != '') {
            
                doctors_and_timslots += "<div style='' class='col-md-4 p-2'><div class='p-3' style='border-radius:10px; border: 1px solid #ccc;'><div class='row'><div class='col-md-3 p-2 px-3'><div style='border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url("+doctor_image+");' class='doctor-img p-3'></div></div><div class='col-md-9 p-2 px-3'><p class='text-secondary mb-0' style='color:#ccc!important'>DOCTOR</p><h5 class='mt-2'><a href='javascript:' style='color:black' onclick='displayDocotorExtraInfo("+JSON.stringify(doctors[i])+")'>"+doctors[i].user.first_name +" "+doctors[i].user.last_name+"</a></h5></div></div><div class='row mt-2 p-2'>"+timeSlotdata+"</div></div></div>";
            }
        }
        $("#available-doctors-div").html(doctors_and_timslots)

    }

    function passTimslotId(time_slot_id, user_id) {
        console.log("this is a crazy")
        $("#time_slot_id").val(time_slot_id)
        $("#user_id").val(user_id)

        $('.'+user_id).addClass('white_button')
        $('#'+time_slot_id+user_id).removeClass('white_button')
        $('#'+time_slot_id+user_id).addClass('black_button')
    }

    $("#cancelRoutineCareForm").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'cancelBooking']) -->',
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);
                console.log(res);
                // alertify
                alertify.success(res ? "Cancelled Successfully" : "An error Occured");
                window.location.reload()
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");

            }
        });
    });
    $("#cancelAppointmentCareForm").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'cancelBooking']) -->',
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);
                console.log(res);
                // alertify
                alertify.success(res ? "Cancelled Successfully" : "An error Occured");
                window.location.reload()
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");

            }
        });
    });

    function copayChecker(id) {
        const copayInput = document.querySelector(\`#\${id} #copay\`);
        copay_check = document.querySelector(\`#\${id} #copay_check\`)
        if (copay_check.checked) {
            copayInput.value = '1';
            // Style the toggle switch when checked
            copay_check.nextElementSibling.style.backgroundColor = '#10b981';
            copay_check.nextElementSibling.nextElementSibling.style.transform = 'translateX(26px)';
        } else {
            copayInput.value = '0';
            // Style the toggle switch when unchecked
            copay_check.nextElementSibling.style.backgroundColor = '#ccc';
            copay_check.nextElementSibling.nextElementSibling.style.transform = 'translateX(0)';
        }
    }

</script>


<script>
    function renderConflicts(conflictsData) {
        const container = document.getElementById('conflicts-container');
        
        conflictsData.forEach(conflict => {
            const conflictDiv = document.createElement('div');
            conflictDiv.className = 'conflict-group';
            
            const date = new Date(conflict.start).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const startTime = new Date(conflict.start).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            
            const endTime = new Date(conflict.end).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            
            conflictDiv.innerHTML = \`
                <div class="conflict-header">
                    <div class="conflict-date">\${date}</div>
                    <div class="conflict-time">\${startTime} - \${endTime}</div>
                </div>
                <div class="tasks-list">
                    \${conflict.tasks.map(task => \`
                        <div class="task-item" style="border-left-color: \${task.color}">
                            <div class="task-title">\${task.title}</div>
                            <div class="task-details">
                                Dr: \${task.user.trim()} | \${task.specialty}
                            </div>
                            <div class="task-time">
                                \${new Date(task.start).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })} - 
                                \${new Date(task.end).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                        </div>
                    \`).join('')}
                </div>
            \`;
            
            container.appendChild(conflictDiv);
        });
    }

    function filterOptionsCalendar() {
        let bundletypefilter_val = $('#bundletypefilter').val()
        let doctorfilter_val = $('#doctorfilter').val()
        let patientfilter_val = $('#patientfilter').val()
        
        let tasks = plannerData.task.filter(ele => {
            doctorfilter_bool = true
            patientfilter_bool = true
            if (doctorfilter_val != '') {
                doctorfilter_bool = (ele.user_id == doctorfilter_val)
            }
            if (patientfilter_val != '') {
                patientfilter_bool = (ele.patient_id.split(' ').join('') == patientfilter_val)
            }
            return doctorfilter_bool && patientfilter_bool
        })

        let resources = plannerData.resource.filter(ele => {
            res_bool = true
            if (bundletypefilter_val != '') {
                res_bool = ele.id == bundletypefilter_val
            }
            return res_bool
        })

        setORPlanner({
            'task': tasks,
            'resource': resources,
            'completionRate': 'n/a'
        })
        
    }
</script>
`;

export default function ElementElementQueueDoctorsCalendar() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
