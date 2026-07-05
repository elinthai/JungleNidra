import { readContentFile, renderMarkdown } from "../../lib/content";

export default function SopPage() {
  const sopHtml = renderMarkdown(readContentFile("sop.md"));
  const productionHtml = renderMarkdown(readContentFile("production-sop.md"));

  return (
    <div className="shell">
      <h1>Standard Operating Procedure</h1>
      <p className="card" style={{ fontSize: 13 }}>
        Working a project? Its current stage&apos;s checklist lives on the project page
        itself (<a href="/projects">/projects</a> → open a project) — you don&apos;t need to
        come here to know what to do next. This page is the full reference doc underneath
        those checklists.
      </p>
      <div className="markdown card" dangerouslySetInnerHTML={{ __html: sopHtml }} />
      <h1 style={{ marginTop: 40 }}>Stage 4 — Production SOP</h1>
      <div className="markdown card" dangerouslySetInnerHTML={{ __html: productionHtml }} />
    </div>
  );
}
