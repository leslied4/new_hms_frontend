const rawHtml = `
<!-- start footer -->
	<div class="page-footer" style="background:none; width: 50vw; align-self: center; justify-self:center">
		<div class="page-footer-inner"> <!-- php: = date("Y") --> Firstline24 HMS Beta version
		<a href="mailto:redstartheme@gmail.com" target="_top" class="makerCss"></a>
		</div>
		<!-- <div class="scroll-to-top">
			<i class="material-icons">eject</i>
		</div> -->
	</div>
<!-- end footer -->
`;

export default function ElementElementFooter() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
