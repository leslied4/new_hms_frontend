const rawHtml = `
<div class="container-fluid px-5">
    <div class="row justify-content-center">
        <div class="container-fluid text-center p-3 mt-3 mb-2">
        <div class="table-responsive">
            <table id="work-order-table" class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        
                        <th>Actions</th>
                        
                        <!-- <th>Priority</th> -->
                    </tr>
                </thead>
                <tbody>
                    <!-- php: foreach($tasks as $task){ -->
                    <tr>
                        <td class="text-left"> <!-- php: = $task->equipment_management->name --> <!-- php: = $task->title --> <span class="badge <!-- php: if($task->priority == "HIGH"){ echo "bg-danger"; } else if($task->priority == "MEDIUM"){ echo "bg-primary"; } else if($task->priority == "LOW"){ echo "bg-success"; } -->"><!-- php: = $task->priority --> Priority</span></td>
                        <td class="text-left">
                            <!-- php: = $task->due_date -->
                        </td>
                        <td class="text-left"><span class="badge <!-- php: if($task->status == "Pending"){ echo "bg-warning"; } else if($task->status == "In Progress"){ echo "bg-primary"; } else if($task->status == "Completed"){ echo "bg-success"; } -->"><!-- php: = $task->status --></span></td>
                        
                        <td class="text-left"><!-- php: = $task->date_created --></td>
                        
                        <td class="text-left">
                        <!-- php: if($task->status == 'Pending'){ -->
                            <!-- php: = $this->Form->postLink(__('Start Task'), ['controller'=>'InventoryList','action'=>'startTask',$task->id], ['class' => 'btn btn-primary']) -->
                            <!-- php: } elseif($task->status == "In Progress"){ -->
                                <a href="<!-- php: = $this->Url->build(['controller'=>'InventoryList', 'action'=>'recordWorkOrder', $task->id]); -->" class="btn btn-warning">Record</a>
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
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>
    $("#work-order-table").DataTable({
        buttons:['searchBuilder'],
        dom: 'QBfrtip', "ordering": false,
    });
</script>
`;

export default function ElementElementInventorylistWorkOrderTable() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
