import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/email/html/receipt.php';
const rawHtml = `
<!-- <html>
    <head>
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->
    </head>
    <body>
    <div class="d-flex justify-content-center mt-2">
    <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 50px', 'fullBase' => true]) -->
</div>
<h3 class="text-center pb-4 pt-3">
    <!-- php: //= ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h3>
    <div style="background-color:#e44f56" class="container-fluid p-3 mt-5 w-50 mb-0">
            <h3 class="text-center text-slate-900">Transaction Receipt</h3>
    </div>
    <div class="container-fluid mt-0 bg-light w-50 p-3">
        
        <div style="display:flex!important; align-items:center;margin-top:10px; white-space: nowrap;"><h6 class="my-0 mr-2">TRANSACTION DATE: </h6> <!-- php: = date('Y-m-d') --></div>
        <div style="display:flex!important; align-items:center;margin-top:20px; white-space: nowrap;"><h6 class="my-0 mr-2">TRANSACTION #: </h6> #LJL32</div>
        <div style="display:flex!important; align-items:center;margin-top:20px; white-space: nowrap;"><h6 class="my-0 mr-2">PAYER NAME: </h6> 200.00</div>
        <div style="display:flex!important; align-items:center;margin-top:20px; white-space: nowrap;"><h6 class="my-0 mr-2">AMOUNT: </h6> 200.00</div>
   
        <h6 class="font-weight-bold text-center mt-5">Disclaimer</h6>
        <p class="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident dignissimos dolores architecto esse autem, expedita corrupti ullam, nulla unde voluptate fugiat ad quasi vel adipisci consectetur corporis hic rerum quae.
        </p>
        <h6 class="mt-5">For any queries contact </h6>
        <p>+233 0000 000 00<br/>+233 0000 000 00<br/>
        test@mail.com</p>
   
    </div>

    <h6 class="mt-4 text-center">Powered by Firstline24 Health Technologies</h6>
    </body>
</html> -->

<html style="-webkit-tap-highlight-color:transparent; -webkit-text-size-adjust:100%; font-family:sans-serif; line-height:1.15">
<head><style type="text/css">:root {}
::after {box-sizing:border-box}
::before {box-sizing:border-box}
[tabindex="-1"]:focus:not(:focus-visible) {outline:0}
a:hover {color:#0056b3;text-decoration:underline}
a:not([href]):not([class]) {color:inherit;text-decoration:none}
a:not([href]):not([class]):hover {color:inherit;text-decoration:none}
button:focus:not(:focus-visible) {outline:0}
[type=button]:not(:disabled) {cursor:pointer}
[type=reset]:not(:disabled) {cursor:pointer}
[type=submit]:not(:disabled) {cursor:pointer}
button:not(:disabled) {cursor:pointer}
[type=button]::-moz-focus-inner {padding:0;border-style:none}
[type=reset]::-moz-focus-inner {padding:0;border-style:none}
[type=submit]::-moz-focus-inner {padding:0;border-style:none}
button::-moz-focus-inner {padding:0;border-style:none}
[type=number]::-webkit-inner-spin-button {height:auto}
[type=number]::-webkit-outer-spin-button {height:auto}
[type=search]::-webkit-search-decoration {-webkit-appearance:none}
::-webkit-file-upload-button {font:inherit;-webkit-appearance:button}
.list-inline-item:not(:last-child) {margin-right:0.5rem}
.blockquote-footer::before {content:"— "}
@media (min-width: 576px) {
    .container, .container-sm {
        max-width: 540px
        }
    }
@media (min-width: 768px) {
    .container, .container-md, .container-sm {
        max-width: 720px
        }
    }
@media (min-width: 992px) {
    .container, .container-lg, .container-md, .container-sm {
        max-width: 960px
        }
    }
@media (min-width: 1200px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl {
        max-width: 1140px
        }
    }
@media (min-width: 576px) {
    .col-sm {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%
        }
    .row-cols-sm-1 > * {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .row-cols-sm-2 > * {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .row-cols-sm-3 > * {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .row-cols-sm-4 > * {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .row-cols-sm-5 > * {
        -ms-flex: 0 0 20%;
        flex: 0 0 20%;
        max-width: 20%
        }
    .row-cols-sm-6 > * {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-sm-auto {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: 100%
        }
    .col-sm-1 {
        -ms-flex: 0 0 8.333333%;
        flex: 0 0 8.333333%;
        max-width: 8.333333%
        }
    .col-sm-2 {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-sm-3 {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .col-sm-4 {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .col-sm-5 {
        -ms-flex: 0 0 41.666667%;
        flex: 0 0 41.666667%;
        max-width: 41.666667%
        }
    .col-sm-6 {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .col-sm-7 {
        -ms-flex: 0 0 58.333333%;
        flex: 0 0 58.333333%;
        max-width: 58.333333%
        }
    .col-sm-8 {
        -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%
        }
    .col-sm-9 {
        -ms-flex: 0 0 75%;
        flex: 0 0 75%;
        max-width: 75%
        }
    .col-sm-10 {
        -ms-flex: 0 0 83.333333%;
        flex: 0 0 83.333333%;
        max-width: 83.333333%
        }
    .col-sm-11 {
        -ms-flex: 0 0 91.666667%;
        flex: 0 0 91.666667%;
        max-width: 91.666667%
        }
    .col-sm-12 {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .order-sm-first {
        -ms-flex-order: -1;
        order: -1
        }
    .order-sm-last {
        -ms-flex-order: 13;
        order: 13
        }
    .order-sm-0 {
        -ms-flex-order: 0;
        order: 0
        }
    .order-sm-1 {
        -ms-flex-order: 1;
        order: 1
        }
    .order-sm-2 {
        -ms-flex-order: 2;
        order: 2
        }
    .order-sm-3 {
        -ms-flex-order: 3;
        order: 3
        }
    .order-sm-4 {
        -ms-flex-order: 4;
        order: 4
        }
    .order-sm-5 {
        -ms-flex-order: 5;
        order: 5
        }
    .order-sm-6 {
        -ms-flex-order: 6;
        order: 6
        }
    .order-sm-7 {
        -ms-flex-order: 7;
        order: 7
        }
    .order-sm-8 {
        -ms-flex-order: 8;
        order: 8
        }
    .order-sm-9 {
        -ms-flex-order: 9;
        order: 9
        }
    .order-sm-10 {
        -ms-flex-order: 10;
        order: 10
        }
    .order-sm-11 {
        -ms-flex-order: 11;
        order: 11
        }
    .order-sm-12 {
        -ms-flex-order: 12;
        order: 12
        }
    .offset-sm-0 {
        margin-left: 0
        }
    .offset-sm-1 {
        margin-left: 8.333333%
        }
    .offset-sm-2 {
        margin-left: 16.666667%
        }
    .offset-sm-3 {
        margin-left: 25%
        }
    .offset-sm-4 {
        margin-left: 33.333333%
        }
    .offset-sm-5 {
        margin-left: 41.666667%
        }
    .offset-sm-6 {
        margin-left: 50%
        }
    .offset-sm-7 {
        margin-left: 58.333333%
        }
    .offset-sm-8 {
        margin-left: 66.666667%
        }
    .offset-sm-9 {
        margin-left: 75%
        }
    .offset-sm-10 {
        margin-left: 83.333333%
        }
    .offset-sm-11 {
        margin-left: 91.666667%
        }
    }
@media (min-width: 768px) {
    .col-md {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%
        }
    .row-cols-md-1 > * {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .row-cols-md-2 > * {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .row-cols-md-3 > * {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .row-cols-md-4 > * {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .row-cols-md-5 > * {
        -ms-flex: 0 0 20%;
        flex: 0 0 20%;
        max-width: 20%
        }
    .row-cols-md-6 > * {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-md-auto {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: 100%
        }
    .col-md-1 {
        -ms-flex: 0 0 8.333333%;
        flex: 0 0 8.333333%;
        max-width: 8.333333%
        }
    .col-md-2 {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-md-3 {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .col-md-4 {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .col-md-5 {
        -ms-flex: 0 0 41.666667%;
        flex: 0 0 41.666667%;
        max-width: 41.666667%
        }
    .col-md-6 {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .col-md-7 {
        -ms-flex: 0 0 58.333333%;
        flex: 0 0 58.333333%;
        max-width: 58.333333%
        }
    .col-md-8 {
        -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%
        }
    .col-md-9 {
        -ms-flex: 0 0 75%;
        flex: 0 0 75%;
        max-width: 75%
        }
    .col-md-10 {
        -ms-flex: 0 0 83.333333%;
        flex: 0 0 83.333333%;
        max-width: 83.333333%
        }
    .col-md-11 {
        -ms-flex: 0 0 91.666667%;
        flex: 0 0 91.666667%;
        max-width: 91.666667%
        }
    .col-md-12 {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .order-md-first {
        -ms-flex-order: -1;
        order: -1
        }
    .order-md-last {
        -ms-flex-order: 13;
        order: 13
        }
    .order-md-0 {
        -ms-flex-order: 0;
        order: 0
        }
    .order-md-1 {
        -ms-flex-order: 1;
        order: 1
        }
    .order-md-2 {
        -ms-flex-order: 2;
        order: 2
        }
    .order-md-3 {
        -ms-flex-order: 3;
        order: 3
        }
    .order-md-4 {
        -ms-flex-order: 4;
        order: 4
        }
    .order-md-5 {
        -ms-flex-order: 5;
        order: 5
        }
    .order-md-6 {
        -ms-flex-order: 6;
        order: 6
        }
    .order-md-7 {
        -ms-flex-order: 7;
        order: 7
        }
    .order-md-8 {
        -ms-flex-order: 8;
        order: 8
        }
    .order-md-9 {
        -ms-flex-order: 9;
        order: 9
        }
    .order-md-10 {
        -ms-flex-order: 10;
        order: 10
        }
    .order-md-11 {
        -ms-flex-order: 11;
        order: 11
        }
    .order-md-12 {
        -ms-flex-order: 12;
        order: 12
        }
    .offset-md-0 {
        margin-left: 0
        }
    .offset-md-1 {
        margin-left: 8.333333%
        }
    .offset-md-2 {
        margin-left: 16.666667%
        }
    .offset-md-3 {
        margin-left: 25%
        }
    .offset-md-4 {
        margin-left: 33.333333%
        }
    .offset-md-5 {
        margin-left: 41.666667%
        }
    .offset-md-6 {
        margin-left: 50%
        }
    .offset-md-7 {
        margin-left: 58.333333%
        }
    .offset-md-8 {
        margin-left: 66.666667%
        }
    .offset-md-9 {
        margin-left: 75%
        }
    .offset-md-10 {
        margin-left: 83.333333%
        }
    .offset-md-11 {
        margin-left: 91.666667%
        }
    }
@media (min-width: 992px) {
    .col-lg {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%
        }
    .row-cols-lg-1 > * {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .row-cols-lg-2 > * {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .row-cols-lg-3 > * {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .row-cols-lg-4 > * {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .row-cols-lg-5 > * {
        -ms-flex: 0 0 20%;
        flex: 0 0 20%;
        max-width: 20%
        }
    .row-cols-lg-6 > * {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-lg-auto {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: 100%
        }
    .col-lg-1 {
        -ms-flex: 0 0 8.333333%;
        flex: 0 0 8.333333%;
        max-width: 8.333333%
        }
    .col-lg-2 {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-lg-3 {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .col-lg-4 {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .col-lg-5 {
        -ms-flex: 0 0 41.666667%;
        flex: 0 0 41.666667%;
        max-width: 41.666667%
        }
    .col-lg-6 {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .col-lg-7 {
        -ms-flex: 0 0 58.333333%;
        flex: 0 0 58.333333%;
        max-width: 58.333333%
        }
    .col-lg-8 {
        -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%
        }
    .col-lg-9 {
        -ms-flex: 0 0 75%;
        flex: 0 0 75%;
        max-width: 75%
        }
    .col-lg-10 {
        -ms-flex: 0 0 83.333333%;
        flex: 0 0 83.333333%;
        max-width: 83.333333%
        }
    .col-lg-11 {
        -ms-flex: 0 0 91.666667%;
        flex: 0 0 91.666667%;
        max-width: 91.666667%
        }
    .col-lg-12 {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .order-lg-first {
        -ms-flex-order: -1;
        order: -1
        }
    .order-lg-last {
        -ms-flex-order: 13;
        order: 13
        }
    .order-lg-0 {
        -ms-flex-order: 0;
        order: 0
        }
    .order-lg-1 {
        -ms-flex-order: 1;
        order: 1
        }
    .order-lg-2 {
        -ms-flex-order: 2;
        order: 2
        }
    .order-lg-3 {
        -ms-flex-order: 3;
        order: 3
        }
    .order-lg-4 {
        -ms-flex-order: 4;
        order: 4
        }
    .order-lg-5 {
        -ms-flex-order: 5;
        order: 5
        }
    .order-lg-6 {
        -ms-flex-order: 6;
        order: 6
        }
    .order-lg-7 {
        -ms-flex-order: 7;
        order: 7
        }
    .order-lg-8 {
        -ms-flex-order: 8;
        order: 8
        }
    .order-lg-9 {
        -ms-flex-order: 9;
        order: 9
        }
    .order-lg-10 {
        -ms-flex-order: 10;
        order: 10
        }
    .order-lg-11 {
        -ms-flex-order: 11;
        order: 11
        }
    .order-lg-12 {
        -ms-flex-order: 12;
        order: 12
        }
    .offset-lg-0 {
        margin-left: 0
        }
    .offset-lg-1 {
        margin-left: 8.333333%
        }
    .offset-lg-2 {
        margin-left: 16.666667%
        }
    .offset-lg-3 {
        margin-left: 25%
        }
    .offset-lg-4 {
        margin-left: 33.333333%
        }
    .offset-lg-5 {
        margin-left: 41.666667%
        }
    .offset-lg-6 {
        margin-left: 50%
        }
    .offset-lg-7 {
        margin-left: 58.333333%
        }
    .offset-lg-8 {
        margin-left: 66.666667%
        }
    .offset-lg-9 {
        margin-left: 75%
        }
    .offset-lg-10 {
        margin-left: 83.333333%
        }
    .offset-lg-11 {
        margin-left: 91.666667%
        }
    }
@media (min-width: 1200px) {
    .col-xl {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%
        }
    .row-cols-xl-1 > * {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .row-cols-xl-2 > * {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .row-cols-xl-3 > * {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .row-cols-xl-4 > * {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .row-cols-xl-5 > * {
        -ms-flex: 0 0 20%;
        flex: 0 0 20%;
        max-width: 20%
        }
    .row-cols-xl-6 > * {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-xl-auto {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: 100%
        }
    .col-xl-1 {
        -ms-flex: 0 0 8.333333%;
        flex: 0 0 8.333333%;
        max-width: 8.333333%
        }
    .col-xl-2 {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%
        }
    .col-xl-3 {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%
        }
    .col-xl-4 {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%
        }
    .col-xl-5 {
        -ms-flex: 0 0 41.666667%;
        flex: 0 0 41.666667%;
        max-width: 41.666667%
        }
    .col-xl-6 {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%
        }
    .col-xl-7 {
        -ms-flex: 0 0 58.333333%;
        flex: 0 0 58.333333%;
        max-width: 58.333333%
        }
    .col-xl-8 {
        -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%
        }
    .col-xl-9 {
        -ms-flex: 0 0 75%;
        flex: 0 0 75%;
        max-width: 75%
        }
    .col-xl-10 {
        -ms-flex: 0 0 83.333333%;
        flex: 0 0 83.333333%;
        max-width: 83.333333%
        }
    .col-xl-11 {
        -ms-flex: 0 0 91.666667%;
        flex: 0 0 91.666667%;
        max-width: 91.666667%
        }
    .col-xl-12 {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%
        }
    .order-xl-first {
        -ms-flex-order: -1;
        order: -1
        }
    .order-xl-last {
        -ms-flex-order: 13;
        order: 13
        }
    .order-xl-0 {
        -ms-flex-order: 0;
        order: 0
        }
    .order-xl-1 {
        -ms-flex-order: 1;
        order: 1
        }
    .order-xl-2 {
        -ms-flex-order: 2;
        order: 2
        }
    .order-xl-3 {
        -ms-flex-order: 3;
        order: 3
        }
    .order-xl-4 {
        -ms-flex-order: 4;
        order: 4
        }
    .order-xl-5 {
        -ms-flex-order: 5;
        order: 5
        }
    .order-xl-6 {
        -ms-flex-order: 6;
        order: 6
        }
    .order-xl-7 {
        -ms-flex-order: 7;
        order: 7
        }
    .order-xl-8 {
        -ms-flex-order: 8;
        order: 8
        }
    .order-xl-9 {
        -ms-flex-order: 9;
        order: 9
        }
    .order-xl-10 {
        -ms-flex-order: 10;
        order: 10
        }
    .order-xl-11 {
        -ms-flex-order: 11;
        order: 11
        }
    .order-xl-12 {
        -ms-flex-order: 12;
        order: 12
        }
    .offset-xl-0 {
        margin-left: 0
        }
    .offset-xl-1 {
        margin-left: 8.333333%
        }
    .offset-xl-2 {
        margin-left: 16.666667%
        }
    .offset-xl-3 {
        margin-left: 25%
        }
    .offset-xl-4 {
        margin-left: 33.333333%
        }
    .offset-xl-5 {
        margin-left: 41.666667%
        }
    .offset-xl-6 {
        margin-left: 50%
        }
    .offset-xl-7 {
        margin-left: 58.333333%
        }
    .offset-xl-8 {
        margin-left: 66.666667%
        }
    .offset-xl-9 {
        margin-left: 75%
        }
    .offset-xl-10 {
        margin-left: 83.333333%
        }
    .offset-xl-11 {
        margin-left: 91.666667%
        }
    }
.table-striped tbody tr:nth-of-type(odd) {background-color:rgba(0, 0, 0, 0.05)}
.table-hover tbody tr:hover {color:#212529;background-color:rgba(0, 0, 0, 0.075)}
.table-hover .table-primary:hover {background-color:#9fcdff}
.table-hover .table-primary:hover > td {background-color:#9fcdff}
.table-hover .table-primary:hover > th {background-color:#9fcdff}
.table-hover .table-secondary:hover {background-color:#c8cbcf}
.table-hover .table-secondary:hover > td {background-color:#c8cbcf}
.table-hover .table-secondary:hover > th {background-color:#c8cbcf}
.table-hover .table-success:hover {background-color:#b1dfbb}
.table-hover .table-success:hover > td {background-color:#b1dfbb}
.table-hover .table-success:hover > th {background-color:#b1dfbb}
.table-hover .table-info:hover {background-color:#abdde5}
.table-hover .table-info:hover > td {background-color:#abdde5}
.table-hover .table-info:hover > th {background-color:#abdde5}
.table-hover .table-warning:hover {background-color:#ffe8a1}
.table-hover .table-warning:hover > td {background-color:#ffe8a1}
.table-hover .table-warning:hover > th {background-color:#ffe8a1}
.table-hover .table-danger:hover {background-color:#f1b0b7}
.table-hover .table-danger:hover > td {background-color:#f1b0b7}
.table-hover .table-danger:hover > th {background-color:#f1b0b7}
.table-hover .table-light:hover {background-color:#ececf6}
.table-hover .table-light:hover > td {background-color:#ececf6}
.table-hover .table-light:hover > th {background-color:#ececf6}
.table-hover .table-dark:hover {background-color:#b9bbbe}
.table-hover .table-dark:hover > td {background-color:#b9bbbe}
.table-hover .table-dark:hover > th {background-color:#b9bbbe}
.table-hover .table-active:hover {background-color:rgba(0, 0, 0, 0.075)}
.table-hover .table-active:hover > td {background-color:rgba(0, 0, 0, 0.075)}
.table-hover .table-active:hover > th {background-color:rgba(0, 0, 0, 0.075)}
.table-dark.table-striped tbody tr:nth-of-type(odd) {background-color:rgba(255, 255, 255, 0.05)}
.table-dark.table-hover tbody tr:hover {color:#fff;background-color:rgba(255, 255, 255, 0.075)}
@media (max-width: 575.98px) {
    .table-responsive-sm {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
        }
    .table-responsive-sm > .table-bordered {
        border: 0
        }
    }
@media (max-width: 767.98px) {
    .table-responsive-md {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
        }
    .table-responsive-md > .table-bordered {
        border: 0
        }
    }
@media (max-width: 991.98px) {
    .table-responsive-lg {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
        }
    .table-responsive-lg > .table-bordered {
        border: 0
        }
    }
@media (max-width: 1199.98px) {
    .table-responsive-xl {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
        }
    .table-responsive-xl > .table-bordered {
        border: 0
        }
    }
@media (prefers-reduced-motion: reduce) {
    .form-control {
        transition: none
        }
    }
.form-control::-ms-expand {background-color:transparent;border:0}
.form-control:focus {color:#495057;background-color:#fff;border-color:#80bdff;outline:0;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.form-control::-webkit-input-placeholder {color:#6c757d;opacity:1}
.form-control::-moz-placeholder {color:#6c757d;opacity:1}
.form-control:-ms-input-placeholder {color:#6c757d;opacity:1}
.form-control::-ms-input-placeholder {color:#6c757d;opacity:1}
.form-control::placeholder {color:#6c757d;opacity:1}
.form-control:disabled {background-color:#e9ecef;opacity:1}
select.form-control:-moz-focusring {color:transparent;text-shadow:0 0 0 #495057}
select.form-control:focus::-ms-value {color:#495057;background-color:#fff}
.form-check-input:disabled ~ .form-check-label {color:#6c757d}
.was-validated :valid ~ .valid-feedback {display:block}
.was-validated :valid ~ .valid-tooltip {display:block}
.was-validated .form-control:valid {border-color:#28a745;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(0.375em + 0.1875rem) center;background-size:calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);padding-right:calc(1.5em + 0.75rem)}
.form-control.is-valid:focus {border-color:#28a745;box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.was-validated .form-control:valid:focus {border-color:#28a745;box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.was-validated select.form-control:valid {background-position:right 1.5rem center;padding-right:3rem}
.was-validated textarea.form-control:valid {padding-right:calc(1.5em + 0.75rem);background-position:top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem)}
.was-validated .custom-select:valid {border-color:#28a745;background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") right 0.75rem center/8px 10px no-repeat, #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e") center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) no-repeat;padding-right:calc(0.75em + 2.3125rem)}
.custom-select.is-valid:focus {border-color:#28a745;box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.was-validated .custom-select:valid:focus {border-color:#28a745;box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.was-validated .form-check-input:valid ~ .form-check-label {color:#28a745}
.was-validated .form-check-input:valid ~ .valid-feedback {display:block}
.was-validated .form-check-input:valid ~ .valid-tooltip {display:block}
.was-validated .custom-control-input:valid ~ .custom-control-label {color:#28a745}
.custom-control-input.is-valid ~ .custom-control-label::before {border-color:#28a745}
.was-validated .custom-control-input:valid ~ .custom-control-label::before {border-color:#28a745}
.custom-control-input.is-valid:checked ~ .custom-control-label::before {border-color:#34ce57;background-color:#34ce57}
.was-validated .custom-control-input:valid:checked ~ .custom-control-label::before {border-color:#34ce57;background-color:#34ce57}
.custom-control-input.is-valid:focus ~ .custom-control-label::before {box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.was-validated .custom-control-input:valid:focus ~ .custom-control-label::before {box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.custom-control-input.is-valid:focus:not(:checked) ~ .custom-control-label::before {border-color:#28a745}
.was-validated .custom-control-input:valid:focus:not(:checked) ~ .custom-control-label::before {border-color:#28a745}
.was-validated .custom-file-input:valid ~ .custom-file-label {border-color:#28a745}
.custom-file-input.is-valid:focus ~ .custom-file-label {border-color:#28a745;box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.was-validated .custom-file-input:valid:focus ~ .custom-file-label {border-color:#28a745;box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.25)}
.was-validated :invalid ~ .invalid-feedback {display:block}
.was-validated :invalid ~ .invalid-tooltip {display:block}
.was-validated .form-control:invalid {border-color:#dc3545;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(0.375em + 0.1875rem) center;background-size:calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);padding-right:calc(1.5em + 0.75rem)}
.form-control.is-invalid:focus {border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
.was-validated .form-control:invalid:focus {border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
.was-validated select.form-control:invalid {background-position:right 1.5rem center;padding-right:3rem}
.was-validated textarea.form-control:invalid {padding-right:calc(1.5em + 0.75rem);background-position:top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem)}
.was-validated .custom-select:invalid {border-color:#dc3545;background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") right 0.75rem center/8px 10px no-repeat, #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) no-repeat;padding-right:calc(0.75em + 2.3125rem)}
.custom-select.is-invalid:focus {border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
.was-validated .custom-select:invalid:focus {border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
.was-validated .form-check-input:invalid ~ .form-check-label {color:#dc3545}
.was-validated .form-check-input:invalid ~ .invalid-feedback {display:block}
.was-validated .form-check-input:invalid ~ .invalid-tooltip {display:block}
.was-validated .custom-control-input:invalid ~ .custom-control-label {color:#dc3545}
.custom-control-input.is-invalid ~ .custom-control-label::before {border-color:#dc3545}
.was-validated .custom-control-input:invalid ~ .custom-control-label::before {border-color:#dc3545}
.custom-control-input.is-invalid:checked ~ .custom-control-label::before {border-color:#e4606d;background-color:#e4606d}
.was-validated .custom-control-input:invalid:checked ~ .custom-control-label::before {border-color:#e4606d;background-color:#e4606d}
.custom-control-input.is-invalid:focus ~ .custom-control-label::before {box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
.was-validated .custom-control-input:invalid:focus ~ .custom-control-label::before {box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
.custom-control-input.is-invalid:focus:not(:checked) ~ .custom-control-label::before {border-color:#dc3545}
.was-validated .custom-control-input:invalid:focus:not(:checked) ~ .custom-control-label::before {border-color:#dc3545}
.was-validated .custom-file-input:invalid ~ .custom-file-label {border-color:#dc3545}
.custom-file-input.is-invalid:focus ~ .custom-file-label {border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
.was-validated .custom-file-input:invalid:focus ~ .custom-file-label {border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.25)}
@media (min-width: 576px) {
    .form-inline label {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-bottom: 0
        }
    .form-inline .form-group {
        display: -ms-flexbox;
        display: flex;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
        -ms-flex-align: center;
        align-items: center;
        margin-bottom: 0
        }
    .form-inline .form-control {
        display: inline-block;
        width: auto;
        vertical-align: middle
        }
    .form-inline .form-control-plaintext {
        display: inline-block
        }
    .form-inline .custom-select, .form-inline .input-group {
        width: auto
        }
    .form-inline .form-check {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: auto;
        padding-left: 0
        }
    .form-inline .form-check-input {
        position: relative;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        margin-top: 0;
        margin-right: 0.25rem;
        margin-left: 0
        }
    .form-inline .custom-control {
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center
        }
    .form-inline .custom-control-label {
        margin-bottom: 0
        }
    }
@media (prefers-reduced-motion: reduce) {
    .btn {
        transition: none
        }
    }
.btn:hover {color:#212529;text-decoration:none}
.btn:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.btn:disabled {opacity:0.65}
.btn:not(:disabled):not(.disabled) {cursor:pointer}
fieldset:disabled a.btn {pointer-events:none}
.btn-primary:hover {color:#fff;background-color:#0069d9;border-color:#0062cc}
.btn-primary:focus {color:#fff;background-color:#0069d9;border-color:#0062cc;box-shadow:0 0 0 0.2rem rgba(38, 143, 255, 0.5)}
.btn-primary:disabled {color:#fff;background-color:#007bff;border-color:#007bff}
.btn-primary:not(:disabled):not(.disabled).active {color:#fff;background-color:#0062cc;border-color:#005cbf}
.btn-primary:not(:disabled):not(.disabled):active {color:#fff;background-color:#0062cc;border-color:#005cbf}
.btn-primary:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(38, 143, 255, 0.5)}
.btn-primary:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(38, 143, 255, 0.5)}
.show > .btn-primary.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(38, 143, 255, 0.5)}
.btn-secondary:hover {color:#fff;background-color:#5a6268;border-color:#545b62}
.btn-secondary:focus {color:#fff;background-color:#5a6268;border-color:#545b62;box-shadow:0 0 0 0.2rem rgba(130, 138, 145, 0.5)}
.btn-secondary:disabled {color:#fff;background-color:#6c757d;border-color:#6c757d}
.btn-secondary:not(:disabled):not(.disabled).active {color:#fff;background-color:#545b62;border-color:#4e555b}
.btn-secondary:not(:disabled):not(.disabled):active {color:#fff;background-color:#545b62;border-color:#4e555b}
.btn-secondary:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(130, 138, 145, 0.5)}
.btn-secondary:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(130, 138, 145, 0.5)}
.show > .btn-secondary.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(130, 138, 145, 0.5)}
.btn-success:hover {color:#fff;background-color:#218838;border-color:#1e7e34}
.btn-success:focus {color:#fff;background-color:#218838;border-color:#1e7e34;box-shadow:0 0 0 0.2rem rgba(72, 180, 97, 0.5)}
.btn-success:disabled {color:#fff;background-color:#28a745;border-color:#28a745}
.btn-success:not(:disabled):not(.disabled).active {color:#fff;background-color:#1e7e34;border-color:#1c7430}
.btn-success:not(:disabled):not(.disabled):active {color:#fff;background-color:#1e7e34;border-color:#1c7430}
.btn-success:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(72, 180, 97, 0.5)}
.btn-success:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(72, 180, 97, 0.5)}
.show > .btn-success.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(72, 180, 97, 0.5)}
.btn-info:hover {color:#fff;background-color:#138496;border-color:#117a8b}
.btn-info:focus {color:#fff;background-color:#138496;border-color:#117a8b;box-shadow:0 0 0 0.2rem rgba(58, 176, 195, 0.5)}
.btn-info:disabled {color:#fff;background-color:#17a2b8;border-color:#17a2b8}
.btn-info:not(:disabled):not(.disabled).active {color:#fff;background-color:#117a8b;border-color:#10707f}
.btn-info:not(:disabled):not(.disabled):active {color:#fff;background-color:#117a8b;border-color:#10707f}
.btn-info:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(58, 176, 195, 0.5)}
.btn-info:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(58, 176, 195, 0.5)}
.show > .btn-info.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(58, 176, 195, 0.5)}
.btn-warning:hover {color:#212529;background-color:#e0a800;border-color:#d39e00}
.btn-warning:focus {color:#212529;background-color:#e0a800;border-color:#d39e00;box-shadow:0 0 0 0.2rem rgba(222, 170, 12, 0.5)}
.btn-warning:disabled {color:#212529;background-color:#ffc107;border-color:#ffc107}
.btn-warning:not(:disabled):not(.disabled).active {color:#212529;background-color:#d39e00;border-color:#c69500}
.btn-warning:not(:disabled):not(.disabled):active {color:#212529;background-color:#d39e00;border-color:#c69500}
.btn-warning:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(222, 170, 12, 0.5)}
.btn-warning:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(222, 170, 12, 0.5)}
.show > .btn-warning.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(222, 170, 12, 0.5)}
.btn-danger:hover {color:#fff;background-color:#c82333;border-color:#bd2130}
.btn-danger:focus {color:#fff;background-color:#c82333;border-color:#bd2130;box-shadow:0 0 0 0.2rem rgba(225, 83, 97, 0.5)}
.btn-danger:disabled {color:#fff;background-color:#dc3545;border-color:#dc3545}
.btn-danger:not(:disabled):not(.disabled).active {color:#fff;background-color:#bd2130;border-color:#b21f2d}
.btn-danger:not(:disabled):not(.disabled):active {color:#fff;background-color:#bd2130;border-color:#b21f2d}
.btn-danger:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(225, 83, 97, 0.5)}
.btn-danger:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(225, 83, 97, 0.5)}
.show > .btn-danger.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(225, 83, 97, 0.5)}
.btn-light:hover {color:#212529;background-color:#e2e6ea;border-color:#dae0e5}
.btn-light:focus {color:#212529;background-color:#e2e6ea;border-color:#dae0e5;box-shadow:0 0 0 0.2rem rgba(216, 217, 219, 0.5)}
.btn-light:disabled {color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}
.btn-light:not(:disabled):not(.disabled).active {color:#212529;background-color:#dae0e5;border-color:#d3d9df}
.btn-light:not(:disabled):not(.disabled):active {color:#212529;background-color:#dae0e5;border-color:#d3d9df}
.btn-light:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(216, 217, 219, 0.5)}
.btn-light:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(216, 217, 219, 0.5)}
.show > .btn-light.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(216, 217, 219, 0.5)}
.btn-dark:hover {color:#fff;background-color:#23272b;border-color:#1d2124}
.btn-dark:focus {color:#fff;background-color:#23272b;border-color:#1d2124;box-shadow:0 0 0 0.2rem rgba(82, 88, 93, 0.5)}
.btn-dark:disabled {color:#fff;background-color:#343a40;border-color:#343a40}
.btn-dark:not(:disabled):not(.disabled).active {color:#fff;background-color:#1d2124;border-color:#171a1d}
.btn-dark:not(:disabled):not(.disabled):active {color:#fff;background-color:#1d2124;border-color:#171a1d}
.btn-dark:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(82, 88, 93, 0.5)}
.btn-dark:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(82, 88, 93, 0.5)}
.show > .btn-dark.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(82, 88, 93, 0.5)}
.btn-outline-primary:hover {color:#fff;background-color:#007bff;border-color:#007bff}
.btn-outline-primary:focus {box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.5)}
.btn-outline-primary:disabled {color:#007bff;background-color:transparent}
.btn-outline-primary:not(:disabled):not(.disabled).active {color:#fff;background-color:#007bff;border-color:#007bff}
.btn-outline-primary:not(:disabled):not(.disabled):active {color:#fff;background-color:#007bff;border-color:#007bff}
.btn-outline-primary:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.5)}
.btn-outline-primary:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.5)}
.show > .btn-outline-primary.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.5)}
.btn-outline-secondary:hover {color:#fff;background-color:#6c757d;border-color:#6c757d}
.btn-outline-secondary:focus {box-shadow:0 0 0 0.2rem rgba(108, 117, 125, 0.5)}
.btn-outline-secondary:disabled {color:#6c757d;background-color:transparent}
.btn-outline-secondary:not(:disabled):not(.disabled).active {color:#fff;background-color:#6c757d;border-color:#6c757d}
.btn-outline-secondary:not(:disabled):not(.disabled):active {color:#fff;background-color:#6c757d;border-color:#6c757d}
.btn-outline-secondary:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(108, 117, 125, 0.5)}
.btn-outline-secondary:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(108, 117, 125, 0.5)}
.show > .btn-outline-secondary.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(108, 117, 125, 0.5)}
.btn-outline-success:hover {color:#fff;background-color:#28a745;border-color:#28a745}
.btn-outline-success:focus {box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.5)}
.btn-outline-success:disabled {color:#28a745;background-color:transparent}
.btn-outline-success:not(:disabled):not(.disabled).active {color:#fff;background-color:#28a745;border-color:#28a745}
.btn-outline-success:not(:disabled):not(.disabled):active {color:#fff;background-color:#28a745;border-color:#28a745}
.btn-outline-success:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.5)}
.btn-outline-success:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.5)}
.show > .btn-outline-success.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.5)}
.btn-outline-info:hover {color:#fff;background-color:#17a2b8;border-color:#17a2b8}
.btn-outline-info:focus {box-shadow:0 0 0 0.2rem rgba(23, 162, 184, 0.5)}
.btn-outline-info:disabled {color:#17a2b8;background-color:transparent}
.btn-outline-info:not(:disabled):not(.disabled).active {color:#fff;background-color:#17a2b8;border-color:#17a2b8}
.btn-outline-info:not(:disabled):not(.disabled):active {color:#fff;background-color:#17a2b8;border-color:#17a2b8}
.btn-outline-info:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(23, 162, 184, 0.5)}
.btn-outline-info:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(23, 162, 184, 0.5)}
.show > .btn-outline-info.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(23, 162, 184, 0.5)}
.btn-outline-warning:hover {color:#212529;background-color:#ffc107;border-color:#ffc107}
.btn-outline-warning:focus {box-shadow:0 0 0 0.2rem rgba(255, 193, 7, 0.5)}
.btn-outline-warning:disabled {color:#ffc107;background-color:transparent}
.btn-outline-warning:not(:disabled):not(.disabled).active {color:#212529;background-color:#ffc107;border-color:#ffc107}
.btn-outline-warning:not(:disabled):not(.disabled):active {color:#212529;background-color:#ffc107;border-color:#ffc107}
.btn-outline-warning:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(255, 193, 7, 0.5)}
.btn-outline-warning:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(255, 193, 7, 0.5)}
.show > .btn-outline-warning.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(255, 193, 7, 0.5)}
.btn-outline-danger:hover {color:#fff;background-color:#dc3545;border-color:#dc3545}
.btn-outline-danger:focus {box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.5)}
.btn-outline-danger:disabled {color:#dc3545;background-color:transparent}
.btn-outline-danger:not(:disabled):not(.disabled).active {color:#fff;background-color:#dc3545;border-color:#dc3545}
.btn-outline-danger:not(:disabled):not(.disabled):active {color:#fff;background-color:#dc3545;border-color:#dc3545}
.btn-outline-danger:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.5)}
.btn-outline-danger:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.5)}
.show > .btn-outline-danger.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.5)}
.btn-outline-light:hover {color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}
.btn-outline-light:focus {box-shadow:0 0 0 0.2rem rgba(248, 249, 250, 0.5)}
.btn-outline-light:disabled {color:#f8f9fa;background-color:transparent}
.btn-outline-light:not(:disabled):not(.disabled).active {color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}
.btn-outline-light:not(:disabled):not(.disabled):active {color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}
.btn-outline-light:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(248, 249, 250, 0.5)}
.btn-outline-light:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(248, 249, 250, 0.5)}
.show > .btn-outline-light.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(248, 249, 250, 0.5)}
.btn-outline-dark:hover {color:#fff;background-color:#343a40;border-color:#343a40}
.btn-outline-dark:focus {box-shadow:0 0 0 0.2rem rgba(52, 58, 64, 0.5)}
.btn-outline-dark:disabled {color:#343a40;background-color:transparent}
.btn-outline-dark:not(:disabled):not(.disabled).active {color:#fff;background-color:#343a40;border-color:#343a40}
.btn-outline-dark:not(:disabled):not(.disabled):active {color:#fff;background-color:#343a40;border-color:#343a40}
.btn-outline-dark:not(:disabled):not(.disabled).active:focus {box-shadow:0 0 0 0.2rem rgba(52, 58, 64, 0.5)}
.btn-outline-dark:not(:disabled):not(.disabled):active:focus {box-shadow:0 0 0 0.2rem rgba(52, 58, 64, 0.5)}
.show > .btn-outline-dark.dropdown-toggle:focus {box-shadow:0 0 0 0.2rem rgba(52, 58, 64, 0.5)}
.btn-link:hover {color:#0056b3;text-decoration:underline}
.btn-link:focus {text-decoration:underline}
.btn-link:disabled {color:#6c757d;pointer-events:none}
@media (prefers-reduced-motion: reduce) {
    .fade {
        transition: none
        }
    }
.fade:not(.show) {opacity:0}
.collapse:not(.show) {display:none}
@media (prefers-reduced-motion: reduce) {
    .collapsing {
        transition: none
        }
    }
@media (prefers-reduced-motion: reduce) {
    .collapsing.width {
        transition: none
        }
    }
.dropdown-toggle::after {display:inline-block;margin-left:0.255em;vertical-align:0.255em;content:"";border-top:0.3em solid;border-right:0.3em solid transparent;border-bottom:0;border-left:0.3em solid transparent}
.dropdown-toggle:empty::after {margin-left:0}
@media (min-width: 576px) {
    .dropdown-menu-sm-left {
        right: auto;
        left: 0
        }
    .dropdown-menu-sm-right {
        right: 0;
        left: auto
        }
    }
@media (min-width: 768px) {
    .dropdown-menu-md-left {
        right: auto;
        left: 0
        }
    .dropdown-menu-md-right {
        right: 0;
        left: auto
        }
    }
@media (min-width: 992px) {
    .dropdown-menu-lg-left {
        right: auto;
        left: 0
        }
    .dropdown-menu-lg-right {
        right: 0;
        left: auto
        }
    }
@media (min-width: 1200px) {
    .dropdown-menu-xl-left {
        right: auto;
        left: 0
        }
    .dropdown-menu-xl-right {
        right: 0;
        left: auto
        }
    }
.dropup .dropdown-toggle::after {display:inline-block;margin-left:0.255em;vertical-align:0.255em;content:"";border-top:0;border-right:0.3em solid transparent;border-bottom:0.3em solid;border-left:0.3em solid transparent}
.dropup .dropdown-toggle:empty::after {margin-left:0}
.dropright .dropdown-toggle::after {display:inline-block;margin-left:0.255em;vertical-align:0.255em;content:"";border-top:0.3em solid transparent;border-right:0;border-bottom:0.3em solid transparent;border-left:0.3em solid}
.dropright .dropdown-toggle:empty::after {margin-left:0}
.dropright .dropdown-toggle::after {vertical-align:0}
.dropleft .dropdown-toggle::after {display:inline-block;margin-left:0.255em;vertical-align:0.255em;content:""}
.dropleft .dropdown-toggle::after {display:none}
.dropleft .dropdown-toggle::before {display:inline-block;margin-right:0.255em;vertical-align:0.255em;content:"";border-top:0.3em solid transparent;border-right:0.3em solid;border-bottom:0.3em solid transparent}
.dropleft .dropdown-toggle:empty::after {margin-left:0}
.dropleft .dropdown-toggle::before {vertical-align:0}
.dropdown-item:focus {color:#16181b;text-decoration:none;background-color:#e9ecef}
.dropdown-item:hover {color:#16181b;text-decoration:none;background-color:#e9ecef}
.dropdown-item:active {color:#fff;text-decoration:none;background-color:#007bff}
.dropdown-item:disabled {color:#adb5bd;pointer-events:none;background-color:transparent}
.btn-group-vertical > .btn:hover {z-index:1}
.btn-group > .btn:hover {z-index:1}
.btn-group-vertical > .btn:active {z-index:1}
.btn-group-vertical > .btn:focus {z-index:1}
.btn-group > .btn:active {z-index:1}
.btn-group > .btn:focus {z-index:1}
.btn-group > .btn-group:not(:first-child) {margin-left:-1px}
.btn-group > .btn:not(:first-child) {margin-left:-1px}
.btn-group > .btn-group:not(:last-child) > .btn {border-top-right-radius:0;border-bottom-right-radius:0}
.btn-group > .btn:not(:last-child):not(.dropdown-toggle) {border-top-right-radius:0;border-bottom-right-radius:0}
.btn-group > .btn-group:not(:first-child) > .btn {border-top-left-radius:0;border-bottom-left-radius:0}
.btn-group > .btn:not(:first-child) {border-top-left-radius:0;border-bottom-left-radius:0}
.dropdown-toggle-split::after {margin-left:0}
.dropright .dropdown-toggle-split::after {margin-left:0}
.dropup .dropdown-toggle-split::after {margin-left:0}
.dropleft .dropdown-toggle-split::before {margin-right:0}
.btn-group-vertical > .btn-group:not(:first-child) {margin-top:-1px}
.btn-group-vertical > .btn:not(:first-child) {margin-top:-1px}
.btn-group-vertical > .btn-group:not(:last-child) > .btn {border-bottom-right-radius:0;border-bottom-left-radius:0}
.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle) {border-bottom-right-radius:0;border-bottom-left-radius:0}
.btn-group-vertical > .btn-group:not(:first-child) > .btn {border-top-left-radius:0;border-top-right-radius:0}
.btn-group-vertical > .btn:not(:first-child) {border-top-left-radius:0;border-top-right-radius:0}
.input-group > .custom-file .custom-file-input:focus ~ .custom-file-label {z-index:3}
.input-group > .custom-select:focus {z-index:3}
.input-group > .form-control:focus {z-index:3}
.input-group > .custom-file .custom-file-input:focus {z-index:4}
.input-group > .custom-select:not(:first-child) {border-top-left-radius:0;border-bottom-left-radius:0}
.input-group > .form-control:not(:first-child) {border-top-left-radius:0;border-bottom-left-radius:0}
.input-group > .custom-file:not(:last-child) .custom-file-label {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group > .custom-file:not(:last-child) .custom-file-label::after {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group > .custom-file:not(:first-child) .custom-file-label {border-top-left-radius:0;border-bottom-left-radius:0}
.input-group:not(.has-validation) > .custom-file:not(:last-child) .custom-file-label {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group:not(.has-validation) > .custom-file:not(:last-child) .custom-file-label::after {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group:not(.has-validation) > .custom-select:not(:last-child) {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group:not(.has-validation) > .form-control:not(:last-child) {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group.has-validation > .custom-file:nth-last-child(n+3) .custom-file-label {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group.has-validation > .custom-file:nth-last-child(n+3) .custom-file-label::after {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group.has-validation > .custom-select:nth-last-child(n+3) {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group.has-validation > .form-control:nth-last-child(n+3) {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group-append .btn:focus {z-index:3}
.input-group-prepend .btn:focus {z-index:3}
.input-group-lg > .form-control:not(textarea) {height:calc(1.5em + 1rem + 2px)}
.input-group-sm > .form-control:not(textarea) {height:calc(1.5em + 0.5rem + 2px)}
.input-group.has-validation > .input-group-append:nth-last-child(n+3) > .btn {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group.has-validation > .input-group-append:nth-last-child(n+3) > .input-group-text {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group:not(.has-validation) > .input-group-append:not(:last-child) > .btn {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group:not(.has-validation) > .input-group-append:not(:last-child) > .input-group-text {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle) {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group > .input-group-append:last-child > .input-group-text:not(:last-child) {border-top-right-radius:0;border-bottom-right-radius:0}
.input-group > .input-group-prepend:first-child > .btn:not(:first-child) {border-top-left-radius:0;border-bottom-left-radius:0}
.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child) {border-top-left-radius:0;border-bottom-left-radius:0}
.input-group > .input-group-prepend:not(:first-child) > .btn {border-top-left-radius:0;border-bottom-left-radius:0}
.input-group > .input-group-prepend:not(:first-child) > .input-group-text {border-top-left-radius:0;border-bottom-left-radius:0}
.custom-control-input:checked ~ .custom-control-label::before {color:#fff;border-color:#007bff;background-color:#007bff}
.custom-control-input:focus ~ .custom-control-label::before {box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {border-color:#80bdff}
.custom-control-input:not(:disabled):active ~ .custom-control-label::before {color:#fff;background-color:#b3d7ff;border-color:#b3d7ff}
.custom-control-input:disabled ~ .custom-control-label {color:#6c757d}
.custom-control-input:disabled ~ .custom-control-label::before {background-color:#e9ecef}
.custom-control-input[disabled] ~ .custom-control-label::before {background-color:#e9ecef}
.custom-control-label::before {position:absolute;top:0.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;pointer-events:none;content:"";background-color:#fff;border:1px solid #adb5bd}
.custom-control-label::after {position:absolute;top:0.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;content:"";background:50%/50% 50% no-repeat}
.custom-checkbox .custom-control-label::before {border-radius:0.25rem}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e")}
.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {border-color:#007bff;background-color:#007bff}
.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e")}
.custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before {background-color:rgba(0, 123, 255, 0.5)}
.custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before {background-color:rgba(0, 123, 255, 0.5)}
.custom-radio .custom-control-label::before {border-radius:50%}
.custom-radio .custom-control-input:checked ~ .custom-control-label::after {background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")}
.custom-radio .custom-control-input:disabled:checked ~ .custom-control-label::before {background-color:rgba(0, 123, 255, 0.5)}
.custom-switch .custom-control-label::before {left:-2.25rem;width:1.75rem;pointer-events:all;border-radius:0.5rem}
.custom-switch .custom-control-label::after {top:calc(0.25rem + 2px);left:calc(-2.25rem + 2px);width:calc(1rem - 4px);height:calc(1rem - 4px);background-color:#adb5bd;border-radius:0.5rem;transition:transform 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out}
@media (prefers-reduced-motion: reduce) {
    .custom-switch .custom-control-label::after {
        transition: none
        }
    }
.custom-switch .custom-control-input:checked ~ .custom-control-label::after {background-color:#fff;-webkit-transform:translatex(0.75rem);transform:translatex(0.75rem)}
.custom-switch .custom-control-input:disabled:checked ~ .custom-control-label::before {background-color:rgba(0, 123, 255, 0.5)}
.custom-select:focus {border-color:#80bdff;outline:0;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.custom-select:focus::-ms-value {color:#495057;background-color:#fff}
.custom-select[size]:not([size="1"]) {height:auto;padding-right:0.75rem;background-image:none}
.custom-select:disabled {color:#6c757d;background-color:#e9ecef}
.custom-select::-ms-expand {display:none}
.custom-select:-moz-focusring {color:transparent;text-shadow:0 0 0 #495057}
.custom-file-input:focus ~ .custom-file-label {border-color:#80bdff;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.custom-file-input:disabled ~ .custom-file-label {background-color:#e9ecef}
.custom-file-input:lang(en) ~ .custom-file-label::after {content:"Browse"}
.custom-file-input ~ .custom-file-label[data-browse]::after {content:attr(data-browse)}
.custom-file-label::after {position:absolute;top:0;right:0;bottom:0;z-index:3;display:block;height:calc(1.5em + 0.75rem);padding:0.375rem 0.75rem;line-height:1.5;color:#495057;content:"Browse";background-color:#e9ecef;border-left:inherit;border-radius:0 0.25rem 0.25rem 0}
.custom-range:focus {outline:0}
.custom-range:focus::-webkit-slider-thumb {box-shadow:0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.custom-range:focus::-moz-range-thumb {box-shadow:0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.custom-range:focus::-ms-thumb {box-shadow:0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.custom-range::-moz-focus-outer {border:0}
.custom-range::-webkit-slider-thumb {width:1rem;height:1rem;margin-top:-0.25rem;background-color:#007bff;border:0;border-radius:1rem;-webkit-transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;-webkit-appearance:none;appearance:none}
@media (prefers-reduced-motion: reduce) {
    .custom-range::-webkit-slider-thumb {
        -webkit-transition: none;
        transition: none
        }
    }
.custom-range::-webkit-slider-runnable-track {width:100%;height:0.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}
.custom-range::-moz-range-thumb {width:1rem;height:1rem;background-color:#007bff;border:0;border-radius:1rem;-moz-transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;-moz-appearance:none;appearance:none}
@media (prefers-reduced-motion: reduce) {
    .custom-range::-moz-range-thumb {
        -moz-transition: none;
        transition: none
        }
    }
.custom-range::-moz-range-track {width:100%;height:0.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}
.custom-range::-ms-thumb {width:1rem;height:1rem;margin-top:0;margin-right:0.2rem;margin-left:0.2rem;background-color:#007bff;border:0;border-radius:1rem;-ms-transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;appearance:none}
@media (prefers-reduced-motion: reduce) {
    .custom-range::-ms-thumb {
        -ms-transition: none;
        transition: none
        }
    }
.custom-range::-ms-track {width:100%;height:0.5rem;color:transparent;cursor:pointer;background-color:transparent;border-color:transparent;border-width:0.5rem}
.custom-range::-ms-fill-lower {background-color:#dee2e6;border-radius:1rem}
.custom-range::-ms-fill-upper {margin-right:15px;background-color:#dee2e6;border-radius:1rem}
.custom-range:disabled::-webkit-slider-thumb {background-color:#adb5bd}
.custom-range:disabled::-webkit-slider-runnable-track {cursor:default}
.custom-range:disabled::-moz-range-thumb {background-color:#adb5bd}
.custom-range:disabled::-moz-range-track {cursor:default}
.custom-range:disabled::-ms-thumb {background-color:#adb5bd}
.custom-control-label::before {transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}
@media (prefers-reduced-motion: reduce) {
    .custom-control-label::before, .custom-file-label, .custom-select {
        transition: none
        }
    }
.nav-link:focus {text-decoration:none}
.nav-link:hover {text-decoration:none}
.nav-tabs .nav-link:focus {isolation:isolate;border-color:#e9ecef #e9ecef #dee2e6}
.nav-tabs .nav-link:hover {isolation:isolate;border-color:#e9ecef #e9ecef #dee2e6}
.navbar-brand:focus {text-decoration:none}
.navbar-brand:hover {text-decoration:none}
.navbar-toggler:focus {text-decoration:none}
.navbar-toggler:hover {text-decoration:none}
@media (max-width: 575.98px) {
    .navbar-expand-sm > .container, .navbar-expand-sm > .container-fluid, .navbar-expand-sm > .container-lg, .navbar-expand-sm > .container-md, .navbar-expand-sm > .container-sm, .navbar-expand-sm > .container-xl {
        padding-right: 0;
        padding-left: 0
        }
    }
@media (min-width: 576px) {
    .navbar-expand-sm {
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .navbar-expand-sm .navbar-nav {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .navbar-expand-sm .navbar-nav .dropdown-menu {
        position: absolute
        }
    .navbar-expand-sm .navbar-nav .nav-link {
        padding-right: 0.5rem;
        padding-left: 0.5rem
        }
    .navbar-expand-sm > .container, .navbar-expand-sm > .container-fluid, .navbar-expand-sm > .container-lg, .navbar-expand-sm > .container-md, .navbar-expand-sm > .container-sm, .navbar-expand-sm > .container-xl {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .navbar-expand-sm .navbar-nav-scroll {
        overflow: visible
        }
    .navbar-expand-sm .navbar-collapse {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-preferred-size: auto;
        flex-basis: auto
        }
    .navbar-expand-sm .navbar-toggler {
        display: none
        }
    }
@media (max-width: 767.98px) {
    .navbar-expand-md > .container, .navbar-expand-md > .container-fluid, .navbar-expand-md > .container-lg, .navbar-expand-md > .container-md, .navbar-expand-md > .container-sm, .navbar-expand-md > .container-xl {
        padding-right: 0;
        padding-left: 0
        }
    }
@media (min-width: 768px) {
    .navbar-expand-md {
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .navbar-expand-md .navbar-nav {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .navbar-expand-md .navbar-nav .dropdown-menu {
        position: absolute
        }
    .navbar-expand-md .navbar-nav .nav-link {
        padding-right: 0.5rem;
        padding-left: 0.5rem
        }
    .navbar-expand-md > .container, .navbar-expand-md > .container-fluid, .navbar-expand-md > .container-lg, .navbar-expand-md > .container-md, .navbar-expand-md > .container-sm, .navbar-expand-md > .container-xl {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .navbar-expand-md .navbar-nav-scroll {
        overflow: visible
        }
    .navbar-expand-md .navbar-collapse {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-preferred-size: auto;
        flex-basis: auto
        }
    .navbar-expand-md .navbar-toggler {
        display: none
        }
    }
@media (max-width: 991.98px) {
    .navbar-expand-lg > .container, .navbar-expand-lg > .container-fluid, .navbar-expand-lg > .container-lg, .navbar-expand-lg > .container-md, .navbar-expand-lg > .container-sm, .navbar-expand-lg > .container-xl {
        padding-right: 0;
        padding-left: 0
        }
    }
@media (min-width: 992px) {
    .navbar-expand-lg {
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .navbar-expand-lg .navbar-nav {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .navbar-expand-lg .navbar-nav .dropdown-menu {
        position: absolute
        }
    .navbar-expand-lg .navbar-nav .nav-link {
        padding-right: 0.5rem;
        padding-left: 0.5rem
        }
    .navbar-expand-lg > .container, .navbar-expand-lg > .container-fluid, .navbar-expand-lg > .container-lg, .navbar-expand-lg > .container-md, .navbar-expand-lg > .container-sm, .navbar-expand-lg > .container-xl {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .navbar-expand-lg .navbar-nav-scroll {
        overflow: visible
        }
    .navbar-expand-lg .navbar-collapse {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-preferred-size: auto;
        flex-basis: auto
        }
    .navbar-expand-lg .navbar-toggler {
        display: none
        }
    }
@media (max-width: 1199.98px) {
    .navbar-expand-xl > .container, .navbar-expand-xl > .container-fluid, .navbar-expand-xl > .container-lg, .navbar-expand-xl > .container-md, .navbar-expand-xl > .container-sm, .navbar-expand-xl > .container-xl {
        padding-right: 0;
        padding-left: 0
        }
    }
@media (min-width: 1200px) {
    .navbar-expand-xl {
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .navbar-expand-xl .navbar-nav {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .navbar-expand-xl .navbar-nav .dropdown-menu {
        position: absolute
        }
    .navbar-expand-xl .navbar-nav .nav-link {
        padding-right: 0.5rem;
        padding-left: 0.5rem
        }
    .navbar-expand-xl > .container, .navbar-expand-xl > .container-fluid, .navbar-expand-xl > .container-lg, .navbar-expand-xl > .container-md, .navbar-expand-xl > .container-sm, .navbar-expand-xl > .container-xl {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .navbar-expand-xl .navbar-nav-scroll {
        overflow: visible
        }
    .navbar-expand-xl .navbar-collapse {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-preferred-size: auto;
        flex-basis: auto
        }
    .navbar-expand-xl .navbar-toggler {
        display: none
        }
    }
.navbar-light .navbar-brand:focus {color:rgba(0, 0, 0, 0.9)}
.navbar-light .navbar-brand:hover {color:rgba(0, 0, 0, 0.9)}
.navbar-light .navbar-nav .nav-link:focus {color:rgba(0, 0, 0, 0.7)}
.navbar-light .navbar-nav .nav-link:hover {color:rgba(0, 0, 0, 0.7)}
.navbar-light .navbar-text a:focus {color:rgba(0, 0, 0, 0.9)}
.navbar-light .navbar-text a:hover {color:rgba(0, 0, 0, 0.9)}
.navbar-dark .navbar-brand:focus {color:#fff}
.navbar-dark .navbar-brand:hover {color:#fff}
.navbar-dark .navbar-nav .nav-link:focus {color:rgba(255, 255, 255, 0.75)}
.navbar-dark .navbar-nav .nav-link:hover {color:rgba(255, 255, 255, 0.75)}
.navbar-dark .navbar-text a:focus {color:#fff}
.navbar-dark .navbar-text a:hover {color:#fff}
.card-link:hover {text-decoration:none}
@media (min-width: 576px) {
    .card-deck {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
        margin-right: -15px;
        margin-left: -15px
        }
    .card-deck .card {
        -ms-flex: 1 0 0%;
        flex: 1 0 0%;
        margin-right: 15px;
        margin-bottom: 0;
        margin-left: 15px
        }
    }
@media (min-width: 576px) {
    .card-group {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap
        }
    .card-group > .card {
        -ms-flex: 1 0 0%;
        flex: 1 0 0%;
        margin-bottom: 0
        }
    .card-group > .card + .card {
        margin-left: 0;
        border-left: 0
        }
    .card-group > .card:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0
        }
    .card-group > .card:not(:last-child) .card-header, .card-group > .card:not(:last-child) .card-img-top {
        border-top-right-radius: 0
        }
    .card-group > .card:not(:last-child) .card-footer, .card-group > .card:not(:last-child) .card-img-bottom {
        border-bottom-right-radius: 0
        }
    .card-group > .card:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0
        }
    .card-group > .card:not(:first-child) .card-header, .card-group > .card:not(:first-child) .card-img-top {
        border-top-left-radius: 0
        }
    .card-group > .card:not(:first-child) .card-footer, .card-group > .card:not(:first-child) .card-img-bottom {
        border-bottom-left-radius: 0
        }
    }
@media (min-width: 576px) {
    .card-columns {
        -webkit-column-count: 3;
        -moz-column-count: 3;
        column-count: 3;
        -webkit-column-gap: 1.25rem;
        -moz-column-gap: 1.25rem;
        column-gap: 1.25rem;
        orphans: 1;
        widows: 1
        }
    .card-columns .card {
        display: inline-block;
        width: 100%
        }
    }
.accordion > .card:not(:last-of-type) {border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}
.accordion > .card:not(:first-of-type) {border-top-left-radius:0;border-top-right-radius:0}
.breadcrumb-item + .breadcrumb-item::before {float:left;padding-right:0.5rem;color:#6c757d;content:"/"}
.breadcrumb-item + .breadcrumb-item:hover::before {text-decoration:underline}
.breadcrumb-item + .breadcrumb-item:hover::before {text-decoration:none}
.page-link:hover {z-index:2;color:#0056b3;text-decoration:none;background-color:#e9ecef;border-color:#dee2e6}
.page-link:focus {z-index:3;outline:0;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.25)}
.page-item:first-child .page-link {margin-left:0;border-top-left-radius:0.25rem;border-bottom-left-radius:0.25rem}
.page-item:last-child .page-link {border-top-right-radius:0.25rem;border-bottom-right-radius:0.25rem}
.pagination-lg .page-item:first-child .page-link {border-top-left-radius:0.3rem;border-bottom-left-radius:0.3rem}
.pagination-lg .page-item:last-child .page-link {border-top-right-radius:0.3rem;border-bottom-right-radius:0.3rem}
.pagination-sm .page-item:first-child .page-link {border-top-left-radius:0.2rem;border-bottom-left-radius:0.2rem}
.pagination-sm .page-item:last-child .page-link {border-top-right-radius:0.2rem;border-bottom-right-radius:0.2rem}
@media (prefers-reduced-motion: reduce) {
    .badge {
        transition: none
        }
    }
a.badge:focus {text-decoration:none}
a.badge:hover {text-decoration:none}
.badge:empty {display:none}
a.badge-primary:focus {color:#fff;background-color:#0062cc}
a.badge-primary:hover {color:#fff;background-color:#0062cc}
a.badge-primary:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.5)}
a.badge-secondary:focus {color:#fff;background-color:#545b62}
a.badge-secondary:hover {color:#fff;background-color:#545b62}
a.badge-secondary:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(108, 117, 125, 0.5)}
a.badge-success:focus {color:#fff;background-color:#1e7e34}
a.badge-success:hover {color:#fff;background-color:#1e7e34}
a.badge-success:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(40, 167, 69, 0.5)}
a.badge-info:focus {color:#fff;background-color:#117a8b}
a.badge-info:hover {color:#fff;background-color:#117a8b}
a.badge-info:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(23, 162, 184, 0.5)}
a.badge-warning:focus {color:#212529;background-color:#d39e00}
a.badge-warning:hover {color:#212529;background-color:#d39e00}
a.badge-warning:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(255, 193, 7, 0.5)}
a.badge-danger:focus {color:#fff;background-color:#bd2130}
a.badge-danger:hover {color:#fff;background-color:#bd2130}
a.badge-danger:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(220, 53, 69, 0.5)}
a.badge-light:focus {color:#212529;background-color:#dae0e5}
a.badge-light:hover {color:#212529;background-color:#dae0e5}
a.badge-light:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(248, 249, 250, 0.5)}
a.badge-dark:focus {color:#fff;background-color:#1d2124}
a.badge-dark:hover {color:#fff;background-color:#1d2124}
a.badge-dark:focus {outline:0;box-shadow:0 0 0 0.2rem rgba(52, 58, 64, 0.5)}
@media (min-width: 576px) {
    .jumbotron {
        padding: 4rem 2rem
        }
    }
@media (prefers-reduced-motion: reduce) {
    .progress-bar {
        transition: none
        }
    }
@media (prefers-reduced-motion: reduce) {
    .progress-bar-animated {
        -webkit-animation: none;
        animation: none
        }
    }
.list-group-item-action:focus {z-index:1;color:#495057;text-decoration:none;background-color:#f8f9fa}
.list-group-item-action:hover {z-index:1;color:#495057;text-decoration:none;background-color:#f8f9fa}
.list-group-item-action:active {color:#212529;background-color:#e9ecef}
.list-group-item:disabled {color:#6c757d;pointer-events:none;background-color:#fff}
@media (min-width: 576px) {
    .list-group-horizontal-sm {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .list-group-horizontal-sm > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0
        }
    .list-group-horizontal-sm > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0
        }
    .list-group-horizontal-sm > .list-group-item.active {
        margin-top: 0
        }
    .list-group-horizontal-sm > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0
        }
    .list-group-horizontal-sm > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px
        }
    }
@media (min-width: 768px) {
    .list-group-horizontal-md {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .list-group-horizontal-md > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0
        }
    .list-group-horizontal-md > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0
        }
    .list-group-horizontal-md > .list-group-item.active {
        margin-top: 0
        }
    .list-group-horizontal-md > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0
        }
    .list-group-horizontal-md > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px
        }
    }
@media (min-width: 992px) {
    .list-group-horizontal-lg {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .list-group-horizontal-lg > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0
        }
    .list-group-horizontal-lg > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0
        }
    .list-group-horizontal-lg > .list-group-item.active {
        margin-top: 0
        }
    .list-group-horizontal-lg > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0
        }
    .list-group-horizontal-lg > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px
        }
    }
@media (min-width: 1200px) {
    .list-group-horizontal-xl {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .list-group-horizontal-xl > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0
        }
    .list-group-horizontal-xl > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0
        }
    .list-group-horizontal-xl > .list-group-item.active {
        margin-top: 0
        }
    .list-group-horizontal-xl > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0
        }
    .list-group-horizontal-xl > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px
        }
    }
.list-group-item-primary.list-group-item-action:focus {color:#004085;background-color:#9fcdff}
.list-group-item-primary.list-group-item-action:hover {color:#004085;background-color:#9fcdff}
.list-group-item-secondary.list-group-item-action:focus {color:#383d41;background-color:#c8cbcf}
.list-group-item-secondary.list-group-item-action:hover {color:#383d41;background-color:#c8cbcf}
.list-group-item-success.list-group-item-action:focus {color:#155724;background-color:#b1dfbb}
.list-group-item-success.list-group-item-action:hover {color:#155724;background-color:#b1dfbb}
.list-group-item-info.list-group-item-action:focus {color:#0c5460;background-color:#abdde5}
.list-group-item-info.list-group-item-action:hover {color:#0c5460;background-color:#abdde5}
.list-group-item-warning.list-group-item-action:focus {color:#856404;background-color:#ffe8a1}
.list-group-item-warning.list-group-item-action:hover {color:#856404;background-color:#ffe8a1}
.list-group-item-danger.list-group-item-action:focus {color:#721c24;background-color:#f1b0b7}
.list-group-item-danger.list-group-item-action:hover {color:#721c24;background-color:#f1b0b7}
.list-group-item-light.list-group-item-action:focus {color:#818182;background-color:#ececf6}
.list-group-item-light.list-group-item-action:hover {color:#818182;background-color:#ececf6}
.list-group-item-dark.list-group-item-action:focus {color:#1b1e21;background-color:#b9bbbe}
.list-group-item-dark.list-group-item-action:hover {color:#1b1e21;background-color:#b9bbbe}
.close:hover {color:#000;text-decoration:none}
.close:not(:disabled):not(.disabled):focus {opacity:0.75}
.close:not(:disabled):not(.disabled):hover {opacity:0.75}
.toast:not(:last-child) {margin-bottom:0.75rem}
@media (prefers-reduced-motion: reduce) {
    .modal.fade .modal-dialog {
        transition: none
        }
    }
.modal-dialog-centered::before {display:block;height:min-content;content:""}
.modal-dialog-centered.modal-dialog-scrollable::before {content:none}
@media (min-width: 576px) {
    .modal-dialog {
        max-width: 500px;
        margin: 1.75rem auto
        }
    .modal-dialog-scrollable {
        max-height: calc(100% - 3.5rem)
        }
    .modal-dialog-scrollable .modal-content {
        max-height: calc(100vh - 3.5rem)
        }
    .modal-dialog-centered {
        min-height: calc(100% - 3.5rem)
        }
    .modal-dialog-centered::before {
        height: calc(100vh - 3.5rem);
        height: -webkit-min-content;
        height: -moz-min-content;
        height: min-content
        }
    .modal-sm {
        max-width: 300px
        }
    }
@media (min-width: 992px) {
    .modal-lg, .modal-xl {
        max-width: 800px
        }
    }
@media (min-width: 1200px) {
    .modal-xl {
        max-width: 1140px
        }
    }
.tooltip .arrow::before {position:absolute;content:"";border-color:transparent;border-style:solid}
.bs-tooltip-auto[x-placement^=top] .arrow::before {top:0;border-width:0.4rem 0.4rem 0;border-top-color:#000}
.bs-tooltip-top .arrow::before {top:0;border-width:0.4rem 0.4rem 0;border-top-color:#000}
.bs-tooltip-auto[x-placement^=right] .arrow::before {right:0;border-width:0.4rem 0.4rem 0.4rem 0;border-right-color:#000}
.bs-tooltip-right .arrow::before {right:0;border-width:0.4rem 0.4rem 0.4rem 0;border-right-color:#000}
.bs-tooltip-auto[x-placement^=bottom] .arrow::before {bottom:0;border-width:0 0.4rem 0.4rem;border-bottom-color:#000}
.bs-tooltip-bottom .arrow::before {bottom:0;border-width:0 0.4rem 0.4rem;border-bottom-color:#000}
.bs-tooltip-auto[x-placement^=left] .arrow::before {left:0;border-width:0.4rem 0 0.4rem 0.4rem;border-left-color:#000}
.bs-tooltip-left .arrow::before {left:0;border-width:0.4rem 0 0.4rem 0.4rem;border-left-color:#000}
.popover .arrow::after {position:absolute;display:block;content:"";border-color:transparent;border-style:solid}
.popover .arrow::before {position:absolute;display:block;content:"";border-color:transparent;border-style:solid}
.bs-popover-auto[x-placement^=top] > .arrow::before {bottom:0;border-width:0.5rem 0.5rem 0;border-top-color:rgba(0, 0, 0, 0.25)}
.bs-popover-top > .arrow::before {bottom:0;border-width:0.5rem 0.5rem 0;border-top-color:rgba(0, 0, 0, 0.25)}
.bs-popover-auto[x-placement^=top] > .arrow::after {bottom:1px;border-width:0.5rem 0.5rem 0;border-top-color:#fff}
.bs-popover-top > .arrow::after {bottom:1px;border-width:0.5rem 0.5rem 0;border-top-color:#fff}
.bs-popover-auto[x-placement^=right] > .arrow::before {left:0;border-width:0.5rem 0.5rem 0.5rem 0;border-right-color:rgba(0, 0, 0, 0.25)}
.bs-popover-right > .arrow::before {left:0;border-width:0.5rem 0.5rem 0.5rem 0;border-right-color:rgba(0, 0, 0, 0.25)}
.bs-popover-auto[x-placement^=right] > .arrow::after {left:1px;border-width:0.5rem 0.5rem 0.5rem 0;border-right-color:#fff}
.bs-popover-right > .arrow::after {left:1px;border-width:0.5rem 0.5rem 0.5rem 0;border-right-color:#fff}
.bs-popover-auto[x-placement^=bottom] > .arrow::before {top:0;border-width:0 0.5rem 0.5rem 0.5rem;border-bottom-color:rgba(0, 0, 0, 0.25)}
.bs-popover-bottom > .arrow::before {top:0;border-width:0 0.5rem 0.5rem 0.5rem;border-bottom-color:rgba(0, 0, 0, 0.25)}
.bs-popover-auto[x-placement^=bottom] > .arrow::after {top:1px;border-width:0 0.5rem 0.5rem 0.5rem;border-bottom-color:#fff}
.bs-popover-bottom > .arrow::after {top:1px;border-width:0 0.5rem 0.5rem 0.5rem;border-bottom-color:#fff}
.bs-popover-auto[x-placement^=bottom] .popover-header::before {position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-0.5rem;content:"";border-bottom:1px solid #f7f7f7}
.bs-popover-bottom .popover-header::before {position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-0.5rem;content:"";border-bottom:1px solid #f7f7f7}
.bs-popover-auto[x-placement^=left] > .arrow::before {right:0;border-width:0.5rem 0 0.5rem 0.5rem;border-left-color:rgba(0, 0, 0, 0.25)}
.bs-popover-left > .arrow::before {right:0;border-width:0.5rem 0 0.5rem 0.5rem;border-left-color:rgba(0, 0, 0, 0.25)}
.bs-popover-auto[x-placement^=left] > .arrow::after {right:1px;border-width:0.5rem 0 0.5rem 0.5rem;border-left-color:#fff}
.bs-popover-left > .arrow::after {right:1px;border-width:0.5rem 0 0.5rem 0.5rem;border-left-color:#fff}
.popover-header:empty {display:none}
.carousel-inner::after {display:block;clear:both;content:""}
@media (prefers-reduced-motion: reduce) {
    .carousel-item {
        transition: none
        }
    }
.carousel-item-next:not(.carousel-item-left) {-webkit-transform:translatex(100%);transform:translatex(100%)}
.carousel-item-prev:not(.carousel-item-right) {-webkit-transform:translatex(-100%);transform:translatex(-100%)}
@media (prefers-reduced-motion: reduce) {
    .carousel-fade .active.carousel-item-left, .carousel-fade .active.carousel-item-right {
        transition: none
        }
    }
@media (prefers-reduced-motion: reduce) {
    .carousel-control-next, .carousel-control-prev {
        transition: none
        }
    }
.carousel-control-next:focus {color:#fff;text-decoration:none;outline:0;opacity:0.9}
.carousel-control-next:hover {color:#fff;text-decoration:none;outline:0;opacity:0.9}
.carousel-control-prev:focus {color:#fff;text-decoration:none;outline:0;opacity:0.9}
.carousel-control-prev:hover {color:#fff;text-decoration:none;outline:0;opacity:0.9}
@media (prefers-reduced-motion: reduce) {
    .carousel-indicators li {
        transition: none
        }
    }
@media (prefers-reduced-motion: reduce) {
    .spinner-border, .spinner-grow {
        -webkit-animation-duration: 1.5s;
        animation-duration: 1.5s
        }
    }
a.bg-primary:focus {background-color:#0062cc}
a.bg-primary:hover {background-color:#0062cc}
button.bg-primary:focus {background-color:#0062cc}
button.bg-primary:hover {background-color:#0062cc}
a.bg-secondary:focus {background-color:#545b62}
a.bg-secondary:hover {background-color:#545b62}
button.bg-secondary:focus {background-color:#545b62}
button.bg-secondary:hover {background-color:#545b62}
a.bg-success:focus {background-color:#1e7e34}
a.bg-success:hover {background-color:#1e7e34}
button.bg-success:focus {background-color:#1e7e34}
button.bg-success:hover {background-color:#1e7e34}
a.bg-info:focus {background-color:#117a8b}
a.bg-info:hover {background-color:#117a8b}
button.bg-info:focus {background-color:#117a8b}
button.bg-info:hover {background-color:#117a8b}
a.bg-warning:focus {background-color:#d39e00}
a.bg-warning:hover {background-color:#d39e00}
button.bg-warning:focus {background-color:#d39e00}
button.bg-warning:hover {background-color:#d39e00}
a.bg-danger:focus {background-color:#bd2130}
a.bg-danger:hover {background-color:#bd2130}
button.bg-danger:focus {background-color:#bd2130}
button.bg-danger:hover {background-color:#bd2130}
a.bg-light:focus {background-color:#dae0e5}
a.bg-light:hover {background-color:#dae0e5}
button.bg-light:focus {background-color:#dae0e5}
button.bg-light:hover {background-color:#dae0e5}
a.bg-dark:focus {background-color:#1d2124}
a.bg-dark:hover {background-color:#1d2124}
button.bg-dark:focus {background-color:#1d2124}
button.bg-dark:hover {background-color:#1d2124}
.clearfix::after {display:block;clear:both;content:""}
@media (min-width: 576px) {
    .d-sm-none {
        display: none
        }
    .d-sm-inline {
        display: inline
        }
    .d-sm-inline-block {
        display: inline-block
        }
    .d-sm-block {
        display: block
        }
    .d-sm-table {
        display: table
        }
    .d-sm-table-row {
        display: table-row
        }
    .d-sm-table-cell {
        display: table-cell
        }
    .d-sm-flex {
        display: -ms-flexbox;
        display: flex
        }
    .d-sm-inline-flex {
        display: -ms-inline-flexbox;
        display: inline-flex
        }
    }
@media (min-width: 768px) {
    .d-md-none {
        display: none
        }
    .d-md-inline {
        display: inline
        }
    .d-md-inline-block {
        display: inline-block
        }
    .d-md-block {
        display: block
        }
    .d-md-table {
        display: table
        }
    .d-md-table-row {
        display: table-row
        }
    .d-md-table-cell {
        display: table-cell
        }
    .d-md-flex {
        display: -ms-flexbox;
        display: flex
        }
    .d-md-inline-flex {
        display: -ms-inline-flexbox;
        display: inline-flex
        }
    }
@media (min-width: 992px) {
    .d-lg-none {
        display: none
        }
    .d-lg-inline {
        display: inline
        }
    .d-lg-inline-block {
        display: inline-block
        }
    .d-lg-block {
        display: block
        }
    .d-lg-table {
        display: table
        }
    .d-lg-table-row {
        display: table-row
        }
    .d-lg-table-cell {
        display: table-cell
        }
    .d-lg-flex {
        display: -ms-flexbox;
        display: flex
        }
    .d-lg-inline-flex {
        display: -ms-inline-flexbox;
        display: inline-flex
        }
    }
@media (min-width: 1200px) {
    .d-xl-none {
        display: none
        }
    .d-xl-inline {
        display: inline
        }
    .d-xl-inline-block {
        display: inline-block
        }
    .d-xl-block {
        display: block
        }
    .d-xl-table {
        display: table
        }
    .d-xl-table-row {
        display: table-row
        }
    .d-xl-table-cell {
        display: table-cell
        }
    .d-xl-flex {
        display: -ms-flexbox;
        display: flex
        }
    .d-xl-inline-flex {
        display: -ms-inline-flexbox;
        display: inline-flex
        }
    }
@media print {
    .d-print-none {
        display: none
        }
    .d-print-inline {
        display: inline
        }
    .d-print-inline-block {
        display: inline-block
        }
    .d-print-block {
        display: block
        }
    .d-print-table {
        display: table
        }
    .d-print-table-row {
        display: table-row
        }
    .d-print-table-cell {
        display: table-cell
        }
    .d-print-flex {
        display: -ms-flexbox;
        display: flex
        }
    .d-print-inline-flex {
        display: -ms-inline-flexbox;
        display: inline-flex
        }
    }
.embed-responsive::before {display:block;content:""}
.embed-responsive-21by9::before {padding-top:42.857143%}
.embed-responsive-16by9::before {padding-top:56.25%}
.embed-responsive-4by3::before {padding-top:75%}
.embed-responsive-1by1::before {padding-top:100%}
@media (min-width: 576px) {
    .flex-sm-row {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .flex-sm-column {
        -ms-flex-direction: column;
        flex-direction: column
        }
    .flex-sm-row-reverse {
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse
        }
    .flex-sm-column-reverse {
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse
        }
    .flex-sm-wrap {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap
        }
    .flex-sm-nowrap {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .flex-sm-wrap-reverse {
        -ms-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse
        }
    .flex-sm-fill {
        -ms-flex: 1 1 auto;
        flex: 1 1 auto
        }
    .flex-sm-grow-0 {
        -ms-flex-positive: 0;
        flex-grow: 0
        }
    .flex-sm-grow-1 {
        -ms-flex-positive: 1;
        flex-grow: 1
        }
    .flex-sm-shrink-0 {
        -ms-flex-negative: 0;
        flex-shrink: 0
        }
    .flex-sm-shrink-1 {
        -ms-flex-negative: 1;
        flex-shrink: 1
        }
    .justify-content-sm-start {
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .justify-content-sm-end {
        -ms-flex-pack: end;
        justify-content: flex-end
        }
    .justify-content-sm-center {
        -ms-flex-pack: center;
        justify-content: center
        }
    .justify-content-sm-between {
        -ms-flex-pack: justify;
        justify-content: space-between
        }
    .justify-content-sm-around {
        -ms-flex-pack: distribute;
        justify-content: space-around
        }
    .align-items-sm-start {
        -ms-flex-align: start;
        align-items: flex-start
        }
    .align-items-sm-end {
        -ms-flex-align: end;
        align-items: flex-end
        }
    .align-items-sm-center {
        -ms-flex-align: center;
        align-items: center
        }
    .align-items-sm-baseline {
        -ms-flex-align: baseline;
        align-items: baseline
        }
    .align-items-sm-stretch {
        -ms-flex-align: stretch;
        align-items: stretch
        }
    .align-content-sm-start {
        -ms-flex-line-pack: start;
        align-content: flex-start
        }
    .align-content-sm-end {
        -ms-flex-line-pack: end;
        align-content: flex-end
        }
    .align-content-sm-center {
        -ms-flex-line-pack: center;
        align-content: center
        }
    .align-content-sm-between {
        -ms-flex-line-pack: justify;
        align-content: space-between
        }
    .align-content-sm-around {
        -ms-flex-line-pack: distribute;
        align-content: space-around
        }
    .align-content-sm-stretch {
        -ms-flex-line-pack: stretch;
        align-content: stretch
        }
    .align-self-sm-auto {
        -ms-flex-item-align: auto;
        align-self: auto
        }
    .align-self-sm-start {
        -ms-flex-item-align: start;
        align-self: flex-start
        }
    .align-self-sm-end {
        -ms-flex-item-align: end;
        align-self: flex-end
        }
    .align-self-sm-center {
        -ms-flex-item-align: center;
        align-self: center
        }
    .align-self-sm-baseline {
        -ms-flex-item-align: baseline;
        align-self: baseline
        }
    .align-self-sm-stretch {
        -ms-flex-item-align: stretch;
        align-self: stretch
        }
    }
@media (min-width: 768px) {
    .flex-md-row {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .flex-md-column {
        -ms-flex-direction: column;
        flex-direction: column
        }
    .flex-md-row-reverse {
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse
        }
    .flex-md-column-reverse {
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse
        }
    .flex-md-wrap {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap
        }
    .flex-md-nowrap {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .flex-md-wrap-reverse {
        -ms-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse
        }
    .flex-md-fill {
        -ms-flex: 1 1 auto;
        flex: 1 1 auto
        }
    .flex-md-grow-0 {
        -ms-flex-positive: 0;
        flex-grow: 0
        }
    .flex-md-grow-1 {
        -ms-flex-positive: 1;
        flex-grow: 1
        }
    .flex-md-shrink-0 {
        -ms-flex-negative: 0;
        flex-shrink: 0
        }
    .flex-md-shrink-1 {
        -ms-flex-negative: 1;
        flex-shrink: 1
        }
    .justify-content-md-start {
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .justify-content-md-end {
        -ms-flex-pack: end;
        justify-content: flex-end
        }
    .justify-content-md-center {
        -ms-flex-pack: center;
        justify-content: center
        }
    .justify-content-md-between {
        -ms-flex-pack: justify;
        justify-content: space-between
        }
    .justify-content-md-around {
        -ms-flex-pack: distribute;
        justify-content: space-around
        }
    .align-items-md-start {
        -ms-flex-align: start;
        align-items: flex-start
        }
    .align-items-md-end {
        -ms-flex-align: end;
        align-items: flex-end
        }
    .align-items-md-center {
        -ms-flex-align: center;
        align-items: center
        }
    .align-items-md-baseline {
        -ms-flex-align: baseline;
        align-items: baseline
        }
    .align-items-md-stretch {
        -ms-flex-align: stretch;
        align-items: stretch
        }
    .align-content-md-start {
        -ms-flex-line-pack: start;
        align-content: flex-start
        }
    .align-content-md-end {
        -ms-flex-line-pack: end;
        align-content: flex-end
        }
    .align-content-md-center {
        -ms-flex-line-pack: center;
        align-content: center
        }
    .align-content-md-between {
        -ms-flex-line-pack: justify;
        align-content: space-between
        }
    .align-content-md-around {
        -ms-flex-line-pack: distribute;
        align-content: space-around
        }
    .align-content-md-stretch {
        -ms-flex-line-pack: stretch;
        align-content: stretch
        }
    .align-self-md-auto {
        -ms-flex-item-align: auto;
        align-self: auto
        }
    .align-self-md-start {
        -ms-flex-item-align: start;
        align-self: flex-start
        }
    .align-self-md-end {
        -ms-flex-item-align: end;
        align-self: flex-end
        }
    .align-self-md-center {
        -ms-flex-item-align: center;
        align-self: center
        }
    .align-self-md-baseline {
        -ms-flex-item-align: baseline;
        align-self: baseline
        }
    .align-self-md-stretch {
        -ms-flex-item-align: stretch;
        align-self: stretch
        }
    }
@media (min-width: 992px) {
    .flex-lg-row {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .flex-lg-column {
        -ms-flex-direction: column;
        flex-direction: column
        }
    .flex-lg-row-reverse {
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse
        }
    .flex-lg-column-reverse {
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse
        }
    .flex-lg-wrap {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap
        }
    .flex-lg-nowrap {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .flex-lg-wrap-reverse {
        -ms-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse
        }
    .flex-lg-fill {
        -ms-flex: 1 1 auto;
        flex: 1 1 auto
        }
    .flex-lg-grow-0 {
        -ms-flex-positive: 0;
        flex-grow: 0
        }
    .flex-lg-grow-1 {
        -ms-flex-positive: 1;
        flex-grow: 1
        }
    .flex-lg-shrink-0 {
        -ms-flex-negative: 0;
        flex-shrink: 0
        }
    .flex-lg-shrink-1 {
        -ms-flex-negative: 1;
        flex-shrink: 1
        }
    .justify-content-lg-start {
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .justify-content-lg-end {
        -ms-flex-pack: end;
        justify-content: flex-end
        }
    .justify-content-lg-center {
        -ms-flex-pack: center;
        justify-content: center
        }
    .justify-content-lg-between {
        -ms-flex-pack: justify;
        justify-content: space-between
        }
    .justify-content-lg-around {
        -ms-flex-pack: distribute;
        justify-content: space-around
        }
    .align-items-lg-start {
        -ms-flex-align: start;
        align-items: flex-start
        }
    .align-items-lg-end {
        -ms-flex-align: end;
        align-items: flex-end
        }
    .align-items-lg-center {
        -ms-flex-align: center;
        align-items: center
        }
    .align-items-lg-baseline {
        -ms-flex-align: baseline;
        align-items: baseline
        }
    .align-items-lg-stretch {
        -ms-flex-align: stretch;
        align-items: stretch
        }
    .align-content-lg-start {
        -ms-flex-line-pack: start;
        align-content: flex-start
        }
    .align-content-lg-end {
        -ms-flex-line-pack: end;
        align-content: flex-end
        }
    .align-content-lg-center {
        -ms-flex-line-pack: center;
        align-content: center
        }
    .align-content-lg-between {
        -ms-flex-line-pack: justify;
        align-content: space-between
        }
    .align-content-lg-around {
        -ms-flex-line-pack: distribute;
        align-content: space-around
        }
    .align-content-lg-stretch {
        -ms-flex-line-pack: stretch;
        align-content: stretch
        }
    .align-self-lg-auto {
        -ms-flex-item-align: auto;
        align-self: auto
        }
    .align-self-lg-start {
        -ms-flex-item-align: start;
        align-self: flex-start
        }
    .align-self-lg-end {
        -ms-flex-item-align: end;
        align-self: flex-end
        }
    .align-self-lg-center {
        -ms-flex-item-align: center;
        align-self: center
        }
    .align-self-lg-baseline {
        -ms-flex-item-align: baseline;
        align-self: baseline
        }
    .align-self-lg-stretch {
        -ms-flex-item-align: stretch;
        align-self: stretch
        }
    }
@media (min-width: 1200px) {
    .flex-xl-row {
        -ms-flex-direction: row;
        flex-direction: row
        }
    .flex-xl-column {
        -ms-flex-direction: column;
        flex-direction: column
        }
    .flex-xl-row-reverse {
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse
        }
    .flex-xl-column-reverse {
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse
        }
    .flex-xl-wrap {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap
        }
    .flex-xl-nowrap {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap
        }
    .flex-xl-wrap-reverse {
        -ms-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse
        }
    .flex-xl-fill {
        -ms-flex: 1 1 auto;
        flex: 1 1 auto
        }
    .flex-xl-grow-0 {
        -ms-flex-positive: 0;
        flex-grow: 0
        }
    .flex-xl-grow-1 {
        -ms-flex-positive: 1;
        flex-grow: 1
        }
    .flex-xl-shrink-0 {
        -ms-flex-negative: 0;
        flex-shrink: 0
        }
    .flex-xl-shrink-1 {
        -ms-flex-negative: 1;
        flex-shrink: 1
        }
    .justify-content-xl-start {
        -ms-flex-pack: start;
        justify-content: flex-start
        }
    .justify-content-xl-end {
        -ms-flex-pack: end;
        justify-content: flex-end
        }
    .justify-content-xl-center {
        -ms-flex-pack: center;
        justify-content: center
        }
    .justify-content-xl-between {
        -ms-flex-pack: justify;
        justify-content: space-between
        }
    .justify-content-xl-around {
        -ms-flex-pack: distribute;
        justify-content: space-around
        }
    .align-items-xl-start {
        -ms-flex-align: start;
        align-items: flex-start
        }
    .align-items-xl-end {
        -ms-flex-align: end;
        align-items: flex-end
        }
    .align-items-xl-center {
        -ms-flex-align: center;
        align-items: center
        }
    .align-items-xl-baseline {
        -ms-flex-align: baseline;
        align-items: baseline
        }
    .align-items-xl-stretch {
        -ms-flex-align: stretch;
        align-items: stretch
        }
    .align-content-xl-start {
        -ms-flex-line-pack: start;
        align-content: flex-start
        }
    .align-content-xl-end {
        -ms-flex-line-pack: end;
        align-content: flex-end
        }
    .align-content-xl-center {
        -ms-flex-line-pack: center;
        align-content: center
        }
    .align-content-xl-between {
        -ms-flex-line-pack: justify;
        align-content: space-between
        }
    .align-content-xl-around {
        -ms-flex-line-pack: distribute;
        align-content: space-around
        }
    .align-content-xl-stretch {
        -ms-flex-line-pack: stretch;
        align-content: stretch
        }
    .align-self-xl-auto {
        -ms-flex-item-align: auto;
        align-self: auto
        }
    .align-self-xl-start {
        -ms-flex-item-align: start;
        align-self: flex-start
        }
    .align-self-xl-end {
        -ms-flex-item-align: end;
        align-self: flex-end
        }
    .align-self-xl-center {
        -ms-flex-item-align: center;
        align-self: center
        }
    .align-self-xl-baseline {
        -ms-flex-item-align: baseline;
        align-self: baseline
        }
    .align-self-xl-stretch {
        -ms-flex-item-align: stretch;
        align-self: stretch
        }
    }
@media (min-width: 576px) {
    .float-sm-left {
        float: left
        }
    .float-sm-right {
        float: right
        }
    .float-sm-none {
        float: none
        }
    }
@media (min-width: 768px) {
    .float-md-left {
        float: left
        }
    .float-md-right {
        float: right
        }
    .float-md-none {
        float: none
        }
    }
@media (min-width: 992px) {
    .float-lg-left {
        float: left
        }
    .float-lg-right {
        float: right
        }
    .float-lg-none {
        float: none
        }
    }
@media (min-width: 1200px) {
    .float-xl-left {
        float: left
        }
    .float-xl-right {
        float: right
        }
    .float-xl-none {
        float: none
        }
    }
.sr-only-focusable:active {position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal}
.sr-only-focusable:focus {position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal}
@media (min-width: 576px) {
    .m-sm-0 {
        margin: 0
        }
    .mt-sm-0, .my-sm-0 {
        margin-top: 0
        }
    .mr-sm-0, .mx-sm-0 {
        margin-right: 0
        }
    .mb-sm-0, .my-sm-0 {
        margin-bottom: 0
        }
    .ml-sm-0, .mx-sm-0 {
        margin-left: 0
        }
    .m-sm-1 {
        margin: 0.25rem
        }
    .mt-sm-1, .my-sm-1 {
        margin-top: 0.25rem
        }
    .mr-sm-1, .mx-sm-1 {
        margin-right: 0.25rem
        }
    .mb-sm-1, .my-sm-1 {
        margin-bottom: 0.25rem
        }
    .ml-sm-1, .mx-sm-1 {
        margin-left: 0.25rem
        }
    .m-sm-2 {
        margin: 0.5rem
        }
    .mt-sm-2, .my-sm-2 {
        margin-top: 0.5rem
        }
    .mr-sm-2, .mx-sm-2 {
        margin-right: 0.5rem
        }
    .mb-sm-2, .my-sm-2 {
        margin-bottom: 0.5rem
        }
    .ml-sm-2, .mx-sm-2 {
        margin-left: 0.5rem
        }
    .m-sm-3 {
        margin: 1rem
        }
    .mt-sm-3, .my-sm-3 {
        margin-top: 1rem
        }
    .mr-sm-3, .mx-sm-3 {
        margin-right: 1rem
        }
    .mb-sm-3, .my-sm-3 {
        margin-bottom: 1rem
        }
    .ml-sm-3, .mx-sm-3 {
        margin-left: 1rem
        }
    .m-sm-4 {
        margin: 1.5rem
        }
    .mt-sm-4, .my-sm-4 {
        margin-top: 1.5rem
        }
    .mr-sm-4, .mx-sm-4 {
        margin-right: 1.5rem
        }
    .mb-sm-4, .my-sm-4 {
        margin-bottom: 1.5rem
        }
    .ml-sm-4, .mx-sm-4 {
        margin-left: 1.5rem
        }
    .m-sm-5 {
        margin: 3rem
        }
    .mt-sm-5, .my-sm-5 {
        margin-top: 3rem
        }
    .mr-sm-5, .mx-sm-5 {
        margin-right: 3rem
        }
    .mb-sm-5, .my-sm-5 {
        margin-bottom: 3rem
        }
    .ml-sm-5, .mx-sm-5 {
        margin-left: 3rem
        }
    .p-sm-0 {
        padding: 0
        }
    .pt-sm-0, .py-sm-0 {
        padding-top: 0
        }
    .pr-sm-0, .px-sm-0 {
        padding-right: 0
        }
    .pb-sm-0, .py-sm-0 {
        padding-bottom: 0
        }
    .pl-sm-0, .px-sm-0 {
        padding-left: 0
        }
    .p-sm-1 {
        padding: 0.25rem
        }
    .pt-sm-1, .py-sm-1 {
        padding-top: 0.25rem
        }
    .pr-sm-1, .px-sm-1 {
        padding-right: 0.25rem
        }
    .pb-sm-1, .py-sm-1 {
        padding-bottom: 0.25rem
        }
    .pl-sm-1, .px-sm-1 {
        padding-left: 0.25rem
        }
    .p-sm-2 {
        padding: 0.5rem
        }
    .pt-sm-2, .py-sm-2 {
        padding-top: 0.5rem
        }
    .pr-sm-2, .px-sm-2 {
        padding-right: 0.5rem
        }
    .pb-sm-2, .py-sm-2 {
        padding-bottom: 0.5rem
        }
    .pl-sm-2, .px-sm-2 {
        padding-left: 0.5rem
        }
    .p-sm-3 {
        padding: 1rem
        }
    .pt-sm-3, .py-sm-3 {
        padding-top: 1rem
        }
    .pr-sm-3, .px-sm-3 {
        padding-right: 1rem
        }
    .pb-sm-3, .py-sm-3 {
        padding-bottom: 1rem
        }
    .pl-sm-3, .px-sm-3 {
        padding-left: 1rem
        }
    .p-sm-4 {
        padding: 1.5rem
        }
    .pt-sm-4, .py-sm-4 {
        padding-top: 1.5rem
        }
    .pr-sm-4, .px-sm-4 {
        padding-right: 1.5rem
        }
    .pb-sm-4, .py-sm-4 {
        padding-bottom: 1.5rem
        }
    .pl-sm-4, .px-sm-4 {
        padding-left: 1.5rem
        }
    .p-sm-5 {
        padding: 3rem
        }
    .pt-sm-5, .py-sm-5 {
        padding-top: 3rem
        }
    .pr-sm-5, .px-sm-5 {
        padding-right: 3rem
        }
    .pb-sm-5, .py-sm-5 {
        padding-bottom: 3rem
        }
    .pl-sm-5, .px-sm-5 {
        padding-left: 3rem
        }
    .m-sm-n1 {
        margin: -0.25rem
        }
    .mt-sm-n1, .my-sm-n1 {
        margin-top: -0.25rem
        }
    .mr-sm-n1, .mx-sm-n1 {
        margin-right: -0.25rem
        }
    .mb-sm-n1, .my-sm-n1 {
        margin-bottom: -0.25rem
        }
    .ml-sm-n1, .mx-sm-n1 {
        margin-left: -0.25rem
        }
    .m-sm-n2 {
        margin: -0.5rem
        }
    .mt-sm-n2, .my-sm-n2 {
        margin-top: -0.5rem
        }
    .mr-sm-n2, .mx-sm-n2 {
        margin-right: -0.5rem
        }
    .mb-sm-n2, .my-sm-n2 {
        margin-bottom: -0.5rem
        }
    .ml-sm-n2, .mx-sm-n2 {
        margin-left: -0.5rem
        }
    .m-sm-n3 {
        margin: -1rem
        }
    .mt-sm-n3, .my-sm-n3 {
        margin-top: -1rem
        }
    .mr-sm-n3, .mx-sm-n3 {
        margin-right: -1rem
        }
    .mb-sm-n3, .my-sm-n3 {
        margin-bottom: -1rem
        }
    .ml-sm-n3, .mx-sm-n3 {
        margin-left: -1rem
        }
    .m-sm-n4 {
        margin: -1.5rem
        }
    .mt-sm-n4, .my-sm-n4 {
        margin-top: -1.5rem
        }
    .mr-sm-n4, .mx-sm-n4 {
        margin-right: -1.5rem
        }
    .mb-sm-n4, .my-sm-n4 {
        margin-bottom: -1.5rem
        }
    .ml-sm-n4, .mx-sm-n4 {
        margin-left: -1.5rem
        }
    .m-sm-n5 {
        margin: -3rem
        }
    .mt-sm-n5, .my-sm-n5 {
        margin-top: -3rem
        }
    .mr-sm-n5, .mx-sm-n5 {
        margin-right: -3rem
        }
    .mb-sm-n5, .my-sm-n5 {
        margin-bottom: -3rem
        }
    .ml-sm-n5, .mx-sm-n5 {
        margin-left: -3rem
        }
    .m-sm-auto {
        margin: auto
        }
    .mt-sm-auto, .my-sm-auto {
        margin-top: auto
        }
    .mr-sm-auto, .mx-sm-auto {
        margin-right: auto
        }
    .mb-sm-auto, .my-sm-auto {
        margin-bottom: auto
        }
    .ml-sm-auto, .mx-sm-auto {
        margin-left: auto
        }
    }
@media (min-width: 768px) {
    .m-md-0 {
        margin: 0
        }
    .mt-md-0, .my-md-0 {
        margin-top: 0
        }
    .mr-md-0, .mx-md-0 {
        margin-right: 0
        }
    .mb-md-0, .my-md-0 {
        margin-bottom: 0
        }
    .ml-md-0, .mx-md-0 {
        margin-left: 0
        }
    .m-md-1 {
        margin: 0.25rem
        }
    .mt-md-1, .my-md-1 {
        margin-top: 0.25rem
        }
    .mr-md-1, .mx-md-1 {
        margin-right: 0.25rem
        }
    .mb-md-1, .my-md-1 {
        margin-bottom: 0.25rem
        }
    .ml-md-1, .mx-md-1 {
        margin-left: 0.25rem
        }
    .m-md-2 {
        margin: 0.5rem
        }
    .mt-md-2, .my-md-2 {
        margin-top: 0.5rem
        }
    .mr-md-2, .mx-md-2 {
        margin-right: 0.5rem
        }
    .mb-md-2, .my-md-2 {
        margin-bottom: 0.5rem
        }
    .ml-md-2, .mx-md-2 {
        margin-left: 0.5rem
        }
    .m-md-3 {
        margin: 1rem
        }
    .mt-md-3, .my-md-3 {
        margin-top: 1rem
        }
    .mr-md-3, .mx-md-3 {
        margin-right: 1rem
        }
    .mb-md-3, .my-md-3 {
        margin-bottom: 1rem
        }
    .ml-md-3, .mx-md-3 {
        margin-left: 1rem
        }
    .m-md-4 {
        margin: 1.5rem
        }
    .mt-md-4, .my-md-4 {
        margin-top: 1.5rem
        }
    .mr-md-4, .mx-md-4 {
        margin-right: 1.5rem
        }
    .mb-md-4, .my-md-4 {
        margin-bottom: 1.5rem
        }
    .ml-md-4, .mx-md-4 {
        margin-left: 1.5rem
        }
    .m-md-5 {
        margin: 3rem
        }
    .mt-md-5, .my-md-5 {
        margin-top: 3rem
        }
    .mr-md-5, .mx-md-5 {
        margin-right: 3rem
        }
    .mb-md-5, .my-md-5 {
        margin-bottom: 3rem
        }
    .ml-md-5, .mx-md-5 {
        margin-left: 3rem
        }
    .p-md-0 {
        padding: 0
        }
    .pt-md-0, .py-md-0 {
        padding-top: 0
        }
    .pr-md-0, .px-md-0 {
        padding-right: 0
        }
    .pb-md-0, .py-md-0 {
        padding-bottom: 0
        }
    .pl-md-0, .px-md-0 {
        padding-left: 0
        }
    .p-md-1 {
        padding: 0.25rem
        }
    .pt-md-1, .py-md-1 {
        padding-top: 0.25rem
        }
    .pr-md-1, .px-md-1 {
        padding-right: 0.25rem
        }
    .pb-md-1, .py-md-1 {
        padding-bottom: 0.25rem
        }
    .pl-md-1, .px-md-1 {
        padding-left: 0.25rem
        }
    .p-md-2 {
        padding: 0.5rem
        }
    .pt-md-2, .py-md-2 {
        padding-top: 0.5rem
        }
    .pr-md-2, .px-md-2 {
        padding-right: 0.5rem
        }
    .pb-md-2, .py-md-2 {
        padding-bottom: 0.5rem
        }
    .pl-md-2, .px-md-2 {
        padding-left: 0.5rem
        }
    .p-md-3 {
        padding: 1rem
        }
    .pt-md-3, .py-md-3 {
        padding-top: 1rem
        }
    .pr-md-3, .px-md-3 {
        padding-right: 1rem
        }
    .pb-md-3, .py-md-3 {
        padding-bottom: 1rem
        }
    .pl-md-3, .px-md-3 {
        padding-left: 1rem
        }
    .p-md-4 {
        padding: 1.5rem
        }
    .pt-md-4, .py-md-4 {
        padding-top: 1.5rem
        }
    .pr-md-4, .px-md-4 {
        padding-right: 1.5rem
        }
    .pb-md-4, .py-md-4 {
        padding-bottom: 1.5rem
        }
    .pl-md-4, .px-md-4 {
        padding-left: 1.5rem
        }
    .p-md-5 {
        padding: 3rem
        }
    .pt-md-5, .py-md-5 {
        padding-top: 3rem
        }
    .pr-md-5, .px-md-5 {
        padding-right: 3rem
        }
    .pb-md-5, .py-md-5 {
        padding-bottom: 3rem
        }
    .pl-md-5, .px-md-5 {
        padding-left: 3rem
        }
    .m-md-n1 {
        margin: -0.25rem
        }
    .mt-md-n1, .my-md-n1 {
        margin-top: -0.25rem
        }
    .mr-md-n1, .mx-md-n1 {
        margin-right: -0.25rem
        }
    .mb-md-n1, .my-md-n1 {
        margin-bottom: -0.25rem
        }
    .ml-md-n1, .mx-md-n1 {
        margin-left: -0.25rem
        }
    .m-md-n2 {
        margin: -0.5rem
        }
    .mt-md-n2, .my-md-n2 {
        margin-top: -0.5rem
        }
    .mr-md-n2, .mx-md-n2 {
        margin-right: -0.5rem
        }
    .mb-md-n2, .my-md-n2 {
        margin-bottom: -0.5rem
        }
    .ml-md-n2, .mx-md-n2 {
        margin-left: -0.5rem
        }
    .m-md-n3 {
        margin: -1rem
        }
    .mt-md-n3, .my-md-n3 {
        margin-top: -1rem
        }
    .mr-md-n3, .mx-md-n3 {
        margin-right: -1rem
        }
    .mb-md-n3, .my-md-n3 {
        margin-bottom: -1rem
        }
    .ml-md-n3, .mx-md-n3 {
        margin-left: -1rem
        }
    .m-md-n4 {
        margin: -1.5rem
        }
    .mt-md-n4, .my-md-n4 {
        margin-top: -1.5rem
        }
    .mr-md-n4, .mx-md-n4 {
        margin-right: -1.5rem
        }
    .mb-md-n4, .my-md-n4 {
        margin-bottom: -1.5rem
        }
    .ml-md-n4, .mx-md-n4 {
        margin-left: -1.5rem
        }
    .m-md-n5 {
        margin: -3rem
        }
    .mt-md-n5, .my-md-n5 {
        margin-top: -3rem
        }
    .mr-md-n5, .mx-md-n5 {
        margin-right: -3rem
        }
    .mb-md-n5, .my-md-n5 {
        margin-bottom: -3rem
        }
    .ml-md-n5, .mx-md-n5 {
        margin-left: -3rem
        }
    .m-md-auto {
        margin: auto
        }
    .mt-md-auto, .my-md-auto {
        margin-top: auto
        }
    .mr-md-auto, .mx-md-auto {
        margin-right: auto
        }
    .mb-md-auto, .my-md-auto {
        margin-bottom: auto
        }
    .ml-md-auto, .mx-md-auto {
        margin-left: auto
        }
    }
@media (min-width: 992px) {
    .m-lg-0 {
        margin: 0
        }
    .mt-lg-0, .my-lg-0 {
        margin-top: 0
        }
    .mr-lg-0, .mx-lg-0 {
        margin-right: 0
        }
    .mb-lg-0, .my-lg-0 {
        margin-bottom: 0
        }
    .ml-lg-0, .mx-lg-0 {
        margin-left: 0
        }
    .m-lg-1 {
        margin: 0.25rem
        }
    .mt-lg-1, .my-lg-1 {
        margin-top: 0.25rem
        }
    .mr-lg-1, .mx-lg-1 {
        margin-right: 0.25rem
        }
    .mb-lg-1, .my-lg-1 {
        margin-bottom: 0.25rem
        }
    .ml-lg-1, .mx-lg-1 {
        margin-left: 0.25rem
        }
    .m-lg-2 {
        margin: 0.5rem
        }
    .mt-lg-2, .my-lg-2 {
        margin-top: 0.5rem
        }
    .mr-lg-2, .mx-lg-2 {
        margin-right: 0.5rem
        }
    .mb-lg-2, .my-lg-2 {
        margin-bottom: 0.5rem
        }
    .ml-lg-2, .mx-lg-2 {
        margin-left: 0.5rem
        }
    .m-lg-3 {
        margin: 1rem
        }
    .mt-lg-3, .my-lg-3 {
        margin-top: 1rem
        }
    .mr-lg-3, .mx-lg-3 {
        margin-right: 1rem
        }
    .mb-lg-3, .my-lg-3 {
        margin-bottom: 1rem
        }
    .ml-lg-3, .mx-lg-3 {
        margin-left: 1rem
        }
    .m-lg-4 {
        margin: 1.5rem
        }
    .mt-lg-4, .my-lg-4 {
        margin-top: 1.5rem
        }
    .mr-lg-4, .mx-lg-4 {
        margin-right: 1.5rem
        }
    .mb-lg-4, .my-lg-4 {
        margin-bottom: 1.5rem
        }
    .ml-lg-4, .mx-lg-4 {
        margin-left: 1.5rem
        }
    .m-lg-5 {
        margin: 3rem
        }
    .mt-lg-5, .my-lg-5 {
        margin-top: 3rem
        }
    .mr-lg-5, .mx-lg-5 {
        margin-right: 3rem
        }
    .mb-lg-5, .my-lg-5 {
        margin-bottom: 3rem
        }
    .ml-lg-5, .mx-lg-5 {
        margin-left: 3rem
        }
    .p-lg-0 {
        padding: 0
        }
    .pt-lg-0, .py-lg-0 {
        padding-top: 0
        }
    .pr-lg-0, .px-lg-0 {
        padding-right: 0
        }
    .pb-lg-0, .py-lg-0 {
        padding-bottom: 0
        }
    .pl-lg-0, .px-lg-0 {
        padding-left: 0
        }
    .p-lg-1 {
        padding: 0.25rem
        }
    .pt-lg-1, .py-lg-1 {
        padding-top: 0.25rem
        }
    .pr-lg-1, .px-lg-1 {
        padding-right: 0.25rem
        }
    .pb-lg-1, .py-lg-1 {
        padding-bottom: 0.25rem
        }
    .pl-lg-1, .px-lg-1 {
        padding-left: 0.25rem
        }
    .p-lg-2 {
        padding: 0.5rem
        }
    .pt-lg-2, .py-lg-2 {
        padding-top: 0.5rem
        }
    .pr-lg-2, .px-lg-2 {
        padding-right: 0.5rem
        }
    .pb-lg-2, .py-lg-2 {
        padding-bottom: 0.5rem
        }
    .pl-lg-2, .px-lg-2 {
        padding-left: 0.5rem
        }
    .p-lg-3 {
        padding: 1rem
        }
    .pt-lg-3, .py-lg-3 {
        padding-top: 1rem
        }
    .pr-lg-3, .px-lg-3 {
        padding-right: 1rem
        }
    .pb-lg-3, .py-lg-3 {
        padding-bottom: 1rem
        }
    .pl-lg-3, .px-lg-3 {
        padding-left: 1rem
        }
    .p-lg-4 {
        padding: 1.5rem
        }
    .pt-lg-4, .py-lg-4 {
        padding-top: 1.5rem
        }
    .pr-lg-4, .px-lg-4 {
        padding-right: 1.5rem
        }
    .pb-lg-4, .py-lg-4 {
        padding-bottom: 1.5rem
        }
    .pl-lg-4, .px-lg-4 {
        padding-left: 1.5rem
        }
    .p-lg-5 {
        padding: 3rem
        }
    .pt-lg-5, .py-lg-5 {
        padding-top: 3rem
        }
    .pr-lg-5, .px-lg-5 {
        padding-right: 3rem
        }
    .pb-lg-5, .py-lg-5 {
        padding-bottom: 3rem
        }
    .pl-lg-5, .px-lg-5 {
        padding-left: 3rem
        }
    .m-lg-n1 {
        margin: -0.25rem
        }
    .mt-lg-n1, .my-lg-n1 {
        margin-top: -0.25rem
        }
    .mr-lg-n1, .mx-lg-n1 {
        margin-right: -0.25rem
        }
    .mb-lg-n1, .my-lg-n1 {
        margin-bottom: -0.25rem
        }
    .ml-lg-n1, .mx-lg-n1 {
        margin-left: -0.25rem
        }
    .m-lg-n2 {
        margin: -0.5rem
        }
    .mt-lg-n2, .my-lg-n2 {
        margin-top: -0.5rem
        }
    .mr-lg-n2, .mx-lg-n2 {
        margin-right: -0.5rem
        }
    .mb-lg-n2, .my-lg-n2 {
        margin-bottom: -0.5rem
        }
    .ml-lg-n2, .mx-lg-n2 {
        margin-left: -0.5rem
        }
    .m-lg-n3 {
        margin: -1rem
        }
    .mt-lg-n3, .my-lg-n3 {
        margin-top: -1rem
        }
    .mr-lg-n3, .mx-lg-n3 {
        margin-right: -1rem
        }
    .mb-lg-n3, .my-lg-n3 {
        margin-bottom: -1rem
        }
    .ml-lg-n3, .mx-lg-n3 {
        margin-left: -1rem
        }
    .m-lg-n4 {
        margin: -1.5rem
        }
    .mt-lg-n4, .my-lg-n4 {
        margin-top: -1.5rem
        }
    .mr-lg-n4, .mx-lg-n4 {
        margin-right: -1.5rem
        }
    .mb-lg-n4, .my-lg-n4 {
        margin-bottom: -1.5rem
        }
    .ml-lg-n4, .mx-lg-n4 {
        margin-left: -1.5rem
        }
    .m-lg-n5 {
        margin: -3rem
        }
    .mt-lg-n5, .my-lg-n5 {
        margin-top: -3rem
        }
    .mr-lg-n5, .mx-lg-n5 {
        margin-right: -3rem
        }
    .mb-lg-n5, .my-lg-n5 {
        margin-bottom: -3rem
        }
    .ml-lg-n5, .mx-lg-n5 {
        margin-left: -3rem
        }
    .m-lg-auto {
        margin: auto
        }
    .mt-lg-auto, .my-lg-auto {
        margin-top: auto
        }
    .mr-lg-auto, .mx-lg-auto {
        margin-right: auto
        }
    .mb-lg-auto, .my-lg-auto {
        margin-bottom: auto
        }
    .ml-lg-auto, .mx-lg-auto {
        margin-left: auto
        }
    }
@media (min-width: 1200px) {
    .m-xl-0 {
        margin: 0
        }
    .mt-xl-0, .my-xl-0 {
        margin-top: 0
        }
    .mr-xl-0, .mx-xl-0 {
        margin-right: 0
        }
    .mb-xl-0, .my-xl-0 {
        margin-bottom: 0
        }
    .ml-xl-0, .mx-xl-0 {
        margin-left: 0
        }
    .m-xl-1 {
        margin: 0.25rem
        }
    .mt-xl-1, .my-xl-1 {
        margin-top: 0.25rem
        }
    .mr-xl-1, .mx-xl-1 {
        margin-right: 0.25rem
        }
    .mb-xl-1, .my-xl-1 {
        margin-bottom: 0.25rem
        }
    .ml-xl-1, .mx-xl-1 {
        margin-left: 0.25rem
        }
    .m-xl-2 {
        margin: 0.5rem
        }
    .mt-xl-2, .my-xl-2 {
        margin-top: 0.5rem
        }
    .mr-xl-2, .mx-xl-2 {
        margin-right: 0.5rem
        }
    .mb-xl-2, .my-xl-2 {
        margin-bottom: 0.5rem
        }
    .ml-xl-2, .mx-xl-2 {
        margin-left: 0.5rem
        }
    .m-xl-3 {
        margin: 1rem
        }
    .mt-xl-3, .my-xl-3 {
        margin-top: 1rem
        }
    .mr-xl-3, .mx-xl-3 {
        margin-right: 1rem
        }
    .mb-xl-3, .my-xl-3 {
        margin-bottom: 1rem
        }
    .ml-xl-3, .mx-xl-3 {
        margin-left: 1rem
        }
    .m-xl-4 {
        margin: 1.5rem
        }
    .mt-xl-4, .my-xl-4 {
        margin-top: 1.5rem
        }
    .mr-xl-4, .mx-xl-4 {
        margin-right: 1.5rem
        }
    .mb-xl-4, .my-xl-4 {
        margin-bottom: 1.5rem
        }
    .ml-xl-4, .mx-xl-4 {
        margin-left: 1.5rem
        }
    .m-xl-5 {
        margin: 3rem
        }
    .mt-xl-5, .my-xl-5 {
        margin-top: 3rem
        }
    .mr-xl-5, .mx-xl-5 {
        margin-right: 3rem
        }
    .mb-xl-5, .my-xl-5 {
        margin-bottom: 3rem
        }
    .ml-xl-5, .mx-xl-5 {
        margin-left: 3rem
        }
    .p-xl-0 {
        padding: 0
        }
    .pt-xl-0, .py-xl-0 {
        padding-top: 0
        }
    .pr-xl-0, .px-xl-0 {
        padding-right: 0
        }
    .pb-xl-0, .py-xl-0 {
        padding-bottom: 0
        }
    .pl-xl-0, .px-xl-0 {
        padding-left: 0
        }
    .p-xl-1 {
        padding: 0.25rem
        }
    .pt-xl-1, .py-xl-1 {
        padding-top: 0.25rem
        }
    .pr-xl-1, .px-xl-1 {
        padding-right: 0.25rem
        }
    .pb-xl-1, .py-xl-1 {
        padding-bottom: 0.25rem
        }
    .pl-xl-1, .px-xl-1 {
        padding-left: 0.25rem
        }
    .p-xl-2 {
        padding: 0.5rem
        }
    .pt-xl-2, .py-xl-2 {
        padding-top: 0.5rem
        }
    .pr-xl-2, .px-xl-2 {
        padding-right: 0.5rem
        }
    .pb-xl-2, .py-xl-2 {
        padding-bottom: 0.5rem
        }
    .pl-xl-2, .px-xl-2 {
        padding-left: 0.5rem
        }
    .p-xl-3 {
        padding: 1rem
        }
    .pt-xl-3, .py-xl-3 {
        padding-top: 1rem
        }
    .pr-xl-3, .px-xl-3 {
        padding-right: 1rem
        }
    .pb-xl-3, .py-xl-3 {
        padding-bottom: 1rem
        }
    .pl-xl-3, .px-xl-3 {
        padding-left: 1rem
        }
    .p-xl-4 {
        padding: 1.5rem
        }
    .pt-xl-4, .py-xl-4 {
        padding-top: 1.5rem
        }
    .pr-xl-4, .px-xl-4 {
        padding-right: 1.5rem
        }
    .pb-xl-4, .py-xl-4 {
        padding-bottom: 1.5rem
        }
    .pl-xl-4, .px-xl-4 {
        padding-left: 1.5rem
        }
    .p-xl-5 {
        padding: 3rem
        }
    .pt-xl-5, .py-xl-5 {
        padding-top: 3rem
        }
    .pr-xl-5, .px-xl-5 {
        padding-right: 3rem
        }
    .pb-xl-5, .py-xl-5 {
        padding-bottom: 3rem
        }
    .pl-xl-5, .px-xl-5 {
        padding-left: 3rem
        }
    .m-xl-n1 {
        margin: -0.25rem
        }
    .mt-xl-n1, .my-xl-n1 {
        margin-top: -0.25rem
        }
    .mr-xl-n1, .mx-xl-n1 {
        margin-right: -0.25rem
        }
    .mb-xl-n1, .my-xl-n1 {
        margin-bottom: -0.25rem
        }
    .ml-xl-n1, .mx-xl-n1 {
        margin-left: -0.25rem
        }
    .m-xl-n2 {
        margin: -0.5rem
        }
    .mt-xl-n2, .my-xl-n2 {
        margin-top: -0.5rem
        }
    .mr-xl-n2, .mx-xl-n2 {
        margin-right: -0.5rem
        }
    .mb-xl-n2, .my-xl-n2 {
        margin-bottom: -0.5rem
        }
    .ml-xl-n2, .mx-xl-n2 {
        margin-left: -0.5rem
        }
    .m-xl-n3 {
        margin: -1rem
        }
    .mt-xl-n3, .my-xl-n3 {
        margin-top: -1rem
        }
    .mr-xl-n3, .mx-xl-n3 {
        margin-right: -1rem
        }
    .mb-xl-n3, .my-xl-n3 {
        margin-bottom: -1rem
        }
    .ml-xl-n3, .mx-xl-n3 {
        margin-left: -1rem
        }
    .m-xl-n4 {
        margin: -1.5rem
        }
    .mt-xl-n4, .my-xl-n4 {
        margin-top: -1.5rem
        }
    .mr-xl-n4, .mx-xl-n4 {
        margin-right: -1.5rem
        }
    .mb-xl-n4, .my-xl-n4 {
        margin-bottom: -1.5rem
        }
    .ml-xl-n4, .mx-xl-n4 {
        margin-left: -1.5rem
        }
    .m-xl-n5 {
        margin: -3rem
        }
    .mt-xl-n5, .my-xl-n5 {
        margin-top: -3rem
        }
    .mr-xl-n5, .mx-xl-n5 {
        margin-right: -3rem
        }
    .mb-xl-n5, .my-xl-n5 {
        margin-bottom: -3rem
        }
    .ml-xl-n5, .mx-xl-n5 {
        margin-left: -3rem
        }
    .m-xl-auto {
        margin: auto
        }
    .mt-xl-auto, .my-xl-auto {
        margin-top: auto
        }
    .mr-xl-auto, .mx-xl-auto {
        margin-right: auto
        }
    .mb-xl-auto, .my-xl-auto {
        margin-bottom: auto
        }
    .ml-xl-auto, .mx-xl-auto {
        margin-left: auto
        }
    }
.stretched-link::after {position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;pointer-events:auto;content:"";background-color:rgba(0, 0, 0, 0)}
@media (min-width: 576px) {
    .text-sm-left {
        text-align: left
        }
    .text-sm-right {
        text-align: right
        }
    .text-sm-center {
        text-align: center
        }
    }
@media (min-width: 768px) {
    .text-md-left {
        text-align: left
        }
    .text-md-right {
        text-align: right
        }
    .text-md-center {
        text-align: center
        }
    }
@media (min-width: 992px) {
    .text-lg-left {
        text-align: left
        }
    .text-lg-right {
        text-align: right
        }
    .text-lg-center {
        text-align: center
        }
    }
@media (min-width: 1200px) {
    .text-xl-left {
        text-align: left
        }
    .text-xl-right {
        text-align: right
        }
    .text-xl-center {
        text-align: center
        }
    }
a.text-primary:focus {color:#0056b3}
a.text-primary:hover {color:#0056b3}
a.text-secondary:focus {color:#494f54}
a.text-secondary:hover {color:#494f54}
a.text-success:focus {color:#19692c}
a.text-success:hover {color:#19692c}
a.text-info:focus {color:#0f6674}
a.text-info:hover {color:#0f6674}
a.text-warning:focus {color:#ba8b00}
a.text-warning:hover {color:#ba8b00}
a.text-danger:focus {color:#a71d2a}
a.text-danger:hover {color:#a71d2a}
a.text-light:focus {color:#cbd3da}
a.text-light:hover {color:#cbd3da}
a.text-dark:focus {color:#121416}
a.text-dark:hover {color:#121416}
@media print {
    *, ::after, ::before {
        text-shadow: none;
        box-shadow: none
        }
    a:not(.btn) {
        text-decoration: underline
        }
    abbr[title]::after {
        content: " (" attr(title) ")"
        }
    pre {
        white-space: pre-wrap
        }
    blockquote, pre {
        border: 1px solid #adb5bd;
        page-break-inside: avoid
        }
    img, tr {
        page-break-inside: avoid
        }
    h2, h3, p {
        orphans: 3;
        widows: 3
        }
    h2, h3 {
        page-break-after: avoid
        }
    @page {
        size: a3
        }
    body {
        min-width: 992px
        }
    .container {
        min-width: 992px
        }
    .navbar {
        display: none
        }
    .badge {
        border: 1px solid #000
        }
    .table {
        border-collapse: collapse
        }
    .table td, .table th {
        background-color: #fff
        }
    .table-bordered td, .table-bordered th {
        border: 1px solid #dee2e6
        }
    .table-dark {
        color: inherit
        }
    .table-dark tbody + tbody, .table-dark td, .table-dark th, .table-dark thead th {
        border-color: #dee2e6
        }
    .table .thead-dark th {
        color: inherit;
        border-color: #dee2e6
        }
    }</style></head>
<body style='background-color:#fff; color:#212529; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size:1rem; font-weight:400; line-height:1.5; margin:0; text-align:left' bgcolor="#ffffff" align="left">
<p style="margin-bottom:1rem; margin-top:0"><!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->
    
    </p>
    <div class="d-flex justify-content-center mt-2" style="display:flex; -ms-flex-pack:center; justify-content:center; margin-top:0.5rem">
   <!-- php: = $this->Html->Image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 50px', 'fullBase' => true]) -->
</div>
<h3 class="text-center pb-4 pt-3" style="margin-bottom:0.5rem; margin-top:0; font-weight:500; line-height:1.2; font-size:1.75rem; padding-top:1rem; padding-bottom:1.5rem; text-align:center" align="center"><!-- php: = $data['facility'] --></h3>
    <div style="margin-left:auto; margin-right:auto; padding-left:15px; padding-right:15px; width:50%; margin-bottom:0; margin-top:3rem; padding:1rem; background-color:#e44f56" class="container-fluid p-3 mt-5 w-50 mb-0" width="50%" bgcolor="#e44f56">
            <h3 class="text-center text-slate-900" style="margin-bottom:0.5rem; margin-top:0; font-weight:500; line-height:1.2; font-size:1.75rem; text-align:center; color:#fff" align="center">Transaction Receipt</h3>
    </div>
    <div class="container-fluid mt-0 bg-light w-50 p-3" style="margin-left:auto; margin-right:auto; padding-left:15px; padding-right:15px; width:50%; background-color:#f8f9fa; margin-top:0; padding:1rem" width="50%" bgcolor="#f8f9fa">
        
        <div style="display:flex!important; align-items:center;margin-top:10px; white-space: nowrap;">
<h6 class="my-0 mr-2" style="margin-bottom:0; margin-top:0; font-weight:500; line-height:1.2; font-size:1rem; margin-right:0.5rem">TRANSACTION DATE: </h6><!-- php: = $data['transaction_date'] --></div>
        <div style="display:flex!important; align-items:center;margin-top:20px; white-space: nowrap;">
<h6 class="my-0 mr-2" style="margin-bottom:0; margin-top:0; font-weight:500; line-height:1.2; font-size:1rem; margin-right:0.5rem">TRANSACTION #: </h6><!-- php: = $data['transaction_id'] --></div>
        <div style="display:flex!important; align-items:center;margin-top:20px; white-space: nowrap;">
<h6 class="my-0 mr-2" style="margin-bottom:0; margin-top:0; font-weight:500; line-height:1.2; font-size:1rem; margin-right:0.5rem">PAYER NAME: </h6><!-- php: = $data['payer_name'] --></div>
        <div style="display:flex!important; align-items:center;margin-top:20px; white-space: nowrap;">
<h6 class="my-0 mr-2" style="margin-bottom:0; margin-top:0; font-weight:500; line-height:1.2; font-size:1rem; margin-right:0.5rem">AMOUNT: </h6><!-- php: = $data['amount'] --></div>
   
        <!-- <h6 class="font-weight-bold text-center mt-5" style="margin-bottom:0.5rem; margin-top:3rem; font-weight:700; line-height:1.2; font-size:1rem; text-align:center" align="center">Disclaimer</h6> -->
        <!-- <p class="mt-2" style="margin-bottom:1rem; margin-top:0.5rem">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident dignissimos dolores architecto esse autem, expedita corrupti ullam, nulla unde voluptate fugiat ad quasi vel adipisci consectetur corporis hic rerum quae.
        </p> -->
        <!-- <h6 class="mt-5" style="margin-bottom:0.5rem; margin-top:3rem; font-weight:500; line-height:1.2; font-size:1rem">For any queries contact </h6>
        <p style="margin-bottom:1rem; margin-top:0">+233 0000 000 00<br>+233 0000 000 00<br>
        test@mail.com</p> -->
   
    </div>

    <h6 class="mt-4 text-center" style="margin-bottom:0.5rem; margin-top:1.5rem; font-weight:500; line-height:1.2; font-size:1rem; text-align:center" align="center">Powered by Firstline24 Health Technologies</h6>
    
</body>
</html>
`;

export default function EmailHtmlReceiptPage() {
  return (
    <PageShell title="email/html/receipt.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
