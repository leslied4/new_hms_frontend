const rawHtml = `
<head>
    	<!--MobiScroll-->
<!-- php: =$this->Html->css('../assets/plugins/mobiscroll/css/mobiscroll.javascript.min.css') -->
</head>

<div class="row">
    <div class="col-md-12">
        <div class="card card-topline-<!-- php: = $theme1 -->">

            <div class="card  card-box">
                <!-- <div class="card-head">
                    <header>Pending Payments</header>
                </div> -->
                <div class="card-body ">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-2 pr-3">
                                <div class="form-group">
                                    <label>Filter:</label>
                                    <SearchableSelectField name="" id="date-filter3" class="form-control">
                                        <option value="today">Today</option>
                                        <option value="this-week">This Week</option>
                                        <option value="this-month">This Month</option>
                                        <option value="custom">Custom</option>
                                    </SearchableSelectField>

                                   <div id="custom-date-range-container3">
                                       <div id="range3"></div>
                                       <label>
                                           Start
                                           <input id="start3" mbsc-input placeholder="Please select..." />
                                       </label>
                                       <label>
                                           End
                                           <input id="end3" mbsc-input placeholder="Please select..." />
                                       </label>
                                   </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Request Type:</label><br/>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="lab" value="lab">
                                        <label class="form-check-label" for="lab">Lab</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="pharmacy" value="pharmacy">
                                        <label class="form-check-label" for="pharmacy">Pharmacy</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="radiology" value="radiology">
                                        <label class="form-check-label" for="radiology">Radiology</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="surgery" value="surgery">
                                        <label class="form-check-label" for="surgery">Surgery</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 pr-3">
                                <div class="form-group">
                                    <label>Collection Status:</label>
                                    <SearchableSelectField name="" id="" class="form-control">
                                        <option value="">Collected</option>
                                        <option value="">Not Collected</option>
                                        <option value="">On Hold</option>
                                        <option value="">Removed</option>
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="col-md-4 d-flex align-start">
                                <div class="form-group">
                                    <label>From:</label>
                                    <SearchableSelectField name="" id="" class="form-control">
                                        <option value="">Department 1</option>
                                    </SearchableSelectField>
                                </div>
                                <div class="form-group">
                                    <label>To:</label>
                                   <div class="d-flex align-items-start">
                                   <SearchableSelectField name="" id="" class="form-control">
                                        <option value="">Department 2</option>
                                    </SearchableSelectField>
                                    <button id="go-btn" type="submit" class="btn btn-sm btn-primary mt-1">Go</button>
                                   </div>
                                </div>
                            </div>
                            <div class="col-md-2 pr-3">
                                <div class="form-group">
                                    <label>Sample Type:</label>
                                    <SearchableSelectField name="" id="" class="form-control">
                                        
                                    </SearchableSelectField>
                                </div>
                            </div>
                        </div>
                        <table class="table" id="sample-collections-table">
                            <thead>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Folder Number</th>
                                <th>Request Type</th>
                                <th>Sample</th>
                                <th>From (Requester/Department)</th>
                                <th>To</th>
                                <th>Waiting Time</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>03/04/05</td>
                                    <td>John Doe <span class="badge badge-danger">Male</span><span
                                            class="badge badge-dark ml-2">20</span></td>
                                    <td>FL001</td>
                                    <td>Type</td>
                                    <td>Sample <span class="badge warning">Type</span></td>
                                    <td>Abu</td>
                                    <td>Einus</td>
                                    <td></td>
                                    <td>100mins</td>
                                    <td>
                                        <div class="row align-items-center">
                                            <button class="btn btn-xs btn-info">Notify</button>
                                            <button class="btn btn-xs btn-success">Collected</button>
                                            <button class="btn btn-xs btn-warning">Hold</button>
                                            <button class="btn btn-xs btn-danger">Remove</button>
                                            <button class="btn btn-xs btn-primary">New Request</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
	<!-- <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') --> -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
    
<script>
     $('#sample-collections-table').DataTable();

     mobiscroll.datepicker('#range', {
    select: 'range',
    startInput: '#start',
    endInput: '#end'
});

$("#custom-date-range-container3").hide()

$("#date-filter3").on("change", function(e){
    if(e.target.value == "custom"){
        $("#custom-date-range-container3").show()
    } else {
        $("#custom-date-range-container3").hide()
    }
})
</script>

`;

export default function ElementElementPendingRequestsSamplecollection() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
