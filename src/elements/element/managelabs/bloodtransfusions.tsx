const rawHtml = `
<div class="tab-pane" id="bloodtransfusion">
<style>
    .lightblue {
        background-color: #51aff124;
    }

</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <div class="caption">
                <span class="caption-subject font-dark bold uppercase">Blood Compatibility Tests</span>
            </div>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">

                <div class="tab-pane active" id="service_view">
                    <div class="card  card-box">
                        <div class="card-body ">
                            <div class="table-scrollable">
                                <table
                                    class="table table-hover order-column full-width customDataTable">
                                    <thead>
                                        <tr>
                                            <th class="left">
                                                <!-- php: = Cake\Core\Configure::read('LAB_STRINGS.TestName') != null ? Cake\Core\Configure::read('LAB_STRINGS.TestName') : 'Name' -->
                                            </th>
                                            <th class="left">
                                                <!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' -->
                                            </th>
                                            <th class="left">Old Price</th>
                                            <th class="left">New Price</th>
                                            <th class="left">Copay</th>
                                            <th class="left">Outsourced</th>
                                            <!-- <th class="left">Claim/Credit Pricing</th> -->
                                            <!-- <th class="left">Result</th> -->
                                            <th class="left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- php: foreach($blood_compatibility_labs as $lab_test){ -->

                                        <tr class="odd gradeX ">
                                            <td class="left"><a href="javascript:"
                                                    data-toggle="modal"
                                                    data-target="#viewItem_<!-- php: = $lab_test->id -->"><!-- php: = $lab_test->name --></a>
                                            </td>
                                            <td class="left"><!-- php: = $lab_test->investigation->name -->
                                            </td>
                                            <td class="left">
                                                <!-- php: = $this->Number->precision($lab_test->value_old, 2) -->
                                            </td>
                                            <td class="left">
                                                <!-- php: = $this->Number->precision($lab_test->value_new, 2) -->
                                            </td>
                                            <td><!-- php: = $lab_test->copay == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "" -->
                                            </td>
                                            <td class="left">
                                                <!-- php: = $lab_test->outsourced == 1 ? "<span class='badge bg-info'>Yes</span>" : "" -->
                                            </td>
                                            <!-- <td class="left"><a href="javascript:"
                                                    data-toggle="modal"
                                                    data-target="#viewClaimCredit_<!-- php: =$lab_test->id -->"
                                                    class="btn btn-xs">View</a></td>
                                            <td class="left">
                                                <a href="<!-- php: // $this->Url->build(['controller' => 'ManageLabs', 'action' => 'updateLabTemplate', $lab_test->id]) -->" class="btn btn-xs">
                                                    Template
                                                </a>
                                            </td>
                                            <td class="left"> -->

                                                <!-- php: = $lab_test->enabled ? $this->Form->postLink(__('Disable'), ['controller'=>'ManageLabs','action'=>'toggleEnable',$lab_test->id,0], ['class' => 'btn btn-secondary btn-xs']) : $this->Form->postLink(__('Enable'), ['controller'=>'ManageLabs','a... -->



                                                <!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageLabs','action'=>'deleteLabTest',$lab_test->id], ['confirm' => __('Are you sure you want to delete {0}?', $lab_test->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.De... -->


                                            </td>
                                        </tr>

                                        <!-- php: } -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- php: foreach($labTests as $value){ -->
                                <div class="modal fade" id="viewClaimCredit_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Claim Credit Pricing for <!-- php: = $value->name --></h4>
                        <h5 class="modal-title">Facility HCP Level: 1</h5>
                    </div>
                    <div class="modal-body">
                    
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <div class="card card-box">
                                <div class="card-body" id="bar-parent">
                                    
                                        <div class="form-body">
                                        
                                            <div class="form-group row">
                                                <label class="control-label col-md-5">Facility HCP Level
                                                    <span class="required"> : </span>
                                                </label>
                                                <div class="col-md-7">
                                                    <h5>Data #1</h5>
                                                </div>
                                            </div>
                                        
                                            <div class="form-group row">
                                                <label class="control-label col-md-5">Item Type Update
                                                    <span class="required"> : </span>
                                                </label>
                                                <div class="col-md-7">
                                                    <h5><!-- php: = $value->name --></h5>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="control-label col-md-5">Price
                                                    <span class="required"> : </span>
                                                </label>
                                                <div class="col-md-7">
                                                    <h5>90</h5>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="control-label col-md-5">Markup
                                                    <span class="required"> : </span>
                                                </label>
                                                <div class="col-md-7">
                                                    <h5>10%</h5>
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
            
                            <!-- php: } -->
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>


<script>
    function clearServiceFields() {
        $('#name').val('');
    }

</script>

</div>
`;

export default function ElementElementManagelabsBloodtransfusions() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
