import { readContentFile } from "../../lib/content";
import { parseMarkdownTable, splitBySections } from "../../lib/table";

export default function LocationsPage() {
  const md = readContentFile("location-library.md");
  const sections = splitBySections(md).filter((s) =>
    /Beach|Temple|Waterfall|Jungle/.test(s.title)
  );

  return (
    <div className="shell">
      <h1>Location Library</h1>
      <p>40 b-roll sites across Koh Samui — 10 per category. Checked off in `location-library.md` as they get shot.</p>

      <div className="grid">
        {sections.map((section) => {
          const { rows } = parseMarkdownTable(section.body);
          const shot = rows.filter((r) => /\[x\]/i.test(r[2] ?? "")).length;
          const total = rows.filter((r) => (r[2] ?? "").trim().length > 0).length || 10;
          const pct = total > 0 ? Math.round((shot / total) * 100) : 0;
          return (
            <div className="card" key={section.title}>
              <h3>{section.title}</h3>
              <div className="stat-value" style={{ fontSize: 20 }}>
                {shot}/{total}
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <ul style={{ paddingLeft: 18, marginTop: 14 }}>
                {rows
                  .filter((r) => (r[1] ?? "").trim().length > 0)
                  .map((r, i) => (
                    <li key={i}>
                      {/\[x\]/i.test(r[2] ?? "") ? "✓ " : "· "}
                      {r[1]}
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
