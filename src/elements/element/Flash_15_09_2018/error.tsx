const rawHtml = `
<!-- php: if (!isset($params['escape']) || $params['escape'] !== false) { $message = h($message); } -->
<div class="message error" onclick="this.classList.add('hidden');"><!-- php: = $message --></div>

`;

export default function ElementElementFlash15092018Error() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
