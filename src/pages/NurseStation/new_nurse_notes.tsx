import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/NurseStation/new_nurse_notes.php';
const rawHtml = `

<head>
    <style>
        .nurse_notes_div {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .sbar-container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 25px;
        }
        .sbar-header {
            text-align: center;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .sbar-section {
            margin-bottom: 20px;
            background-color: #f9f9f9;
            border-left: 4px solid #3498db;
            padding: 15px;
        }
        .sbar-section h3 {
            margin-top: 0;
            color: #2980b9;
            font-size: 18px;
        }
        .sbar-section p {
            color: #555;
            margin-bottom: 10px;
        }
        .nurse_notes_text-input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
        }
        .nurse_notes_example {
            font-style: italic;
            color: #7f8c8d;
            font-size: 14px;
        }

        .sbar-container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 25px;
        }
        .sbar-header {
            text-align: center;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .sbar-section {
            margin-bottom: 20px;
            background-color: #f9f9f9;
            border-left: 4px solid #3498db;
            padding: 15px;
        }
        .sbar-section h3 {
            margin-top: 0;
            color: #2980b9;
            font-size: 18px;
        }
        .sbar-section p {
            color: #555;
            margin-bottom: 10px;
        }
        .nurse_notes_text-input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
        }
        .nurse_notes_example {
            font-style: italic;
            color: #7f8c8d;
            font-size: 14px;
        }
        .nurse_notes_dropdown {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
        }
        .nurse_notes_task-list {
            list-style-type: none;
            padding: 0;
        }
        .nurse_notes_task-list li {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .nurse_notes_task-list input[type="checkbox"] {
            margin-right: 10px;
        }
        .nurse_notes_task-list input[type="text"] {
            flex-grow: 1;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .sbar-container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 25px;
        }
        .sbar-header {
            text-align: center;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .sbar-section {
            margin-bottom: 20px;
            background-color: #f9f9f9;
            border-left: 4px solid #3498db;
            padding: 15px;
        }
        .sbar-section h3 {
            margin-top: 0;
            color: #2980b9;
            font-size: 18px;
        }
        .sbar-section p {
            color: #555;
            margin-bottom: 10px;
        }
        .nurse_notes_text-input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
        }
        .nurse_notes_example {
            font-style: italic;
            color: #7f8c8d;
            font-size: 14px;
        }
        .nurse_notes_dropdown {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
        }
        .checkbox-section {
            display: flex;
            align-items: center;
            margin-top: 10px;
        }
        .checkbox-section label {
            margin-left: 10px;
        }
    </style>
</head>

<div class="nurse_notes_div ">
    <div>
        <span class="bold">

            Select Preferred Framework: 
        </span>
        <button onclick="showHideOther('sbar')" class="btn btn-md btn-primary" id="sbar_button">SBAR</button>
        <button onclick="showHideOther('ipass')" class="btn btn-md" id="ipass_button">IPASS</button>
        <button onclick="showHideOther('heads_up')" class="btn btn-md" id="heads_up_button">HEADS UP</button>
    </div>
    <form id="sbar" style="">
        <div class="sbar-container">
            <div class="sbar-header">
                <h3 style="margin: 0">Nurse Notes Section</h3>
                <h4 style="margin: 0">SBAR Framework</h4>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">S - Situation</h3>
                <p>What's happening with the patient right now?</p>
                <p class="nurse_notes_example">Example: "Patient is post-op day 1 after appendectomy, complaining of moderate pain (5/10) localized in the abdomen."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter situation details" name="situation"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">B - Background</h3>
                <p>What is the clinical background or context?</p>
                <p class="nurse_notes_example">Example: "No allergies, stable vitals overnight, history of mild hypertension."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter background information" name="background"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">A - Assessment</h3>
                <p>What is the nurse's assessment of the issue?</p>
                <p class="nurse_notes_example">Example: "Pain likely due to surgical site inflammation; incision site appears clean with no signs of infection."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter assessment details" name="assessment"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">R - Recommendation</h3>
                <p>What is the recommended action or plan?</p>
                <p class="nurse_notes_example">Example: "Continue analgesics as prescribed; monitor incision site for drainage."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter recommendations" name="recommendation"></textarea>
            </div>
            <div class="form-group mt-2">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </div>

    </form>
    
    <form id="ipass" style="display:none">
        <div class="sbar-container">
            <div class="sbar-header">
                <h3 style="margin: 0">Nurse Notes Section</h3>
                <h4 style="margin: 0">I-PASS Framework</h4>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">I - Illness Severity</h3>
                <p>Select the current patient's illness severity:</p>
                <SearchableSelectField class="nurse_notes_dropdown" name="illness_severity">
                    <option value="stable">Stable</option>
                    <option value="watcher">Watcher</option>
                    <option value="unstable">Unstable</option>
                </SearchableSelectField>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">P - Patient Summary</h3>
                <p>Summarize key clinical details:</p>
                <p class="nurse_notes_example">Example: "67-year-old male admitted with pneumonia; responding well to antibiotics; diabetic."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter patient summary" name="patient_summary"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">A - Action List</h3>
                <p>Tasks or interventions for the next shift:</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter action items" name="action_list"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">S - Situation Awareness</h3>
                <p>Pending results, anticipated changes, or key alerts:</p>
                <p class="nurse_notes_example">Example: "Awaiting CBC results; monitor for worsening respiratory distress."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter situation awareness details" name="situation_awareness"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">S - Synthesis by Receiver</h3>
                <p>Confirmation of understanding:</p>
                <div class="checkbox-section">
                    <input type="checkbox" id="acknowledged" name="acknowledged">
                    <label for="acknowledged">Acknowledged by receiver</label>
                </div>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter receiver's comments or notes" name="receiver_comments"></textarea>
            </div>
            <div class="form-group mt-2">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </div>
    </form>
    
    <form id="heads_up" style="display:none">
        <div class="sbar-container">
            <div class="sbar-header">
                <h3 style="margin: 0">Nurse Notes Section</h3>
                <h4 style="margin: 0">HEADS-UP Framework</h4>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">H - History</h3>
                <p>Key medical history or recent events:</p>
                <p class="nurse_notes_example">Example: "History of stroke 2 years ago; no residual deficits."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter patient history" name="patient_history"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">E - Events of the Last 24 Hours</h3>
                <p>What happened during the last shift?</p>
                <p class="nurse_notes_example">Example: "Fever spiked to 101°F; Tylenol given with good response."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter recent events" name="recent_events"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">A - Anticipated Changes</h3>
                <p>Expected developments in the next shift:</p>
                <p class="nurse_notes_example">Example: "Patient likely to ambulate for the first time post-op; monitor for dizziness."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter anticipated changes" name="anticipated_changes"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">D - Diagnostics Pending</h3>
                <p>Lab results, imaging, or other tests awaiting results:</p>
                <p class="nurse_notes_example">Example: "Awaiting X-ray report to confirm NG tube placement."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter pending diagnostics" name="pending_diagnostics"></textarea>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">S - Stability of the Patient</h3>
                <p>Select patient's current stability status:</p>
                <SearchableSelectField class="nurse_notes_dropdown" name="patient_stability_status">
                    <option value="stable">Stable</option>
                    <option value="improved">Improved but needs monitoring</option>
                    <option value="deteriorating">Deteriorating – escalation required</option>
                </SearchableSelectField>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">U - Upcoming Tasks</h3>
                <p>Specific tasks for the next shift:</p>
                <p class="nurse_notes_example">Example: "Administer IV antibiotics at 6 PM; follow up on potassium level."</p>
                <ul class="nurse_notes_task-list">
                    <li>
                        <input type="checkbox" id="task1" name="task1">
                        <input type="text" placeholder="Enter task 1" name="task_description[]">
                    </li>
                    <li>
                        <input type="checkbox" id="task2" name="task2">
                        <input type="text" placeholder="Enter task 2" name="task_description[]">
                    </li>
                    <li>
                        <input type="checkbox" id="task3" name="task3">
                        <input type="text" placeholder="Enter task 3" name="task_description[]">
                    </li>
                </ul>
            </div>
    
            <div class="sbar-section">
                <h3 style="margin: 0">P - Priorities</h3>
                <p>Top concerns or actions to focus on immediately:</p>
                <p class="nurse_notes_example">Example: "Pain management; monitor for signs of infection at wound site."</p>
                <textarea class="nurse_notes_text-input" rows="4" placeholder="Enter priorities" name="priorities"></textarea>
            </div>
            <div class="form-group mt-2">
                <button class="btn btn-md btn-primary" type="submit">Submit</button>
            </div>
        </div>
    </form>
</div>


<script>
    function showHideOther(clicked) {
        [
            'sbar',
            'ipass',
            'heads_up',
        ].forEach(ele => {
            $('#'+ele).hide()
        });
        
        [
            'sbar_button',
            'ipass_button',
            'heads_up_button',
        ].forEach(ele => {
            $('#' + ele).removeClass('btn-primary');
        });
        
        $('#' + clicked + '_button').addClass('btn-primary');
        $('#'+clicked).show()
    }

    var nurseNotes_submitForm_link = '<!-- php: = $this->Url->build(['controller' => 'PatientVisitNurseNotes', 'action' => 'addNurseNote', $selectedVisit->patient_id, $selectedVisit->id, ]) -->'

    $('#sbar').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        var formData = form.serialize(); // Serialize the form data
        formData = form.serializeArray().reduce((acc, curr) => {acc[curr.name] = curr.value; return acc}, {}); // Serialize the form data
        formData['type'] = 'sbar'

        $.ajax({
            type: 'POST',
            url: nurseNotes_submitForm_link,
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

    $('#ipass').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        formData = form.serializeArray().reduce((acc, curr) => {acc[curr.name] = curr.value; return acc}, {}); // Serialize the form data
        formData['type'] = 'ipass'

        $.ajax({
            type: 'POST',
            url: nurseNotes_submitForm_link,
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

    $('#heads_up').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (!confirm('Are you sure you want to submit?')) {
            return
        }
        var form = $(this);
        formData = form.serializeArray().reduce((acc, curr) => {acc[curr.name] = curr.value; return acc}, {}); // Serialize the form data
        formData['task_description'] = $('input[name="task_description[]"]').map(function() {return $(this).val();}).get().join('; ');
        formData['type'] = 'heads_up'

        $.ajax({
            type: 'POST',
            url: nurseNotes_submitForm_link,
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
</script>
`;

export default function NurseStationNewNurseNotesPage() {
  return (
    <PageShell title="NurseStation/new_nurse_notes.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
