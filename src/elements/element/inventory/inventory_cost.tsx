const rawHtml = `
<div class="container-fluid card p-3">
    <div class="d-flex justify-content-between align-items-center px-3">
        <div>
            <h4 class="font-weight-bold">Inventory Cost</h4>
            <div class="d-flex align-items-center mt-4">
                <div class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                        viewBox="0 0 30 30" fill="none">
                        <path
                            d="M22.5 12.5H7.5C6.83696 12.5 6.20107 12.7634 5.73223 13.2322C5.26339 13.7011 5 14.337 5 15V23.75H25V15C25 14.337 24.7366 13.7011 24.2678 13.2322C23.7989 12.7634 23.163 12.5 22.5 12.5ZM22.5 17.5H17.5V15H22.5M21.25 11.25H8.75V5H21.25V11.25Z"
                            fill="#097193"></path>
                    </svg>
                    <p class="my-0 ml-1" style="color: rgb(9, 113, 147);">Print</p>
                </div>
                <div class="d-flex align-items-center ml-4"><svg xmlns="http://www.w3.org/2000/svg" width="25"
                        height="25" viewBox="0 0 30 30" fill="none">
                        <path d="M6.25 25H23.75V22.5H6.25M23.75 11.25H18.75V3.75H11.25V11.25H6.25L15 20L23.75 11.25Z"
                            fill="#097193"></path>
                    </svg>
                    <p class="my-0 ml-1" style="color: rgb(9, 113, 147);">Export</p>
                </div>
                <div class="d-flex align-items-center ml-4"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                        height="20" viewBox="0 0 30 30" fill="none">
                        <path
                            d="M1.25 8.75H3.75V26.25H21.25V28.75H3.75C2.375 28.75 1.25 27.6375 1.25 26.25V8.75ZM23.75 1.25H8.75C7.3625 1.25 6.25 2.375 6.25 3.75V21.25C6.25 22.625 7.3625 23.75 8.75 23.75H26.25C27.625 23.75 28.75 22.625 28.75 21.25V6.25L23.75 1.25ZM26.25 21.25H8.75V3.75H22.7125L26.25 7.2875V21.25ZM17.5 12.5C15.425 12.5 13.75 14.175 13.75 16.25C13.75 18.325 15.425 20 17.5 20C19.575 20 21.25 18.325 21.25 16.25C21.25 14.175 19.575 12.5 17.5 12.5ZM10 5H21.25V10H10V5Z"
                            fill="#097193"></path>
                    </svg>
                    <p class="my-0 ml-1" style="color: rgb(9, 113, 147);">Save As</p>
                </div>
            </div>
            <div class="form-group">
               <div class="d-flex align-items-center mt-3">
                   <label style="white-space:nowrap" class="mt-1">Date Range:&nbsp;</label>
                   <SearchableSelectField name="" id="date-filter" class="form-control">
                       <option value="today">Today</option>
                       <option value="this-week">This Week</option>
                       <option value="this-month">This Month</option>
                       <option value="custom">Custom</option>
                   </SearchableSelectField>
               </div>

                <div class="d-none" id="custom-date-range-container">
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
        <div>
            <SearchableSelectField name="" id="" class="form-control">
                <option value="">Department</option>
            </SearchableSelectField>
            <div class="d-flex align-items-center mt-3">

                <div style="background: rgb(241, 245, 251)"
                    class="search-container d-flex align-items-center w-100 p-2">
                    <!-- php: = $this->Html->image('../assets/img/search1.svg',['class' =>'', 'style'=> 'height:20px;width:auto']) -->
                    <input style="border: none;background: rgb(241, 245, 251);" type="text" placeholder="Search name"
                        class="form-control">
                </div>

            </div>

        </div>
    </div>
    <div class="container-fluid bg-white mt-3">
        <h4 class="font-weight-bold">Total Inventory Cost</h4>
        <h4 class="my-0 font-weight-bold">GHc 21100</h4>
        <p class="fw-bold mt-4 font-weight-bold">Breakdown of Inventory Costs</p>
        <div class="d-flex align-items-center">
            <div class="col-md-2 pl-0">
                <div class="d-flex align-items-center">
                    <div style="height: 20px; width: 20px; background: rgb(197, 86, 173);"></div>
                    <p class="my-0 ml-1">Purchase Cost</p>
                </div><small style="color: rgb(168, 165, 165);">GHC 100</small>
            </div>
            <div class="col-md-2 pl-0">
                <div class="d-flex align-items-center">
                    <div style="height: 20px; width: 20px; background: rgb(225, 145, 51);"></div>
                    <p class="my-0 ml-1">Ordering Cost</p>
                </div><small style="color: rgb(168, 165, 165);">GHC 5000</small>
            </div>
            <div class="col-md-2 pl-0">
                <div class="d-flex align-items-center">
                    <div style="height: 20px; width: 20px; background: rgb(5, 109, 207);"></div>
                    <p class="my-0 ml-1">Holding Cost</p>
                </div><small style="color: rgb(168, 165, 165);">GHC 8000</small>
            </div>
            <div class="col-md-2 pl-0">
                <div class="d-flex align-items-center">
                    <div style="height: 20px; width: 20px; background: rgb(86, 197, 150);"></div>
                    <p class="my-0 ml-1">Shortage Cost</p>
                </div><small style="color: rgb(168, 165, 165);">GHC 8000</small>
            </div>
        </div>
        <div class="d-flex w-100 mt-4">
            <div class=" p-3" style="background: rgb(197, 86, 173); width: 0.5%;"></div>
            <div class=" p-3" style="background: rgb(225, 145, 51); width: 23.7%;"></div>
            <div class="p-3" style="background: rgb(5, 109, 207); width: 37.9%;"></div>
            <div class=" p-3" style="background: rgb(86, 197, 150); width: 37.9%;"></div>
        </div>
    </div>
    <div class="container-fluid bg-white py-4 px-0 mt-3">
        <div class="container-fluid pb-2 d-flex align-items-start pl-4"
            style="border-bottom: 1px solid rgb(181, 183, 192);">
            <div class="d-flex align-items-center justify-content-center p-3"
                style="background: rgb(197, 86, 173); border-radius: 5px;">
                <h5 class="my-0 text-slate-900 font-weight-bold">P</h5>
            </div>
            <div class="ml-3">
                <h5 class="my-0 font-weight-bold">Purchase Cost makes up 0.5% of Inventory Costs</h5>
                <p style="color: rgb(181, 183, 192);">Purchase cost sums up the price a supplier charges you when buying
                    their products</p>
            </div>
        </div>
        <div class="container-fluid pb-2 d-flex align-items-start pl-4 mt-2"
            style="border-bottom: 1px solid rgb(181, 183, 192);">
            <div class="d-flex align-items-center justify-content-center p-3"
                style="background: rgb(225, 145, 51); border-radius: 5px;">
                <h5 class="my-0 text-slate-900 font-weight-bold">O</h5>
            </div>
            <div class="ml-3">
                <h5 class="my-0 font-weight-bold">Ordering Cost makes up 23.7% of Inventory Costs</h5>
                <p style="color: rgb(181, 183, 192);">This consists of labour expenses including wages, taxes, benefits,
                    etc.</p>
            </div>
        </div>
        <div class="container-fluid pb-2 d-flex align-items-start pl-4 mt-2"
            style="border-bottom: 1px solid rgb(181, 183, 192);">
            <div class="d-flex align-items-center justify-content-center p-3"
                style="background: rgb(5, 109, 207); border-radius: 5px;">
                <h5 class="my-0 text-slate-900 font-weight-bold">H</h5>
            </div>
            <div class="ml-3">
                <h5 class="my-0 font-weight-bold">Holding Cost makes up 37.9% of Inventory Costs</h5>
                <p style="color: rgb(181, 183, 192);">This is attributed to the cost of space where the inventory is
                    being held</p>
            </div>
        </div>
        <div class="container-fluid pb-2 d-flex align-items-start pl-4 mt-2">
            <div class="d-flex align-items-center justify-content-center p-3"
                style="background: rgb(86, 197, 150); border-radius: 5px;">
                <h5 class="my-0 text-slate-900 font-weight-bold">S</h5>
            </div>
            <div class="ml-3">
                <h5 class="my-0 font-weight-bold">Shortage Cost makes up 37.9% of the revenue</h5>
                <p style="color: rgb(181, 183, 192);">These are expenses incurred when you don’t have enough inventory
                    in stock</p>
            </div>
        </div>
    </div>

</div>

<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->

<script>
    $('#date-filter').on('change', function(e){
        if(e.target.value == 'custom'){
            $('#custom-date-range-container').removeClass('d-none')
        } else {
            $('#custom-date-range-container').addClass('d-none')
 
        }
    })

    mobiscroll.datepicker('#range', {
    controls: ['datetime'],
    select: 'range',
    startInput: '#start',
    endInput: '#end',
    touchUi: true
});
</script>
    
`;

export default function ElementElementInventoryInventoryCost() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
