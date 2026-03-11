import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Reports_old/pdf/notifications.php';
const rawHtml = `
<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			
			<div class="card  card-box">
				<div class="card-head">
					<header>All Notifications</header>
				</div>
				<div class="card-body ">
				  <div class="row">
					<div class="col-md-6">
						<span class="label label-md label-<!-- php: = $theme2 -->"><strong><!-- php: = $this->Paginator->counter(__('Total Records: {{count}}')) --></strong></span> - <span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}')) --></span>
					</div>
					<div class="col-md-6">
					  <!-- php: = $this->Form->create(null, ['type' => 'get','url'=>['controller'=>'Notifications','action'=>'index']]); -->
						<div class="input-group" style="max-width: 250px; float: right;">
							<input type="text" class="form-control" name="searchValue" type="text" id="patientSearchBox" placeholder="Search" required />
							<span class="input-group-btn">
								<button type="submit" class="btn btn-info btn-flat">Go!</button>
							</span>
						</div>

					  <!-- php: = $this->Form->end() -->
					</div>
				  </div>
				  
				  <div style="clear: both"></div>
					
				  <div class="table-scrollable">
					<table class="table table-hover table-striped order-column full-width">
						<thead>
							<tr>
								<th>Date</th>
								<th>Title</th>
								<th>Content</th>
								<th>Type</th>
								<th>Flag</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: // $i = 0; foreach ($notifications as $notification): // $i++; -->
							<tr class="odd gradeX">
								<td><!-- php: = $notification->date_created->nice() --></td>
								<td><!-- php: = $notification->title --></td>
								<!-- td><!-- php: // = $this->Text->truncate($notification->content, 800, ['ending' => '...', 'exact' => true, 'html' => true, ]) --></td -->
								<!-- td><!-- php: // = $this->Text->autoParagraph($notification->content) --></td -->
								<td><!-- php: = $notification->content --></td>
								<td><!-- php: = $notification->notification_type_id == 1 ? 'Prescription' : 'Lab' --></td>
								<td>
									<a href="<!-- php: =$this->Url->build(['controller'=>'Notifications', 'action'=>'mark', $notification->id, $notification->read_message == 0 ? 'read' : 'unread']) -->">
										<i class="material-icons" style="color: <!-- php: = $notification->read_message == 0 ? '#ee3;' : '#555;' -->">star</i>
									</a>
								</td>
							</tr>
						<!-- php: endforeach; -->									
						</tbody>
					</table>
					</div>
					
					<div class="row">
						<div class="col-md-6">
							<span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) --></span>
						</div>
						
						<div class="col-md-6">
							<div class="dataTables_paginate paging_simple_numbers" style="float: right;">
								<ul class="pagination">
									<!-- php: = $this->Paginator->prev(__('previous')) -->
									<!-- php: = $this->Paginator->numbers() -->
									<!-- php: = $this->Paginator->next(__('next')) -->
								</ul>
							</div>
						</div>
					</div>
					

				</div>
			</div>


		</div>
	</div>
</div>

<script>
	$(document).ready(function($){
		var myresultMain = $.parseJSON('<!-- php: echo $patientsAutocompleteList; -->');
		
		$('#patientSearchBox').autocomplete({
				source: myresultMain[0]
		});


	});
</script>
`;

export default function ReportsOldPdfNotificationsPage() {
  return (
    <PageShell title="Reports_old/pdf/notifications.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
