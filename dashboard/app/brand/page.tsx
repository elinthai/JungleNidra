import { readContentFile, renderMarkdown } from "../../lib/content";

const PALETTE = [
  { label: "Deep blue", color: "#1f3a52" },
  { label: "Soft moss green", color: "#4f6b52" },
  { label: "Warm amber glow", color: "#c9903f" },
];

export default function BrandPage() {
  const md = readContentFile("brand-guide.md");
  const html = renderMarkdown(md);

  return (
    <div className="shell">
      <h1>Brand Guide</h1>
      <div className="swatches">
        {PALETTE.map((p) => (
          <div className="swatch" key={p.label}>
            <div className="swatch-color" style={{ background: p.color }} />
            <div className="swatch-label">{p.label}</div>
          </div>
        ))}
      </div>
      <div className="markdown card" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
