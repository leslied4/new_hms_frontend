const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Anaesthesia</span>
			</div>
			<ul class="nav nav-tabs" id="requestTab">
        <li class="nav-item request_lab">
          <a href="#pre_anaesthesia" data-toggle="tab">Pre - anaesthesia</a>
        </li>

        <li class="nav-item request_immunization">
          <a href="#current_anaesthesia" data-toggle="tab">Anaesthesia</a>
        </li>

        <li class="nav-item request_medication">
          <a href="#post_anaesthesia" data-toggle="tab">Post - anaesthesia</a>
        </li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
        <div class="tab-pane active" id="pre_anaesthesia">
          <!-- php: = $this->element('request-surgeries/pre_anaesthesia') -->
        </div>
        <div class="tab-pane " id="current_anaesthesia">
          <!-- php: = $this->element('request-surgeries/current_anaesthesia') -->
        </div>
        <div class="tab-pane " id="post_anaesthesia">
          <!-- php: = $this->element('request-surgeries/post_anaesthesia') -->
        </div>
      </div>
		</div>
	</div>
</div>
`;

export default function ElementElementRequestSurgeriesAnaesthesia() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
