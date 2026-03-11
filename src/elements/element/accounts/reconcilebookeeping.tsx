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
                    <header>Reconcile</header>
                </div>
                <div class="card-body ">
                    <div class="d-flex align-items-center mt-3">
                        <h4 class="my-0">Reconciled FY Bookkeeping for <!-- php: = date('Y') --></h4>
                        
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

                    <br />
                    <div id="accordion2">
                        <div class="">
                            <div class="lightblue" id="headingSix">
                                <h5 class="mb-0">
                                    <div class="d-flex align-items-center p-1 panel-title" data-toggle="collapse"
                                        data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <h6 class="ml-3 my-0">Stanbic Bank</h6>
                                                <span class="badge badge-secondary ml-3">Money In & Out</span>
                                            </div>

                                        </div>
                                    </div>
                                </h5>
                            </div>
                            <div id="collapseSix" class="collapse" aria-labelledby="headingSix"
                                data-parent="#accordion">
                                <div class="card">
                                    <div class="container px-5 py-2 mt-3">
                                        <table id="reconcileTable" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Cut Off Period</th>
                                                    <th>Date Range</th>
                                                    <th>End Balance per Book</th>
                                                    <th>End Balance per Bank</th>
                                                    <th>Reconciled Difference</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1 months</td>
                                                    <td>January 2023 - February 2023</td>
                                                    <td>Ghc 4000</td>
                                                    <td>Ghc 5000</td>
                                                    <td>Ghc -1000</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-xs">view statement</button>
                                                        <button class="btn btn-danger btn-xs">raise a report</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2 months</td>
                                                    <td>February 2023 - April 2023</td>
                                                    <td>Ghc 4000</td>
                                                    <td>Ghc 2000</td>
                                                    <td>Ghc 2000</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-xs">view statement</button>
                                                        <!-- <button class="btn btn-danger btn-xs">raise a report</button> -->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3 months</td>
                                                    <td>April 2023 - July 2023</td>
                                                    <td>Ghc 4000</td>
                                                    <td>Ghc 1000</td>
                                                    <td>Ghc 3000</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-xs">view statement</button>
                                                        <!-- <button class="btn btn-danger btn-xs">raise a report</button> -->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6 months</td>
                                                    <td>July 2023 - November 2023</td>
                                                    <td>Ghc 4000</td>
                                                    <td>Ghc 5000</td>
                                                    <td>Ghc -1000</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-xs">view statement</button>
                                                        <button class="btn btn-danger btn-xs">raise a report</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>12 months</td>
                                                    <td>Noverber 2023 - November 2024</td>
                                                    <td>Ghc 4000</td>
                                                    <td>Ghc 5000</td>
                                                    <td>Ghc -1000</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-xs">view statement</button>
                                                        <button class="btn btn-danger btn-xs">raise a report</button>
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
            </div>
        </div>
    </div>
</div>
<script>
    $("#reconcileTable").DataTable()
</script>
`;

export default function ElementElementAccountsReconcilebookeeping() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
