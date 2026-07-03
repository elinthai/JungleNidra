import { readContentFile, renderMarkdown } from "../../lib/content";

export default function TodoPage() {
  const html = renderMarkdown(readContentFile("todo.md"));

  return (
    <div className="shell">
      <h1>System Build Log</h1>
      <div className="markdown card" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
