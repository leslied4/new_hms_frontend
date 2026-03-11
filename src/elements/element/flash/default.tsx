const rawHtml = `
<script>
	function reset () {
		alertify.set({
			labels : {
				ok     : "OK",
				cancel : "Cancel"
			},
			delay : 15000,
			buttonReverse : false,
			buttonFocus   : "ok"
		});
	}	
	
	reset();
	alertify.log("<!-- php: = h($message) -->");
</script>
`;

export default function ElementElementFlashDefault() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
