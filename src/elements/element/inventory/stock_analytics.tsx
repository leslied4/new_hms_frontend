const rawHtml = `
<style>
    .stats-card {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        height: 100%;
        min-height: 140px;
    }

    .stats-card .widget-content {
        height: 100%;
        display: flex;
    }

    .widget-content {
        padding: 1.5rem;
        flex-direction: row;
        align-items: center;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .widget-content:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .widget-content .widget-content-wrapper {
        display: flex;
        flex: 1;
        position: relative;
        align-items: center;
    }

    .widget-content .widget-content-left .widget-heading {
        opacity: .9;
        font-weight: 700;
        font-size: 1rem;
    }

    .widget-content .widget-content-left .widget-subheading {
        opacity: .7;
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }

    .widget-content .widget-content-right {
        margin-left: auto;
    }

    .widget-content .widget-numbers {
        font-weight: 700;
        font-size: 2rem;
        display: block;
    }

    .widget-content .widget-content-outer {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .widget-content .widget-icon {
        font-size: 2.5rem;
        opacity: 0.3;
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .bg-grow-early {
        background-image: linear-gradient(135deg, #0ba360 0%, #3cba92 100%) !important;
    }

    .bg-arielle-smile {
        background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%) !important;
    }

    .bg-midnight-bloom {
        background-image: linear-gradient(135deg, #2b5876 0%, #4e4376 100%) !important;
    }

    .bg-premium-dark {
        background-image: linear-gradient(135deg, #434343 0%, #1a1a1a 100%) !important;
    }

    .filter-section {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        border: 1px solid #e0e0e0;
    }

    .filter-section .form-label {
        font-weight: 600;
        font-size: 0.9rem;
        color: #495057;
        margin-bottom: 0.5rem;
    }

    .filter-btn-group {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .quick-filter-btn {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        border: 1px solid #dee2e6;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.875rem;
    }

    .quick-filter-btn:hover {
        background: #e9ecef;
        border-color: #adb5bd;
    }

    .quick-filter-btn.active {
        background: #007bff;
        color: white;
        border-color: #007bff;
    }

    .stats-card {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .export-section {
        margin-top: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
    }

    .badge-low-stock {
        background-color: #dc3545;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
    }

    .refresh-indicator {
        display: inline-block;
        margin-left: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .refresh-indicator.active {
        opacity: 1;
    }

    @media (max-width: 768px) {
        .widget-numbers {
            font-size: 1.5rem;
        }

        .widget-content {
            padding: 1rem;
        }
    }
</style>



<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <div class="caption">
                <span class="caption-subject font-dark bold uppercase">
                    <!-- php: = $elementTitle -->
                    <span class="refresh-indicator" id="refreshIndicator">
                        <i class="fa fa-spinner fa-spin"></i>
                    </span>
                </span>
            </div>
        </div>
        <div class="borderBox-body">
            <!-- Filter Section -->
            <div class="filter-section">
                <div class="row">
                    <div class="col-md-12 mb-3 d-none">
                        <label class="form-label">Quick Filters</label>
                        <div class="filter-btn-group">
                            <button class="quick-filter-btn active" data-filter="all">All Items</button>
                            <button class="quick-filter-btn" data-filter="low-stock">
                                Low Stock (<span id="lowStockBadge"></span>)
                            </button>
                            <button class="quick-filter-btn" data-filter="high-value">High Value Items</button>
                            <button class="quick-filter-btn" data-filter="high-profit">High Profit Margin</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Category</label>
                        <SearchableSelectField class="form-control" id="categoryFilter">

                        </SearchableSelectField>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Stock Level</label>
                        <SearchableSelectField class="form-control" id="stockLevelFilter">
                            <option value="">All Levels</option>
                            <option value="critical">Critical (0-5)</option>
                            <option value="low">Low (6-10)</option>
                            <option value="medium">Medium (11-50)</option>
                            <option value="high">High (50+)</option>
                        </SearchableSelectField>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Date Range</label>
                        <SearchableSelectField class="form-control" id="dateRangeFilter">
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="custom">Custom Range</option>
                        </SearchableSelectField>
                    </div>
                    <div class="col-md-3" id="customDatePicker" style="display:none;">
                        <label class="form-label">Custom Date Range</label>
                        <div class="d-flex flex-column">
                            <input type="date" id="startDate" class="form-control" placeholder="Start date">
                            <input type="date" id="endDate" class="form-control" placeholder="End date">
                        </div>
                    </div>

                    <div class="col-md-3">
                        <label class="form-label">Search</label>
                        <input type="text" class="form-control" id="searchFilter" placeholder="Search items...">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <button class="btn btn-primary btn-sm" id="applyFilters">
                            <i class="fa fa-filter"></i> Apply Filters
                        </button>
                        <button class="btn btn-secondary btn-sm" id="resetFilters">
                            <i class="fa fa-undo"></i> Reset
                        </button>
                        <!-- <button class="btn btn-success btn-sm float-right" id="exportData">
                            <i class="fa fa-download"></i> Export to Excel
                        </button> -->
                        <button class="btn btn-info btn-sm float-right mr-2" id="refreshData">
                            <i class="fa fa-refresh"></i> Refresh
                        </button>
                    </div>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="card card-box">
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 col-lg-3 mb-3">
                                <div class="card stats-card widget-content bg-midnight-bloom">
                                    <div class="widget-content-wrapper text-slate-900">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Number of Stocks</div>
                                            <div class="widget-subheading">Total items in inventory</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-slate-900">
                                                <span id="total_count"></span>
                                            </div>
                                        </div>
                                        <i class="fa fa-cubes widget-icon"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 col-lg-3 mb-3">
                                <div class="card stats-card widget-content bg-arielle-smile">
                                    <div class="widget-content-wrapper text-slate-900">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Cost of Stock</div>
                                            <div class="widget-subheading">Total investment value</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-slate-900">
                                                <span id="le_total_cost_price">GH₵ </span>
                                            </div>
                                        </div>
                                        <i class="fa fa-money widget-icon"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 col-lg-3 mb-3">
                                <div class="card stats-card widget-content bg-premium-dark">
                                    <div class="widget-content-wrapper text-slate-900">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Expected Sales</div>
                                            <div class="widget-subheading">Potential revenue</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-warning">
                                                <span id="expected_total_sales">GH₵</span>
                                            </div>
                                        </div>
                                        <i class="fa fa-line-chart widget-icon"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 col-lg-3 mb-3">
                                <div class="card stats-card widget-content bg-grow-early">
                                    <div class="widget-content-wrapper text-slate-900">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Projected Profit</div>
                                            <div class="widget-subheading">
                                                Margin: <span id="profit_margin">%</span>
                                            </div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-slate-900">
                                                <span id="expected_profit">GH₵ </span>
                                            </div>
                                        </div>
                                        <i class="fa fa-trophy widget-icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Metrics Row -->
                        <div class="row mt-3">
                            <div class="col-md-4">
                                <div class="alert alert-warning">
                                    <strong>Low Stock Alert:</strong>
                                    <span id="low_stock_alert"></span> items need reordering
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="alert alert-info">
                                    <strong>Average Item Value:</strong>
                                    <span id="avg_item_value">GH₵</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="alert alert-success">
                                    <strong>Last Updated:</strong>
                                    <span id="last_updated"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        let stockData = [];
        let filteredData = [];
        const LOW_STOCK_THRESHOLD = 10;

        $('#dateRangeFilter').on('change', function() {
            if ($(this).val() === 'custom') {
                $('#customDatePicker').slideDown();
            } else {
                $('#customDatePicker').slideUp();
                $('#startDate').val('');
                $('#endDate').val('');
            }
        });
        // Load initial data
        loadStockData();

        function loadStockData() {
            showRefreshIndicator(true);

            $.ajax({
                url: '<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'allStoreInformation']); -->',
                type: 'GET',
                success: function(res) {
                    stockData = res;
                    filteredData = res;
                    updateDashboard(res['Central Store']);
                    populateCategoryFilter(Object.keys(res));
                    showRefreshIndicator(false);
                },
                error: function(error) {
                    console.error('Error:', error);
                    showRefreshIndicator(false);
                    alert('Failed to load inventory data. Please try again.');
                }
            });
        }

        function updateDashboard(data) {
            console.log("this is where it came", data)
            let total_cost_price = 0;
            let expected_total_sales = 0;
            let expected_profit = 0;
            let low_stock_count = 0;

            data.forEach(val => {
                const cost = val.quantity * val.unit_cost_price;
                const sales = val.quantity * val.unit_selling_price;

                total_cost_price += cost;
                expected_total_sales += sales;

                if (val.quantity <= LOW_STOCK_THRESHOLD) {
                    low_stock_count++;
                }
            });

            expected_profit = expected_total_sales - total_cost_price;
            let profit_margin = total_cost_price > 0 ? ((expected_profit / total_cost_price) * 100) : 0;
            let avg_item_value = data.length > 0 ? (total_cost_price / data.length) : 0;
            let total_count = data.length;

            // Update UI with animations
            animateValue('expected_profit', expected_profit);
            animateValue('le_total_cost_price', total_cost_price);
            animateValue('expected_total_sales', expected_total_sales);
            $('#total_count').text(total_count);
            $('#profit_margin').text(profit_margin.toFixed(1) + '%');
            $('#low_stock_alert').text(low_stock_count);
            $('#lowStockBadge').text(low_stock_count);
            $('#avg_item_value').text('GH₵ ' + avg_item_value.toFixed(2));
            $('#last_updated').text(new Date().toLocaleString());
        }

        function animateValue(elementId, value) {
            $('#' + elementId).html('GH₵ ' + value.toFixed(2));
        }

        function populateCategoryFilter(data) {

            const $categoryFilter = $('#categoryFilter');
            $categoryFilter.html('')
            data.forEach(category => {
                $categoryFilter.append(\`<option value="\${category}" \${category == 'Central Store' && 'selected'}>\${category}</option>\`);
            });
        }

        function showRefreshIndicator(show) {
            if (show) {
                $('#refreshIndicator').addClass('active');
            } else {
                $('#refreshIndicator').removeClass('active');
            }
        }

        // Filter functionality
        function applyFilters() {
            let filtered = (stockData);

            const category = $('#categoryFilter').val();
            const stockLevel = $('#stockLevelFilter').val();
            const searchTerm = $('#searchFilter').val().toLowerCase();

            if (category) {
                filtered = filtered[category];
            } else {

                filtered = Object.values(filtered)
            }


            if (stockLevel) {
                filtered = filtered.filter(item => {
                    let qty = item.quantity - ((item.quantity_sold || 0) + (item.quantity_transfered || 0));
                    console.log("this is qty", item, item.quantity, item.quantity_sold, item.quantity_transfered)
                    switch (stockLevel) {
                        case 'critical':
                            return qty >= 0 && qty <= 5;
                        case 'low':
                            return qty > 5 && qty <= 10;
                        case 'medium':
                            return qty > 10 && qty <= 50;
                        case 'high':
                            return qty > 50;
                        default:
                            return true;
                    }
                });
            }

            if (searchTerm) {
                filtered = filtered.filter(item =>
                    (item.item.full_name && item.item.full_name.toLowerCase().includes(searchTerm)) ||
                    (item.batch_number && item.batch_number.toLowerCase().includes(searchTerm)) ||
                    (item.item.description && item.item.description.toLowerCase().includes(searchTerm))
                );
            }

            const dateRange = $('#dateRangeFilter').val();
            const startDate = $('#startDate').val();
            const endDate = $('#endDate').val();

            if (dateRange && dateRange !== 'all') {
                filtered = filtered.filter(item => {
                    const itemDate = new Date(item.date_added); // adjust key name if different
                    const today = new Date();
                    let include = true;

                    switch (dateRange) {
                        case 'today':
                            include = itemDate.toDateString() === today.toDateString();
                            break;
                        case 'week':
                            const weekAgo = new Date();
                            weekAgo.setDate(today.getDate() - 7);
                            include = itemDate >= weekAgo && itemDate <= today;
                            break;
                        case 'month':
                            include = itemDate.getMonth() === today.getMonth() &&
                                itemDate.getFullYear() === today.getFullYear();
                            break;
                        case 'custom':
                            if (startDate && endDate) {
                                const start = new Date(startDate);
                                const end = new Date(endDate);
                                include = itemDate >= start && itemDate <= end;
                            }
                            break;
                    }

                    return include;
                });
            }

            filteredData = filtered;

            updateDashboard(filteredData);
        }

        // Quick filter buttons
        $('.quick-filter-btn').on('click', function() {
            $('.quick-filter-btn').removeClass('active');
            $(this).addClass('active');

            const filter = $(this).data('filter');
            let filtered = [...stockData];

            switch (filter) {
                case 'low-stock':
                    filtered = filtered.filter(item => item.quantity <= LOW_STOCK_THRESHOLD);
                    break;
                case 'high-value':
                    const avgValue = stockData.reduce((sum, item) => sum + (item.quantity * item.unit_cost_price), 0) / stockData.length;
                    filtered = filtered.filter(item => (item.quantity * item.unit_cost_price) > avgValue);
                    break;
                case 'high-profit':
                    filtered = filtered.filter(item => {
                        const profit = (item.unit_selling_price - item.unit_cost_price) / item.unit_cost_price;
                        return profit > 0.3; // 30% profit margin
                    });
                    break;
            }

            filteredData = filtered;
            updateDashboard(filtered);
        });

        $('#applyFilters').on('click', applyFilters);

        $('#resetFilters').on('click', function() {
            $('#categoryFilter').val('');
            $('#stockLevelFilter').val('');
            $('#searchFilter').val('');
            $('#dateRangeFilter').val('all');
            $('.quick-filter-btn').removeClass('active');
            $('.quick-filter-btn[data-filter="all"]').addClass('active');
            filteredData = stockData;
            updateDashboard(stockData);
        });

        $('#refreshData').on('click', loadStockData);

        $('#exportData').on('click', function() {
            // Export functionality - can be enhanced based on backend support
            alert('Exporting data... This feature requires backend implementation.');
            // You can implement CSV export here
        });

        // Search on Enter key
        $('#searchFilter').on('keypress', function(e) {
            if (e.which === 13) {
                applyFilters();
            }
        });

        // Auto-refresh every 5 minutes
        setInterval(loadStockData, 300000);
    });
</script>
`;

export default function ElementElementInventoryStockAnalytics() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
