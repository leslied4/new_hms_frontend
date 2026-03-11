const rawHtml = `
<div class="message error" onclick="this.classList.add('hidden');"><!-- php: = h($message) --></div>
`;

export default function ElementElementFlashLoginError() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
