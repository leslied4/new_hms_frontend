const rawHtml = `
<div class="container-fluid card p-3">
    <div class="d-flex justify-content-between align-items-center px-3">
        <div>
            <h4 class="font-weight-bold">Sell-through Rate by Product</h4>


        </div>


    </div>
    <div class="row">

        <div class="col-md-8">
            <!-- php: = $this->Form->create(null, ['type' => 'get', 'id' => 'patient_base_filter_medicine_availability_sell_through']); -->
            <div class="input-group row" style="float: right;">
                <div class="d-flex align-items-center">
                    <label style="white-space:nowrap" class="mt-1">Date Range:&nbsp;</label>
                    <SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_medicine_sell_through">
                        <option value="">All</option>
                        <option value="2">Past Week</option>
                        <option value="3">Month</option>
                        <option value="5">Quarter</option>
                        <option value="7">Year</option>
                    </SearchableSelectField>
                </div>
                <div class="d-flex align-items-center mr-2">
                    <label style="white-space:nowrap" class="mt-1">Category:&nbsp;</label>
                    <SearchableSelectField class="form-control" style="width:100%;" name="category" id="patient_base_category_sell_through">
                        <option value="">All</option>
                        <!-- php: foreach ($categories as $key => $category): -->
                            <option value="<!-- php: = $category->id -->"><!-- php: = $category->name --></option>
                        <!-- php: endforeach -->
                    </SearchableSelectField>
                </div>
                <div class="d-flex align-items-center mr-2">
                    <label style="white-space:nowrap" class="mt-1">Search:&nbsp;</label>
                    <input class="form-control" style="width:100%;" value="" name="search" id="search_sell_through" placeholder="search" />
                </div>
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-info btn-flat">Go!</button>
                </span>
            </div>

            <!-- php: = $this->Form->end() -->
        </div>
    </div>
    <div class="container-fluid bg-white py-3 px-0 mt-4" style="border-radius: 5px;">
        <div>

            <table id="sell_through_table_byproduct" class="full-width table mt-3">
                <thead>
                    <th>Item Name &amp; ID</th>
                    <th>Starting Quantity</th>
                    <th>Ending Quantity</th>
                    <th>Quantity Sold</th>
                    <th>
                        <SearchableSelectField name="" id="" class="form-control">
                            <option value="">Sell-through Rate</option>
                        </SearchableSelectField>
                    </th>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            
        </div>
    </div>
</div>

<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<script>
    $('#date-filter2').on('change', function(e){
            if(e.target.value == 'custom'){
                $('#custom-date-range-container2').removeClass('d-none')
            } else {
                $('#custom-date-range-container2').addClass('d-none')
    
            }
    })

    mobiscroll.datepicker('#range2', {
        controls: ['datetime'],
        select: 'range',
        startInput: '#start2',
        endInput: '#end2',
        touchUi: true
    });

    function calculateDateRange(selectedOption) {
        let currentDate = new Date();
        
        // Calculate previous dates based on selected option
        let startDate, endDate, previousStartDate, previousEndDate;

        if (selectedOption == 1) {  // Today
            // setFilterVal("Today")
            startDate = new Date(currentDate);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(currentDate);
            endDate.setUTCHours(23, 59, 59, 999);

            // Previous day
            previousStartDate = new Date(currentDate);
            previousStartDate.setDate(currentDate.getDate() - 1);
            previousStartDate.setUTCHours(0, 0, 0, 0);
            previousEndDate = new Date(currentDate);
            previousEndDate.setDate(currentDate.getDate() - 1);
            previousEndDate.setUTCHours(23, 59, 59, 999);
        } else if (selectedOption == 2) {  // This Week
            // setFilterVal("This Week")
            startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() - currentDate.getDay() + 6); // End of the week
            endDate.setUTCHours(23, 59, 59, 999);

            // Previous week
            previousStartDate = new Date(startDate);
            previousStartDate.setDate(startDate.getDate() - 7);
            previousEndDate = new Date(endDate);
            previousEndDate.setDate(endDate.getDate() - 7);
        } else if (selectedOption == 3) {  // This Month
            // setFilterVal("This Month")
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            endDate.setUTCHours(23, 59, 59, 999);

            // Previous month
            previousStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            previousStartDate.setUTCHours(0, 0, 0, 0);
            previousEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            previousEndDate.setUTCHours(23, 59, 59, 999);
        } else if (selectedOption == 5) {  // Quarter
            // setFilterVal("Quarter")
            var currentQuarter = Math.floor((currentDate.getMonth() / 3)) + 1;
            startDate = new Date(currentDate.getFullYear(), (currentQuarter - 1) * 3, 1);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(currentDate.getFullYear(), currentQuarter * 3, 0);
            endDate.setUTCHours(23, 59, 59, 999);
        
            // Previous quarter
            var previousQuarterStartMonth = (currentQuarter - 2) * 3;
            previousStartDate = new Date(currentDate.getFullYear(), previousQuarterStartMonth, 1);
            previousStartDate.setUTCHours(0, 0, 0, 0);
            previousEndDate = new Date(currentDate.getFullYear(), (currentQuarter - 1) * 3, 0);
            previousEndDate.setUTCHours(23, 59, 59, 999);
        } else if (selectedOption == 6) {  // Quarter to date
            // setFilterVal("Quarter To Date")
            var currentQuarter = Math.floor((currentDate.getMonth() / 3)) + 1;
            startDate = new Date(currentDate.getFullYear(), (currentQuarter - 1) * 3, 1);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(currentDate);
            endDate.setUTCHours(23, 59, 59, 999);
        
            // Previous quarter to date
            var previousQuarterStartMonth = (currentQuarter - 2) * 3;
            previousStartDate = new Date(currentDate.getFullYear(), previousQuarterStartMonth, 1);
            previousStartDate.setUTCHours(0, 0, 0, 0);
            previousEndDate = new Date(currentDate);
            previousEndDate.setDate(previousEndDate.getDate() - 1);
            previousEndDate.setUTCHours(23, 59, 59, 999);
        } else if (selectedOption == 7) {  // Year so far
            // setFilterVal("Year So Far")
            startDate = new Date(currentDate.getFullYear(), 0, 1);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(currentDate);
            endDate.setUTCHours(23, 59, 59, 999);

            // Previous year so far
            previousStartDate = new Date(currentDate.getFullYear() - 1, 0, 1);
            previousStartDate.setUTCHours(0, 0, 0, 0);
            previousEndDate = new Date(currentDate.getFullYear() - 1, 11, 31);
            previousEndDate.setUTCHours(23, 59, 59, 999);
        } else if (selectedOption == 8) {  // Year on Year
            // setFilterVal("Year On Year")
            startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(currentDate.getFullYear() - 1, 11, 31);
            endDate.setUTCHours(23, 59, 59, 999);
        
            // Previous year on year
            previousStartDate = new Date(currentDate.getFullYear() - 2, 0, 1);
            previousStartDate.setUTCHours(0, 0, 0, 0);
            previousEndDate = new Date(currentDate.getFullYear() - 2, 11, 31);
            previousEndDate.setUTCHours(23, 59, 59, 999);
        }
        
        // Add more conditions for other options...

        // Display the calculated date range

        let result = {
            current: {
                startDate: startDate.toLocaleDateString('en-us'),
                endDate: endDate.toLocaleDateString('en-us')
            },
            previous: {
                startDate: previousStartDate.toLocaleDateString('en-us'),
                endDate: previousEndDate.toLocaleDateString('en-us')
            }
        };

        return result

    }

    serialize = function(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    
    
    $("#patient_base_filter_medicine_availability_sell_through").submit(function (e) {
        e.preventDefault()
        try {
            let res = {}
            let url = ""
            let date_itself = document.getElementById('patient_base_dates_base_medicine_sell_through').value != '' ? 
                                calculateDateRange(document.getElementById('patient_base_dates_base_medicine_sell_through').value)['current'] : null
            if (date_itself) {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'startDate': date_itself['startDate'],
                    'endDate': date_itself['endDate'],
                })
                
            }
            if (document.getElementById('search_sell_through').value != '') {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'search': document.getElementById('search_sell_through').value,
                })   
            }
            if (document.getElementById('patient_base_category_sell_through').value != '') {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'category': document.getElementById('patient_base_category_sell_through').value,
                })   
            }
            sellThroughRate(url)
        } catch (error) {
            console.log(error)
        }
        return false
    });

    function nanChecker(val) {
        return typeof(val) == 'number' ? parseFloat(val || 0).toFixed(2) : 0
    }

    function sellThroughRate(url) {
        table = $('#sell_through_table_byproduct').DataTable();
        table.destroy();
        $('#sell_through_table_byproduct').DataTable({
            "ordering": false,
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'sellThroughRate',]) -->?"+url,
                dataSrc: 'data',
                data: {}
            },
            columns: [
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row.name || ''}\`
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row.starting_quantity || 0}\`
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row.ending_quantity || 0}\`
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row.quantity_sold || 0}\`
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return ((row.quantity_sold / row.starting_quantity) * 100)|| 0
                    }
                },

                
            ]
        });
    };

    $(document).ready(function() {  

        sellThroughRate()
    })

</script>
`;

export default function ElementElementInventorySellThroughRate() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
