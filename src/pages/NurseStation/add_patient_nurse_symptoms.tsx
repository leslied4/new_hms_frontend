import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/NurseStation/add_patient_nurse_symptoms.php';
const rawHtml = `
<style>
    #odq_symptom .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    /* Header styles */
    #odq_symptom .header {
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }

    #odq_symptom .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    #odq_symptom .header-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #111827;
    }

    #odq_symptom .header-description {
        color: #6b7280;
    }

    #odq_symptom .date-display {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6b7280;
        font-size: 0.875rem;
    }

    /* Role selector */
    #odq_symptom .role-selector {
        display: flex;
        gap: 0.5rem;
    }

    #odq_symptom .role-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
    }

    #odq_symptom .any-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
    }

    #odq_symptom .role-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
    }

    #odq_symptom .role-btn.active {
        color: white;
    }

    #odq_symptom .role-btn:not(.active) {
        background-color: #f3f4f6;
        color: #4b5563;
    }

    #odq_symptom .role-btn:not(.active):hover {
        background-color: #e5e7eb;
    }

    .odqs_view_role_buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
    }

    .odqs_view_role_buttons.active {
        color: white;
    }

    .odqs_view_role_buttons:not(.active) {
        background-color: #f3f4f6;
        color: #4b5563;
    }

    .odqs_view_role_buttons:not(.active):hover {
        background-color: #e5e7eb;
    }

    .bg-blue-500 {
        background-color: #3b82f6;
    }

    .bg-green-500 {
        background-color: #10b981;
    }
    .bg-red-500 {
        background-color: red;
    }

    .bg-purple-500 {
        background-color: #8b5cf6;
    }

    .bg-pink-500 {
        background-color: pink;
    }

    /* Main grid layout */
    #odq_symptom .main-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 1.5rem;
    }

    /* Panel base styles */
    #odq_symptom .panel {
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        overflow: hidden;
    }

    /* Left panel */
    #odq_symptom .left-panel {
        grid-column: span 4;
    }

    #odq_symptom .search-container {
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }

    #odq_symptom .search-input-container {
        position: relative;
    }

    #odq_symptom .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
    }

    #odq_symptom .search-input {
        width: 100%;
        padding: 0.5rem 0.75rem 0.5rem 2.25rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
    }

    #odq_symptom .search-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    #odq_symptom .categories-container {
        max-height: 24rem;
        overflow-y: auto;
    }

    #odq_symptom .category {
        border-bottom: 1px solid #f3f4f6;
    }

    #odq_symptom .category-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        font-weight: 500;
        color: #111827;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    #odq_symptom .category-header:hover {
        background-color: #f9fafb;
    }

    #odq_symptom .symptoms-list {
        padding: 0 1rem 1rem;
    }

    #odq_symptom .symptom-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    #odq_symptom .symptom-item:hover {
        background-color: #f0f9ff;
    }

    #odq_symptom .symptom-item.selected {
        background-color: #dbeafe;
        border-right: 2px solid #3b82f6;
    }

    #odq_symptom .symptom-info {
        flex: 1;
    }

    #odq_symptom .symptom-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
    }

    #odq_symptom .symptom-code {
        font-size: 0.75rem;
        color: #6b7280;
    }

    #odq_symptom .severity-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    #odq_symptom .severity-high {
        color: #dc2626;
        background-color: #fef2f2;
    }

    #odq_symptom .severity-medium {
        color: #ca8a04;
        background-color: #fefce8;
    }

    #odq_symptom .severity-low {
        color: #16a34a;
        background-color: #f0fdf4;
    }

    /* Quick actions */
    #odq_symptom .quick-actions {
        margin-top: 1rem;
        padding: 1rem;
    }

    #odq_symptom .quick-actions-title {
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.75rem;
    }

    #odq_symptom .action-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        text-align: left;
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: none;
        background: none;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 0.875rem;
    }

    #odq_symptom .action-btn:hover {
        background-color: #f9fafb;
    }

    #odq_symptom .action-btn i {
        width: 1rem;
    }

    #odq_symptom .blue-icon {
        color: #3b82f6;
    }

    #odq_symptom .green-icon {
        color: #10b981;
    }

    #odq_symptom .purple-icon {
        color: #8b5cf6;
    }

    /* Middle panel */
    #odq_symptom .middle-panel {
        grid-column: span 5;
    }

    #odq_symptom .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        text-align: center;
    }

    #odq_symptom .empty-icon {
        font-size: 3rem;
        color: #9ca3af;
        margin-bottom: 1rem;
    }

    #odq_symptom .empty-title {
        font-size: 1.125rem;
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.5rem;
    }

    #odq_symptom .empty-description {
        color: #6b7280;
    }

    /* Symptom form */
    #odq_symptom .symptom-form {
        padding: 1.5rem;
    }

    #odq_symptom .symptom-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
    }

    #odq_symptom .symptom-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }

    #odq_symptom .tabs {
        display: flex;
        border-bottom: 1px solid #e5e7eb;
        margin-bottom: 1.5rem;
    }

    #odq_symptom .tab {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
        border: none;
        background: none;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
    }

    #odq_symptom .tab.active {
        color: #3b82f6;
        border-bottom-color: #3b82f6;
    }

    #odq_symptom .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    #odq_symptom .form-field {
        margin-bottom: 1rem;
    }

    #odq_symptom .form-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.25rem;
    }

    #odq_symptom .form-input,
    .form-select,
    .form-textarea {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
    }

    #odq_symptom .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    #odq_symptom .form-textarea {
        resize: vertical;
        min-height: 5rem;
    }

    #odq_symptom .radio-group {
        display: flex;
        gap: 1rem;
    }

    #odq_symptom .radio-option {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
    }

    #odq_symptom .form-actions {
        display: flex;
        gap: 0.75rem;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
    }

    #odq_symptom .btn {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    #odq_symptom .btn-primary {
        background-color: #3b82f6;
        color: white;
    }

    #odq_symptom .btn-primary:hover {
        background-color: #2563eb;
    }

    #odq_symptom .btn-secondary {
        background-color: white;
        border: 1px solid #d1d5db;
        color: #374151;
    }

    #odq_symptom .btn-secondary:hover {
        background-color: #f9fafb;
    }

    #odq_symptom .btn-success {
        background-color: #10b981;
        color: white;
    }

    #odq_symptom .btn-success:hover {
        background-color: #059669;
    }

    /* Right panel */
    #odq_symptom .right-panel {
        grid-column: span 3;
    }

    #odq_symptom .history-panel,
    .features-panel {
        margin-bottom: 1rem;
    }

    #odq_symptom .panel-header {
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        font-weight: 500;
        color: #111827;
    }

    #odq_symptom .history-list {
        max-height: 24rem;
        overflow-y: auto;
    }

    #odq_symptom .history-item {
        padding: 1rem;
        border-bottom: 1px solid #f3f4f6;
    }

    #odq_symptom .history-item:last-child {
        border-bottom: none;
    }

    #odq_symptom .history-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    #odq_symptom .history-symptom {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
    }

    #odq_symptom .history-datetime {
        font-size: 0.75rem;
        color: #6b7280;
        margin-top: 0.25rem;
    }

    #odq_symptom .history-reporter {
        font-size: 0.75rem;
        color: #6b7280;
    }

    #odq_symptom .history-notes {
        font-size: 0.75rem;
        color: #6b7280;
        font-style: italic;
        margin-top: 0.5rem;
    }

    #odq_symptom .severity-badge-sm {
        padding: 0.125rem 0.5rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    #odq_symptom .severity-severe {
        color: #dc2626;
        background-color: #fef2f2;
    }

    #odq_symptom .severity-moderate {
        color: #ca8a04;
        background-color: #fefce8;
    }

    #odq_symptom .severity-mild {
        color: #16a34a;
        background-color: #f0fdf4;
    }

    #odq_symptom .features-list {
        padding: 1rem;
    }

    #odq_symptom .feature-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
    }

    #odq_symptom .feature-item:last-child {
        margin-bottom: 0;
    }

    #odq_symptom .feature-icon {
        color: #10b981;
        font-size: 0.875rem;
    }

    #odq_symptom .feature-text {
        font-size: 0.875rem;
        color: #6b7280;
    }
</style>

<div id="odq_symptom" class="">
    <!-- Header -->
    <div class="header d-flex justify-content-between">

        <!-- Role Selector -->
        <div class="role-selector">
            <button class="role-btn active bg-blue-500" data-role="triage">
                <i class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path fill="#63E6BE" d="M286 368C384.5 368 464.3 447.8 464.3 546.3C464.3 562.7 451 576 434.6 576L78 576C61.6 576 48.3 562.7 48.3 546.3C48.3 447.8 128.1 368 226.6 368L286 368zM585.7 169.9C593.5 159.2 608.5 156.8 619.2 164.6C629.9 172.4 632.3 187.4 624.5 198.1L522.1 338.9C517.9 344.6 511.4 348.3 504.4 348.7C497.4 349.1 490.4 346.5 485.5 341.4L439.1 293.4C429.9 283.9 430.1 268.7 439.7 259.5C449.2 250.3 464.4 250.6 473.6 260.1L500.1 287.5L585.7 169.8zM256.3 312C190 312 136.3 258.3 136.3 192C136.3 125.7 190 72 256.3 72C322.6 72 376.3 125.7 376.3 192C376.3 258.3 322.6 312 256.3 312z" />
                    </svg>
                </i>
                <span>Triage Nurse</span>
            </button>
            <button class="role-btn d-none" data-role="doctor">
                <i class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path fill="#63E6BE" d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z" />
                    </svg>
                </i>
                <span>Doctor</span>
            </button>
            <button class="role-btn" data-role="inpatient">
                <i class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path fill="#63E6BE" d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
                    </svg>
                </i>
                <span>Ward Nurse</span>
            </button>
        </div>
        <div class="d-flex">

            <button class="any-btn bg-red-500" style="color:white" data-dismiss="modal">
                <span>Close</span>
            </button>
            <button class="any-btn bg-green-500" style="color:white" onclick="finalizeOqdSubmission()">
                <span>Submit</span>
            </button>
        </div>


    </div>

    <!-- Main Content Grid -->
    <div class="main-grid">
        <!-- Left Panel - Symptom Categories -->
        <div class="panel left-panel">
            <div class="search-container">
                <div class="search-input-container">
                    <i class="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                            <path fill="#63E6BE" d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z" />
                        </svg>
                    </i>
                    <input type="text" class="search-input" placeholder="Search symptoms or ICD codes..." id="searchInput">
                </div>
            </div>

            <div class="categories-container" id="categoriesContainer">
                <!-- Categories will be populated by JavaScript -->
            </div>

        </div>

        <!-- Middle Panel - Form -->
        <div class="panel middle-panel" id="odqUserForm">
            <div id="emptyState" class="empty-state">
                <i class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path fill="#63E6BE" d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z" />
                    </svg>
                </i>
                <h3 class="empty-title">Select a Symptom</h3>
                <p class="empty-description">Choose a symptom from the left panel to begin documentation</p>
            </div>

            <div id="symptomForm" class="symptom-form" style="display: none;">
                <input type="hidden" id="selectedOdqId" name="odq_id">

                <div class="symptom-header">
                    <h3 class="symptom-title" id="symptomTitle">Symptom Name (Code)</h3>
                    <span class="severity-badge" id="symptomSeverity">high priority</span>
                </div>

                <!-- Role-specific tabs -->
                <div class="tabs" id="tabsContainer">
                    <!-- Tabs will be populated by JavaScript -->
                </div>

                <!-- Form fields based on role -->
                <div class="form-content">
                    <div class="form-grid">
                        <div class="form-field">
                            <label class="form-label">Onset</label>
                            <input type="datetime-local" class="form-input" name="onset">
                        </div>
                        <div class="form-field">
                            <label class="form-label">Duration</label>
                            <SearchableSelectField class="form-select" name="duration">
                                <option>Select duration</option>
                                <option>&lt; 1 hour</option>
                                <option>1-6 hours</option>
                                <option>6-24 hours</option>
                                <option>&gt; 24 hours</option>
                                <option>Chronic</option>
                            </SearchableSelectField>
                        </div>
                    </div>

                    <div class="form-field">
                        <label class="form-label">Severity</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="severity" value="mild">
                                <span>Mild</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="severity" value="moderate">
                                <span>Moderate</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="severity" value="severe">
                                <span>Severe</span>
                            </label>
                        </div>
                    </div>

                    <div id="triageSpecific" class="form-field" style="display: none;">
                        <label class="form-label">Triage Priority</label>
                        <SearchableSelectField class="form-select" name="triage_priority">
                            <option>1 - Immediate (Red)</option>
                            <option>2 - Urgent (Orange)</option>
                            <option>3 - Less Urgent (Yellow)</option>
                            <option>4 - Non-Urgent (Green)</option>
                            <option>5 - Non-Urgent (Blue)</option>
                        </SearchableSelectField>
                    </div>

                    <div id="doctorSpecific" style="display: none;">
                        <div class="form-field">
                            <label class="form-label">Character/Quality</label>
                            <input type="text" placeholder="e.g., sharp, dull, burning, crushing..." class="form-input" name="character_quality">
                        </div>
                        <div class="form-field">
                            <label class="form-label">Radiation</label>
                            <input type="text" placeholder="e.g., to left arm, jaw, back..." class="form-input" name="radiation">
                        </div>
                        <div class="form-grid">
                            <div class="form-field">
                                <label class="form-label">Aggravating Factors</label>
                                <input type="text" placeholder="What makes it worse?" class="form-input" name="aggravating_factors">
                            </div>
                            <div class="form-field">
                                <label class="form-label">Relieving Factors</label>
                                <input type="text" placeholder="What makes it better?" class="form-input" name="relieving_factors">
                            </div>
                        </div>
                    </div>

                    <div class="form-field">
                        <label class="form-label">Associated Symptoms</label>
                        <input type="text" placeholder="e.g., nausea, diaphoresis, palpitations..." class="form-input" name="associated_symptoms">
                    </div>

                    <div class="form-field">
                        <label class="form-label">Notes</label>
                        <textarea class="form-textarea" id="notesTextarea" name="notes" placeholder="Initial assessment notes..."></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="button" id="odqUserFormSaveButton" class="btn btn-primary">Save & Continue</button>
                        <button type="button" id="clearFieldsBtn" onclick="clearOdqsFieldsForm()" class="btn btn-warning">Clear</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Right Panel - History & Features -->
        <div class="right-panel">
            <div class="panel history-panel">
                <div class="panel-header">Recorded Symptoms So Far <span id="recordedSymptomsCount" class="badge badge-primary ">0</span></div>
                <div class="history-list" id="historyList">
                    <!-- History items will be populated by JavaScript -->
                </div>
            </div>


        </div>
    </div>
</div>


<script>
    var selectedPatientOqds = {}
    // Data processing function
    function processSystemCategories(systemCategories) {
        return systemCategories.reduce((acc, curr) => {
            acc[curr.name] = {
                name: curr.name,
                symptoms: curr.odqs
            };
            return acc;
        }, {});
    }

    // Application state management
    function createApplicationState() {
        return {
            selectedRole: 'triage',
            selectedSymptom: null,
            searchTerm: '',
            expandedCategories: {},
            activeTab: 'assessment',
            symptomHistory: []
        };
    }

    // Role configurations
    var roleConfigs = {
        all: {
            name: 'All Roles',
            icon: 'user-check',
            color: 'bg-pink-500',
            tabs: ['Assessment', 'Priority', 'Handoff'],
            features: ['Quick Assessment', 'Severity Scoring', 'Priority Assignment'],
            notesPlaceholder: 'Initial assessment notes...'
        },
        triage: {
            name: 'Triage Nurse',
            icon: 'user-check',
            color: 'bg-blue-500',
            tabs: ['Assessment', 'Priority', 'Handoff'],
            features: ['Quick Assessment', 'Severity Scoring', 'Priority Assignment'],
            notesPlaceholder: 'Initial assessment notes...'
        },
        // doctor: {
        //     name: 'Doctor',
        //     icon: 'stethoscope',
        //     color: 'bg-green-500',
        //     tabs: ['Chief Complaint', 'History', 'Examination'],
        //     features: ['Detailed Documentation', 'Differential Diagnosis', 'Treatment Plans'],
        //     notesPlaceholder: 'Clinical details and examination findings...'
        // },
        inpatient: {
            name: 'Ward Nurse',
            icon: 'user',
            color: 'bg-purple-500',
            tabs: ['Current Status', 'Tracking', 'Trends'],
            features: ['Continuous Monitoring', 'Progress Notes', 'Trend Analysis'],
            notesPlaceholder: 'Progress notes and observations...'
        }
    };

    // DOM elements cache
    function getDOMElements() {
        return {
            categoriesContainer: document.getElementById('categoriesContainer'),
            searchInput: document.getElementById('searchInput'),
            emptyState: document.getElementById('emptyState'),
            symptomForm: document.getElementById('symptomForm'),
            symptomTitle: document.getElementById('symptomTitle'),
            symptomSeverity: document.getElementById('symptomSeverity'),
            tabsContainer: document.getElementById('tabsContainer'),
            historyList: document.getElementById('historyList'),
            // featuresTitle: document.getElementById('featuresTitle'),
            featuresList: document.getElementById('featuresList'),
            notesTextarea: document.getElementById('notesTextarea'),
            triageSpecific: document.getElementById('triageSpecific'),
            doctorSpecific: document.getElementById('doctorSpecific'),

            roleButtons: document.querySelectorAll('.role-btn')
        };
    }

    // Set up event listeners
    function setupEventListeners(appState, systemCategories, selectedPatientOqds) {
        getDOMElements().searchInput.addEventListener('input', (e) => {
            appState.searchTerm = e.target.value.toLowerCase();
            renderCategories(systemCategories, appState);
        });

        getDOMElements().roleButtons.forEach(button => {
            button.addEventListener('click', () => {
                var role = button.dataset.role;
                setSelectedRole(role, appState);
            });
        });
        document.querySelectorAll('.odqs_view_role_buttons').forEach(button => {
            button.addEventListener('click', () => {
                var role = button.dataset.role;
                setSelectedRoleView(role);
            });
        });
    }

    // Set the selected role and update UI
    function setSelectedRole(role, appState) {
        appState.selectedRole = role;

        // Update role buttons
        getDOMElements().roleButtons.forEach(button => {
            if (button.dataset.role === role) {
                button.classList.add('active');
                // Apply the role-specific color
                var colorClass = roleConfigs[role].color;
                button.style.backgroundColor = '';
                button.classList.add(colorClass);
            } else {
                button.classList.remove('active');
                // Remove all color classes
                Object.values(roleConfigs).forEach(config => {
                    button.classList.remove(config.color);
                });
                button.style.backgroundColor = '';
            }
        });

        updateRoleUI(appState);
    }
    // Set the selected role and update UI
    function setSelectedRoleView(role) {
        // Update role buttons
        document.querySelectorAll('.odqs_view_role_buttons').forEach(button => {
            if (button.dataset.role === role) {
                button.classList.add('active');
                // Apply the role-specific color
                var colorClass = roleConfigs[role].color;
                button.style.backgroundColor = '';
                button.classList.add(colorClass);
            } else {
                button.classList.remove('active');
                // Remove all color classes
                Object.values(roleConfigs).forEach(config => {
                    button.classList.remove(config.color);
                });
                button.style.backgroundColor = '';
                if (role === 'all') {

                }

            }
        });

        if (role == 'all') {
            Object.keys(roleConfigs).forEach(r => {
                $(\`.odqView-\${r}\`).show();
            });
        } else {
            Object.keys(roleConfigs).forEach(r => {

                $(\`.odqView-\${r}\`).hide();
            });
            $(\`.odqView-\${role}\`).show();
        }

        updateUiHistoryOdqs();
    }

    function updateUiHistoryOdqs(params) {

    }

    // Update UI based on selected role
    function updateRoleUI(appState) {
        var config = roleConfigs[appState.selectedRole];

        // Update tabs
        renderTabs(appState);


        // Update form based on role
        getDOMElements().notesTextarea.placeholder = config.notesPlaceholder;

        // Show/hide role-specific fields
        if (appState.selectedRole === 'triage') {
            getDOMElements().triageSpecific.style.display = 'block';
            getDOMElements().doctorSpecific.style.display = 'none';
        } else if (appState.selectedRole === 'doctor') {
            getDOMElements().triageSpecific.style.display = 'none';
            getDOMElements().doctorSpecific.style.display = 'block';
        } else if (appState.selectedRole === 'inpatient') {
            getDOMElements().triageSpecific.style.display = 'none';
            getDOMElements().doctorSpecific.style.display = 'none';
        }
    }

    // Render symptom categories
    function renderCategories(systemCategories, appState) {
        getDOMElements().categoriesContainer.innerHTML = '';

        Object.entries(systemCategories).forEach(([key, category]) => {
            var filteredSymptoms = category.symptoms.filter(symptom =>
                symptom.name.toLowerCase().includes(appState.searchTerm) ||
                symptom?.code?.toLowerCase()?.includes(appState.searchTerm)
            );

            if (filteredSymptoms.length > 0) {
                var isExpanded = appState.searchTerm && appState.searchTerm != '' ? true : appState.expandedCategories[key];

                var categoryElement = document.createElement('div');
                categoryElement.className = 'category';

                categoryElement.innerHTML = \`
					<div class="category-header" data-category="\${key}">
						<span>\${category.name}</span>
						<i class="fas fa-chevron-\${isExpanded ? 'down' : 'right'}"></i>
					</div>
					\${isExpanded ? \`
						<div class="symptoms-list">
							\${filteredSymptoms.map(symptom => \`
								<div class="symptom-item \${appState.selectedSymptom?.name === symptom.name ? 'selected' : ''}" 
										data-category="\${key}" data-symptom="\${symptom.name}">
									<div class="symptom-info">
										<div class="symptom-name">\${symptom.name}</div>
										<div class="d-none symptom-code">\${symptom.code}</div>
									</div>
									<span class="severity-badge severity-high \${getSeverityClass(symptom.severity)}">
										\${symptom.code}
									</span>
								</div>
							\`).join('')}
						</div>
					\` : ''}
				\`;

                getDOMElements().categoriesContainer.appendChild(categoryElement);

                var header = categoryElement.querySelector('.category-header');

                if (header) {
                    header.addEventListener('click', () => {
                        console.log("Header clicked:", key, appState, systemCategories);
                        oldToggleCategory(key, appState, systemCategories);
                    });
                }

                // Add event listeners to symptom items
                if (isExpanded) {
                    categoryElement.querySelectorAll('.symptom-item').forEach(item => {
                        item.addEventListener('click', () => {
                            var categoryKey = item.dataset.category;
                            var symptomName = item.dataset.symptom;
                            selectSymptom(categoryKey, symptomName, appState, systemCategories, selectedPatientOqds);
                        });
                    });
                }
            }
        });
    }

    // Toggle category expansion
    function oldToggleCategory(category, appState, systemCategories) {
        console.log("Toggling category", category, appState.expandedCategories[category])
        appState.expandedCategories[category] = !appState.expandedCategories[category];
        renderCategories(systemCategories, appState);
    }

    // Select a symptom
    function selectSymptom(categoryKey, symptomName, appState, systemCategories, selectedPatientOqds) {
        var symptom = systemCategories[categoryKey].symptoms.find(s => s.name === symptomName);
        appState.selectedSymptom = symptom;

        // Update UI
        getDOMElements().emptyState.style.display = 'none';
        getDOMElements().symptomForm.style.display = 'block';

        getDOMElements().symptomTitle.textContent = \`\${symptom.name} (\${symptom.code || ''})\`;
        getDOMElements().symptomSeverity.textContent = \`\${symptom.severity || ''} priority\`;
        getDOMElements().symptomSeverity.className = \`severity-badge \${getSeverityClass(symptom.severity)}\`;
        $('#selectedOdqId').val(symptom.id);
        $('#odqUserFormSaveButton').off().on('click', () => {
            alertify.log(\`\${symptom.name} added to patient symptoms\`);
            var formInformation = serializeDiv();
            console.log("formInformation", formInformation);
            selectedPatientOqds[symptom.id] = {
                ...formInformation,
                id: symptom.id,
                name: symptom.name,
                odq_id: symptom.id,
                type: $('.role-selector .role-btn.active').data('role')
            };
            renderHistory(Object.values(selectedPatientOqds));
        });

        renderTabs(appState);
        renderCategories(systemCategories, appState); // Re-render to update selected state
    }

    // Render role-specific tabs
    function renderTabs(appState) {
        var tabs = roleConfigs[appState.selectedRole].tabs;

        getDOMElements().tabsContainer.innerHTML = tabs.map(tab => \`
			<button class="tab \${appState.activeTab === tab.toLowerCase() ? 'active' : ''}" data-tab="\${tab.toLowerCase()}">
				\${tab}
			</button>
		\`).join('');

        // Add event listeners to tabs
        getDOMElements().tabsContainer.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                appState.activeTab = tab.dataset.tab;
                renderTabs(appState);
            });
        });
    }

    // Render history items
    function renderHistory(symptomHistory) {
        $('#recordedSymptomsCount').html(symptomHistory.length);
        getDOMElements().historyList.innerHTML = symptomHistory.map(entry => \`
			<div style="cursor: pointer" onclick="populateOdqFormField('\${entry.id}')" class="history-item d-flex flex-column">
				<div class="history-header">
                    <div class="d-flex flex-wrap">
                        <button type="button" id="patientOdqEntry\${entry.id}" onclick="removeAddedOdq('\${entry.id}')" style="background: #ff4d4d;border: none;color: white;padding: 6px 10px;border-radius: 6px;cursor: pointer;font-size: 8px;">
                            ❌
                        </button>
						<div class="history-symptom">\${entry.name}</div>
						<div class="history-datetime">\${new Date(entry.onset).toLocaleString()}</div>
                        <span class="severity-badge-sm \${getHistorySeverityClass(entry.severity)}">
                            \${entry.severity}
                        </span>
					</div>
				</div>
				\${entry.notes ? \`<div class="history-notes">\${entry.notes}</div>\` : ''}
			</div>
		\`).join('');
    }

    function serializeDiv(divId = 'odqUserForm') {
        var div = document.getElementById(divId);
        var inputs = div.querySelectorAll("input, select, textarea");
        var data = {};

        inputs.forEach(input => {
            if ((input.type === "checkbox" || input.type === "radio") && !input.checked) {
                return; // skip unchecked checkboxes/radios
            }
            data[input.name] = input.value;
        });

        return data;
    }

    // Get severity class for styling
    function getSeverityClass(severity) {
        switch (severity) {
            case 'high':
                return 'severity-high';
            case 'medium':
                return 'severity-medium';
            case 'low':
                return 'severity-low';
            default:
                return '';
        }
    }

    // Get history severity class for styling
    function getHistorySeverityClass(severity) {
        switch (severity) {
            case 'Severe':
                return 'severity-severe';
            case 'Moderate':
                return 'severity-moderate';
            case 'Mild':
                return 'severity-mild';
            default:
                return '';
        }
    }

    function removeAddedOdq(item_id) {
        delete selectedPatientOqds[item_id];
        renderHistory(Object.values(selectedPatientOqds));
    }

    function populateOdqFormField(item_id, form_id = 'odqUserForm') {
        var data = selectedPatientOqds[item_id]; // this should be the object from serializeDiv
        var container = $("#" + form_id); // change to your form/div id

        if (!data) return;

        // Loop through all keys in the saved data
        Object.keys(data).forEach(key => {
            var value = data[key];
            var $field = container.find(\`[name="\${key}"]\`);

            if ($field.length) {
                var type = $field.attr("type");

                if (type === "checkbox") {
                    $field.prop("checked", Array.isArray(value) ? value.includes($field.val()) : !!value);
                } else if (type === "radio") {
                    container.find(\`[name="\${key}"][value="\${value}"]\`).prop("checked", true);
                } else {
                    $field.val(value);
                }
            }
        });

        var symptom = data

        // Update UI
        getDOMElements().emptyState.style.display = 'none';
        getDOMElements().symptomForm.style.display = 'block';

        getDOMElements().symptomTitle.textContent = \`\${symptom.name} (\${symptom.code || ''})\`;
        getDOMElements().symptomSeverity.textContent = \`\${symptom.severity || ''} priority\`;
        getDOMElements().symptomSeverity.className = \`severity-badge \${getSeverityClass(symptom.severity)}\`;
        $('#selectedOdqId').val(symptom.id);
        $('#editOdqUserFormSaveButton').off().on('click', () => {
            var formInformation = serializeEditDiv();
            selectedPatientOqds[symptom.id] = {
                ...formInformation,
                id: symptom.id,
                name: symptom.name,
                odq_id: symptom.id
            };
            renderEditHistory(Object.values(selectedPatientOqds));
        });

    }

    function clearOdqsFieldsForm(form_id = 'odqUserForm') {
        var $form = $("#" + form_id); // change to your form/div id

        $form.find("input, select, textarea").each(function() {
            var type = $(this).attr("type");
            if (type === "checkbox" || type === "radio") {
                $(this).prop("checked", false);
            } else {
                $(this).val("");
            }
        });
    }


    // Main function
    function createOdqs(systemCategories, selectedPatientOqds) {
        // Process the system categories
        var processedSystemCategories = processSystemCategories(systemCategories);

        // Create application state
        var appState = createApplicationState();

        // Initialize the application
        function init() {
            renderCategories(processedSystemCategories, appState);
            updateRoleUI(appState);
            setupEventListeners(appState, processedSystemCategories, selectedPatientOqds);
        }

        init();
    }

    function clinicalEncounterTab() {
        var clinicalEncounterTab_link = "<!-- php: echo $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getOdqsWithCategories']); -->"
        $.ajax({
            type: 'GET',
            url: clinicalEncounterTab_link,
            cache: false,
            success: function(response) {
                var res = JSON.parse(response);
                createOdqs(res.odq_categories)
            }
        });
    }
    clinicalEncounterTab()

    function finalizeOqdSubmission() {
        var odq_form_data = Object.values(selectedPatientOqds)
        var cc_val = $('#cc-editor').val()
        var hopi = $('#hopi').val()
        var cc_onset = $('#cc_onset').val()
        var cc_type = $('#cc_type').val()


        const finalizeEcounter_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'finalizeEcounter', $patient->id, $selectedVisit->id, ] ); -->"
        $.ajax({
            type: 'POST',
            url: finalizeEcounter_link,
            data: {
                odq: odq_form_data,
            },
            success: function(response) {

                if (response.status == 1) {
                    alert('Odq Added Successfully');
                    getLatestEncounter()
                    $('#newNote_btn').click()
                } else {
                    alert('Something went wrong, please try again');
                    getLatestEncounter()
                }
            },
            error: function() {
                alertify.log("Please try again Later");

            }
        });
    }
</script>
`;

export default function NurseStationAddPatientNurseSymptomsPage() {
  return (
    <PageShell title="NurseStation/add_patient_nurse_symptoms.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
