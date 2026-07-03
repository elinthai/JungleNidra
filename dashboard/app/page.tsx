import { readContentFile } from "../lib/content";
import { parseMarkdownTable, splitBySections } from "../lib/table";

function countLocationsShot(): { shot: number; total: number } {
  const md = readContentFile("location-library.md");
  const sections = splitBySections(md).filter((s) =>
    /Beach|Temple|Waterfall|Jungle/.test(s.title)
  );
  let shot = 0;
  let total = 0;
  for (const section of sections) {
    const { rows } = parseMarkdownTable(section.body);
    for (const row of rows) {
      const shotCell = row[2] ?? "";
      if (shotCell.trim().length > 0) total += 1;
      if (/\[x\]/i.test(shotCell)) shot += 1;
    }
  }
  return { shot, total };
}

function countVideosByStage(): Record<string, number> {
  const md = readContentFile("content-calendar.md");
  const { rows } = parseMarkdownTable(md);
  const counts: Record<string, number> = {};
  for (const row of rows) {
    const stage = (row[2] ?? "Unknown").trim();
    if (!stage) continue;
    counts[stage] = (counts[stage] ?? 0) + 1;
  }
  return counts;
}

export default function OverviewPage() {
  const { shot, total } = countLocationsShot();
  const stageCounts = countVideosByStage();
  const totalVideos = Object.values(stageCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="shell">
      <h1>Jungle Nidra — Production Overview</h1>
      <p>
        View-only snapshot of the manufacturing line. Edit the actual files via
        Claude Code or GitHub — this page just reads them.
      </p>

      <div className="grid">
        <div className="stat">
          <div className="stat-value">{totalVideos}</div>
          <div className="stat-label">Videos in the pipeline</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            {shot}/{total || 40}
          </div>
          <div className="stat-label">Locations shot</div>
        </div>
        <div className="stat">
          <div className="stat-value">{Object.keys(stageCounts).length}</div>
          <div className="stat-label">Active stages</div>
        </div>
      </div>

      <h2>Videos by stage</h2>
      {totalVideos === 0 ? (
        <p>No videos tracked yet — check <a href="/calendar">the calendar</a>.</p>
      ) : (
        <div className="grid">
          {Object.entries(stageCounts).map(([stage, count]) => (
            <div className="stat" key={stage}>
              <div className="stat-value">{count}</div>
              <div className="stat-label">{stage}</div>
            </div>
          ))}
        </div>
      )}

      <h2>Quick links</h2>
      <div className="card">
        <p>
          <a href="/projects">Projects</a> — the workbench: create/track videos, upload
          footage &nbsp;·&nbsp; <a href="/calendar">Content calendar</a> — every video's
          stage (static record) &nbsp;·&nbsp; <a href="/locations">Location library</a> —
          40-site shoot tracker &nbsp;·&nbsp; <a href="/brand">Brand guide</a> — palette +
          imagery rules &nbsp;·&nbsp; <a href="/sop">SOP</a> — the full production workflow
          &nbsp;·&nbsp; <a href="/todo">Todo</a> — system build log
        </p>
      </div>
    </div>
  );
}
