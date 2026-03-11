import PageShell from '../../components/PageShell';

const sourcePath = 'templates/VisitsReport/index.php';
const rawHtml = `
<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="card  card-box">
		<!-- php: = $this->Form->create(null, ['type' => 'get','url'=>['controller'=>'VisitsReport','action'=>'index']]); -->
			<div class="d-flex flex-column">
				<div class="report-filter-form d-flex flex-wrap p-3">
					<div class="d-flex flex-column mr-2">
						<label class="mb-0">From</label>
						<!-- php: = $this->form->text('from', ['value' => $filters['from'], 'type'=>'date', 'required'=>true, 'class'=>'form-control']) -->
					</div>
					<div class="d-flex flex-column mr-2">
						<label class="mb-0">To</label>
						<!-- php: = $this->form->text('to', ['value' => $filters['to'], 'type'=>'date', 'required'=>true, 'class'=>'form-control']) -->
					</div>
					<div class="d-flex flex-column mr-2">
						<label class="mb-0">Department</label>
						<!-- php: = $this->Form->select('department', $departments, ['value' => $filters['department'], 'class'=>'form-control']); -->
					</div>
					<div class="d-flex flex-column mr-2">
						<label class="mb-0">Gender</label>
						<!-- php: = $this->Form->select('gender', $genders, ['value' => $filters['gender'], 'class'=>'form-control']); -->
					</div>
					<div class="d-flex flex-column mr-2">
						<label class="mb-0">Payment Method</label>
						<!-- php: = $this->Form->select('paymentType', $paymentTypes, ['value' => $filters['paymentType'], 'class'=>'form-control']); -->
					</div>
					<div class="d-flex flex-column mr-2">
						<label class="mb-0">Visit Status</label>
						<!-- php: = $this->Form->select('status', $statuses, ['value' => $filters['status'], 'class'=>'form-control']); -->
					</div>
					<!-- <div class="d-flex flex-column mr-2">
						<label class="mb-0">Period</label>
						<!-- php: = $this->Form->select('period', $periods, ['value' => $filters['period'], 'class'=>'form-control']); -->
					</div> -->
				</div>
				<div class="d-flex justify-content-end mb-3">
					<div class="btn-group" role="group" aria-label="Basic example">
						<button type="submit" class="btn btn-info btn-flat" name="filter">
							<i class="fa fa-filter" aria-hidden="true"></i> Filter
						</button>
						<button type="submit" class="btn btn-danger btn-flat" name="pdf" title="Generated for the year and month in the 'from' date">
							<i class="fa fa-file-pdf-o" aria-hidden="true"></i>PDF
						</button>
						<button type="submit" class="btn btn-success btn-flat" name="excel" title="Generated for the year and month in the 'from' date">
							<i class="fa fa-file-excel-o" aria-hidden="true"></i>Excel
						</button>
						<button type="submit" class="btn btn-primary btn-flat" name="csv" title="Generated for the year and month in the 'from' date">
							<i class="fa fa-table" aria-hidden="true"></i>CSV
						</button>
					</div>
				</div>
			</div>
			<!-- php: = $this->Form->end() -->
		</div>
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			
			<div class="card  card-box">
				<div class="card-head">
					<header>Drug Consumption</header>
				</div>
				<div class="card-body ">
				  <div class="d-flex">
					<div class="">
					  <!-- php: = $this->Form->create(null, ['type' => 'get','url'=>['controller'=>'Reports','action'=>'claims']]); -->
						<div class="input-group" style="max-width: 250px; min-width: 250px; float: right;">
							<!-- php: = $this->Form->text('search',['value' => $filters['search'], 'placeholder'=>'search', 'required'=>false, 'class'=>'form-control']); -->
							<span class="input-group-btn">
								<button type="submit" class="btn btn-info btn-flat">
									<i class="fa fa-search" aria-hidden="true"></i>
								</button>
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
								<!-- php: foreach ($columns as $name => $value): -->
								<th><!-- php: = $name --></th>
								<!-- php: endforeach; -->
							</tr>
						</thead>
						<tbody>
						<!-- php: foreach ($result as $row): -->
							<tr class="odd gradeX">
								<!-- php: foreach ($columns as $name => $value): -->
								<td><!-- php: = eval('return '.$value.';') --></td>
								<!-- php: endforeach; -->
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
<style>
.report-filter-form{
	/* margin-top: -13px; */
}
.report-filter-form input,.report-filter-form select, .report-filter-form button{
	height: 30px !important;
	padding-top: 0;
	padding-bottom: 0;
}
.report-filter-form label{
	font-size: 12px;
}
.report-filter-form .form-control{
	min-width: 150px;
}
</style>

<script>
	$(document).ready(function($){
		var myresultMain = $.parseJSON('<!-- php: echo $patientsAutocompleteList; -->');
		
		$('#patientSearchBox').autocomplete({
				source: myresultMain[0]
		});


	});
</script>
`;

export default function VisitsReportIndexPage() {
  return (
    <PageShell title="VisitsReport/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
