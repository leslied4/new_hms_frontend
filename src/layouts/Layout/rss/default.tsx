const rawHtml = `
<!-- php: if (!isset($channel)): $channel = []; endif; if (!isset($channel['title'])): $channel['title'] = $this->fetch('title'); endif; echo $this->Rss->document( $this->Rss->channel( [], $channel, $this->fetch('content') ) ); -->

`;

export default function LayoutLayoutRssDefault() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
