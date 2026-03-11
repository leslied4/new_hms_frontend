const rawHtml = `
<!-- <div class="card card-topline-<!-- php: = $theme1 -->">

    <div class="card  card-box">
        <div class="card-head">
            <header>Manage Refunds</header>
        </div>
        <div class="card-body"> -->
            <div class="row">

                <div class="borderBox light bordered col-md-12">

                    <div class="borderBox-title tabbable-line">
                        <div class="caption">
                            <!-- <span class="caption-subject font-dark bold uppercase">Time Slot</span> -->
                        </div>
                        <ul class="nav nav-tabs"  id="manageRefundTabs">
                            <li class="nav-item">
                                <a href="#add_refund" data-toggle="tab"> Add </a>
                            </li>
                            <li class="nav-item">
                                <a href="#view_refunds" data-toggle="tab"> View </a>
                            </li>
                        </ul>
                    </div>
                    <div class="borderBox-body">
                        <div class="tab-content">
                            <div class="tab-pane active " id="add_refund">
                                <!-- php: = $this->element('cash/add_refund') -->
                            </div>
                            <div class="tab-pane " id="view_refunds">
                                <!-- php: = $this->element('cash/view_refunds') -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </div>
    </div>
</div> -->
<script>
$(document).ready(function() {      			
		
		// save tab in local storage
		$('#manageRefundTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('lastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var lastTab = localStorage.getItem('lastTab');
		if (lastTab) {
		   $('#manageRefundTabs a[href=' + lastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#manageRefundTabs a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ElementElementCashManageRefunds() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
