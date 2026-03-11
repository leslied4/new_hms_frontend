const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">All Medical Activities for the Visit</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item vitals_add_vital">
					<a href="#borderBox_summary_tab" data-toggle="tab">Complete Visit Activity </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane vitals_add_vital active" id="borderBox_summary_tab">
					<div class="row">
						<div class="col-md-8 col-sm-12">
							<!-- php: foreach($selectedVisit->patient_visit_audits as $audit) { -->
								<section class="mail-list">
									<div class="mail-sender">
										<div class="mail-heading">
											<span class="date pull-right"><!-- php: = $audit->date_created != null ? $audit->date_created->nice() : '' --></span>
											<h4 class="vew-mail-header"><b><!-- php: = $audit->has('action') ? $audit->action->name : '' --> <small>BY</small> </b><span class="text-primary"><!-- php: = $audit->has('user') ? $audit->user->full_name : '' --></span></h4>
										</div>
										<hr>
									</div>
									<div class="view-mail">
										<!-- php: = $audit->content -->
									</div>
								</section>
							<!-- php: } -->
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>
`;

export default function ElementElementPatientvisitSummary() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
