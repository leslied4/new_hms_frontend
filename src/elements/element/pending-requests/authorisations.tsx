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
                                    <SearchableSelectField name="" id="date-filter2" class="form-control">
                                        <option value="today">Today</option>
                                        <option value="this-week">This Week</option>
                                        <option value="this-month">This Month</option>
                                        <option value="custom">Custom</option>
                                    </SearchableSelectField>

                                   <div id="custom-date-range-container2">
                                       <div id="range2"></div>
                                       <label>
                                           Start
                                           <input id="start2" mbsc-input placeholder="Please select..." />
                                       </label>
                                       <label>
                                           End
                                           <input id="end2" mbsc-input placeholder="Please select..." />
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
                                    <label>Authorisation Status:</label>
                                    <SearchableSelectField name="" id="" class="form-control">
                                        <option value="">Authorised</option>
                                        <option value="">Not Authorised</option>
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="col-md-2 d-flex align-start">
                                <div class="form-group">
                                    <label>From:</label>
                                   <div class="d-flex align-items-start">
                                   <SearchableSelectField name="" id="" class="form-control">
                                        <option value="">Department 2</option>
                                    </SearchableSelectField>
                                    <button id="go-btn" type="submit" class="btn btn-sm btn-primary mt-1">Go</button>
                                   </div>
                                </div>
                                
                            </div>
                        </div>
                        <table class="table" id="authorisations-table">
                            <thead>
                                <th>Visit Date</th>
                                <th>Name</th>
                                <th>Folder Number</th>
                                <th>Insurance/Sponsor</th>
                                <th>Membership ID</th>
                                <th>Request</th>
                                <th>From (Requester/Department)</th>
                                <th>Status</th>
                                <th>Reason</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>03/04/05</td>
                                    <td>John Doe <span class="badge badge-danger">Male</span><span
                                            class="badge badge-dark ml-2">20</span></td>
                                    <td>FL001</td>
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
                                    <td>MLKJ-001</td>
                                    <td>Request 1 <span class="badge badge-primary">Req Type</span></td>
                                    <td>Einus</td>
                                    <td> <span class="badge badge-warning">Pending</span> 100mins</td>
                                    <td>Reason</td>
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
     $('#authorisations-table').DataTable();
     mobiscroll.datepicker('#range2', {
    select: 'range',
    startInput: '#start2',
    endInput: '#end2'
});

     $("#custom-date-range-container2").hide()

    $("#date-filter2").on("change", function(e){
        if(e.target.value == "custom"){
            $("#custom-date-range-container2").show()
        } else {
            $("#custom-date-range-container2").hide()
        }
    })
</script>

`;

export default function ElementElementPendingRequestsAuthorisations() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
