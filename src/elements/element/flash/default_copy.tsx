const rawHtml = `
<!-- php: $class = 'message'; if (!empty($params['class'])) { $class .= ' ' . $params['class']; } -->
<div class="<!-- php: = h($class) -->"><!-- php: = h($message) --></div>

`;

export default function ElementElementFlashDefaultCopy() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
