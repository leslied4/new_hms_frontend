const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Labs & Scans Management Tree</title>
    <style>
        #requestoverview .container {
            max-width: 1600px;
            margin: 0 auto;
            padding: 24px;
            background: white;
            min-height: 100vh;
        }

        #requestoverview .header {
            margin-bottom: 24px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 16px;
        }

        #requestoverview .header h1 {
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
        }

        #requestoverview .patient-info {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 16px;
        }

        #requestoverview .filter-section {
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 12px;
            background: #f1f5f9;
            border-radius: 8px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }

        #requestoverview .filter-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #requestoverview .filter-group span {
            font-size: 14px;
            font-weight: 500;
        }

        #requestoverview .filter-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        #requestoverview .filter-btn {
            padding: 8px 12px;
            font-size: 14px;
            border: 1px solid #cbd5e1;
            border-radius: 20px;
            background: white;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s;
        }

        #requestoverview .filter-btn:hover {
            background: #f1f5f9;
        }

        #requestoverview .filter-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }

        #requestoverview .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }

        #requestoverview .stat-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        #requestoverview .stat-number {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
        }

        #requestoverview .stat-label {
            font-size: 14px;
            color: #64748b;
            margin-top: 4px;
        }

        #requestoverview .tree-container {
            margin-top: 24px;
        }

        #requestoverview .category-section {
            margin-bottom: 32px;
        }

        #requestoverview .category-header {
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

        #requestoverview .category-header.labs {
            background: #fef7ff;
            border-left: 4px solid #a855f7;
        }

        #requestoverview .category-header.scans {
            background: #f0fdfa;
            border-left: 4px solid #14b8a6;
        }

        #requestoverview .category-header:hover {
            transform: translateX(2px);
        }

        #requestoverview .category-count {
            background: #e2e8f0;
            color: #64748b;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
        }

        #requestoverview .test-list {
            margin-left: 24px;
        }

        #requestoverview .test-item {
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        #requestoverview .test-item:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        #requestoverview .test-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            cursor: pointer;
            background: #fafbfc;
            border-radius: 12px 12px 0 0;
        }

        #requestoverview .test-basic-info {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
        }

        #requestoverview .expand-icon {
            width: 16px;
            height: 16px;
            color: #64748b;
            transition: transform 0.2s;
        }

        #requestoverview .expand-icon.expanded {
            transform: rotate(90deg);
        }

        #requestoverview .test-name {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
        }

        #requestoverview .test-date {
            font-size: 14px;
            color: #64748b;
            background: #f1f5f9;
            padding: 4px 8px;
            border-radius: 6px;
        }

        #requestoverview .test-status-badges {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #requestoverview .status-badge {
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 12px;
            font-weight: 500;
            text-transform: uppercase;
            background: #94e263ff;
        }

        #requestoverview .status-priority {
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 12px;
            font-weight: 500;
            text-transform: uppercase;
            background: #c6eab0ff;
        }

        #requestoverview .status-ordered {
            background: #fef3c7;
            color: #92400e;
        }

        #requestoverview .status-pending {
            background: #ddd6fe;
            color: #7c3aed;
        }

        #requestoverview .status-completed {
            background: #dcfce7;
            color: #166534;
        }

        #requestoverview .status-critical {
            background: #fee2e2;
            color: #991b1b;
            animation: pulse 2s infinite;
        }

        #requestoverview .status-abnormal {
            background: #fef3c7;
            color: #92400e;
        }

        #requestoverview .status-normal {
            background: #dcfce7;
            color: #166534;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        #requestoverview .test-details {
            padding: 0 20px 20px 20px;
            background: white;
            border-radius: 0 0 12px 12px;
        }

        #requestoverview .test-details.hidden {
            display: none;
        }

        #requestoverview .test-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        #requestoverview .info-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
        }

        #requestoverview .info-card h4 {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
        }

        #requestoverview .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            padding: 4px 0;
        }

        #requestoverview .info-item:last-child {
            margin-bottom: 0;
        }

        #requestoverview .info-label {
            font-size: 14px;
            color: #64748b;
            font-weight: 500;
        }

        #requestoverview .info-value {
            font-size: 14px;
            color: #1e293b;
            font-weight: 500;
        }

        #requestoverview .value-normal {
            color: #16a34a;
        }

        #requestoverview .value-abnormal {
            color: #d97706;
            font-weight: 600;
        }

        #requestoverview .value-critical {
            color: #dc2626;
            font-weight: 700;
            animation: pulse 2s infinite;
        }

        #requestoverview .results-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            font-size: 14px;
        }

        .results-table th,
        #requestoverview .results-table td {
            text-align: left;
            padding: 8px 12px;
            border-bottom: 1px solid #e2e8f0;
        }

        #requestoverview .results-table th {
            background: #f1f5f9;
            font-weight: 600;
            color: #374151;
        }

        #requestoverview .trend-indicator {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }

        #requestoverview .trend-up {
            background: #fef2f2;
            color: #dc2626;
        }

        #requestoverview .trend-down {
            background: #f0fdf4;
            color: #16a34a;
        }

        #requestoverview .trend-stable {
            background: #f8fafc;
            color: #64748b;
        }

        #requestoverview .action-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 16px;
        }

        #requestoverview .action-btn {
            padding: 8px 12px;
            font-size: 14px;
            border: 1px solid;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
        }

        #requestoverview .btn-reorder {
            background: #eff6ff;
            color: #1d4ed8;
            border-color: #93c5fd;
        }

        #requestoverview .btn-reorder:hover {
            background: #dbeafe;
        }

        #requestoverview .btn-urgent {
            background: #fef2f2;
            color: #dc2626;
            border-color: #fca5a5;
            animation: pulse 2s infinite;
        }

        #requestoverview .btn-urgent:hover {
            background: #fee2e2;
        }

        #requestoverview .btn-view {
            background: #f0fdf4;
            color: #16a34a;
            border-color: #86efac;
        }

        #requestoverview .btn-view:hover {
            background: #dcfce7;
        }

        #requestoverview .btn-cancel {
            background: #f8fafc;
            color: #64748b;
            border-color: #cbd5e1;
        }

        #requestoverview .btn-cancel:hover {
            background: #f1f5f9;
        }

        #requestoverview .timeline {
            margin-top: 20px;
            border-top: 1px solid #e2e8f0;
            padding-top: 16px;
        }

        #requestoverview .timeline-header {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
        }

        #requestoverview .timeline-entries {
            position: relative;
            padding-left: 20px;
        }

        #requestoverview .timeline-entries::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e2e8f0;
        }

        #requestoverview .timeline-entry {
            position: relative;
            margin-bottom: 16px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
        }

        #requestoverview .timeline-entry::before {
            content: '';
            position: absolute;
            left: -16px;
            top: 16px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #3b82f6;
        }

        #requestoverview .timeline-entry.critical::before {
            background: #dc2626;
            animation: pulse 2s infinite;
        }

        #requestoverview .timeline-time {
            font-size: 12px;
            color: #64748b;
            font-weight: 500;
        }

        #requestoverview .timeline-event {
            font-size: 14px;
            color: #374151;
            margin-top: 4px;
        }

        #requestoverview .reference-ranges {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            margin-top: 12px;
        }

        #requestoverview .reference-ranges h5 {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
        }

        #requestoverview .reference-item {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            margin-bottom: 4px;
        }

        #requestoverview .scan-preview {
            margin-top: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
        }

        #requestoverview .scan-preview-header {
            background: #f8fafc;
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-weight: 600;
            color: #374151;
        }

        #requestoverview .scan-preview-content {
            padding: 16px;
            text-align: center;
            color: #64748b;
        }

        #requestoverview .scan-placeholder {
            width: 100%;
            height: 200px;
            background: #f1f5f9;
            border: 2px dashed #cbd5e1;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        #requestoverview .comparison-chart {
            margin-top: 16px;
            padding: 16px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }

        #requestoverview .comparison-header {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
        }

        #requestoverview .chart-placeholder {
            width: 100%;
            height: 150px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 14px;
        }

        #requestoverview .hidden {
            display: none;
        }

        #requestoverview .icon {
            font-size: 14px;
            margin-right: 4px;
        }

        /* Icons using CSS */
        #requestoverview .icon-chevron::before {
            content: '▶';
            display: inline-block;
            transition: transform 0.2s;
        }

        #requestoverview .icon-chevron.expanded::before {
            transform: rotate(90deg);
        }

        #requestoverview .icon-lab::before {
            content: '🧪';
        }

        #requestoverview .icon-scan::before {
            content: '📹';
        }

        #requestoverview .icon-clock::before {
            content: '🕐';
        }

        #requestoverview .icon-warning::before {
            content: '⚠️';
        }

        #requestoverview .icon-critical::before {
            content: '🚨';
        }

        #requestoverview .icon-normal::before {
            content: '✅';
        }

        #requestoverview .icon-trend-up::before {
            content: '↗️';
        }

        #requestoverview .icon-trend-down::before {
            content: '↙️';
        }

        #requestoverview .icon-trend-stable::before {
            content: '➡️';
        }
    </style>
</head>
<div id="requestoverview">
    <div class="container">
        <div class="header">

            
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
                        <button class="filter-btn" data-category="prescriptions">Prescriptions Only</button>
                        <button class="filter-btn" data-category="infusions">Infusions Only</button>
                        <button class="filter-btn" data-category="labs">Labs Only</button>
                        <button class="filter-btn" data-category="scans">Scans Only</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Summary Statistics -->
        <div class="summary-stats">
            <div class="stat-card">
                <div class="stat-number prescription-category-count">0</div>
                <div class="stat-label">Prescriptions</div>
            </div>
            <div class="stat-card">
                <div class="stat-number infusion-category-count">0</div>
                <div class="stat-label">Infusions</div>
            </div>
            <div class="stat-card">
                <div class="stat-number lab-category-count">0</div>
                <div class="stat-label">Labs</div>
            </div>
            <div class="stat-card">
                <div class="stat-number scan-category-count">0</div>
                <div class="stat-label">Scans</div>
            </div>
            <!-- <div class="stat-card">
                <div class="stat-number">85%</div>
                <div class="stat-label">Results Normal</div>
            </div> -->
        </div>

        <div class="tree-container">

            <!-- prescriction Section -->
            <div class="category-section" data-category="prescriptions">
                <div class="category-header labs" onclick="toggleOverviewCategory('prescriptions-section-overview')">
                    <span class="icon-chevron expanded" id="prescriptions-overview-icon"></span>
                    <span class="icon-home"></span>
                    <span>Prescriptions</span>
                    <span class="category-count prescription-category-count">0</span>
                </div>
                
                <div class="test-list prescriptions-section-list" id="prescriptions-section-overview-list"></div>
            </div>

            <!-- Infusions Section -->
            <div class="category-section" data-category="infusions">
                <div class="category-header labs" onclick="toggleOverviewCategory('infusions-section-overview')">
                    <span class="icon-chevron expanded" id="infusions-overview-icon"></span>
                    <span class="icon-home"></span>
                    <span>Infusions</span>
                    <span class="category-count infusion-category-count">0</span>
                </div>
                
                <div class="test-list infusions-section-list" id="infusions-section-overview-list"></div>
            </div>


            <!-- Laboratory Tests Section -->
            <div class="category-section" data-category="labs">
                <div class="category-header labs" onclick="toggleOverviewCategory('labs-section-overview')">
                    <span class="icon-chevron expanded" id="labs-overview-icon"></span>
                    <span class="icon-lab"></span>
                    <span>Laboratory Tests</span>
                    <span class="category-count lab-category-count">0 tests</span>
                </div>
                
                <div class="test-list labs-section-list" id="labs-section-overview-list"></div>
            </div>

            <!-- Imaging/Scans Section -->
            <div class="category-section" data-category="scans">
                <div class="category-header scans" onclick="toggleOverviewCategory('scans-section-overview')">
                    <span class="icon-chevron expanded" id="scans-overview-icon"></span>
                    <span class="icon-scan"></span>
                    <span>Imaging & Scans</span>
                    <span class="category-count scan-category-count">0 studies</span>
                </div>
                
                <div class="test-list scans-section-list" id="scans-section-overview-list">

                </div>
            </div>
        </div>
    </div>

    <script>
        // State management
        let expandedTests = {
            'test-1': true,
            'test-2': false,
            'test-3': false,
            'test-4': false,
            'scan-1': true,
            'scan-2': false,
            'scan-3': false
        };

        let expandedOverviewCategories = {
            'labs-section-overview': true,
            'scans-section-overview': true,
            'prescriptions-section-overview': true,
            'infusions-section-overview': true,
        };

        let currentStatusFilter = 'all';
        let currentTimeRangeFilter = 'all';
        let currentCategoryFilter = 'all';

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializeFilters();
            updateVisibility();
            updateOverviewCategoryVisibility();
        });

        // Initialize filter functionality
        function initializeFilters() {
            // Status filter buttons
            const statusButtons = document.querySelectorAll('[data-filter]');
            statusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    statusButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    currentStatusFilter = this.getAttribute('data-filter');
                    applyFilters();
                });
            });

            // Time range filter buttons
            const timeButtons = document.querySelectorAll('[data-timerange]');
            timeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Only apply to filter buttons, not test items
                    if (button.classList.contains('filter-btn')) {
                        timeButtons.forEach(btn => {
                            if (btn.classList.contains('filter-btn')) {
                                btn.classList.remove('active');
                            }
                        });
                        this.classList.add('active');
                        currentTimeRangeFilter = this.getAttribute('data-timerange');
                        applyFilters();
                    }
                });
            });

            // Category filter buttons
            const categoryButtons = document.querySelectorAll('[data-category]');
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Only apply to filter buttons, not category sections or test items
                    if (button.classList.contains('filter-btn')) {
                        categoryButtons.forEach(btn => {
                            if (btn.classList.contains('filter-btn')) {
                                btn.classList.remove('active');
                            }
                        });
                        this.classList.add('active');
                        currentCategoryFilter = this.getAttribute('data-category');
                        applyCategoryFilter();
                    }
                });
            });

            // Action buttons
            document.querySelectorAll('.action-btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    handleAction(this);
                });
            });
        }

        // Apply filters
        function applyFilters() {
            const testItems = document.querySelectorAll('.test-item');
            
            testItems.forEach(item => {
                const status = item.getAttribute('data-status');
                const timerange = item.getAttribute('data-timerange');
                
                let showByStatus = currentStatusFilter === 'all' || status === currentStatusFilter;
                let showByTime = currentTimeRangeFilter === 'all' || timerange === currentTimeRangeFilter;
                
                if (showByStatus && showByTime) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            updateOverviewCategoryVisibility();
        }

        // Apply category filters
        function applyCategoryFilter() {
            const categorySections = document.querySelectorAll('.category-section');
            
            categorySections.forEach(section => {
                const category = section.getAttribute('data-category');
                
                if (currentCategoryFilter === 'all' || category === currentCategoryFilter) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        }

        // Toggle category expansion
        function toggleOverviewCategory(categoryId) {
            expandedOverviewCategories[categoryId] = !expandedOverviewCategories[categoryId];
            updateOverviewCategoryVisibility();
        }

        // Update category visibility
        function updateOverviewCategoryVisibility() {

            Object.keys(expandedOverviewCategories).forEach(categoryId => {
                const listElement = document.getElementById(categoryId + '-list');
                const iconElement = document.getElementById(categoryId.replace('-section', '') + '-icon');
                
                if (listElement && iconElement) {
                    if (expandedOverviewCategories[categoryId]) {
                        listElement.style.display = 'block';
                        iconElement.classList.add('expanded');
                    } else {
                        listElement.style.display = 'none';
                        iconElement.classList.remove('expanded');
                    }
                }
            });
        }

        // Toggle test expansion
        function toggleTest(testId) {
            expandedTests[testId] = !expandedTests[testId];
            updateVisibility();
        }

        // Update test visibility
        function updateVisibility() {
            Object.keys(expandedTests).forEach(testId => {
                const detailsElement = document.getElementById(testId + '-details');
                const iconElement = document.getElementById(testId + '-icon');
                
                if (detailsElement && iconElement) {
                    if (expandedTests[testId]) {
                        detailsElement.classList.remove('hidden');
                        iconElement.classList.add('expanded');
                    } else {
                        detailsElement.classList.add('hidden');
                        iconElement.classList.remove('expanded');
                    }
                }
            });
        }

        // Handle action button clicks
        function handleAction(button) {
            const action = button.textContent.trim().toLowerCase();
            const testItem = button.closest('.test-item');
            const testName = testItem.querySelector('.test-name').textContent;
            
            // Show confirmation or action based on button type
            if (action.includes('alert') || action.includes('urgent')) {
                alert(\`URGENT: \${testName} requires immediate attention\`);
            } else if (action.includes('reorder')) {
                if (confirm(\`Reorder test: \${testName}?\`)) {
                    alert(\`Test reordered: \${testName}\`);
                }
            } else if (action.includes('collect')) {
                alert(\`Collection initiated for: \${testName}\`);
            } else if (action.includes('cancel')) {
                if (confirm(\`Cancel order: \${testName}?\`)) {
                    updateTestStatus(testItem, 'cancelled');
                }
            } else if (action.includes('view')) {
                alert(\`Opening viewer for: \${testName}\`);
            } else if (action.includes('call')) {
                alert(\`Calling lab regarding: \${testName}\`);
            } else if (action.includes('refer')) {
                alert(\`Referral initiated based on: \${testName}\`);
            }
        }

        // Update test status
        function updateTestStatus(testItem, newStatus) {
            testItem.setAttribute('data-status', newStatus);
            
            // Update status badge
            const badge = testItem.querySelector('.status-badge');
            badge.className = \`status-badge status-\${newStatus}\`;
            badge.textContent = newStatus.toUpperCase();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #22c55e; color: white; padding: 12px 20px; border-radius: 8px; z-index: 1000;';
            successMsg.textContent = \`Test status updated to: \${newStatus}\`;
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        }

        // Add hover effects
        document.querySelectorAll('.test-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                if (!this.style.transform) {
                    this.style.transform = 'translateY(-2px)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (this.style.transform === 'translateY(-2px)') {
                    this.style.transform = 'translateY(0)';
                }
            });
        });

        // Simulate real-time updates for pending tests
        function simulatePendingUpdates() {
            setInterval(() => {
                // Update pending test statuses, ETAs, etc.
                const pendingTests = document.querySelectorAll('[data-status="pending"]');
                // Implementation for real-time updates would go here
            }, 60000); // Update every minute
        }

        // Initialize real-time updates
        // simulatePendingUpdates();
    </script>
</div>

`;

export default function ElementElementPatientvisitRequestoverview() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
