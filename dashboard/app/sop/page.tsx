import { readContentFile, renderMarkdown } from "../../lib/content";

export default function SopPage() {
  const sopHtml = renderMarkdown(readContentFile("sop.md"));
  const productionHtml = renderMarkdown(readContentFile("production-sop.md"));

  return (
    <div className="shell">
      <h1>Standard Operating Procedure</h1>
      <div className="markdown card" dangerouslySetInnerHTML={{ __html: sopHtml }} />
      <h1 style={{ marginTop: 40 }}>Stage 4 — Production SOP</h1>
      <div className="markdown card" dangerouslySetInnerHTML={{ __html: productionHtml }} />
    </div>
  );
}
