import { getProjects, getLocations } from "../lib/store";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const [projects, locations] = await Promise.all([getProjects(), getLocations()]);

  const stageCounts: Record<string, number> = {};
  for (const p of projects) {
    stageCounts[p.stage] = (stageCounts[p.stage] ?? 0) + 1;
  }
  const totalVideos = projects.length;

  const shot = locations.reduce((sum, c) => sum + c.sites.filter((s) => s.shot).length, 0);
  const total = locations.reduce((sum, c) => sum + c.sites.length, 0);

  return (
    <div className="shell">
      <h1>Jungle Nidra — Production Overview</h1>
      <p>
        Live snapshot of the workbench. Project and location data lives in Blob storage —
        edit it from <a href="/projects">/projects</a>, not here. The Brand/SOP pages still
        read from git, edited via Claude Code or GitHub.
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
        <p>No videos tracked yet — create one on <a href="/projects">/projects</a>.</p>
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
          stage, table view &nbsp;·&nbsp; <a href="/locations">Location library</a> —
          40-site shoot tracker &nbsp;·&nbsp; <a href="/brand">Brand guide</a> — palette +
          imagery rules &nbsp;·&nbsp; <a href="/sop">SOP</a> — the full production workflow
          &nbsp;·&nbsp; <a href="/todo">Todo</a> — auto-rollup of every open checklist step
          &nbsp;·&nbsp; <a href="/changelog">Changelog</a> — system build log
        </p>
      </div>
    </div>
  );
}
