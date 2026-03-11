const rawHtml = `
<div class="row">
	<div class="col-md-12">
		<center><!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 40px', 'fullBase' => true]) --></center>
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<div class="pull-left" style="float: left">
			<address>
				<p class="text-muted m-l-5">
					<!-- php: = $this->Text->autoParagraph($inst_name->address) -->
				</p>
			</address>
		</div>
		<div class="pull-right text-right">
			<address>
				<p class="text-muted m-l-30">
					Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email: <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 --> 
				</p>
			</address>
		</div>
	</div>
</div>
<hr style="height: 5px; margin-top: 2px; margin-down: 2px">
<div style="clear: both"></div>
`;

export default function ElementElementLetterHeadDefault() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
