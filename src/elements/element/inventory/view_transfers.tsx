const rawHtml = `
<div class="card  card-box">
        <div class="card-head">
            <header>View Transfers</header>
        </div>
        <div class="card-body ">
            <div class="row">
                <div class="borderBox light bordered col-md-12">
                    <div class="borderBox-body">
                        <div class="tab-content">
                        <div class="row d-none">
                        <div class="col-md-2 pr-3">
                            <div class="form-group">
                                <label>Filter:</label>
                                <SearchableSelectField name="" id="date-filter2" class="form-control">
                                    <option value="today">Today</option>
                                    <option value="this-week">This Week</option>
                                    <option value="this-month">This Month</option>
                                    <option value="custom">Custom</option>
                                </SearchableSelectField>

                                <div class="d-none" id="custom-date-range-container2">
                                    <div id="range2"></div>
                                    <label>
                                        Start
                                        <input id="start2" mbsc-input placeholder="Please select..." />
                                    </label>
                                    <label>
                                        End
                                        <input id="end2" mbsc-input placeholder="Please select..." />
                                    </label>
                                </div>
                            </div>
                        </div>
                       

                        <div class="col-md-4 d-flex align-start">
                           
                            <div class="form-group col-md-6">
                                <label>Sort By:</label>
                                <div class="d-flex align-items-start">
                                    <SearchableSelectField name="" id="" class="form-control">

                                    </SearchableSelectField>
                                    <button id="go-btn" type="submit" class="btn btn-sm btn-primary">Go</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="table-responsive">
                        <table id="view-transfer-table" class="table table-hover order-column full-width" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Item Name/ID</th>
                                    <th>Batch No. (Exp)</th>
                                    <th>VSP Name</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Transferred Quantity</th>
                                    <th>Total Cost Price</th>
                                    <th>Total Selling Price</th>
                                    <th>Actions</th>
                                </tr>
                                
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->

<script>
    // $('#view-transfer-table').DataTable();

    $('#date-filter2').on('change', function(e){
        if(e.target.value == 'custom'){
            $('#custom-date-range-container2').removeClass('d-none')
        } else {
            $('#custom-date-range-container2').addClass('d-none')
 
        }
    })

    function getAllTransfers() {
        $('#view-transfer-table').DataTable({
            "ordering": false,
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'filterTransfers',]) -->",
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.item_store?.item?.full_name}<br/> <small class="text-secondary">\${ row?.item_store?.item?.item_code || ''}</small>\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.item_store?.batch_number }<br/> <small class="text-primary">(\${ new Date(row?.item_store?.expiry_date).toDateString() })</small>\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.item_store?.supplier?.name}\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`Stock\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.department?.name}\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`<span class="text-primary">\${ row?.transfer_quantity }</span>\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.transfer_quantity * row?.item_store?.unit_cost_price }\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.transfer_quantity * row?.item_store?.unit_selling_price } <b>(\${ ((row?.item_store?.unit_selling_price - row?.item_store?.unit_cost_price) / row?.item_store?.unit_cost_price ) * 100 }%)\`
                    }
                },
                {
                    data: "",
                    render: function (data, type, row) {
                        return \`\${ row?.transfer_quantity * row?.item_store?.unit_selling_price } <b>(\${ ((row?.item_store?.unit_selling_price - row?.item_store?.unit_cost_price) / row?.item_store?.unit_cost_price ) * 100 }%)\`
                    }
                },

            ]
        });
    }
    getAllTransfers()
    mobiscroll.datepicker('#range2', {
    controls: ['datetime'],
    select: 'range',
    startInput: '#start2',
    endInput: '#end2',
    touchUi: true
});
</script>
`;

export default function ElementElementInventoryViewTransfers() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
