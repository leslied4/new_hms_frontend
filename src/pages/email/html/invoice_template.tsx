import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/email/html/invoice_template.php';
const rawHtml = `
<div style="margin-left:auto; margin-right:auto; padding-left:15px; padding-right:15px; width:100%;padding:1rem;background-color:#f8f9fa!important;" class="container-fluid p-3 bg-light" width="100%">

<div class="row" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px">
    <div class="col-md-2 p-3" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:1rem" width="100%">
        <h6 class="text-secondary p-0 m-0" style="margin-bottom:0.5rem; margin-top:0; color:#6c757d; font-family:inherit; font-weight:500; line-height:1.2; font-size:1rem; margin:0; padding:0"> Invoice #</h6>
        <h5 id="appr-invoice-num" class="p-0 m-0" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:500; line-height:1.2; font-size:1.25rem; margin:0; padding:0"><!-- php: = $data['invoice_number'] --></h5>
    </div>
    <div class="col-md-2 p-3" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:1rem" width="100%">
        <h6 class="text-secondary p-0 m-0" style="margin-bottom:0.5rem; margin-top:0; color:#6c757d; font-family:inherit; font-weight:500; line-height:1.2; font-size:1rem; margin:0; padding:0"> Due Date</h6>
        <h5 id="appr-due-date" class="p-0 m-0" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:500; line-height:1.2; font-size:1.25rem; margin:0; padding:0"><!-- php: = $data['due_date'] --></h5>
    </div>
    <div class="col-md-2 p-3" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:1rem" width="100%">
    </div>
    <div class="col-md-4 p-3" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:1rem" width="100%">
        <button class="btn bg-white btn-sm" style="border-radius:0.2rem; font-family:inherit; font-size:0.875rem; line-height:1.5; margin:0; overflow:visible; text-transform:none; -webkit-appearance:button; -moz-user-select:none; -ms-user-select:none; -webkit-user-select:none; border:1px solid transparent; display:inline-block; font-weight:400; padding:0.25rem 0.5rem; text-align:center; transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; user-select:none; vertical-align:middle; white-space:nowrap; background-color:#fff" align="center" valign="middle" bgcolor="#ffffff">
            <i class="fa fa-print fa-2x"></i>
        </button> 
        <button class="btn bg-white btn-sm" style="border-radius:0.2rem; font-family:inherit; font-size:0.875rem; line-height:1.5; margin:0; overflow:visible; text-transform:none; -webkit-appearance:button; -moz-user-select:none; -ms-user-select:none; -webkit-user-select:none; border:1px solid transparent; display:inline-block; font-weight:400; padding:0.25rem 0.5rem; text-align:center; transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; user-select:none; vertical-align:middle; white-space:nowrap; background-color:#fff" align="center" valign="middle" bgcolor="#ffffff">
            <i class="fa fa-download fa-2x"></i>
        </button> 
        <a href="<!-- php: = $data['url'] -->" style="-webkit-text-decoration-skip:objects; background-color:transparent; color:#007bff; text-decoration:none"><button class="btn btn-danger" style="border-radius:0.25rem; font-family:inherit; font-size:1rem; line-height:1.5; margin:0; overflow:visible; text-transform:none; -webkit-appearance:button; -moz-user-select:none; -ms-user-select:none; -webkit-user-select:none; border:1px solid transparent; display:inline-block; font-weight:400; padding:0.375rem 0.75rem; text-align:center; transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; user-select:none; vertical-align:middle; white-space:nowrap; background-color:#dc3545; border-color:#dc3545; color:#fff" align="center" valign="middle" bgcolor="#dc3545">Pay Now</button></a>
    </div>
</div>
</div>
<div class="container p-5 mt-4 card p-3" style="border:1px solid rgba(0, 0, 0, 0.125); position:relative; z-index:0; margin-left:auto; margin-right:auto; padding-left:15px; padding-right:15px; width:80%; -ms-flex-direction:column; background-clip:border-box; background-color:#fff; border-radius:0.25rem; display:flex; flex-direction:column; min-width:0; word-wrap:break-word; margin-top:1.5rem; padding:3rem" width="100%" bgcolor="#ffffff">
<div class="container-fluid" style="margin-left:auto; margin-right:auto; padding-left:15px; padding-right:15px; width:100%" width="100%">
    <div class="row" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px">
        <div class="col-md-6 p-2 text-left" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:0.5rem; text-align:left" width="100%" align="left">
            <p id="appr-address" style="margin-bottom:1rem; margin-top:24px">
            <!-- php: = $data['address'] -->

            </p>

        </div>
        <div class="col-md-6 p-2 text-right" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:0.5rem; text-align:right" width="100%" align="right">
            <h2 class="font-weight-bold mb-1" style="margin-bottom:0.25rem; margin-top:0; color:inherit; font-family:inherit; font-weight:700; line-height:1.2; font-size:2rem">Invoice</h2>
            <h5 id="appr-invoice-num2" class="font-weight-bold" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:700; line-height:1.2; font-size:1.25rem"># <!-- php: = $data['invoice_number'] --></h5>
        </div>
    </div>
    <div class="row mt-5" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px; margin-top:3rem">
        <div class="col-md-8 p-2 text-left" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:0.5rem; text-align:left" width="100%" align="left">
            <h5 style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:500; line-height:1.2; font-size:1.25rem">Bill To</h5>
            <h5 id="appr-name" class="font-weight-bold" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:700; line-height:1.2; font-size:1.25rem"><!-- php: = $data['payer_name'] --></h5>
            <h5 id="appr-email" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:500; line-height:1.2; font-size:1.25rem"><!-- php: = $data['email'] --></h5>

        </div>
        <div class="col-md-4 p-2 text-right" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:0.5rem; text-align:right" width="100%" align="right">
            <div class="container" style="margin-left:auto; margin-right:auto; padding-left:15px; padding-right:15px; width:100%" width="100%">
                <div class="row" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px">
                    <div class="col-md-6 text-left" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; text-align:left" width="100%" align="left">
                        <h5 style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:bold; line-height:1.2; font-size:1.25rem">Invoice Date:</h5>
                    </div>
                    <div class="col-md-6 pr-0" style="min-height:1px; padding-left:15px; padding-right:0; position:relative; width:100%" width="100%">
                        <h5 id="appr-date" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:500; line-height:1.2; font-size:1.25rem"><!-- php: = $data['invoice_date'] --></h5>
                    </div>
                </div>
                <!-- <div class="row mt-2">
                       <div class="col-md-6 text-left">
                           <h5 style="font-weight:bold">Terms:</h5>
                       </div>
                       <div class="col-md-6 pr-0">
                           <h5 style="">Due On Receipt</h5>
                       </div>
                   </div> -->
                <div class="row mt-2" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px; margin-top:0.5rem">
                    <div class="col-md-6 text-left" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; text-align:left" width="100%" align="left">
                        <h5 style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:bold; line-height:1.2; font-size:1.25rem">Due Date:</h5>
                    </div>
                    <div class="col-md-6 pr-0" style="min-height:1px; padding-left:15px; padding-right:0; position:relative; width:100%" width="100%">
                        <h5 id="appr-due-date2" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:500; line-height:1.2; font-size:1.25rem"><!-- php: = $data['due_date'] --></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="firstline-table container-fluid mt-5 px-0 py-3" style="margin-left:auto; margin-right:auto; padding-left:0; padding-right:0; width:100%; margin-top:3rem; padding-top:1rem; padding-bottom:1rem" width="100%">
        <table class="table table-hover" style="border-collapse:collapse; background-color:transparent; margin-bottom:1rem; max-width:100%; width:100%" width="100%">
            <thead class="thead-dark">
                <tr>
                    <th style="text-align:inherit; border-top:1px solid #dee2e6; padding:5px; vertical-align:bottom; border-bottom:2px solid #dee2e6; background-color:#e7505a; border-color:#e7505a; color:black" align="inherit" valign="bottom" bgcolor="#e7505a">#</th>
                    <th style="text-align:inherit; border-top:1px solid #dee2e6; padding:5px; vertical-align:bottom; border-bottom:2px solid #dee2e6; background-color:#e7505a; border-color:#e7505a; color:black" align="inherit" valign="bottom" bgcolor="#e7505a">Items Description</th>
                    <th style="text-align:inherit; border-top:1px solid #dee2e6; padding:5px; vertical-align:bottom; border-bottom:2px solid #dee2e6; background-color:#e7505a; border-color:#e7505a; color:black" align="inherit" valign="bottom" bgcolor="#e7505a">Quantity</th>
                    <th style="text-align:inherit; border-top:1px solid #dee2e6; padding:5px; vertical-align:bottom; border-bottom:2px solid #dee2e6; background-color:#e7505a; border-color:#e7505a; color:black" align="inherit" valign="bottom" bgcolor="#e7505a">Unit Cost</th>
                    <th style="text-align:inherit; border-top:1px solid #dee2e6; padding:5px; vertical-align:bottom; border-bottom:2px solid #dee2e6; background-color:#e7505a; border-color:#e7505a; color:black" align="inherit" valign="bottom" bgcolor="#e7505a">Discount</th>
                    <th style="text-align:inherit; border-top:1px solid #dee2e6; padding:5px; vertical-align:bottom; border-bottom:2px solid #dee2e6; background-color:#e7505a; border-color:#e7505a; color:black" align="inherit" valign="bottom" bgcolor="#e7505a">Amount</th>
                </tr>
            </thead>
            <tbody id="appr_items_table">
                <!-- php: $item_count = 1; $total = 0; -->
                <!-- php: foreach($data['items'] as $item){ -->
                    <tr>
                        <td style="border-top:1px solid #dee2e6; padding:0.75rem; vertical-align:top" valign="top"><!-- php: = $item_count --></td>
                        <td style="border-top:1px solid #dee2e6; padding:0.75rem; vertical-align:top" valign="top"><!-- php: = $item['item_name'] --></td>
                        <td style="border-top:1px solid #dee2e6; padding:0.75rem; vertical-align:top" valign="top"><!-- php: = $item['qty'] --></td>
                        <td style="border-top:1px solid #dee2e6; padding:0.75rem; vertical-align:top" valign="top"><!-- php: = $item['rate'] --></td>
                        <td style="border-top:1px solid #dee2e6; padding:0.75rem; vertical-align:top" valign="top"><!-- php: = $item['discount'] --></td>
                        <td style="border-top:1px solid #dee2e6; padding:0.75rem; vertical-align:top" valign="top"><!-- php: = $item['amount'] --></td>
                    </tr>
                <!-- php: $item_count++; $total+=$item['amount']; } -->
            </tbody>
        </table>
        <div class="row mt-4" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px; margin-top:1.5rem">
            <div class="col-md-8 p-3" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:1rem" width="100%"></div>
            <div class="col-md-4 p-3" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; padding:1rem" width="100%">
                <div class="row" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px">
                    <div class="col-md-6 text-left" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; text-align:left" width="100%" align="left">
                        <h5 class="font-weight-bold" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:700; line-height:1.2; font-size:1.25rem">Sub Total</h5>
                    </div>
                    <div class="col-md-6" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%" width="100%">
                        <h5 id="appr-sub-total" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:500; line-height:1.2; font-size:1.25rem"><!-- php: = $total --></h5>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-md-6 text-left"> <h5 class="font-weight-bold">Sub Tax</h5> </div>
                    <div class="col-md-6"> <h5 id="appr-sub-tax" >0</h5> </div>
                </div>
                <div class="row">
                    <div class="col-md-6 text-left"> <h5 class="font-weight-bold">Sub Discount</h5> </div>
                    <div  class="col-md-6"> <h5 id="appr-sub-discount">0</h5> </div>
                </div> -->
                <div class="row" style="-ms-flex-wrap:wrap; display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px">
                    <div class="col-md-6 text-left" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%; text-align:left" width="100%" align="left">
                        <h5 class="font-weight-bold" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:700; line-height:1.2; font-size:1.25rem">Total</h5>
                    </div>
                    <div class="col-md-6" style="min-height:1px; padding-left:15px; padding-right:15px; position:relative; width:100%" width="100%">
                        <h5 id="appr-total" class="font-weight-bold" style="margin-bottom:0.5rem; margin-top:0; color:inherit; font-family:inherit; font-weight:700; line-height:1.2; font-size:1.25rem"><!-- php: = $total --></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
`;

export default function EmailHtmlInvoiceTemplatePage() {
  return (
    <PageShell title="email/html/invoice_template.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
