import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/all_patient_odqs.php';
const rawHtml = `
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
<h3 class="card-header">

    Patient Problems
</h3>

<div class="some-card-view p-4" id="view-all-odqs">

</div>

<script>
    // Sample data
    sampleOdqs = <!-- php: = json_encode($odqs) -->;
    var grouped = sampleOdqs.reduce((acc, odq) => {

      if (!acc[odq.patient_visit_id]) {
        acc[odq.patient_visit_id] = {
            patient_visit_id: odq.patient_visit_id,
            patient_visit_date: new Date(odq.patient_visit.date_created).toLocaleString(),
            cc: odq.patient_visit.patient_visit_clinical_encounter_notes[0]?.cc,
            cc_type: odq.patient_visit.patient_visit_clinical_encounter_notes[0]?.cc_type,
            onset: odq.patient_visit.patient_visit_clinical_encounter_notes[0]?.cc_onset,
            user: odq.patient_visit.patient_visit_clinical_encounter_notes[0]?.user,
            hpi: odq.patient_visit.patient_visit_clinical_encounter_notes[0]?.hopi,
            symptoms: []
        };
      }
      acc[odq.patient_visit_id].symptoms.push(odq);
      return acc;
    }, {});
    
    $('#view-all-odqs').html('')
    Object.values(grouped).forEach((ele) => {
        
        $('#view-all-odqs').append(\`
            <div class="category-header home-medications \${ele.patient_visit_id}" onclick="toggleCategory('\${ele.patient_visit_id}')">
                <span class="icon-chevron expanded" id="home-icon"></span>
                <span class="icon-home"></span>
                <span>\${ele.patient_visit_date}</span>
            </div>
            
            <div class="test-list" id="\${ele.patient_visit_id}-list" style="">
    
                <div class="problemsCard with-transform" id="problems-card">
            
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
                                    <div class="node-description" id="">
                                        <div class="d-flex justify-content-between">
                                            <div style="flex: 1;">
                                                <strong>\${ele.cc}</strong>
                                            </div>
                                            <div class="d-flex flex-column">
                                                <span>\${ele.user?.first_name || '' + ' ' + ele.user?.last_name || ''}</span>
                                                <div>
                                                    <span class="status-badge status-current">\${moment(ele.onset).format("DD-MM-YYYY")}</span>
                                                </div>
                                                <div>
                                                    <span class="status-badge status-discontinued">\${ele.cc_type}</span>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
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
                                    <div class="node-description hpi-small-card">\${ele.hpi}</div>
                                </div>
                            </div>
                        </div>
            
            
                    </div>
            
                    <div class="d-flex align-items-center justify-content-between">
                        <h3>
                            Active Symptoms
                        </h3>
            
                    </div>
                    <div class="role-selector d-none mb-1" style="gap: 2px" id="odq_symptom">
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
            
                    <div id="\${ele.patient_visit_id}_symptomTree"></div>
                </div>
            </div>
    
        \`)
        viewAllSymptomsPatientData(ele.symptoms, \`\${ele.patient_visit_id}_symptomTree\`)
    });
    function mapPriority(priorityText) {
        if (!priorityText) return 'medium';
        if (priorityText.includes('Immediate')) return 'high';
        if (priorityText.includes('Urgent')) return 'medium';
        return 'low';
    }

    function viewAllSymptomsPatientData(odqData, id) {
		// Map backend ODQ data into frontend-friendly structure
		const patientData = {
			symptoms: odqData.reduce((acc, item) => {
				let leRes = {
					priority: mapPriority(item.triage_priority), // convert to 'high', 'medium', etc.
					role: 'doctor', // could also map from user.role_id if you want
					timestamp: new Date(item.date_created).toLocaleString(),
					user: \`\${item.user.first_name.trim()} \${item.user.last_name.trim()}\`,
					severity: item.severity,
					notes: item.notes,
					assessment: item.character_quality,
					intervention: \`\${item.aggravating_factors || ''} / \${item.relieving_factors || ''}\`
				}
				if ((item.odq_id+ "_" +item.patient_visit_id) in acc) {
					acc[item.odq_id + "_" +item.patient_visit_id].entries.push(leRes)
					
				} else {
					acc[item.odq_id + "_" +item.patient_visit_id] =  {
						id: item.odq_id + "_" +item.patient_visit_id, // unique key
						name: item.name, // e.g. "Abdominal Pain"
						priority: mapPriority(item.triage_priority), // convert to 'high', 'medium', etc.
						icd: item.odq.code || 'n/a', // ICD code if available
						entries: [
							{
								role: item.type, // could also map from user.role_id if you want
								timestamp: new Date(item.date_created).toLocaleString(),
								user: \`\${item.user.first_name.trim()} \${item.user.last_name.trim()}\`,
								severity: item.severity,
								notes: item.notes,
								assessment: item.character_quality,
								intervention: \`\${item.aggravating_factors || ''} / \${item.relieving_factors || ''}\`
							}
						]
					};
				}

				return acc

			}, {})
		};

        console.log("this is patient_data", patientData, )

		viewAllSymptomsCollapse(patientData, id)
	}


	function viewAllSymptomsCollapse(patientData, id) {
		
		const symptomTree = document.getElementById(id);
		symptomTree.innerHTML = '';
	
		// Generate HTML for each symptom
		Object.values(patientData.symptoms).forEach(symptom => {
			const nodeId = \`symptom-\${symptom.id}\`;
	
			const node = document.createElement('div');
			node.className = 'tree-node symptom-node';
			node.setAttribute('data-symptom', nodeId);
	
			node.innerHTML = \`
				<div class="node-header symptom \${symptom.entries.map(entry => \`odqView-\${entry.role}\`).join(' ')}" data-node="\${nodeId}">
					<svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
							  d="M9 5l7 7-7 7"></path>
					</svg>
					<div class="priority-dot \${symptom.priority}"></div>
					<div class="node-content">
						<div class="node-title">
							<span class="node-title-text">\${symptom.name}</span>
							<span class="priority-badge priority-\${symptom.priority}">
								\${symptom.icd}
							</span>
						</div>
					</div>
				</div>
				<div class="node-children hidden" id="\${nodeId}-entries"></div>
			\`;
	
			symptomTree.appendChild(node);
	
			// Render entries into the node
			const entriesContainer = node.querySelector(\`#\${nodeId}-entries\`);
			symptom.entries.forEach(entry => {
				const entryDiv = document.createElement('div');
				entryDiv.className = \`entry-card entry-\${entry.role} odqView-\${entry.role}\`;
				entryDiv.innerHTML = \`
					<div><strong>\${entry.user}</strong> (\${entry.role})</div>
					<div><em>\${entry.timestamp}</em></div>
					<div>Severity: \${entry.severity}</div>
					<div>Notes: \${entry.notes}</div>
					<div>Assessment: \${entry.assessment}</div>
					<div>Intervention: \${entry.intervention}</div>
				\`;
				entriesContainer.appendChild(entryDiv);
			});
		});

		            // Add click handlers for tree nodes
            document.querySelectorAll('[data-node]').forEach(node => {
                node.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const nodeId = node.getAttribute('data-node');
                    toggleNode(nodeId);
                });
            });
	}

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

        // Toggle node expansion
    function toggleNode(nodeId) {
        const node = document.querySelector(\`[data-node="\${nodeId}"]\`);
        const chevron = node.querySelector('.chevron');
        const children = node.parentNode.querySelector('.node-children');
        
        if (!children) return;

        if (children.classList.contains('hidden')) {
            children.classList.remove('hidden');
            chevron.classList.add('expanded');
        } else {
            children.classList.add('hidden');
            chevron.classList.remove('expanded');
        }
    }
</script>

`;

export default function PatientVisitsAllPatientOdqsPage() {
  return (
    <PageShell title="PatientVisits/all_patient_odqs.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
