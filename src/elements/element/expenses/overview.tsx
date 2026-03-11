const rawHtml = `
<style>
    .darkorange {
        color: darkorange;
    }
</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">

        <!-- <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="card card-topline-<!-- php: = $theme1 -->">
                        <div class="card-body">
                            <div id="total_paid_container" style="background:;height:400px;width:35vw;margin:0;padding:0"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-topline-<!-- php: = $theme1 -->">
                        <div class="card-body">
                            <div id="container" style="background:;height:400px;width:38vw;margin:0;padding:0"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid card mt-3">
                <div id="total_payables_container" style="background:;height:400px;width:78vw;margin:0;padding:0"></div>
            </div>
        </div> -->

        <div class="container">
          
            <h4 class="mt-4 d-flex justify-content-between">Total Account Payables
               <button onclick="overviewTab()" style="box-shadow:none!important" class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-3 card p-3">
                    <small class="text-primary mb-0 pb-0">CURRENT</small>
                    <h3 id="current" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h3>
                </div>
                <div class="col-md-3 card p-3">
                    <small class="text-success mb-0 pb-0">BILLABLE</small>
                    <h3 id="billable" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0">Loading..</h3>
                    <small class="text-secondary mt-0 d-none">1-15 days</small>
                </div>
                <div class="col-md-3 card p-3">
                <small class="darkorange mb-0 pb-0">NON BILLABLE</small>
                    <h3 id="non-billable" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0">Loading..</h3>
                    <small class="text-secondary mt-0 d-none">16-30 days</small>
                </div>
                <div class="col-md-3 card p-3">
                <small class="text-danger mb-0 pb-0">OVERDUE</small>
                    <h3 id="overdue" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0">Loading..</h3>
                    <small class="text-secondary mt-0 d-none">Above 31 days</small>
                </div>
            </div>
        </div>

        <div class="container mt-4 p-3">
            <h4>Summary</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                       <!-- php: = $this->Html->image('loading.gif',['id' => 'loading-div', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                     
                        <div id="total_payables_container" style="height: 400px;width:950px; min-width: 100%;">
                         
                       </div>
                    </div>
                    <div class="col-md-2">
                        <SearchableSelectField id="total-payables-year"  class="form-control mt-3 current-years">
                        </SearchableSelectField>
                        <SearchableSelectField id="total-payables-month"  class="form-control mt-3">
                            <option>-- Month --</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </SearchableSelectField>
                        <h6 class="darkorange mt-5 mb-0 pb-0">Total Pending</h6>
                        <h2 id="total-pending" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-success mt-4 mb-0 pb-0">Total Paid</h6>
                        <h2 id="total-paid" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <!-- <h6 class="text-danger mt-4 mb-0 pb-0">Overdue</h6>
                        <h2 id="total-overdue" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                         -->
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-payables" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-4 p-3">
            <h4>Total Pending</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: = $this->Html->image('loading.gif',['id' => 'loading-div2', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="container" style="height: 400px;width:950px; min-width: 100%;"></div>
                    </div>
                    <div class="col-md-2">
                        <SearchableSelectField id="total-waiting-approval-year"  class="form-control mt-3 current-years">
                        </SearchableSelectField>
                        <!-- <h6 class="text-primary mt-5 mb-0 pb-0">Total Waiting for Approval</h6>
                        <h2 id="total-waiting-approval" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                        <h6 class="darkorange mt-4 mb-0 pb-0">Total Due</h6>
                        <h2 id="total-due" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-danger mt-4 mb-0 pb-0">Total Overdue</h6>
                        <h2 id="total-overdue" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-pending" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-4 p-3">
            <h4>Total Paid</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: = $this->Html->image('loading.gif',['id' => 'loading-div3', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="total_paid_container" style="height: 400px;width:950px; min-width: 100%;"></div>
                    </div>
                    <div class="col-md-2">
                        <SearchableSelectField id="total-paid-year" class="form-control mt-3 current-years">
                        </SearchableSelectField>
                        <h6 class="text-primary mt-5 mb-0 pb-0">Total Reported</h6>
                        <h2 id="total-reported" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-success mt-4 mb-0 pb-0">Total UnReported</h6>
                        <h2 id="total-unreported" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-paid" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-4 p-3">
            <h4>Expense Categories</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                    <!-- php: = $this->Html->image('loading.gif',['id' => 'loading-div4', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                        <div id="expense_categories_container" style="height: 400px;width:950px; min-width: 100%;"></div>
                    </div>
                    <div class="col-md-2">
                        <SearchableSelectField id="total-expense-year" class="form-control mt-3 current-years">
                        </SearchableSelectField>
                        <h6 class="text-secondary mt-5 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-expense-categories" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <!-- <h6 class="text-success mt-4 mb-0 pb-0">Total UnReported</h6>
                        <h2 id="total-unreported" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-paid" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2> -->
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</div>


<!-- php: = $this->Html->script('/js/echarts.js'); -->
<script>
    // require.config({
    //   paths: {
    //     echarts: "<!-- php: //= $this->Url->build(['controller' => 'assets', 'action' => 'plugins']) -->/echarts"
    //   }
    // }), require(["echarts","echarts/chart/bar", "echarts/chart/pie"], function(a) {

    var total_pending = echarts.init(document.getElementById("container"));
    var total_payables = echarts.init(document.getElementById("total_payables_container"));
    var total_paid = echarts.init(document.getElementById("total_paid_container"));
    var total_expense_categories = echarts.init(document.getElementById("expense_categories_container"));
    // var date_period = a.init(document.getElementById("date_period_container"));
    window.onresize = function () {
        total_pending.resize();
        total_payables.resize();
        total_paid.resize();
        total_expense_categories.resize();
    };
    window.addEventListener('resize', function () {
        total_pending.resize();
        total_payables.resize();
        total_paid.resize();
        total_expense_categories.resize();
    })



   function getTotalPayables(data){
    total_payables.setOption ({ 
      title: {
              text: 'Account Payables (Summary)',
              subtext: 'Total Pending + Total Paid',
              left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              orient: 'vertical',
              left: 'left'
          },
          series: [{
             // name: 'Access From',
              type: 'pie',
              radius: '70%',
              data: data,
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }]
    });
   }

   function getTotalPending(data){
    total_pending.setOption({
        title: {
            text: 'Total Pending',
            subtext: 'Total due + Total overdue',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.due_data,
                itemStyle: {color: 'darkorange'},
                type: 'bar'
            },
            {
                data: data.overdue_data,
                itemStyle: {color: 'red'},
                type: 'bar'
            }
        ]
    });
   }

   function getTotalPaid(data){
    total_paid.setOption ({  title: {
        text: 'Total Paid',
        subtext: 'Total reported + Total unreported ',
        left: 'center'
      }, xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data.reported_data,
          type: 'bar',
          itemStyle: {color: 'lightblue'},
        },
        {
          data: data.unreported_data,
          type: 'bar',
          itemStyle: {color: 'lightgreen'},
        }
      ]
    });
   }

   function getTotalExpenseCategories(data){
    total_expense_categories.setOption ({ 
      title: {
              text: 'Expense Categories',
             // subtext: 'Total Pending + Total Paid',
              left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              orient: 'vertical',
              left: 'left'
          },
          series: [{
              name: 'Access From',
              type: 'pie',
              radius: '70%',
              data: data,
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }]
    });
   }

   

function overviewTab(){
    //get data for total receivables
  $.ajax({
    type: 'GET',
    url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalAccountPayables']) -->",
    cache: false,
    beforeSend: function(){
      $('#current').html('Loading..');
      $('#approved').html('Loading..');
      $('#due').html('Loading..');
      $('#overdue').html('Loading..');
      $('#loading-div').addClass("d-block");
      $('#loading-div').removeClass("d-none");
    //   $('#loading-div2').addClass("d-block");
    //   $('#loading-div2').removeClass("d-none");
      $('#total-pending').html('Loading..');
      $('#total-paid').html('Loading..');
      $('#total-of-receivables').html('Loading..');
    //   $('#total-waiting-approval').html('Loading..');
    //   $('#total-due').html('Loading..');
      $('#billable').html('Loading..');
      $('#non-billable').html('Loading..');
      $('#total-overdue').html('Loading..');
      $('#total-pending').html('Loading..');
      $('#total-paid').html('Loading..');
      $('#total-of-payables').html('Loading..');
      

      getTotalPayables('');
      //getTotalPending('');
    },
    success: function(data){
      console.log(data);
      
      $('#current').html('₵ '+data.total);
      $('#billable').html('₵ '+data.billable);
      $('#non-billable').html('₵ '+data.non_billable);
      $('#total-of-payables').html('₵ '+data.total_of_payables);

      // $('#approved').html('₵ '+data.approved);
      // $('#due').html('₵ '+data.due);
      // $('#overdue').html('₵ '+data.overdue);
      // $('#total-pending').html('₵ '+data.pending_count);
      // $('#total-paid').html('₵ '+data.total_paid);
      // $('#total-of-receivables').html('₵ '+ data.total_of_receivables);
    //   $('#total-waiting-approval').html('₵ '+data.total_waiting_approval);
    //   $('#total-due').html('₵ '+data.due);
      $('#overdue').html('₵ '+data.overdue);
      getTotalPayables(data.total_payables);
      //getTotalPending(data.total_waiting_pending);
      $('#loading-div').removeClass("d-block");
      $('#loading-div').addClass("d-none");
     // $('#total-overdue').html('₵ '+ data.overdue);
      $('#total-pending').html('₵ '+ data.total_pending);
      $('#total-paid').html('₵ '+ data.total_paid);
    //   $('#loading-div2').removeClass("d-block");
    //   $('#loading-div2').addClass("d-none");
     
     // $('#total_payables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });

  //get total waiting for approval
  $.ajax({
    type: 'GET',
    url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalPending']) -->",
    cache: false,
    beforeSend: function(){
      $('#loading-div2').addClass("d-block");
      $('#loading-div2').removeClass("d-none");
      $('#total-pending').html('Loading..');
      $('#total-paid').html('Loading..');
      $('#total-waiting-approval').html('Loading..');
      $('#total-due').html('Loading..');
      $('#total-overdue').html('Loading..');
      $('#total-of-pending').html('Loading..');

      //getTotalPayables('');
      getTotalPending('');
    },
    success: function(data){
      console.log(data);
      
    //   $('#current').html('₵ '+data.total);
    //   $('#approved').html('₵ '+data.approved);
    //   $('#due').html('₵ '+data.due);
    //   $('#overdue').html('₵ '+data.overdue);
    //   $('#total-pending').html('₵ '+data.pending_count);
    //   $('#total-paid').html('₵ '+data.total_paid);
      $('#total-waiting-approval').html('₵ '+data.total_waiting_approval);
      $('#total-due').html('₵ '+data.due);
      $('#total-overdue').html('₵ '+data.overdue);
      $('#total-of-pending').html('₵ '+data.total_of_pending);
     // getTotalPayables(data.total_payabless);
      getTotalPending(data);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div2').removeClass("d-block");
      $('#loading-div2').addClass("d-none");
     
     // $('#total_payables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });

  // // get total paid
  $.ajax({
    type: 'GET',
    url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalPaid']) -->",
    cache: false,
    beforeSend: function(){
      $('#loading-div3').addClass("d-block");
      $('#loading-div3').removeClass("d-none");
      $('#total-reported').html('Loading..');
      $('#total-unreported').html('Loading..');
      $('#total-of-paid').html('Loading..');
    //   $('#total-waiting-approval').html('Loading..');
    //   $('#total-due').html('Loading..');
    //   $('#total-overdue').html('Loading..');

      //getTotalPayables('');
      getTotalPaid('');
    },
    success: function(data){
      console.log(data);
      
    //   $('#current').html('₵ '+data.total);
    //   $('#approved').html('₵ '+data.approved);
    //   $('#due').html('₵ '+data.due);
    //   $('#overdue').html('₵ '+data.overdue);
    //   $('#total-pending').html('₵ '+data.pending_count);
    //   $('#total-paid').html('₵ '+data.total_paid);
      $('#total-reported').html('₵ '+data.total_reported);
      $('#total-unreported').html('₵ '+data.total_unreported);
      $('#total-of-paid').html('₵ '+data.total_of_paid);
      //$('#total-overdue').html('₵ '+data.overdue);
     // getTotalPayables(data.total_payabless);
      getTotalPaid(data);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div3').removeClass("d-block");
      $('#loading-div3').addClass("d-none");
     
     // $('#total_payables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });

  //get total expense categories
  $.ajax({
    type: 'GET',
    url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalExpenseCategories']) -->",
    cache: false,
    beforeSend: function(){
      // $('#current').html('Loading..');
      // $('#approved').html('Loading..');
      // $('#due').html('Loading..');
      // $('#overdue').html('Loading..');
      $('#loading-div4').addClass("d-block");
      $('#loading-div4').removeClass("d-none");
      $('#total-of-expense-categories').html('Loading..');
    //   $('#loading-div2').addClass("d-block");
    //   $('#loading-div2').removeClass("d-none");
      // $('#total-pending').html('Loading..');
      // $('#total-paid').html('Loading..');
      // $('#total-of-receivables').html('Loading..');
    //   $('#total-waiting-approval').html('Loading..');
    //   $('#total-due').html('Loading..');
    //   $('#total-overdue').html('Loading..');

      getTotalExpenseCategories('');
      //getTotalPending('');
    },
    success: function(data){
      console.log(data.total_expense_categories);
      
      // $('#current').html('₵ '+data.total);
      // $('#approved').html('₵ '+data.approved);
      // $('#due').html('₵ '+data.due);
      // $('#overdue').html('₵ '+data.overdue);
      // $('#total-pending').html('₵ '+data.pending_count);
      // $('#total-paid').html('₵ '+data.total_paid);
      $('#total-of-expense-categories').html('₵ '+ data.total_of_expense_categories);
    //   $('#total-waiting-approval').html('₵ '+data.total_waiting_approval);
    //   $('#total-due').html('₵ '+data.due);
    //   $('#total-overdue').html('₵ '+data.overdue);
      getTotalExpenseCategories(data.total_expense_categories);
      //getTotalPending(data.total_waiting_pending);
      $('#loading-div4').removeClass("d-block");
      $('#loading-div4').addClass("d-none");
    //   $('#loading-div2').removeClass("d-block");
    //   $('#loading-div2').addClass("d-none");
     
     // $('#total_payables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });
}

$('#total-payables-year').on('change', function(){
    console.log($(this).val());
    $.ajax({
        type: 'POST',
        url:'<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalAccountPayablesByDate']) -->' ,
        cache: false,
        data: {year: $('#total-payables-year').val(), month: $('#total-payables-month').val()},
        beforeSend: function(){
          $('#loading-div').addClass("d-block");
          $('#loading-div').removeClass("d-none");
          $('#total-pending').html('Loading..');
          $('#total-paid').html('Loaading..');
          $('#total-of-payables').html('Loading..');
        },
        success: function(data){
          $('#total-pending').html('₵ '+data.total_pending);
          $('#total-paid').html('₵ '+data.total_paid);
          $('#total-of-payables').html('₵ '+ data.total_of_payables);
          getTotalPayables(data.total_payables);
          $('#loading-div').removeClass("d-block");
          $('#loading-div').addClass("d-none");
              
        },
        error: function(){
            console.log('error, getting data');
        }
    });
});

$('#total-payables-month').on('change', function(){
    console.log($(this).val());
    $.ajax({
        type: 'POST',
        url:'<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalAccountPayablesByDate']) -->' ,
        cache: false,
        data: {month: $('#total-payables-month').val()},
        beforeSend: function(){
      $('#loading-div').addClass("d-block");
      $('#loading-div').removeClass("d-none");
      $('#total-pending').html('Loading..');
      $('#total-paid').html('Loaading..');
      $('#total-of-payables').html('Loading..');
        },
        success: function(data){
      $('#total-pending').html('₵ '+data.total_pending);
      $('#total-paid').html('₵ '+data.total_paid);
      $('#total-of-payables').html('₵ '+ data.total_of_payables);
      getTotalPayables(data.total_payables);
      $('#loading-div').removeClass("d-block");
      $('#loading-div').addClass("d-none");
           
        },
        error: function(){
            console.log('error, getting data');
        }
    });
});

$('#total-waiting-approval-year').on('change', function(){
    $.ajax({
    type: 'POST',
    url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalPendingByDate']) -->",
    data:{year: $(this).val()},
    cache: false,
    beforeSend: function(){
      $('#loading-div2').addClass("d-block");
      $('#loading-div2').removeClass("d-none");
    //   $('#total-pending').html('Loading..');
    //   $('#total-paid').html('Loading..');
      $('#total-waiting-approval').html('Loading..');
      $('#total-due').html('Loading..');
      $('#total-overdue').html('Loading..');
      $('#total-of-pending').html('Loading..');

      //getTotalPayables('');
      getTotalPending('');
    },
    success: function(data){
      console.log(data);
      
    //   $('#current').html('₵ '+data.total);
    //   $('#approved').html('₵ '+data.approved);
    //   $('#due').html('₵ '+data.due);
    //   $('#overdue').html('₵ '+data.overdue);
    //   $('#total-pending').html('₵ '+data.pending_count);
    //   $('#total-paid').html('₵ '+data.total_paid);
      $('#total-waiting-approval').html('₵ '+data.total_waiting_approval);
      $('#total-due').html('₵ '+data.due);
      $('#total-overdue').html('₵ '+data.overdue);
      $('#total-of-pending').html('₵ '+data.total_of_pending);
     // getTotalPayables(data.total_payabless);
      getTotalPending(data);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div2').removeClass("d-block");
      $('#loading-div2').addClass("d-none");
     
     // $('#total_payables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });
});

$('#total-paid-year').on('change', function(){
    $.ajax({
    type: 'POST',
    url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalPaidByDate']) -->",
    data:{year: $(this).val()},
    cache: false,
    beforeSend: function(){
      $('#loading-div3').addClass("d-block");
      $('#loading-div3').removeClass("d-none");
    //   $('#total-pending').html('Loading..');
    //   $('#total-paid').html('Loading..');
      $('#total-unreported').html('Loading..');
      $('#total-reported').html('Loading..');
      //$('#total-overdue').html('Loading..');

      //getTotalPayables('');
      getTotalPaid('');
    },
    success: function(data){
      console.log(data);
      
    //   $('#current').html('₵ '+data.total);
    //   $('#approved').html('₵ '+data.approved);
    //   $('#due').html('₵ '+data.due);
    //   $('#overdue').html('₵ '+data.overdue);
    //   $('#total-pending').html('₵ '+data.pending_count);
    //   $('#total-paid').html('₵ '+data.total_paid);
      $('#total-unreported').html('₵ '+data.total_unreported);
      $('#total-reported').html('₵ '+data.total_reported);
      $('#total-of-expense-categories').html('₵ '+data.total_of_expense_categories);
     // $('#total-overdue').html('₵ '+data.overdue);
     // getTotalPayables(data.total_payabless);
      getTotalPending(data);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div3').removeClass("d-block");
      $('#loading-div3').addClass("d-none");
     
     // $('#total_payables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });
});

$('#total-expense-year').on('change', function(){
  $.ajax({
    type: 'POST',
    url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'getTotalExpenseCategoriesByDate']) -->",
    data: {year: $(this).val()},
    cache: false,
    beforeSend: function(){
      // $('#current').html('Loading..');
      // $('#approved').html('Loading..');
      // $('#due').html('Loading..');
      // $('#overdue').html('Loading..');
      $('#loading-div4').addClass("d-block");
      $('#loading-div4').removeClass("d-none");
      $('#total-of-expense-categories').html('Loading..');
    //   $('#loading-div2').addClass("d-block");
    //   $('#loading-div2').removeClass("d-none");
      // $('#total-pending').html('Loading..');
      // $('#total-paid').html('Loading..');
      // $('#total-of-receivables').html('Loading..');
    //   $('#total-waiting-approval').html('Loading..');
    //   $('#total-due').html('Loading..');
    //   $('#total-overdue').html('Loading..');

      getTotalExpenseCategories('');
      //getTotalPending('');
    },
    success: function(data){
      console.log(data.total_expense_categories);
      
      // $('#current').html('₵ '+data.total);
      // $('#approved').html('₵ '+data.approved);
      // $('#due').html('₵ '+data.due);
      // $('#overdue').html('₵ '+data.overdue);
      // $('#total-pending').html('₵ '+data.pending_count);
      // $('#total-paid').html('₵ '+data.total_paid);
      $('#total-of-expense-categories').html('₵ '+ data.total_of_expense_categories);
    //   $('#total-waiting-approval').html('₵ '+data.total_waiting_approval);
    //   $('#total-due').html('₵ '+data.due);
    //   $('#total-overdue').html('₵ '+data.overdue);
      getTotalExpenseCategories(data.total_expense_categories);
      //getTotalPending(data.total_waiting_pending);
      $('#loading-div4').removeClass("d-block");
      $('#loading-div4').addClass("d-none");
    //   $('#loading-div2').removeClass("d-block");
    //   $('#loading-div2').addClass("d-none");
     
     // $('#total_payables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });

});
    //});

    function yearSetup() {
      let curr_year = new Date().getFullYear()
      let resulting_year = []
      for (let index = 0; index < 5; index++) {
        resulting_year.push(\`<option>\${curr_year-index}</option>\`)
      }
      $('.current-years').html(resulting_year.join(""))
    }
    yearSetup()
</script>
`;

export default function ElementElementExpensesOverview() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
