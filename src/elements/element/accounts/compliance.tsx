const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css"> -->
<style>
.main{
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    background-color: #f6f6f6;
}
.one{
    width: 270px;
    background-color: #000;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.pic1{
    position: relative;
    right: 22px;
    top: 23px;
}
.pic2{
    position: relative;
    left: 25px;
    top: 17px;
}
.pic3{
    position: relative;
    right: 13px;
    bottom: 18px;
}
.pic4{
    position: relative;
    left: 14px;
    bottom: 21px;
}
.project{
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: #fd4040;
}
.quote{
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #fff;

}




.two{
    width: 100%;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #eee;    
}
.star{
    font-size: 20px !important;
    color: #b1b4b7;
}
.dot{
    font-size: 20px !important;
    color: #b1b4b7;
}
.round{
    border-radius: 50%;
    background-color: #eee;
    width: 50px;
    height: 50px;
    margin-bottom: -10px;
    align-items: center;
    justify-content: center;
}
.name{
    font-size: 22px;
    color: #464e56;
    font-weight: 600;
    text-align: left;
}
.quote2{
     font-size: 12px;
     color: #868e94;
     text-align: left;
}
.img1{
    position: relative;
    left: 20px;
    z-index: 28;
    border: 0.5px solid #6ebde4;
    border-radius: 50%;
    background-color: #bcd8e6;
}
.img2{
    position: relative;
    left: 10px;
    z-index: 29;
    border: 0.5px solid #6ebde4;
    border-radius: 50%;
    background-color: #bcd8e6;
}
.img3{
    z-index: 30;  
    border: 0.5px solid #6ebde4;
    border-radius: 50%; 
    background-color: #bcd8e6;
}
.task{
     color: #727475;
}
.date{
     color: #727475;
}
.imgfix{
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    top: 2px;
}

</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <!-- <div class="caption">
         <span class="caption-subject font-dark bold uppercase">Invoices</span>
         </div> -->
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#create_access" data-toggle="tab"> Card View </a>
                </li>
                <li class="nav-item">
                    <a href="#table_view" data-toggle="tab"> Table View </a>
                </li>
                <!-- <li class="nav-item">
            <a href="#create_access" data-toggle="tab"> Create Terms</a>
         </li> -->
                <!-- <li class="nav-item">
            <a href="#draft_invoice" data-toggle="tab"> Draft </a>
            </li> -->
                <!-- <li class="nav-item">
                    <a href="#view_access" data-toggle="tab"> View Status Protocol</a>
                </li> -->
                <!-- <li class="nav-item">
            <a href="#paid_invoice" data-toggle="tab"> Paid </a>
            </li>  -->
                <!-- <li class="nav-item">
            <a href="#recurring_invoice" data-toggle="tab"> Recurring </a>
            </li>  -->
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="create_access">
                    <!-- <h4>Add a new Invoice</h4> -->
                    <div class="container-fluid px-5">
                        <div class="row justify-content-center">
                            <div class="container-fluid text-center p-3 mt-3 mb-2">
                                <!-- <div class="card p-5 mt-1 mb-3"> -->
                                    <div class="row">
                                        <div class="col bg-light p-3">
                                            <h5 class="text-secondary font-weight-bold mt-2 mb-3 text-left">PENDING</h5>
                                            <!-- php: foreach($pending_tasks as $pending_task){ -->
                                                <div style="border-top:10px solid #ccc;" class="two mt-3">
                                                <div class="px-3 pt-2">
                                                    <h4 class="name mb-0 pb-0"><!-- php: = $pending_task->title --></h4>
                                                    <p class="quote2 mb-1 pb-1">
                                                    <!-- php: if($pending_task->account_id != 0){ -->
                                                        <!-- php: = $pending_task->title --> recorded at <!-- php: = $pending_task->account->account_name == null ? ucwords(strtolower($pending_task->account->banks_list->name)) : ucwords(strtolower($pending_task->account->account_name)) --> on <!-- php: = $pending_task->date_created --> and is 
                                                        valid within <!-- php: = $pending_task->due_date -->
                                                    <!-- php: } else { -->
                                                        Refund recorded at <!-- php: = $pending_task->due_date --> and is valid within <!-- php: = $pending_task->due_date -->
                                                    <!-- php: } -->

                                                    </p>
                                                </div>
                                                <div class="d-flex justify-content-start pl-3">
                                                    <small style="border-radius:5px;"
                                                        class="bg-success font-weight-bold p-1 px-2">
                                                        <!-- php: if($pending_task->account_id != 0){ -->

                                                         <i class="fa fa-school"></i> <!-- php: = $pending_task->account->account_name == null ? ucwords(strtolower($pending_task->account->banks_list->name)) : ucwords(strtolower($pending_task->account->account_name)) -->
                                                        <!-- php: } else { -->
                                                            Refund
                                                        <!-- php: } -->
                                                        </small>
                                                </div>
                                                <div class="d-flex justify-content-start mt-2 pl-3">
                                                    <small
                                                        style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                                        class="p-1 px-2 d-flex align-items-center font-weight-bold"> <i
                                                            style="font-size:16px" class="material-icons">timer</i>
                                                        &nbsp; <!-- php: = $pending_task->due_date --></small>
                                                </div>
                                                <div
                                                    class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                                                    <div class="d-flex justify-content-start mt-2">
                                                        <small style="border-radius:5px;"
                                                            class="p-1 px-2 d-flex align-items-center font-weight-bold <!-- php: if($pending_task->priority == "HIGH"){ echo "bg-danger"; } else if($pending_task->priority == "MEDIUM"){ echo "bg-primary"; } else if($pending_task->priority == "LOW"){ echo "bg-success"; } -->">
                                                            <!-- php: = ucwords(strtolower($pending_task->priority)) --> Priority</small>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div class="round">
                                                            <!-- php: if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' => 'wi... -->
                                                            <!-- <img src="<!-- php: //= $this->request->getSession()->read()['Auth']['User']['image']['file_path'] -->"
                                                        width="23" class="imgfix" /> -->
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <!-- php: } -->
                                          
                                        </div>
                                        <div class="col bg-light mx-4  p-3">
                                        <h5 class="text-secondary mt-2 font-weight-bold mb-3 text-left">IN PROGRESS</h5>
                                        <!-- php: foreach($inprogress_tasks as $inprogress_task){ -->
                                                <div style="border-top:10px solid #fff200" class="two mt-3">
                                                <div class="px-3 pt-2">
                                                    <h4 class="name mb-0 pb-0"><!-- php: = $inprogress_task->title --></h4>
                                                    <p class="quote2 mb-1 pb-1">
                                                        <!-- php: = $inprogress_task->title --> recorded at <!-- php: = $inprogress_task->account->account_name == null ? ucwords(strtolower($inprogress_task->account->banks_list->name)) : ucwords(strtolower($inprogress_task->account->account_name)) --> on <!-- php: = $inprogress_task->date_created --> and is 
                                                        valid within <!-- php: = $inprogress_task->due_date -->

                                                    </p>
                                                </div>
                                                <div class="d-flex justify-content-start pl-3">
                                                    <small style="border-radius:5px;"
                                                        class="bg-success font-weight-bold p-1 px-2"> <i
                                                            class="fa fa-school"></i> <!-- php: = $inprogress_task->account->account_name == null ? ucwords(strtolower($inprogress_task->account->banks_list->name)) : ucwords(strtolower($inprogress_task->account->account_name)) --></small>
                                                </div>
                                                <div class="d-flex justify-content-start mt-2 pl-3">
                                                    <small
                                                        style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                                        class="p-1 px-2 d-flex align-items-center font-weight-bold"> <i
                                                            style="font-size:16px" class="material-icons">timer</i>
                                                        &nbsp; <!-- php: = $inprogress_task->due_date --></small>
                                                </div>
                                                <div
                                                    class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                                                    <div class="d-flex justify-content-start mt-2">
                                                        <small style="border-radius:5px;"
                                                            class="p-1 px-2 d-flex align-items-center font-weight-bold <!-- php: if($inprogress_task->priority == "HIGH"){ echo "bg-danger"; } else if($inprogress_task->priority == "MEDIUM"){ echo "bg-primary"; } else if($inprogress_task->priority == "LOW"){ echo "bg-success"; } -->">
                                                            <!-- php: = ucwords(strtolower($inprogress_task->priority)) --> Priority</small>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div class="round">
                                                            <!-- php: if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' => 'wi... -->
                                                            <!-- <img src="<!-- php: //= $this->request->getSession()->read()['Auth']['User']['image']['file_path'] -->"
                                                        width="23" class="imgfix" /> -->
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <!-- php: } -->
                                        </div>
                                        <div class="col bg-light p-3">
                                        <h5 class="text-secondary mt-2 font-weight-bold mb-3 text-left">DONE</h5>
                                        <!-- php: foreach($completed_tasks as $completed_task){ -->
                                                <div style="border-top:10px solid lightgreen" class="two mt-3">
                                                <div class="px-3 pt-2">
                                                    <h4 class="name mb-0 pb-0"><!-- php: = $completed_task->title --></h4>
                                                    <p class="quote2 mb-1 pb-1">
                                                        <!-- php: = $completed_task->title --> recorded at <!-- php: = $completed_task->account->account_name == null ? ucwords(strtolower($completed_task->account->banks_list->name)) : ucwords(strtolower($completed_task->account->account_name)) --> on <!-- php: = $completed_task->date_created --> and is 
                                                        valid until <!-- php: = $completed_task->due_date -->

                                                    </p>
                                                </div>
                                                <div class="d-flex justify-content-start pl-3">
                                                    <small style="border-radius:5px;"
                                                        class="bg-success font-weight-bold p-1 px-2"> <i
                                                            class="fa fa-school"></i> <!-- php: = $completed_task->account->account_name == null ? ucwords(strtolower($completed_task->account->banks_list->name)) : ucwords(strtolower($completed_task->account->account_name)) --></small>
                                                </div>
                                                <div class="d-flex justify-content-start mt-2 pl-3">
                                                    <small
                                                        style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                                        class="p-1 px-2 d-flex align-items-center font-weight-bold"> <i
                                                            style="font-size:16px" class="material-icons">timer</i>
                                                        &nbsp; <!-- php: = $completed_task->due_date --></small>
                                                </div>
                                                <div
                                                    class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                                                    <div class="d-flex justify-content-start mt-2">
                                                        <small style="border-radius:5px;"
                                                            class="p-1 px-2 d-flex align-items-center font-weight-bold <!-- php: if($completed_task->priority == "HIGH"){ echo "bg-danger"; } else if($completed_task->priority == "MEDIUM"){ echo "bg-primary"; } else if($completed_task->priority == "LOW"){ echo "bg-success"; } -->">
                                                            <!-- php: = ucwords(strtolower($completed_task->priority)) --> Priority</small>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div class="round">
                                                            <!-- php: if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' => 'wi... -->
                                                            <!-- <img src="<!-- php: //= $this->request->getSession()->read()['Auth']['User']['image']['file_path'] -->"
                                                        width="23" class="imgfix" /> -->
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <!-- php: } -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                                          
                <div class="tab-pane" id="table_view">
                    <!-- <h4>Add a new Invoice</h4> -->
                    <div class="table-responsive">
                        <table id="compliance-table" class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Account</th>
                                    <th>Due Date</th>
                                   
                                    <th>Actions</th>
                                    
                                    <!-- <th>Priority</th> -->
                                </tr>
                            </thead>
                            <tbody>
                               <!-- php: foreach($tasks as $task){ -->
                                <tr>
                                    <td> <!-- php: = $task->title --> <span class="badge <!-- php: if($task->priority == "HIGH"){ echo "bg-danger"; } else if($task->priority == "MEDIUM"){ echo "bg-primary"; } else if($task->priority == "LOW"){ echo "bg-success"; } -->"><!-- php: = $task->priority --> Priority</span></td>
                                    <td>
                                    <!-- php: = $task->title --> recorded at <!-- php: = $task->account->account_name == null ? ucwords(strtolower($task->account->banks_list->name)) : ucwords(strtolower($task->account->account_name)) --> on <!-- php: = $task->date_created --> and is 
                                                        valid until <!-- php: = $task->due_date -->
                                    </td>
                                    <td><span class="badge <!-- php: if($task->status == "pending"){ echo "bg-warning"; } else if($task->status == "in progress"){ echo "bg-primary"; } else if($task->status == "completed"){ echo "bg-success"; } -->"><!-- php: = $task->status --></span></td>
                                    <td><!-- php: = $task->account->account_name == null ? ucwords(strtolower($task->account->banks_list->name)) : ucwords(strtolower($task->account->account_name)) --></td>
                                    <td><!-- php: = $task->due_date --></td>
                                   
                                    <td>
                                    <!-- php: if($task->status == 'pending'){ -->
                                        <!-- php: = $this->Form->postLink(__('Start Task'), ['controller'=>'Accounts','action'=>'startTask',$task->id], ['class' => 'btn btn-primary']) -->
                                        <!-- php: } -->
                                    </td>
                                    
                                    <!-- <td>High Priority</td> -->
                                </tr>
                               <!-- php: } -->
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>

 

   
    <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
    <script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
    <script>
        
            
        $('#compliance-table').DataTable();
       

    </script>

`;

export default function ElementElementAccountsCompliance() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
