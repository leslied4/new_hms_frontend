const rawHtml = `
<!-- php: $class = 'message'; if (!empty($params['class'])) { $class .= ' ' . $params['class']; } if (!isset($params['escape']) || $params['escape'] !== false) { $message = h($message); } -->
<div class="<!-- php: = h($class) -->" onclick="this.classList.add('hidden');"><!-- php: = $message --></div>

`;

export default function ElementElementFlash15092018Default() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
