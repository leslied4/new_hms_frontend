const rawHtml = `
<div class="container-fluid card p-3">
    <div class="d-flex justify-content-between align-items-center px-3">
        <div>
            <h4 class="font-weight-bold">Stock Ageing Analysis</h4>

        </div>


    </div>
    <div class="row">

        <div class="col-md-8">
            <!-- php: = $this->Form->create(null, ['type' => 'get', 'id' => 'patient_base_filter_medicine_availability']); -->
            <div class="input-group row" style="float: right;">
                <div class="d-flex align-items-center">
                    <label style="white-space:nowrap" class="mt-1">Date Range:&nbsp;</label>
                    <SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_medicine_ageing">
                        <option value="">All</option>
                        <option value="2">Past Week</option>
                        <option value="3">Month</option>
                        <option value="5">Quarter</option>
                        <option value="7">Year</option>
                    </SearchableSelectField>
                </div>
                <div class="d-flex align-items-center mr-2">
                    <label style="white-space:nowrap" class="mt-1">Category:&nbsp;</label>
                    <SearchableSelectField class="form-control" style="width:100%;" name="category" id="patient_base_category_ageing">
                        <option value="">All</option>
                        <!-- php: foreach ($categories as $key => $category): -->
                            <option value="<!-- php: = $category->id -->"><!-- php: = $category->name --></option>
                        <!-- php: endforeach -->
                    </SearchableSelectField>
                </div>
                <div class="d-flex align-items-center mr-2">
                    <label style="white-space:nowrap" class="mt-1">Search:&nbsp;</label>
                    <input class="form-control" style="width:100%;" value="" name="search" id="search_ageing" placeholder="search" />
                </div>
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-info btn-flat">Go!</button>
                </span>
            </div>

            <!-- php: = $this->Form->end() -->
        </div>
    </div>
    <div class="container-fluid bg-white py-3 px-0 mt-4" style="border-radius: 5px;">

            <table id="ageing_analysis_table" class="table mt-3">
                <thead>
                <th className=''>Stock Items Details</th>
                    <th className='px-0 text-center'>Total <br /> <div className='mt-1 pt-1'>Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>(&lt;45 days) <br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2'>Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>(45 to 90 days) <br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2'>Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>(90 to 100 days) <br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2'>Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>(100+ days) <br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2'>Quantity <span>Value</span></div></th>
                </thead>
                <tbody id="ageing_analysis_table_data">
                </tbody>
            </table>
            

        	
    </div>
</div>

<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<script>
    $("#sell-through-table").DataTable()
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

    
    
    $("#patient_base_filter_medicine_availability").submit(function (e) {
        e.preventDefault()
        try {
            let res = {}
            let url = ""
            let date_itself = document.getElementById('patient_base_dates_base_medicine_ageing').value != '' ? 
                                calculateDateRange(document.getElementById('patient_base_dates_base_medicine_ageing').value)['current'] : null
            if (date_itself) {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'startDate': date_itself['startDate'],
                    'endDate': date_itself['endDate'],
                })

                res = {
                    ...res,
                    'startDate': date_itself['startDate'],
                    'endDate': date_itself['endDate'],
                }
                
            }
            if (document.getElementById('search_ageing').value != '') {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'search': document.getElementById('search_ageing').value,
                })   
                res = {
                    ...res,
                    'search': document.getElementById('search_ageing').value,
                }
            }
            if (document.getElementById('patient_base_category_ageing').value != '') {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'category': document.getElementById('patient_base_category_ageing').value,
                })   
                res = {
                    ...res,
                    'category': document.getElementById('patient_base_category_ageing').value,
                }
            }
            requestAgeingAnalysis(url)
        } catch (error) {
            console.log(error)
        }
        return false
    });

    function requestAgeingAnalysis(url) {
        table = $('#ageing_analysis_table').DataTable();
        table.destroy();
        $.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( ['controller' => 'Inventory', 'action' => 'stockAgeing'] ); -->?"+url,
			data: {},
			beforeSend: function(){
				console.log('fetching data')
			},
			success: function (res){

                let result = processAgeingTable(res)
                table = $('#ageing_analysis_table').DataTable();
                table.destroy();
                $('#ageing_analysis_table_data').html(result)
                table = $('#ageing_analysis_table').DataTable();
			}
		});
    };

    function processAgeingAnalysis(all_items) {
        let total_q = 0
        let total_q_p = 0
        let fortyfive_q = 0
        let fortyfive_q_p = 0
        let ninety_q = 0
        let ninety_q_p = 0
        let hundred_q = 0
        let hundred_q_p = 0
        let hundredPlus_q = 0
        let hundredPlus_q_p = 0
        all_items.forEach((item) => {
            total_q += item.item_store.reduce((acc, curr) => ((curr.quantity - curr.quantity_sold) + acc), 0)
            total_q_p += ((item.item_store.reduce((acc, curr) => ((parseFloat((curr.quantity - curr.quantity_sold)) * parseFloat(curr.unit_selling_price)) + acc), 0)))
            fortyfive_q += item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 0, 44) ? (curr.quantity - curr.quantity_sold) : 0) + acc), 0)
            fortyfive_q_p += ((item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 0, 44) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity - curr.quantity_sold))) : 0) + acc), 0)))
            ninety_q += item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 45, 89) ? (curr.quantity - curr.quantity_sold) : 0) + acc), 0)
            ninety_q_p += ((item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 45, 89) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity - curr.quantity_sold))) : 0) + acc), 0)))
            hundred_q += item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 90, 99) ? (curr.quantity - curr.quantity_sold) : 0) + acc), 0)
            hundred_q_p += ((item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 90, 99) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity - curr.quantity_sold))) : 0) + acc), 0)))
            hundredPlus_q += item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 100, 101) ? (curr.quantity - curr.quantity_sold) : 0) + acc), 0)
            hundredPlus_q_p += ((item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 100, 101) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity - curr.quantity_sold))) : 0) + acc), 0)))

        })
        
    }
    function nanChecker(val) {
        return typeof(val) == 'number' ? parseFloat(val || 0).toFixed(2) : 0
    }

    function dated_stock(item, start_days, end_days) {
        const newDate = new Date(item);
        const start = new Date();
        const end = new Date();

        start.setDate(start.getDate() - start_days);
        end.setDate(start.getDate() - end_days);

        if(end_days < 100) {
            return newDate <= start && newDate >= end
        } else {
            return newDate <= start
        }
    }
    function processAgeingTable(data) {
        let result = ''
        console.log("data is here", typeof(data))
        data.forEach(item => {
            
            result += \`
               <tr>
                   <td>\${item.name}, \${item.brand_name}</td>
                   <td className='p-1'>
                       <div className="d-flex justify-content-between">
                           <p>\${nanChecker(item.item_store.reduce((acc, curr) => ((curr.quantity-curr.quantity_sold) + acc), 0))} Items</p>
                           <p>\${parseFloat(item.item_store.reduce((acc, curr) => ((parseFloat((curr.quantity-curr.quantity_sold)) * parseFloat(curr.unit_selling_price)) + acc), 0)).toFixed(2)}</p>
                       </div>
                   </td>
                   <td className='p-1' style=>
                       <div className="d-flex justify-content-between">
                           <p>\${nanChecker(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 0, 44) ? (curr.quantity-curr.quantity_sold) : 0) + acc), 0))} Items</p>
                           <p>\${parseFloat(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 0, 44) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity-curr.quantity_sold))) : 0) + acc), 0)).toFixed(2)}</p>
                       </div>
                   </td>
                   <td className='p-1' style=>
                       <div className="d-flex justify-content-between">
                           <p>\${nanChecker(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 45, 89) ? (curr.quantity-curr.quantity_sold) : 0) + acc), 0))} Items</p>
                           <p>\${parseFloat(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 45, 89) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity-curr.quantity_sold))) : 0) + acc), 0)).toFixed(2)}</p>
                       </div>
                   </td>
                   <td className='p-1' style=>
                       <div className="d-flex justify-content-between">
                           <p>\${nanChecker(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 90, 99) ? (curr.quantity-curr.quantity_sold) : 0) + acc), 0))} Items</p>
                           <p>\${parseFloat(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 90, 99) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity-curr.quantity_sold))) : 0) + acc), 0)).toFixed(2)}</p>
                       </div>
                   </td>
                   <td className='p-1' style=>
                       <div className="d-flex justify-content-between">
                           <p>\${nanChecker(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 100, 101) ? (curr.quantity-curr.quantity_sold) : 0) + acc), 0))} Items</p>
                           <p>\${parseFloat(item.item_store.reduce((acc, curr) => ((dated_stock(curr.date_added, 100, 101) ? (parseFloat(curr.unit_selling_price) * parseFloat((curr.quantity-curr.quantity_sold))) : 0) + acc), 0)).toFixed(2)}</p>
                       </div>
                   </td>
               </tr>
           \`
        });
        return result
    }

    $(document).ready(function() {  

        requestAgeingAnalysis()
    })


</script>
`;

export default function ElementElementInventoryStockAgeingAnalysis() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
