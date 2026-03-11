const rawHtml = `
<div class="container-fluid card p-3">
    <div class="d-flex justify-content-between align-items-center px-3">
        <div>
            <h4 class="font-weight-bold">ABC Analysis by Product</h4>

           
        </div>

    </div>
    <div class="row">

        <div class="col-md-8">
            <!-- php: = $this->Form->create(null, ['type' => 'get', 'id' => 'patient_base_filter_medicine_availability_abc']); -->
            <div class="input-group row" style="float: right;">
                <div class="d-flex align-items-center">
                    <label style="white-space:nowrap" class="mt-1">Date Range:&nbsp;</label>
                    <SearchableSelectField class="form-control" style="width:100%;" name="dateSelelectFields" id="patient_base_dates_base_medicine_abc">
                        <option value="">All</option>
                        <option value="2">Past Week</option>
                        <option value="3">Month</option>
                        <option value="5">Quarter</option>
                        <option value="7">Year</option>
                    </SearchableSelectField>
                </div>
                <div class="d-flex align-items-center mr-2">
                    <label style="white-space:nowrap" class="mt-1">Category:&nbsp;</label>
                    <SearchableSelectField class="form-control" style="width:100%;" name="category" id="patient_base_category_abc">
                        <option value="">All</option>
                        <!-- php: foreach ($categories as $key => $category): -->
                            <option value="<!-- php: = $category->id -->"><!-- php: = $category->name --></option>
                        <!-- php: endforeach -->
                    </SearchableSelectField>
                </div>
                <div class="d-flex align-items-center mr-2">
                    <label style="white-space:nowrap" class="mt-1">Search:&nbsp;</label>
                    <input class="form-control" style="width:100%;" value="" name="search" id="search_abc" placeholder="search" />
                </div>
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-info btn-flat">Go!</button>
                </span>
            </div>

            <!-- php: = $this->Form->end() -->
        </div>
    </div>
    <div class="container-fluid bg-white py-4 px-0 mt-3">
        <h5 class="ml-4">ABC analysis grades products based on sales revenue.</h5>
        <div class="container-fluid mt-3 py-2 d-flex align-items-start pl-4"
            style="border-bottom: 1px solid rgb(181, 183, 192); border-top: 1px solid rgb(181, 183, 192);">
            <div class="d-flex align-items-center justify-content-center p-3"
                style="background: rgb(86, 197, 150); border-radius: 5px;">
                <h5 class="my-0 text-slate-900 font-weight-bold">A</h5>
            </div>
            <div class="ml-3">
                <h5 class="my-0 font-weight-bold">A- grade products make up <span id="gradeA"></span> of the revenue</h5>
                <p style="color: rgb(181, 183, 192);">Ensure you have enough of these high-demand products available.</p>
            </div>
        </div>
        <div class="container-fluid pb-2 d-flex align-items-start pl-4 mt-2"
            style="border-bottom: 1px solid rgb(181, 183, 192);">
            <div class="d-flex align-items-center justify-content-center p-3"
                style="background: rgb(5, 109, 207); border-radius: 5px;">
                <h5 class="my-0 text-slate-900 font-weight-bold">B</h5>
            </div>
            <div class="ml-3">
                <h5 class="my-0 font-weight-bold">B- grade products make up <span id="gradeB"></span> of the revenue</h5>
                <p style="color: rgb(181, 183, 192);">These products are low earners. Do not keep too many of them on hand
                </p>
            </div>
        </div>
        <div class="container-fluid pb-2 d-flex align-items-start pl-4 mt-2"
            style="border-bottom: 1px solid rgb(181, 183, 192);">
            <div class="d-flex align-items-center justify-content-center p-3"
                style="background: rgb(141, 86, 165); border-radius: 5px;">
                <h5 class="my-0 text-slate-900 font-weight-bold">C</h5>
            </div>
            <div class="ml-3">
                <h5 class="my-0 font-weight-bold">C- grade products make up <span id="gradeC"></span> of the revenue</h5>
                <p style="color: rgb(181, 183, 192);">These are the lowest earning products. Consider ways to sell this
                    inventory to free up some space .</p>
            </div>
        </div>
    </div>


    <div class="container-fluid bg-white p-4 ">
        <h6>Total Value By Price</h6>
        <div class="d-flex align-items-center mt-4">
            <div class="col-md-2 pl-0">
                <div class="d-flex align-items-center">
                    <div style="height: 20px; width: 20px; background: rgb(86, 197, 150);"></div>
                    <p class="my-0 ml-1">A-grade</p>
                </div><small style="color: rgb(168, 165, 165);">GHC <span id="gradeAval"></span></small>
            </div>
            <div class="col-md-2 pl-0">
                <div class="d-flex align-items-center">
                    <div style="height: 20px; width: 20px; background: rgb(5, 109, 207);"></div>
                    <p class="my-0 ml-1">B-grade</p>
                </div><small style="color: rgb(168, 165, 165);">GHC <span id="gradeBval"></span></small>
            </div>
            <div class="col-md-2 pl-0">
                <div class="d-flex align-items-center">
                    <div style="height: 20px; width: 20px; background: rgb(141, 86, 165);"></div>
                    <p class="my-0 ml-1">C-grade</p>
                </div><small style="color: rgb(168, 165, 165);">GHC <span id="gradeCval"></span></small>
            </div>
        </div>
        <div class="d-flex w-100 mt-4">
            <div class=" p-3" style="background: rgb(86, 197, 150); width: 0.2%;"></div>
            <div class=" p-3" style="background: rgb(5, 109, 207); width: 36.7%;"></div>
            <div class="p-3" style="background: rgb(141, 86, 165); width: 63.2%;"></div>
        </div>
    </div>

    <div class="container-fluid bg-white py-3 px-0 mt-4" style="border-radius: 5px;">

        <div>
            <table id="abc_analysis_table" class="table mt-3">
                <thead>
                    <th>Product Name &amp; ID</th>
                    <th>Product Grade</th>
                    <th>Ending Quantity</th>
                    <th>Total Value(Cost)</th>
                    <th>Total Value(Price)</th>
                </thead>
                <tbody id="abc_analysis_table_data">

                </tbody>
            </table>
        </div>
    </div>

</div>
<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<script>
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

    
    
    $("#patient_base_filter_medicine_availability_abc").submit(function (e) {
        e.preventDefault()
        try {
            let res = {}
            let url = ""
            let date_itself = document.getElementById('patient_base_dates_base_medicine_abc').value != '' ? 
                                calculateDateRange(document.getElementById('patient_base_dates_base_medicine_abc').value)['current'] : null
            if (date_itself) {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'startDate': date_itself['startDate'],
                    'endDate': date_itself['endDate'],
                })
                
            }
            if (document.getElementById('search_abc').value != '') {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'search': document.getElementById('search_abc').value,
                })   
            }
            if (document.getElementById('patient_base_category_abc').value != '') {
                url = (url == '' ? url : (url+'&')) + serialize({
                    'category': document.getElementById('patient_base_category_abc').value,
                })   
            }
            requestAbcAnalysis(url)
        } catch (error) {
            console.log(error)
        }
        return false
    });

    function nanChecker(val) {
        return typeof(val) == 'number' ? parseFloat(val || 0).toFixed(2) : 0
    }

    function abc_score(quantity_sold, total_value_sold) {        
        let percent = (parseFloat(quantity_sold / total_value_sold).toFixed(2)) * 100

        if(percent >= 80) {
            return "A"
        } else if(percent >= 50) {
            return  "B"
        }
        return "C"

    }

    function other_abc_score(quantity_sold, total_value_sold) {
        
        let percent = (parseFloat(quantity_sold / total_value_sold).toFixed(2)) * 100

        if(percent >= 80) {
            return {abc: "A", val: quantity_sold}
        } else if(percent >= 50) {
            return  {abc: "B", val: quantity_sold}
        }
        return {abc: "C", val: quantity_sold}

    }


    function requestAbcAnalysis(url) {
        table = $('#abc_analysis_table').DataTable();
        table.destroy();
        $.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( ['controller' => 'Inventory', 'action' => 'abcAnalysis'] ); -->?"+url,
			data: {},
			beforeSend: function(){
				console.log('fetching data')
			},
			success: function (res){

                let result = processAbcAnalysis(res)
                table = $('#abc_analysis_table').DataTable();
                table.destroy();
                $('#abc_analysis_table_data').html(result)
                table = $('#abc_analysis_table').DataTable();
			}
		});
    };

    function processAbcAnalysis(data) {
        let retail_q = 0
        let total_p = 0
        let total_sp = 0
        let total_value_sold = 0

        data?.forEach((item) => {

            retail_q += item['ending_quantity']
            total_p += item['total_cost']
            total_sp += item['total_selling']

            total_value_sold += item['total_sold']
            
        })

        let abc_analysis = data.reduce((acc, curr) => {
            let abc = other_abc_score(curr['total_sold'], total_value_sold)

            acc[abc['abc']]['val'] += abc['val']
            return acc
        }, {
            'A': {
                abc: 'A',
                val: 0
            },
            'B': {
                abc: 'B',
                val: 0
            },
            'C': {
                abc: 'C',
                val: 0
            },
        })

        let a = (abc_analysis['A']?.val)
        let b = (abc_analysis['B']?.val)
        let c = (abc_analysis['C']?.val)

        $('#gradeAval').html(abc_analysis['A']?.val)
        $('#gradeBval').html(abc_analysis['B']?.val)
        $('#gradeCval').html(abc_analysis['C']?.val)

        console.log("abc_analysis", abc_analysis)
        
        let total = Math.abs(a) + Math.abs(b) + Math.abs(c);
        let a_per = Math.abs(a/total) * 100
        let b_per = Math.abs(b/total) * 100
        let c_per = Math.abs(c/total) * 100
        
        $('#gradeA').html(a_per)
        $('#gradeB').html(b_per)
        $('#gradeC').html(c_per)

        let result = ''

        data.forEach(row => {
            result += \`
                <tr>
                    <td>\${row.name || ''}</td>
                    <td>\${abc_score(row['total_sold'], total_value_sold)}</td>
                    <td>\${row.ending_quantity || 0}</td>
                    <td>\${row.total_cost || 0}</td>
                    <td>\${row.total_selling || 0}</td>
                </tr>
            \`
        });

        return result

    }

    $(document).ready(function() {  

        requestAbcAnalysis()
    })
</script>
`;

export default function ElementElementInventoryAbcAnalysis() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
