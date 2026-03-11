const rawHtml = `
<!-- Modern Availability Management Page -->
<style>
    /* Modern CSS Variables */
    :root {
        --primary-color: #667eea;
        --secondary-color: #764ba2;
        --accent-color: #8e44ad;
        --light-bg: #f8f9fa;
        --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        --transition: all 0.3s ease;
    }

    /* Modern Card Styles */
    .modern-card {
        border-radius: 16px;
        box-shadow: var(--card-shadow);
        border: none;
        overflow: hidden;
        transition: var(--transition);
    }

    .modern-card:hover {
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        transform: translateY(-5px);
    }

    .card-header-modern {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 20px 25px;
        border-bottom: none;
        font-weight: 600;
        font-size: 1.25rem;
    }

    /* Day Selection Styles */
    .day-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 15px;
        margin-bottom: 25px;
    }

    .day-btn {
        background: white;
        border: 2px solid #e9ecef;
        border-radius: 12px;
        padding: 18px 15px;
        font-weight: 600;
        color: #495057;
        transition: var(--transition);
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .day-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
        transform: translateY(-3px);
    }

    .day-btn.active {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border-color: transparent;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    .day-btn.active::after {
        content: '✓';
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.2);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Time Slot Styles */
    .time-slot-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 12px;
        max-height: 300px;
        overflow-y: auto;
        padding: 5px;
    }

    .time-slot {
        background: white;
        border: 2px solid #e9ecef;
        border-radius: 10px;
        padding: 12px 8px;
        font-size: 0.9rem;
        text-align: center;
        cursor: pointer;
        transition: var(--transition);
    }

    .time-slot:hover {
        border-color: var(--primary-color);
        transform: translateY(-2px);
    }

    .time-slot.selected {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border-color: transparent;
        box-shadow: 0 3px 10px rgba(102, 126, 234, 0.2);
    }

    /* Modal Styles */
    .modern-modal .modal-content {
        border-radius: 16px;
        overflow: hidden;
        border: none;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }

    .modal-header-modern {
        background: linear-gradient(135deg, var(--accent-color), #9b59b6);
        color: white;
        padding: 20px 25px;
        border-bottom: none;
    }

    .modal-body-modern {
        padding: 25px;
    }

    .modal-footer-modern {
        background: var(--light-bg);
        padding: 15px 25px;
        border-top: 1px solid #e9ecef;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    /* Button Styles */
    .btn-modern {
        border-radius: 10px;
        padding: 10px 20px;
        font-weight: 600;
        transition: var(--transition);
        border: none;
    }

    .btn-primary-modern {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
    }

    .btn-primary-modern:hover {
        background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        color: white;
    }

    .btn-outline-modern {
        background: transparent;
        border: 2px solid #dee2e6;
        color: #6c757d;
    }

    .btn-outline-modern:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
        background: transparent;
    }

    /* Minute Selector */
    .minute-selector {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        background: var(--light-bg);
        padding: 15px;
        border-radius: 12px;
    }

    .minute-selector label {
        margin-right: 10px;
        font-weight: 600;
        color: #495057;
        min-width: 120px;
    }

    .minute-input {
        border: 2px solid #e9ecef;
        border-radius: 8px;
        padding: 10px 15px;
        width: 80px;
        text-align: center;
        font-weight: 600;
        transition: var(--transition);
    }

    .minute-input:focus {
        border-color: var(--primary-color);
        outline: none;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .fetch-btn {
        margin-left: 10px;
        border-radius: 8px;
        padding: 10px 15px;
        background: var(--primary-color);
        color: white;
        border: none;
        font-weight: 600;
        transition: var(--transition);
    }

    .fetch-btn:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
    }

    /* Loading Animation */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .loading {
        animation: pulse 1.5s ease-in-out infinite;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .day-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        }
        
        .time-slot-grid {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        }
    }
</style>

<div class="row">
    <div class="col-12">
        <div class="card modern-card">
            <div class="card-header-modern">
                <i class="fas fa-calendar-alt mr-2"></i>
                Availability Schedule <small class="opacity-80">: <!-- php: = $editUser->first_name . ' ' . $editUser->last_name --></small>
            </div>
            <div class="card-body" id="bar-parent">
                <!-- php: = $this->Form->create($editUser, ['type' => 'file']); -->
                    <div class="form-body">
                        <div class="row">
                            <!-- php: if($editUser->role_id == 1 ): -->
                                <div class="col-12">
                                    <h5 class="mb-4 font-weight-600 text-dark">Select Available Days</h5>
                                    <div class="day-grid" id="day-slots">
                                        <!-- Days will be populated here -->
                                    </div>
                                </div>
                            <!-- php: endif; -->  
                        </div>
                    </div>
                <!-- php: =$this->Form->end(); -->
            </div>
        </div>
    </div>
</div>

<!-- Modern Modal -->
<div id="time-slot-modal"></div>

<script>
    // Modern JavaScript with improved functionality
    function getAllMinutes(duration) {
        const intervals = [];
        let currentMinute = 0;

        while (currentMinute < 1440) {
            const hours = Math.floor(currentMinute / 60);
            const minutes = currentMinute % 60;
            const timeString = \`\${hours}:\${minutes < 10 ? '0' + minutes : minutes}\`;
            intervals.push(timeString);
            currentMinute += duration;
        }

        return intervals;
    }

    function getAllBoxesMinutes(id) {
        let value = parseInt($(\`#selected_minutes_\${id}\`).val());
        if (isNaN(value) || value < 5) {
            alertify.error('Please enter a valid duration (minimum 5 minutes)');
            return;
        }
        
        const minutes = getAllMinutes(value);
        let result = [];
        
        minutes.forEach(ele => {
            result.push(\`
                <div class="time-slot" id="time_btn_\${ele.replace(':', '-')}_\${id}" 
                     onclick="toggleTimeSlot('\${(id)}', '\${(ele)}')">
                    \${ele}
                </div>
            \`);
        });

        $(\`#time-slots-div_\${id}\`).html(result.join(''));
        
        // Re-select previously selected time slots
        selected_day_and_time_arr.forEach(item => {
            if (item && item.booking_dayslot_id == id) {
                $(\`#time_btn_\${item.booking_timeslot_id.replace(':', '-')}_\${id}\`).addClass('selected');
            }
        });
    }

    // Global variables
    var selected_day_and_time_arr = [];

    // Initialize datepicker if needed
    <!-- php: if($editUser->role_id == 1 ): -->
        mobiscroll.setOptions({
            locale: mobiscroll.localeEn,        
            theme: 'ios',                      
            themeVariant: 'light'                
        });
            
        mobiscroll.datepicker('#demo-timegrid', {
            controls: ['timegrid'], 
            display: 'inline',
            selectMultiple: true,
        });
    <!-- php: endif; -->

    // Toggle time slot selection
    function toggleTimeSlot(day_id, timeslot_id) {
        const minute = parseInt($(\`#selected_minutes_\${day_id}\`).val());
        let index = -1;
        
        // Check if this timeslot is already selected
        for (let i = 0; i < selected_day_and_time_arr.length; i++) {
            const item = selected_day_and_time_arr[i];
            if (item && item.booking_dayslot_id == day_id && item.booking_timeslot_id == timeslot_id) {
                index = i;
                break;
            }
        }
        
        // Toggle selection
        if (index > -1) {
            selected_day_and_time_arr[index] = undefined;
            $(\`#time_btn_\${timeslot_id.replace(':', '-')}_\${day_id}\`).removeClass('selected');
        } else {
            selected_day_and_time_arr.push({
                "booking_dayslot_id": day_id, 
                "booking_timeslot_id": timeslot_id, 
                "minute": minute
            });
            $(\`#time_btn_\${timeslot_id.replace(':', '-')}_\${day_id}\`).addClass('selected');
        }
        
        // Compact array by removing undefined values
        selected_day_and_time_arr = selected_day_and_time_arr.filter(item => item !== undefined);
    }

    // Getting consultations available for that specialty
    function getConsultations() {
        var specialty_id = <!-- php: echo $editUser->specialty_id; -->;
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getConsultationsBySpecialty']) -->/'+ specialty_id,
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                selected_cons = res.selected_consultations;
                res = res.consultations;

                for (var i in res) {
                    $('#consultation_id').append($('<option data-name="'+res[i].name+'"></option>')
                        .val(res[i].id).html(res[i].name));  
                }

                // Indicating selected consultations
                $("#consultation_id option").each(function(){
                    for(var k in selected_cons) {
                        if(selected_cons[k].consultation_id == $(this).val()) {
                            $(this).attr('selected', 'selected');
                        }
                    }
                });
                $("#consultation_id").selectpicker("refresh");
            },
            error: function(){
                console.log("Error Occurred");
                alertify.error('Failed to load consultations');
            }
        });
    }

    // Getting day slots
    var resultedDaySlots = {}
    function getDayAndTimeSlots() {
        // Show loading state
        $('#day-slots').html('<div class="col-12 text-center py-4"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Loading availability...</p></div>');
        
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getDaySlots']) -->',
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                resultedDaySlots = res
                populateDaySlots(res);
            },
            error: function(){
                console.log("Error Occurred");
                $('#day-slots').html('<div class="col-12 text-center py-4 text-danger"><i class="fas fa-exclamation-circle fa-2x"></i><p class="mt-2">Failed to load availability</p></div>');
                alertify.error('Failed to load availability data');
            }
        });
    }

    // Populating dayslots
    function populateDaySlots(days_and_times) {
        let slot_list = '';
        const dayslots = days_and_times.day_slots;
        const selected = days_and_times.selected;
        
        dayslots.forEach(day => {
            let isActive = false;
            let selected_minutes = 40; // Default
            
            // Check if this day is selected
            for(let j in selected) {
                if(selected[j].booking_dayslot_id === day.id) {
                    isActive = true;
                    selected_minutes = selected[j].minute || 40;
                    break;
                }
            }
            
            slot_list += \`
                <div class="day-btn \${isActive ? 'active' : ''}" 
                     id="day_btn_\${day.id}"
                     onclick="openTimeModal(\${day.id}, '\${day.day}', \${selected_minutes})">
                    \${day.day}
                </div>
            \`;
        });
        
        $("#day-slots").html(slot_list);
    }

    // Open time selection modal
    function openTimeModal(day_id, day, minute_info) {
        // Reset selection array
        selected_day_and_time_arr = [];
        
        $("#time-slot-modal").html(\`
            <div class="modal fade modern-modal" id="availabilityModal\${day_id}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header-modern">
                            <h5 class="modal-title">
                                <i class="far fa-clock mr-2"></i>
                                Time Slots for \${day}
                            </h5>
                            <button type="button" class="close text-slate-900" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body-modern">
                            <div class="minute-selector">
                                <label for="selected_minutes_\${day_id}">Time Slot Duration In:</label>
                                <input type="number" id="selected_minutes_\${day_id}" class="minute-input" 
                                       value="\${minute_info || 40}" min="5" max="120" step="5">
                                <button class="fetch-btn" onclick="getAllBoxesMinutes('\${day_id}')">
                                    <i class="fas fa-sync-alt mr-1"></i> Generate Slots
                                </button>
                            </div>
                            <div class="time-slot-grid" id="time-slots-div_\${day_id}">
                                <!-- Time slots will be generated here -->
                            </div>
                        </div>
                        <div class="modal-footer-modern">
                            <button type="button" class="btn btn-outline-modern" data-dismiss="modal">
                                <i class="fas fa-times mr-1"></i> Cancel
                            </button>
                            <button type="button" class="btn btn-primary-modern" onclick="saveSelectedDayAndTimeslots()">
                                <i class="fas fa-save mr-1"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        \`);
        
        // Generate time slots initially
        getAllBoxesMinutes(day_id);
        
        // Load previously selected time slots for this day
        console.log("day_id", day_id, )
        res = resultedDaySlots;
        if (Array.isArray(res.selected)) {
            res.selected.forEach(selected => {
                selected.selected_doctor_booking_timeslots.forEach(slot => {
                    if (day_id == selected.booking_dayslot_id) {
                        selected_day_and_time_arr.push({
                            "booking_dayslot_id": selected.booking_dayslot_id,
                            "booking_timeslot_id": slot.booking_timeslot_value,
                            "minute": selected.minute
                        });
                        $(\`#time_btn_\${slot.booking_timeslot_value.replace(':', '-')}_\${selected.booking_dayslot_id}\`).addClass('selected');
                    }
                });
                
            });
        }
        
        // Show the modal
        $(\`#availabilityModal\${day_id}\`).modal('show');
    }

    // Save selected day and timeslots
    function saveSelectedDayAndTimeslots() {
        if (selected_day_and_time_arr.length === 0) {
            alertify.warning('Please select at least one time slot');
            return;
        }
        
        // Show loading state
        const saveBtn = $('.modal-footer-modern .btn-primary-modern');
        saveBtn.html('<i class="fas fa-spinner fa-spin mr-1"></i> Saving...');
        saveBtn.prop('disabled', true);
        
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'saveSelectedDayAndTimeslots']) -->',
            type: 'POST',
            data: {
                selected_data: selected_day_and_time_arr,
            },
            cache: false,
            success: function(res) {
                // res = JSON.parse(res);
                if (res == 1) {
                    alertify.success('Your availability has been saved successfully');
                    $('.modal').modal('hide');
                    getDayAndTimeSlots(); // Refresh the day slots
                } else {
                    alertify.error('Failed to save availability');
                }
            },
            error: function() {
                alertify.error('Error saving availability');
            },
            complete: function() {
                saveBtn.html('<i class="fas fa-save mr-1"></i> Save Changes');
                saveBtn.prop('disabled', false);
            }
        });
    }

    // Document ready
    $(document).ready(function() {
        getConsultations();
        getDayAndTimeSlots();
        
        // Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>
`;

export default function ElementElementQueueDoctorsAvailability() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
