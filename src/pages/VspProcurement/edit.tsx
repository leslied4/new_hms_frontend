import PageShell from '../../components/PageShell';

const sourcePath = 'templates/VspProcurement/edit.php';
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
        width: 50% !important;
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
<div class="container-fluid px-2">
    <div class="row justify-content-center">
        <div class="container text-center p-3 mt-3 mb-2">
            <div class="card px-5 pt-5 pb-2 mt-1 mb-3">
                <!-- php: = $this->Form->create($updateVsp, ['url' => ['controller' => 'VspProcurement', 'action' => 'updateVsp', $vspData->id],'id' =>'msform','novalidate', 'type' => 'file']); -->

                <ul id="progressbar">
                    <li class="active" id="personal"><strong>VSP Details</strong></li>
                    <!-- <li id="file"><strong>Catalogue</strong></li> -->
                    <li id="confirm"><strong>Finish</strong></li>
                </ul>
                <fieldset>
                    <div class="row mt-5">
                        <div class="col-md-2 text-left">
                            <h5>Type</h5>
                        </div>
                        <div class="col-md-6 text-left">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" name="type" type="radio" id="type_vendor" value="Vendor"
                                   <!-- php: = $vspData->type == "Vendor" ? 'checked' : '' -->>
                                <label class="form-check-label" for="type_vendor">Vendor</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" name="type" type="radio" id="type_supplier"
                                    value="Supplier" <!-- php: = $vspData->type == "Supplier" ? 'checked' : '' -->>
                                <label class="form-check-label" for="type_supplier">Supplier</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" name="type" type="radio" id="type_partner"
                                    value="Partner" <!-- php: = $vspData->type == "Partner" ? 'checked' : '' -->>
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
                                <input type="text" value="<!-- php: = $vspData->name -->" name="name" id="name" class="form-control">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Email</h5>
                            </div>
                            <div class="col-md-6">
                                <input value="<!-- php: = $vspData->email -->" type="email" name="email" id="email" class="form-control">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Phone</h5>
                            </div>
                            <div class="col-md-6">
                                <input value="<!-- php: = $vspData->phone -->" type="number" name="phone" id="number" class="form-control">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Location</h5>
                            </div>
                            <div class="col-md-6">
                                <input value="<!-- php: = $vspData->location --> " type="text" name="location" id="location" class="form-control">
                            </div>
                        </div>


                    </div>

                    <div class="row mt-3">
                        <div class="col-md-2 text-left">
                            <h5>Relationship Manager</h5>
                        </div>
                        <div class="col-md-6">
                            <input value="<!-- php: = $vspData->relationship_manager -->" name="relationship_manager" id="relationship" class="form-control input-height"
                                required />
                        </div>
                    </div>


                    <input type="submit" id="next2" name="next" style="width:150px"
                        class="next action-button btn btn-primary" value="Update" />

                </fieldset>
                <fieldset>
                    <div class="form-card">
                        <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br>
                        <div class="row justify-content-center">
                            <div class="col-3"> <img src="https://i.imgur.com/GwStPmg.png" class="fit-image"> </div>
                        </div> <br><br>
                        <div class="row justify-content-center">
                            <div class="col-7 text-center">
                                <!-- <h5 class="purple-text text-center">You Have Successfully Signed Up</h5> -->
                            </div>
                        </div>
                    </div>
                </fieldset>
                <!-- php: = $this->Form->end() -->
            </div>
        </div>
    </div>
</div>



    <script>
        
       // });


        //$('#accountstable').DataTable();
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

            //getItemsList();

            setProgressBar(current);

            $(".next").click(function () {

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
        var counter_2 = 0;
        $('#add_bulk_items').on('click', function () {
            counter_2++
            $('<tr id="name_' + counter_2 +
                    '"><td><input type="text" placeholder="Enter Generic Name" name="item_name[]" id="item-name_' +
                    counter_2 +
                    '" class=" my-0 form-control" /></td><td><input type="text" placeholder="Enter Brand Name" name="brand[]" id="brand-name_' +
                    counter_2 +
                    '" class=" my-0 form-control" /></td><td><input type="text" placeholder="Enter Product Code" name="product_code[]" id="product-code_' +
                    counter_2 +
                    '" class="form-control" /></td><td><input type="text" placeholder="Enter Manufacturer" name="manufacturer[]" id="manufacturer_' +
                    counter_2 +
                    '" class="form-control" /></td><td><input type="number" placeholder="Enter Unit Cost Price" name="cost[]" id="item_cost_' +
                    counter_2 +
                    '" class="form-control my-0 item_discount" /></td>&nbsp;&nbsp;&nbsp;</div><span style="position:absolute; top:20px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields(' +
                    counter_2 + ')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>')
                .appendTo("#item-body2");
            // $('<div id="price_'+ counter_2 +'"><input type="number" name="code[]" id="code"  placeholder="Code" class="form-control input-height" required/><br></div>').appendTo("#mdc_code_div");
            // $('<div id="code_'+ counter_2 +'"><input type="number" name="tariff[]" id="code"  placeholder="Tariff" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter_2 +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#mdc_tariff_div");

            $('#item_tax_' + counter_2).on('change', function () {
                var amt = Number($('#amount_' + counter_2).val());
                var tax = Number(amt * $(this).val() / 100);
                var formula = amt + tax;
                $('#amount_' + counter_2).val(formula.toFixed(2));
                total.push(formula.toFixed(2));
                //    console.log(total);

                var sum = 0;
                for (let i = 0; i < total.length; i++) {
                    sum += Number(total[i]);
                }
                //  console.log(sum);
                // subtract after taking out
                console.log(sum);
                $('#sub-total').val(sum.toFixed(2));
                $('#amount').val(sum.toFixed(2));
                $('#totall').val(sum.toFixed(2));
            });

            $('#rate_' + counter_2).on('change', function () {




                if ($('#discount').val() > 0) {
                    var qty = Number($('#qty_' + counter_2).val());
                    var amt = $('#amount_' + counter_2).val();
                    var dis = Number($(this).val()) / 100;
                    var cost = Number($('#rate_' + counter_2).val());
                    var amt = qty * cost;
                    var formula = amt - (amt * dis);

                } else {
                    var qty = Number($('#qty_' + counter_2).val());
                    var amt = $('#amount_' + counter_2).val();
                    // var dis = Number($(this).val())/100;
                    var cost = Number($('#rate_' + counter_2).val());
                    var amt = qty * cost;
                    var formula = amt;

                }

                $('#amount_' + counter_2).val(formula.toFixed(2));
                total.push(formula.toFixed(2));
                //    console.log(total);

                var sum = 0;
                for (let i = 0; i < total.length; i++) {
                    sum += Number(total[i]);
                }
                //  console.log(sum);
                // subtract after taking out
                console.log(sum);
                $('#sub-total').val(sum.toFixed(2));
                $('#amount').val(sum.toFixed(2));
                $('#totall').val(sum.toFixed(2));
            });



        });

    </script>

`;

export default function VspProcurementEditPage() {
  return (
    <PageShell title="VspProcurement/edit.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
