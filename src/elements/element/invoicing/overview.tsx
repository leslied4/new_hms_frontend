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
                <div id="amt_receivables_container" style="background:;height:400px;width:78vw;margin:0;padding:0"></div>
            </div>
        </div> -->

        <div class="container">
            <h4 class="mt-4 d-flex justify-content-between">Total Account Receivables 
            <button onclick="overviewTab()" style="box-shadow:none!important" class="btn text-primary bg-white"><i class="fa fa-rotate-right"></i></button></h4>
            </h4>
            <div class="row d-flex justify-content-between">
                <div class="col-md-3 card p-3">
                    <small class="text-primary mb-0 pb-0">CURRENT</small>
                    <h3 id="current" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h3>
                </div>
                <div class="col-md-3 card p-3">
                    <small class="text-success mb-0 pb-0">APPROVED</small>
                    <h3 id="approved" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0">Loading..</h3>
                    <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                <small class="darkorange mb-0 pb-0">DUE</small>
                    <h3 id="due" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0">Loading..</h3>
                    <!-- <small class="text-secondary mt-0">16-30 days</small> -->
                </div>
                <div class="col-md-3 card p-3">
                <small class="text-danger mb-0 pb-0">OVERDUE</small>
                    <h3 id="overdue" style="margin-top:0px!important;margin-bottom:0px!important;" class="my-0 pb-0">Loading..</h3>
                    <!-- <small class="text-secondary mt-0">Above 31 days</small> -->
                </div>
            </div>
        </div>

        <div class="container mt-4 p-3">
            <h4>Summary</h4>
            <div class="container-fluid card p-2">
                <div class="row">
                    <div class="col-md-10">
                       <!-- php: = $this->Html->image('loading.gif',['id' => 'loading-div', 'class' =>'mt-5 loading-div', 'style' =>'height:200px;width:200px;position: absolute;left: 40%;top: 10%;z-index:9999999;']); -->
                     
                        <div id="amt_receivables_container" style="height: 400px;width:950px; min-width: 100%;">
                       </div>
                    </div>
                    <div class="col-md-2">
                        <SearchableSelectField id="total-receivables-year"  class="form-control mt-3 current-years">
                        </SearchableSelectField>
                        <SearchableSelectField id="total-receivables-month"  class="form-control mt-3">
                            <option value="">-- Month --</option>
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
                        <h6 class="text-primary mt-5 mb-0 pb-0">Total Pending</h6>
                        <h2 id="total-pending" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-success mt-4 mb-0 pb-0">Total Paid</h6>
                        <h2 id="total-paid" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                        <h6 class="text-secondary mt-4 mb-0 pb-0">Total</h6>
                        <h2 id="total-of-receivables" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
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
                       
                        <h6 class="text-success mt-4 mb-0 pb-0">Total Approved</h6>
                        <h2 id="total-approved" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">Loading..</h2>
                       
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
    var total_receivable = echarts.init(document.getElementById("amt_receivables_container"));
    var total_paid = echarts.init(document.getElementById("total_paid_container"));
    // var date_period = a.init(document.getElementById("date_period_container"));
    window.onresize = function () {
        total_pending.resize();
        total_receivable.resize();
        total_paid.resize();
    };
    window.addEventListener('resize', function () {
        total_pending.resize();
        total_receivable.resize();
        total_paid.resize();
    })



   function getTotalReceivables(data){
    total_receivable.setOption ({ 
      title: {
              text: 'Total Account Receivables (Summary)',
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

   function getTotalPending(data){
    total_pending.setOption({
        title: {
            text: 'Total Pending',
            subtext: 'Total due + Total overdue + Total approved',
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
            },
            {
                data: data.approved_data,
                itemStyle: {color: 'green'},
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

   

function overviewTab(){
    //get data for total receivables
  $.ajax({
    type: 'GET',
    url: "<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getTotalReceivables']) -->",
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
    //   $('#total-overdue').html('Loading..');

      getTotalReceivables('');
      //getTotalPending('');
    },
    success: function(data){
      console.log(data);
      
      $('#current').html('₵ '+data.total);
      $('#approved').html('₵ '+data.approved);
      $('#due').html('₵ '+data.due);
      $('#overdue').html('₵ '+data.overdue);
      $('#total-pending').html('₵ '+data.pending_count);
      $('#total-paid').html('₵ '+data.total_paid);
      $('#total-of-receivables').html('₵ '+ data.total_of_receivables);
    //   $('#total-waiting-approval').html('₵ '+data.total_waiting_approval);
    //   $('#total-due').html('₵ '+data.due);
    //   $('#total-overdue').html('₵ '+data.overdue);
      getTotalReceivables(data.total_receivables);
      //getTotalPending(data.total_waiting_pending);
      $('#loading-div').removeClass("d-block");
      $('#loading-div').addClass("d-none");
    //   $('#loading-div2').removeClass("d-block");
    //   $('#loading-div2').addClass("d-none");
     
     // $('#amt_receivables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });

  //get total waiting for approval
  $.ajax({
    type: 'GET',
    url: "<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getTotalPending']) -->",
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

      //getTotalReceivables('');
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
      $('#total-approved').html('₵ '+data.total_approved);
      $('#total-of-pending').html('₵ '+data.total_of_pending);
     // getTotalReceivables(data.total_receivables);
      getTotalPending(data);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div2').removeClass("d-block");
      $('#loading-div2').addClass("d-none");
     
     // $('#amt_receivables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });

  // get total paid
  $.ajax({
    type: 'GET',
    url: "<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getTotalPaid']) -->",
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

      //getTotalReceivables('');
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
     // getTotalReceivables(data.total_receivables);
      getTotalPaid(data);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div3').removeClass("d-block");
      $('#loading-div3').addClass("d-none");
     
     // $('#amt_receivables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });
}

$('#total-receivables-year').on('change', function(){
    console.log($(this).val());
    $.ajax({
        type: 'POST',
        url:'<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getTotalReceivablesByDate']) -->' ,
        cache: false,
        data: {year: $('#total-receivables-year').val(), month: $('#total-receivables-month').val()},
        beforeSend: function(){
      $('#loading-div').addClass("d-block");
      $('#loading-div').removeClass("d-none");
      $('#total-pending').html('Loading..');
      $('#total-paid').html('Loaading..');
      $('#total-of-receivables').html('Loading..');
        },
        success: function(data){
      $('#total-pending').html('₵ '+data.pending_count);
      $('#total-paid').html('₵ '+data.total_paid);
      $('#total-of-receivables').html('₵ '+ data.total_of_receivables);
      getTotalReceivables(data.total_receivables);
      $('#loading-div').removeClass("d-block");
      $('#loading-div').addClass("d-none");
           
        },
        error: function(){
            console.log('error, getting data');
        }
    });
});

$('#total-receivables-month').on('change', function(){
    console.log($(this).val());
    $.ajax({
        type: 'POST',
        url:'<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getTotalReceivablesByDate']) -->' ,
        cache: false,
        data: {month: $('#total-receivables-month').val(), year: $('#total-receivables-year').val() },
        beforeSend: function(){
      $('#loading-div').addClass("d-block");
      $('#loading-div').removeClass("d-none");
      $('#total-pending').html('Loading..');
      $('#total-paid').html('Loaading..');
      $('#total-of-receivables').html('Loading..');
        },
        success: function(data){
      $('#total-pending').html('₵ '+data.pending_count);
      $('#total-paid').html('₵ '+data.total_paid);
      $('#total-of-receivables').html('₵ '+ data.total_of_receivables);
      getTotalReceivables(data.total_receivables);
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
    url: "<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getTotalPendingByDate']) -->",
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
      $('#total-approved').html('Loading..');

      //getTotalReceivables('');
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
    getTotalPending(data);

      $('#total-waiting-approval').html('₵ '+data.total_waiting_approval);
      $('#total-due').html('₵ '+data.due);
      $('#total-overdue').html('₵ '+data.overdue);
      $('#total-approved').html('₵ ' + data.approved_data.reduce((partialSum, a) => partialSum + a, 0));
      $('#total-of-pending').html('₵ '+(parseFloat(data.total_of_pending) + data.approved_data.reduce((partialSum, a) => partialSum + a, 0)));
     // getTotalReceivables(data.total_receivables);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div2').removeClass("d-block");
      $('#loading-div2').addClass("d-none");
     
     // $('#amt_receivables_container').css({'height':'400px'});
    },
    error: function(){
      // alert('err');
    }
  });
});

$('#total-paid-year').on('change', function(){
    $.ajax({
    type: 'POST',
    url: "<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getTotalPaidByDate']) -->",
    data:{year: $(this).val()},
    cache: false,
    beforeSend: function(){
      $('#loading-div3').addClass("d-block");
      $('#loading-div3').removeClass("d-none");
    //   $('#total-pending').html('Loading..');
      $('#total-of-paid').html('Loading..');
      $('#total-unreported').html('Loading..');
      $('#total-reported').html('Loading..');
      //$('#total-overdue').html('Loading..');

      //getTotalReceivables('');
      getTotalPaid('');
    },
    success: function(data){
      console.log(data);
      
    //   $('#current').html('₵ '+data.total);
    //   $('#approved').html('₵ '+data.approved);
    //   $('#due').html('₵ '+data.due);
    //   $('#overdue').html('₵ '+data.overdue);
    //   $('#total-pending').html('₵ '+data.pending_count);
      $('#total-of-paid').html('₵ '+data.total_of_paid);
      $('#total-unreported').html('₵ '+data.total_unreported);
      $('#total-reported').html('₵ '+data.total_reported);
     // $('#total-overdue').html('₵ '+data.overdue);
     // getTotalReceivables(data.total_receivables);
      getTotalPaid(data);
    //   $('#loading-div').removeClass("d-block");
    //   $('#loading-div').addClass("d-none");
      $('#loading-div3').removeClass("d-block");
      $('#loading-div3').addClass("d-none");
     
     // $('#amt_receivables_container').css({'height':'400px'});
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

export default function ElementElementInvoicingOverview() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
