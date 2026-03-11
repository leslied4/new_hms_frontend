const rawHtml = `
<div class="container-fluid card p-3">
    <div class="d-flex justify-content-between align-items-center px-3">
        <div>
            <h4 class="font-weight-bold">Sales By Clinician</h4>

        </div>


    </div>
    <div class="">

        <!-- php: = $this->Form->create(null, ['type' => 'get', 'id' => 'patient_base_filter_medicine_availability_salesperclinician']); -->
        <div class="row mr-2" style="float: right;">
            <div class="d-flex align-items-center">
                <label style="white-space:nowrap" class="mt-1">Date Range:&nbsp;</label>
                <SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_medicine_salesperclinician">
                    <option value="">All</option>
                    <option value="2">Past Week</option>
                    <option value="3">Month</option>
                    <option value="5">Quarter</option>
                    <option value="7">Year</option>
                </SearchableSelectField>
            </div>
            <!-- <div class="d-flex align-items-center mr-2">
                <label style="white-space:nowrap" class="mt-1">Category:&nbsp;</label>
                <SearchableSelectField class="form-control" style="width:100%;" name="category" id="patient_base_category_salesperclinician">
                    <option value="1">Labs</option>
                    <option value="2">Scans</option>
                    <option value="3">Surgery</option>
                    <option value="4">Consultation</option>
                </SearchableSelectField>
            </div> -->
            <div class="d-flex align-items-center mr-2">
                <label style="white-space:nowrap" class="mt-1">Search:&nbsp;</label>
                <input class="form-control" style="width:100%;" value="" name="search" id="search_salesperclinician" placeholder="search" />
            </div>
            <span class="input-group-btn">
                <button type="submit" class="btn btn-info btn-flat">Go!</button>
            </span>
        </div>

        <!-- php: = $this->Form->end() -->
    </div>
    <div class="container-fluid bg-white py-3 px-0 mt-4" style="border-radius: 5px;">

            <table id="salesperclinician_analysis_table" class="table mt-3">
                <thead>
                    <th className='' id="clinicianColumnTitle">User</th>
                    <th className='px-0 text-center'>Gross <br /> <div className='mt-1 pt-1' >Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>Discount <br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2' >Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>Tax <br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2' >Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>Refunds<br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2' >Quantity <span>Value</span></div></th>
                    <th className='px-0 text-center'>Net<br /> <div className='mt-1 pt-1 d-flex justify-content-between px-2' >Quantity <span>Value</span></div></th>
                </thead>
                <thead id="clinician_summary_head">
                    <th className='' id="">Summary</th>
                    <th className='px-0 text-center' id=""><div className='mt-1 pt-1' >0 <span>0</span></div></th>
                    <th className='px-0 text-center' id=""><div className='mt-1 pt-1 d-flex justify-content-between px-2' >0 <span>0</span></div></th>
                    <th className='px-0 text-center' id=""><div className='mt-1 pt-1 d-flex justify-content-between px-2' >0 <span>0</span></div></th>
                    <th className='px-0 text-center' id=""><div className='mt-1 pt-1 d-flex justify-content-between px-2' >0 <span>0</span></div></th>
                    <th className='px-0 text-center' id=""><div className='mt-1 pt-1 d-flex justify-content-between px-2' >0 <span>0</span></div></th>
                </thead>
                <tbody id="salesperclinician_analysis_table_data">
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

    
    
    $("#patient_base_filter_medicine_availability_salesperclinician").submit(function (e) {
        e.preventDefault()
        try {
            let res = {}
            let url = ""
            let date_itself = document.getElementById('patient_base_dates_base_medicine_salesperclinician').value != '' ? 
                                calculateDateRange(document.getElementById('patient_base_dates_base_medicine_salesperclinician').value)['current'] : null
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
            if (document.getElementById('search_salesperclinician').value != '') {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'search': document.getElementById('search_salesperclinician').value,
                })   
                res = {
                    ...res,
                    'search': document.getElementById('search_salesperclinician').value,
                }
            }
            // if (document.getElementById('patient_base_category_salesperclinician').value != '') {
            //     url = (url == '' ? url : (url+'&')) + serialize({
            //         'category': document.getElementById('patient_base_category_salesperclinician').value,
            //     })   
            //     res = {
            //         ...res,
            //         'category': document.getElementById('patient_base_category_salesperclinician').value,
            //     }
            //     let val = $('#patient_base_category_salesperclinician option:selected').text()
            //     $('#clinicianColumnTitle').text(val)
            // } else {

            //     $('#clinicianColumnTitle').text("Service")

            // }
            requestsalesperclinicianAnalysis(url)
        } catch (error) {
            console.log(error)
        }
        return false
    });

    function requestsalesperclinicianAnalysis(url) {
        table = $('#salesperclinician_analysis_table').DataTable();
        table.destroy();
        $.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( ['controller' => 'ReportQueries', 'action' => 'salesByClinician'] ); -->?"+url,
			data: {},
			beforeSend: function(){
				console.log('fetching data')
			},
			success: function (res){

                let result = processsalesperclinicianTable(res)
                table = $('#salesperclinician_analysis_table').DataTable();
                table.destroy();
                $('#salesperclinician_analysis_table_data').html(result)
                table = $('#salesperclinician_analysis_table').DataTable();
			}
		});
    };

    function processsalesperclinicianAnalysis(all_items) {
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
    function processsalesperclinicianTable(data) {
        let result = ''
        console.log("data is here", typeof(data))
        let res = {
            gross_quantity: 0,
            gross: 0,
            discount_quantity: 0,
            discount: 0,
            tax_quantity: 0,
            tax: 0,
            returns_quantity: 0,
            returns: 0,
            net: 0,
            net_quantity: 0,
        }
        data.forEach(item => {
            res['gross_quantity'] += item.gross_quantity
            res['gross'] += item.gross
            res['discount_quantity'] += item.discount_quantity
            res['discount'] += item.discount
            res['tax_quantity'] += item.tax_quantity
            res['tax'] += item.tax
            res['returns_quantity'] += item.returns_quantity
            res['returns'] += item.returns
            res['net'] += (item.gross_quantity - item.returns_quantity)
            res['net_quantity'] += (item.gross - item.returns)

            result += \`
                <tr>
                    <td>\${item.name}</td>
                    <td className='p-1'>
                        <div className="d-flex justify-content-between">
                            <p>\${item.gross_quantity} Items</p>
                            <p>\${item.gross}</p>
                        </div>
                    </td>
                    <td className='p-1'>
                        <div className="d-flex justify-content-between">
                            <p>\${item.discount_quantity} Items</p>
                            <p>\${item.discount}</p>
                        </div>
                    </td>
                    <td className='p-1'>
                        <div className="d-flex justify-content-between">
                            <p>\${item.tax_quantity} Items</p>
                            <p>\${item.tax}</p>
                        </div>
                    </td>
                    <td className='p-1'>
                        <div className="d-flex justify-content-between">
                            <p>\${item.returns_quantity} Items</p>
                            <p>\${item.returns}</p>
                        </div>
                    </td>
                    <td className='p-1'>
                        <div className="d-flex justify-content-between">
                            <p>\${item.gross_quantity - item.returns_quantity} Items</p>
                            <p>\${item.gross - item.returns}</p>
                        </div>
                    </td>
                </tr>
           \`
        });
        summary = \`

            <th>Summary</th>
            <th className='p-1'>
                <div className="d-flex justify-content-between">
                    <p style="font-weight: bold">\${res.gross_quantity} Items</p>
                    <p style="font-weight: bold">\${res.gross}</p>
                </div>
            </th>
            <th className='p-1'>
                <div className="d-flex justify-content-between">
                    <p style="font-weight: bold">\${res.discount_quantity} Items</p>
                    <p style="font-weight: bold">\${res.discount}</p>
                </div>
            </th>
            <th className='p-1'>
                <div className="d-flex justify-content-between">
                    <p style="font-weight: bold">\${res.tax_quantity} Items</p>
                    <p style="font-weight: bold">\${res.tax}</p>
                </div>
            </th>
            <th className='p-1'>
                <div className="d-flex justify-content-between">
                    <p style="font-weight: bold">\${res.returns_quantity} Items</p>
                    <p style="font-weight: bold">\${res.returns}</p>
                </div>
            </th>
            <th className='p-1'>
                <div className="d-flex justify-content-between">
                    <p style="font-weight: bold">\${res.gross_quantity - res.returns_quantity} Items</p>
                    <p style="font-weight: bold">\${res.gross - res.returns}</p>
                </div>
            </th>

        \`

        $('#clinician_summary_head').html(summary)


        return result
    }

    // $(document).ready(function() {  

    //     // requestsalesperclinicianAnalysis()
    // })


</script>
`;

export default function ElementElementReportQueriesSalesPerClinician() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
