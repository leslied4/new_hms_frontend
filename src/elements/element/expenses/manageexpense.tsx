const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css">
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->
<style>
  

</style>
<div class="row">
<div class="borderBox light bordered col-md-12">
   <div class="borderBox-title tabbable-line">
      <!-- <div class="caption">
         <span class="caption-subject font-dark bold uppercase">Invoices</span>
         </div> -->
      <ul class="nav nav-tabs">
         <li class="nav-item">
            <a href="#create_category" data-toggle="tab"> Add Category</a>
         </li>
         <li class="nav-item active">
            <a href="#view_category" data-toggle="tab"> View Category</a>
         </li>
         <!-- <li class="nav-item">
            <a href="#draft_invoice" data-toggle="tab"> Draft </a>
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
          
           <div class="tab-pane" id="create_category">
               <!-- <h4>Add a new Invoice</h4> -->
               <div class="container px-5">
                   <div class="row justify-content-center">
                       <div class="container text-center p-3 mt-3 mb-2">
                           <div class="card p-5 mt-1 mb-3">
                               <!-- php: = $this->Form->create($addCategory, ['url' => ['controller' => 'Expenses', 'action' => 'addCategory']]); -->

                               <div class="row mt-2 pl-2">
                                   <div class="col-md-2 text-left p-1">
                                       Name
                                   </div>
                                   <div class="col-md-7 d-flex align-items-center p-1">
                                       <input type="text" name="name" placeholder="Enter Name of Category" class="form-control">
                                   </div>
                               </div>
                               <div class="row mt-2 pl-2">
                                   <div class="col-md-2 text-left p-1">
                                       Description
                                   </div>
                                   <div class="col-md-7 d-flex align-items-center p-1">
                                       <textarea name="description" rows="3" class="form-control"></textarea>
                                   </div>
                               </div>
                               <div class="row mt-3 pl-2">
                                  <div class="col-md-2 p1"></div>
                                  <div class="col-md-2p-1">
                                  <button class="btn btn-primary">Submit</button>
                                  </div>
                               </div>
                               <!-- php: = $this->Form->end() -->
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        
         <div class="tab-pane active" id="view_category">
            <!-- border border-left-0 border-right-0 border-bottom-0 border-3 border-primary  -->
            <div class="card mt-3  card-box">
               <div class="card-body ">
                  
                  <div class="table-responsive mt-2">
                     <table id="expense_table" class="table table-hover customDatable full-width permission_table">
                        <thead>
                           <tr>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                          <!-- php: foreach($expensesCategories as $category): -->
                            <tr>
                                <td><!-- php: = $category->name --></td>
                                <td><!-- php: = $category->description --></td>
                                <td>
                                    <a href="javascript:" class="btn btn-sm btn-warning">Edit</a><br/>
                                    <!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Expenses','action'=>'deleteCategory',$category->id,-1], ['class' => 'btn btn-danger btn-sm']) --> 
                                </td>
                            </tr>
                          <!-- php: endforeach; -->
                           <!-- <tr>
                              <td>22 Dec 2022</td>
                              <td><a href="javascript:">INV-002426</a></td>
                              <td>John Doe <span class="badge badge-primary">online</span></td>
                              <td><small class="due-date">OVERDUE BY 199 DAYS</small></td>
                              <td>22 Dec 2017</td>
                              <td><a href="javascript:">$94.000</a></td>
                              <td>$94.000</td>
                              <td>
                                  <a class="btn btn-warning btn-sm">Edit</a><br/>
                                  <a class="btn btn-secondary btn-sm text-slate-900">Disable</a><br/>
                                  <a class="btn btn-danger btn-sm">Write Off</a><br/>
                                  <a class="btn btn-success btn-sm">Record Payments</a>
                              </td>
                              </tr> -->
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>


<!-- end page content -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<script>
   $('#role').on('change', function(){
       $.ajax({
           type:"POST",
           data: {value:$('#role').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#id').html(html);
               $('#id').selectpicker("refresh");
           },
           error: function(){
               alert('false');
           }

       });
    });
$('#permission_table').DataTable();
$('#expense_table').DataTable();

</script>

`;

export default function ElementElementExpensesManageexpense() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
