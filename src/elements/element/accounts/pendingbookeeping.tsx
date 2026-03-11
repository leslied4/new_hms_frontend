const rawHtml = `
<style>
	.lightblue 
	{
		background-color:#51aff124;
	}
	.panel-title:after {
  font-family: FontAwesome;
  content: "\f107";
  float: right;
  color: grey;
  font-size:16px;
}

.panel-title[aria-expanded="true"]:after {
  content: "\f106";
}

.abu-custom-search input::placeholder {
  font-size: 14px;
}
	
</style>
<div class="row">
    <div class="col-md-12">
        <div class="card card-topline-<!-- php: = $theme1 -->">
            <div class="card  card-box">
                <div class="card-head">
                    <header>Pending</header>
                </div>
                <div class="card-body ">
                    <div class="d-flex align-items-center mt-3">
                        <h4 class="my-0">FY Bookkeeping for <!-- php: = date('Y') --></h4>
                      
                    </div>

                    <div class="d-flex align-items-end justify-content-between mt-4">

                        <div class="col-md-7 d-flex justify-content-between mb-2 pl-0">
                            <div class="d-flex align-items-center w-100">
                                <div style="border: 1px solid #F0F6FA; background: #F1F5FB; border-radius: 5px;"
                                    class="py-1 search-container abu-custom-search d-flex align-items-center justify-content-end px-2 col-md-4">
                                    <img src="{searchIcon}" height="20px" alt="" />
                                    <input style="background: #F1F5FB; border:none;" type="text"
                                        class="form-control searchinput" value="" onchange="" placeholder="Search" />
                                </div>
                                <SearchableSelectField name="" id="" style="height:40px" class="form-control col-md-4 py-0 ml-2">
                                    <option value="">Money In</option>
                                    <option value="">Money Out</option>
                                    <option value="">Money In & Out</option>
                                    <option value="">All</option>
                                </SearchableSelectField>
                            </div>
                            <div class="d-flex">
                                <!-- 
                                    <div style="border: 1px solid #F0F6FA; background: #F0F6FA; border-radius: 5px;"
                                        class="search-container d-flex align-items-center px-3">
                                        Download
                                    </div> 
                                    -->
                            </div>
                        </div>
                        <div class="col-md-5 d-flex justify-content-end mb-2">
                            <div class="d-flex">
                                <div style="border: 1px solid #F0F6FA; height: 50px; background: #F0F6FA; border-radius: 5px;"
                                    class="d-flex align-items-center search-container abu-custom-search pl-1 mr-2">
                                    <small style="white-space: nowrap;" class="px-1">Sort By</small>
                                    <SearchableSelectField style="background: #F0F6FA;border:none;" name="" id=""
                                        class="form-control searchinput px-4 m-0">
                                    </SearchableSelectField>
                                </div>
                                <button style="border: 1px solid rgba(16, 24, 40, 0.05);" class="btn">Download
                                    all</button>
                            </div>
                        </div>
                    </div>


                    <p class='mt-4'>These account ledgers have reached their cut-off period for reporting. Reconcile
                        the accounts by</p>
                    <ol style="list-style:number;padding-left: 15px">
                        <li>Making sure compliance activities on the account have been performed.</li>
                        <li>Entering the bank balance to be compared to the book balance</li>
                        <li>Adjust the book balance for any timing differences. Add deposits in transit and subtract
                            outstanding debits<br /> so the book balance is adjusted to reflect transactions in the
                            reporting bank balance</li>
                        <li>Go to Reconcile to view all Closed Account Ledgers for a cut-off periods</li>
                    </ol>
                    <br />
                    <div id="accordion">
                        <div class="">
                            <div class="lightblue" id="headingTwo">
                                <h5 class="mb-0">
                                    <div class="d-flex align-items-center p-1 panel-title" data-toggle="collapse"
                                        data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <h6 class="ml-3 my-0">Stanbic Bank</h6>
                                                <span class="badge badge-secondary ml-3">Money In & Out</span>
                                            </div>

                                            <h6 style="font-size: 15px;" class="ml-3 my-0">Ending Balance per Books:
                                                <span class="text-secondary"> + GHc 1,000,000</span></h6>
                                            <h6 style="font-size: 15px;"
                                                class="ml-3 my-0 d-flex align-items-center mr-4">Ending Balance per
                                                Bank:&nbsp; GHc&nbsp;&nbsp;
                                                <span class="text-secondary d-flex align-items-center">
                                                    <input type="text" style="font-size: 15px;" onchange="" value=""
                                                        class="form-control" />
                                                    <button id="btn1" onmouseout="" onmouseover=""
                                                        style="background: themes().other; color: themes().secondary;"
                                                        class="btn">Save</button>
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                </h5>
                            </div>
                            <div id="collapseOne" class="collapse" aria-labelledby="headingTwo"
                                data-parent="#accordion">
                                <div class="card">
                                    <div class="container px-5 py-2 mt-3">
                                        <div class="row">
                                            <div class="col-md-4 p-2">
                                                <h6>Deposits and Other Credits</h6>
                                                <div class="col-md-8 pl-0">
                                                    <div class="mt-3 d-flex align-items-center justify-content-between">
                                                        <p>Sales Submission :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Invoice :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Checks :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Credit :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Claims :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Manual Record :</p>
                                                        <p>100</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 p-2">
                                                <h6>Check and Other Debits</h6>
                                                <div class="col-md-8 pl-0">
                                                    <div class="mt-3 d-flex align-items-center justify-content-between">
                                                        <p>Sales Submission :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-Out Invoices :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Purchasing :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Ordering Cost :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Holding Cost :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Manual Record :</p>
                                                        <p>100</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 p-2">
                                                <h6>Summary</h6>
                                                <div class="col-md-12 pl-0">
                                                    <div class="mt-3 d-flex align-items-center justify-content-between">
                                                        <p>Available Balance vs Current Balance :</p>
                                                        <p>1000 - 1200</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Total Credit :</p>
                                                        <p>1000</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Total Debit :</p>
                                                        <p>1000</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Reconciled Balance per Bank :</p>
                                                        <p>1000</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Difference :</p>
                                                        <p>+ 1000</p>
                                                    </div>
                                                    <!-- <button id="download1" class="btn d-flex align-items-center pl-0">
                                                        <img style="height: 20px;" src="{download}" />&nbsp; Download
                                                        Statement
                                                    </button> -->

                                                    <div>
                                                        <div class="form-check mt-3">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="flexCheckDefault" />
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                I am happy with the ending balance for this ledger
                                                            </label>
                                                        </div>
                                                        <button id="btn4" 
                                                            style="background: themes().other; color: themes().secondary"
                                                            class="btn mt-2">Save & Submit</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <div class="lightblue" id="headingThree">
                                <h5 class="mb-0">
                                    <div class="d-flex align-items-center p-1 panel-title" data-toggle="collapse"
                                        data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <h6 class="ml-3 my-0">Zenith Bank</h6>
                                                <span class="badge bg-success text-slate-900 ml-3">Money In</span>
                                            </div>

                                            <h6 style="font-size: 15px;" class="ml-3 my-0">Ending Balance per Books:
                                                <span class="text-secondary"> + GHc 1,000,000</span></h6>
                                            <h6 style="font-size: 15px;"
                                                class="ml-3 my-0 d-flex align-items-center mr-4">Ending Balance per
                                                Bank:&nbsp; GHc&nbsp;&nbsp;
                                                <span class="text-secondary d-flex align-items-center">
                                                    <input type="text" style="font-size: 15px;" onchange="" value=""
                                                        class="form-control" />
                                                    <button id="btn1" onmouseout="" onmouseover=""
                                                        style="background: themes().other; color: themes().secondary;"
                                                        class="btn">Save</button>
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                </h5>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingThree"
                                data-parent="#accordion">
                                <div class="card">
                                    <div class="container px-5 py-2 mt-3">
                                        <div class="row">
                                            <div class="col-md-4 p-2">
                                                <h6>Deposits and Other Credits</h6>
                                                <div class="col-md-8 pl-0">
                                                    <div class="mt-3 d-flex align-items-center justify-content-between">
                                                        <p>Sales Submission :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Invoice :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Checks :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Credit :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-In Claims :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Manual Record :</p>
                                                        <p>100</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 p-2">
                                                <h6>Summary</h6>
                                                <div class="col-md-12 pl-0">
                                                    <div class="mt-3 d-flex align-items-center justify-content-between">
                                                        <p>Available Balance vs Current Balance :</p>
                                                        <p>1000 - 1200</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Total Credit :</p>
                                                        <p>1000</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Reconciled Balance per Bank :</p>
                                                        <p>1000</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Difference :</p>
                                                        <p>+ 1000</p>
                                                    </div>
                                                    <!-- <button id="download1" class="btn d-flex align-items-center pl-0">
                                                        <img style="height: 20px;" src="{download}" />&nbsp; Download
                                                        Statement
                                                    </button> -->

                                                    <div>
                                                        <div class="form-check mt-3">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="flexCheckDefault" />
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                I am happy with the ending balance for this ledger
                                                            </label>
                                                        </div>
                                                        <button id="btn4" 
                                                            style="background: themes().other; color: themes().secondary"
                                                            class="btn mt-2">Save & Submit</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <div class="lightblue" id="headingFour">
                                <h5 class="mb-0">
                                    <div class="d-flex align-items-center p-1 panel-title" data-toggle="collapse"
                                        data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <h6 class="ml-3 my-0">Access Bank</h6>
                                                <span class="badge badge-danger ml-3">Money Out</span>
                                            </div>

                                            <h6 style="font-size: 15px;" class="ml-3 my-0">Ending Balance per Books:
                                                <span class="text-secondary"> + GHc 1,000,000</span></h6>
                                            <h6 style="font-size: 15px;"
                                                class="ml-3 my-0 d-flex align-items-center mr-4">Ending Balance per
                                                Bank:&nbsp; GHc&nbsp;&nbsp;
                                                <span class="text-secondary d-flex align-items-center">
                                                    <input type="text" style="font-size: 15px;" onchange="" value=""
                                                        class="form-control" />
                                                    <button id="btn1" onmouseout="" onmouseover=""
                                                        style="background: themes().other; color: themes().secondary;"
                                                        class="btn">Save</button>
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                </h5>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingFour"
                                data-parent="#accordion">
                                <div class="card">
                                    <div class="container px-5 py-2 mt-3">
                                        <div class="row">
                                            
                                            <div class="col-md-4 p-2">
                                                <h6>Check and Other Debits</h6>
                                                <div class="col-md-8 pl-0">
                                                    <div class="mt-3 d-flex align-items-center justify-content-between">
                                                        <p>Sales Submission :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Pay-Out Invoices :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Purchasing :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Ordering Cost :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Holding Cost :</p>
                                                        <p>100</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Manual Record :</p>
                                                        <p>100</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 p-2">
                                                <h6>Summary</h6>
                                                <div class="col-md-12 pl-0">
                                                    <div class="mt-3 d-flex align-items-center justify-content-between">
                                                        <p>Available Balance vs Current Balance :</p>
                                                        <p>1000 - 1200</p>
                                                    </div>
                                                   
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Total Debit :</p>
                                                        <p>1000</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Reconciled Balance per Bank :</p>
                                                        <p>1000</p>
                                                    </div>
                                                    <div class="mt-2 d-flex align-items-center justify-content-between">
                                                        <p>Difference :</p>
                                                        <p>+ 1000</p>
                                                    </div>
                                                    <!-- <button id="download1" class="btn d-flex align-items-center pl-0">
                                                        <img style="height: 20px;" src="{download}" />&nbsp; Download
                                                        Statement
                                                    </button> -->

                                                    <div>
                                                        <div class="form-check mt-3">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="flexCheckDefault" />
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                I am happy with the ending balance for this ledger
                                                            </label>
                                                        </div>
                                                        <button id="btn4" 
                                                            style="background: themes().other; color: themes().secondary"
                                                            class="btn mt-2">Save & Submit</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

`;

export default function ElementElementAccountsPendingbookeeping() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
