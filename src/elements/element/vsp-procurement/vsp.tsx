const rawHtml = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.buttons.css" />
<style>
    #heading {
        text-transform: uppercase;
        color: #673AB7;
        font-weight: normal
    }

    #msform {
        text-align: center;
        position: relative;
        margin-top: 20px
    }

    #msform fieldset {
        background: white;
        border: 0 none;
        border-radius: 0.5rem;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding-bottom: 20px;
        position: relative
    }

    .form-card {
        text-align: left
    }

    #msform fieldset:not(:first-of-type) {
        display: none
    }

    #msform input[type="text"],
    #msform select {
        padding: 8px 15px 8px 15px;
        border: 1px solid #ccc;
        border-radius: 0px;
        margin-bottom: 10px;
        margin-top: 2px;
        box-sizing: border-box;
    }

    #msform input:focus,
    #msform textarea:focus {
        -moz-box-shadow: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        border: 1px solid #673AB7;
        outline-width: 0
    }

    #msform .action-button {
        width: 100px;
        background: #673AB7;
        font-weight: bold;
        color: white;
        border: 0 none;
        border-radius: 0px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 0px 10px 5px;
        float: right
    }

    #msform .action-button:hover,
    #msform .action-button:focus {
        background-color: #311B92
    }

    #msform .action-button-previous {
        width: 100px;
        background: #616161;
        font-weight: bold;
        color: white;
        border: 0 none;
        border-radius: 0px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 5px 10px 0px;
        float: right
    }

    #msform .action-button-previous:hover,
    #msform .action-button-previous:focus {
        background-color: #000000
    }

    .card {
        z-index: 0;
        border: none;
        position: relative
    }

    .fs-title {
        font-size: 25px;
        color: #673AB7;
        margin-bottom: 15px;
        font-weight: normal;
        text-align: left
    }

    .purple-text {
        color: #673AB7;
        font-weight: normal
    }

    .steps {
        font-size: 25px;
        color: gray;
        margin-bottom: 10px;
        font-weight: normal;
        text-align: right
    }

    .fieldlabels {
        color: gray;
        text-align: left
    }

    #progressbar {
        margin-bottom: 30px;
        overflow: hidden;
        color: lightgrey
    }

    #progressbar .active {
        color: #1880c9
    }

    #progressbar li {
        list-style-type: none;
        font-size: 15px;
        width: 30% !important;
        float: left;
        position: relative;
        font-weight: 400
    }

    #progressbar #cart:before {
        font-family: FontAwesome;
        content: "\f07a"
    }

    #progressbar #personal:before {
        font-family: FontAwesome;
        content: "\f007"
    }

    #progressbar #payment:before {
        font-family: FontAwesome;
        content: "\f0d6"
    }

    #progressbar #confirm:before {
        font-family: FontAwesome;
        content: "\f00c"
    }

    #progressbar #file:before {
        font-family: FontAwesome;
        content: "\f15b"
    }


    #progressbar li:before {
        width: 45px;
        height: 45px;
        line-height: 45px;
        display: block;
        font-size: 15px;
        color: #ffffff;
        background: lightgray;
        border-radius: 50%;
        margin: 0 auto 10px auto;
        padding: 2px
    }

    #progressbar li:after {
        content: '';
        width: 100%;
        height: 2px;
        background: lightgray;
        position: absolute;
        left: 0;
        top: 25px;
        z-index: -1
    }

    #progressbar li.active:before,
    #progressbar li.active:after {
        background: #1880c9
    }

    .progress {
        height: 20px
    }

    .progress-bar {
        background-color: #673AB7
    }

    .fit-image {
        width: 100%;
        object-fit: cover
    }

    .style-select select {
        width: 48%;
    }

    .ui-pnotify.greyteam .ui-pnotify-container {
        background-color: #2d3436 !important;
    }

    .ui-pnotify.greyteam .ui-pnotify-title,
    .ui-pnotify.greyteam .ui-pnotify-text {
        color: #FFF !important;
    }

</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
    
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#create_bank_account" class="dropdown-toggle" data-toggle="tab"> Create</a>
                </li>

                <li class="nav-item">
                    <a href="#view_bank_account" data-toggle="tab">View </a>
                </li>
                <li class="nav-item">
                    <a href="#purchase_order" data-toggle="tab"> Purchase Order <span id="items-count" class="badge bg-danger">0</span></a>
                </li>
        
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane" id="create_bank_account">
                    <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container text-center p-3 mt-3 mb-2">
                                <div class="card px-5 pt-5 pb-2 mt-1 mb-3">
                                <!-- php: = $this->Form->create($addVsp, ['url' => ['controller' => 'VspProcurement', 'action' => 'addVSP'],'id' =>'msform','novalidate', 'type' => 'file']); -->
                                    <ul id="progressbar">
                                        <li class="active" id="personal"><strong>VSP Details</strong></li>
                                        <li id="file"><strong>Catalogue</strong></li>
                                        <li id="confirm"><strong>Finish</strong></li>
                                    </ul>
                                
                                    <fieldset>
                                        <div class="row mt-5">
                                            <div class="col-md-2 text-left">
                                                <h5>Type</h5>
                                            </div>
                                            <div class="col-md-6 text-left">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="type" type="radio"
                                                        id="type_vendor" value="Vendor" checked>
                                                    <label class="form-check-label" for="type_vendor">Vendor</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="type" type="radio"
                                                        id="type_supplier" value="Supplier">
                                                    <label class="form-check-label" for="type_supplier">Supplier</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="type" type="radio"
                                                        id="type_partner" value="Partner">
                                                    <label class="form-check-label" for="type_partner">Partner</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>

                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Name</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="name" id="name" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Email</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="email" name="email" id="email" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Phone</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="number" name="phone" id="number" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Location</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="location" id="location" class="form-control">
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row mt-3">
                                            <div class="col-md-2 text-left">
                                                <h5>Relationship Manager</h5>
                                            </div>
                                            <div class="col-md-6">
                                            <input name="relationship_manager" id="relationship" class="form-control input-height" required  />
                                            </div>
                                        </div>

                                        <input type="button" id="next2" name="next" style="width:150px" class="next action-button btn btn-primary" value="Next" />

                                    </fieldset>
                                    <fieldset>
                                        <div class="container-fluid py-3 d-flex justify-content-end">
                                        <!-- php: = $this->Html->link($this->Html->image('../assets/img/excel.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']).'&nbsp;Template' , '/vsp-procurement/template', array('class'=>'export-link btn border-success','escape' ... -->
                                            <label for="bulk_upload" class="export-link btn border-success" escape=false>
                                                <!-- php: =$this->Html->image('../assets/img/excel.png',['class' => 'export-action', 'style' => 'width: 30px; height: auto']) -->&nbsp;Bulk Catalogue
                                            </label>
                                           <input id="bulk_upload" style="opacity:0;" type="file" name="bulk_upload" hidden/> 
                                        </div>
                                        <table class="table mt-5">
                                            <thead>
                                                <tr>
                                                    
                                                    <th>Item Name</th>
                                                    <th>Brand Name</th>
                                                    <th>Product Code</th>
                                                    <th>Manufacturer</th>
                                                    <th>Currency</th>
                                                    <th>Unit Cost Price</th>
                                                </tr>
                                            </thead>
                                            <tbody id="item-body2">
                                            </tbody>
                                        </table>
                                    <div class="row">
                                    <div class="col-md-5 p-2 text-left">
                                        <h5 id="add_bulk_items" style="cursor:pointer" class="text-primary my-0 ml-2">
                                            <i class="fa fa-plus"></i>&nbsp;
                                            Add Items
                                        </h5>
                                    </div>
                                    <div class="col-md-7 p-2">
                                        
                                    </div>
                                </div>
                                    <input type="submit" id="next2" name="next" style="width:150px"
                                        class="next action-button btn btn-primary"
                                        value="Finish" />
                                    <input type="button" name="previous" style="width:125px"
                                        class="previous action-button-previous btn btn-secondary"
                                        value="Previous" />
                                    </fieldset>
                                    <fieldset>
                                        <div class="form-card">
                                            <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br>
                                            <div class="row justify-content-center">
                                                <div class="col-3"> <img src="https://i.imgur.com/GwStPmg.png"
                                                        class="fit-image"> </div>
                                            </div> <br><br>
                                            <div class="row justify-content-center">
                                                <div class="col-7 text-center">
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <!-- php: = $this->Form->end() -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane active" id="view_bank_account">
                    <div class="container-fluid px-5">
                        <div class="table-responsive">
                            <table id="accountstable" class="table table-hover customDatable full-width accountstable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Relationship Manager</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <!-- php: foreach($Vsps as $vsp): -->
                                    <tr>
                                        <td><!-- php: = $vsp->name --> <span class="badge badge-success"><!-- php: = $vsp->type --></span><br/>
                                        <small class="text-secondary"><!-- php: = $vsp->location --></small>
                                    </td>
                                    <td>
                                    <!-- php: = $vsp->phone -->
                                    </td>
                                    <td><!-- php: = $vsp->relationship_manager --></td>
                                    <td>
                                    
                                        <a href="<!-- php: = $this->Url->build(['controller' => 'VspProcurement', 'action' => 'edit', $vsp->id]) -->" class="btn btn-warning btn-sm">Edit</a>
                                        <a href="<!-- php: = $this->Url->build(['controller' => 'VspProcurement', 'action' => 'deleteVsp', $vsp->id]) -->" class="btn btn-danger btn-sm">Delete</a>
                                        <a href="<!-- php: = $this->Url->build(['controller' => 'VspProcurement', 'action' => 'vspView', $vsp->id]) -->" class="btn btn-info btn-sm">View</a>
                                    </td>
                                    </tr>
                                <!-- php: endforeach; -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab-pane" id="purchase_order">
                    <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container text-center p-3 mt-3 mb-2">
                                <div class="card px-5 pt-5 pb-2 mt-1 mb-3">
                                <!-- php: = $this->Form->create($addPurchaseOrder, ['url' => ['controller' => 'VspProcurement', 'action' => 'addPurchaseOrder']]); -->
                                    <div class="container-fluid d-none">
                                        <div class="row mt-4">
                                            <input type="hidden" name="vsp_id" value="<!-- php: =$vsp->id -->" />
                                            <div class="col-md-4 text-left">
                                                <h5>Date</h5>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="date" name="date" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="row mt-4">
                                            <div class="col-md-4 text-left">
                                                <h5>PO Name/No.</h5>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" id="pOrder" value="<!-- php: = $purchase_order_id -->" name="name" class="form-control">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container">
                                        <div class="row mt-4">
                                            <div class="col-md-4 text-left">
                                                <h5>Category</h5>
                                            </div>
                                            <div class="col-md-8">
                                                <SearchableSelectField name="category" class="form-control">
                                                    <!-- php: foreach($categories as $category){ -->
                                                    <option value="<!-- php: = $category->name -->">
                                                        <!-- php: = $category->name -->
                                                    </option>
                                                    <!-- php: } -->
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container mt-4">
                                        <div class="row">
                                            <div class="col-md-4 text-left">
                                                <h5>Payment Type<span class="text-danger">*</span>
                                                </h5>
                                            </div>
                                            <div class="col-md-7 text-left">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="pay_type"
                                                        id="online" value="online">
                                                    <label class="form-check-label" for="online">Online</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="pay_type"
                                                        id="manual" value="manual">
                                                    <label class="form-check-label" for="manual">Manual</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container mt-4">
                                        <div class="row mt-3">
                                            <div class="col-md-4 text-left">
                                                <h5>Payment Options<span class="text-danger">*</span>
                                                </h5>
                                            </div>
                                            <div class="col-md-8 text-left">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="pay_option[]" id="pay_option"
                                                    title="Select Payment Option(s)" data-live-search="true" multiple
                                                    required>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="row mt-4">
                                            <div class="col-md-4 text-left">
                                                <h5>Indicative Price</h5>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="number" readonly id="indicative-sum" name="indicative-sum" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="row mt-4">
                                            <div class="col-md-4 text-left">
                                                <h5>Tax</h5>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="number" name="tax" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container mt-5">
                                        <table class="table">
                                            <tr>
                                                <th style="width:30%">Item Name</th>
                                                <th>Vendor Name</th>
                                                <th>Quantity</th>
                                                <th>Amount</th>
                                            </tr>
                                            <tbody id="purchase-order-table">

                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <button class="btn btn-primary px-4 my-3">Submit</button>
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

<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.js"></script>
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.buttons.js"></script>
<script>
    <!-- php: echo "var manufacturers = " . json_encode($manufacturers) . ";"; -->
    <!-- php: echo "var currency = " . json_encode($configs['currency']) . ";"; -->


    $('#bulk_upload').on('change', function(){
        var data = new FormData();
        data.append('bulk_upload', $('input[type=file]')[0].files[0]);
        $.ajax({
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            url: '<!-- php: = $this->Url->build(['controller'=>'VspProcurement', 'action'=>'getExcelData']); -->',
            success: function (data) {
                new PNotify({
                type: 'success',
                styling: 'bootstrap3',
                title: 'Bulk Item Added',
                text: 'Bulk items have been added. continue to submit',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
            var items = JSON.parse(data);
            $.each(items, function(key, item){
                var list = "<tr><td>"+item.name+"</td><td>"+item.brand+"</td><td>"+item.product_code+"</td><td>"+item.manufacturer+"</td><td>"+item.cost+"</td></tr>";
                $('#item-body2').append(list);
            });
            },
            error: function () {
                alert('false');
            }
        });
    });
   
    function getItemsList()
    {
        $.ajax({
            type: "GET",
            url: '<!-- php: = $this->Url->build(['controller'=>'VspProcurement', 'action'=>'getPurchaseSession']); -->',
            success: function (data) {
                var items = JSON.parse(data);
                $('#items-count').html(items.length);
                var indicative_sum = 0;
                $.each(items, function(key, item){
                    console.log(item);
                indicative_sum = indicative_sum + parseFloat(item.item_amount);
                var list = "<tr><td><input type='hidden' name='vendor_id[]' class='form-control' readonly value='"+item.vsp_id+"' /><input type='hidden' name='item_id[]' class='form-control' readonly value='"+item.id+"' /><input type='text' name='item_name[]' class='form-control' readonly value='"+item.item_name+"' /> </td><td><input type='text' name='vendor_name[]' class='form-control' readonly value='"+item.vendor_name+"' /></td><td><input min='1' class='text-center' type='number' name='qty[]' value='1'/></td><td class='d-flex align-items-center pr-1'><input type='text' class='form-control' name='amount[]' readonly value='"+item.item_amount+"' /> <span class='ml-3'><a class='text-danger' onclick='deleteItem("+key+");'><i class='fa fa-close'></i></a></span></td></tr>";

                $('#purchase-order-table').append(list);
                $('#indicative-sum').val(indicative_sum);
                });
            },
            error: function () {
                alert('false');
            }

        });
    }

    function deleteItem(id)
    {
        $.ajax({
            type: "GET",
            data: id,
            url: '<!-- php: = $this->Url->build(['controller'=>'VspProcurement', 'action'=>'deletePurchaseSession']); -->',
            success: function (data) {
            $('#purchase-order-table').html("");
                var items = JSON.parse(data);
                $.each(items, function(key, item){
                    var list = "<tr><td><input type='hidden' name='vendor_id[]' class='form-control' readonly value='"+item.vsp_id+"' /><input type='hidden' name='item_id[]' class='form-control' readonly value='"+item.id+"' /><input type='text' name='item_name[]' class='form-control' readonly value='"+item.item_name+"' /> </td><td><input min='1' class='text-center' type='number' name='qty[]' value='1'/></td><td class='d-flex align-items-center pr-1'><input type='text' class='form-control' name='amount[]' readonly value='"+item.item_amount+"' /> <span class='ml-3'><a class='text-danger' onclick='deleteItem("+key+");'><i class='fa fa-close'></i></a></span></td></tr>"; 
                    $('#purchase-order-table').append(list);
                });
            },
            error: function () {
                alert('false');
            }
        });
    }

    getItemsList();
    $('#accountstable').DataTable();
    $('#bank_branch').on('change', function () {
        $('#branch_code').val('1234');
    });

    $('#money_in_div').hide();
    $('#money_out_div').hide();
    $('#bank_info').hide();

    $('#money_in').on('change', function () {
        if ($(this).is(':checked')) {
            $('#money_in_out').prop('checked', false);
            $('#money_in_div').show();
            new PNotify({
                type: 'success',
                styling: 'bootstrap3',
                title: 'Money In Enabled',
                text: 'Account will able to receive payments.',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        } else {
            $('#money_in_div').hide();
        }
    });

    $('#money_out').on('change', function () {
        if ($(this).is(':checked')) {
            $('#money_in_out').prop('checked', false);
            new PNotify({
                type: 'error',
                styling: 'bootstrap3',
                title: 'Money Out Enabled',
                text: 'Account will able to make payments.',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
            $('#money_out_div').show();
        } else {
            $('#money_out_div').hide();
        }
    });

    $('#money_in_out').on('change', function () {
        if ($(this).is(':checked')) {
            $('#money_in').prop('checked', false);
            $('#money_out').prop('checked', false);
            new PNotify({
                addClass: 'greyteam',
                styling: 'bootstrap3',
                title: 'Money In and Money Out is Enabled',
                text: 'Account will able to receive and make payments.',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
            $('#money_out_div').show();
            $('#money_in_div').show();
        } else {
            $('#money_out_div').hide();
            $('#money_in_div').hide();
        }
    });

    $('#type_bank_account').on('change', function () {
        if ($(this).is(':checked')) {
            $('#bank_info').show();
            $('#account_info').hide();
        } else {
            $('#bank_info').hide();
        }
    });

    $('#type_account').on('change', function () {
        if ($(this).is(':checked')) {
            $('#bank_info').hide();
            $('#account_info').show();
        } else {
            $('#account_info').hide();
        }
    });

    $(document).ready(function () {
        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;
        var current = 1;
        var steps = $("fieldset").length;
        getItemsList();
        setProgressBar(current);
        $(".next").click(function () {
            if (!validateFields()) {
                // Display an error message or take appropriate action
                return;
            }
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            setProgressBar(++current);
        });

        function validateFields() {
            // validation logic
            var type = $("input[name='type']:checked").val();
            var name = $("#name").val();
            if (!type || !name) {
                // display an error message or take appropriate action
                alertify.error("Name is required.");
                return false;
            }
            return true;
        }

        $(".previous").click(function () {

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            setProgressBar(--current);
        });

        function setProgressBar(curStep) {
            var percent = parseFloat(100 / steps) * curStep;
            percent = percent.toFixed();
            $(".progress-bar")
                .css("width", percent + "%")
        }
        $(".submit").click(function () {
            return false;
        })
    });

    function removeExtraFields(index) {
        $('#name_' + index).remove();

        // Update the total array after removing the row
        total.splice(index - 1, 1);

        // Recalculate the total and update other fields if needed
        var sum = 0;
        for (let i = 0; i < total.length; i++) {
            sum += Number(total[i]);
        }

        // Update your other fields here if needed
        $('#sub-total').val(sum.toFixed(2));
        $('#amount').val(sum.toFixed(2));
        $('#totall').val(sum.toFixed(2));
    }

    var counter_2 = 0;
    $('#add_bulk_items').on('click', function() {
        counter_2 ++

        // if (counter_2 > 1 && !validateGeneratedFields(counter_2 - 1)) {
        //     return;
        // }
        var manufacturerSelect = $('<SearchableSelectField name="manufacturer[]" id="manufacturer_' + counter_2 + '" class="form-control selectpicker show-menu-arrow show-tick drug-related-sections" data-size="10" data-live-search="true" title="Select Manufacturer"></SearchableSelectField>');
        // append options to the select element
        for (var i = 0; i < manufacturers.length; i++) {
            manufacturerSelect.append('<option value="' + manufacturers[i].id + '">' + manufacturers[i].name + '</option>');
        }
        $('<tr id="name_' + counter_2 + '"><td><input type="text" placeholder="Enter Generic Name" name="item_name[]" id="item-name_' + counter_2 + '" class="my-0 form-control" /></td><td><input type="text" placeholder="Enter Brand Name" name="brand[]" id="brand-name_' + counter_2 + '" class="my-0 form-control" /></td><td><input type="text" placeholder="Enter Product Code" name="product_code[]" id="product-code_' + counter_2 + '" class="form-control" /></td><td>' + manufacturerSelect.prop('outerHTML') + '</td><td>' + currency + '</td><td><input type="number" placeholder="Enter Unit Cost Price" name="cost[]" id="item_cost_' + counter_2 + '" class="form-control my-0 item_discount" /></td><td><span style="position:relative;"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields(' + counter_2 + ')"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body2");
        // initialize the Bootstrap Select Picker after appending the element
        $('#manufacturer_' + counter_2).selectpicker();
        $('#item_tax_'+ counter_2).on('change', function(){
        var amt = Number($('#amount_'+counter_2).val());
        var tax = Number(amt * $(this).val()/100);
        var formula = amt + tax;
        $('#amount_'+counter_2).val(formula.toFixed(2));
        total.push(formula.toFixed(2));
        var sum = 0;
        for(let i = 0;i<total.length;i++)
        {
            sum+=Number(total[i]);
        }
        // subtract after taking out
        $('#sub-total').val(sum.toFixed(2));
        $('#amount').val(sum.toFixed(2));
        $('#totall').val(sum.toFixed(2));
    });

    function validateGeneratedFields(counter) {
        var itemName = $('#item-name_' + counter).val();
        var brandName = $('#brand-name_' + counter).val();
        var productCode = $('#product-code_' + counter).val();
        var itemCost = $('#item-cost_' + counter).val();


        if (!itemName || !brandName || !productCode || !itemCost) {
            alertify.error('Please fill in all the fields.');
            return false;
        }

        return true;
    }

    $('#rate_'+ counter_2).on('change', function(){
        if($('#discount').val() > 0)
        {
            var qty = Number($('#qty_'+counter_2).val());
            var amt = $('#amount_'+counter_2).val();
            var dis = Number($(this).val())/100;
            var cost = Number($('#rate_'+counter_2).val());
            var amt = qty * cost;
            var formula = amt - (amt * dis);

        } else {
            var qty = Number($('#qty_'+counter_2).val());
            var amt = $('#amount_'+counter_2).val();
            var cost = Number($('#rate_'+counter_2).val());
            var amt = qty * cost;
            var formula = amt;
        }
        
            $('#amount_'+counter_2).val(formula.toFixed(2));
            total.push(formula.toFixed(2));
            var sum = 0;
            for(let i = 0;i<total.length;i++)
            {
                sum+=Number(total[i]);
            }
            // subtract after taking out
            $('#sub-total').val(sum.toFixed(2));
            $('#amount').val(sum.toFixed(2));
            $('#totall').val(sum.toFixed(2));
        });
    });
</script>

`;

export default function ElementElementVspProcurementVsp() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
