const rawHtml = `
<!-- php: if (!isset($params['escape']) || $params['escape'] !== false) { $message = h($message); } -->
<div class="message success" onclick="this.classList.add('hidden')"><!-- php: = $message --></div>

`;

export default function ElementElementFlash15092018Success() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
