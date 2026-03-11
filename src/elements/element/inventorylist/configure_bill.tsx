const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css">

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

#msform input[type="text"],#msform select
 {
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
    width: 20%!important;
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
.invoice-table-header-green 
{
    border:2px solid #27ae60;
    border-radius:15px;
}
.invoice-table-header-yellow
{
    border:2px solid #f9ca24;
    border-radius:15px;
}
.due-date 
{
    color: darkorange;
}
.form-check-label {
    margin-right: 20px;
}

.bxn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 2px 9px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
}
#file-chosen{
  margin-left: 0.3rem;
}

.firstline-table .table .thead-dark th {
    color: black;
    background-color: #e7505a!important;
    border-color: #e7505a!important;
    padding: 5px!important;
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
                    <a href="#create_invoice" data-toggle="tab"> Create</a>
                </li>

                <li class="nav-item">
                    <a href="#pending_invoice" data-toggle="tab"> View</a>
                </li>
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="create_invoice">
                    <!-- <h4>Add a new Invoice</h4> -->

                    <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container-fluid text-center p-3 mt-3 mb-2">
                                
                                <div class="card px-5 pt-4 pb-0 mt-1 mb-3"></div>
                            </div>
                        </div>
                    </div>

                </div>
              
            
                <div class="tab-pane" id="pending_invoice">
                   
                    <div class="card mt-3 card-box"></div>

                </div>
            </div>
        </div>

    </div>
</div>
<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>

<script>

</script>

`;

export default function ElementElementInventorylistConfigureBill() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
