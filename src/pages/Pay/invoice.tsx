import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Pay/invoice.php';
const rawHtml = `
<title>Firstline24 Checkout</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
<!-- php: =$this->Html->css("../assets/plugins/pnotify/dist/pnotify.css") -->
	<!-- php: =$this->Html->css("../assets/plugins/pnotify/dist/pnotify.buttons.css") --> 
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif
    }

    body {
        background-color: #e8eaf6;
    }

    p {
        margin: 0
    }

    .container {
        max-width: 900px;
        margin: 30px auto;
        background-color: #e8eaf6;
        padding: 35px;
    }

    .box-right {
        padding: 30px 25px;
        background-color: white;
        border-radius: 15px
    }

    .box-left {
        padding: 20px 20px;
        background-color: white;
        border-radius: 15px
    }

    .textmuted {
        color: #7a7a7a
    }

    .bg-green {
        background-color: #d4f8f2;
        color: #06e67a;
        padding: 3px 0;
        display: inline;
        border-radius: 25px;
        font-size: 11px
    }

    .p-blue {
        font-size: 14px;
        color: #1976d2
    }

    .fas.fa-circle {
        font-size: 12px
    }

    .p-org {
        font-size: 14px;
        color: #fbc02d
    }

    .h7 {
        font-size: 15px
    }

    .h8 {
        font-size: 12px
    }

    .h9 {
        font-size: 10px
    }

    .bg-blue {
        background-color: #dfe9fc9c;
        border-radius: 5px
    }

    .form-control {
        box-shadow: none !important
    }

    .card input::placeholder {
        font-size: 14px
    }

    ::placeholder {
        font-size: 14px
    }

    input.card {
        position: relative
    }

    .far.fa-credit-card {
        position: absolute;
        top: 10px;
        padding: 0 15px
    }
    .fa.fa-envelope {
        position: absolute;
        top: 10px;
        padding: 0 15px
    }
    .fa.fa-phone {
        position: absolute;
        top: 10px;
        padding: 0 15px
    }

    .fas,
    .far {
        cursor: pointer
    }

    .cursor {
        cursor: pointer
    }

    .btn.btn-primary {
        box-shadow: none;
        height: 40px;
        padding: 11px
    }

    .bg.btn.btn-primary {
        background-color: transparent;
        border: none;
        color: #1976d2
    }

    .bg.btn.btn-primary:hover {
        color: #539ee9
    }

    @media(max-width:320px) {
        .h8 {
            font-size: 11px
        }

        .h7 {
            font-size: 13px
        }

        ::placeholder {
            font-size: 10px
        }
    }

</style>
<!-- php: $currency = ''; $sum = 0; switch($invoice->currency){ case "USD": $currency = '<span class=" fas fa-dollar-sign pe-1 h6 align-text-top mt-1"></span>'; break; case "CEDIS": $currency = '<span class=" pe-1 h6 align-text-top fw-bold mt-1">₵</s... -->
<!-- php: if($ext == "BIL"){ -->
  <!-- php: if($invoice->status_id == 27 || $invoice->balance_due == 0){ -->
    <div style="margin-top:100px" class="container bg-white w-50 p-5">
    <div class="d-flex justify-content-center mt-4">
    <!-- php: = $this->Html->image('../assets/img/check.png', ['style' => 'height:100px;width:auto;']) -->
    </div>
        <h4 class="text-center mt-5">Payment Has Been Made For Invoice #<!-- php: = $invoice->invoice_number --></h4>
        <p class="text-secondary text-center">Receipt has been mailed to you</p>
    </div>
  <!-- php: } else { --> 
    <div class="container">
    <div class="d-flex justify-content-center">
        <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 50px', 'fullBase' => true]) -->
    </div>
    <h3 class="text-center pb-4 pt-3">
        <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h3>
    <div class="row m-0">
        <div class="col-md-6 col-12">
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="row box-right">
                        <div class="col-md-8 ps-0 ">
                            <p class="ps-3 textmuted fw-bold h6 mb-0">BALANCE DUE</p>
                            <p class="h1 fw-bold d-flex"> <!-- php: = $currency --> <!-- php: = $invoice->balance_due -->
                                <!-- <span class="textmuted">.58</span> -->
                             </p>
                            <!-- <p class="ms-3 px-2 bg-green">+10% since last month</p> -->
                        </div>
                        <div class="col-md-4">
                            <!-- <p class="p-blue"> <span class="fas fa-circle pe-2"></span>Pending </p>
                            <p class="fw-bold mb-3"><!-- php: = $currency -->1254  -->
                            <!-- <span class="textmuted">.50</span>  -->
                        </p>
                            <!-- <p class="p-org"><span class="fas fa-circle pe-2"></span>On drafts</p>
                            <p class="fw-bold"><span class="fas fa-dollar-sign pe-1"></span>00<span
                                    class="textmuted">.00</span></p> -->
                        </div>
                    </div>
                </div>
                <div class="col-12 px-0 mb-4">
                    <div class="box-right">
                        <!-- <div class="d-flex pb-2">
                            <p class="fw-bold h7"><span class="textmuted">quickpay.to/</span>Publicnote</p>
                            <p class="ms-auto p-blue"><span class=" bg btn btn-primary fas fa-pencil-alt me-3"></span>
                                <span class=" bg btn btn-primary far fa-clone"></span> </p>
                        </div> -->
                        <!-- <div class="bg-blue p-2"> -->
                        <!-- <P class="h8 textmuted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                                recusandae dolorem voluptas nemo, modi eos minus nesciunt.
                            </P> -->
                        <!-- </div> -->
                        <p class="fw-bold h6">INVOICE #<!-- php: = $invoice->invoice_number --></p>
                        <div class="h8">
                            <div class="row m-0 border mb-3">
                               
                                <!-- <div class="col-6 h8 pe-0 ps-2">
                                    <p class="textmuted py-2">Items</p> <span class="d-block py-2 border-bottom">Legal
                                        Advising</span> <span class="d-block py-2">Expert Consulting</span>
                                </div>
                                <div class="col-2 text-center p-0">
                                    <p class="textmuted p-2">Qty</p> <span class="d-block p-2 border-bottom">2</span>
                                    <span class="d-block p-2">1</span>
                                </div>
                                <div class="col-2 p-0 text-center h8 border-end">
                                    <p class="textmuted p-2">Price</p> <span class="d-block border-bottom py-2"><span
                                            class="fas fa-dollar-sign"></span>500</span> <span
                                        class="d-block py-2 "><span class="fas fa-dollar-sign"></span>400</span>
                                </div>
                                <div class="col-2 p-0 text-center">
                                    <p class="textmuted p-2">Total</p> <span class="d-block py-2 border-bottom"><span
                                            class="fas fa-dollar-sign"></span>1000</span> <span
                                        class="d-block py-2"><span class="fas fa-dollar-sign"></span>400</span>
                                </div> -->
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th><small class="textmuted py-2">Items</small></th>
                                            <th><small class="textmuted py-2">Qty</small></th>
                                            <th><small class="textmuted py-2">Price</small></th>
                                            <th><small class="textmuted py-2">Total</small></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    <!-- php: foreach($invoice->invoicing_items as $inv_item){ $sum+=$inv_item->amount; -->
                                        <tr>
                                            <td><small class="py-2"><!-- php: = $inv_item->item_name --></small></td>
                                            <td><small class="py-2"><!-- php: = $inv_item->qty --></small></td>
                                            <td><small class="py-2"><!-- php: = $inv_item->rate --> </small></td>
                                            <td><small class="py-2"><!-- php: = $inv_item->amount --></small></td>
                                        </tr>
                                    <!-- php: } -->
                                    </tbody>
                                </table>
                               
                            </div>
                            <div class="d-flex h7 mb-2">
                                <p class="">Total Amount</p>
                                <p class="ms-auto"><!-- php: = $currency --><!-- php: = $sum --></p>
                            </div>
                            <!-- <div class="h8 mb-5">
                        <p class="textmuted">Lorem ipsum dolor sit amet elit. Adipisci ea harum sed quaerat tenetur </p>
                    </div> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-6 col-12 ps-md-5 p-0 ">
            <div class="box-left">
                <p class="textmuted h8">Invoice</p>
                <p class="fw-bold h6"><!-- php: = $invoice->payer_name --></p>
                <p class="textmuted h8"><!-- php: = $invoice->address --></p>
                <!-- <p class="textmuted h8 mb-2">Utah, United States 84104</p> -->
                <!-- <div class="h8">
                    <div class="row m-0 border mb-3">
                        <div class="col-6 h8 pe-0 ps-2">
                            <p class="textmuted py-2">Items</p> <span class="d-block py-2 border-bottom">Legal
                                Advising</span> <span class="d-block py-2">Expert Consulting</span>
                        </div>
                        <div class="col-2 text-center p-0">
                            <p class="textmuted p-2">Qty</p> <span class="d-block p-2 border-bottom">2</span> <span
                                class="d-block p-2">1</span>
                        </div>
                        <div class="col-2 p-0 text-center h8 border-end">
                            <p class="textmuted p-2">Price</p> <span class="d-block border-bottom py-2"><span
                                    class="fas fa-dollar-sign"></span>500</span> <span class="d-block py-2 "><span
                                    class="fas fa-dollar-sign"></span>400</span>
                        </div>
                        <div class="col-2 p-0 text-center">
                            <p class="textmuted p-2">Total</p> <span class="d-block py-2 border-bottom"><span
                                    class="fas fa-dollar-sign"></span>1000</span> <span class="d-block py-2"><span
                                    class="fas fa-dollar-sign"></span>400</span>
                        </div>
                    </div>
                    <div class="d-flex h7 mb-2">
                        <p class="">Total Amount</p>
                        <p class="ms-auto"><span class="fas fa-dollar-sign"></span>1400</p>
                    </div>
                    <div class="h8 mb-5">
                        <p class="textmuted">Lorem ipsum dolor sit amet elit. Adipisci ea harum sed quaerat tenetur </p>
                    </div>
                </div> -->
                <div class="mt-5">
                    <p class="h7 fw-bold mb-1">Pay for Invoice</p>

                    <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                   
                                    <div class="d-flex align-items-center">
                                    <!-- php: = $this->Html->image('../assets/img/momoImg.png', ['style' => 'height:25px;width:auto;']) -->  <span class="ms-3 mb-2">Mobile Money</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse  show" aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                <p class="textmuted h8 mb-2">Make payment for this invoice by filling in the details
                                    </p>
                                    <form id="makePaymentForm" class="form">
                                        <div class="row">
                                            <div class="col-12 my-3">
                                                <div class="card border-0"> 
                                                    <input class="form-control ps-5" name="phone" id="phone" type="text" required value="+233<!-- php: = substr($user_mobile, 1) -->"
                                                        placeholder="Mobile Number"> <span
                                                        class="fa fa-phone"></span> 
                                                </div>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <div class="card border-0"> 
                                                     <i class="fa fa-envelope"></i> 
                                                    <input name="email" class="form-control ps-5" style="font-size:13px;" id="email" value="<!-- php: = $user_email -->" type="text" placeholder="Email" required>
                                                    <input type="hidden" name="invoice_id" id="invoice_id" value="<!-- php: = $invoice->id -->">
                                                    <input type="hidden" name="name" id="name" value="<!-- php: = $invoice->payer_name -->">
                                                    <input type="hidden" name="amt" id="amt" value="<!-- php: = $sum -->">
                                                    <input type="hidden" name="ext" id="ext" value="<!-- php: = $ext -->">
                                                    <input type="hidden" name="type" id="type" value="<!-- php: = $type -->">
                                                    <input type="hidden" id="transaction_no" name="transaction_no" />
                                                </div>
                                            </div>
                                           
                                        </div>

                                        <button class="btn w-100 paybtn btn-primary d-block h8">PAY</button>
                                        <button class="btn w-100 completebtn btn-warning d-none h8 mt-3">RESEND</button>
                                        <button type="button" onclick="checkpaymentStatus();" class="btn w-100 completebtn btn-success d-none h8 mt-3">CONFIRM</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <div class="d-flex align-items-center">
                                    <!-- php: //= $this->Html->image('../assets/img/credit-card.png', ['style' => 'height:25px;width:auto;']) -->  <span class="ms-3 mb-1">Bank Cards</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <p class="textmuted h8 mb-2">Make payment for this invoice by filling in the details
                                    </p>
                                    <div class="form">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card border-0"> <input class="form-control ps-5" type="text"
                                                        placeholder="Card number"> <span
                                                        class="far fa-credit-card"></span> </div>
                                            </div>
                                            <div class="col-6"> <input class="form-control my-3" type="text"
                                                    placeholder="MM/YY"> </div>
                                            <div class="col-6"> <input class="form-control my-3" type="text"
                                                    placeholder="cvv"> </div>
                                          <p class="p-blue h8 fw-bold mb-3">MORE PAYMENT METHODS</p> 
                                        </div>

                                        <div class="btn btn-primary d-block h8">PAY <span
                                                class="fas fa-dollar-sign ms-2"></span>1400<span
                                                class="ms-3 fas fa-arrow-right"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                      

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
  <!-- php: } -->

 <!-- php: } else if($ext == "INV"){ -->
<!-- php: if($invoice->balance_due > 0){ --> 
<div class="container">
    <div class="d-flex justify-content-center">
        <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 50px', 'fullBase' => true]) -->
    </div>
    <h3 class="text-center pb-4 pt-3">
        <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h3>
    <div class="row m-0">
        <div class="col-md-6 col-12">
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="row box-right">
                        <div class="col-md-8 ps-0 ">
                            <p class="ps-3 textmuted fw-bold h6 mb-0">BALANCE DUE</p>
                            <p class="h1 fw-bold d-flex"> <!-- php: = $currency --> <!-- php: = $invoice->balance_due -->
                                <!-- <span class="textmuted">.58</span> -->
                             </p>
                            <!-- <p class="ms-3 px-2 bg-green">+10% since last month</p> -->
                        </div>
                        <div class="col-md-4">
                            <!-- <p class="p-blue"> <span class="fas fa-circle pe-2"></span>Pending </p>
                            <p class="fw-bold mb-3"><!-- php: = $currency -->1254  -->
                            <!-- <span class="textmuted">.50</span>  -->
                        </p>
                            <!-- <p class="p-org"><span class="fas fa-circle pe-2"></span>On drafts</p>
                            <p class="fw-bold"><span class="fas fa-dollar-sign pe-1"></span>00<span
                                    class="textmuted">.00</span></p> -->
                        </div>
                    </div>
                </div>
                <div class="col-12 px-0 mb-4">
                    <div class="box-right">
                        <!-- <div class="d-flex pb-2">
                            <p class="fw-bold h7"><span class="textmuted">quickpay.to/</span>Publicnote</p>
                            <p class="ms-auto p-blue"><span class=" bg btn btn-primary fas fa-pencil-alt me-3"></span>
                                <span class=" bg btn btn-primary far fa-clone"></span> </p>
                        </div> -->
                        <!-- <div class="bg-blue p-2"> -->
                        <!-- <P class="h8 textmuted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                                recusandae dolorem voluptas nemo, modi eos minus nesciunt.
                            </P> -->
                        <!-- </div> -->
                        <p class="fw-bold h6">INVOICE #<!-- php: = $invoice->invoice_number --></p>
                        <div class="h8">
                            <div class="row m-0 border mb-3">
                               
                                <!-- <div class="col-6 h8 pe-0 ps-2">
                                    <p class="textmuted py-2">Items</p> <span class="d-block py-2 border-bottom">Legal
                                        Advising</span> <span class="d-block py-2">Expert Consulting</span>
                                </div>
                                <div class="col-2 text-center p-0">
                                    <p class="textmuted p-2">Qty</p> <span class="d-block p-2 border-bottom">2</span>
                                    <span class="d-block p-2">1</span>
                                </div>
                                <div class="col-2 p-0 text-center h8 border-end">
                                    <p class="textmuted p-2">Price</p> <span class="d-block border-bottom py-2"><span
                                            class="fas fa-dollar-sign"></span>500</span> <span
                                        class="d-block py-2 "><span class="fas fa-dollar-sign"></span>400</span>
                                </div>
                                <div class="col-2 p-0 text-center">
                                    <p class="textmuted p-2">Total</p> <span class="d-block py-2 border-bottom"><span
                                            class="fas fa-dollar-sign"></span>1000</span> <span
                                        class="d-block py-2"><span class="fas fa-dollar-sign"></span>400</span>
                                </div> -->
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th><small class="textmuted py-2">Items</small></th>
                                            <th><small class="textmuted py-2">Qty</small></th>
                                            <th><small class="textmuted py-2">Price</small></th>
                                            <th><small class="textmuted py-2">Total</small></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    <!-- php: foreach($invoice->invoicing_items as $inv_item){ $sum+=$inv_item->amount; -->
                                        <tr>
                                            <td><small class="py-2"><!-- php: = $inv_item->item_name --></small></td>
                                            <td><small class="py-2"><!-- php: = $inv_item->qty --></small></td>
                                            <td><small class="py-2"><!-- php: = $inv_item->rate --> </small></td>
                                            <td><small class="py-2"><!-- php: = $inv_item->amount --></small></td>
                                        </tr>
                                    <!-- php: } -->
                                    </tbody>
                                </table>
                               
                            </div>
                            <div class="d-flex h7 mb-2">
                                <p class="">Total Amount</p>
                                <p class="ms-auto"><!-- php: = $currency --><!-- php: = $sum --></p>
                            </div>
                            <!-- <div class="h8 mb-5">
                        <p class="textmuted">Lorem ipsum dolor sit amet elit. Adipisci ea harum sed quaerat tenetur </p>
                    </div> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-6 col-12 ps-md-5 p-0 ">
            <div class="box-left">
                <p class="textmuted h8">Invoice</p>
                <p class="fw-bold h6"><!-- php: = $invoice->payer_name --></p>
                <p class="textmuted h8"><!-- php: = $invoice->address --></p>
                <!-- <p class="textmuted h8 mb-2">Utah, United States 84104</p> -->
                <!-- <div class="h8">
                    <div class="row m-0 border mb-3">
                        <div class="col-6 h8 pe-0 ps-2">
                            <p class="textmuted py-2">Items</p> <span class="d-block py-2 border-bottom">Legal
                                Advising</span> <span class="d-block py-2">Expert Consulting</span>
                        </div>
                        <div class="col-2 text-center p-0">
                            <p class="textmuted p-2">Qty</p> <span class="d-block p-2 border-bottom">2</span> <span
                                class="d-block p-2">1</span>
                        </div>
                        <div class="col-2 p-0 text-center h8 border-end">
                            <p class="textmuted p-2">Price</p> <span class="d-block border-bottom py-2"><span
                                    class="fas fa-dollar-sign"></span>500</span> <span class="d-block py-2 "><span
                                    class="fas fa-dollar-sign"></span>400</span>
                        </div>
                        <div class="col-2 p-0 text-center">
                            <p class="textmuted p-2">Total</p> <span class="d-block py-2 border-bottom"><span
                                    class="fas fa-dollar-sign"></span>1000</span> <span class="d-block py-2"><span
                                    class="fas fa-dollar-sign"></span>400</span>
                        </div>
                    </div>
                    <div class="d-flex h7 mb-2">
                        <p class="">Total Amount</p>
                        <p class="ms-auto"><span class="fas fa-dollar-sign"></span>1400</p>
                    </div>
                    <div class="h8 mb-5">
                        <p class="textmuted">Lorem ipsum dolor sit amet elit. Adipisci ea harum sed quaerat tenetur </p>
                    </div>
                </div> -->
                <div class="mt-5">
                    <p class="h7 fw-bold mb-1">Pay for Invoice</p>

                    <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                   
                                    <div class="d-flex align-items-center">
                                    <!-- php: = $this->Html->image('../assets/img/momoImg.png', ['style' => 'height:25px;width:auto;']) -->  <span class="ms-3 mb-2">Mobile Money</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse  show" aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                <p class="textmuted h8 mb-2">Make payment for this invoice by filling in the details
                                    </p>
                                    <form id="makePaymentForm" class="form">
                                        <div class="row">
                                            <div class="col-12 my-3">
                                                <div class="card border-0"> 
                                                    <input class="form-control ps-5" name="phone" id="phone" type="text" value="+233<!-- php: = substr($user_mobile, 1) -->"
                                                        placeholder="Mobile Number"> <span
                                                        class="fa fa-phone"></span> 
                                                </div>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <div class="card border-0"> 
                                                     <i class="fa fa-envelope"></i> 
                                                    <input name="email" class="form-control ps-5" style="font-size:13px;" id="email" value="<!-- php: = $user_email -->" type="text" placeholder="Email">
                                                    <input type="hidden" name="invoice_id" id="invoice_id" value="<!-- php: = $invoice->id -->">
                                                    <input type="hidden" name="name" id="name" value="<!-- php: = $invoice->payer_name -->">
                                                    <input type="hidden" name="amt" id="amt" value="<!-- php: = $sum -->">
                                                    <input type="hidden" name="ext" id="ext" value="<!-- php: = $ext -->">
                                                    <input type="hidden" name="type" id="type" value="<!-- php: = $type -->">
                                                    <input type="hidden" id="transaction_no" name="transaction_no" />
                                                </div>
                                            </div>
                                           
                                        </div>

                                        <button class="btn w-100 paybtn btn-primary d-block h8">PAY</button>
                                        <button class="btn w-100 completebtn btn-success d-none h8 mt-3">COMPLETED</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <div class="d-flex align-items-center">
                                    <!-- php: //= $this->Html->image('../assets/img/credit-card.png', ['style' => 'height:25px;width:auto;']) -->  <span class="ms-3 mb-1">Bank Cards</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <p class="textmuted h8 mb-2">Make payment for this invoice by filling in the details
                                    </p>
                                    <div class="form">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card border-0"> <input class="form-control ps-5" type="text"
                                                        placeholder="Card number"> <span
                                                        class="far fa-credit-card"></span> </div>
                                            </div>
                                            <div class="col-6"> <input class="form-control my-3" type="text"
                                                    placeholder="MM/YY"> </div>
                                            <div class="col-6"> <input class="form-control my-3" type="text"
                                                    placeholder="cvv"> </div>
                                          <p class="p-blue h8 fw-bold mb-3">MORE PAYMENT METHODS</p> 
                                        </div>

                                        <div class="btn btn-primary d-block h8">PAY <span
                                                class="fas fa-dollar-sign ms-2"></span>1400<span
                                                class="ms-3 fas fa-arrow-right"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                      

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<!-- php: } else if($invoice->balance_due == 0){ -->
    <div style="margin-top:100px" class="container bg-white w-50 p-5">
    <div class="d-flex justify-content-center mt-4">
    <!-- php: = $this->Html->image('../assets/img/check.png', ['style' => 'height:100px;width:auto;']) -->
    </div>
        <h4 class="text-center mt-5">Payment Has Been Made For Invoice #<!-- php: = $invoice->invoice_number --></h4>
        <p class="text-secondary text-center">Receipt has been mailed to you</p>
    </div>
<!-- php: } else { -->
    <div style="margin-top:100px" class="container bg-white w-50 p-5">
    <div class="d-flex justify-content-center mt-4">
    <!-- php: = $this->Html->image('../assets/img/error.png', ['style' => 'height:100px;width:auto;']) -->
    </div>
        <h4 class="text-center mt-5">Invoice Not Found</h4>
        <!-- <p class="text-secondary text-center">Receipt has been mailed to you</p> -->
    </div>
<!-- php: } -->
<!-- php: } -->
<div class="pb-5 mt-5">
    <!-- <img src="" alt="" height="50px" width="auto"> -->
    <div class="d-flex  justify-content-center"><!-- php: = $this->Html->image('../assets/img/logo.png') --></div>
    <div class="d-flex  justify-content-center mt-2"><small class="text-secondary text-center">Powered by Firstline24
            Technologies LTD</small></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- php: =$this->Html->script("../assets/plugins/pnotify/dist/pnotify.js") -->
	<!-- php: =$this->Html->script("../assets/plugins/pnotify/dist/pnotify.buttons.js") --> 

<script>
      let checkPaymentInterval = null
      
$('#makePaymentForm').on('submit', function(e){
  e.preventDefault();
  //console.log($(this));
  let prompt_counter = 0;
  $.ajax({
      url:'<!-- php: = $this->Url->build(['controller' => 'Pay', 'action' => 'initiatePayment']) -->',
      method:"POST",
      cache:false,
      data: $(this).serialize(),
      dataType:"json",
	  beforeSend: function(){
		alert("Processing.. \n Click Ok to Proceed \n You'll receive a prompt.");
		// alert("Processing..");
	  },
      success:function(data)
      {
        console.log(data.page_id);
		if(data.status = "success"){
          //alert(data.message);
		//   alertify.set('notifier','position', 'top-right');
		  alert(data.message);
        //   alert('');
		//   $('#patient_email').val(data.email);
		//   $('#phone_no').val(data.number);
        $(".paybtn").prop("disabled", true);
          $(".completebtn").removeClass("d-none");
		  $('#transaction_no').val(data.trans_id);
          
          checkPaymentInterval = setInterval(() => {
            if(prompt_counter == 3){
                clearInterval(checkPaymentInterval);
                // window.location.reload();
            } else{
            checkpaymentStatus();
            }
            prompt_counter++;
          }, 10000);
		} else{
		  alert("Error");
		//   alertify.error('Success message');
		}
      }
    });
});

function checkpaymentStatus(){
    $.ajax({
      url:'<!-- php: = $this->Url->build(['controller' => 'Pay', 'action' => 'confirmPayment']) -->',
      method:"POST",
      cache:false,
    //   data: {phone: $("#phone").val(), email: $("#email").val(), transaction_no: $("#transaction_no").val(), invoice_id: $("#invoice_id").val()},
      data: $('#makePaymentForm').serialize(),
      dataType:"json",
	  beforeSend: function(){
		console.log("checking status..");
	  },
      success:function(data)
      {
        console.log(data.page_id);
		if(data.status == "success"){
        //   alert(data.message);
		//   alertify.set('notifier','position', 'top-right');
		  console.log(data.message);
		if(data.message == "Patient Paid"){
            // alert('abu');
            new PNotify({
                type: 'success',
                styling: 'bootstrap3',
                title: 'Payment made',
                // text: 'Payment not made',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
            clearInterval(checkPaymentInterval);
            window.location.reload();
        }
		} else{
		  //alert(data.message);
        //   alertify.success(data.message);
          new PNotify({
                type: 'danger',
                styling: 'bootstrap3',
                title: 'Payment not made',
                // text: 'Payment not made',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
		//   alert('An Unexpected Error Occured');
		}
      }
    });
}
</script>
`;

export default function PayInvoicePage() {
  return (
    <PageShell title="Pay/invoice.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
