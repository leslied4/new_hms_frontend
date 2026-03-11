const rawHtml = `
<!-- php: $patient_id = $selectedVisit->patient_id; $patient_visit_id = $selectedVisit->id; $patient_age = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_o... -->

<div class="row">
	<style>
		.dropup {
			position: relative;
			display: inline-block;
		}

		.dropup-content {
			display: none;
			position: absolute;
			bottom: 30px;
			background-color: #f1f1f1;
			min-width: 160px;
			box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
			z-index: 1;
		}

		.dropup-content a {
			color: black;
			padding: 12px 16px;
			text-decoration: none;
			display: block;
		}

		.dropup-content a:hover {
			background-color: deepskyblue;
			color: #fff;
		}

		.dropup:hover .dropup-content {
			display: block;
		}

		.dropup:hover .dropbtn {
			background-color: #2980B9;
		}

		.submenu {
			position: relative;
		}

		.form-check-label{
			margin-right: 1px;
		}

		.submenu>div {
			background-color: #f1f1f1;
			visibility: hidden;
			position: absolute;
			left: 100%;
			top: 0;
			width: 100%;
			transition: .3s;
			opacity: 0;
		}

		.form-check{
			margin-bottom: 10px
		}


		.submenu:hover>div {
			visibility: visible;
			opacity: 1;
		}

		.submenu:hover>a {
			background-color: deepskyblue;
			color: #fff;
		}

		.stylish-card-section .card {
			border-radius: 10px;
			box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
			transition: all 0.2s;
		}

		.stylish-card-section .card:hover {
			box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
			transform: scale(1.01);
		}

		.clinicalMain .card {
			min-height: 130px;
		}

		.labsCard {
			border-color: #49cc90;

		}

		.medicationCard {
			border-color: #f93e3e;
		}


		.allergyCard {
			border-color: #fca130;

		}



		.examsCard {
			border-color: #BBADA1;
		}

		.problemsCard {
			border-color: #61affe;
		}

		.historyCard {
			border-color: #6c757d;
		}

		.vitalsCard .card-header {

			font-weight: bold;
			border-radius: 10px;
		}

		.examsCard .card-header {
			background: rgba(187, 173, 161, .3);
			font-weight: bold;
			border-radius: 10px;
		}

		.historyCard .card-header {
			background: rgba(108, 117, 125, .2);
			font-weight: bold;
			border-radius: 10px;
		}

		.medicationCard .card-header {
			background: rgba(249, 62, 62, .2);
			font-weight: bold;
			border-radius: 10px;

		}

		.problemsCard .card-header {
			background: rgba(97, 175, 254, .2);
			font-weight: bold;
			border-radius: 10px;
		}



		.labsCard .card-header {
			background: rgba(73, 204, 144, .2);
			font-weight: bold;
			border-radius: 10px;

		}

		.allergyCard .card-header {
			background: rgba(252, 161, 48, .2);
			font-weight: bold;
			border-radius: 10px;

		}

		.ccAccordion {
			border-color: lightblue;

		}

		.accordionDiv .card-header {

			background: rgba(97, 175, 254, .2);

		}

		.ck.ck-editor {
			width: 100%;
		}

		.ulLabs {
			margin: 0px;
			float: left;
			padding: 0px;
			width: 100%;
		}

		.ulLabs li {
			list-style-type: none;
			margin-bottom: 5px;
			padding-left: 7px;

		}

		.ulMedicationCard {
			margin: 0px;
			float: left;
			padding: 0px;
			width: 100%;
		}

		.ulMedicationCard li {
			margin-bottom: 5px;
			padding-left: 0px;
			float: left;

		}

		.wrapper .search-input {
			background: #f5f5f5;
			width: 100%;
			border-radius: 5px;
			position: relative;
			box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);
		}

		.search-input input {
			height: 55px;
			width: 100%;
			outline: none;
			border: none;
			border-radius: 5px;
			padding: 0 60px 0 20px;
			font-size: 18px;
			box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
		}

		.search-input.active input {
			border-radius: 5px 5px 0 0;
		}

		.search-input .autocom-box {
			padding: 0;
			opacity: 0;
			pointer-events: none;
			max-height: 280px;
			overflow-y: auto;
		}

		.search-input.active .autocom-box {
			padding: 10px 8px;
			opacity: 1;
			background: #F8F8FF;
			pointer-events: auto;
		}

		.autocom-box li {
			list-style: none;
			padding: 8px 12px;
			display: none;
			width: 100%;
			cursor: default;
			border-radius: 3px;
		}

		.search-input.active .autocom-box li {
			display: block;
		}

		.autocom-box li:hover {
			background: #efefef;
		}

		.search-input .icon {
			position: absolute;
			right: 5px;
			top: 5px;
			height: 55px;
			width: 55px;
			text-align: center;
			line-height: 55px;
			font-size: 20px;
			color: #644bff;
			cursor: pointer;
		}

		.accordion-header {
			padding: 10px;
			background: rgba(97, 175, 254, .2);

		}
	</style>
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

        .bg-blue-500 { background-color: #3b82f6; }
        .bg-green-500 { background-color: #10b981; }
        .bg-purple-500 { background-color: #8b5cf6; }
        .bg-pink-500 { background-color: pink; }

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

        #odq_symptom .blue-icon { color: #3b82f6; }
        #odq_symptom .green-icon { color: #10b981; }
        #odq_symptom .purple-icon { color: #8b5cf6; }

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

        #odq_symptom .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: 0.875rem;
        }

        #odq_symptom .form-input:focus, .form-select:focus, .form-textarea:focus {
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

        #odq_symptom .history-panel, .features-panel {
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
	<style>

        #new_symptoms .clinical-notes {
            background: white;
            min-height: 100vh;
        }

        /* Header */
        #new_symptoms .header {
            background-color: #eff6ff;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem;
        }

        #new_symptoms .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        #new_symptoms .header h2 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.25rem;
        }

        #new_symptoms .header p {
            font-size: 0.875rem;
            color: #6b7280;
        }

        #new_symptoms .header-buttons {
            display: flex;
            gap: 0.5rem;
        }

        #new_symptoms .btn-sm {
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            font-weight: 500;
        }

        #new_symptoms .btn-blue {
            background-color: #2563eb;
            color: white;
        }

        #new_symptoms .btn-blue:hover {
            background-color: #1d4ed8;
        }

        #new_symptoms .btn-green {
            background-color: #16a34a;
            color: white;
        }

        #new_symptoms .btn-green:hover {
            background-color: #15803d;
        }

        /* Navigation */
        #new_symptoms .nav-bar {
            border-bottom: 1px solid #e5e7eb;
            padding: 0.5rem;
        }

        #new_symptoms .nav-buttons {
            display: flex;
            gap: 0.25rem;
        }

        #new_symptoms .nav-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            background: transparent;
            color: #6b7280;
        }

        #new_symptoms .nav-btn:hover {
            background-color: #f3f4f6;
        }

        #new_symptoms .nav-btn.active {
            background-color: #dbeafe;
            color: #1d4ed8;
            border: 1px solid #93c5fd;
        }

        #new_symptoms .nav-icon {
            width: 1rem;
            height: 1rem;
        }

        /* Content */
        #new_symptoms .content {
            padding: 1rem;
        }

        #new_symptoms .space-y-6 > * + * {
            margin-top: 1.5rem;
        }

        #new_symptoms .space-y-4 > * + * {
            margin-top: 1rem;
        }

        #new_symptoms .space-y-2 > * + * {
            margin-top: 0.5rem;
        }

        /* Cards */
        #new_symptoms .card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1.5rem;
        }

        #new_symptoms .card-header {
            font-size: 1.125rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        #new_symptoms .card-icon {
            width: 1.25rem;
            height: 1.25rem;
        }

        /* Form Elements */
        .form-input,
        .form-textarea,
        #new_symptoms .form-select {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            padding: 0.75rem;
            font-size: 0.875rem;
        }

        .form-input:focus,
        .form-textarea:focus,
        #new_symptoms .form-select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        #new_symptoms .form-textarea {
            resize: vertical;
            font-family: inherit;
        }

        /* Grid */
        #new_symptoms .grid-cols-12 {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 0.5rem;
        }

        #new_symptoms .col-span-1 { grid-column: span 1; }
        #new_symptoms .col-span-2 { grid-column: span 2; }
        #new_symptoms .col-span-3 { grid-column: span 3; }
        #new_symptoms .col-span-4 { grid-column: span 4; }
        #new_symptoms .col-span-5 { grid-column: span 5; }
        #new_symptoms .col-span-6 { grid-column: span 6; }

        /* Framework Helper */
        #new_symptoms .framework-helper {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-top: 1rem;
        }

        #new_symptoms .framework-helper h4 {
            font-weight: 500;
            color: #1e3a8a;
            margin-bottom: 0.5rem;
        }

        #new_symptoms .framework-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            font-size: 0.875rem;
        }

        /* Quick Buttons */
        #new_symptoms .quick-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        #new_symptoms .quick-btn {
            padding: 0.25rem 0.75rem;
            font-size: 0.875rem;
            background-color: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 9999px;
            cursor: pointer;
        }

        #new_symptoms .quick-btn:hover {
            background-color: #e5e7eb;
        }

        /* History Items */
        #new_symptoms .history-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f9fafb;
            padding: 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid #e5e7eb;
        }

        #new_symptoms .history-item-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        #new_symptoms .history-item .font-medium {
            font-weight: 500;
        }

        #new_symptoms .text-sm {
            font-size: 0.875rem;
        }

        #new_symptoms .text-gray-600 {
            color: #6b7280;
        }

        /* Status badges */
        #new_symptoms .status-badge {
            padding: 0.125rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: 500;
        }

        #new_symptoms .status-active {
            background-color: #dcfce7;
            color: #166534;
        }

        #new_symptoms .status-inactive {
            background-color: #f3f4f6;
            color: #374151;
        }

        /* Severity colors */
        #new_symptoms .severity-high {
            color: #dc2626;
            background-color: #fef2f2;
            border-color: #fecaca;
        }

        #new_symptoms .severity-moderate {
            color: #d97706;
            background-color: #fffbeb;
            border-color: #fed7aa;
        }

        #new_symptoms .severity-mild {
            color: #16a34a;
            background-color: #f0fdf4;
            border-color: #bbf7d0;
        }

        /* Delete button */
        #new_symptoms .delete-btn {
            background: none;
            border: none;
            color: #dc2626;
            cursor: pointer;
            padding: 0.25rem;
        }

        #new_symptoms .delete-btn:hover {
            color: #991b1b;
        }

        /* Add button */
        #new_symptoms .add-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
            color: white;
            font-weight: 500;
        }

        #new_symptoms .add-btn-blue { background-color: #2563eb; }
        #new_symptoms .add-btn-blue:hover { background-color: #1d4ed8; }
        
        #new_symptoms .add-btn-purple { background-color: #7c3aed; }
        #new_symptoms .add-btn-purple:hover { background-color: #6d28d9; }
        
        #new_symptoms .add-btn-orange { background-color: #ea580c; }
        #new_symptoms .add-btn-orange:hover { background-color: #c2410c; }
        
        #new_symptoms .add-btn-red { background-color: #dc2626; }
        #new_symptoms .add-btn-red:hover { background-color: #b91c1c; }
        
        #new_symptoms .add-btn-yellow { background-color: #d97706; }
        #new_symptoms .add-btn-yellow:hover { background-color: #b45309; }

        /* Search input */
        #new_symptoms .search-container {
            position: relative;
            margin-bottom: 1rem;
        }

        #new_symptoms .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            width: 1rem;
            height: 1rem;
            color: #9ca3af;
        }

        #new_symptoms .search-input {
            width: 100%;
            padding-left: 2.5rem;
            padding-right: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            font-size: 0.875rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
        }

        /* System categories */
        #new_symptoms .system-category {
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            margin-bottom: 0.25rem;
        }

        #new_symptoms .system-header {
            background-color: #f9fafb;
            padding: 0.5rem 0.75rem;
            font-weight: 500;
            font-size: 0.875rem;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
        }

        #new_symptoms .system-content {
            padding: 0.5rem;
        }

        #new_symptoms .symptom-checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            padding: 0.25rem;
            border-radius: 0.25rem;
            cursor: pointer;
        }

        #new_symptoms .symptom-checkbox:hover {
            background-color: #f9fafb;
        }

        #new_symptoms .symptom-code {
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
        }

        /* Direct questioning layout */
        #new_symptoms .direct-questioning {
            display: grid;
            grid-template-columns: 1fr 1.25fr 0.75fr;
            gap: 1.5rem;
        }

        #new_symptoms .no-symptoms {
            text-align: center;
            padding: 3rem;
        }

        #new_symptoms .no-symptoms-icon {
            margin: 0 auto 1rem;
            width: 3rem;
            height: 3rem;
            color: #9ca3af;
        }

        #new_symptoms .quick-templates {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            padding: 0.75rem;
        }

        #new_symptoms .template-btn {
            width: 100%;
            text-align: left;
            font-size: 0.75rem;
            padding: 0.5rem;
            border: 1px solid #e5e7eb;
            background: white;
            border-radius: 0.375rem;
            cursor: pointer;
            margin-bottom: 0.25rem;
        }

        #new_symptoms .template-btn:hover {
            background-color: #f9fafb;
        }

        #new_symptoms .assistant-panel {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 0.375rem;
            padding: 0.75rem;
        }

        /* Bottom action bar */
        #new_symptoms .action-bar {
            border-top: 1px solid #e5e7eb;
            background-color: #f9fafb;
            padding: 0.75rem 1rem;
        }

        #new_symptoms .action-bar-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        #new_symptoms .action-buttons {
            display: flex;
            gap: 0.75rem;
        }

        #new_symptoms .btn-secondary {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            border: 1px solid #d1d5db;
            background: white;
            border-radius: 0.375rem;
            cursor: pointer;
        }

        #new_symptoms .btn-secondary:hover {
            background-color: #f9fafb;
        }

        #new_symptoms .btn-primary {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            background-color: #16a34a;
            color: white;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
        }

        #new_symptoms .btn-primary:hover {
            background-color: #15803d;
        }

        #new_symptoms .hidden {
            display: none;
        }

        /* Overflow handling */
        #new_symptoms .overflow-y-auto {
            overflow-y: auto;
            max-height: 24rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
            #new_symptoms .direct-questioning {
                grid-template-columns: 1fr;
            }
            
            #new_symptoms .grid-cols-12 {
                grid-template-columns: 1fr;
            }
            
            #new_symptoms .framework-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
	<style>

        #family_history .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 24px;
            background-color: white;
        }

        /* Header Styles */
        #family_history .header {
            margin-bottom: 32px;
        }

        #family_history .header-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
        }

        #family_history .header-info h1 {
            font-size: 30px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 8px;
        }

        #family_history .header-info p {
            color: #6b7280;
        }

        #family_history .header-actions {
            display: flex;
            gap: 12px;
        }

        #family_history .btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        }

        #family_history .btn-primary {
            background-color: #2563eb;
            color: white;
        }

        #family_history .btn-primary:hover {
            background-color: #1d4ed8;
        }

        #family_history .btn-success {
            background-color: #059669;
            color: white;
        }

        #family_history .btn-success:hover {
            background-color: #047857;
        }

        /* Alert Styles */
        #family_history .alert {
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        #family_history .alert-danger {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            color: #991b1b;
        }

        #family_history .alert h3 {
            font-weight: 600;
            color: #991b1b;
            margin-bottom: 4px;
        }

        #family_history .alert p {
            font-size: 14px;
            color: #7f1d1d;
        }

        /* Navigation Tabs */
        #family_history .nav-tabs {
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 24px;
        }

        #family_history .nav-tabs-list {
            display: flex;
            gap: 32px;
        }

        #family_history .nav-tab {
            padding: 8px 4px;
            border: none;
            background: none;
            color: #6b7280;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        }

        #family_history .nav-tab:hover {
            color: #374151;
            border-bottom-color: #d1d5db;
        }

        #family_history .nav-tab.active {
            color: #2563eb;
            border-bottom-color: #2563eb;
        }

        /* Grid Layouts */
        #family_history .grid {
            display: grid;
        }

        #family_history .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        #family_history .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        #family_history .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        #family_history .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

        #family_history .gap-4 { gap: 16px; }
        #family_history .gap-6 { gap: 24px; }
        #family_history .gap-8 { gap: 32px; }

        @media (min-width: 1024px) {
            #family_history .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            #family_history .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            #family_history .lg\\:col-span-1 { grid-column: span 1; }
            #family_history .lg\\:col-span-2 { grid-column: span 2; }
        }

        /* Cards */
        #family_history .card {
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
        }

        #family_history .card-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        }

        #family_history .card-title {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
        }

        #family_history .card-content {
            space-y: 16px;
        }

        /* Risk Cards */
        #family_history .risk-card {
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
        }

        #family_history .risk-card-blue {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
        }

        #family_history .risk-card-green {
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
        }

        #family_history .risk-card-red {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
        }

        #family_history .risk-card-purple {
            background-color: #faf5ff;
            border: 1px solid #e9d5ff;
        }

        #family_history .risk-card-yellow {
            background-color: #fffbeb;
            border: 1px solid #fed7aa;
        }

        /* Family History Entries */
        #family_history .family-entry {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
        }

        #family_history .family-entry-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }

        #family_history .family-entry-info {
            flex: 1;
        }

        #family_history .family-entry-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }

        #family_history .family-entry-actions {
            display: flex;
            gap: 8px;
            margin-left: 16px;
        }

        #family_history .family-entry-actions button {
            padding: 4px;
            border: none;
            background: none;
            color: #6b7280;
            cursor: pointer;
            border-radius: 4px;
            transition: color 0.2s;
        }

        #family_history .family-entry-actions button:hover {
            color: #2563eb;
        }

        /* Badges */
        #family_history .badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
        }

        #family_history .badge-high {
            background-color: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }

        #family_history .badge-moderate {
            background-color: #fffbeb;
            color: #92400e;
            border: 1px solid #fed7aa;
        }

        #family_history .badge-low {
            background-color: #f0fdf4;
            color: #166534;
            border: 1px solid #bbf7d0;
        }

        #family_history .badge-alive {
            background-color: #f0fdf4;
            color: #166534;
        }

        #family_history .badge-deceased {
            background-color: #f3f4f6;
            color: #374151;
        }

        /* Table */
        #family_history .table-container {
            overflow-x: auto;
        }

        #family_history .table {
            min-width: 100%;
            border-collapse: collapse;
        }

        .table th,
        #family_history .table td {
            padding: 12px 24px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }

        #family_history .table th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        #family_history .table tbody tr:hover {
            background-color: #f9fafb;
        }

        /* Modal */
        #family_history .modal {
            display: none;
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 50;
            align-items: center;
            justify-content: center;
            padding: 16px;
        }

        #family_history .modal.show {
            display: flex;
        }

        #family_history .modal-content {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-width: 500px;
            width: 100%;
            padding: 24px;
        }

        #family_history .modal-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 16px;
        }

        .modal-header h3 {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
        }

        #family_history .modal-close {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 4px;
        }

        #family_history .modal-close:hover {
            color: #374151;
        }

        /* Form */
        #family_history .form-group {
            margin-bottom: 16px;
        }

        #family_history .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 4px;
        }

        #family_history .form-control {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.2s;
        }

        #family_history .form-control:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        #family_history .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 24px;
        }

        #family_history .btn-secondary {
            background-color: #f3f4f6;
            color: #374151;
        }

        #family_history .btn-secondary:hover {
            background-color: #e5e7eb;
        }

        /* Timeline */
        #family_history .timeline {
            position: relative;
        }

        #family_history .timeline-item {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding-bottom: 24px;
        }

        #family_history .timeline-marker {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #family_history .timeline-dot {
            width: 12px;
            height: 12px;
            background-color: #2563eb;
            border-radius: 50%;
        }

        #family_history .timeline-line {
            width: 2px;
            height: 64px;
            background-color: #d1d5db;
            margin-top: 8px;
        }

        #family_history .timeline-content {
            flex: 1;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        #family_history .timeline-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        /* Utility Classes */
        #family_history .hidden { display: none; }
        #family_history .text-center { text-align: center; }
        #family_history .font-bold { font-weight: bold; }
        #family_history .text-sm { font-size: 14px; }
        #family_history .text-xs { font-size: 12px; }
        #family_history .mb-1 { margin-bottom: 4px; }
        #family_history .mb-2 { margin-bottom: 8px; }
        #family_history .mb-3 { margin-bottom: 12px; }
        #family_history .mb-4 { margin-bottom: 16px; }
        #family_history .mt-1 { margin-top: 4px; }
        #family_history .mt-3 { margin-top: 12px; }
        #family_history .mt-6 { margin-top: 24px; }

        /* Color Classes */
        #family_history .text-blue-600 { color: #2563eb; }
        #family_history .text-blue-700 { color: #1d4ed8; }
        #family_history .text-blue-800 { color: #1e40af; }
        #family_history .text-green-600 { color: #059669; }
        #family_history .text-green-700 { color: #047857; }
        #family_history .text-green-800 { color: #065f46; }
        #family_history .text-red-600 { color: #dc2626; }
        #family_history .text-red-700 { color: #b91c1c; }
        #family_history .text-red-800 { color: #991b1b; }
        #family_history .text-yellow-600 { color: #d97706; }
        #family_history .text-yellow-700 { color: #b45309; }
        #family_history .text-yellow-800 { color: #92400e; }
        #family_history .text-purple-600 { color: #9333ea; }
        #family_history .text-purple-700 { color: #7c3aed; }
        #family_history .text-purple-800 { color: #6b21a8; }
        #family_history .text-gray-500 { color: #6b7280; }
        #family_history .text-gray-600 { color: #4b5563; }
        #family_history .text-gray-700 { color: #374151; }
        #family_history .text-gray-900 { color: #111827; }

        /* Stats Cards */
        #family_history .stat-card {
            text-align: center;
            padding: 16px;
            border-radius: 8px;
        }

        #family_history .stat-number {
            font-size: 24px;
            font-weight: bold;
        }

        #family_history .stat-label {
            font-size: 14px;
            margin-top: 4px;
        }

        #family_history .stat-card-blue {
            background-color: #eff6ff;
        }

        #family_history .stat-card-blue .stat-number {
            color: #2563eb;
        }

        #family_history .stat-card-blue .stat-label {
            color: #2563eb;
        }

        #family_history .stat-card-green {
            background-color: #f0fdf4;
        }

        #family_history .stat-card-green .stat-number {
            color: #059669;
        }

        #family_history .stat-card-green .stat-label {
            color: #059669;
        }

        #family_history .stat-card-yellow {
            background-color: #fffbeb;
        }

        #family_history .stat-card-yellow .stat-number {
            color: #d97706;
        }

        #family_history .stat-card-yellow .stat-label {
            color: #d97706;
        }

        #family_history .stat-card-red {
            background-color: #fef2f2;
        }

        #family_history .stat-card-red .stat-number {
            color: #dc2626;
        }

        #family_history .stat-card-red .stat-label {
            color: #dc2626;
        }
    </style>
	<style>
        #problems-card .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
            background-color: white;
            min-height: 100vh;
        }

        #problems-card .header {
            margin-bottom: 24px;
        }

        #problems-card .title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }

        #problems-card .patient-info {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 16px;
        }

        #problems-card .filter-section {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
            padding: 12px;
            background-color: #f9fafb;
            border-radius: 8px;
        }

        #problems-card .filter-label {
            font-size: 14px;
            font-weight: 500;
        }

        #problems-card .filter-buttons {
            display: flex;
            gap: 8px;
        }

        #problems-card .filter-btn {
            padding: 4px 12px;
            font-size: 14px;
            border-radius: 20px;
            border: 1px solid #d1d5db;
            background: white;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.2s;
        }

        #problems-card .filter-btn:hover {
            background-color: #f3f4f6;
        }

        #problems-card .filter-btn.active {
            background-color: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }

        #problems-card .tree-space {
            margin-bottom: 16px;
        }

        #problems-card .tree-node {
            margin-bottom: 8px;
        }

        #problems-card .node-header {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
            background-color: #f3f4f6;
        }

        #problems-card .node-header:hover {
            background-color: #e5e7eb;
        }

        #problems-card .node-header.symptom {
            background-color: #eff6ff;
            border-left: 4px solid #60a5fa;
        }

        #problems-card .chevron {
            width: 16px;
            height: 16px;
            color: #6b7280;
            transition: transform 0.2s;
        }

        #problems-card .chevron.expanded {
            transform: rotate(90deg);
        }

        #problems-card .icon {
            width: 20px;
            height: 20px;
        }

        #problems-card .icon-small {
            width: 16px;
            height: 16px;
        }

        #problems-card .node-content {
            flex: 1;
        }

        #problems-card .node-title {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #problems-card .node-title-text {
            font-weight: 500;
        }

        #problems-card .priority-badge {
            padding: 2px 8px;
            font-size: 12px;
            border-radius: 12px;
        }

        #problems-card .priority-high {
            background-color: #fef2f2;
            color: #dc2626;
        }

        #problems-card .priority-medium {
            background-color: #fefce8;
            color: #ca8a04;
        }

        #problems-card .priority-low {
            background-color: #f0fdf4;
            color: #16a34a;
        }

        #problems-card .node-description {
            font-size: 14px;
            color: #6b7280;
            margin-top: 4px;
        }

        #problems-card .node-children {
            margin-left: 24px;
            border-left: 2px solid #e5e7eb;
            padding-left: 16px;
            margin-top: 8px;
        }

        #problems-card .symptoms-section {
            margin-left: 24px;
            border-left: 4px solid #d1d5db;
            padding-left: 16px;
        }

        #problems-card .symptoms-header {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #problems-card .status-dot {
            width: 12px;
            height: 12px;
            background-color: #10b981;
            border-radius: 50%;
        }

        #problems-card .priority-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        #problems-card .priority-dot.high {
            background-color: #ef4444;
        }

        #problems-card .priority-dot.medium {
            background-color: #eab308;
        }

        #problems-card .priority-dot.low {
            background-color: #10b981;
        }

        #problems-card .entry-card {
            border: 1px solid;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 8px;
        }

        #problems-card .entry-triage {
            background-color: #dbeafe;
            border-color: #93c5fd;
            color: #1e40af;
        }

        #problems-card .entry-doctor {
            background-color: #dcfce7;
            border-color: #86efac;
            color: #166534;
        }

        #problems-card .entry-inpatient {
            background-color: #fef3c7;
            border-color: #fcd34d;
            color: #92400e;
        }

        #problems-card .entry-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        #problems-card .entry-user {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
        }

        #problems-card .entry-time {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }

        #problems-card .entry-field {
            margin-bottom: 8px;
            font-size: 14px;
        }

        #renderCards .timeline {
            margin-top: 20px;
            border-top: 1px solid #e2e8f0;
            padding-top: 16px;
        }

        #renderCards .timeline-header {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
        }

        #renderCards .timeline-entries {
            position: relative;
            padding-left: 20px;
        }

        #renderCards .timeline-entries::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e2e8f0;
        }

        #renderCards .timeline-entry {
            position: relative;
            margin-bottom: 16px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
        }

        #renderCards .timeline-entry::before {
            content: '';
            position: absolute;
            left: -16px;
            top: 16px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #3b82f6;
        }

        #renderCards .timeline-entry.critical::before {
            background: #dc2626;
            animation: pulse 2s infinite;
        }

        #renderCards .timeline-time {
            font-size: 12px;
            color: #64748b;
            font-weight: 500;
        }

        #renderCards .timeline-event {
            font-size: 14px;
            color: #374151;
            margin-top: 4px;
        }

        #problems-card .entry-field:last-child {
            margin-bottom: 0;
        }

        #problems-card .entry-label {
            font-weight: 500;
        }

        #problems-card .entry-value {
            margin-top: 4px;
        }

        #problems-card .entry-assessment {
            font-weight: 500;
        }

        #problems-card .legend {
            margin-top: 32px;
            padding: 16px;
            background-color: #f9fafb;
            border-radius: 8px;
        }

        #problems-card .legend-title {
            font-weight: 600;
            margin-bottom: 12px;
        }

        #problems-card .legend-items {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
        }

        #problems-card .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #problems-card .legend-color {
            width: 16px;
            height: 16px;
            border: 1px solid;
            border-radius: 4px;
        }

        #problems-card .legend-triage {
            background-color: #dbeafe;
            border-color: #93c5fd;
        }

        #problems-card .legend-doctor {
            background-color: #dcfce7;
            border-color: #86efac;
        }

        #problems-card .legend-ward {
            background-color: #fef3c7;
            border-color: #fcd34d;
        }

        #problems-card .legend-text {
            font-size: 14px;
        }

        #problems-card .hidden {
            display: none;
        }

        /* SVG Icons */
        #problems-card .svg-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        #problems-card .svg-icon-large {
            width: 20px;
            height: 20px;
        }
    </style>
	<style>
		#past-med .quick-btn {
			background: #f3f4f6;
			border: 1px solid #e5e7eb;
			padding: 0.375rem 0.75rem;
			border-radius: 0.375rem;
			font-size: 0.875rem;
			cursor: pointer;
			margin: 0.25rem;
		}

		#past-med .quick-btn:hover {
			background: #e5e7eb;
		}

		#past-med .list-item {
			display: flex;
			align-items: center;
			justify-content: between;
			padding: 0.75rem;
			background: #f9fafb;
			border-radius: 0.375rem;
			border: 1px solid #e5e7eb;
		}

		.remove-btn {
			color: #ef4444;
			padding: 0.25rem;
			border-radius: 0.25rem;
            float: right; background: #fee2e2; color: #dc2626; border: none; border-radius: 0.25rem; padding: 0.25rem 0.5rem;
		}

		.remove-btn:hover {
			background: #fee2e2;
		}

		#past-med .status-badge {
			padding: 0.125rem 0.5rem;
			border-radius: 9999px;
			font-size: 0.75rem;
			margin-left: 0.5rem;
		}
		.status-badge {
			padding: 0.125rem 0.5rem;
			border-radius: 9999px;
			font-size: 0.75rem;
		}

		#past-med .status-current {
			background: #dcfce7;
			color: #166534;
		}
		.status-current {
			background: #dcfce7;
			color: #166534;
		}

		#past-med .status-discontinued {
			background: #fee2e2;
			color: #991b1b;
		}
		.status-discontinued {
			background: #fee2e2;
			color: #991b1b;
		}

		#past-med .status-as needed {
			background: #fef3c7;
			color: #92400e;
		}

		#past-med .grid-cols-12 {
			display: grid;
			grid-template-columns: repeat(12, minmax(0, 1fr));
			gap: 0.5rem;
		}

		#past-med .col-span-1 { grid-column: span 1; }
		#past-med .col-span-2 { grid-column: span 2; }
		#past-med .col-span-3 { grid-column: span 3; }
		#past-med .col-span-4 { grid-column: span 4; }
		#past-med .col-span-6 { grid-column: span 6; }
	</style>
	<style>

        #renderCards .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        #renderCards .header {
            text-align: center;
            margin-bottom: 40px;
        }

        #renderCards .header h1 {
            color: white;
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        #renderCards .header p {
            color: rgba(255,255,255,0.9);
            font-size: 1.1rem;
        }

        #renderCards .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        /* Card Base Styles */
        #renderCards .card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
            transition: all 0.3s ease;
            position: relative;
        }

        #renderCards .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.25);
        }

        #renderCards .card-header {
            padding: 20px 25px 15px;
            /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
            /* color: white; */
            position: relative;
        }

        #renderCards .card-header h3 {
            font-size: 1.4rem;
            margin-bottom: 5px;
        }

        #renderCards .card-header .subtitle {
            opacity: 0.9;
            font-size: 0.9rem;
        }

        #renderCards .card-body {
            padding: 25px;
        }

        #renderCards .card-item {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
        }

        #renderCards .card-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }

        #renderCards .item-title {
            font-weight: bold;
            color: #495057;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        #renderCards .item-row {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 8px;
        }

        #renderCards .item-field {
            flex: 1;
            min-width: 200px;
        }

        #renderCards .field-label {
            font-weight: 600;
            color: #6c757d;
            font-size: 0.9rem;
            margin-bottom: 3px;
        }

        #renderCards .field-value {
            color: #495057;
            font-size: 1rem;
            word-break: break-word;
        }

        #renderCards .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        #renderCards .badge-yes { background: #d4edda; color: #155724; }
        #renderCards .badge-no { background: #f8d7da; color: #721c24; }
        #renderCards .badge-mild { background: #fff3cd; color: #856404; }
        #renderCards .badge-discontinued { background: #f8d7da; color: #721c24; }
        #renderCards .badge-alive { background: #d4edda; color: #155724; }

        #renderCards .empty-state {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            padding: 40px;
        }

        /* Specific Card Styles */
        #renderCards .social-history-card .card-header { background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%); }
        #renderCards .obstetric-card .card-header { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }
        #renderCards .gynecological-card .card-header { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }
        #renderCards .pregnancy-card .card-header { background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); }
        #renderCards .contraception-card .card-header { background: linear-gradient(135deg, #ff8a80 0%, #ffb74d 100%); }
        #renderCards .family-card .card-header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        #renderCards .transfusion-card .card-header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
        #renderCards .allergy-card .card-header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        #renderCards .surgery-card .card-header { background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); }
        #renderCards .medication-card .card-header { background: linear-gradient(135deg, #396afc 0%, #2948ff 100%); }
        #renderCards .comorbidity-card .card-header { background: linear-gradient(135deg, #f12711 0%, #f5af19 100%); }

        @media (max-width: 768px) {
            #renderCards .cards-grid {
                grid-template-columns: 1fr;
            }
            
            #renderCards .item-row {
                flex-direction: column;
                gap: 10px;
            }
            
            #renderCards .item-field {
                min-width: auto;
            }
        }
    </style>

	<style>


        .some-card-view .header {
            margin-bottom: 0px !important; 

        }
        .some-card-view .header h1 {
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;

        }

        .some-card-view .patient-info {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 16px;
        }

        .some-card-view .filter-section {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: #f1f5f9;
            border-radius: 8px;
            flex-wrap: wrap;
        }

        .some-card-view .filter-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .some-card-view .filter-group span {
            font-size: 14px;
            font-weight: 500;
        }

        .some-card-view .filter-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .some-card-view .filter-btn {
            padding: 6px 10px;
            font-size: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 20px;
            background: white;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s;
        }

        .some-card-view .filter-btn:hover {
            background: #f1f5f9;
        }

        .some-card-view .filter-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }

        .some-card-view .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
            gap: 16px;
            margin-bottom: 10px;
        }

        .some-card-view .stat-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .some-card-view .stat-number {
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
        }

        .some-card-view .stat-label {
            font-size: 10px;
            color: #64748b;
            margin-top: 4px;
        }

        .some-card-view .tree-container {
            margin-top: 24px;
        }

        .some-card-view .category-section {
            margin-bottom: 32px;
        }

        .some-card-view .category-header {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 20px;
            font-weight: 700;
            color: #374151;
            margin-bottom: 16px;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .some-card-view .category-header.labs {
            background: #fef7ff;
            border-left: 4px solid #a855f7;
        }
        .some-card-view .category-header.home-prescriptions {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
        }
        .some-card-view .category-header.home-infusions {
            background: #9cdbf9ff;
            border-left: 4px solid #0ea5e9;
        }
        .some-card-view .category-header.home-medications {
            background: pink;
            border-left: 4px solid #0ea5e9;
        }


        .some-card-view .category-header.scans {
            background: #f0fdfa;
            border-left: 4px solid #14b8a6;
        }

        .some-card-view .category-header:hover {
            transform: translateX(2px);
        }

        .some-card-view .category-count {
            background: #e2e8f0;
            color: #64748b;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
        }

        .some-card-view .test-list {
            margin-left: 24px;
        }

        .some-card-view .test-item {
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .some-card-view .test-item:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        .some-card-view .test-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            cursor: pointer;
            background: #fafbfc;
            border-radius: 12px 12px 0 0;
        }

        .some-card-view .test-basic-info {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
        }

        .some-card-view .expand-icon {
            width: 16px;
            height: 16px;
            color: #64748b;
            transition: transform 0.2s;
        }

        .some-card-view .expand-icon.expanded {
            transform: rotate(90deg);
        }

        .some-card-view .test-name {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
        }

        .some-card-view .test-date {
            font-size: 14px;
            color: #64748b;
            background: #f1f5f9;
            padding: 4px 8px;
            border-radius: 6px;
        }

        .some-card-view .test-status-badges {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .some-card-view .status-badge {
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }

        .some-card-view .status-ordered {
            background: #fef3c7;
            color: #92400e;
        }

        .some-card-view .status-pending {
            background: #ddd6fe;
            color: #7c3aed;
        }

        .some-card-view .status-completed {
            background: #dcfce7;
            color: #166534;
        }

        .some-card-view .status-critical {
            background: #fee2e2;
            color: #991b1b;
            animation: pulse 2s infinite;
        }

        .some-card-view .status-abnormal {
            background: #fef3c7;
            color: #92400e;
        }

        .some-card-view .status-normal {
            background: #dcfce7;
            color: #166534;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        
        .some-card-view .hidden {
            display: none;
        }

        .some-card-view .icon {
            font-size: 14px;
            margin-right: 4px;
        }

        /* Icons using CSS */
        .some-card-view .icon-chevron::before {
            content: '▶';
            display: inline-block;
            transition: transform 0.2s;
        }

        .some-card-view .icon-chevron.expanded::before {
            transform: rotate(90deg);
        }

        .some-card-view .icon-lab::before {
            content: '🧪';
        }
		.some-card-view .icon-home::before {
            content: '🏠';
        }
        .some-card-view .icon-scan::before {
            content: '📹';
        }

        .some-card-view .icon-clock::before {
            content: '🕐';
        }

        .some-card-view .icon-warning::before {
            content: '⚠️';
        }

        .some-card-view .icon-critical::before {
            content: '🚨';
        }

        .some-card-view .icon-normal::before {
            content: '✅';
        }

        .some-card-view .icon-trend-up::before {
            content: '↗️';
        }

        .some-card-view .icon-trend-down::before {
            content: '↙️';
        }

        .some-card-view .icon-trend-stable::before {
            content: '➡️';
        }
    </style>
	<!--Clinical Notes section -->

	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line row">



			<div class="col-md-12 d-flex justify-content-end">
				<div>

					<a href="#new_symptoms" class="btn btn-md btn-primary mr-2 " type="button" data-toggle="collapse" aria-expanded="false" role="button" id="newNote_btn" aria-controls="newNoteCollapse">+ Add Notes</a>
					<button type="button" id="save_doctor_notess" class="btn btn-success btn-md mr-2 uppercase" style="margin-left: auto; display:none" onclick="finalizeEcounter()">Finalize</button>
					<button type="button" id="reset_doctor_notes" class="btn btn-danger btn-md mr-2 uppercase" onclick="clearAllData()" style="margin-left: auto; display:none">Reset</button>
				</div>
			</div>




		</div>


		<div class="borderBox-body clinicalMain">
			<div class="collapse " id="new_symptoms">
				<div class="clinical-notes">

					<!-- Navigation -->
					<div class="nav-bar">
						<div class="nav-buttons">
							<button class="nav-btn active" data-section="chief-complaint">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
								</svg>
								Chief Complaint & HPI
							</button>
							<button class="nav-btn" data-section="direct-questioning">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
								Direct Questioning
							</button>
							<button class="nav-btn" data-section="past-history">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								Past Medical History
							</button>
							<button class="nav-btn" data-section="personal-history">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
								Personal History
							</button>
							
							<button class="nav-btn" data-section="family-history">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
								Family History
							</button>
							<button class="nav-btn" data-section="contraception-history">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
								Contraception History
							</button>
							<button class="nav-btn" data-section="pregnancy-history">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
								Pregnancy History
							</button>
							<button class="nav-btn" data-section="gynaecological-history">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
								Gynaecological History
							</button>
							<button class="nav-btn" data-section="obstetric-history">
								<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
								Obstetric History
							</button>
						</div>
					</div>

					<!-- Content -->
					<div class="content">
						<!-- Chief Complaint Section -->
						<div id="chief-complaint-section" class="section">
							<div class="space-y-6">
								<div class="card">
									<h3 class="card-header">
										<svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
										</svg>
										Chief Complaint
									</h3>
									<textarea rows="4" name="chief_complaint" id="cc-editor" class="form-textarea" placeholder="Patient's primary concern in their own words..."></textarea>
									<div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
										<div style="display: flex; align-items: center; gap: 0.5rem;">
											<svg style="width: 1rem; height: 1rem; color: #6b7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
											<input id="cc_onset" type="datetime-local" class="form-input" style="width: auto; font-size: 0.875rem;">
											<span class="text-sm text-gray-600">Chronicity</span>
										</div>
										<SearchableSelectField id="cc_type" class="form-select" style="width: auto;">
											<option value="Acute" >Acute</option>
											<option value="Chronic" >Chronic</option>
											<option value="Subacute" >Subacute</option>
										</SearchableSelectField>
									</div>
								</div>

								<div class="card">
									<h3 class="card-header">
										<svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #16a34a;">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
										</svg>
										History of Presenting Illness
									</h3>
									<textarea rows="8" id="hopi" class="form-textarea" placeholder="Detailed chronological account of the illness including SOCRATES (Site, Onset, Character, Radiation, Associated symptoms, Time course, Exacerbating/relieving factors, Severity)..."></textarea>
									
									<div class="framework-helper">
										<h4>SOCRATES Framework</h4>
										<div class="framework-grid">
											<div>
												<strong>S</strong>ite - Where is the problem?<br/>
												<strong>O</strong>nset - When did it start?<br/>
												<strong>C</strong>haracter - What is it like?<br/>
												<strong>R</strong>adiation - Does it spread?
											</div>
											<div>
												<strong>A</strong>ssociated symptoms<br/>
												<strong>T</strong>ime course - Pattern over time<br/>
												<strong>E</strong>xacerbating/relieving factors<br/>
												<strong>S</strong>everity - How bad is it?
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Past Medical History Section -->
						<div id="past-history-section" class="section hidden">
							<div class="space-y-6" id="past-med">
								<!-- Comorbidities -->
								<div class="card">
									<h3 class="card-header">
										<svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #dc2626;">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
										</svg>
										Past Medical History & Comorbidities
									</h3>
									
									<div style="margin-bottom: 1rem;">
										<div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
											<input type="text" id="condition-input" placeholder="Add condition or select from common..." class="form-input" style="flex: 1;">
											<input type="text" id="comobidities-icd-search" placeholder="ICD" class="form-input" style="flex: 1;">
											<input type="hidden" placeholder="" id="comobidities-icd">
											<input type="date" id="condition-date" placeholder="Duration" class="form-input" style="flex: 1;">
											<button onclick="addCondition()" class="add-btn add-btn-blue">
												<svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
												</svg>
											</button>
										</div>
										
										<div class="quick-buttons" id="condition-buttons">
											<!-- Generated by JavaScript -->
										</div>
									</div>

									<div class="space-y-2" id="conditions-list">
										<!-- Generated by JavaScript -->
									</div>
								</div>

								<!-- Past Medications -->
								<div class="card">
									<h3 class="card-header">
										<svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #7c3aed;">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
										</svg>
										Home Medications (Past and Current)
									</h3>
									
									<div style="margin-bottom: 1rem;">
										<div class="grid-cols-12" style="margin-bottom: 0.75rem;">
											<input type="text" id="medication-name" placeholder="Medication name" class="form-input col-span-4">
											<input type="text" id="medication-dose" placeholder="Dose" class="form-input col-span-2">
											<input type="text" id="medication-frequency" placeholder="Frequency" class="form-input col-span-2">
											<SearchableSelectField id="medication-status" class="form-select col-span-2">
												<option>Current</option>
												<option>Discontinued</option>
												<option>As needed</option>
											</SearchableSelectField>
											<button onclick="addMedication()" class="add-btn add-btn-purple col-span-2">
												<svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
												</svg>
											</button>
										</div>
										
										<div class="quick-buttons" id="medication-buttons">
											<!-- Generated by JavaScript -->
										</div>
									</div>

									<div class="space-y-2" id="medications-list">
										<!-- Generated by JavaScript -->
									</div>
								</div>

								<!-- Past Surgeries -->
								<div class="card">
									<h3 class="card-header">
										<svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #ea580c;">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M13 7h2a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2"></path>
										</svg>
										Past Surgeries
									</h3>
									
									<div class="grid-cols-12" style="margin-bottom: 1rem;">
										<input type="text" id="surgery-name" placeholder="Procedure name" class="form-input col-span-6">
										<input type="date" id="surgery-date" class="form-input col-span-3">
										<input type="text" id="surgery-hospital" placeholder="Hospital" class="form-input col-span-2">
										<button onclick="addSurgery()" class="add-btn add-btn-orange col-span-1">
											<svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
											</svg>
										</button>
									</div>

									<div class="space-y-2" id="surgeries-list">
										<!-- Generated by JavaScript -->
									</div>
								</div>
								<!-- Allergies -->
								<div class="card">
									<h3 class="card-header">
										<svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #ea580c;">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M13 7h2a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2"></path>
										</svg>
										Allergies
									</h3>
									<div style="margin-bottom: 1rem;">
										<div class="grid-cols-12" style="margin-bottom: 0.75rem;">
											<SearchableSelectField id="allergy-type" class="form-select col-span-2">
												<option value="Drug">Drug</option>
												<option value="Food">Food</option>
												<option value="Environmental">Environmental</option>
												<option value="Latex">Latex</option>
											</SearchableSelectField>
											<input type="text" id="allergen-name" placeholder="Allergen (e.g., Penicillin, Peanuts)" class="form-input col-span-4">
											<input type="text" id="allergy-reaction" placeholder="Reaction (e.g., Rash, Anaphylaxis)" class="form-input col-span-2">
											<SearchableSelectField id="allergy-severity" class="form-select col-span-2">
												<option value="Mild">Mild</option>
												<option value="Moderate">Moderate</option>
												<option value="Severe">Severe</option>
											</SearchableSelectField>

											<button onclick="addAllergy()" class="add-btn add-btn-purple col-span-2">
												<svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
												</svg>
											</button>
										</div>

										<div class="quick-buttons" id="allergen-buttons">
											<!-- Generated by JavaScript -->
										</div>
									</div>

									<div class="space-y-2" id="allergies-list">
										<!-- Generated by JavaScript -->
									</div>
								</div>
								<!-- Blood transfusions -->
								<div class="card">
									<h3 class="card-header">
										<svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #ea580c;">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M13 7h2a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2"></path>
										</svg>
										Blood Transfusions
									</h3>
									<div style="margin-bottom: 1rem;">
										<div class="grid-cols-12" style="margin-bottom: 1rem;">
											<SearchableSelectField id="blood-type" class="form-select col-span-3">
												<option value="Whole Blood">Whole Blood</option>
												<option value="Packed RBC">Packed RBC</option>
												<option value="Platelets">Platelets</option>
												<option value="FFP">FFP</option>
												<option value="Cryoprecipitate">Cryoprecipitate</option>
											</SearchableSelectField>
											<input type="text" id="blood-units" placeholder="Units" class="form-input col-span-2">
											<input type="date" id="transfusion-date" class="form-input col-span-2">
											<input type="text" id="transfusion-indication" placeholder="Indication" class="form-input col-span-3">

											<button onclick="addBloodTransfusion()" class="add-btn add-btn-purple col-span-2">
												<svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
												</svg>
											</button>
										</div>
									</div>

									<div class="space-y-2" id="blood-transfusions-list">
										<!-- Generated by JavaScript -->
									</div>
								</div>


							</div>
						</div>

						<div id="direct-questioning-section" class="section hidden" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
							<div class="">
								<div id="odq_symptom" class="">
									<!-- Header -->
									<div class="header">

										<!-- Role Selector -->
										<div class="role-selector">
                                            <!-- php: $sessionRole= $this->request->getSession()->read()['Auth']['User']['role']['name']; -->
                                            <!-- php: if(strtolower($sessionRole) == 'nurse'): -->
                                                <button class="role-btn active bg-blue-500" data-role="triage">
                                                    <i class="">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#63E6BE" d="M286 368C384.5 368 464.3 447.8 464.3 546.3C464.3 562.7 451 576 434.6 576L78 576C61.6 576 48.3 562.7 48.3 546.3C48.3 447.8 128.1 368 226.6 368L286 368zM585.7 169.9C593.5 159.2 608.5 156.8 619.2 164.6C629.9 172.4 632.3 187.4 624.5 198.1L522.1 338.9C517.9 344.6 511.4 348.3 504.4 348.7C497.4 349.1 490.4 346.5 485.5 341.4L439.1 293.4C429.9 283.9 430.1 268.7 439.7 259.5C449.2 250.3 464.4 250.6 473.6 260.1L500.1 287.5L585.7 169.8zM256.3 312C190 312 136.3 258.3 136.3 192C136.3 125.7 190 72 256.3 72C322.6 72 376.3 125.7 376.3 192C376.3 258.3 322.6 312 256.3 312z"/></svg>
                                                    </i>
                                                    <span>Triage Nurse</span>
                                                </button>
                                            <!-- php: endif; -->
                                            <!-- php: if(strtolower($sessionRole) == 'doctor'): -->
                                                <button class="role-btn active bg-green-500" data-role="doctor">
                                                    <i class="">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#63E6BE" d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"/></svg>
                                                    </i>
                                                    <span>Doctor</span>
                                                </button>
                                            <!-- php: endif; -->
                                            <!-- php: if(strtolower($sessionRole) == 'nurse'): -->
                                                <button class="role-btn" data-role="inpatient">
                                                    <i class="">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#63E6BE" d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>
                                                    </i>
                                                    <span>Ward Nurse</span>
                                                </button>
                                            <!-- php: endif; -->
										</div>
									</div>

									<!-- Main Content Grid -->
									<div class="main-grid">
										<!-- Left Panel - Symptom Categories -->
										<div class="panel left-panel">
											<div class="search-container">
												<div class="search-input-container">
													<i class="search-icon">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#63E6BE" d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"/></svg>
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
														<path fill="#63E6BE" d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"/>
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

											<!-- <div class="panel features-panel">
												<div class="panel-header" id="featuresTitle">Triage Nurse Features</div>
												<div class="features-list" id="featuresList">

												</div>
											</div> -->
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="family-history-section" class="section hidden" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
							<div class="">
								<div id="family_history" class="row ">
									<div id="family-history-form" class="col-md-6">
										<div class="modal-header mb-3">
											<h3>Add Family History Entry</h3>
										</div>
										
										<div id="addEntryForm">
											<div class="form-group">
												<label class="form-label">Relationship</label>
												<SearchableSelectField id="relationship" class="form-control" required>
													<option value="">Select relationship</option>
													<option value="Father">Father</option>
													<option value="Mother">Mother</option>
													<option value="Spouse">Spouse</option>
													<option value="Child 1">Child 1</option>
													<option value="Child 2">Child 2</option>
													<option value="Child 3">Child 3</option>
													<option value="Child 4">Child 4</option>
													<option value="Brother">Brother</option>
													<option value="Sister">Sister</option>
													<option value="Paternal Grandfather">Paternal Grandfather</option>
													<option value="Paternal Grandmother">Paternal Grandmother</option>
													<option value="Maternal Grandfather">Maternal Grandfather</option>
													<option value="Maternal Grandmother">Maternal Grandmother</option>
													<option value="Uncle">Uncle</option>
													<option value="Aunt">Aunt</option>
												</SearchableSelectField>
											</div>

											<div class="form-group">
												<label class="form-label">Condition/Disease</label>
												<input type="text" id="condition" class="form-control" placeholder="e.g., Type 2 Diabetes, Breast Cancer" required>
											</div>

											<div class="grid grid-cols-2 gap-4">
												<div class="form-group">
													<label class="form-label">Age at Onset</label>
													<input type="number" id="ageAtOnset" class="form-control" placeholder="Age">
												</div>
												<div class="form-group">
													<label class="form-label">Status</label>
													<SearchableSelectField id="status" class="form-control">
														<option value="alive">Alive</option>
														<option value="deceased">Deceased</option>
													</SearchableSelectField>
												</div>
											</div>


											<div class="form-group">
												<label class="form-label">Notes</label>
												<textarea id="notes" class="form-control" rows="3" placeholder="Additional details, medications, etc."></textarea>
											</div>
										</div>

										<div class="modal-footer">
											<button type="button" class="btn btn-primary" onclick="addEntry()">Add Entry</button>
										</div>

									</div>
									<div id="timelineTab" class="tab-content col-md-6">
										<div class="modal-header mb-3">
											
											<h3 class="mb-6">Family History Timeline</h3>
										</div>
										<div id="timelineContainer" class="timeline"></div>
									</div>
								</div>
							</div>
						</div>
						<div id="contraception-history-section" class="section hidden" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
							<div class="row">
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Add Contraception History</h3>
									</div>
									<div class="form-body">
		
										<div class="form-group row">
											
											<label class="control-label col-md-5">Contraception Type
												<!-- <span class="required"> * </span> -->
		
											</label>
											<div class="col-md-7">
												<SearchableSelectField class="form-control selectpicker " name="contraception_type_id" data-size="5" data-live-search="true" id="contraception_types">
													<option value="">Select...</option>
													<!-- php: foreach ($contraceptionTypes as $contraceptionType) { -->
														<option value="<!-- php: = $contraceptionType->id -->"><!-- php: = $contraceptionType->name --></option>
		
													<!-- php: } -->
												</SearchableSelectField>
		
		
											</div>
										</div>
		
										<div class="form-group row">
											<label class="control-label col-md-5">Date Started
		
											</label>
											<div class="input-group col-md-7">
												<input class="form-control set_date_past" name="date_started" id="ch_dateStarted" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
												<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
											</div>
										</div>
		
										<div class="form-group row">
											<label class="control-label col-md-5">Duration
		
											</label>
											<div class="col-md-7">
												<input type="text" name="duration" data-required="1" id="ch_duration" placeholder="Enter duration" class="form-control input-height" required="">
											</div>
										</div>
		
		
										<div class="form-group row">
											<label class="control-label col-md-5">Complications
		
											</label>
											<div class="col-md-7">
												<input type="text" name="complications" data-required="0" id="ch_complications" placeholder="Enter complications" class="form-control input-height">
											</div>
										</div>
										<div class="form-group offset-md-8 row">
											<button class="btn btn-md btn-primary" onclick="saveContraception()" type="button">Save</button>
										</div>
		
		
									</div>
								</div>
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Contraception History</h3>
									</div>
									<div id="contraception-history-list" class="timeline">

									</div>
								</div>
							</div>
						</div>
						<div id="pregnancy-history-section" class="section hidden" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
							<div class="row">
								<div class="col-md-6 ">
									<div class="modal-header mb-3">
										<h3>Add Pregnancy History</h3>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-5">Pregnancy Number
	
										</label>
										<div class="col-md-7">
											<input type="number" min="1" step="1" id="pregnancy_number" name="pregnancy_number" data-required="1" placeholder="Enter Pregnancy Number" class="form-control input-height" required="">
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Date Conceived
	
										</label>
										<div class="input-group col-md-7">
											<input class="form-control set_date_past" id="date_conceived" name="date_conceived" size="16" type="text" placeholder="Enter date conceived" style="max-height: 35px;" readonly="">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Mode of Conception
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="mode_of_conception" id="mode_of_conception">
												<option value="">Select</option>
												<option value="Assisted">Assisted</option>
												<option value="Natural">Natural</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Mode of Delivery
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="mode_of_delivery" id="mode_of_delivery">
												<option value="">Select</option>
												<option value="CS">CS</option>
												<option value="Medical evacuation">Medical evacuation</option>
												<option value="Vaginal Delivery (Induced)">Vaginal Delivery (Induced)</option>
												<option value="Vaginal Delivery (Spontaneous)">Vaginal Delivery (Spontaneous)</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Outcoume
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="outcome" id="outcome">
												<option value="">Select</option>
												<option value="Live Birth">Live Birth</option>
												<option value="Miscarriage">Miscarriage</option>
												<option value="Still Birth">Still Birth</option>
												<option value="Termination">Termination</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Pregnancy Complications
	
										</label>
										<div class="col-md-7">
											<input type="text" name="pregnancy_complications" data-required="0" id="pregnancy_complications" placeholder="Enter pregnancy complications" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Sex
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="gender_id" id="gender_id" required="">
												<option>Select...</option>
												<option value="2">Female</option>
												<option value="1">Male</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Weight (KG)
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0.1" step="0.1" id="child_weight" name="weight" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Current Info On Child
	
										</label>
										<div class="col-md-7">
											<input type="text" name="child_info" id="child_info" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group offset-md-8 row">
										<button class="btn btn-md btn-primary" onclick="savePregnancy()" type="button">Save</button>
									</div>
	
	
								</div>
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Pregnancy History</h3>
									</div>
									<div id="pregnancy-history-list" class="timeline">

									</div>
								</div>
							</div>
						</div>
						<div id="gynaecological-history-section" class="section hidden" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
							<div class="row">
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Add Gynaecological History</h3>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Date of last menstrual period
	
										</label>
										<div class="input-group col-md-7">
											<input class="form-control set_date_past" id="date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Menarche
	
										</label>
										<div class="col-md-7">
											<input type="text" name="menarche" id="menarche" data-required="0" placeholder="Enter mernache" class="form-control input-height">
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Menopause
	
										</label>
										<div class="col-md-7">
											<input type="text" name="menopause" id="menopause" data-required="0" placeholder="Enter menopause" class="form-control input-height">
										</div>
									</div>
									<h3 class="bold">Menses</h3>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Cycle Length (Days)
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="1" name="cycle_length" id="cycle_length" data-required="0" placeholder="Enter cycle length" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Duration of Bleed (Days)
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="1" name="duration_of_bleed" id="duration_of_bleed" data-required="0" placeholder="Enter duration of bleed" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Volume
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="gyna_volume" id="gyna_volume" aria-label="Default select example" data-live-search="false">
												<option value="">Select</option>
												<option value="Spotting">Spotting</option>
												<option value="Moderate">Moderate</option>
												<option value="Heavy">Heavy</option>
												<option value="Clots">Clots</option>
											</SearchableSelectField>
	
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Intermenstrual Bleeding
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="intermenstrual_bleeding" id="intermenstrual_bleeding" data-live-search="false">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
	
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Intermenstrual Bleeding Details
	
										</label>
										<div class="col-md-7">
											<input type="text" name="intermenstrual_bleeding_details" id="intermenstrual_bleeding_details" data-required="0" placeholder="Enter intermenstrual bleeding details" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Dysmenorrhoea
	
										</label>
										<div class="col-md-7">
	
											<SearchableSelectField class="form-control selectpicker " name="dysmenorrhoea" id="dysmenorrhoea">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Dysmenorrhoea Details
	
										</label>
										<div class="col-md-7">
											<input type="text" min="0" step="1" name="dysmenorrhoea_details" id="dysmenorrhoea_details" data-required="0" placeholder="Enter Dysmenorrhoea Details" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Post Coital Bleeding
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="post_coital_bleeding" id="post_coital_bleeding">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Post Coital Bleeding Details
	
										</label>
										<div class="col-md-7">
											<input type="text" id="post_coital_bleeding_details" name="post_coital_bleeding_details" data-required="0" placeholder="Enter post coital bleeding details" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Dyspareunia
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="dyspareunia" id="dyspareunia">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Dyspareunia Details
	
										</label>
										<div class="col-md-7">
											<input type="text" name="dyspareunia_details" id="dyspareunia_details" data-required="0" placeholder="Enter dyspareunia details" class="form-control input-height">
										</div>
									</div>
	
									<h3 class="bold">Parity</h3>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Gestational Age at Delivery
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="gestational_age_at_delivery" id="gestational_age_at_delivery">
												<option value="" selected disabled>Select</option>
												<option value="< 28 weeks">Less than 28 Weeks</option>
												<option value="28-36">Between 28 and 36</option>
												<option value=">36">greater than 36</option>
											</SearchableSelectField>
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Outcome
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="outcome" id="outcome">
												<option value="" selected disabled>Select</option>
												<option value="Vaginal Delivery">Vaginal Delivery</option>
												<option value="CS">CS</option>
												<option value="Spontaneous Abortion">Spontaneous Abortion</option>
												<option value="Medical Termination">Medical Termination</option>
												<option value="Surgical Termination">Surgical Termination</option>
											</SearchableSelectField>
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">Present Condition
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="present_condition" id="present_condition">
												<option value="" selected disabled>Select</option>
												<option value="alive">Alive</option>
												<option value="dead">Dead</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Number of Lifetime Sexual Partners
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="1" name="number_of_lifetime_sexual_partners" id="number_of_lifetime_sexual_partners" data-required="0" placeholder="Enter number of lifetime sexual partners" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Coital Frequency (Days per Week)
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="1" name="coital_frequency" id="coital_frequency" data-required="0" placeholder="Enter coital frequency" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Cervical Cancer Screening
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="cervical_cancer_screening" id="cervical_cancer_screening">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Cervical Cancer Screening Details
	
										</label>
										<div class="col-md-7">
											<input type="text" name="cervical_cancer_screening_details" id="cervical_cancer_screening_details" data-required="0" placeholder="Enter cervical cancer screening details" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Breast Screening
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="breast_screening" id="breast_screening">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Breast Screening Details
	
										</label>
										<div class="col-md-7">
											<input type="text" name="breast_screening_details" id="breast_screening_details" data-required="0" placeholder="Enter breast screening details" class="form-control input-height">
										</div>
									</div>
	
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Previous Gynaecologic Procedures
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="previous_gynaecologic_procedures" id="previous_gynaecologic_procedures">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Previous Gynaecologic Procedures Details
	
										</label>
										<div class="col-md-7">
											<input type="text" name="previous_gynaecologic_procedures_details" id="previous_gynaecologic_procedures_details" data-required="0" placeholder="Enter previous gynaecologic procedures details" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group offset-md-8 row">
										<button class="btn btn-md btn-primary" onclick="saveGynaecological()" type="button">Save</button>
									</div>
	
	
	
	
	
								</div>
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Gynaecological History</h3>
									</div>
									<div id="gynaecological-history-list" class="timeline">

									</div>
								</div>
							</div>
						</div>
						<div id="obstetric-history-section" class="section hidden" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
							<div class="row">
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Obstetric History</h3>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">No. of Pregnancies
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="0" name="no_of_pregnancies" id="no_of_pregnancies" data-required="0" placeholder="Enter Number of Pregnancies" class="form-control input-height">
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">No. of Births
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="0" name="no_of_births" id="no_of_births" data-required="0" placeholder="Enter Number of Births" class="form-control input-height">
										</div>
									</div>
	
									<div class="form-group row">
										<label class="control-label col-md-5">No. of Abortions (Spontaneous)
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="0" name="no_of_abortions_spontaneous" id="no_of_abortions_spontaneous" data-required="0" placeholder="Enter Number of Spontaneous Abortions" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">No. of Abortions (Induced)
	
										</label>
										<div class="col-md-7">
											<input type="number" min="0" step="0" name="no_of_abortions_induced" id="no_of_abortions_induced" data-required="0" placeholder="Enter Number of Induced Abortions" class="form-control input-height">
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Date of last menstrual period
	
										</label>
										<div class="input-group col-md-7">
											<input class="form-control set_date_past" id="oh_date_of_last_menstrual_period" name="date_of_last_menstrual_period" size="16" type="text" placeholder="Enter date of last menstrual period" style="max-height: 35px;" readonly="">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Date of positive pregnancy test
	
										</label>
										<div class="input-group col-md-7">
											<input class="form-control set_date_past" id="date_of_positive_pregnancy_test" name="date_of_positive_pregnancy_test" size="16" type="text" placeholder="Enter date of positive pregnant test" style="max-height: 35px;" readonly="">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
									</div>
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Confirmatory ultrasound scan
	
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker " name="confirmatory_ultrasound_scan" id="confirmatory_ultrasound_scan">
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</SearchableSelectField>
										</div>
									</div>
	
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Date of scan
	
										</label>
										<div class="input-group col-md-7">
											<input class="form-control set_date_past" id="date_of_scan" name="date_of_scan" size="16" type="text" placeholder="Enter date of scan" style="max-height: 35px;" readonly="">
											<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Current Info On Child
	
										</label>
										<div class="col-md-7">
											<input type="text" name="child_info" id="child_info" data-required="0" placeholder="Enter current info on child" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">Gestational age
	
										</label>
										<div class="col-md-7">
											<input type="text" name="gestational_age" id="gestational_age" data-required="0" placeholder="Enter gestational age" class="form-control input-height">
										</div>
									</div>
	
	
	
									<div class="form-group row">
										<label class="control-label col-md-5">EDD
	
										</label>
										<div class="col-md-7">
											<input class="form-control set_date" id="" name="edd" size="16" type="text" placeholder="Enter date" style="max-height: 35px;" readonly="">
										</div>
									</div>
	
	
									<div class="form-group offset-md-8 row">
										<button class="btn btn-md btn-primary" onclick="saveObstetric()" type="button">Save</button>
									</div>
	
	
								</div>
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Obstetric History</h3>
									</div>
									<div id="obstetric-history-list" class="timeline">

									</div>
								</div>
							</div>
						</div>
						<div id="personal-history-section" class="section hidden" aria-labelledby="odqHeading" data-parent="#clinical_encounter_accordions">
							<div class="row">
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Add Personal History</h3>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-5">Occupation

										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker" data-size="5" data-live-search="true" id="occupation_id" name="occupation_id">
												<!-- <option value="">Select...</option> -->
												<!-- </?php foreach ($occupations as $occupation) { ?> -->
													<option selected value="<!-- php: = $patient->has("occupation") ? $patient->occupation->id : "" -->" r><!-- php: = $patient->has("occupation") ? $patient->occupation->name : "" --></option>
												<!-- </?php } ?> -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-5">Location

										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker" data-size="5" data-live-search="true" id="location_id" name="location_id">
												<!-- <option value="">Select...</option> -->
												<!-- </?php foreach ($locations as $location) { ?> -->
													<option selected value="<!-- php: = $patient->has("location") ? $patient->location->id : "" -->"><!-- php: = $patient->has("location") ? $patient->location->name : "" --></option>
												<!-- </?php } ?> -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-5">Family Circumstance

										</label>
										<div class="col-md-7">
											<input type="text" name="family_circumstance" id="family_circumstance" data-required="0" placeholder="Enter family circumstance" class="form-control input-height">
										</div>
									</div>


									<div class="form-group row">
										<label class="control-label col-md-5">Religion

										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker" data-size="5" data-live-search="true" id="religion_id" name="religion_id">
												<!-- <option value="">Select...</option> -->
												<!-- </?php foreach ($religions as $religion) { ?> -->
													<option selected value="<!-- php: = $patient->has("religion") ? $patient->religion->id : "" -->"><!-- php: = $patient->has("religion") ? $patient->religion->name : "" --></option>
												<!-- </?php } ?> -->
											</SearchableSelectField>
										</div>
									</div>


									<div class="form-group row">
										<label class="control-label col-md-5">Hobbies / Exercise

										</label>
										<div class=" col-md-7">
											<input type="text" name="hobbies" id="hobbies" data-required="0" placeholder="Enter hobbies/exercise " class="form-control input-height">
										</div>
									</div>


									<div class="form-group row">
										<label class="control-label col-md-5">Alchohol Intake

										</label>
										<div class=" col-md-7">
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="alchohol_intake" id="inlineRadio1" value="Yes">
												<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
											</div>
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="alchohol_intake" id="inlineRadio2" value="No">
												<label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
											</div>
											<div class="form-check form-check-inline">
												<input type="text" name="alcohol_details" id="alcohol_details" data-required="0" placeholder="Enter details" class="form-control input-height" style="width: 100%;">
											</div>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-5">Tobacco Intake

										</label>
										<div class=" col-md-7">
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="tobacco_intake" id="inlineRadio1" value="Yes">
												<label class="form-check-label" for="inlineRadio1"><span class="badge rounded-pill" style="background-color: #00b300;">Yes</span></label>
											</div>
											<div class="form-check form-check-inline">
												<input class="form-check-input" type="radio" name="tobacco_intake" id="inlineRadio2" value="No">
												<label class="form-check-label" for="inlineRadio2"><span class="badge rounded-pill" style="background-color: #d63031;">No</span></label>
											</div>
											<div class="form-check form-check-inline">
												<input type="text" name="tobacco_details" id="tobacco_details" data-required="0" placeholder="Enter details " class="form-control input-height">
											</div>
										</div>
									</div>

									<div class="form-group offset-md-8 row">
										<button class="btn btn-md btn-primary" onclick="savePSH()" type="button">Save</button>
									</div>

								</div>
								<div class="col-md-6">
									<div class="modal-header mb-3">
										<h3>Personal History</h3>
									</div>
									<div id="psh-history-list" class="timeline">

									</div>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>


			<!--//new notes section-->
			<div class="row" id="renderCards">

				<div class="col-md-6 stylish-card-section">

					<div class="card problemsCard">
						<!---medication card-->
						<div class="card-header mb-3">Home Medication  <span class="float-right">(Past and Current)</span> </div>
						<div class="mb-3 some-card-view with-transform">


							<div class="category-section" data-category="prescriptions">
								<div class="category-header home-prescriptions prescriptions-section" onclick="toggleCategory('prescriptions-section')">
									<span class="icon-chevron" id="home-icon"></span>
									<span class="icon-home"></span>
									<span>Prescriptions</span>
									<span class="category-count prescription-category-count" id="prescription-category-count">0</span>
									<a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-pres-modal" class="btn btn-sm btn-outline-danger text-capitalize">More</a>
								</div>
								
								<div class="test-list prescriptions-section-list" id="prescriptions-section-list" style="display: none">

								</div>
							</div>
							<div class="category-section" data-category="infusions">
								<div class="category-header home-infusions infusions-section" onclick="toggleCategory('infusions-section')">
									<span class="icon-chevron" id="home-icon"></span>
									<span class="icon-home"></span>
									<span>Infusions</span>
									<span class="category-count infusion-category-count" id="infusion-category-count">0</span>
									<a href="javascript:" type="button" onclick="" data-toggle="modal" data-target="#rf-stop-inf-modal" class="btn btn-sm btn-outline-danger text-capitalize">More</a>
								</div>
								
								<div class="test-list infusions-section-list" id="infusions-section-list" style="display: none">

								</div>
							</div>
							<div class="category-section" data-category="transfusions">
								<div class="category-header home-medications medications-section" onclick="toggleCategory('medications-section')">
									<span class="icon-chevron" id="home-icon"></span>
									<span class="icon-home"></span>
									<span>Past Medications</span>
									<span class="category-count medications-category-count" id="medications-category-count">0</span>
								</div>
								
								<div class="test-list medications-section-list" id="medications-section-list" style="display: none">

								</div>
							</div>

						</div>
						<!--//medication card-->
					</div>
                    <div class="card some-card-view bg-light mb-3 labsCard with-transform ">
						<div class="container">
							<div class="card-header">Patient Labs & Scans Management</div>
							<!-- <div class="header d-flex flex-column d-none"> -->
							<div class="header d-none">
								
								<div class="filter-section">
									<div class="filter-group">
										<span>Filter by Status:</span>
										<div class="filter-buttons">
											<button class="filter-btn active" data-filter="all">All</button>
											<button class="filter-btn" data-filter="ordered">Ordered</button>
											<button class="filter-btn" data-filter="pending">Pending</button>
											<button class="filter-btn" data-filter="completed">Completed</button>
											<button class="filter-btn" data-filter="critical">Critical</button>
										</div>
									</div>
									
									<div class="filter-group">
										<span>Time Range:</span>
										<div class="filter-buttons">
											<button class="filter-btn active" data-timerange="all">All Time</button>
											<button class="filter-btn" data-timerange="today">Today</button>
											<button class="filter-btn" data-timerange="week">This Week</button>
											<button class="filter-btn" data-timerange="month">This Month</button>
										</div>
									</div>

									<div class="filter-group">
										<span>Category:</span>
										<div class="filter-buttons">
											<button class="filter-btn active" data-category="all">All</button>
											<button class="filter-btn" data-category="labs">Labs Only</button>
											<button class="filter-btn" data-category="scans">Scans Only</button>
										</div>
									</div>
								</div>
							</div>

							<!-- Summary Statistics -->
							<div class="summary-stats d-none">
								<div class="stat-card">
									<div class="stat-number">14</div>
									<div class="stat-label">Total Tests</div>
								</div>
								<div class="stat-card">
									<div class="stat-number">3</div>
									<div class="stat-label">Pending Results</div>
								</div>
								<div class="stat-card">
									<div class="stat-number">2</div>
									<div class="stat-label">Critical Values</div>
								</div>
								<div class="stat-card">
									<div class="stat-number">1</div>
									<div class="stat-label">Urgent Orders</div>
								</div>
								<div class="stat-card">
									<div class="stat-number">85%</div>
									<div class="stat-label">Results Normal</div>
								</div>
							</div>

							<div class="tree-container">
								<!-- Laboratory Tests Section -->
								<div class="category-section" data-category="labs">
									<div class="category-header labs labs-section" onclick="toggleCategory('labs-section')">
										<span class="icon-chevron" id="labs-icon"></span>
										<span class="icon-lab"></span>
										<span>Laboratory Tests</span>
										<span class="category-count lab-category-count" id="lab-category-count">0 tests</span>
									</div>
									
									<div class="test-list labs-section-list" id="labs-section-list" style="display: none">
										<!-- Complete Blood Count -->


									</div>
								</div>

								<!-- Imaging/Scans Section -->
								<div class="category-section" data-category="scans">
									<div class="category-header scans scans-section" onclick="toggleCategory('scans-section')">
										<span class="icon-chevron" id="scans-icon"></span>
										<span class="icon-scan"></span>
										<span>Imaging & Scans</span>
										<span class="category-count scan-category-count" id="scan-category-count">0 studies</span>
									</div>
									
									<div class="test-list scans-section-list" id="scans-section-list" style="display: none">
										<!-- Knee MRI -->
										<div class="test-item" data-status="completed" data-category="scans" data-timerange="today">
											<div class="test-header" onclick="toggleTest('scan-1')">
												<div class="test-basic-info">
													<span class="expand-icon icon-chevron" id="scan-1-icon"></span>
													<span class="icon-scan"></span>
													<div>
														<div class="test-name">MRI Right Knee</div>
														<div class="test-date">10/09/2025 16:30</div>
													</div>
												</div>
												<div class="test-status-badges">
													<span class="status-badge status-completed">Completed</span>
													<span class="status-badge status-abnormal">Abnormal</span>
													<span class="icon-warning"></span>
												</div>
											</div>

										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
                    <!--Vitals card-->
                    <div class="card bg-light mb-3 vitalsCard with-transform " style="border-color: <!-- php: = $patient_age <= 3 ? '#de5190' : ($patient_age <= 12 ? '#7030a0' : '#2e74b5') -->;">
                        <div class="card-header " style="background: <!-- php: = $patient_age <= 3 ? '#ffe7f9' : ($patient_age <= 12 ? '#f1e0ff' : '#f4f7ff') -->;">Vitals <span class="float-right">(Last Entered)</span></div>
                        <div class="card-body">
                            <!-- <span class="float-left text-primary">Latest Vitals Taken</span> <br> -->
                            <div class="row">

                                <div class="col-md-6">
                                    <span class="float-left text-primary">Recent</span> <br>
                                    <div class="recent-vitals-taken">
                                        <span class="">
                                            No vitals recorded
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <span class="float-left text-primary">Previous</span> <br>
                                    <div class="previous-vitals-taken">
                                        <span class="">
                                            No vitals recorded
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pr-3 pb-2">
                            <!-- <a href="javascript:;" class="pull-right text-primary" id="medicationsViewAll_btn" data-toggle="modal" data-target="#medicationsViewAll"> View All</a> -->
                        </div>
                    </div>
                    <!--//vitals card-->
					<div id="social-history-card" class="card social-history-card problemsCard"></div>
					<div id="obstetric-card" class="card obstetric-card problemsCard"></div>
					<div id="gynecological-card" class="card gynecological-card problemsCard"></div>
					<div id="pregnancy-card" class="card pregnancy-card problemsCard"></div>







					<!-- php: if ($patient->gender_id == 2 && $patient_age > 12) { -->
						
					<!-- php: } -->





				</div>

				<div class="col-md-6 stylish-card-section">

					<div class="card">
						<!--Problems Card-->
						<div class="problemsCard with-transform" id="problems-card">
                            <div class="card-header mb-3">Problems
                                <span class="float-right">
                                    <button onclick="viewAllPatientVisitProblems()" class="btn btn-xs">View All</button>
                                </span>
                            </div>
							<div class="tree-space">
								<!-- Chief Complaint -->
								<div class="tree-node">
									<div class="node-header" data-node="cc-editor">
										
										<svg class="icon svg-icon-large" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3s3-1.358 3-3-1.358-3-3-3z"/>
											<path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684L22.054 12l-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
										</svg>
										<div class="node-content">
											<div class="node-title">
												<span class="node-title-text">Chief Complaint</span>
											</div>
											<div class="node-description cc-small-card" id=""></div>
										</div>
									</div>
								</div>

								<!-- History of Presenting Illness -->
								<div class="tree-node">
									<div class="node-header" data-node="hpi">
										
										<svg class="icon svg-icon-large" fill="currentColor" viewBox="0 0 24 24">
											<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
										</svg>
										<div class="node-content">
											<div class="node-title">
												<span class="node-title-text">History of Presenting Illness</span>
											</div>
											<div class="node-description hpi-small-card"></div>
										</div>
									</div>
								</div>


							</div>

							<div class="d-flex align-items-center justify-content-between">
								<h3>
									Active Symptoms
								</h3>
								<span class="float-right">
									<button onclick="viewAllPatientOqds()" class="btn btn-xs btn-info">analyze</button>
								</span>
							</div>
							<div class="role-selector d-flex mb-1" style="gap: 2px" id="odq_symptom">
								<button class="odqs_view_role_buttons active bg-pink-500" data-role="all">
									<span>All</span>
								</button>
								<button class="odqs_view_role_buttons" data-role="triage">
									<span>Triage Nurse</span>
								</button>
								<button class="odqs_view_role_buttons" data-role="doctor">
									<span>Doctor</span>
								</button>
								<button class="odqs_view_role_buttons" data-role="inpatient">
									<span>Ward Nurse</span>
								</button>
							</div>

							<div id="symptomTree"></div>
						</div>
						<!--//Problems Card-->

					</div>


					<div id="diagnosis-card" class="card problemsCard">
                        <div class="card-header mb-3">Diagnosis & Comorbidities</div>
                        <div class="p-1">
                            <div class="diagnoses-small-card" id="problem_complaints_noneText">
                                <div class="alert alert-secondary text-center mb-0 py-2">
                                    <i class="fa fa-info-circle mr-1"></i>
                                    Patient Has Not Been Diagnosed
                                </div>
                            </div>
                            <div id="comorbidity-card">
                                <div class="alert alert-secondary text-center mb-0 py-2">
                                    <i class="fa fa-info-circle mr-1"></i>
                                    No Comorbidities Recorded
                                </div>
                            </div>

                        </div>
                    </div>
					<div id="transfusion-card" class="card transfusion-card problemsCard"></div>
					<div id="allergy-card" class="card allergy-card problemsCard"></div>
					<div id="surgery-card" class="card surgery-card problemsCard"></div>
					<div id="contraception-card" class="card contraception-card problemsCard"></div>
					<div id="family-card" class="card family-card problemsCard"></div>

                    <!--Consult To Referral card-->
                    <div class="card bg-light mb-3 historyCard with-transform ">
                        <div class="card-header ">Consult To Referral<span class="float-right">(Summary)</span></div>
                        <div class="card-body">
                            <span class="float-left text-primary">Consultations</span><span class="ml-2" id="history-card-action-span"></span><br>
                            <div class="">
                                <div class="referral-small-card" id="problem_complaints_noneText">
                                    <span class="">
                                        None
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="pr-3 pb-2">
                        </div>
                    </div>
                    <!--Consult To Referral card-->



				</div>

			</div>

		</div>

	</div>



	<!--//Clinical Notes Section-->

	<!--Modal Section-->

	<div class="modal fade bd-example-modal-lg" id="all_encountered_problems" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header mb-3">
			<h4 class="modal-title">All Problems Encountered: <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body encounter_problems">
			
			
			</div>
		</div>
		</div>
	</div>





	<!--Labs + imaging - view all modal -->
	<div class="modal fade" id="labsViewAll" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header mb-3">
					<h4 class="modal-title">Labs + Imaging - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							​
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th>Name</th>
										<th>Specimen No.</th>
										<th>Status</th>
										<th>Description</th>
										<th>Comments</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="labViewAll_table">


								</tbody>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--//labs + imaging - view all modal -->



	<!--vitals - view all modal -->
	<div class="modal fade" id="vitalsViewAll" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header mb-3">
					<h4 class="modal-title">Vitals - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							​
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th>Blood Pressure</th>
										<th>Heart Rate</th>
										<th>Pulse</th>
										<th>SPO<sub>2</sub></th>
										<th>Temp</th>
										<th>RR</th>
										<th>Ht</th>
										<th>Wt</th>
										<th>Trauma</th>
										<th>AVPU</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="vitalViewAll_table">


								</tbody>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--//vitals - view all modal -->


	<!--Diagnosis - view all modal -->
	<div class="modal fade" id="viewAllDiagnosisModal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header mb-3">
					<h4 class="modal-title">Diagnosis - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group row">

								<div class="col-md-12">											
									<div class="row mb-3">
										<div class="col-md-6 bold">Diagnosis</div>
										<div class="col-md-6 bold">Resolved</div>
									</div>
									<div id="diagnosis_clearance">
									</div>

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--//Diagnosis - view all modal -->

	<!--medications- view all modal -->
	<div class="modal fade" id="medicationsViewAll" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header mb-3">
					<h4 class="modal-title">Medication - View All</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th>Name</th>
										<th>Dosage</th>
										<th>Form</th>
										<th>Frequency</th>
										<th>Number of Days</th>
										<th>Quantity</th>
										<th>Status</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="medicationViewAll_table">


								</tbody>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="edit-system-review-modal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
					<div class="container-fluid pr-0 bg-danger">
						<div class="d-flex align-items-center justify-content-between">
							<h4 class="text-slate-900 my-0">Edit System Review</h4>
							<div>
								<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
							</div>
						</div>
					</div>
					<div class="container bg-white p-2">
						<div class="container-fluid">
							<div class="row mb-3 mt-4">
								<div class="col-md-12" id="system-review-modal">
								
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- edit modals section -->
	<div id="hx-modal"></div>
	<div id="stop-refill-prescription-modal"></div>
	<div id="stop-refill-infusion-modal"></div>
	<div id="cc-modal"></div>
	<div id="allergies-modal"></div>
	<div id="system-review-modal"></div>
	<div id="comorbidity-modal"></div>
	<div id="odqs-modal"></div>
	<div id="social-modal"></div>
	<div id="contraception-modal"></div>
	<div id="pregnancy-modal"></div>
	<div id="gynaecology-modal"></div>
	<div id="obstetric-modal"></div>
	<div id="family-modal"></div>
	<div id="allergy-reactions-modal"></div>
</div>


<script>
	const gender_id = '<!-- php: echo $patient->gender_id -->'
	const symptom_patient_id = "<!-- php: = $patient_id -->"
	const symptom_patient_visit_id = "<!-- php: = $patient_visit_id -->"
	const patient_age = "<!-- php: = $patient_age -->"

	let isAgedFemale = false;

	<!-- php: if ($patient->gender_id == 2 && $patient_age > 12): -->
		isAgedFemale = true
	<!-- php: endif; -->

	const contraceptionTypes = \`<!-- php: foreach ($contraceptionTypes as $contraceptionType) { -->
		<option value="<!-- php: = $contraceptionType->id -->"><!-- php: = $contraceptionType->name --></option>

	<!-- php: } -->\`

	const theme2 = "<!-- php: =$theme2 -->"
	const theme1 = "<!-- php: =$theme1 -->"
	
	const save_doctor_notes_link = '<!-- php: = $this->Url->build(['controller' => 'patientVisits', 'action' => 'finalizeEncounter', $patient_id, $patient_visit_id]) -->'
	const updateReviews_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisitSystemReviews', 'action' => 'updateReviews']) -->/"
	const clinicalEncounterTab_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getOdqsWithCategories' ] ); -->"
	const getAllergyCategories_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyCategories' ] ); -->"
	const getAllergySeverities_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergySeverities' ] ); -->"
	const getAllergyReactions_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyReactions' ] ); -->"
	const getAllergyReactionTypes_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyReactionTypes' ] ); -->"
	const getAllergyPharamacologicalManagement_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergyPharamacologicalManagement' ] ); -->"
	const getPastIllnesses_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getPastIllnesses' ] ); -->"
	const getLatestEncounter_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLatestPatientVisitEncounterNote', $patient->id, $selectedVisit->id ] ); -->"
	const populateAllergies_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientAllergies', $patient->id ] ); -->"
	const populateRelevantHistory_link =  "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientHistoryCard', $patient->id ] ); -->"
	const populateReproductiveHistory_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllPatientReproductiveCard', $patient->id ] ); -->"
	const populateLatestVitals_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLatestVitals' ] ); -->"
	const populateLabsAndRadiology_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLabsAndImaging' ] ); -->"
	const populatePrescription_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getLatestPrescriptionAndInfusion' ] ); -->"
	const consultToReferral_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getConsultationRequest', $patient_visit_id ] ); -->"
	const setNewInfusionFrequency_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionFrequency']) -->/\`
	const setNewPrescriptionFrequency_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionFrequency']) -->/\`
	const setNewInfusionStatus_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestInfusionStatus']) -->/\`
	const setNewPrescriptionStatus_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'alterRequestPrescriptionStatus']) -->/\`
	const refillInfusion_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestInfusion', $patient->id, $selectedVisit->id,]) -->\`
	const refillPrescription_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestPrescription', $patient->id, $selectedVisit->id,]) -->\`
	const editAllergyReactionsEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterAllergyReactionsEdit' ] ); -->"
	const showAllEncounteredProblems_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getAllPatientEncounterNote', $patient->id]) -->"
	const setFrequencyChange_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getDrugAdminFrequencies']) -->\`
	const toggleIsCleared_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'toggleIsCleared']) -->/"
	const populateDiagnoses_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAllPatientDiagnosis', $patient->id, $selectedVisit->id,]) -->"
	const finalizeEcounter_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'finalizeEcounter', $patient->id, $selectedVisit->id, ] ); -->"
	const passAllergicCategory_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getAllergicSubstances' ] ); -->"
	const odqsEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getOdqsWithCategories' ] ); -->"
	const comorbidityEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getPastIllnesses' ] ); -->"
	const editChiefComplaint_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterCCDataEdit' ] ); -->"
	const editHistoryEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterBaseDataEdit' ] ); -->"
	const editAllergiesEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterAllergyEdit' ] ); -->"
	const editComorbidityEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterComorbidityDataEdit' ] ); -->"
	const editOdqsEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterOdqDataEdit' ] ); -->"
	const editSocialEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterPshxEdit' ] ); -->"
	const editContraceptionEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterContraceptionEdit' ] ); -->"
	const editGynaecologyEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterGynaecologyEdit' ] ); -->"
	const editPregnancyEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterPregnancyEdit' ] ); -->"
	const editObstetricEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterObstetricEdit' ] ); -->"
	const editFamilyEditModal_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'encounterFamilyDataEdit' ] ); -->"
	const patientVisitOqdEdit_link = '<!-- php: = $this->Url->build([ 'controller'=> 'PatientVisits', 'action'=>'editPatientOdqs', $patient->id, $selectedVisit->id]) -->/'
	const viewAllPatientOqds_link = '<!-- php: = $this->Url->build([ 'controller'=> 'PatientVisits', 'action'=>'analyzePatientOdqs', $patient->id, $selectedVisit->id]) -->/'
	const viewAllPatientVOdqs_link = '<!-- php: = $this->Url->build([ 'controller'=> 'PatientVisits', 'action'=>'allPatientOdqs', $patient->id, $selectedVisit->id]) -->/'
	const visitLabReportView_link = '<!-- php: = $this->Url->build([ 'controller'=> 'RequestLabs', 'action'=>'visitRequestLabReport', $selectedVisit->id]) -->/'
    const selectedRoleConst = '<!-- php: = strtolower($sessionRole) -->';
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/symptoms.js') -->
<!-- php: = $this->Html->script('/js/echarts.js'); -->


<script>

	// Toggle category expansion
	function toggleCategory(categoryId) {
		updateCategoryVisibility(categoryId);
	}

	// Update category visibility
	function updateCategoryVisibility(categoryId) {
		const listElement = document.getElementById(categoryId + '-list');
        if (!listElement) {
            return
        }

        if (listElement && listElement.style.display === 'none') {
            $(\`.\${categoryId} .icon-chevron\`).addClass('expanded');
            $(\`#\${categoryId}-list\`).show()
        } else {
            $(\`.\${categoryId} .icon-chevron\`).removeClass('expanded');
            $(\`#\${categoryId}-list\`).hide()
        }
		

	}
</script>
`;

export default function ElementElementPatientvisitSymptomSymptoms() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
