const rawHtml = `
<style>
    .lightblue 
	{
		background-color:#51aff124;
	}
</style>
<script>
    function SumInvoiceItem(val, ttl_input){
        var sum = 0
       sum +=val;
    }
</script>
<div class="container px-5 mt-5">
    <h4 class="mt-2">Filter Invoice</h4>
    <div class="row">
        <div class="col-md-5">
            <div class="form-group">
                <input id="searchInvoice" type="text" placeholder="Search by Invoice number or Patient Name"
                    class="form-control mt-2 p-3">
            </div>
        </div>
        <div class="col-md-5">
            <div class="form-group">
                <input id="searchInvoiceDate" type="date" class="form-control mt-2 p-3">
            </div>
        </div>
        <div class="col-md-2 d-flex align-items-center">
            <button onclick="getInvoice()" class="btn btn-primary p-3">Search Invoices</button>
        </div>
    </div>
    <div class="mt-3" id="accordion">
       
    </div>
</div>
<div class="modal fade" id="addInvoiceModal" tabindex="-1" aria-labelledby="addInvoiceModal" aria-hidden="true" aria-hidden="true">
    <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-danger">
                <div class="container-fluid pr-0 bg-danger">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Add Invoice</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <div class="container bg-white p-2">
                    <div class="container">
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    var checkedItemsArray = []; // Array to store checked items

    $("#payment_mode_id").on("change", function(){
        let option = $(this).val();
        if(option == 2 || option == 3){
            $("#ref_div").removeClass("d-none");
        } else {
            $("#ref_div").addClass("d-none");
        }
    })

    $("#searchInvoice").on("change", function(){
      $.ajax({

      });
    })

    function calculateTotal(invoiceId, invoice_number) 
    {
        var total = 0;

        // tterate through all refund_total inputs
        $('[id^="refund_total_"]').each(function() {
            var value = parseFloat($(this).val()) || 0;
            total += value;
        });

        // update the total at the bottom of the table
        $(\`#totalRefund_\${invoice_number}\`).text('Total Refund: ' + total.toFixed(2));

        // update the "Amount to refund" field in the refund form
        // $('#amount_' + invoiceId).val(total.toFixed(2));
        amountField = $(\`#amount_\${invoice_number}\`);
        amountField.val(total.toFixed(2));
    }

    function addVal(checkbox, uniqueSuffix, unitCost, invoiceId, itemId, itemTypeId, invoice_number) 
    {
        // get the values of refund_quantity and refund_total inputs
        var refundQuantityInput = $('#refund_quantity_' + uniqueSuffix);
        var refundTotalInput = $('#refund_total_' + uniqueSuffix);

        // get the refund quantity value
        var refundQuantity = parseFloat(refundQuantityInput.val()) || 0;

        var trElement = $(checkbox).closest('tr');
        var item = {
            'item_id': itemId,
            'item_name': trElement.find('[name^="item_name_' + uniqueSuffix + '"]').val(),
            'item_type_id': itemTypeId,
            'unit_cost': unitCost,
            'quantity': parseFloat(trElement.find('[name^="quantity_' + uniqueSuffix + '"]').val()) || 0,
            'refund_quantity': refundQuantity || 0,
            'refund_total': parseFloat(refundQuantity * unitCost)
        };

        // check if the refund quantity is greater than 0
        if (refundQuantity <= 0) {
            alertify.error("Refund quantity must be greater than 0");
            checkbox.checked = false; // Uncheck the checkbox
            return;
        }

        // get the quantity value
        var quantity = parseFloat($('#quantity_' + uniqueSuffix).val()) || 0;

        // check if the checkbox is checked
        if (checkbox.checked) {
            checkedItemsArray.push(item);
            // validate that refund quantity is not greater than quantity
            if (refundQuantity > quantity) {
                alertify.error("Refund quantity cannot be greater than the original quantity");
                checkbox.checked = false; // Uncheck the checkbox
                return;
            }

            // calculate the refund total
            var refundTotal = unitCost * refundQuantity;

            // update the refund total input value
            refundTotalInput.val(refundTotal.toFixed(2));
        } else {
            checkedItemsArray = checkedItemsArray.filter(existingItem => existingItem.item_id !== item.item_id);
            // if the checkbox is unchecked, set values to 0
            refundQuantityInput.val('0');
            refundTotalInput.val('0');
        }
        calculateTotal(invoiceId, invoice_number);
    }


    function getInvoice()
    {
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Cash', 'action' => 'getInvoiceData']) -->',
            type: 'POST',
            data: {
                name: $("#searchInvoice").val(),
                date: ''
            },
            beforeSend: function(){
                $("#accordion").html("<h4 class='text-center mt-5'>Loading..</h4>");
            },
            success: function(res){
                $("#accordion").html(res);
            },
            error: function(){

            }
        });
    }
</script>
`;

export default function ElementElementCashAddRefund() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
