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
                                    <SearchableSelectField name="" id="date-filter" class="form-control">
                                        <option value="today">Today</option>
                                        <option value="this-week">This Week</option>
                                        <option value="this-month">This Month</option>
                                        <option value="custom">Custom</option>
                                    </SearchableSelectField>

                                   <div id="custom-date-range-container">
                                       <div id="range"></div>
                                       <label>
                                           Start
                                           <input id="start" mbsc-input placeholder="Please select..." />
                                       </label>
                                       <label>
                                           End
                                           <input id="end" mbsc-input placeholder="Please select..." />
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
                                    <label>Payment Status:</label>
                                    <SearchableSelectField name="" id="" class="form-control">
                                        <option value="">Paid</option>
                                        <option value="">Not Paid</option>
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
                        </div>
                        <table class="table" id="pending-payments-table">
                            <thead>
                                <th>Date</th>
                                <th>Patient Name</th>
                                <th>Folder Number</th>
                                <th>Request Type</th>
                                <th>From (Requester/Department)</th>
                                <th>To</th>
                                <th>Payment Status</th>
                                <th>Waiting Time</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>03/04/05</td>
                                    <td>John Doe <span class="badge badge-danger">Male</span><span
                                            class="badge badge-dark ml-2">20</span></td>
                                    <td>FL001</td>
                                    <td>Type</td>
                                    <td>Abu</td>
                                    <td>Einus</td>
                                    <td>
                                        <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
                                            <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">
                                                <i class="fa fa-money"></i>
                                            </span>
                                            <span class="mdl-chip__text">
                                                <strong>Insurance </strong>
                                            </span>
                                            <span class="mdl-chip__text" style="float: right;">
                                                GHS 100
                                            </span>
                                        </span>
                                        <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
                                            <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">
                                                <i class="fa fa-question"></i>
                                            </span>
                                            <span class="mdl-chip__text">
                                                <strong>Not Paid </strong>
                                            </span>
                                            <span class="mdl-chip__text" style="float: right;">
                                                GHS 100
                                            </span>
                                        </span>
                                    </td>
                                    <td>100mins</td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <button class="btn btn-xs btn-primary">Queue</button>
                                            <button class="btn btn-xs btn-warning">Hold</button>
                                            <button class="btn btn-xs btn-danger">Remove</button>
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
     $('#pending-payments-table').DataTable();

     mobiscroll.datepicker('#range', {
    select: 'range',
    startInput: '#start',
    endInput: '#end'
});

$("#custom-date-range-container").hide()

$("#date-filter").on("change", function(e){
    if(e.target.value == "custom"){
        $("#custom-date-range-container").show()
    } else {
        $("#custom-date-range-container").hide()
    }
})
</script>

`;

export default function ElementElementPendingRequestsPendingpayments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
